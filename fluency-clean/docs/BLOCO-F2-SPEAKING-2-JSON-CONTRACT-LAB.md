# BLOCO-F2 — Speaking 2 · JSON Contract

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/speaking/speakingJsonContract.js` com contrato dedicado para Speaking.

O contrato define:

- modelos de fala;
- frases de pronúncia;
- diálogos guiados;
- prompts de fala;
- tarefa final de produção.

## Arquivos criados

- `fluency-clean/src/speaking/speakingJsonContract.js`
- `fluency-clean/docs/BLOCO-F2-SPEAKING-2-JSON-CONTRACT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`

## Exports criados

- `SPEAKING_JSON_CONTRACT_VERSION`
- `SPEAKING_MODEL_UTTERANCE_CONTRACT`
- `SPEAKING_DIALOGUE_TURN_CONTRACT`
- `SPEAKING_JSON_CONTRACT`
- `normalizeSpeakingLessonContract(rawLesson)`
- `getSpeakingRequiredKeys()`
- `assertSpeakingContract(data)`
- `buildSpeakingJsonContractInstruction({ level })`

## Campos do contrato

- `type`
- `level`
- `title`
- `intro`
- `objective`
- `topicContext`
- `vocabulary`
- `modelUtterances`
- `guidedDialogue`
- `pronunciationItems`
- `speakingPrompts`
- `productionTask`

## Normalização

`normalizeSpeakingLessonContract` aceita compatibilidades como:

- `model_utterances`, `models`, `examples` → `modelUtterances`
- `guided_dialogue`, `dialogue` → `guidedDialogue`
- `pronunciation_items`, `pronunciation` → `pronunciationItems`
- `speaking_prompts`, `prompts` → `speakingPrompts`
- `production_task`, `production` → `productionTask`

## Segurança pedagógica

Turnos do `guidedDialogue` com `role: student` são sanitizados:

- `text` fica vazio;
- `cue` recebe a instrução;
- evita escrever a resposta do aluno dentro do diálogo.

## Integração

`lessonJsonContract.js` agora importa:

```js
import { buildSpeakingJsonContractInstruction } from '../speaking/speakingJsonContract.js';
```

E quando `lessonType === 'speaking'`, usa:

```js
buildSpeakingJsonContractInstruction({ level })
```

## Compatibilidade preservada

- Não foi importado gate; ele entra no F3.
- Não foi alterado `speakingFlow.js`.
- Não foi alterado `SpeakingStepper.jsx`.
- Não foi alterado `SpeakingScreen.jsx`.
- Não foi alterado Azure.
- Não foi alterado sistema de gravação.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] Arquivo criado com todos os exports.
- [x] `lessonJsonContract.js` usa `buildSpeakingJsonContractInstruction` para Speaking.
- [x] `guidedDialogue` com `student` não mantém resposta escrita no `text`; mantém apenas `cue`.

## Próximo bloco recomendado

`BLOCO-F3-SPEAKING-3-QUALITY-GATE-LAB`.
