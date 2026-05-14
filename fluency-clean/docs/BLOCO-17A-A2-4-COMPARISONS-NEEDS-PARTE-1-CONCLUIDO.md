# BLOCO 17A — A2.4 Choices, quantities and comparisons — Parte 1

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Iniciar o pacote `A2.4 Choices, quantities and comparisons`, seguindo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre o núcleo inicial de A2.4:

- Countable and uncountable nouns;
- Clothes and sizes;
- A comparison of two products;
- Comparing two options;
- Compare two choices;
- Compare two products.

## Observação sobre o mapa

No `a2Map.js`, o item `Would like / want / need` aparece na lista de Grammar antes de `Countable and uncountable nouns`, mas está marcado com `packageKey: communicationTasks`.

Por isso, este bloco preserva esse item para o pacote correto `A2.5 Everyday communication tasks` e inicia A2.4 pelo primeiro conteúdo com `packageKey: comparisonsNeeds`.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ComparisonsNeeds.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas

### Grammar

- `A2-GRAMMAR-014` — `Countable and uncountable nouns`

Foco:

- countable vs uncountable;
- `a/an`;
- plurais;
- `some`;
- unit phrases;
- evitar `an information`, `many money`, `a water`.

### Vocabulary

- `A2-VOCABULARY-013` — `Clothes and sizes`

Foco:

- shirt;
- T-shirt;
- jacket;
- jeans;
- shoes;
- size;
- small/medium/large;
- tight/loose;
- comfortable;
- fit;
- try on;
- exchange;
- `a pair of jeans/shoes`.

### Reading

- `A2-READING-012` — `A comparison of two products`

Foco:

- comparação de duas jaquetas;
- preço;
- tamanho;
- conforto;
- problema;
- escolha final;
- evidência textual.

### Listening

- `A2-LISTENING-012` — `Comparing two options`

Foco:

- comparar duas opções em diálogo;
- cheaper;
- more expensive;
- comfortable;
- too tight;
- fits better;
- better choice;
- dictation e shadowing.

### Speaking

- `A2-SPEAKING-013` — `Compare two choices`

Foco:

- comparar duas escolhas;
- critérios;
- preço;
- conforto;
- tamanho;
- `but`;
- `because`;
- escolha final.

### Writing

- `A2-WRITING-013` — `Compare two products`

Foco:

- escrever comparação curta;
- duas opções;
- critérios;
- contraste;
- decisão;
- motivo;
- revisão de erros comuns.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMPARISONS_NEEDS
A2_DEEP_COMPARISONS_NEEDS_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.4

A2.4 foi iniciado, mas ainda não está completo.

Aulas criadas até agora:

- `A2-GRAMMAR-014`
- `A2-VOCABULARY-013`
- `A2-READING-012`
- `A2-LISTENING-012`
- `A2-SPEAKING-013`
- `A2-WRITING-013`

## Ainda falta no A2.4

Pelo mapa, ainda faltam dentro de `comparisonsNeeds`:

- `A2-GRAMMAR-015` — Some / any;
- `A2-GRAMMAR-016` — Much / many / a lot of;
- `A2-GRAMMAR-017` — Comparatives;
- `A2-GRAMMAR-018` — Superlatives;
- `A2-GRAMMAR-023` — Possessive pronouns: mine, yours, his, hers;
- `A2-VOCABULARY-014` — Food quantities and containers;
- `A2-VOCABULARY-015` — Personality adjectives;
- `A2-VOCABULARY-016` — Comparing places and products;
- `A2-READING-013` — A simple invitation;
- `A2-READING-014` — A problem and solution text;
- `A2-READING-015` — Reading for past sequence;
- `A2-READING-016` — Reading for plans and intentions;
- `A2-READING-017` — Reading for comparisons;
- `A2-LISTENING-015` — Listening for sequence markers;
- `A2-LISTENING-016` — Listening for future plans.

Observação: alguns itens de Reading/Listening/Speaking/Writing próximos no mapa pertencem a `communicationTasks`; eles devem ficar para A2.5.

## Próximo bloco correto

`BLOCO 17B — A2.4 Choices, quantities and comparisons — Parte 2`

Tema recomendado:

- Some / any;
- Much / many / a lot of;
- Food quantities and containers;
- leitura/listening de quantidades e escolhas práticas.

## Commits

- `ead53e492a5f28f9bfbb559437081b8b999d66c0` — cria A2.4 Comparisons Needs parte 1.
- `9bd279212cc3d863079396d1295d651950e80312` — conecta A2.4 Comparisons Needs parte 1.
