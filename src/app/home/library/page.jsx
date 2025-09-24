import React from 'react'

import { getAllSongs } from "@/lib/library/song.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import LibraryPage from '@/components/home/library/LibraryPage';

const page = async () => {
  const session = await getServerSession(authOptions);
  const songs = await getAllSongs(session);

  return (
    <LibraryPage songs={songs} />
  )
}

export default page