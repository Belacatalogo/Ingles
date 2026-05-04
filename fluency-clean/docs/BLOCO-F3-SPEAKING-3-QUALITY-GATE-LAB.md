# BLOCO-F3 — Speaking 3 · Quality Gate

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/speaking/speakingQualityGate.js` com validações e reparos específicos para Speaking.

Foco:

- modelos sem frase vazia;
- prompts sem resposta revelada;
- turnos de aluno sem resposta escrita;
- pronunciationItems com palavra válida;
- productionTask respeitando limites do nível.

## Arquivos criados

- `fluency-clean/src/speaking/speakingQualityGate.js`
- `fluency-clean/docs/BLOCO-F3-SPEAKING-3-QUALITY-GATE-LAB.md`

## Arquivo alterado

- `fluency-clean/src/speaking/speakingJsonContract.js`

## Exports criados

- `SPEAKING_QUALITY_GATE_VERSION`
- `applyGateSpeaking(rawLesson)`
- `assertSpeakingQualityGate(gated)`

## Regras implementadas

1. `modelUtterances`
   - remove itens sem `english`.

2. `guidedDialogue`
   - role inválido vira `teacher`;
   - turno `student` com resposta revelada é descartado;
   - turno `student` com texto normal é sanitizado: `text` vira vazio e o conteúdo vai para `cue`;
   - turno `teacher` sem texto é descartado.

3. `pronunciationItems`
   - remove item sem palavra válida ou com palavra menor que 2 caracteres.

4. `speakingPrompts`
   - remove prompt vazio;
   - remove prompt com resposta revelada.

5. `productionTask`
   - limita `maxWords` ao nível;
   - ajusta `minWords` ao nível;
   - preenche instruction pela policy se faltar.

## Integração

`speakingJsonContract.js` agora importa:

```js
import { applyGateSpeaking } from './speakingQualityGate.js';
```

E usa:

```js
export function normalizeSpeakingLessonContract(rawLesson = {}) {
  return applyGateSpeaking(buildNormalizedSpeakingLesson(rawLesson));
}
```

## Resultado no objeto

A aula normalizada recebe:

```js
qualityGate: {
  version: 'speaking-quality-gate-v1',
  issues,
  repairs,
  passed
}
```

## Compatibilidade preservada

- Não foi alterado `speakingFlow.js`.
- Não foi alterado `SpeakingStepper.jsx`.
- Não foi alterado `SpeakingScreen.jsx`.
- Não foi alterado Azure.
- Não foi alterado sistema de gravação.
- Não foi alterado `lessonJsonContract.js` neste bloco.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- Issues não são exibidas na UI.

## Critérios de aceitação

- [x] Student turn com `Resposta:` é descartado.
- [x] `pronunciationItems` sem palavra válida são descartados.
- [x] `productionTask` respeita limites do nível.
- [x] Gate não bloqueia a aula por issues não-críticos.

## Próximo bloco recomendado

`BLOCO-F4-SPEAKING-4-PRACTICE-BUILDER-V2-LAB`.
