import prisma from "@/lib/prisma";

export async function getAllPlaylists(session) {
  const userId = session?.user?.id;

  const playlists = await prisma.playlist.findMany({
      where: {
        users_id: userId
      },
      include: {
        songs: {
          include : {
            song: true
          }
        }
      },
    }
  )
  const data = playlists.map((item)=>({
    ...item,
    playlistTime : item.songs.reduce((acc,cur)=>acc+cur.song.time,0)
  }))
  return data
};

export async function createPlaylist(userId, name, description){
  const res = await fetch("/api/playlist",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      users_id:userId,
      name,
      description
    })
  })
  if(res.status !== 200){
    throw new Error("Playlist Not Created");
  }
}
