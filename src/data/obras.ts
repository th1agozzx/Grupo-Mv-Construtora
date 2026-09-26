// Obras realizadas — vitrine de trabalhos entregues.
//
// ⚠️ CONTEÚDO PROVISÓRIO. Todas as fotos são do acervo real da empresa, mas as
// quatro últimas entradas usam a foto da máquina mais próxima do serviço, não
// um registro de uma obra específica — por isso seguem como "Imagem de referência".
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
] as const;

export type ObraCategoria = Exclude<(typeof CATEGORIAS_OBRA)[number], "Todas">;

/**
 * Evita que a falta de resumo vaze para SEO ou para a interface como texto de controle.
 * A descrição de referência não atribui cliente, local, prazo ou volume à obra.
 */
export const resumoObra = (obra: Pick<Obra, "categoria" | "resumo">) =>
  obra.resumo ??
  `Imagem de referência para serviços de ${obra.categoria.toLocaleLowerCase("pt-BR")}.`;

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
    titulo: "Imagem de referência: abertura e regularização de pista",
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
    titulo: "Imagem de referência: reforço de base e cascalhamento",
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
    titulo: "Imagem de referência: pavimentação de trecho",
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
    titulo: "Imagem de referência: escavação e drenagem",
    categoria: "Terraplenagem",
    imagem: escavadeira2,
    alt: "Escavadeira Hyundai do Grupo MV Construtora com caçamba carregada de terra",
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [escavadeira2],
    servicos: ["terraplanagem"],
    provisoria: true,
  },
];
