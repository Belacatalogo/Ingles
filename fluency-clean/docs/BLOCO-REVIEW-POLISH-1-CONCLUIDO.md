# BLOCO REVIEW-POLISH-1 — Revisão adaptativa mais útil e clara (Concluído)

Data: 2026-05-17

---

## Objetivo

Melhorar a qualidade e clareza da revisão adaptativa pós-aula:
- drills locais que referenciam os erros reais do aluno;
- prompt para a IA mais legível e estruturado;
- UI com seções claras: "Foco principal", "Erros encontrados", "Treino rápido";
- badge Local / Gemini / Híbrido;
- botão "Gerar novamente" mantido.

---

## Arquivos alterados

| Arquivo | O que mudou |
|---|---|
| `src/services/adaptiveReview/localAdaptiveReview.js` | `buildTargetedDrills`: 1º drill referencia o exercício real do erro; 3 drills por grupo em vez de 2 |
| `src/services/aiTutorPolicy.js` | `formatErrorsForPrompt`: formata erros como linhas legíveis em vez de JSON bruto; `adaptiveReviewLines` pede estrutura Diagnóstico/Erros/Treino/Próxima aula |
| `src/lessons/flow/phases/LessonCompletionCard.jsx` | `AdaptiveReviewPanel` reconstruído com seções estruturadas; badge Híbrido quando Gemini + errorGroups locais |
| `src/lessons/flow/lesson-flow.css` | `.lesson-review-panel`, `.lesson-review-section`, `.lesson-review-section-title`, `.lesson-review-focus`, `.lesson-review-error-list`, `.lesson-review-drill-list`, `.lesson-review-ai-text`, `.lesson-review-advice`; ajustes 430px |
| `src/lessons/flow/lesson-phase.css` | `.lesson-phase-ai-badge.hybrid` (gradiente azul→violeta) |

---

## O que NÃO foi alterado

- `adaptiveReviewService.js` — orquestrador intocado (cache, fallback, Gemini)
- `adaptiveReviewTypes.js` — constantes intocadas
- `aiTutorService.js` — serviço intocado
- `StudentAnswerFeedbackCard.jsx` — intocado
- Firebase, Azure, Gemini, Cloudinary
- `completeLesson`, `progressStore`, `useLessonFlowState`
- `PracticeLauncher`

---

## Comportamento novo

### Drills locais mais úteis

Quando o aluno errou um exercício específico (ex: "Write a sentence using 'although'"), o primeiro drill agora é:
> "Revise: 'Write a sentence using although' — tente uma nova resposta focando na regra que causou o erro."

Em vez do genérico:
> "Escreva 2 frases novas corrigindo o ponto que gerou o erro."

### Prompt IA mais limpo

Antes:
```
Erros recentes do aluno:
[{"status": "warn", "pillar": "writing", "prompt": "Write a...", ...}]
```

Depois:
```
Erros reais do aluno nesta aula:
1. [writing] "Write a sentence using although" — resposta: "Although is hard" (resposta incorreta)
2. [grammar] "Choose the correct form: he go / he goes" (não respondeu)
```

### UI estruturada

```
╔ Revisão adaptativa              [Híbrido] ╗
│                                           │
│ FOCO PRINCIPAL                            │
│ Foco em Gramática: 2 ponto(s) a revisar.  │
│                                           │
│ ERROS ENCONTRADOS                         │
│ • Gramática — Write a sentence using...   │
│ • Vocabulário — Choose the synonym of...  │
│                                           │
│ TREINO RÁPIDO           (local fallback)  │
│ 1. Revise: "Write a sentence using..."    │
│ 2. Escreva 2 frases aplicando a regra...  │
│ 3. Leia a frase corrigida em voz alta...  │
│                                           │
│ ↺ Gerar novamente                         │
╚═══════════════════════════════════════════╝
```

Quando Gemini responde, a seção "Análise" mostra o texto estruturado da IA com `white-space: pre-wrap`.

### Badges

- **Local** — fallback local, sem IA
- **Gemini** — IA respondeu (sem errorGroups locais, improvável mas possível)
- **Híbrido** — IA respondeu E errorGroups locais disponíveis (caso normal)

---

## Fluxo de dados

```
extractFlowErrors(phases, attempts, lesson)
  → errors[]

buildLocalAdaptiveReview({ errors })
  → errorGroups[i].microDrills = buildTargetedDrills(group)
     ↳ 1º drill: referencia issues[0] (exercício real)
     ↳ 2º/3º drill: genérico do PILLAR_DRILLS

Se allowAi=true e keys existem:
  formatErrorsForPrompt(errors) → linhas legíveis
  → prompt melhorado → Gemini → aiText estruturado
  → saveCachedReview()

AdaptiveReviewPanel renderiza:
  Foco principal  → review.focusSummary
  Erros           → review.errorGroups[].issues[0]
  Treino/Análise  → quickDrills (local) ou aiText (Gemini)
  Badge           → Local / Gemini / Híbrido
```

---

## Validação

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros
```

Verificação mental:
- ✅ Drill local referencia exercício real quando `issues[0]` existe
- ✅ Drill genérico quando não há issue (aula sem exercícios registrados)
- ✅ Prompt IA envia bullet list legível em vez de JSON
- ✅ UI mostra "Foco principal" + "Erros encontrados" + "Treino rápido"
- ✅ Badge "Híbrido" quando Gemini + errorGroups
- ✅ Gemini mostra "Análise" com aiText pré-formatado
- ✅ "Gerar novamente" reseta `review` para null → botão reaparece
- ✅ Cache do service inalterado — `buildAdaptiveReview` não foi tocado

---

## Pendências futuras

- **FLASHCARDS-QUALITY-1**: qualidade de flashcards por pilar
- **MASTERY-GATE-1**: integração real do mastery gate A1→A2
