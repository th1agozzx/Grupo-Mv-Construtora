// Obras realizadas — vitrine de trabalhos entregues.
//
// ⚠️ CONTEÚDO PROVISÓRIO. As quatro últimas entradas usam fotos genéricas de
// domínio público (src/assets/obras/), baixadas só para o layout não nascer
// vazio. As demais usam fotos reais da própria empresa que já estavam no repo.
//
// ANTES DE PUBLICAR: trocar por obras reais, com foto da obra, cidade e ano.
// Anunciar obra que a empresa não executou é risco jurídico e de reputação —
// e contraria a regra do projeto de nunca inventar dado.

import andamentodaobra from "@/assets/otimizadas/andamentodaobra.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import fotodaplacatigd from "@/assets/otimizadas/fotodaplacatigd.webp";
import placapedrafundamental from "@/assets/otimizadas/placapedrafundamental.webp";
import obra1 from "@/assets/obras/obra-1.webp";
import obra2 from "@/assets/obras/obra-2.webp";
import obra3 from "@/assets/obras/obra-3.webp";
import obra4 from "@/assets/obras/obra-4.webp";

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
    // PENDENTE: confirmar o escopo executado pela MV Construtora.
    imagens: [fotodaplacatigd],
    servicos: ["obras-civis"],
  },
  {
    slug: "movimentacao-de-terra-e-conformacao-de-plataforma",
    titulo: "Movimentação de terra e conformação de plataforma",
    local: "Vale do Pindaré — MA",
    categoria: "Terraplenagem",
    imagem: fotodaobra,
    alt: "Obra de terraplenagem em execução pela MV Construtora",
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
    // PENDENTE: confirmar o escopo executado pela MV Construtora.
    imagens: [andamentodaobra],
    servicos: ["terraplanagem"],
  },
  {
    slug: "obra-entregue-com-pedra-fundamental",
    titulo: "Obra entregue com pedra fundamental",
    local: "Maranhão",
    categoria: "Obras civis",
    imagem: placapedrafundamental,
    alt: "Placa de pedra fundamental de obra executada pela MV Construtora",
    resumo: "Registro de obra entregue com pedra fundamental, no Maranhão.",
    // PENDENTE: confirmar o escopo executado pela MV Construtora.
    imagens: [placapedrafundamental],
    servicos: ["obras-civis"],
  },
  {
    slug: "abertura-e-regularizacao-de-pista",
    titulo: "Imagem de referência: abertura e regularização de pista",
    categoria: "Infraestrutura viária",
    imagem: obra1,
    alt: "Frente de obra rodoviária com movimentação de terra",
    // PENDENTE: confirmar se a imagem representa uma obra da MV antes de publicar como portfólio.
    imagens: [obra1],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "reforco-de-base-e-cascalhamento",
    titulo: "Imagem de referência: reforço de base e cascalhamento",
    categoria: "Infraestrutura viária",
    imagem: obra2,
    alt: "Trecho de estrada em execução com base preparada",
    // PENDENTE: confirmar se a imagem representa uma obra da MV antes de publicar como portfólio.
    imagens: [obra2],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "pavimentacao-de-trecho",
    titulo: "Imagem de referência: pavimentação de trecho",
    categoria: "Infraestrutura viária",
    imagem: obra3,
    alt: "Equipamento de pavimentação aplicando massa asfáltica",
    // PENDENTE: confirmar se a imagem representa uma obra da MV antes de publicar como portfólio.
    imagens: [obra3],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "escavacao-e-drenagem",
    titulo: "Imagem de referência: escavação e drenagem",
    categoria: "Terraplenagem",
    imagem: obra4,
    alt: "Escavação de terreno com máquina em canteiro de obra",
    // PENDENTE: confirmar se a imagem representa uma obra da MV antes de publicar como portfólio.
    imagens: [obra4],
    servicos: ["terraplanagem"],
    provisoria: true,
  },
];
