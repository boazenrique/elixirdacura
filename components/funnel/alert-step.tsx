"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function AlertStep() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header Warning */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-foreground flex items-center justify-center gap-2 flex-wrap">
          <AlertTriangle className="h-6 w-6" style={{ color: "#ffa800", fontSize: "30px" }} />
          <span style={{ fontSize: "24px" }}>RESULTADO DO SEU DIAGNÓTICO!</span>
          <span className="text-foreground">Pelas suas respostas, seu quadro de dores está em</span>
        </h2>
        <p className="text-xl font-bold" style={{ color: "#ff0000" }}>
          <span style={{ color: "#ff0000", textDecoration: "none" }}>Estado de ALERTA</span>.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Nível</span>
          <span className="text-sm font-bold text-foreground">{progress}%</span>
        </div>

        <div className="relative">
          {/* Gradient Bar Background */}
          <div className="h-4 rounded-full overflow-hidden" style={{
            background: "linear-gradient(to right, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #ef4444 100%)"
          }}>
            {/* Progress Indicator */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="h-full relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-gray-400 shadow-md" />
            </motion.div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Leve</span>
            <span>Moderado</span>
            <span>Alto</span>
            <span className="text-orange-500 font-medium">Alerta</span>
            <span>Irreversível</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="font-bold text-foreground flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>A causa das suas dores não está apenas na região onde você sente. Ela está dentro do seu corpo.</span>
        </p>

        <p style={{ color: "#000000" }}>
          E é exatamente por isso que tudo que você tentou até hoje não funcionou de verdade.
        </p>

        <p style={{ color: "#000000" }}>
          Enquanto você tenta aliviar a dor com remédios, pomadas, fisioterapias ou tratamentos… a inflamação continua avançando em silêncio.
        </p>

        <p style={{ color: "#000000" }}>
          E com o tempo… isso só piora.
        </p>

        <p style={{ color: "#000000" }}>
          Limita seus movimentos… tira sua liberdade… e começa a afetar sua qualidade de vida.
        </p>

        <p style={{ color: "#000000" }}>
          Mas agora que você entende o que realmente está acontecendo… fica impossível ignorar.
        </p>

        <p className="font-bold text-foreground text-center">
          Você gostaria de ter acesso agora a receita completa do Elixir da Cura Natural e Acabar de vez com suas dores?
        </p>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={() => router.push("/pitch")}
          className="w-full rounded-xl bg-teal-600 py-6 text-base font-bold hover:bg-teal-700"
        >
          Quero o Elixir da Cura Natural
        </Button>
      </motion.div>
    </motion.div>
  )
}
