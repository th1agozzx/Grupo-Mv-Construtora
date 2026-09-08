# 04 — SEO local: colocar "Maranhão" e as cidades no site

- [ ] Concluída em: ****/****/______
- **Prioridade:** P0
- **Esforço:** 1-2 h
- **Impacto:** 🔴 Altíssimo — é o motivo nº 1 de perder para as homônimas
- **Depende de:** nada (mas a task 03 depende desta)

> **STATUS (02/09/2026 — implementado)**
> ✅ Title, description, H1, eyebrow e parágrafo do hero reescritos com "Maranhão" e "Pindaré-Mirim".
> ✅ Endereço corrigido; horário unificado numa constante (07h-18h).
> ✅ Seção "Área de atuação" criada com 12 cidades; faixa de destaques com as 10 frentes.
> ✅ FAQ de regiões reescrita + nova pergunta sobre serviços.
> ✅ Alt texts reescritos com contexto local.
> 📊 "Maranhão": **0 → 42** ocorrências. "terraplenagem": 2 → 29.
> ⏳ **PENDENTE COM VOCÊ:** confirmar a lista de cidades (`CIDADES_ATENDIDAS` em `src/data/servicos.ts`) e o horário real.

> **ESCOPO AMPLIADO EM 04/09/2026:** esta task tratava só do Maranhão. A área de
> atuação passou a ser **Maranhão, Piauí e Ceará** — ver
> [task 18](18-area-de-atuacao-multiestado.md). A lista de cidades saiu daqui e de
> `servicos.ts` e vive agora em `src/data/regioes.ts`.

---

## Problema

**A palavra "Maranhão" aparece 0 vezes no site inteiro.**

### Evidência (contagem no HTML servido em produção)

| Termo      | Ocorrências               |
| ---------- | ------------------------- |
| Maranhão   | **0**                     |
| Pindaré    | 1 (só dentro do endereço) |
| Açailândia | 0                         |
| Santa Inês | 0                         |
| Bacabal    | 0                         |
| Imperatriz | 0                         |
| São Luís   | 0                         |

Existem outras empresas chamadas "MV Construtora" no Brasil. Para o algoritmo do
Google, sem nenhum marcador geográfico, todas são a mesma entidade genérica — e
nesse empate quem tem mais autoridade e idade de domínio ganha. Hoje o site não dá
ao Google **nenhuma** informação para saber que esta é a MV Construtora do Maranhão.

---

## Passos

### 1. Title (`src/routes/index.tsx:78`)

```diff
-title: "MV Construtora | Terraplanagem, locação de máquinas e gestão de obras"
+title: "MV Construtora Pindaré-Mirim MA | Terraplenagem e Locação de Máquinas no Maranhão"
```

Regras: até ~60 caracteres visíveis, marca + serviço + local. O local é o
diferenciador competitivo aqui.

### 2. Meta description (`src/routes/index.tsx:82`)

```diff
-"MV Construtora: terraplanagem, locação de máquinas pesadas e gestão de obras com segurança, pontualidade e resultado no canteiro."
+"Terraplenagem, locação de máquinas pesadas e gestão de obras no Maranhão. Sede em Pindaré-Mirim, atendendo Santa Inês, Bacabal, Zé Doca e todo o Vale do Pindaré desde 2011."
```

Até ~155 caracteres. Inclui local, serviços e prova de tempo de mercado.

### 3. H1 (`src/routes/index.tsx:772`)

Hoje o H1 é apenas o slogan — bonito, mas comercialmente vazio. O H1 é o sinal
mais forte da página.

```diff
-<motion.h1 ...>
-  Força para executar. <span className="text-white/60">Precisão para entregar.</span>
-</motion.h1>
+<motion.h1 ...>
+  Terraplenagem e Locação de Máquinas Pesadas no{" "}
+  <span className="text-white/60">Maranhão</span>
+</motion.h1>
+<p className="mt-3 text-lg font-medium text-white/80">
+  Força para executar. Precisão para entregar.
+</p>
```

