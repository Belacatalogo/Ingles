# BLOCO-STATIC-DEEP-05B — Validação Reading A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Reading A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-READING-001` — Short introductions
2. `A1-READING-002` — A simple profile
3. `A1-READING-003` — A family description

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepReadingFoundations.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`

## Critérios do BLOCO 5B

Validar Reading A1 Foundations contra:

- estrutura profunda;
- conteúdo pedagógico;
- ausência de texto genérico com perguntas soltas;
- evidência textual real;
- produção conectada;
- renderização pelo sistema fixo novo;
- ausência de conteúdo genérico.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

As 3 aulas de Reading foram criadas com `createReadingLesson`, usando o padrão:

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

E os campos específicos de Reading:

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

### 2. Reading ensina estratégia, não só texto

Status: aprovado como pacote inicial.

Cada aula contém:

- objetivo de leitura;
- estratégia antes de ler;
- vocabulário pré-leitura;
- orientação de primeira leitura;
- orientação de segunda leitura;
- prática de encontrar detalhes;
- resumo guiado;
- produção conectada.

Isso evita o problema de Reading virar apenas texto curto com perguntas soltas.

### 3. Evidência textual

Status: aprovado conceitualmente.

Cada pergunta em `evidenceQuestions` possui campo `evidence` com trecho do texto que justifica a resposta.

Exemplos do pacote:

- Pergunta: `What is her name?`
  - Resposta: `Ana`
  - Evidência: `My name is Ana.`

- Pergunta: `Where does Bruno live?`
  - Resposta: `Curitiba`
  - Evidência: `I live in Curitiba.`

- Pergunta: `Who is Pedro?`
  - Resposta: `Her brother`
  - Evidência: `I have one brother. His name is Pedro.`

### 4. Textos adequados ao A1

Status: aprovado como pacote inicial.

Os textos usam estruturas já trabalhadas em Grammar e Vocabulary Foundations:

- subject pronouns;
- verb to be;
- possessive adjectives;
- personal information;
- countries/cities;
- family basics;
- simple profile language.

Os textos são curtos, mas não vazios. Eles dão material suficiente para ideia geral, detalhes e evidência.

### 5. Produção conectada

Status: aprovado.

Cada aula possui `connectedProduction`, usando o texto como modelo para o aluno produzir:

- uma introdução curta;
- um perfil simples;
- uma descrição de família.

### 6. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 7. Atalho de Reading no novo sistema

Status: corrigido antes deste bloco.

A `LessonScreen.jsx` deixou de abrir previews legados para Reading/Listening/Speaking.

Agora os atalhos tentam abrir aulas reais do currículo fixo usando `openStaticCourseLesson(...)`.

Para Reading, como `A1-READING-001` a `003` já estão conectadas, o botão `Abrir Reading fixo` deve abrir uma aula do novo sistema.

### 8. Renderização mobile

Status: exige teste visual no iPhone.

O renderizador profundo já possui suporte a Reading, mas o usuário deve testar:

- se o texto principal fica confortável;
- se as perguntas com evidência aparecem de forma clara;
- se o resumo guiado aparece depois da leitura;
- se a barra inferior não cobre produção/resumo;
- se a aula não parece Reading antigo/legado.

## Estado do BLOCO 5B

Reading A1 Foundations está validado como pacote inicial profundo.

Isso significa que Grammar, Vocabulary e Reading Foundations já têm base profunda conectada ao currículo.

## Próximo bloco obrigatório

## BLOCO 6A — Listening A1 Foundations profundo

Aulas alvo iniciais:

1. `A1-LISTENING-001` — Greetings and names
2. `A1-LISTENING-002` — Spelling names
3. `A1-LISTENING-003` — Numbers and phone numbers
4. `A1-LISTENING-004` — Countries and cities

Regras:

- Listening não pode virar Reading disfarçado.
- Cada aula precisa ter preparação antes de ouvir.
- Deve ter palavras-chave para ouvir.
- Primeira escuta sem transcript.
- Segunda escuta com foco.
- Transcript liberado depois.
- Shadowing.
- Dictation leve.
- Compreensão.
- Produção oral curta.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-05A-READING-FOUNDATIONS-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-05B-READING-FOUNDATIONS-VALIDADO.md.
Grammar, Vocabulary e Reading A1 Foundations profundos foram criados e validados como pacotes iniciais. Próximo bloco obrigatório: BLOCO 6A — Listening A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar Listening como Reading disfarçado. Cada aula de Listening deve ter preparação, palavras-chave, primeira escuta sem transcript, segunda escuta com foco, transcript depois, shadowing, dictation leve, compreensão e produção oral curta.
```
