import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppFloating } from "./WhatsAppFloating";

/**
 * Casca comum a todas as páginas: barra de progresso, header fixo, rodapé e o
 * botão flutuante do WhatsApp. Aplicada no __root para que cada página nova já
 * nasça com a navegação completa, sem duplicar código.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  const reduzirMovimento = useReducedMotion();

  // Navegação por âncora tratada à mão, com um listener delegado.
  //
  // Por que: o `scrollRestoration: true` do router observa mudanças de histórico
  // e restaura a posição salva. Quando o navegador pulava para a âncora, o
  // router desfazia logo em seguida — o usuário clicava em "Localização", a URL
  // virava #localizacao e a página não saía do lugar. Medido: `location.hash =
  // 'contato'` deixava scrollY em 0, enquanto `scrollIntoView` levava a 17292.
  //
  // Um listener no documento cobre todos os links de âncora do site de uma vez,
  // sem precisar tocar em cada componente. O respiro do header fixo vem do
  // `scroll-margin-top` em styles.css.
  useEffect(() => {
    const aoClicar = (evento: MouseEvent) => {
      // deixa passar clique com modificador (abrir em nova aba) e botão do meio
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const alvoClicado = evento.target as HTMLElement | null;
      const link = alvoClicado?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;

      const secao = document.getElementById(id);
      if (!secao) return;

      evento.preventDefault();

      // A URL é atualizada ANTES da rolagem, de propósito. Na ordem inversa, o
      // `replaceState` disparava a restauração de scroll do router no meio da
      // rolagem suave e a cancelava — a página voltava para o topo.
      history.replaceState(null, "", `#${id}`);

      secao.scrollIntoView({
        behavior: reduzirMovimento ? "auto" : "smooth",
        block: "start",
      });
    };

    // Fase de CAPTURA (o `true` no fim). Na fase de bolha o handler nunca era
    // chamado — algo entre o link e o document interrompe a propagação do
    // clique. Testado: idêntico handler em bolha não dispara; em captura, sim.
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, [reduzirMovimento]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // overflow-x-hidden, não overflow-hidden.
  //
  // O `overflow: hidden` existia para cortar os blobs decorativos que vazam na
  // horizontal. Mas ele cria contêiner de clipping nos DOIS eixos, e isso
  // quebrava a navegação por âncora: clicar em "Contato" mudava a URL para
  // #contato e a página não rolava — o alvo ficava dentro de um contêiner que o
  // navegador não consegue rolar. Confirmado em teste: scrollY seguia 0 com o
  // alvo a 29.929px de distância.
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f4f0] text-zinc-950">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
      >
        Pular para o conteúdo
      </a>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-0.5 origin-left bg-red-500"
        style={{ scaleX }}
      />
      <Header />
      {children}
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
