# BLOCO 18C — A2.5 Everyday communication tasks — Parte 3

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Continuar o pacote `A2.5 Everyday communication tasks`, mantendo a regra definida pelo usuário:

> A partir do A2, concluir o pacote/área completo em padrão profundo premium antes de avançar para o próximo pacote.

Este bloco cobre o núcleo de obrigações:

- Have to / don’t have to;
- Reading for advice and obligation;
- Talk about obligations;
- Write about obligations.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2CommunicationTasksPart3.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas neste bloco

Total: **4 aulas**

### Grammar

- `A2-GRAMMAR-020` — `Have to / don’t have to`

Foco:

- obrigação prática com `have to`;
- `has to` com he/she/it;
- ausência de obrigação com `don’t have to`;
- perguntas com `Do/Does + subject + have to...?`;
- diferença entre conselho com `should` e obrigação com `have to`;
- cuidado: `don’t have to` não é proibição.

### Reading

- `A2-READING-018` — `Reading for advice and obligation`

Foco:

- separar conselho de obrigação;
- identificar `should`, `shouldn’t`, `have to`, `has to`, `don’t have to`;
- localizar motivo com `because`;
- responder com evidência textual.

### Speaking

- `A2-SPEAKING-016` — `Talk about obligations`

Foco:

- falar de obrigações pessoais;
- falar de obrigações de outra pessoa;
- usar `don’t have to` oralmente;
- fazer perguntas sobre regras e necessidade;
- gravar fala de até 60 segundos sobre obrigações da semana.

### Writing

- `A2-WRITING-016` — `Write about obligations`

Foco:

- escrever mensagem funcional com instruções;
- usar `have to`, `has to`, `don’t have to`;
- explicar motivo com `because`;
- fechar com conselho usando `should`.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_COMMUNICATION_TASKS_PART3
A2_DEEP_COMMUNICATION_TASKS_PART3_BY_PILLAR
```

E inclui esse pacote em:

- `A2_READY_LESSONS`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL.A2`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2`.

## Progresso do A2.5

A2.5 possui agora três partes profundas.

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

## Contagem do A2 após este bloco

Total planejado no A2: **122 aulas**

Antes do bloco:

- Aulas criadas no A2: **101**
- Faltavam no A2: **21**

Neste bloco:

- Aulas criadas: **4**

Depois do bloco:

- Aulas criadas no A2: **105**
- Faltam no A2: **17**

## Ainda falta no A2.5

Pelo mapa, ainda faltam dentro de `communicationTasks`:

### Grammar

- `A2-GRAMMAR-021` — Can / could for requests;
- `A2-GRAMMAR-022` — Object pronouns review and expansion;
- `A2-GRAMMAR-024` — Adverbs of manner;
- `A2-GRAMMAR-025` — Because / so / but / and review.

### Vocabulary

- `A2-VOCABULARY-019` — Common phrasal chunks A2.

## Próximo bloco correto

`BLOCO 18D — A2.5 Everyday communication tasks — Parte 4`

Tema recomendado:

- Can / could for requests;
- Object pronouns review and expansion;
- Common phrasal chunks A2;
- pedidos educados e comunicação prática.

## Observação técnica

Permanece registrada uma duplicidade não crítica em `mergeA1PillarLessons` envolvendo `practicalSituationsHouse.grammar` repetido. O resultado final não deve duplicar aulas porque `mergeUniqueLessons` filtra por `lesson.id`. Essa limpeza pode ser feita futuramente com patch menor.

## Commits

- `59d172f59e4d5713b293319536d7bb4ea559e1c7` — cria A2.5 Communication Tasks parte 3.
- `0c6bc06921361293c81494e3d823fdfb9ed8cb76` — conecta A2.5 Communication Tasks parte 3.
