// Vídeos da seção "Equipamentos em ação".
//
// Os vídeos são hospedados no canal do YouTube da empresa. O player usa o
// padrão "facade": a página mostra só a capa e monta o iframe quando o usuário
// clica. Antes do clique, nada é pedido ao YouTube — nem script, nem cookie.
// Um <iframe> montado direto baixaria ~1,2 MB de terceiros mesmo sem play.
//
// COMO ADICIONAR UM VÍDEO NOVO
// 1. Subir no canal: https://www.youtube.com/@GrupoMVConstrutora
// 2. Copiar o ID da URL: youtube.com/watch?v=ABC123xyz_0  ->  "ABC123xyz_0"
// 3. Acrescentar uma entrada abaixo, com título, descrição, data e duração reais.
//
// Se `youtubeId` ficar vazio, o componente cai no MP4 local de `src` — o que
// permite migrar um vídeo de cada vez sem quebrar a seção.

import escavadeira1 from "@/assets/otimizadas/escavadeira1.webp";
import fotodas3escavadeiras from "@/assets/otimizadas/fotodas3escavadeiras.webp";
import fotodosmaquinarios from "@/assets/otimizadas/fotodosmaquinarios.webp";

export const YOUTUBE_CANAL = "https://www.youtube.com/@GrupoMVConstrutora";

export type VideoItem = {
  /** ID do YouTube. Vazio = usa o MP4 local de `src`. */
  youtubeId: string;
  /** MP4 local — fallback enquanto não houver `youtubeId`. */
  src: string;
  /** Capa exibida antes do play. Imagem local já otimizada: zero request externo. */
  poster: string;
  /** Título do vídeo. Vai para o VideoObject e para o aria-label do botão. */
  titulo: string;
  /** Descrição para o VideoObject. Específica por vídeo — não repetir entre eles. */
  descricao: string;
  /** Data de publicação no YouTube (ISO). Obrigatória no VideoObject. */
  publicadoEm: string;
  /** Duração em ISO 8601 (PT17S = 17 segundos). Usada no VideoObject. */
  duracao: string;
};

export const VIDEOS: VideoItem[] = [
  {
    youtubeId: "zMwNjXGsLQ8",
    src: "",
    poster: fotodosmaquinarios,
    titulo: "Grupo MV Construtora | Força, precisão e resultado em cada obra",
    descricao:
      "Apresentação da MV Construtora: frota própria de máquinas pesadas e equipes atuando em obras de terraplenagem e infraestrutura no Maranhão.",
    publicadoEm: "2026-09-02",
    duracao: "PT12S",
  },
  {
    youtubeId: "zAVoD7eSJgA",
    src: "",
    poster: fotodas3escavadeiras,
    titulo: "Máquinas em ação | Grupo MV Construtora - Maranhão - Brasil",
    descricao:
      "Escavadeiras hidráulicas da MV Construtora em operação de movimentação de terra em obra no Maranhão.",
    publicadoEm: "2026-09-02",
    duracao: "PT15S",
  },
  {
    youtubeId: "1-3J5D475oY",
    src: "",
    poster: escavadeira1,
    titulo: "Máquinas em ação | Grupo MV Construtora",
    descricao:
      "Maquinário pesado da frota própria da MV Construtora trabalhando em canteiro de obra de terraplenagem.",
    publicadoEm: "2026-09-02",
    duracao: "PT17S",
  },
];
