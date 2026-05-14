# BLOCO 19A — A2.6 Reviews and checkpoints — Parte 1

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Iniciar o pacote `A2.6 Reviews and checkpoints`, mantendo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre a primeira parte das revisões/checkpoints finais do A2:

- A2 Grammar Review 1;
- A2 Grammar Review 2;
- A2 Grammar Checkpoint;
- Vocabulary Review A2.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ReviewsCheckpoints.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **4 aulas**

### Grammar

- `A2-GRAMMAR-026` — `A2 Grammar Review 1`

Foco:

- Past Simple regular e irregular;
- negativas com `didn’t + base verb`;
- perguntas com `Did + subject + base verb`;
- past time expressions;
- there was / there were;
- narrativa simples no passado.

### Grammar

- `A2-GRAMMAR-027` — `A2 Grammar Review 2`

Foco:

- Present Continuous;
- Present Simple vs Present Continuous;
- going to para planos e previsões;
- quantifiers;
- comparatives/superlatives;
- comunicação funcional com would like, should, have to, can/could;
- conectores.

### Grammar

- `A2-GRAMMAR-028` — `A2 Grammar Checkpoint`

Foco:

- checkpoint final de Grammar A2;
- alternância entre passado, agora, plano, quantidade, comparação, pedido, conselho e obrigação;
- correção de erros centrais;
- produção guiada com múltiplas estruturas A2.

### Vocabulary

- `A2-VOCABULARY-020` — `Vocabulary Review A2`

Foco:

- vocabulário funcional por situação;
- viagem/hotel;
- compras/comparações;
- saúde/conselho;
- trabalho/obrigações;
- tecnologia/casa;
- sentimentos/opiniões;
- chunks prontos A2.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_REVIEWS_CHECKPOINTS
A2_DEEP_REVIEWS_CHECKPOINTS_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.6

A2.6 foi iniciado, mas ainda não está completo.

Aulas criadas até agora no A2.6:

- `A2-GRAMMAR-026` — A2 Grammar Review 1
- `A2-GRAMMAR-027` — A2 Grammar Review 2
- `A2-GRAMMAR-028` — A2 Grammar Checkpoint
- `A2-VOCABULARY-020` — Vocabulary Review A2

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **110**
- Faltavam no A2: **12**

Neste bloco:

- Aulas criadas: **4**

Depois do bloco:

- Aulas criadas no A2: **114**
- Faltam no A2: **8**

## Ainda falta no A2.6

Pelo mapa, ainda faltam:

### Reading

- `A2-READING-019` — Reading Review A2;
- `A2-READING-020` — Reading Checkpoint A2.

### Listening

- `A2-LISTENING-017` — Listening Review A2;
- `A2-LISTENING-018` — Listening Checkpoint A2.

### Speaking

- `A2-SPEAKING-017` — Speak for 60 seconds about your week;
- `A2-SPEAKING-018` — Speaking Checkpoint A2.

### Writing

- `A2-WRITING-017` — Writing Review A2;
- `A2-WRITING-018` — Writing Checkpoint A2.

## Próximo bloco correto

`BLOCO 19B — A2.6 Reviews and checkpoints — Parte 2`

Tema recomendado:

- Reading Review A2;
- Reading Checkpoint A2;
- Listening Review A2;
- Listening Checkpoint A2.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `2b1a4e8891406c64957fa2544b6f740932851246` — cria A2.6 Reviews and Checkpoints parte 1.
- `372267aceb4032c4add833617deb0d114f72e22b` — conecta A2.6 Reviews and Checkpoints parte 1.
