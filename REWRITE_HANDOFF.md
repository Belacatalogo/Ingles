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

## DIRETRIZ DE UI APROVADA — STEPPER REAL

- O stepper real da Reading foi aprovado visualmente pelo usuário.
- O padrão foi portado para Grammar, Listening e Speaking.
- A adaptação deve respeitar a natureza de cada aula.
- Grammar não deve virar jogo; deve ser sério, claro e guiado.
- Listening deve manter primeira escuta sem leitura e controles de áudio limpos.
- Speaking deve preservar Azure, gravação, análise, histórico e modos reais.

## ESTADO ATUAL — READING

### Blocos Reading implementados

- `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB`
- `BLOCO-READING-1-ESTRUTURA-PEDAGOGICA-FIXA-LAB`
- `BLOCO-READING-2-POLITICA-POR-NIVEL-A1-C1-LAB`
- `HOTFIX-READING-2 — Remover poluição técnica da aula`
- `BLOCO-READING-3-CONTRATO-JSON-PROPRIO-LAB`
- `BLOCO-READING-4-GERACAO-POR-HABILIDADE-LAB`
- `BLOCO-READING-5-RENDER-POR-ETAPAS-LAB`
- `BLOCO-READING-6-EXERCICIOS-INTERNOS-LAB`
- `HOTFIX-READING-6 — Não revelar gabarito dos exercícios internos`
- `BLOCO-READING-7-EVIDENCIA-TEXTUAL-INTELIGENTE-LAB` — implementação inicial segura.
- `BLOCO-READING-8-QUALITY-GATE-LAB`

### Estado Reading

- Reading é aula completa dentro da própria aba.
- A Prática Profunda é complemento posterior, não substitui exercícios internos.
- `ReadingLesson.jsx` renderiza por etapas com stepper.
- `readingLevelPolicy.js`, `readingJsonContract.js` e `readingQualityGate.js` estão implementados.
- Gabaritos internos ficam ocultos antes da interação.
- Quality gate de Reading normaliza texto, perguntas, evidências e produção curta.

### Pendente Reading

- Validar no iPhone depois do quality gate.
- `HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB` apenas quando for possível alterar `ReadingLesson.jsx` completo com segurança.

## ESTADO ATUAL — GRAMMAR

### `BLOCO-GRAMMAR-STEPPER-REAL-LAB` — IMPLEMENTADO

- Stepper real portado para `GrammarLesson.jsx`.
- Fluxo com 7 etapas: começar, regra, exemplos, prática, correção, produção e concluir.
- Mantido render seguro atual de Grammar.
- CSS compartilhado em `fluency-clean/src/styles/lesson-type-stepper-real.css`.
- Documentação: `fluency-clean/docs/BLOCO-GRAMMAR-STEPPER-REAL-LAB.md`.

### Refatoração Practice Grammar — IMPLEMENTADA nos blocos do plano

- `BLOCO-C1-GRAMMAR-1-LEVEL-POLICY-LAB.md`
- `BLOCO-C2-GRAMMAR-2-JSON-CONTRACT-LAB.md`
- `BLOCO-C3-GRAMMAR-3-QUALITY-GATE-LAB.md`
- `BLOCO-C4-GRAMMAR-4-PRACTICE-BUILDER-V2-LAB.md`

### Pendente Grammar

- Validar stepper e Prática Profunda no iPhone.

## ESTADO ATUAL — LISTENING

### `BLOCO-LISTENING-STEPPER-REAL-LAB` — IMPLEMENTADO

- Stepper real portado para `ListeningLessonClean.jsx`.
- Fluxo com 8 etapas: preparar, 1ª escuta, compreensão, texto, vocabulário, shadowing, produção e concluir.
- Preservado áudio natural, fallback, diálogo multi-voz, transcrição controlada e shadowing real.
- Documentação: `fluency-clean/docs/BLOCO-LISTENING-STEPPER-REAL-LAB.md`.

### Refatoração Practice Listening — IMPLEMENTADA nos blocos do plano

- `BLOCO-D1-LISTENING-1-LEVEL-POLICY-LAB.md`
- `BLOCO-D2-LISTENING-2-JSON-CONTRACT-LAB.md`
- `BLOCO-D3-LISTENING-3-QUALITY-GATE-LAB.md`
- `BLOCO-D4-LISTENING-4-PRACTICE-BUILDER-V2-LAB.md`

### Pendente Listening

- Validar stepper e Prática Profunda no iPhone.

## ESTADO ATUAL — SPEAKING

### `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB` — IMPLEMENTADO

- Renderização da aba Speaking revisada sem alterar o motor.
- Criado modelo modular `fluency-clean/src/speaking/speakingFlow.js`.
- Criado componente `fluency-clean/src/speaking/SpeakingStepper.jsx`.
- Criado estilo `fluency-clean/src/styles/speaking-stepper-real.css`.
- `SpeakingScreen.jsx` usa stepper real adaptado por modo.
- Preservado sem alteração: Azure Pronunciation, reconhecimento de fala, `startRecording`, histórico real, gravação automática por silêncio, modos Conversa/Pronúncia/Imersão.
- Documentação: `fluency-clean/docs/BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB.md`.

### Refatoração Practice Speaking — IMPLEMENTADA nos blocos do plano

- `BLOCO-F1-SPEAKING-1-LEVEL-POLICY-LAB.md`
- `BLOCO-F2-SPEAKING-2-JSON-CONTRACT-LAB.md`
- `BLOCO-F3-SPEAKING-3-QUALITY-GATE-LAB.md`
- `BLOCO-F4-SPEAKING-4-PRACTICE-BUILDER-V2-LAB.md`

