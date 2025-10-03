"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MusicCard from "@/components/home/MusicCard";
export const PlaylistView = ({ playlist, playlistOpen }) => {
  if (!playlist) {
    return null;
  }
  const [activeId, setActiveId] = useState(null);
  const total = playlist.songs?.length || 0;
  if (!playlistOpen) {
    return null;
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[var(--primary-color)] font-bold text-2xl">
            {playlist.name}
          </CardTitle>
          <CardDescription>{playlist.description}</CardDescription>
          <CardDescription>{total} songs</CardDescription>
        </CardHeader>
        <CardContent className="">
          {playlist.songs.map((song) => (
            <div key={song.id} className="mb-2">
              <MusicCard
                key={song.id}
                song={song.song}
                isActive={activeId === song.id}
                activate={() => setActiveId(song.id)}
                deactivate={() => setActiveId(null)}
                onEnded={() => setActiveId(null)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
