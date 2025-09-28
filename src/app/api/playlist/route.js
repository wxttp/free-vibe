import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
    try{
        const { name, description, users_id } = await req.json();
        console.log(name, description, users_id);
        const playlist = await prisma.playlist.create({
            data:{
                name,
                description,
                users_id:users_id,
            }
        });
    }catch(error){
        return NextResponse.json({ status: 400, error: "Playlist Not Created" });
    }
    return NextResponse.json({ status: 200, message: "Playlist Created Successfully" });
}