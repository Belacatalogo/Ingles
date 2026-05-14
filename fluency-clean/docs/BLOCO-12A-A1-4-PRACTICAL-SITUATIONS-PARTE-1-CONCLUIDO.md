# BLOCO 12A — A1.4 Practical Situations — Parte 1

Branch: `rewrite-fluency-clean-lab`

## Correção de direção

Este bloco retoma o cronograma correto dos pacotes profundos A1.

Não foi seguido o caminho de aula isolada por mapa técnico. O bloco voltou para o pacote:

- `A1.4 Practical situations`

## Objetivo

Criar e conectar a primeira parte profunda do pacote A1.4, com foco em situação prática de café/comida/pedido simples.

Tema da parte 1:

- Food and ordering
- pedidos com `Can I have...?`
- leitura de menu
- listening de pedido em café
- speaking de pedido simples
- writing de mensagem curta

## Arquivo criado

- `fluency-clean/src/content/curriculum/levels/A1/deepPracticalSituations.js`

## Arquivo alterado

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas

### Grammar

- `A1-GRAMMAR-021` — `Can / can’t`

Foco:

- can + verbo base;
- negativa com can’t;
- perguntas com can;
- pedidos práticos com `Can I have...?`;
- erros brasileiros: `can to`, `she cans`, `do you can`.

### Vocabulary

- `A1-VOCABULARY-013` — `Food and drinks`

Foco:

- food/drinks/meals;
- coffee, water, sandwich, breakfast, lunch, dinner;
- pedidos educados;
- chunks de café/restaurante.

### Reading

- `A1-READING-008` — `A café menu`

Foco:

- leitura funcional;
- categorias de menu;
- itens e preços;
- evidência textual.

### Listening

- `A1-LISTENING-009` — `Ordering food`

Foco:

- pedido em café;
- `Anything else?`;
- `For here or to go?`;
- first/second listen;
- transcript, dictation e shadowing.

### Speaking

- `A1-SPEAKING-013` — `Order something simple`

Foco:

- fazer pedido oral;
- substituir food/drink;
- responder atendente;
- gravação curta.

### Writing

- `A1-WRITING-008` — `Write a simple message`

Foco:

- mensagem curta de pedido;
- greeting + request + detail + closing;
- pontuação, please e thank you.

## Conexão no currículo

`staticLessonContent.js` agora importa:

```js
A1_DEEP_PRACTICAL_SITUATIONS
A1_DEEP_PRACTICAL_SITUATIONS_BY_PILLAR
```

E inclui o pacote em:

- `STATIC_READY_LESSONS`
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`

## Resultado esperado

As novas aulas passam a aparecer como conteúdo fixo pronto do A1.4.

A área de teste visual deve conseguir abrir essas aulas quando o pilar correspondente for selecionado, desde que os pré-requisitos estejam satisfeitos ou o fluxo de teste ignore apenas o limite diário.

## Commits

- `3803ecdb297bfb2334f9931b6d12f6e9bcae9ae4` — cria A1.4 Practical Situations parte 1.
- `38a6523dd6eb70bd23cf3410c1ca18d20d01a2cb` — conecta A1.4 ao currículo estático.

## Próximos passos

1. Verificar build/deploy.
2. Se houver erro de schema, corrigir o pacote A1.4.
3. Criar BLOCO 12B — A1.4 Practical Situations — Parte 2, seguindo o cronograma do pacote, não aula isolada.
