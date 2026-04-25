"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface ProfileStepProps {
  addProgress: (amount: number) => void
  onComplete: () => void
}

export function ProfileStep({ addProgress, onComplete }: ProfileStepProps) {
  const [nome, setNome] = useState("")

  const handleContinue = () => {
    if (!nome.trim()) return
    addProgress(15)
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#00a923", "#f59e0b"],
    })
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 text-center"
    >
      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-balance text-3xl font-bold text-foreground"
        >
          Diagnóstico Concluído!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-foreground"
        >
          O seu resultado está pronto e junto dele vamos te enviar um presente especial por você ter feito esse diagnóstico.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-foreground"
        >
          Digite seu nome abaixo para receber seu diagnóstico e liberar o seu acesso a Receita do Elixir da Cura Natural.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4 text-left"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome..."
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-[#00a923] focus:outline-none focus:ring-1 focus:ring-[#00a923]"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Button
          onClick={handleContinue}
          disabled={!nome.trim()}
          className="w-full rounded-xl bg-[#00a923] py-6 text-lg font-semibold uppercase tracking-wide hover:bg-[#008a1c] disabled:opacity-50"
        >
          Confirmar
        </Button>
      </motion.div>
    </motion.div>
  )
}
