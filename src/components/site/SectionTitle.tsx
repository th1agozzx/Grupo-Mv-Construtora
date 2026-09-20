import { Revelar } from "./Revelar";
import { revealLateral } from "./animacoes";

export function SectionTitle({
  eyebrow,
  title,
  light = false,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  /** Nas páginas de serviço o título da seção de abertura é o H1 da página. */
  as?: "h1" | "h2";
}) {
  return (
    <Revelar className="max-w-3xl" variantes={revealLateral}>
      {/* Em fundo claro o rótulo usa o Vermelho Escuro: o Vermelho MV puro não
          alcança 4,5:1 sobre o areia. A régua ao lado é elemento gráfico e pode
          manter o vermelho da marca. */}
      <p
        className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${light ? "text-mv-claro" : "text-mv-escuro"}`}
      >
        <span className={`h-px w-8 ${light ? "bg-mv-claro" : "bg-mv"}`} /> {eyebrow}
      </p>
      <Tag
        className={`text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] ${light ? "text-white" : "text-grafite"}`}
      >
        {title}
      </Tag>
    </Revelar>
  );
}
