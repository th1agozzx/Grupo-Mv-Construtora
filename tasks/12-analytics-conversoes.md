# 12 — Analytics e rastreio de conversão

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1 — fazer **antes** das melhorias de conteúdo
- **Esforço:** 1-2 h
- **Impacto:** 🟠 Alto (é o que transforma o trabalho em número defensável)
- **Depende de:** task 06 (Search Console) e task 10 (política de privacidade)

---

## Problema

O site **não tem nenhuma medição**. Verificado: nenhum GA4, nenhum Vercel
Analytics, nenhum pixel, nenhum rastreio de evento.

Consequências:

1. Não há como provar que as melhorias funcionaram — nem quantas ligações o site
   gerou.
2. O cliente não sabe quantos leads vieram do site: o botão de WhatsApp
   (o CTA mais usado, presente em 4 lugares) leva o usuário para fora sem
   deixar rastro.
3. Não dá para saber quantos visitantes abandonam antes do site carregar
   (relevante enquanto o LCP for de 35 s — ver task 02).

> Como a task 02 vai mudar drasticamente a performance, instalar o analytics
> **antes** dá uma linha de base de taxa de rejeição para comparar.

---

## Parte A — Escolha da ferramenta

| Opção                 | Prós                                                               | Contras                                     |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| **GA4**               | Grátis, integra com Search Console e Google Ads, padrão de mercado | Exige banner de cookies, interface complexa |
| **Vercel Analytics**  | 1 linha para instalar, sem cookies, sem banner                     | Pago acima do plano free, menos detalhado   |
| **Plausible / Umami** | Sem cookies, leve, simples                                         | Pago ou exige auto-hospedagem               |

**Recomendação:** GA4 + Vercel Speed Insights.

- GA4 pelo dado de negócio (origem do tráfego, conversões, integração com o
  Search Console).
- Speed Insights pelo Core Web Vitals de **campo** (usuários reais), que
  complementa o Lighthouse de laboratório.

---

## Parte B — Instalar o GA4

1. Criar propriedade em [analytics.google.com](https://analytics.google.com) →
   fluxo de dados Web → copiar o `G-XXXXXXXXXX`.

2. Adicionar em `src/routes/__root.tsx`, no `head`:

```ts
scripts: [
  { src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX", async: true },
  {
    children: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
    `,
  },
],
```

3. Vincular GA4 ↔ Search Console (Admin → Vinculações de produtos). Isso traz os
   dados de busca orgânica para dentro do GA4.

> O ID `G-XXXXXXXXXX` não é segredo (fica no HTML), mas convém guardá-lo em
> `VITE_GA_ID` para separar produção de preview e não poluir os dados com
> tráfego de teste.

---

## Parte C — Eventos de conversão (a parte que importa)

Pageview sozinho não diz nada. O que interessa é **quantos orçamentos o site gerou**.

### Eventos a rastrear

| Evento             | Onde                                                                          | Por quê                      |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------- |
| `clique_whatsapp`  | botão flutuante (linha 322), CTA do contato (linha 1324), rodapé (linha 1472) | canal principal de venda     |
| `envio_formulario` | `onSubmit` (linha 667)                                                        | lead qualificado             |
| `erro_formulario`  | catch do `onSubmit` (linha 685)                                               | detectar formulário quebrado |
| `clique_telefone`  | link `tel:` (task 10, A5)                                                     | conversão mobile             |
| `abriu_maps`       | "Abrir no Google Maps" (linha 1292)                                           | intenção de visita           |
| `play_video`       | slideshow de vídeos                                                           | engajamento                  |
| `abriu_frota`      | lightbox da galeria                                                           | interesse em equipamento     |
| `scroll_90`        | rolagem até o fim                                                             | qualidade do tráfego         |

### Helper

Criar `src/lib/analytics.ts`:

```ts
type Parametros = Record<string, string | number | boolean>;

export function evento(nome: string, parametros: Parametros = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  gtag?.("event", nome, parametros);
}
```

Uso — importante diferenciar **de onde** veio o clique:

```jsx
<a
  href={waLink("...")}
  onClick={() => evento("clique_whatsapp", { origem: "botao_flutuante" })}
  ...
>
```

E no `onSubmit`:

```ts
await sendEmail({ data: { ... } });
evento("envio_formulario", { metodo: "formulario_contato" });
```

### Marcar como conversão

No GA4: Admin → Eventos → marcar `clique_whatsapp`, `envio_formulario` e
`clique_telefone` como **eventos de conversão**. Só assim eles aparecem nos
relatórios de conversão e podem alimentar campanhas futuras.

---

## Parte D — Vercel Speed Insights

```bash
npm i @vercel/speed-insights
```

```jsx
import { SpeedInsights } from "@vercel/speed-insights/react";
// dentro do RootShell, antes de </body>
<SpeedInsights />;
```

Dá o Core Web Vitals de usuários reais — inclusive dos clientes no 4G do interior
do Maranhão, que é justamente o cenário crítico da task 02.

---

## Parte E — LGPD

GA4 usa cookies. Com a task 10 em vigor, é preciso:

- Citar o Google Analytics na política de privacidade.
- Avaliar banner de consentimento (Consent Mode v2).
- Manter `anonymize_ip: true`.

Se o cliente quiser evitar o banner, trocar GA4 por Vercel Analytics ou Plausible,
que não usam cookies — perde-se profundidade de dado, ganha-se simplicidade legal.

---

## Critério de aceite

- [ ] GA4 recebendo dados em tempo real.
- [ ] GA4 vinculado ao Search Console.
- [ ] Os 8 eventos disparando (conferir no DebugView).
- [ ] 3 eventos marcados como conversão.
- [ ] Speed Insights coletando.
- [ ] Analytics citado na política de privacidade.
- [ ] Tráfego de preview/localhost excluído dos dados.
- [ ] Pelo menos 7 dias de linha de base coletados **antes** de subir a task 02.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ | grep -ao "googletagmanager\|G-[A-Z0-9]\{10\}"
```

E, no GA4, abrir Admin → DebugView, navegar pelo site e conferir se cada evento
aparece com os parâmetros certos.
