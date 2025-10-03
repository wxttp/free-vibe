import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { playlistId, songs } = await req.json();
    await prisma.$transaction(async (tx) => {
      await tx.playlistSong.deleteMany({
        where: {
          playlists_id: playlistId,
        },
      });
      await prisma.playlistSong.createMany({
        data: songs.map((songId) => ({
          playlists_id: playlistId,
          songs_id: songId,
        })),
        skipDuplicates: true,
      });
    });
    return NextResponse.json({
      message: "Add song to playlist success!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
