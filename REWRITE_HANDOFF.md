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

- Contexto histórico do aluno baseado em SRS, Mastery Tags e Telemetry.
- Injeção no gerador principal em blocos via `lessonJsonContract.js`.
- Contexto histórico também aplicado ao fallback resiliente em `resilientGeminiLessonDraft.js`.
- Fallback resiliente marca `planContract: resilient-json-v1+history-context` e `quality.historyContextApplied = true`.

### `BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB` — IMPLEMENTADO TECNICAMENTE

- Adaptador curricular local com storage `curriculum.currentUnit.v1`.
- Expiração da unidade atual após 12 horas.
- Registro da unidade/aula atual ao abrir `LessonScreen.jsx` e ao clicar em `Começar prática`.
- `normalizeLessonForPractice` popula `context.curriculum`.
- Builder de Grammar prioriza frases relevantes ao tópico curricular via `context.curriculum.isTopicRelevant`, sem excluir frases fora do tópico.

### `BLOCO-H4-CSS-CONSOLIDATION-LAB` — STAGE SEGURO IMPLEMENTADO TECNICAMENTE

Documentação:
- `fluency-clean/docs/BLOCO-H4-CSS-CONSOLIDATION-LAB.md`

Arquivos criados:
- `fluency-clean/src/styles/base.css`
- `fluency-clean/src/styles/practice.css`
- `fluency-clean/src/styles/flashcards.css`
- `fluency-clean/src/styles/screens.css`
- `fluency-clean/docs/BLOCO-H4-CSS-CONSOLIDATION-LAB.md`

Arquivo temático já existente usado:
- `fluency-clean/src/styles/lessons.css`

Arquivos alterados:
- `fluency-clean/src/main.jsx`
- `fluency-clean/src/styles/base.css`
- `fluency-clean/src/styles/practice.css`
- `fluency-clean/src/styles/flashcards.css`
- `fluency-clean/src/styles/screens.css`
- `REWRITE_HANDOFF.md`

O que foi fechado:
- `main.jsx` agora importa apenas 5 arquivos CSS:
  - `base.css`
  - `lessons.css`
  - `practice.css`
  - `flashcards.css`
  - `screens.css`
- Arquivos antigos continuam como fontes internas carregadas por `@import` nos agregadores.
- Comentários `/* de: arquivo.css */` foram adicionados para rastreabilidade.
- Nenhuma regra CSS antiga foi alterada manualmente.
- Nenhum arquivo CSS antigo foi deletado ainda.

Pendência intencional de segurança:
- Remover fisicamente os arquivos CSS antigos só depois de smoke test visual no iPhone.
- O bloco original pedia deleção total, mas isso foi adiado para evitar perda visual sem teste.

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

## ÚLTIMO BLOCO FECHADO — H4 CSS CONSOLIDATION STAGE SEGURO

### Smoke test manual pendente no iPhone/preview

1. Abrir Today.
2. Abrir Lesson.
3. Abrir Practice.
4. Abrir Flashcards.
5. Abrir Progress.
6. Abrir Speaking e conferir tela de gravação.
7. Abrir Grammar e conferir stepper.
8. Abrir Listening e conferir UX de áudio.

Após aprovação visual:
- Copiar fisicamente o conteúdo dos CSS antigos para os 5 arquivos temáticos.
- Manter comentários `/* de: nome-original.css */`.
- Deletar arquivos antigos.
- Manter `main.jsx` com os mesmos 5 imports.

## ALERTA IMPORTANTE — VOCAB/TRILHA

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente `Trilha de vocabulário` de `Flashcards da aula`.

## ORDEM DEFINIDA PARA PRÓXIMOS PASSOS

1. Aguardar deploy do preview da branch `rewrite-fluency-clean-lab`.
2. Executar smoke test manual do H4 no preview/iPhone.
3. Se visual estiver idêntico, fazer etapa final de deleção física dos CSS antigos.
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

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch obrigatória é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Firebase, Azure, sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`. O último bloco fechado tecnicamente foi `BLOCO-H4-CSS-CONSOLIDATION-LAB` em stage seguro: `main.jsx` importa apenas 5 CSS temáticos, mas os CSS antigos continuam como fontes internas por `@import`. Smoke test visual no preview/iPhone está pendente antes de deletar fisicamente os arquivos antigos."
