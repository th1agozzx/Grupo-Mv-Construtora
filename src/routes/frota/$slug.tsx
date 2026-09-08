import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTAButton } from "@/components/site/CTAButton";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL, waLink } from "@/config/empresa";
import { FROTA } from "@/data/frota";
import { SERVICOS } from "@/data/servicos";
import { breadcrumbSchema, faqSchema, maquinaSchema } from "@/lib/schema";

export const Route = createFileRoute("/frota/$slug")({
  loader: ({ params }) => {
    const maquina = FROTA.find((m) => m.slug === params.slug);
    if (!maquina) throw notFound();
    return { slug: maquina.slug };
  },
  head: ({ params }) => {
    const maquina = FROTA.find((m) => m.slug === params.slug);
    if (!maquina) return {};

    const url = `${SITE_URL}/frota/${maquina.slug}`;
    return {
      meta: [
        { title: `${maquina.h1} | MV Construtora` },
        { name: "description", content: maquina.intro.slice(0, 158) },
        { property: "og:title", content: `${maquina.h1} | MV Construtora` },
        { property: "og:description", content: maquina.resumo },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "MV Construtora" },
        { name: "geo.region", content: "BR-MA" },
        { name: "geo.placename", content: "Pindaré-Mirim" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PaginaMaquina,
});

function PaginaMaquina() {
  const { slug } = Route.useParams();
  const maquina = FROTA.find((m) => m.slug === slug);
  const [foto, setFoto] = useState(0);
  const [aberta, setAberta] = useState(0);

  if (!maquina) return null;

  // Vínculo máquina -> serviços, a partir dos slugs declarados em src/data/frota.ts
  const servicos = SERVICOS.filter((s) => maquina.servicos.includes(s.slug));
  const outras = FROTA.filter((m) => m.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(maquinaSchema(maquina)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(maquina.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Frota", "/frota"],
              [maquina.nome, `/frota/${maquina.slug}`],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-[76px]">
        {/* ABERTURA + GALERIA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs
            itens={[
              { rotulo: "Início", para: "/" },
              { rotulo: "Frota", para: "/frota" },
              { rotulo: maquina.nome },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionTitle as="h1" eyebrow={maquina.categoria} title={maquina.h1} />
              <p className="mt-7 text-lg leading-8 text-zinc-700">{maquina.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton
                  href={waLink(
                    `Olá! Gostaria de um orçamento de locação de ${maquina.nome.toLowerCase()} com a MV Construtora.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Solicitar este equipamento
                </CTAButton>
              </div>
            </div>

            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-zinc-900">
                <img
                  src={maquina.imgs[foto]}
                  alt={`${maquina.nome} da MV Construtora — foto ${foto + 1} de ${maquina.imgs.length}`}
                  width={1600}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              {maquina.imgs.length > 1 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {maquina.imgs.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setFoto(i)}
                      aria-label={`Ver foto ${i + 1} de ${maquina.nome}`}
                      aria-current={i === foto}
                      className={`h-16 w-20 overflow-hidden rounded-sm border-2 transition-opacity ${
                        i === foto
                          ? "border-red-600"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* APLICAÇÕES */}
        <section className="border-y border-zinc-300 bg-white/40 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Para que serve {maquina.nome.toLowerCase()}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {maquina.aplicacoes.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7 text-zinc-700">
                  <BadgeCheck size={20} className="mt-1 shrink-0 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVIÇOS EM QUE ESTA MÁQUINA ENTRA — vínculo máquina -> serviço */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Serviços que executamos com {maquina.nome.toLowerCase()}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-600">
            Este equipamento entra em {servicos.length}{" "}
            {servicos.length === 1 ? "frente de atuação" : "frentes de atuação"} da MV Construtora.
            Você pode contratar o serviço completo ou apenas a locação da máquina.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map((servico) => (
              <Link
                key={servico.slug}
                to="/servicos/$slug"
                params={{ slug: servico.slug }}
                className="group border-t-2 border-zinc-950 pt-5"
              >
                <servico.icon size={26} strokeWidth={1.6} className="text-red-500" />
                <h3 className="mt-4 text-lg font-semibold group-hover:text-red-700">
                  {servico.nome}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{servico.resumo}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                  Ver serviço <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ DA MÁQUINA */}
        <section className="border-y border-zinc-300 bg-white/40 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Perguntas frequentes sobre {maquina.nome.toLowerCase()}
            </h2>
            <div className="mt-10 border-t border-zinc-300">
              {maquina.faqs.map(([pergunta, resposta], i) => (
                <div key={pergunta} className="border-b border-zinc-300">
                  <button
                    onClick={() => setAberta(aberta === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold"
                    aria-expanded={aberta === i}
                  >
                    <span>{pergunta}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform ${aberta === i ? "rotate-180 text-red-500" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${aberta === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pr-10 leading-7 text-zinc-600">{resposta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTRAS MÁQUINAS */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Outros equipamentos da frota
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {outras.map((outra) => (
              <Link
                key={outra.slug}
                to="/frota/$slug"
                params={{ slug: outra.slug }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-zinc-200">
                  <img
                    src={outra.imgs[0]}
                    alt={`${outra.nome} da frota da MV Construtora`}
                    width={1600}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-red-700">
                  {outra.nome}
                </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{outra.resumo}</p>
              </Link>
            ))}
          </div>
          <Link
            to="/frota"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Ver a frota completa <ArrowRight size={16} />
          </Link>
        </section>

        <CtaFinal servico={`locação de ${maquina.nome.toLowerCase()}`} />
      </main>
    </>
  );
}
