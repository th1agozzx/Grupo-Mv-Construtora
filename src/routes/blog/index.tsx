import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Revelar, RevelarGrade } from "@/components/site/Revelar";
import { revealEscala } from "@/components/site/animacoes";
import { SectionTitle } from "@/components/site/SectionTitle";
import { SITE_URL } from "@/config/empresa";
import { POSTS_BLOG } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog de Terraplenagem e Obras no Maranhão | MV Construtora" },
      {
        name: "description",
        content:
          "Conteúdos práticos sobre terraplenagem, máquinas pesadas, estradas e planejamento de obras no Maranhão.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <main id="conteudo" className="pt-20">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
        <Breadcrumbs itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Blog" }]} />
        <div className="mt-8">
          <SectionTitle
            as="h1"
            eyebrow="Central de conhecimento"
            title="Obra bem planejada começa com informação clara."
          />
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-concreto">
          Guias diretos sobre terraplenagem, infraestrutura e locação de máquinas para quem precisa
          decidir melhor antes de mobilizar uma obra no Maranhão.
        </p>
        <RevelarGrade intervalo={0.1} className="mt-14 grid gap-8 md:grid-cols-2">
          {POSTS_BLOG.map((post) => (
            <Revelar
              filho
              as="article"
              key={post.slug}
              variantes={revealEscala}
              className="group overflow-hidden border border-borda bg-white transition-colors hover:border-mv"
            >
              <img
                src={post.imagem}
                alt="Máquinas e equipes da MV Construtora em obra"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="aspect-[16/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-mv-escuro">
                  {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
                    new Date(`${post.publicadoEm}T12:00:00`),
                  )}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="hover:text-mv-escuro"
                  >
                    {post.titulo}
                  </Link>
                </h2>
                <p className="mt-4 leading-7 text-concreto">{post.descricao}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
                >
                  Ler artigo <ArrowRight size={16} />
                </Link>
              </div>
            </Revelar>
          ))}
        </RevelarGrade>
      </section>
    </main>
  );
}
