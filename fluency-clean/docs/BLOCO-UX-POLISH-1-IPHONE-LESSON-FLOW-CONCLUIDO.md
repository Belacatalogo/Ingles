# BLOCO UX-POLISH-1 — iPhone Lesson Flow Polish (Concluído)

Data: 2026-05-17

---

## Objetivo

Polimento visual e mobile da aba Aula no iPhone (~390–430px), sem alterar lógica de
progresso, IA, Azure, Gemini, revisão, mastery ou geração de aulas. Foco exclusivo em CSS
e espaçamento visual.

---

## Arquivos alterados

| Arquivo | Tipo de mudança |
|---|---|
| `src/lessons/flow/lesson-flow.css` | Adicionado bloco `@media (max-width: 430px)` |
| `src/lessons/flow/lesson-phase.css` | Corrigidas cores de contraste; expandido bloco 430px existente |
| `src/styles/lesson-polish.css` | Adicionado bloco `@media (max-width: 430px)` para hero |
| `src/styles/deep-lesson-mobile.css` | Adicionado CSS para `.lesson-practice-complement-mount` |

---

## Principais ajustes visuais

### 1. Hero da aula (`.lesson-reference-hero`)
- Padding reduzido: 14px (era 18px) no iPhone
- `h1`: `clamp(20px, 6.5vw, 26px)` em vez de 26px fixo
- `lesson-generation-proof`: padding e margin-top menores, fonte menor
- Chips (`lesson-chip`): padding reduzido 4px 7px
- Footer do hero: margin-top 11px, botão atualizar menor (30px)

### 2. LessonFocusHeader (`.lesson-flow-focus-header`)
- Padding: 13px (era 15px); border-radius: 20px
- `h1`: `clamp(24px, 7vw, 30px)` — era `clamp(31px, 8vw, 54px)` base
- Goal box: padding 11px, border-radius 16px, texto 13.5px
- Chips: min-height 26px, font-size 11px

### 3. LessonPhaseStepper (`.lesson-flow-stepper`)
- `padding-inline: 4px` adicionado — evita que primeiro/último chip fique cortado
- Botões: `min-height: 36px`, `padding: 0 10px`

### 4. LessonPhaseCard (`.lesson-flow-phase-card`)
- Padding: 13px; border-radius: 20px; gap: 13px
- `h2`: `clamp(20px, 6vw, 26px)` — era `clamp(28px, 7vw, 42px)` base
- Descrição: 14px, line-height 1.48

### 5. Conteúdo de fase (lesson-phase.css)
- `.lesson-phase-shell`: gap 11px no iPhone
- `.lesson-phase-title`: `clamp(16px, 4.5vw, 20px)`
- `.lesson-phase-instruction`: 14px, line-height 1.5
- Feedback: padding 10px 12px, border-radius 14px
- Shadowing items: padding 10px 12px

### 6. Contraste e legibilidade
- `.lesson-phase-word-count`: `#4a5a7a` → `#6275a0` (melhor leitura do contador)
- `.lesson-phase-speak-hint`: `#5a6a8a` → `#6275a0`
- `.lesson-phase-footnote`: `#5a6a8a` → `#6275a0`

### 7. LessonActionFooter (`.lesson-flow-action-footer`)
- Padding: 8px; border-radius: 18px
- Hint text: 12px
- Botões: `min-height: 46px`, `font-size: 14px`
- Safe-area e sticky já estavam corretos — mantidos

### 8. LessonCompletionCard (`.lesson-completion-card`)
- Padding: 20px 16px; border-radius: 22px; gap: 12px
- Ícone: 54px (era 64px)
- Título: 22px (era 26px)
- Stats numbers: 22px (era 26px); label: 10px
- Botões de ação: 13px, padding 9px 14px

### 9. PracticeMount (`.lesson-practice-complement-mount`)
- `margin-top: 6px` — separa visualmente da seção anterior
- `padding-bottom` com safe-area — evita que botões fiquem escondidos pelo menu

### 10. Progress line
- Altura: 7px (era 9px) no iPhone — mais discreta

---

## O que NÃO foi alterado

- Nenhum arquivo `.jsx` de lógica
- `LessonFlowShell.jsx`, `useLessonFlowState.js`, `progressStore.js`
- `LessonActionFooter.jsx` (lógica de avançar/voltar)
- `LessonCompletionCard.jsx` (lógica de salvar conclusão)
- `LessonPhaseStepper.jsx` (lógica de clique — pendência FLOW-STABILITY-1)
- Firebase, Azure, Gemini, Cloudinary
- `completeLesson`, `adaptiveReview`, `studentAnswerAnalysis`, mastery
- Conteúdo pedagógico das aulas
- Ordem das fases
- bundle.js

---

## Validação executada

```bash
cd fluency-clean && npm run build
# ✅ 2533 módulos transformados, sem erros
```

Verificação por código:
- ✅ iPhone 390px: hero compacto (padding 14px, h1 ≤ 26px)
- ✅ Stepper com padding lateral — chips não cortados
- ✅ PhaseCard h2 ≤ 26px no iPhone
- ✅ Textarea com `scroll-margin-bottom` + `font-size: 16px` (sem zoom iOS) — já estava
- ✅ ActionFooter sticky com `env(safe-area-inset-bottom)` — já estava, mantido
- ✅ CompletionCard sem overflow horizontal
- ✅ PracticeMount com separação visual e safe-area inferior

---

## Pendências futuras

- **FLOW-STABILITY-1**: bloqueio de navegação para fase futura obrigatória no Stepper
- **COMPLETION-UX-1**: desbloqueio/bloqueio visual de PracticeMount pós-conclusão
- **REVIEW-POLISH-1**: polish da revisão adaptativa no CompletionCard
- **FLASHCARDS-QUALITY-1**: qualidade de flashcards por pilar
- **MASTERY-GATE-1**: integração real do mastery gate A1→A2
