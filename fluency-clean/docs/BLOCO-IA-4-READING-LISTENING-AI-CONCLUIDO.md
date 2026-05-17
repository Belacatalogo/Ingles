# BLOCO IA-4 — Reading/Listening respostas abertas com IA Tutor (Concluído)

Data: 2026-05-17
Branch: main

---

## Objetivo

Integrar IA Tutor em respostas abertas de Reading e Listening, avaliando se a resposta do aluno está baseada no texto/áudio da aula, sem revelar gabarito/transcript antes da tentativa e sem quebrar os avaliadores locais.

---

## Descoberta-chave da auditoria

O botão "Analisar com IA" **já existia** em Reading e Listening — ambos usam `AttemptField` com `multiline=true`, e o botão aparece para campos multiline após a tentativa (implementado em IA-2).

O problema era duplo:
1. `pillar` estava hardcoded como `'writing'` dentro de `handleAiAnalyze` em `AttemptField`.
2. O `studentAnswerAnalysisService.js` não tinha camada de IA para `pillar === 'reading'` ou `pillar === 'listening'` — caía diretamente no `localResult`.

---

## Arquivos alterados

### `src/services/aiTutorPolicy.js`

**`AI_TUTOR_ALLOWED_ACTIONS`** — novas actions:
- `evaluateReadingAnswer: 'evaluate-reading-answer'`
- `evaluateListeningAnswer: 'evaluate-listening-answer'`

**`ACTION_LABELS`** — novos labels:
- `'Avaliar resposta de Reading'`
- `'Avaliar resposta de Listening'`

**`buildAiTutorPrompt`** — novos blocos de instruções:

Para `evaluateReadingAnswer`:
```
Texto de referência: [referenceText]
Pergunta feita ao aluno: [prompt]

Avalie em português:
1. A resposta está baseada no texto? (1 frase)
2. O que está incorreto ou incompleto? (com evidência do texto)
3. Mostre uma resposta melhor (cite o texto, não invente)
4. Sugira 1 micro-treino de leitura curto.
```

Para `evaluateListeningAnswer`:
```
Transcript/contexto do áudio: [referenceText]
Pergunta feita ao aluno: [prompt]

Avalie em português:
1. O aluno entendeu o áudio corretamente? (1 frase)
2. O que está errado ou incompleto? (com referência ao áudio)
3. Mostre uma resposta correta (cite o áudio, não invente)
4. Sugira 1 micro-treino de escuta curto.
```

Ambos os blocos respeitam a regra de não revelar transcript/texto completo como resposta.

---

### `src/services/aiTutorService.js`

**`evaluateReadingWithTutor({ lesson, studentText, prompt, referenceText, expectedAnswer, fetcher })`**

Extrai `sourceText` de `referenceText || lesson.mainText || lesson.text || lesson.readingText || lesson.article.text`.
Chama `askAiTutor` com `action: evaluateReadingAnswer`, passando `sourceText.slice(0, 2000)` como `referenceText` explícito.

**`evaluateListeningWithTutor({ lesson, studentText, prompt, referenceText, expectedAnswer, fetcher })`**

Extrai `sourceTranscript` de `referenceText || lesson.transcript || lesson.audioScript || lesson.script`.
Chama `askAiTutor` com `action: evaluateListeningAnswer`, passando `sourceTranscript.slice(0, 2000)`.

Ambas usam o fluxo `askAiTutor` existente — sem chamar Gemini diretamente. Fallback herdado.

---

### `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`

Import atualizado:
```js
import {
  correctWritingWithTutor,
  evaluateSpeakingWithTutor,
  evaluateReadingWithTutor,
  evaluateListeningWithTutor
} from '../aiTutorService.js';
```

Camada de IA para `pillar === 'reading'`:
- Chama `evaluateReadingWithTutor` com `lesson`, `studentText`, `prompt`, `referenceText`, `expectedAnswer`.
- Se Gemini responde com sucesso: `feedbackPt = tutorResult.text`, `source = 'gemini'`.
- Se falha: retorna `localResult` silenciosamente.

Camada de IA para `pillar === 'listening'`:
- Idêntica estrutura.
- Usa `evaluateListeningWithTutor`.

Grammar/Vocabulary: ainda retornam `localResult` (IA-5 futuro).

---

### `src/lessons/flow/phases/AttemptField.jsx`

**Prop adicionada**: `pillar = 'writing'` (default preserva comportamento anterior para Writing e Grammar/Vocabulary).

