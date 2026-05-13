# BLOCO — Home Course Summary + A1 Gate Sync

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como correção inicial do card da Home/resumo do curso fixo.

## Contexto

O usuário enviou screenshot mostrando:

```txt
Aulas prontas
119/119

Próxima aula pronta: A1 · Grammar · Subject pronouns
```

Isso gerou dúvida porque parecia que 119/119 significava aulas concluídas.

## Diagnóstico

No componente:

`fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

O card exibia:

```jsx
summary.readyTotal / summary.total
```

Portanto, `119/119` significava:

> aulas prontas no mapa / total de aulas no mapa

Não significava:

> aulas concluídas pelo aluno / aulas prontas

## Correção aplicada

Arquivo alterado:

`fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

Mudanças:

1. Importado `getA1MasteryGateSummary()`.
2. Separado visualmente:
   - `Aulas prontas no mapa` → `readyTotal/total`
   - `Aulas concluídas` → `readyCompleted/readyTotal`
3. Se `readyCompleted >= readyTotal`, a Home deixa de sugerir uma próxima aula antiga como se ainda houvesse aula pendente.
4. Nessa situação, a Home aponta para:
   - `Ver A1 Mastery Gate`
   - `Próximo passo: A1 Final Exam`
   - ou `A2 liberado`, dependendo do gate.
5. Adicionada nota explicativa:

```txt
“Aulas prontas no mapa” mostra conteúdo implementado. Para liberar A2, precisa concluir aulas, checkpoints, Final Exam e revisão de Speaking/Writing.
```

## Resultado esperado

A Home agora deve mostrar com mais clareza:

- quantas aulas estão implementadas no mapa;
- quantas aulas foram concluídas;
- quando deve ir para o A1 Gate/Final Exam;
- que A2 não libera só por assistir aulas.

## Observação importante

Este bloco corrige o rótulo e o comportamento inicial da Home.

Ainda pode ser necessário validar no preview se:

- `readyCompleted` está lendo corretamente o progresso local;
- o botão leva ao CourseScreen;
- o painel A1 Gate aparece no CourseScreen;
- o cache do navegador não está segurando UI antiga.

## Próximo bloco recomendado

## BLOCO — Validação visual pós-sync da Home

Critérios:

- abrir Home no iPhone;
- confirmar que aparece `Aulas prontas no mapa`;
- confirmar que aparece `Aulas concluídas`;
- se tudo estiver concluído, não mostrar `Subject pronouns` como próxima aula;
- confirmar botão `Ver A1 Mastery Gate`;
- entrar no mapa e validar painel.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/BLOCO-A1-MASTERY-GATE-UI-CONCLUIDO.md e fluency-clean/docs/BLOCO-HOME-COURSE-SUMMARY-A1-GATE-SYNC-CONCLUIDO.md.
Foi corrigida a Home para separar aulas prontas no mapa de aulas concluídas e sincronizar com o A1 Mastery Gate. Próximo passo: validar visual no iPhone e depois conectar bloqueio funcional de A2 e tela real do A1 Final Exam.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
```
