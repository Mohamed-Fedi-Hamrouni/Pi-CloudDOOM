# Pi-CloudDOOM — CI/CD Pipeline Report

**Repo:** https://github.com/Mohamed-Fedi-Hamrouni/Pi-CloudDOOM
**Workflows:** `.github/workflows/` (13 files)
**Docs:** `docs/cicd/` (step-00 through step-08 + this report)

---

## 1. Goal

Every commit follows a single, automated path from `git push` to live production:

```
git push ─► CI (lint/test/build) ─► Build & sign images ─► Deploy to 3 planes ─► Smoke ─► Done
                       │                       │                     │
                       └─► Code scanning, IaC scan, secret scan, dependency PRs
```

Zero manual `kubectl`, `az containerapp`, or `vercel deploy` invocations in the normal flow. All deploys are auditable in the Actions tab and reversible via `workflow_dispatch`.

---

## 2. Pipeline architecture

```
                                            ┌────────────────────────────────┐
PR opened ───► CI per-service ──────────────┤ paths-filter → reusable wfs    │
              CodeQL · IaC scan · Gitleaks  └────────────────────────────────┘
              └────► Vercel preview URL on PR (sticky comment)

Merge to main / push to deployment/** ─────────────────────────────────────
                          │
                          ▼
          ┌─────────────────────────────────────┐
          │ Build & Push images (matrix × 10)    │
          │ Buildx + GHA cache → DockerHub       │
          │ Trivy scan (report-only day-1)       │
          │ Cosign keyless signing (OIDC)        │
          │ Tags: sha-<short>, branch, latest    │
          └────────┬─────────────────┬──────────┘
                   │                 │
        ┌──────────┘                 └──────────┐
        ▼                                       ▼
┌──────────────────────────┐         ┌──────────────────────────┐
│ Deploy — OpenStack K8s   │         │ Deploy — Azure ACA       │
│ matrix × 7 Spring svcs   │         │ matrix × 3 AI svcs       │
│ kubectl set image …      │         │ az containerapp update … │
│ rollout status (10m)     │         │ revision health poll     │
│ → Smoke test (in-cluster)│         │ → auto-rollback if Failed│
│ → Auto-rollback on red   │         │                          │
└──────────────────────────┘         └──────────────────────────┘

        Push to main (frontend/**) ──► Vercel — Production
                                       prod URL: https://interviewprep-tn.me
```

---

## 3. Workflow index (13 files)

| File | Trigger | Purpose |
|---|---|---|
| `ci.yml` | PR + push to `main`, `deployment/**` | Orchestrator — paths-filter then dispatch to reusable per-service CI workflows. Ends in `ci-summary` aggregate gate. |
| `ci-spring-service.yml` | reusable | Maven `verify -DskipITs` per Spring service. Uploads Surefire reports on failure. |
| `ci-python-service.yml` | reusable | `pip install` + `compileall` + `import app` smoke + pytest if tests exist. |
| `ci-frontend.yml` | reusable | `npm ci` + `ng build --configuration production`. Uploads dist on `main`. |
| `build-and-push.yml` | push to `main`/`deployment/**`, tags `v*.*.*`, manual | Matrix builds 10 images, Trivy scan, Cosign keyless sign, push to DockerHub. |
| `deploy-k8s.yml` | `workflow_run` after build (auto-fires on success), manual | Rolls 7 Spring services into `piclouddoom` (or `piclouddoom-dev`) + smoke + rollback. |
| `deploy-aca.yml` | manual (auto-trigger disabled pending Azure SP) | Rolls 3 AI services into Azure Container Apps + health poll + traffic-shift rollback. |
| `vercel-preview.yml` | PR touching `frontend/**` | Preview deploy + sticky PR comment with URL. |
| `vercel-prod.yml` | push to `main` touching `frontend/**` | Production deploy + 5× retry smoke check. |
| `codeql.yml` | PR + push + Monday 05:00 UTC | SAST across `java-kotlin`, `javascript-typescript`, `python`, `actions`. |
| `iac-scan.yml` | PR + push to `k8s/**` or `infra/**` | Trivy config + kube-linter on manifests (report-only). |
| `gitleaks.yml` | PR + push + Monday 05:30 UTC | Full-history secret scan with `fetch-depth: 0`. |
| `dependabot.yml` | scheduled | Weekly grouped dep PRs (Maven × 7, npm, pip, Docker × 11, GitHub Actions). |

