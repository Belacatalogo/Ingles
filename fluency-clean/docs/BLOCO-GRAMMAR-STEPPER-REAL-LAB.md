# BLOCO-GRAMMAR-STEPPER-REAL-LAB

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Portar o padrão de stepper real aprovado na Reading para a aba Grammar, mas adaptado à natureza da aula de gramática.

A Grammar não foi transformada em jogo. A estrutura ficou séria, guiada e focada em entender regra, observar padrão, praticar e produzir.

## Arquivos alterados

- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/styles/lesson-type-stepper-real.css`
- `fluency-clean/src/main.jsx`
- `fluency-clean/docs/BLOCO-GRAMMAR-STEPPER-REAL-LAB.md`

## Etapas adicionadas

A Grammar agora possui stepper real com 7 etapas:

1. Começar
2. Regra
3. Exemplos
4. Prática
5. Correção
6. Produção
7. Concluir

## O que foi feito

### 1. Stepper próprio da Grammar

- Criado `grammarFlowSteps`.
- Criado estado `activeStep`.
- Criado componente `GrammarStepper`.
- Cada etapa tem ID real e scroll suave.
- O progresso do card principal usa o progresso do stepper.

### 2. Estrutura adaptada para gramática

A aula agora organiza o conteúdo em:

- introdução e objetivo;
- regra e explicação do professor;
- exemplos com padrão;
- prática guiada;
- correção e transformação;
- produção própria;
- conclusão.

### 3. Render seguro preservado

Foi mantido o sistema existente:

- `normalizeSections`;
- `collectProfessorExamples`;
- `SectionContent`;
- `ExampleCard`;
- render seguro de exemplos do professor;
- proteção contra conteúdo quebrado.

### 4. Prática guiada

- A Grammar agora tenta usar `lesson.exercises` para mostrar exercícios internos.
- Quando não houver exercícios, mostra uma orientação simples para criar frases mentalmente.
- As respostas/modelos ficam em uma etapa posterior de correção.

### 5. Correção e transformação

Adicionada seção própria para:

- comparar com modelo;
- transformar frases;
- treinar afirmativa, negativa e pergunta.

## O que não foi feito

- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.
- Não foi alterado o pipeline profundo de Grammar.
- Não foi mexido no `deepGrammarPipeline.js`.

## Checklist de teste no iPhone

Validar em uma aula Grammar real ou preview:

- o stepper aparece com 7 etapas;
- o stepper rola horizontalmente no iPhone;
- clicar nas etapas leva aos blocos corretos;
- a aula continua séria, não gamificada;
- a explicação do professor continua aparecendo;
- exemplos continuam separados em cards;
- prática guiada aparece;
- correção/transformação aparece;
- produção própria continua com teclado funcionando;
- salvar rascunho funciona;
- concluir Grammar funciona;
- não apareceu card técnico de contrato/política.
