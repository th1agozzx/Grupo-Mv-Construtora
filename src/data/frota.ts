// Fonte única da frota da MV Construtora.
//
// Cada máquina declara em `servicos` os slugs dos serviços em que atua. As
// páginas de serviço fazem a busca inversa a partir daqui — assim existe uma
// lista só, e o vínculo nunca fica divergente nos dois sentidos.

import caminhao from "@/assets/otimizadas/caminhao.webp";
import caminhaopipa from "@/assets/otimizadas/caminhaopipa.webp";
import caminhaopipa1 from "@/assets/otimizadas/caminhaopipa1.webp";
import caminhaoprancha from "@/assets/otimizadas/caminhaoprancha.webp";
import caminhaotraseira from "@/assets/otimizadas/caminhaotraseira.webp";
import escavadeira1 from "@/assets/otimizadas/escavadeira1.webp";
import escavadeira2 from "@/assets/otimizadas/escavadeira2.webp";
import escavadeira3 from "@/assets/otimizadas/escavadeira3.webp";
import fotodapatrol from "@/assets/otimizadas/fotodapatrol.webp";
import fotodas3escavadeiras from "@/assets/otimizadas/fotodas3escavadeiras.webp";
import pacarregadeira from "@/assets/otimizadas/pacarregadeira.webp";
import patrol from "@/assets/otimizadas/patrol.webp";
import rolocompactador from "@/assets/otimizadas/rolocompactador.webp";
import tresescavadeiras1 from "@/assets/otimizadas/tresescavadeiras1.webp";

export type FrotaCategoria =
  "Escavação" | "Carregamento" | "Transporte" | "Nivelamento" | "Compactação";

export type Maquina = {
  slug: string;
  nome: string;
  /** H1 da página da máquina. */
  h1: string;
  categoria: FrotaCategoria;
  /** Texto curto do card. */
  resumo: string;
  /** Abertura da página — específica desta máquina, não repetir entre elas. */
  intro: string;
  /** Para que a máquina serve, em linguagem de obra. */
  aplicacoes: string[];
  imgs: string[];
  /** Slugs de SERVICOS em que esta máquina entra. Gera o vínculo nos dois sentidos. */
  servicos: string[];
  faqs: [string, string][];
};

