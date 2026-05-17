# Fluency Clean — Handoff Oficial

Última atualização: 2026-05-17

## Branch oficial atual

A partir desta data, a branch oficial de trabalho é:

```txt
main
```

A branch `claude/improve-english-system-hu6gz` foi promovida para `main` e não deve mais ser usada como branch principal de continuação.

Backup da main antiga:

```txt
backup-main-before-improve-english-system-2026-05-16
```

Branches antigas/históricas:

```txt
rewrite-fluency-clean-lab
rewrite-fluency-clean
claude/improve-english-system-hu6gz
claude/improve-english-system-hu6gz-IuOMv
lab
```

Essas branches podem existir no GitHub como histórico, mas não devem ser usadas para novos blocos sem autorização explícita do usuário.

---

## REGRA MÁXIMA DE BRANCH — ATUALIZADA

- Trabalhar sempre na `main`.
- Não criar branch nova sem autorização explícita.
- Não voltar para `lab`.
- Não voltar para `rewrite-fluency-clean-lab`.
- Não voltar para `rewrite-fluency-clean`.
- Não voltar para `claude/improve-english-system-hu6gz`.
- Não usar branch sufixada automática.
- Não abrir PR para o fluxo normal.
- Não fazer merge.
- Não fazer rebase.
- Não fazer force push sem autorização explícita.
- Não mexer no backup da main antiga.

Antes de qualquer alteração, confirmar:

```bash
git branch --show-current
```

Resultado esperado:

```txt
main
```

Se não estiver na `main`, parar e trocar para `main` antes de editar.

---

## Regras técnicas obrigatórias

- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML gigante/remendado.
- Não criar gambiarra em arquivo único.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/`, `fluency-clean/docs/` ou arquivos reais de configuração.
- Não mexer no backend Azure privado sem autorização explícita.
- Não mexer no Firebase/Azure de produção sem autorização explícita.
- Não ativar Firebase real, Gemini real, Cloudinary real ou escrita remota sem autorização explícita.
- Não colocar secrets/credenciais no frontend.
- Não compactar conteúdo pedagógico apenas para caber na UI.
- Não mostrar gabarito, transcript, modelo ou resposta esperada antes da tentativa quando a etapa exigir descoberta.

---

## Nova direção oficial — curso fixo premium + IA auxiliar

Decisão estratégica aprovada pelo usuário:

- O Fluency não deve depender de IA para gerar a aula principal em tempo real.
- A aula principal deve vir de conteúdo fixo, curado, completo, validado e renderizado de forma previsível.
- A arquitetura oficial é: curso fixo premium A1 → C2 + prática profunda derivada da aula fixa + IA apenas como tutora/corretora/revisora adaptativa.
- IA pode corrigir Writing, avaliar Speaking, explicar dúvidas, gerar reforço pequeno baseado na aula atual e montar revisão adaptativa.
- IA não deve inventar a aula-base nem substituir o currículo fixo.

Fluxo oficial:

```txt
Curso fixo premium
↓
Curriculum Engine escolhe a próxima aula
↓
Renderizador estável por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA Tutor apenas para correção, dúvida, reforço e revisão adaptativa
↓
Mastery Gate libera ou bloqueia avanço
```

Fluxo antigo a aposentar:

```txt
IA gera aula completa do zero
↓
Parser tenta entender JSON
↓
Pipeline tenta corrigir
↓
Professor revisor tenta aprovar
↓
Aula salva
↓
Renderização quebra ou fica inconsistente
```

---

## Estado atual importante

### Branch/main

- A antiga branch `claude/improve-english-system-hu6gz` foi usada como base final.
- A `main` agora deve conter o estado do sistema de aulas profundas, renderização por pilar, áudio Gemini corrigido e melhorias de fluxo.
- Qualquer continuação deve acontecer diretamente na `main`.

### Sistema de aulas

- `CourseScreen` abre a aula diária por `staticCourseLauncher.js`.
- A aula é salva em `lesson.current`.
- `LessonScreen.jsx` recupera a aula via `getCurrentLesson()` / `getCurrentLessonFull()`.
- O renderizador é escolhido por `FLOW_BY_PILLAR[pillar]`.
- Renderizadores oficiais:
  - `GrammarLessonFlow`
  - `VocabularyLessonFlow`
  - `ReadingLessonFlowV2`
  - `ListeningLessonFlow`
  - `SpeakingLessonFlow`
  - `WritingLessonFlow`

### Correções importantes já feitas

- `fallback-reading` removido do usuário final.
- Sem aula salva, `LessonScreen` mostra estado vazio claro.
- `flowErrors` das aulas alimentam revisão.
- `lessonFlowScore.js` centraliza scoring.
- `completeLesson()` salva XP, streak, lessonId, pillar, flowScore e flowErrors.
- `reviewFromErrors.js` lê erros vindos de `lessonCompletions.flowErrors`.
- `ChecklistField` não deve passar silenciosamente com lista vazia.
- `SpeakField` não deve marcar tentativa com uma única letra.
- `AudioListenField` e shadowing receberam melhorias de áudio.
- `staticLessonDisplayNormalizer.js` foi estendido para mais pilares.
- `lessonFlashcards.js` filtra melhor cards ruins/instruções em português.
- `lesson-flow.css` recebeu ajustes de safe-area para iPhone.

### Áudio Gemini

Correção aplicada:

- `geminiTts.js` agora usa chaves gerais de IA + chaves Flash de aulas + chave Pro de aulas.
- `geminiAudioService.js` tenta múltiplos modelos TTS.
- O navegador deve ser fallback final, não padrão.

Funções cobertas:

- Palavra do dia.
- Citação do dia.
- Ouvir palavra/frase em Cartas.
- Listening.
- Shadowing.
- Speaking model phrases.
- Botões “Ouvir Gemini” nas aulas profundas/estáticas.

---

## ✅ BLOCO COMPLETION-UX-1 — Tela de conclusão, progresso e prática extra (2026-05-17)

Melhoria da experiência pós-conclusão de aula.

Arquivos alterados:
- `src/lessons/flow/LessonFlowShell.jsx` — captura `completionMeta` de `completeLesson()` e passa ao card
- `src/lessons/flow/phases/LessonCompletionCard.jsx` — confirmação "Progresso salvo", badge XP, CTA "Ir ao Curso"
- `src/screens/LessonScreen.jsx` — `isLessonCompleted` controla PracticeMount (locked/unlocked)
- `src/lessons/flow/lesson-flow.css` — estilos `.lesson-completion-saved` e `.lesson-completion-xp`
- `src/styles/lesson-polish.css` — estilos `.lesson-practice-pending-note` e `.lesson-practice-unlocked`

Arquivo criado:
- `docs/BLOCO-COMPLETION-UX-1-CONCLUIDO.md`

Comportamento novo:
- Card de conclusão mostra confirmação verde "Progresso salvo" + badge "+25 XP" na primeira vez
- Card mostra "Aula já concluída anteriormente" em revisitas (sem XP extra)
- CTA "Ir ao Curso" aparece quando não há erros
- PracticeMount bloqueada (banner discreto) até conclusão; liberada com título em verde após conclusão
- `PracticeLauncher` não renderizado antes da conclusão da aula

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em completeLesson/progressStore internamente.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem reescrita de PracticeLauncher.
```

Próxima pendência: REVIEW-POLISH-1

---

## ✅ BLOCO FLOW-STABILITY-1 — Stepper bloqueado + persistência mid-lesson (2026-05-17)

Melhoria de estabilidade do fluxo de fases da aula.

Arquivos alterados:
- `src/lessons/flow/lessonFlowProgress.js` — nova função `canAccessPhaseIndex`
- `src/lessons/flow/useLessonFlowState.js` — `goTo` corrigido; `canGoToIndex` exposto
- `src/lessons/flow/LessonPhaseStepper.jsx` — acesso por fase com `canGoToIndex`; ícone Lock; `aria-disabled`
- `src/lessons/flow/LessonFlowShell.jsx` — passa `canGoToIndex` ao stepper

Arquivo criado:
- `docs/BLOCO-FLOW-STABILITY-1-STEPPER-DRAFT-CONCLUIDO.md`

