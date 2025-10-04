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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updatePlaylist } from "@/lib/playlist/playlist";
import { updateSong } from "@/lib/library/song";


export const EditPlaylistCard = forwardRef(({ isPlaylist=true, onOpen, onClose, playlistData, onEdit, song },ref) => {
  const localRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(isPlaylist ? playlistData.name ?? "" : song?.title ?? "");
  const [description, setDescription] = useState(isPlaylist ? playlistData.description ?? "" : song.artist ?? "");

  const handleSubmit = async () => {
    if (isPlaylist) {
      setLoading(true);
      const updatedPlaylist = await updatePlaylist(playlistData.id, name, description);
      toast.success("Playlist Edit Successfully");
      onEdit(updatedPlaylist);
      onClose();
    } else {
      setLoading(true);
      const updatedSong = await updateSong(song.id, name, description);
      toast.success("Song Edit Successfully");
      // onEdit(updatedSong);
      onClose();
      window.location.reload();
    }
    setLoading(false);
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
      <Card ref={localRef} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{ isPlaylist ? "Edit Playlist" : "Edit Song"}</CardTitle>
          <CardDescription>
            Edit the { isPlaylist ? "playlist" : "song"} details
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="">{ isPlaylist ? "Playlist Name" : "Song Title"}</Label>
            <Input id=""  value={name} onChange={(e)=>setName(e.target.value)} placeholder={ isPlaylist ? "Enter playlist name" : "Enter song title"} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="">{ isPlaylist ? "Playlist Description" : "Song Artist"}</Label>
            <Input id=""  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder={ isPlaylist ? "Enter playlist description" : "Enter song artist"}/>
          </div>
        </CardContent>
        <CardFooter>
          <Button  disabled={loading} onClick={()=>handleSubmit()}>{ isPlaylist ? loading ? "Editing Playlist" : "Edit Playlist" : loading ? "Editing Song" : "Edit Song"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}); 
