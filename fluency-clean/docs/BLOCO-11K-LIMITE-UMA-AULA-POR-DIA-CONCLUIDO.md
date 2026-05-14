# BLOCO 11K — Limite de uma aula por dia

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário definiu uma nova regra obrigatória:

> Só farei 1 aula por dia de segunda a sábado. Quando finalizar a aula, não deixe eu abrir outra.

Portanto, o botão `Começar aula` não deve liberar a próxima aula no mesmo dia depois que uma aula for concluída.

## Objetivo

Aplicar a trava diretamente no launcher central da aula do dia, para valer em todos os lugares que usam o fluxo automático:

- Home;
- CourseScreen;
- qualquer chamada futura a `openDailyStaticCourseLesson()`.

## Arquivo alterado

- `fluency-clean/src/services/staticCourseLauncher.js`

## Regras implementadas

### 1. Uma aula concluída por dia

O sistema verifica o histórico de conclusões em `progress.lessonCompletions` usando:

- `getLessonCompletions()`
- `localDateKey()`

Se já existe conclusão no dia atual, a próxima aula fica bloqueada com a mensagem:

> Você já concluiu a aula de hoje. A próxima aula libera no próximo dia de estudo.

### 2. Segunda a sábado

Domingo é tratado como descanso:

> Domingo é dia de descanso. A próxima aula libera de segunda a sábado.

### 3. Retomar aula em andamento continua permitido

Se a aula atual salva for a próxima aula liberada e ainda não estiver concluída, o aluno pode retomar para terminar a aula iniciada.

### 4. Revisão continua separada

Revisão de aula já concluída continua podendo abrir pelo fluxo de revisão, sem liberar aula nova.

## Funções adicionadas/ajustadas

- `getTodayLessonCompletion()`
- `getDailyStudyLockReason()`
- `getDailyStaticCourseLessonState()` agora inclui trava diária
- `canOpenStaticCourseLesson()` agora respeita limite diário, salvo quando `ignoreDailyLimit` for usado em revisão
- `openDailyStaticCourseLesson()` passa a respeitar a trava automaticamente

## Correção técnica

Após o primeiro commit, foi corrigida a constante `todayCompletion` dentro de `getDailyStaticCourseLessonState()`, evitando erro de referência no build.

## Commits

- `ec6415469152bb8080c6fcde93d0adea3341ec7d` — bloqueia mais de uma aula por dia.
- `e1f16498ce5fbe5daa63cd4f1c8ba9a18374f359` — declara conclusão do dia no launcher.

## Resultado esperado

Fluxo final:

1. Segunda a sábado:
   - se ainda não concluiu aula hoje: `Começar aula`/`Retomar aula` funciona;
   - se concluiu aula hoje: próxima aula bloqueada até o próximo dia de estudo.

2. Domingo:
   - aula nova bloqueada como descanso.

3. Revisão:
   - aulas concluídas continuam acessíveis pelo fluxo de revisão.
