# BLOCO 11H — Abertura automática centralizada

Branch: `rewrite-fluency-clean-lab`

## Gatilho

O usuário definiu que, a partir de agora, sempre que disser `ok`, deve ser iniciado automaticamente o próximo bloco lógico.

## Objetivo

Reforçar a regra principal do curso guiado:

- o aluno não escolhe aula manualmente;
- o aluno clica em `Começar aula`;
- Home e Curso usam a mesma regra central;
- a próxima aula liberada é aberta automaticamente;
- aulas futuras continuam bloqueadas.

## Arquivos alterados

- `fluency-clean/src/services/staticCourseLauncher.js`
- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Mudanças feitas

### 1. Serviço central

Foi criada a função:

```js
openDailyStaticCourseLesson(level = 'A1')
```

Ela centraliza:

1. busca da próxima aula oficial;
2. bloqueio quando não há aula liberada;
3. bloqueio por `lockReason`;
4. abertura segura da aula;
5. retorno padronizado.

### 2. CourseScreen

Antes o CourseScreen calculava manualmente a próxima aula e chamava `openStaticCourseLesson()` diretamente.

Agora usa:

```js
openDailyStaticCourseLesson(activeLevel)
```

### 3. Home

O `StaticNextLessonPanel` também passou a usar:

```js
openDailyStaticCourseLesson('A1')
```

## Resultado esperado

- Botão `Começar aula` da Home e do Curso seguem a mesma regra.
- Menor risco de divergência futura.
- O sistema mantém o comportamento de “aula do dia automática”.
- Conteúdos preparados não viram acesso livre.

## Commits

- `40cd4bda71ea9a712f0da9181fedd1a20fc03b94` — cria launcher central da aula do dia.
- `8b4819b00320f2c75bd583ee1403d7051cfdfdeb` — CourseScreen usa launcher central.
- `90d53a84ac278d43a3567b649f477c2e6121fb3c` — Home usa launcher central.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - Home > Começar aula;
   - Curso > Começar aula;
   - ambos abrem a mesma aula;
   - revisão de concluídas continua separada;
   - aulas futuras continuam bloqueadas.
