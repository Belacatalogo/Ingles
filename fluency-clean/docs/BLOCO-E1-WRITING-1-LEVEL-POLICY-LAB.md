# BLOCO-E1 — Writing 1 · Política por Nível A1→C1

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/writing/writingLevelPolicy.js` com a política formal de Writing por nível A1→C1.

Define internamente:

- extensão de frases e produção;
- tipos de tarefa;
- rubrica multi-critério;
- idioma da instrução;
- auto-save;
- detecção de colagem;
- contador de palavras;
- hint de estrutura;
- tempo de sessão;
- quantidade de questões.

## Arquivos criados

- `fluency-clean/src/writing/writingLevelPolicy.js`
- `fluency-clean/docs/BLOCO-E1-WRITING-1-LEVEL-POLICY-LAB.md`

## Exports criados

- `WRITING_LEVEL_POLICY_VERSION`
- `WRITING_LEVELS`
- `WRITING_TASK_TYPES`
- `WRITING_RUBRIC_CRITERIA`
- `WRITING_LEVEL_POLICIES`
- `normalizeWritingLevel(level)`
- `getWritingLevelPolicy(level)`
- `getWritingRubricCriteria()`
- `getWritingRubricWeightTotal()`
- `getWritingPolicySummary(level)`
- `buildWritingPolicyPrompt(level)`

## Níveis implementados

- `A1 · Escrita guiada inicial`
- `A2 · Escrita funcional básica`
- `B1 · Escrita independente inicial`
- `B2 · Escrita analítica`
- `C1 · Escrita avançada e precisa`

## Rubrica

Critérios oficiais:

- Gramática: 30%
- Vocabulário: 25%
- Coesão: 20%
- Tarefa atendida: 25%

Total: 100%.

## Critérios de aceitação

- [x] `src/writing/` criado com `writingLevelPolicy.js`.
- [x] `getWritingLevelPolicy('B1').rubricApplied` retorna `true`.
- [x] `getWritingLevelPolicy('A1').rubricApplied` retorna `false`.
- [x] `WRITING_RUBRIC_CRITERIA` soma 100% de peso.

## Compatibilidade preservada

- Não foi alterado `WritingLesson` ou render de Writing.
- Não foi alterado `writingBuilder.js`.
- Não foi criado contrato JSON de Writing.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Próximo bloco recomendado

`BLOCO-E2-WRITING-2-JSON-CONTRACT-LAB`.
