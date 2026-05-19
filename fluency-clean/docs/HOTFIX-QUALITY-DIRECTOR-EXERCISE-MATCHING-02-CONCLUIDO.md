# HOTFIX — Quality Director Exercise Matching 02

## Status

Concluído em 2026-05-18.

## Problema

O Quality Director ainda marcava falsos positivos de `Mais de uma alternativa parece correta` em exercícios de gramática.

Exemplo do relatório full:

- resposta correta: `I am tired.`
- opções marcadas como corretas: `I am tired.`, `It am tired.`, `They is tired.`

As opções erradas eram gramaticalmente inválidas, mas o auditor removia pronomes e verbos de ligação como stopwords. Com isso, as três alternativas ficavam lexicalmente parecidas por compartilharem apenas a palavra `tired`.

## Causa raiz

A função `optionMatchesAnswer()` comparava principalmente tokens lexicais depois de remover palavras gramaticais importantes, incluindo:

- pronomes: `I`, `he`, `she`, `it`, `we`, `they`;
- verbos `to be`: `am`, `is`, `are`;
- determinantes curtos.

Isso funcionava para resumos semânticos de reading/listening, mas era fraco para respostas curtas de grammar.

## Correção

Arquivo alterado:

- `fluency-clean/e2e/quality-director/helpers/exerciseQualityRules.js`

Mudanças principais:

1. Adicionados conjuntos gramaticais sensíveis:
   - `GRAMMAR_PRONOUNS`
   - `GRAMMAR_BE_FORMS`
   - `GRAMMAR_DETERMINERS`

2. Criada leitura de `rawWords()` preservando palavras gramaticais antes dos filtros de stopwords.

3. Criada verificação `hasGrammarCoreMismatch(option, answer)` para impedir que uma opção seja considerada equivalente quando troca pronomes, formas de `to be` ou determinantes em respostas gramaticais curtas.

4. Ajustada `optionMatchesAnswer()`:
   - igualdade normalizada continua válida;
   - respostas gramaticais curtas exigem núcleo gramatical compatível;
   - resumos semânticos legítimos continuam aceitos para casos como reading/listening.

## Exemplos corrigidos

Agora estas opções não devem mais ser consideradas equivalentes:

- `I am tired.` vs `It am tired.`
- `I am tired.` vs `They is tired.`
- `She is my sister.` vs `He is my sister.`
- `It is my phone.` vs `He is my phone.`

## Risco

O risco principal é o auditor ficar mais estrito para respostas curtas que usam pronomes/determinantes. A regra foi limitada a respostas gramaticais curtas para preservar os resumos semânticos de reading/listening.

## Testes

Não rodei localmente neste ambiente. Próximo passo recomendado:

- rodar `audit_mode=full` para confirmar queda dos falsos positivos de `A1-GRAMMAR-001` e similares;
- se surgirem falsos negativos em resumos de reading/listening, ajustar a regra com base nas evidências do relatório.

## Commit

- `3d2daf94ca453500919b8552492abe4f4db814d3` — `test: tighten grammar-sensitive exercise matching`
