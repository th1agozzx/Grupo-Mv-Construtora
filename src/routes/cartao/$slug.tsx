import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  Check,
  Download,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCw,
  Share2,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import logoCartao from "@/assets/otimizadas/logomv-cartao.webp";
import { SITE_URL } from "@/config/empresa";
import { CARTOES, type Cartao } from "@/data/cartoes";

// Cartão de visita virtual. Fica fora da moldura do site (sem header, rodapé
// nem WhatsApp flutuante — ver SiteLayout) porque é aberto direto pelo link
// ou QR code do cartão físico, e a pessoa só quer salvar o contato.
//
// `noindex`: são dados pessoais de contato, não conteúdo para ranquear. Por
// isso a rota também não entra no sitemap.

const buscarCartao = (slug: string) => CARTOES.find((c) => c.slug === slug);

export const Route = createFileRoute("/cartao/$slug")({
  loader: ({ params }) => {
    const cartao = buscarCartao(params.slug);
    if (!cartao) throw notFound();
    return { slug: cartao.slug };
  },
  head: ({ params }) => {
    const cartao = buscarCartao(params.slug);
    if (!cartao) return {};

    const titulo = `${cartao.nome} — ${cartao.cargo} | Grupo MV Construtora`;
    const descricao = `Cartão de visita de ${cartao.nome}, ${cartao.cargo.toLowerCase()} do Grupo MV Construtora. Salve o contato, ligue ou chame no WhatsApp.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { name: "robots", content: "noindex, nofollow" },
        { name: "theme-color", content: "#1a1d21" },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
        { property: "og:url", content: `${SITE_URL}/cartao/${cartao.slug}` },
        { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
        { property: "og:type", content: "profile" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "Grupo MV Construtora" },
      ],
    };
  },
  component: PaginaCartao,
});

function gerarVcard(c: Cartao) {
  const [primeiroNome, ...sobrenomes] = c.nome.split(" ");
  // RFC 6350 exige CRLF entre as linhas.
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${sobrenomes.join(" ")};${primeiroNome};;;`,
    `FN:${c.nome}`,
    "ORG:Grupo MV Construtora",
    `TITLE:${c.cargo}`,
    `TEL;TYPE=CELL,VOICE:+${c.telefone}`,
    `EMAIL;TYPE=INTERNET,WORK:${c.email}`,
    `URL:${c.site}`,
    `ADR;TYPE=WORK:;;;${c.cidade};${c.uf};;Brasil`,
    "END:VCARD",
  ].join("\r\n");
}

function salvarContato(c: Cartao) {
  const blob = new Blob([gerarVcard(c)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${c.slug}.vcf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function PaginaCartao() {
  const { slug } = Route.useParams();
  const cartao = buscarCartao(slug);
  const [virado, setVirado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Abre mostrando a frente (logo) e vira sozinho para os dados — dá a
  // sensação do cartão físico. Quem pede menos movimento já cai nos dados.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVirado(true);
      return;
    }
    const t = setTimeout(() => setVirado(true), 1100);
    return () => clearTimeout(t);
  }, []);

  if (!cartao) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cartao.cidade}, ${cartao.uf}`,
  )}`;

  const compartilhar = async () => {
    const url = `${SITE_URL}/cartao/${cartao.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${cartao.nome} | Grupo MV Construtora`, url });
      } catch {
        // usuário fechou a folha de compartilhamento — nada a fazer
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  return (
    <main id="conteudo" className="min-h-screen bg-grafite-alto px-4 py-10 text-white sm:py-16">
      <div className="mx-auto flex max-w-[560px] flex-col items-center">
        {/* CARTÃO (frente e verso) */}
        <button
          type="button"
          onClick={() => setVirado((v) => !v)}
          aria-label={virado ? "Ver a frente do cartão" : "Ver o verso do cartão"}
          className="group w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mv"
          style={{ perspective: "1600px" }}
        >
          <div
            className="@container relative aspect-[7/4] w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{
              transformStyle: "preserve-3d",
              transform: virado ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <Frente />
            <Verso cartao={cartao} />
          </div>
        </button>
        <p className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
          <RotateCw size={13} /> Toque no cartão para virar
        </p>

        {/* IDENTIFICAÇÃO — o texto do cartão fica pequeno no celular */}
        <h1 className="mt-10 text-center text-3xl font-semibold tracking-tight">{cartao.nome}</h1>
        <p className="mt-1 text-center text-white/60">{cartao.cargo} · Grupo MV Construtora</p>

        <button
          type="button"
          onClick={() => salvarContato(cartao)}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-mv px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-mv-escuro"
        >
          <Download size={18} /> Salvar contato
        </button>

        <ul className="mt-3 w-full divide-y divide-white/10 border-y border-white/10">
          <Acao
            href={`https://wa.me/${cartao.telefone}`}
            icone={<MessageCircle size={20} />}
            rotulo="WhatsApp"
            valor={cartao.telefoneExibicao}
            externo
          />
          <Acao
            href={`tel:+${cartao.telefone}`}
            icone={<Phone size={20} />}
            rotulo="Ligar"
            valor={cartao.telefoneExibicao}
          />
          <Acao
            href={`mailto:${cartao.email}`}
            icone={<Mail size={20} />}
            rotulo="E-mail"
            valor={cartao.email}
          />
          <Acao
            href={mapsUrl}
            icone={<MapPin size={20} />}
            rotulo="Localização"
            valor={`${cartao.cidade} – ${cartao.uf}`}
            externo
          />
          <Acao
            href={cartao.site}
            icone={<Globe size={20} />}
            rotulo="Site"
            valor={cartao.siteExibicao}
            externo
          />
        </ul>

        <button
          type="button"
          onClick={compartilhar}
          className="mt-6 inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white/50 hover:text-white"
        >
          {copiado ? <Check size={16} /> : <Share2 size={16} />}
          {copiado ? "Link copiado" : "Compartilhar cartão"}
        </button>

        <p className="mt-12 text-center text-[11px] uppercase tracking-[0.3em] text-white/30">
          Infraestrutura que move o Brasil
        </p>
      </div>
    </main>
  );
}

