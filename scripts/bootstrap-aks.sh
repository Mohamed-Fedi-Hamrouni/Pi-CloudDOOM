#!/usr/bin/env bash
# Bootstrap the full Pi-CloudDOOM stack on AKS.
#
# What this does (in order):
#   1. Creates AKS cluster in rg-piclouddoom (idempotent — skips if exists)
#   2. Fetches admin kubeconfig
#   3. Installs NGINX Ingress Controller
#   4. Applies base manifests (namespace, RBAC, resource quota, app-config)
#   5. Creates app-secrets and minio-secrets from env vars (prompts if unset)
#   6. Applies infra: postgres, redis, kafka, minio, keycloak
#   7. Applies all 7 Spring microservice deployments
#   8. Applies ingress manifests
#   9. Mints a cicd-deployer kubeconfig and stores it as GitHub secret KUBECONFIG_AKS
#
# Prerequisites:
#   az      logged in as a user with Contributor on rg-piclouddoom
#   kubectl v1.29+
#   gh      logged in (for setting the GitHub secret)
#
# Usage:
#   bash scripts/bootstrap-aks.sh
#
# Env overrides:
#   RG=rg-piclouddoom
#   LOCATION=francecentral
#   CLUSTER=aks-piclouddoom
#   NODE_SIZE=Standard_D2s_v3
#   NODE_COUNT=3
#   REPO=Mohamed-Fedi-Hamrouni/Pi-CloudDOOM

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────────────────
RG="${RG:-rg-piclouddoom}"
LOCATION="${LOCATION:-francecentral}"
CLUSTER="${CLUSTER:-aks-piclouddoom}"
NODE_SIZE="${NODE_SIZE:-Standard_D2s_v3}"
NODE_COUNT="${NODE_COUNT:-3}"
NS="piclouddoom"
REPO="${REPO:-Mohamed-Fedi-Hamrouni/Pi-CloudDOOM}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ─── Colours ─────────────────────────────────────────────────────────────────
bold='\033[1m'; green='\033[0;32m'; yellow='\033[0;33m'; red='\033[0;31m'; reset='\033[0m'
info()    { echo -e "${green}[INFO]${reset}  $*"; }
warn()    { echo -e "${yellow}[WARN]${reset}  $*"; }
section() { echo -e "\n${bold}══ $* ══${reset}"; }
die()     { echo -e "${red}[ERROR]${reset} $*" >&2; exit 1; }

# ─── Preflight ───────────────────────────────────────────────────────────────
section "Preflight"
command -v az      >/dev/null || die "az CLI not found"
command -v kubectl >/dev/null || die "kubectl not found"
command -v gh      >/dev/null || die "gh CLI not found"

az account show --query "{sub:name, user:user.name}" -o table
gh auth status --hostname github.com

# ─── Secret prompts ──────────────────────────────────────────────────────────
section "Secrets"
prompt_secret() {
  local var="$1" label="$2"
  if [ -z "${!var:-}" ]; then
    read -rsp "  ${label}: " val; echo
    export "$var"="$val"
  else
    info "$var already set in environment — using that."
  fi
}

info "Enter the secret values that are NOT stored in the repo."
info "Press Enter to skip a value (it won't be included in the secret)."
echo ""
prompt_secret POSTGRES_USER         "Postgres username"
prompt_secret POSTGRES_PASSWORD     "Postgres password"
prompt_secret REDIS_PASSWORD        "Redis password"
prompt_secret KEYCLOAK_ADMIN        "Keycloak admin username"
prompt_secret KEYCLOAK_ADMIN_PASSWORD "Keycloak admin password"
prompt_secret GROQ_API_KEY          "Groq API key"
prompt_secret GOOGLE_AI_API_KEY     "Google AI (Gemini) API key"
prompt_secret MAIL_USERNAME         "Mailtrap SMTP username"
prompt_secret MAIL_PASSWORD         "Mailtrap SMTP password"
prompt_secret SIMLI_API_KEY         "Simli API key"
prompt_secret SIMLI_FACE_ID         "Simli face ID"
prompt_secret SIMLI_TTS_VOICE_ID    "Simli TTS voice ID"
prompt_secret MINIO_ROOT_USER       "MinIO root user"
prompt_secret MINIO_ROOT_PASSWORD   "MinIO root password"

# ─── 1. Create resource group ────────────────────────────────────────────────
section "Resource Group"
if az group show --name "$RG" &>/dev/null; then
  info "Resource group $RG already exists."
else
  info "Creating resource group $RG in $LOCATION..."
  az group create --name "$RG" --location "$LOCATION" -o none
fi

# ─── 2. Create AKS cluster ───────────────────────────────────────────────────
section "AKS Cluster"
if az aks show --name "$CLUSTER" --resource-group "$RG" &>/dev/null; then
  info "AKS cluster $CLUSTER already exists — skipping creation."
