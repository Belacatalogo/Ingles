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

## NOVA DIREÇÃO OFICIAL — CURSO FIXO PREMIUM + IA AUXILIAR

Decisão estratégica aprovada pelo usuário:

- O Fluency NÃO deve depender de IA para gerar a aula principal em tempo real.
- O sistema de geração dinâmica de aulas por IA, reparos, fallback externo, JSON parser, Groq/Cerebras/DeepSeek como geradores de aula principal deve sair do fluxo principal.
- A nova arquitetura oficial será: curso fixo premium A1 → C2 + prática profunda derivada da aula fixa + IA apenas como tutora/corretora/revisora adaptativa.
- A IA pode continuar útil para corrigir Writing, avaliar Speaking, explicar dúvidas, gerar reforço pequeno baseado na aula atual e montar revisão adaptativa, mas não deve inventar a aula-base.
- A aula principal deve vir de conteúdo fixo, curado, completo, validado e renderizado de forma previsível.
- A Prática Profunda deve ser alterada no momento adequado para consumir as aulas fixas premium e gerar questões melhores derivadas do conteúdo, sem inventar fora da aula.

### Novo fluxo desejado

```txt
Curso fixo premium
↓
Curriculum Engine escolhe a próxima aula
↓
Renderizador estável por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA Tutor apenas para correção, dúvida, reforço e revisão adaptativa
↓
Mastery Gate libera ou bloqueia avanço
```

### Fluxo antigo a aposentar

```txt
IA gera aula completa do zero
↓
Parser tenta entender JSON
↓
Pipeline tenta corrigir
↓
Professor revisor tenta aprovar
↓
Aula salva
↓
Renderização quebra ou fica inconsistente
```

## DIRETRIZ DE UI — NÃO POLUIR A AULA

- Regras internas, contrato JSON, política pedagógica, diagnóstico técnico e detalhes de implementação não devem aparecer como cards grandes dentro da aula.
- A aula deve mostrar apenas o que ajuda o aluno a estudar.
- Informações técnicas devem ficar no código, handoff, docs ou diagnóstico apropriado.
- Quando for necessário mostrar segurança/estado, usar texto curto e discreto.

## ESTADO GERAL HERDADO

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

## PLANO MESTRE — STATIC CURRICULUM A1 → C2

### BLOCO-STATIC-00-MASTERPLAN-DOCS

Objetivo:
- Documentar oficialmente a mudança para curso fixo premium.
- Criar os documentos de arquitetura antes de mexer pesado no app.

Arquivos sugeridos:
- `fluency-clean/docs/STATIC-CURRICULUM-MASTERPLAN.md`
- `fluency-clean/docs/LESSON-SCHEMA.md`
- `fluency-clean/docs/A1-CURRICULUM-MAP.md`
- `fluency-clean/docs/AI-TUTOR-ROLE.md`

Deve conter:
- IA não gera mais aula principal.
- Curso fixo A1 → C2 é a fonte da verdade.
- IA vira tutora, corretora e revisora adaptativa.
- Pilares oficiais: Grammar, Vocabulary, Reading, Listening, Speaking, Writing, Review/Checkpoint.
- Critérios de avanço por nível.
- Ordem dos blocos de implementação.

Incrementos possíveis dentro do bloco:
- Documentar riscos do sistema antigo.
- Documentar que geração dinâmica fica modo legado/oculto.
- Documentar que nenhum novo bloco deve reativar geração por IA como fluxo principal sem autorização explícita.

### BLOCO-STATIC-01-CURRICULUM-ENGINE

Objetivo:
- Criar o motor que decide próxima aula, pré-requisitos, bloqueios, revisões e avanço de nível.

Arquivos sugeridos:
- `fluency-clean/src/services/curriculumEngine.js`
- `fluency-clean/src/services/lessonProgression.js`
- `fluency-clean/src/services/masteryGate.js`
- `fluency-clean/src/content/curriculum/index.js`

Requisitos:
- Saber nível atual do aluno.
- Saber aulas concluídas.
- Saber progresso por pilar.
- Respeitar pré-requisitos.
- Priorizar revisão se houver erro recorrente.
- Escolher próxima aula fixa disponível.
- Bloquear avanço quando mastery estiver baixo.

