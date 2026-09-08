# 11 — Acessibilidade: 86 → 100

- [ ] Concluída em: ****/****/______
- **Prioridade:** P2
- **Esforço:** 1-2 h
- **Impacto:** 🟡 Médio (+ conformidade e argumento de qualidade)
- **Depende de:** task 10 (o link vazio do rodapé é uma das 3 falhas)

> **CORREÇÃO DE USABILIDADE (04/09/2026)** — relato de usuários no celular: seções
> apareciam **em branco** até a animação disparar.
>
> Duas causas, ambas corrigidas:
>
> 1. **Gatilho tardio.** O `SectionTitle` usava `amount: 0.4` — só animava com 40%
>    do bloco visível — e o fade durava 0,95 s. Agora existe `VIEWPORT_REVEAL` em
>    `src/components/site/animacoes.ts`, único para todo o site: dispara com 25% de
>    folga **antes** de a seção entrar na tela, e a duração caiu para 0,45 s.
> 2. **Causa de raiz: `opacity: 0` no HTML servido.** O framer serializa o estado
>    `hidden` como style inline no SSR — o HTML chegava com **31 elementos
>    invisíveis**. Enquanto o JS não hidratava, esses blocos não existiam na tela.
>    Num aparelho modesto em 4G, isso são segundos de tela branca.
>
> A opacidade foi removida das animações de entrada: `hidden` agora é só
> `{ y: 24 }`. O pior caso virou "conteúdo 24px abaixo da posição final", que é
> imperceptível. Medido depois: **31 → 0** elementos com `opacity: 0` no HTML, e
> 0 de 163 blocos de texto invisíveis no navegador.
>
> Regra para quem mexer depois: **animação de entrada não pode gatilhar
> opacidade em conteúdo renderizado no servidor.** Se a animação falhar, ela não
> pode levar o conteúdo junto.

---

## Problema

Lighthouse mobile: **Acessibilidade 86/100**. Três auditorias falhando, todas com
o elemento exato identificado.

---

## Falha 1 — Contraste insuficiente

**Elemento:** botões de filtro da galeria da frota, no estado inativo.
`src/routes/index.tsx:818-825`

```jsx
className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
  active
    ? "border-red-500 bg-red-500 text-white"
    : "border-white/20 bg-white/5 text-white/75 hover:border-white/40 hover:text-white"
}`}
```

O problema é o estado inativo: `text-white/75` sobre `bg-white/5` em cima de
`bg-zinc-950`. A opacidade de 75% derruba a razão de contraste abaixo de 4,5:1
(mínimo WCAG AA para texto normal).

**Correção:**

```diff
-: "border-white/20 bg-white/5 text-white/75 hover:border-white/40 hover:text-white"
+: "border-white/30 bg-white/10 text-white/90 hover:border-white/50 hover:text-white"
```

Verificar no DevTools (aba Acessibilidade → Contrast ratio) se passou de 4,5:1.

> Vale revisar todos os `text-white/60` e `text-white/70` do arquivo — vários
> ficam no limite. O Lighthouse só reporta o primeiro elemento de cada tipo, então
> pode haver mais casos que só aparecem depois de corrigir este.

---

## Falha 2 — Link sem nome discernível

**Elemento:** `<a href="#" class="mb-3 block text-sm hover:text-red-400">` — o
link vazio do rodapé (`src/routes/index.tsx:1462`).

Correção detalhada na **task 10, item A1**.

Para leitor de tela, esse link é anunciado como "link" sem mais nada — o usuário
não tem como saber o que ele faz.

---

## Falha 3 — Alvos de toque pequenos demais

**Elementos:** os indicadores (dots) do slideshow de vídeos.
`src/routes/index.tsx:503-511`

```jsx
className={`h-2 rounded-full transition-all ${
  i === index ? "w-6 bg-red-600" : "w-2 bg-zinc-400 hover:bg-zinc-500"
}`}
```

8×8 px. O mínimo recomendado é **24×24 px** (WCAG 2.2) — o Google usa 48×48 px
como referência de conforto no mobile.

**Correção:** manter o visual pequeno, ampliando só a área clicável com padding.

```jsx
<button
  onClick={...}
  aria-label={`Ir para vídeo ${i + 1}`}
  aria-current={i === index}
  className="grid h-11 w-11 place-items-center"
>
  <span
    className={`block h-2 rounded-full transition-all ${
      i === index ? "w-6 bg-red-600" : "w-2 bg-zinc-400"
    }`}
  />
</button>
```

O ponto continua com 8px de altura, mas a área de toque passa a 44×44 px.

Aplicar o mesmo padrão nos dots do slideshow de imagens do hero, se houver.

---

## Melhorias adicionais (não pontuadas pelo Lighthouse, mas corretas)

### Skip link

Um link "Pular para o conteúdo" antes do header, visível apenas ao foco.
Com header fixo e navegação longa, isso ajuda bastante quem navega por teclado.

```jsx
<a
  href="#inicio"
  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-950"
>
  Pular para o conteúdo
</a>
```

### `prefers-reduced-motion`

O site usa framer-motion intensamente: slideshow automático a cada 5 s, blobs em
loop infinito (linhas 754 e 1304), reveals em scroll. Para quem tem sensibilidade
vestibular isso é desconfortável.

```jsx
import { useReducedMotion } from "framer-motion";
const reduzirMovimento = useReducedMotion();
```

Usar para desligar o autoplay do slideshow e as animações infinitas.

### Foco visível

Conferir se todos os elementos interativos têm indicador de foco. Vários botões
usam classes utilitárias sem `focus-visible:` explícito.

### Lightbox e teclado

A lightbox da frota (linha ~939) deve fechar com `Esc` e prender o foco enquanto
aberta (focus trap). Verificar se já faz; se não, implementar.

### `aria-live` no formulário

O estado de sucesso (`setSent(true)`, linha 678) muda o texto na tela, mas leitor
de tela não anuncia. Envolver a mensagem num `<div role="status" aria-live="polite">`.

### `lang` nos vídeos

Os `aria-label` dos vídeos são todos iguais ("Vídeo: Video apresentando as
maquinas", linhas 340-370) e ainda têm erro de digitação. Descrever cada vídeo de
forma distinta — serve para acessibilidade e para o `VideoObject` do JSON-LD.

---

## Critério de aceite

- [ ] Lighthouse Acessibilidade = **100** no mobile e no desktop.
- [ ] Todas as auditorias `color-contrast`, `link-name` e `target-size` passando.
- [ ] Skip link funcional (testar com Tab a partir do topo).
- [ ] Site inteiro navegável só pelo teclado.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Lightbox fecha com Esc.
- [ ] `aria-label` distinto por vídeo, sem erro de digitação.

## Validação

```bash
npx --yes lighthouse@12 https://www.grupomvconstrutora.com.br/ \
  --only-categories=accessibility --output=html --output-path=./lh-a11y \
  --chrome-flags="--headless=old --disable-gpu --no-sandbox" --max-wait-for-load=120000
```

Complementar com [WAVE](https://wave.webaim.org/) e um teste manual só com Tab.

> O Lighthouse detecta cerca de um terço dos problemas reais de acessibilidade.
> 100/100 significa "sem falha automatizável", não "acessível". O teste com
> teclado vale mais que a nota.
