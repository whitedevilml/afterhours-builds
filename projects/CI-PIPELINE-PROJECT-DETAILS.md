# GitHub Actions CI — full project brief

This document explains the **continuous integration** setup for **Taskboard**, implemented as **`.github/workflows/taskboard-ci.yml`** in this repository.

---

## One-line pitch

Every time you change code under **`projects/taskboard/`**, **GitHub Actions** automatically runs **`npm ci`**, **`npm test`**, and builds a **Docker image** — so broken tests or broken builds are caught **before** they become habit.

---

## Why CI matters (what to say aloud)

- **Fast feedback** — You learn in minutes if a commit broke tests or the container build.
- **Repeatable** — The same steps run on a clean **Ubuntu** runner every time, not “works on my laptop.”
- **Gate for deployment** — Later you can require a green check before deploy to **Railway**, **ECS**, etc.

---

## What the workflow does (step by step)

**File:** `.github/workflows/taskboard-ci.yml`

**Triggers:**

- **Push** to any branch when files change under `projects/taskboard/` or the workflow file itself.
- **Pull request** when `projects/taskboard/` changes — good for review before merge.

**Job 1 — `test`**

1. Check out the repository.
2. Install **Node.js 20** (matches modern LTS expectations).
3. Cache **npm** dependencies using `projects/taskboard/package-lock.json`.
4. Run **`npm ci`** (clean, reproducible install from lockfile).
5. Run **`npm test`** (Node’s built-in test runner).

**Job 2 — `docker-build`**

- Runs **after** `test` succeeds (`needs: test`).
- Checks out code again and runs **`docker build -t taskboard:ci .`** inside `projects/taskboard/`.
- Proves the **Dockerfile** is valid and the app **builds as an image** — close to what you’d ship.

---

## How to show it in an interview

1. Open GitHub → **Actions** → select **taskboard CI** → show a **green** run.
2. Expand **test** job — mention **Node 20**, **npm ci**, **npm test**.
3. Expand **docker-build** — “We don’t push the image to a registry in this demo, but we **verify the Dockerfile** on every change.”
4. If asked about **monorepos**: “Workflow uses **`working-directory: projects/taskboard`** so only that app’s dependencies are installed.”

---

## Trade-offs

- **Path filters** — CI skips Taskboard when you only edit `docs/` or Terraform; that’s intentional to save minutes. If you change shared code later, widen triggers or add a workflow for those paths.
- **No deploy step** — CI **builds** the image but does not **push** to ECR/GHCR by default (adds secrets and cost). Easy follow-up project.

---

## Natural extensions

- **Publish** image to **GitHub Container Registry** (`ghcr.io`) on `main` only.
- Add **lint** (`eslint`) or **format check** (`prettier --check`).
- **Matrix** test on Node 18 and 22 if you need compatibility guarantees.
- **Deploy** job: SSH, Kubernetes, or PaaS API after tests pass.

---

## Glossary

- **Workflow** — YAML file defining automation in GitHub Actions.
- **Job** — A set of steps that run on one runner (here: `ubuntu-latest`).
- **Artifact** — Optional output (build results); not used here yet.
- **`needs`** — Job dependency: Docker build only runs if tests pass.
