variable "subnet" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "default_tag" {
  description = "Default tags for all resources"
  type        = map(string)
  default = {
    project     = "FreeVibe"
    environment = "dev"
  }
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "ec2_ami" {
  description = "AMI ID for EC2 instances"
  type        = string
  default     = "ami-0c94855ba95c71c99" # Amazon Linux 2 in us-west-2
}

variable "ec2_key_name" {
  description = "Optional EC2 key pair name for SSH access"
  type        = string
  default     = "" # empty string if you don’t want SSH key
}

variable "enable_alb" {
  description = "Whether to attach ASG to ALB"
  type        = bool
  default     = true
}

variable "rds_username" {
  description = "RDS master username"
  type        = string
}

variable "rds_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

