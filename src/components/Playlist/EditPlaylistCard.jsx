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

export const EditPlaylistCard = forwardRef(({ onOpen, onClose, playlistData, onEdit },ref) => {
  const localRef = useRef(null);
  const [name, setName] = useState(playlistData.name?? "");
  const [description, setDescription] = useState(playlistData.description?? "");
  const handleSubmit = async ()=>{
    const updatedPlaylist = await updatePlaylist(playlistData.id, name, description);
    toast.success("Playlist Edit Successfully");
    onEdit(updatedPlaylist);
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
      <Card ref={localRef} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Playlist</CardTitle>
          <CardDescription>
            Edit the playlist details
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="">Playlist Name</Label>
            <Input id=""  value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter playlist name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="">Playlist Description</Label>
            <Input id=""  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter playlist description"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={()=>handleSubmit()}>Edit Playlist</Button>
        </CardFooter>
      </Card>
    </div>
  );
}); 
