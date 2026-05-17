# BLOCO 25A — B1.6 Travel and Culture Part 1 — CONCLUÍDO

Data: 2026-05-17
Branch: main
Status: ✅ APROVADO

---

## Objetivo

Criar a primeira parte da unidade B1.6 Travel and Culture com aulas profundas sobre comparações, planejamento futuro, vocabulário de viagem, narrativa oral de experiências e escrita descritiva.

---

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/B1/deepB1TravelCulturePart1.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js` — import + B1_READY_LESSONS + STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR atualizados

---

## Aulas criadas (5 aulas profundas)

| ID | Pilar | Título |
|---|---|---|
| B1-GRAMMAR-015 | grammar | Comparatives and superlatives: review and advanced use |
| B1-GRAMMAR-016 | grammar | Future continuous and future perfect |
| B1-VOCABULARY-011 | vocabulary | Travel and transport vocabulary |
| B1-SPEAKING-006 | speaking | Describe a trip or travel experience |
| B1-WRITING-006 | writing | Write a travel blog post or email about a trip |

---

## Detalhamento das aulas

### B1-GRAMMAR-015 — Comparatives and superlatives (review + advanced)

**Objetivos:**
- Revisar comparativos e superlativos básicos e irregulares
- Double comparatives: "the more... the more"
- "as... as", "not as... as", "twice as... as"
- "fewer" (contáveis) vs "less" (incontáveis)

**Diferença do A2:** A2 usa formas básicas ("bigger", "the best"). B1 usa double comparatives, comparações quantitativas precisas e nuance negativa ("nowhere near as").

**Conteúdo pedagógico:**
- Tabela gramatical com 8 estruturas + exemplos de viagem
- whenToUse / whenNotToUse com 4 itens cada
- 6 teacherExamples em contexto real de viagem
- 4 commonBrazilianMistakes com explicação
- 4 controlledPractice, 2 errorCorrectionPractice, 3 translationPractice
- 2 productionTasks com exemplos completos

---

### B1-GRAMMAR-016 — Future continuous and future perfect

**Objetivos:**
- Future continuous: will be + -ing (ação em progresso num momento futuro)
- Future perfect: will have + past participle (conclusão antes de um ponto futuro)
- Distinção entre os dois tempos
- Marcadores: "by the time", "by then", "this time next week"

**Diferença do A2:** A2 usa "will" simples e "going to". B1 distingue com precisão o que estará acontecendo vs o que já terá acontecido num momento futuro.

**Conteúdo pedagógico:**
- Tabela gramatical com 6 formas + exemplos de viagem
- whenToUse / whenNotToUse incluindo restrição de verbos de estado
- 6 teacherExamples reais
- 4 commonBrazilianMistakes com erros reais de brasileiros
- 4 controlledPractice, 2 errorCorrectionPractice, 2 translationPractice
- 1 productionTask com 4 sub-tarefas integradas

---

### B1-VOCABULARY-011 — Travel and transport vocabulary

**Objetivos:**
- Planejamento, reserva e logística de viagem
- Phrasal verbs: check in, set off, get around, drop off, pick up
- Vocabulário de acomodação e transporte com precisão
- Problemas comuns: missed connection, customs, jet lag

**12 palavras essenciais:** itinerary, check in/check out, set off, get around, layover/stopover, accommodation, self-catering, off the beaten track, peak/off-peak season, drop off/pick up, customs/border control, jet lag

**6 chunks funcionais:** book in advance, make the most of, go sightseeing, miss a connection, travel light, get the most out of

**Conteúdo pedagógico:**
- 3 dangerousConfusions: travel/trip/journey, "do a trip", "lose the flight"
- 1 mini-diálogo real (planning a trip, 7 turnos)
- 2 productionTasks com critérios de qualidade

---

### B1-SPEAKING-006 — Describe a trip or travel experience

**Objetivos:**
- Narrativa estruturada de viagem
- Passado simples + contínuo para cenário e eventos
- Detalhes culturais, sensoriais e emocionais
- Expressão de opinião com nuance além de "it was great"

**Modelo de resposta:** ~170 palavras, B1 real com passados, avaliação honesta, recomendação específica (contexto: pergunta de colega em almoço)

**12 modelPhrases** incluindo: "completely exceeded my expectations", "the highlight for me was", "I hadn't expected it to be so", "by the time we had found our feet"

**Conteúdo pedagógico:**
- 2 substitutionDrills (highlight + hadn't expected)
- 3 guidedSpeaking progressivos (20s → 40s → 40s)
- 6 speakingChecklist itens específicos
- 1 recordingTask (90-120s, 4 componentes obrigatórios)
- 3 freeSpeaking prompts de profundidade genuína

---

### B1-WRITING-006 — Write a travel blog post or email about a trip

**Objetivos:**
- Texto descritivo com abertura, desenvolvimento e encerramento
- Linguagem vívida, específica (não genérica)
- Comparativos avançados + future forms da unidade
- Conectores variados: however, while, by the time, what struck me most

**Texto modelo:** "Three Days in Porto: What Nobody Tells You" — 200 palavras, B1 real com double comparative, past perfect, past continuous, superlativo com intensificador, recomendação específica

**10 anotações de breakdown** explicando cada escolha de linguagem

**4 commonWritingMistakes:**
1. Adjetivos genéricos ("very good") vs específicos
2. "then... then... then" vs conectores variados
3. Recomendações vagas vs específicas
4. Superlativo sem present perfect

**8 revisionChecklist itens** + draftTask + revisionTask + finalVersionTask

---

## Conexão ao currículo

- `B1_DEEP_TRAVEL_CULTURE_PART1` adicionado a `B1_READY_LESSONS` em `staticLessonContent.js`
- `B1_DEEP_TRAVEL_CULTURE_PART1_BY_PILLAR` adicionado a `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.B1`
- Total B1 após este bloco: **49 aulas**

| Pilar | Total anterior | Adicionado | Novo total |
|---|---|---|---|
| Grammar | 14 | 2 (015, 016) | 16 |
| Vocabulary | 10 | 1 (011) | 11 |
| Reading | 5 | 0 | 5 |
| Listening | 5 | 0 | 5 |
| Speaking | 5 | 1 (006) | 6 |
| Writing | 5 | 1 (006) | 6 |
| **Total** | **44** | **5** | **49** |

---

## Build e testes

**Build:** ✅ `npx vite build` — 2544 módulos sem erros (anterior: 2534)
**Playwright:** browser não disponível no ambiente remoto (pré-existente — documentado em blocos anteriores). Nenhuma lógica de componente alterada.

---

## Regras respeitadas

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não recriou A1.
Não tocou em A2.
Não mexeu em bundle.js.
Não usou DOM injection.
Não ativou Firebase/Azure/Gemini.
Não colocou secrets no frontend.
Preservou todos os fixes BLOCO-AUDIT-FIX-01 a FIX-06.
Sem conteúdo genérico.
Sem placeholders.
5 aulas profundas premium criadas e conectadas.
```

---

## Próximo bloco obrigatório

**BLOCO 25B — Validação B1.6 Travel and Culture Part 1**

Validar:
- IDs únicos (B1-GRAMMAR-015/016, B1-VOCABULARY-011, B1-SPEAKING-006, B1-WRITING-006)
- level B1, status ready, pillar correto em todas as 5 aulas
- teacherOpening, whyItMatters (grammar), differenceFromA2 (grammar) em aulas de grammar
- Campos schema corretos por pilar
- Build verde confirmado
- Total B1: 49 aulas confirmadas

Após validação, continuar para **BLOCO 25C — B1.6 Travel and Culture Part 2**:
- B1-READING-006: A travel or cultural article (~400 palavras)
- B1-LISTENING-006: A travel conversation or podcast excerpt
- B1-VOCABULARY-012: Cultural differences and social customs vocabulary
