import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req){
    console.log("HIT")
    const {user_id,name,email} = await req.json();
    if (!user_id || !name || !email) {
        return NextResponse.json({status:400,error:"Missing required fields"});
    }
    try {
        const updatedUser = await prisma.user.update({
            where:{
                id:user_id,
            },
            data:{
                name,
                email,
            }
        })
        return NextResponse.json({status:200,message:"User updated successfully",user:updatedUser});
    }catch(error){
        return NextResponse.json({status:500,error:"Internal Server Error"});
    }
}