# BLOCO-A4 — Practice Core 4 · SRS Estendido

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB` implementado.
- `BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB` implementado.
- `BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB` implementado.

## Objetivo

Criar um SRS irmão do SRS de vocabulário para registrar padrões de prática profunda que precisam reaparecer em revisões futuras.

O SRS de vocabulário existente continua separado e intacto. Este bloco cria storage próprio para:

- padrões gramaticais errados;
- palavras com pronúncia fraca;
- erros recorrentes;
- evidências textuais perdidas;
- padrões de listening.

## Arquivos criados

- `fluency-clean/src/services/practiceSrsExtended.js`
- `fluency-clean/docs/BLOCO-A4-PRACTICE-CORE-4-SRS-EXTENDED-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/PracticeBuilder.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`

## Storage

Criado storage local separado:

`fluency.practiceSrsExtended.v1`

O arquivo `vocabularySrs.js` não foi alterado.

## Tipos de item

Criado `SRS_ITEM_TYPES`:

- `GRAMMAR_PATTERN`
- `PRONUNCIATION_WORD`
- `ERROR_PATTERN`
- `EVIDENCE_TRACK`
- `LISTENING_PATTERN`

## Status

Criado `SRS_STATUS`:

- `WEAK`
- `LEARNING`
- `REVIEW`
- `STRONG`
- `MASTERED`

## Intervalos

- `weak`: 1 dia
- `learning`: 2 dias
- `review`: 4 dias
- `strong`: 8 dias
- `mastered`: 16 dias

## API criada

Em `practiceSrsExtended.js`:

- `getPracticeSrsState()`
- `recordPracticeSrsResult({ type, content, label, correct, skill, level, meta })`
- `getDuePracticeSrsItems({ type, skill, limit })`
- `getPracticeSrsSummary()`
- `pullSrsReviewItems({ skill, level, limit })`

## Regra de progressão

- erro: status `WEAK`, streak zera;
- 1 acerto seguido: `LEARNING`;
- 2 acertos seguidos: `REVIEW`;
- 3 acertos seguidos: `MASTERED`;
- `MASTERED` agenda próxima revisão para 16 dias.

## Integração no `PracticeBuilder.js`

Antes de chamar o builder específico, o sistema agora puxa até 2 seeds de revisão:

```js
const reviewSeeds = pullSrsReviewItems({ skill: baseContext.skill, level: baseContext.level, limit: 2 });
const context = { ...baseContext, reviewSeeds };
```

Os builders futuros podem usar `context.reviewSeeds` para gerar questões de revisão no começo da sessão.

Neste bloco, os builders ainda não transformam seeds em questões renderizáveis. Isso fica para blocos futuros.

## Integração no `PracticeAnswerChecker.js`

Após checar uma resposta, o checker registra resultado no SRS estendido somente se a questão possuir tags pedagógicas explícitas.

Tags aceitas:

- `grammarTag`
- `grammarTagLabel`
- `errorTag`
- `errorTagLabel`
- `pronunciationWord`
- `azureScore`
- `evidenceTrackId`
- `evidenceTrackLabel`
- `listeningPatternId`
- `listeningPatternLabel`

Questões sem tags pedagógicas não criam item SRS.

## Registro por tipo

- `grammarTag` → `GRAMMAR_PATTERN`
- `errorTag` → `ERROR_PATTERN`
- `pronunciationWord` + `azureScore` → `PRONUNCIATION_WORD`
- `evidenceTrackId` → `EVIDENCE_TRACK`
- `listeningPatternId` → `LISTENING_PATTERN`

## Compatibilidade preservada

- `vocabularySrs.js` não foi alterado.
- Não foi criado Firebase sync.
- Não foi criada UI técnica.
- Não foi alterado `PracticeStateMachine.js`.
- Não foi alterado `PracticeLeakDetector.js`.
- Não foi alterado `PracticePurityMatrix.js`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `practiceSrsExtended.js` criado.
- [x] `SRS_ITEM_TYPES` criado.
- [x] `SRS_STATUS` criado.
- [x] `recordPracticeSrsResult` criado.
- [x] `getDuePracticeSrsItems` criado.
- [x] `getPracticeSrsSummary` criado.
- [x] `pullSrsReviewItems` criado.
- [x] `PracticeBuilder.js` passa `reviewSeeds` para o contexto.
- [x] `PracticeAnswerChecker.js` registra resultados quando a questão tem tags pedagógicas explícitas.
- [x] Questão sem tag não cria item SRS.
- [x] Storage separado de vocabulário.
- [x] 3 acertos seguidos levam a `MASTERED` e due em 16 dias.

## O que NÃO foi feito

- Não foi fundido com `vocabularySrs.js`.
- Não foi criado item SRS para questão sem tag.
- Não foi exibida interface técnica do SRS na aula.
- Não foi exportado para Firebase.
- Não foi implementado SM-2 completo.
- Não foram alterados builders para gerar questões a partir de `reviewSeeds`; isso fica para blocos futuros.

## Checklist futuro de validação após bloco 5

- Errar questão com `grammarTag` e confirmar criação em `localStorage`.
- Confirmar chave `fluency.practiceSrsExtended.v1`.
- Confirmar `getPracticeSrsSummary().byType` com o tipo registrado.
- Acertar 3 vezes seguidas item tagueado e confirmar `MASTERED`.
- Confirmar que `vocabularySrs.js` continua funcionando separadamente.

## Próximo bloco recomendado

`BLOCO-A5-PRACTICE-CORE-5-MASTERY-TAGS-LAB`.
