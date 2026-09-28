// Obras realizadas — vitrine de trabalhos entregues.
//
// Critérios da revisão do cliente (set/2026):
// - cada card deixa claro o que a MV executou e em qual projeto;
// - uma obra = um card (não repetir etapas da mesma obra como obras diferentes);
// - foto de equipamento em operação, não de máquina estacionada (essas ficam na /frota).
//
// ⚠️ CONTEÚDO PROVISÓRIO. As entradas marcadas com `provisoria` ainda não são
// registros de uma obra específica da MV: ilustram o tipo de serviço com fotos
// de referência (src/assets/obras/, origem ao lado de cada import). Por isso
// declaram só o estado (Maranhão), sem cidade, cliente, ano ou volume.
//
// ANTES DE PUBLICAR: trocar por obras reais, com foto da obra, cidade e ano.
// Anunciar obra que a empresa não executou é risco jurídico e de reputação —
// e contraria a regra do projeto de nunca inventar dado.

import andamentodaobra from "@/assets/otimizadas/andamentodaobra.webp";
import fotodaobra from "@/assets/otimizadas/fotodaobra.webp";
import fotodaplacatigd from "@/assets/otimizadas/fotodaplacatigd.webp";
import placapedrafundamental from "@/assets/otimizadas/placapedrafundamental.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";
// Foto enviada pelo cliente — obra de recuperação da BR-316 em Pio XII (MA).
import recuperacaoBr316 from "@/assets/obras/recuperacao-br-316.webp";
// Foto enviada pelo cliente — escavadeiras da frota carregando caçambas em frente de corte.
import escavacaoCargaCacambas from "@/assets/obras/escavacao-carga-cacambas-mv.webp";
// Domínio público — https://commons.wikimedia.org/wiki/File:11.06.17_Disc_Harrow.JPG
import preparoSoloSoja from "@/assets/obras/preparo-solo-soja.webp";
// Imagens de referência enviadas na revisão do portfólio (set/2026). Não são
// registros de obras da MV — substituir por fotos próprias em operação.
import motoniveladoraRegularizacao from "@/assets/obras/motoniveladora-regularizacao.webp";
import umectacaoCaminhaoPipa from "@/assets/obras/umectacao-caminhao-pipa.webp";
import escavacaoCanalDrenagem from "@/assets/obras/escavacao-canal-drenagem.webp";
import transportePranchaEscavadeira from "@/assets/obras/transporte-prancha-escavadeira.webp";

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
  /**
   * Texto corrido da seção "Sobre a obra". Explica o tipo de serviço de forma
   * geral — não afirma cliente, volume, prazo ou data que não foram confirmados.
   */
  descricao?: string[];
  /** Etapas típicas de execução do serviço: [título, explicação]. */
  etapas?: [string, string][];
  /** Perguntas frequentes da página, também publicadas como FAQPage no JSON-LD. */
  faqs?: [string, string][];
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
  "Apoio operacional",
  "Propriedades rurais",
] as const;

export type ObraCategoria = Exclude<(typeof CATEGORIAS_OBRA)[number], "Todas">;

/** "Infraestrutura viária" -> "infraestrutura-viaria", para usar no endereço (?categoria=). */
export const slugCategoria = (categoria: string) =>
  categoria.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, "-");

export const categoriaDoSlug = (slug?: string) =>
  CATEGORIAS_OBRA.find((categoria) => slugCategoria(categoria) === slug);

