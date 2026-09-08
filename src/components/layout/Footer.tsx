import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

import logomvbanner from "@/assets/otimizadas/logomvbanner.webp";
import { EMPRESA, waLink } from "@/config/empresa";
import { MENU_COMPLETO, hrefAbsoluto } from "@/config/navegacao";
import { SERVICOS } from "@/data/servicos";
import { YOUTUBE_CANAL } from "@/data/videos";

export function Footer() {
  const naHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const href = (h: string) => hrefAbsoluto(h, naHome);

  return (
    <footer className="bg-zinc-950 text-white/55">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <img
            src={logomvbanner}
            alt="MV Construtora"
            width={640}
            height={200}
            loading="lazy"
            decoding="async"
            className="h-25 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-6">
            Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas
            pesadas em todo o Maranhão, com produtividade e confiança desde 2011.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white">Serviços</p>
          {SERVICOS.map((servico) => (
            <Link
              key={servico.slug}
              to="/servicos/$slug"
              params={{ slug: servico.slug }}
              className="mb-3 block text-sm hover:text-red-400"
            >
              {servico.nome}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white">Navegação</p>
          <Link to="/servicos" className="mb-3 block text-sm hover:text-red-400">
            Todos os serviços
          </Link>
          <Link to="/frota" className="mb-3 block text-sm hover:text-red-400">
            Frota completa
          </Link>
          {MENU_COMPLETO.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className="mb-3 block text-sm hover:text-red-400"
            >
              {item.rotulo}
            </a>
          ))}
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-white">Contato</p>
          <a href={`mailto:${EMPRESA.email}`} className="mb-3 block text-sm hover:text-red-400">
            {EMPRESA.email}
          </a>
          <a
            href={waLink("Olá! Vim pelo site.")}
            target="_blank"
            rel="noreferrer"
            className="mb-3 block text-sm hover:text-red-400"
          >
            WhatsApp: {EMPRESA.whatsappExibicao}
          </a>
          <a
            href={EMPRESA.instagramUrl}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${EMPRESA.instagramHandle} — Instagram da MV Construtora`}
            className="mb-3 flex items-center gap-2 text-sm hover:text-red-400"
          >
            <Instagram size={16} /> {EMPRESA.instagramHandle}
          </a>
          <a
            href={YOUTUBE_CANAL}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="YouTube — canal da MV Construtora"
            className="mb-3 flex items-center gap-2 text-sm hover:text-red-400"
          >
            <Youtube size={16} /> YouTube
          </a>
          <p className="mb-3 text-sm">CNPJ: {EMPRESA.cnpj}</p>
          <p className="text-sm">{EMPRESA.horario}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} MV Construtora. Todos os direitos reservados.</p>
        <Link to="/politica-de-privacidade" className="hover:text-white">
          Política de privacidade
        </Link>
      </div>
    </footer>
  );
}
