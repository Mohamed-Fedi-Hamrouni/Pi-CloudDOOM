# MS-7 Demo Script (Resource Library)

## 1. Environment Health (30s)
- Open `http://localhost:8081/actuator/health` -> expect `UP`.
- Open `http://localhost:8087/actuator/health` -> expect `UP`.
- Open frontend at `http://localhost:50182`.

## 2. Login + Access (30s)
- Login with `adminyosr@test.com / 0000`.
- Navigate to Library page.
- Expected: Resource count visible, no backend error banner.

## 3. Library Functional Flow (60s)
- Use search box (ex: `k8s` or `system`) and show filtered results.
- Switch content tabs (`Articles`, `Videos`, etc.).
- Apply level filter (`Beginner`, `Intermediate`, `Advanced`).
- Save a resource and show `Saved` count increments.
- Unsave resource and show count decrements.

## 4. RBAC / Security Checks (60s)
- Public endpoints work without auth:
  - `GET /api/resources`
  - `GET /api/resources/filter`
  - `GET /api/resources/categories`
- Auth-required endpoints reject anonymous access:
  - `GET /api/resources/bookmarks` -> `401`
- Admin-only management endpoints:
  - create/update/delete resource/category by admin token -> success
  - same operation with normal user token -> forbidden/unauthorized

## 5. Final Proof (30s)
- Show Postman run result for resource suite: `25 passed, 0 failed`.
- Show frontend Library page with real backend data loaded.

## Useful Test Accounts
- Admin: `adminyosr@test.com` / `0000`
- User: `useryosr@test.com` / `0000`
