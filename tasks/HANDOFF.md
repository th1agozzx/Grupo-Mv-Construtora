# Handoff — site MV Construtora

Contexto para continuar o trabalho. Última atualização: 04/09/2026.

---

## O projeto

Site institucional da **MV Construtora** (terraplenagem, obras civis e locação de
máquinas pesadas), sede em Pindaré-Mirim, Maranhão. Domínio:
`https://www.grupomvconstrutora.com.br`.

Stack: **TanStack Start** (React 19 + SSR) · Tailwind v4 · framer-motion · Vite ·
deploy na Vercel · projeto conectado ao **Lovable**.

### Objetivo do trabalho

1. Vencer as **outras empresas chamadas "MV Construtora"** no Google — a chave é
   ancorar a entidade geograficamente (antes o site não citava o estado nenhuma vez).
   Desde 04/09/2026 a área de atuação é **Maranhão, Piauí e Ceará**, com 47 cidades
   em `src/data/regioes.ts` (task 18).
2. Ser **legível por IA** (Gemini / AI Overviews): SSR + JSON-LD + perguntas
   respondidas de forma direta.
3. Performance: o site carregava **15,4 MB** com **LCP de 35,5 s** no mobile.

---

## Convenções já estabelecidas — siga

- **Código e comentários em português.** Comentário explica *por quê*, não *o quê*.
- **Fontes únicas de dados** em `src/data/`. Nada de segunda lista para divergir:
  - `servicos.ts` — 10 categorias de serviço
  - `frota.ts` — 6 máquinas; cada uma declara em `servicos: []` onde atua, e as
    páginas de serviço fazem a busca inversa com `maquinasDoServico()`
  - `videos.ts` — vídeos do YouTube
  - `regioes.ts` — estados e cidades atendidas (MA, PI, CE). **Não** recriar lista
    de cidades em outro arquivo: já houve duplicata em `servicos.ts`, removida.
- **Config** em `src/config/` (`empresa.ts`, `navegacao.ts`).
- **Layout compartilhado** em `src/components/layout/` (`SiteLayout` aplicado no
  `__root.tsx`) e `src/components/site/` (blocos reutilizáveis).
- **`CTAButton` usa `variante="primaria" | "escura" | "clara"`.** Nunca sobrescreva
  cor por `className`: base e sobrescrita têm a mesma especificidade e quem vence é
  a ordem do CSS gerado pelo Tailwind. Isso já causou um botão branco no branco.
- **Cada página** precisa de H1 único, canonical próprio e JSON-LD
  (`Service`/`FAQPage`/`BreadcrumbList`).
- **Conteúdo não pode ser duplicado entre páginas** — canibalização faz nenhuma
  ranquear. Cada serviço/máquina tem `intro` e `faqs` próprios.
- **Nunca inventar dado.** Nada de `AggregateRating` falso, número de obras
  estimado ou cidade onde a empresa não atende.

---

## Estado atual: 31 rotas

```
/                                  home (mantém as âncoras de seção)
/servicos                          índice
/servicos/$slug                    10 serviços
/frota                             índice com filtro por categoria
/frota/$slug                       6 máquinas
/blog                              índice
/blog/$slug                        10 posts (Markdown em src/content/blog/)
/politica-de-privacidade           LGPD
```

Slug inválido devolve 404 real (`notFound()` no loader).

### Já feito

