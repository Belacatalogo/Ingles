# Lesson UI Rebuild — Handoff

Última atualização: 2026-05-16
Branch atual: `claude/improve-english-system-hu6gz`

---

## ✅ Bloco concluído: Correção dos botões de áudio em todo o sistema (2026-05-16)

### Problema raiz

O sistema tinha dois mecanismos de áudio incompatíveis:

| Sistema | Função | Chave | Fallback |
|---|---|---|---|
| A | `playLearningAudio` (audioPlayback.js) | `lesson.gemini.flashKeys` | Sim — browser TTS |
| B | `generateGeminiAudioBlob` (geminiAudioService.js) | `ai.gemini.generalKeys` | **Não** — throw imediato |

Os botões que usavam o Sistema B simplesmente não faziam nada visível — o erro aparecia só em texto de status (pequeno), sem áudio.

### Componentes afetados e corrigidos

| Componente | Problema | Fix |
|---|---|---|
| `AudioListenField.jsx` | Sem fallback — erro silencioso ao preparar áudio | Catch → `playLearningAudio` com browser TTS |
| `ListeningTextPlayer.jsx` | Mesmo problema | Catch → `playLearningAudio` |
| `ListeningShadowingPractice.jsx` | Mesmo problema | Catch → `playLearningAudio` |
| `StaticLessonRenderer.jsx` (`playGeminiPremiumAudio`) | Sem try/catch — throw propagava | Try/catch → `playLearningAudio` como fallback |

### Comportamento após o fix

- **Com chave Gemini geral**: áudio premium via `generateGeminiAudioBlob` (como antes)
- **Com chave Gemini de aulas**: `playLearningAudio` usa Gemini TTS via `getLessonFlashKeys`
- **Sem nenhuma chave**: `playLearningAudio` cai no browser TTS (`window.speechSynthesis`) — áudio básico mas funcional
- Status text informa o que está acontecendo em cada caso

### Arquivos alterados
- `fluency-clean/src/lessons/flow/phases/AudioListenField.jsx`
- `fluency-clean/src/components/lesson/ListeningTextPlayer.jsx`
- `fluency-clean/src/components/lesson/ListeningShadowingPractice.jsx`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

---

## ✅ Bloco concluído: Estrutura pedagógica real do sistema de aulas (2026-05-16)

### Auditoria — o que estava raso

| Problema | Severidade |
|---|---|
| `masteryStore` só conhecia 4 pilares (grammar, writing, reading, listening) | Alta — speaking e vocabulary nunca atualizavam o domínio |
| `scoreLessonAttempt()` lia `lesson.exercises[]` (formato antigo) | Alta — score sempre 100% falso nas aulas novas |
| `extractWeakTopics()` usava `lesson.title`, não os erros reais | Alta — tópicos fracos nunca refletiam o que o aluno errou |
| `completeLesson()` não sabia quais fases foram certas/erradas | Alta — backend de progresso era cego ao resultado real |
| `errorBank` não lia erros de ChoiceField/AttemptField | Alta — respostas erradas de aulas não chegavam ao banco de erros |
| `LessonCompletionCard` tinha `buildSummary()` próprio desalinhado com o backend | Média — score da tela e score salvo eram calculados diferente |
| Feedback pedagógico ignorava `item.hint/explanation/note` | Média — dica disponível no conteúdo, não mostrada ao aluno |

### O que foi feito

**`lessonFlowScore.js` (NOVO — fonte única de verdade):**
- `computeFlowResults(phases, attempts)` — calcula score real normalizando AttemptField `{value, matched, feedback}`, ChoiceField `{value, matched}`, AudioListenField `{played}`, SpeakField `{spoken}`, ChecklistField `{checked}`
- `extractFlowErrors(phases, attempts, lessonMeta)` — extrai fases com erro para o banco de erros
- `getAttemptStatus(attempt)` — normaliza qualquer formato de tentativa

**`masteryStore.js`:**
- Adicionados pilares `speaking` e `vocabulary`
- `scoreLessonAttempt()` aceita `preComputedScore` — usa score real do flow
- `extractWeakTopics()` aceita `flowResults` — tópicos fracos agora são os títulos das fases erradas
- `recordLessonMastery()` repassa os novos params
- `pillar` lido de `lesson.pillar || lesson.type` (mais robusto)