const FROTA_BASE: Maquina[] = [
  {
    slug: "escavadeira-hidraulica",
    nome: "Escavadeira hidráulica",
    h1: "Escavadeira Hidráulica no Maranhão: Locação e Operação",
    categoria: "Escavação",
    resumo: "Versátil para valas, remoção de terra, carregamento e serviços urbanos.",
    intro:
      "A escavadeira hidráulica é a máquina mais versátil de um canteiro: escava, carrega, remove entulho, abre valas de drenagem e faz demolição. A MV Construtora opera escavadeiras próprias no Maranhão, com operadores treinados, tanto nas obras que executa quanto em locação para terceiros.",
    aplicacoes: [
      "Escavação e movimentação de terra",
      "Abertura de valas para drenagem e redes",
      "Corte e aterro em terraplenagem",
      "Carregamento de caminhões basculantes",
      "Destocamento e limpeza de terreno",
      "Demolição de estruturas",
      "Construção de açudes e reservatórios",
    ],
    imgs: [escavadeira1, escavadeira2, escavadeira3, fotodas3escavadeiras, tresescavadeiras1],
    servicos: [
      "terraplanagem",
      "drenagem",
      "limpeza-de-areas",
      "servicos-rurais",
      "locacao-de-maquinas",
      "apoio-a-grandes-obras",
    ],
    faqs: [
      [
        "A escavadeira é locada com operador?",
        "Sim, disponibilizamos a escavadeira com operador treinado. Também avaliamos a locação sem operador, conforme o equipamento e as condições do contrato.",
      ],
      [
        "A escavadeira serve para abrir vala de drenagem?",
        "Sim. É a máquina mais usada para isso: abre a vala na profundidade e na largura necessárias, e ainda faz o reaterro depois do assentamento da tubulação.",
      ],
      [
        "Dá para usar escavadeira em terreno pequeno na cidade?",
        "Sim, desde que haja acesso para a prancha entregar a máquina e espaço de giro para a torre. Avaliamos isso na visita técnica antes de mobilizar.",
      ],
    ],
  },
  {
    slug: "pa-carregadeira",
    nome: "Pá-carregadeira",
    h1: "Pá-Carregadeira: Locação e Operação no Maranhão",
    categoria: "Carregamento",
    resumo: "Carregamento ágil de agregados e movimentação de grandes volumes.",
    intro:
      "A pá-carregadeira é a máquina de produtividade no carregamento: move grandes volumes de terra, areia, brita e cascalho em pouco tempo, alimentando caminhões e espalhando material na pista. Na MV Construtora ela trabalha junto com as escavadeiras e os basculantes nas frentes de terraplenagem e infraestrutura viária.",
    aplicacoes: [
      "Carregamento de caminhões com agregados",
      "Movimentação de grandes volumes de material",
      "Espalhamento de cascalho em estradas",
      "Limpeza e remoção de material de terreno",
      "Alimentação de frentes de aterro",
    ],
    imgs: [pacarregadeira],
    servicos: ["terraplanagem", "infraestrutura-viaria", "limpeza-de-areas", "locacao-de-maquinas"],
    faqs: [
      [
        "Qual a diferença entre pá-carregadeira e escavadeira?",
        "A escavadeira escava abaixo do nível em que está e gira 360°; a pá-carregadeira trabalha no nível do solo, com muito mais volume por ciclo. Uma escava, a outra carrega — em obra grande as duas trabalham juntas.",
      ],
      [
        "A pá-carregadeira serve para espalhar cascalho?",
        "Sim. Ela espalha o material na pista e a motoniveladora faz o acabamento e o caimento, seguida do rolo compactador.",
      ],
      [
        "Ela consegue carregar caminhão basculante?",
        "Sim, é justamente a função principal dela em obras de movimentação de terra e cascalhamento.",
      ],
    ],
  },
  {
    slug: "motoniveladora",
    nome: "Motoniveladora (patrol)",
    h1: "Motoniveladora (Patrol): Nivelamento e Patrolamento no Maranhão",
    categoria: "Nivelamento",
    resumo: "Nivelamento preciso de terrenos, vias e plataformas.",
    intro:
      "A motoniveladora — conhecida na região como patrol — é a máquina que dá acabamento ao terreno e à estrada. É ela que corta as irregularidades, define o caimento da pista para a água escoar e deixa a plataforma pronta para a compactação. Na MV Construtora, é a máquina central dos serviços de estrada vicinal.",
    aplicacoes: [
      "Patrolamento de estradas vicinais",
      "Nivelamento e regularização de terrenos",
      "Conformação de plataformas para construção",
      "Definição de caimento e abaulamento da pista",
      "Acabamento de base e sub-base",
      "Manutenção de estradas internas de propriedades rurais",
    ],
    imgs: [patrol, fotodapatrol],
    servicos: ["infraestrutura-viaria", "terraplanagem", "servicos-rurais", "locacao-de-maquinas"],
    faqs: [
      [
        "O que é patrolamento?",
        "É a regularização da superfície da estrada com a motoniveladora: a máquina corta as irregularidades, remove buracos e atoleiros e dá caimento à pista para a água escoar em vez de empoçar.",
      ],
      [
        "De quanto em quanto tempo a estrada precisa de patrolamento?",
        "Depende do tráfego, do tipo de solo e do regime de chuva. No Maranhão, estradas vicinais de terra costumam pedir manutenção pelo menos uma vez por ano, normalmente logo após o período chuvoso.",
      ],
      [
        "Só patrolar resolve o problema da estrada?",
        "Nem sempre. Se o solo natural não suporta o tráfego, o patrolamento dura pouco: é preciso cascalhamento e compactação, e muitas vezes drenagem, para o serviço durar.",
      ],
    ],
  },
  {
    slug: "rolo-compactador",
    nome: "Rolo compactador",
    h1: "Rolo Compactador: Compactação de Solo e Base no Maranhão",
    categoria: "Compactação",
    resumo: "Compactação uniforme para bases, pavimentação e aterros técnicos.",
    intro:
      "Compactar é o que transforma terra solta em base que aguenta carga. O rolo compactador dá a densidade final ao aterro, à base da estrada e à plataforma da obra. Sem essa etapa, o material cede com o tráfego e com a chuva — e todo o serviço de terraplenagem se perde na primeira estação chuvosa.",
    aplicacoes: [
      "Compactação de aterros técnicos",
      "Compactação de base e sub-base de estradas",
      "Preparo de plataforma para pavimentação",
      "Compactação de valas após reaterro",
      "Consolidação de plataformas industriais",
    ],
    imgs: [rolocompactador],
    servicos: ["terraplanagem", "infraestrutura-viaria", "obras-civis", "locacao-de-maquinas"],
    faqs: [
      [
        "Por que a compactação é tão importante?",
        "Porque é ela que dá capacidade de carga ao solo. Aterro mal compactado sofre recalque: a estrutura construída acima trinca, a pista afunda e o serviço precisa ser refeito.",
      ],
      [
        "O caminhão-pipa trabalha junto com o rolo?",
        "Sim, quase sempre. O solo precisa estar na umidade certa para compactar bem — seco demais não adensa, encharcado vira lama. O pipa faz esse controle de umidade em campo.",
      ],
      [
        "Quantas passadas do rolo são necessárias?",
        "Depende do tipo de solo, da espessura da camada e da densidade exigida em projeto. Trabalhamos por camadas, respeitando a espessura adequada em vez de tentar compactar tudo de uma vez.",
      ],
    ],
  },
  {
    slug: "caminhao-pipa",
    nome: "Caminhão-pipa",
    h1: "Caminhão-Pipa: Umidificação e Controle de Poeira no Maranhão",
    categoria: "Transporte",
    resumo: "Umidificação do solo para compactação e controle de poeira na obra.",
    intro:
      "O caminhão-pipa é peça-chave da terraplenagem, e não só um veículo de apoio: é ele que leva o solo ao teor de umidade certo para o rolo compactador conseguir adensar o material. Também faz o controle de poeira em pistas e canteiros, o que importa em obra perto de área habitada.",
    aplicacoes: [
      "Umidificação do solo para compactação",
      "Controle de poeira em pistas e canteiros",
      "Abastecimento de água para frentes de serviço",
      "Umidificação de base antes do rolo compactador",
      "Apoio a obras em áreas de difícil acesso",
    ],
    imgs: [caminhaopipa, caminhaopipa1],
    servicos: ["terraplanagem", "infraestrutura-viaria", "locacao-de-maquinas"],
    faqs: [
      [
        "Para que serve o caminhão-pipa numa obra de terraplenagem?",
        "Para levar o solo ao teor de umidade ideal antes da compactação. Solo seco demais não adensa e solo encharcado vira lama — o pipa faz esse ajuste em campo, junto com o rolo compactador.",
      ],
      [
        "O caminhão-pipa também faz controle de poeira?",
        "Sim. Em obras próximas a áreas habitadas ou em vias de acesso ao canteiro, a umidificação da pista reduz a poeira gerada pelo tráfego de máquinas e caminhões.",
      ],
      [
        "Vocês alugam caminhão-pipa avulso?",
        "Sim, o caminhão-pipa entra na locação de máquinas e equipamentos, com ou sem operador conforme a contratação.",
      ],
    ],
  },
  {
    slug: "caminhao-prancha",
    nome: "Caminhão prancha",
    h1: "Caminhão Prancha: Transporte de Máquinas Pesadas no Maranhão",
    categoria: "Transporte",
    resumo: "Transporte seguro de máquinas pesadas e equipamentos de grande porte.",
    intro:
      "Máquina pesada não se desloca sozinha até a obra. O caminhão prancha é o que viabiliza a mobilização: transporta escavadeiras, motoniveladoras, pás-carregadeiras e rolos entre canteiros, com planejamento de rota e equipe para carga e descarga. A MV Construtora tem prancha própria, o que reduz o tempo de mobilização.",
    aplicacoes: [
      "Transporte de escavadeiras e motoniveladoras",
      "Mobilização de máquinas para o canteiro",
      "Desmobilização ao fim da obra",
      "Transporte de equipamentos de grande porte",
      "Apoio logístico entre frentes de serviço",
    ],
    imgs: [caminhao, caminhaotraseira, caminhaoprancha],
    servicos: ["transporte-de-maquinas", "locacao-de-maquinas", "apoio-a-grandes-obras"],
    faqs: [
      [
        "Vocês transportam máquinas de terceiros?",
        "Sim. O transporte com caminhão prancha é oferecido também para empresas e produtores que precisam deslocar equipamentos próprios entre obras ou propriedades.",
      ],
      [
        "O transporte já inclui a carga e a descarga?",
        "Sim. O serviço inclui a equipe e a operação de embarque e desembarque da máquina na prancha.",
      ],
      [
        "A distância pesa muito no custo do transporte?",
        "Sim, é um dos itens que mais pesa em obras distantes da base. Por isso a sede em Pindaré-Mirim é vantajosa para obras no Vale do Pindaré e na região central do Maranhão.",
      ],
    ],
  },
];

