# 13 — Anti-spam e UX do formulário de contato

- [ ] Concluída em: ****/****/______
- **Prioridade:** P2
- **Esforço:** 1-2 h
- **Impacto:** 🟡 Médio (protege o canal de leads e a reputação do domínio)
- **Depende de:** task 01 (rotação da chave)

---

## Problema

O formulário (`src/routes/index.tsx:1338+` e `src/lib/send-email.ts`) dispara
e-mail via Resend **sem nenhuma proteção**:

- Sem honeypot
- Sem rate limiting
- Sem CAPTCHA
- Sem validação no servidor além do type-cast do `.validator()`

O `createServerFn` fica exposto como endpoint HTTP. Um script pode chamá-lo em
loop e:

1. Estourar a cota da Resend.
2. Encher a caixa de `atendimento@grupomvconstrutora.com.br`, fazendo o cliente
   perder lead real no meio do lixo.
3. Queimar a reputação de envio do domínio — e aí os e-mails legítimos começam a
   cair em spam.

Agravante: até a task 01 ser concluída, a chave da API está pública.

---

## Parte A — Validação no servidor

`src/lib/send-email.ts:11-13` hoje só faz um type-cast:

```ts
.validator((data: ContactData) => data)
```

Isso **não valida nada** em runtime — é só TypeScript. O `contactSchema` do Zod
existe, mas roda apenas no cliente (`src/routes/index.tsx:236`), onde qualquer um
pode contorná-lo.

Mover o schema para um arquivo compartilhado e validar dos dois lados:

```ts
// src/lib/contact-schema.ts
import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  telefone: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .regex(/^[\d\s()+-]+$/),
  mensagem: z.string().trim().min(10).max(1000),
  // honeypot: precisa chegar vazio
  website: z.string().max(0).optional(),
});
```

```ts
// src/lib/send-email.ts
.validator((data: unknown) => contactSchema.parse(data))
```

Assim o servidor rejeita payload malformado antes de chamar a Resend.

---

## Parte B — Honeypot

Campo invisível que humano não preenche e bot preenche.

```jsx
<div className="absolute -left-[9999px]" aria-hidden="true">
  <label htmlFor="website">Não preencha este campo</label>
  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
</div>
```

No servidor, se `website` vier preenchido, **retornar sucesso sem enviar nada** —
o bot acha que funcionou e não tenta outra estratégia.

> Usar posicionamento fora da tela, não `display: none`. Bots modernos ignoram
> campos com `display: none`.

---

## Parte C — Rate limiting

Limitar por IP: máximo de **3 envios a cada 10 minutos**.

Como o deploy é serverless (Vercel), um `Map` em memória não é confiável entre
invocações. Opções:

1. **Vercel KV / Upstash Redis** — correto e simples.
2. **Timestamp assinado**: o cliente recebe um token com validade curta ao abrir
   a página e o envia junto. Bloqueia envio automatizado sem estado no servidor.
3. **Mitigação mínima**: exigir que o formulário fique aberto por ao menos 3
   segundos antes do envio (bot preenche instantaneamente).

Para o volume deste site, honeypot + validação no servidor + o item 3 já resolvem
a maior parte. Se o spam persistir, partir para Turnstile (Parte D).

---

## Parte D — CAPTCHA (se necessário)

**Cloudflare Turnstile** é preferível ao reCAPTCHA: grátis, sem cookie de
rastreamento, invisível na maioria dos casos e melhor para LGPD.

Implementar só se o spam realmente aparecer. Toda fricção a mais no formulário
custa lead.

---

## Parte E — UX do formulário

### E1. Trocar o `alert()`

`src/routes/index.tsx:685-686`:

```ts
} catch (error) {
  console.error(error);
  alert("Erro ao enviar mensagem.");
}
```

`alert()` é bloqueante, feio e não combina com o restante do site. O `sonner` já
está instalado:

```ts
import { toast } from "sonner";

catch (error) {
  console.error(error);
  toast.error("Não foi possível enviar. Tente pelo WhatsApp ou ligue para (98) 99236-8928.");
}
```

Note que a mensagem de erro **oferece um caminho alternativo** — se o formulário
falhar, o lead não se perde.

Adicionar `<Toaster />` no root.

### E2. Estado de carregamento

Verificar se o botão de envio desabilita e mostra "Enviando..." durante a
requisição. Sem isso, o usuário clica várias vezes e gera envios duplicados.

Usar o `isSubmitting` do `react-hook-form`.

### E3. Máscara de telefone

O campo aceita `^[\d\s()+-]+$` livre. Uma máscara `(00) 00000-0000` reduz erro de
digitação — e telefone errado é lead perdido.

### E4. Mensagem de sucesso acessível

O `setSent(true)` (linha 678) muda o texto na tela, mas leitor de tela não anuncia.
Envolver em `<div role="status" aria-live="polite">`.

### E5. Confirmação para o cliente final

Hoje só a empresa recebe e-mail. Enviar também uma confirmação para quem preencheu
("Recebemos sua solicitação, retornamos em até X horas") aumenta a percepção de
profissionalismo — e reduz o cliente procurar o concorrente enquanto espera.

### E6. Registrar o lead fora do e-mail

Se a caixa de e-mail falhar, o lead se perde para sempre. Vale gravar cada envio
também numa planilha ou banco simples (Vercel KV, Google Sheets via webhook).

---

## Critério de aceite

- [ ] `contactSchema` validando no servidor.
- [ ] Honeypot implementado e testado.
- [ ] Envio com honeypot preenchido não gera e-mail.
- [ ] Alguma forma de rate limiting ativa.
- [ ] `alert()` substituído por toast com alternativa de contato.
- [ ] Botão desabilitado durante o envio.
- [ ] Mensagem de sucesso com `aria-live`.
- [ ] E-mail de confirmação para o remetente.

## Validação

```bash
# Deve ser rejeitado pela validação do servidor
curl -X POST https://www.grupomvconstrutora.com.br/_serverFn/sendEmail \
  -H "Content-Type: application/json" \
  -d '{"nome":"x","email":"invalido","telefone":"1","mensagem":"x"}' -i | head -5
```

(Confirmar o caminho real do endpoint no build do TanStack Start.)

Testar no navegador: envio normal, envio com honeypot preenchido, envio com
e-mail inválido e 5 envios seguidos.
