"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const bonusItems = [
  { id: 1, title: "BÔNUS 1", subtitle: "Introdução às Ervas Medicinais", image: "/IMG_6315.webp" },
  { id: 2, title: "BÔNUS 2", subtitle: "Calma Instantânea – Soluções Naturais para Ansiedade", image: "/IMG_6316.webp" },
  { id: 3, title: "BÔNUS 3", subtitle: "Alívio Instantâneo – Como Vencer a Coceira com Ervas", image: "/IMG_6317.webp" },
  { id: 4, title: "BÔNUS 4", subtitle: "Alívio Natural – Ervas para Dizer Adeus à Dor de Cabeça", image: "/IMG_6318.webp" },
  { id: 5, title: "BÔNUS 5", subtitle: "Reinicie Seu Corpo: Planos Detox para Perda de Peso", image: "/IMG_6319.webp" },
  { id: 6, title: "BÔNUS 6", subtitle: "Óleos Essenciais e Aromaterapia para Dores Crônicas", image: "/IMG_6320.webp" },
  { id: 7, title: "BÔNUS 7", subtitle: "Transforme Seu Corpo – Suplementos Naturais em Casa", image: "/IMG_6321.webp" },
  { id: 8, title: "BÔNUS 8", subtitle: "Desafio 7 Dias Para Aumentar a Imunidade", image: "/IMG_6322.webp" },
];

export function BonusSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = 3;
  const maxIndex = bonusItems.length - visibleItems;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 px-4 bg-stone-200">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-bold italic text-emerald-900 text-center mb-10 text-balance">
          Além das 975 receitas, você ainda leva 8 BÔNUS EXCLUSIVOS:
        </h2>

        {/* Carrossel */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Seta Esquerda */}
          <button
            onClick={prevSlide}
            className="text-emerald-700 hover:text-emerald-900 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={3} />
          </button>

          {/* Cards */}
          <div className="flex gap-4 overflow-hidden">
            {bonusItems.slice(currentIndex, currentIndex + visibleItems).map((item) => (
              <div
                key={item.id}
                className="w-48 md:w-64 bg-emerald-900 rounded-xl flex flex-col overflow-hidden border border-emerald-700 flex-shrink-0 shadow-lg"
              >
                <div className="h-64 md:h-80 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Seta Direita */}
          <button
            onClick={nextSlide}
            className="text-emerald-700 hover:text-emerald-900 transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={3} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-emerald-700" : "bg-stone-400"
                }`}
            />
          ))}
        </div>

        {/* Texto de Oferta */}
        <p className="text-center text-lg md:text-xl text-orange-600 font-semibold mt-10">
          Tudo incluso na sua compra. Sem custo adicional.{" "}
          <span className="underline">Por tempo limitado.</span>
        </p>
      </div>
    </section>
  );
}