else
  info "Creating AKS cluster $CLUSTER ($NODE_COUNT × $NODE_SIZE)..."
  info "This takes ~5 minutes."
  az aks create \
    --name "$CLUSTER" \
    --resource-group "$RG" \
    --location "$LOCATION" \
    --node-count "$NODE_COUNT" \
    --node-vm-size "$NODE_SIZE" \
    --kubernetes-version "1.29" \
    --enable-cluster-autoscaler \
    --min-count 2 \
    --max-count 5 \
    --generate-ssh-keys \
    --network-plugin azure \
    --outbound-type loadBalancer \
    --no-wait
  info "Cluster creation triggered — waiting for it to reach Running state..."
  az aks wait --name "$CLUSTER" --resource-group "$RG" \
    --created --interval 30 --timeout 900
  info "Cluster ready."
fi

# ─── 3. Get credentials ───────────────────────────────────────────────────────
section "Kubeconfig"
info "Fetching admin credentials for $CLUSTER..."
az aks get-credentials \
  --name "$CLUSTER" \
  --resource-group "$RG" \
  --overwrite-existing
kubectl config use-context "$CLUSTER"
kubectl get nodes -o wide

# ─── 4. Install NGINX Ingress Controller ─────────────────────────────────────
section "NGINX Ingress Controller"
NGINX_VERSION="v1.10.1"
NGINX_MANIFEST="https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-${NGINX_VERSION}/deploy/static/provider/cloud/deploy.yaml"

if kubectl get ns ingress-nginx &>/dev/null && \
   kubectl -n ingress-nginx get deploy ingress-nginx-controller &>/dev/null; then
  info "NGINX ingress controller already installed."
else
  info "Installing NGINX ingress controller ${NGINX_VERSION}..."
  kubectl apply -f "$NGINX_MANIFEST"
  info "Waiting for ingress controller to be ready (up to 3 min)..."
  kubectl -n ingress-nginx rollout status deploy/ingress-nginx-controller --timeout=180s
fi

INGRESS_IP=""
info "Waiting for external IP on the ingress LoadBalancer..."
for i in $(seq 1 30); do
  INGRESS_IP=$(kubectl -n ingress-nginx get svc ingress-nginx-controller \
    -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || true)
  [ -n "$INGRESS_IP" ] && break
  echo "  [$i/30] waiting for IP..."
  sleep 10
done
if [ -n "$INGRESS_IP" ]; then
  info "Ingress external IP: ${INGRESS_IP}"
  warn "Point your DNS records to this IP:"
  warn "  api.interviewprep-tn.me  → ${INGRESS_IP}"
  warn "  auth.interviewprep-tn.me → ${INGRESS_IP}"
else
  warn "Could not get external IP yet — check 'kubectl -n ingress-nginx get svc' later."
fi

# ─── 5. Base manifests ────────────────────────────────────────────────────────
section "Base Manifests"
kubectl apply -f "$ROOT/k8s/base/namespace.yaml"
kubectl apply -f "$ROOT/k8s/base/resource-quota.yaml"
kubectl apply -f "$ROOT/k8s/base/app-config.yaml"
kubectl apply -f "$ROOT/k8s/rbac/cicd-deployer.yaml"
info "Base manifests applied."

# ─── 6. Secrets ───────────────────────────────────────────────────────────────
section "Kubernetes Secrets"

# Build the app-secrets arguments dynamically — skip any empty vars
build_secret_args() {
  local args=""
  _add() {
    local key="$1" val="${!2:-}"
    [ -n "$val" ] && args="${args} --from-literal=${key}=${val}"
  }
  _add POSTGRES_USER          POSTGRES_USER
  _add POSTGRES_PASSWORD      POSTGRES_PASSWORD
  _add REDIS_PASSWORD         REDIS_PASSWORD
  _add KEYCLOAK_ADMIN         KEYCLOAK_ADMIN
  _add KEYCLOAK_ADMIN_PASSWORD KEYCLOAK_ADMIN_PASSWORD
  _add GROQ_API_KEY           GROQ_API_KEY
  _add GOOGLE_AI_API_KEY      GOOGLE_AI_API_KEY
  _add GEMINI_API_KEY         GOOGLE_AI_API_KEY   # alias used by some services
  _add MAIL_USERNAME          MAIL_USERNAME
  _add MAIL_PASSWORD          MAIL_PASSWORD
  _add SIMLI_API_KEY          SIMLI_API_KEY
  _add SIMLI_FACE_ID          SIMLI_FACE_ID
  _add SIMLI_TTS_VOICE_ID     SIMLI_TTS_VOICE_ID
  echo "$args"
}

APP_SECRET_ARGS="$(build_secret_args)"
if [ -z "$APP_SECRET_ARGS" ]; then
  warn "No secret values provided — skipping app-secrets creation."
else
  # Delete first to allow re-run idempotently
  kubectl -n "$NS" delete secret app-secrets --ignore-not-found
  eval kubectl -n "$NS" create secret generic app-secrets "$APP_SECRET_ARGS"
  info "app-secrets created."
fi

kubectl -n "$NS" delete secret minio-secrets --ignore-not-found
if [ -n "${MINIO_ROOT_USER:-}" ] && [ -n "${MINIO_ROOT_PASSWORD:-}" ]; then
  kubectl -n "$NS" create secret generic minio-secrets \
    --from-literal=MINIO_ROOT_USER="$MINIO_ROOT_USER" \
    --from-literal=MINIO_ROOT_PASSWORD="$MINIO_ROOT_PASSWORD"
  info "minio-secrets created."
