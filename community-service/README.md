# Community Service

A Spring Boot 3.x microservice for managing community interactions, including posts, comments, and user follows. Part of the **InterviewPrep TN** platform (Module 6 - Community & Social).

## Overview

The Community Service provides a RESTful API for:
- **Posts** — users can create discussion threads, ask questions, share success stories, and tips
- **Comments** — threaded comments with upvoting and editing flags
- **Follows** — users can follow other community members
- **Voting** — upvote/downvote posts and comments to surface quality content
- **Reporting** — users can report inappropriate content

## Tech Stack

- **Java 21** with Spring Boot 3.5.12
- **PostgreSQL** for persistence
- **Spring Data JPA** + Hibernate for ORM
- **Flyway** for database migrations
- **Spring Security** + OAuth2 Resource Server for JWT-based auth (Keycloak)
- **Maven** for builds
- **Lombok** for reducing boilerplate

## Prerequisites

- Java 21+
- Maven 3.8+
- PostgreSQL 12+
- Keycloak instance running at `http://localhost:8080` with realm `myapp-realm`

## Setup & Running

### 1. Create Database

```bash
createdb communitydb
```

If using a different user/password, update `application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/communitydb
    username: postgres
    password: devpassword
```

### 2. Build & Run

```bash
mvn clean compile
mvn spring-boot:run
```

Or with IDE (IntelliJ, VS Code):
1. Load the project
2. Run `CommunityServiceApplication.java`

Server starts on **port 8086**.

### 3. Database Initialization

Flyway automatically runs migrations on startup:
- `V1__create_community_tables.sql` creates posts, comments, follows tables with indexes

## Project Structure

```
src/main/java/com/microservice/community_service/
├── model/               # JPA entities
│   ├── Post.java       # Community post with voting & view tracking
│   ├── Comment.java    # Threaded comments with upvotes
│   └── Follow.java     # User follow relationships
├── repository/         # JPA repositories (Spring Data)
│   ├── PostRepository.java
│   ├── CommentRepository.java
│   └── FollowRepository.java
├── dto/                # Data transfer objects
│   ├── PostResponse.java
│   ├── CreatePostRequest.java
│   ├── UpdatePostRequest.java
│   ├── CommentResponse.java
│   ├── CreateCommentRequest.java
│   ├── FollowResponse.java
│   └── PageResponse.java
├── service/            # Business logic
│   └── CommunityService.java
├── controller/         # REST endpoints
│   └── CommunityController.java
├── config/             # Spring configuration
│   ├── SecurityConfig.java
│   └── JwtAuthConverter.java
└── exception/          # Global error handling
    └── GlobalExceptionHandler.java

src/main/resources/
├── application.yaml    # Configuration
└── db/migration/
    └── V1__create_community_tables.sql
```

## API Endpoints

### Posts (Public Read, Authenticated Write)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/community/posts` | Public | List posts (paginated, filterable) |
| GET | `/api/community/posts/{id}` | Public | Get post (increments view count) |
| POST | `/api/community/posts` | Required | Create post |
| PUT | `/api/community/posts/{id}` | Required | Update own post |
| DELETE | `/api/community/posts/{id}` | Required | Delete own post (admins can delete any) |
| POST | `/api/community/posts/{id}/upvote` | Public | Upvote post |
| POST | `/api/community/posts/{id}/downvote` | Public | Downvote post |
| POST | `/api/community/posts/{id}/report` | Public | Report post as inappropriate |

### Comments (Public Read, Authenticated Write)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/community/posts/{postId}/comments` | Public | Get post comments (ordered by creation) |
| POST | `/api/community/posts/{postId}/comments` | Required | Add comment to post |
| DELETE | `/api/community/comments/{id}` | Required | Delete own comment |
| POST | `/api/community/comments/{id}/upvote` | Public | Upvote comment |

### Follows (Authenticated)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/community/follow/{targetKeycloakId}` | Required | Follow user |
| DELETE | `/api/community/follow/{targetKeycloakId}` | Required | Unfollow user |
| GET | `/api/community/follow/{keycloakId}/status` | Required | Check if following |
| GET | `/api/community/follow/followers` | Required | Get your followers |
| GET | `/api/community/follow/following` | Required | Get users you're following |

## Query Parameters

### GET /api/community/posts

```bash
GET /api/community/posts?page=0&size=10&type=DISCUSSION&industry=tech&sort=createdAt,desc
```

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| page | int | 0 | 0-indexed page number |
| size | int | 10 | Items per page |
| type | string | — | Filter by type: `DISCUSSION`, `QUESTION`, `SUCCESS_STORY`, `TIP` |
| industry | string | — | Filter by industry |
| sort | string | `createdAt,desc` | Sort field and direction: `field,asc` or `field,desc` |

## Authentication

- Uses **Keycloak** as OAuth2 provider
- JWT tokens issued by Keycloak are validated at `http://localhost:8080/realms/myapp-realm/protocol/openid-connect/certs`
- User identification: **`sub` claim** in JWT becomes the `keycloakId`
- Roles extracted from **`realm_access.roles`** and prefixed with `ROLE_`

### Sending Authenticated Requests

Include the JWT in the Authorization header:

```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
  -X POST http://localhost:8086/api/community/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Great interview tips",
    "content": "Here are my top 5 interview tips...",
    "type": "TIP",
    "industry": "tech",
    "tags": "interviews,tips"
  }'
```

