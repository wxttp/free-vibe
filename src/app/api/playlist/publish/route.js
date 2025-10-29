import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { decodeId } from "@/lib/ids";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { id: encoded } = await req.json();
        const id = decodeId(encoded);
        if (!id)
            return NextResponse.json({ status: 400 }, { error: "Invalid playlist id" });

        const playlist = await prisma.playlist.findUnique({
            where: { id: Number(id) }
        });

        const updated = await prisma.playlist.update({
            where: { id: Number(id) },
            data: { is_public: !playlist.is_public },
        });

        return NextResponse.json({
            status: 200,
            message: "Playlist Published Successfully",
            updated
        });
    } catch (error) {
        return NextResponse.json({ status: 400, error: "Playlist Not Published" });
    }
}