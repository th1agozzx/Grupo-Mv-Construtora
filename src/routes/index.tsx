import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SERVICOS, DESTAQUES } from "@/data/servicos";
import { REGIOES, ESTADOS_TEXTO, CIDADES_ATENDIDAS, cidadesDoEstado } from "@/data/regioes";
import { VIDEOS } from "@/data/videos";
import { CATEGORIAS_FROTA, FROTA } from "@/data/frota";
import { CATEGORIAS_OBRA, OBRAS } from "@/data/obras";
import { organizacaoSchema, websiteSchema, faqSchema, videosSchema, SITE_URL } from "@/lib/schema";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionTitle } from "@/components/site/SectionTitle";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { VIEWPORT_REVEAL, revealEscala } from "@/components/site/animacoes";
import { Revelar, RevelarGrade } from "@/components/site/Revelar";
import { Contador } from "@/components/site/Contador";
import { Carrossel } from "@/components/site/Carrossel";
import { Lightbox } from "@/components/site/Lightbox";
import { useAnimacaoEntrada, useReveal } from "@/hooks/use-reduced-motion";
import { EMPRESA, MAPS_EMBED_URL, MAPS_OPEN_URL, telLink, waLink } from "@/config/empresa";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BadgeCheck,
  Maximize2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import patrol from "@/assets/otimizadas/patrol.webp";
