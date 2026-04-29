# Interview Service

A Spring Boot microservice that powers the full interview pipeline — from session management to AI-driven evaluation, live avatar interactions, speech recognition, and performance reporting.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Java 21, Spring Boot 4.0.4 |
| Security | Keycloak (OAuth2 / JWT) |
| Database | PostgreSQL + Flyway migrations |
| Messaging | Apache Kafka |
| AI / LLM | Groq (`llama-3.3-70b-versatile`) |
| STT | Whisper (HTTP), Vosk (local — EN / FR / AR_TN) |
| TTS | Kokoro |
| Avatars | Simli, D-ID |
| Containerization | Docker (multi-stage, `eclipse-temurin:21-jre-alpine`) |

---

## Features

- **Interview session lifecycle** — create, pause, resume, complete, cancel
- **3 interview types** — Behavioral, Technical, Case Study
- **Multilingual support** — English, French, Tunisian Arabic
- **Live interview mode** — turn-by-turn recruiter agent with real-time voice + avatar
- **Speech-to-text** — Whisper (remote) and Vosk (local, offline)
- **Text-to-speech** — Kokoro TTS integration
- **AI question generation** — dynamic questions via Groq
- **Behavioral metrics** — communication score, hesitation, stress proxy, confidence proxy, silence ratio
- **Video analysis** — blink rate, gaze stability, head motion, brow/mouth tension
- **Performance reports** — aggregated scoring per session
- **Progress tracking** — per-user interview history and improvement metrics
- **Kafka events** — publishes `SessionCompletedEvent` to `interview.session.completed`

---

## API Endpoints

### Interview Sessions — `/api/interview-sessions`

| Method | Path | Description | Role |
|---|---|---|---|
| `POST` | `/` | Create a new session | USER |
| `GET` | `/{id}` | Get session by ID | USER |
| `GET` | `/me` | Get current user's sessions | USER |
| `PATCH` | `/{id}` | Update session | USER |
| `POST` | `/{id}/pause` | Pause session | USER |
| `POST` | `/{id}/resume` | Resume session | USER |
| `POST` | `/{id}/complete` | Complete session | USER |
| `POST` | `/{id}/cancel` | Cancel session | USER |
| `DELETE` | `/{id}` | Delete own session | USER |
| `GET` | `/{id}/next-question` | Get next question | USER |
| `POST` | `/{id}/responses` | Submit a response | USER |
| `GET` | `/admin/by-user/{userId}` | List sessions by user | ADMIN |
| `DELETE` | `/admin/{id}` | Delete any session | ADMIN |

### Live Interviews — `/api/live-interviews`

| Method | Path | Description |
|---|---|---|
| `POST` | `/{sessionId}/start` | Start a live interview |
| `GET` | `/{sessionId}/status` | Get live session status |
| `POST` | `/{sessionId}/commit-turn` | Submit turn response |
| `POST` | `/{sessionId}/end` | End the live interview |

### Questions — `/api/questions` (ADMIN only)

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List questions (paginated, filterable) |
| `POST` | `/` | Create a new question |

### Public Endpoints

| Path | Description |
|---|---|
| `/api/live-voice/**` | TTS voice synthesis |
| `/api/avatar/**` | Avatar interactions |
| `/actuator/health` | Health check |

---

## Data Model

### InterviewSession

| Field | Type | Notes |
|---|---|---|
| `userId` | String | Keycloak subject |
| `type` | Enum | BEHAVIORAL, TECHNICAL, CASE_STUDY |
| `language` | Enum | EN, FR, AR_TN |
| `industry` | Enum | IT_TECH, FINANCE, HEALTH, ENGINEERING, CONSULTING, SALES_MARKETING |
| `targetLevel` | Enum | INTERN → LEAD |
| `status` | Enum | IN_PROGRESS, PAUSED, COMPLETED, CANCELLED |
| `durationMinutes` | Integer | |
| `difficultyLevel` | Integer | Auto-incremented during session |
| `isRecorded` | Boolean | |
| `consentGiven` | Boolean | |

### Response

Captures every submitted answer including:
- Transcription, audio/video URLs, duration, word count
- AI feedback and overall score
- Behavioral metrics (communication, hesitation, stress, confidence, volume, silence ratio)
- Video metrics (blink rate, gaze stability, head motion, brow/mouth tension)

---

## Configuration

All sensitive values are injected via environment variables. Set the following before running:

```env
# Keycloak
KEYCLOAK_ISSUER_URI=http://localhost:8080/realms/myapp-realm
KEYCLOAK_JWK_SET_URI=http://localhost:8080/realms/myapp-realm/protocol/openid-connect/certs

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/interviewdb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=yourpassword

# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092

# AI / External services
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_BASE_URL=https://api.groq.com

WHISPER_BASE_URL=http://localhost:8000
APP_TTS_KOKORO_BASE_URL=http://localhost:8880
```

---

## Running with Docker Compose

From the `infra/` directory:

```bash
docker compose up --build interview-service
```

The service starts on port **8082** (configurable via `INTERVIEW_SERVICE_PORT`).

---

## Running Locally

```bash
cd interview-service
./mvnw spring-boot:run
```

Requires PostgreSQL (`interviewdb`), Kafka, and Keycloak running locally.

---

## Database Migrations

Flyway migrations are in `src/main/resources/db/migration/` (24 versioned scripts, V1 → V23+). They run automatically on startup.

---

## Kafka Events

| Topic | Event | Trigger |
|---|---|---|
| `interview.session.completed` | `SessionCompletedEvent` | Session marked as COMPLETED |

---

## Security

- All endpoints require a valid JWT issued by Keycloak (except `/api/live-voice/**`, `/api/avatar/**`, `/actuator/health`)
- Role-based access: `USER`, `ADMIN`, `MANAGER`, `MENTOR`
- CORS configured for `http://localhost:4200`
