// Converte as imagens de src/assets para WebP redimensionado.
// Uso: node scripts/otimizar-imagens.mjs
//
// Origem: src/assets/*.png  ->  Saida: src/assets/otimizadas/*.webp
// As larguras abaixo sao ~2x o maior tamanho de exibicao real no site.

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ENTRADA = "src/assets";
const SAIDA = "src/assets/otimizadas";

// Largura maxima por arquivo. O padrao cobre fotos de secao e galeria.
const LARGURA_PADRAO = 1600;
const LARGURAS = {
  logomv: 320, // renderizado a 44-48px de altura
  logomvbanner: 640, // renderizado a ~100px de altura
};

// Nao sao referenciadas em lugar nenhum do codigo - nao vale converter.
const IGNORAR = new Set([
  "fotoalan", // nunca importada
  "tresescavadeiras", // nunca importada
  "fotodasplacas", // importada, mas nunca usada no JSX
  "alaneasmaquinas", // importada como `alanemaquinas`, nunca usada no JSX
]);

await mkdir(SAIDA, { recursive: true });

let totalAntes = 0;
let totalDepois = 0;
let convertidas = 0;

for (const arquivo of await readdir(ENTRADA)) {
  if (!/\.(png|jpe?g)$/i.test(arquivo)) continue;

  const base = arquivo.replace(/\.(png|jpe?g)$/i, "");
  if (IGNORAR.has(base)) {
    console.log(`- ${arquivo} (ignorada: nao usada)`);
    continue;
  }

  const origem = path.join(ENTRADA, arquivo);
  const destino = path.join(SAIDA, `${base}.webp`);
  const largura = LARGURAS[base] ?? LARGURA_PADRAO;

  const antes = (await stat(origem)).size;

  await sharp(origem)
    .resize({ width: largura, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(destino);

  const depois = (await stat(destino)).size;
  totalAntes += antes;
  totalDepois += depois;
  convertidas++;

  const kb = (b) => Math.round(b / 1024);
  console.log(
    `ok ${base}.webp  ${String(kb(antes)).padStart(6)} KB -> ${String(kb(depois)).padStart(5)} KB  (${largura}px)`,
  );
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(
  `\n${convertidas} imagens | ${mb(totalAntes)} MB -> ${mb(totalDepois)} MB ` +
    `(-${(100 - (totalDepois / totalAntes) * 100).toFixed(1)}%)`,
);
