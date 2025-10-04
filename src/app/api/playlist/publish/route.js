import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { id } = await req.json();
        if (!id)
            return NextResponse.json({ status: 400 }, { error: "Invalid playlist id" });

        const playlist = await prisma.playlist.update({
            where: { id: Number(id) },
            data: { is_public: true },
        });

        return NextResponse.json({
            status: 200,
            message: "Playlist Published Successfully",
            playlist
        });
    } catch (error) {
        return NextResponse.json({ status: 400, error: "Playlist Not Published" });
    }
}