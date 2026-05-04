# BLOCO-H1 — AI Teacher Reviewer · Segunda IA revisora por tipo de aula

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado tecnicamente.

## Objetivo

Criar uma segunda chamada de IA que lê a aula gerada pelo fallback resiliente e age como professor revisor real, avaliando conteúdo pedagógico, progressão, naturalidade e adequação por tipo de aula.

## Arquivos criados

- `fluency-clean/src/services/aiReviewerPrompts.js`
- `fluency-clean/src/services/aiTeacherReviewer.js`
- `fluency-clean/docs/BLOCO-H1-AI-TEACHER-REVIEWER-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/resilientGeminiLessonDraft.js`
- `fluency-clean/src/services/index.js`

## Implementação

### `aiReviewerPrompts.js`

Criado contrato de revisão com:

- `AI_REVIEWER_VERSION = 'ai-reviewer-v1'`
- `AI_REVIEWER_SYSTEM_PROMPT`
- `AI_REVIEWER_OUTPUT_CONTRACT`
- prompts especializados para Grammar, Listening, Reading, Writing e Speaking
- `buildReviewerPromptForType(lesson, type, level)`

Cada prompt pede JSON válido e revisão pedagógica real, sem markdown e sem texto fora do JSON.

### `aiTeacherReviewer.js`

Criado executor do revisor IA com:

- `AI_REVIEW_APPROVAL_SCORE = 78`
- `AI_REVIEW_MAX_RETRIES = 1`
- `reviewLessonWithAI(lesson, { type, level, apiKeys, fetcher })`
- `shouldRegenerateLesson(aiReview)`
- `mergeReviews(mechanicalReview, aiReview)`

Regras implementadas:

- usa `gemini-2.5-flash` via política atual;
- usa apenas keys free/lesson keys;
- resumo econômico enviado ao revisor: máximo 4 seções, 8 vocabulários, 6 exercícios, 4 prompts e 400 caracteres de `listeningText`;
- falha de chave, erro HTTP ou JSON inválido retorna fallback aprovado para não bloquear o aluno;
- score combinado usa 40% revisor mecânico + 60% revisor IA;
- `criticalIssues` e score abaixo de 78 podem disparar regeneração.

### `resilientGeminiLessonDraft.js`

Integração feita após parse/normalização do JSON resiliente:

1. monta a aula com `normalizeFallbackLesson`;
2. roda `reviewLessonAsTeacher`;
3. roda `reviewLessonWithAI`;
4. avalia `shouldRegenerateLesson`;
5. se reprovar, regenera no máximo 1 vez com dica do professor revisor no prompt;
6. faz `mergeReviews`;
7. anexa o review com `attachTeacherReview`;
8. grava `quality.aiReview` na aula final.

Logs adicionados:

- `console.info('[AI Reviewer] score: ...')`
- `console.warn('[AI Reviewer] Regenerando: ...')`
- logs em `diagnostics` para status do revisor.

## Compatibilidade preservada

- `modelPolicy.js` não foi alterado.
- `geminiLessons.js` não foi alterado.
- `teacherReviewer.js` não foi alterado.
- `bundle.js` não foi alterado.
- `main` não foi alterada.
- `rewrite-fluency-clean` não foi alterada.
- backend Azure privado não foi alterado.
- Firebase/Azure de produção não foram alterados.

## Critérios de aceitação

- [x] `aiReviewerPrompts.js` criado com prompt por tipo.
- [x] `aiTeacherReviewer.js` criado com `reviewLessonWithAI`, `shouldRegenerateLesson`, `mergeReviews`.
- [x] `resilientGeminiLessonDraft.js` chama o review após montar a aula resiliente.
- [x] Aula reprovada pela IA dispara regeneração automática.
- [x] Máximo 1 regeneração por reprovação.
- [x] Falha de review usa fallback aprovado e aula segue normalmente.
- [x] `lesson.quality.aiReview` fica gravado na aula final.
- [x] Score merged: 40% mecânico + 60% IA.
- [x] Aula enviada para IA revisora usa resumo econômico.

## Checklist iPhone pendente

- Gerar uma aula Grammar A1 e confirmar log `[AI Reviewer] score: XX, approved: true/false`.
- Forçar reprovação e confirmar log `[AI Reviewer] Regenerando: motivo`.
- Confirmar que a aula salva tem `quality.aiReview.score`.
- Confirmar que sem key API a aula gera normalmente com `source: 'fallback'`.
- Medir o tempo extra de geração no preview.

## Próximo bloco recomendado

`BLOCO-H2-LESSON-HISTORY-CONTEXT-LAB`.
