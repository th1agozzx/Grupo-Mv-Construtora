import { MessageCircle } from "lucide-react";

import { CTAButton } from "@/components/site/CTAButton";
import { EMPRESA, waLink } from "@/config/empresa";
import { SITE_BASE_PATH } from "@/config/navegacao";

/**
 * Bloco de conversão usado no fim das páginas internas.
 * Na home o formulário completo continua sendo a seção #contato.
 */
export function CtaFinal({ servico }: { servico?: string }) {
  const assunto = servico
    ? `Olá! Gostaria de um orçamento de ${servico} com a MV Construtora.`
    : "Olá! Gostaria de solicitar um orçamento à MV Construtora.";

  return (
    <section className="bg-red-600 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
          {servico
            ? `Precisa de ${servico.toLowerCase()} no Maranhão, Piauí ou Ceará?`
            : "Sua obra precisa avançar rápido?"}
        </h2>
        <p className="mt-5 max-w-xl leading-7 text-white/85">
          Fale com a nossa equipe. Avaliamos o escopo, o local e o prazo e enviamos uma proposta
          transparente para a sua obra.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href={waLink(assunto)} target="_blank" rel="noreferrer" variante="escura">
            <MessageCircle size={18} /> Chamar no WhatsApp
          </CTAButton>
          <CTAButton href={`${SITE_BASE_PATH}#contato`} variante="clara">
            Solicitar orçamento pelo site
          </CTAButton>
        </div>
        <p className="mt-6 text-sm text-white/75">
          Ou ligue para {EMPRESA.whatsappExibicao} · {EMPRESA.horario}
        </p>
      </div>
    </section>
  );
}
