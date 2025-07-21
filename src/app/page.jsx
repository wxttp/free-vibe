'use client'

// next
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";
import InfoCard from "@/components/Index/InfoCard";

// icon
import { Music, Upload, ListMusic, HeartPlus, Play, icons } from 'lucide-react';

const mockInfo = [
  {
    title: 'Upload Music',
    description: 'Upload MP3 files or add songs via YouTube URLs',
    icons: Upload
  },
  {
    title: 'Create Playlists',
    description: 'Organize your music into custom playlists',
    icons: ListMusic
  },
  {
    title: 'Favorites',
    description: 'Mark your favorite songs for quick access',
    icons: HeartPlus
  },
  {
    title: 'Music Player',
    description: 'Play your music with a beautiful player interface',
    icons: Play
  }
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="font-sans items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 flex">
      <main className="flex flex-col items-center w-full max-w-[1600px]">

          <div className="flex flex-col text-center py-4">
            <div className="flex items-center justify-center py-2">
              <div className="w-fit bg-[var(--primary-color)] rounded-full p-3">
                <Music className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[var(--primary-color)] py-2">FreeVibe</h1>
            <p>Your personal music library and playlist manager. Upload, organize, and enjoy your music collection with a beautiful, modern interface.</p>
          </div>

          <div className="flex flex-wrap items-center w-full md:w-fit py-4">
            <Button className="md:px-[32px]" onClick={() => router.push('/auth')}>Get Started</Button>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full gap-3 md:grid md:[grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))]">
              {
                mockInfo.map((item, index) => (
                  <InfoCard key={index} {...item} />
                ))
              }
            </div>
          </div>

      </main>
    </div>
  );
}
