# BLOCO-STATIC-DEEP-05A — Reading A1 Foundations profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como criação inicial do pacote Reading A1 Foundations profundo.

## Objetivo

Criar aulas de Reading que não sejam texto curto genérico com perguntas soltas.

Cada aula precisa ensinar estratégia de leitura, vocabulário antes do texto, leitura por ideia geral, leitura por detalhes, evidência textual, vocabulário por contexto, resumo guiado e produção conectada.

## Aulas criadas

Arquivo:

`fluency-clean/src/content/curriculum/levels/A1/deepReadingFoundations.js`

Aulas:

1. `A1-READING-001` — Short introductions
2. `A1-READING-002` — A simple profile
3. `A1-READING-003` — A family description

## O que cada aula contém

Cada aula foi criada em `static-lesson-schema-v2-deep` usando `createReadingLesson`.

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
- `readingPurpose`
- `preReadingVocabulary`
- `readingStrategy`
- `mainText`
- `firstReadTask`
- `secondReadTasks`
- `evidenceQuestions`
- `contextVocabularyTasks`
- `guidedSummary`
- `connectedProduction`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

## Conexão com currículo

Arquivo alterado:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

Mudança:

- Importa `A1_DEEP_READING_FOUNDATIONS`.
- Importa `A1_DEEP_READING_BY_PILLAR`.
- Prioriza Reading profundo antes das versões antigas do mesmo ID.
- Mantém compatibilidade com `foundationsSafe.js` e `fullContent.js`.

## Critério de qualidade aplicado

Reading precisa ensinar o aluno a ler.

As aulas foram estruturadas para conter:

- estratégia antes da leitura;
- vocabulário pré-leitura;
- texto A1 adequado;
- leitura para ideia geral;
- leitura para detalhes;
- perguntas com evidência textual;
- vocabulário pelo contexto;
- resumo guiado;
- produção conectada ao texto.

## Pontos que precisam ser validados no próximo bloco

O BLOCO 5A cria e conecta o pacote.

O próximo bloco precisa validar:

- se as aulas passam no validator estrutural;
- se passam no filtro de conteúdo pedagógico;
- se `DeepReadingLesson` renderiza todos os campos importantes;
- se os textos têm tamanho A1 aceitável;
- se as perguntas têm evidência textual real;
- se não há frases genéricas;
- se o botão de Reading fixo abre o novo sistema pela `LessonScreen`.

## Próximo bloco obrigatório

## BLOCO 5B — Validar Reading A1 Foundations

Critérios:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- renderização mobile aceitável;
- sem conteúdo genérico;
- perguntas com evidência textual;
- produção conectada ao texto;
- atalhos de Reading abrindo o sistema fixo novo.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-04B-VOCABULARY-FOUNDATIONS-VALIDADO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-05A-READING-FOUNDATIONS-CONCLUIDO.md.
Reading A1 Foundations profundo foi criado e conectado. Próximo bloco obrigatório: BLOCO 5B — validar Reading A1 Foundations contra estrutura, conteúdo pedagógico, evidência textual e UX mobile.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não avançar para Listening antes de validar Reading.
```
