# Diagnóstico — "Nenhum exercício detectado na aula ready" (restantes)

> Bloco 7 — **diagnóstico apenas**. Nenhuma regra de auditor ou conteúdo
> pedagógico foi alterada. Sem mascaramento de P1. P0 = 0.
> Fonte: `getStaticLessons()` + `auditLessonExercisesDeep()` (mesmo caminho
> do spec `exercise-quality.audit.spec.js`), iPhone 13/SE, branch `main`.

## 1. Total real de ocorrências restantes

**75** aulas `ready` ainda marcadas como "Nenhum exercício detectado".
(P1 da spec local: 82; estas 75 são o grosso do bloco.)

## 2. Distribuição por nível

| Nível | Ocorrências |
|------|------------|
| A1 | 0 |
| A2 | 0 |
| B1 | 1 |
| B2 | 21 |
| C1 | 31 |
| C2 | 22 |

Todos os casos restantes são de **níveis avançados (B1→C2)**. A1/A2 já
foram resolvidos nos Blocos 1/5/6.

## 3. Distribuição por pilar

| Pilar | Ocorrências |
|------|------------|
| writing | 23 |
| reading | 18 |
| speaking | 17 |
| listening | 17 |
| grammar | 0 |
| vocabulary | 0 |

## 4. Causa raiz comum (não é "conteúdo fraco")

Os pacotes avançados (`deepB2*`, `deepC1*`, `deepC2*`) usam um **schema mais
novo e mais rico** que as factories legadas `createXLesson` **não mapeiam**.
A prática ativa existe no fonte, mas é **descartada antes de chegar ao
auditor** (factory) ou **não reconhecida** (auditor). Não são stubs.

Evidência (fonte real das aulas):

- **Writing** (`createWritingLesson`): fonte tem `writingModel`,
  `writingTasks` (`[{ task, options }]`), `writingChecklist`,
  `grammarAnnotations`. A factory só mapeia
  `modelText/modelTextBreakdown/writingBlocks/guidedSubstitution/draftTask/
  revisionTask/finalVersionTask/...`. → `writingTasks`/`writingModel`/
  `writingChecklist` **caem fora do objeto** → auditor não vê prática.
- **Speaking** (`createSpeakingLesson`): fonte tem `warmUp`,
  `guidedPractice` (`[{ title, steps }]`), `speakingChecklist`,
  `freeSpeaking`. A factory não mapeia `warmUp` nem `guidedPractice`
  (o "task" real); só passam `speakingChecklist` (reflexivo, ignorado
  corretamente pelo helper do Bloco 5) e `freeSpeaking` (vazio/sem texto).
- **Listening** (`createListeningLesson`): fonte tem `audioMetadata` e
  `listeningTasks` (`[{ stage, tasks:[...] }]`, staged). A factory não
  mapeia `listeningTasks`. Só passam `audioScript`/`transcript`
  (referência, não tarefa).
- **Reading** (`createReadingLesson`): a factory **mapeia**
  `comprehensionQuestions`, então o conteúdo chega ao auditor. Mas os itens
  são **abertos**: `{ question, type: 'open', guidance }` — sem `answer`
  nem `options`. `isExerciseLike` exige
  `question && (answer || options>=2 || /pergunta|question|.../)`, então
  rejeita pergunta aberta legítima.

## 5. Agrupamento A / B / C / D / E

### Grupo A — Falso positivo do auditor (pergunta aberta de comprehension)
- **Total:** ~18 (todo o `reading` B2/C1/C2). Também atinge parte de
  listening/writing depois do Grupo B (tasks abertas).
- **Níveis:** B2, C1, C2. **Pilar:** reading.
- **Exemplos:** B2-READING-006, B2-READING-008, C1-READING-001,
  C2-READING-001, C1-READING-005.
- **Campos detectados:** `comprehensionQuestions: [{ question, type:'open',
  guidance }]` (5–6 itens), `evidenceQuestions` em alguns.
- **Por que não contou:** sem `answer`/`options`; texto da pergunta não
  casa a regex; `isExerciseLike` exige resposta avaliável clássica.
- **Correção global recomendada:** ensinar o auditor a reconhecer
  *comprehension/produção aberta* como prática ativa quando há
  `question` + (`type:'open'` ou `guidance`/`expected`/`rubric`/`minWords`),
  específico para pilar reading/listening/writing. Não alterar a regra de
  ambiguidade/MCQ.
- **Risco se só relaxar:** baixo SE restrito a pergunta aberta com
  orientação; ALTO se virar "qualquer objeto com `question`/`title` conta"
  (mascararia conteúdo realmente vazio). Precisa de critério estrito.

