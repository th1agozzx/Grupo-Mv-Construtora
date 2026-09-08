# 07 — Reestruturar a seção "Quem somos" em HTML semântico

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1
- **Esforço:** 45 min
- **Impacto:** 🟠 Alto (legibilidade por IA)
- **Depende de:** nada

---

## Problema

Toda a história da empresa — 5 parágrafos e uma lista de 7 serviços — está dentro
de **um único elemento `<p>`**, separada por `<br />`, com asteriscos `*` fazendo
papel de marcador de lista.

Arquivo: `src/routes/index.tsx`, linhas **1079-1116**.

### Por que isso importa

Para um extrator (Google, Gemini, leitor de tela) isso é um blocão de texto sem
hierarquia. A lista de serviços — que é o conteúdo mais valioso da seção — fica
indistinguível de prosa. Um `<ul><li>` real é lido como lista estruturada e tem
muito mais chance de virar resposta direta.

### Defeitos concretos

1. **Texto grudado** na linha 1079: `Nossa História A MV Construtora nasceu do sonho...`
   — falta a quebra entre o título e o texto.
2. **Lista fake com asteriscos**: `<br />* Terraplenagem; * Construção e recuperação...`
3. **`<br />` como espaçamento** em vez de parágrafos separados.
4. **Nenhum H3** — a seção inteira tem só o H2 do `SectionTitle`.
5. **Parágrafo comentado** nas linhas 1110-1112 (sobre relacionamentos duradouros
   e desenvolvimento das comunidades) — é bom conteúdo desativado sem motivo aparente.
   Confirmar com o cliente se pode voltar.
6. **Grid de 3 colunas com 2 itens** (linha 1120): `grid-cols-3` com apenas
   `+11 anos` e `100% compromisso`, porque `+50 obras entregues` está comentado na
   linha 1124 — sobra uma coluna vazia. Ver task 09.

---

## Estrutura proposta

```jsx
<div>
  <SectionTitle eyebrow="Quem somos" title="Construção que nasce da experiência de campo." light />

  <div className="mt-7 max-w-lg space-y-5 leading-7 text-white/70">
    <h3 className="text-xl font-semibold text-white">Nossa história</h3>
    <p>
      A MV Construtora nasceu do sonho, da determinação e da visão empreendedora de{" "}
      <strong>Alan Robson Leite Pereira</strong>, que fundou a empresa em
      <time dateTime="2011-09-14"> 14 de setembro de 2011</time>, em Pindaré-Mirim, no Maranhão.
    </p>
    <p>
      Filho de Maria Aparecida e de José de Anchieta (in memoriam), Alan sempre acreditou que o
      trabalho realizado com honestidade, dedicação e compromisso é capaz de transformar vidas e
      construir um legado. Corretor de imóveis por formação e empreendedor por vocação, é casado com
      Talita Mendes e pai de Miguel Ângelo e Alan Vinícius.
    </p>

    <h3 className="pt-2 text-xl font-semibold text-white">A origem do nome</h3>
    <p>
      Foi justamente do maior patrimônio de sua vida — sua família — que surgiu o nome da empresa. A
      união das iniciais de seus filhos, <strong>M</strong>iguel e <strong>V</strong>inícius, deu
      origem à MV Construtora, simbolizando que cada obra carrega os mesmos valores cultivados
      dentro de casa: responsabilidade, confiança, respeito e compromisso com o futuro.
    </p>

    <h3 className="pt-2 text-xl font-semibold text-white">Nossa trajetória</h3>
    <p>
      Ao longo de sua trajetória, a empresa atuou na construção de edifícios e residências,
      adquirindo sólida experiência no setor da construção civil. Com o passar dos anos,
      acompanhando as necessidades do mercado e investindo continuamente em pessoas, equipamentos e
      tecnologia, a MV Construtora expandiu sua atuação e especializou-se em obras de terraplenagem
      e infraestrutura no Maranhão.
    </p>

    <h3 className="pt-2 text-xl font-semibold text-white">Serviços em que somos referência</h3>
    <ul className="list-disc space-y-2 pl-5 marker:text-red-500">
      <li>Terraplenagem</li>
      <li>Construção e recuperação de estradas vicinais</li>
      <li>Escavação, corte e aterro</li>
      <li>Regularização e nivelamento de terrenos</li>
      <li>Preparação de solo para plantio e empreendimentos agrícolas</li>
      <li>Limpeza e conformação de áreas</li>
      <li>Movimentação de terra para obras públicas e privadas</li>
    </ul>

    <p>
      Cada projeto é conduzido com planejamento, segurança, qualidade técnica e respeito aos prazos
      estabelecidos, buscando sempre superar as expectativas de clientes e parceiros.
    </p>
    <p className="font-medium text-white">
      MV Construtora — movendo a terra, construindo o futuro e deixando um legado de confiança,
      excelência e compromisso em cada projeto.
    </p>
  </div>
</div>
```

### Ganhos

| Antes                         | Depois                         |
| ----------------------------- | ------------------------------ |
| 1 `<p>` com 5 parágrafos      | 6 `<p>` separados              |
| 0 subtítulos                  | 4 `<h3>`                       |
| Lista com `*` dentro de texto | `<ul>` com 7 `<li>`            |
| Data como texto solto         | `<time dateTime="2011-09-14">` |
| "Maranhão" ausente            | citado 2× naturalmente         |

O `<time>` com `dateTime` é lido diretamente pelo Google e casa com o campo
`foundingDate` do JSON-LD (task 03) — reforço cruzado do mesmo fato.

---

## Passos

1. Substituir o bloco das linhas 1079-1116 pela estrutura acima.
2. Corrigir o texto grudado "Nossa História A MV Construtora".
3. Decidir com o cliente sobre o parágrafo comentado (linhas 1110-1112).
4. Ajustar o grid de estatísticas de `grid-cols-3` para `grid-cols-2` enquanto
   houver apenas 2 números (ou resolver via task 09, preenchendo o terceiro).
5. Conferir se o texto continua legível no mobile (a coluna fica estreita).

---

## Critério de aceite

- [ ] Nenhum `<br />` usado como espaçamento entre parágrafos na seção.
- [ ] Lista de serviços em `<ul>`/`<li>` real.
- [ ] Pelo menos 3 `<h3>` na seção.
- [ ] Hierarquia de headings sem salto (H1 → H2 → H3).
- [ ] Sem texto grudado.
- [ ] Grid de estatísticas sem coluna vazia.
- [ ] Layout mobile conferido.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ > /tmp/mv.html
grep -ao "<h[1-6][^>]*>[^<]*" /tmp/mv.html | sed 's/<h\([1-6]\)[^>]*>/h\1: /'
grep -ao "<li>" /tmp/mv.html | wc -l
```

Conferir também no [WAVE](https://wave.webaim.org/) se a ordem dos headings está
correta.
