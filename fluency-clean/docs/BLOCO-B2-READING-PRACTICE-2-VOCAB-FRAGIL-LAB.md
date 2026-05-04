# BLOCO-B2 — Reading Practice 2 · Tracking de Vocabulário Frágil

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- Fase A concluída.
- `BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB` implementado.

## Objetivo

Quando o aluno erra vocabulário em contexto na aba Reading, esse vocabulário passa a ser marcado como frágil no SRS estendido. A Prática Profunda de Reading prioriza até 2 desses itens no começo da sessão.

## Arquivos alterados

- `fluency-clean/src/services/practiceSrsExtended.js`
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js` parcialmente preparado para preservar `isReview`

## Arquivos criados

- `fluency-clean/docs/BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB.md`

## Implementação

### `practiceSrsExtended.js`

Foi adicionado:

```js
VOCAB_WORD: 'vocab_word'
```

em `SRS_ITEM_TYPES`.

Também foi adicionado suporte em `suggestQuestionTypeForSrsItem` para que `VOCAB_WORD` sugira `MULTIPLE_CHOICE`.

Além disso, a dependência de `progressStore.js` foi removida do SRS estendido. O arquivo agora possui seu próprio `localDateKey`, evitando ciclo de importação quando `progressStore.js` precisa registrar vocabulário frágil.

### `progressStore.js`

Foi criada a função interna:

```js
registerReadingVocabularyMistakes({ lesson, answers })
```

Ela roda dentro de `completeLesson` antes do registro de mastery.

A função:

- só atua quando `lesson.type === 'reading'`;
- lê `answers.multipleChoice`;
- percorre `readingQuestions`, `comprehension`, `questions` e `exercises`;
- filtra itens com `skill/type === 'vocabulary_context'`;
- compara resposta selecionada com resposta esperada;
- quando houver erro, registra no SRS estendido:

```js
recordPracticeSrsResult({
  type: SRS_ITEM_TYPES.VOCAB_WORD,
  content: `vocab::${word}`,
  label: word,
  correct: false,
  skill: 'reading',
  level: lesson.level,
  meta: {
    lessonId,
    meaning,
    example,
    contextClue,
    sourceTab: 'reading_inner',
  },
})
```

O completion também recebe:

```js
fragileVocabularyCount
```

### `readingBuilder.js`

Foi criada a função interna:

```js
buildVocabReviewQuestions(context, limit = 2)
```

Ela puxa até 2 seeds do SRS estendido para `skill: 'reading'`, filtra `VOCAB_WORD` e transforma cada item em questão:

- fase: `WARMUP`;
- tipo: `MULTIPLE_CHOICE`;
- título: `Revisão · vocabulário frágil`;
- prompt: `O que significa “word”?`;
- `vocabTag` e `vocabTagLabel`;
- `readingSkillTag: 'vocabulary_context'`;
- `isReview: true`.

Essas perguntas entram antes do fluxo normal da Prática Profunda de Reading.

### `PracticePlanAdapter.js`

Foi preservado o campo:

```js
isReview: Boolean(question.isReview)
```

Assim a questão pode ser identificada como revisão no render atual.

## Comportamento esperado

- Se o aluno errar uma questão de vocabulário em contexto na aba Reading e concluir a aula, o vocabulário entra no SRS como `weak`.
- Na Prática Profunda de Reading, até 2 itens fracos aparecem no início.
- Quando o aluno acerta a revisão, o SRS move o item para `learning`/`review` conforme a regra do A4.
- Se não houver vocabulário frágil, o fluxo segue normal.

## Compatibilidade preservada

- Não foi alterado `ReadingLesson.jsx` diretamente neste bloco.
- Não foi alterado `readingJsonContract.js`.
- Não foi alterado `readingQualityGate.js`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Não foi criado Firebase sync.
- Não puxa mais de 2 revisões por sessão.

## Critérios de aceitação

- [x] `SRS_ITEM_TYPES` ganhou `VOCAB_WORD`.
- [x] `progressStore.js` registra vocabulário frágil quando Reading é concluída com erro em `vocabulary_context`.
- [x] `readingBuilder.js` chama `buildVocabReviewQuestions` antes do fluxo normal.
- [x] Em sessão sem vocabulário frágil, fluxo normal permanece.
- [x] Limite de 2 revisões por sessão preservado.

## Observação técnica

O plano original sugeria registrar no ponto exato do clique em `ReadingLesson.jsx`. Para reduzir risco em um arquivo grande e sensível, o registro foi feito no fechamento da aula, dentro de `completeLesson`, usando as respostas já salvas por `ReadingLesson.jsx`.

Resultado funcional preservado: ao concluir a aula com erro de vocabulário, o item entra no SRS antes da Prática Profunda.

## Checklist futuro após B5

- Errar um exercício `vocabulary_context` na aba Reading.
- Concluir a aula.
- Iniciar a Prática Profunda.
- Confirmar que aparece `Revisão · vocabulário frágil` no início.
- Acertar a revisão.
- Confirmar que o SRS atualiza o item.

## Próximo bloco recomendado

`BLOCO-B3-READING-PRACTICE-3-EVIDENCE-LAYERED-LAB`.
