# BLOCO-D3 — Listening 3 · Quality Gate

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/listening/listeningQualityGate.js` com verificações e reparos específicos para Listening.

## Arquivos criados

- `fluency-clean/src/listening/listeningQualityGate.js`
- `fluency-clean/docs/BLOCO-D3-LISTENING-3-QUALITY-GATE-LAB.md`

## Arquivo alterado

- `fluency-clean/src/listening/listeningJsonContract.js`

## Implementação

Criado `listeningQualityGate.js` com:

- `LISTENING_QUALITY_GATE_VERSION`
- `hasTranscriptLeak(questionText, listeningText)`
- `applyListeningQualityGate(rawLesson)`
- `assertListeningQualityGate(lesson)`

O gate:

1. Verifica `listeningText` vazio.
2. Remove questões com 3+ palavras consecutivas da transcrição no enunciado ou opções.
3. Remove `dictationItems` maiores que `dictationMaxWords` do nível.
4. Adiciona questão padrão de gist quando não houver nenhuma.
5. Deriva `shadowingLines` do texto quando houver menos de 2.
6. Limpa `audioEvidence` quando o trecho não existir no `listeningText`.
7. Renomeia speakers genéricos como `Speaker 1`, `Speaker 2` para nomes naturais.

## Integração

`listeningJsonContract.js` agora importa:

```js
import { applyListeningQualityGate } from './listeningQualityGate.js';
```

E usa:

```js
export function normalizeListeningLessonContract(rawLesson = {}) {
  return applyListeningQualityGate(buildNormalizedListeningLesson(rawLesson));
}
```

## Resultado no objeto

A aula normalizada recebe:

```js
_qualityGate: {
  version: 'listening-gate-v1',
  warnings,
  warningCount,
  applied: true
}
```

## Compatibilidade preservada

- Não foi alterado `ListeningLessonClean.jsx` neste bloco.
- Não foi alterado `listeningBuilder.js`.
- Não foi alterado `lessonJsonContract.js` neste bloco.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- `_qualityGate` não é exibido na UI.

## Critérios de aceitação

- [x] Gate detecta e remove questões com transcrição vazada.
- [x] Gate remove ditados longos demais para o nível.
- [x] Gate adiciona questão de gist quando ausente.
- [x] Gate renomeia speakers genéricos.
- [x] `_qualityGate.warnings` lista reparos e alertas.

## Próximo bloco recomendado

`BLOCO-D4-LISTENING-4-PRACTICE-BUILDER-V2-LAB`.
