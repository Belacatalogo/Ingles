# BLOCO-C1 — Grammar 1 · Level Policy

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar o módulo `src/grammar/grammarLevelPolicy.js`, espelhando a arquitetura de `src/reading/readingLevelPolicy.js`, para definir como Grammar deve se comportar por nível A1→C1.

## Arquivos criados

- `fluency-clean/src/grammar/grammarLevelPolicy.js`
- `fluency-clean/docs/BLOCO-C1-GRAMMAR-1-LEVEL-POLICY-LAB.md`

## Exports criados

- `GRAMMAR_LEVELS`
- `GRAMMAR_FOCUS_AREAS`
- `GRAMMAR_LEVEL_POLICY_VERSION`
- `GRAMMAR_LEVEL_POLICIES`
- `normalizeGrammarLevel(level)`
- `getGrammarLevelPolicy(level)`
- `getGrammarPolicySummary(level)`
- `buildGrammarPolicyPrompt(level)`

## Níveis implementados

- `A1 · Estruturas básicas`
- `A2 · Estruturas funcionais`
- `B1 · Estruturas independentes`
- `B2 · Estruturas analíticas`
- `C1 · Nuance e domínio`

Cada nível contém:

- `level`
- `label`
- `studentGoal`
- `questionLanguage`
- `supportLanguage`
- `instructionTone`
- `focusAreas`
- `sentenceLengthRange`
- `exerciseCount`
- `typicalErrors`
- `productionInstruction`
- `productionMinSentences`
- `productionMaxSentences`

## Compatibilidade preservada

- Não foi criado `grammarJsonContract.js`.
- Não foi criado `grammarQualityGate.js`.
- Não foi alterado `GrammarLesson.jsx`.
- Não foi alterado `grammarBuilder.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `grammarLevelPolicy.js` criado em `src/grammar/`.
- [x] Exports completos criados.
- [x] Política A1 a C1 implementada.
- [x] `buildGrammarPolicyPrompt('B1')` retorna string utilizável como instrução para IA.
- [x] Nenhum outro arquivo funcional foi alterado neste bloco.

## Próximo bloco recomendado

`BLOCO-C2-GRAMMAR-2-JSON-CONTRACT-LAB`.
