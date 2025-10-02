'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { HeartPlus, Play, Pause, EllipsisVertical } from 'lucide-react'
import { usePlayer } from '@/stores/usePlayer'

function fmt(s = 0) {
  const t = Number.isFinite(s) ? s : 0
  const m = Math.floor(t / 60)
  const ss = Math.floor(t % 60).toString().padStart(2, '0')
  return `${m}:${ss}`
}

const MusicCard = ({ song }) => {
  const [type, setType] = useState('Loading...')

  // ---- Zustand selectors (แยกเป็นตัว ๆ ลด re-render) ----
  const current   = usePlayer(s => s.current)
  const isPlaying = usePlayer(s => s.isPlaying)
  const play      = usePlayer(s => s.play)
  const pause     = usePlayer(s => s.pause)
  const setCurrent= usePlayer(s => s.setCurrent)     // << ต้องมีใน usePlayer
  const duration  = usePlayer(s => s.duration)

  const isActive = !!current && current.id === song?.id
  const isUrl    = !!song?.isUrl

  useEffect(() => {
    if (!song) return
    const t = setTimeout(() => {
      setType(isUrl ? 'Url' : 'File')
    }, 300)
    return () => clearTimeout(t)
  }, [song, isUrl])

  const onTogglePlay = () => {
    if (!song) return
    if (isActive) {
      // เพลงเดียวกัน → toggle play/pause
      isPlaying ? pause() : play()
    } else {
      // เพลงใหม่ → ตั้ง current แล้วเล่น
      setCurrent?.(song)
      play()
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
            {song?.title ?? 'Untitled'}
          </CardTitle>
          <CardDescription>{song?.artist ?? ''}</CardDescription>

          <div className="flex space-x-5">
            <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
              {type}
            </div>
            <div className="font-medium">
              {/* แสดง duration เฉพาะเมื่อเป็นเพลงที่ active (อ่านจาก store) */}
              Duration: {isActive ? fmt(duration) : (isUrl ? '-' : '-')}
            </div>
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
  )
}

export default MusicCard
