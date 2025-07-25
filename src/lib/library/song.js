import prisma from "@/lib/prisma"

export async function getAllSongs() {
  return await prisma.song.findMany(
    // {
    //   where: {

    //   }
    // }
  )
}