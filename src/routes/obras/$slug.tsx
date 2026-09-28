import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ChevronDown, Maximize2 } from "lucide-react";
import { useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Lightbox } from "@/components/site/Lightbox";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { OBRAS, resumoObra } from "@/data/obras";
import { SERVICOS } from "@/data/servicos";
import { breadcrumbSchema, faqSchema, obraSchema } from "@/lib/schema";

export const Route = createFileRoute("/obras/$slug")({
  loader: ({ params }) => {
    const obra = OBRAS.find((item) => item.slug === params.slug);
    if (!obra) throw notFound();
    return { slug: obra.slug };
  },
  head: ({ params }) => {
    const obra = OBRAS.find((item) => item.slug === params.slug);
    if (!obra) return {};

    const url = `${SITE_URL}/obras/${obra.slug}`;
    const resumo = resumoObra(obra);
    return {
      meta: [
        { title: `${obra.titulo} | Obras | Grupo MV Construtora` },
        { name: "description", content: resumo.slice(0, 158) },
        { property: "og:title", content: `${obra.titulo} | Grupo MV Construtora` },
        { property: "og:description", content: resumo },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "Grupo MV Construtora" },
        { property: "og:image", content: `${SITE_URL}${obra.imagens[0]}` },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PaginaObra,
});

function PaginaObra() {
  const { slug } = Route.useParams();
  const obra = OBRAS.find((item) => item.slug === slug);
  const [aberta, setAberta] = useState<number | null>(null);
  const [faqAberta, setFaqAberta] = useState(0);

  if (!obra) return null;

  const fichaTecnica = [
    ["Ano", obra.ano],
    ["Prazo", obra.prazo],
    ["Volume", obra.volume],
    ["Cliente", obra.cliente],
  ].flatMap(([rotulo, valor]) => (valor ? [{ rotulo, valor }] : []));
  const resumo = resumoObra(obra);
  const servicos = SERVICOS.filter((servico) => obra.servicos.includes(servico.slug));
  const fotos = obra.imagens.map((src) => ({ src, alt: obra.alt, legenda: obra.titulo }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(obraSchema({ ...obra, resumo })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Obras", "/obras"],
              [obra.titulo, `/obras/${obra.slug}`],
            ]),
          ),
        }}
      />
      {obra.faqs && obra.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(obra.faqs)) }}
        />
      )}

      <main id="conteudo" className="pt-20">
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs
            itens={[
              { rotulo: "Início", para: "/" },
              { rotulo: "Obras", para: "/obras" },
              { rotulo: obra.titulo },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionTitle as="h1" eyebrow={obra.categoria} title={obra.titulo} />
              <p className="mt-7 text-lg leading-8 text-concreto">{resumo}</p>
              {import.meta.env.DEV && obra.provisoria && (
                <p className="mt-6 border-l-4 border-mv bg-areia px-4 py-3 text-sm leading-6 text-grafite">
                  Ambiente de desenvolvimento: esta foto é genérica e deve ser substituída por uma
                  imagem confirmada pelo cliente antes da publicação.
                </p>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setAberta(0)}
                className="group relative block w-full overflow-hidden bg-chumbo text-left"
                aria-label={`Ampliar imagem de ${obra.titulo}`}
              >
                <img
                  src={obra.imagens[0]}
                  alt={obra.alt}
                  width={1600}
                  height={1200}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-0 left-0 inline-flex items-center gap-2 bg-mv px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  <Maximize2 size={14} /> Ampliar imagem
                </span>
              </button>
              {obra.imagens.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {obra.imagens.map((imagem, indice) => (
                    <button
                      key={imagem}
                      type="button"
                      onClick={() => setAberta(indice)}
                      className="aspect-[4/3] overflow-hidden border border-borda transition-colors hover:border-mv"
                      aria-label={`Ampliar foto ${indice + 1} de ${obra.titulo}`}
                    >
                      <img
                        src={imagem}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {fichaTecnica.length > 0 && (
          <section className="border-y border-borda bg-areia py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
                Ficha técnica
              </h2>
              <dl className="mt-8 grid gap-px border border-borda bg-borda sm:grid-cols-2 lg:grid-cols-4">
                {fichaTecnica.map(({ rotulo, valor }) => (
                  <div key={rotulo} className="bg-white p-5">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mv-escuro">
                      {rotulo}
                    </dt>
                    <dd className="mt-2 font-semibold text-grafite">{valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {((obra.descricao && obra.descricao.length > 0) ||
          (obra.escopo && obra.escopo.length > 0)) && (
          <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[3fr_2fr] lg:py-20">
            {obra.descricao && obra.descricao.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
                  Sobre a obra
                </h2>
                <div className="mt-6 space-y-5">
                  {obra.descricao.map((paragrafo) => (
                    <p key={paragrafo} className="leading-8 text-concreto">
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {obra.escopo && obra.escopo.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
                  Escopo informado
                </h2>
                <ul className="mt-6 space-y-4">
                  {obra.escopo.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7 text-concreto">
                      <BadgeCheck size={20} className="mt-1 shrink-0 text-mv" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {obra.etapas && obra.etapas.length > 0 && (
          <section className="border-y border-borda bg-areia py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
                Etapas de execução
              </h2>
              <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {obra.etapas.map(([titulo, texto], indice) => (
                  <li key={titulo} className="border-t-2 border-mv bg-white p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mv-escuro">
                      Etapa {String(indice + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-grafite">{titulo}</h3>
                    <p className="mt-2 text-sm leading-6 text-concreto">{texto}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {obra.faqs && obra.faqs.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
              Perguntas frequentes
            </h2>
            <div className="mt-10 border-t border-borda">
              {obra.faqs.map(([pergunta, resposta], i) => (
                <div key={pergunta} className="border-b border-borda">
                  <button
                    type="button"
                    onClick={() => setFaqAberta(faqAberta === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold text-grafite"
                    aria-expanded={faqAberta === i}
                  >
                    <span>{pergunta}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform ${faqAberta === i ? "rotate-180 text-mv" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${faqAberta === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pr-10 leading-7 text-concreto">{resposta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-y border-borda bg-areia py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-grafite sm:text-3xl">
              Serviços relacionados
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicos.map((servico) => (
                <Link
                  key={servico.slug}
                  to="/servicos/$slug"
                  params={{ slug: servico.slug }}
                  className="group border-t-2 border-grafite pt-5"
                >
                  <servico.icon size={26} strokeWidth={1.6} className="text-mv" />
                  <h3 className="mt-4 text-lg font-semibold text-grafite group-hover:text-mv-escuro">
                    {servico.nome}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-concreto">{servico.resumo}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                    Ver serviço <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Lightbox
        fotos={fotos}
        indice={aberta}
        aoFechar={() => setAberta(null)}
        aoTrocar={setAberta}
      />
    </>
  );
}
