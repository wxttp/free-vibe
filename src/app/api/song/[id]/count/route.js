import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req, ctx) {
  const { id } = await ctx.params;
  const songId = Number(id);

  if (!songId)
    return NextResponse.json({ status: 400, error: "Bad Request" });

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId)
    return NextResponse.json({ status: 401, error: "Unauthorized" });

  try {
    await prisma.songPlay.create({
      data: {
        user_id: Number(userId),
        song_id: Number(songId)
      }
    })

    return NextResponse.json({
      status: 200,
      message: "Song Played",
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Cannot store stats" });
  }
}