# 08 — Criar páginas separadas por serviço

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1
- **Esforço:** 2-4 dias (10 categorias)
- **Impacto:** 🟠 Alto — é o que quebra o teto de crescimento do site
- **Depende de:** tasks 04, 07 e 14 (refatoração antes, para não duplicar código)

> **STATUS (02/09/2026 — estrutura implementada)**
> ✅ `src/data/servicos.ts` (10 categorias) e `src/data/frota.ts` (6 máquinas) como fontes
> únicas, cada uma com `intro` e `faqs` próprios — sem texto duplicado entre páginas.
> ✅ Layout compartilhado extraído (task 14 parcial): `SiteLayout`, `Header`, `Footer`,
> `WhatsAppFloating`, `SectionTitle`, `CTAButton`, `Breadcrumbs`, `CtaFinal`,
> `src/config/empresa.ts` e `src/config/navegacao.ts`. `index.tsx`: 1.696 → 1.068 linhas.
> ✅ **20 rotas no ar:** `/`, `/servicos` + 10 serviços, `/frota` + 6 máquinas,
> `/politica-de-privacidade`. Slug inválido devolve 404 de verdade.
> ✅ Cada página com H1 único, canonical próprio, `Service` + `FAQPage` + `BreadcrumbList`.
> ✅ **Navegação cruzada serviço ↔ máquina** a partir de um vínculo só: cada máquina
> declara em `servicos: []` onde atua, e a página de serviço faz a busca inversa via
> `maquinasDoServico()`. Não existe segunda lista para divergir.
> ✅ Vídeos migrados para o YouTube com player em facade (ver task 02).
> ⏳ **PENDENTE — lapidação:** páginas com ~350-500 palavras; a meta são 800+. Falta
> expandir "Como funciona" por serviço (as 5 etapas ainda são iguais nas 10 páginas),
> fotos por serviço e mais FAQs.
> ⏳ **PENDENTE:** caminhão Munck e caminhão basculante sem foto — o Munck é o único
> serviço com 0 máquinas vinculadas. Assim que houver foto, basta criar a entrada em
> `src/data/frota.ts` e o vínculo passa a existir nos dois sentidos automaticamente.

---

## Problema

O site inteiro é **uma única rota**. Todo o conteúdo vive em
`src/routes/index.tsx` — **1.500 linhas, 1 URL indexável**.

Uma página só compete por um conjunto pequeno de palavras-chave. Concorrentes com
páginas dedicadas por serviço ranqueiam acima em cada busca específica — mesmo
sendo empresas menores.

### Agravante descoberto com a lista oficial

O site anuncia **5 serviços** (`src/routes/index.tsx:100-131`), mas a empresa
executa **10 categorias**. Metade do que a MV vende não está no site.

| No site hoje        | Na lista oficial                                 |
| ------------------- | ------------------------------------------------ |
| Terraplanagem       | Terraplanagem                                    |
| Transportes         | Transporte de máquinas e equipamentos            |
| Locação de máquinas | Locação de máquinas e equipamentos               |
| Estradas Vicinais   | Infraestrutura viária                            |
| Gestão de obras     | absorvida por "Apoio e gestão de grandes obras"  |
| —                   | **Obras civis** ❌ ausente                       |
| —                   | **Drenagem e infraestrutura** ❌ ausente         |
| —                   | **Preparação e limpeza de áreas** ❌ ausente     |
| —                   | **Serviços com caminhão Munck** ❌ ausente       |
| —                   | **Apoio e gestão de grandes obras** ❌ ausente   |
| —                   | **Serviços para propriedades rurais** ❌ ausente |

Cada serviço ausente é uma busca inteira que a empresa não disputa. "Caminhão
Munck em Pindaré-Mirim" hoje não tem como levar ninguém a este site.

> ✅ **RESOLVIDO (cliente, 02/09/2026):** "Gestão de obras" foi **absorvida por
> "Apoio e gestão de grandes obras"** — não vira página própria. A categoria foi
> renomeada e recebeu os itens "Gestão e administração de obras" e "Planejamento
> e controle de cronograma".

### Lacunas na frota

A galeria (`src/routes/index.tsx:135-170`) tem 6 equipamentos. A lista oficial
cita dois que **não estão na galeria**:

- **Caminhão Munck** — categoria de serviço inteira sem foto
- **Caminhão basculante / caçamba** — citado na locação

Levantar fotos com o cliente (o Instagram da task 17 é boa fonte).

---

## Fonte única de dados: `src/data/servicos.ts`

Criar **antes** das páginas. Alimenta a home, as páginas de serviço, o menu, o
sitemap e o JSON-LD (task 03) — evita que divirjam.

