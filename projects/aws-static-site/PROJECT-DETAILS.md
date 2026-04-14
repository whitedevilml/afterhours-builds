# AWS static site (Terraform) — full project brief

Use this to explain **infrastructure-as-code** and **static hosting** on AWS in interviews or client conversations.

---

## One-line pitch

This folder contains **Terraform** code that declares a **minimal S3 static website** in AWS (default region **ap-south-1** / Mumbai), so you can **plan**, **review**, and **apply** infrastructure the same way you review application code.

---

## Problem it solves (portfolio scope)

- Shows you can **read and write IaC** (Infrastructure as Code), not only app code.
- Demonstrates the **S3 website hosting** pattern many teams use for **landing pages**, **docs sites**, or **SPA** builds.
- Encourages a safe workflow: **`terraform plan` before `terraform apply`**.

---

## What the code creates (high level)

1. A **random suffix** so the S3 bucket name is **globally unique** (S3 bucket names must be unique across all of AWS).
2. An **S3 bucket** with **static website hosting** enabled (`index.html`, errors routed to `index.html` for simple SPAs).
3. A **bucket policy** allowing **public read** of objects (classic **public static site** demo).

**Important:** Public S3 buckets are acceptable for **learning** and some demos; in **production** teams often use **CloudFront + ACM** (HTTPS), **OAC/OAI**, and tighter policies. The `README.md` in this folder mentions that path.

---

## Files and their roles

| File | Role |
|------|------|
| `versions.tf` | Terraform and **AWS provider** version constraints; `provider "aws"` block. |
| `variables.tf` | **Region** (`aws_region`) and **name prefix** (`name_prefix`) for the bucket. |
| `main.tf` | `random_id`, `aws_s3_bucket`, website config, public access block, bucket policy. |
| `outputs.tf` | **Bucket name** (for `aws s3 sync`) and **website endpoint** (HTTP URL). |

---

## How to talk about it (interview flow)

1. **“I use Terraform to declare infrastructure.”** — Same code can be reviewed in PRs and reapplied for disaster recovery.
2. **“`plan` shows what will change before anything touches the account.”** — Reduces surprise deletes or misconfigurations.
3. **“Default region is Mumbai because…”** — Tie to latency or personal preference (adjust if your client is elsewhere).
4. **“For production I’d add CloudFront for TLS, caching, and WAF if needed.”** — Shows you know the limitation of plain S3 website endpoints (HTTP, no CDN features).

---

## Safe workflow (always mention this)

```bash
cd projects/aws-static-site
terraform init
terraform plan   # read the diff carefully
# only when you intend to spend/create resources:
terraform apply
```

You need **AWS credentials** configured (`aws configure` or environment variables / IAM role). **Never commit** secrets or `.tfstate` with secrets in public repos (this repo’s `.gitignore` ignores typical Terraform local files).

---

## How to demo without applying (no AWS account spend)

- Walk through **`main.tf`** on screen: bucket, website configuration, policy.
- Show what **`terraform plan`** would output *conceptually* (create bucket, policies).
- Explain **outputs**: where you would **`aws s3 sync`** your built static files (e.g. from `docs/` or a React `dist/`).

---

## Trade-offs

- **Public read bucket** — Simple for a demo; **not** a full security model.
- **No HTTPS on S3 website endpoint** — CloudFront + certificate is the usual fix.
- **Single region** — DR and multi-region are out of scope for this sample.

---

## Natural extensions (if asked “what’s next?”)

- Add **CloudFront distribution** + **ACM certificate** (HTTPS).
- Store **Terraform state** in **S3 backend** with **DynamoDB** locking (team workflows).
- Split **modules** for reuse (e.g. `modules/static_site`).
- Add **IAM least privilege** for deploy role instead of broad console access.

---

## Glossary

- **IaC** — Infrastructure as Code: machines, buckets, and policies defined in files.
- **Terraform state** — Map of real-world resources Terraform manages (keep it secure and backed up for teams).
- **S3 website endpoint** — AWS-hosted HTTP endpoint serving `index.html` and static assets.
