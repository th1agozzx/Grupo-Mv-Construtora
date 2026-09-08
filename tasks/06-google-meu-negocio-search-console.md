# 06 — Google Meu Negócio + Search Console + Bing

- [ ] Concluída em: ****/****/______
- **Prioridade:** P0 — **fazer HOJE, antes de mexer no código**
- **Esforço:** 1-2 h (+ 5 a 14 dias de espera pela verificação por carta)
- **Impacto:** 🔴 Altíssimo
- **Depende de:** nada
- **Responsável:** precisa de acesso do cliente (conta Google da empresa)

---

## Por que esta é a primeira task do calendário

Duas razões independentes:

1. **O Search Console só coleta dados a partir do cadastro.** Ele não tem
   retroativo. Se você cadastrar depois das melhorias, perde para sempre a
   comparação de impressões, cliques e posição média — que é justamente o
   argumento **comercial** do trabalho (o Lighthouse é o argumento técnico).
   Cada dia de atraso é um dia a menos de linha de base.

2. **Para busca local, o Google Meu Negócio pesa mais que o site.** Quem busca
   "terraplenagem em Pindaré-Mirim" vê primeiro o mapa e as 3 fichas do pacote
   local. Sem ficha verificada, o site nem entra nessa disputa — não importa quão
   otimizado ele esteja.

> Sem esta task, boa parte do ganho das tasks 03, 04 e 05 não se converte em
> ligação de cliente.

---

## Parte A — Google Business Profile (Google Meu Negócio)

### A1. Verificar se já existe ficha

Buscar no Google por "MV Construtora Pindaré-Mirim". Pode já existir uma ficha
criada automaticamente ou por terceiros. Se existir, **reivindicar** em vez de
criar duplicada (ficha duplicada divide o sinal e prejudica as duas).

### A2. Criar / reivindicar

Em [business.google.com](https://business.google.com):

| Campo                  | Valor                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Nome                   | MV Construtora                                                                                |
| Categoria principal    | Empreiteira de terraplenagem                                                                  |
| Categorias secundárias | Serviço de aluguel de equipamentos de construção; Empreiteira de obras; Empresa de construção |
| Endereço               | **exatamente** igual ao do site (ver task 04, passo 7)                                        |
| Área de atendimento    | as mesmas cidades da task 04                                                                  |
| Telefone               | (98) 99236-8928                                                                               |
| Site                   | https://www.grupomvconstrutora.com.br/                                                        |
| Horário                | Seg-Sex, 07h-18h (confirmar — ver task 10)                                                    |
| Data de abertura       | 14/09/2011                                                                                    |

> **Consistência de NAP** (Name, Address, Phone) é o principal fator de ranking
> local. Nome, endereço e telefone precisam ser idênticos, caractere por
> caractere, no site, na ficha e em qualquer diretório.

### A3. Verificação

Geralmente por cartão-postal com código (5-14 dias) ou por vídeo. Nada avança
sem isso — por isso iniciar cedo.

### A4. Preencher a ficha por completo

- [ ] Descrição de 750 caracteres com "terraplenagem", "Maranhão", "Pindaré-Mirim".
- [ ] **Mínimo 20 fotos** — já existem no repositório (`src/assets/`): máquinas,
      equipe, obras, placas, evento de inauguração. Fichas com muitas fotos
      recebem significativamente mais cliques.
- [ ] Os 5 serviços cadastrados individualmente com descrição.
- [ ] Logo e foto de capa.
- [ ] Atributos: "Faz orçamento no local", "Atende no local do cliente".

### A5. Avaliações (o item de maior impacto de longo prazo)

Pedir avaliação a clientes já atendidos. Meta inicial: **10 avaliações**.

Gerar o link curto de avaliação na própria ficha e mandar por WhatsApp:

> "Foi um prazer atender vocês na obra da [X]. Se puder deixar uma avaliação no
> Google, ajuda muito: [link]"

- Responder **todas** as avaliações, inclusive as negativas.
- Nunca comprar avaliação — é detectável e gera suspensão da ficha.

### A6. Posts semanais

A ficha aceita posts. Um por semana com foto de obra em andamento mantém o
perfil ativo, o que é sinal positivo de ranking local.

---

## Parte B — Google Search Console

1. Acessar [search.google.com/search-console](https://search.google.com/search-console).
2. Adicionar propriedade do tipo **Domínio** (`grupomvconstrutora.com.br`) — cobre
   apex, www, http e https de uma vez.
3. Verificar por registro **TXT no DNS**. O DNS provavelmente está na Vercel
   (o site é servido por lá): painel da Vercel → Domains → DNS Records.
4. Enviar o `sitemap.xml` (task 05).
5. Usar **Inspeção de URL → Solicitar indexação** para a home após cada mudança
   grande de conteúdo.

### O que monitorar depois

| Relatório             | Para quê                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| Desempenho            | Impressões, cliques, CTR, posição média — o "antes vs depois" comercial |
| Cobertura / Indexação | Páginas indexadas (hoje: 1; meta após task 08: 6+)                      |
| Core Web Vitals       | Dados de campo reais (complementa o Lighthouse, que é laboratório)      |
| Melhorias             | Se o Google reconheceu o schema da task 03                              |
| Links                 | Backlinks recebidos                                                     |

> Os dados de campo dos Core Web Vitals levam ~28 dias para estabilizar. Não se
> assuste se o relatório continuar vermelho logo após a task 02.

### Registrar a linha de base

Depois de 7-14 dias coletando, exportar o relatório de Desempenho (CSV) e
guardar junto de `BASELINE-2026-09-02.md`. É a prova do "antes".

---

## Parte C — Bing Webmaster Tools

15 minutos, e importa mais do que parece: o Bing alimenta o índice do ChatGPT
e do Copilot.

1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. **Importar do Google Search Console** (importa a verificação e o sitemap).

---

## Critério de aceite

- [ ] Ficha do Google Meu Negócio verificada e publicada.
- [ ] NAP idêntico entre site e ficha.
- [ ] 20+ fotos na ficha.
- [ ] 5 serviços cadastrados na ficha.
- [ ] Search Console verificado por domínio.
- [ ] Sitemap enviado e lido sem erro.
- [ ] Bing Webmaster Tools configurado.
- [ ] Exportação CSV do desempenho inicial guardada como linha de base.
- [ ] Pelo menos 5 avaliações reais recebidas.

## Validação

Buscar no Google, em aba anônima e com localização em Pindaré-Mirim:

- `MV Construtora Pindaré-Mirim` → a ficha deve aparecer no painel lateral
- `terraplenagem Pindaré-Mirim` → verificar se entra no pacote local (mapa)
- `site:grupomvconstrutora.com.br` → páginas indexadas
