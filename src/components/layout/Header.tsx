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
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
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
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {MENU_PRINCIPAL.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
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
          className="grid h-12 w-12 touch-manipulation place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 active:bg-white/15 lg:hidden"
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
            className="absolute inset-x-0 top-full h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-zinc-950 px-5 pt-5 shadow-2xl shadow-black/50 [padding-bottom:max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="mx-auto max-w-2xl">
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                <span>Navegue pelo site</span>
                <span>{String(MENU_COMPLETO.length).padStart(2, "0")} itens</span>
              </div>

              <div className="border-t border-white/10">
                {MENU_COMPLETO.map((item, indice) => {
                  const eContato = item.href === "#contato";

                  return (
                    <a
                      key={item.href}
                      href={href(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className={
                        eContato
                          ? "mt-4 flex min-h-14 touch-manipulation items-center justify-between rounded-sm bg-red-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-red-950/25 transition-colors active:bg-red-700"
                          : "group flex min-h-14 touch-manipulation items-center gap-4 border-b border-white/10 py-3 text-lg font-semibold text-white transition-colors active:bg-white/5"
                      }
                    >
                      <span className="flex items-center gap-4">
                        {!eContato && (
                          <span className="w-5 text-[10px] font-bold tabular-nums tracking-wider text-red-400/80">
                            {String(indice + 1).padStart(2, "0")}
                          </span>
                        )}
                        {item.rotulo}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-white/45 transition-transform group-active:translate-x-0.5 group-active:-translate-y-0.5"
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
