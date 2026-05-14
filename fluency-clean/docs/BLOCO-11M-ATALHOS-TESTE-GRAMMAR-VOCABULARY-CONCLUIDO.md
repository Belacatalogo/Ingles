# BLOCO 11M — Atalhos de teste para Grammar e Vocabulary

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário esclareceu que não queria uma aba de Vocabulary no fluxo real da aula do dia.

O que estava faltando era a opção Vocabulary na sessão já existente de teste/preview visual, usada para ver como cada tela de aula fica antes da liberação real pelo cronograma.

## Arquivo alterado

- `fluency-clean/src/screens/LessonScreen.jsx`

## Mudanças feitas

A sessão `Atalhos do curso fixo` agora inclui:

- Aula real
- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing

Antes existiam apenas:

- Aula real
- Reading
- Listening
- Speaking
- Writing

## Regras preservadas

Esses atalhos são apenas para teste visual de UI.

Eles não mudam a regra real do curso:

- `Começar aula` continua respeitando o cronograma semanal;
- Vocabulary real continua liberando na terça-feira;
- Grammar real continua liberando na segunda-feira;
- aula nova continua limitada a uma por dia;
- domingo continua descanso.

## Ajuste importante

Os atalhos de teste visual agora chamam:

```js
openStaticCourseLesson(target, {
  source: `lesson-pillar-shortcut-${type}`,
  ignoreDailyLimit: true,
})
```

Isso permite testar a UI sem bloquear pelo limite diário, mas continua usando aula fixa real pronta quando existir.

## Texto ajustado na UI

A descrição da área agora deixa claro:

> Área de teste visual. Não altera a regra real de aula do dia.

## Commit

- `0b5c0e1f72b1e50001bc2dbe007b008f3c45c3d6` — adiciona Grammar e Vocabulary nos atalhos de teste.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar na tela de aula:
   - botão Grammar aparece;
   - botão Vocabulary aparece;
   - clicar em Vocabulary tenta abrir primeira aula fixa pronta de Vocabulary;
   - se ainda não houver aula pronta, mostra mensagem humana;
   - fluxo real do curso guiado permanece intacto.
