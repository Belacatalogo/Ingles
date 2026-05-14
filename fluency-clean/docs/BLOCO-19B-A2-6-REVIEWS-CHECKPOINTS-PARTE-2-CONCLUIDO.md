# BLOCO 19B — A2.6 Reviews and checkpoints — Parte 2

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Continuar o pacote `A2.6 Reviews and checkpoints`, mantendo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre as revisões e checkpoints de Reading e Listening:

- Reading Review A2;
- Reading Checkpoint A2;
- Listening Review A2;
- Listening Checkpoint A2.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ReviewsCheckpointsPart2.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **4 aulas**

### Reading

- `A2-READING-019` — `Reading Review A2`

Foco:

- leitura funcional A2;
- mensagens, reviews, instruções e planos;
- ideia geral;
- detalhes importantes;
- comparação;
- obrigação;
- conselho;
- evidência textual.

### Reading

- `A2-READING-020` — `Reading Checkpoint A2`

Foco:

- checkpoint final de leitura A2;
- texto funcional mais longo;
- perguntas de tema, detalhe e inferência simples;
- obrigação com `have to`;
- conselho com `should`;
- comparação;
- resposta com evidência.

### Listening

- `A2-LISTENING-017` — `Listening Review A2`

Foco:

- escuta funcional A2;
- planos;
- convites;
- obrigação;
- comparação;
- pedido educado;
- dictation;
- shadowing.

### Listening

- `A2-LISTENING-018` — `Listening Checkpoint A2`

Foco:

- checkpoint final de escuta A2;
- entender problema principal;
- captar horário, lugar e obrigação;
- ouvir pedido com `could you`;
- ouvir `have to`, `don’t have to` e `should`;
- confirmar plano/ação final.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_REVIEWS_CHECKPOINTS_PART2
A2_DEEP_REVIEWS_CHECKPOINTS_PART2_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.6

A2.6 agora possui duas partes profundas.

### Parte 1

- `A2-GRAMMAR-026` — A2 Grammar Review 1
- `A2-GRAMMAR-027` — A2 Grammar Review 2
- `A2-GRAMMAR-028` — A2 Grammar Checkpoint
- `A2-VOCABULARY-020` — Vocabulary Review A2

### Parte 2

- `A2-READING-019` — Reading Review A2
- `A2-READING-020` — Reading Checkpoint A2
- `A2-LISTENING-017` — Listening Review A2
- `A2-LISTENING-018` — Listening Checkpoint A2

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **114**
- Faltavam no A2: **8**

Neste bloco:

- Aulas criadas: **4**

Depois do bloco:

- Aulas criadas no A2: **118**
- Faltam no A2: **4**

## Ainda falta no A2.6

Pelo mapa, ainda faltam:

### Speaking

- `A2-SPEAKING-017` — Speak for 60 seconds about your week;
- `A2-SPEAKING-018` — Speaking Checkpoint A2.

### Writing

- `A2-WRITING-017` — Writing Review A2;
- `A2-WRITING-018` — Writing Checkpoint A2.

## Próximo bloco correto

`BLOCO 19C — A2.6 Reviews and checkpoints — Parte 3 / Fechamento do A2`

Tema recomendado:

- Speak for 60 seconds about your week;
- Speaking Checkpoint A2;
- Writing Review A2;
- Writing Checkpoint A2.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `b746ca4556997aa78b261d7396ce83dd3439751b` — cria A2.6 Reviews and Checkpoints parte 2.
- `caa10e5cfc354db18b8480c3d4521a6217025c8b` — conecta A2.6 Reviews and Checkpoints parte 2.
