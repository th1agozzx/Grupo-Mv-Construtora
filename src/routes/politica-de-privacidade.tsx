import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionTitle } from "@/components/site/SectionTitle";
import { EMPRESA, SITE_URL } from "@/config/empresa";
import { breadcrumbSchema } from "@/lib/schema";

const URL_PAGINA = `${SITE_URL}/politica-de-privacidade`;
const ATUALIZADO_EM = "2 de setembro de 2026";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | MV Construtora" },
      {
        name: "description",
        content:
          "Como a MV Construtora coleta, usa e protege os dados pessoais enviados pelo formulário de contato do site, conforme a LGPD (Lei 13.709/2018).",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Política de Privacidade | MV Construtora" },
      { property: "og:url", content: URL_PAGINA },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
  component: PoliticaPrivacidade,
});

function PoliticaPrivacidade() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Início", "/"],
              ["Política de Privacidade", "/politica-de-privacidade"],
            ]),
          ),
        }}
      />

      <main id="conteudo" className="pt-[76px]">
        <section className="mx-auto max-w-3xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
          <Breadcrumbs
            itens={[{ rotulo: "Início", para: "/" }, { rotulo: "Política de Privacidade" }]}
          />
          <div className="mt-8">
            <SectionTitle as="h1" eyebrow="LGPD" title="Política de Privacidade" />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Última atualização: <time dateTime="2026-09-02">{ATUALIZADO_EM}</time>
          </p>

          <div className="mt-10 space-y-8 leading-7 text-zinc-700">
            <section>
              <h2 className="text-xl font-semibold text-zinc-950">1. Quem é o controlador</h2>
              <p className="mt-3">
                {EMPRESA.nome}, inscrita no CNPJ {EMPRESA.cnpj}, com sede em {EMPRESA.endereco}, é a
                controladora dos dados pessoais tratados por meio deste site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">2. Quais dados coletamos</h2>
              <p className="mt-3">
                O formulário do site <strong>não envia dados para nenhum servidor nosso</strong>.
                Ele apenas monta uma mensagem com o que você digitou e abre o WhatsApp da empresa —
                o envio é seu, pelo seu próprio aplicativo. Os campos são:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-red-600">
                <li>Nome (obrigatório)</li>
                <li>Descrição da necessidade (obrigatório)</li>
                <li>Serviço e cidade da obra (opcionais)</li>
                <li>
                  Telefone e e-mail (opcionais, apenas se você preferir outro canal de retorno)
                </li>
              </ul>
              <p className="mt-3">
                A partir do momento em que você envia a mensagem, o tratamento passa a ocorrer na
                nossa conta de WhatsApp e no aplicativo da Meta, conforme a política de privacidade
                dela.
              </p>
              <p className="mt-3">
                Não coletamos dados sensíveis nem dados de crianças e adolescentes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">3. Para que usamos</h2>
              <p className="mt-3">
                Os dados são usados exclusivamente para responder à sua solicitação de orçamento ou
                de informação e para o contato comercial decorrente dela. Não vendemos, alugamos nem
                cedemos seus dados para terceiros com finalidade publicitária.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">4. Base legal</h2>
              <p className="mt-3">
                O tratamento se apoia no artigo 7º, inciso V, da Lei 13.709/2018 (LGPD) — execução
                de procedimentos preliminares relacionados a contrato do qual você é parte, a seu
                pedido — e, quando aplicável, no seu consentimento, manifestado ao enviar o
                formulário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">5. Com quem compartilhamos</h2>
              <p className="mt-3">
                Utilizamos operadores que tratam dados em nosso nome, estritamente para viabilizar o
                funcionamento do site:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-red-600">
                <li>
                  <strong>WhatsApp / Meta</strong> — canal por onde a sua mensagem chega até nós.
                </li>
                <li>
                  <strong>Vercel</strong> — hospedagem do site.
                </li>
                <li>
                  <strong>Google Maps</strong> — o mapa incorporado na seção de localização é
                  carregado pelo Google, que pode registrar dados de acesso conforme a política de
                  privacidade do próprio Google.
                </li>
                <li>
                  <strong>YouTube</strong> — os vídeos da galeria ficam hospedados no YouTube. O
                  player só é carregado quando você clica em reproduzir: até esse momento, nenhuma
                  informação é enviada ao YouTube. Ao dar play, usamos o domínio
                  youtube-nocookie.com, que não grava cookies de rastreamento publicitário, mas o
                  Google ainda pode registrar dados de reprodução conforme a política dele.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">6. Por quanto tempo guardamos</h2>
              <p className="mt-3">
                Mantemos os dados pelo tempo necessário ao atendimento da solicitação e ao
                relacionamento comercial decorrente, ou até que você solicite a exclusão,
                ressalvadas as hipóteses de guarda obrigatória previstas em lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">7. Seus direitos</h2>
              <p className="mt-3">
                A LGPD garante a você o direito de confirmar a existência de tratamento, acessar,
                corrigir, anonimizar, bloquear, eliminar e portar seus dados, além de revogar o
                consentimento a qualquer momento.
              </p>
              <p className="mt-3">
                Para exercer qualquer desses direitos, escreva para{" "}
                <a
                  href={`mailto:${EMPRESA.email}`}
                  className="font-semibold text-zinc-950 underline decoration-red-600 underline-offset-4"
                >
                  {EMPRESA.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">8. Cookies</h2>
              <p className="mt-3">
                Este site não utiliza cookies próprios de rastreamento publicitário. Serviços
                incorporados de terceiros, como o mapa do Google e o player de vídeo, podem gravar
                cookies próprios, sobre os quais não temos controle. O player de vídeo só é
                carregado após o seu clique — antes disso, nada é solicitado ao YouTube.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-950">9. Alterações</h2>
              <p className="mt-3">
                Esta política pode ser atualizada. A data da última revisão é sempre indicada no
                topo da página.
              </p>
            </section>
          </div>

          {/*
            NOTA PARA A EQUIPE (remover antes de considerar a task 10 concluída):
            Este texto é uma base técnica de conformidade, não parecer jurídico.
            Como a empresa atende obra pública, vale a revisão de um advogado.
            Se a task 12 adicionar o GA4, esta política precisa citá-lo na seção 5
            e a seção 8 precisa ser revista (o GA4 usa cookies).
          */}
        </section>
      </main>
    </>
  );
}
