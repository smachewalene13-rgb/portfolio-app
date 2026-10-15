# REST API Documentation

All version 1 endpoints are prefixed with `/api/v1`.

## Endpoints Summary

### System & Health
- `GET /api/v1/health` — Returns server status, uptime, and timestamp.

### Profile
- `GET /api/v1/profile` — Retrieve public profile information.
- `PUT /api/v1/profile` — Update portfolio profile (*Admin Auth Required*).

### Projects
- `GET /api/v1/projects` — List published projects (supports `?featured=true`).
- `GET /api/v1/projects/:id` — Retrieve project by ID.
- `POST /api/v1/projects` — Create project (*Admin Auth Required*).
- `PUT /api/v1/projects/:id` — Update project (*Admin Auth Required*).
- `DELETE /api/v1/projects/:id` — Delete project (*Admin Auth Required*).

### Skills
- `GET /api/v1/skills` — List all skills grouped by display order.
- `GET /api/v1/skills/:id` — Retrieve skill by ID.
- `POST /api/v1/skills` — Create skill (*Admin Auth Required*).
- `PUT /api/v1/skills/:id` — Update skill (*Admin Auth Required*).
- `DELETE /api/v1/skills/:id` — Delete skill (*Admin Auth Required*).

### Experience & Education
- `GET /api/v1/experience` — List career history items.
- `POST /api/v1/experience` — Add experience item (*Admin Auth Required*).
- `PUT /api/v1/experience/:id` — Update experience item (*Admin Auth Required*).
- `DELETE /api/v1/experience/:id` — Delete experience item (*Admin Auth Required*).
- `GET /api/v1/education` — List education items.
- `POST /api/v1/education` — Add education item (*Admin Auth Required*).
- `PUT /api/v1/education/:id` — Update education item (*Admin Auth Required*).
- `DELETE /api/v1/education/:id` — Delete education item (*Admin Auth Required*).

### Contact & Messages
- `POST /api/v1/contact` — Submit visitor contact message (rate-limited).
- `GET /api/v1/admin/messages` — List visitor messages (*Admin Auth Required*).
- `PATCH /api/v1/admin/messages/:id/read` — Mark message as read (*Admin Auth Required*).
- `DELETE /api/v1/admin/messages/:id` — Delete message (*Admin Auth Required*).

### Authentication
- `POST /api/v1/auth/login` — Authenticate admin credentials and return JWT.
- `POST /api/v1/auth/logout` — Logout.
- `GET /api/v1/auth/me` — Verify active JWT token (*Auth Required*).
