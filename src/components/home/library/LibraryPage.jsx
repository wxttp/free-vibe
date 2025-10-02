'use client'
import { useState, useEffect } from 'react'
import MusicCard from '@/components/home/MusicCard'
import { usePlayer } from '@/stores/usePlayer'



export default function LibraryPage(props) {
  const { songs } = props;
  const { load, queue, current } = usePlayer()
  const [activeId, setActiveId] = useState(null)
  const total = songs.length

  useEffect(() => {
    if (songs?.length)
      load(songs, 0)
  }, [songs, load])

  return (
    <main className='mt-5'>
      <div className='text-3xl flex flex-col mb-5'>
        <span className='text-[var(--primary-color)] font-bold'>Music Library</span>
        <span className='text-sm opacity-70'>{total} songs</span>
      </div>

      <div className='flex flex-col gap-5 w-full mb-5'>
        {songs.map(song => (
          <MusicCard
            key={song.id}
            song={song}
            isActive={activeId === song.id}
            activate={() => setActiveId(song.id)}
            deactivate={() => setActiveId(null)}
            onEnded={() => setActiveId(null)}
          />
        ))}
      </div>
    </main>
  )
}