Incrementos possíveis:
- Tela “Mapa do Curso”.
- Barra de progresso por nível.
- Progresso por pilar.
- Motivo claro para aula bloqueada.

### BLOCO-STATIC-02-LESSON-SCHEMAS

Objetivo:
- Definir o schema definitivo das aulas fixas por pilar.

Schema base obrigatório:
- `id`
- `level`
- `pillar`
- `title`
- `order`
- `estimatedMinutes`
- `prerequisites`
- `objectives`
- conteúdo principal por tipo
- exercícios internos
- produção
- revisão
- `masteryCriteria`

Schemas por pilar:

Grammar:
- `explanationSections`
- `professorExamples`
- `commonMistakes`
- `guidedPractice`
- `transformationPractice`
- `productionTasks`
- `finalChecklist`

Reading:
- `preReading`
- `mainText`
- `vocabulary`
- `comprehensionQuestions`
- `evidenceTasks`
- `shortResponse`
- `productionTask`

Listening:
- `audioScript`
- `firstListenTasks`
- `secondListenTasks`
- `transcript`
- `vocabulary`
- `shadowing`
- `comprehensionQuestions`

Speaking:
- `modelPhrases`
- `substitutionDrills`
- `pronunciationFocus`
- `guidedSpeaking`
- `recordingTasks`
- `freeSpeaking`

Writing:
- `modelText`
- `writingBlocks`
- `guidedSubstitution`
- `grammarForWriting`
- `checklist`
- `draftTask`
- `revisionTask`

Incrementos possíveis:
- Validadores locais por schema.
- IDs únicos.
- Verificação de pré-requisitos existentes.
- Relatório de aula inválida.

### BLOCO-STATIC-03-REMOVE-AI-GENERATOR-FROM-FLOW

Objetivo:
- Remover/desativar a geração dinâmica de aula por IA como fluxo principal.

O que fazer:
- Esconder botão “Gerar aula”.
- Substituir por “Abrir próxima aula” ou “Continuar curso”.
- Mover `LessonGeneratorPanel` e serviços de geração para legado ou dev-only.
- Manter IA apenas em funções auxiliares.

Não apagar tudo de início:
- Primeiro ocultar/desconectar do fluxo principal.
- Depois remover quando curso fixo estiver estável.

Incrementos possíveis:
- Flag `USE_STATIC_CURRICULUM = true`.
- Aviso interno no handoff: geração por IA é legado.

### BLOCO-STATIC-04-A1-CURRICULUM-MAP

Objetivo:
- Criar mapa completo do A1 antes de escrever as aulas.

A1 Grammar — sugestão de 27 aulas:
1. Subject pronouns
2. Verb to be — affirmative
3. Verb to be — negative
4. Verb to be — questions
5. Short answers with to be
6. Possessive adjectives
7. Articles: a/an
8. Plural nouns
9. This/that/these/those
10. There is/there are
11. Have/has
12. Simple adjectives
13. Basic word order
14. Present Simple — I/you/we/they
15. Present Simple — he/she/it
16. Present Simple negatives
17. Present Simple questions
18. Adverbs of frequency
19. Prepositions of place
20. Prepositions of time
21. Can/can’t
22. Imperatives
23. Object pronouns
24. Basic conjunctions: and, but, because
25. Review Grammar A1 part 1
26. Review Grammar A1 part 2
27. Grammar Checkpoint A1

A1 Vocabulary — sugestão de 20 aulas:
1. Greetings
2. Personal information
3. Numbers 0–100
4. Countries and nationalities
5. Family
6. Jobs
7. Classroom objects
8. Common adjectives
9. Colors
10. Days and months
11. Time
12. Daily routine verbs
13. Food and drinks
14. Places in town
15. House and furniture
16. Clothes
17. Weather
18. Basic feelings
19. Common verbs
20. Review Vocabulary A1

A1 Reading — sugestão de 20 aulas:
1. Short introductions
2. A simple profile
3. A family description
4. A classroom text
5. A daily routine
6. A simple message
7. A short email
8. A café menu
9. A timetable
10. A description of a house
11. A simple work profile
12. A weekend plan
13. Reading for names and numbers
14. Reading for places
15. Reading for routine actions
16. Main idea in short texts
17. Details in short texts
18. Vocabulary from context
19. Reading Review A1
20. Reading Checkpoint A1