```ts
export const SERVICOS = [
  {
    slug: "terraplanagem",
    nome: "Terraplanagem",
    h1: "Terraplanagem no Maranhão",
    descricao:
      "Escavação, corte e aterro, nivelamento, compactação de solo, regularização de terrenos, movimentação de terra, conformação de plataformas, pavimentação e preparação de áreas para construção.",
    itens: [
      "Escavação",
      "Corte e aterro",
      "Nivelamento",
      "Compactação de solo",
      "Regularização de terrenos",
      "Movimentação de terra",
      "Conformação de plataformas",
      "Pavimentação",
      "Preparação de áreas para construção",
    ],
  },
  {
    slug: "infraestrutura-viaria",
    nome: "Infraestrutura viária",
    h1: "Estradas Vicinais e Infraestrutura Viária no Maranhão",
    descricao:
      "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento, compactação, abertura de acessos e preparação de subleito, base e sub-base.",
    itens: [
      "Abertura de estradas vicinais",
      "Recuperação de estradas vicinais",
      "Patrolamento",
      "Cascalhamento",
      "Compactação",
      "Abertura de acessos",
      "Preparação de subleito",
      "Base e sub-base",
    ],
  },
  {
    slug: "obras-civis",
    nome: "Obras civis",
    h1: "Obras Civis: Construção e Reforma no Maranhão",
    descricao:
      "Construção e reforma de edificações, galpões, estruturas comerciais e industriais, fundações, pisos e pavimentações, muros, calçadas e serviços complementares.",
    itens: [
      "Construção e reforma de edificações",
      "Galpões",
      "Estruturas comerciais e industriais",
      "Fundações",
      "Pisos e pavimentações",
      "Muros",
      "Calçadas",
      "Serviços complementares",
    ],
  },
  {
    slug: "drenagem",
    nome: "Drenagem e infraestrutura",
    h1: "Drenagem Pluvial e Infraestrutura no Maranhão",
    descricao:
      "Execução de valas, drenagem pluvial, instalação de tubos e bueiros, canais, caixas de drenagem e preparação para redes de água e esgoto.",
    itens: [
      "Execução de valas",
      "Drenagem pluvial",
      "Instalação de tubos e bueiros",
      "Canais",
      "Caixas de drenagem",
      "Preparação para redes de água e esgoto",
    ],
  },
  {
    slug: "limpeza-de-areas",
    nome: "Preparação e limpeza de áreas",
    h1: "Limpeza e Preparação de Terrenos no Maranhão",
    descricao:
      "Limpeza mecanizada de terrenos, destocamento, remoção de material, demolições, carga e transporte de resíduos e preparação de áreas para implantação de empreendimentos.",
    itens: [
      "Limpeza mecanizada de terrenos",
      "Destocamento",
      "Remoção de material",
      "Demolições",
      "Carga e transporte de resíduos",
      "Preparação de áreas para empreendimentos",
    ],
  },
  {
    slug: "locacao-de-maquinas",
    nome: "Locação de máquinas e equipamentos",
    h1: "Locação de Máquinas Pesadas no Maranhão",
    descricao:
      "Escavadeiras hidráulicas, motoniveladoras (patrol), pás carregadeiras, rolos compactadores, caminhões-pipa, caminhões basculantes e demais equipamentos pesados, com ou sem operador.",
    itens: [
      "Escavadeiras hidráulicas",
      "Motoniveladoras (patrol)",
      "Pás carregadeiras",
      "Rolos compactadores",
      "Caminhões-pipa",
      "Caminhões basculantes / caçambas",
      "Com ou sem operador",
    ],
  },
  {
    slug: "transporte-de-maquinas",
    nome: "Transporte de máquinas e equipamentos",
    h1: "Transporte de Máquinas Pesadas com Caminhão Prancha",
    descricao:
      "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas e apoio logístico para obras.",
    itens: [
      "Transporte com caminhão prancha",
      "Mobilização de máquinas",
      "Desmobilização de máquinas",
      "Apoio logístico",
    ],
  },
  {
    slug: "caminhao-munck",
    nome: "Serviços com caminhão Munck",
    h1: "Caminhão Munck no Maranhão: Içamento e Movimentação",
    descricao:
      "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais com caminhão Munck.",
    itens: [
      "Içamento",
      "Movimentação de cargas",
      "Carga e descarga",
      "Transporte de equipamentos e materiais",
    ],
  },
  {
    slug: "apoio-a-grandes-obras",
    nome: "Apoio e gestão de grandes obras",
    h1: "Apoio e Gestão de Grandes Obras no Maranhão",
    descricao:
      "Fornecimento de máquinas, equipamentos e mão de obra operacional para obras industriais, loteamentos, terminais, rodovias e empreendimentos públicos e privados, incluindo planejamento e administração da obra com controle de custos, qualidade e cronograma.",
    itens: [
      "Obras industriais",
      "Loteamentos",
      "Terminais",
      "Rodovias",
      "Empreendimentos públicos e privados",
      "Mão de obra operacional",
      "Gestão e administração de obras",
      "Planejamento e controle de cronograma",
    ],
  },
  {
    slug: "servicos-rurais",
    nome: "Serviços para propriedades rurais",
    h1: "Serviços de Terraplenagem para Propriedades Rurais no Maranhão",
    descricao:
      "Abertura e recuperação de estradas internas, construção de açudes e reservatórios, limpeza e nivelamento de áreas, abertura de valas e preparação de terrenos para produção.",
    itens: [
      "Estradas internas",
      "Construção de açudes",
      "Reservatórios",
      "Limpeza e nivelamento de áreas",
      "Abertura de valas",
      "Preparação de terrenos para plantio",
    ],
  },
] as const;
```

