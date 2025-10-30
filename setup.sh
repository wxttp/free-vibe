#!/bin/bash
set -e

# Update system
sudo yum update -y

# Install basic tools
sudo yum install -y vim git curl

# Install Docker
sudo amazon-linux-extras install docker -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Install Docker Compose (latest)
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version

# Optional: clone your web project repo
cd /home/ec2-user
git clone https://github.com/wxttp/free-vibe.git
cd free-vibe

# Build and run containers
sudo docker-compose up -d --build

echo "✅ Setup complete! App is running and ready."
