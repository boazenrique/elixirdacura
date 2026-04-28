export function LearnSection() {
  const items = [
    {
      image: "/img1.webp",
      description: (
        <>
          Substitua a Losartana por <span className="text-rose-500">fórmulas naturais</span> com{" "}
          <span className="text-rose-500">alho, hibisco</span> e{" "}
          <span className="text-rose-500">ervas vasodilatadoras</span> — sem colaterais.
        </>
      ),
    },
    {
      image: "/img2.webp",
      description: (
        <>
          Regular o colesterol com <span className="text-rose-500">chia, linhaça</span> e{" "}
          <span className="text-rose-500">folhas terapêuticas</span> é possível — e está aqui.
        </>
      ),
    },
    {
      image: "/img3.webp",
      description: (
        <>
          <span className="text-rose-500">Dores não são normais.</span>{" "}
          <span className="text-rose-500">Cúrcuma, gengibre</span> e{" "}
          <span className="text-rose-500">garra-do-diabo</span> aliviam e tratam a causa.
        </>
      ),
    },
    {
      image: "/img4.webp",
      description: (
        <>
          <span className="text-rose-500">Pata-de-vaca, canela</span> e{" "}
          <span className="text-rose-500">folha de amora</span> são usadas há séculos para
          equilibrar a glicose. E funcionam.
        </>
      ),
    },
    {
      image: "/img5.webp",
      description: (
        <>
          Chega de Rivotril e Clonazepam. Dormir bem usando{" "}
          <span className="text-rose-500">mulungu, lavanda</span> e{" "}
          <span className="text-rose-500">valeriana</span> é possível — e libertador.
        </>
      ),
    },
  ];

  return (
    <section id="learn" className="bg-stone-200 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 text-center mb-12 italic">
          O QUE VOCÊ VAI APRENDER NO GUIA MUNDO NATURAL
        </h2>

        {/* Lista de itens */}
        <div className="flex flex-col gap-12">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Imagem */}
              <div className="w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={`Passo ${index + 1}`}
                  className="w-full h-auto rounded-2xl shadow-lg border-2 border-white"
                />
              </div>

              {/* Texto descritivo */}
              <div className="w-full md:w-1/2">
                <p className="text-lg md:text-xl text-stone-800 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

