// Área de atuação da MV Construtora: Maranhão, Piauí e Ceará.
//
// A base fica em Pindaré-Mirim (MA), e a atuação se estende aos dois estados
// vizinhos. A lista de cada estado combina três níveis de propósito:
//
//   1. capital        — busca de maior volume
//   2. polos regionais — cidades que concentram obra e licitação
//   3. cidades menores — onde a concorrência é baixa e a intenção é alta
//
// Esse terceiro grupo é o que costuma render mais para uma empresa com base
// no interior: "terraplenagem em Zé Doca" tem muito menos disputa do que
// "terraplenagem em São Luís", e quem busca assim está pronto para contratar.
//
// ATENÇÃO: só devem constar cidades onde a empresa realmente mobiliza equipe e
// máquina. Listar cidade não atendida gera lead ruim, desgasta o comercial e,
// se o cliente reclamar, vira sinal negativo de qualidade para o Google.
// Lista definida pelo cliente em 04/09/2026: Maranhão, Ceará e Piauí.

export type Regiao = {
  estado: string;
  uf: string;
  /** Capital do estado. Entra na lista de cidades, marcada à parte para o texto. */
  capital: string;
  /** Polos regionais — concentram obra, indústria e licitação. */
  polos: string[];
  /** Cidades menores, onde a disputa por busca é baixa. */
  cidades: string[];
  /** true no estado onde fica a sede. Usado no texto da seção. */
  sede?: boolean;
};

export const REGIOES: Regiao[] = [
  {
    estado: "Maranhão",
    uf: "MA",
    capital: "São Luís",
    sede: true,
    polos: ["Imperatriz", "Caxias", "Timon", "Codó", "Bacabal", "Balsas", "Açailândia"],
    cidades: [
      "Pindaré-Mirim",
      "Santa Inês",
      "Monção",
      "Tufilândia",
      "Igarapé do Meio",
      "Alto Alegre do Pindaré",
      "Santa Luzia",
      "Bom Jardim",
      "Zé Doca",
      "Vitória do Mearim",
      "Chapadinha",
    ],
  },
  {
    estado: "Piauí",
    uf: "PI",
    capital: "Teresina",
    polos: ["Parnaíba", "Picos", "Floriano", "Piripiri", "Campo Maior"],
    cidades: [
      "Barras",
      "Oeiras",
      "União",
      "Altos",
      "Esperantina",
      "José de Freitas",
      "Uruçuí",
      "Bom Jesus",
    ],
  },
  {
    estado: "Ceará",
    uf: "CE",
    capital: "Fortaleza",
    polos: ["Sobral", "Juazeiro do Norte", "Crato", "Caucaia", "Maracanaú"],
    cidades: [
      "Crateús",
      "Iguatu",
      "Quixadá",
      "Tianguá",
      "Itapipoca",
      "Camocim",
      "Tauá",
      "Russas",
    ],
  },
];

/** Todas as cidades de um estado, com a capital primeiro. */
export const cidadesDoEstado = (r: Regiao): string[] => [r.capital, ...r.polos, ...r.cidades];

/** Lista plana de todas as cidades atendidas, para o JSON-LD. */
export const CIDADES_ATENDIDAS: { cidade: string; estado: string }[] = REGIOES.flatMap((r) =>
  cidadesDoEstado(r).map((cidade) => ({ cidade, estado: r.estado })),
);

/** "Maranhão, Piauí e Ceará" — para usar no meio de frases. */
export const ESTADOS_TEXTO = REGIOES.map((r) => r.estado).reduce(
  (acc, estado, i, arr) =>
    i === 0 ? estado : i === arr.length - 1 ? `${acc} e ${estado}` : `${acc}, ${estado}`,
  "",
);

/** "MA, PI e CE" — versão curta. */
export const UFS_TEXTO = REGIOES.map((r) => r.uf).reduce(
  (acc, uf, i, arr) => (i === 0 ? uf : i === arr.length - 1 ? `${acc} e ${uf}` : `${acc}, ${uf}`),
  "",
);
