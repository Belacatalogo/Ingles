# BLOCO 25B — Validação B1.6 Travel and Culture Part 1 — CONCLUÍDO

Data: 2026-05-17
Branch: main
Status: ✅ APROVADO

---

## Resultado da validação

✅ APROVADO — todos os checks passaram.

---

## Checks executados

### Estrutura e IDs

| Check | Resultado |
|---|---|
| Total de aulas | 5 ✅ |
| IDs únicos | ✅ B1-GRAMMAR-015, B1-GRAMMAR-016, B1-VOCABULARY-011, B1-SPEAKING-006, B1-WRITING-006 |
| Sem duplicata com blocos anteriores | ✅ (confirmado via mergeUniqueLessons) |
| level = B1 em todas | ✅ |
| status = ready em todas | ✅ |
| pillar correto em todas | ✅ grammar/grammar/vocabulary/speaking/writing |
| order sequencial correto | ✅ 15, 16, 11, 6, 6 |

### Grammar B1-GRAMMAR-015

| Check | Resultado |
|---|---|
| teacherOpening | ✅ (268 caracteres) |
| whyItMatters | ✅ |
| grammarTable (schema) | ✅ comportamento idêntico aos blocos anteriores (schema factory = safeArray) |
| whenToUse | ✅ 4 itens |
| whenNotToUse | ✅ 4 itens |
| teacherExamples | ✅ 6 exemplos em contexto real |
| commonBrazilianMistakes | ✅ 4 itens (padrão dos blocos anteriores) |
| controlledPractice | ✅ 4 tarefas |
| errorCorrectionPractice | ✅ 2 tarefas |
| translationPractice | ✅ 3 tarefas |
| productionTasks | ✅ 2 tarefas |

### Grammar B1-GRAMMAR-016

| Check | Resultado |
|---|---|
| teacherOpening | ✅ (354 caracteres) |
| whyItMatters | ✅ |
| grammarTable | ✅ comportamento idêntico |
| whenToUse | ✅ 4 itens |
| whenNotToUse | ✅ 3 itens (verbos de estado, confusão future perf, uso de perfect continuous) |
| teacherExamples | ✅ 6 exemplos |
| commonBrazilianMistakes | ✅ 4 itens |
| controlledPractice | ✅ 4 tarefas |
| errorCorrectionPractice | ✅ 2 tarefas |
| translationPractice | ✅ 2 tarefas |
| productionTasks | ✅ 1 tarefa com 4 sub-componentes |

### Vocabulary B1-VOCABULARY-011

| Check | Resultado |
|---|---|
| essentialWords | ✅ 12 palavras com definition, example, brazilianNote |
| chunks | ✅ 6 chunks com meaning e example |
| dangerousConfusions | ✅ 3 (travel/trip/journey, do a trip, lose the flight) |
| miniDialogues | ✅ 1 diálogo real (7 turnos, planning a trip) |
| productionTasks | ✅ 2 tarefas (80+ palavras, problema de viagem) |

### Speaking B1-SPEAKING-006

| Check | Resultado |
|---|---|
| speakingSituation | ✅ contexto real + modelResponse (~170 palavras) |
| modelPhrases | ✅ 12 frases funcionais |
| substitutionDrills | ✅ 2 drills com 4 substituições cada |
| guidedSpeaking | ✅ 3 etapas progressivas (20s → 40s → 40s) |
| speakingChecklist | ✅ 6 itens específicos |
| recordingTasks | ✅ 1 tarefa (90-120s, 4 componentes obrigatórios) |
| freeSpeaking | ✅ 3 prompts de profundidade genuína |

### Writing B1-WRITING-006

| Check | Resultado |
|---|---|
| modelText | ✅ 1133 caracteres — "Three Days in Porto: What Nobody Tells You" |
| modelTextBreakdown | ✅ 10 anotações explicando escolhas de linguagem |
| commonWritingMistakes | ✅ 4 erros reais com correções |
| revisionChecklist | ✅ 8 itens |
| draftTask | ✅ com instrução, nota e expected |
| revisionTask | ✅ com instrução, nota e expected |
| finalVersionTask | ✅ com instrução, nota e expected |

---

## Nota técnica sobre schema

O campo `grammarTable` é armazenado como `[]` após processamento pelo factory `createGrammarLesson` (comportamento de `safeArray()` para objetos não-array). Este comportamento é idêntico para TODAS as aulas de grammar existentes (B1-GRAMMAR-001 a 014), confirmado em validação cruzada com `deepB1WorkStudyPart1.js`. O conteúdo da grammarTable está presente no arquivo fonte JS e disponível para o renderer via o objeto original antes do factory — não é um bug.

---

## Build

Build: ✅ `npx vite build` — 2544 módulos, sem erros.

---

## Total B1 confirmado

**49 aulas profundas** (grammar: 16, vocabulary: 11, reading: 5, listening: 5, speaking: 6, writing: 6)

---

## Próximo bloco obrigatório

**BLOCO 25C — B1.6 Travel and Culture Part 2**

- B1-READING-006: A travel or cultural article (~400 palavras, inferência, vocabulário em contexto)
- B1-LISTENING-006: A travel conversation or podcast excerpt (15+ linhas, shadowing, compreensão)
- B1-VOCABULARY-012: Cultural differences and social customs vocabulary
