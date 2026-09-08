# 17 — Instagram: vincular, indexar e usar como sinal de entidade

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1
- **Esforço:** 1-2 h (+ ação contínua no perfil)
- **Impacto:** 🟠 Alto — é um dos sinais mais fortes para separar a MV das homônimas
- **Depende de:** task 03 (o `sameAs` mora no JSON-LD)

> **STATUS (02/09/2026 — implementado)**
> ✅ Instagram no `sameAs` com a URL limpa (sem `utm_source`) e link no rodapé com `rel="me"`.
> ✅ **YouTube adicionado:** canal `https://www.youtube.com/@GrupoMVConstrutora` no `sameAs`
> e no rodapé. Os 3 vídeos publicados alimentam a galeria da home com `VideoObject`.
> ✅ Nome de exibição do canal ("MV CONSTRUTORA") **bate com o site** — ao contrário do
> handle do Instagram. O canal é hoje o sinal de entidade mais consistente que temos.
> ⏳ **PENDENTE COM VOCÊ:** os itens da Parte B do Instagram (nome de exibição, bio,
> conta comercial, destaques).

---

## Dados confirmados

| Campo            | Valor                                           |
| ---------------- | ----------------------------------------------- |
| Instagram        | `https://www.instagram.com/grupoconstrutoramv/` |
| Handle Instagram | `@grupoconstrutoramv`                           |
| YouTube          | `https://www.youtube.com/@GrupoMVConstrutora`   |
| Nome no YouTube  | `MV CONSTRUTORA` (confirmado via og:title)      |

> **Usar a URL limpa, sem `?utm_source=qr`.** O parâmetro veio do QR code e não
> deve entrar no `sameAs` nem nos links do site — parâmetro de campanha em link
> permanente polui o dado e pode gerar URL duplicada aos olhos do Google.

### Verificação feita

```bash
curl -sIL https://www.instagram.com/grupoconstrutoramv/
# HTTP 200
```

A URL responde, mas o Instagram bloqueia leitura anônima do conteúdo — **não foi
possível confirmar** nome de exibição, bio, foto ou número de publicações do
perfil. Conferir manualmente os itens da Parte B antes de dar a task por concluída.

---

## ⚠️ Inconsistência de nome detectada

| Onde                    | Nome                                            |
| ----------------------- | ----------------------------------------------- |
| Domínio                 | grupo**mv**construtora.com.br                   |
| E-mail                  | atendimento@grupo**mv**construtora.com.br       |
| Instagram               | @grupo**constructora**mv → `grupoconstrutoramv` |
| YouTube                 | @Grupo**MV**Construtora ✅ consistente          |
| Site (H1, logo, footer) | MV Construtora                                  |

O handle inverte a ordem: **MV Construtora** vs **Construtora MV**.

Isso enfraquece exatamente o sinal que precisamos reforçar — a associação entre
site, perfil e empresa. O Google usa consistência de nome (NAP) para decidir se
duas presenças online são a mesma entidade.

### O que fazer

Não é obrigatório trocar o handle (trocar quebra links já impressos em QR code,
placas e cartões). A solução barata é **alinhar o nome de exibição**:

- **Nome do perfil** (campo "Nome", não o @): `MV Construtora`
- **Bio**: começar com `MV Construtora` e citar Pindaré-Mirim - MA
- **Link na bio**: `https://www.grupomvconstrutora.com.br/`

Com nome de exibição e link batendo, o handle diferente deixa de ser problema.

No JSON-LD (task 03), o campo `alternateName` já cobre a variação:

```ts
alternateName: ["Grupo MV Construtora", "Construtora MV", "MV Construtora Maranhão"],
```

---

## Parte A — Vincular no código

### A1. `sameAs` no JSON-LD (task 03)

```diff
   sameAs: [
-    // PREENCHER com as redes sociais reais da empresa
-    // "https://www.instagram.com/....",
+    "https://www.instagram.com/grupoconstrutoramv/",
+    // adicionar Facebook / LinkedIn / YouTube quando existirem
   ],
```

`sameAs` é o campo que diz ao Google e ao Gemini: "este site e este perfil são a
mesma empresa". É o que consolida a entidade e a separa das homônimas.

### A2. Links visíveis no site

Hoje o site **não tem nenhum link de rede social**. Adicionar em dois lugares:

**Rodapé** (`src/routes/index.tsx:1451+`), nova coluna ou junto do contato:

```jsx
<a
  href="https://www.instagram.com/grupoconstrutoramv/"
  target="_blank"
  rel="me noopener noreferrer"
  aria-label="Instagram da MV Construtora"
  className="mb-3 flex items-center gap-2 text-sm hover:text-red-400"
  onClick={() => evento("clique_social", { rede: "instagram" })}
>
  <Instagram size={16} /> @grupoconstrutoramv
</a>
```

