# 18 — Área de atuação: Maranhão, Piauí e Ceará + alinhamento ao CNPJ

- [x] Concluída em: 04/09/2026
- **Prioridade:** P0
- **Esforço:** 3 h
- **Impacto:** 🔴 Altíssimo — triplica o território disputado
- **Depende de:** tasks 03 (JSON-LD) e 04 (SEO local)

> **STATUS (04/09/2026 — implementado)**
> ✅ Endereço, razão social e CNPJ alinhados ao cartão CNPJ.
> ✅ Área de atuação expandida de "Maranhão" para **Maranhão, Piauí e Ceará**, com
> 47 cidades em três níveis (capital, polos regionais, cidades menores).
> ✅ Fonte única em `src/data/regioes.ts`; JSON-LD, home, páginas de serviço e de
> frota consomem de lá.
> ⚠️ **PENDENTE COM O CLIENTE:** validar a lista de 47 cidades e expandir a área de
> cobertura no Google Meu Negócio, que hoje tem só duas cidades.

---

## O que motivou

Duas decisões do cliente, no mesmo dia:

1. **Alinhar o endereço do site ao cartão CNPJ** (PDF enviado em 04/09/2026).
2. **Expandir o SEO** para Maranhão, Ceará e Piauí, "com alinhamento para
   pequenas cidades e capitais tanto do estado quanto regional".

---

## Parte A — Dados do cartão CNPJ

| Campo | Valor |
|---|---|
| CNPJ | 14.299.029/0001-20 |
| Razão social | **A R LEITE PEREIRA LTDA** |
| Nome fantasia | MV CONSTRUTORA |
| Abertura | 14/09/2011 |
| Endereço | ROD PITOMBEIRA, SN — bairro PITOMBEIRA — PINDARE MIRIM — MA — 65.370-000 |
| CNAE principal | 41.20-4-00 Construção de edifícios |
| Situação | ATIVA |

Aplicado em `src/config/empresa.ts` e refletido no JSON-LD.

A **razão social entrou como `legalName`** no schema. Isso ajuda o Google a casar
o site com registros oficiais — reforço direto contra as empresas homônimas, que
é o problema central deste projeto.

### ⚠️ Divergência com o Google Meu Negócio

| Fonte | Endereço |
|---|---|
| Cartão CNPJ | Rod. Pitombeira, s/n — bairro Pitombeira |
| Google Meu Negócio | Estrada p/ Canadá - Próximo ao Condomínio OASIS - MA-320 |

O site seguiu o CNPJ, conforme decisão do cliente. **A ficha do Google deveria ser
ajustada para bater**, ou o Google verá NAP divergente entre site e ficha — o que
derruba confiança no ranking local.

### ⚠️ Telefone e e-mail: o que NÃO veio do CNPJ

O cartão traz `(98) 9197-2921` e `MVCONSTRUTORAEIMOBILIARIA@OUTLOOK.COM`. Esses são
os dados de **cadastro na Receita**, não os comerciais.

Numa passagem anterior eles foram aplicados no site, e isso **quebrou o WhatsApp**:

```
Aplicado:  559891972921   → 12 dígitos, link inválido
Correto:   5598992368928  → 13 dígitos
```

Celular brasileiro no WhatsApp exige `55 + DDD(2) + 9 + 8 dígitos = 13`. O número
do cartão tem 8 dígitos (formato de fixo). Com ele, **o botão principal de
conversão do site não funcionava**.

Restaurado para `(98) 99236-8928` — o mesmo cadastrado como Chat no Google Meu
Negócio — e o e-mail comercial do domínio. O telefone da Receita ficou preservado
em `EMPRESA.telefoneCadastroCnpj`, com o motivo comentado no arquivo.

> **Regra para quem mexer depois:** o pedido era alinhar o **local**. Telefone e
> e-mail comerciais não vêm do cartão CNPJ.

---

## Parte B — Expansão para três estados

### A estrutura de dados

`src/data/regioes.ts` é a fonte única. Cada estado declara três níveis:

```ts
export type Regiao = {
  estado: string;
  uf: string;
  capital: string;   // maior volume de busca
  polos: string[];   // concentram obra, indústria e licitação
  cidades: string[]; // menor concorrência, maior intenção
  sede?: boolean;
};
```

### Por que três níveis, e não uma lista só

Cada nível serve a um tipo de busca diferente:

| Nível | Volume | Concorrência | Quem busca |
|---|---|---|---|
| Capital | Alto | Alta | Muitas vezes comparando fornecedores |
| Polo regional | Médio | Média | Obra ou licitação concreta |
| Cidade menor | Baixo | **Muito baixa** | Quase sempre pronto para contratar |

