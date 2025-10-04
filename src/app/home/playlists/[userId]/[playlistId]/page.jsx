
import React from "react";
import { getPlaylistById } from "@/lib/playlist/playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DisplayPlaylist from "@/components/Playlist/DisplayPlaylist";
import { getAllSongs } from "@/lib/library/song";


const PlaylistsPage = async ({ params }) => {
  const { userId, playlistId } = params;

  const playlists = await getPlaylistById(Number(userId), Number(playlistId));

  if (!playlists) {
    return <div>Playlist not found</div>
  }

  const song = await getAllSongs(Number(userId));

  return (
    <main className="flex flex-col mt-5 min-w-full min-h-screen">
      <DisplayPlaylist session={null} playlists={playlists} song={song} />
    </main>
  );
};

export default PlaylistsPage;
