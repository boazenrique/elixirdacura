"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PreDiagnosisStepProps {
  onComplete: () => void
}

export function PreDiagnosisStep({ onComplete }: PreDiagnosisStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 text-center"
    >
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h1 className="text-balance text-2xl font-bold leading-tight text-foreground">
          Conheça o <span className="bg-[#00a923] text-white px-1">Elixir da Cura Natural</span> que milhares de pessoas estão usando para acabar com as dores no corpo
        </h1>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative mx-auto overflow-hidden rounded-2xl shadow-lg"
      >
        <Image
          src="/images/banner1.png"
          alt="Mulher com barriga inchada"
          width={380}
          height={320}
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-4 text-xs text-muted-foreground"
      >
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          100% Gratuito
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#00a923]" />2 minutos
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Resultado imediato
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Button
          onClick={onComplete}
          size="lg"
          className="w-full bg-[#00a923] py-6 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#008a1c] hover:shadow-xl"
        >
          Iniciar Diagnóstico Gratuito
        </Button>
      </motion.div>

      {/* Social Proof */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-muted-foreground"
      >
        Essas perguntas são usadas em todas as consultas da Dra Stefanny
      </motion.p>

      {/* Social Proof Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mx-auto"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/font%20instagram%20sans%20%284%29-BEHrGLoy9Wurqts9lIfAvyKNEe4SsP.png"
          alt="+11.000 diagnósticos realizados com sucesso - Junte-se a milhares de pessoas com corpo restaurado"
          width={600}
          height={150}
          className="h-auto w-full rounded-xl"
        />
      </motion.div>
    </motion.div>
  )
}
