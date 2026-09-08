# 02 — Comprimir imagens e vídeos (WebP/AVIF + lazy + preload correto)

- [ ] Concluída em: ****/****/______
- **Prioridade:** P0
- **Esforço:** 2-3 h
- **Impacto:** 🔴 Altíssimo — sozinha leva o Performance mobile de 65 para ~95
- **Depende de:** nada

> **STATUS (02/09/2026 — implementado)**
> ✅ `scripts/otimizar-imagens.mjs` criado; 29 imagens convertidas para WebP (63,89 MB → 3,56 MB, −94,4%).
> ✅ Imports apontando para `src/assets/otimizadas/`; 2 imports mortos removidos.
> ✅ `loading="lazy"` + `width`/`height` + `decoding="async"` em 9 das 11 imagens; as 2 acima da dobra com `fetchPriority="high"`.
> ✅ Vídeos **migrados para o YouTube** (canal @GrupoMVConstrutora) com player em padrão
> _facade_: a página mostra a capa e só monta o iframe no clique. `public/videos/` (19 MB)
> removido do repositório. Zero request ao YouTube antes do play.
> ✅ Preloads automáticos do React caíram de 10 para 2.
> 📊 Imagens carregadas de imediato: **12.966 KB → 137 KB**.
> ⏳ Medição final do Lighthouse só após o deploy.

---

## Problema

A home transfere **15,4 MB**, dos quais **12,7 MB são imagens PNG não otimizadas**.
No mobile o LCP é de **35,5 segundos** — nota **0/100** nesse item.

### Evidência medida (Lighthouse 12.8.2, 02/09/2026, mobile)

| Métrica                            | Valor                   | Meta     |
| ---------------------------------- | ----------------------- | -------- |
| LCP                                | **35,5 s**              | < 2,5 s  |
| FCP                                | 3,5 s                   | < 1,8 s  |
| Peso total                         | 15,4 MB                 | < 1,5 MB |
| Imagens                            | 12,7 MB em 12 arquivos  | —        |
| "Serve images in next-gen formats" | economia de **11,8 MB** | —        |
| "Properly size images"             | economia de **7,6 MB**  | —        |

Elemento LCP identificado:
`<img src="/assets/colaboradores-*.png">` — a primeira foto do slideshow do hero.

### Piores ofensores (arquivo original em `src/assets/`)

| Arquivo                 | Tamanho     | Onde aparece                                |
| ----------------------- | ----------- | ------------------------------------------- |
| `fotodaobra.png`        | **12,7 MB** | slideshow do hero                           |
| `fotodasplacas.png`     | 8,6 MB      | (importado, não usado)                      |
| `fotodaplacatigd.png`   | 8,6 MB      | slideshow do hero                           |
| `andamentodaobra.png`   | 8,5 MB      | slideshow do hero                           |
| `eventoinauguracao.png` | 2,5 MB      | slideshow do hero                           |
| `caminhao.png`          | 1,77 MB     | galeria da frota                            |
| `logomv.png`            | **916 KB**  | cabeçalho, renderizado a **44px de altura** |

Total de `src/assets/`: **77 MB**. Total de `public/videos/`: **19 MB**.

---

## Causa raiz do preload de 13 MB

O `<head>` em produção traz **10 `<link rel="preload" as="image">`**, todos de PNG
pesados. Isso não foi escrito à mão: o **React 19 emite preload automático** para
toda `<img>` renderizada no SSR que **não** tenha `loading="lazy"`.

Ou seja: adicionar `loading="lazy"` nas imagens abaixo da dobra **remove** o
preload automaticamente. Isso é verificável — ver seção de validação.

---

## Passos

### 1. Instalar o sharp como dependência de desenvolvimento

```bash
npm i -D sharp
```

### 2. Script de conversão

Criar `scripts/otimizar-imagens.mjs`:

