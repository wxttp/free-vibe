"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { addSongsToPlaylist } from "@/lib/playlist/playlist";
import { AddMusicCard } from "@/components/Playlist/AddMusicCard";



export const AddMusicToPlaylistCard = forwardRef(({ onOpen, onClose, onAdd, playlistData, song },ref) => {
  const localRef = useRef(null)
  const [selectSong, setSelectSong]=useState(playlistData.songs.map((item) => item.songs_id));

  const handleSubmit = async ()=>{
    onAdd(playlistData.id,selectSong);
    toast.success("Music Added to Playlist Successfully");
    await addSongsToPlaylist(playlistData.id,selectSong);
    onClose();
  }

  useEffect(() => {
    if (!onOpen) return;
    const handleClickOutside = (e) => {
      if (localRef.current && !localRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOpen, onClose]);

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card ref={localRef} className={"max-w-[100dvw] max-h-[90dvh] sm:max-w-[80dvw] sm:max-h-[80dvh] flex flex-col"}>
        <CardHeader>
          <CardTitle>Add Music to {playlistData.name}</CardTitle>
          <CardDescription>
            Add music to the playlist
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 flex-1 overflow-y-auto space-y-3">
          <div className="grid gap-3">
            {song.map((item) => (
              <div key={item.id}>
                <AddMusicCard song={item} selectSong={selectSong} setSelectSong={setSelectSong} />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button onClick={()=>handleSubmit()}>Add Music</Button>
        </CardFooter>
      </Card>
    </div>
  );
}); 
