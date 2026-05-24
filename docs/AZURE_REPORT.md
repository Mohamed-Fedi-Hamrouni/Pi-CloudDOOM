# Pi-CloudDOOM — Azure Deployment Report (Ultra-Detailed)

**Scope:** Everything related to Microsoft Azure in this repository — what is deployed, where, why, with which images, the exact CLI commands, the GitHub Actions workflow, the laptop fallback script, the service-principal model (and why it's currently blocked), rollback semantics, and the operational runbook.

**Azure region:** France Central
**Resource group:** `rg-piclouddoom`
**Subscription ID:** `e8928eeb-5efe-4a65-b301-e5c99e492dee` (referenced in the docs; the workflow uses `AZURE_RESOURCE_GROUP` and `AZURE_CREDENTIALS` secrets)
**Compute product:** Azure Container Apps (ACA), serverless container hosting
**Public hostnames:** `*.yellowocean-356174e3.francecentral.azurecontainerapps.io`

---

## 1. Why Azure Container Apps (ACA) for the AI plane

Azure is **plane 2** of the hybrid deployment (OpenStack / Azure / Vercel). It hosts only the **AI services** — the rest of the platform (Postgres, Redis, Kafka, Keycloak, 7 Spring services) lives on the OpenStack school cluster.

The AI workloads have very different characteristics from the rest:

| Property | AI services | Spring services |
|---|---|---|
| Traffic pattern | Bursty — used only when a user starts a training-path generation or a mock interview | Constant — every page hit |
| Image size | Big: `ollama` baked with `llama3.2:3b` ≈ 2 GB | Small: ~250 MB JRE + jar |
| Peak memory | High (LLM/TTS in memory) | Moderate |
| Idle cost on OpenStack | Wastes RAM 95% of the day | Always needed |
| Cold-start tolerance | Acceptable (a user kicks off a long-running session anyway) | Must be hot for every request |

ACA gives us:

- **Scale-to-zero** — pay only for active CPU + provisioned memory + invocations, not wall-clock.
- **Per-revision deployments** — every deploy creates an immutable revision, traffic can be shifted between them, easy rollback.
- **Built-in HTTPS ingress** — Azure provides the FQDN + cert, no Ingress controller to manage.
- **No infrastructure to babysit** — no VMs, no patching, no LB.

This would be wasteful on our small 5-node OpenStack cluster (4 workers) because the ollama image alone exceeds a single worker's free RAM headroom, and the cluster has no scale-to-zero.

---

## 2. What is deployed to Azure

Three Container Apps, all in resource group `rg-piclouddoom`, region France Central:

| Source folder | ACA app name | Container image | Role |
|---|---|---|---|
| `ai-training-path/` | `ai-training-path` | `docker.io/azizbna/pi-clouddoom-ai-training-path` | FastAPI — predicts personalized training paths from user CV/profile vectors. `POST /predict-path`, `GET /health`. |
| `kokoro/` | `kokoro` | `docker.io/azizbna/pi-clouddoom-kokoro` | TTS engine for the live mock-interview avatar (OpenAI-compatible `POST /v1/audio/speech`). Built on top of `hwdsl2/kokoro-server:latest` with a startup-watchdog patch and pre-installed spaCy `en_core_web_sm`. |
| `ollama-deploy/` | `ollama` | `docker.io/azizbna/pi-clouddoom-ollama` | LLM runtime serving `llama3.2:3b`. Used by `interview-service` and `community-service`. The model is **baked into the image at build time** (so first cold-start doesn't need a network pull). |

**A fourth Container App, `whisper`, runs the third-party image `fedirz/faster-whisper-server:latest-cpu`** (speech-to-text). We do not build it, so it is **not** in our deploy matrix — only the three images we own are in `deploy-aca.yml`. The Spring services know its URL via the in-cluster `WHISPER_BASE_URL` ConfigMap key.

The reachable FQDNs follow the pattern:

```
ai-training-path.yellowocean-356174e3.francecentral.azurecontainerapps.io
kokoro.yellowocean-356174e3.francecentral.azurecontainerapps.io
ollama.yellowocean-356174e3.francecentral.azurecontainerapps.io
whisper.yellowocean-356174e3.francecentral.azurecontainerapps.io
```

The Spring services (running on OpenStack) reach these via the `app-config` ConfigMap (`AI_TRAINING_PATH_URL`, `KOKORO_URL`, `OLLAMA_URL`, `WHISPER_BASE_URL`).

---

## 3. Container image sourcing

We do not push to Azure Container Registry (ACR). Instead, every image lives in **DockerHub** under `docker.io/azizbna/pi-clouddoom-*` — public, no `imagePullSecret` needed. ACA fetches the image from DockerHub on each new revision.

Tagging convention (same as OpenStack plane):

| Tag | Meaning |
|---|---|
| `sha-<7-char>` | **Immutable**, unique per commit — the only tag the deploy workflow pins |
| `<branch>` | Moving pointer per branch |
| `latest` | Updated only on `main` |
| `v*.*.*` | On `v*` git tag pushes |

This is documented in detail in `docs/DEPLOYMENT_REPORT.md` §5.

---

## 4. The Dockerfiles for the AI services

### 4.1 `ai-training-path/Dockerfile`

```dockerfile
FROM python:3.12-slim

WORKDIR /app

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --timeout 120 --retries 5 --prefer-binary -r requirements.txt

COPY . .

RUN python dataset_generator.py && python train.py

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

- Python 3.12-slim, isolated venv at `/opt/venv`.
- `dataset_generator.py` + `train.py` run at **build time** — the trained `model.pkl` is baked into the image. No model download at startup.
- Listens on `8000`. ACA's ingress forwards HTTPS 443 → container 8000.

`requirements.txt`:
```
fastapi==0.136.1
uvicorn[standard]==0.46.0
pandas==3.0.2
numpy==2.4.4
scikit-learn==1.8.0
pydantic==2.13.4
scipy==1.17.1
joblib==1.5.3
```

### 4.2 `kokoro/Dockerfile`

```dockerfile
FROM hwdsl2/kokoro-server:latest

# Preinstall the spaCy English model
RUN /opt/venv/bin/python -m pip install --no-cache-dir \
    https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl

# Increase the startup watchdog from 300s to 1200s
RUN sed -i 's/while \[ "$i" -lt 300 \]; do/while [ "$i" -lt 1200 ]; do/' /opt/src/run.sh
```

Two important patches:
- **spaCy model baked in** — otherwise the container tries to fetch it on first request and can fail behind constrained networks.
- **Watchdog 300 → 1200 s** — the model load can exceed 5 min on CPU-only hosts; the default watchdog killed the container before it became healthy.

### 4.3 `ollama-deploy/Dockerfile`

```dockerfile
FROM ollama/ollama:latest

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Start ollama in background, pull the model, then stop it
# This bakes the model into the image layer at build time
RUN /bin/bash -c '\
  ollama serve & \
  SERVER_PID=$!; \
  sleep 5; \
  ollama pull llama3.2:3b; \
  kill $SERVER_PID'

EXPOSE 11434
ENTRYPOINT ["ollama", "serve"]
```

- Starts `ollama serve` in the background **during the build**, pulls `llama3.2:3b`, then kills the process.
- The model ends up as part of the image layer (≈2 GB). Cold starts on ACA take 1–2 min on first revision activation; subsequent warm requests are fast.
- A simpler `start.sh` variant lives next to the Dockerfile — it pulls the model at **runtime** instead of build-time. The Dockerfile uses the **build-time** approach for predictable cold starts in production.

---

## 5. Authentication to Azure (service principal & current blocker)

Microsoft documentation calls this an **Azure AD application + service principal** (now part of Entra ID).

### 5.1 Intended setup

```bash
az ad sp create-for-rbac \
  --name "pi-clouddoom-cicd" \
  --role "Contributor" \
  --scopes "/subscriptions/e8928eeb-5efe-4a65-b301-e5c99e492dee/resourceGroups/rg-piclouddoom" \
  --sdk-auth
```

- **`Contributor` on the resource group only**, not on the subscription. Smallest blast radius that still lets `az containerapp update` succeed.
- `--sdk-auth` outputs the JSON shape that `azure/login@v2` expects:
  ```json
  {
    "clientId": "...",
    "clientSecret": "...",
    "subscriptionId": "...",
    "tenantId": "...",
    "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
    "resourceManagerEndpointUrl": "https://management.azure.com/",
    "activeDirectoryGraphResourceId": "https://graph.windows.net/",
    "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
    "galleryEndpointUrl": "https://gallery.azure.com/",
    "managementEndpointUrl": "https://management.core.windows.net/"
  }
  ```
- The full JSON becomes the value of the `AZURE_CREDENTIALS` GitHub secret.

### 5.2 The blocker (documented in `docs/cicd/azure-sp-blocked.md`)

The `esprit.tn` Entra ID tenant restricts non-admin users from registering applications, so the command above fails:

```
$ az ad sp create-for-rbac --name "pi-clouddoom-cicd" ...
Insufficient privileges to complete the operation.
```

Without that SP, neither the classic secret-based flow nor federated OIDC works. The CI/CD pipeline ships **without** auto-ACA: `deploy-aca.yml`'s `workflow_run` trigger is commented out and **only `workflow_dispatch` is wired up**. In practice, ACA deploys are run from a developer laptop via `scripts/deploy-aca.sh` (an interactive `az login` as a user with Contributor on `rg-piclouddoom`).

### 5.3 Unblock plan (option A — classic SP)

Email or Teams the esprit.tn Entra ID admin asking for one of (preferred first):

1. **Assign the "Application Developer" Entra ID role to `MohammedAziz.BenAmor@esprit.tn`** — smallest possible blast radius. Lets us run `az ad sp create-for-rbac` ourselves going forward.
2. **An admin-created service principal** named `pi-clouddoom-cicd` with `Contributor` on resource group `rg-piclouddoom`, JSON output sent securely.

Either way, paste the `--sdk-auth` JSON into the `AZURE_CREDENTIALS` GitHub repo secret, then uncomment the `workflow_run` block in `.github/workflows/deploy-aca.yml`.

### 5.4 Unblock plan (option B — federated OIDC, more secure)

Once permission is granted, prefer federated credentials over a long-lived secret:

```bash
APP_ID=$(az ad app create --display-name pi-clouddoom-cicd --query appId -o tsv)
az ad sp create --id "$APP_ID"
az role assignment create \
  --assignee "$APP_ID" \
  --role Contributor \
  --scope "/subscriptions/e8928eeb-5efe-4a65-b301-e5c99e492dee/resourceGroups/rg-piclouddoom"

# Federated credential for the main branch
az ad app federated-credential create --id "$APP_ID" --parameters '{
  "name": "github-main",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:Mohamed-Fedi-Hamrouni/Pi-CloudDOOM:ref:refs/heads/main",
  "audiences": ["api://AzureADTokenExchange"]
}'
```

Then add `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` as **non-secret** GitHub vars (or secrets) and switch `azure/login@v2` to:

```yaml
- uses: azure/login@v2
  with:
    client-id:       ${{ secrets.AZURE_CLIENT_ID }}
    tenant-id:       ${{ secrets.AZURE_TENANT_ID }}
    subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

This is the post-launch backlog item — `deploy-aca.yml` already requests `id-token: write`, so the migration is local to one step.

---

## 6. The deploy workflow — `.github/workflows/deploy-aca.yml`

Header comment in the file:

```
NOTE — Auto-trigger disabled (2026-05-11)

This workflow needs AZURE_CREDENTIALS, but the esprit.tn Entra ID tenant
admin must first grant the "Application Developer" role to create the
service principal …
```

Once the SP exists, the comment shows the exact `workflow_run` block to restore at the top.

### 6.1 Triggers

```yaml
on:
  workflow_dispatch:
    inputs:
      sha:
        description: "Commit SHA (full or 7-char). Blank = HEAD of ref."
        type: string
        required: false
      service:
        description: "Deploy only one AI service (blank = all)"
        type: choice
        required: false
        default: ""
        options:
          - ""
          - ai-training-path
          - kokoro
          - ollama
```

Three knobs:
- **`sha`** — deploy a specific commit (used for rollbacks).
- **`service`** — narrow to a single ACA app instead of the full matrix.
- **`branch`** (implicit via the workflow ref) — typically `main` or `deployment/hybrid-openstack-azure-vercel`.

The intended auto-trigger (once `AZURE_CREDENTIALS` is set):

```yaml
workflow_run:
  workflows: ["Build & Push images"]
  types: [completed]
  branches:
    - main
    - deployment/hybrid-openstack-azure-vercel
```

### 6.2 Concurrency

```yaml
concurrency:
  group: deploy-aca-prod
  cancel-in-progress: false
```

Never kill a deploy mid-flight. Two simultaneous dispatches queue.

### 6.3 Permissions

```yaml
permissions:
  contents: read
  id-token: write          # reserved for future federated-credential migration
```

`id-token: write` is unused today (we use the classic SP via `AZURE_CREDENTIALS`), but it's already wired so the federated-OIDC migration is one step away.

### 6.4 The `gate` job

```yaml
jobs:
  gate:
    name: precheck
    runs-on: ubuntu-latest
    if: >
      github.event_name == 'workflow_dispatch' ||
      (github.event_name == 'workflow_run' &&
       github.event.workflow_run.conclusion == 'success')
    outputs:
      sha:       ${{ steps.resolve.outputs.sha }}
      sha_short: ${{ steps.resolve.outputs.sha_short }}
    steps:
      - id: resolve
        run: |
          if [ "${{ github.event_name }}" = "workflow_run" ]; then
            sha="${{ github.event.workflow_run.head_sha }}"
          elif [ -n "${{ inputs.sha }}" ]; then
            sha="${{ inputs.sha }}"
          else
            sha="${{ github.sha }}"
          fi
          short="${sha:0:7}"
          echo "sha=$sha"          >> "$GITHUB_OUTPUT"
          echo "sha_short=$short"  >> "$GITHUB_OUTPUT"
```

Resolves the commit SHA in three priority orders: workflow_run > manual input > current ref. Outputs `sha` and `sha_short` (first 7 chars) for the matrix to consume — `sha_short` is the immutable image tag.

### 6.5 The `deploy` matrix

```yaml
deploy:
  name: aca-${{ matrix.app }}
  needs: gate
  runs-on: ubuntu-latest
  timeout-minutes: 15
  environment:
    name: production
  strategy:
    fail-fast: false
    matrix:
      include:
        - { source: ai-training-path, app: ai-training-path, image: docker.io/azizbna/pi-clouddoom-ai-training-path }
        - { source: kokoro,           app: kokoro,           image: docker.io/azizbna/pi-clouddoom-kokoro           }
        - { source: ollama-deploy,    app: ollama,           image: docker.io/azizbna/pi-clouddoom-ollama           }
```

Three parallel jobs, one per AI service. `fail-fast: false` means one broken service does not cancel the other two.

The `environment: production` ties this matrix to the repo's `production` GitHub Environment — required reviewers / restricted branches show up here.

### 6.6 Per-job steps

#### Step 1 — Single-service skip

```yaml
- name: Skip if single-service dispatch and not matched
  if: ${{ github.event_name == 'workflow_dispatch' && inputs.service != '' && inputs.service != matrix.app }}
  run: |
    echo "Skipped: dispatch targeted '${{ inputs.service }}', this job is '${{ matrix.app }}'."
    exit 0
```

Honors the `service:` `workflow_dispatch` input. If the user picked `kokoro`, the `ai-training-path` and `ollama` jobs no-op cleanly.

#### Step 2 — Checkout

```yaml
- uses: actions/checkout@v4
```

Needed mainly for context (`github.sha`) — the workflow does not consume any in-repo files.

#### Step 3 — Azure login

```yaml
- name: Azure login
  uses: azure/login@v2
  with:
    creds: ${{ secrets.AZURE_CREDENTIALS }}
```

Parses the `--sdk-auth` JSON and exports the env vars the `az` CLI needs (`AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`). Subsequent `az` commands authenticate transparently.

#### Step 4 — Resolve tag

```yaml
- name: Resolve tag
  id: tag
  run: |
    IMAGE_REF="${{ matrix.image }}:sha-${{ needs.gate.outputs.sha_short }}"
    echo "ref=$IMAGE_REF" >> "$GITHUB_OUTPUT"
    echo "rev=sha-${{ needs.gate.outputs.sha_short }}" >> "$GITHUB_OUTPUT"
```

Composes:
- **`ref`** = full image reference, e.g. `docker.io/azizbna/pi-clouddoom-ai-training-path:sha-f73b830`
- **`rev`** = ACA revision suffix, e.g. `sha-f73b830`. ACA revision suffixes must be 3–32 chars, lowercase alphanumerics + hyphen, which `sha-<7hex>` satisfies cleanly.

#### Step 5 — Log pre-update state

```yaml
- name: Pre-update state
  run: |
    az containerapp show \
      --name "${{ matrix.app }}" \
      --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
      --query "{name:name, image:properties.template.containers[0].image, latestRev:properties.latestRevisionName}" \
      -o table
```

Audit trail: what the container app looked like just before the change. Logged to the job output.

#### Step 6 — Update Container App image

```yaml
- name: Update Container App image
  run: |
    az containerapp update \
      --name "${{ matrix.app }}" \
      --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
      --image "${{ steps.tag.outputs.ref }}" \
      --revision-suffix "${{ steps.tag.outputs.rev }}" \
      --output none
    echo "Triggered revision: ${{ matrix.app }}--${{ steps.tag.outputs.rev }}"
```

**This is the core of the deploy.** `az containerapp update --image`:

- Creates a **new revision** of the Container App with the new image. The revision name is `<app>--<revision-suffix>`, e.g. `ai-training-path--sha-f73b830`.
- Because the apps are in **single-revision mode** (default), traffic flips to the new revision automatically once it becomes healthy. ACA does pod-level cutover with the configured probes.
- It does **not** change env vars, secrets, scale rules, ingress config, or any other property — only the image. Those are managed once (CLI / portal / Bicep in the future).

#### Step 7 — Health poll

```yaml
- name: Wait for new revision to be healthy
  run: |
    NEW_REV="${{ matrix.app }}--${{ steps.tag.outputs.rev }}"
    for i in $(seq 1 30); do
      STATE=$(az containerapp revision show \
        --name "${{ matrix.app }}" \
        --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
        --revision "$NEW_REV" \
        --query "properties.runningState" -o tsv 2>/dev/null || echo "Unknown")
      echo "Attempt $i — revision $NEW_REV state: $STATE"
      case "$STATE" in
        Running|RunningAtMaxScale) echo "Revision is healthy."; exit 0 ;;
        Failed|Degraded)           echo "::error::Revision unhealthy: $STATE"; exit 1 ;;
      esac
      sleep 10
    done
    echo "::error::Revision $NEW_REV did not reach Running within 5 minutes."
    exit 1
```

30 attempts × 10 s = 5 min budget. The poll watches `properties.runningState`. Outcomes:

| State | Decision |
|---|---|
| `Running` | success |
| `RunningAtMaxScale` | success (replicas at max — fine) |
| `Failed` | fail immediately, trigger rollback |
| `Degraded` | fail immediately, trigger rollback |
| anything else / `Unknown` | keep polling |
| Timeout (5 min elapsed) | fail, trigger rollback |

5 min is enough for `ai-training-path` (small) and `kokoro` (medium); `ollama` cold-starts in 1–2 min because the model is already in the image layer.

#### Step 8 — Auto-rollback on failure

```yaml
- name: Auto-rollback on failure
  if: failure()
  run: |
    echo "::warning::Rolling back ${{ matrix.app }} traffic to the previous revision."
    PREV_REV=$(az containerapp revision list \
      --name "${{ matrix.app }}" \
      --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
      --query "sort_by([?properties.runningState=='Running' && name!='${{ matrix.app }}--${{ steps.tag.outputs.rev }}'], &properties.createdTime)[-1].name" \
      -o tsv 2>/dev/null || true)
    if [ -n "$PREV_REV" ]; then
      echo "Switching traffic to $PREV_REV"
      az containerapp ingress traffic set \
        --name "${{ matrix.app }}" \
        --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
        --revision-weight "$PREV_REV=100" \
        --output none
    else
      echo "::warning::No previous healthy revision found — manual intervention needed."
    fi
```

If the health poll failed:

1. **List revisions** of the app, **filter** to those still in `Running` state, **exclude** the one we just broke, **sort by `createdTime`**, take the **newest** — that's `PREV_REV`.
2. **Shift 100% of traffic** back to `PREV_REV` via `az containerapp ingress traffic set --revision-weight <prev>=100`. ACA does this atomically.
3. If no prior `Running` revision exists, warn and bail — manual intervention required (this would only happen on a brand-new app with one broken revision).

The bad revision **stays in ACA** (immutable history) but no longer serves traffic. Image is still in DockerHub.

#### Step 9 — Deploy summary

```yaml
- name: Deploy summary
  if: always()
  run: |
    {
      echo "## ${{ matrix.app }}"
      echo "- Image: \`${{ steps.tag.outputs.ref }}\`"
      echo "- New revision: \`${{ matrix.app }}--${{ steps.tag.outputs.rev }}\`"
      echo ""
      az containerapp show \
        --name "${{ matrix.app }}" \
        --resource-group "${{ secrets.AZURE_RESOURCE_GROUP }}" \
        --query "{latestRev:properties.latestRevisionName, fqdn:properties.configuration.ingress.fqdn}" \
        -o table 2>&1 || echo "(post-deploy show failed)"
    } >> "$GITHUB_STEP_SUMMARY"
```

Writes the image, new revision name, and live FQDN into the job's step summary so a reviewer doesn't need to read 600 lines of CLI output.

### 6.7 The aggregate gate

```yaml
deploy-summary:
  name: deploy-summary
  needs: deploy
  runs-on: ubuntu-latest
  if: always()
  steps:
    - run: |
        result='${{ needs.deploy.result }}'
        echo "Matrix result: $result"
        [ "$result" = "failure" ] && exit 1 || echo "All ACA deploys succeeded."
```

One pass/fail check that can be wired to branch protection. `failure` if any of the three matrix legs failed.

---

## 7. The laptop fallback — `scripts/deploy-aca.sh`

Used while `AZURE_CREDENTIALS` is blocked by Entra ID. Lives at the repo root in `scripts/deploy-aca.sh`. Authenticates as the **developer's own Azure identity** (`az login`) which has `Contributor` on `rg-piclouddoom`.

### 7.1 Usage

```bash
bash scripts/deploy-aca.sh                       # all 3 apps @ current git HEAD
bash scripts/deploy-aca.sh <sha>                 # all 3 @ specific sha
bash scripts/deploy-aca.sh <sha> <app-name>      # single app
                                                 # app-name ∈ {ai-training-path, kokoro, ollama}
```

### 7.2 Environment overrides

```bash
RG=rg-piclouddoom            # resource group (default)
REGISTRY=docker.io/azizbna   # image registry namespace (default)
IMAGE_PREFIX=pi-clouddoom    # image name prefix (default)
```

### 7.3 What it does (same as the workflow)

1. Pre-flight: `command -v az`, `az account show`.
2. For each app in `{ai-training-path, kokoro, ollama}` (or just the one you passed):
   - `az containerapp show ...` — log pre-update state.
   - `az containerapp update --image <ref>:sha-<short> --revision-suffix sha-<short>` — push new revision.
   - Poll `properties.runningState` 30 × 10 s. Success on `Running` / `RunningAtMaxScale`, fail on `Failed` / `Degraded` / timeout.
3. Aggregate failure count, exit non-zero if any failed.

Bash 3.2-compatible (macOS ships with that old version), no associative arrays — uses a case statement for app → image mapping.

### 7.4 Example session

```
$ bash scripts/deploy-aca.sh f73b830 kokoro
Sub: Visual Studio Professional Subscription  User: aziz@example.com

═══ kokoro → docker.io/azizbna/pi-clouddoom-kokoro:sha-f73b830 ═══
Name    LatestRev               Image
------  ----------------------- -----------------------------------------------------------
kokoro  kokoro--sha-372ed81     docker.io/azizbna/pi-clouddoom-kokoro:sha-372ed81

Triggered revision: kokoro--sha-f73b830
  [1/30] state=Provisioning
  [2/30] state=Provisioning
  [3/30] state=Running
  ✓ healthy

✅ All ACA deploys healthy.
```

---

## 8. Required GitHub secrets / vars

| Name | Used by | Value | How to create |
|---|---|---|---|
| `AZURE_CREDENTIALS` | `deploy-aca.yml` | Full `--sdk-auth` JSON | `az ad sp create-for-rbac --name pi-clouddoom-cicd --role Contributor --scopes /subscriptions/<sub>/resourceGroups/rg-piclouddoom --sdk-auth` |
| `AZURE_RESOURCE_GROUP` | `deploy-aca.yml` | `rg-piclouddoom` (plain string) | Stored as secret by choice — it's not sensitive |
| `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` | `build-and-push.yml` (which produces the images ACA pulls) | DockerHub R/W/D token | https://hub.docker.com/settings/security |

(No `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID` today — those would only be needed after the federated-OIDC migration.)

---

## 9. All Azure CLI commands used in this project

Grouped by phase.

### 9.1 One-time bootstrap (manual, outside CI)

```bash
# Resource group
az group create -n rg-piclouddoom -l francecentral

# Container Apps environment (Log Analytics workspace + Consumption profile)
az containerapp env create \
  --name pi-clouddoom-env \
  --resource-group rg-piclouddoom \
  --location francecentral

# Each Container App created once with initial image; subsequent updates only change the image
az containerapp create \
  --name ai-training-path \
  --resource-group rg-piclouddoom \
  --environment pi-clouddoom-env \
  --image docker.io/azizbna/pi-clouddoom-ai-training-path:latest \
  --target-port 8000 \
  --ingress external \
  --cpu 0.5 --memory 1.0Gi \
  --min-replicas 0 --max-replicas 3

az containerapp create \
  --name kokoro \
  --resource-group rg-piclouddoom \
  --environment pi-clouddoom-env \
  --image docker.io/azizbna/pi-clouddoom-kokoro:latest \
  --target-port 8880 \
  --ingress external \
  --cpu 1.0 --memory 2.0Gi \
  --min-replicas 0 --max-replicas 2

az containerapp create \
  --name ollama \
  --resource-group rg-piclouddoom \
  --environment pi-clouddoom-env \
  --image docker.io/azizbna/pi-clouddoom-ollama:latest \
  --target-port 11434 \
  --ingress external \
  --cpu 2.0 --memory 4.0Gi \
  --min-replicas 0 --max-replicas 2

# whisper — third-party image, not built by us
az containerapp create \
  --name whisper \
  --resource-group rg-piclouddoom \
  --environment pi-clouddoom-env \
  --image fedirz/faster-whisper-server:latest-cpu \
  --target-port 8000 \
  --ingress external \
  --cpu 1.0 --memory 2.0Gi \
  --min-replicas 0 --max-replicas 2
```

(Exact CPU / memory / replica numbers reflect the as-deployed config — not stored in IaC today; migration to Bicep is on the backlog.)

### 9.2 Identity (intended once Entra ID unblocks)

```bash
az ad sp create-for-rbac \
  --name "pi-clouddoom-cicd" \
  --role "Contributor" \
  --scopes "/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/rg-piclouddoom" \
  --sdk-auth
```

Paste the JSON into GitHub secret `AZURE_CREDENTIALS`.

### 9.3 Per-deploy (run by CI or `scripts/deploy-aca.sh`)

```bash
# Pre-state
az containerapp show \
  --name <app> --resource-group rg-piclouddoom \
  --query "{name:name, image:properties.template.containers[0].image, latestRev:properties.latestRevisionName}" \
  -o table

# Push new revision (image-only)
az containerapp update \
  --name <app> \
  --resource-group rg-piclouddoom \
  --image docker.io/azizbna/pi-clouddoom-<svc>:sha-<short> \
  --revision-suffix sha-<short> \
  --output none

# Poll
az containerapp revision show \
  --name <app> --resource-group rg-piclouddoom \
  --revision <app>--sha-<short> \
  --query "properties.runningState" -o tsv

# Post-state (for the step summary)
az containerapp show \
  --name <app> --resource-group rg-piclouddoom \
  --query "{latestRev:properties.latestRevisionName, fqdn:properties.configuration.ingress.fqdn}" \
  -o table
```

### 9.4 Rollback / traffic shifting

```bash
# Find newest healthy non-broken revision
az containerapp revision list \
  --name <app> --resource-group rg-piclouddoom \
  --query "sort_by([?properties.runningState=='Running' && name!='<broken-revision>'], &properties.createdTime)[-1].name" \
  -o tsv

# Swing 100% traffic
az containerapp ingress traffic set \
  --name <app> --resource-group rg-piclouddoom \
  --revision-weight "<prev-revision>=100" \
  --output none
```

For a percentage canary instead of a hard cut, switch the app to multi-revision mode first:

```bash
az containerapp revision set-mode --mode multiple \
  --name <app> --resource-group rg-piclouddoom
```

(Today we run **single-revision** mode — every deploy is a hard cutover with the auto-rollback safety net above. Multi-revision canary is post-launch backlog.)

### 9.5 Env var / secret management (manual today, not in CI)

```bash
# Add or update a non-secret env var
az containerapp update \
  --name <app> --resource-group rg-piclouddoom \
  --set-env-vars KEY=value

# Add or update a secret-backed env var
az containerapp secret set \
  --name <app> --resource-group rg-piclouddoom \
  --secrets groq-api-key=<value>

# Then reference it from the env
az containerapp update \
  --name <app> --resource-group rg-piclouddoom \
  --set-env-vars GROQ_API_KEY=secretref:groq-api-key
```

Why CI doesn't manage env vars: `az containerapp update --image` only changes the image. Env vars and secrets are owned out-of-band so the deploy workflow has the minimum write surface. **Backlog:** migrate the ACA topology (envs, secrets, scale rules) to Bicep so it lives in source.

### 9.6 Operational queries (any developer)

```bash
# All revisions of an app
az containerapp revision list -n ai-training-path -g rg-piclouddoom -o table

# Logs from the current revision
az containerapp logs show -n ai-training-path -g rg-piclouddoom --follow --tail 200

# Reach out to the FQDN
curl -s https://ai-training-path.yellowocean-356174e3.francecentral.azurecontainerapps.io/health
```

---

## 10. Rollback semantics

Three layers of safety, all automated except the last:

| Layer | Trigger | Action |
|---|---|---|
| Health poll | New revision goes `Failed` / `Degraded` / never reaches `Running` in 5 min | Workflow step exits non-zero |
| Auto-rollback step | The above happens (`if: failure()`) | `az containerapp ingress traffic set --revision-weight <prev>=100` swings traffic back to the newest healthy revision (≠ broken one). Bad revision stays in history. |
| Manual rollback | A revision is broken and rollback failed (no prior healthy rev) | Operator runs `az containerapp ingress traffic set` by hand, or `az containerapp update --image <known-good>` |

The rollback is **traffic-shift**, not redeploy — because ACA revisions are immutable. The old "good" revision is right there, just needs to be re-selected.

---

## 11. Cost / scaling model

ACA Consumption plan:

- **Pay per second of active CPU and provisioned memory** while the container is serving (or scaling).
- **Pay per million invocations** (HTTP requests).
- **Free 180 000 vCPU-seconds + 360 000 GiB-seconds + 2 M invocations / month** per resource (subject to Azure's free tier — verify before relying on it).

Scale-to-zero is what makes this affordable. The training-path predictor is idle 95% of the time; ACA spins it down to zero replicas during idle periods and back up on the first request. First request after idle pays a cold-start cost (1–2 min for `ollama`, ~10–30 s for `ai-training-path` and `kokoro`).

Cold-start mitigation:
- `ollama` bakes the model into the image → no model download at start.
- `kokoro` preloads spaCy `en_core_web_sm` → no model download at start.
- `kokoro`'s startup watchdog is patched 300 → 1200 s so a slow CPU boot doesn't kill the container.
- For services that need warm 24/7: bump `--min-replicas 1` per app (post-launch backlog).

---

## 12. Observability on Azure

- **Logs:** `az containerapp logs show -n <app> -g rg-piclouddoom --follow` — streamed from the Log Analytics workspace attached to the Container Apps environment.
- **Per-revision history:** Azure Portal → Container App → Revisions → click any revision to see its config + replica list.
- **Step summaries:** Each `deploy-aca.yml` job writes `## <app>` + image + new revision + post-deploy FQDN to `$GITHUB_STEP_SUMMARY`.
- **No Prometheus integration today** — the AI services are not scraped by the in-cluster kube-prometheus-stack. Backlog: add ACA → Azure Monitor → remote-write into Prometheus, or a sidecar exporter.

---

## 13. Networking / ingress

- **Each ACA app has external ingress** with an auto-managed Azure-issued cert on `<app>.yellowocean-356174e3.francecentral.azurecontainerapps.io`.
- **Spring services talk to ACA over the public internet** (`AI_TRAINING_PATH_URL`, `OLLAMA_URL`, `KOKORO_URL`, `WHISPER_BASE_URL` in `app-config` ConfigMap point at the FQDN above).
- **No private VNet / private link today** — works because the AI APIs themselves don't carry sensitive PII (only profile vectors / audio chunks during a session). Backlog: VNet-integrated ACA environment for stricter isolation.

---

## 14. Anatomy of one Azure deploy (end-to-end)

```
1.  Developer pushes a commit to deployment/hybrid-openstack-azure-vercel.

2.  ci.yml (per-service CI) passes for the changed AI service.

3.  build-and-push.yml fires:
    - The relevant matrix leg builds the AI service image.
    - Trivy scan (report-only day-1).
    - Cosign keyless OIDC signing.
    - Push to docker.io/azizbna/pi-clouddoom-<svc>:sha-<short> + branch + (if main) latest.

4.  build-and-push.yml succeeds.

5.  Today (Azure SP blocked):
      Developer runs `bash scripts/deploy-aca.sh <sha>` from a laptop.
    After the SP is provisioned and workflow_run is restored:
      deploy-aca.yml auto-fires on workflow_run.

6.  gate job resolves sha + sha_short (7-char).

7.  The deploy matrix runs 3 jobs in parallel:
    - azure/login@v2 with AZURE_CREDENTIALS
    - az containerapp show ... (log pre-state)
    - az containerapp update --image <ref>:sha-<short> --revision-suffix sha-<short>
    - Poll properties.runningState every 10s (up to 5 min)
    - Success: revision is Running / RunningAtMaxScale
    - Failure: az containerapp ingress traffic set back to newest healthy prev revision
    - Write step summary with image + new revision + FQDN

8.  deploy-summary aggregates the matrix result.

9.  Done. Spring services running on OpenStack immediately start using the new revision
    via their ConfigMap URLs — no in-cluster change needed.
```

---

## 15. Why we do not use Azure Container Registry (ACR)

We deliberately stay on **DockerHub** because:

- All 10 images are public — anyone (including ACA) can pull them without auth.
- One registry for the whole platform (OpenStack pulls from the same place as ACA).
- No `imagePullSecret` to provision in ACA or in K8s.
- Free for our usage.

Migrating to ACR would be one Bicep template + an `--registry-server` flag on the create commands, and would gain us private images and Microsoft Defender for Containers integration. Backlog.

---

## 16. Day-1 known limitations / backlog

1. **Auto-trigger disabled** — `workflow_run` block commented out pending `AZURE_CREDENTIALS`. Today, ACA deploys run from a laptop via `scripts/deploy-aca.sh`.
2. **Service principal will expire** annually if/when created — migrate to **federated OIDC** as soon as possible. The workflow already requests `id-token: write`.
3. **ACA topology is not in source control** — env vars, secrets, scale rules, ingress config are all set by hand. Migrate to **Bicep** so the apps' shape is reviewable + reproducible.
4. **No private networking** — ACA apps have public ingress. Adding a VNet-integrated environment is on the backlog for stricter isolation.
5. **No multi-revision canary** — every deploy is a hard cutover. Switch to multi-revision mode + weighted traffic split for safer rollouts.
6. **No Azure Monitor → Prometheus federation** — the in-cluster Grafana sees nothing about ACA workloads today.
7. **Smoke tests do not yet cover ACA** — the OpenStack smoke script (`scripts/smoke.sh`) only checks the 7 Spring services. Extend to curl each ACA FQDN's `/health` post-deploy.
8. **Ollama cold start (1–2 min)** is fine for interview kickoff but bad for community-service chat snippets — consider `--min-replicas 1` for `ollama`.

---

## 17. Operational runbook (cheat-sheet)

### 17.1 Deploy all 3 AI services from the laptop

```bash
az login
az account set --subscription <SUBSCRIPTION_ID>
bash scripts/deploy-aca.sh
```

### 17.2 Deploy a specific commit

```bash
bash scripts/deploy-aca.sh 372ed81
```

### 17.3 Deploy only one service

```bash
bash scripts/deploy-aca.sh 372ed81 ollama
```

### 17.4 Inspect the current state

```bash
az containerapp show -n ai-training-path -g rg-piclouddoom -o table
az containerapp revision list -n ai-training-path -g rg-piclouddoom -o table
```

### 17.5 Tail live logs

```bash
az containerapp logs show -n ollama -g rg-piclouddoom --follow --tail 200
```

### 17.6 Manual rollback to a specific revision

```bash
az containerapp ingress traffic set \
  --name <app> --resource-group rg-piclouddoom \
  --revision-weight "<app>--sha-<old-short>=100"
```

### 17.7 Hit the live API

```bash
# Sanity
curl -s https://ai-training-path.yellowocean-356174e3.francecentral.azurecontainerapps.io/health

# Predict
curl -s -X POST \
  https://ai-training-path.yellowocean-356174e3.francecentral.azurecontainerapps.io/predict-path \
  -H "Content-Type: application/json" \
  -d '{"globalScore": 72, "preparationLevel": "intermediate", "totalSessionsCompleted": 4}'
```

### 17.8 Trigger the workflow once `AZURE_CREDENTIALS` is set

GitHub → Actions → "Deploy — Azure Container Apps" → Run workflow:
- branch: `main` (or `deployment/hybrid-openstack-azure-vercel`)
- `sha`: optional, blank = HEAD
- `service`: optional, blank = all three

---

## 18. Summary table

| Concern | How Azure handles it |
|---|---|
| What runs on Azure | 3 AI Container Apps we built (`ai-training-path`, `kokoro`, `ollama`) + 1 third-party (`whisper`) |
| Compute product | Azure Container Apps (Consumption plan, scale-to-zero) |
| Region | France Central |
| Resource group | `rg-piclouddoom` (Contributor-scoped SP) |
| Image source | DockerHub (`docker.io/azizbna/pi-clouddoom-*`), public — no pull secret |
| Image tag pinned in deploy | `sha-<7-char>` — immutable per commit |
| Deploy core command | `az containerapp update --image <ref>:sha-<short> --revision-suffix sha-<short>` |
| Health gate | Poll `properties.runningState` 30 × 10 s |
| Rollback | `az containerapp ingress traffic set --revision-weight <prev>=100` — automatic on health-poll failure |
| Authentication | `AZURE_CREDENTIALS` GitHub secret (`--sdk-auth` JSON) — blocked today by Entra ID; laptop fallback via `scripts/deploy-aca.sh` |
| CI workflow | `.github/workflows/deploy-aca.yml` (3-leg matrix, `fail-fast: false`) |
| Concurrency | `deploy-aca-prod`, never cancel mid-flight |
| GitHub Environment | `production` (allows required reviewers) |
| Manual fallback | `bash scripts/deploy-aca.sh [sha] [app]` from a laptop |
| Cost model | Pay per active CPU-second + provisioned memory + invocations |
| Source of truth (today) | The CLI commands above + the workflow YAML — ACA topology not yet in Bicep (backlog) |

That is the full Azure surface area of Pi-CloudDOOM: one workflow, one helper script, three images, four Container Apps, two secrets, scale-to-zero economics.
