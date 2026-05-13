# BLOCO-STATIC-DEEP-08A — Writing A1 Foundations profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como criação inicial do pacote Writing A1 Foundations profundo.

## Objetivo

Criar aulas de Writing que não sejam apenas um pedido solto como “escreva sobre você”.

Cada aula precisa conduzir o aluno em etapas:

1. modelo de texto;
2. análise do modelo;
3. blocos reutilizáveis;
4. gramática para escrita;
5. substituição guiada;
6. erros comuns;
7. rascunho;
8. checklist;
9. versão final.

## Aulas criadas

Arquivo:

`fluency-clean/src/content/curriculum/levels/A1/deepWritingFoundations.js`

Aulas:

1. `A1-WRITING-001` — Write a short introduction
2. `A1-WRITING-002` — Write a simple profile
3. `A1-WRITING-003` — Write about your family
4. `A1-WRITING-004` — Write country, city and contact info

## O que cada aula contém

Cada aula foi criada em `static-lesson-schema-v2-deep` usando `createWritingLesson`.

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
- `modelText`
- `modelTextBreakdown`
- `writingBlocks`
- `grammarForWriting`
- `usefulSentences`
- `guidedSubstitution`
- `commonWritingMistakes`
- `checklist`
- `revisionChecklist`
- `draftTask`
- `revisionTask`
- `finalVersionTask`
- `feedbackPreparation`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

## Conexão com currículo

Arquivo alterado:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

Mudança:

- Importa `A1_DEEP_WRITING_FOUNDATIONS`.
- Importa `A1_DEEP_WRITING_BY_PILLAR`.
- Prioriza Writing profundo antes das versões antigas do mesmo ID.
- Mantém compatibilidade com `foundationsSafe.js` e `fullContent.js`.

## Critério de qualidade aplicado

Writing precisa ensinar processo de escrita, não só pedir produção.

As aulas foram estruturadas para conter:

- texto modelo;
- análise do modelo por blocos;
- frases reutilizáveis;
- gramática específica para escrita;
- substituição guiada;
- erros comuns de brasileiros;
- rascunho;
- revisão;
- versão final.

## Pontos que precisam ser validados no próximo bloco

O BLOCO 8A cria e conecta o pacote.

O próximo bloco precisa validar:

- se as aulas passam no validator estrutural;
- se passam no filtro de conteúdo pedagógico;
- se `DeepWritingLesson` renderiza todos os campos importantes;
- se não há pedido solto de texto sem modelo;
- se modelo/análise/rascunho/checklist/versão final aparecem em ordem clara;
- se não há frases genéricas;
- se o pilar Writing aparece corretamente no curso fixo.

## Próximo bloco obrigatório

## BLOCO 8B — Validar Writing A1 Foundations

Critérios:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- renderização mobile aceitável;
- sem conteúdo genérico;
- não pedir texto livre sem preparação;
- modelo antes do rascunho;
- checklist antes da versão final;
- Writing conectado ao currículo fixo novo.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-07B-SPEAKING-FOUNDATIONS-VALIDADO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-08A-WRITING-FOUNDATIONS-CONCLUIDO.md.
Writing A1 Foundations profundo foi criado e conectado. Próximo bloco obrigatório: BLOCO 8B — validar Writing A1 Foundations contra estrutura, conteúdo pedagógico, UX mobile e se não pede texto livre sem preparação.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não avançar para A1.2 antes de validar Writing.
```
