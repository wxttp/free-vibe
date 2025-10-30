########################################################
# Security Group for EC2
########################################################
resource "aws_security_group" "ec2_sg" {
  name        = "FreeVibe-EC2-SG"
  description = "Allow SSH and HTTP"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.default_tag
}

########################################################
# Launch Template for EC2 / ASG
########################################################
resource "aws_launch_template" "ec2_lt" {
  name_prefix   = "FreeVibe-EC2-LT-"
  image_id      = var.ec2_ami
  instance_type = var.ec2_instance_type
  key_name      = var.ec2_key_name

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.ec2_sg.id]
  }

  iam_instance_profile {
    name = data.aws_iam_instance_profile.LabInstanceProfile.name
  }

  tag_specifications {
    resource_type = "instance"
    tags          = merge(var.default_tag, { Name = "FreeVibe-EC2" })
  }
}


########################################################
# Auto Scaling Group
########################################################
resource "aws_autoscaling_group" "ec2_asg" {
  name                = "FreeVibe-ASG"
  min_size            = 1
  max_size            = 3
  desired_capacity    = 2
  vpc_zone_identifier = module.vpc.public_subnets

  launch_template {
    id      = aws_launch_template.ec2_lt.id
    version = "$Latest"
  }

  # Attach to ALB target group if enabled
  target_group_arns = var.enable_alb ? [aws_lb_target_group.app_tg.arn] : []

  health_check_type         = "EC2"
  health_check_grace_period = 120

  tag {
    key                 = "Name"
    value               = "FreeVibe-EC2-ASG"
    propagate_at_launch = true
  }
}
