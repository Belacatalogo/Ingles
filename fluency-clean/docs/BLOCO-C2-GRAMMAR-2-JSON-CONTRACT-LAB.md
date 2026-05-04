# BLOCO-C2 — Grammar 2 · JSON Contract

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/grammar/grammarJsonContract.js`, espelhando a arquitetura do contrato de Reading, para definir o contrato JSON oficial da aula Grammar e o builder de instrução para a IA.

## Arquivos criados

- `fluency-clean/src/grammar/grammarJsonContract.js`
- `fluency-clean/docs/BLOCO-C2-GRAMMAR-2-JSON-CONTRACT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`

## Exports criados

- `GRAMMAR_JSON_CONTRACT_VERSION`
- `GRAMMAR_RULE_BLOCK_CONTRACT`
- `GRAMMAR_EXAMPLE_PAIR_CONTRACT`
- `GRAMMAR_EXERCISE_CONTRACT`
- `GRAMMAR_TYPICAL_ERROR_CONTRACT`
- `GRAMMAR_JSON_CONTRACT`
- `normalizeGrammarLessonContract(rawLesson)`
- `getGrammarRequiredKeys()`
- `assertGrammarContract(data)`
- `buildGrammarJsonContractInstruction({ level })`

## Contrato Grammar

O contrato oficial agora inclui:

- `type`
- `level`
- `title`
- `intro`
- `objective`
- `focusArea`
- `ruleBlock`
- `examplePairs`
- `typicalErrors`
- `exercises`
- `productionPrompt`
- `reviewChecklist`

## Integração

`lessonJsonContract.js` agora importa:

```js
import { buildGrammarJsonContractInstruction } from '../grammar/grammarJsonContract.js';
```

E quando `lessonType === 'grammar'`, retorna o contrato próprio de Grammar.

## Compatibilidade preservada

- Não foi importado `applyGrammarQualityGate`, pois ele virá no C3.
- Não foi criado `grammarQualityGate.js`.
- Não foi alterado `GrammarLesson.jsx`.
- Não foi alterado `grammarBuilder.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Observação técnica

`normalizeGrammarLessonContract` retorna apenas a estrutura normalizada neste bloco. A aplicação de quality gate fica para o C3.

## Critérios de aceitação

- [x] `grammarJsonContract.js` criado.
- [x] Todos os exports do C2 criados.
- [x] `lessonJsonContract.js` usa `buildGrammarJsonContractInstruction` para Grammar.
- [x] `assertGrammarContract` lança erro claro para chave obrigatória ausente.
- [x] Aulas antigas ainda não foram afetadas no render.

## Próximo bloco recomendado

`BLOCO-C3-GRAMMAR-3-QUALITY-GATE-LAB`.
