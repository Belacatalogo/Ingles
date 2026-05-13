# BLOCO-STATIC-DEEP-06B — Validação Listening A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Listening A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-LISTENING-001` — Greetings and names
2. `A1-LISTENING-002` — Spelling names
3. `A1-LISTENING-003` — Numbers and phone numbers
4. `A1-LISTENING-004` — Countries and cities

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepListeningFoundations.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`

## Critérios do BLOCO 6B

Validar Listening A1 Foundations contra:

- estrutura profunda;
- conteúdo pedagógico;
- não virar Reading disfarçado;
- primeira escuta antes do transcript;
- segunda escuta com foco;
- transcript liberado depois;
- shadowing;
- dictation leve;
- compreensão;
- produção oral curta;
- renderização pelo sistema fixo novo;
- ausência de conteúdo genérico.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

As 4 aulas de Listening foram criadas com `createListeningLesson`, usando o padrão:

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

E os campos específicos de Listening:

- `listeningPreparation`
- `keyWordsToHear`
- `audioScript`
- `firstListenTasks`
- `secondListenTasks`
- `transcript`
- `vocabulary`
- `shadowing`
- `dictationTasks`
- `pronunciationChunks`
- `listeningComprehension`
- `oralProduction`

### 2. Não é Reading disfarçado

Status: aprovado como pacote inicial.

As aulas não foram estruturadas como texto para ler com perguntas.

Cada aula contém instruções explícitas para:

- fechar o transcript na primeira escuta;
- ouvir por palavras-chave;
- identificar a situação geral primeiro;
- ouvir uma segunda vez buscando detalhes;
- só depois conferir o transcript;
- repetir chunks por shadowing;
- fazer dictation leve;
- produzir oralmente.

### 3. Primeira escuta antes do transcript

Status: aprovado conceitualmente.

Cada aula possui `firstListenTasks` com instrução `Sem transcript`.

Exemplos:

- `Sem transcript: escolha a situação geral.`
- `Sem transcript: qual é a situação?`
- `Sem transcript: qual tipo de informação aparece?`
- `Sem transcript: qual é o tema?`

Isso reforça que o transcript não deve ser usado como primeira etapa.

### 4. Segunda escuta com foco

Status: aprovado.

Cada aula possui `secondListenTasks` com detalhes específicos:

- nomes;
- sobrenome;
- idade;
- telefone;
- país;
- cidade;
- resposta de estado;
- palavras-chave como repeat/live in.

### 5. Shadowing e dictation

Status: aprovado.

Cada aula contém:

- `shadowing` com chunks curtos;
- `dictationTasks` com lacunas leves;
- `pronunciationChunks` com foco de som/ritmo.

Isso garante treino de escuta ativa, não apenas compreensão passiva.

### 6. Produção oral curta

Status: aprovado.

Cada aula contém `oralProduction` com tarefa curta conectada ao áudio.

Exemplos:

- criar mini diálogo com greetings;
- soletrar o próprio nome;
- falar um telefone fictício;
- dizer país, nacionalidade e cidade.

### 7. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 8. Atalho de Listening no novo sistema

Status: aprovado conceitualmente.

A `LessonScreen.jsx` foi corrigida antes deste bloco para deixar de abrir previews legados.

Agora o botão `Abrir Listening fixo` tenta abrir a primeira aula `ready` do pilar `listening` usando `openStaticCourseLesson(...)`.

Como `A1-LISTENING-001` a `004` estão conectadas ao currículo, o atalho deve abrir o novo sistema fixo/profundo.

### 9. Renderização mobile

Status: exige teste visual no iPhone.

O renderizador profundo já possui suporte a Listening, mas o usuário deve testar:

- se o transcript não aparece antes do momento correto;
- se as tarefas de primeira e segunda escuta aparecem em ordem clara;
- se shadowing e dictation estão visíveis;
- se a área de produção oral não fica coberta pela barra inferior;
- se a aula não parece tela antiga/legada.

## Estado do BLOCO 6B

Listening A1 Foundations está validado como pacote inicial profundo.

Isso significa que Grammar, Vocabulary, Reading e Listening Foundations já têm base profunda conectada ao currículo.

## Próximo bloco obrigatório

## BLOCO 7A — Speaking A1 Foundations profundo

Aulas alvo iniciais:

1. `A1-SPEAKING-001` — Say hello and goodbye
2. `A1-SPEAKING-002` — Introduce yourself
3. `A1-SPEAKING-003` — Spell your name
4. `A1-SPEAKING-004` — Say your country and city

Regras:

- Speaking não pode pedir fala livre sem preparar.
- Cada aula precisa ter situação real de fala.
- Deve ter modelo.
- Deve ter repetição guiada.
- Deve ter substitution drills.
- Deve ter pergunta-resposta.
- Deve ter construção de resposta.
- Deve ter gravação guiada.
- Deve ter checklist.
- Deve ter fala livre curta.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-06A-LISTENING-FOUNDATIONS-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-06B-LISTENING-FOUNDATIONS-VALIDADO.md.
Grammar, Vocabulary, Reading e Listening A1 Foundations profundos foram criados e validados como pacotes iniciais. Próximo bloco obrigatório: BLOCO 7A — Speaking A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar Speaking pedindo fala livre sem preparação. Cada aula de Speaking deve ter situação real, modelo, repetição guiada, substitution drills, pergunta-resposta, construção de resposta, gravação guiada, checklist e fala livre curta.
```