function Acao({
  href,
  icone,
  rotulo,
  valor,
  externo = false,
}: {
  href: string;
  icone: ReactNode;
  rotulo: string;
  valor: string;
  externo?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
        className="flex items-center gap-4 px-1 py-4 transition-colors hover:bg-white/5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-mv-claro">
          {icone}
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-white/45">
            {rotulo}
          </span>
          <span className="block text-[15px] [overflow-wrap:anywhere]">{valor}</span>
        </span>
      </a>
    </li>
  );
}

// As medidas do cartão estão em cqw (1% da largura do cartão), tiradas da arte
// de 1050×600: assim o layout é idêntico ao impresso em qualquer tela.

const face = "absolute inset-0 overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]";
const semVerso = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

function Frente() {
  return (
    <div className={`${face} bg-[#484848]`} style={semVerso}>
      <img
        src={logoCartao}
        alt="Grupo MV Construtora"
        width={1000}
        height={333}
        className="absolute left-[12.4%] top-[21.5%] w-[72%]"
      />
      <p className="absolute left-0 right-0 top-[67%] text-center text-[1.95cqw] font-semibold uppercase tracking-[0.55em] text-white">
        Infraestrutura que move o Brasil
      </p>
      <span className="absolute left-0 top-[86.2%] h-[0.5%] w-[51.5%] bg-[#c1272d]" />
    </div>
  );
}

function Verso({ cartao }: { cartao: Cartao }) {
  const linha = "flex items-center gap-[2.6cqw] text-[2.1cqw] text-[#3d4350]";
  const icone = "w-[3.1cqw] h-[3.1cqw] shrink-0 text-[#9a9ca0]";
  return (
    <div
      className={`${face} bg-white text-left`}
      style={{ ...semVerso, transform: "rotateY(180deg)" }}
    >
      <MarcaDagua />

      <div className="absolute left-[6.7%] top-[28.5%]">
        <p className="text-[4.6cqw] font-semibold leading-none tracking-tight text-[#3d4350]">
          {cartao.nome}
        </p>
        <p className="mt-[1.4cqw] text-[2.5cqw] text-[#3d4350]">{cartao.cargo}</p>

        <div className="mt-[3.2cqw] flex flex-col gap-[2.2cqw]">
          <span className={linha}>
            <Phone className={icone} strokeWidth={1.4} />
            {cartao.telefoneExibicao}
          </span>
          <span className={linha}>
            <Mail className={icone} strokeWidth={1.4} />
            {cartao.email}
          </span>
          <span className={linha}>
            <MapPin className={icone} strokeWidth={1.4} />
            <span>
              {cartao.cidade} – <span className="text-mv">{cartao.uf}</span>
            </span>
          </span>
          <span className={linha}>
            <Globe className={icone} strokeWidth={1.4} />
            <span className="text-mv">{cartao.siteExibicao}</span>
          </span>
        </div>
      </div>

      <span className="absolute left-[65.5%] top-[34.5%] h-[48.5%] w-[0.25%] bg-[#c1272d]" />

      <ul className="absolute left-[70.5%] top-[49%] flex flex-col gap-[3.1cqw] text-[1.9cqw] uppercase tracking-[0.42em] text-[#3d4350]">
        <li>Obras</li>
        <li>Pessoas</li>
        <li>Resultados</li>
      </ul>
    </div>
  );
}

/**
 * "MV" da marca em rosa claro, no canto superior direito do verso. Vetorizado
 * a partir da arte oficial para ficar nítido em qualquer tamanho de tela.
 */
function MarcaDagua() {
  return (
    <svg
      viewBox="100 170 1440 672"
      aria-hidden="true"
      className="absolute right-[1.5%] top-[5%] w-[34%]"
      fill="#fbb9bb"
    >
      <polygon points="188,173 486,506 665,351 640,557 461,700 160,375" />
      <polygon points="156,413 293,563 270,815 106,815" />
      <polygon points="694,326 863,179 1019,179 1164,557 1302,557 1117,837 865,208 807,815 635,815" />
      <polygon points="1369,179 1533,179 1318,527 1158,527" />
    </svg>
  );
}
