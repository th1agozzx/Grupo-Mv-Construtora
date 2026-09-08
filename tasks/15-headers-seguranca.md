# 15 — Headers de segurança HTTP

- [ ] Concluída em: ****/****/______
- **Prioridade:** P3
- **Esforço:** 30 min
- **Impacto:** 🟢 Baixo em ranking, relevante como sinal de qualidade
- **Depende de:** nada

---

## Problema

O site responde com apenas **um** header de segurança.

### Evidência

```bash
curl -sI https://www.grupomvconstrutora.com.br/ | grep -iE "content-security|x-frame|x-content|referrer|permissions|strict-transport"
# Strict-Transport-Security: max-age=63072000
```

Ausentes:

| Header                                | Protege contra                                      |
| ------------------------------------- | --------------------------------------------------- |
| `X-Content-Type-Options`              | MIME sniffing                                       |
| `Referrer-Policy`                     | vazamento de URL para terceiros                     |
| `X-Frame-Options` / `frame-ancestors` | clickjacking                                        |
| `Permissions-Policy`                  | acesso indevido a câmera, microfone, geolocalização |
| `Content-Security-Policy`             | XSS                                                 |

O HSTS (único presente) vem por padrão da Vercel.

> Nota honesta: o Lighthouse já dá **100 em Boas Práticas** hoje — ele só reporta
> CSP como item informativo. Esta task não muda a nota. O valor está em higiene
> de segurança e em ter o que mostrar caso o cliente atenda órgão público com
> requisito de conformidade.

---

## Passos

### 1. Headers básicos no `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
        }
      ]
    }
  ]
}
```

> Ver também a **task 05, passo 5**, sobre remover o `rewrites` morto do mesmo
> arquivo. As duas mudanças podem ir no mesmo commit.

### 2. CSP (com cuidado)

CSP mal configurado quebra o site em silêncio. Fazer em duas etapas.

**Etapa 1 — só relatar, sem bloquear:**

```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.google.com; connect-src 'self' https://www.google-analytics.com
```

Rodar assim por 1-2 semanas, monitorando o console do navegador.

**Etapa 2:** só depois de zero violação, trocar para `Content-Security-Policy`.

### Origens que o site realmente usa

Levantadas do código:

| Origem                     | Uso                  | Onde             |
| -------------------------- | -------------------- | ---------------- |
| `fonts.googleapis.com`     | CSS da fonte Manrope | `__root.tsx:97`  |
| `fonts.gstatic.com`        | arquivos da fonte    | `__root.tsx:94`  |
| `www.google.com/maps`      | iframe do mapa       | `index.tsx:1266` |
| `api.whatsapp.com`         | links de WhatsApp    | `index.tsx:73`   |
| `www.googletagmanager.com` | GA4 (após task 12)   | task 12          |
| `www.google-analytics.com` | GA4 (após task 12)   | task 12          |

> `'unsafe-inline'` em `script-src` é necessário porque o TanStack Start injeta
> scripts inline de hidratação. Remover isso exigiria nonce por requisição —
> possível, mas fora do escopo. Documentar a decisão em vez de deixar implícita.

### 3. Ordem em relação à task 12

Se o GA4 for instalado depois desta task, o CSP vai bloqueá-lo. Fazer a **task 12
primeiro** ou já incluir as origens do Google desde o início (como acima).

---

## Critério de aceite

- [ ] Os 4 headers básicos presentes em todas as respostas.
- [ ] Nota **A** ou superior no [securityheaders.com](https://securityheaders.com).
- [ ] CSP em modo report-only por pelo menos 1 semana sem violação.
- [ ] Mapa, fontes, WhatsApp e analytics funcionando após ativar o CSP.
- [ ] Lighthouse Boas Práticas mantido em 100 (sem regressão).

## Validação

```bash
curl -sI https://www.grupomvconstrutora.com.br/ | grep -iE "x-content-type|referrer-policy|x-frame|permissions-policy|content-security"
```

E rodar o scan em [securityheaders.com](https://securityheaders.com/?q=https://www.grupomvconstrutora.com.br).

Testar manualmente após ativar o CSP: mapa carrega, fontes carregam, botão de
WhatsApp abre, formulário envia, vídeos tocam.
