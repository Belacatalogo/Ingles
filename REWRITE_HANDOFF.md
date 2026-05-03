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
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## DIRETRIZ DE UI — NÃO POLUIR A AULA

- Regras internas, contrato JSON, política pedagógica, diagnóstico técnico e detalhes de implementação não devem aparecer como cards grandes dentro da aula.
- A aula deve mostrar apenas o que ajuda o aluno a estudar.
- Informações técnicas devem ficar no código, handoff, docs ou diagnóstico apropriado.
- Quando for necessário mostrar segurança/estado, usar texto curto e discreto.

## ESTADO ATUAL — READING

### `BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB` — IMPLEMENTADO

- Reestruturou o render de Reading em `ReadingLesson.jsx`.
- Adicionou texto principal dividido, vocabulário em contexto, perguntas com evidência textual, produção curta e render seguro.
- Criou estilos modulares em `fluency-clean/src/styles/reading-complete-render-review.css`.
- Importou o estilo em `main.jsx`.
- Criou documentação em `fluency-clean/docs/BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB.md`.

### `BLOCO-READING-1 — Estrutura pedagógica fixa da aba Reading` — IMPLEMENTADO

Decisão pedagógica:
- Reading agora deve ser uma aula completa dentro da própria aba.
- A Prática Profunda é complemento posterior, não substitui os exercícios internos da Reading.

O que foi feito:
- Adicionada ordem oficial da aula Reading:
  1. Objetivo
  2. Pré-leitura
  3. Texto principal
  4. Ideia geral
  5. Vocabulário em contexto
  6. Compreensão e evidência
  7. Produção curta
  8. Conclusão
