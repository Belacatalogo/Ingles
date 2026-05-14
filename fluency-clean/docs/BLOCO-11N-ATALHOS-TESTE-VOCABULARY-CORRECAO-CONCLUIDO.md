# BLOCO 11N — Correção do atalho Vocabulary na área de teste

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário esclareceu que já existe uma sessão de teste/preview na tela de aula, onde é possível clicar para visualizar telas de cada tipo de aula antes da liberação real pelo cronograma.

O problema real era que essa sessão não mostrava a opção `Vocabulary`.

## Correção feita

Arquivo alterado:

- `fluency-clean/src/screens/LessonScreen.jsx`

A lista `pillarOptions` agora inclui:

- Aula real
- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing

## Importante

Essa correção não cria uma aba nova no fluxo real do curso.

O fluxo oficial continua sendo:

- botão `Começar aula`;
- escolha automática pelo cronograma semanal;
- 1 aula por dia;
- domingo descanso.

A seção alterada é apenas para teste visual de UI.

## Ajuste de segurança para teste

Os atalhos de teste visual usam:

```js
ignoreDailyLimit: true
```

Isso permite visualizar a UI de cada pilar sem quebrar a regra real da aula do dia.

## Resultado esperado

Na tela de aula, dentro da sessão de teste/preview, agora deve aparecer a opção:

- `Abrir Vocabulary fixo`

Se ainda não houver aula Vocabulary pronta conectada, o sistema deve mostrar mensagem humana informando que aquele pilar ainda não tem aula fixa pronta.

## Commit

- `0b5c0e1f72b1e50001bc2dbe007b008f3c45c3d6` — adiciona Grammar e Vocabulary nos atalhos de teste.
