"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
export async function getUserData(session) {
  const user_id = session?.user?.id;
  const userData = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!userData) {
    throw new Error("User Data Not Found");
  }
  return userData;
}

export async function updateUserData(user_id, payload, password) {
  if (!user_id) {
    throw new Error("User ID is required");
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!userData) {
    throw new Error("User Data Not Found");
  }
  const comparePassword = await bcrypt.compare(
    password,
    userData.password
  );
  if (!comparePassword) {
    throw new Error("Password Incorrect");
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: payload,
    });
    if (!updatedUser) {
      throw new Error("User Update Failed");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
