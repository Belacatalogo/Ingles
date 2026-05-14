# BLOCO 18B — A2.5 Everyday communication tasks — Parte 2

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Continuar o pacote `A2.5 Everyday communication tasks`, mantendo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre o núcleo de conselhos simples:

- Should / shouldn’t;
- Feelings and opinions;
- Giving simple advice;
- Give simple advice;
- Write advice with should.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2CommunicationTasksPart2.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **5 aulas**

### Grammar

- `A2-GRAMMAR-019` — `Should / shouldn’t`

Foco:

- conselho positivo com `should`;
- alerta/conselho negativo com `shouldn’t`;
- `should + base verb`;
- perguntas com `Should I...?` e `What should I do?`;
- evitar `should to`, `shoulds`, `don’t should`.

### Vocabulary

- `A2-VOCABULARY-018` — `Feelings and opinions`

Foco:

- tired;
- worried;
- nervous;
- excited;
- bored;
- angry;
- sad/happy;
- confused;
- comfortable/uncomfortable;
- interested;
- `I think`, `I feel`, `in my opinion`;
- cuidado com `bored` vs `boring`.

### Listening

- `A2-LISTENING-014` — `Giving simple advice`

Foco:

- ouvir problema;
- identificar sentimento;
- ouvir conselho com `should/shouldn’t`;
- motivo com `because`;
- dictation e shadowing.

### Speaking

- `A2-SPEAKING-015` — `Give simple advice`

Foco:

- dar conselhos simples;
- pedir conselho;
- usar `I think you should...`;
- usar `Maybe you should...`;
- dar motivo com `because`.

### Writing

- `A2-WRITING-015` — `Write advice with should`

Foco:

- escrever mensagem de conselho;
- começar com empatia;
- usar `should` e `shouldn’t`;
- explicar motivo com `because`;
- revisar erros comuns.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMMUNICATION_TASKS_PART2
A2_DEEP_COMMUNICATION_TASKS_PART2_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.5

A2.5 possui agora duas partes profundas.

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

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **96**
- Faltavam no A2: **26**

Neste bloco:

- Aulas criadas: **5**

Depois do bloco:

- Aulas criadas no A2: **101**
- Faltam no A2: **21**

## Ainda falta no A2.5

Pelo mapa, ainda faltam dentro de `communicationTasks`:

### Grammar

- `A2-GRAMMAR-020` — Have to / don’t have to;
- `A2-GRAMMAR-021` — Can / could for requests;
- `A2-GRAMMAR-022` — Object pronouns review and expansion;
- `A2-GRAMMAR-024` — Adverbs of manner;
- `A2-GRAMMAR-025` — Because / so / but / and review.

### Vocabulary

- `A2-VOCABULARY-019` — Common phrasal chunks A2.

### Reading

- `A2-READING-018` — Reading for advice and obligation.

### Speaking

- `A2-SPEAKING-016` — Talk about obligations.

### Writing

- `A2-WRITING-016` — Write about obligations.

## Próximo bloco correto

`BLOCO 18C — A2.5 Everyday communication tasks — Parte 3`

Tema recomendado:

- Have to / don’t have to;
- Talk about obligations;
- Write about obligations;
- Reading for advice and obligation.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `37dfee15cbc10f62725198d9e049861ff71dd41c` — cria A2.5 Communication Tasks parte 2.
- `fc5a380d2ad198ef684a2e1e1edf7eb39a4cd6b5` — conecta A2.5 Communication Tasks parte 2.
