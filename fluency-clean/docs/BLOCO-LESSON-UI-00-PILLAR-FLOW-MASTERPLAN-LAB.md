# BLOCO-LESSON-UI-00 — Pillar Flow Masterplan LAB

Data: 2026-05-14
Branch obrigatória: `rewrite-fluency-clean-lab`

## Status

Planejado e documentado. Este bloco é o novo ponto de partida para reformular as UIs das aulas por pilar.

## Motivo

O currículo fixo premium A1 → C2 já está avançado, mas a experiência de aula ainda não entrega uma sensação clara de estudo por pilar. O problema principal não é apenas visual. É pedagógico e estrutural:

- Reading ainda pode virar uma rolagem longa onde texto, perguntas e produção ficam próximos demais.
- Listening ainda pode expor transcript cedo demais ou misturar etapas que deveriam ser sequenciais.
- Speaking ainda pode parecer exercício escrito com microfone opcional, em vez de treino real de fala.
- Writing ainda precisa parecer ambiente de escrita, com rascunho, revisão e versão final.
- Grammar precisa guiar regra → exemplos → erros → prática → produção.
- Vocabulary precisa guiar grupos lexicais → chunks → reconhecimento → uso ativo.
- A Prática Profunda precisa continuar complementar, sempre depois da aula principal.
- O Mastery Gate precisa ter critérios específicos por pilar.

## Regra máxima deste bloco

Não corrigir a UI por remendos pequenos. A meta é criar uma arquitetura de aula guiada por etapas reais, mobile-first, sem rolagem infinita como fluxo principal.

## Restrições obrigatórias

