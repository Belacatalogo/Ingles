# BLOCO 11G — Launcher central da aula do dia

Branch: `rewrite-fluency-clean-lab`

## Motivo

Após definir que o aluno só deve clicar em `Começar aula`, havia lógica duplicada entre Home e CourseScreen para calcular/abrir a próxima aula.

Isso poderia gerar divergências futuras: uma tela abrir uma aula e outra se comportar diferente.

## Objetivo

Centralizar a abertura da aula do dia em um único serviço.

## Arquivos alterados

- `fluency-clean/src/services/staticCourseLauncher.js`
- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Função criada

### `openDailyStaticCourseLesson(level = 'A1')`

Responsável por:

1. buscar a próxima aula oficial via `getNextStaticLesson(level)`;
2. bloquear se não houver aula liberada;
3. bloquear se houver `lockReason`;
4. abrir a aula usando `openStaticCourseLesson()`;
5. salvar a aula atual;
6. retornar resultado padronizado.

## Mudanças em CourseScreen

Antes, CourseScreen calculava manualmente:

- próxima aula;
- lock reason;
- abertura via `openStaticCourseLesson()`.

Agora chama:

- `openDailyStaticCourseLesson(activeLevel)`

## Mudanças na Home

O painel `StaticNextLessonPanel` também passou a usar:

- `openDailyStaticCourseLesson('A1')`

## Resultado esperado

- Home e Curso abrem a aula do dia usando exatamente a mesma regra.
- Menos risco de divergência.
- O fluxo `Começar aula` fica centralizado e mais seguro.
- Aulas futuras continuam bloqueadas pelo launcher central.

## Commits

- `40cd4bda71ea9a712f0da9181fedd1a20fc03b94` — centraliza abertura da aula do dia.
- `8b4819b00320f2c75bd583ee1403d7051cfdfdeb` — CourseScreen usa launcher central.
- `90d53a84ac278d43a3567b649f477c2e6121fb3c` — Home usa launcher central.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - botão `Começar aula` da Home;
   - botão `Começar aula` do Curso;
   - ambos abrindo a mesma aula liberada;
   - bloqueio correto quando não houver aula liberada;
   - revisão de aulas concluídas continua funcionando.
