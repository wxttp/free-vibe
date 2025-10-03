
import React from "react";
import { getAllPlaylists } from "@/lib/playlist/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DisplayPlaylist from "@/components/Playlist/DisplayPlaylist";
import { getAllSongs } from "@/lib/library/song";


const PlaylistsPage = async () => {
  const session = await getServerSession(authOptions);
  const playlists = await getAllPlaylists(session);
  const song = await getAllSongs(session);
  
  return (
    <main className="flex flex-col mt-5 min-w-full min-h-screen">
      <DisplayPlaylist session={session} playlists={playlists} song={song} />
    </main>
  );
};

export default PlaylistsPage;