**`progressStore.js`:**
- `completeLesson()` aceita `flowResults` e `preComputedScore`
- Salva `completion.flowErrors` (fases erradas) e `completion.flowScore` no registro
- `pillar` lido de `lesson.pillar || lesson.type`

**`errorBank.js`:**
- `fromLessonCompletions()` lê `completion.flowErrors` — respostas erradas de AttemptField/ChoiceField agora aparecem no banco de erros e no alerta da TodayScreen

**`LessonFlowShell.jsx`:**
- Usa `computeFlowResults()` e `extractFlowErrors()` ao concluir
- Passa `preComputedScore` e `flowResults` para `completeLesson()`

**`LessonCompletionCard.jsx`:**
- Usa `computeFlowResults()` — mesma fonte de verdade do backend
- `weakTitles` inclui fases `missed` (não tentadas) além de `warn`

**`AttemptField.jsx`:**
- Exibe `item.hint/tip/explanation/note` como dica pedagógica (Lightbulb âmbar) quando status é `warn`
- Antes esse campo era ignorado mesmo quando o conteúdo fornecia explicação

**`ChoiceField.jsx`:**
- Exibe `item.explanation/hint/rationale` após a tentativa
- Mostra no acerto (como complemento) e no erro (como dica âmbar)

**`lesson-phase.css`:**
- `.lesson-phase-feedback-hint` — estilo âmbar para dicas pedagógicas, diferente do model-answer azul

### Como cada ponto melhorou

1. **Pilares**: todos os 6 agora atualizam o domínio do aluno (antes speaking/vocabulary eram ignorados)
2. **Score real**: `masteryStore` usa o resultado real das fases em vez de sempre retornar 100%
3. **Tópicos fracos**: derivados das fases que o aluno errou, não do título genérico da aula
4. **Banco de erros**: respostas erradas de aulas chegam ao `errorBank` e aparecem na TodayScreen
5. **Consistência**: tela de conclusão e dados salvos usam a mesma função de cálculo
6. **Feedback pedagógico**: explicações e dicas do conteúdo são exibidas ao aluno quando erra

