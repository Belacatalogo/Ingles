# BLOCO-D1 — Listening 1 · Política por Nível A1→C1

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar `src/listening/listeningLevelPolicy.js`, política formal de Listening por nível A1→C1.

Define internamente:

- duração do áudio;
- velocidades permitidas;
- repetições livres e com aviso;
- tipos de texto auditivo;
- habilidades por nível;
- máximo de palavras para ditado;
- idioma das instruções;
- regra de revelação de transcrição;
- shadowing;
- quantidade de questões;
- cuidados de cache no iPhone.

## Arquivos criados

- `fluency-clean/src/listening/listeningLevelPolicy.js`
- `fluency-clean/docs/BLOCO-D1-LISTENING-1-LEVEL-POLICY-LAB.md`

## Exports criados

- `LISTENING_LEVEL_POLICY_VERSION`
- `LISTENING_LEVELS`
- `LISTENING_SKILLS`
- `LISTENING_TEXT_TYPES`
- `LISTENING_LEVEL_POLICIES`
- `normalizeListeningLevel(level)`
- `getListeningLevelPolicy(level)`
- `getListeningPolicySummary(level)`
- `buildListeningPolicyPrompt(level)`

## Níveis implementados

- `A1 · Escuta inicial guiada`
- `A2 · Escuta funcional`
- `B1 · Escuta independente`
- `B2 · Escuta analítica`
- `C1 · Escuta avançada e nuance`

## Critérios de aceitação

- [x] `src/listening/listeningLevelPolicy.js` criado.
- [x] `getListeningLevelPolicy('A1').freeRepetitions` retorna `3`.
- [x] `getListeningLevelPolicy('C1').allowedSpeeds` retorna `[1.0, 1.25]`.
- [x] `buildListeningPolicyPrompt('B1')` retorna string multi-linha.
- [x] Nível inválido retorna A1 sem erro.

## Compatibilidade preservada

- Não foi alterado `ListeningLessonClean.jsx`.
- Não foi alterado `listeningBuilder.js`.
- Não foi criado contrato JSON de Listening.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Próximo bloco recomendado

`BLOCO-D2-LISTENING-2-JSON-CONTRACT-LAB`.
