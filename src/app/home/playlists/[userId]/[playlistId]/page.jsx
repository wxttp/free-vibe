
import React from "react";
import { getPlaylistById } from "@/lib/playlist/playlist";
import DisplayPlaylist from "@/components/Playlist/DisplayPlaylist";
import { getAllSongs } from "@/lib/library/song";
import { decodeId } from "@/lib/ids";

const PlaylistsPage = async ({ params }) => {
  const { userId: encodedUserId, playlistId: encodedPlaylistId } = await params;

  const userId = decodeId(encodedUserId);
  const playlistId = decodeId(encodedPlaylistId);
  if (!userId || !playlistId) {
    return <div className="p-8">Invalid link</div>;
  }

  const playlists = await getPlaylistById(Number(userId), Number(playlistId));

  if (!playlists) {
    return (
      <>
        <div className="w-full h-full flex flex-col justify-center items-center text-xl">
          <div className="text-9xl font-black text-[var(--primary-color)]">Oops!</div>
          <div className="font-bold mt-10 text-[var(--background-color)]">403 - Forbidden</div>
          <div className="mt-0 text-[var(--primary-color-hover)]">This playlist is private</div>
        </div>
      </>
    );
  }

  const song = await getAllSongs(Number(userId));

  return (
    <main className="flex flex-col mt-5 min-w-full min-h-screen">
      <DisplayPlaylist session={null} playlists={playlists} song={song} />
    </main>
  );
};

export default PlaylistsPage;