**`handleAiAnalyze` atualizado**:
```js
// Antes:
pillar: 'writing',
skill: clean(item.title || item.prompt || item.question || 'escrita'),

// Depois:
pillar,
skill: clean(item.title || item.prompt || item.question || pillar),
prompt: clean(item.prompt || item.question || item.title || ''),
```

Agora a questão (`item.prompt`) é enviada como `prompt` para o serviço, enriquecendo o contexto da IA.

---

### `src/lessons/flow/reading/ReadingLessonFlowV2.jsx`

```jsx
// AttemptBody: adicionado pillar="reading"
function AttemptBody({ phase, flow, lesson }) {
  return <AttemptField phase={phase} flow={flow} item={phase.item}
    multiline minWords={phase.minWords || 3} lesson={lesson} pillar="reading" />;
}
```

---

### `src/lessons/flow/listening/ListeningLessonFlow.jsx`

```jsx
// AttemptBody: adicionado pillar="listening"
function AttemptBody({ phase, flow, lesson }) {
  return <AttemptField phase={phase} flow={flow} item={phase.item}
    multiline minWords={phase.minWords || 3} lesson={lesson} pillar="listening" />;
}
```

---

## Como Reading e Listening foram integrados

```
Aluno lê texto / ouve áudio
↓
Aluno responde na fase aberta (AttemptField multiline)
↓
AttemptField registra tentativa localmente — botão Continuar liberado
↓
[NOVO] Botão "Analisar com IA" aparece (já existia — agora funciona para reading/listening)
↓
Aluno clica → analyzeStudentAnswer({ pillar: 'reading'/'listening', ... })
↓
localResult sempre calculado primeiro (sem IA)
↓
se allowAi=true e há chave:
  Reading → evaluateReadingWithTutor (lesson.mainText como referência)
  Listening → evaluateListeningWithTutor (lesson.transcript como referência)
↓
Gemini avalia com base no texto/transcript da aula fixa
↓
feedbackPt exibido no painel IA Tutor (badge Gemini ou Local)
↓
Botão Continuar: não bloqueado
```

---

## O que a IA pode e não pode fazer

### Pode:
- Avaliar se a resposta está baseada no texto (Reading) ou áudio (Listening).
- Apontar 1 erro ou incompletude com evidência.
- Mostrar como seria uma resposta melhor.
- Sugerir 1 micro-treino curto.
- Usar o conteúdo fixo da aula como base exclusiva.

### Não pode:
- Revelar o texto ou transcript completo como resposta.
- Aparecer antes da tentativa ser registrada.
- Bloquear o avanço do aluno.
- Inventar informação fora do conteúdo da aula.
- Gerar uma nova aula.

---

## Segurança pedagógica

- O transcript de Listening está em `lesson.transcript`, que já vai para `getLessonText(lesson)` no prompt do Gemini. O botão "Analisar com IA" só aparece **após** a tentativa ser registrada (`attempted === true`). Portanto o aluno já tentou ouvir antes de receber análise da IA.
- Para Reading, `lesson.mainText` é o texto — o aluno já leu antes de responder (a fase de leitura é anterior e obrigatória no flow).
- A IA recebe o texto/transcript apenas para evaluar a resposta, não para revelar ao aluno.

---

## Limitações conhecidas

1. **`referenceText` passado de `AttemptField`**: o campo `AttemptField` não passa `referenceText` explicitamente para `analyzeStudentAnswer`. O serviço extrai o texto do objeto `lesson` (`lesson.mainText` / `lesson.transcript`) diretamente nas funções auxiliares. Funciona, mas depende de que esses campos existam no objeto `lesson`.

2. **Grammar e Vocabulary**: ainda recebem apenas `localResult` (sem camada de IA). Planejado para IA-5 ou IA-6.

3. **Pillar padrão = 'writing'**: fluxos que não passam `pillar` explicitamente continuam com `'writing'` como fallback. Isso preserva o comportamento anterior.

---

## Build executado

```bash
cd fluency-clean && npm run build
# ✅ 2528 módulos, sem erros.
```

---

## Pendências futuras

- **BLOCO IA-5** — Revisão adaptativa real com `flowErrors`: usar erros salvos para gerar microexercícios.
- **BLOCO IA-6** — `StudentAnswerFeedbackCard` componente unificado: reduzir duplicação entre `AttemptField`, `SpeakField` e `SpeakingScreen`.
- Adicionar AI layer para Grammar e Vocabulary (baixa prioridade — quiz objetivo não precisa de IA).

---

## Confirmação final

```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Transcript não exposto antes da tentativa.
Gabarito não revelado antes da tentativa.
Fallback local garantido.
```