| Item | Resultado |
|---|---|
| Imagens | 29 convertidas para WebP: **63,89 MB → 3,56 MB** (−94,4%). Script: `scripts/otimizar-imagens.mjs` |
| Carregamento inicial | imagens **12.966 KB → 137 KB**; vídeo **2.531 KB → 0 KB** |
| Vídeos | migrados para o YouTube (@GrupoMVConstrutora) com player *facade* — zero request antes do clique |
| SEO local | "Maranhão" **0 → 42** ocorrências; título, H1, endereço, FAQ, alt texts |
| JSON-LD | `GeneralContractor` + `WebSite` + `FAQPage` + `ItemList/VideoObject` na home; `Service` + `FAQPage` + `BreadcrumbList` nas internas |
| robots.txt / sitemap.xml | criados; sitemap com 20 URLs |
| Redes | Instagram e YouTube no `sameAs` e no rodapé |
| Refatoração | `index.tsx` **1.696 → ~1.030 linhas** |
| og-image | `public/og-image.jpg` (1200×630) — gerada por `scripts/gerar-og-image.mjs` |
| Formulário | trocado por **form → WhatsApp**: monta a mensagem e abre a conversa. Sem endpoint aberto, sem Resend |
| Headers | `vercel.json` com `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |
| "Quem somos" | reestruturado em H3 + `<p>` + `<ul>` (era tudo um `<p>` só com `<br>` e `*`) |

---

## Mudanças recentes (04/09/2026)

- **Área de atuação ampliada** para Maranhão, Piauí e Ceará — 3 estados e 47
  cidades, em três níveis (capital, polos regionais, cidades menores). Ver
  [task 18](18-area-de-atuacao-multiestado.md).
- **Dados do cartão CNPJ aplicados**: endereço `Rod. Pitombeira, s/n` e razão
  social `A R LEITE PEREIRA LTDA`, que entrou como `legalName` no schema.
- **Blog: os 9 posts que eram esboço foram escritos** — os 10 agora estão entre
  1.208 e 1.751 palavras, dentro da faixa da skill.
- **Acessibilidade 100** confirmada por Lighthouse no build de produção.
- **Animações não escondem mais conteúdo.** Usuários relataram seções em branco no
  celular. O HTML servido tinha **31 elementos com `opacity: 0`** (o framer
  serializa o estado `hidden` no SSR) — sem JS hidratado, blocos invisíveis. A
  opacidade saiu das animações de entrada; `hidden` agora é só `{ y: 24 }`, e o
  gatilho passou a disparar 25% antes da seção entrar na tela
  (`VIEWPORT_REVEAL` em `animacoes.ts`). Medido: 31 → 0.
  **Regra:** animação de entrada nunca deve gatilhar opacidade em conteúdo SSR.
- **Preview do GitHub Pages voltou a ter `noindex`** — a detecção agora usa
  `import.meta.env.BASE_URL !== "/"`, que o Vite sempre define. A versão anterior
  dependia de uma env var `VITE_*` que não chegava ao bundle, e o preview ficou
  publicável e indexável por um tempo.

### ⚠️ Armadilha: telefone e e-mail NÃO vêm do cartão CNPJ

O cartão traz `(98) 9197-2921` e `mvconstrutoraeimobiliaria@outlook.com` — dados de
cadastro na Receita. Numa passagem eles foram aplicados no site e **quebraram o
WhatsApp**: `559891972921` tem 12 dígitos, e celular no WhatsApp exige 13
(`55 + DDD + 9 + 8`). O botão principal de conversão parou de funcionar.

Os valores comerciais corretos são `(98) 99236-8928` (o mesmo cadastrado como Chat
no Google Meu Negócio) e `atendimento@grupomvconstrutora.com.br`. O telefone da
Receita ficou preservado em `EMPRESA.telefoneCadastroCnpj`.

## O que falta

### Concluído desde a versão anterior deste handoff

- **Acessibilidade (task 11): 100.** `useReveal()`, `revealSemMovimento`, os dois
  slideshows respeitando `prefers-reduced-motion`, foco visível global, contraste
  corrigido em `index.tsx` e em `frota/index.tsx`, `alt=""` no poster do vídeo e
  `aria-label` dos links sociais contendo o texto visível (WCAG 2.5.3).
- **Blog (task 16/17): completo.** 10 posts entre 1.208 e 1.751 palavras, rotas
  `/blog` e `/blog/$slug`, `Article` no JSON-LD, skill documentada em
  `.claude/skills/novo-post-blog/SKILL.md`, sitemap com 31 URLs.
- **`etapas` por serviço:** saiu de `servicos/$slug.tsx` (onde era idêntico nas 10
  páginas) para `src/data/servicos.ts`.

### Ainda aberto

**Conteúdo das páginas (task 08/14).** Medido em 04/09/2026:

| Página | Palavras | Meta |
|---|---|---|
| `/servicos/terraplanagem` | 846 | 800+ ✅ |
| `/servicos/drenagem` | 726 | ⚠️ |
| `/servicos/caminhao-munck` | 670 | ⚠️ |
| `/frota/escavadeira-hidraulica` | 566 | ⚠️ |
| `/frota/rolo-compactador` | 530 | ⚠️ |

As páginas de frota são as mais curtas. Sugestão de campos que rendem conteúdo
naturalmente diferenciado, sem encher linguiça: `contexto` (por que importa na
região — chuva, solo, distância) e `erros` (o que encarece a obra). Também falta
imagem nas páginas de serviço.

**Performance.** Última medição em build de produção servido localmente:
FCP 1,4 s · LCP 1,7 s · TBT 0 ms · 245 KB. O número de Performance sai como 76 por
causa de um CLS de 0,753 que **é artefato do `vite preview` com emulação mobile**,
não regressão: o trace tem um único `LayoutShift` com `had_recent_input: true` e
`cumulative_score: 0`, o CLS no dev server é 0, e a observação direta no navegador
não registra shift. Não "corrija" isso — meça em produção depois do deploy.

**Oportunidade real que sobrou:** "Reduce unused JavaScript — 271 KB"
(framer-motion + router).

### Itens do cliente (não dependem de código)

1. **Rotacionar a chave da Resend** — está exposta no histórico do repo público.
   Com o formulário indo para o WhatsApp, ela pode ser só revogada, sem
   substituição. Ver `src/lib/send-email.ts`, que ficou marcado como sem uso.
2. **Google Meu Negócio + Search Console** — sem a ficha verificada o site não
   entra no pacote local do mapa. O Search Console não tem dado retroativo:
   quanto antes, melhor.
3. **Coordenadas reais da base** — há um valor aproximado com `TODO` em
   `src/lib/schema.ts`.
4. **Lista de 47 cidades** (`src/data/regioes.ts`) — o cliente definiu os três
   estados (MA, PI, CE); as cidades foram escolhidas por porte e relevância
   regional, sem confirmação operacional. Validar antes de tratar como definitiva.
5. **Google Meu Negócio desalinhado:** a área de cobertura da ficha tem só Santa
   Inês e Pindaré-Mirim, contra três estados no site. O endereço da ficha
   ("Estrada p/ Canadá") também diverge do CNPJ ("Rod. Pitombeira"). E o campo
   Site aponta para `http://grupomvconstrutora.com.br/` — sem https e sem www.
