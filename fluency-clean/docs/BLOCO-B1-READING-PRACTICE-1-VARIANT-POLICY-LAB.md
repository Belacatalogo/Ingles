# BLOCO-B1 — Reading Practice 1 · Política de Variação Anti-Duplicação

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- Fase A concluída: A1 a A5.
- Reading já implementada até `BLOCO-READING-8`.

## Objetivo

Evitar que a Prática Profunda de Reading repita literalmente exercícios que a própria aba Reading já apresentou.

A aba Reading agora possui exercícios internos próprios. A Prática Profunda deve funcionar como recuperação ativa complementar, não como repetição direta.

## Arquivos criados

- `fluency-clean/src/reading/readingPracticeVariants.js`
- `fluency-clean/docs/BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`

## Implementação

### `readingPracticeVariants.js`

Criado módulo com:

- `fingerprintReadingExercise(exercise)`
- `collectAbaReadingExercises(lesson)`
- `isDuplicateOfAba(proposedQuestion, abaExercises)`
- `VARIANT_POLICY_BY_SKILL`

O fingerprint usa:

- `skill`
- `promptKey`
- `answerKey`
- `evidenceKey`

A comparação é propositalmente simples e segura, sem fuzzy matching pesado.

### `PracticeNormalizer.js`

`normalizeLessonForPractice(lesson)` agora adiciona:

```js
abaReadingExercises
```

Somente quando `skill === PRACTICE_SKILLS.READING`.

Para outras skills, retorna array vazio.

### `readingBuilder.js`

O builder de Reading agora usa:

```js
tryAdd(question)
```

em vez de `questions.push(...)` direto.

`tryAdd` descarta questões duplicadas usando:

```js
isDuplicateOfAba(question, context.abaReadingExercises)
```

Também registra no console:

```txt
[reading-variants] X questões filtradas por duplicação
```

## Regras implementadas

- A Prática Profunda de Reading consulta `readingQuestions` e `evidenceTasks` da aula.
- Se a questão proposta tiver mesmo skill + mesma resposta, ela é descartada.
- Se a questão proposta tiver mesmo skill + mesmo começo de prompt, ela é descartada.
- O builder não altera a aba Reading.
- O builder apenas evita duplicação dentro da Prática Profunda.

## Política de variantes registrada

`VARIANT_POLICY_BY_SKILL` agora documenta formatos desejados para:

- `main_idea`
- `detail`
- `vocabulary_context`
- `sequence`
- `evidence`
- `inference`

Neste bloco, esses formatos são referência interna. Os novos tipos formais ainda serão implementados em blocos futuros.

## Compatibilidade preservada

- Não alterado `ReadingLesson.jsx`.
- Não alterado `readingJsonContract.js`.
- Não alterado `readingLevelPolicy.js`.
- Não alterado `readingQualityGate.js`.
- Não alterado `bundle.js`.
- Não alterado backend Azure privado.

## Critérios de aceitação

- [x] `readingPracticeVariants.js` criado.
- [x] `fingerprintReadingExercise` criado.
- [x] `collectAbaReadingExercises` criado.
- [x] `isDuplicateOfAba` criado.
- [x] `VARIANT_POLICY_BY_SKILL` criado.
- [x] `PracticeNormalizer.js` popula `context.abaReadingExercises` para Reading.
- [x] `readingBuilder.js` filtra duplicados via `isDuplicateOfAba`.
- [x] Console mostra `[reading-variants] X questões filtradas por duplicação` quando houver duplicatas.

## O que NÃO foi feito

- Não foi modificada a aba Reading.
- Não foi criado fuzzy matching complexo.
- Não foi alterado contrato JSON da Reading.
- Não foram implementados os tipos `summary_cloze`, `recall_no_text`, `vocab_in_new_context` etc.
- Não foi feita compensação para preencher questões removidas; isso fica para B4/B5.

## Checklist iPhone

- Abrir uma aula Reading completa.
- Fazer exercícios internos da aba Reading.
- Iniciar a Prática Profunda.
- Confirmar que perguntas literais da aba Reading não se repetem na Prática.
- Confirmar que a Prática ainda abre e finaliza normalmente.

## Próximo bloco recomendado

`BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB`.
