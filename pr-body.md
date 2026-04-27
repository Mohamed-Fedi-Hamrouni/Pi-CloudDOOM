## MS-7 — Resource Library Service (Full Module)

**Member:** Yassine Lengliz · **Branch:** `feature/member-7-resources` → `user-dockerized-stack`
**128 files changed, +21 860 / −840 lines across 6 commits**

---

## Overview

| Layer | What was built |
|---|---|
| Backend | Spring Boot `resource-service` on port 8087 — CRUD, bookmarks, stats, full-text search, soft-delete |
| AI | Multi-provider pipeline: Stub (deterministic) · Ollama (llama3) · OpenAI (GPT-4o-mini) |
| AI Features | Per-resource summary, EN/FR translation, quality score, similar resources, classification, duplicate check |
| Storage | Minio object storage for file uploads |
| Cache | Redis caching with graceful error handler |
| Security | Keycloak JWT, role-based access (ADMIN / MANAGER / USER), CORS hardened |
| Infra | Docker Compose: resource-service, Minio, Keycloak auto-import, Redis, Postgres, Kafka |
| Frontend | Angular library page, resource cards, admin panel, 8-page UX overhaul, real API wiring |
| Data | 79 curated seed resources across 12 categories and 6 industries |

---

## Backend — resource-service

### Core API `/api/resources`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resources` | Public | List all (paginated, filterable) |
| GET | `/api/resources/{id}` | Public | Get by UUID |
| GET | `/api/resources/search` | Public | Full-text search (PostgreSQL GIN index) |
| GET | `/api/resources/filter` | Public | Filter by type / level / category / industry |
| GET | `/api/resources/categories` | Public | List all categories |
| GET | `/api/resources/stats` | Public | Aggregate stats (total, by type, by level) |
| POST | `/api/resources` | MANAGER+ | Create resource |
| PUT | `/api/resources/{id}` | MANAGER+ | Update resource |
| DELETE | `/api/resources/{id}` | ADMIN | Soft-delete |
| POST | `/api/resources/{id}/upload` | MANAGER+ | Upload file to Minio |

### Bookmark API `/api/resources/bookmarks`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resources/bookmarks` | User | List my bookmarks |
| POST | `/api/resources/{id}/bookmark` | User | Add bookmark |
| DELETE | `/api/resources/{id}/bookmark` | User | Remove bookmark |

### AI API `/api/resources/ai`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resources/{id}/ai/summary` | Public | Generate/cache AI summary |
| GET | `/api/resources/{id}/ai/summary/stream` | Public | Stream summary via SSE |
| GET | `/api/resources/{id}/ai/translate?lang=en\|fr` | Public | Translate title + description |
| GET | `/api/resources/{id}/ai/quality` | Public | Quality score 0–5 with comment |
| GET | `/api/resources/{id}/ai/similar` | Public | Find semantically similar resources |
| POST | `/api/resources/ai/classify` | Public | Auto-classify by title/URL |
| POST | `/api/resources/ai/check-duplicate` | Public | Detect duplicate by similarity |
| POST | `/api/resources/ai/seed/static` | ADMIN | Idempotent curated seed |
| POST | `/api/resources/ai/generate` | ADMIN | AI-generate N resources |
| GET | `/api/resources/ai/health` | Public | Provider health check |

### AI Provider Strategy

Provider selected at runtime via `ai.generation.provider` config:

| Value | Implementation | Notes |
|---|---|---|
| `stub` | `StubAiResourceProvider` | 10 topic pools, deterministic, no external deps |
| `ollama` | `OllamaAiResourceProvider` | llama3 via local HTTP |
| `openai` | `OpenAiChatCompletionsResourceProvider` | GPT-4o-mini |

`ai.fallback-to-stub = true` auto-falls back to Stub on provider error. All AI responses are **cached in Redis** (5 min TTL). `CacheErrorHandlerConfig` ensures graceful fallthrough when Redis is unavailable.

### Database Migrations (Flyway)

| Version | Description |
|---|---|
| V1 | Initial schema: resources, categories, bookmarks, engagement |
| V2 | Fix category cascade delete |
| V3 | GIN full-text search index on title + description + tags |
| V4 | Soft-delete (`deleted_at`, `deleted_by` columns) |

### Security Model

- JWT validation via Keycloak (`issuer-uri` + `jwk-set-uri` dual config)
- Role extraction from `realm_access.roles` claim via custom `JwtAuthConverter`
- Rate limiting on AI endpoints: token-bucket per IP (`AiRateLimitFilter`)
- CORS: `allowedOriginPatterns: http://localhost:*` with credentials

---

## AI Architecture

```
ResourceController
  ├── AiResourceSummaryService      → summary + SSE stream
  ├── AiTranslationService          → EN/FR translation
  ├── AiQualityScoreService         → 0–5 quality + comment
  ├── AiRelatedResourcesService     → semantic similarity
  ├── AiClassifyService             → auto type/level/category
  ├── AiResourceGenerationService   → batch generation via provider
  │       ├── StubAiResourceProvider          (default, no deps)
  │       ├── OllamaAiResourceProvider        (local llama3)
  │       └── OpenAiChatCompletionsProvider   (GPT-4o-mini)
  └── AutoSeedService / AutoSeedController
          ├── POST /ai/seed/static  → idempotent curated seed
          └── POST /ai/generate     → dynamic AI generation
```

---

## Infrastructure

### Docker Compose Services

| Service | Port | Notes |
|---|---|---|
| postgres | 5432 / 5433 | userdb + resourcedb |
| redis | 6379 | shared cache |
| keycloak | 8090 | realm auto-imported on startup |
| kafka + zookeeper | 9092 / 2181 | event streaming |
| minio | 9000 / 9001 | object storage + console |
| user-service | 8081 | |
| resource-service | 8087 | |

