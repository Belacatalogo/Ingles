# BLOCO IA-3 — Speaking AI Tutor em SpeakField (Concluído)

Data: 2026-05-17
Branch: main
Commit base: 57e0a3e5fb34a8e95db6f2174b2fd1598d66c4f2

---

## Objetivo

Conectar a IA Tutor ao fluxo guiado de Speaking das aulas profundas (`SpeakField`), adicionando feedback pedagógico após a tentativa do aluno — seja ela via microfone ou fallback textual.

Escopo deliberadamente limitado a `SpeakField` (fases das aulas guiadas). A tela de prática livre `SpeakingScreen.jsx` ficou como pendência IA-3B.

---

## Arquivos alterados

### `src/services/aiTutorService.js`

Nova função exportada:

```js
export async function evaluateSpeakingWithTutor({ lesson, spokenText = '', fetcher = fetch } = {}) {
  return askAiTutor({ lesson, action: AI_TUTOR_ALLOWED_ACTIONS.evaluateSpeaking, studentInput: spokenText, fetcher });
}
```

Delega para `askAiTutor` com a action `evaluateSpeaking` já mapeada em `aiTutorPolicy.js`.
Usa a mesma cadeia de chaves (`getGeneralAiKeys()`), modelos (`gemini-2.5-flash`, `gemini-2.5-flash-lite`) e fallback local já existentes.

---

### `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`

Import adicionado:

```js
import { correctWritingWithTutor, evaluateSpeakingWithTutor } from '../aiTutorService.js';
```

Camada de IA para `pillar === 'speaking'` adicionada após o bloco de Writing (Step 4):

```js
if (pillar === 'speaking') {
  try {
    const tutorResult = await evaluateSpeakingWithTutor({
      lesson: lesson || { title: skill || 'Fala livre', pillar: 'speaking', level },
      spokenText: studentText,
    });
    if (tutorResult?.status === 'success' && tutorResult.text) {
      return {
        ...localResult,
        status: ANALYSIS_STATUS.success,
        feedbackPt: tutorResult.text,
        source: ANALYSIS_SOURCE.gemini,
      };
    }
  } catch {
    // AI failed — fall through to local result
  }
  return localResult;
}
```

Fallback garantido: se Gemini falhar ou não houver chave, retorna `localResult` sem exceção.

---

### `src/lessons/flow/speaking/SpeakingLessonFlow.jsx`

`SpeakBody` atualizado para aceitar e repassar `lesson`:

```jsx
// antes:
function SpeakBody({ phase, flow }) {
  return <SpeakField phase={phase} flow={flow} item={phase.item} instruction={phase.instruction} />;
}

// depois:
function SpeakBody({ phase, flow, lesson }) {
  return <SpeakField phase={phase} flow={flow} item={phase.item} instruction={phase.instruction} lesson={lesson} />;
}
```

`lesson` chega a `SpeakBody` via a cadeia `LessonFlowShell → LessonPhaseCard → Body` já estabelecida nos BLOCOs IA-1/IA-2.

---

### `src/lessons/flow/phases/SpeakField.jsx`

Alterações completas:

1. **Imports adicionados**: `Lightbulb`, `RotateCcw`, `Sparkles` (lucide-react) e `analyzeStudentAnswer`.

2. **Prop adicionada**: `lesson = null`.

3. **Estado adicionado**: `aiAnalysis` (null), `aiLoading` (false).

4. **Handler adicionado**: `handleAiAnalyze()`:
   - Chama `analyzeStudentAnswer({ lesson, pillar: 'speaking', skill, studentText: value.trim(), expectedAnswer: expected, allowAi: true })`.
   - Trata exceção com mensagem local de fallback.

5. **UI adicionada** (`aiAnalysisNode`):
   - Aparece somente quando `attempted === true`.
   - Estado inicial: botão "Analisar com IA" (ou "Analisando..." durante carregamento).
   - Estado com resultado: card com badge Local/Gemini, score (quando não-null), `feedbackPt`, lista `issues`, `nextDrill` com ícone Lightbulb, botão "Nova análise".
   - Reutiliza as classes CSS `.lesson-phase-ai-result`, `.lesson-phase-ai-result.gemini` etc. já definidas em `lesson-phase.css` pelo BLOCO IA-2.

6. **Posicionamento**: `aiAnalysisNode` renderizado como filho direto de `PhaseShell`, após o bloco `lesson-phase-speak-wrap`.

---

## O que foi implementado

- ✅ `evaluateSpeakingWithTutor()` em `aiTutorService.js`.
- ✅ Camada de IA para Speaking em `studentAnswerAnalysisService.js`.
- ✅ Repasse de `lesson` via `SpeakingLessonFlow → SpeakBody → SpeakField`.
- ✅ Botão "Analisar com IA" pós-tentativa em `SpeakField`.
- ✅ Painel de análise com badge Local/Gemini, score, feedbackPt, issues, nextDrill.
- ✅ Fallback local garantido quando Gemini falha ou não há chave.
- ✅ Nenhum bloqueio de avanço — análise é opcional, não gating.
- ✅ Build limpo: 2528 módulos, sem erros.

---

## O que NÃO foi implementado (limitações deste bloco)

### 1. `azureResult` não conectado

`SpeakField` não tem acesso direto ao resultado do Azure Speech SDK. O campo aceita fallback textual (`value`) quando o aluno digita, mas quando o aluno usa o microfone via `SpeakExercise`, o `value` fica vazio (`spoken: true, value: ''`).

Consequência: quando o aluno usa voz e não texto, `studentText` enviado à IA fica como string vazia. A IA recebe apenas o contexto da aula (prompt, skill, lesson) — sem a transcrição real.

Isso é aceitável como primeira versão (a IA ainda pode dar orientação geral com base no prompt), mas é uma limitação real. IA-3B deve corrigir isso.

### 2. SpeakingScreen.jsx não tocado

`SpeakingScreen.jsx` é a tela de prática livre de Speaking, que já usa Azure real para:
- `recognizeSpeech()` na conversa livre;
- `analyzePronunciation()` na conversa, pronúncia e imersão;
- histórico de sessões, palavras fracas e score médio.

Este bloco **não** conectou IA Tutor ali. Isso é a pendência IA-3B.

### 3. `correctedText` não extraído para Speaking

Para Writing, o serviço extrai `correctedText` do texto livre da IA usando padrões regex (`extractCorrectedText()`). Para Speaking, isso não foi adicionado — a IA pode sugerir frase corrigida no texto livre, mas não é extraída e exibida em destaque. IA-3B pode melhorar isso se relevante.

---

## Pendência: BLOCO IA-3B — SpeakingScreen híbrido Azure + IA Tutor

Ver plano completo em: `fluency-clean/docs/BLOCO-IA-3B-SPEAKINGSCREEN-HYBRID-PLAN.md`

Resumo:
- Conectar IA Tutor aos pontos de análise já existentes em `SpeakingScreen.jsx`.
- Usar transcrição real e scores do Azure como entrada para a IA.
- Não substituir o Azure.
- Não bloquear gravação/histórico/conclusão se IA falhar.

---

## Validação executada

```bash
cd fluency-clean && npm run build
# ✅ 2528 módulos, sem erros, sem warnings de compilação.
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
Backup da main antiga preservado: backup-main-before-improve-english-system-2026-05-16
SpeakingScreen.jsx: não alterado.
Arquivos não relacionados: não alterados.
```
