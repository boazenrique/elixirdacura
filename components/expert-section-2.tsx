"use client";

export function ExpertSection2() {
  return (
    <section className="bg-[#1d2b1d] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-bold italic text-white mb-8">
          SOBRE DRA. STEFANNY MOTA
        </h2>

        {/* Imagem da Expert */}
        <div className="w-full max-w-md mx-auto mb-8">
          <img
            src="/dra-capa.png"
            alt="Dra. Yara Medinova"
            className="w-full h-auto rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Textos descritivos */}
        <div className="space-y-6 text-left max-w-3xl mx-auto">
          <p className="text-white leading-relaxed">
            Stefanny Mota é{" "}
            <span className="text-white font-semibold underline decoration-emerald-500">
              farmacêutica formada pela Universidade de Cambridge
            </span>
            , com mais de 15 anos de experiência na indústria de medicamentos.
          </p>

          <p className="text-white leading-relaxed">
            Durante sua trajetória, atuou em grandes laboratórios internacionais, onde teve acesso direto às estratégias de formulação, testes clínicos e comercialização de remédios. Foi nesse ambiente que percebeu uma realidade incômoda:{" "}
            <span className="text-white font-semibold underline decoration-emerald-500">
              muitos tratamentos naturais com potencial real eram constantemente ignorados ou descartados
            </span>{" "}
            por não representarem retorno financeiro para as empresas.
          </p>

          <p className="text-white leading-relaxed">
            Hoje, Yara lidera o desenvolvimento de{" "}
            <span className="text-white font-semibold underline decoration-emerald-500">
              soluções naturais que têm ajudado milhares de pessoas a recuperarem sua qualidade de vida
            </span>{" "}
            — de forma segura, acessível e com respaldo técnico.
          </p>
        </div>
      </div>
    </section>
  );
}
