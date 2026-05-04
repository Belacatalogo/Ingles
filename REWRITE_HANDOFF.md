# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Não mexer no Firebase/Azure de produção sem instrução explícita.
- Não mexer no sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` durante blocos de Practice/iPhone audit.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## DIRETRIZ DE UI — NÃO POLUIR A AULA

- Regras internas, contrato JSON, política pedagógica, diagnóstico técnico e detalhes de implementação não devem aparecer como cards grandes dentro da aula.
- A aula deve mostrar apenas o que ajuda o aluno a estudar.
- Informações técnicas devem ficar no código, handoff, docs ou diagnóstico apropriado.
- Quando for necessário mostrar segurança/estado, usar texto curto e discreto.

## ESTADO GERAL

### Reading

- Reading é aula completa dentro da própria aba.
- A Prática Profunda é complemento posterior, não substitui exercícios internos.
- `ReadingLesson.jsx` renderiza por etapas com stepper.
- `readingLevelPolicy.js`, `readingJsonContract.js` e `readingQualityGate.js` estão implementados.
- Gabaritos internos ficam ocultos antes da interação.
- Quality gate de Reading normaliza texto, perguntas, evidências e produção curta.
- `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` fica pendente apenas quando for possível alterar `ReadingLesson.jsx` completo com segurança.

### Grammar / Listening / Speaking / Writing

- Stepper real de Reading foi aprovado e portado para Grammar, Listening e Speaking.
- Grammar deve continuar sério, claro e guiado; não virar jogo.
- Listening deve manter primeira escuta sem leitura e controles de áudio limpos.
- Speaking deve preservar Azure, gravação, análise, histórico e modos reais.
- Refatorações de Practice C/D/E/F já foram implementadas tecnicamente.

### Prática Profunda — Fases A–G

Implementadas tecnicamente:

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB.md`
- `BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB.md`
- `BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB.md`
- `BLOCO-A4-PRACTICE-CORE-4-SRS-EXTENDED-LAB.md`
- `BLOCO-A5-PRACTICE-CORE-5-MASTERY-TAGS-LAB.md`
- `BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB.md`
- `BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB.md`
- `BLOCO-B3-READING-PRACTICE-3-EVIDENCE-LAYERED-LAB.md`
- `BLOCO-B4-READING-PRACTICE-4-NEW-CONTEXT-LAB.md`
- `BLOCO-B5-READING-PRACTICE-5-SUMMARY-CLOZE-LAB.md`
- `BLOCO-G1-PRACTICE-TELEMETRY-LAB.md`
- `BLOCO-G2-PRACTICE-A11Y-AUDIT-LAB.md`
- `BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB.md`

## AI TEACHER REVIEWER / CONTEXTO / CURRÍCULO

### `BLOCO-H1-AI-TEACHER-REVIEWER-LAB` — IMPLEMENTADO TECNICAMENTE

- Prompts de revisão IA por tipo: Grammar, Listening, Reading, Writing e Speaking.
- Revisor IA usando Gemini Flash, com resumo econômico da aula.
- Fallback aprovado se review falhar, sem bloquear o aluno.
- Regeneração automática limitada a 1 tentativa quando score < 78 ou houver `criticalIssues`.
- Merge do revisor mecânico com IA: 40% mecânico + 60% IA.
- `quality.aiReview` anexado na aula final do fallback resiliente.

### `BLOCO-H2-LESSON-HISTORY-CONTEXT-LAB` — IMPLEMENTADO TECNICAMENTE

Documentação:
- `fluency-clean/docs/BLOCO-H2-LESSON-HISTORY-CONTEXT-LAB.md`

Arquivos criados/alterados:
- `fluency-clean/src/services/lessonHistoryContext.js`
- `fluency-clean/src/services/lessonJsonContract.js`
- `fluency-clean/src/services/index.js`
- `fluency-clean/src/services/resilientGeminiLessonDraft.js`

