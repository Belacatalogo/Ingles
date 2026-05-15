# Lesson UI Rebuild — Handoff

Data: 2026-05-14
Branch obrigatória: `rewrite-fluency-clean-lab`

## Leia antes de qualquer bloco de UI de aula

Este arquivo complementa `REWRITE_HANDOFF.md` e `fluency-clean/docs/BLOCO-LESSON-UI-00-PILLAR-FLOW-MASTERPLAN-LAB.md`.

## Decisão oficial

O tendão de Aquiles atual do Fluency é a UI das aulas. O conteúdo fixo e o currículo estão avançando, mas as telas de aula ainda não entregam uma experiência pedagógica forte por pilar.

A próxima frente deve ser uma reformulação por fluxo, não hotfixes isolados.

## Problema central

- A aula ainda pode virar rolagem infinita.
- O stepper atual não controla profundamente a progressão pedagógica.
- Reading precisa focar texto, compreensão e evidência.
- Listening precisa impedir transcript antes da escuta/tentativa.
- Speaking precisa fazer o aluno falar, não apenas escrever fallback.
- Writing precisa virar ambiente de produção, revisão e versão final.
- Grammar precisa guiar regra, exemplos, erros, prática e produção.
- Vocabulary precisa guiar grupos, chunks, reconhecimento e uso ativo.
- Mastery Gate precisa ser específico por pilar.

## Documento mestre criado

Arquivo obrigatório:

- `fluency-clean/docs/BLOCO-LESSON-UI-00-PILLAR-FLOW-MASTERPLAN-LAB.md`

Esse documento define:

- diagnóstico;
- nova arquitetura;
- arquivos sugeridos;
- fluxos por pilar;
- gates por pilar;
- ordem dos próximos blocos;
- apps/referências recomendadas para design.

## Ordem recomendada

1. `BLOCO-LESSON-UI-01-FLOW-SHELL-LAB`
2. `BLOCO-LESSON-UI-02-READING-FLOW-LAB`
3. `BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB`
4. `BLOCO-LESSON-UI-04-SPEAKING-FLOW-LAB`
5. `BLOCO-LESSON-UI-05-WRITING-FLOW-LAB`
6. `BLOCO-LESSON-UI-06-GRAMMAR-VOCAB-FLOW-LAB`
7. `BLOCO-LESSON-UI-07-PILLAR-MASTERY-GATES-LAB`
8. `BLOCO-LESSON-UI-08-IPONE-SMOKE-POLISH-LAB`

## Regras obrigatórias

- Não mexer em `main`.
- Não mexer em `rewrite-fluency-clean`.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não criar HTML gigante/remendado.
- Não mexer no backend Azure privado.
- Não mexer no Firebase/Azure de produção.
- Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` sem bloco específico.
- Não apagar renderers atuais antes da nova camada estar criada e validada.
- Não compactar conteúdo pedagógico para caber na UI.
- Não mostrar gabarito/transcript/modelo antes da tentativa quando a etapa exigir descoberta.

## Próximo bloco recomendado

`BLOCO-LESSON-UI-01-FLOW-SHELL-LAB`

Objetivo:
- criar `LessonFlowShell`, `LessonPhaseStepper`, `LessonPhaseCard`, `LessonActionFooter`, `LessonFocusHeader` e estado de fluxo;
- não substituir todos os renderers ainda;
- criar camada paralela segura;
- preparar a troca gradual dos pilares.

## Apps recomendados

- Figma: prototipar telas por pilar.
- FigJam: mapear jornada e fases.
- Mobbin: buscar referências mobile reais.
- Notion ou Linear: organizar backlog e critérios.
- Vercel: validar preview e build depois da implementação.

## Apps não recomendados agora

- Lovable: não usar para reescrever este projeto neste momento, porque pode gerar código paralelo fora da arquitetura existente.
