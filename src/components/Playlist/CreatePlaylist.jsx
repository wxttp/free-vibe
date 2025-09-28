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
import { createPlaylist } from "@/lib/playlist/playlist";
import { toast } from "sonner";

export const CreatePlaylist = forwardRef(({ session, open, onClose }, ref) => {
  const localRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async ()=>{
    await createPlaylist(session.user.id, name, description);
    toast.success("Playlist Created Successfully");
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (localRef.current && !localRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card ref={localRef} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Playlist</CardTitle>
          <CardDescription>
            Create a new playlist
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="">Playlist Name</Label>
            <Input id="" defaultValue="" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter playlist name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="">Playlist Description</Label>
            <Input id="" defaultValue="" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter playlist description"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={()=>handleSubmit()}>Create Playlist</Button>
        </CardFooter>
      </Card>
    </div>
  );
}); 
