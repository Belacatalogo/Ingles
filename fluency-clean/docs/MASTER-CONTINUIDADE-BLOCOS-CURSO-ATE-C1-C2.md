# MASTER — Continuidade dos blocos do curso Fluency

Branch obrigatória: `rewrite-fluency-clean-lab`

Este documento consolida os blocos concluídos, as regras obrigatórias e os próximos blocos do curso fixo premium A1 → C2.

## 1. Regra principal do projeto

O Fluency deve ser um curso fixo premium A1 → C2.

A IA não deve gerar a aula principal do aluno.

A IA deve atuar apenas como:

- tutora;
- corretora;
- revisora;
- avaliadora;
- prática adaptativa complementar.

A aula principal deve ser fixa, profunda, auditável e conectada ao currículo.

## 2. Regras obrigatórias antes de qualquer novo bloco

Antes de iniciar qualquer bloco, a IA deve obrigatoriamente:

1. Ler este documento mestre.
2. Ler `REWRITE_HANDOFF.md`, quando disponível.
3. Ler `fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md`, quando disponível.
4. Ler o último documento de bloco concluído.
5. Conferir a branch atual: `rewrite-fluency-clean-lab`.
6. Não mexer em `main`.
7. Não mexer em `rewrite-fluency-clean`.
8. Não mexer em `bundle.js`.
9. Não usar DOM injection.
10. Não criar bundle patch.
11. Não remendar HTML gigante.
12. Não ativar Firebase real.
13. Não ativar Azure real fora do que já existe.
14. Não ativar Gemini real.
15. Não ativar Cloudinary real.
16. Não colocar credenciais/secrets no frontend.
17. Não mexer no backend Azure privado.
18. Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`, salvo autorização explícita.
19. Manter tudo modular, com arquivos pequenos e bem nomeados.
20. Atualizar um documento de handoff/conclusão ao final de cada bloco.

## 3. Regra de análise antes de executar bloco

Antes de codar qualquer bloco, a IA deve responder internamente a estas perguntas:

1. Qual é o objetivo pedagógico real deste bloco?
2. Este bloco altera conteúdo, UI, progresso, avaliação ou infraestrutura?
3. Quais arquivos já existem e precisam ser lidos antes?
4. Existe risco de quebrar o sistema atual?
5. É melhor criar arquivo novo ou alterar um arquivo existente?
6. O bloco precisa de validação depois?
7. O bloco precisa de documentação de fechamento?
8. O bloco ajuda o aluno a aprender de verdade ou só aumenta quantidade?
9. O bloco respeita a regra: nada de aula principal gerada por IA?
10. O bloco ajuda a medir domínio real antes de avançar de nível?

Nenhum bloco deve ser executado no automático sem essa análise.

## 4. Blocos concluídos — reconstrução profunda A1

### 4.1 Estrutura de aulas fixas profundas

Concluído:

- schema profundo `static-lesson-schema-v2-deep`;
- factories de aulas por pilar;
- validadores de qualidade;
- renderizador profundo `StaticLessonRenderer.jsx`;
- mobile CSS para aulas profundas;
- quality gates estruturais e pedagógicos.

Documentos relacionados:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-LESSON-QUALITY-REWRITE-LAB.md`
- `fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md`

### 4.2 Grammar A1 Foundations

Concluído:

- `A1-GRAMMAR-001` — Subject pronouns
- `A1-GRAMMAR-002` até `A1-GRAMMAR-006`
- conexão com currículo;
- validação inicial.

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepGrammarFoundations.js`
- `fluency-clean/src/content/curriculum/levels/A1/deepGrammarFoundationsExtra.js`

Documento:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-03B-GRAMMAR-FOUNDATIONS-VALIDADO.md`

### 4.3 Vocabulary A1 Foundations

Concluído:

