import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

/** Trilha visível. O JSON-LD equivalente sai de `breadcrumbSchema` (src/lib/schema.ts). */
export function Breadcrumbs({ itens }: { itens: { rotulo: string; para?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        {itens.map((item, i) => (
          <li key={item.rotulo} className="flex items-center gap-1">
            {item.para ? (
              <Link to={item.para} className="hover:text-red-600 hover:underline">
                {item.rotulo}
              </Link>
            ) : (
              <span aria-current="page" className="text-zinc-700">
                {item.rotulo}
              </span>
            )}
            {i < itens.length - 1 && (
              <ChevronRight size={14} aria-hidden="true" className="text-zinc-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
