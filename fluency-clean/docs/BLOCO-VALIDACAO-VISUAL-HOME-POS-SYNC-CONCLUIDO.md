# BLOCO — Validação visual pós-sync da Home

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial e limpeza de UX do resumo da Home.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-HOME-COURSE-SUMMARY-A1-GATE-SYNC-CONCLUIDO.md`

## Objetivo

Validar a Home depois da sincronização com os critérios do A1 e limpar textos técnicos visíveis ao aluno.

## Arquivo alterado

`fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Ajustes feitos

### 1. Removido termo técnico da UI

Antes aparecia linguagem como:

- `A1 Gate`
- `Final Exam`

Agora a Home usa linguagem mais humana:

- `Ver critérios do A1`
- `prova final do A1`
- `Aulas concluídas. Veja o que falta para liberar o A2`

### 2. Mantida separação correta do progresso

A Home continua separando:

- `Aulas prontas no mapa`
- `Aulas concluídas`

Isso evita confundir conteúdo implementado com progresso real do aluno.

### 3. Reforço pedagógico limpo

O texto final agora diz:

```txt
“Aulas prontas no mapa” mostra o conteúdo já implementado. Para liberar A2, conclua as aulas, avaliações, prova final e revisões de Speaking/Writing.
```

Sem citar detalhes técnicos de schema, storage, gate interno ou implementação.

## Regra de UX aplicada

A tela do aluno deve responder:

- o que já existe no curso;
- o que eu já concluí;
- qual é meu próximo passo;
- o que falta para liberar o A2.

Informações técnicas continuam somente em docs/handoff/diagnóstico.

## Economia de deploys

Este bloco tentou seguir a nova regra de economia de deploys.

Resultado:

- 1 commit de código;
- 1 commit de documentação.

Motivo de 2 commits:

- a ferramenta de GitHub disponível cria/atualiza arquivos individualmente por chamada;
- código e documentação foram mantidos separados para reduzir risco.

## Próximo bloco recomendado

## Validar A1 Mastery Gate UI no CourseScreen

Objetivo:

- revisar textos do painel do A1 no mapa do curso;
- remover termos técnicos restantes;
- garantir que a UI fala com o aluno, não com desenvolvedor;
- confirmar que o painel aparece apenas no A1;
- preparar o próximo bloco de bloqueio funcional do A2.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-HOME-POS-SYNC-CONCLUIDO.md

Próximo bloco: Validar A1 Mastery Gate UI no CourseScreen.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
