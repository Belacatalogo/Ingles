# BLOCO FLASHCARDS-QUALITY-1 — Qualidade dos Flashcards por Pilar + Teste Playwright

Data: 2026-05-17

## Resumo

Melhoria da qualidade dos flashcards por pilar e adição de filtros de qualidade no extrator
`lessonFlashcards.js`. Testes Playwright e2e adicionados para validar o fluxo de flashcards
no iPhone (mock de aula injetada via localStorage).

---

## O que foi feito

### 1. `fluency-clean/src/services/lessonFlashcards.js` — reescrita completa

**Filtros de qualidade adicionados:**

- `GENERIC_BACKS` — Set com 12 strings placeholder genéricas que não têm valor de estudo.
  Ex: `'item importante da aula atual'`, `'padrão gramatical da aula'`, etc.
- `hasUsefulContent(value)` — retorna `true` apenas se o texto for não-vazio E não pertencer
  ao conjunto `GENERIC_BACKS`.
- `makeCard`: agora rejeita cards em que `translation` AND `example` ambos falham no
  `hasUsefulContent()`. Um card com frente em inglês mas sem verso útil não é gerado.

**`isTooLongFront(value, opts)`:**

- Aceita `opts.longFront` para ampliar o limite de 54 chars / 9 palavras para
  70 chars / 12 palavras — necessário para frases de speaking e shadowing.
- `fromArray` repassa `opts` para `makeCard` em todos os extractors de pilar.

**Extractors por pilar sem fallbacks genéricos:**

| Pillar | Extractor | `longFront` |
|---|---|---|
| Speaking | `cardsFromSpeakingFields` — modelPhrases | ✅ |
| Listening | `cardsFromListeningFields` — shadowingPhrases | ✅ |
| Grammar | `cardsFromDeepGrammar` — grammarTable, teacherExamples, commonBrazilianMistakes | ❌ |
| Vocabulary | `cardsFromVocabularyLikeFields` — essentialWords, vocabulary, chunks, collocations | ❌ |
| Writing | `cardsFromWritingFields` — usefulSentences, writingBlocks, connectors | ❌ |
| Listening | `cardsFromListeningFields` — keyWordsToHear | ❌ |

Strings genéricas de fallback como `'Padrão gramatical da aula.'`, `'Palavra-chave na escuta.'`,
`'Pronunciar com atenção.'` foram removidas de todos os extractors — o card simplesmente não
é gerado quando o verso não tem conteúdo real.

**`hasLessonFlashcards`:**

Mudança: `buildLessonFlashcards(lesson).length > 0` → `>= 2`.
O botão "Ver flashcards" só aparece quando há pelo menos 2 cards de qualidade.

### 2. `fluency-clean/e2e/flashcards.spec.js` — novo arquivo

3 testes Playwright para iPhone 13 e iPhone SE (6 instâncias totais):

1. **aba Aula: hero da aula injetada aparece** — injeta mock lesson via localStorage
   (`schemaVersion: 'static-lesson-schema-v1'` bypassa `normalizeLesson`), verifica que
   o heading "Daily Routine" aparece na aba Aula.

2. **aba Cartas: botão "Flashcards da aula" aparece com aula de qualidade** — verifica que
   o botão de flashcards da aula aparece quando a aula injetada tem `essentialWords` reais.

3. **aba Cartas: clicar "Flashcards da aula" abre modo de estudo** — clica no botão e
   verifica que o modo de estudo de flashcards é aberto com conteúdo da aula.

Mock lesson usada nos testes:
```js
const MOCK_LESSON = {
  id: 'e2e-test-vocab-daily-routine',
  title: 'Vocabulary — Daily Routine',
  pillar: 'vocabulary',
  type: 'vocabulary',
  level: 'A1',
  schemaVersion: 'static-lesson-schema-v1',
  essentialWords: [
    { word: 'wake up', meaning: 'acordar', example: 'I wake up at 7 AM.' },
    { word: 'get dressed', meaning: 'se vestir', example: 'I get dressed after my shower.' },
    { word: 'have breakfast', meaning: 'tomar café da manhã', example: 'I have breakfast at 8 AM.' },
    { word: 'go to work', meaning: 'ir para o trabalho', example: 'I go to work by bus.' },
    { word: 'have lunch', meaning: 'almoçar', example: 'I have lunch at noon.' },
  ],
};
```

---

## Resultado dos testes

```
Running 20 tests using 2 workers
  20 passed (33.3s)
```

- 14 testes de smoke (iPhone 13 + iPhone SE) ✅
- 6 testes de flashcards (3 × 2 viewports) ✅

---

## Build

```
✓ 2533 módulos, sem erros.
```

---

## Arquivos alterados

- `src/services/lessonFlashcards.js` — reescrita com filtros de qualidade
- `e2e/flashcards.spec.js` — novo arquivo de testes e2e

Arquivos NÃO alterados:
- Nenhum `.jsx` de lógica (LessonFlowShell, useLessonFlowState, progressStore)
- Firebase, Azure, Gemini, Cloudinary
- Conteúdo pedagógico das aulas
- LessonCompletionCard, FlashcardsScreen (lógica intacta)

---

## Confirmação

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em progressStore/completeLesson.
Sem alteração em Azure/Gemini/Firebase/secrets.
```

## Próxima pendência

MASTERY-GATE-1 — integração real do mastery gate A1→A2.