- Adicionada seção `Pré-leitura` antes do texto.
- Separada a primeira pergunta como `Ideia geral`.
- Mantidas as demais perguntas em `Compreensão com evidência textual`.
- Criado componente interno `QuestionCard` para padronizar perguntas.
- Adicionados rótulos de habilidade: ideia geral, detalhe, vocabulário, sequência, evidência e inferência.
- Em `LessonScreen.jsx`, a Prática Profunda agora aparece depois da aula quando `lesson.type === 'reading'`, com card de complemento.
- Para Grammar, Listening e Writing, a posição da Prática Profunda foi mantida como antes.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-1-ESTRUTURA-PEDAGOGICA-FIXA-LAB.md`.

### `BLOCO-READING-2 — Política por nível A1→C1` — IMPLEMENTADO

Objetivo:
- Criar uma política formal para a aba Reading se adaptar conforme o nível do aluno sobe.

O que foi feito:
- Criado `fluency-clean/src/reading/readingLevelPolicy.js`.
- Definidos níveis A1, A2, B1, B2 e C1.
- Definidas habilidades oficiais de Reading:
  - `main_idea`
  - `detail`
  - `vocabulary_context`
  - `sequence`
  - `evidence`
  - `inference`
  - `author_purpose`
  - `fact_opinion`
  - `tone`
  - `implication`
  - `critical_response`
- Cada nível agora tem:
  - objetivo do aluno;
  - faixa ideal de palavras;
  - orientação de parágrafos;
  - idioma das perguntas;
  - suporte em português/inglês;
  - tipos de texto permitidos;
  - habilidades permitidas;
  - mistura mínima de perguntas;
  - produção final esperada;
  - tom da UI/aula.
- `ReadingLesson.jsx` passou a importar `getReadingLevelPolicy`.
- A produção curta usa internamente a instrução definida pela política do nível.
- O `Render seguro` foi compactado para não poluir a aula.
- Criada documentação em `fluency-clean/docs/BLOCO-READING-2-POLITICA-POR-NIVEL-A1-C1-LAB.md`.

### `HOTFIX-READING-2 — Remover poluição técnica da aula` — IMPLEMENTADO

Motivo:
- O card visual `Plano do nível` deixava a aula poluída e mostrava informação interna que não precisa aparecer para o aluno.

O que foi feito:
- Removido o card `Plano do nível` de `ReadingLesson.jsx`.
- Mantida a política por nível funcionando internamente.
- Mantida a produção final baseada no nível.
- Compactado o card lateral de segurança para `Aula segura`.
- Removidos estilos não usados de `reading-complete-render-review.css`.

Pendente validar no iPhone:
- Botão `Testar Reading` abre a aula.
- Não aparece mais o card `Plano do nível`.
- A aula continua mostrando apenas conteúdo útil: objetivo, fluxo, pré-leitura, texto, ideia geral, vocabulário, compreensão, produção e complemento.
- O card técnico lateral está discreto e não domina a tela.

### Próximo bloco recomendado

`BLOCO-READING-3 — Contrato JSON próprio de Reading`

Objetivo:
- Criar contrato próprio de Reading com campos como `readingText`, `textGenre`, `preReading`, `readingQuestions`, `evidenceTasks` e `postReadingPrompts`.
- Manter compatibilidade com aulas antigas que ainda usam `listeningText`.
- Preparar o gerador para parar de tratar Reading como Listening.
- Importante: o contrato deve ser interno. Não renderizar cards técnicos do contrato dentro da aula.

## ALERTA IMPORTANTE — BLOCO QUE FOI ESQUECIDO NA LISTA ANTERIOR

O bloco de continuação do sistema de trilha/vocabulário estava faltando na lista anterior. Ele deve ficar entre Reading/Speaking e a correção final da prática profunda.

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente dois fluxos:
  1. `Trilha de vocabulário`: percurso longo por bolhas/tópicos/níveis;
  2. `Flashcards da aula`: revisão adaptativa da aula atual, acessada pelo botão superior.

Escopo recomendado:
- Validar visual da aba Cartas no iPhone.
- Remover qualquer duplicação de `Flashcards da aula` dentro da lista da trilha.
- Manter apenas o botão superior `Flashcards da aula` ao lado de `Trilha de vocabulário`.
- Continuar construção da trilha:
  - bolhas por tópico;
  - desbloqueio progressivo;
  - níveis por bolha;
  - revisão espaçada;
  - progresso real;
  - integração com tarefas do dia.
- Melhorar a tela de estudo da bolha:
  - palavras novas;
  - tradução visual;
  - áudio;
  - exercícios de fixação;
  - conclusão da bolha;
  - registro no progresso.
- Garantir que a trilha não dependa da aula do dia.
- Garantir que os flashcards da aula não se misturem com a trilha.

Critérios:
- Não quebrar a aba `Aula`.
- Não quebrar a prática profunda.
- Não misturar cards da aula com cards da trilha.
- Não usar dados fictícios como se fossem progresso real.

Últimos ajustes relacionados:
- Botão superior `Flashcards da aula` passou a aparecer quando há vocabulário da aula.
- Botão duplicado dentro de `Tópicos por nível` foi removido por CSS.
- Ainda precisa validação no iPhone depois do deploy.

## ORDEM DEFINIDA PELO USUÁRIO PARA OS PRÓXIMOS CHATS/BLOCOS

Plano atual de Reading em andamento:
1. `BLOCO-READING-3 — Contrato JSON próprio de Reading`
2. `BLOCO-READING-4 — Geração da aula Reading por habilidade`
3. `BLOCO-READING-5 — Render por etapas`
4. `BLOCO-READING-6 — Exercícios internos da aba Reading`
5. `BLOCO-READING-7 — Evidência textual inteligente`
6. `BLOCO-READING-8 — Quality gate Reading`

Depois retomar a ordem macro:
- `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`
- `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`
- `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB` — aguardar o usuário mandar o modelo antes de iniciar

## BLOCOS PENDENTES POR ORDEM DE IMPORTÂNCIA

### 1. `HOTFIX-VALIDATION-UI-CARDS-PRACTICE-LAB`

Status: pendente de validação no iPhone.

Objetivo:
- Confirmar que os últimos hotfixes de UI realmente apareceram no Vercel preview.

Checklist:
- Botão duplicado `Flashcards da aula` dentro de `Tópicos por nível` deve sumir.
- Deve ficar apenas o botão superior ao lado de `Trilha de vocabulário`.
- Botão `Começar prática` deve estar visualmente aceitável e não quebrado.
- Número de exercícios da aula deve bater com a prática profunda.
- Minutos da tela Hoje e tela Aula devem bater ou ficar coerentes.

### 2. `BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`

Status: deve vir depois da sequência atual de Reading, ou quando o usuário mandar avançar.

Objetivo:
- Revisar Speaking de ponta a ponta, mantendo backend Azure privado intocado.

Escopo:
- Melhorar UI do Speaking.
- Melhorar fluxo de fala/resposta.
- Garantir estado visual claro: ouvir, gravar, responder, repetir, concluir.
- Criar experiência segura para A1.
- Manter integração com Azure sem alterar backend.
- Evitar tela poluída e botões redundantes.

### 3. `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`

Status: pendente e agora recolocado na ordem correta.

Objetivo:
- Continuar a trilha de vocabulário/Cartas.
- Finalizar a separação entre trilha e flashcards da aula.
- Desenvolver progressão por bolhas, revisão espaçada e tarefas do dia.

### 4. `BLOCO-PRACTICE-DEEP-SYSTEM-CORRECTION-LAB`

Status: aguardar modelo do usuário.

Objetivo:
- Corrigir o sistema de prática profunda com base no modelo que o usuário vai enviar.

Base de referência:
- `PRACTICE_DEEP_STRUCTURE.md`

Escopo provável:
- Auditar `PracticePlanAdapter.js`.
- Garantir que cada tipo de aula tenha exercícios próprios:
  - Grammar: estrutura, correção, transformação, produção curta.
  - Listening: escuta, ditado, quem falou, compreensão auditiva, shadowing.
  - Reading: complemento posterior à aula Reading, reforçando ideia principal, detalhes, evidência textual, vocabulário em contexto e interpretação.
  - Speaking: repetição, resposta oral curta, mini diálogo, fluidez.
  - Writing: frase guiada, ordem de palavras, correção, reescrita.
- Remover exercícios genéricos demais.
- Impedir respostas vazadas.
- Adaptar dificuldade ao nível A1.

### 5. `BLOCO-PRACTICE-RENDER-SAFETY-GATE-LAB`

Status: depois da correção da prática profunda.

Objetivo:
- Criar trava de segurança antes de renderizar exercícios.

Escopo:
- Detectar resposta vazada no enunciado.
- Validar opções duplicadas ou inválidas.
- Rebaixar exercício avançado demais para A1.
- Converter exercício quebrado em fallback simples.
- Nunca deixar exercício quebrado travar a aula.

### 6. `BLOCO-LISTENING-FINAL-APPROVAL-LAB`

Status: Listening parece funcional, mas ainda precisa aprovação final do usuário.

Checklist:
- Player prepara e toca corretamente no iPhone.
- Cache IndexedDB funciona.
- Primeira escuta continua sem leitura.
- Diálogo multi-voz funciona.
- Pronúncia está aceitável com `pronunciationGuard.js`.
- UI não está poluída.

### 7. `BLOCO-TEMP-PREVIEW-CLEANUP-LAB`

Status: futuro, somente depois que Reading, Listening e Speaking estiverem aprovados.

Objetivo:
- Remover ou esconder o seletor temporário de teste:
  - `Aula real`
  - `Testar Listening`
  - `Testar Diálogo`
  - `Testar Reading`
  - `Abrir Speaking`

### 8. `BLOCO-LAB-PROMOTION-PREP-LAB`

Status: futuro.

Objetivo:
- Preparar promoção controlada da lab para branch estável, sem mexer direto na main.

## ESTADO ATUAL — UI CARDS / PRÁTICA / STATS

### `HOTFIX-PRACTICE-CTA-CARDS-SEPARATION-LAB` — PARCIALMENTE IMPLEMENTADO E EM VALIDAÇÃO

Motivação:
- Usuário apontou que:
  - botão `Começar prática` estava feio/bugado;
  - flashcards adaptativos da aula tinham sumido;
  - a aba Cartas não deveria misturar `Flashcards da aula` dentro da trilha;
  - minutos e quantidade de exercícios estavam inconsistentes.

O que foi feito:
- `lessonStats.js` passou a usar `PracticePlanAdapter` para contagem de exercícios.
- `LessonScreen.jsx` passou a usar `getLessonStats`.
- `TodayScreen.jsx` passou a tentar carregar aula completa via IndexedDB antes de calcular tempo/cards.
- `FlashcardsScreen.jsx` passou a carregar `getCurrentLessonFull()` para achar vocabulário real da aula.
- Adicionado fallback para gerar cards da aula a partir de termos importantes quando a aula não tiver vocabulário estruturado.
- Criado botão superior `Flashcards da aula` ao lado de `Trilha de vocabulário`.
- Removido por CSS o botão duplicado dentro de `Tópicos por nível`.

Pendente:
- Usuário validar no iPhone após deploy.

## ESTADO ANTERIOR — LISTENING

### `HOTFIX-LISTENING-CLEANER-BLIND-NOTE-LAB` — IMPLEMENTADO

- Estado inicial `message` mudou de texto fixo para string vazia.
- A mensagem `<small>` agora só aparece quando houver status real do áudio/player.
- Nota de primeira escuta foi encurtada para:
  - `Primeira escuta sem leitura. Abra o texto só depois de ouvir.`

### `BLOCO-TTS-PRONUNCIATION-GUARD-EXPANSION-LAB` — IMPLEMENTADO

- `pronunciationGuard.js` expandido com nomes brasileiros, frases A1/A2, palavras sensíveis, sons com `you`, contrações e spelling.

### `HOTFIX-LISTENING-CLEAN-PLAYER-INDEXEDDB-CACHE-LAB` — IMPLEMENTADO

- Separou preparo e reprodução do áudio para evitar bloqueio/autoplay no iPhone.
- Criou cache IndexedDB para áudios grandes.
- Removeu card poluído de controle por fala/trecho.

## ESTADO ANTERIOR — GRAMMAR

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar aprovada visualmente na branch `rewrite-fluency-clean-lab`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não remover o preview temporário até o usuário aprovar ou pedir remoção.
- Não iniciar correção profunda da prática antes de o usuário mandar o modelo prometido.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado. Reading agora está sendo reconstruída como aula completa dentro da própria aba. A Prática Profunda em Reading é complemento posterior, não substitui a aula. O último ajuste foi `HOTFIX-READING-2 — Remover poluição técnica da aula`, que removeu o card visual Plano do nível e manteve a política por nível internamente. O próximo bloco recomendado é `BLOCO-READING-3 — Contrato JSON próprio de Reading`."
