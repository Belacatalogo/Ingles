# BLOCO-STATIC-DEEP-06A — Listening A1 Foundations profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como criação inicial do pacote Listening A1 Foundations profundo.

## Objetivo

Criar aulas de Listening que não sejam Reading disfarçado.

Cada aula precisa ensinar o aluno a ouvir em etapas:

1. preparação antes do áudio;
2. palavras-chave para ouvir;
3. primeira escuta sem transcript;
4. segunda escuta com foco;
5. transcript liberado depois;
6. shadowing;
7. dictation leve;
8. compreensão;
9. produção oral curta.

## Aulas criadas

Arquivo:

`fluency-clean/src/content/curriculum/levels/A1/deepListeningFoundations.js`

Aulas:

1. `A1-LISTENING-001` — Greetings and names
2. `A1-LISTENING-002` — Spelling names
3. `A1-LISTENING-003` — Numbers and phone numbers
4. `A1-LISTENING-004` — Countries and cities

## O que cada aula contém

Cada aula foi criada em `static-lesson-schema-v2-deep` usando `createListeningLesson`.

Campos principais:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `listeningPreparation`
- `keyWordsToHear`
- `audioScript`
- `firstListenTasks`
- `secondListenTasks`
- `transcript`
- `vocabulary`
- `shadowing`
- `dictationTasks`
- `pronunciationChunks`
- `listeningComprehension`
- `oralProduction`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

## Conexão com currículo

Arquivo alterado:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

Mudança:

- Importa `A1_DEEP_LISTENING_FOUNDATIONS`.
- Importa `A1_DEEP_LISTENING_BY_PILLAR`.
- Prioriza Listening profundo antes das versões antigas do mesmo ID.
- Mantém compatibilidade com `foundationsSafe.js` e `fullContent.js`.

## Critério de qualidade aplicado

Listening precisa ensinar escuta, não leitura.

As aulas foram estruturadas para conter:

- instrução explícita para ouvir sem transcript na primeira escuta;
- palavras-chave para preparar o ouvido;
- tarefas de primeira escuta com foco em ideia geral;
- tarefas de segunda escuta com foco em detalhe;
- transcript apenas depois;
- shadowing com chunks curtos;
- dictation leve;
- perguntas de compreensão;
- produção oral curta.

## Pontos que precisam ser validados no próximo bloco

O BLOCO 6A cria e conecta o pacote.

O próximo bloco precisa validar:

- se as aulas passam no validator estrutural;
- se passam no filtro de conteúdo pedagógico;
- se `DeepListeningLesson` renderiza todos os campos importantes;
- se o transcript não aparece antes da proposta de escuta;
- se shadowing e dictation aparecem de forma clara;
- se não há frases genéricas;
- se o botão de Listening fixo abre o novo sistema pela `LessonScreen`.

## Próximo bloco obrigatório

## BLOCO 6B — Validar Listening A1 Foundations

Critérios:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- renderização mobile aceitável;
- sem conteúdo genérico;
- não parecer Reading disfarçado;
- primeira escuta antes do transcript;
- shadowing/dictation claros;
- produção oral curta;
- atalho de Listening abrindo o sistema fixo novo.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-05B-READING-FOUNDATIONS-VALIDADO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-06A-LISTENING-FOUNDATIONS-CONCLUIDO.md.
Listening A1 Foundations profundo foi criado e conectado. Próximo bloco obrigatório: BLOCO 6B — validar Listening A1 Foundations contra estrutura, conteúdo pedagógico, UX mobile e se não virou Reading disfarçado.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não avançar para Speaking antes de validar Listening.
```
