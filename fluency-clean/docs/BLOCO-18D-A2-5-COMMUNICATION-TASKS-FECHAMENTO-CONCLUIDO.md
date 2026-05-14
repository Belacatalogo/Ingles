# BLOCO 18D — A2.5 Everyday communication tasks — Parte 4 / Fechamento

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote `A2.5 Everyday communication tasks`, mantendo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre o fechamento funcional de comunicação:

- Can / could for requests;
- Object pronouns review and expansion;
- Common phrasal chunks A2;
- Adverbs of manner;
- Because / so / but / and review.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2CommunicationTasksPart4.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **5 aulas**

### Grammar

- `A2-GRAMMAR-021` — `Can / could for requests`

Foco:

- pedidos com `Can you...?`;
- pedidos mais educados com `Could you...?`;
- permissão com `Can I...?` e `Could I...?`;
- verbo base depois de can/could;
- respostas positivas e negativas com motivo.

### Grammar

- `A2-GRAMMAR-022` — `Object pronouns review and expansion`

Foco:

- me, you, him, her, it, us, them;
- object pronouns depois de verbos;
- object pronouns depois de preposições;
- evitar `help I`, `with I`, `called he`;
- pedidos e conselhos com pronomes objeto.

### Vocabulary

- `A2-VOCABULARY-019` — `Common phrasal chunks A2`

Foco:

- `Let me check`;
- `I’m not sure`;
- `No problem`;
- `That sounds good`;
- `I’ll be there`;
- `Could you repeat that?`;
- `It depends on...`;
- chunks para convite, pedido, confirmação e resolução de problemas.

### Grammar

- `A2-GRAMMAR-024` — `Adverbs of manner`

Foco:

- slowly;
- carefully;
- quickly;
- clearly;
- politely;
- well;
- diferença entre adjective e adverb;
- `good` vs `well`.

### Grammar

- `A2-GRAMMAR-025` — `Because / so / but / and review`

Foco:

- `because` para motivo;
- `so` para consequência;
- `but` para contraste;
- `and` para soma;
- conectar pedidos, conselhos, obrigações, opiniões e recusas.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMMUNICATION_TASKS_PART4
A2_DEEP_COMMUNICATION_TASKS_PART4_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## A2.5 completo criado

### Parte 1

- `A2-GRAMMAR-013` — Would like / want / need
- `A2-VOCABULARY-017` — Invitations and social plans
- `A2-LISTENING-013` — Accepting and refusing invitations
- `A2-SPEAKING-014` — Invite, accept and refuse
- `A2-WRITING-014` — Write an invitation and reply

### Parte 2

- `A2-GRAMMAR-019` — Should / shouldn’t
- `A2-VOCABULARY-018` — Feelings and opinions
- `A2-LISTENING-014` — Giving simple advice
- `A2-SPEAKING-015` — Give simple advice
- `A2-WRITING-015` — Write advice with should

### Parte 3

- `A2-GRAMMAR-020` — Have to / don’t have to
- `A2-READING-018` — Reading for advice and obligation
- `A2-SPEAKING-016` — Talk about obligations
- `A2-WRITING-016` — Write about obligations

### Parte 4 / Fechamento

- `A2-GRAMMAR-021` — Can / could for requests
- `A2-GRAMMAR-022` — Object pronouns review and expansion
- `A2-VOCABULARY-019` — Common phrasal chunks A2
- `A2-GRAMMAR-024` — Adverbs of manner
- `A2-GRAMMAR-025` — Because / so / but / and review

## Resultado do pacote

O pacote `A2.5 Everyday communication tasks` está fechado para a fase atual em padrão profundo premium.

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **105**
- Faltavam no A2: **17**

Neste bloco:

- Aulas criadas: **5**

Depois do bloco:

- Aulas criadas no A2: **110**
- Faltam no A2: **12**

## Próximo pacote correto

`A2.6 Reviews and checkpoints`

## Próximo bloco recomendado

`BLOCO 19A — A2.6 Reviews and checkpoints — Parte 1`

Tema recomendado:

- A2 Grammar Review 1;
- A2 Grammar Review 2;
- A2 Grammar Checkpoint;
- Vocabulary Review A2;
- integração inicial antes dos checkpoints finais.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `fc111c250f7693e18dae83bba0f82b29886104c5` — cria fechamento A2.5 Communication Tasks parte 4.
- `5ad6e82e9f1522ec3f75b3f5c4815fbff7ce024d` — conecta fechamento A2.5 Communication Tasks.
