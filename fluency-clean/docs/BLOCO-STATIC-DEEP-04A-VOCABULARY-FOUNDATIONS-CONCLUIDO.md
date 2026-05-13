# BLOCO-STATIC-DEEP-04A — Vocabulary A1 Foundations profundo

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como criação inicial do pacote Vocabulary A1 Foundations profundo.

## Objetivo

Criar aulas de Vocabulary que não sejam lista solta de palavras.

Cada aula precisa ensinar uso real, chunks, contexto, frases naturais, mini diálogos, pronúncia/foco sonoro, prática e produção.

## Aulas criadas

Arquivo:

`fluency-clean/src/content/curriculum/levels/A1/deepVocabularyFoundations.js`

Aulas:

1. `A1-VOCABULARY-001` — Greetings
2. `A1-VOCABULARY-002` — Personal information
3. `A1-VOCABULARY-003` — Numbers 0–100
4. `A1-VOCABULARY-004` — Countries and nationalities
5. `A1-VOCABULARY-005` — Family basics

## O que cada aula contém

Cada aula foi criada em `static-lesson-schema-v2-deep` usando `createVocabularyLesson`.

Cada aula contém:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `topicContext`
- `essentialWords`
- `chunks`
- `pronunciationFocus`
- `dangerousConfusions`
- `collocations`
- `miniDialogues`
- `examples`
- `recognitionPractice`
- `usagePractice`
- `productionTasks`
- `spacedReview`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

## Conexão com currículo

Arquivo alterado:

`fluency-clean/src/content/curriculum/staticLessonContent.js`

Mudança:

- Importa `A1_DEEP_VOCABULARY_FOUNDATIONS`.
- Importa `A1_DEEP_VOCABULARY_BY_PILLAR`.
- Prioriza as aulas profundas de Vocabulary antes das versões antigas.
- Mantém compatibilidade com `foundationsSafe.js` e `fullContent.js`.

## Critério de qualidade aplicado

Vocabulary não pode ser apenas lista de palavras.

As aulas foram estruturadas para ensinar:

- significado;
- uso;
- frase natural;
- contexto;
- chunk;
- diferença perigosa para brasileiros;
- mini diálogo;
- reconhecimento;
- uso em contexto;
- produção própria.

## Pontos que precisam ser validados no próximo bloco

O BLOCO 4A cria e conecta o pacote.

O próximo bloco precisa validar:

- se as aulas passam no validator estrutural;
- se passam no filtro de conteúdo pedagógico;
- se o renderizador de Vocabulary mostra os campos profundos corretamente;
- se a quantidade de palavras/chunks não fica pesada no mobile;
- se não existem frases genéricas;
- se exercícios não têm resposta correta sempre na primeira opção;
- se cada aula realmente prepara antes de cobrar produção.

## Próximo bloco obrigatório

## BLOCO 4B — Validar Vocabulary A1 Foundations

Critérios:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- renderização mobile aceitável;
- sem conteúdo genérico;
- sem lista solta de palavras;
- exercícios alinhados com a aula.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-03B-GRAMMAR-FOUNDATIONS-VALIDADO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-04A-VOCABULARY-FOUNDATIONS-CONCLUIDO.md.
Vocabulary A1 Foundations profundo foi criado e conectado. Próximo bloco obrigatório: BLOCO 4B — validar Vocabulary A1 Foundations contra estrutura, conteúdo pedagógico e UX mobile.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não avançar para Reading antes de validar Vocabulary.
```
