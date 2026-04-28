"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#1d2b1d] py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo.webp"
            alt="Logo"
            className="h-28 md:h-36 w-auto object-contain mx-auto"
          />
        </div>

        {/* Headline Principal */}
        <h1 className="flex flex-col items-center gap-2 mb-10 w-full max-w-4xl text-white uppercase italic text-center px-2">
          <span className="text-[11vw] xs:text-4xl md:text-7xl font-black leading-none whitespace-nowrap">
            A CURA EXISTE!
          </span>
          <span className="text-[5vw] xs:text-xl md:text-4xl font-bold leading-tight whitespace-nowrap">
            E ELA NÃO ESTÁ NA FARMÁCIA!
          </span>
        </h1>


        {/* Imagem do Produto */}
        <div className="w-full max-w-2xl mb-10">
          <img
            src="/011capa.png"
            alt="Elixir da Cura"
            className="w-full h-auto object-contain rounded-2xl shadow-lg"
          />
        </div>

        {/* Texto de Oferta */}
        <div className="mb-8 max-w-2xl">
          <p className="text-xl md:text-2xl font-bold italic text-white mb-4">
            Você não precisa gastar todo seu dinheiro em medicamentos caros....
          </p>
          <p className="text-lg md:text-xl text-white">
            <span className="font-bold">Descubra +de 975 receitas de Elixir Medicinais</span> para combater sintomas, tratar a causa das doenças e recuperar sua saúde{" "}
            <span className="font-bold">sem depender de remédios e da indústria</span> que lucra com sua dor.
          </p>
        </div>

        {/* Botão CTA */}
        <a href="#learn" className="w-full flex justify-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg md:text-xl font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            QUERO AS 975 RECEITAS AGORA
          </Button>
        </a>
      </div>
    </section>
  );
}
