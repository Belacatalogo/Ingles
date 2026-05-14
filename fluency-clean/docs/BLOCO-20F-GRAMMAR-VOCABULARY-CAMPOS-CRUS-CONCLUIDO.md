# BLOCO 20F — Grammar/Vocabulary e erro de campos crus

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir problemas de renderização em Grammar/Vocabulary e impedir que campos técnicos apareçam para o aluno.

Problemas tratados:

- exibição indevida de `subject`;
- risco de `[object Object]`;
- risco de chaves técnicas como `expected`, `answer`, `correctAnswer`, `schemaVersion` aparecerem na interface;
- Grammar ainda muito passivo em alguns blocos;
- Vocabulary com risco de virar lista sem uso em contexto.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Lista de campos técnicos

Criadas listas internas:

- `TECHNICAL_KEYS`;
- `TECHNICAL_WORDS`.

Essas listas bloqueiam a renderização direta de termos como:

- `subject`;
- `expected`;
- `answer`;
- `expectedAnswer`;
- `correctAnswer`;
- `schemaVersion`;
- `[object Object]`.

### 2. `textOf` mais seguro

A função `textOf` foi fortalecida.

Agora ela prioriza campos humanos:

1. `instruction`;
2. `question`;
3. `prompt`;
4. `text`;
5. `content`;
6. `chunk`;
7. `word`;
8. `phrase`;
9. `example`;
10. `pattern`;
11. `title`;
12. `label`.

Ela também possui fallback seguro que ignora chaves técnicas.

### 3. `noteOf` mais seguro

`noteOf` agora evita exibir conteúdo técnico e prioriza:

- `note`;
- `why`;
- `explanation`;
- `reason`;
- `tip`;
- `translation`;
- `meaning`;
- `expectedUse`.

### 4. `expectedOf` isolado

Modelos/gabaritos continuam separados em `expectedOf`, que não é usado como texto principal da tarefa.

Isso mantém a regra:

> resposta/modelo só aparece após tentativa.

### 5. Novo helper `mergeLists`

Criado para normalizar arrays e itens únicos, filtrando:

- texto vazio;
- conteúdo técnico;
- objetos sem texto útil.

Isso reduz o risco de renderizações quebradas em qualquer pilar.

### 6. Grammar reforçado

`DeepGrammarLesson` agora usa `QuizList` também em:

- prática controlada;
- prática guiada;
- correção de erro;
- transformação;
- tradução controlada.

Resultado:

- menos cards passivos;
- mais tentativa antes do feedback;
- gabarito/modelo escondido até resposta.

### 7. Vocabulary reforçado

`DeepVocabularyLesson` agora organiza melhor:

- palavras essenciais;
- chunks úteis;
- exemplos em frases;
- mini diálogos;
- confusões perigosas;
- combinações naturais;
- reconhecimento;
- uso em contexto;
- produção com vocabulário.

A produção com vocabulário usa `AttemptList`.

### 8. Vocabulary legado reforçado

`StaticVocabularyLesson` também foi ajustado para:

- reconhecimento;
- uso em contexto;
- produção com vocabulário.

## Resultado prático

Aulas de Grammar e Vocabulary ficam mais seguras e menos passivas.

Campos técnicos como `subject` não devem mais aparecer como texto de aula.

## Escopo intencional

Este bloco focou:

- limpeza de campos crus;
- Grammar;
- Vocabulary.

Ainda ficam para os próximos blocos:

- limpeza da interface da aula;
- renderização ponderada final por pilar;
- auditoria iPhone;
- QA final com aulas reais.

## Status

Concluído.

## Próximo bloco

`BLOCO 20G — Limpeza da interface da aula`

Foco:

- remover/esconder atalhos do curso fixo;
- remover textos técnicos para aluno;
- revisar duplicidades e cards que confundem a ordem da aula.

## Commit

- `3583e73c38b3739da1da6e9b060a49226e24405f` — limpa campos crus e reforça Grammar/Vocabulary.