5. **Números reais** — obras entregues, máquinas na frota, m³/dia. Hoje só há
   "+11 anos" e "100% compromisso com prazos" (essa segunda é alegação genérica
   que sistemas de IA descartam).
6. **Depoimentos** — zero no site.
7. **Fotos de caminhão Munck e basculante** — o Munck é o único serviço sem
   máquina vinculada.
8. **`public/videos.zip`** (7 MB) — está em `public/`, vai virar download público
   no deploy.

---

## Armadilhas — leia antes de mexer

### 1. O deploy está quebrado e é a prioridade

Tudo está commitado e pushado, **mas a produção serve o site antigo**: título
antigo, 0 menções a "Maranhão", 0 JSON-LD, `/robots.txt` e `/servicos` em 404.
Não é cache (`Age: 0`, `X-Vercel-Cache: MISS`).

Verificar no painel da Vercel: aba Deployments (build falhando?) e Settings → Git
(Production Branch é `main`?).

### 2. Dois alvos de build

`vite.config.ts` foi alterado por alguém para GitHub Pages num subcaminho, o que
quebrava todo o SEO. Reconfigurei para atender aos dois:

```bash
npm run build        # PRODUÇÃO — Vercel, SSR, sem basePath
npm run build:pages  # PREVIEW  — GitHub Pages estático sob /site-Grupo-Mv-Construtora/
```

