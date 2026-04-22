"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Mic, ChevronDown } from "lucide-react"
import Image from "next/image"

const testimonials = [
  { src: "/images/testimonial-09.png", alt: "Depoimento Rogerio Luiz" },
  { src: "/images/testimonial-10.png", alt: "Depoimento Maria Elena" },
  { src: "/images/testimonial-11.png", alt: "Depoimento Juliana Santos" },
  { src: "/images/testimonial-12.png", alt: "Depoimento Luzia do Carmo" },
]

export function FinalPitchStep() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [countdown, setCountdown] = useState(15 * 60) // 15 minutes in seconds
  const audioRef = useRef<HTMLAudioElement>(null)

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Audio Element */}
      <audio ref={audioRef} src="/002.MP3" preload="metadata" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3 text-center"
      >
        <h1 className="text-3xl font-extrabold text-foreground leading-tight">
          Receba imediatamente no seu WhatsApp a receita do{" "}
          <span className="text-teal-600">Elixir da Cura Natural</span>{" "}
          para acabar com as dores no corpo em{" "}
          <span className="text-teal-600">3 dias</span>
        </h1>
        <p className="text-base text-muted-foreground">
          A causa das suas dores é interna, e pode ser tratada sem uso de medicamentos, ou fisioterapias.
        </p>
      </motion.div>

      {/* Benefits with Videos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-center text-lg font-bold text-foreground">
          Resultados reais em{" "}
          <span className="text-teal-600">3 dias:</span>
        </h2>

        {/* Benefit 1 */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-start gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold mt-0.5">✓</span>
            Reduz a inflamação crônica que desgasta suas articulações diariamente
          </p>
          <video
            src="/images/varti.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-xl shadow-sm"
          />
        </div>

        {/* Benefit 2 */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-start gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold mt-0.5">✓</span>
            Estimula a recuperação natural das estruturas articulares
          </p>
          <video
            src="/images/vmaos.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-xl shadow-sm"
          />
        </div>

        {/* Benefit 3 */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-start gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold mt-0.5">✓</span>
            Força seu corpo a voltar a responder como deveria
          </p>
          <video
            src="/images/vjoelho.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-xl shadow-sm"
          />
        </div>
      </motion.div>

      {/* Audio Section Title */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center font-bold text-foreground"
      >
        Escute o áudio da Dra. Stefanny e veja tudo que você vai receber:
      </motion.p>


      {/* WhatsApp-style Audio Player */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-gray-100 p-3"
      >
        <div className="flex items-center gap-3">
          {/* Play Button */}
          <button
            onClick={togglePlayPause}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          {/* Waveform and Progress */}
          <div className="flex-1 space-y-1">
            <p className="text-xs font-medium text-gray-600">Dra. Stefanny</p>

            {/* Waveform */}
            <div className="relative h-8 flex items-center gap-[2px]">
              {[...Array(35)].map((_, i) => {
                const heights = [12, 20, 16, 28, 14, 24, 18, 30, 12, 22, 16, 26, 14, 20, 18, 28, 12, 24, 16, 30, 14, 22, 18, 26, 12, 20, 16, 28, 14, 24, 18, 30, 12, 22, 16]
                const barProgress = (i / 35) * 100
                const isActive = barProgress <= progress
                return (
                  <div
                    key={i}
                    className={`w-[3px] rounded-full transition-colors duration-150 ${isActive ? "bg-teal-500" : "bg-gray-300"
                      }`}
                    style={{ height: `${heights[i]}px` }}
                  />
                )
              })}

              {/* Progress indicator dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-teal-600 shadow-md transition-all duration-150"
                style={{ left: `${Math.min(progress, 97)}%` }}
              />
            </div>

            {/* Time */}
            <p className="text-xs text-gray-500">{formatTime(currentTime)}</p>
          </div>

          {/* Mic Icon */}
          <div className="flex-shrink-0">
            <Mic className="h-5 w-5 text-teal-500" />
          </div>

          {/* Doctor Photo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/doctor-profile.png"
              alt="Dra. Stefanny"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-200"
            />
          </div>
        </div>
      </motion.div>

      {/* What You'll Receive Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xl font-bold text-foreground pt-4"
      >
        🎁4 Bônus Exclusivos:
      </motion.h3>

      {/* Benefit Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Card 1 - Protocolo Anti-Dor */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-01.png"
              alt="Protocolo Anti-Dor"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Método Adeus Dor Personalizado</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Ritual com combinações naturais que atuam diretamente na inflamação e no desgaste das articulações
          </p>
        </div>

        {/* Card 2 - Reunião Exclusiva */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-02.png"
              alt="Reunião Exclusiva"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Consulta Exclusiva com a Dra. Stefanny</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Você recebe acesso a uma orientação onde poderá entender melhor o seu caso e tirar suas dúvidas
          </p>
        </div>

        {/* Card 3 - Grupo VIP */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-03.png"
              alt="Grupo VIP"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Grupo VIP</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Acesso a um grupo exclusivo com pessoas que estão aplicando o protocolo e compartilhando evolução
          </p>
        </div>

        {/* Card 4 - Acompanhamento VIP */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-04.png"
              alt="Acompanhamento VIP"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Acompanhamento VIP</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Suporte durante todo o processo para garantir que você aplique corretamente e tenha resultado
          </p>
        </div>

        {/* Card 5 - Garantia Premium */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-05.png"
              alt="Garantia Premium"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Garantia Premium de 30 dias</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Se não tiver resultados em 24h ou até 30 dias, você recebe seu dinheiro de volta
          </p>
        </div>

        {/* Card 6 - Rotina Anti-Inflamatória */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center">
            <Image
              src="/images/benefit-06.png"
              alt="Rotina Anti-Inflamatória"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1">Rotina Anti-Inflamatória</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Rotina anti-inflamatória de poucos minutos por dia para evitar que as dores voltem a piorar
          </p>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4 pt-4"
      >
        {/* Bonus Value Text */}
        <p className="text-center text-red-600 text-sm">
          O valor total desses bônus ficaria em:<span className="line-through ml-1">R$550,00</span>
        </p>

        {/* Pricing Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Green Header */}
          <div className="px-4 py-2 text-center" style={{ backgroundColor: "#05aa27" }}>
            <p className="text-sm font-bold text-white tracking-wide">PROMOÇÃO VÁLIDO SOMENTE HOJE</p>
          </div>

          {/* Price Content */}
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-lg font-bold text-foreground">Elixir da Cura + Bônus</p>
            <div className="text-right">
              <p className="text-xs text-gray-500">97%off</p>
              <p className="text-2xl font-bold" style={{ color: "#05aa27" }}>R$ 27,00</p>
              <p className="text-xs text-gray-500">à vista</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://zuckpay.com.br/checkout/elixir-da-cura-natural"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl py-4 text-base font-bold text-white text-center shadow-md transition-all active:scale-[0.98] animate-pulse-forward"
          style={{ backgroundColor: "#05aa27" }}
        >
          Quero garantir agora
        </a>
      </motion.div>

      {/* Testimonials Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4 pt-6"
      >
        <h3 className="text-center text-xl font-bold text-foreground">
          Veja quem já transformou sua vida:
        </h3>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Image
                  src={testimonial.src}
                  alt={testimonial.alt}
                  width={428}
                  height={428}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${index === currentSlide ? "w-4" : "bg-gray-300"
                }`}
              style={{
                backgroundColor: index === currentSlide ? "#ecb012" : undefined,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Guarantee Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="pt-4"
      >
        <Image
          src="/images/056542.png"
          alt="Diagnóstico Corpo Livre - Tenha resultados em 28 dias ou seu dinheiro de volta"
          width={428}
          height={428}
          className="w-full h-auto rounded-xl"
        />
      </motion.div>

      {/* Progress Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="grid grid-cols-2 gap-4 pt-6"
      >
        {/* Card 1 - Hoje */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 mb-1">10%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-red-500 rounded-b-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">Hoje:</span> Dores constantes, dificuldade para se movimentar
          </p>
        </div>

        {/* Card 2 - 1ª semana */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 mb-1">20%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-green-500 rounded-b-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">1 Hora:</span> Desintoxicação do organismo de dentro para fora
          </p>
        </div>

        {/* Card 3 - 2ª semana */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 mb-1">40%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-green-500 rounded-b-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">2 Horas:</span> O corpo começa a reduzir a inflamação nas articulações
          </p>
        </div>

        {/* Card 4 - 3ª semana */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 mb-1">60%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-green-500 rounded-b-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">5 horas:</span> Dores diminuindo e mais disposição para atividades
          </p>
        </div>

        {/* Card 5 - 4ª semana */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 mb-1">70%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-green-500 rounded-b-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">12 horas:</span> 70% das dores eliminadas e muito mais mobilidade
          </p>
        </div>

        {/* Card 6 - 5ª semana */}
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full mb-1">100%</span>
          <div className="relative h-16 w-6 rounded-full bg-gray-200 overflow-hidden mb-3">
            <div className="absolute bottom-0 left-0 right-0 h-full bg-green-500 rounded-full" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-foreground">24 horas:</span> Corpo sem dores de forma natural e livre do efeito rebote
          </p>
        </div>
      </motion.div>

      {/* Cost Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="space-y-4 pt-6"
      >
        {/* Headline */}
        <h3 className="text-xl font-bold text-foreground text-center leading-tight">
          Você já parou pra pensar o quanto já gastou tentando resolver as dores?
        </h3>

        {/* Cost List */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <span className="mr-2">💊</span>
            Consultas com Ortopedista: <span className="line-through text-gray-400">300,00</span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="mr-2">💉</span>
            Infiltrações: <span className="line-through text-gray-400">450,00</span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="mr-2">💊</span>
            Remédios anti-inflamatórios: <span className="line-through text-gray-400">120,00</span>
          </p>
          <p className="text-sm text-gray-700">
            <span className="mr-2">🏥</span>
            Fisioterapia: <span className="line-through text-gray-400">280,00</span>
          </p>
        </div>

        {/* Highlighted Price */}
        <div className="bg-yellow-100 border-l-4 border-yellow-400 px-4 py-2 rounded-r-lg">
          <p className="text-sm font-bold text-foreground">
            Elixir da Cura Natural + Bônus da Dra Stefanny R$27
          </p>
        </div>

        {/* Value Text */}
        <p className="text-sm text-gray-600 leading-relaxed">
          Pelo valor de uma pizza, você vai investir em um método personalizado, validado e receber todos os bônus que a Dra liberou.
        </p>

        {/* Guarantee Image */}
        <div className="overflow-hidden rounded-xl">
          <Image
            src="/g1.png"
            alt="Garantia"
            width={428}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Available Spots */}
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <p className="text-sm text-gray-700">
            Vagas disponíveis:<span className="font-bold text-red-600 ml-1">12</span>
          </p>
        </div>

        {/* Pricing Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Green Header */}
          <div className="px-4 py-2 text-center" style={{ backgroundColor: "#05aa27" }}>
            <p className="text-sm font-bold text-white tracking-wide">PROMOÇÃO VÁLIDO SOMENTE HOJE</p>
          </div>

          {/* Price Content */}
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-lg font-bold text-foreground">Elixir da Cura + Bônus</p>
            <div className="text-right">
              <p className="text-xs text-gray-500">97%off</p>
              <p className="text-2xl font-bold" style={{ color: "#05aa27" }}>R$ 27,00</p>
              <p className="text-xs text-gray-500">à vista</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://zuckpay.com.br/checkout/elixir-da-cura-natural"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl py-4 text-base font-bold text-white text-center shadow-md transition-all active:scale-[0.98] animate-pulse-forward"
          style={{ backgroundColor: "#05aa27" }}
        >
          Quero acabar com as dores
        </a>
      </motion.div>

      {/* Guarantee Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="space-y-4 pt-6"
      >
        {/* Guarantee Badge */}
        <div className="flex justify-center">
          <Image
            src="/images/selo-garantia-30dias.png"
            alt="Garantia de 30 dias"
            width={180}
            height={180}
            className="h-44 w-44 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground text-center">
          Garantia de reembolso
        </h3>

        {/* Stars */}
        <div className="flex justify-center gap-1" style={{ fontSize: "20px", fontWeight: "500" }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">&#9733;</span>
          ))}
        </div>

        {/* Guarantee Text */}
        <div className="space-y-3 text-sm leading-relaxed">
          <p style={{ color: "#000000", fontWeight: "500" }}>
            O código do consumidor te garante 7 dias para pedir o reembolso.
          </p>
          <p style={{ color: "#000000", fontWeight: "500" }}>
            Mas nesse protocolo você vai ter <span className="font-bold">30 dias</span> para testar e se não tiver nenhum resultado, você recebe todo o seu dinheiro de volta e ainda continua com os bônus.
          </p>
          <p style={{ color: "#179a37", fontWeight: "500", textAlign: "center" }}>
            Basta nos enviar uma mensagem no whatsapp e o valor será devolvido para você.
          </p>
        </div>
      </motion.div>

      {/* Urgency Section with Doctor Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="space-y-0 pt-6"
      >
        {/* Doctor Image */}
        <div className="overflow-hidden rounded-t-xl">
          <Image
            src="/images/dramota.png"
            alt="Dra. Stefanny Mota - Ortopedista e Especialista em Dores Musculares"
            width={428}
            height={428}
            className="w-full h-auto"
          />
        </div>

        {/* Urgency Box */}
        <div className="bg-rose-50 rounded-b-xl px-4 py-5 text-center border border-t-0 border-rose-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            Por conta do alto volume de pessoas interessadas nesse Elixir da Cura, a sua vaga está disponível por
          </p>
          <p className="text-rose-500 text-xl font-bold my-2">
            {formatCountdown(countdown)}
          </p>
          <p className="text-gray-700 text-sm">
            após isso será liberada para outra pessoa.
          </p>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-4 pt-6"
      >
        <h3 className="text-xl font-bold text-foreground text-center">
          Depoimentos
        </h3>

        {/* Testimonial Card 1 */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">&#9733;</span>
            ))}
          </div>
          <p className="font-bold text-foreground text-sm">Maria Helena</p>
          <p className="text-gray-400 text-xs mb-2">@mariahelena.silva</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Dra Stefanny é uma graça, tirou todas as minhas dúvidas na consulta e logo nas primeiras semanas eu já comecei ver resultado nas dores
          </p>
        </div>

        {/* Testimonial Card 2 */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">&#9733;</span>
            ))}
          </div>
          <p className="font-bold text-foreground text-sm">Josefa Oliveira</p>
          <p className="text-gray-400 text-xs mb-2">@josefaoliveira</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Nunca vi nada igual, minhas dores no joelho eram muito fortes. Estou seguindo faz 3 semanas e já diminuiu muito
          </p>
        </div>

        {/* Testimonial Card 3 */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">&#9733;</span>
            ))}
          </div>
          <p className="font-bold text-foreground text-sm">Francisca Santos</p>
          <p className="text-gray-400 text-xs mb-2">@francisca.santos88</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Eu até achei que era pegadinha, mas na consulta eu vi que ela era ótima e o protocolo realmente funciona
          </p>
        </div>

        {/* WhatsApp-style Audio Player */}
        <div className="rounded-2xl bg-gray-100 p-3">
          <div className="flex items-center gap-3">
            {/* Play Button */}
            <button
              onClick={togglePlayPause}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>

            {/* Waveform and Progress */}
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium text-gray-600">Dra. Stefanny</p>

              {/* Waveform */}
              <div className="relative h-8 flex items-center gap-[2px]">
                {[...Array(35)].map((_, i) => {
                  const heights = [12, 20, 16, 28, 14, 24, 18, 30, 12, 22, 16, 26, 14, 20, 18, 28, 12, 24, 16, 30, 14, 22, 18, 26, 12, 20, 16, 28, 14, 24, 18, 30, 12, 22, 16]
                  const barProgress = (i / 35) * 100
                  const isActive = barProgress <= progress
                  return (
                    <div
                      key={i}
                      className={`w-[3px] rounded-full transition-colors duration-150 ${isActive ? "bg-teal-500" : "bg-gray-300"
                        }`}
                      style={{ height: `${heights[i]}px` }}
                    />
                  )
                })}

                {/* Progress indicator dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-teal-600 shadow-md transition-all duration-150"
                  style={{ left: `${Math.min(progress, 97)}%` }}
                />
              </div>

              {/* Time */}
              <p className="text-xs text-gray-500">{formatTime(currentTime)}</p>
            </div>

            {/* Mic Icon */}
            <div className="flex-shrink-0">
              <Mic className="h-5 w-5 text-teal-500" />
            </div>

            {/* Doctor Photo */}
            <div className="flex-shrink-0">
              <Image
                src="/images/doctor-profile.png"
                alt="Dra. Stefanny"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-200"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://zuckpay.com.br/checkout/elixir-da-cura-natural"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full py-4 text-base font-bold text-white text-center shadow-md transition-all active:scale-[0.98] animate-pulse-forward"
          style={{ backgroundColor: "#05aa27" }}
        >
          Quero acabar com as minhas dores
        </a>

        {/* Before/After Image */}
        <div className="pt-4">
          <Image
            src="/images/antes-depois-dores.png"
            alt="Antes e depois - Livre das dores"
            width={428}
            height={428}
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* FAQ Section */}
        <div className="pt-6 space-y-0">
          <h3 className="text-xl font-bold text-foreground text-center mb-4">
            Perguntas Frequentes
          </h3>

          {/* FAQ Items */}
          <div className="divide-y divide-gray-200">
            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                Tenho que tomar o Elixir todos os dias?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Sim, para melhores resultados é recomendado seguir o manual de uso diariamente. São apenas alguns minutos por dia.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                A consulta com a Dra Stefanny é online?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Sim, todo o acompanhamento é feito de forma online, você pode acessar de qualquer lugar.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                Os exercícios são fáceis de fazer?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Sim, os exercícios são simples e adaptados para todas as idades e níveis de condicionamento físico.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                Em quanto tempo vejo resultados?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                A maioria das pessoas começa a sentir alívio nas primeiras semanas, mas resultados significativos aparecem em 28 dias.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                Tem efeito colateral?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Não, o protocolo é 100% natural e não possui efeitos colaterais.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                Corro risco de efeito rebote?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Não, o protocolo trata a causa raiz das dores, não apenas os sintomas, eliminando o risco de efeito rebote.
              </p>
            </details>

            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
                O site é Seguro?
                <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Sim, utilizamos criptografia SSL e plataforma de pagamento segura para proteger seus dados.
              </p>
            </details>
          </div>
        </div>

        {/* Final CTA Button */}
        <a
          href="https://zuckpay.com.br/checkout/elixir-da-cura-natural"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full py-4 text-base font-bold text-white text-center shadow-md transition-all active:scale-[0.98] animate-pulse-forward"
          style={{ backgroundColor: "#05aa27" }}
        >
          Quero acabar com as minhas dores
        </a>
      </motion.div>
    </motion.div>
  )
}