---

## 4. Continuous Integration (CI)

### 4.1 Smart per-service CI — `ci.yml`

The orchestrator uses **`dorny/paths-filter@v3`** to compute, per PR/push, which folders changed and only fires the relevant per-service jobs:

```yaml
changes:
  steps:
    - uses: dorny/paths-filter@v3
      with:
        filters: |
          user:       ['user-service/**']
          interview:  ['interview-service/**']
          training:   ['training-service/**']
          mentorship: ['mentorship-service/**']
          quiz:       ['quiz-service/**']
          community:  ['community-service/**']
          resource:   ['resource-service/**']
          ai:         ['ai-training-path/**']
          frontend:   ['frontend/**']
```

Each filter output gates a downstream job that calls a **reusable workflow** with the right parameters:

- Spring services → `ci-spring-service.yml` (Java 21 default; `quiz-service` overrides to Java 17 because it still runs Spring Boot 3.4.1).
- `ai-training-path` → `ci-python-service.yml` (Python 3.12).
- `frontend` → `ci-frontend.yml` (Node 20).

### 4.2 Why reusable workflows?

Three reusable workflows (one per language family) keep CI logic in **one place** and the orchestrator dead simple. Adding a new Spring service is just two lines in `ci.yml`. Java version, service folder, and (for Python) python version are passed as `with:` inputs.

### 4.3 Aggregate gate — `ci-summary`

A single job depends on **all** per-service jobs (`needs: [user, interview, training, mentorship, quiz, community, resource, ai, frontend, changes]`) and uses Python to inspect the `needs` JSON, failing only if any required job ended in `failure`. This is the single status check we wire into branch protection — reviewers don't have to tick 9 boxes.

### 4.4 What each per-service CI does

| File | Stack | Steps |
|---|---|---|
| `ci-spring-service.yml` | Java | `setup-java` (Temurin, Maven cache) → `mvn -B -ntp -DskipITs verify` → upload Surefire reports on failure |
| `ci-python-service.yml` | Python | `setup-python` (pip cache) → `pip install -r requirements.txt` → `python -m compileall -q .` → `python -c "import app"` → `pytest` if tests exist |
| `ci-frontend.yml` | Node | `setup-node` (npm cache) → `npm ci --no-audit --no-fund` → `npx ng build --configuration production` → upload dist artifact on `main` |

### 4.5 Concurrency

`concurrency.group: ci-${{ github.workflow }}-${{ github.ref }}` with `cancel-in-progress: true` — pushing 3 commits in 10 seconds keeps only the latest run.

---

## 5. Image build, scan, sign, push — `build-and-push.yml`

### 5.1 Triggers

- Push to `main` or `deployment/**`.
- `v*.*.*` git tag.
- `workflow_dispatch` (manual; optional `service:` input to build one).
- **`paths-ignore`** skips builds for doc-only, frontend-only, and `.github/**` changes.

### 5.2 The matrix (10 jobs)

```yaml
matrix:
  include:
    - { service: user-service,       image: azizbna/pi-clouddoom-user-service       }
    - { service: interview-service,  image: azizbna/pi-clouddoom-interview-service  }
    - { service: training-service,   image: azizbna/pi-clouddoom-training-service   }
    - { service: mentorship-service, image: azizbna/pi-clouddoom-mentorship-service }
    - { service: quiz-service,       image: azizbna/pi-clouddoom-quiz-service       }
    - { service: community-service,  image: azizbna/pi-clouddoom-community-service  }
    - { service: resource-service,   image: azizbna/pi-clouddoom-resource-service   }
    - { service: ai-training-path,   image: azizbna/pi-clouddoom-ai-training-path   }
    - { service: kokoro,             image: azizbna/pi-clouddoom-kokoro             }
    - { service: ollama-deploy,      image: azizbna/pi-clouddoom-ollama             }
```

`fail-fast: false` → one broken service doesn't sink the other 9.

