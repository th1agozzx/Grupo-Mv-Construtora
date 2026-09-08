# 14 — Refatorar index.tsx (1.500 linhas) em componentes

- [ ] Concluída em: ****/****/______
- **Prioridade:** P2
- **Esforço:** 3-4 h
- **Impacto:** 🟡 Médio direto — mas é **pré-requisito** da task 08
- **Depende de:** nada (fazer antes da 08)

---

## Problema

```bash
wc -l src/routes/index.tsx
# 1500
```

Um único arquivo contém: constantes de contato, dados dos serviços, dados da
frota, arrays de imagens, arrays de vídeos, FAQ, schema de validação, 6
componentes auxiliares e o componente da página com 10 seções.

### Por que isso bloqueia a task 08

A task 08 cria 6+ páginas novas. Cada uma precisa de header, footer, botão
flutuante do WhatsApp, CTAs e formulário. Com tudo dentro de `index.tsx`, ou se
duplica esse código 6 vezes, ou se extrai primeiro. Duplicar é como sites viram
inconsistentes: o telefone muda e atualiza em 3 dos 7 lugares.

### Sintomas já presentes

- `WHATSAPP_NUMBER` e afins definidos numa página, mas necessários no site todo.
- Menu desktop e mobile com listas duplicadas e **já divergentes** (o desktop não
  tem FAQ — task 10, A4).
- Horário escrito à mão em dois lugares, **já divergentes** (task 10, A2).
- `slideshowImages`, `frotaItens`, `faqs` misturados com JSX.

---

## Estrutura proposta

```
src/
  config/
    empresa.ts          Contato, endereço, CNPJ, horário, redes sociais
    navegacao.ts        Itens do menu (uma fonte só p/ desktop e mobile)
  data/
    servicos.ts
    frota.ts
    faqs.ts
    galeria.ts          slideshowImages, diferenciaisImages, slideshowVideos
  components/
    layout/
      Header.tsx
      Footer.tsx
      WhatsAppFloating.tsx
      SiteLayout.tsx    Header + Outlet + Footer + botão flutuante
    ui-site/
      SectionTitle.tsx
      CTAButton.tsx
    sections/
      Hero.tsx
      VideoSlideshow.tsx
      GaleriaFrota.tsx
      Servicos.tsx
      QuemSomos.tsx
      Diferenciais.tsx
      Faq.tsx
      Localizacao.tsx
      FormularioContato.tsx
  lib/
    schema.ts           JSON-LD (task 03)
    analytics.ts        (task 12)
    contact-schema.ts   (task 13)
  routes/
    index.tsx           ~80 linhas: só compõe as seções
```

> Não mexer em `src/components/ui/` — são os componentes do shadcn, mantidos
> separados por convenção.

### Como fica o `index.tsx`

```tsx
export const Route = createFileRoute("/")({
  head: () => ({ meta: [...], links: [...], scripts: [...] }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <VideoSlideshow />
      <GaleriaFrota />
      <Servicos />
      <QuemSomos />
      <Diferenciais />
      <AreaDeAtuacao />
      <Faq />
      <Localizacao />
      <FormularioContato />
    </>
  );
}
```

O header, o footer e o botão do WhatsApp saem daqui e vão para o `SiteLayout`,
aplicado no `__root.tsx` — assim toda página nova já nasce com eles.

---

## Fonte única para o menu

Resolve os bugs A3 e A4 da task 10 de uma vez:

```ts
// src/config/navegacao.ts
export const itensMenu = [
  { rotulo: "Frota", href: "#frota" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Quem somos", href: "#quem-somos" },
  { rotulo: "Diferenciais", href: "#diferenciais" },
  { rotulo: "FAQ", href: "#faq" },
  { rotulo: "Contato", href: "#contato" },
] as const;
```

Desktop e mobile passam a ler a mesma lista — impossível divergirem de novo.

E `src/config/empresa.ts` centraliza o que hoje está espalhado:

```ts
export const EMPRESA = {
  nome: "MV Construtora",
  cnpj: "14.299.029/0001-20",
  whatsapp: "5598992368928",
  whatsappExibicao: "(98) 99236-8928",
  email: "atendimento@grupomvconstrutora.com.br",
  endereco: "...",
  horario: "Seg a Sex · 07h às 18h",
  fundacao: "2011-09-14",
  cidade: "Pindaré-Mirim",
  estado: "MA",
} as const;
```

O JSON-LD da task 03 passa a ler daqui — um único lugar onde o telefone existe.

---

## Como fazer sem quebrar

1. **Um commit por seção extraída.** Facilita achar o culpado se algo quebrar.
2. Começar pelas mais isoladas: `SectionTitle`, `CTAButton`, `WhatsAppFloating`.
3. Depois as seções puramente visuais: `Hero`, `Servicos`, `Diferenciais`, `Faq`.
4. Por último as que têm estado: `VideoSlideshow`, `GaleriaFrota` (lightbox),
   `FormularioContato`.
5. Conferir visualmente a cada extração — desktop e mobile.
6. Rodar `npm run lint` e `npm run build` antes de cada commit.

> O `AGENTS.md` avisa que os commits sincronizam com o Lovable e que a branch
> precisa ficar sempre em estado funcional. Nada de commit intermediário quebrado.

### Cuidado com o estado compartilhado

`GaleriaFrota` usa `ativa`, `lightbox`, `lightboxIndex` e um `useEffect` de
preload (linhas 655-665). Extrair **todo** esse estado junto do componente, não
deixar metade no pai.

---

## Critério de aceite

- [ ] `index.tsx` com menos de 150 linhas.
- [ ] Nenhum arquivo de componente acima de 250 linhas.
- [ ] Dados de contato definidos em **um único** lugar.
- [ ] Menu desktop e mobile lendo a mesma lista.
- [ ] `npm run lint` sem erros.
- [ ] `npm run build` passando.
- [ ] Site visualmente idêntico ao anterior (comparar screenshots).
- [ ] Lighthouse sem regressão (Performance, A11y, SEO).
- [ ] Todas as âncoras do menu funcionando.

## Validação

```bash
wc -l src/routes/index.tsx
find src/components src/config src/data -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -n | tail -20
npm run lint && npm run build
```

Comparar screenshots antes/depois em desktop e mobile, seção por seção.
