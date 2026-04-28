"use client";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-emerald-900 mb-12 italic">
          EU TOMEI CORAGEM E MUDEI MINHA SAÚDE…
        </h2>
        
        <div className="w-full">
          <img
            src="/testemunhas.webp"
            alt="Depoimentos de Alunos"
            className="w-full h-auto rounded-2xl shadow-xl border-4 border-stone-100"
          />
        </div>

        <p className="mt-8 text-xl md:text-2xl font-bold text-emerald-700 text-center italic">
          + de 10.000 pessoas transformadas com o guia
        </p>
      </div>
    </section>
  );
}
