# Tasks — Projeto MV Construtora

Backlog de melhorias para tornar o site `www.grupomvconstrutora.com.br` o resultado
dominante para "MV Construtora" e para buscas de terraplenagem no Maranhão, Piauí e
Ceará, e para que o Gemini / AI Overviews consigam ler e recomendar a empresa.

> A área de atuação foi ampliada em 04/09/2026 de "Maranhão" para os três estados.
> A fonte única de estados e cidades é `src/data/regioes.ts` — ver
> [task 18](18-area-de-atuacao-multiestado.md).

## Linha de base (02/09/2026)

Medida com Lighthouse 12.8.2 (mesma engine do PageSpeed Insights).
Detalhamento completo em [BASELINE-2026-09-02.md](BASELINE-2026-09-02.md).

| Categoria               | Mobile | Desktop |
| ----------------------- | ------ | ------- |
| Performance             | **65** | 86      |
| Acessibilidade          | **86** | 86      |
| Boas práticas           | 100    | 100     |
| SEO (checklist técnico) | 100    | 100     |

| Métrica    | Mobile      | Meta     |
| ---------- | ----------- | -------- |
| LCP        | **35,5 s**  | < 2,5 s  |
| FCP        | 3,5 s       | < 1,8 s  |
| CLS        | 0           | < 0,1    |
| TBT        | 0 ms        | < 200 ms |
| Peso total | **15,4 MB** | < 1,5 MB |

> ⚠️ O "SEO 100" do Lighthouse é um checklist raso (title, description, viewport,
> links rastreáveis). Ele NÃO mede schema.org, robots.txt, sitemap, canonical,
> autoridade ou conteúdo. Não use esse número isolado como argumento de qualidade.

## Índice

| #   | Task                                                                           | Prioridade | Esforço            | Impacto               |
| --- | ------------------------------------------------------------------------------ | ---------- | ------------------ | --------------------- |
| 01  | [Rotacionar chave Resend + .gitignore](01-seguranca-chave-resend.md)           | P0         | 15 min             | 🔴 Segurança          |
| 02  | [Comprimir imagens e vídeos](02-otimizacao-imagens-videos.md)                  | P0         | 3 h                | 🔴 Altíssimo          |
| 03  | [Dados estruturados JSON-LD](03-json-ld-schema.md)                             | P0         | 2 h                | 🔴 Altíssimo (IA)     |
| 04  | [SEO local: Maranhão + cidades](04-seo-local-maranhao.md)                      | P0         | 1-2 h              | 🔴 Altíssimo          |
| 05  | [robots.txt, sitemap, canonical, og:image](05-robots-sitemap-canonical-og.md)  | P1         | 1-2 h              | 🟠 Alto               |
| 06  | [Google Meu Negócio + Search Console](06-google-meu-negocio-search-console.md) | P0         | 1-2 h              | 🔴 Altíssimo          |
| 07  | [Reestruturar "Quem somos"](07-reestruturar-quem-somos.md)                     | P1         | 45 min             | 🟠 Alto               |
| 08  | [Páginas separadas por serviço (10 categorias)](08-paginas-por-servico.md)     | P1         | 2-4 dias           | 🟠 Alto               |
| 09  | [Depoimentos + números reais](09-provas-sociais-numeros.md)                    | P1         | depende do cliente | 🟠 Alto               |
| 10  | [Bugs + política de privacidade](10-bugs-politica-privacidade.md)              | P2         | 2-3 h              | 🟡 Médio              |
| 11  | [Acessibilidade 86 → 100](11-acessibilidade-100.md)                            | P2         | 1-2 h              | 🟡 Médio              |
| 12  | [Analytics e rastreio de conversão](12-analytics-conversoes.md)                | P1         | 1-2 h              | 🟠 Alto               |
| 13  | [Anti-spam e UX do formulário](13-antispam-formulario.md)                      | P2         | 1-2 h              | 🟡 Médio              |
| 14  | [Refatorar index.tsx (1.500 linhas)](14-refatoracao-componentes.md)            | P2         | 3-4 h              | 🟡 Base para a 08     |
| 15  | [Headers de segurança HTTP](15-headers-seguranca.md)                           | P3         | 30 min             | 🟢 Baixo              |
| 16  | [Conteúdo recorrente / blog](16-conteudo-blog.md)                              | P3         | contínuo           | 🟠 Alto (longo prazo) |
| 17  | [Instagram: vincular e indexar](17-instagram-redes-sociais.md)                 | P1         | 1-2 h              | 🟠 Alto               |
| 18  | [Área de atuação: MA, PI e CE + CNPJ](18-area-de-atuacao-multiestado.md)       | P0         | 3 h                | 🔴 Altíssimo          |

## Ordem de execução recomendada

```
01 ──▶ (desbloqueio de segurança, independente)
06 ──▶ (fazer HOJE: Search Console só coleta dados a partir do cadastro)
02 ──▶ 12 ──▶ 04 ──▶ 03 ──▶ 18 ──▶ 17 ──▶ 05 ──▶ 07 ──▶ 11 ──▶ 13 ──▶ 10 ──▶ 14 ──▶ 08 ──▶ 09 ──▶ 15 ──▶ 16
```

Justificativa da ordem:

- **01** é risco ativo de segurança; não depende de nada.
- **06** primeiro porque o Search Console só mostra dados a partir do cadastro. Quanto
  antes, mais dias de linha de base para comparar depois.
- **02** antes de tudo em performance: sozinha leva o Performance mobile de 65 → ~95.
- **04** antes de **03** para o JSON-LD já nascer com o texto e as cidades corretas.
- **17** logo após a **03** porque o `sameAs` do Instagram mora no JSON-LD.
- **14** antes de **08** porque criar 14 páginas a partir de um arquivo de 1.500
  linhas duplicaria código.
- **18** depois da **03** e da **04**: ela amplia o que essas duas montaram, trocando
  a lista de cidades por uma estrutura de três estados.

## Como medir o resultado

Rode o mesmo comando do "antes" para gerar o "depois":

```bash
npx --yes lighthouse@12 https://www.grupomvconstrutora.com.br/ --output=html --output-path=./lh-depois --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=old --disable-gpu --no-sandbox" --max-wait-for-load=120000
```

Placar-alvo ao fim do backlog:

| Indicador                            | Antes     | Meta      |
| ------------------------------------ | --------- | --------- |
| Performance mobile                   | 65        | 95+       |
| LCP mobile                           | 35,5 s    | < 2,0 s   |
| Peso da página                       | 15,4 MB   | < 1,0 MB  |
| Acessibilidade                       | 86        | 100       |
| Blocos JSON-LD válidos               | 0         | 4+        |
| robots.txt / sitemap.xml             | 404 / 404 | 200 / 200 |
| Menções a "Maranhão"                 | 0         | 15+       |
| Estados no `areaServed`              | 0         | 3         |
| Cidades no `areaServed`              | 0         | 47        |
| Categorias de serviço no site        | 5         | 10        |
| Perfis sociais vinculados (`sameAs`) | 0         | 1+        |
| Páginas indexáveis                   | 1         | 31        |

## Convenção dos arquivos

Cada task tem: contexto, evidência medida do estado atual, passos concretos,
critério de aceite verificável e comando de validação. Ao concluir, marque o
checkbox no topo do arquivo e registre a data.
