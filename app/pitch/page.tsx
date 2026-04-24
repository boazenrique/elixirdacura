"use client"

import { useState, useEffect } from "react"
import { FinalPitchStep } from "@/components/funnel/final-pitch-step"
import { trackFunnelStep, trackLead } from "@/lib/facebook-pixel"

export default function PitchPage() {
  const [countdown, setCountdown] = useState(15 * 60)

  useEffect(() => {
    trackFunnelStep("Oferta Final", 100)
    trackLead()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#e53e3e] py-3 text-white shadow-md">
        <div className="flex items-center justify-center gap-2 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-sm">Oferta expira em:</span>
          <span className="text-base tabular-nums">
            {Math.floor(countdown / 60).toString().padStart(2, "0")}:
            {(countdown % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-[428px] px-4 pb-8 pt-16">
        <FinalPitchStep externalCountdown={countdown} />
      </main>
    </div>
  )
}
