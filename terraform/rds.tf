data "aws_rds_engine_version" "postgres" {
  engine  = "postgres"
  version = "17.4"
}

# Security group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "FreeVibe-RDS-SG"
  description = "Allow MySQL from private subnets"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id] # allow EC2 to connect
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.default_tag
}

# RDS instance
resource "aws_db_instance" "postgres" {
  identifier             = "freevibe"
  db_name                = "freevibe_db"
  engine                 = data.aws_rds_engine_version.postgres.engine
  engine_version         = data.aws_rds_engine_version.postgres.version
  instance_class         = "db.t3.small" #need to change to t3 on learnerlab
  allocated_storage      = 20
  username               = var.rds_username
  password               = var.rds_password
  db_subnet_group_name   = aws_db_subnet_group.rds_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  multi_az               = true

  tags = var.default_tag
}