### Keycloak Realm (`myapp-realm`)

- Clients: `angular-client` (public, PKCE S256), `resource-service` (confidential)
- Roles: `ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_USER`
- Test users pre-configured with hashed passwords for demo/CI

### Seed Data — `infra/db/seed-resource-demo.sql`

- **79 curated resources** across 12 categories
- **Industries:** TECHNOLOGY · CONSULTING · FINANCE · MARKETING · EDUCATION · HEALTHCARE
- **Types:** VIDEO · ARTICLE · PODCAST · BOOK · QUIZ
- **Levels:** BEGINNER · INTERMEDIATE · ADVANCED
- Real URLs: YouTube, GitHub, NeetCode, DeepLearning.ai, Coursera, fast.ai, etc.
- Idempotent inserts with `WHERE NOT EXISTS`

---

## Frontend

### Library Page

- Hero header with animated gradient orbs and dot-grid overlay
- Quick-filter stat buttons (All / Saved / Videos / Articles / Podcasts / Quizzes)
- Category sidebar with resource count badges
- Pagination with page controls
- Resource form modal (create + edit) with AI-assisted classification
- AI summary panel with SSE streaming
- Admin card overlays (edit/delete on hover)

### Resource Card (shared component)

- AI quality score badge loaded on init via `/api/resources/{id}/ai/quality`
- EN/FR translation toggle with cached result (no duplicate API calls)
- Bookmark toggle with visual feedback
- Admin edit/delete overlays (hover-reveal, reduced motion aware)

### Admin Dashboard — Library Tab

- Stats row: total resources, categories, videos, articles, podcasts, quizzes, bookmarks
- Static Seed + Force Reseed buttons with live result banner (created/skipped/warnings)
- AI Generate form: count / industry / level controls → calls `/api/resources/ai/generate`

### Settings Page

- Account tab wired to `GET/PUT /api/users/me`: firstName, lastName, phoneNumber, city, bio, preferredIndustry, preferredLanguage
- Notifications: `emailNotificationsEnabled`, `pushNotificationsEnabled`, `profileVisible` persisted to backend
- Subscription tab shows real plan and `subscriptionActive` status
- Skeleton loader while data loads; error toast on save failure

### Training & Growth Page

- `MOCK_USER` replaced by real `/api/users/me` data
- `karmaPoints` → XP; level = `floor(XP / 500) + 1` with real XP progress bar
- `simulationsUsedThisMonth` → sessions counter in stats row

### Community Page

- Tab filters (All / Success Stories / Questions / Tips) filter the post feed
- Like button: heart toggle + live count increment/decrement
- Bookmark save toggle with visual state
- Create post: type selector + content → posted to local feed with real user initials from Keycloak token

### Reports Page

- Sessions Completed and Total Practice Time sourced from `simulationsUsedThisMonth`

### Mock Interviews Page

- Real 2-minute countdown timer per question, resets on navigation
- Warning state (orange) at ≤30 s; danger state (red pulse) at ≤10 s
- 5 behavioural questions with answers persisted per-question when navigating back/forward
- Completion screen: session summary (questions answered, estimated time), "Practice Again" + "View Reports" CTAs
- `OnDestroy` clears interval to prevent memory leaks

### Quiz Assessment Page

- Real countdown: 30 s/question; total = questions × 30 s
- Warning + danger timer states
- Live search filters quiz catalog by title, description, category
- Category chip filter (All / Behavioral / Technical / Product)
- Score computed from actual user answers vs correct answer keys (was hardcoded at 67%)

### Mentorship Page

- Live search by name, company, expertise keywords
- Sort dropdown: Top Rated / Most Sessions / Price: Low / Availability
- Category chip filter by expertise domain

### Profile Page

- Full shimmer skeleton loader (cover + avatar + name lines) replaces "Loading..." text
- Cover raised to 140 px with SVG dot-pattern overlay via `::after`
- Online dot with pulsing `box-shadow` animation

### Dashboard Page

- Stats connected to `/api/users/me`, `/api/resources/bookmarks`, `/api/resources/stats`
- Readiness score ring computed from karmaPoints + sessions + profile completion
- Saved resources panel: shimmer skeleton → real bookmarks list → empty state with CTA
- Library Overview card showing per-type resource breakdown

---

## Tests

| Service | Test class | What is covered |
|---|---|---|
| resource-service | `ResourceServiceTest` | CRUD, bookmarks, stats, soft-delete |
| resource-service | `ResourceControllerTest` | All REST endpoints + auth roles |
| resource-service | `ResourceIntegrationTest` | Full stack with H2 / TestContainers |
| user-service | `UserServiceApplicationTests` | Spring context load |

---

## Test Plan

- [ ] `docker compose up` — all 8 services healthy (check `/actuator/health` on 8081 + 8087)
- [ ] Keycloak login at `http://localhost:8090` with test user → JWT issued
- [ ] `GET /api/users/me` returns real user profile
- [ ] `GET /api/resources` returns paginated resource list
- [ ] `POST /api/resources/ai/seed/static` seeds curated resources (run twice → idempotent)
- [ ] `GET /api/resources/{id}/ai/summary` returns AI summary via stub provider
- [ ] Angular app at `http://localhost:4200` — full login/redirect flow works
- [ ] Library: filter chips, search, bookmark/unbookmark, category sidebar all functional
- [ ] Admin dashboard → Library tab → Seed and Generate produce results with banner
- [ ] Settings page loads real user data, saves changes, reflects update on reload
- [ ] Interviews timer counts down in real time; quiz score matches selected answers

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
