export type PostBlog = {
  slug: string;
  titulo: string;
  descricao: string;
  publicadoEm: string;
  atualizadoEm: string;
  autor: string;
  servicos: string[];
  imagem: string;
  conteudo: string;
};

type Frontmatter = Omit<PostBlog, "slug" | "conteudo" | "servicos"> & { servicos: string };

const arquivos = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const IMAGENS_POSTS: Record<string, string> = {
  "quanto-custa-terraplenagem-maranhao": fotodaobra,
  "terraplenagem-ou-terraplanagem": tresEscavadeiras,
  "maquina-para-cada-etapa-da-terraplenagem": escavadeira,
  "escavadeira-pa-carregadeira-ou-retroescavadeira": escavadeira,
  "quanto-tempo-para-terraplanar-terreno": rolo,
  "licencas-para-terraplenagem-maranhao": fotodaobra,
  "como-preparar-solo-para-plantio": patrol,
  "recuperacao-de-estradas-vicinais": patrol,
  "locacao-com-ou-sem-operador": caminhao,
  "erros-que-encarecem-terraplenagem": caminhaopipa,
};

function lerPost(caminho: string, arquivo: string): PostBlog {
  const encontrado = arquivo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!encontrado) throw new Error(`Post sem frontmatter válido: ${caminho}`);

  const campos = Object.fromEntries(
    encontrado[1]
      .split(/\r?\n/)
      .filter(Boolean)
      .map((linha) => {
        const indice = linha.indexOf(":");
        return [
          linha.slice(0, indice).trim(),
          linha
            .slice(indice + 1)
            .trim()
            .replace(/^"|"$/g, ""),
        ];
      }),
  ) as Frontmatter;

  const obrigatorios: (keyof Frontmatter)[] = [
    "titulo",
    "descricao",
    "publicadoEm",
    "atualizadoEm",
    "autor",
    "servicos",
  ];
  if (obrigatorios.some((campo) => !campos[campo])) {
    throw new Error(`Frontmatter incompleto: ${caminho}`);
  }

  const slug = caminho.split("/").pop()!.replace(/\.md$/, "");
  return {
    slug,
    titulo: campos.titulo,
    descricao: campos.descricao,
    publicadoEm: campos.publicadoEm,
    atualizadoEm: campos.atualizadoEm,
    autor: campos.autor,
    servicos: campos.servicos.split(",").map((servico) => servico.trim()),
    imagem: IMAGENS_POSTS[slug] ?? fotodaobra,
    conteudo: encontrado[2].trim(),
  };
}

export const POSTS_BLOG = Object.entries(arquivos)
  .map(([caminho, arquivo]) => lerPost(caminho, arquivo))
  .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

export const postPorSlug = (slug: string) => POSTS_BLOG.find((post) => post.slug === slug);
import caminhao from "@/assets/otimizadas/caminhao.webp";
import caminhaopipa from "@/assets/otimizadas/caminhaopipa.webp";
import escavadeira from "@/assets/otimizadas/escavadeira1.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import patrol from "@/assets/otimizadas/patrol.webp";
import rolo from "@/assets/otimizadas/rolocompactador.webp";
import tresEscavadeiras from "@/assets/otimizadas/tresescavadeiras1.webp";
