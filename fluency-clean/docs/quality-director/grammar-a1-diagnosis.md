# Diagnóstico — P1 de Grammar A1 (Bloco 23D)

> Documento de diagnóstico. **Nenhum código de produção, auditor, factory ou
> conteúdo de aula foi alterado neste bloco.** Objetivo: descobrir a causa real
> dos 12 P1 de Grammar A1 antes de qualquer correção.

## 1. Baseline oficial de referência

Relatório oficial confirmado (`fluency-clean/docs/quality-director/latest/quality-director-latest.md`),
gerado em `2026-05-21T00:50:37.908Z`:

- **P0: 0**
- **P1: 319**
- **P2: 1040**
- exercise-quality P1: **0**
- pillar-quality P1: **318**

Por área:

| Área | P0 | P1 | P2 |
|---|---|---|---|
| Navegação e estabilidade | 0 | 0 | 38 |
| Jornada real do aluno | 0 | 1 | 2 |
| Exercícios e alternativas | 0 | 0 | 798 |
| Aulas e pedagogia (pillar-quality) | 0 | 318 | 202 |
| Visual e mobile / Progresso / Estados vazios / Currículo / Acessibilidade | 0 | 0 | saudável |

Este baseline permanece a referência. Nenhum número foi alterado neste bloco
(sem mudança de código → sem necessidade de rodar Flow full).

## 2. P1 de Grammar A1 atuais (top issues)

Todos no pilar GRAMMAR, nível A1, pillar-quality:

**Grupo A — "Grammar sem sinal claro de prática ativa" (P1)**
- A1-GRAMMAR-001 — Subject pronouns
- A1-GRAMMAR-002 — Verb to be — affirmative
- A1-GRAMMAR-003 — Verb to be — negative
- A1-GRAMMAR-004 — Verb to be — questions
- A1-GRAMMAR-005 — Short answers with to be
- A1-GRAMMAR-006 — Possessive adjectives: my, your, his, her

**Grupo B — "Grammar sem explicação conceitual clara" (P1)**
- A1-GRAMMAR-007 — Articles: a / an
- A1-GRAMMAR-008 — Plural nouns
- A1-GRAMMAR-009 — This / that / these / those
- A1-GRAMMAR-010 — There is / there are
- A1-GRAMMAR-011 — Have / has
- A1-GRAMMAR-012 — Simple adjectives

## 3. Fonte real das aulas A1-GRAMMAR-001..012

### Caminho de carregamento (runtime do auditor)

```
pillar-quality.audit.spec.js
  → getStaticLessons('A1')                 (src/content/curriculum/index.js)
      → makeLevelPillars → makePillarLessons → lesson()
          base = item do A1_GRAMMAR_MAP (a1Map.js)
          ready = findStaticReadyLesson(id) (staticLessonContent.js)
          retorna { ...base, ...ready, status:'ready' }
      → filtra status === 'ready'
  → auditLessonByPillar(lesson)            (helpers/pillarQualityRules.js → auditGrammar)
```

- Os IDs `A1-GRAMMAR-001..012` correspondem às posições 1..12 do
  `A1_GRAMMAR_MAP` (a1Map.js). IDs 007..012 **não têm `id:` explícito** em
  nenhuma fonte — são gerados pela fórmula
  `${level}-${pillar}-${order}` em `lesson()`.
- O conteúdo "ready" vem de `findStaticReadyLesson`, que busca em
  `STATIC_READY_LESSONS`, montado por `mergeUniqueLessons(...)`.
- **`mergeUniqueLessons` mantém a PRIMEIRA ocorrência** de cada id
  (Set `seen`). A ordem de A1 coloca as fontes deep antes de
  `foundationsSafe` e `fullContent`.

### Fonte vencedora por id (verificado via import direto)

| id | fonte vencedora | também presente em | conceptExplanation | explanationSections |
|---|---|---|---|---|
| A1-GRAMMAR-001 | `deepGrammarFoundations.js` | foundationsSafe (perde) | 600 | 0 |
| A1-GRAMMAR-002 | `deepGrammarFoundationsExtra.js` | foundationsSafe (perde) | 527 | 0 |
| A1-GRAMMAR-003 | `deepGrammarFoundationsExtra.js` | foundationsSafe (perde) | ~496 | 0 |
| A1-GRAMMAR-004 | `deepGrammarFoundationsExtra.js` | foundationsSafe (perde) | ~410 | 0 |
| A1-GRAMMAR-005 | `deepGrammarFoundationsExtra.js` | foundationsSafe (perde) | ~457 | 0 |
| A1-GRAMMAR-006 | `deepGrammarFoundationsExtra.js` | foundationsSafe (perde) | 500 | 0 |
| A1-GRAMMAR-007 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |
| A1-GRAMMAR-008 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |
| A1-GRAMMAR-009 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |
| A1-GRAMMAR-010 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |
| A1-GRAMMAR-011 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |
| A1-GRAMMAR-012 | `fullContent.js` (via `createGrammarLesson`) | — | 0 | 8 |

### Duplicação de IDs

