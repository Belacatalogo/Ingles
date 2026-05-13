# BLOCO-STATIC-DEEP-04B — Validação Vocabulary A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Vocabulary A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-VOCABULARY-001` — Greetings
2. `A1-VOCABULARY-002` — Personal information
3. `A1-VOCABULARY-003` — Numbers 0–100
4. `A1-VOCABULARY-004` — Countries and nationalities
5. `A1-VOCABULARY-005` — Family basics

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepVocabularyFoundations.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/content/schemas/lessonSchema.js`
- `fluency-clean/src/content/schemas/lessonFactories.js`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Critérios do BLOCO 4B

Validar Vocabulary A1 Foundations contra:

- estrutura profunda;
- conteúdo pedagógico;
- ausência de lista solta de palavras;
- renderização mobile;
- ausência de conteúdo genérico;
- exercícios alinhados com a aula;
- produção própria.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

As 5 aulas de Vocabulary foram criadas com `createVocabularyLesson`, portanto usam o schema padrão:

```js
static-lesson-schema-v2-deep
```

As aulas contêm os campos globais profundos:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

E os campos específicos de Vocabulary:

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

### 2. Não é lista solta de palavras

Status: aprovado como pacote inicial.

As aulas não foram construídas apenas com palavras e tradução.

Cada aula contém:

- contexto real;
- chunks;
- exemplos em frase;
- mini diálogos;
- diferenças perigosas para brasileiros;
- prática de reconhecimento;
- prática de uso;
- produção própria;
- revisão.

Isso atende à regra do projeto: Vocabulary precisa ensinar uso real, não só memorizar lista.

### 3. Conteúdo pedagógico real

Status: aprovado como pacote inicial.

As aulas explicam:

- por que o vocabulário importa;
- em quais situações aparece;
- como a palavra entra em chunks;
- diferenças com o português;
- confusões perigosas;
- exemplos naturais;
- produção própria.

### 4. Exercícios alinhados com o que foi ensinado

Status: aprovado conceitualmente.

Cada aula contém:

- `recognitionPractice`
- `usagePractice`
- `productionTasks`

Ou seja, o aluno vê o vocabulário em contexto antes de ser cobrado.

### 5. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada no repositório por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `lista solta`
- `Escolha a alternativa correta`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 6. Alternativas corretas não ficam sempre na primeira opção

Status: coberto pelo renderizador.

`StaticLessonRenderer.jsx` usa shuffle estável no `QuizList`, portanto a ordem original das opções no conteúdo não força a resposta correta a aparecer sempre em primeiro lugar na UI.

### 7. Renderização mobile

Status: precisa de teste visual do usuário.

O renderizador profundo de Vocabulary já existe em:

`StaticLessonRenderer.jsx`

Ele exibe:

- palavras essenciais;
- chunks úteis;
- exemplos em frases;
- mini diálogos;
- reconhecimento;
- uso em contexto;
- produção;
- revisão.

Ponto de atenção:

Vocabulary tem muitos itens por aula. No iPhone, pode ficar pesado se todos os cards aparecerem longos demais. Se o usuário testar e sentir que ficou cansativo, o próximo hotfix deve compactar especificamente:

- `DeepVocabularyLesson`
- `.static-vocab-card`
- `.static-example-card`
- blocos de `essentialWords`
- blocos de `chunks`
- `miniDialogues`

## Estado do BLOCO 4B

Vocabulary A1 Foundations está validado como pacote inicial profundo.

Não significa que todo o A1 está pronto.

Significa que Vocabulary Foundations já segue o padrão premium definido pelo projeto e pode servir de base para Reading, Listening, Speaking e Writing.

## Próximo bloco obrigatório

## BLOCO 5A — Reading A1 Foundations profundo

Aulas alvo iniciais:

1. `A1-READING-001` — Short introductions
2. `A1-READING-002` — A simple profile
3. `A1-READING-003` — A family description

Regras:

- Reading não pode ser texto curto genérico com perguntas soltas.
- Cada aula precisa ensinar estratégia de leitura.
- Toda pergunta de detalhe precisa ter evidência textual.
- O texto precisa ser adequado ao A1, mas natural o suficiente para ensinar.
- Cada aula deve ter pré-leitura, vocabulário antes do texto, leitura por ideia geral, leitura por detalhes, evidência, vocabulário pelo contexto, resumo guiado e produção conectada.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-03B-GRAMMAR-FOUNDATIONS-VALIDADO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-04A-VOCABULARY-FOUNDATIONS-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-04B-VOCABULARY-FOUNDATIONS-VALIDADO.md.
Grammar e Vocabulary A1 Foundations profundos foram criados e validados como pacotes iniciais. Próximo bloco obrigatório: BLOCO 5A — Reading A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar Reading como texto curto genérico. Cada aula de Reading deve ensinar estratégia, vocabulário antes do texto, texto adequado ao nível, evidência textual, resumo guiado e produção conectada.
```