- `rel="me"` é o marcador de identidade — indica que o perfil pertence ao mesmo
  dono do site. Complementa o `sameAs` do JSON-LD.
- `noopener noreferrer` por segurança em `target="_blank"`.
- `Instagram` já existe no `lucide-react`, basta importar.
- O `evento()` vem da task 12.

**Header** — avaliar. O menu já está cheio (6 itens + CTA). Se entrar, que seja
como ícone discreto ao lado do botão de orçamento, não como item de menu.

### A3. Seção de feed (opcional)

Um bloco "Acompanhe nossas obras no Instagram" com as últimas publicações é bom
para conversão — mostra obra recente e prova que a empresa está ativa.

**Cuidado com a task 02:** embed oficial do Instagram carrega ~500 KB de JS de
terceiros e derruba o LCP. Se for fazer, usar carregamento sob demanda (só monta
o embed quando a seção entra na viewport) ou apenas linkar imagens estáticas.

Recomendação: começar só com o link. Avaliar o feed depois que a performance
estiver estabilizada.

---

## Parte B — Otimizar o perfil (fora do código)

Conferir e ajustar manualmente:

- [ ] **Nome de exibição**: `MV Construtora` (não o handle)
- [ ] **Categoria**: Empresa de construção / Empreiteira
- [ ] **Bio** com palavra-chave e local. Sugestão:
      `     MV Construtora
    Terraplenagem • Obras Civis • Locação de Máquinas Pesadas
    📍 Pindaré-Mirim - MA | Atendemos todo o Maranhão
    🏗️ Desde 2011
    👇 Orçamento pelo site
    `
- [ ] **Link na bio** → site (usar Linktree só se houver mais de um destino)
- [ ] **Conta comercial** (Instagram Business), não pessoal — libera métricas,
      botão de contato e endereço no perfil
- [ ] **Botão de contato** com o WhatsApp (98) 99236-8928
- [ ] **Endereço** cadastrado no perfil, igual ao do site e do Google Meu Negócio
- [ ] **Destaques** organizados por serviço: Terraplenagem, Estradas Vicinais,
      Frota, Obras Civis, Munck, Antes e Depois
- [ ] **Foto de perfil** = logo do site (mesma identidade visual)

### Vincular ao Google Meu Negócio

Na ficha do Google (task 06) existe campo de perfis sociais. Preencher com o
Instagram — mais um vínculo entre as presenças.

---

## Parte C — Indexação do perfil no Google

Perfil do Instagram **pode** aparecer no Google, mas não é garantido nem
controlável. O que ajuda:

1. **Link do site para o perfil** (Parte A2) — o Google descobre o perfil pelo link.
2. **`sameAs` no JSON-LD** (Parte A1).
3. **Perfil público** — perfil privado não indexa.
4. **Nome consistente** — reforça a associação de entidade.
5. **Link do perfil para o site** — a bio faz o caminho de volta.

> Sendo direto: você não controla a indexação do Instagram, e o site não deve
> depender dela. O valor real aqui é o **sinal de entidade** — o Google entender
> que site + perfil + ficha do Google são a mesma empresa em Pindaré-Mirim. Isso
> é o que ganha da homônima de outro estado.

### Solicitar indexação

Após publicar os links, usar Inspeção de URL no Search Console (task 06) para a
home. O Google segue os links de saída no rastreamento seguinte.

---

## Parte D — Conteúdo do perfil (contínuo)

O Instagram é fonte natural de material para o site:

- Fotos de obra que alimentam a task 09 (cases) e a task 02 (galeria).
- Vídeos de máquina em operação — o site já tem 5, e o perfil deve ter mais.
- Depoimentos de cliente em stories → pedir autorização e publicar no site (task 09).

Fluxo recomendado: publicar no Instagram → selecionar o melhor → subir no site
com texto próprio. Evita o site ficar estático entre uma task e outra.

---

## Critério de aceite

- [ ] `sameAs` no JSON-LD com a URL limpa do Instagram.
- [ ] Link visível no rodapé, com `rel="me"` e `target="_blank"`.
- [ ] Nome de exibição do perfil = "MV Construtora".
- [ ] Bio com "Terraplenagem", "Pindaré-Mirim" e "Maranhão".
- [ ] Link do site na bio.
- [ ] Conta comercial ativada.
- [ ] Instagram cadastrado na ficha do Google Meu Negócio.
- [ ] Destaques organizados por serviço.
- [ ] Rich Results Test aceitando o `sameAs` sem aviso.
- [ ] Nenhuma URL de rede social com `utm_source` no código.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ > /tmp/mv.html
grep -ao 'instagram.com/[a-z0-9_.]*' /tmp/mv.html | sort -u
grep -ao 'rel="me[^"]*"' /tmp/mv.html
grep -ac "utm_source" /tmp/mv.html   # deve ser 0
```

E buscar no Google por `MV Construtora Pindaré-Mirim instagram` para acompanhar
a associação da entidade ao longo das semanas.
