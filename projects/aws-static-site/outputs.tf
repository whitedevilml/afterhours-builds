output "bucket_name" {
  description = "Upload site files here (e.g. aws s3 sync ./dist s3://...)"
  value       = aws_s3_bucket.site.id
}

output "website_endpoint" {
  description = "HTTP website endpoint (no TLS — add CloudFront for HTTPS in prod)"
  value       = aws_s3_bucket_website_configuration.site.website_endpoint
}
