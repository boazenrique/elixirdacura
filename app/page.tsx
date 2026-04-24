"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { PreDiagnosisStep } from "@/components/funnel/pre-diagnosis-step"
import { AssessmentStep } from "@/components/funnel/assessment-step"
import { AlertStep } from "@/components/funnel/alert-step"
import { trackFunnelStep } from "@/lib/facebook-pixel"

export type FunnelStep = "pre-diagnosis" | "assessment" | "alert"

const stepProgress: Record<FunnelStep, number> = {
  "pre-diagnosis": 0,
  assessment: 25,
  alert: 75,
}

export default function FunnelPage() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>("pre-diagnosis")
  const [progress, setProgress] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    const stepNames: Record<FunnelStep, string> = {
      "pre-diagnosis": "Pré-Diagnóstico",
      assessment: "Avaliação",
      alert: "Estado de Alerta",
    }

    trackFunnelStep(stepNames[currentStep], stepProgress[currentStep])
  }, [currentStep])

  const addProgress = (amount: number) => {
    setProgress((prev) => Math.min(prev + amount, 100))
  }

  const goToStep = (step: FunnelStep) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[428px] px-4 pb-8 pt-8">
        <AnimatePresence mode="wait">
          {currentStep === "pre-diagnosis" && (
            <PreDiagnosisStep key="pre-diagnosis" onComplete={() => goToStep("assessment")} />
          )}
          {currentStep === "assessment" && (
            <AssessmentStep
              key="assessment"
              answers={answers}
              setAnswers={setAnswers}
              addProgress={addProgress}
              onComplete={() => goToStep("alert")}
            />
          )}

          {currentStep === "alert" && <AlertStep key="alert" />}
        </AnimatePresence>
      </main>
    </div>
  )
}
