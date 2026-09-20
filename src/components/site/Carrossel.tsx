import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type CarrosselProps = {
  children: ReactNode;
  /** Rótulo da região para leitor de tela. Ex.: "Obras realizadas". */
  rotulo: string;
  /** Classe aplicada em cada slide (largura responsiva). */
  className?: string;
  /** Some com as setas quando tudo cabe na tela. */
  escuro?: boolean;
};

/**
 * Carrossel com arrasto, setas e barra de progresso.
 *
 * Usa embla (já era dependência do projeto). O conteúdo é HTML normal em
 * `flex`: sem JS, os slides continuam no fluxo e o bloco vira uma faixa
 * rolável na horizontal — o conteúdo nunca some.
 *
 * `loop` fica desligado de propósito. Com loop o embla clona slides, e os
 * clones entram no HTML do SSR e no texto lido por buscador e leitor de tela.
 */
export function Carrossel({ children, rotulo, className = "", escuro = false }: CarrosselProps) {
  const reduzir = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reduzir ? 0 : 22,
  });

  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const atualizar = useCallback(() => {
    if (!embla) return;
    setPodeVoltar(embla.canScrollPrev());
    setPodeAvancar(embla.canScrollNext());
    setProgresso(Math.max(0, Math.min(1, embla.scrollProgress())));
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    atualizar();
    embla.on("select", atualizar).on("scroll", atualizar).on("reInit", atualizar);
    return () => {
      embla.off("select", atualizar).off("scroll", atualizar).off("reInit", atualizar);
    };
  }, [embla, atualizar]);

  const cor = escuro
    ? "border-white/25 text-white hover:bg-white hover:text-grafite disabled:opacity-30"
    : "border-borda text-grafite hover:border-grafite hover:bg-grafite hover:text-white disabled:opacity-30";

  return (
    <div role="group" aria-roledescription="carrossel" aria-label={rotulo}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex touch-pan-y ${className}`}>{children}</div>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!podeVoltar}
            aria-label={`${rotulo}: anterior`}
            className={`grid h-12 w-12 place-items-center border transition-colors ${cor}`}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!podeAvancar}
            aria-label={`${rotulo}: próximo`}
            className={`grid h-12 w-12 place-items-center border transition-colors ${cor}`}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Barra de progresso: mostra o quanto ainda há para arrastar. */}
        <div aria-hidden="true" className={`h-px flex-1 ${escuro ? "bg-white/20" : "bg-borda"}`}>
          <div
            className="h-px bg-mv transition-[width] duration-150"
            style={{ width: `${Math.round(progresso * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
