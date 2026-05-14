# BLOCO 19C — A2.6 Reviews and checkpoints — Parte 3 / Fechamento do A2

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote `A2.6 Reviews and checkpoints` e concluir o A2 em padrão profundo premium nesta fase.

Este bloco cobre as aulas finais do A2:

- Speak for 60 seconds about your week;
- Speaking Checkpoint A2;
- Writing Review A2;
- Writing Checkpoint A2.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ReviewsCheckpointsPart3.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **4 aulas**

### Speaking

- `A2-SPEAKING-017` — `Speak for 60 seconds about your week`

Foco:

- falar por 60 segundos sobre a semana;
- integrar Past Simple, Present Continuous, going to, have to, should e conectores;
- organizar fala em blocos: passado, agora, plano, obrigação, sentimento e fechamento;
- preparar o checkpoint oral.

### Speaking

- `A2-SPEAKING-018` — `Speaking Checkpoint A2`

Foco:

- checkpoint final de fala A2;
- responder prompts funcionais;
- falar sobre passado, agora, planos, obrigações, pedidos e conselhos;
- gravar resposta final de até 90 segundos;
- confirmar comunicação oral A2 funcional.

### Writing

- `A2-WRITING-017` — `Writing Review A2`

Foco:

- revisão de escrita funcional A2;
- convite e resposta;
- relato passado;
- plano futuro;
- conselho;
- instrução com obrigação;
- conectores e revisão de erros centrais.

### Writing

- `A2-WRITING-018` — `Writing Checkpoint A2`

Foco:

- checkpoint final de escrita A2;
- mensagem funcional completa;
- contexto, motivo, detalhe passado, situação atual, plano futuro, comparação, pedido educado e fechamento;
- revisão de Past Simple, Present Continuous, going to, have to, could, comparatives, object pronouns e conectores.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_REVIEWS_CHECKPOINTS_PART3
A2_DEEP_REVIEWS_CHECKPOINTS_PART3_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## A2.6 completo criado

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

### Parte 3 / Fechamento

- `A2-SPEAKING-017` — Speak for 60 seconds about your week
- `A2-SPEAKING-018` — Speaking Checkpoint A2
- `A2-WRITING-017` — Writing Review A2
- `A2-WRITING-018` — Writing Checkpoint A2

## Resultado do pacote

O pacote `A2.6 Reviews and checkpoints` está fechado.

## Resultado do A2

O A2 está completo para esta fase em padrão profundo premium.

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **118**
- Faltavam no A2: **4**

Neste bloco:

- Aulas criadas: **4**

Depois do bloco:

- Aulas criadas no A2: **122**
- Faltam no A2: **0**

## Pacotes A2 concluídos

- `A2.1 A1 Bridge and survival expansion`;
- `A2.2 Past stories and experiences`;
- `A2.3 Now, plans and near future`;
- `A2.4 Choices, quantities and comparisons`;
- `A2.5 Everyday communication tasks`;
- `A2.6 Reviews and checkpoints`.

## Próximo passo recomendado

Pela regra definida anteriormente, depois de completar o A2 há duas opções possíveis, dependendo da prioridade do usuário:

1. Iniciar `B1` seguindo a mesma regra de concluir o pacote completo antes de avançar;
2. Voltar para o refinamento premium do A1 restante, conforme nota anterior sobre cobertura vs aulas profundas.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `f2003db4254d2f6c127ad4b3ddd7b17a15c7fa30` — cria fechamento A2.6 Reviews and Checkpoints parte 3.
- `d8d1cad7683a80dcb0db016af216602bd3a871ff` — conecta fechamento A2 Reviews and Checkpoints.
