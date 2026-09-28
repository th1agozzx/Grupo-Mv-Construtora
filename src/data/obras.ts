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
// Foto enviada pelo cliente — obra de recuperação da BR-316 em Pio XII (MA).
import recuperacaoBr316 from "@/assets/obras/recuperacao-br-316.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";
import tresescavadeiras1 from "@/assets/otimizadas/tresescavadeiras1.webp";
import pacarregadeira from "@/assets/otimizadas/pacarregadeira.webp";

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
    slug: "recuperacao-da-br-316",
    titulo: "Recuperação da BR-316",
    local: "Pio XII — MA",
    categoria: "Terraplenagem",
    imagem: recuperacaoBr316,
    alt: "Vista aérea da BR-316 em recuperação, com aterro da plataforma e contenção em pedra ao lado da pista",
    resumo:
      "Terraplenagem na obra de recuperação da BR-316, no povoado Arataui, em Pio XII (MA), trecho de cerca de 2 km com contenção do aterro da plataforma da pista.",
    escopo: ["Serviços de terraplenagem na recuperação do aterro da plataforma da pista."],
    imagens: [recuperacaoBr316],
    servicos: ["terraplanagem"],
  },
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
    slug: "corte-e-aterro-de-grande-area",
    titulo: "Corte e aterro de grande área",
    local: "Maranhão",
    resumo:
      "Corte, aterro e regularização de uma área extensa com frente de escavadeiras, carregamento em caminhões caçamba e conformação dos taludes.",
    categoria: "Terraplenagem",
    imagem: tresescavadeiras1,
    alt: "Três escavadeiras hidráulicas do Grupo MV Construtora em área de terraplenagem com talude de corte ao fundo",
    escopo: [
      "Escavação e corte do terreno com escavadeiras hidráulicas.",
      "Carregamento e transporte do material com pá carregadeira e caminhões caçamba.",
      "Aterro e regularização da plataforma.",
      "Conformação dos taludes de corte.",
    ],
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [tresescavadeiras1, pacarregadeira],
    servicos: ["terraplanagem", "locacao-de-maquinas"],
    provisoria: true,
  },
  {
    slug: "preparo-de-solo-para-plantio-de-soja-e-milho",
    titulo: "Preparo de solo para plantio de soja e milho",
    local: "Maranhão",
    categoria: "Propriedades rurais",
    imagem: preparoSoloSoja,
    alt: "Trator com grade niveladora preparando solo para plantio de soja e milho",
    resumo:
      "Limpeza, destoca, gradagem e nivelamento de áreas para o plantio de soja e milho, com o solo pronto para a semeadura no início das chuvas.",
    escopo: [
      "Limpeza e destoca da área.",
      "Gradagem e nivelamento do terreno.",
      "Abertura e recuperação de estradas internas para a entrada de máquinas e a saída da safra.",
    ],
    imagens: [preparoSoloSoja],
    servicos: ["servicos-rurais", "limpeza-de-areas"],
    provisoria: true,
  },
];
