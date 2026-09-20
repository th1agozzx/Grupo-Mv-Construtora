import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { VIEWPORT_REVEAL, cascata, reveal, revealSemMovimento } from "./animacoes";
import { useAnimacaoEntrada } from "@/hooks/use-reduced-motion";

type RevelarProps = {
  children: ReactNode;
  className?: string;
  /** Variante de entrada. O padrão sobe e aparece. */
  variantes?: Variants;
  /** Atraso antes de começar — para escalonar blocos irmãos. */
  atraso?: number;
  /** Elemento renderizado. `div` por padrão. */
  as?: ElementType;
  /** Quando o pai controla a cascata, o filho não observa o próprio viewport. */
  filho?: boolean;
  id?: string;
  "aria-label"?: string;
};

/**
 * Bloco que entra animado quando encosta na tela.
 *
 * Toda a proteção do SSR mora aqui: com `animar` falso (servidor, primeira
 * renderização e "reduzir movimento") o componente monta direto no estado final
 * e não escreve `opacity: 0` no HTML. Por isso nenhum lugar do site deve chamar
 * `motion` com `initial="hidden"` na mão — use este componente.
 */
export function Revelar({
  children,
  className,
  variantes,
  atraso = 0,
  as,
  filho = false,
  ...resto
}: RevelarProps) {
  const { animar } = useAnimacaoEntrada();
  const Tag = motion.create(as ?? "div");
  const usadas = animar ? (variantes ?? reveal) : revealSemMovimento;

  if (filho) {
    return (
      <Tag className={className} variants={usadas} {...resto}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={usadas}
      initial={animar ? "hidden" : false}
      whileInView="show"
      viewport={VIEWPORT_REVEAL}
      transition={atraso ? { delay: atraso } : undefined}
      {...resto}
    >
      {children}
    </Tag>
  );
}

type GradeProps = {
  children: ReactNode;
  className?: string;
  /** Intervalo entre a entrada de cada filho. */
  intervalo?: number;
  as?: ElementType;
};

/**
 * Container que faz os filhos entrarem em cascata.
 *
 * Os filhos devem ser `<Revelar filho>` — eles herdam o disparo do pai em vez
 * de observar o viewport cada um por si.
 */
export function RevelarGrade({ children, className, intervalo = 0.08, as }: GradeProps) {
  const { animar } = useAnimacaoEntrada();
  const Tag = motion.create(as ?? "div");

  return (
    <Tag
      className={className}
      variants={cascata(intervalo)}
      initial={animar ? "hidden" : false}
      whileInView="show"
      viewport={VIEWPORT_REVEAL}
    >
      {children}
    </Tag>
  );
}
