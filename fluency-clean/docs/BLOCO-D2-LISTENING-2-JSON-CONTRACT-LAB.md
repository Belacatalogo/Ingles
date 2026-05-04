# BLOCO-D2 — Listening 2 · Contrato JSON Próprio

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/listening/listeningJsonContract.js` com contrato JSON dedicado para Listening.

Campos próprios:

- `listeningText`
- `textType`
- `speakers`
- `listeningQuestions`
- `shadowingLines`
- `dictationItems`

## Arquivos criados

- `fluency-clean/src/listening/listeningJsonContract.js`
- `fluency-clean/docs/BLOCO-D2-LISTENING-2-JSON-CONTRACT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`

## Exports criados

- `LISTENING_JSON_CONTRACT_VERSION`
- `LISTENING_JSON_CONTRACT`
- `normalizeListeningLessonContract(rawLesson)`
- `assertListeningContract(data)`
- `buildListeningJsonContractInstruction({ level })`

## Integração

`lessonJsonContract.js` agora importa:

```js
import { buildListeningJsonContractInstruction } from '../listening/listeningJsonContract.js';
```

E quando `lessonType === 'listening'`, retorna o contrato próprio de Listening.

## Normalização no render

`ListeningLessonClean.jsx` agora importa:

```js
import { normalizeListeningLessonContract } from '../listening/listeningJsonContract.js';
```

E normaliza a lesson no início do componente:

```js
export function ListeningLessonClean({ lesson: rawLesson }) {
  const lesson = useMemo(() => normalizeListeningLessonContract(rawLesson), [rawLesson]);
}
```

## Compatibilidade

- Aula sem `listeningText`, mas com `transcript`, `text`, `dialogueText` ou `dialogue_text`, continua funcionando.
- `dictationItems` são filtrados por `dictationMaxWords` do nível.
- `shadowingLines` gerados pela IA têm prioridade sobre fallback local.
- A transcrição continua fechada até o aluno abrir.

## Critérios de aceitação

- [x] `listeningJsonContract.js` criado.
- [x] `lessonJsonContract.js` usa `buildListeningJsonContractInstruction` para Listening.
- [x] `ListeningLessonClean.jsx` normaliza com `normalizeListeningLessonContract`.
- [x] Aula sem `listeningText`, mas com `transcript`, funciona por fallback.
- [x] `dictationItems` são filtrados pelo `dictationMaxWords` do nível.

## O que NÃO foi feito

- Não foi criado quality gate de Listening.
- Não foi alterado builder da Prática Profunda.
- Não foi exibido card técnico do contrato na UI.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Próximo bloco recomendado

`BLOCO-D3-LISTENING-3-QUALITY-GATE-LAB`.
