# BLOCO 21B — Validação B1.2 Past Experiences — Parte 1

Branch: `main`

## Resultado

✅ **APROVADO — todos os checks passaram**

## Aulas validadas

| ID | Pilar | Order | Status |
|---|---|---|---|
| B1-GRAMMAR-003 | grammar | 3 | ✅ |
| B1-GRAMMAR-004 | grammar | 4 | ✅ |
| B1-READING-002 | reading | 2 | ✅ |
| B1-SPEAKING-002 | speaking | 2 | ✅ |

## Checks executados

- [x] IDs únicos — sem duplicata em todos os 13 B1
- [x] level = B1, status = ready em todas
- [x] Grammar-003: grammarTable ✅, commonBrazilianMistakes: 4 ✅, productionTasks: 3 ✅
- [x] Grammar-004: grammarTable ✅, commonBrazilianMistakes: 4 ✅, productionTasks: 2 ✅
- [x] Reading-002: 233 palavras ✅, 4 comprehensionQuestions ✅
- [x] Speaking-002: speakingSituation (344 chars) ✅, modelPhrases: 7 ✅, recordingTasks: 1 ✅, guidedSpeaking: 3 ✅

## Fix aplicado neste bloco

B1-SPEAKING-002 usava campos não-padrão (speakingModel, languageToolkit, guidedPractice, recordingTask singular, checklistBeforeRecording) que são removidos pelo `createSpeakingLesson()` durante normalização. Conteúdo remapeado para campos oficiais do schema:
- `speakingModel` → `speakingSituation` (texto da situação + modelo B1)
- `languageToolkit` → `modelPhrases`
- `guidedPractice` → `guidedSpeaking`
- `recordingTask` (singular) → `recordingTasks` (plural array)
- `checklistBeforeRecording` → `speakingChecklist`
- `speakingPrompts` → `freeSpeaking`

## Estado total do B1 após BLOCO 21B

| Pilar | Aulas | IDs |
|---|---|---|
| grammar | 4 | B1-GRAMMAR-001, 002, 003, 004 |
| vocabulary | 3 | B1-VOCABULARY-001, 002, 003 |
| reading | 2 | B1-READING-001, 002 |
| listening | 1 | B1-LISTENING-001 |
| speaking | 2 | B1-SPEAKING-001, 002 |
| writing | 1 | B1-WRITING-001 |
| **TOTAL** | **13** | |

Sem IDs duplicados. Sem nível incorreto. Build: ✅ 2536 módulos.

## Próximo bloco

BLOCO 21C — B1.2 Past Experiences — Parte 2
- Vocabulary-004: Narrative vocabulary (sequência, surpresa, emoção em narrativa)
- Vocabulary-005: Talking about the past — expressions (ago, used to, would, it was the first time)
- Listening-002: Listening to a personal story with sequence and emotion
- Writing-002: Write a short personal narrative (120-150 palavras)