A1 Listening — sugestão de 18 aulas:
1. Greetings and names
2. Spelling names
3. Numbers and phone numbers
4. Countries and cities
5. Classroom instructions
6. Family introductions
7. Daily routine
8. Time and schedules
9. Ordering food
10. Asking where something is
11. Simple directions
12. Weather and feelings
13. Short conversations
14. Listening for names
15. Listening for numbers
16. Listening for places
17. Listening Review A1
18. Listening Checkpoint A1

A1 Speaking — sugestão de 18 aulas:
1. Say hello and goodbye
2. Introduce yourself
3. Spell your name
4. Say your country and city
5. Talk about your family
6. Talk about your job/study
7. Describe yourself
8. Say what you like
9. Ask simple questions
10. Answer simple questions
11. Talk about your routine
12. Talk about time
13. Order something simple
14. Ask where something is
15. Describe your room
16. Speak for 30 seconds about yourself
17. Speaking Review A1
18. Speaking Checkpoint A1

A1 Writing — sugestão de 16 aulas:
1. Write simple sentences
2. Write your name and country
3. Write a personal introduction
4. Write about your family
5. Write about your job/studies
6. Write about your routine
7. Write about likes and dislikes
8. Write a simple message
9. Write a short email
10. Write about your house
11. Write about your weekend
12. Write questions and answers
13. Fix punctuation and capitalization
14. Connect sentences with and/but/because
15. Writing Review A1
16. Writing Checkpoint A1

Total A1 estimado: 119 aulas.

### BLOCO-STATIC-05-A1-CONTENT-FOUNDATIONS

Objetivo:
- Criar o primeiro pacote real de conteúdo A1.

Pacote A1.1 — Fundamentos pessoais:
- Grammar 001–006
- Vocabulary 001–005
- Reading 001–003
- Listening 001–004
- Speaking 001–004
- Writing 001–003

Tema:
- nome
- país
- cidade
- apresentação
- cumprimentos
- pronomes
- verbo to be

Qualidade mínima:
- Grammar: 6–8 seções, 20–40 exemplos, 18–25 exercícios internos.
- Reading: texto A1 120–220 palavras, 8–12 perguntas com evidência.
- Listening: transcrição 100–220 palavras, primeira/segunda escuta, shadowing.
- Speaking: modelos, substituição, gravação guiada.
- Writing: modelo, blocos, substituição, checklist e produção.

### BLOCO-STATIC-06-RENDERERS-STABLE

Objetivo:
- Ajustar os renderizadores para o novo schema fixo.

Renderizadores:
- `GrammarLesson.jsx`
- `ReadingLesson.jsx`
- `ListeningLesson.jsx`
- `SpeakingLesson.jsx`
- `WritingLesson.jsx`

Regras:
- Não depender de campos improvisados vindos da IA.
- Não mostrar gabarito antes da interação.
- Não quebrar se aula fixa estiver válida.
- Renderizar exercícios internos da aula antes da Prática Profunda.

Incrementos possíveis:
- Stepper por pilar.
- Cards de objetivo e checklist.
- Modo discreto de “aula segura”.

### BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS — ALTERAR PRÁTICA PROFUNDA QUANDO FOR ADEQUADO

Objetivo:
- Mudar a Prática Profunda para consumir aulas fixas premium e gerar questões melhores.
- Este bloco deve ser executado quando o schema fixo e os primeiros conteúdos A1 já estiverem criados, para evitar refatorar prática em cima de dados ainda instáveis.

Nova regra:
- A Prática Profunda deve ser complementar, não substituta da aula.
- Deve derivar tudo da aula fixa.
- Não pode inventar regra, vocabulário, áudio, pergunta ou contexto fora da aula.

Novo fluxo:

```txt
staticLesson
↓
normalizeStaticLessonForPractice()
↓
buildPracticePlanByPillar()
↓
validatePracticePlan()
↓
PracticeLauncher
```

Arquivos sugeridos:
- `fluency-clean/src/practice/staticPracticeAdapter.js`
- `fluency-clean/src/practice/quality/validatePracticePlan.js`
- builders por pilar dentro de `practice/core/builders/`

