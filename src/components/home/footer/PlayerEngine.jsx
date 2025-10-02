"use client"
import React, { useRef, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { usePlayer } from "@/stores/usePlayer"

// แปลงลิงก์ YouTube ให้เป็น watch?v=ID
function normalizeYouTubeUrl(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube.com/watch?v=${id}` : url
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("music.youtube.com")) {
      const v = u.searchParams.get("v")
      return v ? `https://www.youtube.com/watch?v=${v}` : url
    }
    return url
  } catch { return url }
}

export default function PlayerEngine() {
  const ref = useRef(null)
  const lastOnTimeUpdateMs = useRef(0)

  const current = usePlayer(s => s.current)
  const isPlaying = usePlayer(s => s.isPlaying)
  const volume = usePlayer(s => s.volume)
  const next = usePlayer(s => s.next)
  const setPlayerApi = usePlayer(s => s.setPlayerApi)

  // autoplay policy: เริ่ม muted แล้วค่อย unmute เมื่อเริ่มเล่น
  const [muted, setMuted] = useState(true)

  const src = (() => {
    if (!current)
        return undefined
    if (current.isUrl)
        return normalizeYouTubeUrl(current.url || "")

    return current.url || `/api/song/${current.id}/stream`
  })()

  // ฝาก API ให้ footer ใช้แบบ imperative (ไม่ทำให้ re-render ระหว่างเล่น)
  useEffect(() => {
    setPlayerApi({
      getCurrentTime: () => Number(ref.current?.currentTime ?? 0),
      getDuration: () => Number(ref.current?.duration ?? 1),
      seekTo: (sec) => { if (ref.current) ref.current.currentTime = Number(sec) || 0 },
    })
  }, [setPlayerApi])

  useEffect(() => {
    setMuted(true)
  }, [src])

  const handlePlaying = () => {
    if ((Number(volume) ?? 1) > 0) setMuted(false)
  }

  const handleTimeUpdate = () => {
    const now = performance.now()
    if (now - lastOnTimeUpdateMs.current < 250)
        return
    lastOnTimeUpdateMs.current = now
  }

  return (
    <ReactPlayer
      ref={ref}
      src={src}
      playing={!!isPlaying && !!src}
      volume={Number.isFinite(volume) ? volume : 1}
      muted={!!muted}
      controls={false}
      width={1}
      height={1}
      style={{ position: "fixed", left: -9999, top: 0 }}

      onPlaying={handlePlaying}
      onTimeUpdate={handleTimeUpdate}
      onEnded={next}
      onError={(e) => console.warn("[ReactPlayer] error:", e)}

      config={{
        youtube: {
          color: "white",
          playerVars: { modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3, playsinline: 1 },
          embedOptions: typeof window !== "undefined" ? { origin: window.location.origin } : {},
        },
      }}
    />
  )
}
