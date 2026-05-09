# Pi-CloudDOOM — InterviewPrep TN

Microservice platform for interview preparation, training, mentorship, and community features. Polyglot stack: Spring Boot backends + FastAPI AI services + Angular frontend, fronted by Keycloak.

## Tech Stack
- **Backend:** Spring Boot 4.x (Java 21), 7 microservices
- **AI:** FastAPI (`ai-training-path`), Whisper (STT), Kokoro (TTS), Ollama (`llama3.2:3b`)
- **Frontend:** Angular 21
- **Auth:** Keycloak 24
- **Data:** PostgreSQL 16, Redis 7, Kafka 7.5, MinIO (S3-compatible)
- **Migrations:** Flyway 11
- **Mail (dev):** MailHog (Mailtrap-compatible)

## Services

| Service             | Port  | Purpose                                  |
| ------------------- | ----- | ---------------------------------------- |
| user-service        | 8081  | Users, profiles, RBAC                    |
| interview-service   | 8082  | Mock interview sessions                  |
| training-service    | 8083  | Training paths, gamification, XP         |
| mentorship-service  | 8084  | Mentorship matching                      |
| quiz-service        | 8085  | Quizzes, oral attempts                   |
| community-service   | 8086  | Community feed                           |
| resource-service    | 8087  | Learning resources                       |
| ai-training-path    | 8001  | ML/LLM-driven training path generation   |
| frontend (Angular)  | 4200  | Web UI                                   |
| Keycloak            | 8080  | OIDC + realm `myapp-realm`               |

## Quick Start (local, Docker)

### 1. Prerequisites
- Docker ≥ 24.0 + Docker Compose ≥ 2.20
- ~6 GB free RAM (the full stack runs ~4–5 GB)
- Java 21 + Maven 3.x **only if** you want to run a service outside Docker

### 2. Configure environment

```bash
git clone <this-repo>
cd PULL
cp infra/.env.example infra/.env
```

Open `infra/.env` and set the **required** API keys (free tiers, ~30s sign-up each):

| Variable           | Required? | What it powers                                                                       | Get one at                              |
| ------------------ | --------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| `GROQ_API_KEY`     | **Yes**   | `interview-service` and `community-service` refuse to start without it              | https://console.groq.com/keys           |
| `GOOGLE_AI_API_KEY`| **Yes**   | Training Coach chatbot in the frontend (button stays disabled if blank, no crash)    | https://aistudio.google.com/app/apikey  |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | Optional | Real SMTP for `/api/emails/test` (else MailHog catches everything) | Mailtrap sandbox                        |

> ⚠️ **Important — Postgres password is baked into the volume on first run.**
> The value of `POSTGRES_PASSWORD` is stored in the `infra_pgdata` volume at first
> `docker compose up`. Changing `.env` afterward will **not** rotate the actual
> password — Keycloak and the Spring services will fail with
> `FATAL: password authentication failed for user "postgres"`. Pick the password
> you want **before** the first up; if you need to reset, run
> `docker compose down -v` (⚠️ wipes all DB data).

### 3. Start the stack

```bash
cd infra
docker compose up -d
docker compose ps
```

First boot takes ~90 s (Keycloak imports the realm). Wait for all services to show `healthy` or `Up`.

### 4. Verify

| Endpoint                                                                 | What it shows                |
| ------------------------------------------------------------------------ | ---------------------------- |
| http://localhost:4200                                                    | Angular frontend             |
| http://localhost:8080/realms/myapp-realm                                 | Keycloak realm metadata      |
| http://localhost:8080/admin/                                             | Keycloak admin console       |
| http://localhost:8081/actuator/health                                    | user-service health          |
| http://localhost:5050                                                    | pgAdmin (admin@example.com / admin123) |
| http://localhost:8025                                                    | MailHog inbox                |

### 5. Seed test users (one-time)

The realm import doesn't ship with shareable test users (only the team's personal accounts). Run the seeding script once after the stack is up:

```bash
infra/scripts/seed-test-users.sh
```

This creates three users via the Keycloak admin API:
- `admin@test.com`  / `admin123`   — `ROLE_ADMIN`
- `user@test.com`   / `user123`    — `ROLE_USER`
- `mentor@test.com` / `mentor123`  — `ROLE_MENTOR` (mentorship-service endpoints)

The script is idempotent — re-running it skips users that already exist.

### 6. Test login

Open http://localhost:4200, click **Login**, use one of the seeded accounts above, or click **Register** to create your own.

## API Reference (selected — user-service)

| Method | Endpoint                | Auth         |
| ------ | ----------------------- | ------------ |
| POST   | `/api/users/register`   | Bearer token |
| GET    | `/api/users/me`         | Bearer token |
| GET    | `/api/users`            | ADMIN        |
| GET    | `/api/users/{id}`       | ADMIN/owner  |
| PATCH  | `/api/users/{id}/role`  | ADMIN        |

Postman collections at the repo root: [PI-user.postman_collection.json](PI-user.postman_collection.json), [PI-training-personalization.postman_collection.json](PI-training-personalization.postman_collection.json), [member4-training-crud.postman_collection.json](member4-training-crud.postman_collection.json).

## Repository layout

```
.
├── infra/                  # docker-compose, Keycloak realm, init SQL, .env.example
│   ├── docker-compose.yml
│   ├── .env.example        # ← copy to .env before first up
│   ├── keycloak/           # realm-export.json, themes
│   ├── db/                 # init-multiple-databases.sh
│   └── scripts/            # m4_smoke.sh
├── frontend/               # Angular 21 app
├── user-service/           # Spring Boot
├── interview-service/
├── training-service/
├── mentorship-service/
├── quiz-service/
├── community-service/
├── resource-service/
├── ai-training-path/       # FastAPI
├── kokoro/                 # TTS
└── vercel.json             # frontend deploy config
```

## Deployment

This branch (`integration/final`) is the integration target. Production deployment is hybrid:

| Component                        | Platform                  |
| -------------------------------- | ------------------------- |
| Spring microservices, Keycloak, Postgres, Redis, Kafka, MinIO | OpenStack Kubernetes |
| AI services (`ai-training-path`, optional Whisper/Kokoro) | Azure Container Apps |
| Angular frontend                 | Vercel                    |
| Container images                 | DockerHub (`piclouddoom/*`) |

Deployment manifests (`k8s/`, `azure/`, GitHub Actions CI) land in subsequent phases of this branch. The full target architecture is described in the Hybrid Deployment Guide (shared separately).

## Branch structure
- `main` — released code
- `integration/final` — current integration branch (you are here)
- `deployment/hybrid-openstack-azure-vercel` — deployment manifests (created in deployment phase)

## Troubleshooting

| Symptom                                                | Likely cause                                                        | Fix                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Browser: `ERR_CONNECTION_RESET` on Keycloak (8080)     | Keycloak crash-looping on Postgres auth                             | See "Postgres password baked in volume" warning above. Run `docker compose logs userservice-keycloak`. |
| Spring services restart loop                           | Same as above — wrong DB password                                   | Same fix.                                                                   |
| Port 8080/4200/5432 already in use                     | Another process bound                                               | Edit the corresponding `*_PORT` in `infra/.env` and re-up.                  |
| `Topics Kafka non créés`                               | `kafka-init` ran before Kafka was healthy                           | `docker compose restart kafka-init` and check its logs.                      |
| Frontend builds but shows blank page                   | Wrong `KEYCLOAK_ISSUER_URI` or stale browser cache                  | Hard reload (Ctrl+Shift+R), check `frontend/src/environments/environment.ts`. |

For more, see [`infra/README.md`](infra/README.md).
