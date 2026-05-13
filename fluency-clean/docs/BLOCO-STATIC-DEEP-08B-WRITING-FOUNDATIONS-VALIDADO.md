# BLOCO-STATIC-DEEP-08B — Validação Writing A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Writing A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-WRITING-001` — Write a short introduction
2. `A1-WRITING-002` — Write a simple profile
3. `A1-WRITING-003` — Write about your family
4. `A1-WRITING-004` — Write country, city and contact info

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepWritingFoundations.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`

## Critérios do BLOCO 8B

Validar Writing A1 Foundations contra:

- estrutura profunda;
- conteúdo pedagógico;
- ausência de pedido solto de texto;
- modelo antes da produção;
- análise do modelo;
- blocos reutilizáveis;
- gramática para escrita;
- substituição guiada;
- erros comuns;
- rascunho;
- checklist;
- versão final;
- conexão com currículo fixo novo;
- ausência de conteúdo genérico.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

As 4 aulas de Writing foram criadas com `createWritingLesson`, usando o padrão:

```js
static-lesson-schema-v2-deep
```

As aulas contêm os campos globais profundos:

- `teacherOpening`
- `whyItMatters`
- `realLifeUseCases`
- `conceptExplanation`
- `mentalModel`
- `stepByStep`
- `portugueseContrast`
- `guidedDiscovery`
- `guidedBeforeQuiz`
- `selfAssessment`
- `lessonRecap`
- `nextLessonBridge`

E os campos específicos de Writing:

- `modelText`
- `modelTextBreakdown`
- `writingBlocks`
- `grammarForWriting`
- `usefulSentences`
- `guidedSubstitution`
- `commonWritingMistakes`
- `checklist`
- `revisionChecklist`
- `draftTask`
- `revisionTask`
- `finalVersionTask`
- `feedbackPreparation`

### 2. Não pede texto livre sem preparação

Status: aprovado como pacote inicial.

Cada aula segue a sequência:

1. modelo de texto;
2. análise do modelo;
3. blocos reutilizáveis;
4. gramática para escrita;
5. substituição guiada;
6. erros comuns;
7. rascunho;
8. revisão/checklist;
9. versão final.

O aluno não recebe uma tarefa solta de escrita antes de ver modelo, estrutura e revisão.

### 3. Modelo antes do rascunho

Status: aprovado.

Cada aula contém `modelText` e `modelTextBreakdown` antes de `draftTask`.

Exemplos de modelos:

- short introduction;
- simple profile;
- family description;
- student profile/contact info.

### 4. Blocos reutilizáveis

Status: aprovado.

Cada aula contém `writingBlocks` e `usefulSentences`, permitindo que o aluno escreva por blocos seguros antes de tentar produção final.

### 5. Gramática para escrita

Status: aprovado.

Cada aula contém `grammarForWriting` com foco prático:

- `I am` para idade;
- `from` para país;
- `a` antes de `student`;
- `live in` para cidade;
- `like` sem `of`;
- `family is`;
- `parents are`;
- maiúsculas em nomes próprios.

### 6. Erros comuns de brasileiros

Status: aprovado.

Cada aula contém `commonWritingMistakes` com pares errado/correto e explicação.

Exemplos:

- `I have 20 years.` → `I am 20 years old.`
- `I am Brazil.` → `I am from Brazil.`
- `I like of music.` → `I like music.`
- `My parents is from Brazil.` → `My parents are from Brazil.`
- `Country: Brazilian` → `Country: Brazil`

### 7. Rascunho, revisão e versão final

Status: aprovado.

Cada aula possui:

- `draftTask`
- `revisionTask`
- `finalVersionTask`
- `revisionChecklist`
- `feedbackPreparation`

Isso garante processo de escrita completo, não só resposta final.

### 8. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`
- `escreva sobre você`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 9. Conexão ao currículo fixo

Status: aprovado conceitualmente.

`staticLessonContent.js` importa:

- `A1_DEEP_WRITING_FOUNDATIONS`
- `A1_DEEP_WRITING_BY_PILLAR`

E prioriza Writing profundo antes das versões antigas.

### 10. Renderização mobile

Status: exige teste visual no iPhone.

O renderizador profundo já possui suporte a Writing, mas o usuário deve testar:

- se `modelText` aparece como modelo claro;
- se `modelTextBreakdown` não fica pesado demais;
- se rascunho, revisão e versão final aparecem em ordem;
- se checklist não fica escondido pela barra inferior;
- se a aula não parece tela antiga/legada.

## Estado do BLOCO 8B

Writing A1 Foundations está validado como pacote inicial profundo.

Isso significa que todos os pilares de Foundations A1 possuem base profunda conectada ao currículo:

- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing

## Próximo bloco recomendado

## BLOCO 9A — Auditoria integrada das Foundations A1

Antes de avançar para A1.2, recomenda-se uma auditoria integrada para:

- verificar se todos os pilares aparecem corretamente no mapa;
- testar atalhos Reading/Listening/Speaking/Writing;
- checar se `validateStaticReadyLessons('A1')` não precisa de ajuste por pilar;
- revisar renderização mobile das aulas profundas;
- garantir que flashcards não geram cards ruins para Reading/Listening/Speaking/Writing;
- conferir se o progresso continua estável.

Depois da auditoria integrada, avançar para:

## BLOCO 10A — A1.2 Personal life profundo

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-08A-WRITING-FOUNDATIONS-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-08B-WRITING-FOUNDATIONS-VALIDADO.md.
Grammar, Vocabulary, Reading, Listening, Speaking e Writing A1 Foundations profundos foram criados, conectados e validados como pacotes iniciais. Próximo bloco recomendado: BLOCO 9A — Auditoria integrada das Foundations A1 antes de avançar para A1.2.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Auditar integração, currículo, renderização mobile, atalhos, progresso e flashcards antes de criar A1.2.
```
