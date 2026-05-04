# BLOCO-E2 — Writing 2 · Contrato JSON Próprio

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/writing/writingJsonContract.js` com contrato JSON dedicado para Writing.

Campos próprios:

- `writingModel`
- `usefulPhrases`
- `structuredTasks`
- `productionPrompt`
- `writingChecklist`

## Arquivos criados

- `fluency-clean/src/writing/writingJsonContract.js`
- `fluency-clean/docs/BLOCO-E2-WRITING-2-JSON-CONTRACT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`
- `fluency-clean/src/lessons/WritingLesson.jsx`

## Exports criados

- `WRITING_JSON_CONTRACT_VERSION`
- `WRITING_JSON_CONTRACT`
- `normalizeWritingLessonContract(rawLesson)`
- `assertWritingContract(data)`
- `buildWritingJsonContractInstruction({ level })`

## Integração

`lessonJsonContract.js` agora importa:

```js
import { buildWritingJsonContractInstruction } from '../writing/writingJsonContract.js';
```

E usa contrato próprio quando `lessonType === 'writing'`.

## Render normalizado

`WritingLesson.jsx` agora normaliza a aula com:

```js
normalizeWritingLessonContract(rawLesson)
```

E renderiza, quando existirem:

- modelo de escrita;
- frases úteis;
- vocabulário útil;
- exercícios estruturados;
- productionPrompt no roteiro;
- checklist antes de enviar.

## Compatibilidade preservada

- Aula antiga sem `productionPrompt` recebe instrução padrão do nível.
- Aula antiga com `prompts`, `sections`, `vocabulary` e `exercises` continua funcionando.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Não foi criado quality gate de Writing neste bloco.

## Critérios de aceitação

- [x] `writingJsonContract.js` criado com contrato, normalização, assert e builder.
- [x] `lessonJsonContract.js` usa o contrato para Writing.
- [x] `WritingLesson.jsx` normaliza com `normalizeWritingLessonContract`.
- [x] Aula sem `productionPrompt` recebe instrução padrão do nível.
- [x] `writingModel`, `usefulPhrases`, `structuredTasks` e `writingChecklist` aparecem na aba quando fornecidos.

## Próximo bloco recomendado

`BLOCO-E3-WRITING-3-RUBRIC-MULTI-LAB`.