### Pendente Speaking

- Validar stepper e Prática Profunda no iPhone.

## ESTADO ATUAL — WRITING

### Refatoração Practice Writing — IMPLEMENTADA nos blocos do plano

- `BLOCO-E1-WRITING-1-LEVEL-POLICY-LAB.md`
- `BLOCO-E2-WRITING-2-JSON-CONTRACT-LAB.md`
- `BLOCO-E3-WRITING-3-RUBRIC-MULTI-LAB.md`
- `BLOCO-E4-WRITING-4-PRACTICE-BUILDER-V2-LAB.md`

### Pendente Writing

- Validar Prática Profunda no iPhone quando houver fluxo de writing no smoke test.

## PLANO DE REFATORAÇÃO DA PRÁTICA PROFUNDA

### Fundação transversal — IMPLEMENTADA

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB.md`
- `BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB.md`
- `BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB.md`
- `BLOCO-A4-PRACTICE-CORE-4-SRS-EXTENDED-LAB.md`
- `BLOCO-A5-PRACTICE-CORE-5-MASTERY-TAGS-LAB.md`

### Reading Practice — IMPLEMENTADA

- `BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB.md`
- `BLOCO-B2-READING-PRACTICE-2-VOCAB-FRAGIL-LAB.md`
- `BLOCO-B3-READING-PRACTICE-3-EVIDENCE-LAYERED-LAB.md`
- `BLOCO-B4-READING-PRACTICE-4-NEW-CONTEXT-LAB.md`
- `BLOCO-B5-READING-PRACTICE-5-SUMMARY-CLOZE-LAB.md`

### Blocos finais — IMPLEMENTADOS TECNICAMENTE

- `BLOCO-G1-PRACTICE-TELEMETRY-LAB.md`
- `BLOCO-G2-PRACTICE-A11Y-AUDIT-LAB.md`
- `BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB.md`

## ÚLTIMO BLOCO FECHADO — G3 PRACTICE IPHONE FINAL AUDIT

### `BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB` — IMPLEMENTADO TECNICAMENTE

Documentação criada:
- `fluency-clean/docs/BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB.md`

Arquivos confirmados/alterados neste fechamento:
- `fluency-clean/src/styles/practice-a11y.css`
- `fluency-clean/src/practice/components/TextExercise.jsx`
- `fluency-clean/src/practice/components/SpeakExercise.jsx`
- `fluency-clean/src/practice/components/SummaryClozeExercise.jsx`
- `fluency-clean/src/practice/components/NewContextExercise.jsx`

O que foi fechado:
- `practice-a11y.css` está importado em `main.jsx`.
- Safe area reforçada.
- Teclado iOS considerado com `scroll-padding-bottom` e padding inferior.
- Inputs protegidos contra zoom automático no iOS com fonte mínima de 16px.
- Touch targets mínimos reforçados.
- Botão de fala mantido com mínimo de 56px.
- Overflow/word-break reforçado para telas estreitas.
- Reduced motion respeitado.
- Foco visível reforçado.
- `NewContextExercise.jsx` recebeu `radiogroup/radio`, `aria-checked`, `aria-disabled` e redução de ruído para VoiceOver.

Preservado sem alteração:
- lógica da prática;
- seleção/confirmação de alternativa;
- Azure;
- Firebase;
- backend Azure privado;
- sistema de gravação;
- `speakingFlow.js`;
- `SpeakingStepper.jsx`;
- `SpeakingScreen.jsx`;
- `bundle.js`.

### Status final do G3

- Código/documentação: concluídos.
- Aprovação final: pendente do smoke test manual no iPhone após deploy do preview da branch `rewrite-fluency-clean-lab`.

### Smoke test manual pendente no iPhone

1. Abrir aula Grammar A1 e iniciar Prática Profunda.
2. Testar múltipla escolha, correction, word bank e resposta curta.
3. Abrir teclado em resposta curta e confirmar se campo/botão continuam acessíveis.
4. Concluir prática e verificar MasteryRecap sem overflow em 375px.
5. Abrir aula Listening B1 e testar áudio, escolha, ditado e shadowing.
6. Abrir aula Speaking A2 e confirmar que o fluxo aprovado de Speaking continua intacto.
7. Abrir Reading B1 com `summary_cloze` e confirmar inputs inline.
8. Abrir Reading B1 com `new_context` e confirmar blockquote, seleção, foco e botão Confirmar.
9. Confirmar ausência de crash no fluxo normal.
10. Confirmar ausência de resposta vazada visível antes do feedback.

## ALERTA IMPORTANTE — VOCAB/TRILHA

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente `Trilha de vocabulário` de `Flashcards da aula`.

## ORDEM DEFINIDA PARA PRÓXIMOS PASSOS

1. Aguardar deploy do preview da branch `rewrite-fluency-clean-lab`.
2. Executar smoke test manual do G3 no iPhone.
3. Se aprovado, considerar a refatoração da Prática Profunda tecnicamente concluída.
4. Próximo bloco planejado: `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`.
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
- Não iniciar novos blocos antes do smoke test manual do G3, salvo instrução explícita.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch obrigatória é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Firebase, Azure, sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`. O último bloco fechado tecnicamente foi `BLOCO-G3-PRACTICE-IPHONE-FINAL-AUDIT-LAB`. Código e docs foram concluídos, mas a aprovação final depende do smoke test manual no iPhone depois do deploy do preview. Próximo bloco planejado após aprovação: `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`."
