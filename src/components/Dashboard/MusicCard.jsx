import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPlus,Play,EllipsisVertical } from 'lucide-react';

const MusicCard = () => {
  return (
    <Card className="grid items-center min-h-fit p-5" style={{ gridTemplateColumns: "10% 75% 10%" }}>
      <div className="flex items-center justify-center">
        <div className="bg-[var(--primary-color)] rounded-full p-5 text-white hover:bg-[var(--primary-color)]/80 cursor-pointer">
          <Play />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <CardTitle className='font-extrabold'>Music Title</CardTitle>
        <CardDescription className=''>Artist</CardDescription>
        <div className="flex space-x-10 ">
          <div className="border-[1.5px] rounded-lg w-15 flex justify-center items-center font-medium">Type</div>
          <div className="font-medium">Duration</div>
        </div>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-500 cursor-pointer">
            <HeartPlus className="" />
        </div>
        <div className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3 hover:text-white transition-all duration-500 cursor-pointer">
            <EllipsisVertical className="" />
        </div>

      </div>
    </Card>
  );
};

export default MusicCard;
