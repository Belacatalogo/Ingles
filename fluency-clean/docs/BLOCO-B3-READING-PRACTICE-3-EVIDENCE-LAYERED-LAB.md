# BLOCO-B3 — Reading Practice 3 · Evidência Textual em Camadas por Nível

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- Fase A concluída.
- `BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB` implementado.
- `BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB` implementado.

## Objetivo

Adicionar evidência textual em camadas por nível na **Prática Profunda de Reading**, sem alterar a aba Reading.

A progressão implementada:

- `A1/A2`: marcar a frase do texto que prova a resposta.
- `B1`: marcar a frase e escolher uma paráfrase correta.
- `B2`: explicar em 1 frase por que a frase é evidência.
- `C1`: avaliar nuance/suficiência da evidência.

## Arquivos criados

- `fluency-clean/src/reading/readingEvidenceLayers.js`
- `fluency-clean/docs/BLOCO-B3-READING-PRACTICE-3-EVIDENCE-LAYERED-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`
- `fluency-clean/src/practice/components/ChoiceGrid.jsx`
- `fluency-clean/src/practice/PracticePlanAdapter.js`

## Módulo criado

`readingEvidenceLayers.js` exporta:

- `EVIDENCE_LAYER`
- `EVIDENCE_LAYER_BY_LEVEL`
- `EVIDENCE_CLASS_LABEL`
- `getEvidenceLayerForLevel(level)`
- `buildEvidenceQuestionsForLevel(context, evidenceTasks)`

## Camadas

### A1/A2 — `MARK`

Gera questão `MULTIPLE_CHOICE`:

- título: `Evidência no texto`
- pergunta: `Qual frase do texto prova esta ideia?`
- resposta: frase de evidência
- opções: frases do texto

### B1 — `MARK_AND_PARAPHRASE`

Gera par de questões:

1. marcar a frase de evidência;
2. escolher a paráfrase correta.

Se a IA não fornecer paráfrase e o fallback básico não alterar a frase, o sistema mantém apenas a marcação de evidência para evitar uma questão inútil.

### B2 — `EXPLAIN`

Gera questão `WRITE_SHORT`:

- título: `Explique a evidência`
- pergunta: explicar em 1 frase por que a evidência prova a ideia
- resposta-modelo: `explanationModel` ou fallback seguro

### C1 — `EVALUATE`

Gera questão `MULTIPLE_CHOICE` com valores técnicos:

- `direct_sufficient`
- `direct_partial`
- `inferred_strong`
- `inferred_weak`

Na UI, os valores técnicos são exibidos com labels legíveis.

## Labels legíveis para C1

`ChoiceGrid.jsx` agora renderiza:

```js
item.optionLabels?.[option] || option
```

Assim, a correção continua usando o valor técnico, mas o aluno vê texto claro:

- `Direta e suficiente — fala exatamente sobre isso`
- `Direta mas parcial — toca no tema mas não fecha`
- `Inferida com base sólida — dá para deduzir com segurança`
- `Inferida com base fraca — exige muito salto`

## Normalizer

`PracticeNormalizer.js` agora cria `context.evidenceTasks` para aulas Reading.

As fontes usadas:

- `lesson.evidenceTasks`
- evidências presentes em `lesson.readingQuestions`

Campos normalizados:

- `id`
- `instruction`
- `expectedEvidence`
- `paraphrase`
- `explanationModel`
- `evidenceClass`

## Builder

`readingBuilder.js` agora chama:

```js
buildEvidenceQuestionsForLevel(context, context.evidenceTasks || [])
```

A chamada acontece depois de:

1. revisões de vocabulário frágil;
2. vocabulário normal da aula;

E antes do restante da compreensão/produção.

## Metadados preservados

`builderUtils.js` agora preserva metadados importantes em `createQuestion`:

- `optionLabels`
- `readingSkillTag`
- `listeningSkillTag`
- `writingSkillTag`
- `grammarTag`
- `vocabTag`
- `evidenceTrackId`
- `evidenceTrackLabel`
- `variantPolicy`
- `isReview`

Isso também melhora a compatibilidade com A4/A5.

## Adapter

`PracticePlanAdapter.js` agora preserva:

- `optionLabels`
- `isReview`

Também mantém título de revisão como:

`Revisão · título`

## Compatibilidade preservada

- Não foi alterado `ReadingLesson.jsx`.
- Não foi alterado visual da aba Reading.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Não foi criada UI técnica.
- Não foram geradas mais de 3 tarefas-base de evidência por sessão.

## Critérios de aceitação

- [x] `readingEvidenceLayers.js` criado.
- [x] `EVIDENCE_LAYER` criado.
- [x] `getEvidenceLayerForLevel` criado.
- [x] `buildEvidenceQuestionsForLevel` criado.
- [x] A1/A2 usam marcação simples.
- [x] B1 usa marcação + paráfrase quando possível.
- [x] B2 usa `WRITE_SHORT` com explicação.
- [x] C1 usa classificação com 4 opções.
- [x] `ChoiceGrid.jsx` mostra labels legíveis quando `optionLabels` existir.
- [x] `readingBuilder.js` integra as evidências em camadas.
- [x] `PracticeNormalizer.js` expõe `context.evidenceTasks`.

## O que NÃO foi feito

- Não foi mexido na aba Reading.
- Não foi criado render especial para cada subtipo; tudo passa pelo renderer atual da Prática Profunda.
- Não foi criada UI técnica de camada.
- Não foi exigida paráfrase da IA quando ela não existir.
- Não foi usado `EXPLAIN`/`EVALUATE` em A1/A2.

## Checklist futuro após B5

- Aula A1/A2: evidência aparece como escolha simples de frase.
- Aula B1: evidência aparece como marcação + paráfrase quando houver paráfrase/fallback útil.
- Aula B2: evidência pede explicação curta digitada.
- Aula C1: evidência pede classificação com labels legíveis.
- Confirmar que no máximo 3 evidence tasks base entram na sessão.
- Confirmar que a aba Reading não mudou visualmente.

## Próximo bloco recomendado

`BLOCO-B4-READING-PRACTICE-4-NEW-CONTEXT-LAB`.
