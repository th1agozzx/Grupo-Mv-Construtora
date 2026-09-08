// Gera o sitemap a partir das fontes de dados e dos posts versionados.
// Assim, uma rota de serviço, frota ou blog não depende de uma lista manual paralela.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://www.grupomvconstrutora.com.br";
const hoje = new Date().toISOString().slice(0, 10);

const lerSlugs = async (arquivo) => {
  const fonte = await readFile(path.join(raiz, arquivo), "utf8");
  return [...fonte.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((resultado) => resultado[1]);
};

const lerPosts = async () => {
  const diretorio = path.join(raiz, "src/content/blog");
  const arquivos = await readdir(diretorio, { withFileTypes: true });
  return Promise.all(
    arquivos
      .filter((arquivo) => arquivo.isFile() && arquivo.name.endsWith(".md"))
      .map(async (arquivo) => {
        const conteudo = await readFile(path.join(diretorio, arquivo.name), "utf8");
        const atualizadoEm =
          conteudo.match(/^atualizadoEm:\s*(\d{4}-\d{2}-\d{2})\s*$/m)?.[1] ?? hoje;
        return { slug: arquivo.name.replace(/\.md$/, ""), atualizadoEm };
      }),
  );
};

const xmlUrl = (caminho, lastmod, changefreq, priority) => `  <url>
    <loc>${siteUrl}${caminho}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const [servicos, frota, posts] = await Promise.all([
  lerSlugs("src/data/servicos.ts"),
  lerSlugs("src/data/frota.ts"),
  lerPosts(),
]);

const urls = [
  xmlUrl("/", hoje, "weekly", "1.0"),
  xmlUrl("/servicos", hoje, "monthly", "0.9"),
  ...servicos.map((slug) => xmlUrl(`/servicos/${slug}`, hoje, "monthly", "0.8")),
  xmlUrl("/frota", hoje, "monthly", "0.9"),
  ...frota.map((slug) => xmlUrl(`/frota/${slug}`, hoje, "monthly", "0.8")),
  xmlUrl("/blog", hoje, "weekly", "0.8"),
  ...posts.map((post) => xmlUrl(`/blog/${post.slug}`, post.atualizadoEm, "monthly", "0.7")),
  xmlUrl("/politica-de-privacidade", hoje, "yearly", "0.3"),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

await writeFile(path.join(raiz, "public/sitemap.xml"), sitemap, "utf8");
console.log(`[sitemap] ${urls.length} URLs geradas`);
