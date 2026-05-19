# HOTFIX — B1-SPEAKING [object Object] P0

Data: 2026-05-19
Branch: `main`

## Problema

As aulas B1-SPEAKING-004, B1-SPEAKING-005, B1-SPEAKING-006 e B1-SPEAKING-007 exibiam `[object Object]` como texto visível na fase "Situação de fala" do renderizador.

O Quality Director reportava P0 "Objeto bruto apareceu para o aluno" em `assertNoTechnicalLeak`.

## Causa Raiz

Em `src/content/schemas/lessonFactories.js`, a função local `clean` é definida como:

```js
function clean(value) { return String(value ?? '').trim(); }
```

Essa função converte qualquer valor para string com `String()`. Quando `speakingSituation` é um objeto (como nas quatro aulas B1), `String({context: '...', modelResponse: '...', responseLength: '...'})` produz literalmente `'[object Object]'`.

O campo `speakingSituation` nas quatro aulas B1 afetadas foi escrito como:

```js
speakingSituation: {
  context: 'You have been at your current job...',
  modelResponse: 'Sam, I\'ve been struggling...',
  responseLength: '~120 words',
},
```

Isso é semanticamente correto — o objeto separa a situação do aluno (`context`) do exemplo de resposta (`modelResponse`) — mas o factory `createSpeakingLesson` não sabia extrair `context` do objeto, chamando `clean(objeto)` que virava `'[object Object]'`.

Esse valor corrompido era armazenado no lesson object e depois renderizado diretamente por `TextBody` como `<pre>[object Object]</pre>`.

## Arquivo Alterado

`fluency-clean/src/content/schemas/lessonFactories.js`

### Mudança

```diff
-    speakingSituation: clean(input.speakingSituation),
+    speakingSituation: typeof input.speakingSituation === 'object' && input.speakingSituation !== null
+      ? clean(input.speakingSituation.context || input.speakingSituation.text || '')
+      : clean(input.speakingSituation),
```

## Como Funciona Agora

- Se `speakingSituation` for um objeto, o factory extrai `context` (ou `text` como fallback).
- Se for uma string, o comportamento anterior é preservado.
- Se for `null`/`undefined`, retorna `''` (sem alteração).

Todas as 72 aulas de speaking com `status: 'ready'` foram verificadas — zero erros `[object Object]`.

## Lições Afetadas

| ID | Arquivo |
|---|---|
| B1-SPEAKING-004 | `deepB1ProblemsPart1.js` |
| B1-SPEAKING-005 | `deepB1WorkStudyPart1.js` |
| B1-SPEAKING-006 | `deepB1TravelCulturePart1.js` |
| B1-SPEAKING-007 | `deepB1MediaTechnologyPart1.js` |

## Validação

```
B1-SPEAKING-004: type=string, hasObjectObject=false, preview="You have been at your current job for two years..."
B1-SPEAKING-005: type=string, hasObjectObject=false, preview="You are at a professional networking event..."
B1-SPEAKING-006: type=string, hasObjectObject=false, preview="You are having lunch with a colleague..."
B1-SPEAKING-007: type=string, hasObjectObject=false, preview="A friend or colleague asks: Do you think social media..."
```

Nenhum arquivo de dados precisou ser alterado. A correção é defensiva — protege contra qualquer futura aula que use o mesmo padrão `{context, modelResponse}`.
