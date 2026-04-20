"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"
import Image from "next/image"

interface AssessmentStepProps {
  answers: Record<number, string>
  setAnswers: (answers: Record<number, string>) => void
  addProgress: (amount: number) => void
  onComplete: () => void
}

const testimonials = [
  { src: "/images/testimonial-09.png", alt: "Depoimento 1" },
  { src: "/images/testimonial-10.png", alt: "Depoimento 2" },
  { src: "/images/testimonial-11.png", alt: "Depoimento 3" },
  { src: "/images/testimonial-12.png", alt: "Depoimento 4" },
]

type Question = {
  id: number
  reward: number
  question?: string
  subtitle?: string
  context?: string
  options?: string[]
  isGridLayout?: boolean
  gridImages?: string[]
  image?: string
  isAudioStep?: boolean
  audioSrc?: string
  isInfoStep?: boolean
  headline?: string
  headlineHighlight?: string
  headlineEnd?: string
  sectionTitle?: string
  infoImage?: string
  checklist?: string[]
  footerText?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual região do seu corpo mais dói hoje?",
    subtitle: "Selecione a área que você sente mais dor ou desconforto.",
    context: "Escolha uma opção abaixo:",
    options: ["Joelho", "Coluna", "Quadril", "Corpo todo (Fibromialgia)", "Mãos e Dedos", "Pés"],
    reward: 3,
    isGridLayout: true,
    gridImages: [
      "/images/body-joelho.png",
      "/images/body-coluna.png",
      "/images/body-quadril.png",
      "/images/body-corpo-todo.png",
      "/images/body-dedos.png",
      "/images/body-pes.png",
    ],
  },
  {
    id: 2,
    question: "Há quanto tempo você convive com essa dor?",
    subtitle: "Isso me ajuda a entender o nível da sua dor!",
    context: "Responda com sinceridade!",
    options: ["Menos de 3 meses", "3 a 12 meses", "Mais de 1 ano", "Anos (já virou rotina 😔)"],
    reward: 3,
  },
  {
    id: 3,
    question: "Quando essa dor começou a piorar?",
    subtitle: "Entender a origem ajuda no diagnóstico.",
    context: "Selecione a opção mais próxima:",
    options: ["Após esforço físico", "Com o passar da idade", "Após lesão/acidente", "Do nada (só piora 😡)"],
    reward: 3,
  },
  {
    id: 4,
    question: "Mais de 11.000 pessoas já usaram o “Elixir da Cura Natural” e relataram uma transformação que surpreendeu médicos e especialistas.",
    subtitle: "Ouça com atenção o áudio da Dra. Stefanny, que explica o motivo dessa bebida funcionar tanto:",
    isAudioStep: true,
    audioSrc: "/001.WAV",
    reward: 3,
  },
  {
    id: 5,
    question: "Qual a intensidade da sua dor hoje?",
    subtitle: "Isso nos ajuda a entender como a dor afeta seu dia a dia.",
    context: "Selecione o nível que mais se aproxima:",
    image: "/images/dor-intensidade.png",
    options: ["Leve (incomoda às vezes)", "Moderada (atrapalha o dia)", "Forte (limita movimentos)", "Insuportável (não aguento mais 😡)"],
    reward: 3,
  },
  {
    id: 6,
    question: "Essa dor impede você de viver tranquilamente e fazer coisas simples?",
    subtitle: "Atividades do dia a dia como caminhar, subir escadas, segurar seu neto no colo etc.",
    context: "Selecione a opção que mais se encaixa:",
    options: ["Sim, me impede bastante", "Às vezes", "Não, mas me incomoda", "Sim, estou limitado(a)"],
    reward: 3,
  },
  {
    id: 7,
    question: "Você já tentou algum tratamento?",
    subtitle: "Saber o que você já tentou ajuda no diagnóstico.",
    context: "Selecione a opção:",
    image: "/images/remedios.png",
    options: ["Remédios", "Fisioterapia", "Pomadas", "Nada funcionou 😡"],
    reward: 3,
  },
  {
    id: 8,
    isInfoStep: true,
    headline: "Remédios, pomadas e tratamentos comuns servem só para aliviar a sua dor… mas a inflamação interna continua atacando suas articulações todos os dias.",
    sectionTitle: "ENTENDA COMO O ELIXIR AGE:",
    infoImage: "/images/processo-artrose.png",
    checklist: [
      "Reduz a inflamação crônica que desgasta suas articulações diariamente",
      "Estimula a recuperação natural das estruturas articulares",
      "Força seu corpo a voltar a responder como deveria",
    ],
    footerText: "Enquanto a maioria dos tratamentos comuns só aliviam temporariamente sua dor, o Elixir age na raiz do problema trazendo a cura imediata da dor.",
    reward: 3,
  },
  {
    id: 9,
    question: "Mesmo usando medicamentos… a dor sempre volta depois?",
    subtitle: "Saber isso ajuda a identificar a causa das dores.",
    context: "Selecione a opção:",
    options: ["Sim, sempre volta", "Às vezes melhora, mas volta", "Não resolve quase nada 😡"],
    reward: 3,
  },
  {
    id: 10,
    question: "Você teria 5 minutos por dia para fazer o Elixir da cura natural na sua casa e nunca mais sentir dores no corpo?",
    subtitle: "Sua disposição é fundamental para o sucesso do protocolo.",
    context: "Selecione a opção:",
    image: "/images/Elixir.png",
    options: ["Sim, com certeza", "Acho que sim", "Não tenho tempo"],
    reward: 3,
  },
]