Para uma empresa com base no interior, o terceiro grupo é o que mais rende.
"Terraplenagem em Zé Doca" tem uma fração da disputa de "terraplenagem em São
Luís", e a intenção é maior. Disputar só capital é competir onde o adversário é
mais forte.

### As 47 cidades

| Estado | Capital | Polos | Menores | Total |
|---|---|---|---|---|
| **Maranhão** (sede) | São Luís | Imperatriz, Caxias, Timon, Codó, Bacabal, Balsas, Açailândia | Pindaré-Mirim, Santa Inês, Monção, Tufilândia, Igarapé do Meio, Alto Alegre do Pindaré, Santa Luzia, Bom Jardim, Zé Doca, Vitória do Mearim, Chapadinha | 19 |
| **Piauí** | Teresina | Parnaíba, Picos, Floriano, Piripiri, Campo Maior | Barras, Oeiras, União, Altos, Esperantina, José de Freitas, Uruçuí, Bom Jesus | 14 |
| **Ceará** | Fortaleza | Sobral, Juazeiro do Norte, Crato, Caucaia, Maracanaú | Crateús, Iguatu, Quixadá, Tianguá, Itapipoca, Camocim, Tauá, Russas | 14 |

> ⚠️ **Esta lista foi montada por critério técnico (porte e relevância regional),
> não por confirmação operacional.** O cliente definiu os três estados; as cidades
> são sugestão. Antes de tratar como definitiva, validar com quem opera.
> Listar cidade onde a empresa não mobiliza gera lead ruim, desgasta o comercial e,
> se o cliente reclamar, vira sinal negativo de qualidade.

---

## O que foi alterado

| Arquivo | Mudança |
|---|---|
| `src/data/regioes.ts` | **novo** — fonte única dos três estados e 47 cidades |
| `src/data/servicos.ts` | `CIDADES_ATENDIDAS` removida (era lista duplicada) |
| `src/config/empresa.ts` | endereço/razão social do CNPJ; WhatsApp e e-mail restaurados |
| `src/lib/schema.ts` | `areaServed` com 3 `State` + 47 `City` ancoradas ao estado; `legalName`; `alternateName` com as três variações estaduais |
| `src/routes/index.tsx` | title, description, og, H1, hero, FAQ e seção de área de atuação agrupada por estado |
| `src/routes/servicos/$slug.tsx` | lista de cidades por estado |
| `src/routes/servicos/index.tsx` | meta e textos |
| `src/routes/frota/index.tsx` | meta e textos + correção de contraste do filtro ativo |
| `src/components/site/CtaFinal.tsx` | CTA cita os três estados |
| `scripts/gerar-og-image.mjs` | imagem de compartilhamento com os três estados |

### Detalhe do JSON-LD

Cada cidade vai ancorada ao seu estado:

```json
{ "@type": "City", "name": "Crateús",
  "containedInPlace": { "@type": "State", "name": "Ceará" } }
```

Sem o `containedInPlace`, cidade homônima de outra região do país confunde a
leitura. Os três estados também entram como `State` soltos, dando o sinal amplo
antes do detalhe.

---

## Verificação

```bash
npx tsc --noEmit && npm run build

curl -s http://localhost:8080/ > /tmp/h.html
for e in Maranhão Piauí Ceará; do printf "%-10s %s\n" "$e" "$(grep -ao "$e" /tmp/h.html | wc -l)"; done
```

Resultado em 04/09/2026: Maranhão 56 · Piauí 38 · Ceará 38.

JSON-LD conferido: 3 estados, 47 cidades (MA 19, PI 14, CE 14), `legalName`
"A R LEITE PEREIRA LTDA", CNPJ e endereço do cartão.

---

## Critério de aceite

- [x] Endereço, razão social e CNPJ batendo com o cartão.
- [x] WhatsApp com 13 dígitos e link funcional.
- [x] Três estados no `areaServed`, com cidades ancoradas ao estado correto.
- [x] Fonte única em `regioes.ts`, sem lista duplicada.
- [x] Home, serviços, frota e CTAs citando os três estados.
- [ ] **Lista de 47 cidades validada pelo cliente.**
- [ ] **Área de cobertura do Google Meu Negócio expandida** (hoje: só Santa Inês e Pindaré-Mirim).
- [ ] Endereço da ficha do Google alinhado ao CNPJ.

---

## Próximo passo natural

Com três estados no ar, as páginas por cidade (task 08) ficam mais tentadoras —
mas o alerta continua valendo: **página por cidade só com conteúdo genuinamente
diferente**. Gerar 47 páginas trocando o nome da cidade é doorway page, que o
Google penaliza explicitamente. O caminho seguro é começar por 2-3 cidades onde
existam obras reais para mostrar.
