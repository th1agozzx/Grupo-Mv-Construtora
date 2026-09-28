import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

type Destino = { rotulo: string; href: string };

/**
 * Navegação sequencial no fim das páginas de detalhe (obra, serviço, máquina):
 * anterior, volta à lista e próximo. Evita o beco sem saída em que a única
 * forma de ver outro item era voltar ao menu.
 */
export function AnteriorProxima({
  anterior,
  proxima,
  lista,
  tipo,
  feminino = false,
}: {
  anterior?: Destino;
  proxima?: Destino;
  lista: Destino;
  /** Substantivo usado nos rótulos: "obra", "serviço", "equipamento". */
  tipo: string;
  /** Concorda o rótulo: "Próxima obra" x "Próximo serviço". */
  feminino?: boolean;
}) {
  return (
    <nav
      aria-label={`Navegar entre ${tipo}s`}
      className="mx-auto grid max-w-7xl gap-px border-y border-borda bg-borda sm:grid-cols-[1fr_auto_1fr]"
    >
      {anterior ? (
        <Link
          to={anterior.href}
          className="group flex items-center gap-4 bg-white px-5 py-6 transition-colors hover:bg-areia sm:px-8"
        >
          <ArrowLeft
            size={20}
            aria-hidden="true"
            className="shrink-0 text-mv transition-transform group-hover:-translate-x-1"
          />
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-concreto">
              {tipo} anterior
            </span>
            <span className="mt-1 block truncate font-semibold text-grafite group-hover:text-mv-escuro">
              {anterior.rotulo}
            </span>
          </span>
        </Link>
      ) : (
        <span className="hidden bg-white sm:block" />
      )}

      <Link
        to={lista.href}
        className="flex items-center justify-center gap-2 bg-white px-8 py-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-grafite transition-colors hover:bg-areia hover:text-mv-escuro"
      >
        <LayoutGrid size={16} aria-hidden="true" className="text-mv" />
        {lista.rotulo}
      </Link>

      {proxima ? (
        <Link
          to={proxima.href}
          className="group flex items-center justify-end gap-4 bg-white px-5 py-6 text-right transition-colors hover:bg-areia sm:px-8"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-concreto">
              {feminino ? "Próxima" : "Próximo"} {tipo}
            </span>
            <span className="mt-1 block truncate font-semibold text-grafite group-hover:text-mv-escuro">
              {proxima.rotulo}
            </span>
          </span>
          <ArrowRight
            size={20}
            aria-hidden="true"
            className="shrink-0 text-mv transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <span className="hidden bg-white sm:block" />
      )}
    </nav>
  );
}

/** Vizinhos de um item numa lista, sem dar a volta no fim. */
export function vizinhos<T>(lista: readonly T[], indice: number) {
  return {
    anterior: indice > 0 ? lista[indice - 1] : undefined,
    proxima: indice >= 0 && indice < lista.length - 1 ? lista[indice + 1] : undefined,
  };
}
