# HOTFIX — Curso guiado e bloqueio de aulas futuras

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário corrigiu uma premissa importante: o curso não deve funcionar como biblioteca aberta. Mesmo que uma aula profunda já esteja implementada no código, o aluno não pode acessar conteúdos futuros/avançados fora da progressão guiada.

## Problema identificado

Após o BLOCO 11A, as aulas A1.3 foram criadas e conectadas ao currículo fixo. Porém, havia dois riscos:

1. O serviço central `openStaticCourseLesson()` abria qualquer aula `ready` com pré-requisitos internos satisfeitos.
2. A tela do curso podia listar títulos de aulas futuras, expondo conteúdo que o aluno ainda não deveria ver.

Além disso, pré-requisito dentro do mesmo pilar não basta para curso guiado, porque a primeira aula pronta de outro pilar poderia ficar acessível antes da sequência oficial.

## Correções feitas

### 1. Bloqueio central no launcher

Arquivo alterado:

- `fluency-clean/src/services/staticCourseLauncher.js`

Nova regra:

- Uma aula fixa só pode abrir se:
  - estiver `ready`;
  - tiver schema fixo válido;
  - não estiver bloqueada por pré-requisitos;
  - for uma aula já concluída, para revisão; **ou**
  - for exatamente a próxima aula oficial retornada por `getNextStaticLesson(level)`.

Mensagem humana quando tentar furar sequência:

> Essa aula ainda está bloqueada. Continue pela próxima aula liberada.

### 2. Tela do curso não expõe títulos futuros

Arquivo alterado:

- `fluency-clean/src/screens/CourseScreen.jsx`

Nova regra visual:

- Aula concluída: pode mostrar título e permitir revisão.
- Próxima aula oficial: pode mostrar título e abrir.
- Aula futura: mostra `Aula futura bloqueada`, sem revelar o título/conteúdo.
- Clique em aula futura mostra mensagem humana e não abre.

Também foi ajustado o texto da tela para reforçar:

- `Curso guiado`
- `Continuar curso`
- `avance em ordem`

## Commits relacionados

- `0ba54b15d6302f596b2b4c9d189a0459b83d929f` — primeiro bloqueio por progressão/pré-requisitos no launcher.
- `2d0b34527c20e7158f672cc39658479e653d13af` — oculta aulas futuras na tela do curso.
- `f17d47659b23b094b9be757fc0d545d0a44376b2` — restringe abertura central à próxima aula oficial ou revisão de aula concluída.

## Resultado esperado

- O aluno não consegue abrir A1.3 apenas porque ela existe no código.
- A1.3 fica preparada para quando a progressão chegar nela.
- O mapa deixa de funcionar como biblioteca aberta.
- Conteúdo futuro não aparece com título/tema antes da liberação.
- A validação visual deve testar com usuário sem progresso e com progresso parcial.

## Próximos passos

1. Verificar deploy Vercel desses commits.
2. Validar no app:
   - sem progresso, só a primeira próxima aula abre;
   - aulas futuras mostram bloqueio genérico;
   - títulos futuros não aparecem;
   - aulas concluídas podem ser reabertas para revisão;
   - botão `Continuar curso` abre apenas a próxima aula oficial.
