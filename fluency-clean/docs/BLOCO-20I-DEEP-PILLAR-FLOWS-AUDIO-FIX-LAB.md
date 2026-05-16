# BLOCO 20I — Deep pillar flows + áudio real do Listening

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir dois pontos encontrados no teste real no iPhone:

1. O botão **Ouvir** do novo fluxo de Listening apenas marcava tentativa e não reproduzia áudio.
2. Os renderizadores por pilar estavam funcionando visualmente, mas ainda consumiam só uma parte pequena do schema `static-lesson-schema-v2-deep`, fazendo parecer que o conteúdo premium estava cortado.

## Implementado

### Áudio real no Listening

Criado:

- `src/lessons/flow/phases/AudioListenField.jsx`

O novo campo:

- usa `generateGeminiAudioBlob` de `src/services/geminiAudioService.js`;
- detecta múltiplos speakers por linhas `Nome:`;
- gera blob de áudio natural;
- cria `<audio controls>` real;
- marca tentativa apenas quando o player começa a tocar;
- mostra status de preparação/erro;
- não toca automaticamente.

Atualizado:

- `src/lessons/flow/listening/ListeningLessonFlow.jsx`

Agora as etapas de primeira e segunda escuta usam `AudioListenField`.

### Renderizadores profundos por pilar

Atualizados para consumir mais campos do schema v2-deep:

- `src/lessons/flow/grammar/GrammarLessonFlow.jsx`
- `src/lessons/flow/vocabulary/VocabularyLessonFlow.jsx`
- `src/lessons/flow/reading/ReadingLessonFlowV2.jsx`
- `src/lessons/flow/listening/ListeningLessonFlow.jsx`
- `src/lessons/flow/speaking/SpeakingLessonFlow.jsx`
- `src/lessons/flow/writing/WritingLessonFlow.jsx`

Novo helper:

- `src/lessons/flow/phases/ListPhase.jsx`

Atualizado:

- `src/lessons/flow/index.js`
- `src/lessons/flow/phases/ChoiceField.jsx`

## Cobertura por pilar

### Grammar
Agora monta fases para:

- teacherOpening / whyItMatters
- conceptExplanation
- mentalModel
- formationGuide / grammarTable / whenToUse / whenNotToUse
- stepByStep
- teacherExamples / professorExamples
- portugueseContrast
- commonBrazilianMistakes / commonMistakes
- controlledPractice / guidedPractice
- errorCorrectionPractice
- transformationPractice
- translationPractice
- productionTasks
- lessonRecap / finalChecklist

### Vocabulary
Agora monta fases para:

- topicContext
- essentialWords / vocabulary / lexicalSets
- chunks / collocations / phrases
- pronunciationFocus
- dangerousConfusions
- miniDialogues
- examples
- recognitionPractice
- usagePractice
- productionTasks
- spacedReview

### Reading
Agora monta fases para:

- readingPurpose
- preReading / preReadingVocabulary / vocabulary
- readingStrategy
- mainText
- firstReadTask
- secondReadTasks
- evidenceQuestions / evidenceTasks / comprehensionQuestions
- contextVocabularyTasks
- guidedSummary / shortResponse / summaryTask
- connectedProduction / productionTask
- lessonRecap

### Listening
Agora monta fases para:

- listeningPreparation
- keyWordsToHear / vocabulary / pronunciationChunks
- primeira escuta com áudio real
- firstListenTasks
- segunda escuta com áudio real
- secondListenTasks
- listeningComprehension / comprehensionQuestions
- dictationTasks
- shadowing / pronunciationChunks
- transcript / audioScript
- oralProduction

### Speaking
Agora monta fases para:

- speakingSituation
- modelPhrases / modelSentences
- pronunciationChunks / pronunciationFocus
- repeatAfterMe
- substitutionDrills
- questionAnswerDrills / guidedSpeaking
- buildYourAnswer
- recordingTasks
- freeSpeaking
- speakingChecklist

### Writing
Agora monta fases para:

- modelText
- modelTextBreakdown
- writingBlocks / usefulSentences
- grammarForWriting
- guidedSubstitution
- commonWritingMistakes
- draftTask
- revisionChecklist / checklist
- finalVersionTask
- feedbackPreparation

## Gates mantidos

- Gabarito/modelo de resposta continua oculto até tentativa.
- `ChoiceField` agora aceita `options`, `choices`, `alternatives`, `answerKey`, `correctOption` e `correctChoice`.
- Etapas com tentativa continuam bloqueando o botão continuar até ação feita.
- Sem DOM injection.
- Sem bundle patch.
- Sem alteração em `bundle.js`.
- Sem alteração no backend Azure privado.

## Observações de QA

No Listening, o primeiro clique agora prepara o áudio. Depois que o player aparecer, o usuário precisa tocar no player para ouvir. Isso segue a regra anterior do projeto: não tocar áudio automaticamente.

Se aparecer erro de key, a mensagem esperada é pedir chave em `Ajustes > Chaves de aulas > IA geral`, pois o serviço atual usa Gemini TTS.

## Próximo QA recomendado

Testar no iPhone, na branch `rewrite-fluency-clean-lab`:

- Listening: preparar áudio, tocar no player, verificar se marca tentativa.
- Listening: avançar até transcript e confirmar que transcript só aparece depois das fases iniciais.
- Grammar: confirmar que existem várias fases, não só conceito/prática.
- Vocabulary: confirmar palavras, chunks, pronúncia e usos.
- Reading: confirmar texto principal + múltiplas perguntas/fases.
- Speaking: confirmar várias fases de fala.
- Writing: confirmar modelo, blocos, rascunho, checklist e versão final.