O que foi fechado:
- Contexto histórico do aluno baseado em SRS, Mastery Tags e Telemetry.
- Limite de 400 caracteres no prompt.
- Retorno vazio para aluno novo/sem histórico relevante.
- Leitura de histórico protegida por `try/catch`.
- Log `[LessonHistoryContext] suggestedFocus: "..."` quando há foco sugerido.
- Injeção apenas no bloco `structure` do gerador principal em blocos, via `lessonJsonContract.js`.
- Contexto histórico também aplicado ao fallback resiliente em `resilientGeminiLessonDraft.js`.
- Fallback resiliente marca `planContract: resilient-json-v1+history-context` e `quality.historyContextApplied = true`.
- Sem forçar tópico e sem dados pessoais no prompt.

### `BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB` — IMPLEMENTADO TECNICAMENTE

Documentação:
- `fluency-clean/docs/BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB.md`

Arquivos criados:
- `fluency-clean/src/services/curriculumPracticeAdapter.js`

Arquivos alterados:
- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/PracticeLauncher.jsx`
- `fluency-clean/src/practice/core/builders/grammarBuilder.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/services/index.js`
- `REWRITE_HANDOFF.md`

O que foi fechado:
- Adaptador curricular local com storage `curriculum.currentUnit.v1`.
- Expiração da unidade atual após 12 horas.
- Extração de keywords do título, foco, grammarFocus/focusArea e vocabulário da aula.
- Registro da unidade/aula atual ao abrir `LessonScreen.jsx`.
- Registro novamente ao clicar em `Começar prática` no `PracticeLauncher.jsx`.
- `normalizeLessonForPractice` agora popula `context.curriculum` com `buildCurriculumContextForBuilder(getCurrentCurriculumUnit())`.
- Builder de Grammar prioriza frases relevantes ao tópico curricular via `context.curriculum.isTopicRelevant`, sem excluir frases fora do tópico.
- Exports públicos adicionados em `services/index.js`.

Preservado sem alteração:
- `bundle.js`;
- `main`;
- `rewrite-fluency-clean`;
- backend Azure privado;
- Firebase/Azure de produção;
- sistema de gravação;
- `speakingFlow.js`;
- `SpeakingStepper.jsx`;
- `SpeakingScreen.jsx`.

## ÚLTIMO BLOCO FECHADO — H3 CURRICULUM PRACTICE BRIDGE

### Smoke test manual pendente no iPhone/preview

1. Abrir uma aula Grammar de rotina/Present Simple.
2. Iniciar Prática Profunda.
3. Confirmar que exercícios priorizam frases/vocabulário do tópico da aula.
4. Confirmar que aluno sem unidade curricular explícita ainda recebe contexto a partir da própria aula.
5. Confirmar que, após 12h, `getCurrentCurriculumUnit()` retorna `null`.
6. Confirmar que a prática continua funcionando normalmente sem contexto curricular.

## ALERTA IMPORTANTE — VOCAB/TRILHA

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente `Trilha de vocabulário` de `Flashcards da aula`.

## ORDEM DEFINIDA PARA PRÓXIMOS PASSOS

1. Aguardar deploy do preview da branch `rewrite-fluency-clean-lab`.
2. Executar smoke test manual do H3 no preview/iPhone.
3. Se aprovado, seguir para `BLOCO-H4-CSS-CONSOLIDATION-LAB` ou bloco explicitamente enviado pelo usuário.
4. `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` continua pendente.
5. `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` apenas quando for possível alterar `ReadingLesson.jsx` completo com segurança.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 agora.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não remover o preview temporário até o usuário aprovar ou pedir remoção.
- Não iniciar novos blocos antes do smoke test manual, salvo instrução explícita.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch obrigatória é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Firebase, Azure, sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`. O último bloco fechado tecnicamente foi `BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB`. Código e docs foram concluídos, mas o smoke test manual no preview/iPhone está pendente. Próximo recomendado: `BLOCO-H4-CSS-CONSOLIDATION-LAB`, salvo se o usuário enviar outro bloco."