O preview sai com `noindex` de propósito (`E_PREVIEW` em `src/config/empresa.ts`
→ meta robots em `__root.tsx`, e `scripts/build-pages.mjs` escreve um robots.txt
bloqueando tudo). Sem isso a cópia do preview vira conteúdo duplicado e disputa
posição com a produção.

> **`npm run build:pages` nunca foi executado.** Testar antes de confiar.

### 3. `npm run lint` sempre falha — e não é culpa sua

`core.autocrlf=true` deixa o working tree em CRLF, e o prettier espera LF.
Resultado: ~7.000 erros `Delete ␍` em **todos** os arquivos, inclusive os que
ninguém tocou. **Não rode `prettier --write .`** para "consertar" — isso reescreve
o repositório inteiro. Filtre:

```bash
npm run lint 2>&1 | grep -v "prettier/prettier"
```

Use `npx tsc --noEmit` como verificação real.

### 4. O `rewrites` do `vercel.json` foi removido

Era `{"source": "/(.*)", "destination": "/"}` — fallback de SPA num projeto SSR,
configuração morta. **Validar em preview deploy** que as rotas continuam
funcionando antes de mandar para produção.

### 5. Lovable

`AGENTS.md` avisa: **não reescrever histórico** (force-push, rebase, amend de
commit já enviado) — quebra o histórico do lado do Lovable. Commits sincronizam,
então mantenha `main` sempre em estado funcional.

### 6. Servidor de dev

A porta varia (8080, 8081, 8082...). Descubra assim:

```bash
for p in 8080 8081 8082 8083; do
  c=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://localhost:$p/")
  [ "$c" = "200" ] && echo "ATIVO=$p"
done
```

---

## Como verificar o que você fizer

```bash
npx tsc --noEmit                                    # verificação real
npm run build                                       # build de produção (SSR)

# rotas
for r in "" servicos servicos/terraplanagem frota frota/escavadeira-hidraulica \
         politica-de-privacidade servicos/inexistente; do
  printf "%-34s %s\n" "/$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:8080/$r")"
done   # a última deve dar 404

# JSON-LD válido
curl -s http://localhost:8080/servicos/drenagem > /tmp/p.html
grep -ao "application/ld+json" /tmp/p.html | wc -l   # esperado: 3

# matriz de vínculos serviço <-> máquina (nenhum slug inválido)
```

Depois do deploy, rodar o Lighthouse e comparar com a linha de base em
[BASELINE-2026-09-02.md](BASELINE-2026-09-02.md):

```bash
npx --yes lighthouse@12 https://www.grupomvconstrutora.com.br/ \
  --output=html --output-path=./lh-depois \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=old --disable-gpu --no-sandbox" --max-wait-for-load=120000
```

| Indicador | Antes | Meta |
|---|---|---|
| Performance mobile | 65 | 95+ |
| LCP mobile | 35,5 s | < 2,0 s |
| Peso da página | 15,4 MB | < 1,0 MB |
| Acessibilidade | 86 | 100 |
| Páginas indexáveis | 1 | 20 |

> O "SEO 100" do Lighthouse é um checklist raso (title, description, viewport).
> Ele não mede schema, sitemap, canonical nem conteúdo. Não use esse número
> isolado como prova de qualidade.

---

## Backlog completo

As 17 tasks detalhadas estão em [README.md](README.md), cada uma com contexto,
evidência medida, passos, critério de aceite e comando de validação.
