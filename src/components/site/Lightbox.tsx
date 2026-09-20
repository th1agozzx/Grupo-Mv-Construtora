import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

export type FotoLightbox = { src: string; alt: string; legenda?: string };

type LightboxProps = {
  fotos: FotoLightbox[];
  /** Índice aberto, ou null com o lightbox fechado. */
  indice: number | null;
  aoFechar: () => void;
  aoTrocar: (indice: number) => void;
};

/**
 * Visualizador de foto em tela cheia.
 *
 * Só monta quando abre, então não pesa no HTML do SSR. Fecha no Esc e navega
 * com as setas do teclado; o fundo trava a rolagem da página enquanto aberto.
 */
export function Lightbox({ fotos, indice, aoFechar, aoTrocar }: LightboxProps) {
  const aberto = indice !== null;

  const anterior = useCallback(() => {
    if (indice === null) return;
    aoTrocar((indice - 1 + fotos.length) % fotos.length);
  }, [indice, fotos.length, aoTrocar]);

  const proxima = useCallback(() => {
    if (indice === null) return;
    aoTrocar((indice + 1) % fotos.length);
  }, [indice, fotos.length, aoTrocar]);

  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") aoFechar();
      if (evento.key === "ArrowLeft") anterior();
      if (evento.key === "ArrowRight") proxima();
    };

    // Sem isto a página de trás rola junto com o gesto sobre a foto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, aoFechar, anterior, proxima]);

  const foto = indice === null ? null : fotos[indice];

  return (
    <AnimatePresence>
      {foto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={foto.legenda ?? foto.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={aoFechar}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-grafite-alto/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors hover:bg-white hover:text-grafite"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  anterior();
                }}
                aria-label="Foto anterior"
                className="absolute left-3 grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors hover:bg-white hover:text-grafite sm:left-6"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  proxima();
                }}
                aria-label="Próxima foto"
                className="absolute right-3 grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors hover:bg-white hover:text-grafite sm:right-6"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}

          <motion.figure
            key={foto.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-5xl"
          >
            <img
              src={foto.src}
              alt={foto.alt}
              className="max-h-[78vh] w-full object-contain"
              decoding="async"
            />
            {foto.legenda && (
              <figcaption className="mt-4 text-center text-sm text-white/70">
                {foto.legenda}
                <span className="ml-3 font-mono text-xs text-white/40">
                  {String((indice ?? 0) + 1).padStart(2, "0")}/
                  {String(fotos.length).padStart(2, "0")}
                </span>
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
