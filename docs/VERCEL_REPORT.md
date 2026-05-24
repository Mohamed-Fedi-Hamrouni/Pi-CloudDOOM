# Pi-CloudDOOM — Vercel Deployment Report (Ultra-Detailed)

**Scope:** Everything related to Vercel in this repository — what is deployed, the exact configuration files, every CLI command used, every GitHub-Actions step, secrets, environments, smoke testing, rollback behavior, the interaction with Vercel's native GitHub integration, and the operational runbook.

**Production URL:** https://interviewprep-tn.me
**Vercel Org ID:** `team_tQYcRewNfvSBGAbsE6wJwcop`
**Vercel Project ID:** `prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL`
**Project name on Vercel:** `pi-cloudoom`

---

## 1. Why Vercel for the frontend

The frontend is an Angular 21 single-page application (SPA). It is fully static once built: a folder of HTML/CSS/JS files served from a CDN, calling REST APIs over HTTPS. That makes it a textbook fit for Vercel:

- **Free edge CDN** — assets served from the closest POP to every user.
- **Free per-PR preview URLs** — reviewers click, see the change, no laptop setup.
- **Free auto-managed TLS** for `interviewprep-tn.me` (no cert renewal to babysit).
- **No coupling to backend lifecycle** — backend deploys on OpenStack, AI services deploy on Azure Container Apps; the SPA can ship independently.
- **Zero infrastructure for us** — no Nginx pod, no LoadBalancer service, no PVC.

This is plane 3 of the hybrid deployment (OpenStack / Azure / Vercel).

---

## 2. The deployment surface (everything Vercel touches)

Vercel only sees the Angular source tree under `frontend/`. Every backend folder is excluded by `.vercelignore` so the upload context stays small.

| File / folder | Role |
|---|---|
| `vercel.json` | Build + output config + SPA rewrite rule |
| `.vercel/project.json` | Link to the Vercel project (`projectId`, `orgId`, `projectName`) |
| `.vercel/README.txt` | Notes Vercel drops on `vercel link` — kept committed by us |
| `.vercelignore` | Excludes all backend service folders, Postman collections, docs |
| `frontend/` | Angular 21 source — what is actually built and uploaded |
| `frontend/angular.json` | Angular build target (`builder: application`, output `dist/interviewpreptn`) |
| `frontend/package.json` + `package-lock.json` | npm dependency manifest, used by `npm ci` |
| `.github/workflows/vercel-preview.yml` | Per-PR preview deploy via Vercel CLI |
| `.github/workflows/vercel-prod.yml` | Production deploy on push to `main` |
| `.github/workflows/ci-frontend.yml` | Reusable CI workflow — `npm ci` + `ng build` (production) gate before merge |

---

## 3. Vercel configuration — `vercel.json`

Exact contents (root of repo):

```json
{
  "buildCommand": "cd frontend && npm ci && npm run build -- --configuration production",
  "outputDirectory": "frontend/dist/interviewpreptn/browser",
  "installCommand": "cd frontend && npm ci",
  "framework": "angular",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Field-by-field:

- **`framework: "angular"`** — Vercel knows the build conventions but we override the commands explicitly to control them.
- **`installCommand: "cd frontend && npm ci"`** — clean, reproducible install from `frontend/package-lock.json`. `npm ci` is preferred over `npm install` because it fails on lockfile drift.
- **`buildCommand: "cd frontend && npm ci && npm run build -- --configuration production"`** — re-runs `npm ci` then invokes Angular's production build profile (`angular.json → architect.build.configurations.production`).
- **`outputDirectory: "frontend/dist/interviewpreptn/browser"`** — Angular 21's `application` builder splits the output into `browser/` and (when SSR) `server/`. Vercel serves the `browser/` folder.
- **`rewrites: [{ "source": "/(.*)", "destination": "/index.html" }]`** — SPA fallback. Any non-asset path is served `index.html` so Angular's client-side router can handle the route on the client. Without this, deep links like `/training/path/42` return 404.

---

## 4. Vercel ignore — `.vercelignore`

```
# Backend services — not needed for Vercel frontend build
ai-training-path/
community-service/
interview-service/
mentorship-service/
quiz-service/
resource-service/
training-service/
user-service/
kokoro/

