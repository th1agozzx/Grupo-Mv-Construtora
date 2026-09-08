# 09 — Depoimentos, cases e números reais

- [ ] Concluída em: ****/****/______
- **Prioridade:** P1
- **Esforço:** depende do cliente (a coleta é o gargalo, não o código)
- **Impacto:** 🟠 Alto — é o que faz a IA **recomendar** em vez de só citar
- **Depende de:** task 06 (avaliações do Google alimentam esta task)

---

## Problema

O site não tem **nenhuma** prova social ou número verificável.

### Evidência

- Zero depoimentos. O ícone `Quote` chega a ser importado
  (`src/routes/index.tsx:22`) mas **nunca é usado** — a seção foi planejada e
  abandonada.
- Zero estudos de caso, apesar de existirem fotos de obras reais no repositório
  (placa do Terminal Intermodal Gonçalves Dias, pedra fundamental, evento de
  inauguração).
- O contador `["+50", "obras entregues"]` está **comentado**
  (`src/routes/index.tsx:1124`), deixando o grid de 3 colunas com 2 itens.
- Restam apenas `+11 anos de atuação` e `100% compromisso com prazos`.

### Por que "100% compromisso com prazos" atrapalha

É uma alegação genérica e não verificável. Sistemas de IA são treinados a
descartar esse tipo de afirmação — e leitores experientes também. Um número
específico ("38 obras entregues", "12 máquinas próprias") vale muito mais do que
um superlativo redondo.

---

## Parte A — Números reais (levantar com o cliente)

Preencher com dados verdadeiros. **Nunca inventar.**

| Dado                                    | Valor       | Onde usar                   |
| --------------------------------------- | ----------- | --------------------------- |
| Obras entregues desde 2011              | ______      | contador, JSON-LD           |
| Máquinas próprias na frota              | ______      | contador, `/frota`          |
| Colaboradores diretos                   | ______      | "Quem somos"                |
| m³ de terra movimentados (ano ou total) | ______      | contador                    |
| Km de estradas vicinais recuperados     | ______      | página de estradas vicinais |
| Prazo médio de mobilização              | ______ dias | FAQ, diferenciais           |
| Cidades atendidas                       | ______      | área de atuação             |
| Maior obra executada (nome/porte)       | ______      | case                        |

Números concretos são exatamente o tipo de fato que o Gemini extrai e cita.

Substituir também o `100% compromisso com prazos` por algo aferível — por exemplo
`+11 anos` / `38 obras entregues` / `12 máquinas próprias`, o que já resolve a
coluna vazia do grid apontada na task 07.

---

## Parte B — Depoimentos

### Coleta

Pedir a 5-10 clientes atendidos. Roteiro curto por WhatsApp:

> "Poderia deixar um depoimento curto sobre o serviço que fizemos na obra de [X]?
> Basta responder: qual era o desafio, o que a MV fez e qual foi o resultado.
> Podemos publicar no site com seu nome e empresa?"

Coletar sempre: **nome, cargo, empresa/obra, cidade** e **autorização por escrito**
para publicar (LGPD — ver task 10).

### Implementação

```jsx
const depoimentos = [
  {
    texto: "...",
    autor: "Nome do cliente",
    cargo: "Cargo",
    empresa: "Empresa / Obra",
    cidade: "Santa Inês - MA",
    foto: fotoCliente, // opcional
  },
];
```

Seção nova entre "Diferenciais" e "FAQ", reaproveitando o ícone `Quote` já importado.

### JSON-LD

Depois de publicados, adicionar `Review` ao schema (task 03):

```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Nome do cliente" },
  "reviewBody": "...",
  "itemReviewed": { "@id": "https://www.grupomvconstrutora.com.br/#organizacao" }
}
```

> **`AggregateRating` só com avaliações reais e verificáveis.** Nota inventada é
> violação das diretrizes do Google e gera penalização manual. Se a fonte forem
> as avaliações do Google Meu Negócio (task 06), o número precisa bater com o
> que aparece na ficha.

---

## Parte C — Cases de obra

O repositório já tem material fotográfico para pelo menos 3 cases:

| Foto disponível                             | Case provável                      |
| ------------------------------------------- | ---------------------------------- |
| `fotodaplacatigd.png`                       | Terminal Intermodal Gonçalves Dias |
| `placapedrafundamental.png`                 | Obra com pedra fundamental         |
| `eventoinauguracao.png`                     | Obra inaugurada                    |
| `fotodaplacaalan.png` / `fotodasplacas.png` | Obras identificadas                |

### Estrutura de cada case (vira `/obras/[slug]` na task 08)

1. Nome da obra e **cidade**
2. Cliente (se autorizado a divulgar)
3. Período de execução
4. Desafio
5. O que foi executado (serviços e equipamentos)
6. Números: m³ movimentados, área, prazo
7. Fotos antes/durante/depois
8. Resultado

> Confirmar com o cliente o que pode ser divulgado. Contrato com órgão público
> costuma ser informação pública; obra privada em geral exige autorização.

---

## Parte D — Logos de clientes e parceiros

Se houver autorização, uma faixa de logos de clientes atendidos é uma das provas
sociais mais eficientes — especialmente se houver órgãos públicos ou empresas
conhecidas na região.

---

## Critério de aceite

- [ ] Mínimo de 5 depoimentos reais publicados, com nome, empresa e cidade.
- [ ] Autorização por escrito arquivada para cada depoimento.
- [ ] Contador com 3 números reais e verificáveis (sem coluna vazia).
- [ ] "100% compromisso com prazos" substituído por métrica concreta.
- [ ] Mínimo de 3 cases de obra publicados.
- [ ] `Review` no JSON-LD, sem `AggregateRating` inventado.
- [ ] Ícone `Quote` efetivamente em uso (ou removido do import).

## Validação

```bash
curl -s https://www.grupomvconstrutora.com.br/ | grep -ao '"@type": *"Review"' | wc -l
```

Rich Results Test: verificar se o schema de avaliação é aceito sem aviso.
