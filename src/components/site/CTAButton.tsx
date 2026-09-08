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

const VARIANTES: Record<Variante, string> = {
  // Vermelho sobre fundo claro — padrão do site.
  primaria:
    "border-black bg-red-600 text-white shadow-[0.1em_0.1em_0px_#000] hover:shadow-[0.15em_0.15em_0px_#000] active:shadow-[0.05em_0.05em_0px_#000]",
  // Preto com borda branca — para usar sobre o vermelho.
  escura:
    "border-white bg-zinc-950 text-white shadow-[0.1em_0.1em_0px_#fff] hover:shadow-[0.15em_0.15em_0px_#fff] active:shadow-[0.05em_0.05em_0px_#fff]",
  // Branco com texto vermelho — para usar sobre o vermelho.
  clara:
    "border-white bg-white text-red-700 shadow-[0.1em_0.1em_0px_#7f1d1d] hover:shadow-[0.15em_0.15em_0px_#7f1d1d] active:shadow-[0.05em_0.05em_0px_#7f1d1d]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[0.4em] border-[3px] px-[1.3em] py-[0.6em] font-black transition-all duration-150 hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] disabled:cursor-not-allowed disabled:opacity-60";

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
