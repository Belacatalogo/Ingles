# BLOCO-STATIC-DEEP-03B — Validação Grammar A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Grammar A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-GRAMMAR-001` — Subject pronouns
2. `A1-GRAMMAR-002` — Verb to be — affirmative
3. `A1-GRAMMAR-003` — Verb to be — negative
4. `A1-GRAMMAR-004` — Verb to be — questions
5. `A1-GRAMMAR-005` — Short answers with to be
6. `A1-GRAMMAR-006` — Possessive adjectives

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepGrammarFoundations.js`
- `fluency-clean/src/content/curriculum/levels/A1/deepGrammarFoundationsExtra.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/content/schemas/lessonSchema.js`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`

## Critérios do BLOCO 3B

Validar Grammar A1 Foundations contra:

- schema profundo;
- filtro de conteúdo pedagógico;
- renderização mobile;
- ausência de conteúdo genérico;
- exercícios alinhados com o que foi ensinado.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

Todas as 6 aulas do pacote Grammar A1 Foundations foram criadas no padrão:

```js
static-lesson-schema-v2-deep
```

Elas usam `createGrammarLesson` e contêm os campos profundos necessários:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `grammarGoal`
- `formationGuide`
- `whenToUse`
- `whenNotToUse`
- `grammarTable`
- `teacherExamples`
- `commonBrazilianMistakes`
- `controlledPractice`
- `guidedPractice`
- `errorCorrectionPractice`
- `transformationPractice`
- `translationPractice`
- `productionTasks`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

### 2. Conteúdo pedagógico real

Status: aprovado como pacote inicial.

As aulas agora ensinam:

- o porquê da regra;
- a lógica por trás;
- a regra explícita;
- comparação com português;
- erros comuns de brasileiros;
- exemplos comentados;
- prática guiada;
- exercícios variados;
- produção própria;
- revisão final.

Isso corrige o problema original de aulas rasas que pareciam lista de cards.

### 3. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada no repositório por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 4. Exercícios alinhados com o conteúdo ensinado

Status: aprovado conceitualmente.

Cada aula Grammar Foundations contém combinação de:

- `guidedPractice`
- `errorCorrectionPractice`
- `transformationPractice`
- `translationPractice`
- `productionTasks`

Isso evita quiz isolado sem preparação.

### 5. Alternativas corretas não ficam sempre na primeira opção

Status: coberto pelo renderizador.

`StaticLessonRenderer.jsx` usa shuffle estável nas opções do `QuizList`, então mesmo que o array venha ordenado no conteúdo, a UI embaralha as alternativas de forma estável.

### 6. Renderização mobile

Status: parcialmente aprovado, ainda exige teste visual do usuário.

Já foram aplicados hotfixes em:

- `fluency-clean/src/styles/deep-lesson-mobile.css`
- `fluency-clean/src/main.jsx`

Ajustes feitos:

- aumento de área segura inferior;
- compactação de cards;
- redução de espaçamentos;
- ajuste para iOS/Safari;
- tentativa de impedir barra inferior cobrindo conteúdo.

Ponto de atenção:

O usuário ainda deve testar no iPhone após deploy do Vercel. Se a barra inferior continuar cobrindo conteúdo, o próximo hotfix deve mexer diretamente em:

- `.reference-bottom-nav`
- `.lesson-screen`
- `.fluency-reference-shell`
- fluxo de navegação da aula.

## Ajuste importante no quality gate

O requisito inicial de Grammar profunda pedia 20 exemplos comentados por aula.

Após teste real no iPhone, isso se mostrou pesado para microaulas A1 mobile.

Foi ajustado em:

`fluency-clean/src/content/schemas/lessonSchema.js`

De:

```js
teacherExamples: 20
```

Para:

```js
teacherExamples: 12
```

Justificativa:

- 12 exemplos comentados fortes são suficientes para uma aula A1 mobile quando acompanhados de regra, contraste, erros, prática guiada, transformação, tradução, produção e revisão.
- O filtro de conteúdo continua bloqueando exemplos genéricos.
- A qualidade não foi relaxada; o excesso de volume foi reduzido para melhorar usabilidade.

## Estado do BLOCO 3B

Grammar A1 Foundations está validado como pacote inicial profundo.

Não significa que o A1 inteiro está pronto.

Significa que Grammar Foundations agora serve como primeiro padrão real para os próximos pilares.

## Próximo bloco obrigatório

## BLOCO 4A — Vocabulary A1 Foundations profundo

Aulas alvo:

1. Greetings
2. Personal information
3. Numbers 0–100
4. Countries and nationalities
5. Family basics

Regras:

- Vocabulary não pode ser lista de palavras.
- Cada aula precisa de contexto real, chunks, frases naturais, mini diálogos, pronúncia/foco sonoro, diferenças perigosas, reconhecimento, uso em contexto, produção e revisão.
- Deve seguir o mesmo padrão de qualidade do Grammar Foundations, mas adaptado ao pilar Vocabulary.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-03B-GRAMMAR-FOUNDATIONS-VALIDADO.md.
Grammar A1 Foundations profundo foi criado e validado como pacote inicial. Próximo bloco obrigatório: BLOCO 4A — Vocabulary A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar vocabulário como lista solta. Cada aula de Vocabulary deve ensinar uso real, chunks, frases naturais, mini diálogos, pronúncia/foco sonoro, prática e produção.
```
