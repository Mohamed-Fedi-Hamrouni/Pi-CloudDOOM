# Job Board Feature — Technical Documentation

**Branch:** `feature/m6-community-service`  
**Module:** `community-service` + Angular frontend

---

## Overview

The Job Board is a community sub-feature that lets users browse, filter, and apply to tech jobs in Tunisia and remote positions. It is accessible from the Community page via the **Job Board** button and lives at the route `/community/jobs`.

---

## Architecture

```
User clicks "Job Board"
        │
        ▼
Angular Route /community/jobs
        │
        ▼
JobsComponent (frontend)
        │  HTTP GET /api/community/career/jobs?page=&size=&industry=&workType=&keyword=
        ▼
CareerWizardController (Spring Boot)
        │
        ▼
JobCatalogRepository (JPA)
        │
        ▼
PostgreSQL → job_catalog table
```

Jobs in the catalog come from two sources:
- **Static seed data** — pre-loaded by Flyway migration `V7`
- **External scrapers** — `ExternalJobFetcherService` pulls from Arbeitnow and RemoteOK APIs nightly

---

## Backend

### Database Schema

**Migration `V5__job_catalog.sql`**

```sql
CREATE TABLE job_catalog (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    company         VARCHAR(200),
    location        VARCHAR(150),
    description     TEXT,
    required_skills TEXT,          -- comma-separated, e.g. "Java,Spring,Docker"
    industry        VARCHAR(100),  -- Technology | Finance | Healthcare | ...
    career_level    VARCHAR(20),   -- JUNIOR | MID | SENIOR | ANY
    work_type       VARCHAR(20),   -- REMOTE | HYBRID | ONSITE | ANY
    salary_min      INT,
    salary_max      INT,
    job_url         VARCHAR(500),
    source          VARCHAR(30) NOT NULL DEFAULT 'STATIC',  -- STATIC | SCRAPED | USER_SUBMITTED
    submitted_by    VARCHAR(255),  -- keycloakId of submitter (null for scraped/static)
    active          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_job_active   ON job_catalog(active);
CREATE INDEX idx_job_source   ON job_catalog(source);
CREATE INDEX idx_job_industry ON job_catalog(industry);
CREATE INDEX idx_job_level    ON job_catalog(career_level);
```

**Migration `V6__job_recommendations.sql`**

Stores per-user job matches computed by the recommendation engine.

```sql
CREATE TABLE job_recommendations (
    id               BIGSERIAL PRIMARY KEY,
    user_keycloak_id VARCHAR(255) NOT NULL,
    job_id           BIGINT REFERENCES job_catalog(id) ON DELETE CASCADE,
    match_score      INT NOT NULL,
    match_reasons    TEXT,
    generated_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### Model — `JobCatalog.java`

JPA entity mapped to `job_catalog`. Notable detail: `requiredSkills` is stored as a comma-delimited string and exposed as a parsed list via a helper method:

```java
public List<String> getRequiredSkillList() {
    return Arrays.stream(requiredSkills.split(","))
        .map(String::trim)
        .toList();
}
```

---

### Repository — `JobCatalogRepository.java`

Extends `JpaRepository<JobCatalog, Long>`. The key method is the filtered paginated query:

```java
@Query("SELECT j FROM JobCatalog j WHERE j.active = true " +
       "AND (:industry IS NULL OR LOWER(j.industry) LIKE LOWER(CONCAT('%', :industry, '%'))) " +
       "AND (:workType IS NULL OR j.workType = :workType) " +
       "AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
       "  OR LOWER(j.requiredSkills) LIKE LOWER(CONCAT('%', :keyword, '%')))")
Page<JobCatalog> findWithFilters(String industry, String workType, String keyword, Pageable pageable);
```

All three filter parameters are optional — passing `null` skips that filter.

---

### Controller — `CareerWizardController.java`

Base path: `GET /api/community/career/jobs`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/community/career/jobs` | JWT | List jobs with filters + pagination |
| `POST` | `/api/community/career/jobs/submit` | JWT | Submit a community-sourced job |
| `POST` | `/api/community/career/jobs/fetch` | — | Manually trigger the external scraper |

**List endpoint parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | int | 0 | Zero-based page number |
| `size` | int | 20 | Page size |
| `industry` | string | — | Filter by industry (partial match) |
| `workType` | string | — | Filter by `REMOTE`/`HYBRID`/`ONSITE` |
| `keyword` | string | — | Search in title and required skills |

Response is a Spring `Page<JobCatalog>` serialized as JSON with standard `content`, `totalPages`, `number` fields.

---

### Service — `ExternalJobFetcherService.java`

Runs on a cron schedule (`0 0 3 * * *` — every day at 03:00) and pulls jobs from two free public APIs:

**Arbeitnow** (`https://www.arbeitnow.com/api/job-board-api`)
- Fetches pages 1 and 2
- Maps `tags` → `requiredSkills`, `company_name` → `company`, `url` → `jobUrl`
- Deduplication: skips entries where `jobUrl` already exists in DB

**RemoteOK** (`https://remoteok.com/api`)
- Fetches the full listing (first element is a legal notice — skipped)
- Maps `position` → `title`, `tags` → `requiredSkills`

Both scrapers call `inferIndustry(tags)` to classify jobs into `Technology` or `Finance` based on tag keywords. All scraped jobs get `source = "SCRAPED"`.

The endpoint `POST /api/community/career/jobs/fetch` triggers `fetchNow()` on demand and returns the count of newly added jobs.

---

### Recommendation Engine — `JobRecommendationEngine.java`

