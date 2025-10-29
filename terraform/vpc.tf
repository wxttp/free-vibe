# Main VPC module
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "FreeVibe-vpc"
  cidr = "10.0.0.0/16"

  azs              = var.subnet
  public_subnets   = ["10.0.1.0/24", "10.0.3.0/24"]
  private_subnets  = ["10.0.2.0/24", "10.0.4.0/24"]
  database_subnets = ["10.0.101.0/24", "10.0.102.0/24"]

  tags                 = var.default_tag
  public_subnet_tags   = { role = "public-subnet" }
  private_subnet_tags  = { role = "private-subnet" }
  database_subnet_tags = { role = "database-subnet" }
}

# Extra public subnet for “problem” (like HackHive)
resource "aws_subnet" "public_problem" {
  count                   = 2
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = "10.0.2${count.index}.0/24"
  availability_zone       = var.subnet[count.index]
  map_public_ip_on_launch = true

  tags = merge(var.default_tag, { role = "problem-subnet" })
}

# Attach problem subnets to public route table
resource "aws_route_table_association" "route_table_attach" {
  count          = 2
  subnet_id      = aws_subnet.public_problem[count.index].id
  route_table_id = module.vpc.public_route_table_ids[0]
}

# Database subnet group for RDS
resource "aws_db_subnet_group" "rds_group" {
  name       = "rds_group"
  subnet_ids = module.vpc.database_subnets
  tags       = var.default_tag
}

# VPC endpoints module
module "endpoint" {
  source = "terraform-aws-modules/vpc/aws//modules/vpc-endpoints"

  vpc_id                     = module.vpc.vpc_id
  create_security_group      = true
  security_group_name_prefix = "freevibe-endpoint"
  security_group_description = "VPC endpoint security group"
  security_group_rules = {
    ingress_https = {
      type        = "ingress"
      description = "HTTPS from VPC"
      cidr_blocks = [module.vpc.vpc_cidr_block]
    }
    egress_all = {
      description = "All traffic to VPC"
      type        = "egress"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = [module.vpc.vpc_cidr_block]
    }
  }

  endpoints = {
    s3_gateway = {
      service         = "s3"
      service_type    = "Gateway"
      route_table_ids = module.vpc.private_route_table_ids
    }

    ec2 = {
      service             = "ec2"
      service_type        = "Interface"
      subnet_ids          = module.vpc.private_subnets
      private_dns_enabled = true
    }
  }

  tags = var.default_tag
}
