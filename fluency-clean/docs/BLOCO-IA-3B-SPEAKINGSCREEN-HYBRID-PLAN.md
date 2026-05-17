# BLOCO IA-3B — SpeakingScreen híbrido Azure + IA Tutor (Plano)

Data do plano: 2026-05-17
Branch alvo: main
Status: pendente (não implementado)

---

## Contexto

O BLOCO IA-3 conectou IA Tutor ao `SpeakField` das aulas guiadas.
O `SpeakingScreen.jsx` é a tela separada de prática livre de Speaking, que já possui integração real com Azure Speech SDK.

Este bloco deve conectar IA Tutor também ao `SpeakingScreen`, usando Azure como base e IA como camada pedagógica adicional.

---

## Objetivo

Adicionar feedback pedagógico via IA Tutor após sessões de fala no `SpeakingScreen`, sem substituir o Azure, sem quebrar gravação/histórico e sem bloquear o fluxo se a IA falhar.

---

## O que NÃO deve acontecer

- Não substituir Azure por IA para pronúncia/transcrição.
- Não bloquear gravação se IA falhar.
- Não bloquear conclusão de sessão se IA falhar.
- Não bloquear histórico se IA falhar.
- Não expor secrets ou API keys no frontend.
- Não ativar Azure novo fora do fluxo já existente.
- Não ativar Gemini fora do fluxo `getGeneralAiKeys()` / `askAiTutor()` já existente.
- Não reescrever SpeakingScreen.jsx do zero.
- Não criar branch nova.
- Não abrir PR.

---

## Arquitetura do SpeakingScreen atual

`SpeakingScreen.jsx` possui 4 modos:
- `conversation` — fala livre com `recognizeSpeech()`
- `pronunciation` — repetição com `analyzePronunciation()`
- `immersion` — leitura imersiva com `analyzePronunciation()`
- `history` — visualização de sessões anteriores

Funções principais de análise relevantes:

### `analyzeFreeSpeech(recognizedText)`
- Modo: `conversation`
- Dados disponíveis: `recognizedText` (transcrição livre), `lesson` (contexto da sessão)
- Ponto de integração: após `recognizeSpeech()` retornar com sucesso

### `appendFreeSpeechAnalysis(text)`
- Modo: `conversation`
- Chamada interna de `analyzeFreeSpeech` para adicionar análise ao histórico de utterances
- Ponto de integração: após coletar `recognizedText`

### `handlePronunciationRecord()` / `recordSingleAttempt()`
- Modos: `pronunciation`, `immersion`
- Dados disponíveis: resultado completo do Azure (`azureResult`) com:
  - `pronunciationScore`
  - `accuracyScore`
  - `fluencyScore`
  - `completenessScore`
  - `words[]` com `accuracyScore` por palavra
- Ponto de integração: após `analyzePronunciation()` retornar com sucesso

---

## Dados a enviar para a IA

### Modo conversa (`conversation`)

```js
analyzeStudentAnswer({
  lesson,
  pillar: 'speaking',
  skill: 'free-conversation',
  studentText: recognizedText,
  referenceText: '',           // sem referência fixa em conversa livre
  allowAi: true,
})
```

### Modo pronúncia / imersão (`pronunciation`, `immersion`)

```js
analyzeStudentAnswer({
  lesson,
  pillar: 'speaking',
  skill: mode === 'pronunciation' ? 'pronunciation-drill' : 'immersion-reading',
  studentText: recognizedText || azureResult?.recognizedText || '',
  referenceText: currentPhrase,  // a frase que o aluno devia repetir
  azureResult: {
    pronunciationScore: azureResult.pronunciationScore,
    accuracyScore: azureResult.accuracyScore,
    fluencyScore: azureResult.fluencyScore,
    completenessScore: azureResult.completenessScore,
    words: azureResult.words,    // array com accuracyScore por palavra
  },
  allowAi: true,
})
```

---

## Fluxo híbrido esperado

```
Aluno grava fala
↓
Azure transcreve + pontua pronúncia (já existente — não mudar)
↓
Exibe resultado Azure (pronúncia, fluência, completeness, palavras fracas) — já existente
↓
[NOVO] Chama analyzeStudentAnswer com azureResult + recognizedText
↓
Se Gemini disponível: exibe feedback pedagógico curto
Se Gemini indisponível: exibe fallback local baseado em azureResult
↓
Nenhum bloqueio — gravação e histórico seguem normais
```