- Não mexer em `main`.
- Não mexer em `rewrite-fluency-clean`.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML gigante/remendado.
- Não mexer no backend Azure privado.
- Não mexer em Firebase/Azure de produção.
- Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` sem bloco específico.
- Não apagar renderers atuais antes de criar a nova camada e validar a troca.
- Não alterar conteúdo fixo só para caber na UI.
- Não compactar conteúdo pedagógico importante.
- Não mostrar gabarito, transcript ou modelo antes da tentativa quando a etapa exigir descoberta.

## Diagnóstico do estado atual

### LessonScreen

`LessonScreen.jsx` já possui um stepper visual e renderização por pilar, mas o stepper não controla profundamente o fluxo pedagógico da aula. A aula ainda é renderizada como um conjunto grande de seções empilhadas.

Problema:
- O aluno vê muito conteúdo de uma vez.
- A aula perde foco.
- O pilar do dia não parece uma experiência própria.
- A rolagem longa dificulta iPhone.

Decisão:
- Criar um `LessonFlowShell` que controle fases reais da aula.
- Cada pilar deve enviar suas fases para o shell.
- A UI deve mostrar foco atual, ação principal e progresso de fase.

### StaticLessonRenderer

`StaticLessonRenderer.jsx` já contém renderers profundos por pilar, mas concentra muitas responsabilidades em um arquivo grande.

Problema:
- Muito código e muita lógica no mesmo arquivo.
- Difícil evoluir Reading, Listening, Speaking e Writing separadamente.
- As fases aparecem como cards contínuos.

Decisão:
- Extrair renderers por pilar para arquivos separados.
- Criar componentes comuns de fase, tentativa, revelação, feedback e conclusão.

### ListeningInteractiveLesson

Listening já tem renderer próprio, mas o transcript ainda aparece como parte do fluxo renderizado, sem uma trava suficientemente forte por etapa.

Problema:
- Transcript pode aparecer cedo demais.
- Listening precisa obrigar primeira escuta sem leitura.

Decisão:
- Listening deve ter `TranscriptGate`.
- Transcript só libera após primeira escuta, segunda escuta e tentativa de compreensão/dictation.

### StaticCompletionGate

O gate atual é útil, mas genérico demais.

Problema:
- Speaking pode ser concluído com roteiro escrito.
- Listening pode ser concluído sem evidência forte de escuta.
- Reading pode ser concluído sem resumo/evidência suficiente.

Decisão:
- Criar critérios por pilar.
- O gate final deve ler sinais de interação do fluxo, não apenas produção textual e prática profunda.

## Nova arquitetura proposta

```txt
LessonScreen
↓
LessonFlowRouter
↓
LessonFlowShell
↓
PillarFlowRenderer
↓
LessonPhase components
↓
Pillar-specific Mastery Gate
```

## Arquivos sugeridos

### Shell e infraestrutura

- `fluency-clean/src/lessons/flow/LessonFlowShell.jsx`
- `fluency-clean/src/lessons/flow/LessonPhaseStepper.jsx`
- `fluency-clean/src/lessons/flow/LessonPhaseCard.jsx`
- `fluency-clean/src/lessons/flow/LessonActionFooter.jsx`
- `fluency-clean/src/lessons/flow/LessonFocusHeader.jsx`
- `fluency-clean/src/lessons/flow/useLessonFlowState.js`
- `fluency-clean/src/lessons/flow/lessonFlowProgress.js`

### Renderers por pilar

- `fluency-clean/src/lessons/flow/pillars/GrammarLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/pillars/VocabularyLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/pillars/ReadingLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/pillars/ListeningLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/pillars/SpeakingLessonFlow.jsx`
- `fluency-clean/src/lessons/flow/pillars/WritingLessonFlow.jsx`

### Componentes pedagógicos reutilizáveis

- `fluency-clean/src/lessons/flow/components/AttemptBox.jsx`
- `fluency-clean/src/lessons/flow/components/RevealGate.jsx`
- `fluency-clean/src/lessons/flow/components/TranscriptGate.jsx`
- `fluency-clean/src/lessons/flow/components/TextStudyPanel.jsx`
- `fluency-clean/src/lessons/flow/components/AudioFocusPanel.jsx`
- `fluency-clean/src/lessons/flow/components/SpeakingCapturePanel.jsx`
- `fluency-clean/src/lessons/flow/components/WritingDraftPanel.jsx`
- `fluency-clean/src/lessons/flow/components/EvidenceQuestionPanel.jsx`
- `fluency-clean/src/lessons/flow/components/PillarMasteryGate.jsx`

### Estilos

- Preferir continuar dentro do agregador existente `fluency-clean/src/styles/lessons.css` ou criar `fluency-clean/src/styles/lesson-flow.css` e importar por `lessons.css`.
- Não voltar a poluir `main.jsx` com muitos imports.

## UX base obrigatória

### Mobile-first

- A tela deve funcionar primeiro no iPhone.
- Cards devem ser mais curtos.
- Uma fase por vez deve ser o padrão.
- A ação principal deve ficar clara.
- Evitar botão pequeno em área importante.
- Evitar conteúdo técnico na aula.
- Evitar rolagem longa de 15+ cards.

### Progressão real

Cada fase deve ter:

- título claro;
- objetivo curto;
- conteúdo atual;
- ação principal;
- condição de avanço;
- feedback;
- opção discreta de voltar.

### Progressive disclosure

Mostrar apenas o que o aluno precisa naquele momento.

- Gabarito só depois da tentativa.
- Transcript só depois da escuta/tentativa.
- Modelo de escrita só antes da escrita quando for estudo de modelo, mas comparação/resposta esperada só depois da tentativa.
- Explicação adicional só depois do esforço inicial quando for prática.

## Fluxos por pilar

## Grammar Flow

Objetivo: fazer o aluno entender a regra, reconhecer padrões, evitar erros brasileiros, praticar e produzir.

Fases:

1. `intro`
   - objetivo da aula;
   - onde isso aparece na vida real;
   - exemplos rápidos.

2. `rule`
   - conceito central;
   - formação;
   - quando usar;
   - quando não usar.

3. `examples`
   - exemplos comentados;
   - comparação com português;
   - chunks úteis.

4. `mistakes`
   - erros comuns de brasileiros;
   - errado/certo;
   - por que acontece.

5. `guided-practice`
   - reconhecimento;
   - lacunas;
   - correção de erro;
   - transformação.

6. `production`
   - frases próprias;
   - tradução controlada;
   - mini produção.

7. `recap`
   - checklist final;
   - ponte para próxima aula.

8. `practice-extra`
   - Prática Profunda complementar.

9. `gate`
   - mastery gate de Grammar.

Gate mínimo:
- Tentou prática guiada.
- Fez produção com a estrutura da aula.
- Fez Prática Profunda quando exigida.

## Vocabulary Flow

Objetivo: transformar vocabulário em uso ativo, não lista solta.

Fases:

1. `theme`
   - tema da aula;
   - situação real;
   - grupos de palavras.

2. `lexical-sets`
   - palavras essenciais;
   - significado;
   - exemplos.

3. `chunks`
   - expressões úteis;
   - frases prontas;
   - mini diálogos.

4. `recognition`
   - associação;
   - escolha;
   - reconhecimento em contexto.

5. `usage`
   - completar frases;
   - escolher palavra correta;
   - montar frase.

6. `active-production`
   - usar palavras em frases próprias.

7. `review-cards`
   - gerar ou revisar cards reais da aula quando disponível.

8. `gate`
   - mastery gate de Vocabulary.

Gate mínimo:
- Reconheceu vocabulário.
- Usou palavras/chunks em frases próprias.
- Revisão ou produção ativa registrada.

## Reading Flow

Objetivo: fazer o aluno estudar o texto, não apenas responder olhando ao lado.

Fases:

1. `pre-reading`
   - objetivo de leitura;
   - vocabulário de apoio;
   - previsão do tema.

2. `main-text`
   - texto principal limpo;
   - sem perguntas na mesma área;
   - botão “Li o texto”.

3. `first-understanding`
   - pergunta geral sem gabarito;
   - o aluno responde de memória.

4. `second-reading`
   - voltar ao texto;
   - procurar detalhes;
   - marcar evidências.

5. `evidence-questions`
   - perguntas com evidência;
   - feedback depois da tentativa.

6. `vocab-context`
   - vocabulário pelo contexto;
   - inferência simples.

7. `summary`
   - resumo curto em português ou inglês controlado.

8. `connected-production`
   - produção conectada ao texto.

9. `practice-extra`
   - Prática Profunda complementar de Reading.

10. `gate`
   - mastery gate de Reading.

Gate mínimo:
- Marcou leitura do texto.
- Tentou compreensão geral.
- Respondeu perguntas com evidência.
- Fez resumo/produção conectada.

## Listening Flow

Objetivo: treinar escuta real antes de ler transcript.

Fases:

1. `prepare`
   - objetivo auditivo;
   - palavras para tentar ouvir;
   - instrução clara: sem transcript.

2. `first-listen`
   - tocar áudio;
   - tarefa: o que você entendeu?
   - sem transcript.

3. `second-listen`
   - tocar novamente;
   - foco em nomes, números, lugares, rotina ou estrutura da aula.

4. `dictation`
   - completar trechos curtos;
   - tentativa antes de resposta.

5. `comprehension`
   - perguntas de compreensão auditiva.

6. `shadowing`
   - ouvir e repetir;
   - marcar repetição oral.

7. `transcript-gate`
   - transcript liberado apenas depois das tentativas anteriores.

8. `oral-production`
   - produção oral curta baseada no áudio.

9. `practice-extra`
   - Prática Profunda complementar de Listening.

10. `gate`
   - mastery gate de Listening.

Gate mínimo:
- Primeira escuta tentada.
- Segunda escuta tentada.
- Compreensão/dictation tentada.
- Shadowing ou produção oral registrada.

## Speaking Flow

Objetivo: fazer o aluno falar de verdade.

Fases:

1. `situation`
   - situação comunicativa;
   - objetivo oral.

2. `model`
   - ouvir frase-modelo;
   - repetir.

3. `repeat`
   - repetições curtas;
   - chunks de pronúncia.

4. `substitution`
   - trocar partes da frase;
   - falar a frase completa.

5. `qa-drills`
   - perguntas e respostas orais.

6. `guided-speaking`
   - montar resposta com apoio.

7. `recording`
   - capturar fala;
   - texto só como fallback.

8. `free-speaking`
   - fala livre curta.

9. `feedback-checklist`
   - checklist de comunicação.

10. `gate`
   - mastery gate de Speaking.

Regra importante:
- Campo de texto nunca deve parecer a ação principal de Speaking.
- Texto é fallback quando microfone/captura falhar.
- A ação principal é ouvir, falar, repetir, gravar ou registrar tentativa oral.

Gate mínimo:
- Pelo menos uma tentativa oral registrada.
- Repetição/modelo praticado.
- Fala guiada ou livre feita.

## Writing Flow

Objetivo: transformar Writing em ambiente de escrita.

Fases:

1. `model`
   - texto modelo;
   - leitura orientada.

2. `breakdown`
   - blocos do modelo;
   - estrutura do texto.

3. `useful-blocks`
   - frases úteis;
   - conectores;
   - gramática para escrever.

4. `guided-substitution`
   - trocar informações;
   - completar frases.

5. `draft`
   - rascunho salvo;
   - contador de palavras.

6. `checklist`
   - revisar clareza, gramática, pontuação e objetivo.

7. `revision`
   - reescrever melhor.

8. `final-version`
   - versão final.

9. `ai-correction-optional`
   - IA corrige Writing apenas como tutora auxiliar.

10. `gate`
   - mastery gate de Writing.

Gate mínimo:
- Rascunho escrito.
- Checklist visto.
- Versão final escrita.

## Mastery Gate por pilar

O gate genérico deve evoluir para ler eventos reais da aula.

Eventos sugeridos:

```js
{
  lessonOpened: true,
  currentPhase: 'summary',
  phasesVisited: [],
  attempts: {},
  revealedAnswers: {},
  transcriptUnlocked: false,
  speakingAttempts: [],
  writingDraft: '',
  writingFinal: '',
  readingSummary: '',
  practiceAccuracy: 0,
}
```

O gate deve avaliar:

- progresso de fases;
- tentativas reais;
- produção do pilar;
- prática complementar;
- critérios mínimos específicos.

## Ordem recomendada dos próximos blocos

1. `BLOCO-LESSON-UI-01-FLOW-SHELL-LAB`
2. `BLOCO-LESSON-UI-02-READING-FLOW-LAB`
3. `BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB`
4. `BLOCO-LESSON-UI-04-SPEAKING-FLOW-LAB`
5. `BLOCO-LESSON-UI-05-WRITING-FLOW-LAB`
6. `BLOCO-LESSON-UI-06-GRAMMAR-VOCAB-FLOW-LAB`
7. `BLOCO-LESSON-UI-07-PILLAR-MASTERY-GATES-LAB`
8. `BLOCO-LESSON-UI-08-IPONE-SMOKE-POLISH-LAB`

## BLOCO-LESSON-UI-01-FLOW-SHELL-LAB

Objetivo:
- Criar a infraestrutura visual e lógica para aulas por fases.

Arquivos sugeridos:
- `LessonFlowShell.jsx`
- `LessonPhaseStepper.jsx`
- `LessonPhaseCard.jsx`
- `LessonActionFooter.jsx`
- `LessonFocusHeader.jsx`
- `useLessonFlowState.js`

Regras:
- Não substituir todos os renderers ainda.
- Criar camada paralela segura.
- Testar com um pilar simples ou aula mock estática.
- Não mexer no conteúdo.

## BLOCO-LESSON-UI-02-READING-FLOW-LAB

Objetivo:
- Refazer Reading com foco em texto, compreensão e evidência.

Regras:
- Texto principal isolado.
- Perguntas só depois da leitura.
- Evidência depois da segunda leitura.
- Prática extra só depois da aula.

## BLOCO-LESSON-UI-03-LISTENING-FLOW-LAB

Objetivo:
- Refazer Listening com transcript bloqueado até tentativas reais.

Regras:
- Primeira escuta sem transcript.
- Segunda escuta com foco.
- Dictation antes de transcript.
- TranscriptGate obrigatório.

## BLOCO-LESSON-UI-04-SPEAKING-FLOW-LAB

Objetivo:
- Refazer Speaking para treinar fala real.

Regras:
- Microfone/fala como ação principal.
- Texto apenas fallback.
- Registro de tentativa oral para gate.
- Não mexer em Azure privado ou arquivos protegidos sem bloco específico.

## BLOCO-LESSON-UI-05-WRITING-FLOW-LAB

Objetivo:
- Refazer Writing como ambiente de escrita.

Regras:
- Rascunho salvo.
- Checklist.
- Versão final.
- Correção IA opcional e auxiliar.

## BLOCO-LESSON-UI-06-GRAMMAR-VOCAB-FLOW-LAB

Objetivo:
- Refazer Grammar e Vocabulary com fluxos próprios.

Regras:
- Grammar: regra, exemplos, erros comuns, prática, produção.
- Vocabulary: grupos, chunks, reconhecimento, uso ativo e revisão.

## BLOCO-LESSON-UI-07-PILLAR-MASTERY-GATES-LAB

Objetivo:
- Substituir gate genérico por gate por pilar.

Regras:
- Não permitir concluir Speaking apenas escrevendo.
- Não permitir Listening sem escuta/tentativa.
- Não permitir Reading sem resumo/evidência.
- Não permitir Writing sem rascunho e versão final.

## BLOCO-LESSON-UI-08-IPONE-SMOKE-POLISH-LAB

Objetivo:
- Refinar mobile, toque, espaçamento, foco visual e rolagem.

Checklist:
- iPhone 13/14 largura comum.
- Botões confortáveis.
- Header não ocupa tela demais.
- Fases não criam rolagem infinita.
- Nenhuma resposta aparece antes da tentativa.
- Transcript não aparece cedo.
- Speaking parece Speaking.
- Reading parece Reading.
- Writing parece Writing.

## Critérios de aceitação finais

- A aula do dia abre no pilar correto.
- O aluno sabe exatamente o que fazer na etapa atual.
- Reading foca texto e evidência.
- Listening foca escuta antes de transcript.
- Speaking foca fala antes de texto.
- Writing foca produção real.
- Grammar foca regra e produção.
- Vocabulary foca uso ativo.
- Prática Profunda aparece como reforço complementar.
- Gate exige evidência real por pilar.
- UI funciona bem no iPhone.
- Nenhum conteúdo pedagógico foi removido para caber na tela.

## Apps e referências recomendadas para design

### Figma

Recomendado para desenhar protótipos das novas telas por pilar antes de codar.

Uso ideal:
- desenhar `LessonFlowShell`;
- desenhar fluxos de Reading, Listening, Speaking e Writing;
- validar hierarquia visual mobile-first;
- criar componentes de cards, botões, stepper e footer fixo.

### Mobbin

Recomendado como referência visual de padrões mobile reais.

Uso ideal:
- estudar fluxos de aprendizado, onboarding, cards progressivos e navegação por etapas;
- buscar padrões de apps educacionais e produtividade;
- evitar inventar UI sem referência.

### FigJam

Recomendado para mapear fluxos rapidamente.

Uso ideal:
- desenhar jornada de cada pilar;
- mapear o que aparece antes/depois;
- definir gates e bloqueios.

### Notion ou Linear

Opcional para organizar backlog de blocos, bugs e critérios de aceite.

Uso ideal:
- listar blocos Lesson UI;
- marcar status: planejado, em execução, testado no iPhone, aprovado.

### Vercel

Recomendado depois da implementação.

Uso ideal:
- revisar deploy;
- verificar logs de build;
- abrir preview no iPhone.

## Não recomendado agora

### Lovable

Não usar para reescrever este projeto agora.

Motivo:
- O projeto já tem arquitetura própria, currículo fixo, Azure, progresso, prática e regras de segurança.
- Lovable pode gerar uma UI bonita, mas fora da arquitetura e difícil de integrar.
- Pode criar código paralelo, quebrar modularidade ou virar retrabalho.

## Decisão final

A reformulação da UI das aulas deve começar por documentação + shell + pilar mais problemático, e não por redesign visual solto.

Prioridade:

1. Arquitetura de fluxo.
2. Reading.
3. Listening.
4. Speaking.
5. Writing.
6. Grammar/Vocabulary.
7. Gates por pilar.
8. Polimento iPhone.