# Infrastructure
infra/

# Misc
*.md
*.postman_collection.json
*.postman_environment.json
CAREER_FUNCTIONS.md
```

Why this matters:

- Drastically reduces the upload context size — Vercel only ingests what it actually needs.
- Eliminates accidental rebuilds when an unrelated backend file changes.
- Prevents Vercel's automatic framework detection from picking up a stray `pom.xml` or `Dockerfile` inside one of the Spring services.

---

## 5. Project linkage — `.vercel/project.json`

```json
{
  "projectId": "prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL",
  "orgId": "team_tQYcRewNfvSBGAbsE6wJwcop",
  "projectName": "pi-cloudoom"
}
```

This file is **committed on purpose** — these IDs are not secrets, they only identify the Vercel project. By committing them we avoid every developer/CI run having to run `vercel link` interactively, and the workflows can just `vercel pull` directly.

(Vercel's tooling, by default, adds `.vercel` to `.gitignore`. We intentionally tracked `project.json` for the reason above.)

---

## 6. Angular build details (what the build actually produces)

`frontend/angular.json` configures one project, `interviewpreptn`, using the modern `@angular-devkit/build-angular:application` builder.

Key build options:
- **`outputPath: "dist/interviewpreptn"`** — combined with `outputDirectory` from `vercel.json` this is why Vercel reads `frontend/dist/interviewpreptn/browser`.
- **Optimization (production):**
  - `scripts: true` (minify JS)
  - `styles.minify: true`
  - `styles.inlineCritical: false`
  - `fonts: false` (we don't inline)
- **Budgets (production):**
  - `initial.maximumWarning: 2mb`
  - `initial.maximumError: 4mb` — exceeding this fails the build (Angular hard error).
- **`outputHashing: "all"`** — every emitted asset gets a content hash → safe long-term caching at the CDN edge.

`frontend/package.json` pins Angular 21 and TypeScript 5.9. The build script is just `ng build`; the production toggle comes from `--configuration production` passed by `vercel.json` / `ci-frontend.yml`.

---

## 7. CI gate before deploy — `.github/workflows/ci-frontend.yml`

The frontend never reaches a Vercel deploy without first passing CI. This is the reusable workflow that the orchestrator `ci.yml` calls when `frontend/**` changed.

```yaml
name: CI — Frontend (reusable)

on:
  workflow_call:
    inputs:
      node:
        type: string
        required: false
        default: "20"

permissions:
  contents: read

jobs:
  build:
    name: build-frontend
    runs-on: ubuntu-latest
    timeout-minutes: 20
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node ${{ inputs.node }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node }}
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci --no-audit --no-fund

      - name: Production build
        run: npx ng build --configuration production

      - name: Upload build artifact
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/upload-artifact@v4
        with:
          name: frontend-dist
          path: frontend/dist/interviewpreptn/browser
          retention-days: 7
```

Notes:
- **Node 20** — same major as production. Pinning the cache to `frontend/package-lock.json` keeps unrelated lockfiles from polluting it.
- **`npm ci --no-audit --no-fund`** — deterministic install, no noisy logs.
- **`npx ng build --configuration production`** — exactly what Vercel will rerun. If CI fails, the Vercel deploy will also fail, but we catch it earlier on the PR.
- **Artifact upload only on `main`** — kept 7 days for audit / manual rollback inspection.

---

## 8. Preview deploys — `.github/workflows/vercel-preview.yml`

Triggered on **every PR** that touches anything affecting the frontend deploy: `frontend/**`, `vercel.json`, `.vercel/**`, `.vercelignore`, or the workflow file itself.

### 8.1 Full workflow

```yaml
name: Vercel — Preview

on:
  pull_request:
    paths:
      - "frontend/**"
      - "vercel.json"
      - ".vercel/**"
      - ".vercelignore"
      - ".github/workflows/vercel-preview.yml"

concurrency:
  group: vercel-preview-${{ github.event.pull_request.number }}
  cancel-in-progress: true

permissions:
  contents: read
  pull-requests: write          # post / update the preview-URL comment

env:
  VERCEL_ORG_ID: team_tQYcRewNfvSBGAbsE6wJwcop
  VERCEL_PROJECT_ID: prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL

jobs:
  deploy:
    name: Deploy Vercel Preview
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install Vercel CLI
        run: npm i -g vercel@latest

      - name: Pull Vercel project (preview env)
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build (preview)
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy (preview, prebuilt)
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> "$GITHUB_OUTPUT"
          echo "Preview URL: $url"

      - name: Comment preview URL on PR
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          header: vercel-preview
          message: |
            🟢 **Vercel preview deployed**

            URL: ${{ steps.deploy.outputs.url }}

            Commit: `${{ github.sha }}`
            Triggered by: @${{ github.actor }}
```

### 8.2 Step-by-step trace

1. **`actions/checkout@v4`** — clones the PR head.
2. **`actions/setup-node@v4`** — Node 20 with npm cache keyed on `frontend/package-lock.json`.
3. **`npm i -g vercel@latest`** — installs the Vercel CLI globally on the runner. (The current local CLI is 53.2.0; `@latest` resolves to whatever is most recent, e.g. 53.4.0.)
4. **`vercel pull --yes --environment=preview --token=$VERCEL_TOKEN`** — uses the project link in `.vercel/project.json` + the `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` env to fetch the project's **preview** env vars and the resolved `vercel.json` into `.vercel/`. The `--yes` skips the "is this the right project?" interactive prompt.
5. **`vercel build --token=$VERCEL_TOKEN`** — runs the build locally on the GitHub runner using the commands declared in `vercel.json`. Output goes to `.vercel/output/` in the Vercel build-output format.
6. **`vercel deploy --prebuilt --token=$VERCEL_TOKEN`** — uploads the pre-built artifact (no rebuild on Vercel's side) and prints the assigned preview URL on stdout. We capture that URL into `$GITHUB_OUTPUT` so a later step can use it.
7. **`marocchino/sticky-pull-request-comment@v2`** with `header: vercel-preview` — posts or **updates** a single comment on the PR (no spam when 3 commits land in a row); shows the preview URL, the commit SHA, and the actor who pushed.

### 8.3 Why `--prebuilt`

`vercel deploy` without `--prebuilt` re-runs the build on Vercel's infrastructure. Building locally with `vercel build` then uploading with `--prebuilt`:
- **Speeds up the deploy** — no double build.
- **Makes the build deterministic** — exact same Node version, exact same runner, exact same commands as `ci-frontend.yml`.
- **Catches build errors in CI logs**, not buried in Vercel's build dashboard.

### 8.4 Concurrency

```yaml
concurrency:
  group: vercel-preview-${{ github.event.pull_request.number }}
  cancel-in-progress: true
```

Three commits to the same PR in 10 seconds only run the build for the latest one. The earlier ones are cancelled mid-build.

### 8.5 Permissions

- `contents: read` — to clone.
- `pull-requests: write` — to post / update the sticky comment.

No `id-token`, no `packages` — preview deploy has the absolute minimum scope.

---

## 9. Production deploys — `.github/workflows/vercel-prod.yml`

Triggered on push to `main` touching the same paths, or manual `workflow_dispatch`.

### 9.1 Full workflow

```yaml
name: Vercel — Production

on:
  push:
    branches:
      - main
    paths:
      - "frontend/**"
      - "vercel.json"
      - ".vercel/**"
      - ".vercelignore"
      - ".github/workflows/vercel-prod.yml"
  workflow_dispatch:

concurrency:
  group: vercel-prod
  cancel-in-progress: false      # never cancel a prod deploy mid-flight

permissions:
  contents: read

env:
  VERCEL_ORG_ID: team_tQYcRewNfvSBGAbsE6wJwcop
  VERCEL_PROJECT_ID: prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL

jobs:
  deploy:
    name: Deploy Vercel Production
    runs-on: ubuntu-latest
    timeout-minutes: 25
    environment:
      name: production
      url: https://interviewprep-tn.me
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install Vercel CLI
        run: npm i -g vercel@latest

      - name: Pull Vercel project (production env)
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build (production)
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy (production, prebuilt)
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> "$GITHUB_OUTPUT"
          echo "## Vercel production deploy" >> "$GITHUB_STEP_SUMMARY"
          echo "" >> "$GITHUB_STEP_SUMMARY"
          echo "- Deployment URL: $url" >> "$GITHUB_STEP_SUMMARY"
          echo "- Commit: \`${{ github.sha }}\`" >> "$GITHUB_STEP_SUMMARY"

      - name: Smoke check production
        run: |
          for i in 1 2 3 4 5; do
            if curl -fsS -o /dev/null -w "%{http_code}\n" https://interviewprep-tn.me | grep -q "200"; then
              echo "Production reachable"
              exit 0
            fi
            echo "Attempt $i: not yet — retrying in 10s"
            sleep 10
          done
          echo "::error::Production smoke check failed after 5 attempts"
          exit 1
```

### 9.2 Differences from preview

| Aspect | Preview | Production |
|---|---|---|
| Trigger | `pull_request` | `push` to `main` + `workflow_dispatch` |
| `vercel pull` env | `--environment=preview` | `--environment=production` |
| `vercel build` flag | (none) | `--prod` |
| `vercel deploy` flag | `--prebuilt` | `--prebuilt --prod` |
| `cancel-in-progress` | `true` (latest wins) | `false` (never kill a prod deploy) |
| GitHub Environment | none | `production` with `url: https://interviewprep-tn.me` |
| Post-deploy verification | none | curl `https://interviewprep-tn.me` 5× with 10 s sleep |
| Step summary | none | URL + commit SHA written to `$GITHUB_STEP_SUMMARY` |

### 9.3 The exact CLI sequence

```bash
vercel pull   --yes --environment=production       --token=$VERCEL_TOKEN
vercel build  --prod                                --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod                     --token=$VERCEL_TOKEN
```

`vercel deploy --prebuilt --prod` outputs the canonical production URL on stdout (e.g. `https://pi-cloudoom-xxxxx.vercel.app`). Vercel internally also flips the production alias `interviewprep-tn.me` (managed in Vercel project settings → Domains) to point at this deployment, atomically.

### 9.4 Smoke check

```bash
for i in 1 2 3 4 5; do
  if curl -fsS -o /dev/null -w "%{http_code}\n" https://interviewprep-tn.me | grep -q "200"; then
    echo "Production reachable"
    exit 0
  fi
  echo "Attempt $i: not yet — retrying in 10s"
  sleep 10
done
echo "::error::Production smoke check failed after 5 attempts"
exit 1
```

- 5 attempts × 10 s sleep = up to ~50 s budget.
- Validates DNS + edge cache propagation after the alias swing.
- **If the smoke fails, the job fails — but the previous prod deployment continues serving.** Vercel never replaces a live deployment until the new one is healthy and the alias points at it, so a failed smoke = "the new deployment didn't claim the alias as expected" and the rollback is implicit (no action needed; users keep seeing the prior version).

### 9.5 GitHub Environment integration

```yaml
environment:
  name: production
  url: https://interviewprep-tn.me
```

This wires the deploy into the **Environments** tab of the repo:
- The `production` environment can have **required reviewers** added in repo Settings → Environments → production. Once added, a prod deploy will pause and wait for an approval.
- It can hold environment-scoped secrets (we don't use this for Vercel since `VERCEL_TOKEN` is a repo-level secret).
- It surfaces the deployment history per environment in the GitHub UI.

---

## 10. Secrets, env vars, and project IDs

### 10.1 GitHub repository secret

| Secret | Source | Scope |
|---|---|---|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens → **New Token** → **Full Account** scope | Used by both `vercel-preview.yml` and `vercel-prod.yml` |

This is the only secret either Vercel workflow needs.

### 10.2 Project IDs (workflow env, NOT secrets)

```yaml
env:
  VERCEL_ORG_ID:     team_tQYcRewNfvSBGAbsE6wJwcop
  VERCEL_PROJECT_ID: prj_2vhl5NT0TAWAQZkKNWPm3UKs25HL
```

These IDs are also in `.vercel/project.json` (committed) — not sensitive. Keeping them as workflow `env` makes the YAML self-contained and lets the CLI pick them up directly (`VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are the documented env-var names the CLI reads).

### 10.3 Frontend runtime env vars

The Angular app reads its API base URLs at **build time** from `frontend/src/environments/environment*.ts` files (compiled into the bundle). Vercel-managed environment variables would only matter for an SSR / API route, which we don't use — the app is a pure static SPA.

If we ever need a build-time variable in Vercel:
- Add it in Vercel Dashboard → Project → Settings → Environment Variables.
- It is automatically pulled by `vercel pull` and available to `vercel build`.

---

## 11. All Vercel CLI commands used in this project (cheat-sheet)

| Command | Where | Purpose |
|---|---|---|
| `vercel link` | Once (already done, by hand) | Created `.vercel/project.json` linking this repo to the `pi-cloudoom` project |
| `vercel pull --yes --environment=preview --token=$VERCEL_TOKEN` | `vercel-preview.yml` | Pull preview env vars + config into `.vercel/` |
| `vercel pull --yes --environment=production --token=$VERCEL_TOKEN` | `vercel-prod.yml` | Pull production env vars + config |
| `vercel build --token=$VERCEL_TOKEN` | `vercel-preview.yml` | Build into `.vercel/output/` (preview mode) |
| `vercel build --prod --token=$VERCEL_TOKEN` | `vercel-prod.yml` | Build into `.vercel/output/` (production mode) |
| `vercel deploy --prebuilt --token=$VERCEL_TOKEN` | `vercel-preview.yml` | Upload pre-built artifact as preview deployment |
| `vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN` | `vercel-prod.yml` | Upload pre-built artifact, swing prod alias to it |
| `npm i -g vercel@latest` | Both | Install the CLI on the runner |

You can run all of these locally too if you have a token:

```bash
export VERCEL_TOKEN=...
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

---

## 12. Two-channel deploys at a glance

```
PR opened touching frontend/**, vercel.json, .vercel/**, .vercelignore:
  ▶ vercel-preview.yml
    1. checkout
    2. setup-node 20 + npm cache
    3. npm i -g vercel@latest
    4. vercel pull --environment=preview
    5. vercel build
    6. vercel deploy --prebuilt   →   prints preview URL
    7. sticky PR comment with preview URL

Push to main touching frontend/**, vercel.json, .vercel/**, .vercelignore:
  ▶ vercel-prod.yml
    1. checkout
    2. setup-node 20 + npm cache
    3. npm i -g vercel@latest
    4. vercel pull --environment=production
    5. vercel build --prod
    6. vercel deploy --prebuilt --prod   →   prints prod URL
    7. step summary (URL + commit SHA)
    8. curl https://interviewprep-tn.me with 5× retries
```

---

## 13. Domain + TLS

- **DNS** for `interviewprep-tn.me` is managed by **Cloudflare** (the same provider used for the API tunnel).
- The apex `interviewprep-tn.me` resolves to the Vercel edge; Vercel issues and auto-renews the TLS certificate for it.
- **Subdomains** (`api.interviewprep-tn.me`, `auth.interviewprep-tn.me`) are **not** on Vercel — they go through Cloudflare Tunnel → Traefik → in-cluster services. Cloudflare terminates TLS for those.

So the user's browser sees two distinct certs depending on the hostname, both managed automatically by their respective providers.

---

## 14. Why we use GitHub Actions and not Vercel's GitHub App

Vercel can auto-deploy on push if you grant it GitHub App permissions when the project is linked. We deliberately use **only** the GitHub Actions workflow as the source of truth:

| Reason | Detail |
|---|---|
| **Single audit trail** | Every deploy is a row in the Actions tab. No need to also check Vercel's Deployments dashboard. |
| **CI gating** | The Actions workflow is gated by branch protection on `ci-summary`. Vercel's auto-integration would deploy even on a failing CI. |
| **Identical preview + prod flow** | Both channels use the same CLI sequence (`pull / build / deploy`), only flags differ. Vercel's auto-flow has separate code paths and dashboards. |
| **Concurrency control** | We pick the cancel/no-cancel semantics (cancel for preview, never cancel for prod). |
| **Deterministic builds** | Built on the same runner image used for CI, with `--prebuilt`. |

If you want only this workflow to run, disable Vercel's GitHub auto-deploy: **Vercel Dashboard → Project → Settings → Git → Disconnect** (keeps the project linked for env-var management, just stops auto-deploys). With both enabled, you'd get **two preview URLs per PR** — annoying but not broken.

---

## 15. Rollback semantics on Vercel

Vercel deployments are immutable URLs. "Rolling back" the production alias is one click in the Vercel dashboard or one CLI call:

```bash
vercel rollback <deployment-url> --token=$VERCEL_TOKEN
```

In practice, we rarely need this because:

1. **Vercel never overwrites a live prod deployment** until the new one is built and the alias atomically swung.
2. If `vercel-prod.yml`'s smoke check fails, the new deployment is still uploaded but the alias swing already happened — in that case rollback via:
   - Vercel dashboard → Deployments → previous deployment → **Promote to Production**, or
   - `vercel rollback <prev-deployment-url>` from a laptop.
3. If you simply re-deploy an older commit, you can do it via:
   - `git revert <bad-sha>` → push to `main` → workflow rebuilds + deploys the reverted commit, **or**
   - GitHub → Actions → "Vercel — Production" → Run workflow on the older SHA via `workflow_dispatch`.

There is no "rollback all" automation in `vercel-prod.yml` itself because Vercel's own deployment immutability is the rollback story.

---

## 16. Pre-deploy gates (what guarantees the deploy is safe)

| Gate | Workflow | What it does |
|---|---|---|
| Frontend build passes | `ci-frontend.yml` (called by `ci.yml`) | `npm ci` + `ng build --configuration production` must succeed |
| `ci-summary` aggregate | `ci.yml` | One required status check covers all per-service CI including frontend |
| CodeQL `javascript-typescript` | `codeql.yml` | SAST queries on the Angular sources |
| Gitleaks | `gitleaks.yml` | Full-history secret scan |
| (Optional, recommended) `production` environment reviewer | repo Settings → Environments → production | Hold the deploy until a human approves |

Once these are green, `vercel-prod.yml` runs unattended.

---

## 17. Observability

| What | Where |
|---|---|
| Build logs | GitHub Actions → "Vercel — Production" / "Vercel — Preview" run |
| Deployment URL + commit SHA | Step summary (`$GITHUB_STEP_SUMMARY`) on the `Deploy (production, prebuilt)` step |
| Live deployment list | Vercel Dashboard → Project `pi-cloudoom` → Deployments |
| Preview URL on the PR | Sticky comment posted by `marocchino/sticky-pull-request-comment@v2` (header `vercel-preview`) |
| Production smoke result | The final step of `vercel-prod.yml` (`Smoke check production`) |
| Realtime frontend logs | Vercel Dashboard → Project → Logs (CDN access log, edge errors) |

---

## 18. Concrete examples

### 18.1 What a preview PR comment looks like

```
🟢 Vercel preview deployed

URL: https://pi-cloudoom-git-feature-foo-team-tqyc.vercel.app

Commit: 372ed81c8a9...
Triggered by: @med-aziz-benamor
```

### 18.2 What the production step summary looks like

```
## Vercel production deploy

- Deployment URL: https://pi-cloudoom-fff111-team-tqyc.vercel.app
- Commit: `f73b830d...`
```

### 18.3 What gets uploaded to Vercel

The contents of `frontend/dist/interviewpreptn/browser/`:
```
index.html
favicon.ico
main-<hash>.js
polyfills-<hash>.js
styles-<hash>.css
assets/
chunk-*.js
```

That's it. No backend code, no node_modules, no source maps, no Postman collections.

---

## 19. Day-1 known limitations / backlog

1. **Smoke check doesn't validate the Angular app actually boots** — only that `https://interviewprep-tn.me` returns 200 (i.e. `index.html` is served). A real smoke would `curl` for the existence of a known asset hash or hit a known route.
2. **No Lighthouse / Web Vitals gate** in the workflow — easy add via `treosh/lighthouse-ci-action`.
3. **No env-var management automation** — if we later need build-time vars, we'd add a `vercel env add/pull` step (or a sync workflow). Right now, all runtime configuration lives in `frontend/src/environments/`.
4. **Frontend runtime errors not centralized** — no Sentry / Datadog RUM hook. The Vercel logs only capture edge access.
5. **Preview URL uniqueness** — currently we don't pin a stable per-PR alias (e.g. `pr-42.interviewprep-tn.me`). Each push produces a fresh URL; the sticky comment is updated to point at the latest one. Adding aliases would let testers bookmark a PR.

---

## 20. End-to-end runbook (Vercel-only)

### 20.1 First-time setup (already done, here for posterity)

```bash
# On the developer laptop, in the repo root
npm i -g vercel@latest
vercel login                           # opens browser
vercel link                            # interactive — picks org + project → writes .vercel/project.json
git add .vercel/project.json
git commit -m "chore: link Vercel project"

# In Vercel Dashboard → Account → Tokens, create a "Full Account" token
# In GitHub repo → Settings → Secrets and variables → Actions → New repository secret
#   Name:  VERCEL_TOKEN
#   Value: <paste token>
```

### 20.2 Deploy to preview

```bash
# Open any PR that touches frontend/** — workflow fires automatically.
# Within ~2 min the sticky comment shows the preview URL.

# Manual variant (rare, useful when debugging):
git checkout feature/foo
vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
vercel build --token=$VERCEL_TOKEN
vercel deploy --prebuilt --token=$VERCEL_TOKEN
```

### 20.3 Deploy to production

```bash
# Standard path: merge a PR to main. vercel-prod.yml fires.

# Manual re-deploy (e.g. to refresh the alias without code changes):
# GitHub → Actions → "Vercel — Production" → Run workflow → branch: main

# Pure-CLI fallback from a laptop:
git checkout main && git pull
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

### 20.4 Roll back production

```bash
# Option A — dashboard
# Vercel Dashboard → pi-cloudoom → Deployments → click an earlier prod deployment → "Promote to Production"

# Option B — CLI
vercel ls --token=$VERCEL_TOKEN              # list recent deployments
vercel rollback <deployment-url> --token=$VERCEL_TOKEN

# Option C — git revert + re-deploy
git revert <bad-sha>
git push origin main                          # vercel-prod.yml redeploys clean code
```

### 20.5 Sanity-check what's currently live

```bash
curl -I https://interviewprep-tn.me           # expect HTTP/2 200
curl -sS https://interviewprep-tn.me | grep -o '<title>.*</title>'
```

---

## 21. Summary table

| Concern | How Vercel handles it |
|---|---|
| What is deployed | The Angular 21 SPA built from `frontend/` |
| Build entry | `vercel.json` → `buildCommand: cd frontend && npm ci && npm run build -- --configuration production` |
| Output directory | `frontend/dist/interviewpreptn/browser` |
| SPA routing | `rewrites: [{ "source": "/(.*)", "destination": "/index.html" }]` |
| CI gate | `ci-frontend.yml` (`npm ci` + `ng build`) before merge |
| Preview deploys | `vercel-preview.yml` — pull / build / deploy --prebuilt + sticky PR comment |
| Production deploys | `vercel-prod.yml` — pull / build --prod / deploy --prebuilt --prod + curl smoke |
| Auth | `VERCEL_TOKEN` GitHub secret (Full Account scope) |
| Project IDs | Public, in `.vercel/project.json` + workflow `env:` |
| Domain | `interviewprep-tn.me` apex — Vercel-managed TLS, Cloudflare DNS |
| Rollback | Atomic by design (immutable deployments); `vercel rollback` or promote earlier deployment |
| Concurrency | Preview: cancel-in-progress on PR number; Prod: never cancel |
| Build performance | `--prebuilt` skips Vercel-side rebuild; npm cache via `setup-node` |
| Source-of-truth | GitHub Actions — Vercel auto-GitHub integration disabled |
| Cost | Free hobby tier |

That is the entire Vercel surface area of Pi-CloudDOOM: two workflows, one config file, one project link, one secret, three CLI commands.
