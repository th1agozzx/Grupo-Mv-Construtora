import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import logomv from "@/assets/otimizadas/logomv.webp";
import { CTAButton } from "@/components/site/CTAButton";
import { MENU_COMPLETO, MENU_PRINCIPAL, SITE_BASE_PATH, hrefAbsoluto } from "@/config/navegacao";
import { FROTA } from "@/data/frota";
import { OBRAS } from "@/data/obras";
import { SERVICOS } from "@/data/servicos";

const SECOES_HOME = ["servicos", "obras", "frota", "quem-somos", "contato"] as const;

const ROTAS_POR_SECAO: Record<string, string> = {
  "#servicos": "/servicos",
  "#obras": "/obras",
  "#frota": "/frota",
  "/blog": "/blog",
};

const PAINEIS = ["servicos", "frota", "obras"] as const;
type PainelAberto = (typeof PAINEIS)[number] | null;

const ITENS_INSTITUCIONAIS = MENU_COMPLETO.filter(
  (item) => !["#servicos", "#frota", "/obras", "#contato"].includes(item.href),
);
const OBRAS_DO_MENU = OBRAS.filter((obra) => !obra.provisoria).slice(0, 4);

export function Header() {
  const [condensado, setCondensado] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [painelAberto, setPainelAberto] = useState<PainelAberto>(null);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);
  const menuId = useId();
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const navegacaoRef = useRef<HTMLElement>(null);
  const gatilhosRef = useRef<Record<Exclude<PainelAberto, null>, HTMLButtonElement | null>>({
    servicos: null,
    frota: null,
    obras: null,
  });
  const aberturaTimer = useRef<number | null>(null);
  const fechamentoTimer = useRef<number | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const naHome = pathname === "/";

  const href = (h: string) => hrefAbsoluto(h, naHome);
  const itemAtivo = (hrefItem: string) => {
    if (naHome) return hrefItem === `#${secaoAtiva ?? hash.replace(/^#/, "")}`;
    const rota = ROTAS_POR_SECAO[hrefItem];
    return rota !== undefined && (pathname === rota || pathname.startsWith(`${rota}/`));
  };
  const marcarAncoraClicada = (hrefItem: string) => {
    if (naHome && hrefItem.startsWith("#")) setSecaoAtiva(hrefItem.slice(1));
  };

  const limparTimers = () => {
    if (aberturaTimer.current) window.clearTimeout(aberturaTimer.current);
    if (fechamentoTimer.current) window.clearTimeout(fechamentoTimer.current);
    aberturaTimer.current = null;
    fechamentoTimer.current = null;
  };

  const abrirPainel = (painel: Exclude<PainelAberto, null>, imediato = false) => {
    if (fechamentoTimer.current) window.clearTimeout(fechamentoTimer.current);
    fechamentoTimer.current = null;
    if (aberturaTimer.current) window.clearTimeout(aberturaTimer.current);

    if (imediato || painelAberto === painel) {
      setPainelAberto(painel);
      return;
    }
    aberturaTimer.current = window.setTimeout(() => setPainelAberto(painel), 120);
  };

  const fecharPainel = (devolverFoco = false) => {
    limparTimers();
    const painelAnterior = painelAberto;
    setPainelAberto(null);
    if (devolverFoco && painelAnterior) gatilhosRef.current[painelAnterior]?.focus();
  };

  const agendarFechamento = () => {
    if (aberturaTimer.current) window.clearTimeout(aberturaTimer.current);
    aberturaTimer.current = null;
    if (fechamentoTimer.current) window.clearTimeout(fechamentoTimer.current);
    fechamentoTimer.current = window.setTimeout(() => setPainelAberto(null), 220);
  };

  const moverFocoNoTopo = (direcao: 1 | -1) => {
    const itens = Array.from(
      navegacaoRef.current?.querySelectorAll<HTMLElement>("[data-item-navegacao]") ?? [],
    );
    const indice = itens.findIndex((item) => item === document.activeElement);
    if (indice !== -1) itens[(indice + direcao + itens.length) % itens.length]?.focus();
  };

  const focarPrimeiroItemDoPainel = (painel: Exclude<PainelAberto, null>) => {
    window.setTimeout(() => {
      document
        .getElementById(`painel-${painel}`)
        ?.querySelector<HTMLElement>("a, button")
        ?.focus();
    }, 0);
  };

  // Fecha menus fora de contexto e evita scroll concorrente com o painel mobile.
  useEffect(() => {
    setMenuOpen(false);
    fecharPainel();
  }, [pathname]);

  useEffect(() => {
    const atualizarCondensacao = () => setCondensado(window.scrollY >= 80);
    atualizarCondensacao();
    window.addEventListener("scroll", atualizarCondensacao, { passive: true });
    return () => window.removeEventListener("scroll", atualizarCondensacao);
  }, []);

  useEffect(() => {
    if (!naHome) return;
    const sincronizarAncora = () => {
      const id = window.location.hash.slice(1);
      setSecaoAtiva(SECOES_HOME.includes(id as (typeof SECOES_HOME)[number]) ? id : null);
    };
    sincronizarAncora();
    window.addEventListener("hashchange", sincronizarAncora);
    return () => window.removeEventListener("hashchange", sincronizarAncora);
  }, [naHome]);

  useEffect(() => {
    if (!naHome) {
      setSecaoAtiva(null);
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const secoes = SECOES_HOME.map((id) => document.getElementById(id)).filter(
      (secao): secao is HTMLElement => secao !== null,
    );
    const visiveis = new Map<string, number>();
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) visiveis.set(entrada.target.id, entrada.intersectionRect.height);
          else visiveis.delete(entrada.target.id);
        });
        const [idAtivo] =
          [...visiveis.entries()].sort(([, alturaA], [, alturaB]) => alturaB - alturaA)[0] ?? [];
        setSecaoAtiva(idAtivo ?? null);
      },
      { rootMargin: "-80px 0px -45% 0px", threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    secoes.forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, [naHome]);

  useEffect(() => {
    const aoPressionarTecla = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      if (menuOpen) setMenuOpen(false);
      if (painelAberto) fecharPainel(true);
    };
    const aoCliqueFora = (evento: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(evento.target as Node)) fecharPainel();
    };
    const aoRedimensionar = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
      else fecharPainel();
    };
    document.addEventListener("keydown", aoPressionarTecla);
    document.addEventListener("mousedown", aoCliqueFora);
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      document.removeEventListener("keydown", aoPressionarTecla);
      document.removeEventListener("mousedown", aoCliqueFora);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [menuOpen, painelAberto]);

  useEffect(() => {
    if (!menuOpen) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [menuOpen]);

  useEffect(() => () => limparTimers(), []);

  const handleTeclaTopo = (
    evento: ReactKeyboardEvent<HTMLElement>,
    painel?: Exclude<PainelAberto, null>,
  ) => {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      moverFocoNoTopo(1);
    }
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      moverFocoNoTopo(-1);
    }
    if (evento.key === "ArrowDown" && painel) {
      evento.preventDefault();
      abrirPainel(painel, true);
      focarPrimeiroItemDoPainel(painel);
    }
  };

  const temPainel = (hrefItem: string): hrefItem is "#servicos" | "#frota" | "/obras" =>
    ["#servicos", "#frota", "/obras"].includes(hrefItem);
  const painelDoItem = (hrefItem: "#servicos" | "#frota" | "/obras") =>
    hrefItem === "#servicos" ? "servicos" : hrefItem === "#frota" ? "frota" : "obras";

  return (
    <header
      ref={headerRef}
      onMouseEnter={() => {
        if (fechamentoTimer.current) window.clearTimeout(fechamentoTimer.current);
      }}
      onMouseLeave={agendarFechamento}
      className={`cabecalho-fluido fixed inset-x-0 top-0 z-[80] transition-[border-color,background-color] duration-300 ease-out motion-reduce:transition-none ${
        condensado ? "cabecalho-condensado" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 ease-out motion-reduce:transition-none sm:px-8 ${condensado ? "h-16" : "h-20"}`}
      >
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
            className={`w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${condensado ? "h-8 sm:h-9" : "h-9 sm:h-10"}`}
          />
        </a>

        <nav
          ref={navegacaoRef}
          className="hidden h-full items-center gap-1 lg:flex"
          aria-label="Navegação principal"
        >
          {MENU_PRINCIPAL.map((item) => {
            const ativo = itemAtivo(item.href);
            if (temPainel(item.href)) {
              const painel = painelDoItem(item.href);
              const aberto = painelAberto === painel;
              return (
                <button
                  key={item.href}
                  ref={(elemento) => {
                    gatilhosRef.current[painel] = elemento;
                  }}
                  type="button"
                  data-item-navegacao
                  aria-expanded={aberto}
                  aria-controls={`painel-${painel}`}
                  onMouseEnter={() => abrirPainel(painel)}
                  onFocus={() => abrirPainel(painel, true)}
                  onClick={() => (aberto ? fecharPainel() : abrirPainel(painel, true))}
                  onKeyDown={(evento) => handleTeclaTopo(evento, painel)}
                  className={`relative flex h-full items-center gap-1 px-3 text-[14px] font-medium tracking-[-0.01em] transition-colors motion-reduce:transition-none ${ativo || aberto ? "text-grafite" : "text-concreto hover:text-grafite"}`}
                >
                  {item.rotulo}
                  <ArrowDown
                    aria-hidden="true"
                    size={13}
                    className={`transition-transform duration-200 motion-reduce:transition-none ${aberto ? "rotate-180" : ""}`}
                  />
                  {(ativo || aberto) && <Indicador reducedMotion={reducedMotion} />}
                </button>
              );
            }
            return (
              <a
                key={item.href}
                href={href(item.href)}
                data-item-navegacao
                onFocus={() => fecharPainel()}
                onClick={() => marcarAncoraClicada(item.href)}
                onKeyDown={handleTeclaTopo}
                aria-current={ativo ? (naHome ? "location" : "page") : undefined}
                className={`relative flex h-full items-center px-3 text-[14px] font-medium tracking-[-0.01em] transition-colors motion-reduce:transition-none ${ativo ? "text-grafite" : "text-concreto hover:text-grafite"}`}
              >
                {item.rotulo}
                {ativo && <Indicador reducedMotion={reducedMotion} />}
              </a>
            );
          })}
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

      <AnimatePresence initial={false}>
        {painelAberto && (
          <motion.section
            id={`painel-${painelAberto}`}
            key={painelAberto}
            aria-label={`Menu de ${painelAberto}`}
            initial={reducedMotion ? false : { opacity: 0, y: -7, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4, scale: 0.995 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden origin-top border-y border-borda bg-white/95 backdrop-blur-xl backdrop-saturate-150 lg:block"
          >
            <div className="mx-auto max-w-7xl px-8 py-6">
              {painelAberto === "servicos" && <PainelServicos />}
              {painelAberto === "frota" && <PainelFrota />}
              {painelAberto === "obras" && <PainelObras />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id={menuId}
            aria-label="Navegação mobile"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
            className={`absolute inset-x-0 top-full flex overflow-y-auto overscroll-contain border-t border-borda bg-white lg:hidden ${condensado ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh-80px)]"}`}
          >
          <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-5 pt-5 sm:px-8">
            <MenuMobileSecao
              titulo="Serviços"
              itens={SERVICOS.map((servico) => ({
                rotulo: servico.nome,
                href: `/servicos/${servico.slug}`,
              }))}
              onNavegar={() => setMenuOpen(false)}
            />
            <MenuMobileSecao
              titulo="Frota"
              itens={FROTA.map((maquina) => ({
                rotulo: maquina.nome,
                href: `/frota/${maquina.slug}`,
              }))}
              onNavegar={() => setMenuOpen(false)}
            />
            <MenuMobileSecao
              titulo="Obras"
              itens={OBRAS_DO_MENU.map((obra) => ({
                rotulo: obra.titulo,
                href: `/obras/${obra.slug}`,
              }))}
              onNavegar={() => setMenuOpen(false)}
            />
            <MenuMobileSecao
              titulo="Institucional"
              itens={ITENS_INSTITUCIONAIS.map((item) => ({ ...item, href: href(item.href) }))}
              onNavegar={() => setMenuOpen(false)}
            />
            <div className="sticky bottom-0 mt-auto border-t border-borda bg-white py-5 [padding-bottom:max(1.25rem,env(safe-area-inset-bottom))]">
              <CTAButton
                href={href("#contato")}
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Solicitar orçamento
              </CTAButton>
            </div>
          </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Indicador({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <motion.span
      layoutId="indicador-navegacao"
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 38 }}
      className="absolute inset-x-1 bottom-2 h-0.5 bg-mv"
    />
  );
}

function PainelServicos() {
  return (
    <div>
      <CabecalhoPainel titulo="Serviços" href="/servicos" link="Ver todos os serviços" />
      <div className="grid grid-cols-3 gap-x-7 gap-y-1">
        {SERVICOS.map((servico) => {
          const Icone = servico.icon;
          return (
            <a
              key={servico.slug}
              href={`/servicos/${servico.slug}`}
              className="group flex min-w-0 items-center gap-3 py-2.5"
            >
              <Icone
                aria-hidden="true"
                size={18}
                strokeWidth={1.65}
                className="shrink-0 text-mv-escuro"
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-grafite group-hover:text-mv-escuro">
                  {servico.nome}
                </span>
                <span className="block truncate text-xs text-concreto">{servico.resumo}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function PainelFrota() {
  return (
    <div>
      <CabecalhoPainel titulo="Frota própria" href="/frota" link="Ver frota completa" />
      <div className="grid grid-cols-3 gap-4">
        {FROTA.map((maquina) => (
          <a
            key={maquina.slug}
            href={`/frota/${maquina.slug}`}
            className="group grid grid-cols-[88px_1fr] items-center gap-3 border-b border-borda py-2"
          >
            <img src={maquina.imgs[0]} alt="" className="h-14 w-[88px] object-cover" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-grafite group-hover:text-mv-escuro">
                {maquina.nome}
              </span>
              <span className="block text-xs text-concreto">{maquina.categoria}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function PainelObras() {
  return (
    <div>
      <CabecalhoPainel titulo="Obras" href="/obras" link="Ver todas as obras" />
      <div className="grid grid-cols-4 gap-4">
        {OBRAS_DO_MENU.map((obra) => (
          <a key={obra.slug} href={`/obras/${obra.slug}`} className="group min-w-0">
            <img src={obra.imagem} alt="" className="h-24 w-full object-cover" />
            <span className="mt-2 block truncate text-sm font-medium text-grafite group-hover:text-mv-escuro">
              {obra.titulo}
            </span>
            <span className="block truncate text-xs text-concreto">
              {obra.local ?? obra.categoria}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function CabecalhoPainel({ titulo, href, link }: { titulo: string; href: string; link: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between border-b border-borda pb-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">{titulo}</p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-grafite hover:text-mv-escuro"
      >
        {link} <ArrowRight aria-hidden="true" size={15} />
      </a>
    </div>
  );
}

function MenuMobileSecao({
  titulo,
  itens,
  onNavegar,
}: {
  titulo: string;
  itens: { rotulo: string; href: string }[];
  onNavegar: () => void;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <section className="border-t border-borda py-4 first:border-t-0 first:pt-0">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
        {titulo}
      </p>
      <div>
        {itens.map((item, indice) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={onNavegar}
            initial={reducedMotion ? false : { opacity: 0, x: -7 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.16, delay: indice * 0.04, ease: "easeOut" }
            }
            className="flex min-h-11 items-center justify-between border-b border-borda text-[15px] font-medium tracking-[-0.01em] text-grafite last:border-b-0"
          >
            {item.rotulo}
            <ArrowUpRight aria-hidden="true" size={16} className="text-concreto" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
