# BLOCO-H2 — Lesson History Context · Histórico alimenta o prompt de geração

Data: 2026-05-04
Branch: `rewrite-fluency-clean-lab`

## Status

Parcialmente implementado tecnicamente.

## Objetivo

Fazer a geração de aula considerar um resumo leve do histórico do aluno: regras gramaticais fracas, vocabulário fraco, pronúncia fraca e acurácia recente por tipo de prática.

O contexto deve ser sugestivo, não obrigatório. Ele não força tópico e não deve conflitar com o currículo.

## Arquivos criados

- `fluency-clean/src/services/lessonHistoryContext.js`
- `fluency-clean/docs/BLOCO-H2-LESSON-HISTORY-CONTEXT-LAB.md`

## Arquivos alterados

- `fluency-clean/src/services/lessonJsonContract.js`
- `fluency-clean/src/services/index.js`

## Implementação realizada

### `lessonHistoryContext.js`

Criado módulo com:

- `LESSON_HISTORY_CONTEXT_VERSION = 'lesson-history-context-v1'`
- `LESSON_HISTORY_CONTEXT_MAX_CHARS = 400`
- `buildLessonHistoryContext({ lessonType, level })`
- `formatHistoryContextForPrompt(context, { maxChars })`
- `buildLessonHistoryPromptPrefix({ lessonType, level, maxChars })`

Fontes usadas:

- `getDuePracticeSrsItems` + `SRS_ITEM_TYPES.GRAMMAR_PATTERN`
- `listMasteryTags` + `TAG_DOMAIN.VOCABULARY`
- `listMasteryTags` + `TAG_DOMAIN.PRONUNCIATION`
- `getPracticeTelemetrySummary`

Comportamento:

- aluno novo/sem histórico relevante retorna string vazia;
- erro de leitura do histórico não quebra geração;
- contexto não inclui nome, email, ID ou dados pessoais diretos;
- contexto final é limitado a 400 caracteres;
- quando há foco sugerido, aparece log: `[LessonHistoryContext] suggestedFocus: "..."`.

### Integração no gerador principal em blocos

A injeção foi feita no construtor central de contrato usado pelo `geminiLessons.js`:

- arquivo: `fluency-clean/src/services/lessonJsonContract.js`
- função: `buildJsonContractInstruction({ lessonType, blockId, level })`

Regra aplicada:

- injeta histórico somente quando `blockId === 'structure'`;
- não injeta nos blocos `mainContent`, `vocabulary`, `exercises` ou `production`;
- não força tópico, apenas adiciona contexto antes do contrato da estrutura.

Isso preserva o motor atual de geração em blocos e evita reescrever `geminiLessons.js`, que consome `buildJsonContractInstruction` para montar cada prompt.

### Export público

`fluency-clean/src/services/index.js` passou a exportar:

- `LESSON_HISTORY_CONTEXT_VERSION`
- `LESSON_HISTORY_CONTEXT_MAX_CHARS`
- `buildLessonHistoryContext`
- `formatHistoryContextForPrompt`
- `buildLessonHistoryPromptPrefix`

## Pendência técnica

O bloco também solicitava alterar `fluency-clean/src/services/resilientGeminiLessonDraft.js` para passar o contexto ao fallback resiliente.

A tentativa de alteração completa desse arquivo foi bloqueada pelo conector antes de aplicar. Portanto:

- `resilientGeminiLessonDraft.js` não foi alterado neste fechamento;
- o gerador principal em blocos já recebe o contexto histórico;
- o fallback resiliente ainda não recebe o contexto histórico.

## Critérios de aceitação

- [x] `lessonHistoryContext.js` criado com `buildLessonHistoryContext` e `formatHistoryContextForPrompt`.
- [x] Contexto limitado a 400 caracteres.
- [x] Aluno novo/sem histórico retorna `''` e nada é injetado.
- [x] Erro ao ler histórico não quebra geração.
- [x] Contexto não força tópico.
- [x] Contexto não é injetado em todos os blocos; apenas em `structure`.
- [x] Export público adicionado em `services/index.js`.
- [x] Geração principal em blocos recebe contexto via `lessonJsonContract.js`.
- [ ] `resilientGeminiLessonDraft.js` recebe contexto no fallback resiliente.
- [ ] Smoke test manual no preview/iPhone.

## O que NÃO foi feito

- Não forcei tópico de aula.
- Não injetei histórico em todos os blocos.
- Não gravei dados pessoais no prompt.
- Não mexi em `bundle.js`.
- Não mexi em `main`.
- Não mexi em `rewrite-fluency-clean`.
- Não mexi no backend Azure privado.
- Não mexi em Firebase/Azure de produção.
- Não mexi no sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`.

## Checklist iPhone pendente

- Gerar aula Grammar depois de ter tags fracas como `have_has_confusion`.
- Confirmar log `[LessonHistoryContext] suggestedFocus: "..."`.
- Confirmar que o prompt de estrutura usa o histórico sem mostrar isso na UI da aula.
- Confirmar aluno novo sem histórico gera aula normalmente.
- Confirmar que a aula não muda de tópico de forma forçada.

## Próximo ajuste recomendado

Finalizar a integração do contexto em `resilientGeminiLessonDraft.js` quando o conector permitir alteração segura desse arquivo.

Depois disso, seguir para:

`BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB`.
