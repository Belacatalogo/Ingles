# BLOCO-A3 — Practice Core 3 · Matriz de Pureza por Tipo de Aula

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB` implementado.
- `BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB` implementado.

## Objetivo

Criar uma matriz formal que define, para cada tipo de aula, quais exercícios são `core`, `support` ou `banned`.

A matriz evita que a Prática Profunda misture habilidades de forma errada, por exemplo:

- Speaking não recebe dictation, writing, word bank ou correction.
- Reading não recebe áudio, dictation, fala ou correction.
- Grammar não recebe áudio, dictation ou fala.
- Writing não recebe áudio, dictation ou fala.

## Arquivos criados

- `fluency-clean/src/practice/core/PracticePurityMatrix.js`
- `fluency-clean/docs/BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/index.js`
- `fluency-clean/src/practice/core/PracticeBuilder.js`

## Matriz criada

Criado `PURITY_ROLE`:

- `CORE`
- `SUPPORT`
- `BANNED`

Criado `PURITY_MATRIX` para:

- `grammar`
- `listening`
- `reading`
- `speaking`
- `writing`
- `mixed`

Criado `PURITY_RULES`:

- `minCorePercentage: 0.70`
- `maxSupportPercentage: 0.30`
- `zeroBanned: true`

## Funções criadas

- `classifyQuestionPurity(question, lessonSkill)`
- `validateSessionPurity(questions, lessonSkill)`
- `composePurePlan(allQuestions, lessonSkill, targetCount)`

## Integração no pipeline

Em `PracticeBuilder.js`, o fluxo agora é:

1. `builder(context)` gera candidatos.
2. `filterPracticeQuestions(candidates, limits)` valida estrutura.
3. `applyLeakDetector(structurallyValid, context)` remove/sanitiza vazamentos.
4. `chooseQuestionCount(...)` define alvo.
5. `composePurePlan(leakResult.accepted, context.skill, targetCount)` remove banidos e limita suporte.
6. `orderByPhase(pureQuestions, phasePlan)` ordena a sessão.
7. `validateSessionPurity(ordered, context.skill)` gera validação final.

## Quality metadata

O plano agora recebe internamente:

- `quality.purityReport`
- `quality.purityValidation`

`purityReport` registra:

- `bannedRemoved`
- `coresAvailable`
- `supportsAvailable`
- `coresSelected`
- `supportsSelected`
- `minCoreCount`
- `maxSupportCount`
- `coreShortfall`

`purityValidation` registra:

- `ok`
- `corePercentage`
- `supportPercentage`
- `bannedCount`
- `coreCount`
- `supportCount`
- `totalCount`
- `reason`

## Comportamento se pureza falhar

A sessão ainda sobe.

Por enquanto, a regra de 70% não bloqueia a Prática Profunda porque os builders específicos ainda não têm `derivePureCore(context, count)`.

Se `purityValidation.ok === false`, o sistema registra warning no console:

`[Purity] Sessão com X% de core (mínimo 70%). Razão: reason`

## Compatibilidade preservada

- Não foi criada UI nova.
- Não foi adicionado card técnico na aula.
- Não foi alterado `PracticeStateMachine.js`.
- Não foi alterado `PracticeLeakDetector.js`.
- Não foi alterado `PracticeQualityGate.js`.
- Não foi alterado `PracticeAnswerChecker.js`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `PracticePurityMatrix.js` criado.
- [x] `PURITY_ROLE` criado.
- [x] `PURITY_MATRIX` criada.
- [x] `PURITY_RULES` criada.
- [x] `classifyQuestionPurity` criada.
- [x] `validateSessionPurity` criada.
- [x] `composePurePlan` criada.
- [x] `index.js` exporta a matriz.
- [x] `PracticeBuilder.js` aplica `composePurePlan` após `applyLeakDetector`.
- [x] Plano expõe `purityReport` e `purityValidation` em `quality`.
- [x] Console mostra warning quando `purityValidation.ok === false`.

## O que NÃO foi feito

- Não foi implementado `derivePureCore(context, count)`.
- Não foi bloqueada sessão abaixo de 70% core.
- Não foi exibida pureza na UI.
- Não foi alterada a matriz por aula individual.
- Não foi feita pureza especial para `mixed`; mixed continua liberado.

## Checklist futuro de validação após bloco 5

- Speaking: confirmar que não há `dictation`, `write_short`, `word_bank` ou `correction`.
- Reading: confirmar que não há `audio_choice`, `dictation`, `speak_response` ou `correction`.
- Grammar: confirmar que não há `audio_choice`, `dictation` ou `speak_response`.
- Listening: confirmar que não há `write_short` longo nem `correction`.
- Writing: confirmar que não há `audio_choice`, `dictation` ou `speak_response`.

## Próximo bloco recomendado

`BLOCO-A4-PRACTICE-CORE-4-SRS-EXTENDED-LAB`.
