# ClouDoom — Deployment Strategy
**InterviewPrep TN · ESPRIT · Mme Ziadi Nihal · ClouDoom team · May 2026**

---

## Architecture at a Glance

| Service | Port | Database |
|---|---|---|
| user-service | 8081 | userdb |
| interview-service | 8082 | interviewdb |
| training-service | 8083 | trainingdb |
| mentorship-service | 8084 | mentorship_db |
| quiz-service | 8085 | quizdb |
| community-service | 8086 | communitydb |
| resource-service | 8087 | resourcedb |
| ai-training-path | 8001 | — |
| Angular frontend | 4200 | — |

---

## Three-Tier Environment Strategy

```
Local (MacBook)  →  Staging (Azure)  →  Production (OpenStack + K8s)
  dev work           live preview         academic deliverable
  docker compose     auto on push         manual dispatch only
```

### Tier 1 — Local
All services via `docker compose up --build` from `infra/`. Angular at `ng serve`. Never push untested code.

### Tier 2 — Staging (Azure Student Credits — $100)
- Frontend on **Vercel** (auto-deploys on push to `integration/final`)
- All backends on **Azure Container Apps**
- Images pulled from `ghcr.io/pi-cloudoom/*`
- Gives the professor a live URL before demo day

### Tier 3 — Production (OpenStack + Kubernetes)
- All 8 backends as K8s **Deployments**
- PostgreSQL, Redis, Keycloak as K8s **StatefulSets**
- Frontend stays on **Vercel** (env-switched)
- Traffic enters via **NGINX Ingress → Kong API Gateway**
- Deploy only via manual GitHub Actions dispatch

---

## OpenStack Resource Optimisation

> OpenStack has limited resources. Rule: only lightweight services run there. Everything heavy goes elsewhere.

### JVM flags — add to every Spring Boot service
```yaml
- name: JAVA_TOOL_OPTIONS
  value: "-Xmx256m -Xms64m -XX:+UseSerialGC -Dspring.jmx.enabled=false"
```
This drops each service from ~500 MB to ~200 MB RAM.

### What stays on OpenStack

| Component | RAM target |
|---|---|
| 8 Spring Boot services | ~200 MB each |
| ai-training-path (Python) | ~150 MB |
| PostgreSQL 16 | ~300 MB |
| Redis 7 | ~50 MB |
| Keycloak 24 | ~400 MB |
| Kong API Gateway | ~150 MB |
| **Total** | **~2.4 GB** |

### What moves off OpenStack

| Service | Reason | Alternative |
|---|---|---|
| Ollama | 4+ GB model weights | Already using Groq API — remove from prod |
| Kafka + Zookeeper | ~1 GB combined | Set `KAFKA_ENABLED=false` → services fall back to direct REST |
| Whisper / Kokoro / Simli | CPU/GPU intensive | Run on presenter laptop during demo only |
| MinIO | Storage + RAM | Azure Blob Storage (student credits) |
| Prometheus + Grafana | ~500 MB | Skip for prod — use `/actuator/health` endpoints |
| MailHog | Dev only | Replace with Mailtrap SMTP free tier |

### Kafka fallback flag (required)
In each `application.yml`:
```yaml
app:
  kafka:
    enabled: ${KAFKA_ENABLED:true}
```
In `k8s/prod/configmap.yaml`:
```yaml
KAFKA_ENABLED: "false"
```
Wrap every `kafkaTemplate.send(...)` with an `if (kafkaEnabled)` check and a fallback REST call.

### VM layout (3 VMs on OpenStack)
```
VM 1 — 2 vCPU / 2 GB  →  K8s control plane · Kong · Keycloak · NGINX Ingress
VM 2 — 2 vCPU / 4 GB  →  user · interview · community · quiz · ai-training-path
VM 3 — 2 vCPU / 4 GB  →  training · mentorship · resource · PostgreSQL · Redis
```

---

## Platform Allocation

| Platform | Role | Cost |
|---|---|---|
| GitHub Actions | CI/CD pipeline | Free (Student Pack) |
| ghcr.io | Container registry (9 images) | Free, no pull limits |
| Vercel | Angular frontend + CDN | Free hobby tier |
| Azure | Staging environment | $100 student credits |
| OpenStack | Production K8s cluster | Academic infra |
| Groq API | All AI features (llama-3.3-70b) | Free tier |
| Custom domain | Public URL (from Student Pack) | Free (Namecheap .me or Name.com .live) |

---

## Container Registry (ghcr.io)

All images follow the convention:
```
ghcr.io/pi-cloudoom/<service-name>:latest
ghcr.io/pi-cloudoom/<service-name>:<git-sha>
```
No pull rate limits. Authenticated automatically via `GITHUB_TOKEN` in Actions.  
Enable at: repo → Settings → Packages → GitHub Container Registry.

---

## CI/CD Pipeline (GitHub Actions)

**Trigger:** push to `integration/final`  
**Production deploy:** manual `workflow_dispatch` only

```
push to integration/final
        │
        ▼
┌───────────────────────────────┐
│  Job 1: mvn test (8 services) │  parallel
│  Job 2: ng build --prod       │  parallel
│  Job 3: pytest ai-training    │  parallel
└───────────────┬───────────────┘
                │ all pass
                ▼
┌───────────────────────────────┐
│  Job 4: docker build + push   │
│  → ghcr.io (9 images, matrix) │
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
  Auto-deploy       Manual deploy
  → Azure staging   → OpenStack prod
```

### Required GitHub Secrets
```
GROQ_API_KEY          GEMINI_API_KEY
MINIO_ACCESS_KEY      MINIO_SECRET_KEY
KUBE_CONFIG_STAGING   KUBE_CONFIG_PROD
VERCEL_TOKEN
```
`GITHUB_TOKEN` is automatic — no manual setup needed.

---

## Kubernetes Namespace Layout

```
cluster
├── namespace: interviewprep     ← all 8 app services + Kong
│   ├── Deployments (×8)
│   ├── ConfigMap: app-config    ← KAFKA_ENABLED=false, GROQ url, etc.
│   └── Secret: app-secrets      ← API keys, DB password
│
├── namespace: infra             ← stateful services
│   ├── StatefulSet: postgresql  + PVC 10Gi
│   ├── StatefulSet: redis
│   └── Deployment: keycloak     + ConfigMap: realm.json
│
└── namespace: ingress-nginx     ← traffic entry
    └── nginx-ingress-controller
```

### Resource limits per app service (K8s)
```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "300Mi"
    cpu: "500m"
```

### HPA (all 8 services — scale at 70% CPU)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 1
  maxReplicas: 3
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

---

## Dockerfile Template (Spring Boot — all 8 services)

```dockerfile
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
USER app
COPY --from=builder /app/target/*.jar app.jar
ENV JAVA_TOOL_OPTIONS="-Xmx256m -Xms64m -XX:+UseSerialGC -Dspring.jmx.enabled=false"
EXPOSE 8086
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s \
  CMD wget -qO- http://localhost:8086/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

*ClouDoom · ESPRIT · Projet Intégré Cloud · 2026*
