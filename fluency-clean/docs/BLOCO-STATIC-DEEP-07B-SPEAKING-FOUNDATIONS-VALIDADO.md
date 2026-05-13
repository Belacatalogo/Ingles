# BLOCO-STATIC-DEEP-07B — Validação Speaking A1 Foundations

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial do pacote Speaking A1 Foundations.

## Escopo validado

Aulas profundas conectadas ao currículo:

1. `A1-SPEAKING-001` — Say hello and goodbye
2. `A1-SPEAKING-002` — Introduce yourself
3. `A1-SPEAKING-003` — Spell your name
4. `A1-SPEAKING-004` — Say your country and city

Arquivos principais:

- `fluency-clean/src/content/curriculum/levels/A1/deepSpeakingFoundations.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- `fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`
- `fluency-clean/src/content/validators/validateCurriculum.js`

## Critérios do BLOCO 7B

Validar Speaking A1 Foundations contra:

- estrutura profunda;
- conteúdo pedagógico;
- ausência de fala livre sem preparação;
- situação real de fala;
- modelo antes da produção;
- repetição guiada;
- substitution drills;
- pergunta-resposta;
- construção de resposta;
- gravação guiada;
- checklist;
- fala livre curta;
- renderização pelo sistema fixo novo;
- ausência de conteúdo genérico.

## Resultado por critério

### 1. Schema profundo

Status: aprovado conceitualmente.

As 4 aulas de Speaking foram criadas com `createSpeakingLesson`, usando o padrão:

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

E os campos específicos de Speaking:

- `speakingSituation`
- `modelPhrases`
- `pronunciationChunks`
- `repeatAfterMe`
- `substitutionDrills`
- `questionAnswerDrills`
- `buildYourAnswer`
- `recordingTasks`
- `speakingChecklist`
- `freeSpeaking`

### 2. Não pede fala livre sem preparação

Status: aprovado como pacote inicial.

Cada aula segue a sequência:

1. contexto real;
2. modelo;
3. repetição guiada;
4. substituição controlada;
5. pergunta-resposta;
6. construção de resposta;
7. gravação guiada;
8. checklist;
9. fala livre curta.

O campo `freeSpeaking` aparece apenas depois de todos os blocos preparatórios.

### 3. Situação real de fala

Status: aprovado.

Cada aula possui `speakingSituation` claro:

- entrar em uma aula online e cumprimentar;
- apresentar-se no primeiro dia de aula;
- soletrar nome em cadastro;
- apresentar país, nacionalidade e cidade.

### 4. Modelos e repetição guiada

Status: aprovado.

Cada aula possui:

- `modelPhrases` com frases prontas;
- `repeatAfterMe` com chunks curtos;
- `pronunciationChunks` com foco de ritmo/som.

Isso prepara a fala antes da gravação.

### 5. Substitution drills e pergunta-resposta

Status: aprovado.

Cada aula contém:

- `substitutionDrills`, para trocar apenas uma parte da frase;
- `questionAnswerDrills`, para responder perguntas previsíveis.

Isso evita improviso livre cedo demais.

### 6. Construção de resposta

Status: aprovado.

Cada aula possui `buildYourAnswer`, guiando o aluno em etapas.

Exemplos:

- escolher greeting;
- dizer nome;
- dizer idade;
- dizer país/cidade;
- soletrar;
- finalizar com frase curta.

### 7. Gravação guiada e checklist

Status: aprovado.

Cada aula possui:

- `recordingTasks`, com gravações específicas;
- `speakingChecklist`, para revisar antes/depois da gravação.

### 8. Fala livre curta e limitada

Status: aprovado.

As tarefas `freeSpeaking` limitam escopo e tempo:

- 20 segundos;
- 20 a 30 segundos;
- usando apenas blocos treinados;
- sem inventar estrutura nova.

### 9. Ausência de conteúdo genérico

Status: aprovado na busca textual inicial.

Busca realizada por frases genéricas/suspeitas:

- `Modelo A1 para comparar`
- `Variação simples`
- `Exemplo A1`
- `Escolha a alternativa correta`
- `fala livre sem preparação`

Resultado: nenhum resultado encontrado nas buscas atuais.

### 10. Atalho de Speaking no novo sistema

Status: aprovado conceitualmente.

A `LessonScreen.jsx` foi corrigida anteriormente para deixar de abrir previews legados.

Agora o botão `Abrir Speaking fixo` tenta abrir a primeira aula `ready` do pilar `speaking` usando `openStaticCourseLesson(...)`.

Como `A1-SPEAKING-001` a `004` estão conectadas ao currículo, o atalho deve abrir o novo sistema fixo/profundo.

### 11. Renderização mobile

Status: exige teste visual no iPhone.

O renderizador profundo já possui suporte a Speaking, mas o usuário deve testar:

- se model phrases aparecem claros;
- se repeat-after-me fica fácil de seguir;
- se substitution drills não ficam confusos;
- se recording tasks/checklist aparecem antes da fala livre;
- se a área final não fica coberta pela barra inferior;
- se a aula não parece tela antiga/legada.

## Estado do BLOCO 7B

Speaking A1 Foundations está validado como pacote inicial profundo.

Isso significa que Grammar, Vocabulary, Reading, Listening e Speaking Foundations já têm base profunda conectada ao currículo.

## Próximo bloco obrigatório

## BLOCO 8A — Writing A1 Foundations profundo

Aulas alvo iniciais:

1. `A1-WRITING-001` — Write a short introduction
2. `A1-WRITING-002` — Write a simple profile
3. `A1-WRITING-003` — Write about your family
4. `A1-WRITING-004` — Write country, city and contact info

Regras:

- Writing não pode só mandar “escreva sobre você”.
- Cada aula precisa ter modelo de texto.
- Deve ter análise do modelo.
- Deve ter blocos reutilizáveis.
- Deve ter gramática para escrita.
- Deve ter substituição guiada.
- Deve ter erros comuns.
- Deve ter rascunho.
- Deve ter checklist.
- Deve ter versão final.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md, fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md, fluency-clean/docs/BLOCO-STATIC-DEEP-07A-SPEAKING-FOUNDATIONS-CONCLUIDO.md e fluency-clean/docs/BLOCO-STATIC-DEEP-07B-SPEAKING-FOUNDATIONS-VALIDADO.md.
Grammar, Vocabulary, Reading, Listening e Speaking A1 Foundations profundos foram criados e validados como pacotes iniciais. Próximo bloco obrigatório: BLOCO 8A — Writing A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar Writing como pedido solto de texto. Cada aula de Writing deve ter modelo, análise do modelo, blocos reutilizáveis, gramática para escrita, substituição guiada, erros comuns, rascunho, checklist e versão final.
```
