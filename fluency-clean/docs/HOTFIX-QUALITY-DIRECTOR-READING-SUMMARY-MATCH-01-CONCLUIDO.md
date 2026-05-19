# HOTFIX — Quality Director Reading Summary Match 01

## Status

Concluído em 2026-05-18.

## Problema

Após endurecer o comparador de alternativas para evitar falsos positivos em exercícios de grammar, o Quality Director passou a marcar P0 em exercícios de reading/listening quando a alternativa era um resumo correto da resposta.

Exemplos do relatório:

- resposta: `because it is too small`; opção: `too small`
- resposta: `the sky is very dark`; opção: `sky is dark`
- resposta: `it was canceled`; opção: `canceled`
- resposta: `the blue jacket`; opção: `blue jacket`

Esses casos não deveriam ser P0, porque a alternativa curta preserva o conteúdo essencial.

## Causa raiz

A regra gramatical passou a bloquear matches antes de permitir resumos concisos. Isso corrigiu grammar curto, mas tornou reading/listening rígido demais.

## Correção

Arquivo alterado:

- `fluency-clean/e2e/quality-director/helpers/exerciseQualityRules.js`

Mudanças principais:

1. Criada função `isConciseContentSummary()`.
2. Resumos concisos agora são aceitos antes do bloqueio gramatical quando:
   - a opção tem até 4 tokens de conteúdo;
   - a opção é mais curta que a resposta;
   - a opção não contém pronomes ou formas de `to be`;
   - todos os tokens de conteúdo da opção aparecem na resposta;
   - há evidência lexical mínima suficiente.
3. O bloqueio gramatical continua ativo para frases curtas com pronomes e `to be`, como:
   - `I am tired.` vs `It am tired.`
   - `She is my sister.` vs `He is my sister.`

## Critério esperado

O próximo `audit_mode=full` deve reduzir os P0 falsos de reading sem trazer de volta os falsos positivos de grammar.

## Testes

Não rodado localmente neste ambiente.

Próximo passo:

- rodar `audit_mode=full` no GitHub Actions.

## Commit

- `f59b681dfb5f4f60507e1fb9cb4217cc6b65f11e` — `test: allow concise reading answer summaries`
