# BLOCO-B5 — Reading Practice 5 · Summary Cloze

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Adicionar o tipo formal `summary_cloze`: um resumo do texto de Reading com lacunas inline para o aluno completar usando palavras do próprio texto.

## Arquivos criados

- `fluency-clean/src/reading/readingSummaryClozeGenerator.js`
- `fluency-clean/src/practice/components/SummaryClozeExercise.jsx`
- `fluency-clean/src/styles/practice-summary-cloze.css`
- `fluency-clean/docs/BLOCO-B5-READING-PRACTICE-5-SUMMARY-CLOZE-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeTypes.js`
- `fluency-clean/src/practice/core/PracticePurityMatrix.js`
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/reading/readingJsonContract.js`
- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/main.jsx`

## Implementação

- Adicionado `QUESTION_TYPES.SUMMARY_CLOZE = 'summary_cloze'`.
- Adicionado `SUMMARY_CLOZE` como `core` apenas para Reading na `PracticePurityMatrix`.
- Criado `readingSummaryClozeGenerator.js`.
- `readingJsonContract.js` agora aceita e pede `summaryCloze`.
- `PracticeNormalizer.js` expõe `context.summaryCloze` somente para Reading.
- `readingBuilder.js` gera 1 questão `summary_cloze` quando a IA fornecer `summaryCloze` válido.
- `builderUtils.js` preserva `summaryText` e `blanks`.
- `PracticeQualityGate.js` valida `summary_cloze` separadamente.
- `PracticeAnswerChecker.js` compara lacuna por lacuna.
- `PracticePlanAdapter.js` mapeia `SUMMARY_CLOZE` para `summaryCloze`.
- `PracticeFullscreen.jsx` renderiza `SummaryClozeExercise`.
- `main.jsx` importa `practice-summary-cloze.css`.

## Regras pedagógicas

- O builder não inventa resumo.
- Se a IA não fornecer `summaryCloze`, nada é gerado.
- A1/A2: máximo 2 lacunas.
- B1+: máximo 5 lacunas.
- 70% das lacunas corretas = resposta correta.
- Acerto parcial vira `near`, com retry e sem perder vida.
- Zero acertos vira incorreto.

## Compatibilidade preservada

- Não foi alterado `ReadingLesson.jsx`.
- Não foi alterada a aba Reading.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Não foi criada UI técnica.

## Fim da Fase B

B1–B5 implementados.

Próximo bloco recomendado:

`BLOCO-C1-GRAMMAR-1-LEVEL-POLICY-LAB`.
