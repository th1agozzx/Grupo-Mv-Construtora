// Monta a apresentação institucional em arquivo único: injeta as imagens em
// base64 e as listas de serviços, frota e regiões no template.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Raiz do projeto, a partir da pasta deste script.
const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const template = readFileSync(resolve(RAIZ, "apresentacao/_template.html"), "utf8");

const dataUri = (rel, mime) =>
  `data:${mime};base64,${readFileSync(resolve(RAIZ, rel)).toString("base64")}`;

// Dados abaixo copiados de src/data/*.ts e src/config/empresa.ts.
const SERVICOS = [
  ["Terraplenagem", "Escavação, corte e aterro, nivelamento, compactação de solo e pavimentação com precisão técnica."],
  ["Infraestrutura viária", "Abertura e recuperação de estradas vicinais, patrolamento, cascalhamento e compactação."],
  ["Obras civis", "Construção e reforma de edificações, galpões, fundações, pisos, pavimentações e muros."],
  ["Drenagem e infraestrutura", "Valas, drenagem pluvial, tubos e bueiros, canais e preparação para redes de água e esgoto."],
  ["Preparação e limpeza de áreas", "Limpeza mecanizada, destocamento, demolições e remoção de material com carga e transporte."],
  ["Locação de máquinas e equipamentos", "Escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhões, com ou sem operador."],
  ["Transporte de máquinas e equipamentos", "Transporte com caminhão prancha, mobilização e desmobilização de máquinas pesadas."],
  ["Serviços com caminhão Munck", "Içamento, movimentação, carga, descarga e transporte de equipamentos e materiais."],
  ["Apoio e gestão de grandes obras", "Máquinas, equipes e gestão de obra para empreendimentos industriais, rodovias e loteamentos."],
  ["Serviços para propriedades rurais", "Estradas internas, açudes e reservatórios, limpeza, nivelamento e preparo de terrenos."],
];

const FROTA = [
  ["Escavação", "Escavadeira hidráulica", "Versátil para valas, remoção de terra, carregamento e serviços urbanos."],
  ["Carregamento", "Pá-carregadeira", "Carregamento ágil de agregados e movimentação de grandes volumes."],
  ["Nivelamento", "Motoniveladora (patrol)", "Nivelamento preciso de terrenos, vias e plataformas."],
  ["Compactação", "Rolo compactador", "Compactação uniforme para bases, pavimentação e aterros técnicos."],
  ["Transporte", "Caminhão-pipa", "Umidificação do solo para compactação e controle de poeira na obra."],
  ["Transporte", "Caminhão prancha", "Transporte seguro de máquinas pesadas e equipamentos de grande porte."],
];

const REGIOES = [
  {
    estado: "Maranhão", uf: "MA", sede: true, capital: "São Luís",
    polos: ["Imperatriz", "Caxias", "Timon", "Codó", "Bacabal", "Balsas", "Açailândia"],
    cidades: ["Pindaré-Mirim", "Santa Inês", "Monção", "Tufilândia", "Igarapé do Meio", "Alto Alegre do Pindaré", "Santa Luzia", "Bom Jardim", "Zé Doca", "Vitória do Mearim", "Chapadinha"],
  },
  {
    estado: "Piauí", uf: "PI", capital: "Teresina",
    polos: ["Parnaíba", "Picos", "Floriano", "Piripiri", "Campo Maior"],
    cidades: ["Barras", "Oeiras", "União", "Altos", "Esperantina", "José de Freitas", "Uruçuí", "Bom Jesus"],
  },
  {
    estado: "Ceará", uf: "CE", capital: "Fortaleza",
    polos: ["Sobral", "Juazeiro do Norte", "Crato", "Caucaia", "Maracanaú"],
    cidades: ["Crateús", "Iguatu", "Quixadá", "Tianguá", "Itapipoca", "Camocim", "Tauá", "Russas"],
  },
];

const htmlServicos = SERVICOS.map(
  ([nome, resumo], i) => `        <div class="servico">
          <span class="n">${String(i + 1).padStart(2, "0")}</span>
          <div><h3>${nome}</h3><p>${resumo}</p></div>
        </div>`,
).join("\n");

const htmlFrota = FROTA.map(
  ([categoria, nome, resumo]) => `        <div class="maquina">
          <small>${categoria}</small>
          <h3>${nome}</h3>
          <p>${resumo}</p>
        </div>`,
).join("\n");

const htmlRegioes = REGIOES.map(
  (r) => `        <div class="regiao">
          <span class="uf">${r.uf}</span>
          <h3>${r.estado}</h3>
          ${r.sede ? '<span class="sede">Sede da empresa</span>' : ""}
          <p class="rotulo">Capital</p>
          <p class="lista">${r.capital}</p>
          <p class="rotulo">Polos regionais</p>
          <p class="lista">${r.polos.join(" · ")}</p>
          <p class="rotulo">Demais cidades atendidas</p>
          <p class="lista">${r.cidades.join(" · ")}</p>
        </div>`,
).join("\n");

const total = REGIOES.reduce((n, r) => n + 1 + r.polos.length + r.cidades.length, 0);

const saida = template
  .replaceAll("__LOGO__", dataUri("src/assets/otimizadas/logomv.webp", "image/webp"))
  .replace("__FOTO_CAPA__", dataUri("src/assets/otimizadas/escavadeira1.webp", "image/webp"))
  .replace("__FOTO_FROTA__", dataUri("src/assets/otimizadas/fotodosmaquinarios.webp", "image/webp"))
  .replace("__SERVICOS__", htmlServicos)
  .replace("__FROTA__", htmlFrota)
  .replace("__REGIOES__", htmlRegioes);

const destino = resolve(RAIZ, "apresentacao/apresentacao-mv-construtora.html");
writeFileSync(destino, saida, "utf8");
console.log(`ok: ${destino}`);
console.log(`cidades listadas: ${total} · tamanho: ${(saida.length / 1024).toFixed(0)} KB`);
