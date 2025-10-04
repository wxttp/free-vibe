"use client";
import React, { useState, useRef, useEffect } from "react";
import { CreatePlaylist } from "@/components/Playlist/CreatePlaylist";
import PlaylistCard from "@/components/Playlist/PlaylistCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PlaylistView } from "@/components/Playlist/PlaylistView";
import { usePlayer } from '@/stores/usePlayer'

const DisplayPlaylist = ({ session, playlists, song }) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [playlistState, setPlaylistState] = useState(session ? playlists : [playlists] || []);

  const load = usePlayer(s => s.load)
  const current = usePlayer(s => s.current)

  useEffect(() => {
    if (playlists?.songs?.length) {
      const queue = playlists.songs.map(ps => ps.song)
      load(queue, 0)
    }
  }, [playlists, load])

  const handlePlaylistCreate = (newPlaylist) => {
    setPlaylistState((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };
  const handlePlaylistDelete = (playlistId) => {
    setPlaylistState((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
  };
  const handlePlaylistEdit = (updatedPlaylist) => {
    setPlaylistState((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === updatedPlaylist.playlist.id
          ? { ...playlist, name: updatedPlaylist.playlist.name,description:updatedPlaylist.playlist.description }
          : playlist
      )
    );
  };
  const handlePlaylistAdd = (playlistId, songs) => {
    setPlaylistState((prevPlaylists) =>
      prevPlaylists.map((playlistState) =>
        playlistState.id === playlistId
          ? {
              ...playlistState,
              songs: song.filter((s) => songs.includes(s.id)),
            }
          : playlistState
      )
    );
  };

  return (
    <div>
      {
        session &&
        <CreatePlaylist
        className="w-full max-w-md"
        open={open}
        onClose={() => setOpen(false)}
        session={session}
        onCreate={handlePlaylistCreate}
      />
      }
      <PlaylistView
        isOwner={session}
        playlist={playlistState.find((p) => p.id === activeId) || null}
        playlistOpen={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
      />
      <div className={!playlistOpen ? "" : "hidden"}>
        <div className="text-3xl items-center grid grid-cols-2 mb-5">
          <div className="grid grid-rows-2 ">
            <span className="text-[var(--primary-color)] font-bold">
              Playlists
            </span>
            <span className="text-sm opacity-70">
              {playlistState.length} playlists
            </span>
          </div>
          <Button
            className="w-40 absolute right-5 items-center"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Create Playlist
          </Button>
        </div>

        <div className="flex flex-col gap-5 w-full mb-5">
          {playlistState.map((playlist) => (
            <PlaylistCard 
              key={playlist.id}
              playlist={playlist}
              onDelete={handlePlaylistDelete}
              onEdit={handlePlaylistEdit}
              song={song}
              onAdd={handlePlaylistAdd}
              setPlaylistOpen={setPlaylistOpen}
              setActiveId={setActiveId}
              isOwner={session}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayPlaylist;
