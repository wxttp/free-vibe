# ALB DNS Name (public URL to access app)
output "alb_dns_name" {
  description = "Public DNS name of the ALB"
  value       = aws_lb.app.dns_name
}

# ALB ARN
output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = aws_lb.app.arn
}

# ASG Name
output "asg_name" {
  description = "Auto Scaling Group name"
  value       = aws_autoscaling_group.ec2_asg.name
}

# ASG Desired Capacity
output "asg_desired_capacity" {
  description = "Desired capacity of the ASG"
  value       = aws_autoscaling_group.ec2_asg.desired_capacity
}

# RDS Endpoint
output "rds_endpoint" {
  description = "RDS instance endpoint (for connecting from EC2)"
  value       = aws_db_instance.postgres.endpoint
}

# RDS Endpoint Port
output "rds_port" {
  description = "RDS instance port"
  value       = aws_db_instance.postgres.port
}

# RDS Identifier
output "rds_identifier" {
  description = "RDS instance identifier"
  value       = aws_db_instance.postgres.id
}

# VPC ID
output "vpc_id" {
  description = "VPC ID where all resources are deployed"
  value       = module.vpc.vpc_id
}

# Public Subnet IDs
output "public_subnet_ids" {
  description = "List of public subnet IDs (ALB will be here)"
  value       = module.vpc.public_subnets
}

# Private Subnet IDs
output "private_subnet_ids" {
  description = "List of private subnet IDs (EC2 will be here)"
  value       = module.vpc.private_subnets
}

# Database Subnet IDs
output "database_subnet_ids" {
  description = "List of database subnet IDs (RDS will be here)"
  value       = module.vpc.database_subnets
}
