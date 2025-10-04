"use client"

import React, { useState, useEffect } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Slider } from "@/components/ui/slider"
import { Shuffle, Repeat, SkipBack, SkipForward, Play, Pause } from "lucide-react"
import { usePlayer } from "@/stores/usePlayer"
import { ProgressBar } from "@/components/home/footer/ProgressBar"

export function AppFooter() {
  const {
    current, prev, next, repeat, shuffle,
    isPlaying, play, pause, volume, setVolume,
    playerApi,
  } = usePlayer()

  const { state } = useSidebar()
  const isMobile = useIsMobile()
  const [display, setDisplay] = useState("right-0")
  useEffect(() => { setDisplay(isMobile ? "left-0 w-full!" : "right-0") }, [isMobile])

  const togglePlay = () => (isPlaying ? pause() : play())

  const getCur = () => playerApi.getCurrentTime?.() ?? 0
  const getDur = () => Math.max(1, playerApi.getDuration?.() ?? 1)

  return (
    <footer
      className={`fixed bottom-0 ${display} w-[calc(100% - var(--sidebar-width))]! flex items-center justify-center ${isMobile ? "h-fit" : "h-28"} px-2 bg-background z-10 transition-all duration-200 ease-linear border-t-1`}
      style={{ left: state === "expanded" && !isMobile ? "var(--sidebar-width)" : "0" }}
      id="app-footer"
    >
      <div className={isMobile ? `grid grid-rows-3 grid-cols-1 w-full h-fit` : `grid grid-cols-4 w-full h-full`}>
        <div className="col-span-1 flex flex-col justify-center pl-2">
          <strong>
            {current?.title ? (current.title.length > 30 ? current.title.slice(0, 30) + "..." : current.title) : "No track selected"}
          </strong>
          {current?.artist ? (current.artist.length > 30 ? current.artist.slice(0, 30) + "..." : current.artist) : ""}
        </div>

        <div className="col-span-2 w-full h-full flex justify-center items-center flex-col gap-2">
          <div className="flex justify-center items-center gap-5">
            {/* <button
              onClick={usePlayer.getState().toggleShuffle}
              className={shuffle ? "w-fit bg-[var(--primary-color)] rounded-md p-3" : "w-fit hover:bg-[var(--primary-color)] rounded-md p-3"}
            >
              <Shuffle className="w-4 h-4" />
            </button> */}
            <button onClick={prev} className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3">
              <SkipBack className="w-4 h-4" />
            </button>
            <button onClick={togglePlay} className="w-fit h-[48px] bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] rounded-full p-3">
              {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
            </button>
            <button onClick={next} className="w-fit hover:bg-[var(--primary-color)] rounded-md p-3">
              <SkipForward className="w-4 h-4" />
            </button>
            {/* <button
              onClick={usePlayer.getState().toggleRepeat}
              className={repeat ? "w-fit bg-[var(--primary-color)] rounded-md p-3" : "w-fit hover:bg-[var(--primary-color)] rounded-md p-3"}
            >
              <Repeat className="w-4 h-4" />
            </button> */}
          </div>

          <div className="w-[min(640px,90vw)] flex flex-col gap-1">
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 text-right tabular-nums text-xs">{formatTime(getCur())}</span>
              <ProgressBar getCurrentTime={getCur} getDuration={getDur} />
              <span className="w-12 tabular-nums text-xs">{formatTime(getDur())}</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex justify-center items-center">
          <div className="w-[120px]">
            <Slider
              value={[Number.isFinite(volume) ? volume : 1]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(arr) => setVolume(arr[0])}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

function formatTime(s = 0) {
  const t = Number.isFinite(s) ? s : 0
  const m = Math.floor(t / 60)
  const ss = Math.floor(t % 60).toString().padStart(2, "0")
  return `${m}:${ss}`
}