import caminhao from "@/assets/otimizadas/caminhao.webp";
import caminhaotraseira from "@/assets/otimizadas/caminhaotraseira.webp";
import pacarregadeira from "@/assets/otimizadas/pacarregadeira.webp";
import escavadeira1 from "@/assets/otimizadas/escavadeira1.webp";
import escavadeira2 from "@/assets/otimizadas/escavadeira2.webp";
import escavadeira3 from "@/assets/otimizadas/escavadeira3.webp";
import tresescavadeiras1 from "@/assets/otimizadas/tresescavadeiras1.webp";
import diferenciais from "@/assets/otimizadas/diferenciais.webp";
import caminhaopipa from "@/assets/otimizadas/caminhaopipa.webp";
import logomv from "@/assets/otimizadas/logomv.webp";
import logomvbanner from "@/assets/otimizadas/logomvbanner.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import operadoreseterceiros from "@/assets/otimizadas/operadoreseterceiros.webp";
import fotodaplacaalan from "@/assets/otimizadas/fotodaplacaalan.webp";
import fotoalanetalita from "@/assets/otimizadas/fotoalanetalita.webp";
import eventoinauguracao from "@/assets/otimizadas/eventoinauguracao.webp";
import fotodaplacatigd from "@/assets/otimizadas/fotodaplacatigd.webp";
import andamentodaobra from "@/assets/otimizadas/andamentodaobra.webp";
import colaboradores from "@/assets/otimizadas/colaboradores.webp";
import colaboradoresMobile from "@/assets/otimizadas/colaboradores-mobile.webp";
import alaneasmaquinas1 from "@/assets/otimizadas/alaneasmaquinas1.webp";
import caminhaopipa1 from "@/assets/otimizadas/caminhaopipa1.webp";
import caminhaoprancha from "@/assets/otimizadas/caminhaoprancha.webp";
import colaboradores1 from "@/assets/otimizadas/colaboradores1.webp";
import fotodapatrol from "@/assets/otimizadas/fotodapatrol.webp";
import fotodas3escavadeiras from "@/assets/otimizadas/fotodas3escavadeiras.webp";
import fotodosmaquinarios from "@/assets/otimizadas/fotodosmaquinarios.webp";
import placapedrafundamental from "@/assets/otimizadas/placapedrafundamental.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Grupo MV Construtora | Terraplenagem no MA, PA, PI e CE",
      },
      {
        name: "description",
        content:
          "Terraplenagem, obras civis e locação de máquinas pesadas no Maranhão, Pará, Piauí e Ceará. Sede em Pindaré-Mirim (MA), do interior às capitais desde 2011.",
      },
      {
        property: "og:title",
        content: "Grupo MV Construtora | Terraplenagem e Locação de Máquinas no MA, PA, PI e CE",
      },
      {
        property: "og:description",
        content:
          "Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas pesadas no Maranhão, Pará, Piauí e Ceará. Desde 2011 em Pindaré-Mirim.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Grupo MV Construtora" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "geo.region", content: "BR-MA" },
      { name: "geo.placename", content: "Pindaré-Mirim" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Grupo MV Construtora — terraplenagem e locação de máquinas no Maranhão, Pará, Piauí e Ceará",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

// --- Slide de fotos (logo após o Hero) ---
// Este array não tem limite de quantidade: para adicionar uma nova foto, basta
// 1) colocar o arquivo .png/.jpg em src/assets/
// 2) rodar `node scripts/otimizar-imagens.mjs` (gera o .webp em src/assets/otimizadas/)
// 3) importar lá em cima (import minhaFoto from "@/assets/otimizadas/minhafoto.webp")
// 4) adicionar uma nova linha aqui embaixo no formato { src: minhaFoto, alt: "Descrição da foto" }
// O alt deve descrever a foto de verdade e, quando fizer sentido, citar a cidade.
const slideshowImages: { src: string; alt: string }[] = [
  {
    src: colaboradores,
    alt: "Equipe do Grupo MV Construtora em obra de terraplenagem no Maranhão",
  },
  {
    src: operadoreseterceiros,
    alt: "Gestores, operadores e equipes terceirizadas do Grupo MV Construtora em canteiro de obra",
  },
  {
    src: placapedrafundamental,
    alt: "Placa de pedra fundamental de obra executada pelo Grupo MV Construtora",
  },
  { src: colaboradores1, alt: "Colaboradores do Grupo MV Construtora em Pindaré-Mirim, Maranhão" },
  {
    src: fotodaplacatigd,
    alt: "Placa da obra do Terminal Intermodal Gonçalves Dias, no Maranhão",
  },
  {
    src: eventoinauguracao,
    alt: "Evento de inauguração de obra entregue pelo Grupo MV Construtora",
  },
  { src: andamentodaobra, alt: "Andamento de obra de movimentação de terra no Maranhão" },
  { src: fotodaobra, alt: "Obra de terraplenagem em execução pelo Grupo MV Construtora" },
  {
    src: fotodosmaquinarios,
    alt: "Maquinário pesado da frota própria do Grupo MV Construtora",
  },
  {
    src: fotodas3escavadeiras,
    alt: "Três escavadeiras hidráulicas da frota do Grupo MV Construtora em obra",
  },
];

// --- Imagens da seção "Por que escolher o Grupo MV" (também em slide, sem limite) ---
// Mesma lógica do array acima: importe a foto no topo do arquivo e adicione
// uma nova linha aqui para ela entrar no slide.
const diferenciaisImages: { src: string; alt: string }[] = [
  { src: diferenciais, alt: "Equipe do Grupo MV Construtora em obra no Vale do Pindaré, Maranhão" },
  { src: fotodaplacaalan, alt: "Placa de identificação de obra do Grupo MV Construtora" },
  {
    src: fotoalanetalita,
    alt: "Fundadores do Grupo MV Construtora em frente à placa de obra",
  },
  { src: colaboradores1, alt: "Equipe operacional do Grupo MV Construtora em campo" },
  { src: colaboradores, alt: "Equipe do Grupo MV Construtora ao lado das máquinas em obra" },
];

// Classes compartilhadas dos campos do formulário.
const rotuloForm = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-concreto";
const erroForm = "mt-2 text-xs font-medium text-mv-escuro";
const campoForm = (temErro: boolean) =>
  `w-full border bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-concreto/70 ${
    temErro ? "border-mv" : "border-borda focus:border-mv"
  }`;

// Números da empresa. Só entra aqui o que é verificável: data de fundação no
// CNPJ e a área de atuação declarada em src/data/regioes.ts. Nada de estimativa
// de obras entregues ou de metros cúbicos enquanto o cliente não confirmar.
const NUMEROS: { valor: number; prefixo?: string; rotulo: string; separador?: boolean }[] = [
  { valor: 2011, rotulo: "Ano de fundação", separador: false },
  { valor: 11, prefixo: "+", rotulo: "Anos de atuação" },
  { valor: REGIOES.length, rotulo: "Estados atendidos" },
  { valor: CIDADES_ATENDIDAS.length, rotulo: "Cidades na área de cobertura" },
];

// Pilares da marca, conforme o manual de identidade visual do Grupo MV Construtora.
const PILARES: [string, string][] = [
  ["Força", "para realizar"],
  ["Confiança", "em cada entrega"],
  ["Estrutura", "para crescer"],
  ["Precisão", "em cada detalhe"],
  ["Infraestrutura", "por um Brasil mais forte"],
];

const faqs: [string, string][] = [
  [
    "Quais cidades o Grupo MV Construtora atende?",
    "O Grupo MV Construtora tem sede em Pindaré-Mirim (MA) e atende Maranhão, Pará, Piauí e Ceará. No Maranhão, com presença frequente em Santa Inês, Bacabal, Zé Doca, Açailândia, Imperatriz e São Luís; no Pará, em Belém, Marabá, Parauapebas, Paragominas e Dom Eliseu; no Piauí, em Teresina, Parnaíba, Picos e Floriano; no Ceará, em Fortaleza, Sobral, Juazeiro do Norte e Crateús. Atendemos de pequenas cidades do interior às capitais, em obras urbanas, rurais, industriais e comerciais.",
  ],
  [
    "Quais serviços o Grupo MV Construtora executa?",
    "Terraplenagem (incluindo pavimentação), infraestrutura viária (estradas vicinais, patrolamento e cascalhamento), obras civis, drenagem pluvial, preparação e limpeza de áreas, locação de máquinas pesadas, transporte de equipamentos com caminhão prancha, serviços com caminhão Munck, apoio e gestão de grandes obras e serviços para propriedades rurais.",
  ],
  [
    "Os equipamentos são locados com operador?",
    "Sim. Disponibilizamos operadores experientes e treinados. Também avaliamos locações sem operador conforme o equipamento e o contrato.",
  ],
  [
    "Como funciona o orçamento?",
    "Entendemos o escopo, local, prazo e condições do terreno. Com essas informações, enviamos uma proposta transparente e personalizada.",
  ],
  [
    "O Grupo MV Construtora faz a gestão completa da obra?",
    "Sim. Dentro do serviço de apoio e gestão de grandes obras, assumimos planejamento, equipes, equipamentos, acompanhamento técnico e controle de custos, qualidade e cronograma, conforme a necessidade do projeto.",
  ],
];

// --- Validação do formulário ---
// O formulário não envia e-mail: monta uma mensagem estruturada e abre o
// WhatsApp da empresa. Quem envia já se identifica pelo próprio número, então o
// campo telefone virou opcional — cada campo obrigatório a menos é conversão a mais.
const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),

  // Só o essencial é obrigatório. Cada campo obrigatório a mais é conversão a menos,
  // e o WhatsApp já entrega o número de quem enviou.
  servico: z.string().trim().max(80).optional().or(z.literal("")),
  cidade: z.string().trim().max(80).optional().or(z.literal("")),

  telefone: z
    .string()
    .trim()
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]*$/, "Use apenas números e ( ) + -")
    .optional()
    .or(z.literal("")),

  email: z.string().trim().email("Informe um e-mail válido").optional().or(z.literal("")),

  mensagem: z
    .string()
    .trim()
    .min(10, "Descreva o que você precisa")
    .max(1000, "Mensagem muito longa"),
});
type ContactForm = z.infer<typeof contactSchema>;
/**
 * Vitrine de obras entregues, com filtro por tipo de serviço.
 *
 * O conteúdo vem de src/data/obras.ts — ver o aviso de material provisório lá.
 */
