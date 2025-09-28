'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { HeartPlus, Play, Pause, EllipsisVertical } from 'lucide-react'
import { extractYouTubeId } from '@/lib/youtube'

const MusicCard = ({ song, isActive, activate, deactivate, onEnded }) => {
  const [type, setType] = useState('Loading...')
  const [showYT, setShowYT] = useState(false)
  const audioRef = useRef(null);

  const isUrl = !!song?.isUrl
  const youTubeId = isUrl ? extractYouTubeId(song?.url ?? '') : null
  const youTubeEmbed = youTubeId
    ? `https://www.youtube.com/embed/${youTubeId}?autoplay=1&modestbranding=1&controls=0&fs=0&rel=0&iv_load_policy=3&playsinline=1`
    : null

  const togglePlay = () => (isActive ? deactivate() : activate())

  // แสดงประเภทของเพลง (.mp3 หรือ url)
  useEffect(() => {
    if (!song)
      return

    const t = setTimeout(() => {
      setType(song.isUrl ? 'Url' : 'File')
    }, 300)

    return () => clearTimeout(t)
  }, [song])

  // ยัดใส่ iframe ให้เล่นเสียง
  useEffect(() => {
    if (isUrl) {
      setShowYT(isActive)
      return
    }

    const el = audioRef.current
    if (!el)
      return

    // รีโหลด src ทุกครั้งที่เพลงเปลี่ยน
    el.load()

    if (isActive) {
      if (el.readyState >= 3)
        el.play().catch(() => {})
      else
        el.addEventListener("canplay", () => el.play().catch(() => {}), { once: true })
    } else {
      el.pause()
    }
  }, [isActive, isUrl, song.id])

  // เพิ่ม handler ช่วย debug
  const onAudioError = (e) => {
    console.error('Audio error', e?.currentTarget?.error)
  }

  return (
    <>
      <Card className="relative flex flex-row justify-between items-center min-h-fit p-5">
        <div className="flex flex-row justify-between items-center gap-5">
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-[var(--primary-color)] rounded-full p-5 text-white hover:bg-[var(--primary-color-hover)] transition-all duration-300"
              aria-label={isActive ? 'Pause' : 'Play'}
            >
              {isActive ? <Pause /> : <Play />}
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <CardTitle className="font-extrabold">{song?.title}</CardTitle>
            <CardDescription>{song?.artist}</CardDescription>
            <div className="flex space-x-5">
              <div className="border-[1.5px] rounded-lg flex justify-center items-center font-medium w-fit px-2">
                {type}
              </div>
              <div className="font-medium">
                Duration: {isUrl ? '-' : ''}
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

      {isUrl && showYT && youTubeEmbed && (
        <div
          className="hidden absolute top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <iframe
            src={youTubeEmbed}
            title={song?.title || 'YouTube'}
            width="1"
            height="1"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            tabIndex={-1}
          />
        </div>
      )}

      {!isUrl && (
        <audio
          ref={audioRef}
          src={`/api/song/${song.id}/stream`}
          controls
          preload="none"
          onEnded={deactivate}
          onError={onAudioError}
          className="hidden"
        />
      )}
    </>
  )
}

export default MusicCard
