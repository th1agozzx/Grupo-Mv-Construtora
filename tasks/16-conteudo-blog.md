# 16 — Conteúdo recorrente (blog / central de conhecimento)

- [ ] Concluída em: ****/****/______
- **Prioridade:** P3 (começar depois que 01-12 estiverem prontas)
- **Esforço:** contínuo — 1 artigo a cada 2 semanas
- **Impacto:** 🟠 Alto no longo prazo — é o que sustenta a liderança
- **Depende de:** task 08 (estrutura de rotas)

---

## Por que isso importa

As tasks 01-15 colocam o site em condição de competir. **Conteúdo é o que mantém
a posição.** Um site institucional estático fica congelado; um site que publica
regularmente acumula palavras-chave de cauda longa e vira referência.

Para IA especificamente: modelos citam fontes que **respondem perguntas
específicas com dados concretos**. Uma home institucional raramente é citada.
Um artigo "Quanto custa terraplenagem por hora no Maranhão" com números reais é
exatamente o tipo de conteúdo que o Gemini usa e credita.

---

## Pauta inicial (12 artigos)

Ordenados por potencial de busca e facilidade de escrita.

| #   | Título                                                          | Intenção      | Por que funciona                                                    |
| --- | --------------------------------------------------------------- | ------------- | ------------------------------------------------------------------- |
| 1   | Quanto custa terraplenagem por hora no Maranhão?                | comercial     | busca de altíssima intenção; quase ninguém responde com honestidade |
| 2   | Terraplenagem ou terraplanagem? Qual a grafia correta           | informacional | captura as duas grafias de uma vez                                  |
| 3   | Qual máquina usar em cada etapa da terraplenagem                | informacional | usa as fotos da frota que já existem                                |
| 4   | Escavadeira, pá-carregadeira ou retroescavadeira?               | comparativo   | dúvida real de quem vai alugar                                      |
| 5   | Quanto tempo leva para terraplanar um terreno de 1.000 m²?      | comercial     | pergunta literal digitada no Google                                 |
| 6   | Documentação e licenças para terraplenagem no Maranhão          | informacional | ninguém local cobre; posiciona como autoridade                      |
| 7   | Como preparar solo para plantio: guia para produtor rural       | segmento      | público agrícola, já citado na seção Quem somos                     |
| 8   | Recuperação de estradas vicinais: como funciona                 | institucional | serviço com forte demanda de prefeitura                             |
| 9   | Locação com ou sem operador: o que compensa                     | comercial     | ligado direto ao serviço 03                                         |
| 10  | Erros que encarecem uma obra de terraplenagem                   | informacional | conteúdo de autoridade                                              |
| 11  | Corte e aterro: entenda a diferença                             | informacional | termo técnico muito buscado                                         |
| 12  | Época de chuva no Maranhão: como planejar movimentação de terra | sazonal       | específico da região, alto valor                                    |

O item 12 é o tipo de conteúdo que **nenhuma concorrente de fora do estado
consegue escrever com propriedade**. É vantagem estrutural.

---

## Formato de cada artigo

- **1.200-2.000 palavras** de conteúdo original.
- **H1** com a pergunta exata que a pessoa digita.
- **Resposta direta nos 2 primeiros parágrafos** — é o trecho que a IA extrai.
  Não enrolar antes de responder.
- **H2/H3** organizando os subtemas.
- **Tabelas e listas** — formatos que a IA extrai com facilidade.
- **Números e faixas reais.** Sobre preço: mesmo sem valor fechado, explicar o
  que compõe o custo (tipo de solo, volume em m³, distância de mobilização,
  prazo, época do ano) já é mais útil do que 90% dos concorrentes.
- **Fotos próprias** das obras, com alt descritivo.
- **CTA no fim** para orçamento.
- **Links internos** para as páginas de serviço (task 08).
- **JSON-LD `Article`** com `author`, `datePublished`, `dateModified`.

### O que não fazer

- Texto gerado por IA sem revisão e sem dado próprio. É exatamente o que o Google
  classifica como conteúdo de baixo valor.
- Artigo de 300 palavras só para "ter conteúdo". Página fina prejudica o site todo.
- Publicar sem cadência. Melhor 1 artigo bom por mês do que 8 num mês e nada
  depois.

O diferencial aqui é ter **11 anos de obra real** e fotos próprias — algo que
nenhum concorrente copia.

---

## Implementação técnica

Com TanStack Router, opções:

1. **Markdown + frontmatter** — arquivos `.md` em `src/content/blog/`, lidos no
   build. Simples, versionado no Git, sem custo.
2. **CMS headless** (Sanity, Contentful) — permite o cliente publicar sozinho,
   mas adiciona custo e complexidade.

Recomendação: começar com Markdown. Migrar para CMS só se o cliente quiser
publicar sem passar por você.

```
src/routes/
  blog/
    index.tsx      lista de artigos
    $slug.tsx      artigo individual
src/content/blog/
  quanto-custa-terraplenagem-maranhao.md
```

Cada artigo precisa entrar no `sitemap.xml` (task 05) — vale automatizar a
geração no build.

---

## Distribuição

Publicar não basta. Para cada artigo:

- [ ] Post no Google Meu Negócio linkando o artigo (task 06).
- [ ] Post no Instagram/Facebook da empresa.
- [ ] Envio no WhatsApp para clientes da base, quando for relevante.
- [ ] Solicitar indexação no Search Console.

---

## Metas de acompanhamento

| Prazo    | Meta                                            |
| -------- | ----------------------------------------------- |
| 3 meses  | 6 artigos publicados; 20+ páginas indexadas     |
| 6 meses  | 12 artigos; primeiras posições de cauda longa   |
| 12 meses | tráfego orgânico como principal origem de leads |

Acompanhar no Search Console (task 06): impressões, cliques e posição média por
consulta — e no GA4 (task 12) quantos artigos geram clique no WhatsApp.

---

## Critério de aceite

- [ ] Estrutura `/blog` funcionando com listagem e artigo individual.
- [ ] Mínimo de 6 artigos publicados em 3 meses.
- [ ] Todos com 1.200+ palavras e conteúdo original.
- [ ] Todos com JSON-LD `Article`.
- [ ] Todos no sitemap.
- [ ] Cadência mantida por 6 meses.
- [ ] Pelo menos 1 artigo aparecendo em resultado de IA ou featured snippet.

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/sitemap.xml | grep -c "<loc>"
```

Buscar no Google por trechos exatos dos artigos e verificar a indexação; testar
as mesmas perguntas no Gemini para ver se o site é citado.