> `apoio-a-grandes-obras` e `servicos-rurais` são **segmentos de público**, não
> tipos de serviço. Isso é uma vantagem: são páginas que respondem "quem" em vez
> de "o quê", captando busca de prefeitura e de produtor rural — públicos que os
> concorrentes genéricos não atacam.

---

## Arquitetura de rotas

```
/                                          Home
/servicos                                  Índice das 10 categorias
/servicos/terraplanagem
/servicos/infraestrutura-viaria
/servicos/obras-civis
/servicos/drenagem
/servicos/limpeza-de-areas
/servicos/locacao-de-maquinas
/servicos/transporte-de-maquinas
/servicos/caminhao-munck
/servicos/apoio-a-grandes-obras
/servicos/servicos-rurais
/frota                                     Catálogo de equipamentos
/obras            /obras/[slug]            Cases (task 09)
/quem-somos
/area-de-atuacao                           Cidades (task 04)
/contato
/politica-de-privacidade                   LGPD (task 10)
```

Com TanStack Router (file-based), usar rota dinâmica em vez de 10 arquivos:

```
src/routes/
  servicos/
    index.tsx     lista as 10, a partir de SERVICOS
    $slug.tsx     renderiza a categoria pelo slug
```

O `$slug.tsx` valida o slug contra `SERVICOS` e dispara `notFound()` se não bater
— evita URL inventada virando página vazia indexável.

### Slugs: decisão

Usei `terraplanagem` (com A) no slug por ter mais volume de busca, apesar de
`terraplenagem` ser a grafia correta. O H1 e o texto usam **terraplenagem**.
Ver task 04, passo 9. **Definir o slug antes de publicar** — trocar depois exige
redirect 301.

---

## Estrutura de cada página de serviço

Mínimo de **800 palavras originais**. Página fina não ranqueia e ainda arrasta o
site inteiro.

1. **H1** — o campo `h1` de `SERVICOS`
2. **Parágrafo de abertura** — o que é, para quem, onde (2-3 frases densas; é o
   trecho que a IA mais cita)
3. **H2 "O que está incluso"** — o array `itens` em `<ul>` real
4. **H2 "Como funciona"** — `<ol>`: visita técnica, orçamento, mobilização,
   execução, entrega
5. **H2 "Equipamentos utilizados"** — fotos reais da frota
6. **H2 "Onde atendemos"** — cidades, com link para `/area-de-atuacao`
7. **H2 "Perguntas frequentes"** — 4-6 perguntas **específicas daquele serviço**
8. **CTA** — WhatsApp + formulário
9. **JSON-LD** `Service` + `BreadcrumbList` + `FAQPage` (task 03)

### FAQs por serviço (exemplos que a IA extrai bem)

| Serviço               | Pergunta                                                  |
| --------------------- | --------------------------------------------------------- |
| Terraplanagem         | Quanto custa terraplenagem por hora no Maranhão?          |
| Terraplanagem         | Qual a diferença entre corte e aterro?                    |
| Infraestrutura viária | O que é patrolamento e cascalhamento?                     |
| Infraestrutura viária | Quanto tempo leva para recuperar 1 km de estrada vicinal? |
| Drenagem              | Que diâmetro de tubo usar em drenagem pluvial?            |
| Caminhão Munck        | Qual a capacidade de içamento do Munck?                   |
| Locação               | Locação com ou sem operador: o que compensa?              |
| Serviços rurais       | Quanto custa construir um açude?                          |
| Obras civis           | Qual o prazo para construir um galpão?                    |
| Limpeza de áreas      | O que é destocamento?                                     |

Pergunta real + número real = fonte citada pelo Gemini.

---

## Atualizar também a home

O array `services` (`src/routes/index.tsx:100-131`) passa a ler de `SERVICOS`, com
as 10 categorias, cada card linkando para sua página.

Cada categoria precisa de um ícone `lucide-react`. Os já importados cobrem parte;
sugestões para os novos: `Building2` (obras civis), `Waves` ou `Droplets`
(drenagem), `Trees` (limpeza de áreas), `Crane` ou `ArrowUpFromLine` (Munck),
`Factory` (apoio a grandes obras), `Wheat` ou `Tractor` (rurais).

