import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, description, users_id } = await req.json();
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        users_id: users_id,
      },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Playlist Created Successfully",
      playlist: {
        ...playlist,
        playlistTime: playlist.songs.reduce(
          (acc, cur) => acc + cur.song.time,
          0
        ),
        created_at: playlist.created_at.toLocaleString(),
        songs: playlist.songs ?? [],
      },
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Playlist Not Created" });
  }
}

export async function DELETE(req) {
  try {
    const { playlist_id } = await req.json();
    await prisma.playlistSong.deleteMany({
      where: {
        playlists_id: playlist_id,
      },
    });
    await prisma.playlist.delete({
      where: {
        id: playlist_id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Playlist Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Playlist Not Deleted" });
  }
}

export async function PUT(req){
    try{
        const {playlist_id,name,description} = await req.json();
        const playlist = await prisma.playlist.update({
            where:{
                id:playlist_id
            },
            data:{
                name,
                description
            }
        })
        const playlistData = await prisma.playlist.findUnique({
            where:{
                id:playlist_id
            },
            include:{
                songs:{
                    include:{
                        song:true
                    }
                }
            }
        });
        playlist.playlistTime = playlistData.songs.reduce((acc, cur) => acc + cur.song.time,0);
        playlist.songCount = playlistData.songs.length;
        return NextResponse.json({
            status: 200,
            message:"Playlist Updated Successfully",
            playlist
        })
    }catch(error){
        return NextResponse.json({ status: 400, error: "Playlist Not Updated" });
    }
}
