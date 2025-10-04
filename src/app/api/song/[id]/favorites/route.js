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

  console.log(id);
  console.log(userId);

  try {
    const isExist = await prisma.favorite.findFirst({
      where: {
        users_id: userId,
        songs_id: songId,
      },
    });

    if (isExist) {
      await prisma.favorite.delete({
        where: { id: isExist.id },
      });

      return NextResponse.json({
        isExist: true,
        status: 200,
        message: "Song removed from favorites" },
      );
    } else {
      await prisma.favorite.create({
        data: {
          users_id: Number(userId),
          songs_id: Number(songId)
        }
      })
  
      return NextResponse.json({
        isExist: false,
        status: 201,
        message: "Song Added to Favorites",
      });
    }

  } catch (error) {
    return NextResponse.json({ status: 400, error: "Cannot add to favorites" });
  }
}