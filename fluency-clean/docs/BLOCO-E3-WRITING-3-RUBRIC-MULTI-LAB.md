# BLOCO-E3 — Writing 3 · Rubrica Multi-Critério

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/writing/writingRubric.js` com rubrica multi-critério para avaliar produção livre de Writing por nível.

Para A1/A2, retorna feedback simples de tentativa.
Para B1+, retorna pontuação por critério, score total ponderado, erros e sugestão de reescrita.

## Arquivos criados

- `fluency-clean/src/writing/writingRubric.js`
- `fluency-clean/docs/BLOCO-E3-WRITING-3-RUBRIC-MULTI-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/writingBuilder.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/practice/components/PracticeFeedback.jsx`

## Rubrica

Critérios:

- Gramática: 30%
- Vocabulário: 25%
- Coesão: 20%
- Tarefa atendida: 25%

## Exports criados

- `WRITING_ERROR_TYPES`
- `evaluateWritingResponse({ studentText, modelAnswer, level })`
- `formatRubricFeedback(evaluation)`

## Integração real

### Builder

`writingBuilder.js` agora marca `write_short` de B1+ com:

```js
writingRubric: {
  enabled: true,
  level,
  passingScore,
  modelAnswer,
}
```

### Metadados

`builderUtils.js` preserva `writingRubric` em `createQuestion`.

### Checker

`PracticeAnswerChecker.js` avalia `WRITE_SHORT` com `writingRubric.enabled` usando:

```js
evaluateWritingResponse(...)
formatRubricFeedback(...)
```

O resultado segue em `rubricResult`.

### Adapter

`PracticePlanAdapter.js` preserva `rubricResult` no resultado enviado ao feedback.

### Feedback

`PracticeFeedback.jsx` renderiza:

- pontuação total;
- critérios;
- erros;
- sugestão de reescrita.

## Regras implementadas

- A1/A2: sem rubrica detalhada; apenas tentativa.
- B1+: 4 critérios com pontuação.
- Score total ponderado.
- Score sempre entre 0 e 100.
- Produção com menos de 3 caracteres retorna `attempted: false`.
- Score baixo gera sugestão de reescrita.

## Compatibilidade preservada

- Não foi alterado `WritingLesson.jsx`.
- Não foi alterado `writingJsonContract.js`.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `writingRubric.js` criado.
- [x] A1/A2 retornam tentativa sem critérios.
- [x] B1+ retorna `scores` com 4 critérios.
- [x] `totalScore` é ponderado.
- [x] `PracticeFeedback.jsx` renderiza rubrica quando presente.
- [x] Menos de 3 caracteres retorna `attempted: false`.
- [x] Score limitado entre 0 e 100.

## Próximo bloco recomendado

`BLOCO-E4-WRITING-4-PRACTICE-BUILDER-V2-LAB`.
