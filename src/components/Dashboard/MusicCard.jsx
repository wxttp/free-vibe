'use client'

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { HeartPlus,Play,EllipsisVertical } from 'lucide-react';

const MusicCard = (props) => {
  const [type, setType] = useState('Undefined');

  if (props.song.file !== null && props.song.url !== null) {
    if (props.song.isUrl) setType('Url');
    else setType('File');
  }

  return (
    <Card className="flex flex-row justify-between items-center min-h-fit p-5">
      <div className="flex flex-row justify-between items-center gap-5">
        <div className="flex items-center justify-center">
          <div className="bg-[var(--primary-color)] rounded-full p-5 text-white hover:bg-[var(--primary-color-hover)] transition-all duration-300 cursor-pointer">
            <Play />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <CardTitle className='font-extrabold'>{props.song.title}</CardTitle>
          <CardDescription className=''>{props.song.artist}</CardDescription>
          <div className="flex space-x-5">
            <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">{type}</div>
            <div className="font-medium">Duration</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
            <HeartPlus />
        </div>
        <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
            <EllipsisVertical />
        </div>

      </div>
    </Card>
  );
};

export default MusicCard;
