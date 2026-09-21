import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { SITE_BASE_PATH } from "@/config/navegacao";
import { maquinasDoServico } from "@/data/frota";
import { SERVICOS } from "@/data/servicos";
import { REGIOES, ESTADOS_TEXTO, cidadesDoEstado } from "@/data/regioes";
import { breadcrumbSchema, faqSchema, servicoSchema } from "@/lib/schema";

/**
 * Uma rota dinâmica cobre as 10 categorias. O slug é validado contra SERVICOS:
 * slug inventado devolve 404 de verdade, em vez de virar página vazia indexável.
 */
export const Route = createFileRoute("/servicos/$slug")({
  loader: ({ params }) => {
    const servico = SERVICOS.find((s) => s.slug === params.slug);
    if (!servico) throw notFound();
    return { slug: servico.slug };
  },
  head: ({ params }) => {
    const servico = SERVICOS.find((s) => s.slug === params.slug);
    if (!servico) return {};

    const url = `${SITE_URL}/servicos/${servico.slug}`;
    return {
      meta: [
        { title: `${servico.h1} | Grupo MV Construtora` },
        { name: "description", content: servico.descricao.slice(0, 158) },
        { property: "og:title", content: `${servico.h1} | Grupo MV Construtora` },
        { property: "og:description", content: servico.resumo },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "Grupo MV Construtora" },
        { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
        { name: "geo.region", content: "BR-MA" },
        { name: "geo.placename", content: "Pindaré-Mirim" },
      ],
      // Canonical próprio por página. Se todas apontassem para a home, o Google
      // desindexaria todas menos a home.
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PaginaServico,
});

function PaginaServico() {
  const { slug } = Route.useParams();
  const servico = SERVICOS.find((s) => s.slug === slug);
  const [aberta, setAberta] = useState(0);

  if (!servico) return null;

  const relacionados = SERVICOS.filter((s) => s.slug !== slug).slice(0, 3);
  // Vínculo serviço -> máquinas. A lista sai de src/data/frota.ts, onde cada
  // máquina declara em quais serviços entra — não existe segunda lista para divergir.
  const maquinas = maquinasDoServico(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicoSchema(servico)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(servico.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Serviços", "/servicos"],
              [servico.nome, `/servicos/${servico.slug}`],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-20">
        {/* ABERTURA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
          <Breadcrumbs
            itens={[
              { rotulo: "Início", para: "/" },
              { rotulo: "Serviços", para: "/servicos" },
              { rotulo: servico.nome },
            ]}
          />
          <div className="mt-8">
            <SectionTitle as="h1" eyebrow={servico.nome} title={servico.h1} />
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-concreto">{servico.intro}</p>
        </section>

        {/* O QUE ESTÁ INCLUSO */}
        <section className="border-y border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              O que está incluso em {servico.nome.toLowerCase()}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {servico.itens.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7 text-concreto">
                  <BadgeCheck size={20} className="mt-1 shrink-0 text-mv" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Como funciona a contratação
          </h2>
          <ol className="mt-10 grid gap-8 border-t border-borda pt-10 lg:grid-cols-5">
            {servico.etapas.map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="font-mono text-xs text-concreto">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-concreto">{texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                O que considerar em {servico.nome.toLowerCase()} no Maranhão
              </h2>
              <p className="mt-5 leading-8 text-concreto">{servico.contexto}</p>
            </div>
            <div className="border-l-2 border-mv pl-6">
              <h2 className="text-xl font-semibold tracking-tight">Erros que encarecem a obra</h2>
              <ul className="mt-5 space-y-4 text-concreto">
                {servico.erros.map((erro) => (
                  <li key={erro} className="leading-7">
                    {erro}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* EQUIPAMENTOS USADOS — vínculo serviço -> máquina */}
        {maquinas.length > 0 && (
          <section className="border-b border-borda bg-areia py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Equipamentos usados em {servico.nome.toLowerCase()}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-concreto">
                Frota própria e revisada, com operador treinado. Clique no equipamento para ver as
                aplicações dele — ou fale conosco para locação avulsa.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {maquinas.map((maquina) => (
                  <Link
                    key={maquina.slug}
                    to="/frota/$slug"
                    params={{ slug: maquina.slug }}
                    className="group overflow-hidden border border-borda bg-white transition-colors hover:border-mv"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={maquina.imgs[0]}
                        alt={`${maquina.nome} usada pelo Grupo MV Construtora em ${servico.nome.toLowerCase()}`}
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
                      <h3 className="mt-1 text-lg font-semibold group-hover:text-mv-escuro">
                        {maquina.nome}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-concreto">{maquina.resumo}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                        Ver equipamento <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/frota"
                className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
              >
                Ver a frota completa <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        {/* ONDE ATENDEMOS */}
        <section className="border-y border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Onde executamos {servico.nome.toLowerCase()}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-concreto">
              Com base em Pindaré-Mirim (MA), no Vale do Pindaré, mobilizamos máquinas e equipes
              para obras no {ESTADOS_TEXTO} — de pequenas cidades do interior às capitais.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {REGIOES.flatMap((regiao) =>
                cidadesDoEstado(regiao).map((cidade) => (
                  <li
                    key={`${regiao.uf}-${cidade}`}
                    className="border border-borda bg-white px-4 py-2 text-[13px] text-concreto"
                  >
                    {cidade} - {regiao.uf}
                  </li>
                )),
              )}
            </ul>
            <a
              href={`${SITE_BASE_PATH}#area-de-atuacao`}
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
            >
              Ver a área de atuação completa <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* FAQ DO SERVIÇO */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Perguntas frequentes sobre {servico.nome.toLowerCase()}
          </h2>
          <div className="mt-10 border-t border-borda">
            {servico.faqs.map(([pergunta, resposta], i) => (
              <div key={pergunta} className="border-b border-borda">
                <button
                  onClick={() => setAberta(aberta === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold"
                  aria-expanded={aberta === i}
                >
                  <span>{pergunta}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform ${aberta === i ? "rotate-180 text-mv" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${aberta === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                >
                  <p className="overflow-hidden pr-10 leading-7 text-concreto">{resposta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVIÇOS RELACIONADOS */}
        <section className="border-t border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Outros serviços do Grupo MV Construtora
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {relacionados.map((outro) => (
                <Link
                  key={outro.slug}
                  to="/servicos/$slug"
                  params={{ slug: outro.slug }}
                  className="group border-t-2 border-grafite pt-5"
                >
                  <outro.icon size={26} strokeWidth={1.6} className="text-mv" />
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-mv-escuro">
                    {outro.nome}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-concreto">{outro.resumo}</p>
                </Link>
              ))}
            </div>
            <Link
              to="/servicos"
              className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
            >
              Ver todos os 10 serviços <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <CtaFinal servico={servico.nome} />
      </main>
    </>
  );
}