### Arquivos alterados
- `fluency-clean/src/lessons/flow/lessonFlowScore.js` — NOVO
- `fluency-clean/src/lessons/flow/LessonFlowShell.jsx`
- `fluency-clean/src/lessons/flow/phases/LessonCompletionCard.jsx`
- `fluency-clean/src/lessons/flow/phases/AttemptField.jsx`
- `fluency-clean/src/lessons/flow/phases/ChoiceField.jsx`
- `fluency-clean/src/lessons/flow/lesson-phase.css`
- `fluency-clean/src/services/masteryStore.js`
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/services/errorBank.js`

### O que ainda fica para o próximo bloco

- **Persistência mid-lesson**: refresh da página reinicia a aula do zero. Falta salvar `activeIndex` e `attempts` em localStorage enquanto a aula estiver em andamento
- **Revisão de itens errados**: existe `getErrorReviewQueue()` e `getPracticeReviewQueue()` mas não há tela ou fluxo para revisar especificamente os erros das fases de aula
- **Mastery por pillar na TodayScreen**: `getMasteryProfile()` tem os dados por pilar mas não são exibidos ao aluno
- **Gate de avanço por score**: hoje o aluno pode concluir com 0% de acerto. Considerar um mínimo pedagógico opcional por pilar

---

## ✅ Bloco concluído: Dark Theme + Completion Card + Pillar Icons (2026-05-16)

### O que foi feito

**lesson-phase.css — reescrita completa para tema escuro:**
- Todos os inputs, textareas, choices, feedback, listas passaram para a paleta navy escura
- Inputs: `rgba(8,14,34,.72)`, bordas visíveis, foco azul com box-shadow
- Choice buttons: escuros com estados hover/picked/correct/wrong
- Feedback ok: verde (#a7f3d0) | Feedback warn: âmbar (#fde68a)
- iPhone: `min-height` 48-54px em todos os botões, `font-size: 16px` nos inputs (previne zoom iOS)
- Arquivo reescrito de forma legível (era uma linha minificada)

**AttemptField — melhorias pedagógicas:**
- Contador de palavras em tempo real (x / N palavras, fica verde quando atingido)
- Ícone `<Check>` no botão "Conferir"
- Campo bloqueado só quando feedback é 'ok' (sempre pode tentar de novo em 'warn')

**ListPhase — vocab cards inteligentes:**
- Detecta se itens têm tradução/pt/meaning → renderiza como vocab card
- Vocab card: palavra grande + tradução azul + nota cinza + exemplo em itálico
- Fallback limpo para itens simples (steps, rules, examples)

**LessonCompletionCard — fase de conclusão:**
- Novo componente `phases/LessonCompletionCard.jsx`
- Aparece quando o usuário clica "Concluir aula" na última fase
- Mostra: acertos / a revisar / aproveitamento em %
- Lista etapas com status 'warn' para revisão
- Botão "Rever aula" volta ao início

**useLessonFlowState — estado de conclusão:**
- Adicionado `completed` boolean
- `next()` na última fase seta `completed = true` em vez de não fazer nada
- `goTo()` reseta `completed` (permite navegar e re-concluir)
- `onComplete` callback disponível para integração futura

**LessonActionFooter:**
- Oculta quando `completed = true`
- Label da última fase: "Concluir aula" (era "Finalizar etapa")

### Arquivos alterados
- `fluency-clean/src/lessons/flow/lesson-phase.css` — reescrita
- `fluency-clean/src/lessons/flow/lesson-flow.css` — adicionado CSS do completion card
- `fluency-clean/src/lessons/flow/phases/AttemptField.jsx` — contador de palavras
- `fluency-clean/src/lessons/flow/phases/ListPhase.jsx` — vocab cards inteligentes
- `fluency-clean/src/lessons/flow/phases/LessonCompletionCard.jsx` — NOVO
- `fluency-clean/src/lessons/flow/LessonFlowShell.jsx` — integra completion card
- `fluency-clean/src/lessons/flow/LessonActionFooter.jsx` — oculta em completed
- `fluency-clean/src/lessons/flow/useLessonFlowState.js` — completed state

### Estado atual
- Todas as aulas (Grammar, Reading, Listening, Speaking, Writing, Vocabulary) usam o tema escuro
- O sistema de fases está funcionando com início, meio e fim bem definidos
- Build limpo (2520 módulos, sem erros)

### Próximo bloco recomendado
- `BLOCO-LESSON-UI-READING-POLISH`: melhorar tipografia e layout do texto de leitura
- `BLOCO-LESSON-UI-SPEAKING-POLISH`: melhorar o `SpeakField` com feedback visual de fala
- `BLOCO-LESSON-UI-PROGRESS-INTEGRATION`: conectar `onComplete` do flow ao `completeLessonRecord`
- `BLOCO-LESSON-UI-AUDIO-POLISH`: melhorar `AudioListenField` UX no iPhone

### Cuidados importantes
- Não remover o `lesson-phase.css` — é importado em `lesson-phase.css` mas aplicado em toda a camada de fases
- O `completed` state reseta ao navegar entre fases. Isso é intencional.
- O `LessonCompletionCard` usa `flow.attempts` — não tem acesso ao progressStore direto
- `ListPhase` detecta vocab por presença de `translation/pt/portuguese/meaning` nos items. Se itens de lista simples tiverem esses campos, serão renderizados como vocab card (comportamento esperado)

---

---

## ✅ Bloco concluído: 7 correções pedagógicas e UX (2026-05-16)

Branch: `main`

### O que foi feito

**1. LessonPhaseStepper — bloqueio de navegação avançada**
- `useLessonFlowState.goTo(index)` agora bloqueia navegação para frente quando a fase atual obrigatória não foi completada
- Mensagem: `activePhase.blockedMessage || 'Conclua a etapa atual antes de avançar.'`
- Navegação para fases já visitadas (index ≤ activeIndex) sempre permitida
- `LessonPhaseStepper` aceita `canGoForward` prop — botões futuros recebem classe `.blocked` (opacity reduzida) e `title` explicativo
- `LessonFlowShell` passa `canGoForward={flow.canAdvance}` para o stepper

**2. Persistência mid-lesson (localStorage, 24h)**
- Novo `lessonFlowDraftStore.js`: `saveDraft(lessonId, state)`, `loadDraft(lessonId)`, `clearDraft(lessonId)`
- Chave: `fluency:lesson-flow-draft:{lessonId}`, TTL 24 horas
- `useLessonFlowState` aceita `options.lessonId`, inicializa `activeIndex` e `attempts` do rascunho salvo (lazy initializer)
- Draft salvo em `goTo()` e `markAttempt()`; limpo ao concluir
- `LessonFlowShell` extrai `lessonId` de `lesson.id || lesson.generationMeta.id`

**3. iPhone footer/input**
- `scroll-padding-bottom` adicionado a `.lesson-flow-shell` — garante que inputs ficam visíveis ao abrir teclado
- `scroll-margin-bottom` adicionado a `.lesson-phase-input` e `.lesson-phase-textarea` em mobile — scroll automático acima do footer quando campo recebe foco
- `font-size: 16px` já estava presente (previne zoom iOS); confirmado

**4. Completion card CTAs**
- Já conectados na sessão anterior; verificado: `onNavigate('cards')` para flashcards, `onNavigate('course')` para revisão de erros
- `LessonFlowShell` passa `lesson` e `onNavigate` para `LessonCompletionCard`
- Tab ID correto: `'cards'` (não `'flashcards'`)

**5. TAG_RULES expandidas em reviewFromErrors.js**
- 9 novas regras cobrindo: grammar (possessivos, plurais irregulares), reading (main-idea, inference), listening (key-words, numbers), speaking (pronunciation, fluency, structure), vocabulary (collocations, false-friends), writing (paragraph, connectors)
- `inferFallbackLessons()` expandida para reconhecer todos os 6 pilares via `item.pillar`
- Total: 23 regras (era 10)

**6. Flashcards melhorados por pilar**
- `isInstructionText()` filtra frases de instrução em português (Complete:, Escreva:, Troque:...) das fronts dos cards
- `buildLessonFlashcards()` agora é pilar-aware:
  - Speaking: prioriza modelPhrases + pronunciationChunks + repeatAfterMe
  - Writing: prioriza usefulSentences + writingBlocks + connectors
  - Listening: prioriza keyWordsToHear + shadowingPhrases
  - Demais: vocabulário geral + gramática (comportamento anterior)
- Novas funções: `cardsFromSpeakingFields`, `cardsFromWritingFields`, `cardsFromListeningFields`

**7. Scoring gate**
- `useLessonFlowState.next()` na última fase verifica: se existem fases obrigatórias (`requiresAttempt === true`) e TODAS estão sem tentativa (`!attempts[p.id]`), bloqueia com mensagem pedagógica
- Gate é safety net — com o stepper blocking em vigor, essa situação só ocorre em edge cases

### Arquivos alterados
- `fluency-clean/src/lessons/flow/lessonFlowDraftStore.js` — NOVO
- `fluency-clean/src/lessons/flow/useLessonFlowState.js` — draft + blocking + gate
- `fluency-clean/src/lessons/flow/LessonPhaseStepper.jsx` — `canGoForward` + `.blocked`
- `fluency-clean/src/lessons/flow/LessonFlowShell.jsx` — `lessonId` + `canGoForward`
- `fluency-clean/src/lessons/flow/lesson-flow.css` — `.blocked` + `scroll-padding-bottom`
- `fluency-clean/src/lessons/flow/lesson-phase.css` — `scroll-margin-bottom` mobile
- `fluency-clean/src/services/reviewFromErrors.js` — 23 TAG_RULES + pillar fallbacks
- `fluency-clean/src/services/lessonFlashcards.js` — pillar-aware + instruction filter

### Build
- `npm run build` passou: 2522 módulos, sem erros de compilação

### O que ainda fica pendente
- `CourseScreen` restructured in previous block; A1 panels now collapsible
- Mastery por pillar visível na TodayScreen (dados existem mas não exibidos)
- Revisão de erros de fases: tela dedicada para rever itens errados (atualmente no ErrorReviewPanel)
- iPhone: testar em device real (safe-area e scroll-margin são difíceis de verificar sem hardware)

---

Data original: 2026-05-14
Branch original: `rewrite-fluency-clean-lab`

## Leia antes de qualquer bloco de UI de aula

Este arquivo complementa `REWRITE_HANDOFF.md` e `fluency-clean/docs/BLOCO-LESSON-UI-00-PILLAR-FLOW-MASTERPLAN-LAB.md`.

## Decisão oficial

O tendão de Aquiles atual do Fluency é a UI das aulas. O conteúdo fixo e o currículo estão avançando, mas as telas de aula ainda não entregam uma experiência pedagógica forte por pilar.

A próxima frente deve ser uma reformulação por fluxo, não hotfixes isolados.

## Problema central

- A aula ainda pode virar rolagem infinita.
- O stepper atual não controla profundamente a progressão pedagógica.
- Reading precisa focar texto, compreensão e evidência.
- Listening precisa impedir transcript antes da escuta/tentativa.
- Speaking precisa fazer o aluno falar, não apenas escrever fallback.
- Writing precisa virar ambiente de produção, revisão e versão final.
- Grammar precisa guiar regra, exemplos, erros, prática e produção.
- Vocabulary precisa guiar grupos, chunks, reconhecimento e uso ativo.
- Mastery Gate precisa ser específico por pilar.

## Documento mestre criado

Arquivo obrigatório:

- `fluency-clean/docs/BLOCO-LESSON-UI-00-PILLAR-FLOW-MASTERPLAN-LAB.md`

Esse documento define:

- diagnóstico;
- nova arquitetura;
- arquivos sugeridos;
- fluxos por pilar;
- gates por pilar;
- ordem dos próximos blocos;
- apps/referências recomendadas para design.

## Ordem recomendada

1. `BLOCO-LESSON-UI-01-FLOW-SHELL-LAB`
2. `BLOCO-LESSON-UI-02-READING-FLOW-LAB`
3. `BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB`
4. `BLOCO-LESSON-UI-04-SPEAKING-FLOW-LAB`
5. `BLOCO-LESSON-UI-05-WRITING-FLOW-LAB`
6. `BLOCO-LESSON-UI-06-GRAMMAR-VOCAB-FLOW-LAB`
7. `BLOCO-LESSON-UI-07-PILLAR-MASTERY-GATES-LAB`
8. `BLOCO-LESSON-UI-08-IPONE-SMOKE-POLISH-LAB`

## Regras obrigatórias

- Não mexer em `main`.
- Não mexer em `rewrite-fluency-clean`.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não criar HTML gigante/remendado.
- Não mexer no backend Azure privado.
- Não mexer no Firebase/Azure de produção.
- Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` sem bloco específico.
- Não apagar renderers atuais antes da nova camada estar criada e validada.
- Não compactar conteúdo pedagógico para caber na UI.
- Não mostrar gabarito/transcript/modelo antes da tentativa quando a etapa exigir descoberta.

## Próximo bloco recomendado

`BLOCO-LESSON-UI-01-FLOW-SHELL-LAB`

Objetivo:
- criar `LessonFlowShell`, `LessonPhaseStepper`, `LessonPhaseCard`, `LessonActionFooter`, `LessonFocusHeader` e estado de fluxo;
- não substituir todos os renderers ainda;
- criar camada paralela segura;
- preparar a troca gradual dos pilares.

## Apps recomendados

- Figma: prototipar telas por pilar.
- FigJam: mapear jornada e fases.
- Mobbin: buscar referências mobile reais.
- Notion ou Linear: organizar backlog e critérios.
- Vercel: validar preview e build depois da implementação.

## Apps não recomendados agora

- Lovable: não usar para reescrever este projeto neste momento, porque pode gerar código paralelo fora da arquitetura existente.
