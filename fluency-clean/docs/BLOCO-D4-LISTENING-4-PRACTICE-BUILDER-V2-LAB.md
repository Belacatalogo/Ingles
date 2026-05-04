# BLOCO-D4 — Listening 4 · Practice Builder V2

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Reescrever `practice/core/builders/listeningBuilder.js` para usar a política completa A1→C1, respeitar pureza de Listening, integrar shadowing e SRS.

## Arquivo alterado

- `fluency-clean/src/practice/core/builders/listeningBuilder.js`

## Sequência pedagógica implementada

1. `warmup`
   - tipo: `audio_choice`
   - vocabulário com áudio para ativar a escuta.

2. `recognition`
   - tipo: `audio_choice`
   - reconhecimento de palavra/frase ouvida.

3. `comprehension`
   - tipo: `multiple_choice`
   - compreensão de ideia geral e detalhe com base nas questões da IA.

4. `guided_production`
   - tipo: `dictation`
   - ditado limitado por `policy.dictationMaxWords`.

5. `speaking`
   - tipo: `speak_response`
   - shadowing com `audioText` igual ao `prompt`.

6. `review`
   - tipo: `audio_choice`
   - revisão SRS de padrões fracos de Listening.

## Regras críticas aplicadas

- Toda questão gerada por Listening precisa ter `audioText` preenchido.
- Questões sem `audioText` são removidas no `dedupeQuestions`.
- `dictation` respeita `policy.dictationMaxWords`.
- `speak_response` respeita `policy.shadowingMaxWords`.
- `speak_response` usa `audioText = prompt = answer`.
- Builder não gera `write_short`, `correction` ou `fill_blank` para Listening.

## Integrações usadas

- `getListeningLevelPolicy`
- `LISTENING_SKILLS`
- `pullSrsReviewItems`
- `SRS_ITEM_TYPES.LISTENING_PATTERN`
- `createQuestion`
- `makeVocabularyQuestions`
- `makeWordOptions`
- `makeSentenceOptions`
- `getA1DictationUnits`

## Compatibilidade com fluxo real

O plano D4 previa `context.shadowingLines`, `context.dictationItems` e `context.reviewSeeds`.

No fluxo real atual, parte disso ainda está em `context.raw`, então o builder também lê:

- `context.raw.shadowingLines`
- `context.raw.shadowing_lines`
- `context.raw.dictationItems`
- `context.raw.dictation_items`
- `context.raw.listeningQuestions`

Assim o bloco funciona com o contrato D2/D3 sem exigir alteração no normalizer neste bloco.

## Compatibilidade preservada

- Não foi alterado `ListeningLessonClean.jsx`.
- Não foi alterado `listeningJsonContract.js`.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] Builder reescrito com 6 fases em ordem.
- [x] `dictation` respeita `policy.dictationMaxWords`.
- [x] `speak_response` respeita `policy.shadowingMaxWords`.
- [x] Toda questão de Listening tem `audioText` preenchido.
- [x] Nenhuma questão `write_short`, `correction` ou `fill_blank` é gerada para Listening.
- [x] SRS Listening entra em `review` quando houver padrão vencido.

## Próximo bloco recomendado

`BLOCO-E1-WRITING-1-LEVEL-POLICY-LAB`.
