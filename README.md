# User Microservice — InterviewPrep TN

## Tech Stack
- Spring Boot 4.x
- Keycloak 24 (Identity)
- PostgreSQL 16
- Redis 7
- Kafka 7.5
- Flyway 11 (migrations)

## Quick Start

### 1 — Prerequisites
- Docker Desktop installed and running
- Java 21
- Maven 3.x

### 2 — Start infrastructure
```bash
cd infra
cp .env.example .env
docker compose up -d
```

Wait 90 seconds for Keycloak to fully start.

### 3 — Run the application
```bash
cd user-service
mvn spring-boot:run
```

Flyway will automatically create the `users` table on first run.

### 4 — Verify
- API running at: `http://localhost:8081`
- Keycloak at: `http://localhost:8080` (admin / 0000)
- Health check: `http://localhost:8081/actuator/health`

## Keycloak credentials
- Realm: `myapp-realm`
- Admin: `admin` / `0000`
- Test admin user: `admin@test.com` / `admin123`
- Test regular user: `user@test.com` / `user123`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/register` | Bearer token | Register new user |
| GET | `/api/users/me` | Bearer token | Get current user |
| PUT | `/api/users/me` | Bearer token | Update current user |
| GET | `/api/users` | ADMIN only | Get all users |
| GET | `/api/users/{id}` | ADMIN or owner | Get user by ID |
| PUT | `/api/users/{id}` | ADMIN or owner | Update user |
| DELETE | `/api/users/{id}` | ADMIN only | Soft delete user |
| GET | `/api/users/search?query=` | ADMIN only | Search users |
| PATCH | `/api/users/{id}/role` | ADMIN only | Update user role |
| PATCH | `/api/users/{id}/status` | ADMIN only | Update user status |

## Branch structure
- `develop` — main integration branch, always pull from here
- `feature/member-2-infrastructure` — Docker + DB setup
- `member-3-security-config` — JWT security layer
- `member-4-domain-layer` — User entity + CRUD
