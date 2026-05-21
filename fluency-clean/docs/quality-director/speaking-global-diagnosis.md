# Diagnóstico GLOBAL — P1 de Speaking (Bloco 27D)

> Documento de diagnóstico. Cobre todos os P1 de Speaking em A1–C2.
> Causa raiz: **falso positivo do auditor** (`auditSpeaking` checa nomes de
> campo legados que a factory nem produz) + **gap real de conteúdo** em pronúncia
> (B1+) e modelo (C1/C2), que NÃO deve ser mascarado.

## 1. Baseline (após Listening)

- pillar-quality P1: **127** (pós-Listening); exercise-quality P1 **0**; lesson-quality P1 **0**; P0 **0**.

## 2. Total de P1 Speaking por nível

72 aulas Speaking ready. **96 P1**:

| Nível | P1 |
|---|---|
| A1 | 12 |
| A2 | 18 |
| B1 | 13 |
| B2 | 16 |
| C1 | 22 |
| C2 | 15 |
| **Total** | **96** |

## 3. Total por tipo de falha

| Título | Ocorrências |
|---|---|
| Speaking sem foco de pronúncia/shadowing | 63 |
| Speaking sem modelo de fala suficiente | 19 |
| Speaking sem tarefa produtiva final | 14 |

## 4. Fontes e schema

`createSpeakingLesson` (lessonFactories.js:305) produz `modelPhrases`,
`pronunciationChunks`, `repeatAfterMe`, `substitutionDrills`,
`questionAnswerDrills`, `buildYourAnswer`, `pronunciationFocus`,
`guidedSpeaking`, `recordingTasks`, `freeSpeaking`, `warmUp`, `guidedPractice`,
`tasks`, `prompt`, `speakingSituation`. **Não produz** `pronunciationTips`,
`shadowingTasks`, `repeatTasks`, `speakingModel`, `modelAnswer`,
`exampleDialogue`, `guidedModel`, `usefulPhrases`, `sentenceFrames`, `dialogue`,
`roleplay`, `conversationTask`, `finalSpeakingTask`.

`auditSpeaking` exige:
- modelo: `modelPhrases`/`speakingModel`/`modelAnswer`/`exampleDialogue`/`guidedModel`
- pronúncia: `pronunciationTips`/`pronunciationFocus`/`shadowingTasks`/`repeatTasks`
- produção: `freeSpeaking`/`speakingTask`/`productionTask`/`connectedProduction`

**Descasamento-chave (pronúncia):** o auditor procura `pronunciationTips`/
`shadowingTasks`/`repeatTasks` — que a factory **nunca gera**. A pronúncia real
está em `pronunciationChunks`/`repeatAfterMe` (gerados), ignorados pelo auditor.

### Classificação dos 96 P1 (verificado por script)

| Falha | Falso positivo (auditor) | Gap real |
|---|---|---|
| sem pronúncia (63) | 30 (A1+A2: têm `pronunciationChunks`+`repeatAfterMe`) | 33 (B1/B2/C1/C2: sem qualquer campo de pronúncia) |
| sem modelo (19) | ~1 | 18 (B2-007..011, C1, C2: sem `modelPhrases`/frames) |
| sem produção (14) | 13 (têm `tasks`/`guidedPractice`/`prompt`/`recordingTasks`) | 1 (C2-003) |

## 5. Amostras

| lesson id | nível | modelo | pronúncia | produção | causa |
|---|---|---|---|---|---|
| A1-SPEAKING-001 | A1 | modelPhrases(10) ✓ | `pronunciationChunks`(3)+`repeatAfterMe`(6) ignorados | freeSpeaking ✓ | auditor (pronúncia) |
| A2-SPEAKING-001 | A2 | modelPhrases ✓ | `pronunciationChunks`+`repeatAfterMe` ignorados | freeSpeaking ✓ | auditor (pronúncia) |
| B1-SPEAKING-001 | B1 | `substitutionDrills`+`guidedPractice` | (nenhuma) | `guidedPractice` produção | auditor (modelo/produção) + gap (pronúncia) |
| B2-SPEAKING-001 | B2 | modelPhrases(10) ✓ | (nenhuma) | freeSpeaking(2) ✓ | gap real (pronúncia) |
| C1-SPEAKING-001 | C1 | (nenhum) | (nenhuma) | freeSpeaking(1) ✓ | gap real (modelo+pronúncia) |
| C2-SPEAKING-001 | C2 | (nenhum) | (nenhuma) | `tasks`(5)+`prompt` | auditor (produção) + gap (modelo+pronúncia) |

## 6. Diagnóstico

| Hipótese | Veredito |
|---|---|
| Auditor falso positivo | **SIM**: ignora `pronunciationChunks`/`repeatAfterMe` (pronúncia), `substitutionDrills`/`questionAnswerDrills`/`buildYourAnswer` (modelo/frames), `tasks`/`guidedPractice`/`prompt`/`recordingTasks` (produção). |
| Factory descarta campos | **Marginal**: apenas `dialogue` em 1 review B1; não material a corrigir agora. |
| Conteúdo realmente fraco | **SIM e significativo**: 33 aulas B1+ sem pronúncia; 18 aulas B2-007+/C1/C2 sem modelo. Não são vazias (têm produção/prática), mas faltam esses elementos. |
| Import/duplicação | **NÃO.** |
| Schema antigo não reconhecido | **SIM** (auditor). |

## 7. Plano de correção global recomendado

### Correção única — Auditor (`auditSpeaking`)
- **Modelo:** reconhecer `modelPhrases`/`speakingModel`/`modelAnswer`/
  `exampleDialogue`/`guidedModel`/`usefulPhrases`/`sentenceFrames`/`dialogue` +
  `repeatAfterMe` + `substitutionDrills`/`questionAnswerDrills`/`buildYourAnswer`
  (frames) + `speakingSituation` (≥40).
- **Pronúncia:** reconhecer `pronunciationTips`/`pronunciationFocus`/
  `shadowingTasks`/`repeatTasks`/`fluencyDrills`/`intonationPractice`/
  `stressPractice`/`minimalPairs` + `pronunciationChunks` + `repeatAfterMe`.
- **Produção:** reconhecer `freeSpeaking`/`speakingTask`/`productionTask`/
  `connectedProduction`/`roleplay`/`conversationTask`/`finalSpeakingTask` +
  `recordingTasks` + `tasks`/`guidedPractice` (instrução substantiva) + `prompt` (≥40).
- **Não** aceitar título/objetivo como modelo; **não** contar checklist/texto
  genérico como pronúncia.

**Efeito esperado:** Speaking P1 96 → ~52 (pillar-quality 127 → ~83).

**Não mascara:** ~52 P1 permanecem — 33 sem pronúncia (B1/B2/C1/C2), 18 sem
modelo (B2-007+/C1/C2), 1 sem produção — **gap real de conteúdo**, a tratar em
bloco separado com autorização (adicionar pronúncia/shadowing e frases-modelo).

**Arquivos:** somente `pillarQualityRules.js` (auditSpeaking). Sem tocar factory,
conteúdo ou outros pilares.
