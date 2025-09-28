"use client";
import React from "react";
import { ListMusic, EllipsisVertical, Play } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionCard from "./OptionCard";

const PlaylistCard = (props) => {
  const sec = props.playlist.playlistTime % 60;
  const min = Math.floor(props.playlist.playlistTime / 60) % 60;
  const hour = Math.floor(props.playlist.playlistTime / 60 / 60) || 0;
  const timeFormat = () => {
    if (hour) {
      return `${hour}:${min}:${sec}`;
    } else {
      return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    }
  };
  return (
    <Card className="flex flex-row justify-between items-center min-h-fit p-5">
      <div className="flex flex-row justify-between items-center gap-5">
        <div className="flex items-center justify-center">
          <div className="bg-[var(--primary-color)] rounded-lg p-5 text-white hover:bg-[var(--primary-color-hover)] transition-all duration-300 cursor-pointer">
            <ListMusic className="h-8 w-8 text-music-primary" />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <CardTitle className="font-extrabold text-lg">
            {props.playlist.name}
          </CardTitle>
          <CardDescription className="font-medium">
            {props.playlist.description}
          </CardDescription>
          <div className="flex space-x-5 text-center">
            <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
              {props.playlist.songs.length} songs
            </div>
            <div className="text-center text-muted-foreground text-medium">
              {timeFormat()}
            </div>
            <div className="text-center text-muted-foreground text-medium">
              Created {props.playlist.created_at.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-row items-center gap-2">
        <Button className="gap-2 w-fit h-fit">
          <Play />
          Play
        </Button>
        <div className="w-[44px] h-[44px] hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer flex items-center">
          <OptionCard />
        </div>
      </div>
    </Card>
  );
};

export default PlaylistCard;