---

## UI proposta

Após exibição do resultado Azure existente, adicionar seção colapsável ou inline:

```
[ IA Tutor ]  [badge: Gemini | Local]  [score: XX/100]

"Sua pronúncia de 'beautiful' ficou abaixo de 60. Tente separar
as sílabas: beau-ti-ful. Repita 3 vezes antes de avançar."

Próximo treino: Pratique palavras com 'ea' (beautiful, teacher, speak).

[ Nova análise ]
```

Reutilizar classes já existentes:
- `.lesson-phase-ai-result`
- `.lesson-phase-ai-result.gemini`
- `.lesson-phase-ai-result-header`
- `.lesson-phase-ai-badge`
- `.lesson-phase-ai-score`
- `.lesson-phase-ai-feedback`
- `.lesson-phase-ai-list`
- `.lesson-phase-ai-drill`

---

## Atualização necessária em `localAnswerRubrics.js`

`evaluateSpeakingLocally()` já aceita `azureResult`. Verificar se os campos
`pronunciationScore`, `accuracyScore`, `fluencyScore`, `completenessScore` e `words`
chegam corretamente quando vindos do `SpeakingScreen` (o contrato pode ser ligeiramente
diferente do usado nos testes de `SpeakField`).

---

## Atualização necessária em `studentAnswerAnalysisService.js`

A camada de Speaking já recebe `azureResult` como parâmetro mas ainda não o repassa
para `evaluateSpeakingWithTutor`. Melhorar a chamada para incluir scores do Azure
no contexto enviado à IA:

```js
// Futura versão mais rica:
const tutorResult = await evaluateSpeakingWithTutor({
  lesson: lesson || { title: skill || 'Fala livre', pillar: 'speaking', level },
  spokenText: studentText,
  azureScores: azureResult ? {
    pronunciation: azureResult.pronunciationScore,
    accuracy: azureResult.accuracyScore,
    fluency: azureResult.fluencyScore,
    completeness: azureResult.completenessScore,
    weakestWords: (azureResult.words || [])
      .filter(w => w.accuracyScore < 70)
      .map(w => w.word)
      .slice(0, 5),
  } : null,
});
```

Isso requer atualização paralela em `aiTutorPolicy.js` para incluir essas informações
no prompt enviado ao Gemini — tornando o feedback muito mais específico e útil.

---

## Arquivos a alterar (quando implementar)

| Arquivo | O que mudar |
|---|---|
| `src/screens/SpeakingScreen.jsx` | Adicionar chamadas a `analyzeStudentAnswer` nos pontos listados acima; adicionar estado e UI de resultado de IA |
| `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` | Passar `azureScores` para `evaluateSpeakingWithTutor` |
| `src/services/aiTutorService.js` | Atualizar `evaluateSpeakingWithTutor` para aceitar e usar `azureScores` |
| `src/services/aiTutorPolicy.js` | Atualizar `buildAiTutorContext` para incluir scores Azure no prompt |

---

## Regras de implementação

- Trabalhar direto na `main`.
- Não criar branch.
- Não abrir PR.
- Não reescrever `SpeakingScreen.jsx` — apenas adicionar nos pontos certos.
- Fallback obrigatório: se `analyzeStudentAnswer` lançar exceção, não interromper o fluxo.
- Não bloquear conclusão de sessão aguardando resposta da IA (usar `async` não-bloqueante).
- Rodar `npm run build` ao final e confirmar zero erros.
- Commit descritivo.

---

## Critério de conclusão

- [ ] Modo conversa: após transcrição, exibe feedback de IA Tutor (ou fallback local).
- [ ] Modo pronúncia: após resultado Azure, exibe feedback pedagógico com referência às palavras fracas.
- [ ] Modo imersão: idem pronúncia.
- [ ] Fallback: quando IA indisponível, exibe texto local baseado em `azureResult`.
- [ ] Gravação, histórico e conclusão de sessão não bloqueados.
- [ ] Build limpo.
- [ ] Commit na main.
