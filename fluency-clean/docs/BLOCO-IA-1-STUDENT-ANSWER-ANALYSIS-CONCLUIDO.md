# BLOCO IA-1 — Student Answer Analysis Service (Concluído)

Data: 2026-05-17
Branch: main

---

## Objetivo

Criar uma camada central, modular e reutilizável para análise de respostas do aluno — sem forçar uso de IA em todos os lugares, e com fallback local garantido.

---

## Arquivos criados

### `src/services/studentAnswerAnalysis/studentAnswerAnalysisTypes.js`

Constantes e contrato de saída:

- `ANALYSIS_STATUS` — `success | fallback | error`
- `ANALYSIS_SOURCE` — `local | azure | gemini | hybrid`
- `CEFR_FIT` — `ok | too-simple | too-hard | unknown`
- `PILLARS` — array dos 6 pilares
- `emptyResult()` — retorna estrutura nula segura

### `src/services/studentAnswerAnalysis/localAnswerRubrics.js`

Avaliadores locais por pilar, sem IA:

- `evaluateWritingLocally()` — verifica letra maiúscula, pontuação, extensão, sujeito, verbo, concordância `am/is/are`, comparação com `expectedAnswer`
- `evaluateSpeakingLocally()` — usa `azureResult` (accuracy, fluency, completeness, pronunciation, weakWords); fallback por contagem de palavras se sem Azure
- `evaluateGenericLocally()` — usado para grammar, vocabulary, reading, listening; compara com `expectedAnswer` via normalização

### `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`

Função central: `analyzeStudentAnswer(opts)`

Aceita:
- `lesson`, `pillar`, `skill`, `studentText`, `referenceText`, `prompt`, `expectedAnswer`
- `azureResult` (Speaking), `errors` (contexto), `allowAi` (flag)

Fluxo:
1. Sempre roda rubrica local primeiro
2. Se `allowAi = false` → retorna local
3. Se sem chaves → retorna local com `status: 'fallback'`
4. Writing + `allowAi = true` → chama `correctWritingWithTutor()` (aiTutorService)
5. Se IA falhar → retorna local
6. Speaking/Grammar/Vocabulary/Reading/Listening → local por ora (IA-3, IA-4 futuros)

### `src/services/studentAnswerAnalysis/index.js`

Re-exporta `analyzeStudentAnswer` e todos os tipos.

---

## Integração mínima: AttemptField (Writing)

Arquivo modificado: `src/lessons/flow/phases/AttemptField.jsx`

O que foi adicionado:
- Import de `analyzeStudentAnswer` e `Sparkles` (ícone)
- Prop opcional `lesson = null`
- Estado `aiAnalysis` e `aiLoading`
- Handler `handleAiAnalyze()` — chama o serviço com `allowAi: true`
- Reset de `aiAnalysis` ao clicar em "Melhorar resposta"
- Botão **"Analisar com IA"** — aparece somente quando:
  - `multiline === true` (campos de texto writing)
  - `attempted === true` (tentativa já registrada)
- Exibe resultado com score e feedbackPt em card violeta discreto
- Não bloqueia o botão Continuar
- Não interfere em questões objetivas (campos `multiline = false`)

CSS adicionado em `lesson-phase.css`:
- `.lesson-phase-ai-analysis`
- `.lesson-phase-ai-result`
- `.lesson-phase-ai-result-header`
- `.lesson-phase-ai-score`

---

## Contrato de saída (sempre presente)

```js
{
  status: 'success' | 'fallback' | 'error',
  pillar: 'writing' | 'speaking' | 'grammar' | 'vocabulary' | 'reading' | 'listening',
  skill: string,
  score: number | null,
  level: string,
  cefrFit: 'ok' | 'too-simple' | 'too-hard' | 'unknown',
  correctedText: string,
  feedbackPt: string,
  strengths: string[],
  issues: string[],
  nextDrill: string,
  source: 'local' | 'azure' | 'gemini' | 'hybrid',
}
```

---

## O que NÃO foi feito (próximos blocos)

### BLOCO IA-2 — Writing integração completa
- Passar `lesson` do `WritingLessonFlow` para o `AttemptField` via `phase._lesson`
- Mostrar `correctedText` quando disponível
- Distinguir visualmente local vs gemini no resultado

### BLOCO IA-3 — Speaking híbrido Azure + IA
- `evaluateSpeakingLocally` já usa `azureResult` → connectar via `SpeakField`
- Adicionar camada IA Tutor para avaliar conteúdo da resposta

### BLOCO IA-4 — Reading/Listening respostas abertas
- Conectar `evaluateGenericLocally` para reading e listening
- IA verifica se resposta está baseada no texto/áudio da aula

### BLOCO IA-5 — Revisão adaptativa real
- Usar `flowErrors` para gerar microexercícios via IA Tutor
- Salvar localmente como revisão do dia

### BLOCO IA-6 — `StudentAnswerFeedbackCard` unificado
- Componente visual único para todos os pilares
- Nota + versão corrigida + dica + botão "Praticar erro"

---

## Arquivos alterados neste bloco

- `fluency-clean/src/services/studentAnswerAnalysis/studentAnswerAnalysisTypes.js` — NOVO
- `fluency-clean/src/services/studentAnswerAnalysis/localAnswerRubrics.js` — NOVO
- `fluency-clean/src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` — NOVO
- `fluency-clean/src/services/studentAnswerAnalysis/index.js` — NOVO
- `fluency-clean/src/lessons/flow/phases/AttemptField.jsx` — botão "Analisar com IA"
- `fluency-clean/src/lessons/flow/lesson-phase.css` — estilos do painel de análise

Build: ✅ 2528 módulos, sem erros.
