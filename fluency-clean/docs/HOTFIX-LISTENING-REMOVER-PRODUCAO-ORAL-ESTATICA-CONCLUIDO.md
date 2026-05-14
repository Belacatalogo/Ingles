# HOTFIX — Listening: remover produção oral estática antiga

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído.

## Problema observado

Mesmo após adicionar o componente praticável de mini diálogo, a aula ainda mostrava a seção antiga:

```txt
Produção oral curta
Grave ou fale um mini diálogo...
```

Essa seção antiga vinha de dentro do `StaticLessonRenderer.jsx` e não tinha campo para escrever nem botão para falar.

## Correção aplicada

Em vez de mexer diretamente no renderizador gigante, o normalizador visual da aula Listening passou a:

1. preservar o prompt da produção oral em `oralProductionPrompt`;
2. limpar `oralProduction` para `null` antes da aula chegar ao renderizador antigo;
3. permitir que apenas o componente novo `ListeningMiniDialoguePractice` renderize a prática real.

## Arquivos alterados

- `fluency-clean/src/services/staticLessonDisplayNormalizer.js`
- `fluency-clean/src/components/lesson/ListeningMiniDialoguePractice.jsx`

## Resultado esperado

A seção antiga não deve mais aparecer.

A seção correta deve aparecer como:

```txt
Mini diálogo
Fale ou escreva sua resposta
```

Com:

- campo para escrever;
- botão `Falar resposta`;
- botão `Salvar tentativa`;
- prompt da tarefa preservado.

## Observação

Se a seção antiga ainda aparecer no iPhone, é cache/deploy antigo. Atualize a página depois do deploy `READY`.
