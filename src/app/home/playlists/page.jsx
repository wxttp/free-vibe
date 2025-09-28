
import React from "react";
import { getAllPlaylists } from "@/lib/playlist/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DisplayPlaylist from "@/components/Playlist/DisplayPlaylist";

const PlaylistsPage = async () => {
  const session = await getServerSession(authOptions);
  const playlists = await getAllPlaylists(session);
  
  return (
    <main className="flex flex-col mt-5 w-full min-h-screen">
      <DisplayPlaylist session={session} playlists={playlists} />
    </main>
  );
};

export default PlaylistsPage;