Comportamento novo:
- Não é mais possível pular fase obrigatória intermediária via stepper ou `goTo`
- Voltar para etapas já visitadas: sempre permitido
- Fases bloqueadas: ícone de cadeado + `aria-disabled` + mensagem no footer ao clicar
- Persistência mid-lesson: draft já funcionava (24h TTL); confirmado correto
- `completed` não é resetado por navegação (já correto desde hotfix)
- Draft limpo somente após conclusão confirmada (já correto desde hotfix)

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em progressStore/completeLesson.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem alteração em IA Tutor, adaptiveReview ou mastery.
```

Próxima pendência: COMPLETION-UX-1

---

## ✅ BLOCO UX-POLISH-1 — iPhone Lesson Flow Polish (2026-05-17)

Polimento visual e mobile da aba Aula para iPhone (~390–430px). Foco exclusivo em CSS.

Arquivos alterados:
- `src/lessons/flow/lesson-flow.css` — bloco `@media (max-width: 430px)` adicionado
- `src/lessons/flow/lesson-phase.css` — cores de contraste corrigidas; 430px expandido
- `src/styles/lesson-polish.css` — bloco 430px para hero da aula
- `src/styles/deep-lesson-mobile.css` — separador visual do PracticeMount

Arquivo criado:
- `docs/BLOCO-UX-POLISH-1-IPHONE-LESSON-FLOW-CONCLUIDO.md`

Principais melhorias:
- Hero compacto no iPhone (padding 14px, h1 ≤ 26px, generation-proof menor)
- FocusHeader com h1 reduzido (`clamp(24px, 7vw, 30px)`)
- Stepper com padding lateral — chips não cortados lateralmente
- PhaseCard h2 ≤ 26px; padding 13px
- Contraste melhorado: word-count, speak-hint e footnote de `#4–5a5a7a` → `#6275a0`
- CompletionCard mais compacto (ícone 54px, stats 22px, padding 20px 16px)
- ActionFooter: botões 46px, hint 12px
- PracticeMount com separação visual e safe-area inferior

Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem alteração em progressStore/completeLesson.
Sem alteração em Azure/Gemini/Firebase/secrets.
Sem alteração em lógica de fases, ordem ou mastery.
```

Próximas pendências:
- FLOW-STABILITY-1 — bloqueio de navegação para fase futura obrigatória
- COMPLETION-UX-1 — desbloqueio/bloqueio visual de PracticeMount pós-conclusão
- REVIEW-POLISH-1 — polish da revisão adaptativa
- FLASHCARDS-QUALITY-1 — qualidade de flashcards por pilar
- MASTERY-GATE-1 — integração real do mastery gate A1→A2

---

## Pendências principais

1. **LessonPhaseStepper**
   - Fases obrigatórias futuras ainda podem ser clicáveis se o aluno tentar pular.
   - Regra desejada: pode voltar, mas não pode avançar para fase obrigatória futura sem concluir obrigatórias anteriores.

2. **Persistência mid-lesson**
   - Refresh ainda pode reiniciar progresso local da aula.
   - Salvar `activeIndex` e `attempts` por `lessonId` no localStorage.

3. **Mastery Gate real**
   - Verificar integração real A1 → A2.
   - Evitar avanço sem domínio mínimo por pilar.

4. **TAG_RULES / revisão inteligente**
   - Ampliar `reviewFromErrors.js` para cobrir mais erros de speaking, vocabulary e writing.

5. **Speaking/Writing com IA Tutor — parcialmente concluído**
   - Writing: IA Tutor integrado em `AttemptField` (multiline) — BLOCO IA-2 concluído.
   - Speaking (aulas guiadas): IA Tutor integrado em `SpeakField` — BLOCO IA-3 concluído.
   - Speaking (tela livre): `SpeakingScreen.jsx` ainda sem IA Tutor — pendência BLOCO IA-3B.
   - Não ativar chamadas reais sem autorização.

6. **Flashcards da aula**
   - Melhorar cards de grammar, writing, speaking e listening sem gerar cards genéricos/lixo.

7. **iPhone polish**
   - Garantir que textarea/input focado não fique escondido pelo footer/menu inferior.
   - Garantir que player de áudio, botões e tabs tenham área confortável.

---

## Como continuar em outro chat

Use este prompt base:

```txt
Continue o trabalho no repositório Belacatalogo/Ingles.

Branch obrigatória atual:
main

Antes de qualquer alteração, leia REWRITE_HANDOFF.md.

Regras obrigatórias:
- trabalhar diretamente na main;
- não criar branch;
- não abrir PR;
- não fazer merge;
- não fazer rebase;
- não fazer force push;
- não voltar para lab, rewrite-fluency-clean-lab ou claude/improve-english-system-hu6gz;
- não mexer no backup backup-main-before-improve-english-system-2026-05-16;
- não usar DOM injection;
- não criar bundle patch;
- não fazer HTML gigante/remendado;
- manter tudo modular;
- não ativar Firebase/Azure/Gemini real sem autorização explícita;
- não colocar secrets no frontend.