/** Perguntas complementares específicas de cada equipamento, mantidas na fonte única da frota. */
const FAQS_COMPLEMENTARES: Record<string, [string, string][]> = {
  "escavadeira-hidraulica": [
    [
      "A escavadeira consegue carregar caminhão?",
      "Sim. Depois da escavação ou do corte, ela pode carregar o material em caminhões, desde que a frente tenha posição segura para o equipamento e o veículo.",
    ],
    [
      "O acesso da prancha precisa ser avaliado?",
      "Sim. A máquina chega ao local por transporte apropriado, então acesso, espaço de manobra e condição do solo são verificados antes da mobilização.",
    ],
    [
      "Escavadeira e pá-carregadeira fazem o mesmo trabalho?",
      "Elas se complementam. A escavadeira é muito eficiente para escavar, abrir valas e trabalhar abaixo do nível do solo; a pá-carregadeira é voltada a carregar e espalhar volume no nível da pista.",
    ],
  ],
  "pa-carregadeira": [
    [
      "A pá-carregadeira trabalha em obra rural?",
      "Sim. Ela pode carregar cascalho, movimentar material, apoiar limpeza e espalhar material em acessos, conforme as condições do terreno.",
    ],
    [
      "Ela precisa trabalhar junto com caminhões?",
      "Frequentemente, sim. A pá mantém a alimentação dos caminhões em operações de terra, areia, brita ou cascalho.",
    ],
    [
      "A máquina faz o acabamento final da pista?",
      "Ela espalha e movimenta o material. Para definir caimento e acabamento preciso, a motoniveladora é o equipamento mais indicado.",
    ],
  ],
  motoniveladora: [
    [
      "A patrol pode trabalhar em estrada molhada?",
      "A decisão depende do estado da pista e do solo. Quando o material está saturado, o acabamento não se mantém e a operação pode ser reprogramada para evitar desperdício.",
    ],
    [
      "Patrolamento inclui compactação?",
      "São etapas diferentes. A motoniveladora regulariza e conforma; quando o escopo pede, o rolo compactador entra para consolidar a camada.",
    ],
    [
      "A motoniveladora serve para pátio?",
      "Sim. Ela pode regularizar plataformas, pátios e acessos, especialmente quando é necessário controlar níveis e caimento.",
    ],
  ],
  "rolo-compactador": [
    [
      "Todo tipo de solo compacta igual?",
      "Não. Tipo de solo, umidade, espessura da camada e exigência do projeto influenciam a estratégia de compactação.",
    ],
    [
      "O rolo entra depois da patrol?",
      "Em muitas frentes, sim. A patrol conforma a camada e o rolo consolida o material, mas a sequência depende do serviço executado.",
    ],
    [
      "Por que compactar antes de pavimentar?",
      "A camada compactada forma uma base mais estável. Sem ela, o revestimento acima pode sofrer deformação e exigir correção precoce.",
    ],
  ],
  "caminhao-pipa": [
    [
      "O pipa ajuda em estrada de terra?",
      "Pode ajudar a controlar poeira e ajustar a umidade do material durante serviços de base e compactação, conforme o escopo.",
    ],
    [
      "Água demais melhora a compactação?",
      "Não. Solo encharcado perde condição de trabalho. O objetivo é atingir uma umidade adequada, definida conforme o material e a etapa.",
    ],
    [
      "Ele pode atender uma frente isolada?",
      "A viabilidade depende do local, acesso, prazo e planejamento da mobilização. Essas informações entram no orçamento.",
    ],
  ],
  "caminhao-prancha": [
    [
      "A prancha leva qualquer máquina?",
      "O transporte é avaliado conforme o tipo, peso e dimensões do equipamento, além das condições da rota e dos pontos de embarque.",
    ],
    [
      "Precisa ter alguém no local de carga?",
      "É importante haver um responsável para liberar o acesso e alinhar as condições de embarque ou desembarque no horário programado.",
    ],
    [
      "A prancha atende obras fora de Pindaré-Mirim?",
      "Sim, o atendimento é planejado conforme origem, destino, rota e disponibilidade da operação no Maranhão.",
    ],
  ],
};

export const FROTA: Maquina[] = FROTA_BASE.map((maquina) => ({
  ...maquina,
  faqs: [...maquina.faqs, ...FAQS_COMPLEMENTARES[maquina.slug]],
}));

export const CATEGORIAS_FROTA: ("Todos" | FrotaCategoria)[] = [
  "Todos",
  "Escavação",
  "Carregamento",
  "Transporte",
  "Nivelamento",
  "Compactação",
];

/** Máquinas que atuam num serviço. Usado nas páginas de serviço. */
export const maquinasDoServico = (slugServico: string): Maquina[] =>
  FROTA.filter((maquina) => maquina.servicos.includes(slugServico));

// PENDENTE: o cliente lista caminhão Munck e caminhão basculante/caçamba entre os
// equipamentos, mas não há fotos deles no projeto. Assim que houver, criar as
// entradas aqui — a página e os vínculos passam a existir automaticamente.
