import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { reveal, revealSemMovimento } from "@/components/site/animacoes";

/**
 * Diz se o componente já está rodando no navegador, depois de montar.
 *
 * Serve para manter o HTML do SSR com o conteúdo VISÍVEL: enquanto isto for
 * `false`, os blocos animados usam `initial={false}` e o framer não escreve
 * `opacity: 0` no HTML servido. Sem essa trava, uma falha de JS (ou só a espera
 * pela hidratação numa conexão ruim) deixa seções inteiras invisíveis — foi o
 * que já aconteceu neste site.
 */
export function useMontado() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  return montado;
}

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

/**
 * Pacote pronto para animação de entrada: a variante e se pode animar.
 *
 * `animar` é falso no servidor, na primeira renderização do cliente e para quem
 * pediu menos movimento — nesses casos o bloco nasce no estado final.
 */
export function useAnimacaoEntrada() {
  const reduzir = useReducedMotion();
  const montado = useMontado();
  return { animar: montado && !reduzir, reduzir };
}