- **Há duplicação de IDs entre fontes**, mas o merge resolve corretamente:
  - `001..006`: existem em `deepGrammar*` **e** em `foundationsSafe`/`foundations`.
    A versão **deep (premium) vence** (vem primeiro no merge). Verificado:
    final `conceptExplanation`=500–600 (deep), não a versão rasa.
  - `007..012`: existem **apenas** em `fullContent.js`. Não há versão deep —
    nunca foi escrita uma versão premium para estas seis.
- **`foundations.js` é código morto**: não é importado em nenhum lugar do
  runtime (somente `foundationsSafe.js` é importado por
  `staticLessonContent.js`). As duplicatas em `foundations.js` não afetam o
  auditor.
- **Nenhuma versão rasa está sobrescrevendo uma versão premium.** O merge
  prioriza deep corretamente.

## 4. Diagnóstico por grupo

### Grupo A — A1-GRAMMAR-001..006 — "sem prática ativa"

As aulas têm prática ativa **abundante e estruturada**, porém o auditor não a
reconhece. A regra (`auditGrammar`, pillarQualityRules.js:103) é:

```js
const text = clean(lesson).toLowerCase();
if (!textIncludesAny(text, [/practice|prática|guided|exerc/i])) { /* P1 */ }
```

- `clean()` serializa apenas os **valores** (não os nomes dos campos). Logo, os
  nomes `controlledPractice`/`guidedPractice` nunca entram no texto.
- O conteúdo premium dessas aulas é redigido em inglês/português natural e
  **não contém os tokens literais** `practice`/`prática`/`guided`/`exerc`.
- Resultado: regex não casa → **falso P1**, apesar de
  `controlledPractice (5–6)`, `guidedPractice (8–10)`, `errorCorrectionPractice
  (4–5)`, `translationPractice`, `transformationPractice`, `productionTasks`.

Verificação (replicando a regra do auditor):

```
A1-GRAMMAR-001  matched tokens=[]  controlledPractice=5  guidedPractice=10  → flagged
A1-GRAMMAR-002  matched tokens=[]  controlledPractice=6  guidedPractice=8   → flagged
A1-GRAMMAR-006  matched tokens=[]  controlledPractice=6  guidedPractice=8   → flagged
```

→ **Falso positivo do auditor.** A prática existe e é rica; a detecção é uma
busca ingênua por token de texto, não estrutural.

### Grupo B — A1-GRAMMAR-007..012 — "sem explicação conceitual clara"

A regra (`auditGrammar`, pillarQualityRules.js:74) exige um dos campos:

```js
fields: ['conceptExplanation', 'teacherOpening', 'grammarExplanation', 'ruleExplanation']
```

- As aulas de `fullContent.js` usam o schema mais antigo: a explicação
  conceitual vive em **`explanationSections` (8 itens)** — campo que o auditor
  **não verifica**. `conceptExplanation`/`teacherOpening` estão vazios.
- Por isso a regra dispara P1, mesmo havendo explicação real.
- Essas aulas passam no check de "prática ativa" porque o texto serializado
  contém o token `prática` (presente em `explanationSections`/instruções).

Verificação:

```
A1-GRAMMAR-007  conceptExplanation.len=0  explanationSections=8  → flagged "sem explicação"
A1-GRAMMAR-008  conceptExplanation.len=0  explanationSections=8  → flagged
A1-GRAMMAR-012  conceptExplanation.len=0  explanationSections=8  → flagged
```

→ **Falso positivo do auditor** para o schema `fullContent`/`createGrammarLesson`,
que coloca a explicação em `explanationSections`.

## 5. Tabela campos antes/depois da factory

`createGrammarLesson` (lessonFactories.js:129) **preserva fielmente** os campos
de entrada (`explanationSections`, `controlledPractice`, `guidedPractice`,
`transformationPractice`, `productionTasks`, etc.). **Não descarta campos.**
"Antes" = objeto fonte; "Depois" = objeto final que chega ao auditor (idêntico
em termos de presença/ausência dos campos relevantes).