- `A1-VOCABULARY-001` — Greetings
- `A1-VOCABULARY-002` — Personal information
- `A1-VOCABULARY-003` — Numbers 0–100
- `A1-VOCABULARY-004` — Countries and nationalities
- `A1-VOCABULARY-005` — Family basics
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepVocabularyFoundations.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-04A-VOCABULARY-FOUNDATIONS-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-04B-VOCABULARY-FOUNDATIONS-VALIDADO.md`

### 4.4 Reading A1 Foundations

Concluído:

- `A1-READING-001` — Short introductions
- `A1-READING-002` — A simple profile
- `A1-READING-003` — A family description
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepReadingFoundations.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-05A-READING-FOUNDATIONS-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-05B-READING-FOUNDATIONS-VALIDADO.md`

### 4.5 Listening A1 Foundations

Concluído:

- `A1-LISTENING-001` — Greetings and names
- `A1-LISTENING-002` — Spelling names
- `A1-LISTENING-003` — Numbers and phone numbers
- `A1-LISTENING-004` — Countries and cities
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepListeningFoundations.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-06A-LISTENING-FOUNDATIONS-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-06B-LISTENING-FOUNDATIONS-VALIDADO.md`

### 4.6 Speaking A1 Foundations

Concluído:

- `A1-SPEAKING-001` — Say hello and goodbye
- `A1-SPEAKING-002` — Introduce yourself
- `A1-SPEAKING-003` — Spell your name
- `A1-SPEAKING-004` — Say your country and city
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepSpeakingFoundations.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-07A-SPEAKING-FOUNDATIONS-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-07B-SPEAKING-FOUNDATIONS-VALIDADO.md`

### 4.7 Writing A1 Foundations

Concluído:

- `A1-WRITING-001` — Write a short introduction
- `A1-WRITING-002` — Write a simple profile
- `A1-WRITING-003` — Write about your family
- `A1-WRITING-004` — Write country, city and contact info
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepWritingFoundations.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-08A-WRITING-FOUNDATIONS-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-08B-WRITING-FOUNDATIONS-VALIDADO.md`

### 4.8 Auditoria integrada Foundations A1

Concluído:

- revisão de integração dos 6 pilares;
- atalho `Writing fixo` adicionado;
- correção dos flashcards para evitar fallback ruim por título da aula;
- confirmação de que Foundations A1 está integrada como pacote profundo inicial.

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-09A-AUDITORIA-INTEGRADA-FOUNDATIONS-CONCLUIDO.md`

### 4.9 A1.2 Personal Life

Concluído:

- unidade temática `A1.2 Personal life` com 6 pilares:
  - Grammar
  - Vocabulary
  - Reading
  - Listening
  - Speaking
  - Writing
