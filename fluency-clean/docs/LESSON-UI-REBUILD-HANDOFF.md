# Lesson UI Rebuild — Handoff Oficial

Última atualização: 2026-05-16

## Branch oficial atual

A partir de agora, todo trabalho oficial deste projeto deve acontecer diretamente em:

```txt
main
```

A antiga branch `claude/improve-english-system-hu6gz` foi promovida para `main`.

Backup da main antiga:

```txt
backup-main-before-improve-english-system-2026-05-16
```

Branches antigas/históricas que não devem ser usadas para novos blocos sem autorização explícita:

```txt
rewrite-fluency-clean-lab
rewrite-fluency-clean
claude/improve-english-system-hu6gz
claude/improve-english-system-hu6gz-IuOMv
lab
```

---

## Regras obrigatórias atualizadas

- Trabalhar sempre na `main`.
- Não criar branch nova sem autorização explícita.
- Não abrir PR para o fluxo normal.
- Não fazer merge.
- Não fazer rebase.
- Não fazer force push sem autorização explícita.
- Não voltar para `lab`.
- Não voltar para `rewrite-fluency-clean-lab`.
- Não voltar para `rewrite-fluency-clean`.
- Não voltar para `claude/improve-english-system-hu6gz`.
- Não usar branch sufixada automática.
- Não mexer no backup `backup-main-before-improve-english-system-2026-05-16`.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não criar HTML gigante/remendado.
- Não mexer no backend Azure privado.
- Não mexer no Firebase/Azure/Gemini real sem autorização explícita.
- Não apagar renderers atuais antes da nova camada estar criada e validada.
- Não compactar conteúdo pedagógico para caber na UI.
- Não mostrar gabarito/transcript/modelo antes da tentativa quando a etapa exigir descoberta.

Antes de editar, confirmar:

```bash
git branch --show-current
```

Resultado esperado:

```txt
main
```

---

## Decisão oficial

O tendão de Aquiles atual do Fluency é a experiência das aulas. O conteúdo fixo e o currículo avançaram, mas a UI das aulas precisa continuar ficando mais forte por pilar.

A frente oficial é uma reformulação por fluxo, não hotfixes isolados.

A arquitetura oficial é:

```txt
Curso fixo premium A1 → C2
↓
Renderização profunda por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA apenas como tutora/corretora/revisora adaptativa
```

---

## Estado atual de Lesson UI

### Já existe

- `LessonFlowShell`
- `LessonPhaseStepper`
- `LessonPhaseCard`
- `LessonActionFooter`
- `LessonFocusHeader`
- `LessonCompletionCard`
- Renderizadores por pilar:
  - `GrammarLessonFlow`
  - `VocabularyLessonFlow`
  - `ReadingLessonFlowV2`
  - `ListeningLessonFlow`
  - `SpeakingLessonFlow`
  - `WritingLessonFlow`

### Correções já feitas

- Tema escuro aplicado às fases.
- Completion card criado.
- Pillar icons adicionados.
- `lessonFlowScore.js` virou fonte única de scoring do flow.
- `completeLesson()` recebe `flowResults` e `preComputedScore`.
- `errorBank`/revisão passam a ler erros das aulas.
- `AttemptField` mostra dicas pedagógicas.
- `ChoiceField` mostra explicações após tentativa.
- `ChecklistField` não deve passar silenciosamente com lista vazia.
- `SpeakField` não deve marcar tentativa só com uma letra.
- `SpeakField`/Speaking/Listening receberam botões de áudio Gemini em modelos/frases.
- `AudioListenField`, `ListeningTextPlayer`, `ListeningShadowingPractice` e `StaticLessonRenderer` têm fallback seguro.
- `geminiTts.js` e `geminiAudioService.js` foram corrigidos para usar chaves gerais + chaves de aulas.
- `lesson-flow.css` recebeu ajuste de safe-area para iPhone.
- `staticLessonDisplayNormalizer.js` passou a cobrir mais pilares.
- `lessonFlashcards.js` filtra melhor instruções ruins em português.

