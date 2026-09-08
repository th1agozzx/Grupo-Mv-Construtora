import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { SERVICOS } from "@/data/servicos";
import { breadcrumbSchema } from "@/lib/schema";

const URL_PAGINA = `${SITE_URL}/servicos`;

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    meta: [
      { title: "Serviços | MV Construtora — Terraplenagem e Obras em MA, PI e CE" },
      {
        name: "description",
        content:
          "As 10 frentes de atuação da MV Construtora no Maranhão, Piauí e Ceará: terraplenagem, infraestrutura viária, obras civis, drenagem, limpeza de áreas, locação de máquinas, transporte, Munck, apoio a grandes obras e serviços rurais.",
      },
      { property: "og:title", content: "Serviços da MV Construtora — MA, PI e CE" },
      { property: "og:url", content: URL_PAGINA },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "MV Construtora" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
  component: ServicosIndex,
});

function ServicosIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Serviços", "/servicos"],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-[76px]">
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
          <Breadcrumbs itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Serviços" }]} />
          <div className="mt-8">
            <SectionTitle
              as="h1"
              eyebrow="O que fazemos"
              title="Serviços de terraplenagem, obras e locação de máquinas no Nordeste."
            />
          </div>
          <p className="mt-7 max-w-2xl leading-7 text-zinc-600">
            A MV Construtora atua em dez frentes complementares, da preparação do terreno à entrega
            da obra. Com base em Pindaré-Mirim, mobilizamos máquinas, equipamentos e equipes para
            obras públicas e privadas no Maranhão, Piauí e Ceará.
          </p>
        </section>

        <section className="border-t border-zinc-300">
          <div className="mx-auto grid max-w-7xl px-5 sm:px-8 lg:grid-cols-2">
            {SERVICOS.map((servico, i) => (
              <Link
                key={servico.slug}
                to="/servicos/$slug"
                params={{ slug: servico.slug }}
                className="group border-b border-zinc-300 py-10 lg:odd:border-r lg:odd:pr-10 lg:even:pl-10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <servico.icon
                    className="text-red-500 transition-transform duration-300 group-hover:-translate-y-1"
                    size={31}
                    strokeWidth={1.6}
                  />
                  <span className="font-mono text-xs text-zinc-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight group-hover:text-red-700">
                  {servico.nome}
                </h2>
                <p className="mt-4 max-w-md leading-7 text-zinc-600">{servico.resumo}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                  Ver detalhes <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <CtaFinal />
      </main>
    </>
  );
}
