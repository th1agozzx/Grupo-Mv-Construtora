// Variantes e configuração das animações de entrada das seções.

/**
 * Configuração de viewport para TODA animação de entrada por scroll.
 *
 * Por que existe uma constante única: os valores padrão do framer-motion
 * causavam um bug de usabilidade real no celular. O `SectionTitle` usava
 * `amount: 0.4` — só começava a animar quando 40% do bloco já estava na tela — e
 * o fade durava 0,95s. Resultado: o usuário rolava, encontrava a seção **em
 * branco** e só depois o conteúdo aparecia. Em seção alta no mobile isso é a
 * diferença entre "site com animação" e "site quebrado".
 *
 * Os três valores abaixo resolvem juntos:
 *   - `amount: 0`      dispara assim que qualquer pixel entra
 *   - `margin`         dispara ANTES de entrar, com folga de 25% da altura da tela
 *   - duração curta    (ver `reveal`) para o fade terminar antes de ser notado
 *
 * O efeito prático é que a animação acontece enquanto a seção ainda está fora da
 * vista. Quando o usuário chega, o conteúdo já está lá.
 */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0,
  margin: "0px 0px 25% 0px",
} as const;

/**
 * Entrada por deslocamento, SEM fade.
 *
 * A opacidade foi removida de propósito. O framer serializa o estado `hidden`
 * como style inline no SSR — o HTML chegava com 31 elementos em `opacity: 0`.
 * Enquanto o JS não hidratava, esses 31 blocos ficavam **invisíveis**. Num
 * aparelho modesto em 4G isso são segundos de tela branca, e foi exatamente o
 * que os usuários relataram no celular.
 *
 * Sem opacidade, o pior caso vira "conteúdo 24px abaixo da posição final" —
 * imperceptível. Com JS, o deslize acontece normalmente. A animação virou
 * decoração de verdade: se falhar, não leva o conteúdo junto.
 */
export const reveal = {
  hidden: { y: 24 },
  show: { y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

/**
 * Variante para quem pediu menos movimento no sistema.
 *
 * O site usa animação de entrada em quase toda seção, slideshow automático a
 * cada 5s e blobs em loop infinito. Para quem tem sensibilidade vestibular isso
 * é desconfortável — e `prefers-reduced-motion` é justamente o pedido explícito
 * de desligar. O conteúdo aparece na hora, sem deslocamento.
 */
export const revealSemMovimento = {
  hidden: { y: 0 },
  show: { y: 0, transition: { duration: 0 } },
};
