# Taskboard — full project brief (for interviews & clients)

Use this file to **explain the project in your own words**. You do not need to memorise it verbatim.

---

## One-line pitch

**Taskboard** is a small production-style web app: a **REST API** and **browser UI** for managing tasks, with **JSON file persistence**, **Docker**, **automated tests**, and **CI** that runs on every change.

---

## Problem it solves (demo scope)

Teams need a **simple, inspectable example** of:

- How a **frontend** talks to a **backend** over HTTP.
- How to **persist** state and keep behaviour **testable**.
- How to **package** the same app in **Docker** and verify it in **CI**.

This is not a commercial product; it is a **portfolio-quality sample** you can extend (database, auth, cloud deploy).

---

## What you built (architecture)

```
Browser (public/)
    → HTTP JSON
        → Express (src/server.js)
            → TaskStore (src/tasks.js)
                → data/tasks.json (on disk; or volume in Docker)
```

- **`src/server.js`** — Express app: static files for the UI, JSON API under `/api/*`, health check at `/api/health`, sensible error responses and body size limit.
- **`src/tasks.js`** — **TaskStore** class: create / list / update / delete tasks; validates input (e.g. empty titles); persists to a single JSON file.
- **`public/`** — **Vanilla HTML/CSS/JS** (no build step): calls the API with `fetch`, updates the list, handles errors.
- **`tests/`** — **Node.js built-in test runner** (`node --test`): exercises `TaskStore` with **temporary files** so tests do not touch real data.
- **`Dockerfile` + `docker-compose.yml`** — Same app in a container; **named volume** keeps `data/` across restarts.

---

## Tech stack

| Layer | Choice | Why mention it |
|-------|--------|----------------|
| Runtime | Node.js 18+ | LTS, native `fetch` in browser; server uses ES modules. |
| Server | Express 4 | Widely understood, minimal surface for a demo API. |
| UI | Vanilla JS | Shows you can work without a framework when scope is small. |
| Persistence | JSON file | Simple to reason about; easy to swap for SQLite/Postgres later. |
| Tests | `node:test` | No Jest dependency; fast CI. |
| Containers | Docker + Compose | Matches how many teams ship services. |
| CI | GitHub Actions | Tests + Docker build on every push (see `CI-PIPELINE-PROJECT-DETAILS.md`). |

---

## API summary (talking points)

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | **Liveness** — load balancers and orchestrators use this pattern. |
| `GET /api/tasks` | Read all tasks (sorted by creation time). |
| `POST /api/tasks` | Create task; body `{ "title": "..." }`. |
| `PATCH /api/tasks/:id` | Toggle `done` or rename `title`. |
| `DELETE /api/tasks/:id` | Remove a task. |

Errors return JSON `{ "error": "..." }` with appropriate HTTP status (400, 404, 500).

---

## How to demo (30–60 seconds)

1. Show **http://127.0.0.1:3000** — add tasks, complete one, delete one.
2. Open **Network** tab — point out JSON requests.
3. Show **`/api/health`** in the browser or with `curl`.
4. Say: *“Persistence is a file for now; the store is isolated so we can swap in a database without rewriting the UI.”*
5. Mention **`npm test`** and **GitHub Actions** if asked about quality gates.

---

## Trade-offs (say these if interviewer asks)

- **File storage** — Fine for one process and demos; **not** for high concurrency or multi-instance deploy without shared storage or a real DB.
- **No auth** — By design; adding JWT/session would be the next layer.
- **No framework on frontend** — Keeps the repo small; you can port the same API to React later.

---

## Ideas for “next iteration” (shows product thinking)

- Replace JSON with **SQLite** or **PostgreSQL** (with migrations).
- Add **OpenAPI** spec and contract tests.
- Add **structured logging** and request IDs.
- Deploy behind **HTTPS**; add **rate limiting** for public demos.
- **Multi-tenant** or **user accounts** if you want a bigger story.

---

## Files worth knowing

| Path | Role |
|------|------|
| `src/server.js` | HTTP routes and middleware |
| `src/tasks.js` | Business logic + persistence |
| `public/app.js` | UI behaviour |
| `tests/tasks.test.js` | Automated checks |
| `Dockerfile` | Production-style container (non-root user) |

---

## Glossary (plain language)

- **REST** — Resources (tasks) manipulated with verbs like GET/POST/PATCH/DELETE.
- **CI (Continuous Integration)** — Every push runs tests (and here, a Docker build) automatically.
- **Health endpoint** — A cheap URL that returns OK if the process is alive — used for monitoring and deploy pipelines.