Grammar Practice premium:
- reconhecimento: 5
- completar lacuna: 5
- corrigir erro: 4
- transformar frase: 4
- tradução controlada: 4
- produção própria: 3
- revisão de erro brasileiro: 3
- total desejado: 20–30 exercícios por aula Grammar A1.

Reading Practice premium:
- ideia geral
- detalhes explícitos
- evidência textual
- vocabulário pelo contexto
- sequência
- inferência simples
- resumo curto
- produção conectada
- toda questão deve ter `questionPt`, `answer`, `evidence`, `explanationPt`.

Listening Practice premium:
- primeira escuta sem texto
- segunda escuta com foco
- transcrição parcial
- shadowing
- dictation leve
- compreensão final
- produção oral curta
- nada pode ser perguntado se não estiver no transcript/audioScript.

Speaking Practice premium:
- ouvir modelo
- repetir frase
- substituir palavra
- responder pergunta simples
- criar resposta própria
- gravar
- comparar com checklist

Writing Practice premium:
- copiar modelo
- identificar blocos
- trocar informação
- completar frase
- corrigir erro
- montar parágrafo
- checklist
- revisar versão final

Quality Gate da prática:
- Grammar: mínimo 20 questões, 5 tipos diferentes, produção final.
- Reading: mínimo 10 questões, todas com evidência, sem perguntas genéricas.
- Listening: transcript, perguntas alinhadas, shadowing e primeira escuta.
- Speaking: modelos, substituições, gravação, fala livre.
- Writing: modelo, checklist, produção final, revisão.

Incrementos possíveis:
- Registro de erro por mastery tag.
- SRS puxando erro recorrente.
- IA gerando apenas 5 questões extras baseadas na aula fixa, quando solicitado.

### BLOCO-STATIC-08-MASTERY-GATES

Objetivo:
- Criar critérios reais de domínio por aula, por pilar e por nível.

Aula concluída somente se:
- conteúdo aberto;
- prática principal feita;
- produção final feita;
- não pulou tudo direto.

Saída do A1 somente se:
- Grammar >= 75%
- Reading >= 75%
- Listening >= 70%
- Speaking >= 65%
- Writing >= 70%
- Vocabulary >= 80%
- Final checkpoint aprovado

Incrementos possíveis:
- Tela “Pronto para A2?”
- Explicação do que falta.
- Revisão obrigatória antes de avançar.

### BLOCO-STATIC-09-AI-TUTOR-ONLY

Objetivo:
- Reposicionar IA como auxiliar.

Funções permitidas:
- Corrigir Writing.
- Avaliar Speaking.
- Explicar dúvida da seção atual.
- Gerar reforço pequeno baseado somente na aula atual.
- Criar revisão adaptativa baseada em erros.

Funções proibidas no fluxo principal:
- Gerar aula completa.
- Substituir currículo fixo.
- Inventar conteúdo fora do nível.
- Avançar aluno sem mastery.

Ajustes de UI:
- Chaves de IA devem aparecer como “IA Tutor”, “Correção de Writing”, “Feedback de Speaking”, “Revisão Adaptativa”.
- Não usar mais “Gerador de aula”, “Fallback externo”, “Reparador de aula” como conceito principal.

### BLOCO-STATIC-10-A1-FULL-CONTENT

Objetivo:
- Completar todas as aulas A1 depois do pacote Foundations.

Pacotes:
- A1.2 — Família, objetos e descrição.
- A1.3 — Rotina e Present Simple.
- A1.4 — Situações práticas.
- A1.5 — Revisões e checkpoints.

Regra:
- Não passar para A2 sem A1 completo e validado.

### BLOCO-STATIC-11-A1-CHECKPOINTS

Objetivo:
- Criar checkpoints finais e intermediários.

Checkpoints:
- Grammar A1
- Vocabulary A1
- Reading A1
- Listening A1
- Speaking A1
- Writing A1
- Final A1 Checkpoint

Se reprovar:
- Não avança.
- Gera trilha de revisão baseada em pontos fracos.

### BLOCO-STATIC-12-A2-MAP

Objetivo:
- Planejar A2 somente depois de A1 estar funcionando.