O slogan continua visível, só deixa de ser o H1.

### 4. Eyebrow do hero (`src/routes/index.tsx:769`)

```diff
-Construção que move o futuro
+Pindaré-Mirim · Maranhão · Desde 2011
```

### 5. Parágrafo do hero (`src/routes/index.tsx:783`)

Além de não citar o estado, o texto atual tem erro de português:
"produtividade, qualidade compromisso desde o primeiro movimento até à entrega"
(falta conector, e "até à" é português europeu).

```diff
-Terraplanagem, locação de máquinas pesadas e gestão de obras com segurança,
-produtividade, qualidade compromisso desde o primeiro movimento até à entrega.
+Terraplenagem, locação de máquinas pesadas e gestão de obras em todo o Maranhão,
+com segurança, produtividade e compromisso do primeiro movimento de terra até a entrega.
```

### 6. Nova seção "Onde atendemos"

Inserir entre "Diferenciais" e "FAQ". É a seção que mais alimenta busca local e
respostas de IA do tipo "empresa de terraplenagem perto de mim".

```jsx
const cidadesAtendidas = [
  "Pindaré-Mirim",
  "Santa Inês",
  "Bacabal",
  "Zé Doca",
  "Santa Luzia",
  "Monção",
  "Tufilândia",
  "Alto Alegre do Pindaré",
  "Bom Jardim",
  "Governador Newton Bello",
  "Açailândia",
  "Imperatriz",
  "São Luís",
];

<section id="area-de-atuacao" className="...">
  <SectionTitle
    eyebrow="Área de atuação"
    title="Terraplenagem e locação de máquinas em todo o Maranhão."
  />
  <p className="mt-7 max-w-2xl leading-7 text-zinc-600">
    Com base em Pindaré-Mirim, na região do Vale do Pindaré, a MV Construtora mobiliza máquinas e
    equipes para obras urbanas, rurais, industriais e comerciais em todo o estado do Maranhão.
  </p>
  <ul className="mt-8 flex flex-wrap gap-2">
    {cidadesAtendidas.map((cidade) => (
      <li key={cidade} className="rounded-full border border-zinc-300 px-4 py-2 text-sm">
        Terraplenagem em {cidade} - MA
      </li>
    ))}
  </ul>
</section>;
```

> **Confirmar a lista com o cliente.** Só listar cidades onde a empresa
> realmente mobiliza. Listar cidade onde não atende gera lead ruim e, se o
> usuário reclamar, é sinal negativo de qualidade.

### 7. Corrigir o endereço (`src/routes/index.tsx:67`)

O valor atual mistura cidade com rodovia e nunca diz o estado por extenso:

```diff
-const COMPANY_ADDRESS = "Próximo ao Condomínio OASIS - Pitombeira, Pindaré-Mirim/MA-320, 65370-000";
+const COMPANY_ADDRESS = "Rodovia MA-320, Pitombeira (próximo ao Condomínio OASIS) — Pindaré-Mirim - MA, CEP 65370-000";
```

> Confirmar com o cliente se o endereço é mesmo na MA-320 e se há número/km.
> Esse texto precisa ficar **idêntico** ao cadastrado no Google Meu Negócio
> (task 06) — divergência de NAP derruba a confiança no ranking local.

### 8. Ajustar o FAQ (`src/routes/index.tsx:212-215`)

A resposta atual é o oposto do que o SEO local precisa:

```diff
-"Quais regiões a MV Construtora atende?",
-"Atendemos obras urbanas, rurais, industriais e comerciais. Fale com nossa equipe para confirmar a mobilização até a sua região."
+"Quais cidades do Maranhão a MV Construtora atende?",
+"A MV Construtora tem sede em Pindaré-Mirim (MA) e atende todo o Maranhão, com presença frequente em Santa Inês, Bacabal, Zé Doca, Santa Luzia, Monção, Alto Alegre do Pindaré, Açailândia, Imperatriz e São Luís. Executamos obras urbanas, rurais, industriais e comerciais."
```

