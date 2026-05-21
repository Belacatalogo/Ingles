# Diagnóstico GLOBAL — P1 de Listening (Bloco 26D)

> Documento de diagnóstico. Cobre todos os P1 de Listening em A1–C2.
> Causa raiz **tripla**: falso positivo do auditor + bug de factory (campos
> singulares descartados) + gap real de pré-escuta (sem mascaramento).

## 1. Baseline oficial de referência

`fluency-clean/docs/quality-director/latest/quality-director-latest.md`,
gerado em `2026-05-21T14:07:16.367Z`:

- **P0: 0** · **P1: 145** · **P2: 1025**
- exercise-quality P1: **0** · lesson-quality P1: **0** · pillar-quality P1: **144**

## 2. Total de P1 Listening por nível

68 aulas Listening ready. **33 P1**, todos do mesmo tipo:

| Nível | P1 |
|---|---|
| A1 | 9 |
| A2 | 0 |
| B1 | 7 |
| B2 | 4 |
| C1 | 8 |
| C2 | 5 |
| **Total** | **33** |

## 3. Total por tipo de falha

| Título | Ocorrências |
|---|---|
| Listening sem preparação/predição antes do áudio | 33 |

(Os checks de script/transcript e de tarefas pós-áudio passam em todas — a factory
preserva `audioScript`/`transcript` e há `firstListenTasks`/`listeningTasks`/`tasks`.)

## 4. Fontes reais e schemas

`createListeningLesson` (lessonFactories.js:270) preserva `listeningPreparation`,
`keyWordsToHear`, `audioScript`, `firstListenTasks`/`secondListenTasks` (**plural**),
`transcript`, `shadowing`, `listeningComprehension`, `comprehensionQuestions`,
`listeningTasks`, `audioMetadata`, `tasks`. **Não lê** `firstListenTask`/
`secondListenTask` (**singular**) nem `audioDescription`.

`auditListening` exige preparação em `listeningPreparation`/`preListening`/
`predictionTask`/`guidedBeforeListening` — ignora `keyWordsToHear`,
`audioDescription`, `firstListenTasks` (gist) e `listeningTasks` staged.

### Quatro schemas de autor

| Schema | Preparação/1ª escuta | Níveis |
|---|---|---|
| A2 (reconhecido) | `listeningPreparation` + `keyWordsToHear` | A2 |
| A1 | `firstListenTasks` (plural, gist "Ouça e identifique o tema") | A1 |
| B1 | `firstListenTask`/`secondListenTask` (**singular**) + `audioDescription` | B1 |
| Staged | `listeningTasks: [{stage:'FIRST LISTEN…', tasks}]` | B2, C1-001 |
| Flat | `transcript` + `tasks` analíticos (sem 1ª escuta/predição) | C1-002..008, C2 |

### Classificação dos 33 P1 (verificado por script)

| Classe | Lições | P1 | Causa |
|---|---|---|---|
| **Falso positivo do auditor** | 14 | 14 | A1 (`firstListenTasks`), B2 + C1-001 (`listeningTasks` staged) — entregues, ignorados |
| **Bug de factory** | 7 | 7 | B1 (`firstListenTask`/`secondListenTask` singular + `audioDescription`) descartados → aula final sem 1ª escuta |
| **Gap real de pré-escuta** | 12 | 12 | C1-002..008, C2-001..005 — só `transcript` + `tasks` analíticos, sem etapa de predição/gist |

## 5. Amostras (antes/depois da factory)

| lesson id | nível | preparação fonte | preparação final (atual) | causa | correção |
|---|---|---|---|---|---|
| A1-LISTENING-005 | A1 | `firstListenTasks`(2, gist) | preservado, ignorado | auditor | auditor |
| A2-LISTENING-001 | A2 | `listeningPreparation`+`keyWordsToHear` | reconhecido (passa) | — | — |
| B1-LISTENING-001 | B1 | `firstListenTask`(gist)+`secondListenTask`+`audioDescription` | **vazio** (factory dropou singular) | factory | factory + auditor |
| B2-LISTENING-005 | B2 | `listeningTasks` staged (FIRST LISTEN) | preservado, ignorado | auditor | auditor |
| C1-LISTENING-001 | C1 | `listeningTasks` staged | preservado, ignorado | auditor | auditor |
| C1-LISTENING-002 | C1 | `transcript`+`tasks` flat | sem 1ª escuta | gap real | conteúdo (futuro) |
| C2-LISTENING-001 | C2 | `transcript`+`tasks` flat | sem 1ª escuta | gap real | conteúdo (futuro) |

## 6. Diagnóstico

| Hipótese | Veredito |
|---|---|
| Auditor falso positivo | **SIM** (14): ignora `firstListenTasks`, `listeningTasks` staged, `keyWordsToHear`, `audioDescription`. |
| Factory descarta campos | **SIM** (7, B1): `firstListenTask`/`secondListenTask` singular e `audioDescription` não são lidos. |
| Conteúdo realmente fraco | **PARCIAL** (12): C1-002..008/C2 têm transcript + tarefas analíticas ricas, mas sem etapa de pré-escuta/predição. Não são vazias. |
| Import/duplicação | **NÃO.** |
| Schema antigo/variante não reconhecido | **SIM** (auditor + factory). |

## 7. Plano de correção global recomendado

### Correção 1 — Factory (`createListeningLesson`)
- Mapear `firstListenTask`→`firstListenTasks` e `secondListenTask`→`secondListenTasks`
  (singular→array) **só quando** o plural estiver vazio (não sobrescrever).
- Preservar `audioDescription`.
- Risco baixo: recupera conteúdo de 1ª escuta de B1 hoje perdido.

### Correção 2 — Auditor (`auditListening`)
- Reconhecer preparação/predição via: `listeningPreparation`/`preListening`/
  `predictionTask`/`guidedBeforeListening`/`beforeListening`/`listeningPurpose`/
  `focusBeforeListening`/`keywords`/`keyWordsToHear` + `audioDescription` (≥40) +
  `firstListenTasks` (gist) + `listeningTasks` staged com etapa de 1ª escuta/gist.
- **Não** aceitar título/objetivo como preparação; **não** contar `tasks` flat
  analíticos (pós-escuta) como preparação → não mascara o gap real.

**Efeito esperado:** Listening P1 33 → 12 (pillar-quality 144 → ~123).

**Não mascara:** os 12 (C1-002..008, C2-001..005) permanecem P1 — gap real de
pré-escuta, a tratar em bloco de conteúdo separado com autorização.

**Arquivos:** `lessonFactories.js` (createListeningLesson) + `pillarQualityRules.js`
(auditListening). Sem tocar conteúdo, outros pilares ou exercise-quality.
