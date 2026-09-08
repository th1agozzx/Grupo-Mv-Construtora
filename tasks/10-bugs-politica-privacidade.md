# 10 — Correção de bugs + política de privacidade (LGPD)

- [ ] Concluída em: ****/****/______
- **Prioridade:** P2 (o item LGPD é P1 por risco jurídico)
- **Esforço:** 2-3 h
- **Impacto:** 🟡 Médio (+ conformidade legal)
- **Depende de:** nada

> **STATUS PARCIAL (02/09/2026 — implementado)**
> ✅ A1 link vazio do rodapé — corrigido (navegação agora vem de fonte única).
> ✅ A2 horário divergente — unificado na constante `COMPANY_HOURS`.
> ✅ A3 `id="serviços"` → `id="servicos"`.
> ✅ A4 FAQ ausente no menu — resolvido.
> ✅ A5 telefone agora é `href="tel:"`.
> ✅ A6 erro de português no hero — corrigido.
> ✅ A11 imports de imagem não usados — removidos.
> ✅ A9 404 e página de erro traduzidos para pt-BR.
> ✅ A10 emojis de áudio removidos (o player antigo saiu na migração para o YouTube).
> ✅ Parte B: `/politica-de-privacidade` publicada, linkada no rodapé, citando Resend,
> Vercel, Google Maps e YouTube como operadores.
> ✅ **Bug novo corrigido:** o botão "Solicitar orçamento pelo site" saía branco sobre
> branco. Causa: a cor era sobrescrita por `className`, mas base e sobrescrita têm a
> mesma especificidade — quem vencia era a ordem do CSS gerado pelo Tailwind, não a do
> atributo. `CTAButton` agora usa `variante="primaria" | "escura" | "clara"`, sem colisão.
> ⏳ Restam: A7 (texto grudado, sai na task 07), A8 (`alert()` no erro do formulário) e o
> checkbox de consentimento no formulário.

---

## Parte A — Bugs confirmados

### A1. Link vazio no rodapé 🔴

`src/routes/index.tsx:1462`

```jsx
{["Frota", "Serviços", "", "Diferenciais", "Localizacao"].map((x) => (
  <a key={x} href={`#${x.toLowerCase()}`} ...>{x}</a>
))}
```

A string vazia renderiza `<a href="#"></a>` — link sem texto e sem destino.

**Confirmado pelo Lighthouse**, auditoria `link-name` ("Links do not have a
discernible name"), elemento apontado:
`<a href="#" class="mb-3 block text-sm hover:text-red-400">`

Era o "Quem somos", que sumiu da lista. Corrigir:

```jsx
{[
  ["Frota", "#frota"],
  ["Serviços", "#servicos"],
  ["Quem somos", "#quem-somos"],
  ["Diferenciais", "#diferenciais"],
  ["Localização", "#localizacao"],
].map(([rotulo, href]) => (
  <a key={href} href={href} ...>{rotulo}</a>
))}
```

Note que o rótulo também estava escrito sem acento ("Localizacao").

### A2. Horário divergente 🔴 (afeta SEO local)

| Local                                           | Valor                      |
| ----------------------------------------------- | -------------------------- |
| `src/routes/index.tsx:1288` (seção Localização) | Seg a Sex · **07h** às 18h |
| `src/routes/index.tsx:1483` (rodapé)            | Seg a Sex · **08h** às 18h |

Confirmar o correto com o cliente e **unificar numa constante**, junto das outras
no topo do arquivo:

```ts
const HORARIO = "Seg a Sex · 07h às 18h";
```

Precisa bater com o Google Meu Negócio (task 06) e com o `openingHoursSpecification`
do JSON-LD (task 03). Dado divergente entre site e ficha derruba confiança local.

### A3. `id` com acento

`src/routes/index.tsx:1026` usa `id="serviços"`, e a navegação monta o href com
`item.toLowerCase()`. Funciona, mas gera URLs com `%C3%A7` e é frágil.

Trocar para `id="servicos"` e mapear os rótulos explicitamente (como em A1).

### A4. FAQ ausente no menu desktop

O menu mobile (linha 729) tem `FAQ`; o desktop (linha 701) não. Padronizar os dois
a partir de uma única lista.

### A5. Telefone não clicável

`src/routes/index.tsx:1285` — na seção Localização o telefone é texto puro.
No mobile, um número não clicável custa ligação:

```jsx
<a href="tel:+5598992368928" className="flex items-center gap-3">
  <Phone size={16} className="text-red-400" /> {WHATSAPP_DISPLAY}
