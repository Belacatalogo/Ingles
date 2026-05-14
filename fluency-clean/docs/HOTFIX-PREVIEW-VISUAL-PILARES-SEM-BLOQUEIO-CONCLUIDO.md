# HOTFIX — Preview visual dos pilares sem bloquear pelo cronograma

Branch: `rewrite-fluency-clean-lab`

## Problema

Na tela de aula existe uma área de teste visual:

- Grammar fixo;
- Vocabulary fixo;
- Reading fixo;
- Listening fixo;
- Speaking fixo;
- Writing fixo.

Essa área serve apenas para verificar se a UI das abas/aulas está correta antes da aula real aparecer no dia definido.

Porém, ao clicar em alguns atalhos, o sistema mostrava:

> Essa aula ainda está bloqueada. Continue pela aula liberada no cronograma semanal.

Isso acontecia porque o preview visual usava o mesmo fluxo de abertura do curso guiado:

- `openStaticCourseLesson(...)`

Mesmo com `ignoreDailyLimit`, esse fluxo ainda respeitava bloqueios de sequência/cronograma.

## Decisão

A área de teste visual não deve contar como aula real.

Ela deve:

- abrir a aula/pilar para inspeção visual;
- não concluir aula;
- não marcar progresso;
- não liberar conteúdo real no fluxo guiado;
- não furar a regra de 1 aula por dia;
- não alterar o cronograma semanal real;
- não mostrar mensagem técnica na tela do aluno.

## Arquivo alterado

- `fluency-clean/src/screens/LessonScreen.jsx`

## Alteração feita

Foi removido o uso de `openStaticCourseLesson(...)` dentro dos atalhos visuais.

Agora o botão de preview cria uma aula temporária em memória com:

```js
buildVisualPreviewLesson(target, `lesson-pillar-visual-preview-${type}`)
```

E aplica essa aula diretamente em:

```js
setFullLesson(previewLesson)
setLoadedGenerationId(previewLesson.generationMeta.id)
```

## Resultado esperado

Ao clicar nos botões da área de teste visual:

- Grammar fixo;
- Vocabulary fixo;
- Reading fixo;
- Listening fixo;
- Speaking fixo;
- Writing fixo;

A aula deve abrir para preview da UI mesmo se não for o pilar/dia atual.

A mensagem esperada passa a ser algo como:

> Preview visual aberto: [nome da aula]. Isso não conta como aula feita e não altera o cronograma real.

## Segurança do cronograma

O hotfix não altera:

- `openDailyStaticCourseLesson`;
- `getDailyStaticCourseLessonState`;
- `canOpenStaticCourseLesson`;
- regras reais de bloqueio;
- conclusão de aula;
- marcação de aula aberta;
- progressão oficial.

O fluxo real continua protegido.

## Commit

- `1ee99a0ec4e529f82b52611a1022e90fc87e33af` — libera preview visual dos pilares sem progresso.
