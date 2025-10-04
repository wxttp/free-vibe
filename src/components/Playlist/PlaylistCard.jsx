"use client";
import React from "react";
import { ListMusic, EllipsisVertical, Play } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionCard from "./OptionCard";
import { usePlayer } from "@/stores/usePlayer";

const PlaylistCard = (props) => {
  const { isOwner } = props;

  const player = usePlayer();

  const handlePlayPlaylist = () => {
    if (!props.playlist || !props.playlist.songs?.length) return;
    const queue = props.playlist.songs.map(s => s.song);
    player.load(queue, 0);
    player.play();
  };

  return (
    <Card  className=" flex flex-row justify-between items-center min-h-fit p-5">
      <div className="flex flex-row justify-start items-center gap-5 cursor-pointer w-full h-full" onClick={() => props.setActiveId(props.playlist.id) & props.setPlaylistOpen(true)} >
        <div className="flex items-center justify-center">
          <div className="bg-[var(--primary-color)] rounded-lg p-5 text-white hover:bg-[var(--primary-color-hover)] transition-all duration-300">
            <ListMusic className="h-8 w-8 text-music-primary" />
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <CardTitle className="font-extrabold text-lg">
            {props.playlist.name}
          </CardTitle>
          <CardDescription className="font-medium">
            {props.playlist.description}
          </CardDescription>
          <div className="flex space-x-5 text-center">
            <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
              {props.playlist.songs.length || 0} songs
            </div>
            <div className="text-center text-muted-foreground text-medium">
              Created {new Date(props.playlist.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button className="gap-2 w-fit h-fit" onClick={handlePlayPlaylist}>
          <Play />
          Play
        </Button>
        {
          isOwner &&
          <div className="w-[44px] h-[44px] hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer flex items-center">
            <OptionCard
              playlist={props.playlist}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              song={props.song}
              onAdd={props.onAdd}
            />
          </div>
        }
      </div>
    </Card>
  );
};

export default PlaylistCard;
