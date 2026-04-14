# Taskboard

A small **full-stack** demo: **Express** REST API, **vanilla** web UI, JSON file persistence, **Docker**, and **automated tests** (runs in CI on this monorepo).

## Run locally

```bash
cd projects/taskboard
npm install
npm test
npm start
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## API

| Method | Path | Body | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Liveness |
| GET | `/api/tasks` | — | List tasks |
| POST | `/api/tasks` | `{ "title": "…" }` | Create |
| PATCH | `/api/tasks/:id` | `{ "done": true }` or `{ "title": "…" }` | Update |
| DELETE | `/api/tasks/:id` | — | Delete |

## Docker

```bash
docker compose up --build
```

Data is stored in a named volume (`taskdata`) so tasks survive container restarts.

## What this demonstrates

- Clear **separation** between API (`src/`), UI (`public/`), and persistence (`data/`).
- **Production-shaped** defaults: JSON body limit, structured errors, health route.
- **CI** via GitHub Actions (see repo root `.github/workflows/taskboard-ci.yml`).

## Extend next

- Swap JSON file for **PostgreSQL** or **SQLite**.
- Add **OpenAPI** spec and contract tests.
- Deploy to **Fly.io**, **Railway**, or **AWS App Runner** and link the URL on your portfolio.