else
  warn "MINIO_ROOT_USER or MINIO_ROOT_PASSWORD not set — skipping minio-secrets."
fi

# ─── 7. Infra ─────────────────────────────────────────────────────────────────
section "Infrastructure"
kubectl apply -f "$ROOT/k8s/infra/postgres/postgres.yaml"
kubectl apply -f "$ROOT/k8s/infra/redis/redis.yaml"
kubectl apply -f "$ROOT/k8s/infra/kafka/kafka.yaml"
kubectl apply -f "$ROOT/k8s/infra/minio/minio.yaml"
kubectl apply -f "$ROOT/k8s/infra/keycloak/"

info "Waiting for postgres to be ready..."
kubectl -n "$NS" rollout status deploy/postgres --timeout=120s
info "Waiting for redis to be ready..."
kubectl -n "$NS" rollout status deploy/redis --timeout=60s
info "Waiting for kafka to be ready (KRaft startup can take ~60s)..."
kubectl -n "$NS" rollout status deploy/kafka --timeout=180s
info "Waiting for minio to be ready..."
kubectl -n "$NS" rollout status deploy/minio --timeout=120s

# ─── 8. App services ──────────────────────────────────────────────────────────
section "Microservices"
for svc_dir in "$ROOT"/k8s/apps/*/; do
  svc="$(basename "$svc_dir")"
  info "Applying $svc..."
  kubectl apply -f "$svc_dir"
done

# ─── 9. Ingress ───────────────────────────────────────────────────────────────
section "Ingress"
kubectl apply -f "$ROOT/k8s/ingress/api-ingress.yaml"
kubectl apply -f "$ROOT/k8s/ingress/auth-ingress.yaml"

# ─── 10. Wait for all services ────────────────────────────────────────────────
section "Rollout Status"
SERVICES=(user-service interview-service training-service mentorship-service quiz-service community-service resource-service)
failures=0
for svc in "${SERVICES[@]}"; do
  info "Waiting for $svc (10m timeout)..."
  if ! kubectl -n "$NS" rollout status "deploy/$svc" --timeout=600s; then
    warn "$svc rollout timed out — check logs: kubectl -n $NS logs -l app=$svc --tail=50"
    failures=$((failures + 1))
  fi
done

# ─── 11. Mint cicd-deployer kubeconfig and set GitHub secret ─────────────────
section "GitHub Secret: KUBECONFIG_AKS"

# Wait for the SA token to be populated
for _ in $(seq 1 10); do
  if kubectl -n "$NS" get secret cicd-deployer-token \
       -o jsonpath='{.data.token}' 2>/dev/null | grep -q .; then
    break
  fi
  sleep 2
done

# AKS API server is public by default
AKS_API_SERVER="$(az aks show \
  --name "$CLUSTER" --resource-group "$RG" \
  --query "fqdn" -o tsv 2>/dev/null)"
AKS_API_SERVER="https://${AKS_API_SERVER}"

info "Minting kubeconfig for cicd-deployer SA (API: ${AKS_API_SERVER})..."

KUBECONFIG_CONTENT="$(
  TOKEN_B64="$(kubectl -n "$NS" get secret cicd-deployer-token \
    -o jsonpath='{.data.token}')"
  TOKEN="$(echo "$TOKEN_B64" | base64 -d)"
  CA_B64="$(kubectl -n "$NS" get secret cicd-deployer-token \
    -o jsonpath='{.data.ca\.crt}')"

  cat <<EOF
apiVersion: v1
kind: Config
clusters:
  - name: aks-piclouddoom
    cluster:
      server: ${AKS_API_SERVER}
      certificate-authority-data: ${CA_B64}
contexts:
  - name: cicd@piclouddoom
    context:
      cluster: aks-piclouddoom
      namespace: ${NS}
      user: cicd-deployer
current-context: cicd@piclouddoom
users:
  - name: cicd-deployer
    user:
      token: ${TOKEN}
EOF
)"

info "Setting KUBECONFIG_AKS secret on ${REPO}..."
echo "$KUBECONFIG_CONTENT" | gh secret set KUBECONFIG_AKS \
  --repo "$REPO" \
  --body -
info "KUBECONFIG_AKS secret set."

# ─── 12. Summary ─────────────────────────────────────────────────────────────
section "Summary"
kubectl -n "$NS" get pods -o wide
echo ""
if [ "$failures" -gt 0 ]; then
  warn "${failures} service(s) did not roll out cleanly. Check the pods above."
else
  info "All services rolled out successfully."
fi
echo ""
info "Ingress IP: ${INGRESS_IP:-<not yet available — run: kubectl -n ingress-nginx get svc>}"
info "Next: update your DNS to point api.interviewprep-tn.me and auth.interviewprep-tn.me to ${INGRESS_IP:-<IP>}"
info "Then trigger the first CI deploy:"
info "  gh workflow run deploy-aks.yml --repo $REPO --ref deployment/azure-vercel"
