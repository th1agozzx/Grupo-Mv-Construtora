import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import {
  CATEGORIAS_VISIVEIS,
  OBRAS,
  categoriaDoSlug,
  contarObras,
  resumoObra,
  slugCategoria,
} from "@/data/obras";
import { breadcrumbSchema } from "@/lib/schema";

const URL_PAGINA = `${SITE_URL}/obras`;

export const Route = createFileRoute("/obras/")({
  // O filtro vive no endereço: sobrevive ao "voltar" de uma obra e pode ser
  // compartilhado já filtrado. Valor desconhecido cai em "Todas".
  validateSearch: (search: Record<string, unknown>): { categoria?: string } => ({
    categoria:
      typeof search.categoria === "string" && categoriaDoSlug(search.categoria)
        ? search.categoria
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Obras Realizadas | Grupo MV Construtora — MA, PA, PI e CE" },
      {
        name: "description",
        content:
          "Conheça os registros de obras do Grupo MV Construtora em terraplenagem, infraestrutura viária, apoio operacional e propriedades rurais.",
      },
      { property: "og:title", content: "Obras | Grupo MV Construtora" },
      {
        property: "og:description",
        content:
          "Registros de obras de terraplenagem, infraestrutura viária, apoio operacional e propriedades rurais do Grupo MV Construtora.",
      },
      { property: "og:url", content: URL_PAGINA },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Grupo MV Construtora" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
  component: ObrasIndex,
});

function ObrasIndex() {
  const { categoria } = Route.useSearch();
  const ativa = categoriaDoSlug(categoria) ?? "Todas";
  const obras = useMemo(
    () => (ativa === "Todas" ? OBRAS : OBRAS.filter((obra) => obra.categoria === ativa)),
    [ativa],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Obras", "/obras"],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-20">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Obras" }]} />
          <div className="mt-8">
            <SectionTitle
              as="h1"
              eyebrow="Obras realizadas"
              title="Cada frente de trabalho tem seu próprio registro."
            />
          </div>
          <p className="mt-8 max-w-2xl leading-7 text-concreto">
            Consulte os registros de terraplenagem, infraestrutura viária, apoio operacional e
            propriedades rurais do Grupo MV Construtora. Em cada página, reunimos a galeria, o
            escopo informado e os serviços relacionados.
          </p>
        </section>

        <section className="border-y border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <nav aria-label="Filtrar obras por categoria" className="flex flex-wrap gap-2">
              {CATEGORIAS_VISIVEIS.map((opcao) => {
                const selecionada = ativa === opcao;
                return (
                  <Link
                    key={opcao}
                    to="/obras"
                    search={opcao === "Todas" ? {} : { categoria: slugCategoria(opcao) }}
                    replace
                    resetScroll={false}
                    aria-current={selecionada ? "true" : undefined}
                    className={`inline-flex items-center gap-2 border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      selecionada
                        ? "border-mv bg-mv text-white"
                        : "border-borda bg-white text-concreto hover:border-grafite hover:text-grafite"
                    }`}
                  >
                    {opcao}
                    <span
                      className={`font-mono text-[11px] ${selecionada ? "text-white/80" : "text-concreto/70"}`}
                    >
                      {contarObras(opcao)}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <p className="mt-6 text-sm text-concreto" aria-live="polite">
              {obras.length === 1 ? "1 obra" : `${obras.length} obras`}
              {ativa !== "Todas" && ` em ${ativa.toLocaleLowerCase("pt-BR")}`}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {obras.map((obra) => (
                <Link
                  key={obra.slug}
                  to="/obras/$slug"
                  params={{ slug: obra.slug }}
                  className="group border border-borda bg-white transition-colors hover:border-mv"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={obra.imagens[0]}
                      alt={obra.alt}
                      width={1600}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mv-escuro">
                      {obra.categoria}
                    </span>
                    <h2 className="mt-2 text-lg font-semibold text-grafite">{obra.titulo}</h2>
                    <p className="mt-2 text-sm leading-6 text-concreto">{resumoObra(obra)}</p>
                    {obra.local && <p className="mt-2 text-sm text-concreto">{obra.local}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                      Ver obra <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
    </>
  );
}
