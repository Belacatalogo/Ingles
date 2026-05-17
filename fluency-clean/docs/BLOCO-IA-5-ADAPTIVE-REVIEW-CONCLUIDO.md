# BLOCO IA-5 — Revisão adaptativa real com erros do aluno (Concluído)

Data: 2026-05-17
Branch: main

---

## Objetivo

Usar erros reais salvos durante as aulas para gerar revisão adaptativa curta e útil — sem depender de IA para funcionar.

---

## Descoberta-chave da auditoria

`reviewFromErrors.js` já existia e já lia `lessonCompletions.flowErrors` (via `getLessonFlowErrorQueue`) e `practiceSessions.weakItems` (via `getPracticeReviewQueue`). Porém, esse serviço:
1. Não tinha camada de IA (passava direto para regras locais com TAG_RULES).
2. Não era acessível de forma simples dentro do fluxo de aulas (LessonCompletionCard).
3. Não tinha persistência de revisão por lessonId+data.

A solução foi criar um serviço paralelo e modular em `adaptiveReview/`, integrável diretamente no `LessonCompletionCard`, que usa os `flowErrors` da sessão atual.

---

## Arquivos criados

### `src/services/adaptiveReview/adaptiveReviewTypes.js`

Constantes:
- `ADAPTIVE_REVIEW_STATUS`: `success | fallback | error`
- `ADAPTIVE_REVIEW_SOURCE`: `local | gemini`
- `ADAPTIVE_REVIEW_STORAGE_KEY`: chave de localStorage

### `src/services/adaptiveReview/localAdaptiveReview.js`

Fallback local obrigatório. Funciona sem IA.

`buildLocalAdaptiveReview({ lesson, flowErrors, level })`

Estratégia:
1. Filtra erros com `status: 'warn' | 'missed'`.
2. Normaliza pillar (reading, listening, speaking, writing, grammar, vocabulary).
3. Agrupa por pillar com contagem, issues (prompts das fases) e exemplos (respostas do aluno).
4. Ordena por quantidade de erros (prioridade).
5. Gera `microDrills` (até 2 por pillar) de banco fixo.
6. Retorna `focusSummary`, `priorityPillars`, `errorGroups`, `reviewPlan`, `nextLessonAdvice`.

Sem erros: retorna mensagem de parabéns e `nextLessonAdvice` positivo.

### `src/services/adaptiveReview/adaptiveReviewService.js`

Serviço principal. `buildAdaptiveReview({ lesson, flowErrors, allowAi, fetcher })`

Fluxo:
1. Sempre constrói `localResult` primeiro.
2. Se `allowAi=false`: retorna `localResult`.
3. Verifica cache (`fluency:adaptive-reviews:v1`) — evita re-chamada Gemini no mesmo dia/lessonId.
4. Verifica `getGeneralAiKeys()` — sem key, retorna `localResult` com `status: fallback`.
5. Chama `buildAdaptiveReviewWithTutor` (via `aiTutorService`).
6. Se Gemini responde: merge com `localResult`, salva no cache, retorna com `source: gemini`.
7. Se Gemini falha: retorna `localResult` silenciosamente.

### `src/services/adaptiveReview/index.js`

Re-exports de `buildAdaptiveReview`, `buildLocalAdaptiveReview` e tipos.

---

## Arquivos alterados

### `src/services/aiTutorPolicy.js`

Novo bloco de prompt para `adaptiveReview`:

```
Os erros reais do aluno estão listados acima.
Crie uma revisão adaptativa curta em português com:
1. Uma frase de diagnóstico.
2. Erros agrupados por área (grammar, writing, speaking, reading, listening, vocabulary).
3. Para cada área: 1 exemplo do erro e como corrigir (máx. 2 frases).
4. Exatamente 3 micro-exercícios práticos.
5. Uma frase de conselho para a próxima aula.
Máximo 250 palavras. Não crie nova aula. Não invente erros inexistentes.
```

### `src/services/aiTutorService.js`

Nova função:

```js
buildAdaptiveReviewWithTutor({ lesson, errors, level, fetcher })
```

Usa `askAiTutor` com `action: adaptiveReview`. Erros são passados via `errors[]`.

### `src/lessons/flow/phases/LessonCompletionCard.jsx`

Adicionado componente interno `AdaptiveReviewPanel`:
- Botão "Revisão adaptativa da aula" (aparece após conclusão).
- On click: chama `buildAdaptiveReview({ lesson, flowErrors, allowAi: true })`.
- `flowErrors` extraídos via `extractFlowErrors(phases, attempts, lesson)`.
- Exibe: `focusSummary`, `microDrills` por pillar (fallback local) ou `aiText` (Gemini).
- Botão "Gerar novamente" para resetar.
- Nunca bloqueia conclusão da aula.
- Importa: `useState`, `Sparkles`, `Lightbulb`, `RotateCcw` do lucide-react.

### `src/lessons/flow/lesson-flow.css`

Novos estilos:
- `.lesson-completion-adaptive` — container de largura total
- `.lesson-completion-adaptive-btn` — botão dashed/violeta para gerar revisão

---

## Onde aparece na UI

**LessonCompletionCard** — ao final de qualquer aula (após todas as fases concluídas):
- Botão "Revisão adaptativa da aula" aparece entre o card de erros e os botões de ação.
- Ao clicar: mostra resultado imediato (local) enquanto tenta IA em background.
- Badge "Local" ou "Gemini" indica a fonte.

---

## Saída esperada do serviço

```js
{
  status: 'success' | 'fallback',
  source: 'local' | 'gemini',
  level: 'A1',
  focusSummary: 'Foco em Escrita: 2 ponto(s) para revisar.',
  priorityPillars: ['writing'],
  errorGroups: [
    {
      pillar: 'writing',
      title: 'Escrita',
      issues: ['Escreva sobre sua rotina diária.'],
      examples: ['I study English everyday'],
      microDrills: ['Escreva 2 frases novas corrigindo o ponto que gerou o erro.', '...']
    }
  ],
  reviewPlan: [{ title: 'Revisão — Escrita', instruction: '...', items: [...] }],
  nextLessonAdvice: 'Antes de avançar, revise os pontos de Escrita.'
}
```

Quando Gemini responde: `aiText` contém o texto gerado, `focusSummary` é extraído da primeira linha.

---

## Persistência

Chave localStorage: `fluency.clean.adaptive-reviews:v1`

Formato: `{ [lessonId-YYYY-MM-DD]: reviewResult }`

Trimming automático a 30 entradas. Não usa Firebase.

---

## Segurança pedagógica

- Revisão usa `flowErrors` reais da sessão (via `extractFlowErrors`).
- Não inventa erros.
- Não gera aula completa.
- Não avança nível automaticamente.
- Não bloqueia conclusão de aula.
- Botão Continuar nunca depende da IA.

---

## Limitações conhecidas

1. `AdaptiveReviewPanel` mostra revisão por aula (erros da sessão atual). Não agrega erros de aulas anteriores — para isso, usar `reviewFromErrors.js` já existente.
2. Gemini pode ser chamado mesmo quando score é alto e não há erros reais — o serviço detecta isso e retorna a mensagem de parabéns do fallback local.
3. O `aiText` da Gemini é exibido como texto pré-formatado (pre-wrap). Não há parsing estruturado do texto.

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
Revisão não bloqueia conclusão de aula.
Fallback local garantido.
Sem secrets ou API keys expostas.
```
