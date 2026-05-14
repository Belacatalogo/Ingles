# BLOCO 11J — Validador Começar/Retomar aula

Branch: `rewrite-fluency-clean-lab`

## Motivo

Após o BLOCO 11I, o sistema passou a alternar automaticamente entre:

- `Começar aula`
- `Retomar aula`

Era necessário validar esse comportamento para evitar regressões futuras.

## Objetivo

Expandir o validador de acesso guiado para também verificar estados da aula do dia.

## Arquivo alterado

- `fluency-clean/src/content/validators/validateGuidedCourseAccess.js`

## Função criada

### `validateDailyLessonState(level = 'A1')`

Ela simula três cenários:

1. Sem aula atual em andamento:
   - esperado: `Começar aula`.

2. Aula atual salva igual à próxima aula liberada e ainda não concluída:
   - esperado: `Retomar aula`.

3. Após concluir a primeira aula:
   - esperado: próxima aula diferente;
   - botão volta para `Começar aula`.

## Integração

`validateGuidedCourseAccess(level)` agora inclui:

- `dailyStateReport`

E considera esse relatório no campo final:

- `approved`
- `issues`

## Códigos de erro adicionados

- `daily.start.label`
- `daily.resume.label`
- `daily.resume.state`
- `daily.after-complete.same-lesson`
- `daily.after-complete.label`

## Resultado esperado

O sistema agora valida automaticamente que:

- aluno sem aula em andamento vê `Começar aula`;
- aluno com aula em andamento vê `Retomar aula`;
- após concluir, a próxima aula aparece como nova aula;
- o fluxo segue guiado e sem seleção manual.

## Commit

- `187258385e56222c0bc0c681f0bd51783f81b361` — valida estados começar e retomar aula.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - Começar aula sem aula atual;
   - Retomar aula com aula atual salva;
   - concluir aula e confirmar próxima aula;
   - Home e Curso mostrando o mesmo estado.
