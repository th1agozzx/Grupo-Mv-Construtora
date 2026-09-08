---
name: novo-post-blog-mv
description: Cria artigos em Markdown para o blog da MV Construtora, seguindo padrão editorial, SEO e dados verificáveis.
---

# Novo post do blog MV Construtora

Use esta skill ao criar ou revisar um artigo em `src/content/blog/`.

## Processo obrigatório

1. Leia `src/data/servicos.ts`, `src/data/frota.ts` e `tasks/16-conteudo-blog.md` antes de escrever. Eles são as fontes de fatos e links internos permitidos.
2. Crie um arquivo `src/content/blog/<slug>.md`, em português do Brasil, com o frontmatter abaixo. Não publique frontmatter incompleto.

```yaml
---
titulo: Pergunta exata que a pessoa digita no Google
descricao: Resumo claro do artigo, sem promessas não verificadas.
publicadoEm: AAAA-MM-DD
atualizadoEm: AAAA-MM-DD
autor: MV Construtora
servicos: slug-de-servico, outro-slug
---
```

3. O campo `titulo` é o H1 exibido pela rota e deve ser exatamente a pergunta ou intenção de busca principal. Não escreva outro H1 no corpo do Markdown.
4. Escreva entre 1.200 e 2.000 palavras de conteúdo original. Dê a resposta direta nos dois primeiros parágrafos; não comece com apresentação institucional ou marketês.
5. Organize o restante com H2/H3, pelo menos uma lista e uma tabela. Use linguagem de obra: direta, concreta e fácil de entender.
6. Inclua links Markdown para pelo menos dois serviços reais, usando apenas `/servicos/<slug>` existentes em `src/data/servicos.ts`. Links para equipamentos podem usar `/frota/<slug>` existentes.
7. Explique faixas, custos ou prazos apenas quando houver dado fornecido e verificável. Se não houver, explique os fatores que mudam o valor. Nunca invente número de obras, avaliações, cidades atendidas, capacidades, preços, produtividade ou fatos sobre clientes.

## Tom e limites

- Direto, técnico quando necessário e sem palavras vazias como “excelência”, “solução completa” ou “líder de mercado”.
- Fale do Maranhão apenas quando isso for relevante para solo, chuva, distância, acesso ou planejamento; não force repetição de localidade.
- Não copie blocos de outro post ou de páginas de serviço. Cada artigo precisa responder uma intenção própria.
- Não use HTML no Markdown. A rota aceita títulos H2/H3, parágrafos, listas, tabelas, negrito, código curto e links internos.

## Revisão antes de entregar

- Frontmatter completo e datas em `AAAA-MM-DD`.
- 1.200–2.000 palavras.
- Resposta nos dois primeiros parágrafos.
- H2/H3, tabela e lista presentes.
- Dois ou mais links internos válidos.
- Nenhum número ou alegação não confirmado.
- Tom direto e útil para quem está planejando obra.
