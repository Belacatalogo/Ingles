# BLOCO-STATIC-DEEP-09A — Auditoria integrada Foundations A1

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como auditoria integrada inicial das Foundations A1 profundas.

## Objetivo

Antes de avançar para A1.2, auditar a integração entre currículo, telas, atalhos, renderizadores, flashcards, progresso e documentação.

## Escopo auditado

Pacotes profundos já criados e conectados:

- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing

Arquivos principais auditados:

- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/services/lessonFlashcards.js`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- docs dos blocos 3B até 8B

## Resultado da auditoria

### 1. Integração do currículo

Status: aprovado.

`staticLessonContent.js` importa e conecta os pacotes profundos:

- `A1_DEEP_GRAMMAR_FOUNDATIONS`
- `A1_DEEP_GRAMMAR_EXTRA`
- `A1_DEEP_VOCABULARY_FOUNDATIONS`
- `A1_DEEP_READING_FOUNDATIONS`
- `A1_DEEP_LISTENING_FOUNDATIONS`
- `A1_DEEP_SPEAKING_FOUNDATIONS`
- `A1_DEEP_WRITING_FOUNDATIONS`

O merge por pilar prioriza os pacotes profundos antes de `foundationsSafe.js` e `fullContent.js`.

### 2. Atalhos de pilar na LessonScreen

Status: corrigido neste bloco.

Problema encontrado:

- `LessonScreen.jsx` já tinha atalhos para Reading, Listening e Speaking, mas não tinha Writing.

Correção aplicada:

- Adicionado `PenLine` de `lucide-react`.
- Adicionado botão `Abrir Writing fixo`.
- O botão usa o mesmo fluxo dos demais pilares: `openStaticCourseLesson(...)`.

Arquivo alterado:

`fluency-clean/src/screens/LessonScreen.jsx`

### 3. Flashcards da aula

Status: corrigido neste bloco.

Problema encontrado:

- `lessonFlashcards.js` ainda tinha fallback criando card com título da aula quando não encontrava vocabulário.
- Isso podia gerar cards ruins para Reading, Listening, Speaking e Writing.

Correção aplicada:

- Removido fallback automático por título da aula.
- Flashcards agora são gerados apenas a partir de campos realmente vocabulares ou frasais:
  - `vocabulary`
  - `essentialWords`
  - `preReadingVocabulary`
  - `keyWordsToHear`
  - `chunks`
  - `modelPhrases`
  - `usefulSentences`
  - `collocations`
  - `miniDialogues`
  - campos de Grammar controlados
- Mantida proteção contra frente em português, textos longos e frases instrucionais.

Arquivo alterado:

`fluency-clean/src/services/lessonFlashcards.js`

### 4. Renderização profunda

Status: aprovado conceitualmente, exige teste visual no iPhone.

O `StaticLessonRenderer.jsx` já possui renderizadores profundos por pilar:

- `DeepGrammarLesson`
- `DeepVocabularyLesson`
- `DeepReadingLesson`
- `DeepListeningLesson`
- `DeepSpeakingLesson`
- `DeepWritingLesson`

Ponto de atenção:

- Mobile precisa de teste visual real no iPhone para confirmar se a barra inferior não cobre checklist, produção, transcript, resumo ou tarefas finais.

### 5. Progresso e abertura de aula

Status: aprovado conceitualmente.

O fluxo continua usando:

- `openStaticCourseLesson(...)`
- `saveStaticLessonAsCurrent(...)`
- `markStaticLessonOpened(...)`
- `getCurrentLessonFull()`
- evento `fluency:lesson-updated`

Isso mantém o padrão usado nos blocos anteriores.

### 6. Conteúdo genérico

Status: aprovado nos blocos anteriores.

Buscas feitas ao longo dos blocos não encontraram frases genéricas/suspeitas como:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`

## Correções aplicadas neste bloco

### Commit 1

`hotfix: adiciona atalho de writing fixo`

Arquivo:

`fluency-clean/src/screens/LessonScreen.jsx`

### Commit 2

`hotfix: evita flashcards ruins em aulas não vocabulares`

Arquivo:

`fluency-clean/src/services/lessonFlashcards.js`

## Estado final das Foundations A1

As Foundations A1 estão integradas como pacote inicial profundo:

- Grammar: criado, conectado e validado
- Vocabulary: criado, conectado e validado
- Reading: criado, conectado e validado
- Listening: criado, conectado e validado
- Speaking: criado, conectado e validado
- Writing: criado, conectado e validado

Além disso:

- Atalhos de Reading/Listening/Speaking/Writing estão no novo fluxo.
- Flashcards não usam mais fallback ruim por título da aula.
- Currículo prioriza pacotes profundos.

## Próximo bloco

## BLOCO 10A — A1.2 Personal life profundo

Objetivo recomendado:

Criar a primeira unidade temática depois de Foundations, mantendo todos os pilares.

Tema sugerido:

`A1.2 Personal life`

Pilares sugeridos:

- Grammar: possessives review + simple be statements
- Vocabulary: daily personal info + basic adjectives
- Reading: personal profile with routine hints
- Listening: short personal info exchange
- Speaking: talk about yourself and someone else
- Writing: short profile paragraph

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-09A-AUDITORIA-INTEGRADA-FOUNDATIONS-CONCLUIDO.md.
A auditoria integrada das Foundations A1 foi concluída. Todos os pilares Foundations A1 profundos estão criados, conectados e validados como pacote inicial. Próximo bloco: BLOCO 10A — A1.2 Personal life profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Manter qualidade premium: nada genérico, nada de texto solto, nada de fala/escrita sem preparação. Criar A1.2 em blocos controlados e validar depois.
```
