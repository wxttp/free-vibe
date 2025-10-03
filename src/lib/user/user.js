import prisma from "@/lib/prisma";
export async function getUserData(session) {
  const user_id = session.user.id;
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
