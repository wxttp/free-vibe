"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MusicCard from "@/components/home/MusicCard";
import { usePlayer } from "@/stores/usePlayer";
import { Button } from "@/components/ui/button";

export const PlaylistView = ({ isOwner, playlist, playlistOpen, onClose }) => {
  const [activeId, setActiveId] = useState(null);

  const load = usePlayer(s => s.load)
  const play = usePlayer(s => s.play)

  useEffect(() => {
    if (playlist && playlist.songs?.length) {
      const queue = playlist.songs.map(s => s.song)
      load(queue, 0)
    }
  }, [playlist, load])

  if (!playlist)
    return null;
  if (!playlistOpen)
    return null;

  const total = playlist.songs?.length || 0;

  const handlePlaySong = (index) => {
    const queue = playlist.songs.map(ps => ps.song)
    load(queue, index)
    play()
  }

  return (
    <div>
      <Card>
        <CardHeader className={"flex flex-row justify-between"}>
          <div>
            <CardTitle className="text-[var(--primary-color)] font-bold text-2xl">
              {playlist.name}
            </CardTitle>
            <CardDescription>{playlist.description}</CardDescription>
            <CardDescription>{total} songs</CardDescription>
          </div>

          <div>
            <Button className={"px-4"} onClick={onClose}>
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="">
          {playlist.songs.map((song, index) => (
            <div key={song.id} className="mb-2">
              <MusicCard
                isOwner={isOwner}
                key={song.id}
                song={song.song}
                onPlay={() => handlePlaySong(index)}
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
