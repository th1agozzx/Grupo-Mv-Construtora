// Gera a versão mobile do elemento LCP sem alterar a foto original usada em telas grandes.
import sharp from "sharp";

await sharp("src/assets/otimizadas/colaboradores.webp")
  .resize({ width: 768, withoutEnlargement: true })
  .webp({ quality: 70, effort: 6 })
  .toFile("src/assets/otimizadas/colaboradores-mobile.webp");

console.log("[imagens] versão mobile do hero gerada");
