import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useAnimacaoEntrada } from "@/hooks/use-reduced-motion";

type ContadorProps = {
  /** Número final. É ele que o SSR renderiza. */
  valor: number;
  /** Texto colado antes do número, tipo "+". */
  prefixo?: string;
  /** Texto colado depois do número. */
  sufixo?: string;
  className?: string;
  /** Duração da contagem em segundos. */
  duracao?: number;
  /** Separador de milhar. Desligue para ano — "2.011" não é ano. */
  separador?: boolean;
};

/**
 * Número que sobe de 0 até o valor final quando entra na tela.
 *
 * O valor final é o que vai no HTML do servidor: se o JS não rodar, o usuário
 * lê "47", não "0". A contagem só substitui o texto depois que o componente
 * monta e entra na viewport — e nem acontece para quem pediu menos movimento.
 */
export function Contador({
  valor,
  prefixo = "",
  sufixo = "",
  className,
  duracao = 1.6,
  separador = true,
}: ContadorProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const naTela = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { animar } = useAnimacaoEntrada();
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    if (!animar || !naTela) return;

    setAtual(0);
    const controles = animate(0, valor, {
      duration: duracao,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAtual(Math.round(v)),
    });
    return () => controles.stop();
  }, [animar, naTela, valor, duracao]);

  return (
    <span ref={ref} className={className}>
      {prefixo}
      {separador ? atual.toLocaleString("pt-BR") : String(atual)}
      {sufixo}
    </span>
  );
}