/** Quantas obras cada filtro mostra. Filtro sem obra fica fora da interface. */
export const contarObras = (categoria: (typeof CATEGORIAS_OBRA)[number]) =>
  categoria === "Todas"
    ? OBRAS.length
    : OBRAS.filter((obra) => obra.categoria === categoria).length;

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
    titulo: "Terraplanagem do Terminal Intermodal Gonçalves Dias",
    local: "Caxias — MA",
    categoria: "Terraplenagem",
    imagem: fotodaplacatigd,
    alt: "Placa da obra do Terminal Intermodal Gonçalves Dias, em Caxias (MA)",
    resumo:
      "Terraplanagem na implantação do Terminal Intermodal Gonçalves Dias, em Caxias (MA). A galeria reúne a placa da obra e o registro do lançamento da pedra fundamental.",
    // PENDENTE: confirmar com o cliente o escopo contratado e trocar a foto
    // principal por registros das etapas da terraplanagem em operação
    // (a placa deve continuar só na galeria).
    imagens: [fotodaplacatigd, placapedrafundamental],
    descricao: [
      "Um terminal intermodal concentra a transferência de cargas entre modais de transporte — rodovia, ferrovia e pátios de armazenagem — e depende de uma base de terraplenagem bem executada: pátios extensos, plataformas niveladas e acessos que suportam tráfego pesado o dia inteiro.",
      "Em empreendimentos desse porte, a terraplenagem começa pela limpeza e pela remoção da camada vegetal, segue com cortes e aterros para chegar às cotas do projeto e termina com a compactação em camadas, que garante a capacidade de suporte das áreas de pátio e circulação.",
      "Para esse tipo de obra, o Grupo MV Construtora mobiliza frota própria de escavadeiras, caminhões caçamba, motoniveladoras, rolos compactadores e caminhões-pipa, com equipe de campo dedicada para manter o ritmo da obra e o controle de cada etapa.",
    ],
    etapas: [
      [
        "Limpeza e raspagem",
        "Retirada da vegetação e da camada orgânica do terreno, que não serve como base de apoio.",
      ],
      [
        "Cortes e aterros",
        "Movimentação do solo até as cotas do projeto, aproveitando o material de corte nos aterros sempre que possível.",
      ],
      [
        "Compactação em camadas",
        "Espalhamento, umectação e compactação de cada camada até atingir a densidade especificada.",
      ],
      [
        "Acabamento da plataforma",
        "Regularização final com motoniveladora e conformação do caimento para o escoamento da água.",
      ],
    ],
    faqs: [
      [
        "Por que a terraplenagem é decisiva em um terminal intermodal?",
        "Porque pátios e vias internas recebem cargas pesadas e tráfego constante de caminhões. Uma base mal compactada gera recalques, poças e manutenção frequente, o que atrapalha a operação do terminal.",
      ],
      [
        "Quais máquinas são usadas nesse tipo de obra?",
        "Escavadeiras hidráulicas, caminhões caçamba, motoniveladoras, rolos compactadores e caminhões-pipa, dimensionados de acordo com o volume de terra e o prazo da obra.",
      ],
      [
        "O Grupo MV Construtora atende obras de grande porte?",
        "Sim. Com base em Pindaré-Mirim (MA), a empresa mobiliza equipamentos e equipes para obras no Maranhão, Pará, Piauí e Ceará.",
      ],
    ],
    servicos: ["terraplanagem"],
  },
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
    descricao: [
      "A BR-316 é um dos principais eixos rodoviários do Maranhão e liga as regiões Norte e Nordeste do país. Em trechos sobre áreas baixas e alagadiças, o aterro que sustenta a pista sofre com a ação da água e pode perder estabilidade com o tempo.",
      "A obra de recuperação, conduzida pelo DNIT no povoado Arataui, em Pio XII, prevê a contenção do aterro da plataforma com muros de gabião e a aplicação de geotêxtil para estabilizar o maciço de terra.",
      "Nesse tipo de intervenção, a terraplenagem é a etapa que recompõe e conforma o aterro, preparando a base para as estruturas de contenção e para a pista. É um trabalho que exige controle de material, de umidade e de compactação para que o aterro volte a ter a resistência necessária.",
    ],
    etapas: [
      ["Remoção do material instável", "Retirada do solo saturado ou erodido das saias do aterro."],
      [
        "Recomposição do aterro",
        "Lançamento de solo selecionado em camadas, na geometria definida no projeto.",
      ],
      [
        "Compactação",
        "Umectação e compactação de cada camada para devolver a capacidade de suporte ao aterro.",
      ],
      [
        "Conformação dos taludes",
        "Acabamento das saias do aterro para receber a contenção e a proteção contra erosão.",
      ],
    ],
    faqs: [
      [
        "Por que aterros de rodovia precisam de recuperação?",
        "Chuva, cheias e drenagem deficiente carregam o solo das saias do aterro. Sem correção, a erosão avança até a pista e compromete a segurança do tráfego.",
      ],
      [
        "O que é contenção em gabião?",
        "São gaiolas de tela metálica preenchidas com pedras, que formam muros permeáveis: seguram o aterro e deixam a água passar, o que reduz a pressão sobre a estrutura.",
      ],
      [
        "A MV executa terraplenagem em obras rodoviárias?",
        "Sim. A empresa atua em terraplenagem para obras viárias e de infraestrutura no Maranhão, Pará, Piauí e Ceará, com frota própria de máquinas pesadas.",
      ],
    ],
    servicos: ["terraplanagem"],
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
    descricao: [
      "A conformação de plataforma transforma um terreno irregular em uma área plana e estável, pronta para receber edificações, galpões, pátios ou loteamentos. É a base de tudo o que vem depois: se a plataforma fica mal executada, os problemas aparecem na estrutura e no piso.",
      "O serviço combina cortes nas partes altas do terreno e aterros nas partes baixas, sempre buscando equilibrar os volumes para reduzir o transporte de material. O aterro é lançado e compactado em camadas, e a superfície final recebe o caimento que leva a água da chuva para longe da área.",
      "Esta obra fica no Vale do Pindaré, região onde está a base do Grupo MV Construtora, o que permite mobilizar equipamentos próprios e equipe da casa com rapidez.",
    ],
    etapas: [
      ["Marcação topográfica", "Definição das cotas e dos limites da plataforma no terreno."],
      ["Corte", "Escavação das partes altas com escavadeiras e carregamento do material."],
      ["Aterro compactado", "Lançamento do material nas partes baixas e compactação em camadas."],
      ["Regularização", "Acabamento com motoniveladora e caimento para drenagem superficial."],
    ],
    faqs: [
      [
        "O que é conformação de plataforma?",
        "É o conjunto de cortes, aterros e acabamento que deixa o terreno plano, compactado e na cota certa para receber a obra.",
      ],
      [
        "Quanto tempo leva uma obra de movimentação de terra?",
        "Depende do volume de terra, do tipo de solo, da distância de transporte e das chuvas. O cronograma é definido depois da visita técnica e entra no orçamento.",
      ],
      [
        "Preciso de projeto para fazer a terraplenagem?",
        "Em obras maiores, sim — o projeto define cotas e volumes. Em áreas menores, a equipe pode orientar o serviço a partir de um levantamento topográfico do terreno.",
      ],
    ],
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
    // PENDENTE: confirmar o escopo executado e se é etapa de outra obra já listada.
    imagens: [andamentodaobra],
    servicos: ["terraplanagem", "apoio-a-grandes-obras"],
    descricao: [
      "Obra de terraplenagem bem conduzida depende de acompanhamento diário: frentes de serviço organizadas, máquinas no lugar certo e controle do que foi executado em cada dia.",
      "Durante a execução, a equipe do Grupo MV Construtora acompanha a produção das escavadeiras e dos caminhões, o avanço dos cortes e aterros e as condições do terreno, ajustando o plano de trabalho conforme o clima e o ritmo da obra.",
      "Esse acompanhamento reduz retrabalho, evita máquina parada e dá ao contratante uma visão clara do andamento, da medição e dos próximos passos.",
    ],
    etapas: [
      [
        "Planejamento das frentes",
        "Distribuição de máquinas e equipes conforme as prioridades da obra.",
      ],
      ["Controle diário", "Registro da produção, das horas de máquina e das condições do terreno."],
      [
        "Ajustes de campo",
        "Correção do plano de trabalho diante de chuva, solo ou mudanças de projeto.",
      ],
      ["Medição e entrega", "Conferência do que foi executado e liberação das áreas concluídas."],
    ],
    faqs: [
      [
        "Por que o acompanhamento diário é importante?",
        "Porque a terraplenagem muda de um dia para o outro com o clima e o tipo de solo. Acompanhar de perto evita retrabalho e mantém o cronograma.",
      ],
      [
        "A MV dá suporte a obras de outras construtoras?",
        "Sim. Além de executar obras próprias, a empresa atua em apoio a grandes obras, com máquinas, operadores e equipe de campo.",
      ],
      [
        "Como funciona a medição do serviço?",
        "A medição segue o que foi combinado em contrato — por volume, por área ou por hora de máquina — e é conferida com o contratante em cada etapa.",
      ],
    ],
  },
  {
    slug: "escavacao-carga-e-transporte-de-material",
    titulo: "Escavação, carga e transporte de material",
    local: "Maranhão",
    resumo:
      "Escavação com escavadeiras hidráulicas e carregamento direto em caminhões caçamba para transporte do material até a área de aterro ou bota-fora.",
    categoria: "Terraplenagem",
    imagem: escavacaoCargaCacambas,
    alt: "Escavadeiras do Grupo MV Construtora carregando caminhões caçamba em frente de corte de terraplanagem",
    escopo: [
      "Escavação e corte do terreno com escavadeiras hidráulicas.",
      "Carregamento dos caminhões caçamba na frente de serviço.",
      "Transporte do material até a área de aterro ou bota-fora.",
    ],
    // PENDENTE: confirmar em qual obra a foto foi tirada (cidade e ano).
    imagens: [escavacaoCargaCacambas],
    descricao: [
      "Escavação, carga e transporte formam o ciclo básico de qualquer obra de terraplenagem. As escavadeiras abrem a frente de corte e carregam os caminhões caçamba, que levam o material para as áreas de aterro ou para o bota-fora.",
      "A produtividade depende do equilíbrio entre as máquinas: escavadeiras e caminhões dimensionados para que nenhum fique parado esperando o outro. Por isso a frente de serviço é planejada considerando o tipo de solo, a distância de transporte e as condições dos acessos.",
      "O Grupo MV Construtora opera com frota própria de escavadeiras hidráulicas e caminhões caçamba, o que dá agilidade para montar frentes de trabalho simultâneas em obras de maior volume.",
    ],
    etapas: [
      [
        "Planejamento da frente",
        "Definição dos pontos de corte, dos acessos e do trajeto dos caminhões.",
      ],
      [
        "Escavação",
        "Corte do terreno com escavadeiras hidráulicas, respeitando as cotas do projeto.",
      ],
      ["Carga", "Carregamento dos caminhões caçamba direto na frente de serviço."],
      [
        "Transporte e descarga",
        "Destinação do material para aterro, estoque ou bota-fora licenciado.",
      ],
    ],
    faqs: [
      [
        "Qual a diferença entre bota-fora e área de empréstimo?",
        "Bota-fora é o local que recebe o material que sobra da escavação. Área de empréstimo é de onde se retira material quando falta solo para o aterro.",
      ],
      [
        "Quantos caminhões são necessários por escavadeira?",
        "Depende da distância de transporte e da capacidade das máquinas. O dimensionamento é feito para que a escavadeira não fique esperando caminhão, nem o caminhão esperando carga.",
      ],
      [
        "É possível locar escavadeira e caminhão caçamba?",
        "Sim. A frota do Grupo MV Construtora também está disponível para locação. Fale com a equipe para verificar a disponibilidade.",
      ],
    ],
    servicos: ["terraplanagem"],
  },
  {
    slug: "abertura-e-regularizacao-de-estradas",
    titulo: "Abertura e regularização de estradas e vias de acesso",
    local: "Maranhão",
    resumo:
      "Abertura de estradas em terra e regularização do leito com motoniveladora, deixando a via nivelada e com caimento para escoar a água.",
    categoria: "Infraestrutura viária",
    imagem: motoniveladoraRegularizacao,
    alt: "Motoniveladora com a lâmina no solo regularizando estrada de terra",
    escopo: [
      "Abertura e alargamento do leito da estrada.",
      "Regularização com motoniveladora.",
      "Conformação do abaulamento para escoamento da água.",
    ],
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [motoniveladoraRegularizacao],
    descricao: [
      "Estradas de terra são o acesso de comunidades, fazendas e frentes de obra em boa parte do interior do Maranhão. Quando o leito fica irregular, com buracos e trilhas de roda, a água da chuva se acumula e a estrada se deteriora rapidamente.",
      "A regularização com motoniveladora devolve o perfil correto ao leito: a lâmina corta as irregularidades, redistribui o material e forma o abaulamento, a leve curvatura que faz a água escorrer para as laterais em vez de ficar parada na pista.",
      "Na abertura de novas vias, o serviço inclui a limpeza da faixa, o corte e o aterro necessários para definir o traçado e a compactação do leito, deixando a estrada pronta para o tráfego.",
    ],
    etapas: [
      ["Limpeza da faixa", "Remoção da vegetação e do material solto ao longo do traçado."],
      ["Abertura e alargamento", "Corte e aterro para definir a largura e o traçado da via."],
      [
        "Regularização",
        "Passagem da motoniveladora para corrigir o perfil e formar o abaulamento.",
      ],
      [
        "Compactação e saídas d'água",
        "Compactação do leito e abertura de saídas laterais para a água.",
      ],
    ],
    faqs: [
      [
        "Por que a estrada de terra estraga tanto na chuva?",
        "Porque, sem abaulamento e sem saídas laterais, a água fica sobre a pista, amolece o solo e abre buracos com a passagem dos veículos.",
      ],
      [
        "Com que frequência a estrada precisa ser regularizada?",
        "Depende do tráfego e do regime de chuvas. Em geral, recomenda-se uma manutenção antes e outra depois do período chuvoso.",
      ],
      [
        "Vocês atendem fazendas e loteamentos?",
        "Sim. O serviço atende propriedades rurais, loteamentos, empresas e obras públicas.",
      ],
    ],
    servicos: ["infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "compactacao-de-solo-e-preparacao-de-base",
    titulo: "Compactação de solo e preparação de base",
    local: "Maranhão",
    resumo:
      "Compactação das camadas de solo com rolo compactador, preparando a base para receber o revestimento ou a próxima etapa da obra.",
    categoria: "Infraestrutura viária",
    imagem: rolocompactador,
    alt: "Rolo compactador do Grupo MV Construtora em canteiro de obra",
    escopo: [
      "Compactação do subleito e das camadas de base.",
      "Preparação da superfície para a etapa seguinte da obra.",
    ],
    // PENDENTE: trocar por foto do rolo em operação numa pista, de preferência com a
    // motoniveladora ao fundo.
    imagens: [rolocompactador],
    descricao: [
      "A compactação é o que dá resistência ao solo. Um aterro ou uma base de estrada só suporta cargas pesadas se cada camada for compactada na umidade certa e com o equipamento adequado.",
      "O processo é feito em camadas de pouca espessura: o material é espalhado, umedecido pelo caminhão-pipa e compactado pelo rolo até atingir a densidade exigida. Solos argilosos costumam pedir rolo pé de carneiro; materiais granulares e o acabamento final, rolo liso.",
      "Uma base bem preparada evita afundamentos, trincas e buracos, e prolonga a vida útil de pátios, estradas e pavimentos.",
    ],
    etapas: [
      ["Espalhamento", "Distribuição do material em camadas de espessura uniforme."],
      ["Umectação", "Correção da umidade do solo com caminhão-pipa antes de compactar."],
      ["Compactação", "Passadas do rolo compactador até atingir a densidade especificada."],
      ["Controle e acabamento", "Conferência da camada e regularização da superfície final."],
    ],
    faqs: [
      [
        "Por que compactar em camadas?",
        "Porque o rolo só consegue adensar bem uma espessura limitada de solo. Camadas muito grossas ficam compactadas em cima e fofas embaixo.",
      ],
      [
        "Qual rolo compactador usar?",
        "O rolo pé de carneiro é mais indicado para solos argilosos. O rolo liso vibratório funciona melhor em materiais granulares e no acabamento da camada.",
      ],
      [
        "O que acontece se a base não for bem compactada?",
        "Aparecem recalques, trincas e buracos, principalmente depois das chuvas, e a correção costuma custar mais do que fazer o serviço certo desde o início.",
      ],
    ],
    servicos: ["infraestrutura-viaria", "terraplanagem"],
    provisoria: true,
  },
  {
    slug: "escavacao-e-drenagem",
    titulo: "Escavação de canais e drenagem",
    local: "Maranhão",
    resumo:
      "Escavação de canais e valas com escavadeira hidráulica para conduzir a água e proteger a obra, a lavoura e as estradas de acesso.",
    categoria: "Terraplenagem",
    imagem: escavacaoCanalDrenagem,
    alt: "Escavadeira hidráulica escavando canal de drenagem com água",
    escopo: [
      "Escavação de canais e valas de drenagem.",
      "Conformação dos taludes do canal.",
      "Destinação do material escavado.",
    ],
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [escavacaoCanalDrenagem],
    descricao: [
      "Água sem destino é uma das principais causas de problemas em obras, estradas e lavouras. Canais e valas de drenagem conduzem o excesso de água para fora das áreas de trabalho, evitando alagamentos, erosão e perda de base.",
      "A escavação é feita com escavadeira hidráulica, respeitando a declividade necessária para a água correr e a inclinação dos taludes para que as paredes do canal não desmoronem. O material retirado pode ser aproveitado em aterros próximos ou levado para bota-fora.",
      "Em regiões de chuvas concentradas como o Maranhão, uma drenagem bem feita é o que mantém a obra trabalhando e as estradas transitáveis no inverno.",
    ],
    etapas: [
      [
        "Marcação e declividade",
        "Definição do traçado do canal e do caimento necessário para o escoamento.",
      ],
      ["Escavação", "Abertura do canal ou da vala com escavadeira hidráulica."],
      [
        "Conformação dos taludes",
        "Acabamento das paredes com a inclinação que garante a estabilidade.",
      ],
      [
        "Destinação do material",
        "Aproveitamento do solo escavado em aterros ou transporte para bota-fora.",
      ],
    ],
    faqs: [
      [
        "Quando é preciso abrir canais de drenagem?",
        "Sempre que a água da chuva se acumula na área, invade estradas ou lavouras, ou ameaça a estabilidade de aterros e fundações.",
      ],
      [
        "Qual a diferença entre vala e canal?",
        "A vala costuma ser mais estreita e rasa, usada para conduzir a água até um ponto de saída. O canal tem seção maior e transporta volumes de água mais altos.",
      ],
      [
        "A drenagem pode ser feita junto com a terraplenagem?",
        "Sim, e é o ideal. Planejar a drenagem junto com cortes e aterros evita retrabalho e protege a obra desde o início.",
      ],
    ],
    servicos: ["drenagem", "terraplanagem"],
    provisoria: true,
  },
  {
    slug: "umectacao-de-solo-e-apoio-a-terraplanagem",
    titulo: "Umectação de solo e apoio à terraplanagem",
    local: "Maranhão",
    resumo:
      "Caminhão-pipa com barra espargidora umedecendo as camadas de solo para atingir a umidade certa na compactação e controlar a poeira na frente de obra.",
    categoria: "Apoio operacional",
    imagem: umectacaoCaminhaoPipa,
    alt: "Caminhão-pipa umedecendo a base de estrada em obra, com motoniveladora ao fundo",
    escopo: [
      "Umectação das camadas para controle de umidade na compactação.",
      "Controle de poeira nas frentes de serviço e acessos.",
    ],
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [umectacaoCaminhaoPipa],
    descricao: [
      "O solo só atinge a compactação ideal quando está com a umidade certa. Seco demais, ele não adensa; molhado demais, vira lama. O caminhão-pipa é o equipamento que corrige essa umidade antes da passagem do rolo compactador.",
      "Com a barra espargidora, a água é distribuída de forma uniforme sobre a camada, na quantidade necessária para cada tipo de solo. O mesmo equipamento também faz o controle de poeira nas frentes de serviço e nos acessos da obra.",
      "É um serviço de apoio, mas indispensável: sem umectação, a compactação perde qualidade e a obra levanta poeira que afeta equipes, máquinas e vizinhança.",
    ],
    etapas: [
      ["Abastecimento", "Carregamento do caminhão-pipa em ponto de captação autorizado."],
      [
        "Aplicação na camada",
        "Distribuição uniforme da água com barra espargidora antes da compactação.",
      ],
      ["Controle de umidade", "Ajuste da quantidade de água conforme o tipo de solo e o clima."],
      ["Controle de poeira", "Umectação periódica dos acessos e das frentes de serviço."],
    ],
    faqs: [
      [
        "Por que molhar o solo antes de compactar?",
        "Porque a água ajuda os grãos do solo a se acomodarem. Na umidade certa, o rolo consegue a maior densidade possível com menos passadas.",
      ],
      [
        "O caminhão-pipa também serve para controle de poeira?",
        "Sim. A umectação dos acessos reduz a poeira levantada pelo tráfego de máquinas, melhorando a visibilidade e as condições de trabalho.",
      ],
      [
        "É possível locar o caminhão-pipa?",
        "Sim. O caminhão-pipa faz parte da frota disponível para locação. Fale com a equipe para verificar a disponibilidade.",
      ],
    ],
    servicos: ["terraplanagem", "infraestrutura-viaria"],
    provisoria: true,
  },
  {
    slug: "transporte-de-equipamentos",
    titulo: "Transporte de equipamentos",
    local: "Maranhão",
    resumo:
      "Mobilização de máquinas pesadas com caminhão-prancha, levando escavadeiras e demais equipamentos até a frente de obra com segurança.",
    categoria: "Apoio operacional",
    imagem: transportePranchaEscavadeira,
    alt: "Escavadeira hidráulica embarcada em caminhão-prancha para transporte",
    escopo: [
      "Embarque e amarração do equipamento na prancha.",
      "Transporte até a frente de obra.",
      "Desembarque e posicionamento no canteiro.",
    ],
    // PENDENTE: trocar por foto e dados de uma obra real desse serviço quando o cliente enviar.
    imagens: [transportePranchaEscavadeira],
    descricao: [
      "Máquinas pesadas não chegam sozinhas à obra. Escavadeiras, tratores e rolos compactadores são levados em caminhão-prancha, uma carreta rebaixada preparada para cargas de grande peso e dimensão.",
      "O transporte começa antes do embarque: é preciso avaliar a rota, as pontes, a altura de fiações e as condições dos acessos. Cargas acima das dimensões padrão exigem autorização especial de trânsito e sinalização adequada.",
      "Com prancha própria, o Grupo MV Construtora mobiliza os equipamentos com agilidade entre uma obra e outra e também presta o serviço de transporte para terceiros.",
    ],
    etapas: [
      ["Planejamento da rota", "Avaliação do trajeto, dos acessos e das autorizações necessárias."],
      ["Embarque", "Subida do equipamento pelas rampas da prancha, com orientação em solo."],
      ["Amarração", "Fixação da máquina com correntes e travas para o transporte seguro."],
      ["Desembarque", "Descida e posicionamento do equipamento no canteiro de obra."],
    ],
    faqs: [
      [
        "Que tipo de máquina pode ser transportada na prancha?",
        "Escavadeiras, pás carregadeiras, motoniveladoras, tratores, rolos compactadores e outros equipamentos pesados, respeitando os limites de peso e dimensão da carreta.",
      ],
      [
        "Precisa de autorização para transportar máquina pesada?",
        "Quando a carga ultrapassa as dimensões ou o peso permitidos, é necessária autorização especial de trânsito, além de sinalização e, em alguns casos, escolta.",
      ],
      [
        "Vocês fazem transporte de máquinas de terceiros?",
        "Sim. O serviço de transporte de máquinas e equipamentos também atende outras empresas e produtores rurais.",
      ],
    ],
    servicos: ["transporte-de-maquinas"],
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
    descricao: [
      "O Maranhão está entre as fronteiras agrícolas que mais crescem no país, com a soja e o milho ocupando áreas cada vez maiores. Antes do plantio, porém, a terra precisa estar limpa, nivelada e com acesso para as máquinas.",
      "Em áreas novas, o trabalho começa com a limpeza e a destoca, que retiram a vegetação e as raízes que atrapalham a mecanização. Depois vêm a gradagem, que revolve e destorroa o solo, e o nivelamento, que evita pontos de acúmulo de água na lavoura.",
      "As estradas internas completam o serviço: sem elas, a entrada de plantadeiras e a saída da safra ficam comprometidas, principalmente no período de chuvas.",
    ],
    etapas: [
      ["Limpeza e destoca", "Retirada da vegetação, dos tocos e das raízes da área de plantio."],
      ["Gradagem", "Revolvimento e destorroamento do solo com grade pesada."],
      ["Nivelamento", "Correção de desníveis e de pontos de acúmulo de água."],
      [
        "Estradas internas",
        "Abertura e recuperação dos acessos para máquinas e escoamento da safra.",
      ],
    ],
    faqs: [
      [
        "Quando começar o preparo do solo para a safra?",
        "O ideal é concluir limpeza, gradagem e nivelamento antes do início das chuvas, para que o plantio aconteça na janela certa.",
      ],
      [
        "O que é destoca?",
        "É a retirada dos tocos e raízes que sobram depois da limpeza da vegetação. Sem ela, as máquinas agrícolas não conseguem trabalhar na área.",
      ],
      [
        "A mesma área pode receber soja e milho?",
        "Sim. É comum plantar soja na safra e milho na segunda safra, a safrinha, aproveitando o mesmo preparo de solo e as mesmas estradas internas.",
      ],
    ],
    servicos: ["servicos-rurais", "limpeza-de-areas"],
    provisoria: true,
  },
];

/** Filtros exibidos nas vitrines: só as categorias que têm pelo menos uma obra. */
export const CATEGORIAS_VISIVEIS = CATEGORIAS_OBRA.filter(
  (categoria) => contarObras(categoria) > 0,
);