Essa resposta é exatamente o formato que o Gemini extrai e cita.

### 8b. Cobrir os serviços que hoje não aparecem no site

A lista oficial do cliente tem **10 categorias**; o site anuncia **5**
(`src/routes/index.tsx:100-131`). Seis serviços não existem em lugar nenhum do
HTML — ou seja, a empresa não disputa nenhuma dessas buscas:

- Obras civis
- Drenagem e infraestrutura
- Preparação e limpeza de áreas
- Serviços com caminhão Munck
- Apoio a grandes obras
- Serviços para propriedades rurais

O tratamento completo (páginas dedicadas) é a **task 08**. Nesta task, o mínimo é
fazer as 10 categorias aparecerem na home. A faixa enviada pelo cliente serve
diretamente, logo abaixo do hero:

> Terraplanagem • Obras Civis • Infraestrutura • Pavimentação • Drenagem •
> Locação de Máquinas Pesadas • Transporte de Equipamentos • Serviços com Munck •
> Estradas Vicinais • Movimentação de Terra

Densa em palavra-chave, aparece cedo no HTML e resume a empresa em uma linha.

Termos técnicos que valem entrar no texto (são busca real e hoje somam zero
ocorrências): _patrolamento_, _cascalhamento_, _destocamento_, _corte e aterro_,
_sub-base_, _drenagem pluvial_, _bueiro_, _içamento_, _açude_, _caminhão Munck_,
_caminhão basculante_, _caçamba_.

### 9. Padronizar "terraplanagem" vs "terraplenagem"

O site usa as duas grafias (6× "terraplanagem", 2× "terraplenagem"). **"Terraplenagem"
é a grafia correta**, mas "terraplanagem" tem volume de busca relevante.

Estratégia: usar **"terraplenagem"** como forma principal (títulos, H1, H2, schema)
e citar "terraplanagem" naturalmente 1-2 vezes no corpo do texto, por exemplo:
"Serviços de terraplenagem (também chamada de terraplanagem) em todo o Maranhão."

Assim cobre as duas buscas sem parecer erro nem keyword stuffing.

### 10. Alt text das imagens com contexto local

Hoje: `alt="Equipe da MV Construtora em obra"`.
Melhor: `alt="Equipe da MV Construtora em obra de terraplenagem em Pindaré-Mirim, Maranhão"`.

Aplicar nos arrays `slideshowImages` (linha ~185) e `diferenciaisImages` (linha ~205).
Descrever o que a foto realmente mostra — alt genérico repetido é sinal de spam.

---

## Critério de aceite

- [ ] "Maranhão" aparece **15 vezes ou mais** no HTML servido.
- [ ] Pelo menos 8 cidades citadas com nome.
- [ ] As 10 categorias de serviço citadas na home.
- [ ] Termos técnicos (patrolamento, cascalhamento, destocamento, Munck) presentes.
- [ ] H1 contém "Terraplenagem" e "Maranhão".
- [ ] Title tem ≤ 60 caracteres e contém marca + serviço + local.
- [ ] Meta description tem ≤ 160 caracteres e contém local.
- [ ] Endereço idêntico ao do Google Meu Negócio.
- [ ] Nenhum erro de português no texto do hero.
- [ ] Nenhuma cidade listada onde a empresa não atende de fato.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ > /tmp/mv.html
for k in "Maranhão" "Pindaré" "Santa Inês" "Bacabal" "Imperatriz" "terraplenagem"; do
  printf "%-16s %s\n" "$k" "$(grep -aoi "$k" /tmp/mv.html | wc -l)"
done
grep -ao "<h1[^>]*>[^<]*" /tmp/mv.html
```
