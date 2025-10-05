import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
// import AWS from "aws-sdk";

export async function POST(req) {
  const { email, subject, text } = await req.json();
  if (!email || !subject || !text) {
    return NextResponse.json({ status: 400, error: "Missing required fields" });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    //for SES
    // const ses = new AWS.SES({
    //   region: "us-east-1",
    //   accessKeyId: process.env.AWS_ACCESS_KEY,
    //   secretAccessKey: process.env.AWS_SECRET_KEY,
    // });

    // await ses
    //   .sendEmail({
    //     Source: "noreply@yourdomain.com",
    //     Destination: { ToAddresses: [email] },
    //     Message: {
    //       Subject: { Data: "Welcome to MyApp" },
    //       Body: { Text: { Data: `Hello ${name}, thanks for registering!` } },
    //     },
    //   })
    //   .promise();

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}
