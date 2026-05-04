# BLOCO-F4 — Speaking 4 · Practice Builder V2

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Reescrever `practice/core/builders/speakingBuilder.js` usando policy + contrato Speaking.

O builder não chama Azure diretamente. Ele apenas marca as questões `speak_response` com metadados para o componente existente usar.

## Arquivos alterados

- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/speakingBuilder.js`

## Implementação

### `builderUtils.js`

`createQuestion` agora preserva metadados de Speaking/Azure:

- `speakingSkillTag`
- `pronunciationWord`
- `phonetic`
- `azureMinPassScore`
- `azureSkipOnFail`
- `scaffoldingHint`

### `speakingBuilder.js`

Reescrito com sequência pedagógica:

1. `SRS REVIEW`
   - tipo: `speak_response`
   - revisão de palavras de pronúncia fracas
   - `pronunciationWord` presente

2. `PRONUNCIATION DRILL`
   - tipo: `speak_response`
   - usa `lesson.pronunciationItems`
   - `pronunciationWord` e `phonetic` preservados

3. `MODEL UTTERANCES`
   - tipo: `speak_response`
   - repetição de modelos da aula
   - usa `modelUtterances`

4. `AUDIO CHOICE`
   - tipo: `audio_choice`
   - suporte auditivo apenas em A1/A2
   - máximo 2

5. `GUIDED DIALOGUE`
   - tipo: `speak_response`
   - usa turnos `student` com `cue`
   - limitado por nível

6. `SPEAKING PROMPTS`
   - tipo: `speak_response`
   - resposta livre curta/média

7. `PRODUCTION`
   - tipo: `speak_response`
   - produção final livre
   - usa `productionTask.instruction` ou `policy.productionInstruction`

## Distribuição por nível

- A1: pronunciation 3, model 4, audio prep 2, dialogue 0, prompt 1, produção 1.
- A2: pronunciation 3, model 4, audio prep 2, dialogue 1, prompt 1, produção 1.
- B1: pronunciation 2, model 3, audio prep 0, dialogue 2, prompt 2, produção 1.
- B2/C1: pronunciation 2, model 2, audio prep 0, dialogue 3, prompt 2, produção 1.

## Regras críticas

- Cada `speak_response` recebe `azureMinPassScore`.
- Cada `speak_response` recebe `azureSkipOnFail`.
- A1 herda `azureSkipOnFail: true` da policy.
- Reviews e drills têm `pronunciationWord`.
- Nenhuma questão `dictation`, `write_short` ou `correction` é gerada.
- O builder não importa `azurePronunciation.js`.
- O builder não duplica `speakingFlow.js`.

## Pureza

O builder gera majoritariamente `speak_response`.

Apenas A1/A2 recebem até 2 `audio_choice` como preparação auditiva.

## Compatibilidade preservada

- Não foi alterado Azure.
- Não foi alterado sistema de gravação.
- Não foi alterado `speakingFlow.js`.
- Não foi alterado `SpeakingStepper.jsx`.
- Não foi alterado `SpeakingScreen.jsx`.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] Builder reescrito.
- [x] ≥70% das questões são `speak_response`, salvo caso de conteúdo insuficiente da IA.
- [x] `azureMinPassScore` e `azureSkipOnFail` presentes em cada `speak_response`.
- [x] `pronunciationWord` presente em drills e reviews.
- [x] A1 usa `azureSkipOnFail: true` pela policy.
- [x] B2/C1 usam produção livre final.
- [x] Nenhuma `dictation`, `write_short` ou `correction` é gerada.

## Próximo bloco recomendado

Fim da Fase F.

Próximo: `BLOCO-G1-PRACTICE-TELEMETRY-LAB`.
