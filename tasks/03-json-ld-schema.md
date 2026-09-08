# 03 — Dados estruturados JSON-LD (schema.org)

- [ ] Concluída em: ****/****/______
- **Prioridade:** P0
- **Esforço:** 1-2 h
- **Impacto:** 🔴 Altíssimo — é o principal item para IA (Gemini / AI Overviews)
- **Depende de:** task 04 (para o texto e as cidades já estarem corretos)

> **STATUS (02/09/2026 — implementado)**
> ✅ `src/lib/schema.ts` criado com 3 blocos: `GeneralContractor`, `WebSite` e `FAQPage`.
> ✅ Injetados no HTML via SSR; os 3 validam como JSON (12 cidades em `areaServed`, 10 serviços, 5 perguntas).
> ⏳ **PENDENTE COM VOCÊ:** confirmar latitude/longitude reais da base (hoje há um valor aproximado marcado com TODO no arquivo).
> ⏳ Validar no Rich Results Test após o deploy.

---

## Problema

O projeto **não tem uma única linha de JSON-LD**. Verificado:

```bash
grep -rn "application/ld+json|schema.org" src/
# nenhum resultado
```

JSON-LD é o formato que o Google, o Gemini, o AI Overviews e os demais sistemas de
IA usam para extrair **fatos confiáveis** sobre uma entidade. Sem ele, o modelo
precisa inferir tudo do texto corrido — e, quando existem várias empresas chamadas
"MV Construtora", a inferência erra ou simplesmente não cita ninguém.

**Este é o item que mais separa "site bonito" de "site que a IA recomenda".**

---

## Dados confirmados da empresa

Extraídos do próprio código (`src/routes/index.tsx:64-72` e seção "Quem somos"):

| Campo             | Valor                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| Nome              | MV Construtora                                                          |
| CNPJ              | 14.299.029/0001-20                                                      |
| Fundador          | Alan Robson Leite Pereira                                               |
| Fundação          | 14/09/2011                                                              |
| Endereço          | Próximo ao Condomínio OASIS - Pitombeira, Pindaré-Mirim - MA, 65370-000 |
| Telefone/WhatsApp | +55 98 99236-8928                                                       |
| E-mail            | atendimento@grupomvconstrutora.com.br                                   |
| Horário           | Seg-Sex (ver task 10 — há divergência 07h vs 08h no site)               |

### Redes sociais (confirmado pelo cliente)

| Rede      | URL                                             |
| --------- | ----------------------------------------------- |
| Instagram | `https://www.instagram.com/grupoconstrutoramv/` |

Usar sempre a URL **limpa**, sem `?utm_source=qr`. Ver **task 17** para o
tratamento completo do perfil e da inconsistência de nome do handle.

### Pendências a levantar com o cliente antes de publicar

- [ ] **Latitude e longitude** exatas da base (pegar no Google Maps: clique com o
      botão direito no local e as coordenadas aparecem no topo do menu).
- [ ] Facebook / LinkedIn / YouTube, se existirem (somar ao `sameAs`).
- [ ] Horário de funcionamento definitivo.
- [ ] Faixa de preço (`priceRange`), ex.: `"$$"`.

---

## Passos

### 1. Criar `src/lib/schema.ts`

> `SERVICOS` é a lista das **10 categorias oficiais** da empresa, definida em
> `src/data/servicos.ts`. A tabela completa está na **task 08** — é a fonte única
> usada pelo JSON-LD, pela home e pelas páginas de serviço, para os três nunca
> divergirem.

