# BLOCO 20H — Renderização guiada por pilar (entrega)

Branch alvo: `rewrite-fluency-clean-lab`

## O que mudou

Antes: `LessonScreen.jsx` montava um `StaticLessonRenderer` único que enfileirava
todo o conteúdo da aula como cards, mostrando `expected`/`answer` antes da
tentativa, jogando texto principal no meio, exibindo chaves técnicas (`subject`)
e expondo atalhos de teste para o aluno.

Agora cada pilar tem seu próprio fluxo guiado em `src/lessons/flow/<pilar>/`,
montado em cima do `LessonFlowShell` (header focado, stepper, footer único,
1 fase ativa por vez).

## Arquivos novos

```
src/lessons/flow/
├── text/normalize.js                          // textOf/noteOf/expectedOf endurecidos
├── phases/
│   ├── PhaseShell.jsx
│   ├── AttemptField.jsx                       // textarea/input + gate de modelo
│   ├── ChoiceField.jsx                        // múltipla escolha com gate
│   ├── SpeakField.jsx                         // SpeakExercise + fallback escrito
│   ├── DictationField.jsx                     // player + textarea, transcript depois
│   └── ChecklistField.jsx                     // checklist (Speaking/Writing)
├── grammar/GrammarLessonFlow.jsx
├── vocabulary/VocabularyLessonFlow.jsx
├── listening/ListeningLessonFlow.jsx
├── speaking/SpeakingLessonFlow.jsx
├── writing/WritingLessonFlow.jsx
├── reading/ReadingLessonFlowV2.jsx            // reordenado conforme 20A
└── lesson-phase.css

src/screens/
├── LessonScreen.jsx                           // substitui o atual (FLOWS por pilar)
└── LessonScreen.devTools.jsx                  // só monta em import.meta.env.DEV
```

`src/lessons/flow/index.js` foi atualizado para reexportar tudo.

## Arquivos a remover/desativar

- `StaticLessonRenderer` deixa de ser chamado no `LessonScreen`. Pode ficar
  no repo como fallback de aulas v1, mas qualquer aula com `pillar` ou `type`
  conhecido (grammar/vocabulary/reading/listening/speaking/writing) agora
  passa pelos novos fluxos.
- O `ReadingLessonFlow.jsx` original continua existindo mas o `LessonScreen`
  novo passa a usar `ReadingLessonFlowV2`. Se a auditoria validar, renomeie
  v2 para o nome canônico.
- Blocos de atalho (`Abrir Grammar fixo`, previews, IndexedDB, contrato,
  qualidade, IDs) saíram do `LessonScreen.jsx` e vivem em
  `LessonScreen.devTools.jsx`, montado SÓ se `import.meta.env.DEV`.

## Contratos invioláveis (gate)

Em todo o pacote, estas regras são imposstas no nível das fases:

1. `expected / answer / expectedAnswer / correctAnswer` NUNCA aparecem antes
   de `flow.markAttempt(phase.id, ...)`.
2. `subject / schemaVersion / pillar / [object Object]` nunca renderizam
   (filtro em `text/normalize.js`).
3. Cada fase declara `requiresAttempt` e `canAdvance`; o `LessonActionFooter`
   bloqueia "Continuar" se a fase não cumpriu seu gate, mostrando
   `blockedMessage`.
4. `import.meta.env.DEV` é a única chave que destrava painéis técnicos.

## Ordem de fases por pilar

### Grammar
Explicação → Erros comuns → Prática controlada → Quiz → Produção final.

### Vocabulary
Contexto → Palavras essenciais → Chunks → Reconhecimento → Uso em contexto → Produção curta.

### Reading
Objetivo → Vocabulário pré-texto → Estratégia → **Texto principal** → 1ª leitura → 2ª leitura → Pergunta com evidência → Vocabulário pelo contexto → Resumo guiado → Produção final → Revisão.
Texto principal fica disponível como bloco sticky reabrível nas fases 5–9.

### Listening
Antes de ouvir → Palavras para tentar ouvir → 1ª escuta sem texto → 2ª escuta com foco → Compreensão → Dictation → Shadowing → **Transcript liberado** → Produção oral → Revisão.
Transcript é liberado apenas após as tentativas iniciais.

### Speaking
Modelo → Repetição → Drills → Gravação guiada → Fala livre → Auto-checklist final.
Cada fase de fala usa `SpeakExercise` (Azure Pronunciation existente) + fallback escrito.

### Writing
Modelo → Blocos de construção → Rascunho (textarea, 20+ palavras) → Checklist → Versão final (modelo só aparece após enviar).

## Como o ChatGPT deve aplicar

1. Copie os arquivos do bundle preservando o caminho relativo.
2. Atualize `src/screens/LessonScreen.jsx` pelo novo (faz import dos fluxos
   e do `LessonScreen.devTools`).
3. Não precisa tocar em `services/`, conteúdo das aulas (JSON), Azure core,
   ou IndexedDB.
4. Rode `npm run dev` localmente: o painel DEV aparece; em build de produção
   (`npm run build && npm run preview`) ele desaparece.

## QA por pilar (manual)

Para CADA pilar, validar:

- [ ] gabarito não aparece antes da tentativa
- [ ] ordem das fases bate com este documento
- [ ] transcript/modelo só liberados após tentativa (Listening, Writing)
- [ ] footer não avança sem cumprir `canAdvance` (mostra mensagem)
- [ ] nenhuma chave técnica visível (`subject`, `schemaVersion`, etc.)
- [ ] atalhos DEV ausentes no build de produção
- [ ] Reading: texto principal disponível em todas as fases interativas
- [ ] Speaking: cada fase ativa exige fala OU texto fallback
- [ ] Writing: rascunho exige ≥20 palavras; modelo só na versão final

## Riscos conhecidos

- Aulas legadas (`schema-v1`) que NÃO tenham `pillar`/`type` em `FLOWS`
  caem no fallback do `LessonScreen` (Card simples). Se houver aula
  marginal, manter `StaticLessonRenderer` como fallback temporário.
- Conteúdos sem `mainText`/`transcript` em Reading/Listening mostram
  mensagem neutra; isso é proposital — não invente conteúdo.