</a>
```

### A6. Erro de português no hero

`src/routes/index.tsx:783` — "produtividade, qualidade compromisso desde o primeiro
movimento até à entrega". Falta conector e "até à" é português europeu.
Correção proposta na task 04, passo 5.

### A7. Texto grudado em "Quem somos"

`src/routes/index.tsx:1079` — "Nossa História A MV Construtora nasceu...".
Resolvido pela task 07.

### A8. `alert()` no erro do formulário

`src/routes/index.tsx:686` usa `alert("Erro ao enviar mensagem.")`. O projeto já
tem `sonner` instalado (toast). Trocar por toast, mantendo o padrão visual.

### A9. Página 404 em inglês

`src/routes/__root.tsx:14-33` — "Page not found", "The page you're looking for
doesn't exist or has been moved.", "Go home". Site em pt-BR com 404 em inglês.

Traduzir e aproveitar para oferecer links úteis (serviços, contato) em vez de só
"voltar para a home". O mesmo vale para o `ErrorComponent` (linha 35).

### A10. Ícones de áudio como emoji

`src/routes/index.tsx:497` usa `🔇` / `🔊` como ícone, enquanto todo o resto do
site usa `lucide-react`. Trocar por `<Volume2 />` e `<VolumeX />`.

### A11. Imports de imagem não utilizados

Ver task 02, passo 4. `fotodasplacas` (8,6 MB) é importado e nunca usado.

---

## Parte B — Política de privacidade (LGPD)

### Situação atual

`src/routes/index.tsx:1494`:

```jsx
<a href="#" className="hover:text-white">
  Política de privacidade
</a>
```

Link morto. E o formulário de contato coleta **nome, e-mail, telefone e mensagem**
(`src/routes/index.tsx:1338+`) sem qualquer aviso de tratamento de dados.

### Risco

A Lei 13.709/2018 (LGPD) exige base legal e transparência no tratamento de dados
pessoais. Site empresarial que coleta dados de contato sem política de privacidade
está em não conformidade — exposto a notificação da ANPD e a reclamação de titular.

### O que fazer

1. Criar `/politica-de-privacidade` (rota real, ver task 08). Conteúdo mínimo:
   - Quem é o controlador (MV Construtora, CNPJ 14.299.029/0001-20, endereço).
   - Quais dados são coletados (nome, e-mail, telefone, mensagem).
   - Finalidade (responder solicitação de orçamento e contato comercial).
   - Base legal (art. 7º, V — execução de procedimentos preliminares a contrato;
     ou consentimento).
   - Com quem são compartilhados — **citar a Resend**, que é operadora do envio
     de e-mail, e o Google (mapa incorporado e analytics da task 12).
   - Prazo de retenção.
   - Direitos do titular (acesso, correção, exclusão) e canal para exercê-los.
   - Cookies e ferramentas de medição.
   - Data da última atualização.

2. Checkbox de consentimento no formulário:

```jsx
<label className="flex items-start gap-2 text-xs text-zinc-600">
  <input type="checkbox" required {...register("consentimento")} />
  <span>
    Concordo com o tratamento dos meus dados para retorno deste contato, conforme a{" "}
    <a href="/politica-de-privacidade" className="underline">
      Política de Privacidade
    </a>
    .
  </span>
</label>
```

Adicionar `consentimento: z.literal(true, { message: "É necessário aceitar a política de privacidade" })`
ao `contactSchema` (linha ~236).

3. Trocar o `href="#"` do rodapé pelo link real.

4. Se a task 12 adicionar analytics, avaliar banner de cookies. Com GA4 no modo
   consent, o banner passa a ser exigível.

> Esta é uma orientação técnica de conformidade, não parecer jurídico. Para um
> cliente que atende obra pública, vale o texto final passar por um advogado.

---

## Critério de aceite

- [ ] Nenhum `<a href="#">` sem texto no HTML.
- [ ] Auditoria `link-name` do Lighthouse passando.
- [ ] Horário unificado numa constante e idêntico ao do Google Meu Negócio.
- [ ] `id="servicos"` sem acento, navegação funcionando.
- [ ] FAQ presente nos dois menus.
- [ ] Telefone com `href="tel:"`.
- [ ] `alert()` substituído por toast.
- [ ] 404 e página de erro em português.
- [ ] Ícones de áudio via lucide-react.
- [ ] `/politica-de-privacidade` publicada e linkada no rodapé.
- [ ] Checkbox de consentimento obrigatório no formulário.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ > /tmp/mv.html
grep -ao '<a href="#"[^>]*></a>' /tmp/mv.html | wc -l   # deve ser 0
grep -aoc "07h às 18h\|08h às 18h" /tmp/mv.html
curl -s -o /dev/null -w "%{http_code}\n" https://www.grupomvconstrutora.com.br/politica-de-privacidade
```
