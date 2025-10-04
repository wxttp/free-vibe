'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { HeartPlus, Play, Pause, Heart } from 'lucide-react'
import { usePlayer } from '@/stores/usePlayer'
import OptionCard from '@/components/home/library/OptionCard'
import { addToFavorites } from '@/lib/library/song'
import { toast } from "sonner";

const MusicCard = ({ isOwner = true, song, onEdit, onPlay, onDelete }) => {
  const [type, setType] = useState('Loading...')
  const [isFavorite, setIsFavorite] = useState(song?.isFavorite ?? false);
  const [title, setTitle] = useState(song?.title ?? 'Loading...')
  const [artist, setArtist] = useState(song?.artist ?? 'Loading...')

  // Zustand selectors (แยกเป็นตัว ๆ ลด re-render) ----
  const current = usePlayer(s => s.current)
  const isPlaying = usePlayer(s => s.isPlaying)
  const play = usePlayer(s => s.play)
  const pause = usePlayer(s => s.pause)
  const setCurrent = usePlayer(s => s.setCurrent)
  const duration = usePlayer(s => s.duration)

  const isActive = !!current && current.id === song?.id
  const isUrl = !!song?.isUrl

  useEffect(() => {
    if (!song)
      return
    const t = setTimeout(() => {
      setType(isUrl ? 'Url' : 'File')
    }, 300)
    return () => clearTimeout(t)
  }, [song, isUrl])

  const onTogglePlay = () => {
    if (onPlay) {
      onPlay()
      return
    }

    if (!song)
      return

    if (isActive) {
      isPlaying ? pause() : play()
    } else {
      setCurrent?.(song)
      play()
    }
  }

  const handleAddToFavorites = async () => {
    try {
      const res = await addToFavorites(song.id);

      if (res.status === 201 && res.isExist === false) {
        toast.success("Song added to favorites");
        setIsFavorite(true);
      }
      else if (res.status === 200 && res.isExist === true) {
        toast.success("Song removed from favorites");
        setIsFavorite(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Card className="relative flex flex-row justify-between items-center min-h-fit p-5">
      <div className="flex flex-row justify-between items-center gap-5">
        <div className="flex items-center justify-center">
          <button
            onClick={onTogglePlay}
            className="bg-[var(--primary-color)] rounded-full p-5 text-white hover:bg-[var(--primary-color-hover)] transition-all duration-300"
            aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
          >
            {isActive && isPlaying ? <Pause /> : <Play />}
          </button>
        </div>

        <div className="flex flex-col space-y-3">
          <CardTitle className="font-extrabold">
            {title}
          </CardTitle>
          <CardDescription>{artist}</CardDescription>

          <div className="flex space-x-5">
            <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
              {type}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {
          isOwner && (
          <>
            {
              isFavorite ? (
                <>
                  <button onClick={handleAddToFavorites}>
                    <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
                        <Heart className={"fill-[var(--primary-color)]"} />
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleAddToFavorites}>
                    <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
                        <HeartPlus />
                    </div>
                  </button>
                </>
              )
            }
            <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
              <OptionCard isPlaylist={false} song={song} onEdit={onEdit} onDelete={onDelete} setTitle={setTitle} setArtist={setArtist} />
            </div>
          </>
        )
        }
      </div>
    </Card>
  )
}

export default MusicCard
