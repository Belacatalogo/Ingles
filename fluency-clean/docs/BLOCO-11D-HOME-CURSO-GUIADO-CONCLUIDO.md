# BLOCO 11D — Home alinhada ao curso guiado

Branch: `rewrite-fluency-clean-lab`

## Motivo

Após proteger o mapa do curso, ainda havia uma inconsistência de linguagem na Home: textos como `Aulas prontas no mapa` e `Abrir próxima aula pronta` podiam passar a ideia de biblioteca aberta.

O curso deve ser guiado. Conteúdo pode estar preparado no sistema, mas o aluno só deve abrir a próxima aula liberada.

## Arquivo alterado

- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Mudanças feitas

Textos ajustados:

- `Curso fixo premium` → `Curso guiado premium`
- `Aulas prontas no mapa` → `Conteúdo preparado`
- `Próxima aula pronta` → `Próxima aula liberada`
- `Abrir próxima aula pronta` → `Continuar curso`

Texto de orientação atualizado:

> Conteúdos preparados podem existir no sistema, mas só a próxima aula liberada pode ser aberta. Para liberar A2, conclua aulas, avaliações, prova final e revisões de Speaking/Writing.

## Regra reforçada

A Home agora comunica corretamente:

- existe conteúdo preparado;
- isso não significa acesso livre;
- o aluno deve continuar pela próxima aula liberada;
- A2 continua bloqueado por avaliações e domínio real.

## Commit

- `3a34e65d1379d52fca849704d5867c41e5cb59d7` — ajusta textos da Home para curso guiado.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar visualmente Home + CourseScreen.
3. Se estiver tudo certo, continuar para próximo bloco de progressão ou conteúdo.
