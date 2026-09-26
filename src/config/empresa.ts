// Fonte única dos dados de contato e identidade do Grupo MV Construtora.
//
// Estes valores aparecem no header, no rodapé, na seção de localização, no
// e-mail do formulário e no JSON-LD. Antes estavam espalhados e já haviam
// divergido (o horário aparecia como 07h num lugar e 08h em outro).
//
// IMPORTANTE: nome, endereço e telefone precisam ser idênticos aos do Google
// Meu Negócio. Divergência de NAP derruba a confiança no ranking local.

/**
 * URL canônica do site em produção.
 *
 * Alimenta canonical, og:url, sitemap e JSON-LD.
 */
export const SITE_URL = "https://www.grupomvconstrutora.com.br";

export const EMPRESA = {
  nome: "Grupo MV Construtora",
  razaoSocial: "A R LEITE PEREIRA LTDA",
  cnpj: "14.299.029/0001-20",
  // ATENÇÃO: o telefone do cartão CNPJ — (98) 9197-2921 — é o de cadastro na
  // Receita, não o WhatsApp comercial. Ele tem 8 dígitos e gera link quebrado
  // (celular no WhatsApp precisa de 55 + DDD + 9 + 8 dígitos = 13).
  // Número oficial desde 26/09/2026 (antes era (98) 99236-8928). Precisa ser o
  // mesmo cadastrado como Chat no Google Meu Negócio.
  whatsapp: "5598984080872",
  whatsappExibicao: "(98) 98408-0872",
  telefoneCadastroCnpj: "(98) 9197-2921",
  // E-mail comercial do domínio. O do cartão CNPJ
  // (mvconstrutoraeimobiliaria@outlook.com) é o de cadastro na Receita.
  email: "atendimento@grupomvconstrutora.com.br",
  logradouro: "Rod. Pitombeira",
  numero: "s/n",
  bairro: "Pitombeira",
  cep: "65370-000",
  endereco: "Rod. Pitombeira, s/n, Pitombeira, Pindaré-Mirim - MA, CEP 65370-000",
  horario: "Seg a Sex · 07h às 18h · Sáb · 08h às 12h",
  cidade: "Pindaré-Mirim",
  estado: "MA",
  fundacao: "2011-09-14",
  instagramUrl: "https://www.instagram.com/grupoconstrutoramv/",
  instagramHandle: "@grupoconstrutoramv",
} as const;

const MAPS_QUERY = encodeURIComponent(`${EMPRESA.nome} ${EMPRESA.endereco}`);
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`;
export const MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const waLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${EMPRESA.whatsapp}&text=${encodeURIComponent(text)}`;

export const telLink = `tel:+${EMPRESA.whatsapp}`;
