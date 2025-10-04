import prisma from "@/lib/prisma"

export async function getAllSongs(userId) {
  if (!userId)
    return

  return prisma.song.findMany({
    where: { users_id: userId },
    select: {
      id: true,
      title: true,
      artist: true,
      isUrl: true,
      url: true,

      favorites: {
        where: { users_id: userId },
        select: { id: true },
      },
    },
  }).then(songs =>
    songs.map(s => ({
      ...s,
      isFavorite: s.favorites.length > 0,
    }))
  )
}

export async function getFavoriteSongs(userId) {
  if (!userId) return;

  return prisma.song.findMany({
    where: {
      favorites: {
        some: { users_id: userId } 
      }
    },
    select: {
      id: true,
      title: true,
      artist: true,
      isUrl: true,
      url: true,
    },
  }).then(songs =>
    songs.map(s => ({
      ...s,
      isFavorite: true,
    }))
  );
}

export async function updateSong(songId, title, artist) {
  const res = await fetch(`/api/song/${songId}/stream`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      id: songId,
      title,
      artist
    })
  })
  if (!res.ok){
    throw new Error("Song Not Updated");
  }
  return res.json();
}

export async function deleteSong(songId) {
  const res = await fetch(`/api/song/${songId}/stream`,{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      id:songId,
    })
  });
  if(!res.ok){
    throw new Error("Song Not Deleted");
  }
  return res.json();
}

export async function storeSongPlay(songId) {
  const res = await fetch(`/api/song/${songId}/count`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ 
      id: songId
    })
  })
  if (!res.ok){
    throw new Error("Song Not Stored");
  }
  return res.json();
}

export async function addToFavorites(songId) {
  const res = await fetch(`/api/song/${songId}/favorites`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ 
      id: songId
    })
  })
  if (!res.ok){
    throw new Error("Song Not Added to Favorites");
  }
  return res.json();
}