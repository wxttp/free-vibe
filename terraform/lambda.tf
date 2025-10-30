resource "aws_lambda_function" "song_processor" {
  function_name = "FreeVibeSongProcessor"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  role          = data.aws_iam_role.LabRole.arn

  filename         = "../lambda/lambda.zip"
  source_code_hash = filebase64sha256("../lambda/lambda.zip")

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.songs.bucket
    }
  }

  tags = var.default_tag
}
