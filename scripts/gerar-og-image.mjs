// Gera public/og-image.jpg — a imagem que aparece no card ao compartilhar o
// link no WhatsApp, LinkedIn e redes sociais.
//
// Uso: node scripts/gerar-og-image.mjs
//
// 1200x630 é o tamanho que o Open Graph espera. O texto precisa ser grande:
// no feed do WhatsApp o card aparece pequeno.

import sharp from "sharp";
import { readFile } from "node:fs/promises";

const LARGURA = 1200;
const ALTURA = 630;
const SAIDA = "public/og-image.jpg";

const logo = await sharp("src/assets/otimizadas/logomvbanner.webp")
  .resize({ width: 420 })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

// Foto de fundo, bem escurecida para o texto ficar legível — mesma lógica do hero.
const fundo = await sharp("src/assets/otimizadas/fotodas3escavadeiras.webp")
  .resize({ width: LARGURA, height: ALTURA, fit: "cover", position: "centre" })
  .modulate({ brightness: 0.42 })
  .blur(1.5)
  .toBuffer();

const escapar = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const texto = `
<svg width="${LARGURA}" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veu" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#09090b" stop-opacity="0.95"/>
      <stop offset="55%"  stop-color="#09090b" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0.45"/>
    </linearGradient>
  </defs>
  <rect width="${LARGURA}" height="${ALTURA}" fill="url(#veu)"/>

  <!-- faixa vermelha da marca -->
  <rect x="0" y="${ALTURA - 14}" width="${LARGURA}" height="14" fill="#dc2626"/>

  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="330" fill="#f87171" font-size="26" font-weight="700" letter-spacing="6">
      ${escapar("MARANHÃO · PIAUÍ · CEARÁ · DESDE 2011")}
    </text>
    <text x="80" y="404" fill="#ffffff" font-size="62" font-weight="800">
      ${escapar("Terraplenagem e Locação")}
    </text>
    <text x="80" y="474" fill="#ffffff" font-size="62" font-weight="800">
      ${escapar("de Máquinas Pesadas")}
    </text>
    <text x="80" y="534" fill="#d4d4d8" font-size="30" font-weight="600">
      ${escapar("Sede em Pindaré-Mirim - MA · Do interior às capitais")}
    </text>
  </g>
</svg>`;

await sharp(fundo)
  .composite([
    { input: Buffer.from(texto), top: 0, left: 0 },
    { input: logo, top: 74, left: 80 },
  ])
  .jpeg({ quality: 86, progressive: true })
  .toFile(SAIDA);

const { size } = await sharp(SAIDA)
  .metadata()
  .then(async (m) => ({
    ...m,
    size: (await readFile(SAIDA)).length,
  }));

console.log(`ok ${SAIDA}  ${LARGURA}x${ALTURA}  ${Math.round(size / 1024)} KB`);
console.log(`   logo aplicada: ${logoMeta.width}x${logoMeta.height}`);
