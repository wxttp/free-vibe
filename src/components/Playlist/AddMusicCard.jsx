"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListPlus } from "lucide-react";

export const AddMusicCard = ({ song, selectSong, setSelectSong }) => {
  const [type, setType] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [showYT, setShowYT] = useState(false);

  const handleClick = () => {
    setSelectSong((prev) => (prev.includes(song.id) ? prev.filter((id) => id !== song.id) : [...prev, song.id]));
  };    
  useEffect(() => {
    if (!song) return;

    setLoading(true);
    const t = setTimeout(() => {
      if (song.isUrl) setType("Url");
      else if (song.file) setType("File");
      else setType("Undefined");
      setLoading(false);
    }, 300);

    return () => clearTimeout(t);
  }, [song]);



  return (
    <Card onClick={handleClick} className={selectSong.includes(song.id)  ? "border-[var(--primary-color)]" : ""}>
      <CardContent>
        <div className="flex gap-3 h-[7vh]">
          <div className="flex  items-center gap-5">
            <ListPlus className="w-10 h-10 text-[var(--primary-color)] self-center" />
            {/* <Input className="w-6 h-6" id="music" type="checkbox" /> */}
            <div className="grid grid-rows-3 gap-0">
              <CardTitle className="font-extrabold">{song?.title}</CardTitle>
              <CardDescription>{song?.artist}</CardDescription>
              <div className="flex space-x-5 font-medium text-muted-foreground">
                <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
                  {type === "Loading..." ? "Loading..." : type}
                </div>
                <div className="font-medium">
                  Duration: {song?.duration ? "-" : "00:00"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
