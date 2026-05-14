# BLOCO 18A — A2.5 Everyday communication tasks — Parte 1

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Iniciar o pacote `A2.5 Everyday communication tasks`, seguindo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre o núcleo inicial de comunicação social:

- Would like / want / need;
- Invitations and social plans;
- Accepting and refusing invitations;
- Invite, accept and refuse;
- Write an invitation and reply.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2CommunicationTasks.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **5 aulas**

### Grammar

- `A2-GRAMMAR-013` — `Would like / want / need`

Foco:

- `want` para desejo direto;
- `need` para necessidade;
- `would like` para pedido/preferência educada;
- `would like to + verb`;
- convites com `Would you like to...?`;
- evitar `I would like order`, `Would you like come?`.

### Vocabulary

- `A2-VOCABULARY-017` — `Invitations and social plans`

Foco:

- invite;
- join;
- meet;
- come over;
- go out;
- have dinner;
- free/busy;
- maybe/sure/sorry;
- another time;
- aceitar e recusar convites com educação.

### Listening

- `A2-LISTENING-013` — `Accepting and refusing invitations`

Foco:

- ouvir convites;
- identificar aceitação/recusa;
- motivo;
- alternativa;
- horário;
- dictation e shadowing.

### Speaking

- `A2-SPEAKING-014` — `Invite, accept and refuse`

Foco:

- fazer convite;
- aceitar convite;
- recusar com educação;
- dar motivo;
- sugerir alternativa com `How about...?`;
- confirmar horário/lugar.

### Writing

- `A2-WRITING-014` — `Write an invitation and reply`

Foco:

- escrever convite curto;
- responder aceitando ou recusando;
- incluir dia, horário e lugar;
- usar `sorry`, `because`, `how about`;
- revisar `on Saturday`, `at 4 p.m.`, `would like to`.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMMUNICATION_TASKS
A2_DEEP_COMMUNICATION_TASKS_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.5

A2.5 foi iniciado, mas ainda não está completo.

Aulas criadas até agora no A2.5:

- `A2-GRAMMAR-013`
- `A2-VOCABULARY-017`
- `A2-LISTENING-013`
- `A2-SPEAKING-014`
- `A2-WRITING-014`

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **91**
- Faltavam no A2: **31**

Neste bloco:

- Aulas criadas: **5**

Depois do bloco:

- Aulas criadas no A2: **96**
- Faltam no A2: **26**

## Ainda falta no A2.5

Pelo mapa, ainda faltam dentro de `communicationTasks`:

### Grammar

- `A2-GRAMMAR-019` — Should / shouldn’t;
- `A2-GRAMMAR-020` — Have to / don’t have to;
- `A2-GRAMMAR-021` — Can / could for requests;
- `A2-GRAMMAR-022` — Object pronouns review and expansion;
- `A2-GRAMMAR-024` — Adverbs of manner;
- `A2-GRAMMAR-025` — Because / so / but / and review.

### Vocabulary

- `A2-VOCABULARY-018` — Feelings and opinions;
- `A2-VOCABULARY-019` — Common phrasal chunks A2.

### Reading

- `A2-READING-018` — Reading for advice and obligation.

### Listening

- `A2-LISTENING-014` — Giving simple advice.

### Speaking

- `A2-SPEAKING-015` — Give simple advice;
- `A2-SPEAKING-016` — Talk about obligations.

### Writing

- `A2-WRITING-015` — Write advice with should;
- `A2-WRITING-016` — Write about obligations.

## Próximo bloco correto

`BLOCO 18B — A2.5 Everyday communication tasks — Parte 2`

Tema recomendado:

- Should / shouldn’t;
- Giving simple advice;
- Write advice with should;
- feelings/opinions como suporte comunicativo.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `f71de35c4bb3bb34d41ee1f3551255c8decdabc1` — cria A2.5 Communication Tasks parte 1.
- `ea7988506e0663fb6dc62eafbd783933dc13d59e` — conecta A2.5 Communication Tasks parte 1.
