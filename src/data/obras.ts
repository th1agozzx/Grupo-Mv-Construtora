// Obras realizadas — vitrine de trabalhos entregues.
//
// ⚠️ CONTEÚDO PROVISÓRIO. As entradas marcadas com `provisoria` ainda não são
// registros de uma obra específica: as de infraestrutura e terraplenagem usam
// a foto da máquina da própria empresa mais próxima do serviço, e as de preparo
// de solo usam fotos de domínio público do Wikimedia Commons (src/assets/obras/,
// fontes ao lado de cada import). Por isso declaram só o estado (Maranhão), sem
// cidade, cliente, ano ou volume.
//
// ANTES DE PUBLICAR: trocar por obras reais, com foto da obra, cidade e ano.
// Anunciar obra que a empresa não executou é risco jurídico e de reputação —
// e contraria a regra do projeto de nunca inventar dado.

import andamentodaobra from "@/assets/otimizadas/andamentodaobra.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import fotodaplacatigd from "@/assets/otimizadas/fotodaplacatigd.webp";
import placapedrafundamental from "@/assets/otimizadas/placapedrafundamental.webp";
import caminhaopipa1 from "@/assets/otimizadas/caminhaopipa1.webp";
import escavadeira2 from "@/assets/otimizadas/escavadeira2.webp";
import fotodapatrol from "@/assets/otimizadas/fotodapatrol.webp";
// Domínio público — https://commons.wikimedia.org/wiki/File:11.06.17_Disc_Harrow.JPG
import preparoSoloSoja from "@/assets/obras/preparo-solo-soja.webp";
// Domínio público (USDA) — https://commons.wikimedia.org/wiki/File:-Plant2020_(20200512-FPAC-PLANTING-248).jpg
import preparoSoloMilho from "@/assets/obras/preparo-solo-milho.webp";
// Domínio público — https://commons.wikimedia.org/wiki/File:Machinery19.tif_(38845042472).jpg
import preparoSoloArroz from "@/assets/obras/preparo-solo-arroz.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";

export type Obra = {
  slug: string;
  titulo: string;
  local?: string;
  categoria: ObraCategoria;
  imagem: string;
  alt: string;
  /** Texto de abertura da página individual, mantido sem dados não confirmados. */
  resumo?: string;
  /** Escopo declarado ou pendência explícita até a confirmação do cliente. */
  escopo?: string[];
  /** Galeria da obra. A primeira imagem é sempre a usada no card. */
  imagens: string[];
  /** Serviços vinculados à categoria declarada da obra. */
  servicos: string[];
  ano?: string;
  prazo?: string;
  volume?: string;
  cliente?: string;
  /** true enquanto a foto for genérica e o texto não tiver sido confirmado pelo cliente. */
  provisoria?: boolean;
};

export const CATEGORIAS_OBRA = [
  "Todas",
  "Terraplenagem",
  "Infraestrutura viária",
  "Obras civis",
  "Propriedades rurais",
] as const;

export type ObraCategoria = Exclude<(typeof CATEGORIAS_OBRA)[number], "Todas">;

/**
 * Evita que a falta de resumo vaze para SEO ou para a interface como texto de controle.
 * A descrição de referência não atribui cliente, local, prazo ou volume à obra.
 */
export const resumoObra = (obra: Pick<Obra, "categoria" | "resumo">) =>
  obra.resumo ??
  `Serviços de ${obra.categoria.toLocaleLowerCase("pt-BR")} do Grupo MV Construtora.`;