Foco atual:
curso fixo premium A1 → C2, renderização profunda por pilar, prática profunda complementar derivada da aula fixa, IA apenas como tutora/corretora/revisora adaptativa.
```

---

## Checklist obrigatório ao finalizar qualquer bloco

Ao final de qualquer bloco, atualizar este handoff com:

- o que foi feito;
- arquivos alterados;
- build/check executados;
- pendências;
- confirmação de que permaneceu na `main`;
- confirmação de que não criou branch, PR, merge, rebase ou force push.

Confirmação esperada:

```txt
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Backup da main antiga preservado.
```

---

## ✅ BLOCO IA-2 — Writing AI integração completa (2026-05-17)

Commit: `6662a06`

Integração completa do IA Tutor na escrita das aulas profundas:

- Prop `lesson` adicionada ao pipeline `LessonFlowShell → LessonPhaseCard → Body → AttemptField`.
- Todos os 5 pilares com `AttemptBody`/`DraftBody` atualizados para repassar `lesson`.
- `extractCorrectedText()` adicionado ao `studentAnswerAnalysisService.js` — extrai versão corrigida do texto livre da IA via regex.
- UI do painel de análise melhorada:
  - Badge source (Local cinza / Gemini violeta).
  - Card `correctedText` (verde) quando disponível.
  - Lista `issues` (âmbar) em bullets.
  - `nextDrill` com ícone Lightbulb.
  - Botão "Nova análise".

Arquivos alterados:
- `src/lessons/flow/LessonFlowShell.jsx`
- `src/lessons/flow/LessonPhaseCard.jsx`
- `src/lessons/flow/grammar/GrammarLessonFlow.jsx`
- `src/lessons/flow/vocabulary/VocabularyLessonFlow.jsx`
- `src/lessons/flow/reading/ReadingLessonFlowV2.jsx`
- `src/lessons/flow/listening/ListeningLessonFlow.jsx`
- `src/lessons/flow/writing/WritingLessonFlow.jsx`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`
- `src/lessons/flow/phases/AttemptField.jsx`
- `src/lessons/flow/lesson-phase.css`

Build: ✅ 2528 módulos, sem erros.

---

## ✅ BLOCO IA-3 — Speaking AI Tutor em SpeakField (2026-05-17)

Commit: `57e0a3e`

IA Tutor conectado ao `SpeakField` das aulas guiadas de Speaking:

- `evaluateSpeakingWithTutor()` adicionado a `aiTutorService.js`.
- Camada de IA para `pillar: 'speaking'` adicionada a `studentAnswerAnalysisService.js`.
- Prop `lesson` repassada via `SpeakingLessonFlow.SpeakBody → SpeakField`.
- Botão "Analisar com IA" em `SpeakField` após tentativa registrada.
- Painel de análise: badge Local/Gemini, score, feedbackPt, issues, nextDrill, "Nova análise".
- Fallback local garantido quando Gemini falha ou não há chave.
- Nenhum bloqueio de avanço — análise é opcional.

Limitações conhecidas:
- `azureResult` não está disponível em `SpeakField` (SpeakExercise não o expõe). Quando o aluno usa voz, `studentText` chega vazio à IA.
- `SpeakingScreen.jsx` (tela de prática livre) não foi alterado — pendência IA-3B.

Arquivos alterados:
- `src/services/aiTutorService.js`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`
- `src/lessons/flow/speaking/SpeakingLessonFlow.jsx`
- `src/lessons/flow/phases/SpeakField.jsx`

Documento completo: `fluency-clean/docs/BLOCO-IA-3-SPEAKING-AI-TUTOR-CONCLUIDO.md`

Build: ✅ 2528 módulos, sem erros.

---

## ✅ BLOCO IA-3B — SpeakingScreen híbrido Azure + IA Tutor (2026-05-17)

IA Tutor conectada à tela `SpeakingScreen.jsx` de forma híbrida com Azure.

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — `buildAiTutorContext` e `buildAiTutorPrompt` aceitam `referenceText`, `prompt`, `mode`, `azureScores`; prompt de speaking enriquecido com scores Azure
- `src/services/aiTutorService.js` — `askAiTutor` e `evaluateSpeakingWithTutor` repassam todos os novos parâmetros; variável local renomeada de `prompt` para `tutorPrompt`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` — extração de `azureScores` de `azureResult`; `source: 'hybrid'` quando Azure + Gemini
- `src/screens/SpeakingScreen.jsx` — novo componente `SpeakingAiPanel`; 4 novos estados; integração não-bloqueante em `appendFreeSpeechAnalysis` e `handlePronunciationRecord.onAutoStop`; painel inserido em conversa, pronúncia e imersão

