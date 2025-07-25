import React from 'react'
import { getAllSongs } from "@/lib/library/song.js";
import MusicCard from '@/components/Dashboard/MusicCard';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const page = async () => {
  const session = await getServerSession(authOptions);
  const songs = await getAllSongs(session);
  const total = songs.length

  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Music Library</span>
        <span className='text-sm opacity-70'>{total} songs</span>
      </div>

      <div className='flex flex-col gap-5 w-full mb-5'>
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </main>
  )
}

export default page