export const OBRAS: Obra[] = [
  {
    slug: "terminal-intermodal-goncalves-dias",
    titulo: "Terminal Intermodal Gonçalves Dias",
    local: "Maranhão",
    categoria: "Obras civis",
    imagem: fotodaplacatigd,
    alt: "Placa da obra do Terminal Intermodal Gonçalves Dias, no Maranhão",
    resumo: "Registro da obra identificada como Terminal Intermodal Gonçalves Dias, no Maranhão.",
    // PENDENTE: confirmar o escopo executado pelo Grupo MV Construtora.
    imagens: [fotodaplacatigd],
    servicos: ["obras-civis"],
  },
  {
    slug: "movimentacao-de-terra-e-conformacao-de-plataforma",
    titulo: "Movimentação de terra e conformação de plataforma",
    local: "Vale do Pindaré — MA",
    categoria: "Terraplenagem",
    imagem: fotodaobra,
    alt: "Obra de terraplenagem em execução pelo Grupo MV Construtora",
    resumo: "Registro de movimentação de terra e conformação de plataforma no Vale do Pindaré, MA.",
    escopo: ["Movimentação de terra e conformação de plataforma."],
    imagens: [fotodaobra],
    servicos: ["terraplanagem"],
  },
  {
    slug: "acompanhamento-de-obra-em-andamento",
    titulo: "Acompanhamento de obra em andamento",
    local: "Maranhão",
    categoria: "Terraplenagem",
    imagem: andamentodaobra,
    alt: "Andamento de obra de movimentação de terra no Maranhão",
    resumo: "Registro de acompanhamento de obra em andamento no Maranhão.",
    // PENDENTE: confirmar o escopo executado pelo Grupo MV Construtora.
    imagens: [andamentodaobra],
    servicos: ["terraplanagem"],
  },
  {
    slug: "obra-entregue-com-pedra-fundamental",
    titulo: "Obra entregue com pedra fundamental",
    local: "Maranhão",
    categoria: "Obras civis",
    imagem: placapedrafundamental,
    alt: "Placa de pedra fundamental de obra executada pelo Grupo MV Construtora",
    resumo: "Registro de obra entregue com pedra fundamental, no Maranhão.",
    // PENDENTE: confirmar o escopo executado pelo Grupo MV Construtora.
    imagens: [placapedrafundamental],
    servicos: ["obras-civis"],
  },
  {
    slug: "abertura-e-regularizacao-de-pista",
    titulo: "Abertura e regularização de pista",
    local: "Maranhão",
    resumo: "Abertura de pista em terra e regularização do leito com motoniveladora, deixando o trecho nivelado e com caimento para escoar a água.",
    categoria: "Infraestrutura viária",
    imagem: fotodapatrol,
    alt: "Motoniveladora do Grupo MV Construtora em frente de obra de terra",
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [fotodapatrol],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "reforco-de-base-e-cascalhamento",
    titulo: "Reforço de base e cascalhamento",
    local: "Maranhão",
    resumo: "Reforço da base de estradas com cascalho, umedecimento e compactação, para o trecho continuar transitável no período de chuva.",
    categoria: "Infraestrutura viária",
    imagem: caminhaopipa1,
    alt: "Caminhão-pipa do Grupo MV Construtora umedecendo base de terra em obra",
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [caminhaopipa1],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "pavimentacao-de-trecho",
    titulo: "Pavimentação de trecho",
    local: "Maranhão",
    resumo: "Preparo e compactação das camadas do trecho com rolo compactador, etapa que garante a resistência do pavimento.",
    categoria: "Infraestrutura viária",
    imagem: rolocompactador,
    alt: "Rolo compactador do Grupo MV Construtora em canteiro de obra",
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [rolocompactador],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "escavacao-e-drenagem",
    titulo: "Escavação e drenagem",
    local: "Maranhão",
    resumo: "Escavação de valas e canais com escavadeira hidráulica para conduzir a água e proteger a obra e as estradas de acesso.",
    categoria: "Terraplenagem",
    imagem: escavadeira2,
    alt: "Escavadeira Hyundai do Grupo MV Construtora com caçamba carregada de terra",
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [escavadeira2],
    servicos: ["terraplanagem"],
    provisoria: true,
  },
  {
    slug: "preparo-de-solo-para-plantio-de-soja",
    titulo: "Preparo de solo para plantio de soja",
    local: "Maranhão",
    categoria: "Propriedades rurais",
    imagem: preparoSoloSoja,
    alt: "Trator com grade niveladora preparando solo para plantio de soja",
    resumo:
      "Limpeza, destoca, gradagem e nivelamento de áreas para o plantio de soja, com o solo pronto para a semeadura no início das chuvas.",
    escopo: [
      "Limpeza e destoca da área.",
      "Gradagem e nivelamento do terreno.",
      "Abertura e recuperação de estradas internas para a entrada de máquinas e a saída da safra.",
    ],
    imagens: [preparoSoloSoja],
    servicos: ["servicos-rurais", "limpeza-de-areas"],
    provisoria: true,
  },
  {
    slug: "preparo-de-solo-para-plantio-de-milho",
    titulo: "Preparo de solo para plantio de milho",
    local: "Maranhão",
    categoria: "Propriedades rurais",
    imagem: preparoSoloMilho,
    alt: "Trator com grade revolvendo o solo para plantio de milho",
    resumo:
      "Preparo de áreas para o plantio de milho, na safra ou na safrinha depois da soja, com gradagem e regularização do terreno.",
    escopo: [
      "Gradagem e regularização do terreno.",
      "Correção de pontos de acúmulo de água na área de plantio.",
      "Manutenção das estradas internas da propriedade.",
    ],
    imagens: [preparoSoloMilho],
    servicos: ["servicos-rurais"],
    provisoria: true,
  },
  {
    slug: "preparo-de-solo-para-plantio-de-arroz",
    titulo: "Preparo de solo para plantio de arroz",
    local: "Maranhão",
    categoria: "Propriedades rurais",
    imagem: preparoSoloArroz,
    alt: "Trator com grade preparando área aberta para plantio de arroz",
    resumo:
      "Limpeza, gradagem e nivelamento de áreas para o plantio de arroz, com atenção ao caimento do terreno e ao controle da água na lavoura.",
    escopo: [
      "Limpeza e gradagem da área.",
      "Nivelamento do terreno para controle da água.",
      "Abertura de valas e drenos.",
    ],
    imagens: [preparoSoloArroz],
    servicos: ["servicos-rurais", "drenagem"],
    provisoria: true,
  },
];
