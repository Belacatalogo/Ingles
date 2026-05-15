# HOTFIX 20J — `ex` helper indefinido

Branch: `rewrite-fluency-clean-lab`

## Problema

Durante o teste no iPhone, o app abriu a tela de erro com:

```txt
Can't find variable: ex
```

Isso indicava que algum conteúdo estava chamando `ex(...)` sem o helper existir no escopo do arquivo.

## Causa encontrada

Arquivo afetado:

- `fluency-clean/src/content/curriculum/levels/A2/deepA2ReviewsCheckpoints.js`

No topo do arquivo existiam os helpers:

- `task(...)`;
- `vocab(...)`;
- `mistake(...)`.

Mas o conteúdo de Vocabulary Review A2 usava:

```js
examples: [ex(...), ex(...), ex(...)]
```

Sem `function ex(...)` definido.

## Correção aplicada

Adicionado helper:

```js
function ex(english, translation = '', note = '') {
  return { english, translation, note };
}
```

## Resultado esperado

O app não deve mais quebrar no carregamento com `Can't find variable: ex`.

## Commit

- `03a25a4af4eae68fc184730ba9b4721100c752ca` — define helper ex em A2 reviews checkpoints.

## Status

Concluído.
