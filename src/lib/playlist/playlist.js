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
    playlistTime : item.songs.reduce((acc,cur)=>acc+cur.song.time,0),
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
  });
  if(!res.ok){
    throw new Error("Playlist Not Created");
  }
  const data = await res.json();
  return data.playlist;
}

export async function deletePlaylist(playlistId){
  const res = await fetch("/api/playlist",{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      playlist_id:playlistId,
    })
  });
  if(!res.ok){
    throw new Error("Playlist Not Deleted");
  }
  return res.json();
}

export async function updatePlaylist(playlistId, name, description){
  const res = await fetch("/api/playlist",{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      playlist_id:playlistId,
      name,
      description
    })
  })
  if (!res.ok){
    throw new Error("Playlist Not Updated");
  }
  return res.json();
}

export async function addSongsToPlaylist(playlistId,songs){
  const res = await fetch("/api/playlistSong",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      playlistId,
      songs
    })
  })
  if (!res.ok){
    throw new Error("Add song to playlist failed");
  }
  return res.json();
}