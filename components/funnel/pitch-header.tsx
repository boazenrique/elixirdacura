"use client"

import { useState, useEffect } from "react"

interface PitchHeaderProps {
  initialMinutes?: number
}

export function PitchHeader({ initialMinutes = 15 }: PitchHeaderProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60)

  useEffect(() => {
    if (seconds <= 0) return
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#e53e3e] py-2 text-white shadow-md">
      <div className="flex items-center justify-center gap-2 font-bold">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="text-sm">Oferta expira em:</span>
        <span className="text-lg tabular-nums">{formatTime(seconds)}</span>
      </div>
    </header>
  )
}
