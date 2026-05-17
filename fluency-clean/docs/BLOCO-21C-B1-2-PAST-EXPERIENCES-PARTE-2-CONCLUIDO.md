# BLOCO 21C — B1.2 Past Experiences — Parte 2

Branch: `main`

## Objetivo

Completar o pacote B1.2 Past Experiences com Vocabulary, Listening e Writing.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/B1/deepB1PastExperiencesPart2.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **4 aulas**

### Vocabulary

- `B1-VOCABULARY-004` — Narrative vocabulary: sequence, surprise and emotion

Foco:
- 16 palavras/expressões de narrativa: at first, gradually, eventually, all of a sudden, to my surprise, it turned out, believe it or not, out of nowhere, by the end, looking back, at the time, with hindsight, in the end, as it happened, all along;
- arco narrativo completo: at first → gradually → eventually → in the end;
- escala de surpresa: surprisingly → it turned out → believe it or not → out of nowhere;
- confusões perigosas: "in the end" vs "at the end", "eventually" ≠ "eventualmente" (falso cognato), artigo em "all of a sudden";
- mini-diálogo situado: entrevista de emprego;
- produção: narrativa de 5-7 frases, completar lacunas, tradução.

- `B1-VOCABULARY-005` — Talking about the past: used to, would, expressions

Foco:
- 14 expressões: used to, would, back then, in those days, it was the first time, I had never, as a child, at the time, that was before, I've always, I never used to, looking back on it;
- regra "used to" vs "would": estados vs ações;
- conceito: "would" não funciona para estados (live, be, know);
- confusões perigosas: "I use to" (presente inexistente), "I would live" (estado com would), Past Perfect obrigatório após "first time";
- mini-diálogo nostálgico com 6 linhas;
- produção: escrita autobiográfica, correção de erros, tradução.

### Listening

- `B1-LISTENING-002` — Listening to a personal story with sequence and emotion

Foco:
- monólogo de Maya (276 palavras) sobre ganhar confiança no inglês em Londres;
- todos os tempos narrativos em uso real: Past Simple, Past Continuous, used to, would;
- vocabulário narrativo de Vocabulary-004 em contexto autêntico;
- 5 perguntas de compreensão com evidência e por que importa;
- vocabulário em contexto: "froze", "turning point", diferença at first vs at the time;
- 3 alvos de shadowing com notas de ritmo e stress.

### Writing

- `B1-WRITING-002` — Write a short personal narrative (120-150 palavras)

Foco:
- modelo de 148 palavras com estrutura completa: background → evento → reação → resolução → reflexão;
- breakdown linha por linha (10 notas pedagógicas);
- checklist de revisão de 8 itens;
- erros comuns de escrita: "all of sudden", Past Perfect obrigatório, "would" com estado, reflexão no início;
- draft task + revision task + final version task;
- critério de domínio: narrativa 120-150 palavras com 5 componentes estruturais.

## Total B1 no currículo após este bloco

| Pilar | Aulas | IDs |
|---|---|---|
| grammar | 4 | B1-GRAMMAR-001, 002, 003, 004 |
| vocabulary | 5 | B1-VOCABULARY-001, 002, 003, 004, 005 |
| reading | 2 | B1-READING-001, 002 |
| listening | 2 | B1-LISTENING-001, 002 |
| speaking | 2 | B1-SPEAKING-001, 002 |
| writing | 2 | B1-WRITING-001, 002 |
| **TOTAL** | **17** | |

## Build

✅ Build passou. 2537+ módulos, sem erros.

## Notas técnicas

Fix aplicado: campos não-padrão remapeados para schema oficial do `createVocabularyLesson` e `createListeningLesson`:
- `commonBrazilianMistakes` → `dangerousConfusions` (task format)
- `miniDialogue` (objeto com speaker/text) → `miniDialogues` (array com title/lines/focus)
- `intensityScale`, `usedToVsWould` (não-schema) → `conceptExplanation`
- `shadowingTargets` → `shadowing` (task format)
- `vocabularyInContext` → `vocabulary`
- `productionTask` → `oralProduction`

## Próximo bloco

BLOCO 21D — Validação B1.2 Past Experiences Parte 2
