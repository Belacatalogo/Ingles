# BLOCO 25C — B1.6 Travel and Culture Part 2 — CONCLUÍDO

Data: 2026-05-17
Branch: main
Status: ✅ APROVADO

---

## Objetivo

Criar a segunda parte da unidade B1.6 Travel and Culture com texto de leitura sobre slow travel, conversação de escuta sobre viagem a Marrocos, e vocabulário de diferenças culturais e costumes sociais.

---

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/B1/deepB1TravelCulturePart2.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js` — import + B1_READY_LESSONS + STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR atualizados

---

## Aulas criadas (3 aulas profundas)

| ID | Pilar | Título |
|---|---|---|
| B1-READING-006 | reading | Reading: The case for slow travel |
| B1-LISTENING-006 | listening | Listening: A trip to Marrakech |
| B1-VOCABULARY-012 | vocabulary | Cultural differences and social customs |

---

## Detalhamento das aulas

### B1-READING-006 — Reading: The case for slow travel

**Texto:** "The case for slow travel" — 6 parágrafos, ~2038 caracteres. Artigo de opinião argumentando por viagem lenta em vez de roteiro checklist.

**Estrutura:**
- preReading: pergunta de ativação + 5 palavras de preview
- vocabulary: 3 tarefas de inferência (exhaustion, spread yourself thin, by most calculations)
- comprehensionQuestions: 5 perguntas com evidência e why (identificação direta, lista de 3 itens, argumento ambiental, resposta a crítica, conclusão)
- guidedSummary: 3-4 frases com 4 componentes obrigatórios + modelAnswer
- productionTask: opinião pessoal sobre o argumento do texto

**Conexões pedagógicas:**
- Vocabulário de viagem desta unidade em contexto real (itinerary, off the beaten track)
- Comparativos e superlativos em uso natural
- Estrutura argumentativa (concessão + contra-argumento)

---

### B1-LISTENING-006 — Listening: A trip to Marrakech

**Transcript:** 13 turnos de diálogo — Daniel descreve viagem a Marrocos para amiga Priya (~1776 caracteres armazenados como string pelo schema, padrão idêntico aos blocos anteriores).

**Gramática em uso natural:**
- Comparativos: "far better than I'd expected", "nowhere near enough"
- Past continuous + past simple: "While we were walking... we stumbled upon"
- Third Conditional: "Without a guide, I would have got completely lost"
- Future perfect: "By the time I leave next time, I will have spent at least two weeks there"

**Estrutura:**
- comprehensionQuestions: 5 perguntas com evidência (expectativas vs. realidade, decisão de guia, highlight, evento inesperado, future perfect)
- vocabulary: 3 tarefas (maze, wandering, nowhere near)
- shadowing: 3 trechos focados (comparativo, past continuous + past simple, future perfect)
- oralProduction: 60-90s como Daniel, 4 componentes obrigatórios

---

### B1-VOCABULARY-012 — Cultural differences and social customs

**12 palavras essenciais:** etiquette, custom, taboo, cause offence, blend in, be aware of, host, tipping, queue/line up, haggle, greet/greeting, dress code

**6 chunks funcionais:** it is considered rude/polite to, you are expected to, it is worth being aware that, out of respect for, without meaning to, make an effort to

**3 dangerousConfusions:** custom/tradition/etiquette, "make offence" vs "cause offence", unaware vs didn't know about

**1 mini-diálogo:** 8 turnos — Camila e Kenji discutem etiqueta no Japão (chopsticks, tipping, blending in)

**2 productionTasks:** costume brasileiro para estrangeiro (3-4 frases), conselhos de viagem (4-5 frases com 4 expressões)

---

## Conexão ao currículo

- `B1_DEEP_TRAVEL_CULTURE_PART2` adicionado a `B1_READY_LESSONS`
- `B1_DEEP_TRAVEL_CULTURE_PART2_BY_PILLAR` adicionado a `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.B1`
- Total B1 após este bloco: **52 aulas**

| Pilar | Anterior | Adicionado | Total |
|---|---|---|---|
| Grammar | 16 | 0 | 16 |
| Vocabulary | 11 | 1 (012) | 12 |
| Reading | 5 | 1 (006) | 6 |
| Listening | 5 | 1 (006) | 6 |
| Speaking | 6 | 0 | 6 |
| Writing | 6 | 0 | 6 |
| **Total** | **49** | **3** | **52** |

---

## Build e testes

**Build:** ✅ `npx vite build` — 2554 módulos sem erros (anterior: 2544)
**Playwright:** browser não disponível no ambiente remoto (pré-existente).

---

## Regras respeitadas

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Não recriou A1 ou A2.
Não mexeu em bundle.js.
Não ativou Firebase/Azure/Gemini.
Não colocou secrets.
Preservou todos os fixes BLOCO-AUDIT-FIX-01 a FIX-06.
Sem conteúdo genérico. Sem placeholders.
3 aulas profundas premium criadas e conectadas.
```

---

## Próximo bloco obrigatório

**BLOCO 25D — Validação B1.6 Travel and Culture Part 2**

Validar:
- IDs únicos (B1-READING-006, B1-LISTENING-006, B1-VOCABULARY-012)
- level B1, status ready, pillar correto
- Reading: mainText, comprehensionQuestions, guidedSummary
- Listening: transcript, comprehensionQuestions, shadowing
- Vocabulary: essentialWords, chunks, miniDialogues
- Build verde confirmado
- Total B1: 52 aulas

Após validação, verificar se B1.6 está completa ou se há aulas restantes (conforme b1Map.js).
