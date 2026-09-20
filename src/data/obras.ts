// Obras realizadas — vitrine de trabalhos entregues.
//
// ⚠️ CONTEÚDO PROVISÓRIO. As quatro primeiras entradas usam fotos genéricas de
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
  titulo: string;
  local: string;
  categoria: ObraCategoria;
  imagem: string;
  alt: string;
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

export const OBRAS: Obra[] = [
  {
    titulo: "Terminal Intermodal Gonçalves Dias",
    local: "Maranhão",
    categoria: "Obras civis",
    imagem: fotodaplacatigd,
    alt: "Placa da obra do Terminal Intermodal Gonçalves Dias, no Maranhão",
  },
  {
    titulo: "Movimentação de terra e conformação de plataforma",
    local: "Vale do Pindaré — MA",
    categoria: "Terraplenagem",
    imagem: fotodaobra,
    alt: "Obra de terraplenagem em execução pela MV Construtora",
  },
  {
    titulo: "Acompanhamento de obra em andamento",
    local: "Maranhão",
    categoria: "Terraplenagem",
    imagem: andamentodaobra,
    alt: "Andamento de obra de movimentação de terra no Maranhão",
  },
  {
    titulo: "Obra entregue com pedra fundamental",
    local: "Maranhão",
    categoria: "Obras civis",
    imagem: placapedrafundamental,
    alt: "Placa de pedra fundamental de obra executada pela MV Construtora",
  },
  {
    titulo: "Abertura e regularização de pista",
    local: "Substituir pela cidade da obra",
    categoria: "Infraestrutura viária",
    imagem: obra1,
    alt: "Frente de obra rodoviária com movimentação de terra",
    provisoria: true,
  },
  {
    titulo: "Reforço de base e cascalhamento",
    local: "Substituir pela cidade da obra",
    categoria: "Infraestrutura viária",
    imagem: obra2,
    alt: "Trecho de estrada em execução com base preparada",
    provisoria: true,
  },
  {
    titulo: "Pavimentação de trecho",
    local: "Substituir pela cidade da obra",
    categoria: "Infraestrutura viária",
    imagem: obra3,
    alt: "Equipamento de pavimentação aplicando massa asfáltica",
    provisoria: true,
  },
  {
    titulo: "Escavação e drenagem",
    local: "Substituir pela cidade da obra",
    categoria: "Terraplenagem",
    imagem: obra4,
    alt: "Escavação de terreno com máquina em canteiro de obra",
    provisoria: true,
  },
];
