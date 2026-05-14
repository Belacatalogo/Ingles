# BLOCO 14A — A2.1 Bridge and survival expansion — Parte 1

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Iniciar o A2 seguindo o mapa já existente em:

- `fluency-clean/src/content/curriculum/a2Map.js`

Primeiro pacote do A2:

- `A2.1 A1 Bridge and survival expansion`

Este bloco inicia o A2 sem mexer no fluxo real do aluno e sem alterar regras de progressão.

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A2/deepA2Bridge.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas profundas criadas

### Grammar

- `A2-GRAMMAR-001` — `A1 repair: sentence order and auxiliaries`

Foco:

- ordem de frase;
- auxiliares;
- `to be` em perguntas;
- `can` em perguntas;
- `do/does`;
- negativas simples;
- correção de lacunas antes do A2.

### Vocabulary

- `A2-VOCABULARY-001` — `Past events and dates`

Foco:

- yesterday;
- last night;
- last week;
- last month;
- last year;
- two days ago;
- event, birthday, party, trip, meeting, class.

### Reading

- `A2-READING-001` — `A short past story`

Foco:

- leitura curta no passado;
- sequência de eventos;
- `first`, `then`, `after that`;
- evidência textual.

### Listening

- `A2-LISTENING-001` — `Past weekend conversation`

Foco:

- conversa sobre fim de semana passado;
- `What did you do last weekend?`;
- atividades passadas;
- transcript;
- dictation;
- shadowing.

### Speaking

- `A2-SPEAKING-001` — `Talk about yesterday`

Foco:

- falar sobre ontem;
- sequência simples;
- `Yesterday`, `Then`, `After that`;
- relato oral de 30 segundos.

### Writing

- `A2-WRITING-001` — `Write about yesterday`

Foco:

- escrever parágrafo curto sobre ontem;
- sequência simples;
- pontuação;
- sentimentos/opinião no passado.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A2_DEEP_BRIDGE
A2_DEEP_BRIDGE_BY_PILLAR
```

E agora separa conteúdo pronto por nível:

```js
STATIC_READY_LESSONS_BY_LEVEL = {
  A1: A1_READY_LESSONS,
  A2: A2_READY_LESSONS,
}
```

Também adiciona:

```js
STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR.A2
```

## Observação importante

A estrutura anterior retornava apenas A1 em `STATIC_READY_LESSONS_BY_LEVEL`. Este bloco adiciona A2 explicitamente para que o currículo possa reconhecer aulas `ready` do A2.

## Commits

- `a577918bfb9701748cc020e20bef0a28f3c639f9` — cria A2.1 Bridge parte 1.
- `6e7623407c6dccfaa8e4075bf9f239e9ab7885fc` — conecta A2.1 ao currículo estático.

## Próximo bloco correto

`BLOCO 14B — A2.2 Past stories and experiences — Parte 1`

Tema recomendado:

- Past Simple regular verbs affirmative;
- Travel basics;
- Travel message;
- Travel information;
- Tell a short past story;
- Write a short past story.