Comportamento:
- Azure continua inalterado para transcrição e análise de pronúncia.
- Após Azure, `analyzeStudentAnswer` dispara em background com `azureResult` + `recognizedText`.
- Gemini recebe azureScores, palavras fracas, frase de referência e prompt.
- Fallback local garantido quando Gemini falha ou não há chave.
- Gravação, histórico e conclusão de sessão não bloqueados.
- Badge mostra: Híbrido (Azure+Gemini), Gemini, ou Local.

Build: ✅ 2528 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-3B-SPEAKINGSCREEN-HYBRID-CONCLUIDO.md`

---

## ✅ BLOCO IA-4 — Reading/Listening AI feedback em respostas abertas (2026-05-17)

IA Tutor conectado às fases de resposta aberta de Reading e Listening.

Descoberta-chave: o botão "Analisar com IA" já existia (implementado em IA-2 via `AttemptField` multiline), mas roteava como `pillar: 'writing'` (hardcoded) e o serviço não tinha camada de IA para reading/listening.

Correções aplicadas:
- `pillar` estava hardcoded como `'writing'` em `handleAiAnalyze` — corrigido para usar a prop `pillar`.
- Prop `pillar = 'writing'` adicionada a `AttemptField` (default preserva todos os callers existentes).
- Campo `prompt` (pergunta da questão) agora enviado para `analyzeStudentAnswer`.
- Camadas de IA para `pillar: 'reading'` e `pillar: 'listening'` adicionadas ao serviço.
- `evaluateReadingWithTutor` usa `lesson.mainText` como base de avaliação.
- `evaluateListeningWithTutor` usa `lesson.transcript` como base de avaliação.
- Transcript não exposto antes da tentativa — botão só aparece após `attempted === true`.
- Fallback local garantido quando Gemini falha ou não há chave.

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — 2 novas actions (`evaluateReadingAnswer`, `evaluateListeningAnswer`), labels e blocos de prompt
- `src/services/aiTutorService.js` — `evaluateReadingWithTutor()`, `evaluateListeningWithTutor()`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js` — camadas de IA para reading e listening, import atualizado
- `src/lessons/flow/phases/AttemptField.jsx` — prop `pillar`, `handleAiAnalyze` corrigido, `prompt` enviado
- `src/lessons/flow/reading/ReadingLessonFlowV2.jsx` — `pillar="reading"` em `AttemptBody`
- `src/lessons/flow/listening/ListeningLessonFlow.jsx` — `pillar="listening"` em `AttemptBody`
- `fluency-clean/docs/BLOCO-IA-4-READING-LISTENING-AI-CONCLUIDO.md` — documentação completa

