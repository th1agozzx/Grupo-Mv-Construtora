import type { ReactNode } from "react";

/**
 * Variantes de cor. São excludentes de propósito.
 *
 * Antes o botão aceitava sobrescrita de cor via `className`, mas isso quebrava:
 * as classes de cor da base e da sobrescrita têm a mesma especificidade, então
 * quem vencia era a ordem do CSS gerado pelo Tailwind, não a ordem do atributo.
 * Foi o que deixou o botão "Solicitar orçamento pelo site" branco no branco.
 */
type Variante = "primaria" | "escura" | "clara";

/** Nomes das variantes seguem o manual: vermelho de ação, grafite e contorno claro. */

const VARIANTES: Record<Variante, string> = {
  // Vermelho sobre fundo claro — padrão do site.
  primaria: "border-mv bg-mv text-white hover:border-mv-escuro hover:bg-mv-escuro",
  // Grafite — sobre o vermelho ou sobre foto clara.
  escura: "border-grafite bg-grafite text-white hover:border-grafite-alto hover:bg-grafite-alto",
  // Contorno claro — sobre fundo escuro ou vermelho.
  clara: "border-white bg-transparent text-white hover:bg-white hover:text-grafite",
};

// Retângulo reto, sem sombra e sem deslocamento: o peso vem da cor e do espaço
// em volta, não do relevo. É o que sustenta a leitura institucional.
const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border px-8 py-4 text-center text-[13px] font-semibold uppercase leading-none tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  variante?: Variante;
  /** Só para layout (largura, margem). Não use para cor — passe `variante`. */
  className?: string;
};

export function CTAButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  variante = "primaria",
  className = "",
}: CTAButtonProps) {
  const classes = `${BASE} ${VARIANTES[variante]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
