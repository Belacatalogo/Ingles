# BLOCO IA-6 — UI unificada de feedback de IA (Concluído)

Data: 2026-05-17
Branch: main

---

## Objetivo

Padronizar o visual e comportamento dos feedbacks de IA eliminando a duplicação de JSX idêntico em três componentes diferentes: `AttemptField`, `SpeakField` e `SpeakingScreen`.

---

## Problema anterior

O mesmo painel de feedback de IA estava duplicado em:

1. `AttemptField.jsx` — inline no `aiAnalysisNode`
2. `SpeakField.jsx` — inline no `aiAnalysisNode`
3. `SpeakingScreen.jsx` — componente local `SpeakingAiPanel`

Cada um tinha pequenas variações (badge "Híbrido" em SpeakingScreen, `correctedText` apenas em AttemptField), tornando manutenção trabalhosa.

---

## Arquivo criado

### `src/components/ai/StudentAnswerFeedbackCard.jsx`

Componente unificado com as props:

```jsx
<StudentAnswerFeedbackCard
  result={analysisResult}  // AnalysisResult do studentAnswerAnalysisService
  loading={boolean}        // mostra "Analisando..."
  title="IA Tutor"         // label do header
  onRetry={fn}             // opcional: botão "Nova análise"
  compact={false}          // omite correctedText e strengths (para painéis inline)
/>
```

Estados visuais suportados:
- `loading=true`: ícone Sparkles + "Analisando..."
- `result=null` ou sem `feedbackPt`: retorna `null` (não renderiza)
- Badge automático: `Local` | `Gemini` | `Híbrido` baseado em `result.source`
- Score `/100` quando `result.score !== null`
- `feedbackPt`: texto principal
- `correctedText`: card verde "Versão sugerida" (somente `compact=false`)
- `issues[]`: lista âmbar com seta →
- `strengths[]`: lista (somente `compact=false`)
- `nextDrill`: linha azul com ícone Lightbulb
- `onRetry`: botão "Nova análise" com ícone RotateCcw

Compatível com resultados de:
- `studentAnswerAnalysisService` (writing, speaking, reading, listening)
- `buildAdaptiveReview` (revisão adaptativa)
- Fallback local
- Gemini
- Azure + Gemini hybrid (`source: 'hybrid'`)

CSS: reutiliza as classes existentes em `lesson-phase.css`:
- `.lesson-phase-ai-result`, `.gemini`
- `.lesson-phase-ai-result-header`, `.lesson-phase-ai-badge`, `.lesson-phase-ai-score`
- `.lesson-phase-ai-feedback`, `.lesson-phase-ai-corrected`
- `.lesson-phase-ai-list`, `.lesson-phase-ai-drill`
- `.lesson-phase-link`

Não foi criado arquivo CSS separado.

---

## Locais substituídos

### `src/lessons/flow/phases/AttemptField.jsx`

- Import adicionado: `StudentAnswerFeedbackCard`
- `aiAnalysisNode`: substituiu o bloco JSX duplicado por `<StudentAnswerFeedbackCard result={aiAnalysis} loading={false} onRetry={() => setAiAnalysis(null)} />`
- Lógica de `handleAiAnalyze` e estados (`aiAnalysis`, `aiLoading`) preservados.

### `src/lessons/flow/phases/SpeakField.jsx`

- Import adicionado: `StudentAnswerFeedbackCard`
- Imports não mais usados removidos: `Lightbulb`, `RotateCcw`
- `aiAnalysisNode`: substituído da mesma forma.

### `src/screens/SpeakingScreen.jsx`

- Import adicionado: `StudentAnswerFeedbackCard`
- `SpeakingAiPanel` (componente local): reduzido a wrapper de 1 linha:
  ```jsx
  function SpeakingAiPanel({ analysis, loading }) {
    return <StudentAnswerFeedbackCard result={analysis} loading={loading} compact />;
  }
  ```
  Mantido como wrapper para não alterar as 3 chamadas existentes em conversation/pronunciation/immersion.

---

## Mobile / iPhone

`lesson-phase.css` já garante:
- `white-space: pre-wrap` no feedback principal
- Listas com `flex-direction: column`
- Texto que quebra linha naturalmente
- Containers com `border-radius` e padding confortável

Nenhum ajuste adicional necessário.

---

## Limitações conhecidas

1. `strengths[]` é suportado no card mas `studentAnswerAnalysisService` raramente popula esse campo. Aparecerá quando IA retornar strengths.
2. `compact=true` (usado em SpeakingScreen) oculta `correctedText` e `strengths`. Isso é intencional para manter o painel de speaking compacto.
3. O card não faz parsing estruturado de `aiText` do adaptive review — o texto bruto da Gemini é exibido com pre-wrap em `LessonCompletionCard`.

---

## Build executado

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos, sem erros.
```

---

## Confirmação final

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
CSS existente reutilizado — sem CSS novo desnecessário.
Lógica de análise não alterada.
Fallback local preservado em todos os componentes.
```
