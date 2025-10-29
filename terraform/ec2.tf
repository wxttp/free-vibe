# Security group for EC2
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

# EC2 instances in each public subnet
resource "aws_instance" "app" {
  count                       = length(module.vpc.public_subnets)
  ami                         = var.ec2_ami
  instance_type               = var.ec2_instance_type
  subnet_id                   = module.vpc.public_subnets[count.index]
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true

  tags = merge(var.default_tag, { Name = "FreeVibe-EC2-${count.index}" })
}
