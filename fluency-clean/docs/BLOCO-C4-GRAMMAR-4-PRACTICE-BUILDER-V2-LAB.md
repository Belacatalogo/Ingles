# BLOCO-C4 — Grammar 4 · Practice Builder V2

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Reescrever `fluency-clean/src/practice/core/builders/grammarBuilder.js` para gerar a Prática Profunda de Grammar com fases pedagógicas reais, policy por nível, erros típicos de brasileiros, SRS e mastery tags.

## Arquivo alterado

- `fluency-clean/src/practice/core/builders/grammarBuilder.js`

## Implementação

O builder agora usa:

- `grammarLevelPolicy.js`
- `grammarBrazilianErrors.js`
- `practiceSrsExtended.js`
- `PracticeTypes.js`
- `builderUtils.js`

## Fases implementadas

1. `warmup`
   - vocabulário da aula;
   - tipo: `multiple_choice`.

2. `recognition`
   - reconhecimento de frase correta;
   - verdadeiro/falso com forma errada comum;
   - tipos: `multiple_choice`, `true_false`.

3. `guided_production`
   - completar lacuna;
   - organizar frase;
   - corrigir erro típico brasileiro;
   - tipos: `fill_blank`, `word_bank`, `correction`.

4. `writing`
   - produção curta própria;
   - tipo: `write_short`.

5. `review`
   - correção de erros típicos;
   - revisão SRS de padrões gramaticais vencidos;
   - tipo: `correction`.

## Regras de nível

Foram aplicados limites por nível:

- A1: máximo 10 questões.
- A2: máximo 12 questões.
- B1: máximo 14 questões.
- B2: máximo 16 questões.
- C1: máximo 18 questões.

## Tags

Todas as questões criadas pelo builder recebem `grammarTag` quando possível.

A tag vem de:

- `context.grammarFocusTag`; ou
- `context.raw.focusArea`; ou
- `context.raw.focus`; ou
- fallback da policy do nível.

## Erros típicos BR

O builder usa `GRAMMAR_BRAZILIAN_ERRORS` para gerar questões de correção.

Também usa `context.raw.typicalErrors` quando a aula tiver erros típicos próprios gerados pela IA.

## SRS

O builder usa:

```js
pullSrsReviewItems({ skill: 'grammar', level: context.level, limit: 3 })
```

Quando encontra itens `GRAMMAR_PATTERN` vencidos e compatíveis com erros conhecidos, cria questão de `correction` na fase `review`.

## Pureza

O builder não gera:

- `audio_choice`
- `dictation`
- `speak_response`

A pureza final continua garantida pelo `PracticePurityMatrix`.

## Observação técnica

O plano C4 citava `getBrazilianErrorPatterns` em `grammarLevelPolicy.js`, mas no C3 o dicionário oficial foi criado em `grammarBrazilianErrors.js`.

Por isso, o C4 implementou a equivalência real usando `GRAMMAR_BRAZILIAN_ERRORS`, preservando o objetivo pedagógico.

## Compatibilidade preservada

- Não foi alterado `GrammarLesson.jsx`.
- Não foi alterado `grammarJsonContract.js`.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `grammarBuilder.js` reescrito com 5 fases.
- [x] Questões recebem `grammarTag`.
- [x] `correction` é gerado com erros típicos brasileiros.
- [x] A1 limitado a 10 questões.
- [x] C1 limitado a 18 questões.
- [x] SRS review entra em `review` quando houver item compatível.
- [x] Não gera áudio, ditado ou fala em Grammar.

## Próximo bloco recomendado

`BLOCO-D1-LISTENING-1-LEVEL-POLICY-LAB`.