### Grupo B/E — Factory não carrega o schema novo (prática descartada)
- **Total:** ~57 — writing (23) + speaking (16 de 17) + listening (17) +
  1 reading-residual.
- **Níveis:** B2, C1, C2 (e B1-SPEAKING-001). **Pilares:** writing,
  speaking, listening.
- **Exemplos:** B2-WRITING-006/012, C1-WRITING-001, C2-WRITING-001,
  B2-SPEAKING-007/009, C1-SPEAKING-001, B2-LISTENING-005, C1-LISTENING-001.
- **Campos no fonte (existem, mas não chegam ao auditor):**
  `writingTasks`/`writingModel`/`writingChecklist`;
  `warmUp`/`guidedPractice`; `listeningTasks` (staged).
- **Por que não contou:** as factories `createWritingLesson`/
  `createSpeakingLesson`/`createListeningLesson` não copiam esses campos
  para o objeto final → `collectExerciseObjects` nunca os vê.
- **Correção global recomendada (modular, escalável):** estender as
  factories para **mapear** o schema novo
  (`writingTasks`, `writingModel`, `writingChecklist`, `warmUp`,
  `guidedPractice`, `listeningTasks`, `audioMetadata`) — uma mudança por
  factory, cobre B2+C1+C2 de uma vez. Em seguida, o auditor reconhece as
  tasks (ver Grupo A) — `writingTasks[].task`, `guidedPractice[].steps`,
  `listeningTasks[].tasks[]` são produção/transformação ativa real.
- **Risco se só relaxar o auditor sem corrigir a factory:** alto e inútil
  — a prática continua descartada antes do auditor; relaxar não a revela e
  ainda enfraqueceria a regra para os demais pilares.

### Grupo C — Conteúdo realmente fraco
- **Total:** 0 confirmados. A aparência de "stub" (só
  objective/teacherOpening) é **artefato do Grupo B/E** (factory removeu o
  conteúdo). Reavaliar após o Grupo B; provável residual mínimo.

### Grupo D — Estrutura avançada diferente
- É a *causa guarda-chuva* de A e B/E (schema novo dos pacotes avançados),
  não um grupo separado de aulas. Tratado por A + B/E.

### Grupo E — Bug/estrutura quebrada
- **Total:** ~1 a investigar — **B1-SPEAKING-001**: tem
  `substitutionDrills` (2 itens) mas sem texto detectável (provável shape
  `drill()` divergente) + `lessonRecap`. Verificar shape exato no Bloco
  seguinte; pode ser mapeamento de `drill()` ou campo mal preenchido.

## 6. Próximo bloco recomendado (ordem)

1. **Bloco 7B (primeiro) — corrigir factory/schema global.**
   Estender `createWritingLesson`/`createSpeakingLesson`/
   `createListeningLesson` (e revisar `createReadingLesson`) para carregar
   `writingTasks`/`writingModel`/`writingChecklist`,
   `warmUp`/`guidedPractice`, `listeningTasks`/`audioMetadata`.
   Maior impacto (~57), desbloqueia writing/speaking/listening, sem mexer
   em conteúdo pedagógico nem relaxar regra.
2. **Bloco 7A (depois) — reconhecimento de prática aberta no auditor.**
   Estender o reconhecimento (helpers de prática ativa por pilar /
   `collectExerciseObjects`) para `question`+`guidance`/`type:'open'`,
   `task`+`options`, `steps[]`, com critério estrito (não "qualquer title").
   Resolve reading (~18) e as tasks abertas vindas de 7B.
3. **Bloco 7C (por último) — conteúdo pedagógico real.**
   Só para o residual que sobrar após 7B+7A (esperado ~0–1, ex.:
   B1-SPEAKING-001). Sem mascarar.

## 7. Confirmações

- Não alterou conteúdo pedagógico.
- Não relaxou regra do auditor.
- Não mascarou P1 (P1 permanece; apenas diagnosticado e agrupado).
- Branch `main`; P0 = 0; sem regressão dos Blocos 1–6.
- Apenas este documento de diagnóstico será commitado (documentação).

## Apêndice — lista completa (75)

**reading (18):** B2-READING-006, B2-READING-008, B2-READING-009,
B2-READING-010, B2-READING-011, C1-READING-001..008,
C2-READING-001..005.

**writing (23):** B2-WRITING-006..012, C1-WRITING-001..008,
C2-WRITING-001..008.

**speaking (17):** B1-SPEAKING-001, B2-SPEAKING-007..011,
C1-SPEAKING-001..006, C1-SPEAKING-008, C2-SPEAKING-001, C2-SPEAKING-002,
C2-SPEAKING-004, C2-SPEAKING-005.

**listening (17):** B2-LISTENING-005..008, C1-LISTENING-001..008,
C2-LISTENING-001..005.
