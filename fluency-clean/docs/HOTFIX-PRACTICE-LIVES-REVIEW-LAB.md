# HOTFIX — Practice Lives and Review Mode

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Problema

Durante a Prática Profunda, o usuário relatou que errou várias vezes e as vidas pareciam não diminuir. No print, a sessão já estava em `Modo revisão`, mas os corações ainda pareciam visualmente ativos.

## Causas prováveis

1. O checker tratava respostas textuais relativamente diferentes como `near`, sem perder vida.
2. O modo revisão reaproveitava os corações visualmente, deixando a sensação de que ainda havia vidas.

## Correções

- `PracticeAnswerChecker.js` agora é mais rígido com `WRITE_SHORT` em Reading:
  - erro curto demais não entra como `near`;
  - threshold de similaridade aumentado;
  - erros claros perdem vida.

- Criado CSS:
  - `fluency-clean/src/styles/practice-lives-hotfix.css`

- Importado em:
  - `fluency-clean/src/main.jsx`

- Em modo revisão, os corações ficam apagados/dourados e aparece o rótulo:
  - `Revisão sem vidas`

## Compatibilidade

- Não alterado `main`.
- Não alterado `rewrite-fluency-clean`.
- Não alterado `bundle.js`.
- Não alterado backend Azure privado.