- conexão com currículo;
- validação inicial.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/deepPersonalLife.js`

Documentos:

- `fluency-clean/docs/BLOCO-STATIC-DEEP-10A-A1-2-PERSONAL-LIFE-CONCLUIDO.md`
- `fluency-clean/docs/BLOCO-STATIC-DEEP-10B-A1-2-PERSONAL-LIFE-VALIDADO.md`

## 5. Blocos concluídos — progressão CEFR e domínio real

### 5.1 Level Mastery CEFR Gates

Concluído:

- regra oficial: o aluno não avança de nível apenas por assistir aulas;
- critérios para A1 → A2, A2 → B1, B1 → B2, B2 → C1 e C1 → C2;
- pesos por pilar;
- cálculo de nota ponderada;
- função de avaliação de avanço.

Arquivo:

- `fluency-clean/src/content/curriculum/levelMasteryFramework.js`

Documento:

- `fluency-clean/docs/BLOCO-LEVEL-MASTERY-CEFR-GATES-CONCLUIDO.md`

Regras globais:

```js
lessonCompletionPercent: 100
checkpointAveragePercent: 80
finalExamOverallPercent: 80
minimumPillarPercent: 75
minimumSpeakingPercent: 75
minimumWritingPercent: 75
requiresHumanOrAiReviewForProductiveSkills: true
canAdvanceByLessonsOnly: false
```

Pesos:

```js
grammar: 15
vocabulary: 15
reading: 15
listening: 20
speaking: 20
writing: 15
```

### 5.2 A1 Checkpoints e Final Exam Framework

Concluído:

- checkpoints A1 iniciais;
- estrutura do A1 Final Exam;
- avaliação por pilar;
- rubricas de Speaking e Writing;
- funções de readiness e gate A1.

Arquivo:

- `fluency-clean/src/content/curriculum/levels/A1/a1MasteryAssessments.js`

Documento:

- `fluency-clean/docs/BLOCO-A1-CHECKPOINTS-FINAL-EXAM-FRAMEWORK-CONCLUIDO.md`

Checkpoints criados:

- `A1-CHECKPOINT-FOUNDATIONS`
- `A1-CHECKPOINT-PERSONAL-LIFE`

### 5.3 A1 Mastery Gate Progress Service

Concluído:

- serviço local para controlar estado do A1 Gate;
- leitura/escrita local via localStorage;
- controle de aulas concluídas, checkpoints, scores por pilar, Speaking/Writing revisados;
- resumo de bloqueio/liberação do A2.

Arquivo:

- `fluency-clean/src/services/a1MasteryGateService.js`

Documento:

- `fluency-clean/docs/BLOCO-A1-MASTERY-GATE-PROGRESS-SERVICE-CONCLUIDO.md`

### 5.4 A1 Mastery Gate UI

Concluído:

- componente visual do gate A1;
- CSS modular;
- conexão ao `CourseScreen`;
- import global do CSS.

Arquivos:

- `fluency-clean/src/components/course/A1MasteryGatePanel.jsx`
- `fluency-clean/src/styles/a1-mastery-gate.css`
- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/main.jsx`

Documento:

- `fluency-clean/docs/BLOCO-A1-MASTERY-GATE-UI-CONCLUIDO.md`

### 5.5 Home Course Summary + A1 Gate Sync

Concluído:

- correção do rótulo confuso `Aulas prontas 119/119`;
- separação entre:
  - aulas prontas no mapa;
  - aulas concluídas;
- conexão da Home com `getA1MasteryGateSummary()`;
- CTA para `Ver A1 Mastery Gate` quando apropriado;
- aviso de que A2 não libera só por assistir aula.

Arquivo:

- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

Documento:

- `fluency-clean/docs/BLOCO-HOME-COURSE-SUMMARY-A1-GATE-SYNC-CONCLUIDO.md`

## 6. Quantidade de aulas profundas criadas recentemente

Aulas profundas novas criadas neste ciclo:

| Parte | Aulas |
|---|---:|
| Grammar Foundations | 6 |
| Vocabulary Foundations | 5 |
| Reading Foundations | 3 |
| Listening Foundations | 4 |
| Speaking Foundations | 4 |
| Writing Foundations | 4 |
| A1.2 Personal Life | 6 |
| **Total profundo recente** | **32** |

Observação:

O sistema pode mostrar mais aulas prontas no mapa A1, como `119/119`, porque há conteúdos antigos/prontos já existentes no currículo. Isso não significa que todas essas aulas tenham sido recriadas no padrão profundo premium recente.

## 7. Regra de avanço por nível

Nenhum nível é liberado apenas por aulas concluídas.

Para liberar próximo nível, precisa:

1. concluir 100% das aulas do nível;
2. concluir checkpoints;
3. média mínima de 80% nos checkpoints;
4. fazer prova final do nível;
5. nota final ponderada mínima de 80%;
6. mínimo de 75% em cada pilar;
7. mínimo de 75% em Speaking;
8. mínimo de 75% em Writing;
9. Speaking revisado;
10. Writing revisado.

## 8. Roadmap recomendado até C1/C2

### A1

Status atual:

- Foundations profundas criadas e validadas;
- A1.2 Personal Life criada e validada;
- Gate A1 criado;
- UI inicial do Gate A1 criada;
- Home sincronizada com Gate A1.

Faltam para A1:

