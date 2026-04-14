# Next steps (after Taskboard runs at http://127.0.0.1:3000 )

You have the app **running locally**. Use this checklist in order.

## 1. Sanity-check the app (2 minutes)

- Add a few tasks, mark one **done**, **remove** one — confirm the UI and API behave as expected.
- Open **http://127.0.0.1:3000/api/health** — you should see JSON like `{ "status": "ok", "service": "taskboard" }`.
- Optional: use browser **DevTools → Network** to see `GET/POST/PATCH/DELETE` calls to `/api/tasks`.

## 2. Run tests and Docker (5–10 minutes)

From `projects/taskboard/`:

```bash
npm test
```

Then try a **container** run (Docker Desktop must be running):

```bash
docker compose up --build
```

Visit **http://127.0.0.1:3000** again. Data is stored in a Docker **volume** (`taskdata`), separate from your laptop file.

## 3. Push to GitHub and watch CI

```bash
git add .
git commit -m "Your message"
git push origin main
```

In the repo on GitHub: **Actions** tab → confirm **taskboard CI** ran green (tests + Docker build).

## 4. Prepare your “story” for interviews / clients

Read the per-project explainers:

| File | Use it to explain… |
|------|---------------------|
| `projects/taskboard/PROJECT-DETAILS.md` | Full-stack app + API + Docker + tests |
| `projects/aws-static-site/PROJECT-DETAILS.md` | Terraform + S3 + IaC mindset |
| `projects/CI-PIPELINE-PROJECT-DETAILS.md` | GitHub Actions pipeline |

## 5. Optional: deploy Taskboard (live URL)

Pick one platform (examples only — you create the account):

- **Railway**, **Fly.io**, **Render**, **AWS App Runner**, or similar: connect the repo or deploy the **Dockerfile** in `projects/taskboard/`.
- After you have a **public HTTPS URL**, update the **Live** link in `docs/index.html` and redeploy GitHub Pages.

## 6. Optional: Terraform on AWS

Only when you’re ready to use real AWS credentials:

```bash
cd projects/aws-static-site
terraform init
terraform plan
```

Read **`PROJECT-DETAILS.md`** there before **`terraform apply`**.

## 7. Keep the portfolio in sync

After any change you want visible on **https://whitedevilml.github.io/afterhours-builds/**, push `main` and confirm **Pages** still builds from the **`/docs`** folder (see `docs/DEPLOY.md`).
