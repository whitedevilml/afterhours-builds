variable "aws_region" {
  type        = string
  description = "AWS region (e.g. ap-south-1 for Mumbai)"
  default     = "ap-south-1"
}

variable "name_prefix" {
  type        = string
  description = "Prefix for the S3 bucket name (must stay globally unique with suffix)"
  default     = "afterhours-static"
}