function ObrasRealizadas() {
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS_OBRA)[number]>("Todas");
  const [aberta, setAberta] = useState<number | null>(null);

  const lista = useMemo(
    () => (categoria === "Todas" ? OBRAS : OBRAS.filter((obra) => obra.categoria === categoria)),
    [categoria],
  );

  // O lightbox navega dentro da lista filtrada — o que o usuário vê é o que ele
  // percorre com as setas.
  const fotos = useMemo(
    () => lista.map((obra) => ({ src: obra.imagem, alt: obra.alt, legenda: obra.titulo })),
    [lista],
  );

  return (
    <section id="obras" className="border-t border-borda bg-areia py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="Obras realizadas" title="O resultado fica no chão." />
          <Revelar atraso={0.1} className="max-w-md">
            <p className="leading-7 text-concreto">
              Terraplenagem, estradas e obras civis executadas com frota própria e equipe da casa,
              do primeiro movimento de terra até a entrega da área.
            </p>
          </Revelar>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIAS_OBRA.map((item) => {
            const ativa = categoria === item;
            return (
              <button
                key={item}
                onClick={() => setCategoria(item)}
                aria-pressed={ativa}
                className={`border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  ativa
                    ? "border-mv bg-mv text-white"
                    : "border-borda bg-white text-concreto hover:border-grafite hover:text-grafite"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <Carrossel rotulo="Obras realizadas" className="-ml-6">
            {lista.map((obra, i) => (
              <div
                key={obra.slug}
                className="min-w-0 flex-[0_0_88%] pl-6 sm:flex-[0_0_52%] lg:flex-[0_0_33%] xl:flex-[0_0_26%]"
              >
                <article className="border border-borda bg-white transition-colors hover:border-mv">
                  <Link
                    to="/obras/$slug"
                    params={{ slug: obra.slug }}
                    className="group block w-full text-left"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={obra.imagens[0]}
                        alt={obra.alt}
                        width={1400}
                        height={1050}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mv-escuro">
                          {obra.categoria}
                        </span>
                        <span className="font-mono text-xs text-concreto">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-6 text-grafite">
                        {obra.titulo}
                      </h3>
                      {obra.local && <p className="mt-2 text-sm text-concreto">{obra.local}</p>}
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setAberta(i)}
                    className="mx-6 mb-6 inline-flex items-center gap-2 border-b border-mv pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:border-grafite hover:text-grafite"
                  >
                    <Maximize2 size={14} /> Ampliar
                  </button>
                </article>
              </div>
            ))}
          </Carrossel>
        </div>
      </div>

      <Lightbox
        fotos={fotos}
        indice={aberta}
        aoFechar={() => setAberta(null)}
        aoTrocar={setAberta}
      />
    </section>
  );
}

function VideoSlideshow() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % VIDEOS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + VIDEOS.length) % VIDEOS.length), []);

  return (
    <section id="galeria-videos" className="bg-areia py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Nossos Trabalhos" title="Equipamentos em ação." />
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="relative h-[260px] w-full overflow-hidden rounded-sm bg-chumbo sm:h-[420px] lg:h-[460px]">
          <VideoPlayer key={index} video={VIDEOS[index]} ativo />

          <button
            onClick={prev}
            aria-label="Vídeo anterior"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:left-5"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            aria-label="Próximo vídeo"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 sm:right-5"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicadores. A área de toque tem 44px mesmo com o ponto pequeno. */}
        <div className="mt-6 flex items-center justify-center gap-1">
          {VIDEOS.map((video, i) => (
            <button
              key={video.youtubeId || video.src}
              onClick={() => setIndex(i)}
              aria-label={`Ir para o vídeo ${i + 1}: ${video.titulo}`}
              aria-current={i === index}
              className="grid h-11 w-11 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-mv" : "w-2 bg-concreto"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Foto que desliza um pouco mais devagar que a página.
 *
 * Só transform — nada de opacidade — então o SSR continua entregando a imagem
 * visível. Quem pediu menos movimento recebe a foto parada.
 */
function FotoComParallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="overflow-hidden lg:sticky lg:top-28 lg:self-start">
      <motion.img
        src={src}
        alt={alt}
        width={1600}
        height={1067}
        loading="lazy"
        decoding="async"
        style={reduzirMovimento ? undefined : { y }}
        className="aspect-[4/3] w-full scale-110 object-cover"
      />
    </div>
  );
}

function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    // Quem pediu menos movimento no sistema fica com a primeira foto fixa.
    if (reduzirMovimento) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduzirMovimento]);

  return (
    <div className="absolute inset-0">
      {/* A foto inicial é HTML estático: o navegador a pinta antes de baixar e hidratar o React. */}
      {/* display:contents — <picture> é inline por padrão e geraria caixa de linha
          no fluxo, mesmo contendo só um <img> absoluto. */}
      <picture className="contents">
        <source media="(max-width: 768px)" srcSet={colaboradoresMobile} />
        <img
          src={slideshowImages[0].src}
          alt={slideshowImages[0].alt}
          width={1600}
          height={1067}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-kenburns absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {index !== 0 && (
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={index}
            src={slideshowImages[index].src}
            alt={slideshowImages[index].alt}
            width={1600}
            height={1067}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="hero-kenburns absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      )}
    </div>
  );
}

function DiferenciaisSlideshow() {
  const [index, setIndex] = useState(0);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    // Mantém a primeira imagem fixa quando o sistema pede menos movimento.
    if (reduzirMovimento) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % diferenciaisImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduzirMovimento]);

  return (
    <motion.div
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={VIEWPORT_REVEAL}
      className="relative"
    >
      <div className="relative h-[520px] w-full overflow-hidden lg:h-[600px]">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={diferenciaisImages[index].src}
            alt={diferenciaisImages[index].alt}
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover grayscale-[10%]"
          />
        </AnimatePresence>
      </div>

      {diferenciaisImages.length > 1 && (
        <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-4">
          {diferenciaisImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-current={i === index}
              className="grid h-11 w-11 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-0 right-0 w-[90%] bg-mv p-6 text-white">
        <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-2xl">
          Seu cronograma é o nosso compromisso.
        </p>
      </div>
    </motion.div>
  );
}

function Index() {
  const { animar: animarEntrada } = useAnimacaoEntrada();
  const reveal = useReveal();
  const [openFaq, setOpenFaq] = useState(0);
  const [ativa, setAtiva] = useState<(typeof CATEGORIAS_FROTA)[number]>("Todos");
  const [sent, setSent] = useState(false);

  const frotaFiltrada = useMemo(
    () => (ativa === "Todos" ? FROTA : FROTA.filter((m) => m.categoria === ativa)),
    [ativa],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const onSubmit = (data: ContactForm) => {
    // Monta a mensagem já formatada para a equipe ler no WhatsApp sem precisar
    // perguntar o básico de novo.
    const linhas = [
      "*Solicitação de orçamento — site Grupo MV Construtora*",
      "",
      `*Nome:* ${data.nome}`,
      data.email ? `*E-mail:* ${data.email}` : null,
      data.telefone ? `*Telefone:* ${data.telefone}` : null,
      data.servico ? `*Serviço:* ${data.servico}` : null,
      data.cidade ? `*Cidade da obra:* ${data.cidade}` : null,
      "",
      "*Necessidade:*",
      data.mensagem,
      // filter(Boolean) removeria também as linhas em branco propositais
    ].filter((linha) => linha !== null);

    window.open(waLink(linhas.join("\n")), "_blank", "noopener,noreferrer");

    setSent(true);
    reset();
    setTimeout(() => setSent(false), 8000);
  };

  return (
    <>
      {/* Dados estruturados (schema.org). JSON-LD no <body> é igualmente válido
          para o Google — a documentação aceita head ou body. Como o site é SSR,
          o script chega no HTML inicial, que é o que importa para os crawlers de IA. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacaoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videosSchema(VIDEOS)) }}
      />

      <main id="conteudo" className="pt-20">
        {/* HERO */}
        <section
          id="inicio"
          className="relative flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-chumbo"
        >
          {/* A imagem ocupa 100% da largura e passa por baixo do header translúcido. */}
          <HeroBackgroundSlideshow />

          {/*
            Escurecimento direcional. A foto tem céu claro e pessoas de roupa clara —
            sem isso o texto branco some. Mas véu uniforme forte apaga a foto inteira,
            então o degradê acompanha onde o texto está:
            - no mobile o texto ocupa a largura toda -> degradê de baixo para cima
            - no desktop o texto fica à esquerda -> degradê da esquerda para a direita,
              deixando o lado direito da foto visível
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-chumbo via-chumbo/75 to-chumbo/25 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-r from-chumbo via-chumbo/75 to-chumbo/15 lg:block"
          />
          {/* Fecha a emenda com a faixa escura da seção seguinte. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-chumbo to-transparent lg:block"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-14 sm:pt-20 lg:pb-[clamp(2.5rem,6vh,5rem)] lg:pt-[clamp(4rem,10vh,7rem)]">
            <motion.div
              initial={animarEntrada ? "hidden" : false}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.14 } } }}
              className="max-w-5xl"
            >
              <motion.div
                variants={reveal}
                className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white [text-shadow:0_1px_8px_rgb(0_0_0_/_0.6)] lg:mb-[clamp(1rem,2.5vh,1.75rem)]"
              >
                <span className="h-px w-10 bg-mv" /> Pindaré-Mirim · Maranhão · Desde 2011
              </motion.div>
              <motion.h1
                variants={reveal}
                className="max-w-5xl text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgb(0_0_0_/_0.6)] sm:text-5xl lg:text-[clamp(3.25rem,6.5vh,4.25rem)]"
              >
                Terraplenagem e Locação de Máquinas Pesadas no{" "}
                <span className="text-white/90">{ESTADOS_TEXTO}</span>
              </motion.h1>
              <motion.p
                variants={reveal}
                className="mt-4 text-lg font-medium text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.7)] sm:text-xl"
              >
                Força para executar. Precisão para entregar.
              </motion.p>
              <motion.p
                variants={reveal}
                className="mt-3 max-w-2xl text-base leading-7 text-white/90 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.7)] sm:mt-4 sm:text-lg"
              >
                Terraplenagem, obras civis, infraestrutura viária, drenagem e locação de máquinas
                pesadas no {ESTADOS_TEXTO}, com segurança, produtividade e compromisso do primeiro
                movimento de terra até a entrega.
              </motion.p>
              <motion.div
                variants={reveal}
                className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row"
              >
                <CTAButton href="#contato">Solicitar orçamento</CTAButton>
                <CTAButton href="#servicos" variante="clara">
                  Conhecer soluções
                </CTAButton>
              </motion.div>
            </motion.div>

            {/* Convite a rolar: linha que pulsa, no fim do hero. */}
            <motion.a
              href="#servicos"
              aria-label="Ver os serviços"
              className="mt-10 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white lg:inline-flex"
              initial={animarEntrada ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.span
                aria-hidden="true"
                className="block h-10 w-px bg-white/40"
                style={{ originY: 0 }}
                animate={animarEntrada ? { scaleY: [0.3, 1, 0.3] } : undefined}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              Role para ver
            </motion.a>
          </div>
        </section>

        {/* FAIXA DE DESTAQUES — resume as frentes de atuação logo abaixo do hero */}
        <section aria-label="Frentes de atuação" className="border-b border-borda bg-white">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-xs font-medium uppercase tracking-[0.16em] text-concreto">
              {DESTAQUES.map((item, i) => (
                <li key={item} className="flex items-center gap-6">
                  <span>{item}</span>
                  {i < DESTAQUES.length - 1 && (
                    <span aria-hidden="true" className="h-3 w-px bg-borda" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* NÚMEROS — só dados verificáveis (fundação, estados e cidades atendidas). */}
        <section aria-label="A empresa em números" className="border-b border-borda bg-white">
          <RevelarGrade
            intervalo={0.1}
            className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-5 py-16 sm:px-8 lg:grid-cols-4"
          >
            {NUMEROS.map((numero, i) => (
              <Revelar filho key={numero.rotulo} atraso={i * 0.08}>
                <p className="text-4xl font-semibold tracking-tight text-grafite sm:text-5xl">
                  <Contador
                    valor={numero.valor}
                    prefixo={numero.prefixo}
                    separador={numero.separador}
                  />
                </p>
                <p className="mt-3 border-t border-mv pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-concreto">
                  {numero.rotulo}
                </p>
              </Revelar>
            ))}
          </RevelarGrade>
        </section>

        {/* SLIDE DE VÍDEOS — logo após o Hero */}
        <VideoSlideshow />

        {/* GALERIA DE FROTA COM FILTROS + LIGHTBOX */}
        <section id="frota" className="bg-areia py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Nossa frota"
                title="A máquina certa, no lugar certo, no tempo certo."
              />
              <div className="max-w-md">
                <p className="leading-7 text-concreto">
                  Frota própria e revisada, com operador treinado. Cada equipamento tem uma página
                  com as aplicações dele e os serviços em que entra.
                </p>
                <Link
                  to="/frota"
                  className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
                >
                  Ver a frota completa <MoveUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Filtros por categoria */}
            <div className="mt-10 flex flex-wrap gap-2">
              {CATEGORIAS_FROTA.map((cat) => {
                const active = ativa === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setAtiva(cat)}
                    aria-pressed={active}
                    className={`border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      active
                        ? "border-mv bg-mv text-white"
                        : "border-borda bg-white text-concreto hover:border-grafite hover:text-grafite"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Cada card leva à página do equipamento */}
            <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {frotaFiltrada.map((item) => (
                  <motion.div
                    layout
                    key={item.slug}
                    // O fade só entra depois que o React monta (`animarEntrada`).
                    // No servidor os 6 cards precisam sair visíveis: com opacity
                    // no HTML, quem espera a hidratação vê a seção vazia.
                    initial={animarEntrada ? { opacity: 0, y: 20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to="/frota/$slug"
                      params={{ slug: item.slug }}
                      className="group block h-full border border-borda bg-white text-left transition-colors hover:border-mv"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.imgs[0]}
                          alt={`${item.nome} da frota do Grupo MV Construtora em operação`}
                          width={1600}
                          height={1200}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-chumbo/0 transition-colors duration-300 group-hover:bg-chumbo/20"
                        />
                        {item.imgs.length > 1 && (
                          <span className="absolute right-3 top-3 z-10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                            {item.imgs.length} fotos
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mv-escuro">
                          {item.categoria}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-grafite">{item.nome}</h3>
                        <p className="mt-2 text-sm leading-6 text-concreto">{item.resumo}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-mv-escuro">
                          Ver equipamento <MoveUpRight size={16} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="O que fazemos"
              title="Estrutura completa para obras que não podem parar."
            />
            <div className="max-w-md">
              <p className="leading-7 text-concreto">
                Dez frentes de atuação e um único parceiro para mobilizar máquinas, equipes e gestão
                em obras públicas e privadas no Maranhão, no Pará, no Piauí e no Ceará.
              </p>
              <Link
                to="/servicos"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-mv-escuro transition-colors hover:text-grafite"
              >
                Ver todos os serviços em detalhe <MoveUpRight size={16} />
              </Link>
            </div>
          </div>
          <RevelarGrade
            intervalo={0.09}
            className="mt-16 grid border-t border-borda lg:grid-cols-3"
          >
            {SERVICOS.map((service, i) => (
              <Revelar
                filho
                as="article"
                key={service.slug}
                className="group border-b border-borda py-9 lg:border-r lg:px-8 lg:first:pl-0"
              >
                <div className="mb-12 flex items-center justify-between">
                  <service.icon
                    className="text-mv transition-transform duration-300 group-hover:-translate-y-1"
                    size={31}
                    strokeWidth={1.6}
                  />
                  <span className="font-mono text-xs text-concreto">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{service.nome}</h3>
                <p className="mt-4 max-w-sm leading-7 text-concreto">{service.resumo}</p>
                <Link
                  to="/servicos/$slug"
                  params={{ slug: service.slug }}
                  className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-grafite transition-colors hover:text-mv"
                >
                  Ver detalhes <MoveUpRight size={16} />
                </Link>
              </Revelar>
            ))}
          </RevelarGrade>
        </section>

        <ObrasRealizadas />

        {/* SOBRE */}
        <section id="quem-somos" className="border-t border-borda py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              {/* A foto deixou de ser fundo escuro atrás do texto e virou coluna própria:
                  a leitura fica em preto no branco e a imagem aparece inteira. */}
              <FotoComParallax
                src={alaneasmaquinas1}
                alt="Equipe e máquinas do Grupo MV Construtora em obra no Maranhão"
              />
              <div>
                <SectionTitle
                  eyebrow="Quem somos"
                  title="Construção que nasce da experiência de campo."
                />
                <p className="mt-8 max-w-2xl text-lg leading-8 text-concreto">
                  De Pindaré-Mirim para obras no Maranhão, no Pará, no Piauí e no Ceará, o Grupo MV
                  Construtora une experiência de campo, planejamento e relações de confiança.
                </p>
                <div className="mt-10 max-w-2xl leading-7 text-concreto [&>h3]:mt-9 [&>h3]:text-[13px] [&>h3]:font-semibold [&>h3]:uppercase [&>h3]:tracking-[0.18em] [&>h3]:text-mv-escuro [&>p]:mt-3 [&>p]:text-[15px] [&>ul]:mt-3 [&>ul]:text-[15px]">
                  <h3>Nossa história</h3>
                  <p>
                    O Grupo MV Construtora nasceu do sonho, da determinação e da visão empreendedora
                    de{" "}
                    <strong className="font-semibold text-grafite">
                      Alan Robson Leite Pereira
                    </strong>
                    , que fundou a empresa em{" "}
                    <time dateTime="2011-09-14">14 de setembro de 2011</time>, em Pindaré-Mirim, no
                    Maranhão.
                  </p>
                  <p>
                    Filho de Maria Aparecida e de José de Anchieta (in memoriam), Alan sempre
                    acreditou que o trabalho realizado com honestidade, dedicação e compromisso é
                    capaz de transformar vidas e construir um legado. Corretor de imóveis por
                    formação e empreendedor por vocação, é casado com Talita Mendes e pai de Miguel
                    Ângelo e Alan Vinícius.
                  </p>

                  <h3>A origem do nome</h3>
                  <p>
                    Foi justamente do maior patrimônio de sua vida — sua família — que surgiu o nome
                    da empresa. A união das iniciais de seus filhos,{" "}
                    <strong className="font-semibold text-grafite">M</strong>iguel e{" "}
                    <strong className="font-semibold text-grafite">V</strong>inícius, deu origem ao
                    Grupo MV Construtora, simbolizando que cada obra carrega os mesmos valores
                    cultivados dentro de casa: responsabilidade, confiança, respeito e compromisso
                    com o futuro.
                  </p>

                  <h3>Nossa trajetória</h3>
                  <p>
                    Ao longo de sua trajetória, a empresa atuou na construção de edifícios e
                    residências, adquirindo sólida experiência no setor da construção civil. Com o
                    passar dos anos, acompanhando as necessidades do mercado e investindo
                    continuamente em pessoas, equipamentos e tecnologia, o Grupo MV Construtora
                    expandiu sua atuação e especializou-se em obras de terraplenagem e
                    infraestrutura no Maranhão.
                  </p>
                  <p>
                    Mais do que executar obras, o Grupo MV Construtora constrói relacionamentos
                    duradouros, gera desenvolvimento para as comunidades onde atua e contribui para
                    o crescimento da infraestrutura do estado.
                  </p>

                  <h3>Serviços em que somos referência</h3>
                  <ul className="list-disc space-y-2 pl-5 marker:text-mv">
                    <li>Terraplenagem</li>
                    <li>Construção e recuperação de estradas vicinais</li>
                    <li>Escavação, corte e aterro</li>
                    <li>Regularização e nivelamento de terrenos</li>
                    <li>Preparação de solo para plantio e empreendimentos agrícolas</li>
                    <li>Limpeza e conformação de áreas</li>
                    <li>Movimentação de terra para obras públicas e privadas</li>
                  </ul>

                  <p>
                    Cada projeto é conduzido com planejamento, segurança, qualidade técnica e
                    respeito aos prazos estabelecidos, buscando sempre superar as expectativas de
                    clientes e parceiros.
                  </p>
                  <p className="font-medium text-grafite">
                    Grupo MV Construtora — movendo a terra, construindo o futuro e deixando um
                    legado de confiança, excelência e compromisso em cada projeto.
                  </p>
                </div>

                {/*
                PENDENTE: trocar por números reais da empresa (task 09).
                "100% compromisso com prazos" é alegação genérica e não verificável —
                sistemas de IA descartam esse tipo de afirmação. Substituir por algo
                aferível: obras entregues, máquinas próprias, m³ movimentados.
                Ao acrescentar o terceiro número, voltar o grid para grid-cols-3.
              */}
                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-borda pt-8">
                  {[
                    ["+11", "anos de atuação"],
                    //["+50", "obras entregues"],
                    ["100%", "compromisso com prazos"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <p className="text-4xl font-semibold tracking-tight text-grafite sm:text-6xl">
                        {value}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mv-escuro">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section
          id="diferenciais"
          className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-32"
        >
          <DiferenciaisSlideshow />
          <div className="lg:pl-12">
            <SectionTitle
              eyebrow="Por que escolher o Grupo MV"
              title="Execução confiável, sem improviso."
            />
            <p className="mt-8 max-w-lg leading-7 text-concreto">
              Combinamos experiência de campo, manutenção preventiva e gestão próxima para reduzir
              riscos e entregar previsibilidade.
            </p>
            <div className="mt-10 space-y-7">
              {[
                [
                  ShieldCheck,
                  "Segurança em primeiro lugar",
                  "Procedimentos, equipe treinada e operação responsável.",
                ],
                [
                  Clock3,
                  "Agilidade de mobilização",
                  "Resposta rápida para sua obra manter o ritmo planejado.",
                ],
                [
                  BadgeCheck,
                  "Transparência do início ao fim",
                  "Escopo claro, comunicação direta e acompanhamento próximo.",
                ],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof ShieldCheck;
                return (
                  <div key={title as string} className="flex gap-5 border-t border-borda pt-7">
                    <FeatureIcon className="mt-1 shrink-0 text-mv" />
                    <div>
                      <h3 className="font-semibold">{title as string}</h3>
                      <p className="mt-2 text-sm leading-6 text-concreto">{text as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PILARES DA MARCA — definidos no manual de identidade visual. */}
        <section aria-label="Nossos pilares" className="border-y border-borda bg-areia">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-concreto">
              Nossos pilares
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {PILARES.map(([titulo, complemento]) => (
                <li key={titulo} className="border-t-2 border-mv pt-5">
                  <p className="text-[15px] font-semibold uppercase tracking-[0.06em] text-grafite">
                    {titulo}
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-concreto">{complemento}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DEPOIMENTO */}
        <section className="bg-mv py-24 text-white lg:py-28">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <Quote className="mx-auto mb-8" size={40} strokeWidth={1.4} />
            <Revelar
              as="blockquote"
              className="text-[26px] font-medium leading-[1.25] tracking-[-0.01em] sm:text-[38px]"
            >
              “O Grupo MV entende a urgência, mobiliza a equipe rapidamente e mantem a obra
              avançando sem surpresas.”
            </Revelar>
            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85">
              ALAN ROBSON <br />
              CEO
            </p>
          </div>
        </section>

        {/* FAQ */}
        {/* ÁREA DE ATUAÇÃO */}
        {/* ÁREA DE ATUAÇÃO — agrupada por estado. Cada cidade é uma variação de
            busca real ("terraplenagem em <cidade>"), e as menores são as de
            menor concorrência. Fonte única: src/data/regioes.ts */}
        <section id="area-de-atuacao" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionTitle
            eyebrow="Área de atuação"
            title={`Terraplenagem e locação de máquinas no ${ESTADOS_TEXTO}.`}
          />
          <p className="mt-8 max-w-2xl leading-7 text-concreto">
            Com base em {EMPRESA.cidade}, no Vale do Pindaré, o Grupo MV Construtora mobiliza
            máquinas, equipamentos e equipes para obras urbanas, rurais, industriais e comerciais —
            de pequenas cidades do interior às capitais, para clientes públicos e privados.
          </p>

          <div className="mt-12 space-y-10">
            {REGIOES.map((regiao, indice) => (
              <div key={regiao.uf} className="border-t border-borda pt-7">
                <span className="font-mono text-xs text-concreto">
                  {String(indice + 1).padStart(2, "0")}.
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {regiao.estado}
                  {regiao.sede && (
                    <span className="ml-3 bg-mv px-3 py-1 align-middle text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Sede
                    </span>
                  )}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cidadesDoEstado(regiao).map((cidade) => (
                    <li
                      key={`${regiao.uf}-${cidade}`}
                      className="border border-borda px-4 py-2 text-[13px] text-concreto"
                    >
                      Terraplenagem em {cidade} - {regiao.uf}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-9 text-sm text-concreto">
            Não encontrou sua cidade? Atendemos {ESTADOS_TEXTO} —{" "}
            <a
              href="#contato"
              className="font-semibold text-grafite underline decoration-mv underline-offset-4"
            >
              consulte a mobilização para a sua obra
            </a>
            .
          </p>
        </section>

        <section id="faq" className="border-y border-borda bg-areia py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionTitle
                eyebrow="Dúvidas frequentes"
                title="Informação clara antes de começar."
              />
              <p className="mt-7 text-concreto">
                Ainda tem dúvidas?{" "}
                <a
                  href="#contato"
                  className="font-semibold text-grafite underline decoration-mv underline-offset-4"
                >
                  Fale com nosso time e tire suas dúvidas.
                </a>
              </p>
            </div>
            <div className="border-t border-borda">
              {faqs.map(([question, answer], i) => (
                <div key={question} className="border-b border-borda">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold"
                    aria-expanded={openFaq === i}
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-mv" : ""}`}
                      size={20}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pr-10 leading-7 text-concreto">{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAPA & ENDEREÇO */}
        <section id="localizacao" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionTitle eyebrow="Onde estamos" title="Visite nossa base ou fale conosco." />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative overflow-hidden border border-borda">
              <iframe
                title="Mapa do Grupo MV Construtora"
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full lg:h-[520px]"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 border border-borda bg-areia p-8 sm:p-10">
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-mv-escuro">
                  Endereço
                </p>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-mv" size={22} />
                  <p className="text-lg leading-7 text-grafite">{EMPRESA.endereco}</p>
                </div>
                <div className="mt-8 space-y-4 border-t border-borda pt-8 text-sm text-concreto">
                  <a
                    href={telLink}
                    className="flex items-center gap-3 transition-colors hover:text-grafite"
                  >
                    <Phone size={16} className="text-mv" /> {EMPRESA.whatsappExibicao}
                  </a>
                  <p className="flex items-center gap-3">
                    <Clock3 size={16} className="text-mv" /> {EMPRESA.horario}
                  </p>
                </div>
              </div>
              <CTAButton href={MAPS_OPEN_URL} target="_blank" rel="noreferrer" className="w-full">
                Abrir no Google Maps
              </CTAButton>
            </div>
          </div>
        </section>

        {/* CONTATO — o formulário monta a mensagem e abre o WhatsApp */}
        <section id="contato" className="border-t border-borda bg-areia py-24 lg:py-32">
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-mv-escuro">
                <span className="h-px w-8 bg-mv" /> Vamos tirar seu projeto do papel
              </p>
              <h2 className="max-w-2xl text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
                Peça seu orçamento agora pelo WhatsApp.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-concreto">
                Preencha os campos e a conversa abre já com tudo preenchido — você só aperta enviar.
                Respondemos de segunda a sexta, das 07h às 18h.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-concreto">
                {[
                  "Resposta direto no WhatsApp, sem esperar e-mail",
                  "Visita técnica para avaliar o local e o volume",
                  "Proposta com escopo, prazo e equipamentos definidos",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="mt-0.5 shrink-0 text-mv" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton
                  href={waLink(
                    "Olá! Gostaria de solicitar um orçamento ao Grupo MV Construtora e saber mais sobre os serviços.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Chamar direto no WhatsApp
                </CTAButton>
                <a
                  href={telLink}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-grafite px-8 py-4 text-[13px] font-semibold uppercase leading-none tracking-[0.12em] text-grafite transition-colors hover:border-chumbo hover:bg-chumbo hover:text-white"
                >
                  <Phone size={18} /> {EMPRESA.whatsappExibicao}
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5 border border-borda bg-white p-6 text-grafite sm:p-8"
            >
              <div>
                <label htmlFor="nome" className={rotuloForm}>
                  Nome <span className="text-mv">*</span>
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  {...register("nome")}
                  aria-invalid={!!errors.nome}
                  className={campoForm(!!errors.nome)}
                  placeholder="Como podemos te chamar"
                />
                {errors.nome && (
                  <p role="alert" className={erroForm}>
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="servico" className={rotuloForm}>
                    Serviço
                  </label>
                  <select
                    id="servico"
                    {...register("servico")}
                    className={campoForm(false)}
                    defaultValue=""
                  >
                    <option value="">Não sei ainda / outro</option>
                    {SERVICOS.map((servico) => (
                      <option key={servico.slug} value={servico.nome}>
                        {servico.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cidade" className={rotuloForm}>
                    Cidade da obra
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    {...register("cidade")}
                    className={campoForm(false)}
                    placeholder="Ex.: Santa Inês - MA"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className={rotuloForm}>
                  O que você precisa <span className="text-mv">*</span>
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  {...register("mensagem")}
                  aria-invalid={!!errors.mensagem}
                  className={`${campoForm(!!errors.mensagem)} resize-none`}
                  placeholder="Conte sobre a obra: tamanho da área, prazo, máquinas ou serviços necessários."
                />
                {errors.mensagem && (
                  <p role="alert" className={erroForm}>
                    {errors.mensagem.message}
                  </p>
                )}
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer font-semibold text-concreto hover:text-grafite">
                  Prefere que a gente retorne por telefone ou e-mail?
                </summary>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="telefone" className={rotuloForm}>
                      Telefone
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      autoComplete="tel"
                      {...register("telefone")}
                      aria-invalid={!!errors.telefone}
                      className={campoForm(!!errors.telefone)}
                      placeholder="(98) 90000-0000"
                    />
                    {errors.telefone && (
                      <p role="alert" className={erroForm}>
                        {errors.telefone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className={rotuloForm}>
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      className={campoForm(!!errors.email)}
                      placeholder="voce@empresa.com.br"
                    />
                    {errors.email && (
                      <p role="alert" className={erroForm}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </details>

              <CTAButton type="submit" disabled={isSubmitting} className="w-full">
                <MessageCircle size={18} /> Abrir conversa no WhatsApp
              </CTAButton>

              <div role="status" aria-live="polite">
                {sent && (
                  <p className="text-center text-sm font-semibold text-green-700">
                    Conversa aberta no WhatsApp. Se a janela não abrir, verifique o bloqueador de
                    pop-ups ou use o botão ao lado.
                  </p>
                )}
              </div>

              <p className="text-center text-[11px] leading-5 text-concreto">
                Ao enviar, seus dados vão direto para o nosso WhatsApp — não passam por nenhum
                servidor nosso.{" "}
                <Link to="/politica-de-privacidade" className="underline hover:text-concreto">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
