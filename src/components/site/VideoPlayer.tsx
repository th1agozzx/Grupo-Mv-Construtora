import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { VideoItem } from "@/data/videos";

/**
 * Player com padrão "facade": mostra a capa e só monta o player de verdade
 * quando o usuário clica.
 *
 * Por que isso importa: um <iframe> do YouTube montado direto baixa ~1,2 MB de
 * script de terceiros e grava cookies mesmo sem ninguém dar play — o que
 * derruba o Lighthouse em "third-party code" e ainda cria obrigação de consentimento.
 * Com a facade, a página não pede nada ao YouTube até o clique.
 *
 * Enquanto o vídeo não tiver `youtubeId`, cai no MP4 local, para a migração
 * poder ser feita um vídeo de cada vez sem quebrar a seção.
 */
export function VideoPlayer({ video, ativo }: { video: VideoItem; ativo: boolean }) {
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ao trocar de slide, volta para a capa: evita continuar baixando/tocando
  // um vídeo que saiu da tela.
  useEffect(() => {
    if (!ativo) setTocando(false);
  }, [ativo]);

  const usaYoutube = video.youtubeId !== "";

  if (!tocando) {
    return (
      <button
        type="button"
        onClick={() => setTocando(true)}
        aria-label={`Reproduzir vídeo: ${video.titulo}`}
        className="group relative h-full w-full overflow-hidden"
      >
        <img
          src={video.poster}
          // O título já aparece como texto logo abaixo e no aria-label do botão.
          // Repetir aqui faz o leitor de tela anunciar a mesma frase três vezes
          // (auditoria image-redundant-alt). A imagem é decorativa neste contexto.
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
          <Play size={28} strokeWidth={2.4} className="ml-1" fill="currentColor" />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5 text-left text-sm font-semibold text-white sm:p-7 sm:text-base">
          {video.titulo}
        </span>
      </button>
    );
  }

  if (usaYoutube) {
    // youtube-nocookie.com não grava cookie de rastreamento antes do play.
    // O clique já é a interação do usuário, então o autoplay é permitido.
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0", // não sugere vídeos de outros canais ao terminar
      modestbranding: "1",
      playsinline: "1",
    });
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params}`}
        title={video.titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={video.src}
      poster={video.poster}
      aria-label={video.titulo}
      autoPlay
      controls
      loop
      playsInline
      className="h-full w-full object-cover"
    />
  );
}