1. validar visual da Home pós-sync;
2. validar visual do A1 Mastery Gate no CourseScreen;
3. conectar bloqueio funcional do A2;
4. criar tela real do A1 Final Exam;
5. criar lançamento/correção de notas por pilar;
6. criar checkpoints reais renderizáveis;
7. continuar unidades A1.3+;
8. criar revisão acumulativa A1;
9. validar A1 inteiro;
10. só então liberar A2.

### A2

Criar depois do A1 estar validado:

- A2 Foundations/bridge;
- unidades temáticas A2;
- checkpoints A2;
- A2 Final Exam;
- Gate A2 → B1.

### B1

Criar depois de A2 validado:

- B1 curriculum;
- foco em experiências, opinião, narrativa, conversas sustentadas;
- checkpoints B1;
- B1 Final Exam;
- Gate B1 → B2.

### B2

Criar depois de B1 validado:

- B2 curriculum;
- foco em argumentação, textos longos, listening natural, writing profissional/argumentativo;
- checkpoints B2;
- B2 Final Exam;
- Gate B2 → C1.

### C1

Criar depois de B2 validado:

- C1 curriculum;
- foco em nuance, síntese, fluência, registro, textos complexos;
- checkpoints C1;
- C1 Final Exam;
- Gate C1 → C2.

### C2

Criar depois de C1 validado:

- C2 curriculum;
- foco em proficiência, naturalidade, estilo, implícito, ironia, síntese avançada;
- checkpoints C2;
- C2 Final Exam final.

## 9. Próximos blocos imediatos recomendados

### Bloco 1 — Validação visual pós-sync da Home

Objetivo:

- confirmar se a Home mostra:
  - `Aulas prontas no mapa`;
  - `Aulas concluídas`;
  - CTA correto para Gate/Final Exam;
  - sem `Subject pronouns` como próxima aula quando tudo estiver concluído.

### Bloco 2 — Validar A1 Mastery Gate UI no CourseScreen

Objetivo:

- abrir mapa do curso;
- confirmar painel A1 Gate;
- testar mobile;
- confirmar que aparece apenas no A1;
- confirmar que não quebra CourseScreen.

### Bloco 3 — Bloqueio funcional do A2

Objetivo:

- impedir clique/seleção real do A2 se `canUnlockA2 === false`;
- mostrar pendências do gate;
- permitir A2 apenas quando `evaluateA1FinalGate(...).canAdvance === true`.

### Bloco 4 — Tela real do A1 Final Exam

Objetivo:

- criar tela/fluxo do A1 Final Exam;
- seções por pilar;
- leitura/listening/speaking/writing;
- submissão local;
- cálculo de nota.

### Bloco 5 — Checkpoints reais renderizáveis

Objetivo:

- transformar `A1_CHECKPOINTS` em experiências reais de avaliação;
- registrar scores locais;
- atualizar Gate automaticamente.

### Bloco 6 — Continuar A1.3 Daily Routine profundo

Objetivo:

- criar unidade `A1.3 Daily routine` com 6 pilares;
- validar bloco depois.

## 10. Prompt fixo para próximos chats

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. o último documento de bloco concluído.

Regras obrigatórias:
- não mexer em main;
- não mexer em rewrite-fluency-clean;
- não mexer em bundle.js;
- não usar DOM injection;
- não criar bundle patch;
- não ativar Firebase/Azure/Gemini/Cloudinary real sem autorização;
- não colocar secrets no frontend;
- manter tudo modular;
- antes de iniciar cada bloco, analisar o objetivo e a melhor forma de implementar;
- ao final, criar/atualizar um MD de conclusão do bloco.

Estado atual:
- A1 Foundations profundas criadas/validadas;
- A1.2 Personal Life criada/validada;
- CEFR Level Gates criados;
- A1 Checkpoints/Final Exam Framework criado;
- A1 Mastery Gate Service criado;
- A1 Mastery Gate UI criada;
- Home sincronizada com Gate A1.

Próximo bloco recomendado:
Validação visual pós-sync da Home, depois validar A1 Gate UI, depois bloqueio funcional do A2.
```