A2 incluirá:
- Past Simple
- Present Continuous
- Future going to
- Comparatives/Superlatives
- Countable/Uncountable
- Modals básicos
- Object pronouns
- Quantifiers
- Emails, convites, relatos simples, viagens e problemas cotidianos.

### BLOCO-STATIC-13-B1-B2-C1-C2-MAPS

Objetivo:
- Planejar níveis superiores sem implementar antes de A1/A2.

B1:
- independência, narração, opinião simples, textos adaptados.

B2:
- argumentação, fluência, textos longos, comunicação profissional.

C1:
- nuance, precisão, naturalidade, textos complexos.

C2:
- domínio, estilo, argumentação sofisticada, compreensão quase nativa.

### BLOCO-STATIC-14-STATIC-CURRICULUM-VALIDATOR

Objetivo:
- Criar validação automática do curso fixo.

Arquivo sugerido:
- `fluency-clean/src/content/validators/validateCurriculum.js`

Valida:
- IDs únicos.
- Ordem.
- Pré-requisitos existentes.
- Quantidade mínima por tipo.
- Exercises com resposta.
- Reading com evidência.
- Listening com transcript.
- Writing com modelo.
- Grammar com seções longas.
- Checkpoints completos.

Resultado esperado:
- `A1: aprovado`
- `A2: pendente`
- relatórios de erro por aula.

### BLOCO-STATIC-15-COURSE-SCREEN

Objetivo:
- Criar tela de curso/mapa visual do progresso.

Deve mostrar:
- A1 — Fundamentos
- progresso por pilar
- aulas feitas/total
- próximas aulas
- revisões pendentes
- checkpoints
- aula bloqueada com motivo

### BLOCO-STATIC-16-REVIEW-SYSTEM-FROM-ERRORS

Objetivo:
- Criar revisão inteligente sem gerar aula nova.

Exemplo:
- Erros: `I is`, `She are`, `You is`
- Mastery tag: `grammar:verb-to-be-agreement`
- Revisão recomendada: Grammar A1 002, 003 e prática extra do mesmo tópico.

IA pode explicar o erro, mas a base vem do conteúdo fixo.

## ORDEM RECOMENDADA DOS PRÓXIMOS BLOCOS

1. `BLOCO-STATIC-00-MASTERPLAN-DOCS`
2. `BLOCO-STATIC-01-CURRICULUM-ENGINE`
3. `BLOCO-STATIC-02-LESSON-SCHEMAS`
4. `BLOCO-STATIC-03-REMOVE-AI-GENERATOR-FROM-FLOW`
5. `BLOCO-STATIC-04-A1-CURRICULUM-MAP`
6. `BLOCO-STATIC-05-A1-CONTENT-FOUNDATIONS`
7. `BLOCO-STATIC-06-RENDERERS-STABLE`
8. `BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS`
9. `BLOCO-STATIC-08-MASTERY-GATES`
10. `BLOCO-STATIC-09-AI-TUTOR-ONLY`
11. `BLOCO-STATIC-10-A1-FULL-CONTENT`
12. `BLOCO-STATIC-11-A1-CHECKPOINTS`
13. `BLOCO-STATIC-12-A2-MAP`
14. `BLOCO-STATIC-13-B1-B2-C1-C2-MAPS`
15. `BLOCO-STATIC-14-STATIC-CURRICULUM-VALIDATOR`
16. `BLOCO-STATIC-15-COURSE-SCREEN`
17. `BLOCO-STATIC-16-REVIEW-SYSTEM-FROM-ERRORS`

## ALERTA IMPORTANTE — PRÁTICA PROFUNDA

A Prática Profunda deve mudar, mas somente no momento adequado:

- Não refatorar a Prática Profunda antes de existir schema fixo e primeiras aulas fixas.
- Quando chegar no `BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS`, a prática deve ser reescrita/adaptada para derivar questões premium do conteúdo fixo.
- A Prática Profunda deve ficar como reforço complementar, sempre depois dos exercícios internos da aula.
- Ela nunca deve substituir a aula principal.
- Ela nunca deve inventar conteúdo fora da aula fixa.

## AI TEACHER REVIEWER / CONTEXTO / CURRÍCULO — LEGADO A REPOSICIONAR