### 5.3 Per-job steps

1. **Skip-if-not-matched** — supports the single-service `workflow_dispatch` `service:` input.
2. **`docker/setup-buildx-action@v3`** — BuildKit + multi-platform readiness.
3. **`docker/login-action@v3`** with `DOCKERHUB_USERNAME` + `DOCKERHUB_TOKEN`.
4. **`docker/metadata-action@v5`** — generates the full tag set:
   ```yaml
   tags: |
     type=sha,prefix=sha-,format=short
     type=ref,event=branch
     type=ref,event=tag
     type=semver,pattern={{version}}
     type=raw,value=latest,enable={{is_default_branch}}
   ```
5. **`docker/build-push-action@v6`**:
   - `context: ./<service>`
   - `provenance: mode=max` → SLSA build provenance attached.
   - `sbom: true` → SBOM attached.
   - `cache-from: type=gha,scope=<service>` / `cache-to: ...,mode=max` → per-service GHA cache (≈30s for unchanged builds).
6. **`aquasecurity/trivy-action@v0.36.0`** — scans the just-built image by digest:
   - `severity: CRITICAL,HIGH`, `ignore-unfixed: true`.
   - `exit-code: "0"` (report-only day-1; flip to `"1"` after backlog triage).
   - SARIF uploaded as artifact.
7. **`sigstore/cosign-installer@v3` → `cosign sign --yes`** — keyless OIDC signing. No private key.
8. **Step summary** — image, digest, and tag list in the GitHub Actions step summary.

### 5.4 Aggregate gate — `summary` job

Single job depends on the matrix; fails if any service build failed. Hooks into branch protection.

---

## 6. Backend deploy — `deploy-k8s.yml`

### 6.1 Triggers

- **`workflow_run`** on `Build & Push images` completing successfully on `main` or `deployment/hybrid-openstack-azure-vercel`. Auto-fires; never on a failed build (the `gate` job checks `conclusion == 'success'`).
- **`workflow_dispatch`** with inputs:
  - `environment` (choice: `dev`, `prod`)
  - `sha` (optional — for rolling back to a specific commit)
  - `service` (optional — deploy only one of the 7)

### 6.2 The `gate` job

Resolves three things from the trigger:
- **SHA**: from `workflow_run.head_sha` or manual input → `sha-<7-char>`.
- **Environment**: `workflow_run` → always `prod`; `workflow_dispatch` → user-selected.
- **Namespace**: `piclouddoom` (prod) / `piclouddoom-dev` (dev).

These outputs feed the matrix.

### 6.3 The `deploy` matrix (7 jobs)

Per Spring service:

1. **Skip-if-not-matched** (single-service dispatch).
2. **`azure/setup-kubectl@v4`** pinned to `v1.29.15` (matches cluster).
3. **Configure kubeconfig** from `KUBECONFIG_PROD` or `KUBECONFIG_DEV` secret based on `gate.outputs.environment`.
4. **`kubectl set image deployment/<svc> <svc>=<registry>:sha-<short> --record=false`**.
5. **`kubectl rollout status deployment/<svc> --timeout=10m`** (bumped from 5 m → 10 m; `resource-service` JVM warmup measured at ~142 s, the original 5-min budget was too tight once readiness + dependency probes stacked).
6. **On rollout failure**: dumps `describe deployment/<svc>`, `get pods -l app=<svc>`, and last 80 log lines per pod for the audit log.
7. **Auto-rollback**: `kubectl rollout undo deployment/<svc>` + re-wait 3 min.
8. **Step summary**: image pinned, rollout exit code, pod listing.

The job attaches to a **GitHub Environment** (`production` for prod, `dev` for dev) — letting us put required reviewers on prod from the repo settings UI without touching YAML.

### 6.4 The `smoke` job

After the matrix succeeds:

1. Re-configures kubeconfig (each job runs on a fresh runner).
2. Runs `bash scripts/smoke.sh --kubeconfig=$HOME/.kube/config --namespace=<ns>`.