Com 10 cards, revisar o grid — provavelmente `lg:grid-cols-3` em vez de 2.

### Faixa de destaque

A lista enviada pelo cliente já vem num formato pronto para o site:

> Terraplanagem • Obras Civis • Infraestrutura • Pavimentação • Drenagem •
> Locação de Máquinas Pesadas • Transporte de Equipamentos • Serviços com Munck •
> Estradas Vicinais • Movimentação de Terra

Vale como faixa logo abaixo do hero. É texto denso em palavra-chave, aparece cedo
no HTML e resume a empresa em uma linha — bom para leitor humano e para extrator.

> ✅ **RESOLVIDO (cliente, 02/09/2026):** "Pavimentação" **não é serviço autônomo
> — faz parte da terraplanagem**. Permanece na faixa como palavra-chave de busca
> e foi adicionada aos itens da categoria Terraplenagem. Continuam 10 categorias.

---

## Navegação e links internos

- Menu com dropdown "Serviços" listando as 10 páginas.
- Manter as âncoras na home (a rolagem é boa); usar links reais nas internas.
- Rodapé com todas as URLs (hoje o array da linha 1462 tem string vazia — task 10).
- Breadcrumbs visíveis + `BreadcrumbList` no JSON-LD.
- Links cruzados entre serviços relacionados (terraplanagem ↔ drenagem ↔ viária).

---

## Cuidados

### Canonical por página

Cada página com canonical **próprio**. Todas apontando para a home = todas
desindexadas menos a home. Erro comum e caro.

### `vercel.json`

O `rewrites` (`/(.*)` → `/`) pode interferir nas rotas novas. Ver task 05, passo 5.
**Testar em preview deploy antes de produção.**

### Conteúdo único

Não copiar e colar trocando o nome do serviço. Duplicado = canibalização, e
nenhuma página ranqueia bem. As 10 descrições enviadas pelo cliente são o ponto
de partida, não o texto final — cada uma precisa virar 800+ palavras próprias.

### Páginas por cidade

`/terraplanagem-em-santa-ines` funciona **só com conteúdo genuinamente diferente**
(obras feitas lá, solo local, distância de mobilização). Gerar 20 páginas iguais
trocando o nome da cidade é doorway page, penalizada pelo Google. Começar com 2-3
cidades onde existam obras reais.

---

## Ordem sugerida

1. Task 14 (extrair componentes).
2. Criar `src/data/servicos.ts` com as 10 categorias.
3. Layout compartilhado (header + footer + WhatsApp flutuante).
4. Atualizar a home para 10 cards + faixa de destaque.
5. `/servicos/terraplanagem` como piloto, completa.
6. Validar indexação no Search Console (1-2 semanas).
7. Replicar nas outras 9, priorizando por demanda: infraestrutura viária →
   locação → obras civis → drenagem → serviços rurais → Munck → limpeza →
   transporte → apoio a grandes obras.
8. `/frota`, `/quem-somos`, `/area-de-atuacao`, `/contato`.
9. Atualizar `sitemap.xml` (task 05).

---

## Critério de aceite

- [ ] `src/data/servicos.ts` com as 10 categorias como fonte única.
- [ ] 10 páginas de serviço + índice `/servicos`.
- [ ] Home exibindo as 10 categorias, cada card linkando para sua página.
- [ ] Cada página com H1 único e canonical próprio.
- [ ] Cada página com 800+ palavras originais.
- [ ] Cada página com `Service` + `BreadcrumbList` + `FAQPage`.
- [ ] Nenhum bloco de texto repetido entre páginas.
- [ ] Todas no `sitemap.xml` e alcançáveis por link (sem órfã).
- [ ] Slug de terraplanagem decidido antes de publicar.
- [ ] Fotos de Munck e basculante levantadas com o cliente.
- [x] Dúvida sobre "Gestão de obras" e "Pavimentação" resolvida (cliente, 02/09/2026).
- [ ] `site:grupomvconstrutora.com.br` mostrando 14+ resultados.

## Validação

```bash
for s in "" servicos servicos/terraplanagem servicos/infraestrutura-viaria \
         servicos/obras-civis servicos/drenagem servicos/limpeza-de-areas \
         servicos/locacao-de-maquinas servicos/transporte-de-maquinas \
         servicos/caminhao-munck servicos/apoio-a-grandes-obras \
         servicos/servicos-rurais frota quem-somos contato; do
  printf "%-42s %s\n" "/$s" "$(curl -s -o /dev/null -w '%{http_code}' "https://www.grupomvconstrutora.com.br/$s")"
done
```

E acompanhar o relatório de Indexação no Search Console nas semanas seguintes.
