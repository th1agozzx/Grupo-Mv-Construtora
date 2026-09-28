import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";

/**
 * Trilha visível. O JSON-LD equivalente sai de `breadcrumbSchema` (src/lib/schema.ts).
 *
 * Toda página interna ganha também um botão "voltar" para o nível de cima
 * (o último item com link). No celular ele substitui a trilha, que quebraria em
 * várias linhas; do tablet para cima os dois aparecem lado a lado.
 */
export function Breadcrumbs({ itens }: { itens: { rotulo: string; para?: string }[] }) {
  const pai = [...itens].reverse().find((item) => item.para);

  return (
    <nav aria-label="Trilha de navegação" className="flex items-center gap-4 text-sm text-concreto">
      {pai?.para && (
        <Link
          to={pai.para}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-borda bg-white px-3 text-[13px] font-semibold text-grafite transition-colors hover:border-mv hover:text-mv-escuro"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>
            Voltar<span className="sm:hidden"> para {pai.rotulo}</span>
          </span>
        </Link>
      )}
      <ol className="hidden flex-wrap items-center gap-1 sm:flex">
        {itens.map((item, i) => (
          <li key={item.rotulo} className="flex items-center gap-1">
            {item.para ? (
              <Link to={item.para} className="hover:text-mv hover:underline">
                {item.rotulo}
              </Link>
            ) : (
              <span aria-current="page" className="text-concreto">
                {item.rotulo}
              </span>
            )}
            {i < itens.length - 1 && (
              <ChevronRight size={14} aria-hidden="true" className="text-concreto" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
