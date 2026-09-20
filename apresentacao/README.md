# Apresentação institucional — MV Construtora

`apresentacao-mv-construtora.html` é a apresentação pronta: **arquivo único**, com o
logo e as fotos embutidos em base64. Pode ser aberto em qualquer navegador, enviado
por e-mail ou WhatsApp e impresso sem depender de internet (a fonte Montserrat vem do
Google Fonts; sem conexão, cai para a fonte do sistema).

## Usar

1. Abra o arquivo no Chrome ou no Edge.
2. **Editar texto** — liga a edição direta na página. As alterações ficam salvas no
   navegador (`localStorage`), então continuam lá se você fechar e reabrir.
   **Restaurar original** desfaz tudo.
3. **Imprimir / Salvar em PDF** — abre a caixa de impressão. Confira:
   - Destino: *Salvar como PDF*
   - Layout: *Paisagem* · Papel: *A4* · Margens: *Nenhuma*
   - **Marque "Gráficos de plano de fundo"**, senão as áreas coloridas somem.

São 7 páginas A4 paisagem: capa, quem somos, serviços, frota, área de atuação,
como trabalhamos e contato.

## Regerar

O conteúdo vem de `src/data/*.ts` e `src/config/empresa.ts`, copiado para
`gerar.mjs`. Ao mudar serviço, máquina ou cidade no site, atualize também o script:

```bash
node apresentacao/gerar.mjs
```

O script lê `_template.html` (layout e textos), embute as imagens de
`src/assets/otimizadas/` e escreve o HTML final. Edite o template, não o arquivo
gerado — ele é sobrescrito a cada execução.
