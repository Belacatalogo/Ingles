# BLOCO-G1 — Practice Telemetry

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar telemetria local agregada da Prática Profunda para análise futura, sem dados pessoais, sem Firebase e sem exibição na UI.

## Arquivos criados

- `fluency-clean/src/practice/core/PracticeTelemetry.js`
- `fluency-clean/docs/BLOCO-G1-PRACTICE-TELEMETRY-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/index.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`

## Implementação

`PracticeTelemetry.js` cria armazenamento local em:

```js
fluency.practiceTelemetry.v1
```

com limite circular de 200 sessões.

## Exports criados

- `recordPracticeSession(...)`
- `getPracticeTelemetrySummary()`
- `clearPracticeTelemetry()`

## Dados registrados

A sessão salva apenas dados agregados:

- `ts`
- `skill`
- `level`
- `questionCount`
- `correctCount`
- `incorrectCount`
- `accuracy`
- `durationMs`
- `purityOk`
- `leakDiscardCount`
- `masteryTagsUpdated`

## Dados NÃO registrados

- Nome do aluno.
- Email.
- ID pessoal.
- ID da aula.
- Título da aula.
- Respostas digitadas.
- Transcrições de fala.
- Conteúdo dos exercícios.

## Integração

`core/index.js` agora exporta:

```js
export * from './PracticeTelemetry.js';
```

`PracticeFullscreen.jsx` agora chama `recordPracticeSession` quando a prática entra no estado `SAVING`, logo antes de `onComplete` e `SAVE_DONE`.

A duração é calculada por `sessionStartedAt`, reiniciada ao abrir/reiniciar a prática.

## Origem dos dados de qualidade

A telemetria usa os dados já existentes em `practicePlanQuality`, vindos do plano da prática:

- `purityReport`
- `purityValidation`
- `leakDiscarded`

## Critérios de aceitação

- [x] `recordPracticeSession` grava no localStorage sem PII.
- [x] Circular buffer de 200 sessões.
- [x] `getPracticeTelemetrySummary()` retorna `bySkill` com `count` e `averageAccuracy`/`accuracyMedia`.
- [x] `PracticeFullscreen.jsx` chama `recordPracticeSession` ao concluir.
- [x] Não envia para Firebase.
- [x] Não exibe telemetria na tela.

## Próximo bloco recomendado

`BLOCO-G2-PRACTICE-A11Y-AUDIT-LAB`.
