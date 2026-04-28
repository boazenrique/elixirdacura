"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O guia é digital ou físico?",
    answer:
      "O guia é 100% digital. Após a confirmação do pagamento, você receberá o acesso imediato por e-mail para baixar todos os materiais em PDF.",
  },
  {
    question: "Quanto tempo tenho para acessar o conteúdo?",
    answer:
      "O acesso é vitalício! Uma vez que você baixe os materiais, eles são seus para sempre. Você pode consultar sempre que precisar.",
  },
  {
    question: "As receitas são seguras?",
    answer:
      "Sim! Todas as receitas foram desenvolvidas com base em conhecimentos ancestrais e validadas por profissionais da área de saúde. São fórmulas naturais, sem efeitos colaterais quando usadas corretamente.",
  },
  {
    question: "Posso usar as receitas junto com meus medicamentos?",
    answer:
      "Recomendamos sempre consultar seu médico antes de iniciar qualquer tratamento complementar, especialmente se você já faz uso de medicamentos contínuos.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer:
      "Se dentro de 7 dias você sentir que o guia não valeu cada centavo, basta enviar um e-mail solicitando o reembolso. Devolvemos 100% do seu dinheiro, sem perguntas e sem burocracia.",
  },
  {
    question: "O pagamento é seguro?",
    answer:
      "Sim! Utilizamos plataformas de pagamento certificadas e criptografadas. Seus dados estão 100% protegidos durante toda a transação.",
  },
  {
    question: "Recebo os bônus junto com o guia?",
    answer:
      "Sim! Ao adquirir o pacote completo, você recebe automaticamente todos os 10 bônus exclusivos junto com o guia principal, tudo no mesmo acesso.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer:
      "Com certeza! Os PDFs podem ser baixados e visualizados em qualquer dispositivo: celular, tablet ou computador.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-stone-200 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Titulo */}
        <h2 className="text-2xl md:text-3xl font-bold italic text-emerald-900 text-center mb-10">
          PERGUNTAS FREQUENTES
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-emerald-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-700 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">
            Ainda tem dúvidas? Entre em contato conosco pelo e-mail:{" "}
            <span className="text-emerald-700 font-semibold">
              suporte@guiaautocura.com
            </span>
          </p>
          <a href="#pricing">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-colors">
              QUERO COMECAR MINHA JORNADA NATURAL
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
