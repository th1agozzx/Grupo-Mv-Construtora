// ⚠️ NÃO ESTÁ MAIS EM USO (03/09/2026).
//
// O formulário de contato passou a montar a mensagem e abrir o WhatsApp da
// empresa, em vez de enviar e-mail. Isso eliminou o endpoint HTTP aberto (que
// não tinha honeypot nem rate limiting) e faz o lead cair onde a equipe
// realmente responde.
//
// Este arquivo ficou aqui só para não apagar a integração sem sua decisão.
// Se não for voltar a usar:
//   1. apague este arquivo
//   2. rode `npm uninstall resend`
//   3. revogue a RESEND_API_KEY no painel — ela não precisa ser substituída
//
// Enquanto o arquivo existir, o endpoint continua exposto no build.

import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

type ContactData = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export const sendEmail = createServerFn({
  method: "POST",
})
  .validator((data: ContactData) => data)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    return await resend.emails.send({
      from: "MV Construtora <mvconstrutoraeimobiliaria@outlook.com>",

      to: ["mvconstrutoraeimobiliaria@outlook.com"],

      replyTo: data.email,

      subject: `🏗️ Novo Orçamento | ${data.nome}`,

      html: `
<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Novo Lead - MV Construtora</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<style>
table {border-collapse:collapse;}
td,th,div,p,a,h1,h2,h3 {font-family:Arial, Helvetica, sans-serif;}
</style>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
  body { margin:0; padding:0; width:100% !important; height:100% !important; }
  a[x-apple-data-detectors] {
    color:inherit !important; text-decoration:none !important;
    font-size:inherit !important; font-family:inherit !important;
    font-weight:inherit !important; line-height:inherit !important;
  }
  @media only screen and (max-width:640px) {
    .mv-wrapper { width:100% !important; }
    .mv-container { width:100% !important; }
    .mv-fluid { width:100% !important; max-width:100% !important; }
    .mv-px { padding-left:20px !important; padding-right:20px !important; }
    .mv-stack { display:block !important; width:100% !important; }
    .mv-hero-title { font-size:22px !important; line-height:28px !important; }
    .mv-badge-top { margin-bottom:14px !important; }
    .mv-card-pad { padding:18px !important; }
    .mv-msg-pad { padding:22px !important; }
    .mv-btn-full { width:100% !important; }
    .mv-btn-full a { display:block !important; width:100% !important; box-sizing:border-box; }
    .mv-footer-pad { padding:32px 20px !important; }
    .mv-two-col { display:block !important; width:100% !important; }
    .mv-two-col-pad { padding-bottom:14px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .mv-bg-body { background-color:#f3f4f6 !important; }
  }
</style>
</head>
<body class="mv-bg-body" style="margin:0; padding:0; background-color:#f0f1f3; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#f0f1f3; opacity:0;">
Novo lead recebido pelo site &nbsp;&#8226;&nbsp; ${data.nome} solicitou contato com a MV Construtora&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
</div>

<center class="mv-wrapper" style="width:100%; background-color:#f0f1f3;">
<!--[if mso]>
<table role="presentation" width="680" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
<![endif]-->

<table role="presentation" class="mv-container" width="680" align="center" cellpadding="0" cellspacing="0" border="0" style="width:680px; max-width:680px; margin:0 auto;">

  <!-- Spacer top -->
  <tr>
    <td style="padding:40px 10px 24px; text-align:center; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
      <span style="display:inline-block; background-color:#ffffff; border:1px solid #e5e5e5; border-radius:100px; padding:8px 18px; font-size:12px; font-weight:700; letter-spacing:1.2px; color:#111111; text-transform:uppercase;">
        &#9679;&nbsp; Novo Lead Recebido
      </span>
    </td>
  </tr>

  <!-- Main Card -->
  <tr>
    <td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 20px 45px rgba(17,17,17,0.10);">

        <!-- Header -->
        <tr>
          <td style="background-color:#111111; background:linear-gradient(135deg,#111111 0%,#1c1c1c 55%,#2a0a0a 100%); padding:36px 40px;" class="mv-px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" valign="middle">
                  <img src="https://grupomvconstrutora.com.br/assets/logomv.png" alt="MV Construtora" width="150" style="display:block; width:150px; max-width:150px; height:auto; border:0;" />
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block; background-color:#dc2626; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:7px 14px; border-radius:100px; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
                    Formul&aacute;rio do Site
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Red accent line -->
        <tr>
          <td style="height:4px; line-height:4px; font-size:0; background-color:#dc2626; background:linear-gradient(90deg,#dc2626 0%,#7a1414 100%);">&nbsp;</td>
        </tr>

        <!-- Title block -->
        <tr>
          <td class="mv-px" style="padding:44px 40px 8px; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
            <p style="margin:0 0 10px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#dc2626;">
              Solicita&ccedil;&atilde;o de Or&ccedil;amento
            </p>
            <h1 class="mv-hero-title" style="margin:0 0 12px; font-size:28px; line-height:34px; font-weight:800; color:#111111;">
              Voc&ecirc; recebeu um novo contato
            </h1>
            <p style="margin:0; font-size:15px; line-height:24px; color:#6b7280;">
              Os dados abaixo foram enviados automaticamente pelo formul&aacute;rio de contato do site da MV Construtora. Responda o quanto antes para n&atilde;o perder a oportunidade.
            </p>
          </td>
        </tr>

        <!-- Info Cards -->
        <tr>
          <td class="mv-px" style="padding:28px 40px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="mv-stack mv-two-col" width="50%" valign="top" style="padding:0 8px 16px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa; border:1px solid #ececec; border-radius:14px;">
                    <tr>
                      <td class="mv-card-pad" style="padding:22px 22px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="34" valign="top">
                              <div style="width:30px; height:30px; border-radius:9px; background-color:#111111; text-align:center; line-height:30px; font-size:14px;">&#128100;</div>
                            </td>
                            <td valign="top" style="padding-left:12px;">
                              <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#9ca3af;">Cliente</p>
                              <p style="margin:0; font-size:16px; font-weight:700; color:#111111; line-height:22px;">${data.nome}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="mv-stack mv-two-col" width="50%" valign="top" style="padding:0 0 16px 8px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa; border:1px solid #ececec; border-radius:14px;">
                    <tr>
                      <td class="mv-card-pad" style="padding:22px 22px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="34" valign="top">
                              <div style="width:30px; height:30px; border-radius:9px; background-color:#111111; text-align:center; line-height:30px; font-size:14px;">&#128222;</div>
                            </td>
                            <td valign="top" style="padding-left:12px;">
                              <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#9ca3af;">Telefone</p>
                              <p style="margin:0; font-size:16px; font-weight:700; color:#111111; line-height:22px;">${data.telefone}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:0 0 4px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa; border:1px solid #ececec; border-radius:14px;">
                    <tr>
                      <td class="mv-card-pad" style="padding:22px 22px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td width="34" valign="top">
                              <div style="width:30px; height:30px; border-radius:9px; background-color:#111111; text-align:center; line-height:30px; font-size:14px;">&#9993;&#65039;</div>
                            </td>
                            <td valign="top" style="padding-left:12px;">
                              <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#9ca3af;">E-mail</p>
                              <p style="margin:0; font-size:16px; font-weight:700; color:#111111; line-height:22px;">${data.email}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message highlight -->
        <tr>
          <td class="mv-px" style="padding:16px 40px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff5f5; border:1px solid #fbdada; border-radius:16px;">
              <tr>
                <td style="background-color:#dc2626; height:5px; line-height:5px; font-size:0; border-radius:16px 16px 0 0;">&nbsp;</td>
              </tr>
              <tr>
                <td class="mv-msg-pad" style="padding:28px 30px 30px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td>
                        <p style="margin:0 0 14px; font-size:13px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:#dc2626;">
                          &#128172;&nbsp; Mensagem do Cliente
                        </p>
                        <p style="margin:0; font-size:16px; line-height:27px; color:#27272a; white-space:pre-line; font-family:Georgia, 'Times New Roman', serif;">
${data.mensagem}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA Button -->
        <tr>
          <td class="mv-px" style="padding:34px 40px 44px; text-align:center;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" class="mv-btn-full">
              <tr>
                <td align="center" style="border-radius:12px; background-color:#dc2626;" bgcolor="#dc2626">
                  <!--[if mso]>
                  <a href="mailto:${data.email}" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="12%" strokecolor="#dc2626" fillcolor="#dc2626">
                  <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">Responder Cliente &rarr;</center>
                  </a>
                  <![endif]-->
                  <!--[if !mso]><!-->
                  <a href="mailto:${data.email}" target="_blank" style="display:inline-block; padding:17px 46px; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:12px; letter-spacing:0.3px;">
                    Responder Cliente &nbsp;&rarr;
                  </a>
                  <!--<![endif]-->
                </td>
              </tr>
            </table>
            <p style="margin:16px 0 0; font-size:12.5px; color:#9ca3af; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
              Ou copie o e-mail: <span style="color:#6b7280; font-weight:600;">${data.email}</span>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- Spacer -->
  <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

  <!-- Footer -->
  <tr>
    <td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111111; border-radius:20px; overflow:hidden;">
        <tr>
          <td class="mv-footer-pad" style="padding:40px 40px 30px; text-align:center;">
            <img src="https://grupomvconstrutora.com.br/assets/logomv.png" alt="MV Construtora" width="130" style="display:block; width:130px; max-width:130px; height:auto; border:0; margin:0 auto 18px;" />
            <p style="margin:0 0 26px; font-size:13px; letter-spacing:0.6px; color:#9ca3af; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
              Loca&ccedil;&otilde;es &nbsp;&#8226;&nbsp; Transportes &nbsp;&#8226;&nbsp; Terraplanagem &nbsp;&#8226;&nbsp; Gest&atilde;o de Obras
            </p>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
              <tr>
                <td style="padding:0 14px; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; color:#d1d5db; border-right:1px solid #2e2e2e;">
                  &#127760;&nbsp; grupomvconstrutora.com.br
                </td>
                <td style="padding:0 14px; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; color:#d1d5db; border-right:1px solid #2e2e2e;">
                  &#9993;&#65039;&nbsp; mvconstrutoraeimobiliaria@outlook.com
                </td>
                <td style="padding:0 0 0 14px; font-family:'Segoe UI', Arial, Helvetica, sans-serif; font-size:13px; color:#d1d5db;">
                  &#128222;&nbsp; (98) 9197-2921
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td style="border-top:1px solid #262626; padding-top:20px; text-align:center;">
                  <p style="margin:0 0 6px; font-size:13px; font-weight:700; color:#ffffff; font-family:'Segoe UI', Arial, Helvetica, sans-serif; letter-spacing:0.3px;">
                    Constru&iacute;mos com solidez. Entregamos com confian&ccedil;a.
                  </p>
                  <p style="margin:0; font-size:11.5px; color:#6b7280; font-family:'Segoe UI', Arial, Helvetica, sans-serif;">
                    Mensagem gerada automaticamente pelo formul&aacute;rio do site da MV Construtora.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="height:40px; line-height:40px; font-size:0;">&nbsp;</td></tr>

</table>

<!--[if mso]>
</td></tr></table>
<![endif]-->
</center>
</body>
</html>
`,
    });
  });
