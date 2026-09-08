import { useReducedMotion } from "framer-motion";

import { reveal, revealSemMovimento } from "@/components/site/animacoes";

/**
 * Devolve a variante de animação certa para o usuário atual.
 *
 * Quem marcou "reduzir movimento" no sistema operacional recebe o conteúdo já
 * visível, sem deslocamento. Os demais recebem a animação normal.
 */
export function useReveal() {
  const reduzir = useReducedMotion();
  return reduzir ? revealSemMovimento : reveal;
}
