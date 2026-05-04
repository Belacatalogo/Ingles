# BLOCO-E4 — Writing 4 · Practice Builder V2

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Reescrever `practice/core/builders/writingBuilder.js` usando policy + rubrica multi-critério do E3.

## Arquivos alterados

- `fluency-clean/src/writing/writingRubric.js`
- `fluency-clean/src/practice/core/builders/writingBuilder.js`

## Implementação

### `writingRubric.js`

Adicionado helper de compatibilidade para o builder:

```js
getWritingRubricForLevel(level)
```

Retorna `null` para A1/A2 e retorna critérios + passingScore para B1+.

### `writingBuilder.js`

Reescrito com a sequência pedagógica:

1. `SRS review`
   - `write_short`
   - fase `warmup`
   - tag `sentence_structure`

2. `Vocabulary`
   - questões de vocabulário
   - tag `vocabulary_choice`

3. `Fill blank`
   - fase `guided_production`
   - tag `sentence_structure`

4. `Word bank`
   - fase `guided_production`
   - tag `sentence_structure`

5. `Correction`
   - fase `guided_production`
   - tag `punctuation_basics`

6. `Exercícios internos da aula`
   - fase `writing`
   - tag `task_response`

7. `Write short`
   - produção real
   - fase `writing`
   - tag `paragraph_cohesion`
   - rubrica embutida para B1+

## Rubrica nas questões

Questões `WRITE_SHORT` de B1+ carregam:

```js
writingRubric: {
  enabled: true,
  level,
  criteria,
  passingScore,
  modelAnswer,
}
```

## Pureza preservada

O builder não gera:

- `audio_choice`
- `speak_response`
- áudio
- fala

## Critérios de aceitação

- [x] Builder reescrito.
- [x] `writingSkillTag` em todas as questões.
- [x] Questões de produção carregam rubrica para B1+.
- [x] SRS review inserido quando pendente.
- [x] Sequência: revisão → vocab → fill_blank → word_bank → correction → produção.
- [x] Não usa áudio/fala.
- [x] Não inventa modelo fora das frases existentes da aula.

## Compatibilidade preservada

- Não foi alterado `WritingLesson.jsx`.
- Não foi alterado `writingJsonContract.js`.
- Não foi alterado `lessonJsonContract.js`.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Próximo bloco recomendado

`BLOCO-F1-SPEAKING-1-LEVEL-POLICY-LAB`.