Build: ✅ 2528 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-4-READING-LISTENING-AI-CONCLUIDO.md`

Confirmação:
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

---

## HOTFIX — Conclusão de aula pós IA-5/IA-6 (2026-05-17)

Bug: No iPhone, após concluir a aula, a UI parecia voltar ao começo e não registrar a conclusão.
Causa 1: `goTo()` chamava `setCompleted(false)` — clicar no stepper após conclusão resetava o card de conclusão.
Causa 2: `LessonCompletionCard` era renderizado abaixo da última fase, fora da viewport no mobile.
Causa 3: `WritingLessonFlow` tinha fase passiva "Preparação para feedback" como última etapa.

Fixes:
- `useLessonFlowState.js`: `goTo` não reseta mais `completed`; nova função `restart()` explícita; `percent = 100` quando completed
- `LessonFlowShell.jsx`: exibição exclusiva (completion card substitui stepper+fase); scroll automático ao completar; `stableLessonId`; logging em handleComplete
- `WritingLessonFlow.jsx`: `writing-feedback-prep` removido do flow

Arquivos: `useLessonFlowState.js`, `LessonFlowShell.jsx`, `WritingLessonFlow.jsx`
Documento: `fluency-clean/docs/HOTFIX-IA-5-6-LESSON-COMPLETION-FEEDBACK-FLOW.md`
Build: ✅ 2533 módulos, sem erros.

---

## ✅ BLOCO IA-5 — Revisão adaptativa real com erros do aluno (2026-05-17)

Serviço modular de revisão adaptativa baseado em erros reais das aulas.

Arquivos criados:
- `src/services/adaptiveReview/adaptiveReviewTypes.js` — constantes ADAPTIVE_REVIEW_STATUS, ADAPTIVE_REVIEW_SOURCE, ADAPTIVE_REVIEW_STORAGE_KEY
- `src/services/adaptiveReview/localAdaptiveReview.js` — `buildLocalAdaptiveReview()`: fallback local por pillar (grammar/writing/reading/listening/speaking/vocabulary)
- `src/services/adaptiveReview/adaptiveReviewService.js` — `buildAdaptiveReview()`: orquestra local + cache + Gemini
- `src/services/adaptiveReview/index.js` — re-exports

Arquivos alterados:
- `src/services/aiTutorPolicy.js` — prompt block para `adaptiveReview` action (estruturado, max 250 palavras, 3 micro-exercícios)
- `src/services/aiTutorService.js` — `buildAdaptiveReviewWithTutor({ lesson, errors, level, fetcher })`
- `src/lessons/flow/phases/LessonCompletionCard.jsx` — componente interno `AdaptiveReviewPanel` com botão "Revisão adaptativa da aula"
- `src/lessons/flow/lesson-flow.css` — `.lesson-completion-adaptive` e `.lesson-completion-adaptive-btn`

Comportamento:
- Botão "Revisão adaptativa da aula" aparece ao final de toda aula no LessonCompletionCard.
- `flowErrors` extraídos de `extractFlowErrors(phases, attempts, lesson)` — erros reais da sessão.
- Local: agrupa por pillar, cria microDrills de banco fixo, retorna imediatamente.
- IA: usa `adaptiveReview` action com erros serializados como contexto — max 250 palavras.
- Cache: `fluency.clean.adaptive-reviews:v1` por `lessonId-data`.
- Sem bloqueio de conclusão de aula. Sem secrets expostos. Fallback local garantido.

Build: ✅ 2533 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-5-ADAPTIVE-REVIEW-CONCLUIDO.md`

---

## ✅ BLOCO IA-6 — UI unificada de feedback de IA (2026-05-17)

Componente único `StudentAnswerFeedbackCard` substitui painel duplicado em 3 locais.

Arquivo criado:
- `src/components/ai/StudentAnswerFeedbackCard.jsx` — props: `result`, `loading`, `title`, `onRetry`, `compact`

Props suportadas no result:
- `status`, `source`, `score`, `feedbackPt`, `correctedText`, `issues`, `strengths`, `nextDrill`

Locais substituídos:
- `src/lessons/flow/phases/AttemptField.jsx` — inline `aiAnalysisNode` substituído
- `src/lessons/flow/phases/SpeakField.jsx` — inline `aiAnalysisNode` substituído; imports `Lightbulb`/`RotateCcw` removidos
- `src/screens/SpeakingScreen.jsx` — `SpeakingAiPanel` reduzido a 1-line wrapper de `StudentAnswerFeedbackCard`

CSS: reutiliza `lesson-phase.css` existente. Nenhum arquivo CSS novo criado.
Badge automático: `Local` / `Gemini` / `Híbrido` baseado em `result.source`.

Build: ✅ 2533 módulos, sem erros.
Documento completo: `fluency-clean/docs/BLOCO-IA-6-STUDENT-FEEDBACK-UI-CONCLUIDO.md`

---

## Blocos IA — estado final

- `BLOCO IA-1` — ✅ Student Answer Analysis Service
- `BLOCO IA-2` — ✅ Writing integração completa
- `BLOCO IA-3` — ✅ Speaking AI Tutor em SpeakField
- `BLOCO IA-3B` — ✅ SpeakingScreen híbrido Azure + IA Tutor
- `BLOCO IA-4` — ✅ Reading/Listening respostas abertas
- `BLOCO IA-5` — ✅ Revisão adaptativa real com flowErrors (concluído — 2026-05-17)
- `BLOCO IA-6` — ✅ StudentAnswerFeedbackCard componente unificado (concluído — 2026-05-17)

