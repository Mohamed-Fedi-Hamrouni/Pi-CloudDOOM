## Module 6 — Community & Social Service
**Developer:** Mohammed Aziz Ben Amor  
**Port:** 8086  
**Database:** `communitydb` (PostgreSQL 16)  
**Stack:** Spring Boot 3.x · Java 21 · Keycloak JWT · Redis · Groq/Llama AI · Flyway V1→V8

---

## What this PR adds

### Backend — Spring Boot 3.x microservice (`community-service/`)

A complete social community microservice with **40+ REST endpoints** across 9 domains:

| Domain | Endpoints | Flyway |
|--------|-----------|--------|
| Posts | Feed, search, CRUD, upvote, downvote, report | V1 |
| Comments | Threaded comments, upvote, delete | V1 |
| Follow | Follow/unfollow, followers, following lists, following feed | V1 |
| Karma | Points system, leaderboard, user karma | V2 |
| Bookmarks | Save/unsave posts, personal bookmarks feed | V3 |
| Career Wizard | 5-dimension scoring engine, career path recommendations | V4–V5 |
| Job Catalog | Arbeitnow API scraper, filterable job listings | V6 |
| Job Recommendations | AI-matched jobs based on career wizard scores | V7 |
| TN Interview Board | Company reviews, Groq/Llama AI summaries, Redis caching | V8 |

---

### Features detail

#### Core Community (V1–V2)
- ✅ JWT authentication via Keycloak (`sub` claim = `keycloakId`)
- ✅ Owner-based authorization (edit/delete own content only)
- ✅ Full-text search on posts (title + content + tags)
- ✅ Karma system: +1 post, +2 post upvote, +1 comment, +1 comment upvote
- ✅ Karma leaderboard (top 10 contributors)
- ✅ Public user community profile endpoint
- ✅ Following feed — posts from users you follow
- ✅ "My Posts" — personal post history

#### Bookmarks (V3)
- ✅ Save/unsave any post
- ✅ Personal bookmarks feed with pagination

#### Career Wizard (V4–V5)
- ✅ 5-dimension scoring engine: Technical · Communication · Leadership · Problem Solving · Cultural Fit
- ✅ Personalized career path recommendations based on scores
- ✅ Results persisted per user

#### Job Catalog & Recommendations (V6–V7)
- ✅ Arbeitnow API scraper — real job listings relevant to Tunisian market
- ✅ Filterable job catalog (by title, location, type)
- ✅ AI-powered job recommendations matched to user career wizard scores

#### TN Interview Board (V8)
- ✅ Company-specific interview experience submissions
- ✅ **Groq/Llama 3.3 70B** generates AI summaries per company
- ✅ Redis caching on AI summaries (avoid redundant AI calls)

---

### Frontend — Angular (`frontend/`)

**`community.component.ts`** — full community feed page:
- Real-time post feed with type/industry filters and sort
- Create, edit, delete own posts
- Inline comment threads with nested replies
- Upvote/downvote with live score updates
- Follow/unfollow from sidebar
- Karma badges on post cards (⚡ / ⭐ / 🏆)
- Karma leaderboard in right sidebar
- Real-time search with 350ms debounce
- Practice partner request post type with special UI
- Load more pagination

**`user-profile.component.ts`** — public user profile page (`/profile/:keycloakId`):
- Avatar, display name, karma score
- Follower/following counts with follow/unfollow button
- Recent posts feed
- Author hover card on post cards (400ms delay, shows mini profile)

**New service:** `community-api.service.ts` — 20+ typed methods covering all endpoints.

---

## 🔧 Integration Readiness (added in this update)

| Check | Status |
|---|---|
| Dockerfile (multi-stage, Maven 3.9.6 + JRE 21 Alpine) | ✅ |
| docker-compose entry in `infra/` (port 8086, healthcheck, env vars) | ✅ |
| Swagger UI at `/swagger-ui.html` | ✅ |
| Actuator health at `/actuator/health` | ✅ |
| All config externalized with `${VAR:default}` pattern | ✅ |
| CORS updated to include Kong API Gateway (`localhost:8080`) | ✅ |

---

## How to test

1. Start infra: `docker compose up -d` from `infra/`
2. Run community-service: `mvn spring-boot:run` from `community-service/`
3. Run frontend: `ng serve` from `frontend/`
4. Open `http://localhost:4200/community`
5. Login with `user1@interviewprep.tn` / `Test1234x`

**Verify integration:**
- Health: http://localhost:8086/actuator/health
- Swagger: http://localhost:8086/swagger-ui.html

---

## Endpoints summary

```
# Core Posts
GET    /api/community/posts                          Public
GET    /api/community/posts/search?q=                Public
GET    /api/community/posts/{id}                     Public
POST   /api/community/posts                          Auth required
PUT    /api/community/posts/{id}                     Owner only
DELETE /api/community/posts/{id}                     Owner/Admin
POST   /api/community/posts/{id}/upvote              Public
POST   /api/community/posts/{id}/downvote            Public
POST   /api/community/posts/{id}/report              Public
GET    /api/community/posts/my-posts                 Auth required

# Comments
GET    /api/community/posts/{id}/comments            Public
POST   /api/community/posts/{id}/comments            Auth required
DELETE /api/community/comments/{id}                  Owner only
POST   /api/community/comments/{id}/upvote           Public

# Follow & Feed
POST   /api/community/follow/{keycloakId}            Auth required
DELETE /api/community/follow/{keycloakId}            Auth required
GET    /api/community/follow/followers               Auth required
GET    /api/community/follow/following               Auth required
GET    /api/community/follow/{id}/status             Auth required
GET    /api/community/feed/following                 Auth required

# Karma
GET    /api/community/karma/leaderboard              Public
GET    /api/community/karma/me                       Auth required
GET    /api/community/karma/{keycloakId}             Public

# Bookmarks
POST   /api/community/bookmarks/{postId}             Auth required
DELETE /api/community/bookmarks/{postId}             Auth required
GET    /api/community/bookmarks                      Auth required

# User Profile
GET    /api/community/users/{keycloakId}/profile     Public
GET    /api/community/users/{keycloakId}/is-following Auth required

# Career Wizard
POST   /api/community/career-wizard/submit           Auth required
GET    /api/community/career-wizard/results          Auth required
GET    /api/community/career-wizard/recommendations  Auth required

# Job Catalog & Recommendations
GET    /api/community/jobs                           Auth required
GET    /api/community/jobs/recommendations           Auth required

# TN Interview Board
GET    /api/community/interview-board                Public
GET    /api/community/interview-board/{company}      Public
POST   /api/community/interview-board                Auth required
```

---

## Required Environment Variables

| Variable | Default (local dev) |
|---|---|
| `DB_HOST` | `localhost` |
| `DB_NAME` | `communitydb` |
| `DB_PASSWORD` | `0000` |
| `KEYCLOAK_URL` | `http://localhost:8080` |
| `KEYCLOAK_REALM` | `InterviewPrepRealm` |
| `REDIS_HOST` | `localhost` |
| `GROQ_API_KEY` | *(required for AI features)* |

---

## Notes for reviewers
- No direct DB dependency on user-service — users identified by `keycloakId` only
- Flyway handles all schema migrations automatically on startup (V1→V8)
- All endpoints tested with Yaak API client
- Frontend uses `ChangeDetectionStrategy.OnPush` throughout
- Redis must be running for TN Interview Board AI summary caching
