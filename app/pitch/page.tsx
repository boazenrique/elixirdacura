"use client"

import { useEffect } from "react"
import { Header } from "@/components/funnel/header"
import { FinalPitchStep } from "@/components/funnel/final-pitch-step"
import { trackFunnelStep, trackLead } from "@/lib/facebook-pixel"

export default function PitchPage() {
  useEffect(() => {
    trackFunnelStep("Oferta Final", 100)
    trackLead()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header progress={100} />
      <main className="mx-auto max-w-[428px] px-4 pb-8 pt-20">
        <FinalPitchStep />
      </main>
    </div>
  )
}
