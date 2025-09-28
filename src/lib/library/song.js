import prisma from "@/lib/prisma"

export async function getAllSongs(userId) {
  if (!userId)
    return

  return prisma.song.findMany({
    where: { users_id: userId },
    select: {
      id: true,
      title: true,
      artist: true,
      isUrl: true,
      url: true,
      time: true,
    },
  })
}