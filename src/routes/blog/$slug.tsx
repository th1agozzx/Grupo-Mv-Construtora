import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ConteudoMarkdown } from "@/components/site/ConteudoMarkdown";
import { CtaFinal } from "@/components/site/CtaFinal";
import { SITE_URL } from "@/config/empresa";
import { postPorSlug } from "@/data/blog";
import { SERVICOS } from "@/data/servicos";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!postPorSlug(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const post = postPorSlug(params.slug);
    if (!post) return {};
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.titulo} | Grupo MV Construtora` },
        { name: "description", content: post.descricao },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Post,
});

function Post() {
  const post = postPorSlug(Route.useParams().slug);
  if (!post) return null;
  const relacionados = SERVICOS.filter((servico) => post.servicos.includes(servico.slug));
  const data = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Inicio", "/"],
              ["Blog", "/blog"],
              [post.titulo, `/blog/${post.slug}`],
            ]),
          ),
        }}
      />
      <main id="conteudo" className="pt-20">
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs
            itens={[
              { rotulo: "Inicio", para: "/" },
              { rotulo: "Blog", para: "/blog" },
              { rotulo: post.titulo },
            ]}
          />
          <p className="mt-10 text-sm font-semibold uppercase tracking-[.18em] text-mv-escuro">
            Guia de obra
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
            {post.titulo}
          </h1>
          <p className="mt-6 text-xl leading-8 text-concreto">{post.descricao}</p>
          <p className="mt-5 text-sm text-concreto">
            Publicado em {data.format(new Date(`${post.publicadoEm}T12:00:00`))} · Atualizado em{" "}
            {data.format(new Date(`${post.atualizadoEm}T12:00:00`))}
          </p>
          <img
            src={post.imagem}
            alt="Maquinas do Grupo MV Construtora em operacao"
            width={1600}
            height={1067}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="mt-8 aspect-video w-full object-cover"
          />
          <ConteudoMarkdown conteudo={post.conteudo} />
          {relacionados.length > 0 && (
            <aside className="mt-14 border-t-2 border-grafite pt-7">
              <h2 className="text-2xl font-semibold">Servicos relacionados</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relacionados.map((servico) => (
                  <Link
                    key={servico.slug}
                    to="/servicos/$slug"
                    params={{ slug: servico.slug }}
                    className="group border border-borda p-5 hover:border-mv"
                  >
                    <h3 className="font-semibold group-hover:text-mv-escuro">{servico.nome}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                      Ver servico <ArrowRight size={16} />
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
        <CtaFinal />
      </main>
    </>
  );
}