Pendências reais restantes (não são blocos de IA):
- Melhorar qualidade dos prompts de revisão adaptativa com mais contexto de nível.
- Conectar Firebase real futuramente com autorização explícita.
- Melhorar analytics/mastery gate A1→A2.
- Testar UX real em iPhone (safe-area, textarea oculto).
- Ampliar TAG_RULES em reviewFromErrors.js para cobrir erros de speaking e writing.

---

## ✅ BLOCO IA-1 — Student Answer Analysis Service (2026-05-17)

Camada central de análise de respostas do aluno implementada em:

```
src/services/studentAnswerAnalysis/
  studentAnswerAnalysisTypes.js   — constantes e contrato de saída
  localAnswerRubrics.js           — avaliadores locais por pilar
  studentAnswerAnalysisService.js — função principal analyzeStudentAnswer()
  index.js                        — re-exports
```

Regras respeitadas:
- Fallback local garantido mesmo sem chave de IA.
- IA (Gemini) é camada opcional via `allowAi: true`.
- Não substitui o curso fixo.
- Não gera aula.
- Usa `correctWritingWithTutor()` do `aiTutorService.js` quando allowAi=true.
- Resposta do serviço sempre segue o contrato `AnalysisResult`.

Integração mínima: botão **"Analisar com IA"** adicionado em `AttemptField.jsx` somente para campos `multiline` (writing), após tentativa registrada.

Blocos de IA subsequentes:
- `BLOCO IA-2` — ✅ Writing integração completa (concluído — commit 6662a06)
- `BLOCO IA-3` — ✅ Speaking híbrido em SpeakField (concluído — commit 57e0a3e)
- `BLOCO IA-3B` — ✅ SpeakingScreen híbrido Azure + IA Tutor (concluído)
- `BLOCO IA-4` — ✅ Reading/Listening respostas abertas (concluído)
- `BLOCO IA-5` — ✅ Revisão adaptativa real com flowErrors (concluído)
- `BLOCO IA-6` — ✅ StudentAnswerFeedbackCard componente unificado (concluído)

Documento completo: `fluency-clean/docs/BLOCO-IA-1-STUDENT-ANSWER-ANALYSIS-CONCLUIDO.md`
Plano original: `fluency-clean/docs/PLANO-IA-ANALISE-RESPOSTAS-UTIL-LAB.md`

---

## HOTFIX CRÍTICO — Persistência de conclusão de aula (2026-05-17)

Bug: iPhone mostra "Aula concluída!" com 100%, mas ao sair e voltar o progresso não está salvo.

Causas:
1. `registerReadingVocabularyMistakes` e `recordLessonMastery` eram chamados **antes** de `storage.set()` em `completeLesson()`. Se qualquer um lançasse exceção, o save principal nunca executava.
2. Em `useLessonFlowState.next()`, `setCompleted(true)` e `clearDraft()` disparavam **antes** de `onComplete()` ser chamado — a UI mostrava conclusão mesmo quando o save falhava em seguida.
3. `stableLessonId` no shell e `getCompletionId` no progressStore geravam IDs diferentes para aulas sem `id` direto — `isLessonCompleted` não encontrava o dado salvo.

Fixes:
- `progressStore.js`: `getCompletionId` unificado com fallback de 5 campos; helpers em try/catch isolados; `storage.set` executa **primeiro**; operações secundárias isoladas; retorna `{ ..., saved, verified }`.
- `useLessonFlowState.js`: `next()` passa `onSaveSuccess` e `onSaveError` para o shell em vez de chamar `setCompleted`/`clearDraft` diretamente.
- `LessonFlowShell.jsx`: `handleComplete` desestrutura `onSaveSuccess`/`onSaveError`; verifica `result.saved`; chama `onSaveError` se save falhou (card de conclusão NÃO aparece); `stableLessonId` sincronizado com `getCompletionId`.

Arquivos alterados:
- `src/services/progressStore.js`
- `src/lessons/flow/useLessonFlowState.js`
- `src/lessons/flow/LessonFlowShell.jsx`

Documento: `fluency-clean/docs/HOTFIX-LESSON-COMPLETION-PERSISTENCE.md`
Build: ✅ 2533 módulos, sem erros.

Confirmação:
```
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Conclusão de aula sempre persistida antes de mostrar card de conclusão.
Falha de storage visível para o aluno (mensagem de erro no footer).
```