## Database Schema

### posts
- `id` — BIGSERIAL PRIMARY KEY
- `author_keycloak_id` — VARCHAR(255) NOT NULL
- `title` — VARCHAR(500) NOT NULL
- `content` — TEXT NOT NULL
- `type` — VARCHAR(50) NOT NULL (DISCUSSION, QUESTION, SUCCESS_STORY, TIP)
- `industry` — VARCHAR(50)
- `tags` — VARCHAR(500)
- `upvotes` — INTEGER DEFAULT 0
- `downvotes` — INTEGER DEFAULT 0
- `view_count` — INTEGER DEFAULT 0
- `is_pinned` — BOOLEAN DEFAULT false
- `is_reported` — BOOLEAN DEFAULT false
- `created_at`, `updated_at` — TIMESTAMP

**Indexes:** author_keycloak_id, type, industry

### comments
- `id` — BIGSERIAL PRIMARY KEY
- `post_id` — BIGINT NOT NULL (FK → posts)
- `author_keycloak_id` — VARCHAR(255) NOT NULL
- `content` — TEXT NOT NULL
- `parent_comment_id` — VARCHAR(50) (for threading)
- `upvotes` — INTEGER DEFAULT 0
- `is_edited`, `is_reported` — BOOLEAN
- `created_at` — TIMESTAMP

**Indexes:** post_id

### follows
- `id` — BIGSERIAL PRIMARY KEY
- `follower_keycloak_id` — VARCHAR(255) NOT NULL
- `following_keycloak_id` — VARCHAR(255) NOT NULL
- `followed_at` — TIMESTAMP
- **UNIQUE constraint:** (follower_keycloak_id, following_keycloak_id)

**Indexes:** follower_keycloak_id, following_keycloak_id

## CORS Configuration

Frontend at `http://localhost:4200` is allowed to:
- Make requests to any endpoint
- Use any HTTP method
- Send any headers

Update in `SecurityConfig.java` to allow additional origins.

## Error Handling

All endpoints return JSON error responses:

### 404 Not Found
```json
{ "error": "Not found" }
```

### 403 Forbidden
```json
{ "error": "Forbidden" }
```

### 400 Bad Request (Validation)
```json
{
  "error": "Validation failed",
  "fields": {
    "title": "Title is required",
    "content": "Content is required"
  }
}
```

## Example Workflows

### Create a Post

```bash
curl -X POST http://localhost:8086/api/community/posts \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Strategies for algorithm interviews",
    "content": "I recently prepared for interviews. Here are my tips...",
    "type": "TIP",
    "industry": "tech",
    "tags": "algorithms,interviews"
  }'
```

Response (201):
```json
{
  "id": 1,
  "authorKeycloakId": "user-123",
  "title": "Strategies for algorithm interviews",
  "content": "I recently prepared...",
  "type": "TIP",
  "industry": "tech",
  "tags": "algorithms,interviews",
  "upvotes": 0,
  "downvotes": 0,
  "viewCount": 0,
  "isPinned": false,
  "isReported": false,
  "score": 0,
  "createdAt": "2026-03-25T15:00:00",
  "updatedAt": "2026-03-25T15:00:00"
}
```

### Add a Comment

```bash
curl -X POST http://localhost:8086/api/community/posts/1/comments \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great tips! I especially liked tip #3.",
    "parentCommentId": null
  }'
```

### Follow a User

```bash
curl -X POST http://localhost:8086/api/community/follow/user-456 \
  -H "Authorization: Bearer <JWT>"
```

Returns 204 No Content.

### List Posts with Filters

```bash
curl http://localhost:8086/api/community/posts?type=QUESTION&industry=tech&page=0&size=20&sort=upvotes,desc
```

## Development

### Running Tests

```bash
mvn test
```

### Code Style

- Lombok is used for `@Data`, `@Builder`, `@RequiredArgsConstructor`
- JPA entities use `@Entity` and `@Table`
- DTOs are plain POJOs with Lombok
- Services are singleton `@Service` beans

### Adding Endpoints

1. Add method to `CommunityService`
2. Add `@RequestMapping` method to `CommunityController`
3. Use `@AuthenticationPrincipal Jwt jwt` to extract `jwt.getSubject()` for keycloakId
4. Apply `@Valid` to request DTOs for validation

### Database Migrations

Add new migrations to `src/main/resources/db/migration/`:
```sql
-- V2__add_new_feature.sql
ALTER TABLE posts ADD COLUMN new_column VARCHAR(255);
```

Flyway runs them in order automatically on startup.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **403 Forbidden on POST** | Ensure JWT token is valid and not expired. Check Keycloak config. |
| **404 on GET /posts/{id}** | Post ID doesn't exist. Check database or create new post first. |
| **Connection refused on startup** | PostgreSQL not running or wrong connection string in `application.yaml` |
| **Keycloak token validation fails** | Verify issuer-uri and jwk-set-uri point to running Keycloak instance |
| **Build fails with Lombok warnings** | Normal. Lombok uses internal APIs. Does not affect runtime. |

## Integration with InterviewPrep TN

This service is **Module 6** and integrates with:
- **User Service** — for user profiles and validation
- **Keycloak** — for identity and authentication
- **Frontend** (Angular) — consuming API at `http://localhost:4200`

Posts, comments, and follows are persisted independently and referenced by Keycloak ID.

## License

Part of InterviewPrep TN microservices platform.
