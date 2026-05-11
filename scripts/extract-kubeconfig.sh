#!/usr/bin/env bash
# Mint a kubeconfig for the cicd-deployer ServiceAccount in the
# piclouddoom namespace. Run on k8s-cp1 (or any host with kubectl
# access to the cluster). Output goes to stdout — redirect to a file
# then paste the contents into the GitHub repo secret KUBECONFIG_PROD.
#
# Usage:
#   bash scripts/extract-kubeconfig.sh > /tmp/kubeconfig-prod.yaml
#   cat /tmp/kubeconfig-prod.yaml            # inspect once
#   # Then SCP off the box and paste into GitHub Actions secrets
#   shred -u /tmp/kubeconfig-prod.yaml       # clean up

set -euo pipefail

NAMESPACE="${NAMESPACE:-piclouddoom}"
SA="${SA:-cicd-deployer}"
SECRET="${SECRET:-cicd-deployer-token}"
CLUSTER_NAME="${CLUSTER_NAME:-piclouddoom-openstack}"
CONTEXT_NAME="${CONTEXT_NAME:-cicd@piclouddoom}"

# Pre-flight
command -v kubectl >/dev/null || { echo "kubectl not found" >&2; exit 1; }
kubectl get ns "$NAMESPACE" >/dev/null 2>&1 || { echo "Namespace $NAMESPACE not found" >&2; exit 1; }
kubectl -n "$NAMESPACE" get sa "$SA" >/dev/null 2>&1 \
  || { echo "ServiceAccount $SA missing — did you apply k8s/rbac/cicd-deployer.yaml?" >&2; exit 1; }

# Wait briefly for the token controller to populate the secret
for _ in 1 2 3 4 5 6 7 8 9 10; do
  if kubectl -n "$NAMESPACE" get secret "$SECRET" -o jsonpath='{.data.token}' 2>/dev/null | grep -q .; then
    break
  fi
  sleep 1
done

TOKEN_B64="$(kubectl -n "$NAMESPACE" get secret "$SECRET" -o jsonpath='{.data.token}')"
if [ -z "$TOKEN_B64" ]; then
  echo "Secret $SECRET has no token populated yet. Retry in a few seconds." >&2
  exit 1
fi
TOKEN="$(echo "$TOKEN_B64" | base64 -d)"
CA_B64="$(kubectl -n "$NAMESPACE" get secret "$SECRET" -o jsonpath='{.data.ca\.crt}')"

# API server URL — must be reachable from GitHub Actions runners.
# The current cluster's API listens on the cp1 floating IP at port 6443.
# Override with API_SERVER=https://... if needed.
API_SERVER="${API_SERVER:-$(kubectl config view --raw -o jsonpath='{.clusters[0].cluster.server}')}"

cat <<EOF
apiVersion: v1
kind: Config
clusters:
  - name: ${CLUSTER_NAME}
    cluster:
      server: ${API_SERVER}
      certificate-authority-data: ${CA_B64}
contexts:
  - name: ${CONTEXT_NAME}
    context:
      cluster: ${CLUSTER_NAME}
      namespace: ${NAMESPACE}
      user: ${SA}
current-context: ${CONTEXT_NAME}
users:
  - name: ${SA}
    user:
      token: ${TOKEN}
EOF