```js
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ENTRADA = "src/assets";
const SAIDA = "src/assets/otimizadas";

// Largura máxima por uso. Nenhuma imagem do site é exibida acima de 1600px.
const LARGURA_MAX = 1600;
const LARGURA_LOGO = 240;

await mkdir(SAIDA, { recursive: true });

let antes = 0,
  depois = 0;

for (const arquivo of await readdir(ENTRADA)) {
  if (!/\.(png|jpe?g)$/i.test(arquivo)) continue;

  const origem = path.join(ENTRADA, arquivo);
  const base = arquivo.replace(/\.(png|jpe?g)$/i, "");
  const largura = /logo/i.test(base) ? LARGURA_LOGO : LARGURA_MAX;

  antes += (await stat(origem)).size;

  await sharp(origem)
    .resize({ width: largura, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(SAIDA, `${base}.webp`));

  depois += (await stat(path.join(SAIDA, `${base}.webp`))).size;
  console.log(`✓ ${base}.webp`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\n${mb(antes)} MB → ${mb(depois)} MB  (−${(100 - (depois / antes) * 100).toFixed(0)}%)`,
);
```

Rodar:

```bash
node scripts/otimizar-imagens.mjs
```

Conferir visualmente algumas imagens convertidas antes de seguir. Se alguma ficar
com artefato visível, reprocessar aquele arquivo com `quality: 85`.

### 3. Trocar os imports

Em `src/routes/index.tsx`, linhas 29-61, trocar:

```diff
-import patrol from "@/assets/patrol.png";
+import patrol from "@/assets/otimizadas/patrol.webp";
```

...e assim para os 33 imports. Depois de validar, apagar os PNG originais de
`src/assets/` (eles continuam no histórico do Git se precisar).

### 4. Remover imports mortos

Estes são importados mas nunca usados — removê-los tira peso do bundle:

- `fotodasplacas` (8,6 MB) — linha 45
- `fotoalan.png` — não é importado, mas está na pasta (1,5 MB)
- `tresescavadeiras.png` — na pasta, não importado (1,2 MB)
- `alanemaquinas` — importado na linha 52, verificar uso

Conferir com:

```bash
for f in src/assets/*.png; do n=$(basename "$f" .png); grep -q "$n" src/routes/index.tsx || echo "NÃO USADO: $f"; done
```

### 5. Lazy loading + dimensões

Em **todas** as `<img>` abaixo da dobra, adicionar:

```jsx
loading="lazy"
decoding="async"
width={1600}
height={1067}
```

Aplicar em:

- `HeroBackgroundSlideshow` — linha ~523: **exceto a primeira**. A imagem inicial
  deve ter `fetchPriority="high"` e **não** ter `loading="lazy"` (é o LCP).
- `diferenciaisImages` — linha ~557: todas com `lazy`.
- Galeria da frota — linha ~853: todas com `lazy`.
- Lightbox — linhas ~939 e ~984: todas com `lazy`.
- "Quem somos" — linha ~1142: `lazy`.
- Logo do cabeçalho — linha ~698: **não** lazy (está na dobra), mas o arquivo
  precisa cair de 916 KB para < 20 KB.
- Logo do rodapé — linha ~1454: `lazy`.

> Atenção: as imagens do slideshow do hero trocam a cada 5 s. Só a **primeira**
> deve ser eager. As demais podem ser pré-carregadas por JS após o `load`, se
> necessário.

### 6. Vídeos

`public/videos/` tem 19 MB em 5 arquivos MP4 e o primeiro toca com `autoPlay`
(`src/routes/index.tsx:432`), baixando 2,5 MB sem o usuário pedir.

Recomprimir com ffmpeg (H.264, CRF 28, 720p, áudio removido — os vídeos são mudos
por padrão de qualquer forma):

```bash
for f in public/videos/*.mp4; do
  ffmpeg -i "$f" -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an \
    -movflags +faststart "${f%.mp4}-otim.mp4"
done
```

Meta: de ~3,8 MB para ~500 KB por vídeo.

No componente `VideoSlideshow` (linha ~412):

```diff
+preload="none"
-autoPlay
```

E disparar o `play()` só quando a seção entrar na viewport, via `IntersectionObserver`.
Manter o `poster` (agora em WebP) para a seção não ficar preta antes do play.

---

## Critério de aceite

- [ ] Nenhum arquivo em `src/assets/otimizadas/` acima de 250 KB.
- [ ] Logo do cabeçalho abaixo de 20 KB.
- [ ] Nenhum vídeo em `public/videos/` acima de 800 KB.
- [ ] Peso total da home abaixo de **1,0 MB**.
- [ ] LCP mobile abaixo de **2,0 s**.
- [ ] Performance mobile ≥ **95**.
- [ ] Nenhum import de imagem não utilizado.
- [ ] Inspeção visual: nenhuma imagem com artefato de compressão perceptível.

## Validação

```bash
# Peso das imagens servidas em produção
curl -s https://www.grupomvconstrutora.com.br/ > /tmp/mv.html
grep -ao '/assets/[a-zA-Z0-9_-]*\.\(webp\|png\|avif\)' /tmp/mv.html | sort -u | \
  while read p; do
    printf "%6s KB  %s\n" "$(($(curl -s -o /dev/null -w '%{size_download}' "https://www.grupomvconstrutora.com.br$p")/1024))" "$p"
  done

# Confirmar que os preloads automáticos sumiram (deve sobrar 1, o do LCP)
grep -ao 'rel="preload" as="image"' /tmp/mv.html | wc -l

# Lighthouse depois
npx --yes lighthouse@12 https://www.grupomvconstrutora.com.br/ --output=html \
  --output-path=./lh-depois --only-categories=performance \
  --chrome-flags="--headless=old --disable-gpu --no-sandbox" --max-wait-for-load=120000
```