### `BLOCO-H1-AI-TEACHER-REVIEWER-LAB` — IMPLEMENTADO TECNICAMENTE

- Prompts de revisão IA por tipo: Grammar, Listening, Reading, Writing e Speaking.
- Revisor IA usando Gemini Flash, com resumo econômico da aula.
- Fallback aprovado se review falhar, sem bloquear o aluno.
- Regeneração automática limitada a 1 tentativa quando score < 78 ou houver `criticalIssues`.
- Merge do revisor mecânico com IA: 40% mecânico + 60% IA.
- `quality.aiReview` anexado na aula final do fallback resiliente.
- Novo direcionamento: reaproveitar como auditor/validador de conteúdo fixo e como tutor auxiliar, não como aprovador de aula gerada dinamicamente.

### `BLOCO-H2-LESSON-HISTORY-CONTEXT-LAB` — IMPLEMENTADO TECNICAMENTE

- Contexto histórico do aluno baseado em SRS, Mastery Tags e Telemetry.
- Injeção no gerador principal em blocos via `lessonJsonContract.js`.
- Contexto histórico também aplicado ao fallback resiliente em `resilientGeminiLessonDraft.js`.
- Fallback resiliente marca `planContract: resilient-json-v1+history-context` e `quality.historyContextApplied = true`.
- Novo direcionamento: reaproveitar histórico para revisão adaptativa e reforço, não para gerar aula-base.

### `BLOCO-H3-CURRICULUM-PRACTICE-BRIDGE-LAB` — IMPLEMENTADO TECNICAMENTE

- Adaptador curricular local com storage `curriculum.currentUnit.v1`.
- Expiração da unidade atual após 12 horas.
- Registro da unidade/aula atual ao abrir `LessonScreen.jsx` e ao clicar em `Começar prática`.
- `normalizeLessonForPractice` popula `context.curriculum`.
- Builder de Grammar prioriza frases relevantes ao tópico curricular via `context.curriculum.isTopicRelevant`, sem excluir frases fora do tópico.
- Novo direcionamento: adaptar para `staticLesson` e currículo fixo.

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

O que foi fechado:
- `main.jsx` agora importa apenas 5 arquivos CSS: `base.css`, `lessons.css`, `practice.css`, `flashcards.css`, `screens.css`.
- Arquivos antigos continuam como fontes internas carregadas por `@import` nos agregadores.
- Comentários `/* de: arquivo.css */` foram adicionados para rastreabilidade.
- Nenhuma regra CSS antiga foi alterada manualmente.
- Nenhum arquivo CSS antigo foi deletado ainda.

Pendência intencional de segurança:
- Remover fisicamente os arquivos CSS antigos só depois de smoke test visual no iPhone.

## ALERTA IMPORTANTE — VOCAB/TRILHA

### `BLOCO-VOCAB-TRAIL-CONTINUATION-LAB` — PENDENTE

Objetivo:
- Continuar o sistema de trilha de vocabulário que estava sendo desenvolvido na aba `Cartas`.
- Separar definitivamente `Trilha de vocabulário` de `Flashcards da aula`.
- No novo plano, a trilha de vocabulário deve se integrar ao currículo fixo A1 → C2.

## NÃO FAZER AGORA

- Não reativar geração dinâmica de aula como fluxo principal.
- Não depender de Gemini/Groq/Cerebras/DeepSeek para criar a aula-base.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não mexer no Firebase/Azure de produção.
- Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` sem bloco específico.
- Não refatorar Prática Profunda antes do schema fixo e primeiras aulas fixas.
- Não compactar conteúdo pedagógico.
- Não passar para A2 antes do A1 estar completo e validado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch obrigatória é `rewrite-fluency-clean-lab`. Não mexa em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Firebase, Azure, sistema de gravação, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`. A nova direção oficial é curso fixo premium A1 → C2 + Prática Profunda complementar derivada da aula fixa + IA apenas como tutora/corretora/revisora adaptativa. Não reativar geração dinâmica de aulas como fluxo principal. Execute os blocos STATIC na ordem do Handoff. A Prática Profunda deve ser alterada no `BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS`, quando o schema fixo e as primeiras aulas fixas já existirem."