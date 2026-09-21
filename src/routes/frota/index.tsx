import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { CATEGORIAS_FROTA, FROTA } from "@/data/frota";
import { breadcrumbSchema } from "@/lib/schema";

const URL_PAGINA = `${SITE_URL}/frota`;

export const Route = createFileRoute("/frota/")({
  head: () => ({
    meta: [
      { title: "Frota de Máquinas Pesadas | Grupo MV Construtora" },
      {
        name: "description",
        content:
          "Frota própria do Grupo MV Construtora, atuando no Maranhão, Pará, Piauí e Ceará: escavadeiras hidráulicas, pá-carregadeira, motoniveladora (patrol), rolo compactador, caminhão-pipa e caminhão prancha, com ou sem operador.",
      },
      { property: "og:title", content: "Frota de Máquinas Pesadas | Grupo MV Construtora" },
      { property: "og:url", content: URL_PAGINA },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Grupo MV Construtora" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
  component: FrotaIndex,
});

function FrotaIndex() {
  const [ativa, setAtiva] = useState<(typeof CATEGORIAS_FROTA)[number]>("Todos");

  const filtrada = useMemo(
    () => (ativa === "Todos" ? FROTA : FROTA.filter((m) => m.categoria === ativa)),
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
              ["Frota", "/frota"],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-20">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Frota" }]} />
          <div className="mt-8">
            <SectionTitle
              as="h1"
              eyebrow="Nossa frota"
              title="Máquinas pesadas próprias, revisadas e com operador."
            />
          </div>
          <p className="mt-8 max-w-2xl leading-7 text-concreto">
            A frota própria é o que permite mobilizar rápido e não depender de terceiros para
            manutenção. Conheça cada equipamento, para que ele serve e em quais serviços do Grupo MV
            Construtora ele entra.
          </p>
        </section>

        <section className="border-t border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS_FROTA.map((cat) => {
                const selecionada = ativa === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setAtiva(cat)}
                    aria-pressed={selecionada}
                    className={`border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      selecionada
                        ? "border-mv bg-mv text-white"
                        : "border-borda bg-white text-concreto hover:border-grafite hover:text-grafite"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtrada.map((maquina) => (
                <Link
                  key={maquina.slug}
                  to="/frota/$slug"
                  params={{ slug: maquina.slug }}
                  className="group overflow-hidden border border-borda bg-white transition-colors hover:border-mv"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={maquina.imgs[0]}
                      alt={`${maquina.nome} da frota do Grupo MV Construtora em operação`}
                      width={1600}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mv-escuro">
                      {maquina.categoria}
                    </span>
                    <h2 className="mt-2 text-lg font-semibold text-grafite">{maquina.nome}</h2>
                    <p className="mt-2 text-sm leading-6 text-concreto">{maquina.resumo}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                      Ver equipamento <ArrowRight size={16} />
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
