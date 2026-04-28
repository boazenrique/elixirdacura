"use client";

import { Check, X, X as CloseIcon } from "lucide-react";
import { useState } from "react";

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const basicFeatures = [
    { text: "30 receitas medicinais naturais", included: true },
    { text: "Acesso imediato por e-mail", included: true },
    { text: "Apenas 3 meses de acesso", included: true },
    { text: "Sem acesso aos bônus", included: false },
  ];

  const completeFeatures = [
    { text: "+970 RECEITAS MEDICINAIS NATURAIS", included: true },
    { text: "Acesso imediato por e-mail", included: true },
    { text: "Acesso vitalício", included: true },
    { text: "Atualizações gratuitas", included: true },
    { text: "BÔNUS 1 – Introdução às Ervas Medicinais", included: true },
    { text: "BÔNUS 2 – Calma Instantânea – Soluções Naturais para Ansiedade", included: true },
    { text: "BÔNUS 3 – Alívio Instantâneo – Como Vencer a Coceira com Ervas", included: true },
    { text: "BÔNUS 4 – Alívio Natural – Ervas Naturais para Dor de Cabeça", included: true },
    { text: "BÔNUS 5 – Reinicie Seu Corpo: Planos Detox para Perda de Peso", included: true },
    { text: "BÔNUS 6 – Óleos Essenciais e Aromaterapia para Dores Crônicas", included: true },
    { text: "BÔNUS 7 – Transforme Seu Corpo – Suplementos Naturais em Casa", included: true },
    { text: "BÔNUS 8 – Desafio 7 Dias Para Aumentar a Imunidade", included: true },
    { text: "BÔNUS 9 – Cuidando de Você: Receitas para Sintomas da Menopausa", included: true },
  ];

  return (
    <section id="pricing" className="py-16 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 text-center mb-12 italic">
          Veja TUDO o que você vai receber!
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Plano Básico */}
          <div className="border-2 border-emerald-600 rounded-2xl bg-gray-100 p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-center text-black mb-4">
              PLANO BÁSICO
            </h3>
            
            <div className="text-center mb-8">
              <span className="text-5xl font-black text-emerald-700">R$1,99</span>
            </div>

            <div className="space-y-3 mb-8 w-full">
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span
                    className={
                      feature.included ? "text-black font-medium" : "text-gray-400 line-through"
                    }
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Este botão abre o modal de upsell conforme solicitado anteriormente */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full text-xl shadow-lg transition-all transform hover:scale-105"
            >
              QUERO O PLANO BÁSICO
            </button>
          </div>

          {/* Plano Premium */}
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-sm font-bold px-4 py-1 rounded-full whitespace-nowrap z-10">
              ✨ MAIS POPULAR ✨
            </div>
            <div className="border-2 border-emerald-600 rounded-2xl bg-gray-100 p-8 pt-10 flex flex-col items-center shadow-xl">
              <h3 className="text-2xl font-bold text-center text-black mb-6 uppercase">
                PLANO PREMIUM
              </h3>

              <div className="mb-6 w-full">
                <img
                  src="/Premium.webp"
                  alt="Plano Premium"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              <div className="text-center mb-8 space-y-1">
                <p className="text-lg font-bold text-black uppercase">
                  DE: <span className="text-red-600 line-through">R$147,90</span>
                </p>
                <p className="text-lg font-bold text-black uppercase">
                  POR APENAS
                </p>
                <p className="text-4xl font-black text-emerald-700">
                  R$19,90
                </p>
              </div>

              <div className="space-y-2 mb-8 w-full">
                <h4 className="text-lg font-bold text-black mb-4">Veja TUDO o que você vai receber!</h4>
                {completeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-xs font-bold text-gray-800 uppercase leading-tight">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href="https://zuckpay.com.br/checkout/ervas-medicinais" 
                className="w-full"
              >
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full text-xl shadow-lg transition-all transform hover:scale-105">
                  QUERO O PLANO PREMIUM
                </button>
              </a>
              
              <p className="mt-4 text-xs font-bold text-gray-500 text-center uppercase tracking-tighter">
                Atenção: Essa condição fica disponível por tempo limitado...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Popup de Upsell */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto py-10">
          <div className="relative w-full max-w-lg bg-gray-100 rounded-3xl p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 my-auto">
            {/* Botão Fechar */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            {/* Tag Especial */}
            <div className="bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full mb-6 animate-pulse">
              ⚠️ ESPERE! NÃO VÁ EMBORA AINDA!
            </div>

            <h3 className="text-2xl font-bold text-center text-black mb-6 uppercase">
              OFERTA ESPECIAL DE ACESSO COMPLETO
            </h3>

            <div className="mb-6 w-full">
              <img
                src="/Premium.webp"
                alt="Plano Premium Especial"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <div className="text-center mb-8 space-y-1">
              <p className="text-lg font-bold text-black uppercase">
                DE: <span className="text-red-600 line-through">R$147,90</span>
              </p>
              <p className="text-lg font-bold text-black uppercase">
                POR APENAS
              </p>
              <p className="text-5xl font-black text-emerald-700">
                R$9,90
              </p>
              <p className="text-sm text-gray-500 font-bold uppercase mt-2">
                Essa é sua única chance!
              </p>
            </div>

            <div className="space-y-2 mb-8 w-full max-h-48 overflow-y-auto px-2">
              <h4 className="text-lg font-bold text-black mb-4 sticky top-0 bg-gray-100">Você vai receber:</h4>
              {completeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-xs font-bold text-gray-800 uppercase leading-tight">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <a 
              href="https://zuckpay.com.br/checkout/super-oferta"
              className="w-full"
            >
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-6 rounded-full text-xl shadow-lg transition-all transform hover:scale-105">
                SIM! QUERO O ACESSO COMPLETO POR R$9,90
              </button>
            </a>
            
            <a 
              href="https://zuckpay.com.br/checkout/plano-basico"
              className="w-full text-center block mt-4"
            >
              <button className="text-gray-500 font-bold underline text-sm hover:text-gray-700 transition-colors bg-transparent border-none">
                Não, quero apenas o básico e perder os bônus
              </button>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
