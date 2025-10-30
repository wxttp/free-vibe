resource "random_id" "suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "songs" {
  bucket = "freevibe-bucket-${random_id.suffix.hex}"
  tags   = var.default_tag
}

output "bucket_name" {
  value = aws_s3_bucket.songs.bucket
}
