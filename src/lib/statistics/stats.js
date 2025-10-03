import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function getStats() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId)
        return NextResponse.json({ status: 401, error: "Unauthorized" });

    const total = await prisma.songPlay.count({
        where: { user_id: userId }
    })

    const today = await prisma.songPlay.count({
        where: {
            user_id: userId,
            played_at: {
                gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }
    })

    const month = await prisma.songPlay.count({
        where: {
            user_id: userId,
            played_at: {
                gte: new Date(new Date().setMonth(new Date().getMonth(), 1))
            }
        }
    })

    const topSongs = await prisma.song.findMany({
        where: {
            songPlay: {
            some: { user_id: userId }
            }
        },
        include: {
            _count: {
            select: { songPlay: true }
            }
        },
        orderBy: {
            songPlay: { _count: 'desc' }
        },
        take: 5,
    })

    return {
        total,
        today,
        month,
        topSongs
    };
}