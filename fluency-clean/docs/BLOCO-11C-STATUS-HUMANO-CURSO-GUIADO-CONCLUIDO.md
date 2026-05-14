# BLOCO 11C — Status humano do curso guiado

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Integrar o validador de acesso guiado à tela do curso sem expor detalhes técnicos para o aluno.

O aluno deve ver apenas informações úteis e humanas, como:

- `Curso guiado`
- `sequência protegida`
- `sequência em revisão`
- `Continuar curso`
- mensagens claras de bloqueio

Detalhes técnicos como nomes de validadores, cenários, códigos de erro e IDs internos continuam apenas em docs/código.

## Arquivo alterado

- `fluency-clean/src/screens/CourseScreen.jsx`

## O que mudou

A tela do curso agora importa e usa internamente:

- `validateGuidedCourseAccess(activeLevel)`

O resultado é convertido para linguagem humana:

- se aprovado: `sequência protegida`;
- se houver problema: `sequência em revisão`.

O botão `Ver status` agora mostra uma mensagem humana:

- `Curso validado e sequência protegida.`
- ou `Sequência protegida. Conteúdo pedagógico ainda está em revisão interna.`
- ou `A sequência do curso está em revisão. Continue apenas pela próxima aula liberada.`

## Regras mantidas

- Aulas futuras continuam ocultas como `Aula futura bloqueada`.
- Somente próxima aula oficial pode abrir.
- Aulas concluídas podem abrir para revisão.
- A2 continua bloqueado até critérios do A1.
- Nenhum detalhe técnico foi adicionado na tela do aluno.

## Resultado esperado

A tela do curso passa a comunicar que a sequência está protegida, sem transformar a tela em painel técnico.

## Commit

- `50397ec631a45c3792fe3f8df0c01043c0acbac1` — integra status humano do curso guiado.

## Próximos passos recomendados

1. Verificar deploy Vercel.
2. Validar visualmente no app:
   - chip `sequência protegida`;
   - botão `Ver status` com mensagem humana;
   - aulas futuras sem título real;
   - botão `Continuar curso` abrindo somente a próxima aula.
3. Se estiver tudo certo, seguir para próximo bloco de UX/progressão ou retomada controlada de conteúdo.
