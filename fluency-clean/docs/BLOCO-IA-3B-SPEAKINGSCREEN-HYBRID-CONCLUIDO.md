# BLOCO IA-3B — SpeakingScreen híbrido Azure + IA Tutor (Concluído)

Data: 2026-05-17
Branch: main

---

## Objetivo

Conectar IA Tutor à tela `SpeakingScreen.jsx`, que já usa Azure Speech SDK para transcrição e análise de pronúncia, adicionando uma camada pedagógica de feedback após cada sessão de fala — sem substituir o Azure, sem bloquear o fluxo existente.

---

## Arquivos alterados

### `src/services/aiTutorPolicy.js`

**`buildAiTutorContext`** — novos parâmetros opcionais:
- `referenceText` — frase de referência (modo pronúncia/imersão)
- `prompt` — prompt da conversa
- `mode` — modo de prática (conversation, pronunciation, immersion)
- `azureScores` — objeto com scores do Azure (`pronunciation`, `accuracy`, `fluency`, `completeness`, `weakestWords`)

Todos incluídos no objeto de contexto retornado.

**`buildAiTutorPrompt`** — quando `action === evaluateSpeaking`, adiciona ao prompt enviado ao Gemini:
- Frase de referência, prompt da conversa e modo
- Scores Azure formatados (quando presentes)
- Instruções específicas:
  1. Avalie em 1 frase se a fala respondeu ao prompt.
  2. Aponte 1 erro principal de inglês com explicação curta.
  3. Sugira 1 micro-treino (máx. 2 frases) com exemplo em inglês.

---

### `src/services/aiTutorService.js`

**`askAiTutor`** — novos parâmetros: `referenceText`, `prompt`, `mode`, `azureScores`.
Repassa todos para `buildAiTutorContext`. Variável local renomeada de `prompt` para `tutorPrompt` para evitar colisão com o parâmetro.

**`evaluateSpeakingWithTutor`** — novos parâmetros: `referenceText`, `prompt`, `mode`, `azureScores`.
Repassa todos para `askAiTutor`.

---

### `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`

Bloco speaking agora extrai `azureScores` de `azureResult` antes de chamar `evaluateSpeakingWithTutor`:

```js
const azureScores = azureResult ? {
  pronunciation: azureResult.pronunciationScore ?? null,
  accuracy: azureResult.accuracyScore ?? null,
  fluency: azureResult.fluencyScore ?? null,
  completeness: azureResult.completenessScore ?? null,
  weakestWords: Array.isArray(azureResult.words)
    ? azureResult.words
        .filter((w) => (w.accuracyScore ?? 100) < 70)
        .sort((a, b) => (a.accuracyScore ?? 0) - (b.accuracyScore ?? 0))
        .slice(0, 5)
        .map((w) => w.word)
    : [],
} : null;
```

Também repassa `referenceText`, `prompt` e `mode: skill` para `evaluateSpeakingWithTutor`.

`source` agora é `hybrid` quando `azureResult` está presente (Azure + Gemini), ou `gemini` quando apenas Gemini.

---

### `src/screens/SpeakingScreen.jsx`

#### Imports adicionados
- `Lightbulb` (lucide-react)
- `analyzeStudentAnswer` (studentAnswerAnalysis/index.js)

#### Novo componente `SpeakingAiPanel`

Componente funcional que recebe `{ analysis, loading }`:
- `loading = true`: exibe "Analisando com IA..." com ícone Sparkles.
- `analysis = null` ou sem `feedbackPt`: retorna null (nada renderizado).
- Resultado disponível: renderiza card com badge Local/Gemini/Híbrido, score (quando não-null), `feedbackPt`, lista `issues`, `nextDrill` com Lightbulb. Reutiliza classes CSS `.lesson-phase-ai-result`, `.lesson-phase-ai-result.gemini` etc.

#### Novos estados

```js
const [convAiResult, setConvAiResult] = useState(null);    // conversa
const [convAiLoading, setConvAiLoading] = useState(false);
const [pronAiResult, setPronAiResult] = useState(null);    // pronúncia + imersão
const [pronAiLoading, setPronAiLoading] = useState(false);
```

#### `handleModeChange` atualizado

Reseta todos os estados de IA ao trocar de modo, evitando resultado de um modo aparecer em outro.

#### `handleNextPronunciation` atualizado

Reseta `pronAiResult` e `pronAiLoading` ao avançar para a próxima frase.

#### Pontos de integração

**A — Modo conversa (`appendFreeSpeechAnalysis`)**

Após registrar a tentativa e completar a sessão (não bloqueante):

```js
setConvAiResult(null);
setConvAiLoading(true);
analyzeStudentAnswer({
  lesson: currentLesson,
  pillar: 'speaking',
  skill: 'conversation',
  studentText: recognizedText,
  prompt: currentConversationPrompt,
  referenceText: '',
  azureResult: pronunciationResult,  // resultado Azure quando disponível
  allowAi: true,
}).then((r) => { setConvAiResult(r); setConvAiLoading(false); })
  .catch(() => { setConvAiLoading(false); });
```