```ts
import { SERVICOS } from "@/data/servicos";

const SITE = "https://www.grupomvconstrutora.com.br";

export const organizacaoSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": SITE + "/#organizacao",
  name: "MV Construtora",
  legalName: "MV Construtora",
  alternateName: ["Grupo MV Construtora", "Construtora MV", "MV Construtora Maranhão"],
  url: SITE,
  logo: SITE + "/assets/logomv.png",
  image: SITE + "/og-image.jpg",
  description:
    "Empresa de terraplenagem, locação de máquinas pesadas e gestão de obras " +
    "sediada em Pindaré-Mirim, Maranhão, com atuação no Vale do Pindaré e em todo o estado.",
  taxID: "14.299.029/0001-20",
  vatID: "14.299.029/0001-20",
  foundingDate: "2011-09-14",
  founder: {
    "@type": "Person",
    name: "Alan Robson Leite Pereira",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Próximo ao Condomínio OASIS - Pitombeira",
    addressLocality: "Pindaré-Mirim",
    addressRegion: "MA",
    postalCode: "65370-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.6089, // CONFIRMAR no Google Maps
    longitude: -45.3419, // CONFIRMAR no Google Maps
  },
  telephone: "+5598992368928",
  email: "atendimento@grupomvconstrutora.com.br",
  priceRange: "$$",
  currenciesAccepted: "BRL",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Pindaré-Mirim",
    "Santa Inês",
    "Bacabal",
    "Zé Doca",
    "Santa Luzia",
    "Monção",
    "Tufilândia",
    "Alto Alegre do Pindaré",
    "Bom Jardim",
    "Açailândia",
    "Imperatriz",
    "São Luís",
  ].map((cidade) => ({
    "@type": "City",
    name: cidade,
    containedInPlace: { "@type": "State", name: "Maranhão" },
  })),
  sameAs: [
    "https://www.instagram.com/grupoconstrutoramv/",
    // acrescentar Facebook / LinkedIn / YouTube quando existirem
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços da MV Construtora",
    itemListElement: SERVICOS.map(({ nome, descricao }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: nome,
        description: descricao,
        provider: { "@id": SITE + "/#organizacao" },
        areaServed: { "@type": "State", name: "Maranhão" },
      },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE + "/#website",
  url: SITE,
  name: "MV Construtora",
  inLanguage: "pt-BR",
  publisher: { "@id": SITE + "/#organizacao" },
};

// Reaproveitar o array `faqs` já existente em src/routes/index.tsx
export const faqSchema = (faqs: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([pergunta, resposta]) => ({
    "@type": "Question",
    name: pergunta,
    acceptedAnswer: { "@type": "Answer", text: resposta },
  })),
});
```

### 2. Injetar no HTML

**Opção A (preferida)** — via `head` da rota, em `src/routes/index.tsx`:

```ts
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [/* ... */],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizacaoSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema(faqs)),
      },
    ],
  }),
  component: Index,
});
```

> **Verificar:** a chave `children` em `head.scripts` depende da versão do
> TanStack Router instalada (`@tanstack/react-router ^1.170.16`). Não foi possível
> confirmar aqui porque `node_modules` não está instalado. Rode `npm i` e teste.

**Opção B (fallback garantido)** — renderizar direto no JSX do componente:

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacaoSchema) }}
/>
```

JSON-LD no `<body>` é **igualmente válido** para o Google — a documentação oficial
aceita os dois lugares. Como o site é SSR, o script chega no HTML inicial nos dois
casos, que é o que importa para os crawlers de IA.

### 3. Schemas adicionais (depois das tasks 08 e 09)

- `Service` individual em cada página de serviço (task 08).
- `BreadcrumbList` na navegação das páginas internas (task 08).
- `Review` / `AggregateRating` quando houver depoimentos reais (task 09).
- `VideoObject` para os vídeos da galeria, com `name`, `description`,
  `thumbnailUrl` e `uploadDate` — permite aparecer na aba de vídeos do Google.

> Nunca invente `AggregateRating`. Nota falsa é violação das diretrizes do
> Google e gera penalização manual.

---

## Critério de aceite

- [ ] Pelo menos 3 blocos JSON-LD no HTML servido (Organization, WebSite, FAQPage).
- [ ] Zero erros no [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Zero erros no [Schema Markup Validator](https://validator.schema.org/).
- [ ] `geo` preenchido com coordenadas reais conferidas no mapa.
- [ ] `sameAs` com pelo menos um perfil social real (ou removido, se não houver —
      **não** deixar array vazio).
- [ ] FAQPage reconhecido pelo Rich Results Test como elegível a resultado rico.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ | grep -ao "application/ld+json" | wc -l
```

Depois, colar a URL no Rich Results Test e conferir se aparecem os cartões
"Empresa local" e "Perguntas frequentes".
