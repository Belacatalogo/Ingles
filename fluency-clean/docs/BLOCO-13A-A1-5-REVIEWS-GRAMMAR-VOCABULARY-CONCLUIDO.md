# BLOCO 13A — A1.5 Reviews and Checkpoints — Grammar/Vocabulary Review

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Iniciar o pacote `A1.5 Reviews and checkpoints` com revisões profundas antes dos checkpoints oficiais.

Este bloco não cria conteúdo novo de aprendizagem; cria revisões guiadas para consolidar A1 antes das avaliações.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepA1ReviewsGrammarVocabulary.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Revisões criadas

### Grammar

- `A1-GRAMMAR-025` — `Review Grammar A1 part 1`

Foco:

- subject pronouns;
- verb to be;
- short answers;
- possessives;
- a/an;
- plural;
- this/that/these/those;
- there is/there are inicial;
- have/has;
- simple adjectives.

Erros combatidos:

- `she are`;
- `he name is`;
- `a apple`;
- `this books`;
- `there is two chairs`.

### Grammar

- `A1-GRAMMAR-026` — `Review Grammar A1 part 2`

Foco:

- present simple;
- do/does;
- adverbs of frequency;
- prepositions of time/place;
- can/can’t;
- imperatives;
- object pronouns;
- and/but/because.

Erros combatidos:

- `He study English`;
- `Does she works?`;
- `I can to help`;
- `Help I`;
- `I am happy because.`

### Vocabulary

- `A1-VOCABULARY-020` — `Review Vocabulary A1`

Foco:

- identidade;
- família;
- jobs;
- objects;
- adjectives;
- days/time;
- routine;
- food;
- places;
- house;
- clothes;
- weather;
- feelings;
- common verbs.

A revisão organiza vocabulário por:

- tema;
- palavras essenciais;
- chunks;
- collocations;
- produção curta.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY
A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY_BY_PILLAR
```

E inclui o pacote em:

- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`;
- `mergePillarLessons()`.

## Resultado esperado

Antes dos checkpoints oficiais de Grammar e Vocabulary, o aluno terá revisões profundas guiadas.

Essas revisões devem aparecer quando o aluno chegar ao pacote `A1.5 Reviews and checkpoints`, respeitando:

- cronograma semanal;
- 1 aula por dia;
- ordem guiada;
- bloqueios de progressão.

## Commits

- `d56eeec29890f591d263202b397cd480add649cf` — cria revisões A1 Grammar/Vocabulary.
- `80033a71a9f8a3350324819ddd4bfdb52b7fc70a` — conecta revisões A1 Grammar/Vocabulary.

## Próximo bloco correto

`BLOCO 13B — A1.5 Reviews and checkpoints — Reading/Listening Review`

Objetivo recomendado:

- criar revisão profunda de Reading A1;
- criar revisão profunda de Listening A1;
- preparar checkpoints de leitura e escuta;
- manter revisão guiada, sem conteúdo técnico na tela do aluno.
