import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import logomv from "@/assets/otimizadas/logomv.webp";
import { CTAButton } from "@/components/site/CTAButton";
import { MENU_COMPLETO, MENU_PRINCIPAL, SITE_BASE_PATH, hrefAbsoluto } from "@/config/navegacao";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const naHome = pathname === "/";

  const href = (h: string) => hrefAbsoluto(h, naHome);

  // Fecha o menu ao trocar de pagina e tambem permite sair pelo teclado.
  // O resize evita que o painel continue aberto, invisivel, apos girar o
  // aparelho ou aumentar a janela para o breakpoint desktop.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const aoPressionarTecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuOpen(false);
    };
    const aoRedimensionar = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    document.addEventListener("keydown", aoPressionarTecla);
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      document.removeEventListener("keydown", aoPressionarTecla);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-borda bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href={naHome ? "#inicio" : SITE_BASE_PATH}
          aria-label="MV Construtora - início"
          className="flex items-center"
        >
          <img
            src={logomv}
            alt="MV Construtora"
            width={320}
            height={100}
            fetchPriority="high"
            className="h-11 w-auto sm:h-12"
          />
        </a>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
          {MENU_PRINCIPAL.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className="text-[13px] font-medium uppercase tracking-[0.1em] text-concreto transition-colors hover:text-mv"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CTAButton href={href("#contato")}>Solicitar orçamento</CTAButton>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((aberto) => !aberto)}
          className="grid h-12 w-12 touch-manipulation place-items-center border border-borda text-grafite transition-colors hover:border-grafite active:bg-areia lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id={menuId}
            aria-label="Navegacao mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain border-t border-borda bg-white px-5 pt-5 [padding-bottom:max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="mx-auto max-w-2xl">
              <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-concreto">
                <span>Navegue pelo site</span>
                <span>{String(MENU_COMPLETO.length).padStart(2, "0")} itens</span>
              </div>

              <div className="border-t border-borda">
                {MENU_COMPLETO.map((item, indice) => {
                  const eContato = item.href === "#contato";

                  return (
                    <a
                      key={item.href}
                      href={href(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className={
                        eContato
                          ? "mt-5 flex min-h-14 touch-manipulation items-center justify-between bg-mv px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors active:bg-mv-escuro"
                          : "group flex min-h-14 touch-manipulation items-center gap-4 border-b border-borda py-3 text-base font-medium text-grafite transition-colors active:bg-areia"
                      }
                    >
                      <span className="flex items-center gap-4">
                        {!eContato && (
                          <span className="w-5 text-[10px] font-semibold tabular-nums tracking-wider text-mv">
                            {String(indice + 1).padStart(2, "0")}
                          </span>
                        )}
                        {item.rotulo}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-concreto transition-transform group-active:translate-x-0.5 group-active:-translate-y-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
