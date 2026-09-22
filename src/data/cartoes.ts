// Cartões de visita virtuais, servidos em /cartao/<slug>.
//
// Para criar o cartão de outra pessoa, basta acrescentar um item aqui — a rota
// src/routes/cartao/$slug.tsx monta a página, o vCard e os links sozinha.

export type Cartao = {
  slug: string;
  nome: string;
  cargo: string;
  /** Só dígitos, com DDI: alimenta tel:, WhatsApp e o vCard. */
  telefone: string;
  telefoneExibicao: string;
  email: string;
  cidade: string;
  uf: string;
  site: string;
  siteExibicao: string;
};

export const CARTOES: Cartao[] = [
  {
    slug: "talita-mendes",
    nome: "Talita Mendes",
    cargo: "Diretora Administrativa",
    telefone: "5598992368928",
    telefoneExibicao: "+55 (98) 99236-8928",
    email: "talitamendes@grupomvconstrutora.com.br",
    cidade: "Pindaré-Mirim",
    uf: "MA 320",
    site: "https://www.grupomvconstrutora.com.br",
    siteExibicao: "www.grupomvconstrutora.com.br",
  },
  {
    slug: "alan-robson-leite",
    nome: "Alan Robson Leite",
    cargo: "Diretor Presidente",
    telefone: "5598991972921",
    telefoneExibicao: "+55 (98) 99197-2921",
    email: "alanrobson@grupomvconstrutora.com.br",
    cidade: "Pindaré-Mirim",
    uf: "MA 320",
    site: "https://www.grupomvconstrutora.com.br",
    siteExibicao: "www.grupomvconstrutora.com.br",
  },
  {
    slug: "thiago-henrique",
    nome: "Thiago Henrique",
    cargo: "Assistente Administrativo",
    // CONFERIR: o número veio da arte como (98) 984401-7905 — um dígito a mais
    // que um celular válido (9 + 8 dígitos). Mantido como recebido.
    telefone: "55989844017905",
    telefoneExibicao: "+55 (98) 984401-7905",
    email: "thiagohenrique@grupomvconstrutora.com.br",
    cidade: "Pindaré-Mirim",
    uf: "MA 320",
    site: "https://www.grupomvconstrutora.com.br",
    siteExibicao: "www.grupomvconstrutora.com.br",
  },
];
