import { SITE_BASE_PATH } from "@/config/navegacao";

function escaparHtml(texto: string) {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatarLinha(texto: string) {
  return escaparHtml(texto)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\((\/[a-z0-9-/#]+)\)/g,
      (_, rotulo: string, caminho: string) =>
        `<a href="${SITE_BASE_PATH}${caminho.replace(/^\//, "")}">${rotulo}</a>`,
    );
}

/** Renderizador enxuto para os posts versionados; Markdown não executa HTML arbitrário. */
export function ConteudoMarkdown({ conteudo }: { conteudo: string }) {
  const linhas = conteudo.split(/\r?\n/);
  const blocos: React.ReactNode[] = [];
  let indice = 0;

  while (indice < linhas.length) {
    const linha = linhas[indice].trim();
    if (!linha) {
      indice += 1;
      continue;
    }

    const titulo = linha.match(/^(#{2,3})\s+(.+)$/);
    if (titulo) {
      const Tag = titulo[1].length === 2 ? "h2" : "h3";
      blocos.push(
        <Tag
          key={indice}
          className={
            Tag === "h2"
              ? "mt-12 text-2xl font-semibold tracking-tight sm:text-3xl"
              : "mt-8 text-xl font-semibold"
          }
        >
          {titulo[2]}
        </Tag>,
      );
      indice += 1;
      continue;
    }

    if (linha.startsWith("- ")) {
      const itens: string[] = [];
      while (linhas[indice]?.trim().startsWith("- ")) itens.push(linhas[indice++].trim().slice(2));
      blocos.push(
        <ul key={indice} className="mt-5 list-disc space-y-2 pl-6 leading-7 text-zinc-700">
          {itens.map((item) => (
            <li key={item} dangerouslySetInnerHTML={{ __html: formatarLinha(item) }} />
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\|.+\|$/.test(linha) && /^\|[-:| ]+\|$/.test(linhas[indice + 1]?.trim() ?? "")) {
      const cabecalho = linha
        .split("|")
        .filter(Boolean)
        .map((celula) => celula.trim());
      indice += 2;
      const corpo: string[][] = [];
      while (/^\|.+\|$/.test(linhas[indice]?.trim() ?? ""))
        corpo.push(
          linhas[indice++]
            .trim()
            .split("|")
            .filter(Boolean)
            .map((celula) => celula.trim()),
        );
      blocos.push(
        <div key={indice} className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-zinc-950 text-white">
              <tr>
                {cabecalho.map((celula) => (
                  <th key={celula} className="px-4 py-3 font-semibold">
                    {celula}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {corpo.map((linhaTabela, i) => (
                <tr key={i} className="border-b border-zinc-300">
                  {linhaTabela.map((celula, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 align-top leading-6"
                      dangerouslySetInnerHTML={{ __html: formatarLinha(celula) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const paragrafo: string[] = [linha];
    indice += 1;
    while (
      indice < linhas.length &&
      linhas[indice].trim() &&
      !/^(#{2,3})\s+|^- |^\|/.test(linhas[indice].trim())
    )
      paragrafo.push(linhas[indice++].trim());
    blocos.push(
      <p
        key={indice}
        className="mt-5 leading-8 text-zinc-700"
        dangerouslySetInnerHTML={{ __html: formatarLinha(paragrafo.join(" ")) }}
      />,
    );
  }

  return <div>{blocos}</div>;
}
