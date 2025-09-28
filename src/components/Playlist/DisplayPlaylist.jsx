"use client";
import React, { useState, useRef, useEffect } from "react";
import { CreatePlaylist } from "@/components/Playlist/CreatePlaylist";
import PlaylistCard from "@/components/Playlist/PlaylistCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DisplayPlaylist = ({ session, playlists }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CreatePlaylist
        className="w-full max-w-md"
        open={open}
        onClose={() => setOpen(false)}
        session={session}
        // ref={ref}
      />
      <div className="">
        <div className="text-3xl items-center grid grid-cols-2 mb-5">
          <div className="grid grid-rows-2 ">
            <span className="text-[var(--primary-color)] font-bold">
              Playlists
            </span>
            <span className="text-sm opacity-70">
              {playlists.length} playlists
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
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayPlaylist;