---

## Problemas centrais que ainda merecem bloco próprio

- A aula ainda pode ficar longa demais se o fluxo não guiar bem a progressão.
- O stepper precisa impedir pulo de fases obrigatórias futuras.
- Reading precisa manter foco em texto, compreensão e evidência.
- Listening precisa garantir primeira escuta sem transcript e registrar escuta de forma justa.
- Speaking precisa fazer o aluno falar de verdade, com fallback escrito apenas quando necessário.
- Writing precisa virar ambiente de produção, revisão e versão final, não só textarea.
- Grammar precisa guiar regra, exemplos, erros, prática e produção.
- Vocabulary precisa guiar grupos, chunks, reconhecimento e uso ativo.
- Mastery Gate precisa ser específico por pilar.
- Refresh no meio da aula ainda pode perder `activeIndex` e `attempts`.
- Completion card precisa estar conectado com CTAs reais quando `onNavigate` estiver disponível.

---

## Próximos blocos recomendados

1. `BLOCO-LESSON-STEPPER-GATE-MAIN`
   - impedir pulo de fases obrigatórias futuras;
   - permitir voltar para revisar;
   - manter preview/dev seguro.

2. `BLOCO-LESSON-MID-PERSISTENCE-MAIN`
   - salvar `activeIndex` e `attempts` por `lessonId`;
   - restaurar aula após refresh;
   - limpar estado quando aula for concluída.

3. `BLOCO-LESSON-IPHONE-INPUT-POLISH-MAIN`
   - garantir que input/textarea focado não fique coberto;
   - revisar footer sticky, safe-area e menu inferior;
   - melhorar players de áudio e botões no iPhone.

4. `BLOCO-LESSON-PILLAR-POLISH-MAIN`
   - revisar cada pilar com aula real;
   - remover qualquer `[object Object]`, undefined ou texto técnico;
   - melhorar empty states por pilar.

5. `BLOCO-LESSON-FLASHCARDS-QUALITY-MAIN`
   - melhorar cards vindos da aula;
   - evitar card genérico/lixo;
   - garantir frente, verso, exemplo e origem clara.

6. `BLOCO-LESSON-REVIEW-TAGS-MAIN`
   - ampliar TAG_RULES;
   - mapear erros por pilar;
   - melhorar revisão de speaking/vocabulary/writing.

---

## Apps recomendados

- ChatGPT: auditoria, planejamento, prompts e verificação.
- Claude Code: execução de código na `main`.
- GitHub: histórico e versionamento.
- Vercel: preview/deploy.
- Figma/FigJam: protótipos e mapas, se necessário.

## Apps não recomendados agora

- Lovable para reescrever este projeto inteiro, porque pode gerar código paralelo fora da arquitetura existente.
- Qualquer ferramenta que crie branch automática sem controle, exceto com autorização explícita.

---

## Como continuar em outro chat

```txt
Continue o trabalho no repositório Belacatalogo/Ingles.

Branch obrigatória atual:
main

Antes de qualquer alteração, leia REWRITE_HANDOFF.md e fluency-clean/docs/LESSON-UI-REBUILD-HANDOFF.md.

Regras:
- trabalhar diretamente na main;
- não criar branch;
- não abrir PR;
- não fazer merge;
- não fazer rebase;
- não fazer force push;
- não voltar para lab, rewrite-fluency-clean-lab ou claude/improve-english-system-hu6gz;
- não mexer no backup backup-main-before-improve-english-system-2026-05-16;
- não usar DOM injection;
- não criar bundle patch;
- manter tudo modular.

Foco:
melhorar a experiência de aula profunda por pilar, sem reativar geração dinâmica de aula como fluxo principal.
```

---

## Checklist ao finalizar bloco de UI

Ao final, confirmar:

```txt
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Backup da main antiga preservado.
Build/check executado quando aplicável.
Handoff atualizado.
```