export function AssessmentStep({ answers, setAnswers, addProgress, onComplete }: AssessmentStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [showDelayedButton, setShowDelayedButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const loadingSteps = [
    "Analisando suas respostas...",
    "Identificando a causa das suas dores...",
    "Gerando seu diagnóstico...",
    "Resultado quase pronto...",
  ]

  // Auto-advance carousel for Step 4
  useEffect(() => {
    if (questions[currentQuestion]?.id === 4) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [currentQuestion])

  // Loading screen effect - 7 seconds total (1.75s per step)
  useEffect(() => {
    if (isLoading) {
      const stepDuration = 1750 // 7000ms / 4 steps
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, stepDuration)

      const completeTimer = setTimeout(() => {
        onComplete()
      }, 7000)

      return () => {
        clearInterval(interval)
        clearTimeout(completeTimer)
      }
    }
  }, [isLoading, onComplete])

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  // No delay for question id: 4
  useEffect(() => {
    if (question.id === 4) {
      setShowDelayedButton(true)
    } else {
      setShowDelayedButton(true)
    }
  }, [question.id])

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch {
          // Audio failed to play, possibly file not loaded yet
          setIsPlaying(false)
        }
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        setAudioCurrentTime(audio.currentTime)
        setAudioProgress((audio.currentTime / audio.duration) * 100)
      }
      const handleLoadedMetadata = () => {
        setAudioDuration(audio.duration)
      }
      const handleEnded = () => {
        setIsPlaying(false)
        setAudioProgress(0)
        setAudioCurrentTime(0)
      }
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)
      return () => {
        audio.removeEventListener("timeupdate", updateProgress)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [currentQuestion])

  const handleContinueFromAudio = () => {
    addProgress(question.reward)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0d9488", "#f59e0b", "#10b981"],
      })
      setTimeout(() => setIsLoading(true), 400)
    }
  }

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setAnswers({ ...answers, [question.id]: option })

    setTimeout(() => {
      addProgress(question.reward)
      setSelectedOption(null)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#0d9488", "#f59e0b", "#10b981"],
        })
        setTimeout(() => setIsLoading(true), 400)
      }
    }, 300)
  }

  // Loading Screen
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4"
      >
        <div className="w-full max-w-sm space-y-6">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: index <= loadingStep ? 1 : 0.3,
                y: 0
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="space-y-2"
            >
              <p className={cn(
                "text-sm font-medium transition-colors duration-300",
                index <= loadingStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step}
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
                  initial={{ width: "0%" }}
                  animate={{
                    width: index < loadingStep ? "100%" : index === loadingStep ? "100%" : "0%"
                  }}
                  transition={{
                    duration: index === loadingStep ? 1.75 : 0.3,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="space-y-6"
        >
          {/* Info Step Layout */}
          {question.isInfoStep ? (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  {question.headline}
                  {question.headlineHighlight && (
                    <>
                      {" "}
                      <span style={{ color: "#00a923" }}>{question.headlineHighlight}</span>{" "}
                    </>
                  )}
                  {question.headlineEnd}
                </h2>
                {question.subtitle && (
                  <p className="text-sm italic text-muted-foreground">
                    {question.subtitle}
                  </p>
                )}
              </div>

              {question.sectionTitle && (
                <p className="text-center font-bold" style={{ color: "#ff0000" }}>
                  {question.sectionTitle}
                </p>
              )}

              {/* Process Image */}
              <div className="flex justify-center">
                <img
                  src={question.infoImage}
                  alt="Como funciona o processo"
                  className="w-full max-w-sm mx-auto"
                />
              </div>

              {/* Checklist */}
              {question.checklist && (
                <div className="space-y-3">
                  {question.checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 mt-0.5">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </div>
                      <p className="text-sm font-medium text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Text */}
              {question.footerText && (
                <p className="text-center text-sm font-medium text-foreground">
                  {question.footerText}
                </p>
              )}

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleContinueFromAudio}
                className="w-full rounded-xl bg-teal-600 p-4 text-center text-base font-bold text-white shadow-lg hover:bg-teal-700 transition-colors"
              >
                Continuar o diagnóstico
              </motion.button>
            </div>
          ) : question.isAudioStep ? (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  {question.question}
                </h2>

                {/* Carousel for Step 4 */}
                {question.id === 4 && (
                  <div className="space-y-4 py-4">
                    <div className="relative overflow-hidden rounded-xl bg-muted/20">
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
                              className="w-full h-auto rounded-xl shadow-sm"
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
                          className={`h-1.5 w-1.5 rounded-full transition-all ${index === currentSlide ? "w-4 bg-teal-500" : "bg-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-base font-bold text-red-600">
                  {question.subtitle}
                </p>
              </div>

              {/* WhatsApp-style Audio Player */}
              <div className="bg-[#e8e4df] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleAudio}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5d5d5d] text-white flex-shrink-0 hover:bg-[#4a4a4a] transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </button>

                  {/* Waveform / Progress */}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-[#4a4a4a]">Dra. Stefanny</p>
                    <div className="relative h-6 flex items-center">
                      {/* Waveform Background */}
                      <div className="absolute inset-0 flex items-center gap-[2px]">
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-[#b8b5b2]"
                            style={{
                              height: `${Math.random() * 16 + 4}px`,
                            }}
                          />
                        ))}
                      </div>
                      {/* Progress Overlay */}
                      <div
                        className="absolute inset-y-0 left-0 flex items-center gap-[2px] overflow-hidden"
                        style={{ width: `${audioProgress}%` }}
                      >
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-[#3b82f6]"
                            style={{
                              height: `${Math.random() * 16 + 4}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#7a7a7a]">
                      {formatTime(audioCurrentTime || 0)}
                    </p>
                  </div>

                  {/* Doctor Photo */}
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                    <Image
                      src="/images/doctor-profile.png"
                      alt="Dra. Stefanny"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Hidden Audio Element */}
              <audio ref={audioRef} preload="auto">
                <source src={question.audioSrc} type="audio/wav" />
                <source src={question.audioSrc} type="audio/mpeg" />
              </audio>

              {/* Continue Button - Hidden for 80 seconds on question id: 4 */}
              {showDelayedButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleContinueFromAudio}
                  className="w-full rounded-xl bg-teal-600 p-4 text-center text-base font-bold text-white shadow-lg hover:bg-teal-700 transition-colors"
                >
                  Continuar meu diagnóstico
                </motion.button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{question.question}</h2>
                  <p className="text-sm italic text-muted-foreground">{question.subtitle}</p>
                </div>
                {question.image && (
                  <img
                    src={question.image || "/placeholder.svg"}
                    alt="Ilustracao da pergunta"
                    className="w-full max-w-sm mx-auto rounded-xl"
                  />
                )}
              </div>

              <p className="font-medium text-amber-700">{question.context}</p>
            </>
          )}

          {/* Options */}
          {!question.isAudioStep && (
            question.isGridLayout ? (
              <div className="grid grid-cols-2 gap-3">
                {question.options?.map((option, index) => {
                  const labels = ["A", "B", "C", "D", "E", "F"]
                  return (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => !selectedOption && handleSelect(option)}
                      disabled={!!selectedOption}
                      className={cn(
                        "flex flex-col rounded-xl border-2 bg-card overflow-hidden transition-all duration-300",
                        selectedOption === option
                          ? "border-teal-500 bg-teal-50"
                          : "border-border hover:border-teal-300 hover:bg-muted/50",
                        selectedOption && selectedOption !== option && "opacity-50",
                      )}
                    >
                      <div className="aspect-square w-full bg-muted/30 flex items-center justify-center overflow-hidden">
                        {question.gridImages && question.gridImages[index] ? (
                          <img
                            src={question.gridImages[index]}
                            alt={option}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                            <span className="text-4xl text-teal-400">?</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex items-center gap-2">
                        <span className={cn(
                          "flex h-6 w-6 items-center justify-center rounded text-xs font-bold",
                          selectedOption === option
                            ? "bg-teal-500 text-white"
                            : "bg-teal-600 text-white"
                        )}>
                          {labels[index]}
                        </span>
                        <span className="text-sm font-medium text-foreground">{option}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {question.options?.map((option, index) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !selectedOption && handleSelect(option)}
                    disabled={!!selectedOption}
                    className={cn(
                      "w-full rounded-xl border-2 bg-card p-4 text-left text-base font-medium transition-all duration-300",
                      selectedOption === option
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-border hover:border-teal-300 hover:bg-muted/50",
                      selectedOption && selectedOption !== option && "opacity-50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedOption === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>



      {/* Footer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm italic text-muted-foreground"
      >
        ✓ Resposta registrada. Seu padrão está sendo mapeado.
      </motion.p>
    </motion.div>
  )
}
