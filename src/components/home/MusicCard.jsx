'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { HeartPlus, Play, Pause, Heart } from 'lucide-react'
import { usePlayer } from '@/stores/usePlayer'
import OptionCard from '@/components/home/library/OptionCard'
import { addToFavorites } from '@/lib/library/song'
import { toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton'

const MusicCard = ({ isOwner = true, song, onEdit, onPlay, onDelete }) => {
  const [type, setType] = useState(null)
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

  const handleAddToFavorites = () => {
    toast.promise(
      (async () => {
        const res = await addToFavorites(song.id);

        if (![200, 201].includes(res.status)) {
          throw new Error("Failed to update favorite");
        }

        setIsFavorite(!isFavorite);
        return res;
      })(),
      {
        loading: isFavorite
          ? "Removing from favorites..."
          : "Adding to favorites...",
        success: (res) =>
          res.status === 201 && res.isExist === false
            ? "Song added to favorites"
            : "Song removed from favorites",
        error: (err) => err.message || "Something went wrong",
      }
    );
  };


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
            {type ? title : <Skeleton className="h-6 w-[150px]" />}
          </CardTitle>
          <CardDescription>{type ? artist : <Skeleton className="h-4 w-[100px]" />}</CardDescription>

          <div className="flex space-x-5">
            {type ? (
              <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
                {type}
              </div>
              ) : (
                <Skeleton className="h-6 w-[50px]" />
              )
            }
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {
          isOwner && (
          <>
            {type ? (
              <button onClick={handleAddToFavorites}>
                <div className="w-fit hover:bg-[var(--primary-color)] rounded-md px-1 py-1 sm:p-3 hover:text-white transition-all duration-300 cursor-pointer">
                  {isFavorite ? (
                    <Heart className="fill-[var(--primary-color)]" />
                  ) : (
                    <HeartPlus />
                  )}
                </div>
              </button>
            ) : (
              <Skeleton className="h-[48px] w-[48px] rounded-md" />
            )}
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