`smoke.sh` has **two modes**:
- **HTTP** (default): `curl $BASE_URL/actuator/health` for each of the 7 services. Tests the full Cloudflared → Traefik → Service path.
- **kubectl** (`--kubeconfig + --namespace`): `kubectl wait --for=condition=Available --timeout=Ns deployment/<svc>` + verifies `status.readyReplicas >= 1`. Used by CI because the Spring containers run on `eclipse-temurin:21-jre` (no curl). `Available=True` exactly means the manifest's readiness probe (httpGet `/actuator/health`) is passing — same validation, no in-container curl.

### 6.5 Smoke-fail → namespace-wide rollback

If smoke fails, an `if: failure()` step rolls back **all 7 services**, then re-waits each to converge. The bad image stays in the registry (immutable) but is no longer pinned to any deployment.

### 6.6 Aggregate gate

`deploy-summary` checks `deploy.result` AND `smoke.result` — both must be green.

### 6.7 Concurrency

`group: deploy-k8s-${{ inputs.environment || 'prod' }}` with `cancel-in-progress: false` — never kill a rollout mid-flight, but dev and prod can deploy simultaneously.

---

## 7. AI deploy — `deploy-aca.yml`

### 7.1 Trigger note

`workflow_run` auto-trigger is **commented out** (header note in the file, decided 2026-05-11) because `AZURE_CREDENTIALS` can't be created until the esprit.tn Entra ID admin grants the *Application Developer* role. Until then:
- Workflow runs only via `workflow_dispatch` (manual).
- `scripts/deploy-aca.sh` is the laptop fallback — same logic, run with a developer's `az login`. Once the SP exists, uncomment the `workflow_run` block and CI takes over.

### 7.2 The matrix (3 jobs)

| Source | ACA app | Image |
|---|---|---|
| `ai-training-path/` | `ai-training-path` | `docker.io/azizbna/pi-clouddoom-ai-training-path` |
| `kokoro/` | `kokoro` | `docker.io/azizbna/pi-clouddoom-kokoro` |
| `ollama-deploy/` | `ollama` | `docker.io/azizbna/pi-clouddoom-ollama` |

> **`whisper` not in the matrix** — uses third-party `fedirz/faster-whisper-server:latest-cpu`, we don't build it.

### 7.3 Per-job steps

1. **`azure/login@v2`** with `AZURE_CREDENTIALS` JSON.
2. **`az containerapp show`** — log pre-update state (image, latestRev).
3. **`az containerapp update --image <ref>:sha-<short> --revision-suffix sha-<short>`** — creates a new revision.
4. **Health poll** (30 × 10 s = 5 min max) of `properties.runningState`:
   - `Running` / `RunningAtMaxScale` → success.
   - `Failed` / `Degraded` → exit 1.
   - Timeout → exit 1.
5. **Auto-rollback** (`if: failure()`):
   ```bash
   PREV_REV=$(az containerapp revision list ... \
     --query "sort_by([?properties.runningState=='Running' && name!='<broken>'], &properties.createdTime)[-1].name" -o tsv)
   az containerapp ingress traffic set ... --revision-weight "$PREV_REV=100"
   ```
6. **Step summary** with image + revision name + post-deploy fqdn.

### 7.4 Concurrency

`group: deploy-aca-prod` with `cancel-in-progress: false`.

---

## 8. Frontend deploys — `vercel-preview.yml` + `vercel-prod.yml`

### 8.1 Preview (`vercel-preview.yml`)

- Trigger: PR touching `frontend/**`, `vercel.json`, `.vercel/**`, `.vercelignore`, or the workflow file itself.
- Steps: install Node 20, `npm i -g vercel@latest`, `vercel pull --environment=preview`, `vercel build`, `vercel deploy --prebuilt`, **sticky PR comment** with the preview URL via `marocchino/sticky-pull-request-comment@v2`.
- Concurrency keyed on PR number → 3 commits in a row only keep the latest preview.

### 8.2 Production (`vercel-prod.yml`)

