import React, { useEffect, useRef } from "react"

export function ProgressBar({ getCurrentTime, getDuration }) {
  const barRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      const cur = Number(getCurrentTime?.() ?? 0)
      const dur = Math.max(1, Number(getDuration?.() ?? 1))
      const pct = Math.min(100, Math.max(0, (cur / dur) * 100))
      if (barRef.current)
        barRef.current.style.width = pct + "%"
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [getCurrentTime, getDuration])

  return (
    <div className="relative h-2 w-full bg-[var(--background-color)] rounded overflow-hidden">
      <div ref={barRef} className="absolute left-0 top-0 h-full bg-[var(--primary-color)]" style={{ width: "0%" }} />
    </div>
  )
}