import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Atalho para o topo nas páginas longas (home, obras, serviços). Só aparece
 * depois de rolar mais de uma tela e meia, empilhado acima do botão do WhatsApp.
 */
export function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    const atualizar = () => setVisivel(window.scrollY > window.innerHeight * 1.5);
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => window.removeEventListener("scroll", atualizar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" })
          }
          aria-label="Voltar ao topo da página"
          initial={reduzirMovimento ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduzirMovimento ? undefined : { opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed bottom-[6.5rem] right-6 z-[60] grid h-12 w-12 place-items-center border border-borda bg-white/95 text-grafite shadow-lg shadow-black/10 backdrop-blur transition-colors hover:border-mv hover:text-mv-escuro sm:right-8"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
