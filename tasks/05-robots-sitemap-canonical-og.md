# 05 — robots.txt, sitemap.xml, canonical e og:image

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1
- **Esforço:** 1-2 h
- **Impacto:** 🟠 Alto (o `robots.txt` tem impacto direto sobre IA)
- **Depende de:** task 02 (para gerar a og:image otimizada)

> **STATUS (02/09/2026 — implementado)**
> ✅ `public/robots.txt` criado, com `Google-Extended`, `GPTBot`, `OAI-SearchBot`, `PerplexityBot` e `ClaudeBot` liberados.
> ✅ `public/sitemap.xml` criado.
> ✅ `<link rel="canonical">`, `og:url`, `og:locale`, `og:site_name`, `og:image` e `geo.*` adicionados.
> ⏳ **PENDENTE:** criar a imagem `public/og-image.jpg` (1200×630). Hoje a meta tag aponta para um arquivo que ainda não existe.
> ⏳ **PENDENTE:** decidir sobre o `rewrites` morto no `vercel.json` (passo 5).

---

## Problema

Quatro itens básicos de indexação estão ausentes.

### Evidência

```bash
curl -sI https://www.grupomvconstrutora.com.br/robots.txt   # 404
curl -sI https://www.grupomvconstrutora.com.br/sitemap.xml  # 404
```

No `<head>` servido em produção **não existe**:

- `<link rel="canonical">`
- `<meta property="og:image">`
- `<meta property="og:url">`
- `<meta property="og:locale">`
- `<meta property="og:site_name">`

E existe `<meta name="twitter:card" content="summary_large_image">`
(`src/routes/index.tsx:96`) **sem imagem nenhuma** — ou seja, todo
compartilhamento sai com um card grande e vazio.

Para uma empresa que vende por WhatsApp, esse é um prejuízo direto e visível.

### O que já está certo (não mexer)

- O apex redireciona 308 para `www` — correto, host canônico definido.
- Arquivos em `public/` são servidos normalmente (testado com `/favicon.ico`).
- Rota inexistente retorna **404 de verdade** (não soft-404).
- Assets versionados vêm com `Cache-Control: public, max-age=31536000, immutable`.

---

## Passos

### 1. `public/robots.txt`

```
User-agent: *
Allow: /

# Crawlers de IA — liberados propositalmente para que a MV Construtora
# possa ser citada em respostas de IA (Gemini, AI Overviews, ChatGPT, etc.)
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://www.grupomvconstrutora.com.br/sitemap.xml
```

> **`Google-Extended` é o ponto crítico desta task.** É o token que autoriza o
> Google a usar o conteúdo do site nas respostas do Gemini e do AI Overviews.
> Sem ele explícito, o conteúdo pode ser excluído dessas respostas mesmo estando
> indexado na busca tradicional.

### 2. `public/sitemap.xml`

Enquanto houver só a home:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.grupomvconstrutora.com.br/</loc>
    <lastmod>2026-09-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Depois da task 08, adicionar uma `<url>` por página de serviço. Vale automatizar
a geração no build para o `lastmod` não ficar desatualizado.

### 3. Canonical e Open Graph completos

Em `src/routes/__root.tsx` (o `head` do root, linha ~85) ou no `head` da rota:

```ts
meta: [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { property: "og:url", content: "https://www.grupomvconstrutora.com.br/" },
  { property: "og:site_name", content: "MV Construtora" },
  { property: "og:locale", content: "pt_BR" },
  { property: "og:image", content: "https://www.grupomvconstrutora.com.br/og-image.jpg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "MV Construtora — terraplenagem e locação de máquinas no Maranhão" },
  { name: "twitter:image", content: "https://www.grupomvconstrutora.com.br/og-image.jpg" },
  { name: "geo.region", content: "BR-MA" },
  { name: "geo.placename", content: "Pindaré-Mirim" },
],
links: [
  { rel: "canonical", href: "https://www.grupomvconstrutora.com.br/" },
  // ...os links já existentes
],
```

> Nas páginas internas (task 08), o canonical precisa apontar para a **própria
> URL** da página, não para a home. Canonical errado tira a página do índice.

### 4. Criar a imagem `public/og-image.jpg`

- 1200 × 630 px, JPG ou WebP, abaixo de 300 KB.
- Conteúdo sugerido: foto de máquina em operação + logo + a frase
  "Terraplenagem e Locação de Máquinas — Maranhão".
- Texto grande: o card aparece pequeno no feed do WhatsApp.

### 5. Revisar o `vercel.json`

O arquivo atual é:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Isso é um fallback de SPA. O projeto é **SSR** (TanStack Start) — o teste mostra
que a regra não está sendo aplicada literalmente (uma rota inexistente retorna 404
do app, e não a home). Ou seja: é configuração morta e enganosa.

Risco: quando a task 08 criar rotas reais (`/terraplenagem-maranhao` etc.), essa
regra pode passar a interferir. Sugestão: remover o `rewrites` e testar; se as
rotas continuarem funcionando (devem continuar, é SSR), deixar removido.

Testar em **preview deploy** antes de mandar para produção.

---

## Critério de aceite

- [ ] `robots.txt` retorna **200** com `Content-Type: text/plain`.
- [ ] `sitemap.xml` retorna **200** e valida como XML.
- [ ] `robots.txt` declara a URL do sitemap.
- [ ] `Google-Extended` explicitamente permitido.
- [ ] `<link rel="canonical">` presente e apontando para a URL com `www`.
- [ ] `og:image` presente, retornando 200, com 1200×630.
- [ ] Compartilhar o link no WhatsApp e ver o card com imagem.
- [ ] Sitemap enviado no Search Console (task 06).

## Validação

```bash
curl -sI https://www.grupomvconstrutora.com.br/robots.txt | head -3
curl -sI https://www.grupomvconstrutora.com.br/sitemap.xml | head -3
curl -s https://www.grupomvconstrutora.com.br/ | grep -ao 'rel="canonical"[^>]*'
curl -s https://www.grupomvconstrutora.com.br/ | grep -ao 'og:image[^>]*'
curl -sI https://www.grupomvconstrutora.com.br/og-image.jpg | head -3
```

Validar o card em [opengraph.xyz](https://www.opengraph.xyz/) ou no
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
