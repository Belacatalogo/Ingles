# HOTFIX-STATIC-COURSE-PROGRESS-RENDER-LAB

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir os erros encontrados no iPhone após a migração para curso fixo premium:

- Aba Progresso quebrando ao clicar em “Ver progresso”.
- Aba Aula mostrando “Aula padrão” / “Legado IA” sem conteúdo real.
- Painel Hoje mostrando próxima aula planejada como se fosse abrível.
- Erro seguro mostrando `null is not an object...` e botão de limpar dados não removendo o storage real.

## Causa principal

O app estava misturando dois fluxos:

1. Fluxo antigo/legado baseado em `curriculumPlan.js` e aulas geradas por IA.
2. Fluxo novo baseado no currículo fixo em `content/curriculum` + `curriculumEngine.js`.

Além disso, aulas `planned` podiam aparecer como próxima aula, mas não tinham conteúdo real nem `schemaVersion` fixo. Isso fazia a tela Aula cair em renderização padrão.

## Arquivos alterados

- `fluency-clean/src/services/lessonProgression.js`
- `fluency-clean/src/services/curriculumEngine.js`
- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`
- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/services/staticCourseLauncher.js`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/components/progress/PracticeProgressSummary.jsx`
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/components/system/ErrorBoundary.jsx`

## Correções aplicadas

### Curso fixo

- Criada verificação central `isStaticLessonReady()`.
- Aulas só são consideradas abríveis se:
  - `status === 'ready'`
  - `schemaVersion` começa com `static-lesson-schema`
- Aulas planejadas agora aparecem como planejadas/bloqueadas e não abrem como “Aula padrão”.

### Aula

- `staticCourseLauncher.js` salva a aula fixa completa diretamente no storage atual.
- `lessonStore.js` preserva payloads de aula fixa e não normaliza/remova campos do schema estático ao carregar.
- Isso evita que `StaticLessonRenderer` perca dados e caia em renderização genérica.

### Hoje / Curso

- `StaticNextLessonPanel` e `CourseScreen` agora mostram “aulas prontas” separadas do total do mapa.
- Botões foram ajustados para “Abrir próxima aula pronta” ou “Ver mapa do curso” quando a próxima aula ainda for planejada.

### Progresso

- `ProgressScreen.jsx` foi estabilizado para usar o fluxo estático novo.
- Removido uso direto do cronograma legado dentro da tela principal de progresso.
- Adicionados `safeArray`, `safeObject` e proteções contra dados nulos/antigos no storage.
- `PracticeProgressSummary.jsx` também foi blindado contra sessões nulas ou malformadas.

### Erro seguro

- `ErrorBoundary.jsx` agora limpa corretamente chaves `fluency.clean.` e `fluency:`.
- Antes ele só limpava `fluency:`, mas o storage real do app usa `fluency.clean.`.

## O que testar no iPhone

1. Abrir Hoje.
2. Clicar em “Ver progresso”.
3. Confirmar que Progresso não mostra mais tela de erro.
4. Em Hoje, clicar no painel do curso fixo.
5. Abrir o mapa do curso.
6. Confirmar que aulas planejadas não abrem como “Aula padrão”.
7. Abrir uma aula pronta.
8. Confirmar que a aba Aula mostra conteúdo real e não “Legado IA / Aula antiga sem ID”.
9. Se ainda aparecer erro seguro, tocar em “Limpar dados do preview”, pois agora ele limpa o storage correto.

## Observação

Este hotfix não mexeu em:

- `main`
- `rewrite-fluency-clean`
- `bundle.js`
- backend Azure privado
- Firebase/Azure produção
- sistema de gravação
- `speakingFlow.js`
- `SpeakingStepper.jsx`
- `SpeakingScreen.jsx`