- Trigger: push to `main` touching the same paths, or `workflow_dispatch`.
- Steps: same flow with `--environment=production` + `--prod` flags.
- **Post-deploy smoke**: `curl https://interviewprep-tn.me` 5× with 10 s retries. Job fails on no-200; the existing prod deployment continues serving (Vercel won't replace until new is live).
- Attached to GitHub Environment `production` with `url: https://interviewprep-tn.me`.
- `cancel-in-progress: false` — never kill a prod deploy mid-flight.

### 8.3 Public env vars (in YAML, not secrets)

```yaml
VERCEL_ORG_ID:     team_tQYcRewNfvSBGAbsE6wJwcop
VERCEL_PROJECT_ID: prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL
```

Already public in the committed `.vercel/project.json` — not sensitive.

---

## 9. Security gates

### 9.1 CodeQL — `codeql.yml`

- **4 parallel analyses** in a matrix: `java-kotlin`, `javascript-typescript`, `python`, `actions`.
- Queries: `security-extended,security-and-quality` (broader than default).
- For Java: `autobuild` then `mvn -B -ntp -DskipTests package` in `user-service/` (representative Spring service with tests, on Java 21).
- Schedule: PR + push + `cron: "0 5 * * 1"` (Mondays 05:00 UTC) — catches newly-disclosed CVE patterns against the old code.
- Findings → GitHub **Security → Code scanning alerts**.

### 9.2 IaC scan — `iac-scan.yml`

Two complementary tools:

| Tool | Strength |
|---|---|
| **Trivy `config`** | K8s anti-patterns (missing limits, `:latest` tags, privileged containers, hostPath, …), Heat / Terraform / Dockerfile checks |
| **kube-linter** | Production-readiness (probes, replica count, anti-affinity, PDBs) |

Both upload SARIF to GitHub code-scanning under their own categories (`trivy-k8s`, `trivy-infra`, `kube-linter`). **Report-only** for day-1 (`exit-code: "0"` on Trivy, `continue-on-error: true` on kube-linter) — flip to enforcing once findings are triaged.

Triggers: PR + push touching `k8s/**` or `infra/**`.

### 9.3 Gitleaks — `gitleaks.yml`

- **Full-history scan**: `fetch-depth: 0` so secrets buried in old commits get caught.
- Triggers: PR + push + Mondays 05:30 UTC.
- Findings → SARIF + step summary + artifact.
- Uses auto-provisioned `GITHUB_TOKEN`; no extra secret.

### 9.4 In-image scan

Already part of `build-and-push.yml` — Trivy scans every produced image. SARIF uploaded as artifact (`trivy-<service>`).

### 9.5 Supply chain

- **Cosign keyless signing** in `build-and-push.yml` — verifiable by any developer with `cosign verify`.
- **SBOM** + **build provenance** attached as OCI attestations.
- **Dependabot** weekly across Maven (7), npm (1), pip (1), Docker (11), GitHub Actions (1) — grouped by family (Spring core, Angular core, test libs) to reduce PR noise.

---

## 10. GitHub secrets

| Secret | Used by | Source |
|---|---|---|
| `DOCKERHUB_USERNAME` | `build-and-push.yml` | `azizbna` |
| `DOCKERHUB_TOKEN` | `build-and-push.yml` | https://hub.docker.com/settings/security (R/W/D) |
| `VERCEL_TOKEN` | `vercel-preview`, `vercel-prod` | https://vercel.com/account/tokens (Full Account) |
| `KUBECONFIG_PROD` | `deploy-k8s.yml` (prod path) | `scripts/extract-kubeconfig.sh` on `k8s-cp1` |
| `KUBECONFIG_DEV` | `deploy-k8s.yml` (dev path) | `NAMESPACE=piclouddoom-dev scripts/extract-kubeconfig.sh` |
| `AZURE_CREDENTIALS` | `deploy-aca.yml` | `az ad sp create-for-rbac --sdk-auth` JSON (pending Entra grant) |
| `AZURE_RESOURCE_GROUP` | `deploy-aca.yml` | `rg-piclouddoom` (plain string, kept secret by choice) |

Nothing else is needed — CodeQL, IaC scan, and Gitleaks use the auto-provisioned `GITHUB_TOKEN`.

---

## 11. GitHub Environments

Configured under **Settings → Environments**:

| Environment | Used by | Recommended protections |
|---|---|---|
| `production` | `deploy-k8s` (prod), `deploy-aca`, `vercel-prod` | 1 required reviewer, restrict to `main` + `deployment/hybrid-openstack-azure-vercel` |
| `dev` | `deploy-k8s` (dev) | None |

`production` is also where you'd add environment-scoped secrets if anything diverged between dev and prod beyond kubeconfigs.

---

## 12. Branch protection (recommended on `main`)

Use the `ci-summary`, `build-summary`, `deploy-summary` aggregate jobs as required status checks:

- ✅ `ci-summary` — must be green before merge.
- ✅ CodeQL analysis (per language).
- ✅ Gitleaks scan.
- ⏸ (optional) IaC scan once it's not report-only.

This keeps branch-protection rules small — one check per pipeline stage.

---

## 13. Pipeline observability

Every workflow writes a **`$GITHUB_STEP_SUMMARY`** with:
- Image + digest + tag list (`build-and-push.yml`)
- Image pinned + rollout exit code + pod listing (`deploy-k8s.yml`)
- Image + revision name + post-deploy fqdn (`deploy-aca.yml`)
- Deployment URL + commit (`vercel-prod.yml`)

So a developer opening the run sees the whole picture without reading 800 lines of log.

---

## 14. The 9 build steps (history)

The pipeline was built incrementally in 9 commits, one per "step":

| # | Step | Commit | Doc |
|---|---|---|---|
| 0 | Repo hygiene (dockerignores, move heat-cluster.yaml into repo) | `c515dec9` | `step-00-repo-hygiene.md` |
| 1 | CI scaffolding (paths-filter, reusable wfs, dependabot) | `8fc603f2` | `step-01-ci-scaffolding.md` |
| 2 | Image build & push (matrix × 10, Trivy, Cosign) | `bb03d129` | `step-02-image-build-push.md` |
| 3 | Vercel preview + prod pipelines | `18aa2fdf` | `step-03-vercel-pipeline.md` |
| 4 | K8s deploy + RBAC + kubeconfig extraction | `c685dc72` | `step-04-k8s-deploy.md` |
| 5 | Azure Container Apps deploy | `a7fa4b10` | `step-05-aca-deploy.md` |
| 6 | Security gates (CodeQL, IaC scan, Gitleaks) | `2bfd6e2f` | `step-06-security-gates.md` |
| 7 | Multi-env (dev/prod) + smoke tests | `f7096c44` | `step-07-multi-env-smoke.md` |
| 8 | Finalize docs + runbook | `27de2227` | `step-08-finalize.md` |

Each step's `*.md` doc explains the file, the design choice, the OpenStack actions needed (if any), known caveats, and verification steps — together they form an executable runbook for re-creating the pipeline from scratch.

---

## 15. Anatomy of one full release (end-to-end)

```
1.  Developer pushes to `deployment/hybrid-openstack-azure-vercel`.

2.  CI workflows fire IN PARALLEL:
    - ci.yml                      (lint/test/build for changed services)
    - codeql.yml                  (SAST per language)
    - iac-scan.yml                (if k8s/ or infra/ changed)
    - gitleaks.yml                (secret scan)

3.  CI passes → all aggregate jobs go green.

4.  `build-and-push.yml` fires (push-triggered, doesn't wait for CI):
    - Matrix builds 10 images in parallel
    - Each: build → Trivy → cosign sign → push (sha-<short>, branch, latest if main)

5.  `build-and-push.yml` finishes successfully.

6.  `deploy-k8s.yml` auto-fires via workflow_run:
    - gate resolves sha-<short> + namespace=piclouddoom
    - 7 rollout jobs in parallel: kubectl set image + rollout status (10 min)
    - smoke job: kubectl wait Available + readyReplicas>=1 on each Deployment
    - deploy-summary: green only if both deploy and smoke green

7.  (When unblocked) `deploy-aca.yml` auto-fires:
    - 3 revision updates in parallel
    - Each: az containerapp update + 5-min health poll
    - Auto-traffic-shift back on failure

8.  If frontend changed → `vercel-prod.yml` fires on push to main:
    - vercel pull/build/deploy --prod
    - curl https://interviewprep-tn.me 5× retry

9.  Done. Every step is in the Actions tab with a step summary.
```

---

## 16. Failure modes & their automatic responses

| Failure | Detected by | Automatic response |
|---|---|---|
| Compile error / unit test fail | `ci.yml` reusable wf | CI gate fails → branch protection blocks merge |
| Image build fails | `build-and-push.yml` job | Matrix continues for other services; aggregate gate fails; no deploy fires |
| Trivy CVE found (when enforced) | `build-and-push.yml` Trivy step | Build fails → no signed/pushed image |
| Cosign sign fails | `build-and-push.yml` | Build fails → push has happened but image is unsigned (caught by verify step in cluster, post-launch) |
| `kubectl rollout status` times out | `deploy-k8s.yml` rollout step | Logs dumped → `kubectl rollout undo` → re-wait 3 min |
| Smoke test fails | `deploy-k8s.yml` smoke job | Roll back **all 7** services in the namespace |
| ACA revision Failed/Degraded | `deploy-aca.yml` health poll | Traffic-shift 100% back to previous Running revision |
| Vercel prod curl ≠ 200 | `vercel-prod.yml` smoke | Job fails — but Vercel keeps the previous prod deployment live |
| Secret committed | `gitleaks.yml` | PR check fails, finding shown in Security tab |
| K8s manifest misconfig | `iac-scan.yml` | SARIF posted, Security tab populated (advisory today) |

---

## 17. Manual escape hatches

Everything automatic also has a manual switch:

| Operation | How |
|---|---|
| Re-build one service | Actions → "Build & Push images" → Run workflow → `service: user-service` |
| Re-deploy one service to a SHA | Actions → "Deploy — OpenStack K8s" → `service: user-service`, `sha: <7-char>` |
| Roll back all services to a SHA | "Deploy — OpenStack K8s" → leave `service:` blank, set `sha:` to the old commit |
| Manual ACA deploy from a laptop | `bash scripts/deploy-aca.sh [sha] [app]` (uses `az login`) |
| Mint a new kubeconfig | `bash scripts/extract-kubeconfig.sh > kc.yaml` on `k8s-cp1`, paste, shred |
| Emergency rollback w/o GitHub | SSH to `k8s-cp1` → `kubectl -n piclouddoom rollout undo deployment/<svc>` |
| Verify a signed image | `cosign verify docker.io/azizbna/pi-clouddoom-<svc>:sha-<short> --certificate-identity-regexp "https://github.com/Mohamed-Fedi-Hamrouni/Pi-CloudDOOM/.*" --certificate-oidc-issuer https://token.actions.githubusercontent.com` |

---

## 18. Day-1 known limitations (recap)

1. IaC scan + image scan are report-only.
2. ACA auto-trigger disabled until Azure SP is approved.
3. Smoke covers only the 7 Spring services (extend to ACA + Vercel post-launch).
4. Single replica per app — rolling update is binary.
5. No DB-migration coordination (Flyway runs at boot).
6. No GitOps (Argo CD is on the backlog).
7. CodeQL Java analyses only `user-service` (representative module).
8. Service principal expires yearly → migrate to federated OIDC when possible.

---

## 19. Summary

| Question | Answer |
|---|---|
| How many workflows? | 13 (5 reusable/orchestrators + 4 deploy + 3 security + 1 dependabot) |
| Where do images live? | DockerHub `docker.io/azizbna/pi-clouddoom-*` (10 public repos) |
| What ties build → deploy? | `workflow_run` after successful `Build & Push images` |
| What guarantees image integrity? | Cosign keyless OIDC + SBOM + provenance + Trivy scan SARIF |
| What guarantees rollback? | Immutable `sha-<short>` tags + auto-undo on rollout/smoke fail + traffic-shift on ACA fail |
| What kicks off a prod deploy? | A successful image build on `main` or `deployment/hybrid-openstack-azure-vercel` |
| What can you do without `git push`? | Every workflow has a `workflow_dispatch` — one-click manual run with optional inputs |
| Where do I see security findings? | GitHub Security tab → Code scanning alerts (CodeQL, trivy-k8s, trivy-infra, kube-linter) |
| Where do I see deploy history? | GitHub Actions tab + Environments tab (production / dev / preview) |