**B — Modo pronúncia e imersão (`handlePronunciationRecord.onAutoStop`)**

Após `setMessage('Análise concluída e registrada no histórico real.')` (não bloqueante):

```js
setPronAiResult(null);
setPronAiLoading(true);
analyzeStudentAnswer({
  lesson: currentLesson,
  pillar: 'speaking',
  skill: attemptMode,                                  // 'pronunciation' ou 'immersion'
  studentText: analyzed.result?.recognizedText || '',  // transcrição Azure
  prompt: attemptMode === 'immersion' ? scenario : 'Repita a frase',
  referenceText,                                       // frase de referência
  azureResult: analyzed.result,                        // objeto completo Azure
  allowAi: true,
}).then((r) => { setPronAiResult(r); setPronAiLoading(false); })
  .catch(() => { setPronAiLoading(false); });
```

#### Inserções no JSX

| Modo | Posição | Componente |
|---|---|---|
| conversa | Entre chat list e mic card | `<SpeakingAiPanel analysis={convAiResult} loading={convAiLoading} />` |
| pronúncia | Entre score panel e botões de ação | `<SpeakingAiPanel analysis={pronAiResult} loading={pronAiLoading} />` |
| imersão | Entre imersão card e mic card | `<SpeakingAiPanel analysis={pronAiResult} loading={pronAiLoading} />` |

---

## Como Azure e IA Tutor trabalham juntos

```
Aluno grava fala
↓
Azure: transcreve (recognizeSpeech) — inalterado
↓
Azure: analisa pronúncia (analyzePronunciation) — inalterado
↓
UI: exibe resultado Azure (palavras, score, foco) — inalterado
↓
[NOVO] analyzeStudentAnswer() dispara em background (não-bloqueante):
  → localResult via evaluateSpeakingLocally() (sempre roda)
  → se allowAi=true e há chave: evaluateSpeakingWithTutor() com azureScores
  → Gemini recebe: texto falado, frase de referência, scores Azure, palavras fracas
  → Gemini gera: avaliação do prompt, 1 erro principal, 1 micro-treino
↓
UI: exibe SpeakingAiPanel com badge Híbrido/Gemini/Local
↓
Gravação, histórico e sessão: não bloqueados em nenhum momento
```

---

## Fallback garantido

- Se `analyzeStudentAnswer` lançar exceção: `setConvAiLoading(false)` / `setPronAiLoading(false)` — UI limpa.
- Se Gemini falhar: retorna `localResult` (rubrica local) — SpeakingAiPanel mostra badge Local.
- Se não houver chave: retorna `localResult` com `status: 'fallback'` — SpeakingAiPanel mostra badge Local.
- Se `feedbackPt` estiver vazio: SpeakingAiPanel retorna null (sem card).
- Azure, histórico e conclusão de sessão: independentes da IA.

---

## Limitações conhecidas

### `recognizedText` nem sempre disponível

Em `appendFreeSpeechAnalysis` (conversa), o `recognizedText` é a transcrição do Azure — sempre disponível quando a análise roda.

Em `handlePronunciationRecord`, `analyzed.result?.recognizedText` pode ser string vazia se o Azure não fizer transcrição explícita no modo de avaliação de pronúncia (o Azure às vezes só retorna scores sem retornar o texto). Nesse caso a IA recebe `studentText: ''` mas ainda recebe `referenceText` e `azureScores`, o que permite feedback pedagógico sobre pronúncia.

### Pronúncia e imersão compartilham estado

Ambos os modos usam `pronAiResult` / `pronAiLoading`. Se o usuário trocar entre pronúncia e imersão sem resetar (via `handleModeChange`), o resultado anterior some (o reset em `handleModeChange` garante isso).

---

## Build executado

```bash
cd fluency-clean && npm run build
# Primeiro tentativa: falhou — parâmetro 'prompt' colidiu com variável local em askAiTutor.
# Correção: renomear variável local para 'tutorPrompt'.
# ✅ 2528 módulos, sem erros.
```

---

## Pendências futuras

- **BLOCO IA-4** — Reading/Listening respostas abertas: conectar IA em respostas abertas de leitura e compreensão auditiva.
- **BLOCO IA-5** — Revisão adaptativa real com `flowErrors`: usar erros salvos da aula para gerar microexercícios.
- **BLOCO IA-6** — `StudentAnswerFeedbackCard` unificado: componente único para todos os pilares (atualmente duplicado entre `AttemptField` e `SpeakField`/`SpeakingScreen`).
- **SpeakingScreen — Nova sessão**: atualmente `startNewSpeakingSession` não reseta `convAiResult`. Poderia ser adicionado.

---

## Confirmação final

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Azure existente: não alterado.
Histórico de sessões: não bloqueado.
Gravação: não bloqueada.
Conclusão de sessão: não bloqueada.
Secrets: não expostos.
```
