# BLOCO-STATIC-DEEP-02 — Renderizadores de aula profunda

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído tecnicamente.

## Objetivo

Alterar o renderizador das aulas fixas para suportar o novo schema pedagógico profundo `static-lesson-schema-v2-deep`.

Este bloco não reescreve ainda o conteúdo das aulas. Ele cria a experiência visual/didática necessária para que as aulas reescritas no padrão profundo apareçam como uma sequência real de ensino.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Mudanças principais

### 1. Renderizador híbrido

O renderizador agora diferencia:

- aulas antigas/legadas `static-lesson-schema-v1`;
- aulas novas profundas `static-lesson-schema-v2-deep`.

Aulas antigas continuam funcionando com o layout anterior para não quebrar o app.

Aulas v2 deep passam pelo novo fluxo pedagógico.

### 2. Fluxo pedagógico novo

Para aulas profundas, a tela passa a seguir a sequência:

1. Abertura do professor
2. Por que isso importa
3. Conceito central
4. Mapa mental
5. Passo a passo
6. Comparação com português
7. Prática guiada antes do quiz
8. Exemplos comentados
9. Erros comuns de brasileiros
10. Exercícios internos
11. Produção própria
12. Revisão final
13. Tutor/Completion gate

### 3. Renderizadores profundos por pilar

Foram criados fluxos específicos para:

- `DeepGrammarLesson`
- `DeepVocabularyLesson`
- `DeepReadingLesson`
- `DeepListeningLesson`
- `DeepSpeakingLesson`
- `DeepWritingLesson`

### 4. Compatibilidade mantida

Foram mantidos os renderizadores antigos:

- `StaticGrammarLesson`
- `StaticVocabularyLesson`
- `StaticReadingLesson`
- `StaticListeningLesson`
- `StaticSpeakingLesson`
- `StaticWritingLesson`

Isso evita quebrar as aulas atuais enquanto elas ainda não foram migradas para v2.

### 5. Alternativas continuam embaralhadas

O `QuizList` continua usando shuffle estável para evitar o problema de resposta correta sempre na primeira opção.

## Limitação intencional

Como as aulas atuais ainda são em grande parte conteúdo antigo/raso, o layout profundo só aparece totalmente quando a aula for reescrita usando os novos campos v2.

Ou seja:

- BLOCO 1 criou o schema.
- BLOCO 2 criou o renderizador.
- BLOCO 3 precisa reescrever as aulas de Grammar A1 Foundations com conteúdo profundo real.

## Próximo bloco obrigatório

## BLOCO 3 — Reescrever Grammar A1 Foundations com qualidade premium

Aulas alvo:

1. Subject pronouns
2. Verb to be — affirmative
3. Verb to be — negative
4. Verb to be — questions
5. Short answers with to be
6. Possessive adjectives

Cada aula deve ter:

- `schemaVersion: static-lesson-schema-v2-deep`
- abertura forte do professor;
- por que importa;
- conceito explicado do zero;
- mapa mental;
- passo a passo;
- contraste com português;
- exemplos comentados;
- erros brasileiros reais;
- prática guiada antes do quiz;
- exercícios variados;
- produção própria;
- revisão final.

## Próximo prompt recomendado

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-STATIC-DEEP-LESSON-QUALITY-REWRITE-LAB.md, fluency-clean/docs/BLOCO-STATIC-DEEP-01-SCHEMA-PEDAGOGICO-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-02-RENDERIZADORES-CONCLUIDO.md.
Execute o BLOCO 3: reescrever Grammar A1 Foundations com qualidade premium no schema v2-deep.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
