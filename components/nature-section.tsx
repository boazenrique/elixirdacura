import { Leaf, Ban, Hand, Home, Mail } from "lucide-react"

export function NatureSection() {
  const benefits = [
    {
      icon: Leaf,
      text: "Receitas 100% naturais",
    },
    {
      icon: Ban,
      text: "Sem colaterais, sem vício químico",
    },
    {
      icon: Hand,
      text: "Atua na raiz dos problemas",
    },
    {
      icon: Home,
      text: "Pode ser feito em casa, com o que você já tem",
    },
    {
      icon: Mail,
      text: "Entrega imediata por e-mail",
    },
  ]

  return (
    <section className="w-full bg-stone-100 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Citação Principal */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1d2b1d] mb-8 leading-tight">
          {'"O QUE SÃO OS SEGREDOS NATURAIS?"'}
        </h2>

        {/* Parágrafo Explicativo */}
        <p className="text-[#1d2b1d]/90 text-base md:text-lg mb-12 leading-relaxed">
          O Segredos Naturais é um guia digital com mais de 975 receitas ancestrais e modernas, todas feitas com ervas, raízes e ingredientes naturais que você encontra em casa.
        </p>

        {/* Galeria de Imagens Pequenas */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
          {[2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="aspect-square overflow-hidden">
              <img
                src={`/${num}.png`}
                alt={`Imagem ${num}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lista de Benefícios */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <benefit.icon className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <span className="text-[#1d2b1d] text-lg md:text-xl font-medium">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>

        {/* Texto Final Destacado */}
        <p className="text-emerald-700 text-xl md:text-2xl font-bold">
          Chega de pagar preços absurdos em remédio!
        </p>
      </div>
    </section>
  );
}
