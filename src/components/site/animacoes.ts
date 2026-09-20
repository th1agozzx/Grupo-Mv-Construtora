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
 *   - `margin`         dispara ANTES de entrar, com folga de 15% da altura da tela
 *   - duração curta    para o fade terminar antes de ser notado
 *
 * A folga é menor do que era (25%) porque agora existe fade: com folga grande
 * demais a animação terminava fora da tela e o usuário não via nada acontecer.
 */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0,
  margin: "0px 0px 15% 0px",
} as const;

export const EASE_SAIDA = [0.22, 1, 0.36, 1] as const;

/**
 * Entrada padrão: sobe e aparece.
 *
 * ⚠️ O fade só pode existir porque NENHUM componente monta com
 * `initial="oculto"` no servidor — ver `useAnimacaoEntrada`. O framer serializa
 * o estado inicial como style inline, e numa passagem anterior isso deixou 31
 * blocos em `opacity: 0` no HTML do SSR: sem JS hidratado, seções invisíveis no
 * celular. A regra é: no servidor o conteúdo nasce visível; a animação entra
 * depois que o React monta.
 */
export const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SAIDA },
  },
};

/** Entrada de cartão/imagem: acompanha um leve afastamento de escala. */
export const revealEscala = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_SAIDA },
  },
};

/** Entrada lateral, para blocos de texto ao lado de foto. */
export const revealLateral = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SAIDA },
  },
};

/**
 * Variante para quem pediu menos movimento no sistema.
 *
 * O site usa animação de entrada em quase toda seção, carrossel e slideshow
 * automático. Para quem tem sensibilidade vestibular isso é desconfortável —
 * e `prefers-reduced-motion` é o pedido explícito de desligar. O conteúdo
 * aparece na hora, sem deslocamento e sem fade.
 */
export const revealSemMovimento = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
  show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } },
};

/** Cascata dos filhos de uma grade. */
export const cascata = (atraso = 0.08) => ({
  show: { transition: { staggerChildren: atraso } },
});
