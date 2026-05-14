# BLOCO 11I — Retomar aula em andamento

Branch: `rewrite-fluency-clean-lab`

## Motivo

Depois de centralizar o botão `Começar aula`, faltava diferenciar dois casos:

1. o aluno ainda não abriu a próxima aula liberada;
2. o aluno já abriu a aula, mas ainda não concluiu.

Nesses casos, o sistema deve mostrar `Começar aula` ou `Retomar aula` automaticamente, sem exigir escolha manual.

## Objetivo

Criar estado central para a aula do dia:

- `Começar aula` quando for uma aula nova;
- `Retomar aula` quando a aula atual salva for a próxima aula liberada e ainda não estiver concluída.

## Arquivos alterados

- `fluency-clean/src/services/staticCourseLauncher.js`
- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Função criada

### `getDailyStaticCourseLessonState(level = 'A1')`

Retorna:

- `lesson`
- `currentLesson`
- `canOpen`
- `shouldResume`
- `actionLabel`
- `statusLabel`
- `helperText`
- `reason`

## Regras

- Se a aula atual salva for a próxima aula liberada e ainda não estiver concluída:
  - botão vira `Retomar aula`;
  - status vira `Aula em andamento`;
  - texto explica que o aluno já começou aquela aula.

- Se não houver aula em andamento:
  - botão fica `Começar aula`;
  - status fica `Aula liberada`.

- Se houver bloqueio:
  - mostra `Próxima etapa bloqueada` e a razão humana.

## Mudanças em CourseScreen

CourseScreen agora usa:

- `getDailyStaticCourseLessonState(activeLevel)`

Para textos, card e botão principal.

## Mudanças na Home

StaticNextLessonPanel agora usa:

- `getDailyStaticCourseLessonState('A1')`

Para exibir `Começar aula` ou `Retomar aula`.

## Commits

- `eb4d264207c6974eb5f335b99aed7186f95e954f` — adiciona estado retomar aula do dia.
- `eefc99002d8603bcaac0a798c2be7740aef5a6cb` — CourseScreen usa estado retomar aula.
- `3c6ce2db6999f65fb634b92ab9e0668e8a88087d` — Home mostra retomar aula quando aplicável.

## Resultado esperado

O aluno não precisa pensar:

- se ainda não começou, clica `Começar aula`;
- se já começou e saiu no meio, clica `Retomar aula`;
- em ambos os casos, o sistema abre a aula correta.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - sem aula atual: botão `Começar aula`;
   - aula atual salva e não concluída: botão `Retomar aula`;
   - aula concluída: próxima aula volta para `Começar aula`;
   - Home e Curso mostram o mesmo estado.
