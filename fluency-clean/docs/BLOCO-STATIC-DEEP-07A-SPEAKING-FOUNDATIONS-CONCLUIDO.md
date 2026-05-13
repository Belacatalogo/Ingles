# BLOCO-STATIC-DEEP-07A — Speaking A1 Foundations profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como criação inicial do pacote Speaking A1 Foundations profundo.

## Objetivo

Criar aulas de Speaking que não peçam fala livre sem preparação.

Cada aula precisa conduzir o aluno em etapas:

1. situação real de fala;
2. modelo;
3. repetição guiada;
4. substitution drills;
5. pergunta-resposta;
6. construção de resposta;
7. gravação guiada;
8. checklist;
9. fala livre curta.

## Aulas criadas

Arquivo:

`fluency-clean/src/content/curriculum/levels/A1/deepSpeakingFoundations.js`

Aulas:

1. `A1-SPEAKING-001` — Say hello and goodbye
2. `A1-SPEAKING-002` — Introduce yourself
3. `A1-SPEAKING-003` — Spell your name
4. `A1-SPEAKING-004` — Say your country and city

## O que cada aula contém

Cada aula foi criada em `static-lesson-schema-v2-deep` usando `createSpeakingLesson`.

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
- `speakingSituation`
- `modelPhrases`
- `pronunciationChunks`
- `repeatAfterMe`
- `substitutionDrills`
- `questionAnswerDrills`
- `buildYourAnswer`
- `recordingTasks`
- `speakingChecklist`
- `freeSpeaking`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

## Conexão com currículo

Arquivo alterado:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

Mudança:

- Importa `A1_DEEP_SPEAKING_FOUNDATIONS`.
- Importa `A1_DEEP_SPEAKING_BY_PILLAR`.
- Prioriza Speaking profundo antes das versões antigas do mesmo ID.
- Mantém compatibilidade com `foundationsSafe.js` e `fullContent.js`.

## Critério de qualidade aplicado

Speaking precisa preparar a fala antes de pedir produção.

As aulas foram estruturadas para conter:

- situação real;
- frases modelo;
- foco de pronúncia;
- repetição guiada;
- substituição controlada;
- pergunta-resposta;
- construção de resposta;
- tarefas de gravação;
- checklist;
- fala livre curta e limitada.

## Pontos que precisam ser validados no próximo bloco

O BLOCO 7A cria e conecta o pacote.

O próximo bloco precisa validar:

- se as aulas passam no validator estrutural;
- se passam no filtro de conteúdo pedagógico;
- se `DeepSpeakingLesson` renderiza todos os campos importantes;
- se não há pedido de fala livre sem preparação;
- se os drills aparecem claros no mobile;
- se a gravação guiada/checklist aparece antes da fala livre;
- se não há frases genéricas;
- se o botão de Speaking fixo abre o novo sistema pela `LessonScreen`.

## Próximo bloco obrigatório

## BLOCO 7B — Validar Speaking A1 Foundations

Critérios:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- renderização mobile aceitável;
- sem conteúdo genérico;
- não pedir fala livre sem preparação;
- repetição guiada clara;
- substitution drills claros;
- gravação guiada + checklist antes da fala livre;
- atalho de Speaking abrindo o sistema fixo novo.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-06B-LISTENING-FOUNDATIONS-VALIDADO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-07A-SPEAKING-FOUNDATIONS-CONCLUIDO.md.
Speaking A1 Foundations profundo foi criado e conectado. Próximo bloco obrigatório: BLOCO 7B — validar Speaking A1 Foundations contra estrutura, conteúdo pedagógico, UX mobile e se não pede fala livre sem preparação.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não avançar para Writing antes de validar Speaking.
```
