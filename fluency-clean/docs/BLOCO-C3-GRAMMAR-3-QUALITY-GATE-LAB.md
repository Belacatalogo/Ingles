# BLOCO-C3 — Grammar 3 · Quality Gate + Erros Típicos BR

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Objetivo

Criar o quality gate de Grammar e um dicionário oficial de erros típicos de brasileiros aprendendo inglês.

## Arquivos criados

- `fluency-clean/src/grammar/grammarBrazilianErrors.js`
- `fluency-clean/src/grammar/grammarQualityGate.js`
- `fluency-clean/docs/BLOCO-C3-GRAMMAR-3-QUALITY-GATE-LAB.md`

## Arquivo alterado

- `fluency-clean/src/grammar/grammarJsonContract.js`

## Implementação

### `grammarBrazilianErrors.js`

Criado dicionário `GRAMMAR_BRAZILIAN_ERRORS` com erros A1–B2, incluindo:

- `third_person_s_missing`
- `have_has_confusion`
- `is_are_confusion`
- `a_an_basic`
- `past_simple_irregular`
- `going_to_vs_will`
- `comparative_more_double`
- `present_perfect_for_since`
- `first_conditional_will`
- `must_vs_have_to_meaning`
- `gerund_infinitive_after_verbs`
- `passive_voice_object_subject`
- `reported_speech_tense_shift`

Exports:

- `GRAMMAR_BRAZILIAN_ERRORS`
- `getErrorsByLevel(level)`
- `getErrorsByArea(area)`
- `getErrorByTag(tag)`

### `grammarQualityGate.js`

Criado com:

- `GRAMMAR_QUALITY_GATE_VERSION`
- `applyGrammarQualityGate(rawLesson)`
- `assertGrammarQualityGate(gatedLesson)`

O gate:

- normaliza `level`;
- valida/normaliza `focusArea`;
- registra issue se `ruleBlock` não tiver exemplos essenciais;
- remove `examplePairs` incompletos;
- remove exercícios com resposta vazada no prompt;
- remove exercícios sem prompt ou answer;
- valida múltipla escolha com alternativas e resposta entre opções;
- valida correção com `englishSentence` diferente da resposta;
- marca `typicalErrors` desconhecidos como `__custom`;
- adiciona `typicalErrors` do dicionário quando necessário;
- adiciona `productionPrompt` padrão quando faltar.

### Integração

`grammarJsonContract.js` agora importa:

```js
import { applyGrammarQualityGate } from './grammarQualityGate.js';
```

E usa:

```js
export function normalizeGrammarLessonContract(rawLesson = {}) {
  return applyGrammarQualityGate(buildNormalizedGrammarLesson(rawLesson));
}
```

## Compatibilidade preservada

- Não foi alterado `GrammarLesson.jsx`.
- Não foi alterado `grammarBuilder.js`.
- Não foi alterado `lessonJsonContract.js` neste bloco.
- Não foi alterado `main.jsx`.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.
- `qualityGate.issues` não aparece na UI da aula.

## Critérios de aceitação

- [x] `grammarBrazilianErrors.js` criado com mais de 12 erros A1–B2.
- [x] `grammarQualityGate.js` criado.
- [x] `applyGrammarQualityGate` criado.
- [x] `assertGrammarQualityGate` criado.
- [x] `grammarJsonContract.js` aplica o gate na normalização.
- [x] Exercícios com resposta vazada são descartados.
- [x] `qualityGate.repairs` é registrado no objeto retornado.

## Próximo bloco recomendado

`BLOCO-C4-GRAMMAR-4-PRACTICE-BUILDER-V2-LAB`.
