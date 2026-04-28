"use client";

import { Shield, Clock, RefreshCcw, Award } from "lucide-react";

export function GuaranteeSection() {
  const seals = [
    { icon: Shield, title: "COMPRA 100%", subtitle: "SEGURA" },
    { icon: Clock, title: "GARANTIA DE", subtitle: "7 DIAS" },
    { icon: RefreshCcw, title: "REEMBOLSO", subtitle: "GARANTIDO" },
    { icon: Award, title: "QUALIDADE", subtitle: "GARANTIDA" },
  ];

  return (
    <section className="w-full">
      {/* Parte Superior - Garantia */}
      <div className="bg-stone-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-800 font-medium mb-2">
            Você tem 7 dias para testar.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-1">
            Se dentro de uma semana você sentir que esse guia não valeu cada centavo, é só pedir o reembolso.
          </p>
          <p className="text-base md:text-lg text-gray-800 font-semibold mb-10">
            Sem complicação. Sem risco.
          </p>

          {/* Selos de Garantia */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {seals.map((seal, index) => (
              <div
                key={index}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 flex flex-col items-center justify-center shadow-lg border-4 border-amber-300"
              >
                <seal.icon className="w-6 h-6 md:w-7 md:h-7 text-amber-900 mb-1" />
                <span className="text-[10px] md:text-xs font-bold text-amber-900 leading-tight text-center">
                  {seal.title}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-amber-900 leading-tight text-center">
                  {seal.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parte Inferior - CTA Final */}
      <div className="bg-emerald-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            VOCÊ NÃO PRECISA DE MAIS UM REMÉDIO.
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-8">
            VOCÊ PRECISA DE UM NOVO COMEÇO.
          </h2>

          <p className="text-white text-lg mb-1">Recupere sua autonomia.</p>
          <p className="text-white text-lg mb-1">Diga não à dependência.</p>
          <p className="text-white text-lg mb-8">
            E descubra como cuidar da sua saúde com sabedoria natural e verdadeira.
          </p>

          <a href="#pricing" className="inline-block">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg md:text-xl py-4 px-8 md:px-12 rounded-lg transition-colors duration-300 shadow-lg">
              SIM! QUERO RECEBER O GUIA COMPLETO AGORA
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
