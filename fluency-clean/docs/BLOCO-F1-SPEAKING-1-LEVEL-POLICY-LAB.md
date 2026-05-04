# BLOCO-F1 — Speaking 1 · Level Policy

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/speaking/speakingLevelPolicy.js` com política formal de Speaking por nível A1→C1.

Este bloco complementa a estrutura já existente de Speaking sem tocar em:

- `speakingFlow.js`
- `SpeakingStepper.jsx`
- render de Speaking
- Azure
- gravação
- backend

## Arquivos criados

- `fluency-clean/src/speaking/speakingLevelPolicy.js`
- `fluency-clean/docs/BLOCO-F1-SPEAKING-1-LEVEL-POLICY-LAB.md`

## Exports criados

- `SPEAKING_LEVELS`
- `SPEAKING_SKILLS`
- `SPEAKING_LEVEL_POLICY_VERSION`
- `SPEAKING_LEVEL_POLICIES`
- `normalizeSpeakingLevel(level)`
- `getSpeakingLevelPolicy(level)`
- `getSpeakingPolicySummary(level)`
- `buildSpeakingPolicyPrompt(level)`

## Níveis implementados

- `A1 · Repetição e reconhecimento`
- `A2 · Fala funcional`
- `B1 · Fala independente`
- `B2 · Fala fluente`
- `C1 · Fala avançada`

## Política por nível

Cada nível define:

- objetivo do aluno;
- tamanho de fala esperado;
- score mínimo Azure;
- se Azure deve bloquear em falha;
- repetições permitidas;
- habilidades permitidas;
- instrução de produção;
- mínimo e máximo de palavras.

## Critérios de aceitação

- [x] Arquivo criado com todos exports.
- [x] `azureMinPassScore` varia por nível: 50 → 75.
- [x] `azureSkipOnFail: true` em A1.
- [x] `buildSpeakingPolicyPrompt('B1')` retorna string multi-linha.
- [x] Nível inválido cai em A1 sem erro.

## Compatibilidade preservada

- Não foi alterado `speakingFlow.js`.
- Não foi alterado `SpeakingStepper.jsx`.
- Não foi alterado `SpeakingScreen.jsx`.
- Não foi alterado Azure.
- Não foi alterado sistema de gravação.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Próximo bloco recomendado

`BLOCO-F2-SPEAKING-2-JSON-CONTRACT-LAB`.
