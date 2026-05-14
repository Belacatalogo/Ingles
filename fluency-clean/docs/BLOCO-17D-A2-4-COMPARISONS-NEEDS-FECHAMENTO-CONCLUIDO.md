# BLOCO 17D — A2.4 Choices, quantities and comparisons — Parte 4 / Fechamento

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote `A2.4 Choices, quantities and comparisons`, seguindo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre:

- Possessive pronouns: mine, yours, his, hers;
- A simple invitation com foco em escolha/preferência;
- Reading for past sequence com foco em comparação/decisão.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ComparisonsNeedsPart4.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **3 aulas**

### Grammar

- `A2-GRAMMAR-023` — `Possessive pronouns: mine, yours, his, hers`

Foco:

- my vs mine;
- your vs yours;
- her vs hers;
- his/hers/ours/theirs;
- comparação de objetos e posses;
- evitar `mine jacket`, `your is`, `her` sozinho como pronome possessivo.

### Reading

- `A2-READING-013` — `A simple invitation`

Foco:

- convite simples;
- escolha entre dois lugares;
- comparação com `closer`, `quieter`, `cheaper`;
- possessive pronouns: `near your house` / `near mine`;
- decisão final com `best choice`.

### Reading

- `A2-READING-015` — `Reading for past sequence`

Foco:

- sequência passada;
- first/then/after that/finally;
- compra e comparação;
- mine/his;
- escolha final com motivo.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMPARISONS_NEEDS_PART4
A2_DEEP_COMPARISONS_NEEDS_PART4_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Observação técnica

Durante a conexão, foi percebida uma duplicidade não crítica no merge de Grammar do A1 (`practicalSituationsHouse.grammar` apareceu duas vezes em uma lista).

Essa duplicidade não deve alterar o resultado final porque `mergeUniqueLessons` filtra aulas duplicadas por `lesson.id`.

Foi feita uma tentativa de limpeza imediata, mas a ferramenta bloqueou o update grande do arquivo. Como não afeta o fechamento do A2.4 nem quebra o build por si só, o detalhe fica registrado para limpeza futura, se necessário.

## Resultado

O pacote `A2.4 Choices, quantities and comparisons` está fechado para a fase atual em padrão profundo premium.

## A2.4 completo criado

### Parte 1

- `A2-GRAMMAR-014` — Countable and uncountable nouns
- `A2-VOCABULARY-013` — Clothes and sizes
- `A2-READING-012` — A comparison of two products
- `A2-LISTENING-012` — Comparing two options
- `A2-SPEAKING-013` — Compare two choices
- `A2-WRITING-013` — Compare two products

### Parte 2

- `A2-GRAMMAR-015` — Some / any
- `A2-GRAMMAR-016` — Much / many / a lot of
- `A2-VOCABULARY-014` — Food quantities and containers
- `A2-READING-017` — Reading for comparisons
- `A2-LISTENING-015` — Listening for sequence markers
- `A2-LISTENING-016` — Listening for future plans

### Parte 3

- `A2-GRAMMAR-017` — Comparatives
- `A2-GRAMMAR-018` — Superlatives
- `A2-VOCABULARY-015` — Personality adjectives
- `A2-VOCABULARY-016` — Comparing places and products
- `A2-READING-014` — A problem and solution text
- `A2-READING-016` — Reading for plans and intentions

### Parte 4 / Fechamento

- `A2-GRAMMAR-023` — Possessive pronouns: mine, yours, his, hers
- `A2-READING-013` — A simple invitation
- `A2-READING-015` — Reading for past sequence

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **88**
- Faltavam no A2: **34**

Neste bloco:

- Aulas criadas: **3**

Depois do bloco:

- Aulas criadas no A2: **91**
- Faltam no A2: **31**

## Próximo pacote correto

`A2.5 Everyday communication tasks`

## Próximo bloco recomendado

`BLOCO 18A — A2.5 Everyday communication tasks — Parte 1`

Tema recomendado:

- Would like / want / need;
- Invitations and social plans;
- Accepting and refusing invitations;
- Invite, accept and refuse;
- Write an invitation and reply.

## Commits

- `f5864f8aac6256e1267b3d1d1edd3395195f28e3` — cria fechamento A2.4 Comparisons Needs parte 4.
- `5d9941d497b9869d04d8304605772985cad580d0` — conecta fechamento A2.4 Comparisons Needs.