| lesson id | arquivo fonte | prática antes | prática depois | explicação antes | explicação depois | causa provável | correção recomendada |
|---|---|---|---|---|---|---|---|
| A1-GRAMMAR-001 | deepGrammarFoundations.js | controlled 5 / guided 10 / errorCorr 5 / transl 4 / transf 5 / prod 4 | igual | conceptExplanation 600 + grammarTable/formationGuide | igual | auditor: prática só por token de texto | auditor reconhecer arrays de prática |
| A1-GRAMMAR-002 | deepGrammarFoundationsExtra.js | controlled 6 / guided 8 / … | igual | conceptExplanation 527 | igual | idem | idem |
| A1-GRAMMAR-003 | deepGrammarFoundationsExtra.js | controlled 6 / guided 8 / … | igual | conceptExplanation ~496 | igual | idem | idem |
| A1-GRAMMAR-004 | deepGrammarFoundationsExtra.js | controlled 6 / guided 8 / … | igual | conceptExplanation ~410 | igual | idem | idem |
| A1-GRAMMAR-005 | deepGrammarFoundationsExtra.js | controlled 6 / guided 8 / … | igual | conceptExplanation ~457 | igual | idem | idem |
| A1-GRAMMAR-006 | deepGrammarFoundationsExtra.js | controlled 6 / guided 8 / … | igual | conceptExplanation 500 | igual | idem | idem |
| A1-GRAMMAR-007 | fullContent.js (createGrammarLesson) | guided 10 / transf 6 / prod 3 / finalChecklist 5 | igual | explanationSections 8 (conceptExplanation 0) | igual | auditor ignora explanationSections | auditor aceitar explanationSections |
| A1-GRAMMAR-008 | fullContent.js | guided 10 / transf 6 / prod 3 / checklist 5 | igual | explanationSections 8 | igual | idem | idem |
| A1-GRAMMAR-009 | fullContent.js | guided 10 / transf 6 / prod 3 / checklist 5 | igual | explanationSections 8 | igual | idem | idem |
| A1-GRAMMAR-010 | fullContent.js | guided 10 / transf 6 / prod 3 / checklist 5 | igual | explanationSections 8 | igual | idem | idem |
| A1-GRAMMAR-011 | fullContent.js | guided 10 / transf 6 / prod 3 / checklist 5 | igual | explanationSections 8 | igual | idem | idem |
| A1-GRAMMAR-012 | fullContent.js | guided 10 / transf 6 / prod 3 / checklist 5 | igual | explanationSections 8 | igual | idem | idem |

## 6. Conclusão

| Hipótese | Veredito |
|---|---|
| A) Conteúdo realmente incompleto | **NÃO.** As 12 aulas têm prática e explicação reais. |
| B) Factory descartando campos | **NÃO.** `createGrammarLesson` preserva os campos. |
| C) Auditor olhando campos antigos/insuficientes | **SIM.** Causa raiz dos dois grupos. |
| D) Campo existe com nome diferente | **SIM.** `explanationSections` (vs conceptExplanation); arrays de prática (vs token de texto). |
| E) Aula A1 antiga difere da deep foundation | **PARCIAL.** 007–012 só existem no schema antigo `fullContent`; não há versão deep. |
| F) Duplicação/rota usando outra fonte | **NÃO** é problema. Merge prioriza deep; `foundations.js` é morto. |
| G) Renderização/schema | **NÃO.** |

**Causa raiz: falsos positivos do auditor (`auditGrammar`).** O auditor não
reconhece o schema real das aulas — análogo ao caso de Writing já corrigido em
`209d247` (que ensinou o auditor a reconhecer `tasks[].note/expected` e
`inputText`).

- **Corrigir factory?** Não.
- **Corrigir conteúdo?** Não (conteúdo está completo e preservado).
- **Corrigir import/duplicação?** Não (merge correto; `foundations.js` morto é
  limpeza opcional, fora de escopo).
- **Corrigir auditor?** **SIM** — é a única correção necessária.

## 7. Plano recomendado para o próximo bloco

**Abordagem mais segura:** ajustar **apenas** `auditGrammar` em
`fluency-clean/e2e/quality-director/helpers/pillarQualityRules.js`, espelhando o
padrão do fix de Writing (`209d247`):

1. **Explicação conceitual (Grupo B):** adicionar `explanationSections` (com
   limiar substantivo, p.ex. ≥2 itens com conteúdo) ao conjunto reconhecido por
   `requireField`, ao lado de `conceptExplanation`/`teacherOpening`.
   - Sem mascarar: continuar exigindo explicação substantiva; não aceitar campo
     vazio.
2. **Prática ativa (Grupo A):** trocar a detecção por token de texto por uma
   detecção **estrutural** dos arrays de prática reais
   (`controlledPractice`, `guidedPractice`, `errorCorrectionPractice`,
   `translationPractice`, `transformationPractice`, `productionTasks`),
   exigindo pelo menos N itens — mantendo o fallback de token para schemas que
   só tenham texto.
   - Sem mascarar: aula sem nenhum array de prática e sem token continua P1.

**Arquivos a alterar:** somente `helpers/pillarQualityRules.js` (auditor).
Não tocar `lessonFactories.js`, conteúdo de aula, `exercise-quality`,
`pillarQualityRules` de Writing.

**Validações necessárias (local, iPhone 13 + iPhone SE):**
- pillar-quality: P1 deve **cair de 318** ao eliminar os 12 falsos P1 de Grammar
  A1 (alvo ≈ 306), sem reintroduzir P1 em outros pilares.
- exercise-quality: P1 deve permanecer **0**.
- lesson-quality: P1 deve permanecer **0**.
- "Resposta correta não aparece": **0**.
- Confirmar que nenhum P1 **real** foi mascarado (revisar aulas que deixarem de
  ser sinalizadas).

**Riscos:**
- Afrouxar demais a regra de explicação/prática pode mascarar P1 reais em outras
  aulas/pilares. Mitigar com limiares substantivos e revisão das aulas que saem
  da lista.
- A mudança afeta **todas** as aulas grammar de todos os níveis (não só A1);
  validar o delta global de pillar-quality, não só A1.
- Garantir que a regra de prática estrutural não derrube o sinal para aulas que
  legitimamente só têm token de texto.
