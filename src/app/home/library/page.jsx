import React from 'react'

import { getAllSongs } from "@/lib/library/song.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import LibraryPage from '@/components/home/library/LibraryPage';

const page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId)
    // TODO: ให้ redirect ไปที่หน้า home
    return

  const songs = await getAllSongs(userId);

  return (
    <LibraryPage songs={songs} />
  )
}

export default page