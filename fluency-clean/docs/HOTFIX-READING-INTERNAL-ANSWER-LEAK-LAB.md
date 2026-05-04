# HOTFIX — Reading Internal Answer Leak

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Problema

No iPhone, os exercícios internos de Reading em `Verdadeiro ou falso` exibiam `Resposta esperada: verdadeiro` e `Prova no texto` antes de o aluno responder.

Isso quebrava a regra pedagógica de não revelar gabarito antes da tentativa.

## Causa

O componente `InternalReadingExercises` renderiza `span` e `small` com resposta/evidência. O CSS antigo tentava esconder por padrão, mas liberava em `:hover`, `:active` e `:focus-within`.

No iPhone, toque/rolagem podia ativar esse estado e revelar o gabarito sem tentativa real.

## Correção

Criado CSS modular:

- `fluency-clean/src/styles/reading-internal-answer-leak-hotfix.css`

Importado em:

- `fluency-clean/src/main.jsx`

O hotfix força os elementos de resposta/evidência dos exercícios Verdadeiro/Falso internos a permanecerem ocultos mesmo em `hover`, `active` e `focus-within`.

## Compatibilidade

- Não alterado `ReadingLesson.jsx`.
- Não alterado `bundle.js`.
- Não alterado backend Azure privado.
- Não alterado `main`.
- Correção aplicada somente na branch lab.

## Observação

Este hotfix é visual e seguro. Um bloco futuro pode substituir o Verdadeiro/Falso interno por interação real com botões, mas este hotfix impede o vazamento imediato do gabarito.