A scoring algorithm (0–100) run when a user completes the Career Wizard. Each active job is scored against the user's wizard profile across 5 dimensions:

| Dimension | Max Points | Logic |
|-----------|-----------|-------|
| Target role match | 30 | Job title contains any of the user's target roles |
| Skills overlap | 25 | Ratio of matching skills × 25 |
| Industry match | 20 | Job industry matches any of user's target industries |
| Career level | 15 | Job level matches user's level, or job is `ANY` |
| Work type | 10 | Job work type matches user's preference, or either is `ANY` |

Top 10 scored jobs (score > 0) are persisted in `job_recommendations`. Each recommendation also carries human-readable `reasons` (e.g. `"Your skills match: Java, Spring"`).

---

## Frontend

### Route Registration — `app.routes.ts`

```typescript
{ path: 'community/jobs', loadComponent: () =>
    import('./pages/community/jobs/jobs.component')
    .then(m => m.JobsComponent) }
```

Lazy-loaded as a standalone component under the authenticated shell.

### Entry Point — `community.component.ts`

The Job Board button in the community header navigates programmatically:

```typescript
<button (click)="router.navigate(['/community/jobs'])">Job Board</button>
```

### Component — `JobsComponent`

**File:** `frontend/src/app/pages/community/jobs/jobs.component.ts`

A standalone Angular component using `ChangeDetectionStrategy.OnPush`.

**State:**

| Property | Type | Description |
|----------|------|-------------|
| `jobs` | `any[]` | Current page of jobs |
| `currentPage` | `number` | Zero-based page index |
| `totalPages` | `number` | Total pages from API |
| `pageSize` | `number` | Fixed at 12 per page |
| `isLoading` | `boolean` | Skeleton loading state |
| `keyword` | `string` | Search input |
| `selectedIndustry` | `string` | Industry filter |
| `selectedWorkType` | `string` | Work type filter |
| `wizardProfile` | `any` | Loaded on init; used to generate cover letters |
| `selectedJob` | `any` | Job open in the apply modal |

**Key methods:**

```typescript
ngOnInit()          // loads first page + fetches wizard profile for cover letter generation
loadJobs()          // calls communityApi.getJobs() with current filters/page
search()            // resets to page 0, re-runs loadJobs()
clearFilters()      // resets all filter fields, re-runs loadJobs()
nextPage()          // increments page, re-runs loadJobs()
prevPage()          // decrements page, re-runs loadJobs()
backToCommunity()   // router.navigate(['/community'])
openApplyModal(job) // sets selectedJob, opens modal
closeApplyModal()   // clears modal state
```

**UI sections:**
1. Header with back button and page title
2. Filter bar — keyword search, industry dropdown, work type dropdown, Search/Clear buttons
3. Skeleton loading cards (shown while `isLoading`)
4. Job grid — cards showing title, company, location, salary, skills badges, Apply button
5. Pagination controls
6. Apply modal — shows job details, cover letter generator (using wizard profile)

### Frontend API Service — `CommunityApiService`

```typescript
getJobs(page, size, industry?, workType?, keyword?): Observable<any> {
  let params = new HttpParams().set('page', page).set('size', size);
  if (industry) params = params.set('industry', industry);
  if (workType) params = params.set('workType', workType);
  if (keyword)  params = params.set('keyword', keyword);
  return this.http.get(`${this.apiUrl}/career/jobs`, { params });
}
```

Base URL resolves to `http://localhost:8086/api/community` (community-service port).

---

## Data Flow Summary

```
1. User opens /community/jobs
2. JobsComponent.ngOnInit() → getJobs(page=0, size=12)
3. GET /api/community/career/jobs → CareerWizardController.listJobs()
4. JobCatalogRepository.findWithFilters(null, null, null, PageRequest.of(0,12))
5. Returns Page<JobCatalog> → component renders job cards

6. User types keyword + selects industry → clicks Search
7. search() resets page to 0 → loadJobs() called again with filters
8. Same HTTP call with ?keyword=...&industry=... query params

9. User clicks Apply → openApplyModal(job)
10. Modal shows job details + cover letter built from wizardProfile

11. User clicks "Back to Community" → backToCommunity() → navigate(['/community'])
```

---

## File Index

| File | Role |
|------|------|
| `community-service/.../model/JobCatalog.java` | JPA entity, `job_catalog` table |
| `community-service/.../model/JobRecommendation.java` | JPA entity, `job_recommendations` table |
| `community-service/.../repository/JobCatalogRepository.java` | JPQL filtered query |
| `community-service/.../repository/JobRecommendationRepository.java` | Recommendation persistence |
| `community-service/.../service/ExternalJobFetcherService.java` | Nightly scraper (Arbeitnow + RemoteOK) |
| `community-service/.../service/JobRecommendationEngine.java` | 100-point scoring algorithm |
| `community-service/.../service/CareerService.java` | Orchestrates wizard + recommendations + job submission |
| `community-service/.../controller/CareerWizardController.java` | REST endpoints |
| `community-service/.../resources/db/migration/V5__job_catalog.sql` | Schema: job_catalog |
| `community-service/.../resources/db/migration/V6__job_recommendations.sql` | Schema: job_recommendations |
| `community-service/.../resources/db/migration/V7__job_catalog_seed_data.sql` | Seed data |
| `frontend/.../pages/community/jobs/jobs.component.ts` | Angular job board UI |
| `frontend/.../core/services/community-api.service.ts` | Frontend HTTP client methods |
| `frontend/.../app.routes.ts` | Route registration `/community/jobs` |
