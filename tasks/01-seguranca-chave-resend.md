# 01 — Rotacionar a chave da Resend e proteger o .gitignore

- [ ] Concluída em: ****/****/______
- **Prioridade:** P0 (risco ativo)
- **Esforço:** 15 min
- **Impacto:** 🔴 Segurança
- **Depende de:** nada

> **STATUS (02/09/2026 — implementado)**
> ✅ `.env` removido do versionamento (`git rm --cached`), `.gitignore` atualizado, `.env.example` criado.
> ⏳ **PENDENTE COM VOCÊ:** rotacionar a chave no painel da Resend e cadastrar a nova na Vercel.
> Enquanto isso não for feito, a chave antiga segue exposta no histórico do repositório público.

---

## Problema

O arquivo `.env` está **versionado no Git** e o repositório
`github.com/KaykyOne/site-Grupo-Mv-Construtora` **é público**. A chave
`RESEND_API_KEY` está exposta na internet para qualquer pessoa.

### Evidência

```bash
$ git ls-files | grep -i env
.env

$ git log --oneline -1 -- .env
fd6522f .

$ grep -n "env" .gitignore
(nenhum resultado — o .gitignore não tem NENHUMA regra para .env)

$ curl -s -o /dev/null -w "%{http_code}" https://github.com/KaykyOne/site-Grupo-Mv-Construtora
200   ← repositório público, sem autenticação
```

### Risco concreto

Com essa chave, um terceiro pode disparar e-mails **como**
`atendimento@grupomvconstrutora.com.br`. Consequências:

- Envio de phishing em nome da empresa.
- Queima da reputação do domínio → e-mails legítimos (inclusive os leads do
  formulário) passam a cair em spam.
- Estouro da cota da conta Resend.

---

## Passos

### 1. Rotacionar a chave (fazer PRIMEIRO)

1. Acessar o painel da Resend → **API Keys**.
2. **Revogar** a chave atual.
3. Criar uma nova chave com permissão mínima (**Sending access**, não Full access).
4. Copiar o novo valor.

### 2. Cadastrar a nova chave na Vercel

Painel da Vercel → projeto → **Settings → Environment Variables**:

- Name: `RESEND_API_KEY`
- Value: (nova chave)
- Environments: Production, Preview, Development

Depois, **redeploy** para a variável entrar em vigor.

### 3. Tirar o .env do versionamento

```bash
git rm --cached .env
printf '\n# Variáveis de ambiente\n.env\n.env.*\n!.env.example\n' >> .gitignore
```

### 4. Criar um .env.example (documentação, sem segredo)

```
# Chave da API Resend — obter em https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

### 5. Commitar

```bash
git add .gitignore .env.example
git commit -m "chore(seguranca): remove .env do versionamento e adiciona .env.example"
git push
```

---

## ⚠️ Sobre o histórico do Git

A chave antiga **continua no histórico** mesmo depois do `git rm --cached`.
Limpar exigiria reescrever o histórico (`git filter-repo` / BFG) + force-push.

**Não faça isso neste projeto.** O `AGENTS.md` avisa que force-push quebra o
histórico do lado do Lovable e o cliente pode perder o histórico do projeto.

> Rotacionar a chave (passo 1) **já elimina o risco real** — a chave que está no
> histórico passa a ser um texto inútil. Essa é a mitigação correta aqui.

Se o cliente exigir limpeza do histórico, avaliar antes tornar o repositório
privado, que resolve o mesmo problema sem tocar no histórico.

---

## Recomendação adicional

Tornar o repositório **privado** (Settings → General → Danger Zone → Change
visibility). Não há motivo para o código-fonte comercial de um cliente ficar
público, e isso também remove a exposição do histórico.

---

## Critério de aceite

- [ ] Chave antiga revogada no painel da Resend.
- [ ] Nova chave cadastrada na Vercel nos 3 ambientes.
- [ ] Redeploy feito e formulário de contato testado com envio real.
- [ ] `git ls-files | grep env` retorna apenas `.env.example`.
- [ ] `.gitignore` contém `.env`.
- [ ] (Recomendado) Repositório marcado como privado.

## Validação

```bash
git ls-files | grep -i env        # deve mostrar só .env.example
grep -c "^\.env$" .gitignore      # deve retornar 1
```

E enviar o formulário em produção conferindo se o e-mail chega em
`atendimento@grupomvconstrutora.com.br`.
