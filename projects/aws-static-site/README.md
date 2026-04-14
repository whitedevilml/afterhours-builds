# AWS static site (Terraform)

Minimal **IaC** sample: **S3** bucket configured for **static website hosting** with a public read policy suitable for a demo or internal landing page.

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) ≥ 1.5
- AWS credentials with permission to create S3 buckets (e.g. `AWS_PROFILE` or env vars)

## Usage

```bash
cd projects/aws-static-site
terraform init
terraform plan
# Review the plan, then:
terraform apply
```

After apply, upload HTML/CSS (e.g. from `docs/` build output):

```bash
aws s3 sync ../../docs s3://$(terraform output -raw bucket_name) --delete
```

Open the **website endpoint** URL from `terraform output` (HTTP only).

## Production notes

- Prefer **S3 + CloudFront + ACM** for HTTPS, caching, and security headers.
- Tighten **public access** if you front the bucket with CloudFront OAI/OAC instead of public reads.
- This module is a **learning / portfolio** baseline—adjust IAM and bucket policies for your org.
