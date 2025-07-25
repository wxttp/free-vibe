import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const { email, password, name, confirmPassword } = await req.json();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const emailCheck = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (emailCheck) {
      return Response.json({ status: 400, error: "Email already exists" });
    }
    if (password !== confirmPassword) {
      return Response.json({ status: 400, error: "Passwords do not match" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return Response.json({ status: 200, message: "User Created Successfully" });
  } catch (error) {
    return Response.json({ status: 400, error: "User Not Created" });
  }
}
