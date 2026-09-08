// Fonte única das categorias de serviço da MV Construtora.
// Usada pela home, pelo JSON-LD (src/lib/schema.ts) e, futuramente, pelas
// páginas individuais de serviço. Alterar aqui reflete em todos os lugares.
//
// Conteúdo fornecido pelo cliente em 02/09/2026.

import {
  ArrowUpFromLine,
  Building2,
  Droplets,
  Factory,
  HardHat,
  Layers,
  Mountain,
  Sprout,
  Trees,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Servico = {
  slug: string;
  nome: string;
  /** Título da futura página dedicada (task 08). */
  h1: string;
  /** Texto curto usado no card da home. */
  resumo: string;
  /** Descrição completa, usada no JSON-LD e na abertura da página. */
  descricao: string;
  itens: string[];
  icon: LucideIcon;
  /**
   * Abertura da página do serviço. São as 2-3 primeiras frases — o trecho que
   * os sistemas de IA mais citam. Precisa ser específico deste serviço:
   * texto igual entre páginas gera canibalização e nenhuma ranqueia bem.
   */
  intro: string;
  /** Contexto local que explica decisões de obra sem repetir o texto de outros serviços. */
  contexto: string;
  /** Situações que costumam aumentar o custo quando não entram no planejamento. */
  erros: string[];
  /** Etapas específicas da contratação deste serviço. */
  etapas: [string, string][];
  /** Perguntas específicas deste serviço. Alimentam o FAQPage da página. */
  faqs: [string, string][];
};

const SERVICOS_BASE: Omit<Servico, "contexto" | "erros" | "etapas">[] = [
  {
    slug: "terraplanagem",
    nome: "Terraplenagem",
    h1: "Terraplenagem no Maranhão",
    resumo:
      "Escavação, corte e aterro, nivelamento, compactação de solo e pavimentação com precisão técnica.",
    descricao:
      "Escavação, corte e aterro, nivelamento, compactação de solo, regularização de terrenos, movimentação de terra, conformação de plataformas, pavimentação e preparação de áreas para construção.",
    itens: [
      "Escavação",
      "Corte e aterro",
      "Nivelamento",
      "Compactação de solo",
      "Regularização de terrenos",
      "Movimentação de terra",
      "Conformação de plataformas",
      "Pavimentação",
      "Preparação de áreas para construção",
    ],
    intro:
      "Terraplenagem é o conjunto de serviços que transforma um terreno bruto em uma base pronta para construir: escavação, corte e aterro, nivelamento e compactação do solo. A MV Construtora executa esse trabalho no Maranhão desde 2011, com frota própria de escavadeiras, motoniveladoras e rolos compactadores. Atendemos desde o preparo de lotes urbanos até plataformas industriais e grandes movimentações de terra.",
    faqs: [
      [
        "Quanto custa a terraplenagem por hora no Maranhão?",
        "O valor não é fechado por tabela: depende do tipo de solo, do volume de terra em metros cúbicos, da distância de mobilização das máquinas, do prazo e da época do ano. Solo rochoso e período chuvoso encarecem a operação. Fazemos a visita técnica e enviamos o orçamento com o escopo detalhado.",
      ],
      [
        "Qual a diferença entre corte e aterro?",
        "Corte é a retirada de material das partes altas do terreno; aterro é o preenchimento das partes baixas com esse mesmo material ou com material importado. O ideal é equilibrar os dois no mesmo terreno para reduzir transporte e custo — é o que chamamos de compensação de volumes.",
      ],
      [
        "Preciso de licença ambiental para fazer terraplenagem?",
        "Depende do porte e do local da obra. Movimentações de terra maiores, supressão de vegetação ou intervenção em área de preservação costumam exigir licenciamento junto ao órgão ambiental do município ou do estado. Orientamos sobre a documentação necessária antes de mobilizar as máquinas.",
      ],
    ],
    icon: Mountain,
  },
  {
    slug: "infraestrutura-viaria",
    nome: "Infraestrutura viária",
    h1: "Estradas Vicinais e Infraestrutura Viária no Maranhão",
    resumo:
      "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento e compactação.",
    descricao:
      "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento, compactação, abertura de acessos e preparação de subleito, base e sub-base.",
    itens: [
      "Abertura de estradas vicinais",
      "Recuperação de estradas vicinais",
      "Patrolamento",
      "Cascalhamento",
      "Compactação",
      "Abertura de acessos",
      "Preparação de subleito",
      "Base e sub-base",
    ],
    intro:
      "Infraestrutura viária é a abertura, a recuperação e a manutenção de estradas — no Maranhão, principalmente estradas vicinais que ligam povoados, áreas produtivas e rodovias estaduais. O trabalho envolve patrolamento, cascalhamento, compactação e preparo de subleito, base e sub-base. A MV Construtora atende prefeituras, produtores rurais e empreendimentos privados em todo o estado.",
    faqs: [
      [
        "O que é patrolamento?",
        "Patrolamento é a regularização da superfície da estrada com motoniveladora (patrol). A máquina corta as irregularidades, remove buracos e atoleiros e dá caimento à pista para a água escoar. É o serviço mais comum na manutenção de estradas vicinais.",
      ],
      [
        "O que é cascalhamento e quando ele é necessário?",
        "Cascalhamento é a aplicação de uma camada de cascalho ou material granular sobre a pista, seguida de compactação. É necessário quando o solo natural não suporta o tráfego — típico de trechos que viram atoleiro no período chuvoso do Maranhão.",
      ],
      [
        "Quanto tempo leva para recuperar 1 km de estrada vicinal?",
        "Varia com o estado da via, a largura da pista, a necessidade de cascalho e a distância da jazida. Um trecho que precise apenas de patrolamento avança rápido; um que exija cascalhamento e compactação leva mais tempo. A visita técnica define o cronograma.",
      ],
    ],
    icon: Layers,
  },
  {
    slug: "obras-civis",
    nome: "Obras civis",
    h1: "Obras Civis: Construção e Reforma no Maranhão",
    resumo:
      "Construção e reforma de edificações, galpões, fundações, pisos, pavimentações e muros.",
    descricao:
      "Construção e reforma de edificações, galpões, estruturas comerciais e industriais, fundações, pisos e pavimentações, muros, calçadas e serviços complementares.",
    itens: [
      "Construção e reforma de edificações",
      "Galpões",
      "Estruturas comerciais e industriais",
      "Fundações",
      "Pisos e pavimentações",
      "Muros e calçadas",
      "Serviços complementares",
    ],
    intro:
      "Obras civis reúnem a construção e a reforma de edificações, galpões e estruturas comerciais e industriais, incluindo fundações, pisos, pavimentações, muros e calçadas. A MV Construtora começou justamente na construção civil, em 2011, antes de se especializar em terraplenagem e infraestrutura. Essa origem permite entregar a obra do movimento de terra à estrutura acabada, com um único responsável.",
    faqs: [
      [
        "A MV Construtora faz a obra do início ao fim?",
        "Sim. Como executamos terraplenagem, drenagem e obras civis, conseguimos assumir desde a preparação do terreno até a entrega da edificação, sem repassar etapas a terceiros — o que reduz o risco de atraso na transição entre fases.",
      ],
      [
        "Vocês constroem galpões industriais?",
        "Sim. Executamos galpões e estruturas comerciais e industriais, incluindo a fundação, o piso industrial e as pavimentações de pátio e acesso.",
      ],
      [
        "A empresa também faz reformas?",
        "Sim. Além de obras novas, executamos reformas de edificações, incluindo serviços complementares como muros, calçadas e recuperação de pisos.",
      ],
    ],
    icon: Building2,
  },
  {
    slug: "drenagem",
    nome: "Drenagem e infraestrutura",
    h1: "Drenagem Pluvial e Infraestrutura no Maranhão",
    resumo:
      "Valas, drenagem pluvial, tubos e bueiros, canais e preparação para redes de água e esgoto.",
    descricao:
      "Execução de valas, drenagem pluvial, instalação de tubos e bueiros, canais, caixas de drenagem e preparação para redes de água e esgoto.",
    itens: [
      "Execução de valas",
      "Drenagem pluvial",
      "Instalação de tubos e bueiros",
      "Canais",
      "Caixas de drenagem",
      "Preparação para redes de água e esgoto",
    ],
    intro:
      "Drenagem é o que garante que a obra sobreviva ao período chuvoso. O serviço envolve a execução de valas, a instalação de tubos e bueiros, a construção de canais e caixas de drenagem e o preparo para redes de água e esgoto. No Maranhão, onde a estação chuvosa é intensa e concentrada, drenagem malfeita é a causa mais comum de estrada perdida e de terreno erodido.",
    faqs: [
      [
        "Por que a drenagem é tão importante em obras no Maranhão?",
        "Porque a estação chuvosa é intensa e concentrada. Sem drenagem adequada, a água satura o solo, desfaz a compactação, provoca erosão e destrói em uma temporada o que a terraplenagem levou meses para construir.",
      ],
      [
        "Qual a diferença entre bueiro e caixa de drenagem?",
        "O bueiro é a tubulação que atravessa a pista para levar a água de um lado ao outro. A caixa de drenagem é a estrutura que capta, acumula e direciona a água até a tubulação. Os dois normalmente trabalham juntos no mesmo sistema.",
      ],
      [
        "Vocês fazem a preparação para redes de água e esgoto?",
        "Sim. Executamos as valas e o berço para assentamento das redes, além do reaterro e da compactação após a instalação.",
      ],
    ],
    icon: Droplets,
  },
  {
    slug: "limpeza-de-areas",
    nome: "Preparação e limpeza de áreas",
    h1: "Limpeza e Preparação de Terrenos no Maranhão",
    resumo:
      "Limpeza mecanizada, destocamento, demolições e remoção de material com carga e transporte.",
    descricao:
      "Limpeza mecanizada de terrenos, destocamento, remoção de material, demolições, carga e transporte de resíduos e preparação de áreas para implantação de empreendimentos.",
    itens: [
      "Limpeza mecanizada de terrenos",
      "Destocamento",
      "Remoção de material",
      "Demolições",
      "Carga e transporte de resíduos",
      "Preparação de áreas para empreendimentos",
    ],
    intro:
      "Preparação e limpeza de áreas é a primeira etapa de qualquer empreendimento: retirar vegetação, tocos, entulho e construções existentes para liberar o terreno. Inclui limpeza mecanizada, destocamento, demolições e a carga e o transporte dos resíduos. A MV Construtora executa esse serviço com escavadeiras, pás carregadeiras e caminhões basculantes próprios.",
    faqs: [
      [
        "O que é destocamento?",
        "Destocamento é a remoção das raízes e dos tocos que ficam no solo após o corte da vegetação. É indispensável antes da terraplenagem: raiz enterrada apodrece, gera vazio no aterro e provoca recalque na estrutura construída acima.",
      ],
      [
        "Vocês fazem a retirada do material removido?",
        "Sim. Fazemos a carga e o transporte dos resíduos com caminhões basculantes até o destino definido, incluindo entulho de demolição e material vegetal.",
      ],
      [
        "A empresa executa demolições?",
        "Sim. Executamos demolições de estruturas com escavadeira, além da remoção e do transporte do entulho gerado.",
      ],
    ],
    icon: Trees,
  },
  {
    slug: "locacao-de-maquinas",
    nome: "Locação de máquinas e equipamentos",
    h1: "Locação de Máquinas Pesadas no Maranhão",
    resumo:
      "Escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhões, com ou sem operador.",
    descricao:
      "Escavadeiras hidráulicas, motoniveladoras (patrol), pás carregadeiras, rolos compactadores, caminhões-pipa, caminhões basculantes e demais equipamentos pesados, com ou sem operador, conforme a contratação.",
    itens: [
      "Escavadeiras hidráulicas",
      "Motoniveladoras (patrol)",
      "Pás carregadeiras",
      "Rolos compactadores",
      "Caminhões-pipa",
      "Caminhões basculantes e caçambas",
      "Com ou sem operador",
    ],
    intro:
      "A MV Construtora aluga máquinas pesadas com frota própria e revisada: escavadeiras hidráulicas, motoniveladoras (patrol), pás carregadeiras, rolos compactadores, caminhões-pipa e caminhões basculantes. A locação pode ser com ou sem operador, conforme a contratação. Como a frota é própria, a mobilização é mais rápida e a manutenção não depende de terceiros.",
    faqs: [
      [
        "A locação inclui operador?",
        "Pode incluir ou não — os dois formatos existem. Disponibilizamos operadores experientes e treinados, e também avaliamos locações sem operador, conforme o equipamento e as condições do contrato.",
      ],
      [
        "Locação com ou sem operador: o que compensa?",
        "Com operador costuma compensar para quem não tem equipe própria qualificada: o rendimento por hora é maior e o risco de dano ao equipamento e de acidente é menor. Sem operador faz sentido para construtoras que já mantêm operadores no quadro.",
      ],
      [
        "Qual o prazo mínimo de locação?",
        "Trabalhamos com diárias, semanas e contratos mensais, conforme a necessidade da obra. O prazo influencia diretamente o valor da hora e o custo de mobilização.",
      ],
    ],
    icon: HardHat,
  },
  {
    slug: "transporte-de-maquinas",
    nome: "Transporte de máquinas e equipamentos",
    h1: "Transporte de Máquinas Pesadas com Caminhão Prancha",
    resumo: "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas.",
    descricao:
      "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas e apoio logístico para obras.",
    itens: [
      "Transporte com caminhão prancha",
      "Mobilização de máquinas",
      "Desmobilização de máquinas",
      "Apoio logístico",
    ],
    intro:
      "Máquina pesada não se desloca sozinha até a obra: precisa de caminhão prancha, planejamento de rota e equipe para carga e descarga. A MV Construtora executa a mobilização e a desmobilização de equipamentos pesados no Maranhão, com prancha própria. O serviço atende tanto as nossas obras quanto empresas que precisam movimentar máquinas entre canteiros.",
    faqs: [
      [
        "Vocês transportam máquinas de terceiros?",
        "Sim. O transporte com caminhão prancha é oferecido também para empresas e produtores que precisam deslocar equipamentos próprios entre obras ou propriedades.",
      ],
      [
        "O que é mobilização e desmobilização?",
        "Mobilização é levar as máquinas, os equipamentos e a equipe até o canteiro no início da obra. Desmobilização é o retorno ao fim do serviço. Os dois entram no orçamento e variam com a distância.",
      ],
      [
        "A distância influencia muito no custo?",
        "Sim. O transporte de máquina pesada é um dos itens que mais pesa em obras distantes da base. Por isso a localização em Pindaré-Mirim é vantajosa para obras no Vale do Pindaré e na região central do estado.",
      ],
    ],
    icon: Truck,
  },
  {
    slug: "caminhao-munck",
    nome: "Serviços com caminhão Munck",
    h1: "Caminhão Munck no Maranhão: Içamento e Movimentação",
    resumo: "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais.",
    descricao:
      "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais com caminhão Munck.",
    itens: [
      "Içamento",
      "Movimentação de cargas",
      "Carga e descarga",
      "Transporte de equipamentos e materiais",
    ],
    intro:
      "O caminhão Munck é o equipamento certo quando a carga é pesada demais para movimentação manual e a obra não comporta um guindaste. Executamos içamento, movimentação, carga, descarga e transporte de equipamentos e materiais. É um serviço muito usado em montagem industrial, instalação de estruturas metálicas, postes, caixas de água e peças pré-moldadas.",
    faqs: [
      [
        "O que o caminhão Munck consegue içar?",
        "Estruturas metálicas, peças pré-moldadas, postes, caixas de água, equipamentos industriais e materiais de construção em geral. A capacidade exata depende do peso da carga e da distância do ponto de içamento — a lança perde capacidade conforme se estende.",
      ],
      [
        "Qual a diferença entre Munck e guindaste?",
        "O Munck é uma grua montada sobre o chassi de um caminhão: transporta e iça a própria carga, é mais ágil e cabe em espaços menores. O guindaste tem capacidade muito maior, mas exige mais espaço, montagem e custo.",
      ],
      [
        "O serviço inclui o transporte da carga?",
        "Sim. O Munck iça, transporta e descarrega no destino, o que evita contratar separadamente um caminhão e um equipamento de içamento.",
      ],
    ],
    icon: ArrowUpFromLine,
  },
  {
    slug: "apoio-a-grandes-obras",
    nome: "Apoio e gestão de grandes obras",
    h1: "Apoio e Gestão de Grandes Obras no Maranhão",
    resumo:
      "Máquinas, equipes e gestão de obra para empreendimentos industriais, rodovias e loteamentos.",
    descricao:
      "Fornecimento de máquinas, equipamentos e mão de obra operacional para obras industriais, loteamentos, terminais, rodovias e empreendimentos públicos e privados, incluindo planejamento e administração da obra com controle de custos, qualidade e cronograma.",
    itens: [
      "Obras industriais",
      "Loteamentos",
      "Terminais",
      "Rodovias",
      "Empreendimentos públicos e privados",
      "Mão de obra operacional",
      "Gestão e administração de obras",
      "Planejamento e controle de cronograma",
    ],
    intro:
      "Grandes obras — terminais, rodovias, loteamentos e plantas industriais — precisam de frota, equipe e gestão que acompanhem o ritmo do cronograma. A MV Construtora fornece máquinas, equipamentos e mão de obra operacional para empreendimentos públicos e privados, e também assume o planejamento e a administração da obra, com controle de custos, qualidade e prazo.",
    faqs: [
      [
        "A MV Construtora faz a gestão completa da obra?",
        "Sim. Assumimos planejamento, equipes, equipamentos, acompanhamento técnico e controle de custos, qualidade e cronograma, conforme a necessidade do projeto.",
      ],
      [
        "Vocês atendem obras públicas?",
        "Sim. Atendemos empreendimentos públicos e privados, incluindo obras de infraestrutura contratadas por prefeituras e órgãos estaduais.",
      ],
      [
        "É possível contratar só a mão de obra operacional?",
        "Sim. O fornecimento pode ser de máquinas, de equipes operacionais ou dos dois em conjunto, conforme o que a obra já tem disponível.",
      ],
    ],
    icon: Factory,
  },
  {
    slug: "servicos-rurais",
    nome: "Serviços para propriedades rurais",
    h1: "Serviços de Terraplenagem para Propriedades Rurais no Maranhão",
    resumo:
      "Estradas internas, açudes e reservatórios, limpeza, nivelamento e preparo de terrenos.",
    descricao:
      "Abertura e recuperação de estradas internas, construção de açudes e reservatórios, limpeza e nivelamento de áreas, abertura de valas e preparação de terrenos para produção.",
    itens: [
      "Estradas internas",
      "Construção de açudes",
      "Reservatórios",
      "Limpeza e nivelamento de áreas",
      "Abertura de valas",
      "Preparação de terrenos para plantio",
    ],
    intro:
      "A produção rural depende de infraestrutura: estrada interna que não atola, açude que segura água na estiagem e terreno nivelado para o plantio. A MV Construtora atende propriedades rurais no Maranhão com abertura e recuperação de estradas internas, construção de açudes e reservatórios, limpeza e nivelamento de áreas e abertura de valas. É um serviço executado com a mesma frota das obras de infraestrutura.",
    faqs: [
      [
        "Quanto custa construir um açude?",
        "Depende do volume de água a armazenar, do tipo de solo, da topografia e da distância da propriedade. O custo é calculado principalmente pelo volume de terra movimentado. A visita técnica define o dimensionamento e o orçamento.",
      ],
      [
        "Vocês preparam o solo para plantio?",
        "Sim. Executamos limpeza, destocamento, nivelamento e regularização de áreas para plantio e para implantação de empreendimentos agrícolas.",
      ],
      [
        "É possível recuperar estradas internas da fazenda?",
        "Sim. Fazemos abertura e recuperação de estradas internas, com patrolamento, cascalhamento e drenagem — o que mantém o acesso da propriedade utilizável também no período chuvoso.",
      ],
    ],
    icon: Sprout,
  },
];

/**
 * Complementos editoriais por serviço. Permanecem na mesma fonte dos serviços
 * para que página, sitemap, schema e links internos não possam divergir.
 */
const CONTEUDO_POR_SERVICO: Record<
  string,
  Pick<Servico, "contexto" | "erros" | "etapas" | "faqs">
> = {
  terraplanagem: {
    contexto:
      "No Maranhão, o planejamento da terraplenagem começa antes da primeira máquina entrar. A chuva muda a umidade do material e o acesso ao terreno; já um solo muito fraco ou uma área distante da base muda a logística. Por isso avaliamos desníveis, acesso para prancha, destino ou aproveitamento do material e a sequência entre corte, aterro e compactação. Esse levantamento evita movimentar terra duas vezes e ajuda a manter a frente de serviço preparada para a próxima etapa da obra.",
    erros: [
      "Começar sem conferir níveis e volumes de corte e aterro.",
      "Aterrar em camada alta demais ou sem compactação adequada.",
      "Deixar a água correr sobre o terreno já regularizado.",
    ],
    etapas: [
      [
        "Levantamento",
        "Entendemos o uso futuro da área, os níveis necessários e a condição de acesso.",
      ],
      [
        "Visita ao terreno",
        "Conferimos solo, desníveis, volumes e como a água se comporta no local.",
      ],
      [
        "Plano de execução",
        "Definimos máquinas, sequência de corte e aterro, compactação e mobilização.",
      ],
      [
        "Movimentação de terra",
        "Executamos o serviço por frentes, acompanhando níveis e condições do material.",
      ],
      [
        "Liberação da base",
        "Entregamos a área regularizada para a próxima etapa prevista no escopo.",
      ],
    ],
    faqs: [
      [
        "A terraplenagem pode ser feita na chuva?",
        "Depende da condição do solo e da segurança do acesso. Chuva forte pode encharcar o material e impedir a compactação correta; nesse caso, o planejamento ajusta a frente de serviço para não desperdiçar operação.",
      ],
      [
        "Por que a compactação é feita em camadas?",
        "Porque uma camada muito espessa pode parecer firme por cima e ficar solta por baixo. Trabalhar por camadas permite que o rolo atue de forma uniforme antes da próxima camada.",
      ],
      [
        "É possível aproveitar a terra do próprio terreno?",
        "Em muitos casos, sim. A possibilidade depende das características do material e da necessidade do projeto. Avaliar isso na visita pode reduzir transporte e compra de material externo.",
      ],
    ],
  },
  "infraestrutura-viaria": {
    contexto:
      "Uma estrada vicinal no Maranhão precisa ser pensada para continuar transitável quando a chuva chega, não apenas para parecer nivelada no dia da entrega. O caimento da pista, as saídas de água, o tipo de material de revestimento e a distância da jazida influenciam diretamente a durabilidade. Em acessos rurais e trechos produtivos, também consideramos o tráfego esperado: o caminho de um carro leve não recebe o mesmo tratamento de uma rota usada por caminhões e máquinas.",
    erros: [
      "Patrolar sem corrigir o caimento e as saídas de água.",
      "Espalhar cascalho sobre pista saturada ou sem preparo.",
      "Tratar atoleiros só na superfície, sem investigar a drenagem.",
    ],
    etapas: [
      ["Trecho e uso", "Identificamos extensão, largura, tráfego e os pontos críticos do acesso."],
      [
        "Diagnóstico de campo",
        "Verificamos atoleiros, drenagem, material disponível e condições de entrada.",
      ],
      [
        "Solução por trecho",
        "Separamos o que pede patrolamento, reforço de base, cascalho ou drenagem.",
      ],
      ["Execução", "Regularizamos a pista, espalhamos material quando previsto e compactamos."],
      ["Conferência", "Revisamos caimento, acabamento e escoamento antes de liberar a via."],
    ],
    faqs: [
      [
        "Patrolamento resolve atoleiro?",
        "Só quando o problema está na irregularidade superficial. Se a água fica presa ou o solo não suporta o tráfego, é preciso combinar drenagem, material de reforço e compactação.",
      ],
      [
        "A estrada precisa de drenagem lateral?",
        "Em muitos trechos, sim. Valetas e pontos de passagem de água evitam que ela permaneça sobre a pista e enfraqueça a base.",
      ],
      [
        "O cascalho pode ser aplicado em toda a estrada?",
        "A definição depende do diagnóstico e do escopo. Há trechos que pedem reforço maior e outros que precisam apenas de regularização e manutenção.",
      ],
    ],
  },
  "obras-civis": {
    contexto:
      "Em obra civil, fundação, piso e acesso precisam conversar com o terreno onde serão construídos. No Maranhão, uma chuva mal direcionada pode atingir escavações, bases e áreas de circulação; por isso, a preparação do terreno e a drenagem entram cedo na conversa. Para galpões e estruturas de uso comercial ou industrial, o planejamento também considera a entrada de materiais, o pátio e a sequência entre serviços para que uma etapa não desfaça a outra.",
    erros: [
      "Iniciar fundação sem preparar e conferir a plataforma.",
      "Deixar drenagem e acessos para depois da edificação.",
      "Alterar escopo em campo sem registrar impacto em prazo e materiais.",
    ],
    etapas: [
      [
        "Necessidade da obra",
        "Alinhamos uso da estrutura, projeto disponível, terreno e prazo esperado.",
      ],
      ["Vistoria", "Conferimos acesso, implantação, preparo do solo e interfaces com drenagem."],
      [
        "Proposta de escopo",
        "Organizamos as frentes de construção e os serviços complementares previstos.",
      ],
      [
        "Execução coordenada",
        "Acompanhamos a sequência entre base, estrutura, pisos e acabamentos contratados.",
      ],
      ["Entrega", "Conferimos o escopo executado e liberamos a área para uso ou próxima fase."],
    ],
    faqs: [
      [
        "A terraplenagem pode entrar no mesmo contrato da obra civil?",
        "Sim. Quando o escopo pede, a preparação do terreno, a drenagem e a construção podem ser organizadas como frentes conectadas.",
      ],
      [
        "O que precisa estar definido antes de começar?",
        "Uso da estrutura, área de implantação, acesso e o escopo contratado. Projetos e autorizações aplicáveis também devem ser conferidos antes da mobilização.",
      ],
      [
        "Vocês executam piso e pátio de acesso?",
        "Executamos pisos, pavimentações e serviços complementares dentro do escopo acordado para a obra.",
      ],
    ],
  },
  drenagem: {
    contexto:
      "A drenagem precisa ser definida pelo caminho que a água faz no terreno, e não apenas pelo ponto onde ela aparece. Em períodos de chuva intensa, valas, bueiros e caixas trabalham juntos para retirar a água da pista, da plataforma ou da área construída sem causar erosão no destino. A visita técnica identifica cotas, pontos de concentração e acessos para as máquinas. Isso ajuda a executar a rede antes que aterros, calçadas ou pavimentos dificultem a intervenção.",
    erros: [
      "Instalar tubo sem caimento ou saída segura para a água.",
      "Fechar vala sem conferir assentamento e reaterro.",
      "Dimensionar drenagem pela aparência do terreno seco.",
    ],
    etapas: [
      [
        "Pontos de água",
        "Mapeamos onde a água chega, por onde deve passar e onde pode ser direcionada.",
      ],
      [
        "Definição do sistema",
        "Organizamos valas, tubos, bueiros, caixas e reaterros previstos no escopo.",
      ],
      ["Escavação", "Abrimos as frentes respeitando acesso, profundidade e segurança de trabalho."],
      [
        "Instalação e reaterro",
        "Preparamos o leito, instalamos os componentes e recompomos o solo por etapas.",
      ],
      [
        "Teste de escoamento",
        "Conferimos continuidade, acabamento e a proteção dos pontos de saída.",
      ],
    ],
    faqs: [
      [
        "Drenagem deve ser feita antes da pavimentação?",
        "Sempre que o projeto permitir, a rede enterrada é planejada antes das camadas finais da pista ou do pátio, evitando cortes e retrabalho depois.",
      ],
      [
        "O reaterro da vala precisa ser compactado?",
        "Sim. Sem recomposição e compactação adequadas, o solo pode ceder sobre a tubulação e comprometer o acabamento acima.",
      ],
      [
        "Como evitar erosão na saída da água?",
        "O destino e a proteção da descarga precisam entrar no projeto. A solução depende do volume de água, da inclinação e do solo do local.",
      ],
    ],
  },
  "limpeza-de-areas": {
    contexto:
      "Limpar uma área não é simplesmente empurrar vegetação para um canto. Tocos e raízes deixados sob aterros criam vazios depois que se decompõem, enquanto entulho misturado ao solo dificulta a regularização. Em áreas rurais ou distantes, a logística de retirada e o destino definido para os materiais também entram no planejamento. A frente só segue para terraplenagem quando o terreno está livre e a condição de acesso permite operar sem espalhar resíduos para áreas que permanecerão preservadas.",
    erros: [
      "Enterrar tocos, raízes ou entulho no aterro.",
      "Começar supressão ou demolição sem definir destino do material.",
      "Limpar sem separar a área de circulação das máquinas.",
    ],
    etapas: [
      ["Delimitação", "Confirmamos a área que será limpa e o que deve permanecer preservado."],
      ["Vistoria", "Identificamos vegetação, tocos, entulho, estruturas e acesso para carga."],
      [
        "Plano de retirada",
        "Definimos frente de trabalho, equipamentos e destino dos materiais conforme o escopo.",
      ],
      [
        "Limpeza mecanizada",
        "Executamos remoção, destocamento, carga e transporte quando contratados.",
      ],
      [
        "Área liberada",
        "Conferimos o terreno para a próxima etapa de terraplenagem ou implantação.",
      ],
    ],
    faqs: [
      [
        "Limpeza de área inclui destocamento?",
        "Inclui quando esse item faz parte do escopo. O destocamento é importante quando a área receberá aterro, piso ou outra estrutura.",
      ],
      [
        "O material retirado pode ficar no terreno?",
        "Isso depende do material, do escopo e das condições do local. A destinação é definida antes da execução para evitar acúmulo e retrabalho.",
      ],
      [
        "É possível limpar e nivelar na mesma mobilização?",
        "Sim, quando o planejamento e o contrato incluem as duas frentes. Isso reduz a transição entre limpeza e preparo do terreno.",
      ],
    ],
  },
  "locacao-de-maquinas": {
    contexto:
      "Locação de máquina pesada não se resume a escolher um equipamento por nome. A decisão considera o serviço, a condição do solo, o espaço de manobra, o acesso da prancha e a duração da frente de trabalho. Em obras afastadas, mobilização e assistência também pesam no planejamento. Quando a locação é com operador, o equipamento chega integrado a uma rotina de obra; sem operador, é importante que o contratante tenha equipe habilitada e combine responsabilidades de operação, abastecimento e uso.",
    erros: [
      "Escolher máquina sem avaliar acesso, espaço de giro e aplicação.",
      "Contratar diária curta sem considerar mobilização e desmobilização.",
      "Operar equipamento sem alinhar responsabilidades e condições de uso.",
    ],
    etapas: [
      [
        "Necessidade",
        "Você informa o serviço, local, prazo e a máquina desejada ou o resultado esperado.",
      ],
      [
        "Compatibilidade",
        "Avaliamos equipamento, acesso, operador e forma de contratação adequados.",
      ],
      ["Proposta", "Detalhamos prazo, mobilização, condições de operação e itens do escopo."],
      ["Entrega em obra", "Programamos o transporte e a entrada do equipamento na data combinada."],
      [
        "Acompanhamento",
        "Mantemos o alinhamento da locação até a retirada ou renovação do contrato.",
      ],
    ],
    faqs: [
      [
        "Posso alugar mais de uma máquina para a mesma frente?",
        "Sim. A combinação é definida pelo serviço: escavadeira, pá-carregadeira, patrol, rolo e pipa podem atuar em etapas complementares.",
      ],
      [
        "Como é feito o transporte da máquina até a obra?",
        "A mobilização é planejada conforme o equipamento e o acesso ao local, com transporte apropriado para a máquina contratada.",
      ],
      [
        "O que informar para pedir orçamento de locação?",
        "Serviço, cidade ou local da obra, período desejado, condição de acesso e se precisa de operador. Essas informações permitem avaliar a mobilização.",
      ],
    ],
  },
  "transporte-de-maquinas": {
    contexto:
      "O transporte de máquinas pesadas começa pelo peso e pelas dimensões do equipamento, mas não termina aí. A rota precisa comportar o conjunto e o canteiro deve oferecer um ponto seguro para embarque e desembarque. Em deslocamentos no Maranhão, a distância e a condição das estradas de acesso influenciam o planejamento da viagem. Conferir essas informações antes evita uma prancha parada em local sem manobra ou uma máquina chegando quando a frente ainda não está preparada para recebê-la.",
    erros: [
      "Informar modelo ou peso da máquina de forma incompleta.",
      "Deixar carga e descarga para local sem espaço de manobra.",
      "Programar mobilização sem confirmar as condições do acesso.",
    ],
    etapas: [
      [
        "Dados do equipamento",
        "Recebemos tipo de máquina, origem, destino e janela desejada para o transporte.",
      ],
      [
        "Rota e acesso",
        "Avaliamos percurso, condições de entrada e ponto de embarque e desembarque.",
      ],
      [
        "Programação",
        "Definimos a mobilização e as orientações necessárias para o dia do serviço.",
      ],
      ["Embarque e viagem", "A equipe realiza o transporte conforme o planejamento contratado."],
      [
        "Desembarque",
        "Entregamos a máquina no local combinado e alinhamos a desmobilização, se prevista.",
      ],
    ],
    faqs: [
      [
        "Quais informações preciso passar para transportar uma máquina?",
        "Tipo e modelo do equipamento, origem, destino, condições de acesso e a data desejada. Fotos do ponto de carga podem ajudar na avaliação.",
      ],
      [
        "Posso contratar só a desmobilização ao fim da obra?",
        "Sim. O transporte pode ser solicitado para uma etapa específica, conforme disponibilidade e planejamento da rota.",
      ],
      [
        "Por que o acesso da obra é importante?",
        "A prancha precisa de espaço e piso compatível para entrar, manobrar e operar a carga ou descarga com segurança.",
      ],
    ],
  },
  "caminhao-munck": {
    contexto:
      "No serviço com Munck, peso da carga e alcance necessário são informações inseparáveis. A capacidade do equipamento muda conforme a distância entre o caminhão e o ponto de içamento; por isso, não basta dizer que a peça é pesada. Espaço para estabilizadores, piso firme e interferências como rede elétrica ou estruturas próximas também entram na vistoria. Em obras e montagens no Maranhão, planejar esse acesso antes evita deslocar a carga até o local e descobrir que o caminhão não consegue posicionar com segurança.",
    erros: [
      "Informar apenas o peso, sem medidas e ponto de posicionamento.",
      "Reservar área sem piso firme para estabilizadores.",
      "Ignorar obstáculos e interferências no caminho da lança.",
    ],
    etapas: [
      ["Dados da carga", "Entendemos peso, dimensões, origem, destino e o que precisa ser içado."],
      [
        "Avaliação do local",
        "Conferimos alcance, acesso, piso, espaço de estabilização e interferências.",
      ],
      ["Planejamento", "Definimos posicionamento do caminhão, sequência e condições do serviço."],
      [
        "Içamento e transporte",
        "Executamos carga, movimentação ou descarga conforme o escopo contratado.",
      ],
      ["Conferência", "Finalizamos a operação no ponto combinado e liberamos a área."],
    ],
    faqs: [
      [
        "O Munck precisa de espaço para estabilizadores?",
        "Sim. O caminhão precisa apoiar os estabilizadores em área firme e livre, conforme a posição necessária para a operação.",
      ],
      [
        "Vocês avaliam o local antes do içamento?",
        "A avaliação é importante quando há dúvida sobre acesso, alcance, piso ou interferências. Ela orienta o planejamento seguro da operação.",
      ],
      [
        "O Munck pode movimentar a carga dentro do canteiro?",
        "Conforme acesso e condições do local, o equipamento pode fazer carga, descarga e posicionamento dentro do escopo combinado.",
      ],
    ],
  },
  "apoio-a-grandes-obras": {
    contexto:
      "Em uma grande obra, máquina parada, acesso sem manutenção ou frente liberada fora de sequência afetam mais de uma equipe. O apoio operacional organiza recursos de acordo com o cronograma real do canteiro: equipamentos, mão de obra, deslocamento entre frentes e controle do que está pronto para receber a próxima etapa. Para obras espalhadas ou com acesso variável no Maranhão, essa coordenação reduz interrupções e ajuda a ajustar a operação às condições de solo, chuva e logística sem perder de vista o escopo contratado.",
    erros: [
      "Mobilizar recursos sem alinhar as frentes críticas do cronograma.",
      "Deixar acessos e logística fora do planejamento da obra.",
      "Tratar alteração de escopo como ajuste informal, sem registrar impacto.",
    ],
    etapas: [
      [
        "Leitura do escopo",
        "Entendemos as frentes, o cronograma, os recursos existentes e os pontos críticos.",
      ],
      [
        "Plano de apoio",
        "Organizamos equipamentos, equipes e mobilização de acordo com a sequência da obra.",
      ],
      [
        "Integração de campo",
        "Alinhamos entradas, acessos e prioridades com a rotina do canteiro.",
      ],
      [
        "Acompanhamento",
        "Ajustamos a operação dentro do escopo quando as frentes evoluem ou exigem replanejamento.",
      ],
      [
        "Fechamento",
        "Conferimos entregas, desmobilização e as informações necessárias para a próxima fase.",
      ],
    ],
    faqs: [
      [
        "O apoio pode ser contratado só para uma frente da obra?",
        "Sim. O escopo pode atender uma etapa, uma frente específica ou uma necessidade operacional definida.",
      ],
      [
        "Vocês fornecem equipe e equipamento juntos?",
        "Conforme a contratação, podemos fornecer máquinas, mão de obra operacional ou os dois recursos integrados.",
      ],
      [
        "Como o cronograma influencia a proposta?",
        "Prazo, sequência de frentes e disponibilidade de acesso ajudam a dimensionar mobilização, equipamentos e equipe necessários.",
      ],
    ],
  },
  "servicos-rurais": {
    contexto:
      "Na propriedade rural, a infraestrutura precisa servir ao calendário de produção e às condições reais de acesso. Uma estrada interna mal drenada pode impedir entrada de insumo ou saída de produção justamente na época de chuva; um açude ou reservatório exige leitura do terreno e planejamento do volume de terra. A visita técnica considera relevo, solo, distância e uso da área para definir uma solução prática. O objetivo é organizar acesso, água e áreas de trabalho sem tratar a fazenda como uma obra urbana genérica.",
    erros: [
      "Abrir estrada sem caimento e pontos de saída para água.",
      "Construir açude sem avaliar solo, relevo e destinação da água.",
      "Nivelar área produtiva sem considerar acesso e escoamento.",
    ],
    etapas: [
      [
        "Uso da propriedade",
        "Você explica a necessidade: estrada, açude, limpeza, área de plantio ou outra frente rural.",
      ],
      ["Visita técnica", "Avaliamos relevo, solo, acesso, água e distância da área de trabalho."],
      ["Escopo de campo", "Definimos máquinas, sequência de serviços e a mobilização necessária."],
      ["Execução", "Realizamos a frente contratada com acompanhamento das condições do terreno."],
      ["Entrega", "Conferimos o resultado e orientamos a próxima etapa prevista no serviço."],
    ],
    faqs: [
      [
        "A estrada interna pode receber cascalho?",
        "Quando o diagnóstico indicar necessidade, o cascalhamento pode ser combinado com regularização, drenagem e compactação para reforçar os trechos críticos.",
      ],
      [
        "Vocês fazem açude e limpeza da área no mesmo projeto?",
        "As frentes podem ser organizadas juntas quando o escopo, o acesso e a sequência de obra permitem.",
      ],
      [
        "O que informar para pedir orçamento na fazenda?",
        "Local da propriedade, necessidade, condição atual do acesso, período desejado e, se possível, fotos ou referências da área.",
      ],
    ],
  },
};

export const SERVICOS: Servico[] = SERVICOS_BASE.map((servico) => ({
  ...servico,
  ...CONTEUDO_POR_SERVICO[servico.slug],
  faqs: [...servico.faqs, ...CONTEUDO_POR_SERVICO[servico.slug].faqs],
}));

// Faixa de destaque exibida logo abaixo do hero.
// Texto denso em palavra-chave, aparece cedo no HTML.
//
// "Pavimentação" aparece aqui como palavra-chave de busca, mas não é categoria
// autônoma: o cliente confirmou (02/09/2026) que faz parte da terraplanagem.
// "Gestão de obras" também não é categoria própria — foi absorvida por
// "Apoio e gestão de grandes obras", conforme confirmação do cliente.
export const DESTAQUES = [
  "Terraplenagem",
  "Obras Civis",
  "Infraestrutura",
  "Pavimentação",
  "Drenagem",
  "Locação de Máquinas Pesadas",
  "Transporte de Equipamentos",
  "Serviços com Munck",
  "Estradas Vicinais",
  "Movimentação de Terra",
];

// A área de atuação (Maranhão, Piauí e Ceará) vive em src/data/regioes.ts.
