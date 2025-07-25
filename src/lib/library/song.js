import prisma from "@/lib/prisma"

export async function getAllSongs(session) {
  const userId = session?.user?.id;

  return await prisma.song.findMany(
    {
      where: {
        users_id: userId
      }
    }
  )
}