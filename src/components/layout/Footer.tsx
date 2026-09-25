import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";

import logomv from "@/assets/otimizadas/logomv.webp";
import { EMPRESA, waLink } from "@/config/empresa";
import { MENU_COMPLETO, hrefAbsoluto } from "@/config/navegacao";
import { SERVICOS } from "@/data/servicos";
import { YOUTUBE_CANAL } from "@/data/videos";

export function Footer() {
  const naHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const href = (h: string) => hrefAbsoluto(h, naHome);

  return (
    <footer className="border-t border-borda bg-areia text-concreto">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <img
            src={logomv}
            alt="Grupo MV Construtora"
            width={320}
            height={100}
            loading="lazy"
            decoding="async"
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-6">
            Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas
            pesadas no Maranhão, no Pará, no Piauí e no Ceará, com produtividade e confiança desde
            2011.
          </p>
        </div>

        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-grafite">
            Serviços
          </p>
          {SERVICOS.map((servico) => (
            <Link
              key={servico.slug}
              to="/servicos/$slug"
              params={{ slug: servico.slug }}
              className="mb-3 block text-sm hover:text-mv"
            >
              {servico.nome}
            </Link>
          ))}
        </div>

        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-grafite">
            Navegação
          </p>
          <Link to="/servicos" className="mb-3 block text-sm hover:text-mv">
            Todos os serviços
          </Link>
          <Link to="/frota" className="mb-3 block text-sm hover:text-mv">
            Frota completa
          </Link>
          {MENU_COMPLETO.map((item) => (
            <a key={item.href} href={href(item.href)} className="mb-3 block text-sm hover:text-mv">
              {item.rotulo}
            </a>
          ))}
        </div>

        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-grafite">
            Contato
          </p>
          <a href={`mailto:${EMPRESA.email}`} className="mb-3 block text-sm hover:text-mv">
            {EMPRESA.email}
          </a>
          <a
            href={waLink("Olá! Vim pelo site do Grupo MV Construtora e gostaria de mais informações.")}
            target="_blank"
            rel="noreferrer"
            className="mb-3 block text-sm hover:text-mv"
          >
            WhatsApp: {EMPRESA.whatsappExibicao}
          </a>
          <a
            href={EMPRESA.instagramUrl}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${EMPRESA.instagramHandle} — Instagram do Grupo MV Construtora`}
            className="mb-3 flex items-center gap-2 text-sm hover:text-mv"
          >
            <Instagram size={16} /> {EMPRESA.instagramHandle}
          </a>
          <a
            href={YOUTUBE_CANAL}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="YouTube — canal do Grupo MV Construtora"
            className="mb-3 flex items-center gap-2 text-sm hover:text-mv"
          >
            <Youtube size={16} /> YouTube
          </a>
          <p className="mb-3 text-sm">CNPJ: {EMPRESA.cnpj}</p>
          <p className="text-sm">{EMPRESA.horario}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-borda px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Grupo MV Construtora. Todos os direitos reservados.</p>
        <Link to="/politica-de-privacidade" className="hover:text-grafite">
          Política de privacidade
        </Link>
      </div>
    </footer>
  );
}
