# BLOCO-STATIC-DEEP-LESSON-QUALITY-REWRITE-LAB

Branch obrigatória: `rewrite-fluency-clean-lab`

## Motivo deste bloco

O usuário testou a primeira aula fixa A1 no iPhone e identificou corretamente que a aula ainda está rasa.

Problemas observados nos prints:

- A aula parece uma lista de exemplos, não uma aula de verdade.
- A explicação está curta demais para ensinar o aluno do zero.
- Os exemplos aparecem cedo demais, antes de construir entendimento.
- Alguns exemplos parecem repetitivos e pouco pedagógicos.
- A aula não tem progressão didática suficiente.
- O aluno não é guiado passo a passo.
- Exercícios aparecem sem preparação profunda.
- O conteúdo não está no padrão premium desejado.
- A correção não deve ser apenas em Grammar; deve abranger todos os pilares.

Decisão: criar uma reescrita pedagógica profunda de todas as aulas fixas, em blocos, antes de expandir o curso inteiro.

## Objetivo

Transformar o curso fixo premium em aulas que realmente ensinam, com qualidade superior ao formato atual.

Cada aula deve funcionar como uma mini-aula completa, não como um conjunto de cards genéricos.

O padrão final precisa ser forte o suficiente para competir em profundidade com Duolingo, Babbel e Busuu, mas com foco maior em explicação, clareza para brasileiros, prática guiada e produção real.

## Regra máxima

Não criar mais aulas rasas.

Nenhuma aula deve ser considerada `ready` se ela não cumprir o padrão pedagógico profundo definido neste documento.

Aula `ready` precisa ensinar, treinar, testar e fazer o aluno produzir.

## Regras obrigatórias

- Continuar somente na branch `rewrite-fluency-clean-lab`.
- Não mexer em `main`.
- Não mexer em `rewrite-fluency-clean`.
- Não mexer em `bundle.js`.
- Não usar DOM injection.
- Não criar bundle patch.
- Não mexer no backend Azure privado.
- Não mexer no Firebase/Azure de produção.
- Não mexer em `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx` sem bloco específico.
- Não reativar geração dinâmica de aula por IA como fluxo principal.
- IA pode ajudar a escrever/revisar conteúdo fixo, mas a aula final precisa ficar salva como conteúdo fixo, curado e validável.
- Não marcar aula como pronta se ela for apenas um template preenchido.

## Definição de aula excelente

Uma aula excelente precisa responder claramente:

1. O que o aluno vai aprender?
2. Por que isso importa?
3. Quando usar?
4. Como formar?
5. Como comparar com português?
6. Quais erros brasileiros são comuns?
7. Como reconhecer a estrutura?
8. Como completar lacunas?
9. Como corrigir frases erradas?
10. Como transformar frases?
11. Como usar em contexto real?
12. Como produzir algo próprio?
13. Como revisar antes de concluir?
14. Como a Prática Profunda reforça depois da aula?

Se a aula não responder isso, ela ainda não é premium.

---

# PADRÃO GLOBAL PARA TODAS AS AULAS

Cada aula fixa deve ter esta progressão mínima:

## 1. Abertura do professor

Deve explicar em linguagem simples:

- tema da aula;
- utilidade real;
- o que o aluno vai conseguir fazer no final;
- conexão com a aula anterior;
- cuidado principal para brasileiros.

Não pode ser genérico como:

> Nesta aula você vai estudar X.

Precisa ser específico e didático.

## 2. Conceito central

Explicar o conceito com calma:

- definição simples;
- função na frase/comunicação;
- diferença para o português;
- quando usar;
- quando não usar;
- exemplos comentados.

## 3. Mapa mental da aula

Toda aula deve ter um mapa visual/textual curto:

```txt
Situação real → estrutura → exemplo → erro comum → produção
```

Exemplo Grammar:

```txt
Quero falar de uma pessoa → escolho o pronome → coloco o verbo certo → completo a frase
Luis → he → He is → He is my friend.
```

## 4. Explicação passo a passo

A aula deve quebrar o conteúdo em microetapas.

Exemplo para Subject Pronouns:

1. Identificar quem é a pessoa/coisa.
2. Escolher o pronome correto.
3. Ver se é singular/plural.
4. Montar frase curta.
5. Conferir se o sujeito não foi pulado.

## 5. Comparação com português

Obrigatório em todos os pilares quando fizer sentido.

Exemplo:

- Português permite omitir sujeito: “sou brasileiro”.
- Inglês normalmente exige sujeito: “I am Brazilian”.

## 6. Exemplos comentados

Cada exemplo deve ensinar algo.

Formato recomendado:

```txt
I am Luis.
Eu sou Luis.
Por que funciona: I é o sujeito e am combina com I.
Cuidado: não diga “Am Luis”.
```

Não usar exemplos sem comentário pedagógico.

## 7. Erros comuns de brasileiros

Cada aula deve ter uma seção real de erros brasileiros:

- errado;
- certo;
- por que o erro acontece;
- como evitar;
- mini treino.

Exemplo:

```txt
Errado: Is my phone.
Certo: It is my phone.
Por que acontece: em português dizemos “é meu celular” sem sujeito.
Como evitar: em inglês coloque it antes de is quando fala de objeto.
```

## 8. Prática guiada antes do quiz

Antes de perguntas de múltipla escolha, a aula deve guiar:

- complete junto;
- escolha junto;
- veja raciocínio;
- depois tente sozinho.

## 9. Exercícios internos variados

Mínimo por aula comum:

- 4 reconhecimento;
- 4 lacunas;
- 4 correção de erro;
- 4 transformação;
- 3 tradução controlada;
- 3 produção própria;
- 1 revisão final.

Total mínimo recomendado: 20 a 25 exercícios internos por aula Grammar/Vocabulary/Writing.

Reading/Listening/Speaking têm padrões próprios abaixo.

## 10. Produção própria

Aula sem produção própria não pode ser considerada completa.

O aluno deve escrever, falar, resumir, responder ou montar algo.

## 11. Mini revisão final

Toda aula termina com:

- o que aprendi;
- erros que devo evitar;
- checklist;
- próxima aula;
- prática profunda complementar.

---

# PADRÃO POR PILAR

## A. Grammar — padrão premium

Uma aula de Grammar deve conter:

### Estrutura obrigatória

1. Objetivo real da gramática.
2. Conceito explicado do zero.
3. Fórmula/padrão.
4. Quando usar.
5. Quando não usar.
6. Comparação com português.
7. Mini tabela clara.
8. Exemplos comentados.
9. Erros brasileiros.
10. Prática guiada.
11. Exercícios internos.
12. Produção própria.
13. Checklist.

### Mínimo de conteúdo

- 8 a 12 seções explicativas.
- 20 a 40 exemplos comentados.
- 8 a 12 erros comuns por aula importante.
- 20 a 30 exercícios internos.
- 3 a 5 tarefas de produção.

### Exemplo de padrão esperado

Para `Subject Pronouns`, não basta dizer:

> I = eu, you = você, he = ele.

A aula precisa ensinar:

- que o sujeito em inglês quase sempre aparece;
- que português permite omissão, inglês não;
- que nomes podem virar pronomes;
- que objetos usam `it`;
- que grupos usam `they`;
- que `you` pode ser singular ou plural;
- que `he/she` depende de pessoa, não de palavra;
- que `it` não deve ser usado para pessoa;
- que o pronome muda o verbo depois.

## B. Vocabulary — padrão premium

Vocabulary não pode ser só lista de palavras.

### Estrutura obrigatória

1. Tema real da unidade.
2. Situações em que o vocabulário aparece.
3. Palavras essenciais.
4. Chunks/frases prontas.
5. Pronúncia aproximada ou foco sonoro.
6. Diferenças perigosas para brasileiros.
7. Collocations simples.
8. Mini diálogos.
9. Prática de reconhecimento.
10. Prática de uso.
11. Produção própria.
12. Revisão espaçada.

### Mínimo

- 15 a 25 palavras por aula.
- 10 a 20 chunks úteis.
- 10 exemplos em frase.
- 2 mini diálogos.
- 15 a 25 exercícios.
- 2 tarefas de produção.

### Proibido

- Lista solta sem contexto.
- Tradução isolada sem exemplo.
- Palavra avançada fora do A1.
- Vocabulário que não reaparece em exercícios.

## C. Reading — padrão premium

Reading precisa ensinar leitura, não só mostrar texto.

### Estrutura obrigatória

1. Pré-leitura.
2. Objetivo de leitura.
3. Vocabulário essencial antes do texto.
4. Texto principal adequado ao nível.
5. Primeira leitura: ideia geral.
6. Segunda leitura: detalhes.
7. Evidência textual.
8. Vocabulário pelo contexto.
9. Inferência compatível com nível.
10. Resposta curta.
11. Produção conectada ao texto.
12. Revisão.

### Mínimo A1

- Texto de 120 a 220 palavras.
- Frases curtas, mas naturais.
- 8 a 12 perguntas.
- Toda pergunta de detalhe deve ter evidência.
- 3 tarefas de localizar informação.
- 2 tarefas de vocabulário pelo contexto.
- 1 resumo guiado.
- 1 produção final.

### Proibido

- Texto raso de 4 frases.
- Pergunta genérica sem evidência.
- Pergunta que não está no texto.
- Texto artificial demais sem função.

## D. Listening — padrão premium

Listening precisa simular uma aula de escuta real.

### Estrutura obrigatória

1. Preparação antes de ouvir.
2. Palavras-chave que o aluno deve reconhecer.
3. Primeira escuta sem transcript.
4. Tarefa de ideia geral.
5. Segunda escuta com foco.
6. Tarefa de detalhes.
7. Transcript liberado depois.
8. Shadowing.
9. Dictation leve.
10. Pronúncia/chunks.
11. Compreensão.
12. Produção oral curta.

### Mínimo A1

- Script de 100 a 220 palavras.
- 6 a 10 frases para shadowing.
- 8 perguntas de compreensão.
- 4 tarefas de escuta específica.
- 3 tarefas de completar frase ou palavra.
- 1 produção oral baseada no áudio.

### Proibido

- Mostrar transcript como se fosse leitura comum antes da escuta.
- Perguntar algo que não está no áudio.
- Áudio/texto sem objetivo claro.

## E. Speaking — padrão premium

Speaking precisa ensinar o aluno a falar, não só pedir para gravar.

### Estrutura obrigatória

1. Situação de fala.
2. Modelo curto.
3. Pronúncia/chunks.
4. Repetição guiada.
5. Substituição controlada.
6. Pergunta-resposta.
7. Construção de resposta própria.
8. Gravação guiada.
9. Checklist de fala.
10. Feedback ou preparação para feedback.
11. Fala livre curta.

### Mínimo

- 10 a 20 frases-modelo.
- 8 drills de substituição.
- 8 perguntas/respostas.
- 3 tarefas de gravação.
- 1 fala livre final.
- Checklist simples.

### Proibido

- Apenas mostrar frases.
- Pedir fala livre sem preparar.
- Não explicar pronúncia/chunks.

## F. Writing — padrão premium

Writing precisa ensinar escrita por blocos.

### Estrutura obrigatória

1. Modelo de texto.
2. Leitura do modelo.
3. Blocos do texto.
4. Gramática necessária para escrever.
5. Substituição guiada.
6. Frases úteis.
7. Erros comuns.
8. Rascunho.
9. Revisão por checklist.
10. Versão final.
11. Correção/feedback.

### Mínimo A1

- Modelo de 60 a 120 palavras.
- 6 a 10 blocos úteis.
- 8 frases substituíveis.
- 8 exercícios de correção.
- 1 rascunho.
- 1 versão final.

### Proibido

- Apenas pedir “escreva sobre você”.
- Não dar modelo.
- Não dar checklist.
- Não ensinar estrutura textual.

---

# BLOCO 1 — REFAZER SCHEMA PEDAGÓGICO PROFUNDO

Objetivo:

Atualizar os schemas para suportar aulas realmente completas.

Arquivos prováveis:

- `fluency-clean/src/content/schemas/index.js`
- `fluency-clean/src/content/schemas/grammarSchema.js`
- `fluency-clean/src/content/schemas/vocabularySchema.js`
- `fluency-clean/src/content/schemas/readingSchema.js`
- `fluency-clean/src/content/schemas/listeningSchema.js`
- `fluency-clean/src/content/schemas/speakingSchema.js`
- `fluency-clean/src/content/schemas/writingSchema.js`

Novos campos recomendados:

```js
teacherOpening
whyItMatters
realLifeUseCases
conceptExplanation
mentalModel
stepByStep
portugueseContrast
teacherExamples
guidedDiscovery
commonBrazilianMistakes
controlledPractice
guidedPractice
errorCorrectionPractice
transformationPractice
translationPractice
productionTasks
selfAssessment
lessonRecap
nextLessonBridge
```

Critério de aceite:

- Cada pilar tem schema próprio e profundo.
- O schema antigo continua compatível temporariamente.
- A aula nova não precisa depender de campos improvisados.

---

# BLOCO 2 — REFAZER RENDERIZADORES PARA AULA DE VERDADE

Objetivo:

Alterar os renderizadores para mostrar a aula como uma sequência didática, não como lista de cards.

Arquivos prováveis:

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- renderizadores específicos por pilar, se forem separados.

Requisitos:

- Mostrar explicação em ordem pedagógica.
- Separar claramente:
  - Aprender
  - Entender
  - Ver exemplos
  - Praticar junto
  - Tentar sozinho
  - Produzir
  - Revisar
- Não liberar gabarito antes da tentativa.
- Alternativas devem ser embaralhadas.
- O aluno precisa sentir que está sendo guiado.

Critério de aceite:

- A primeira aula não parece lista de exemplos.
- A aula tem fluxo didático claro.
- Mobile/iPhone continua legível.

---

# BLOCO 3 — REESCREVER GRAMMAR A1 FOUNDATIONS COM QUALIDADE PREMIUM

Objetivo:

Reescrever as primeiras aulas de Grammar A1 com profundidade real.

Aulas alvo:

1. Subject pronouns
2. Verb to be — affirmative
3. Verb to be — negative
4. Verb to be — questions
5. Short answers with to be
6. Possessive adjectives

Cada aula deve ter:

- 8 a 12 seções explicativas.
- 20 a 40 exemplos comentados.
- 8 a 12 erros brasileiros.
- 20 a 30 exercícios internos.
- 3 tarefas de produção.
- 1 revisão final.

Critério de aceite:

- O aluno iniciante entende o conceito do zero.
- A aula ensina antes de cobrar.
- Não há cards genéricos.
- Não há exemplos repetidos sem propósito.

---

# BLOCO 4 — REESCREVER VOCABULARY A1 FOUNDATIONS

Objetivo:

Transformar vocabulário em aula de uso real.

Aulas alvo iniciais:

1. Greetings
2. Personal information
3. Numbers 0–100
4. Countries and nationalities
5. Family

Cada aula deve ter:

- contexto real;
- palavras essenciais;
- chunks;
- mini diálogos;
- pronúncia;
- exemplos em frases;
- exercícios de reconhecimento;
- exercícios de uso;
- produção própria.

Critério de aceite:

- O aluno não vê só lista de palavras.
- Cada palavra aparece em frase e uso real.
- Há prática suficiente para fixar.

---

# BLOCO 5 — REESCREVER READING A1 FOUNDATIONS

Objetivo:

Fazer Reading ensinar estratégia de leitura.

Aulas alvo:

1. Short introductions
2. A simple profile
3. A family description

Cada aula deve ter:

- pré-leitura;
- vocabulário antes do texto;
- texto adequado;
- leitura por ideia geral;
- leitura por detalhe;
- evidência textual;
- vocabulário pelo contexto;
- resumo guiado;
- produção final.

Critério de aceite:

- Toda pergunta de detalhe tem evidência.
- O texto ensina vocabulário e estrutura.
- O aluno aprende como ler, não só responde.

---

# BLOCO 6 — REESCREVER LISTENING A1 FOUNDATIONS

Objetivo:

Fazer Listening funcionar como aula real de escuta.

Aulas alvo:

1. Greetings and names
2. Spelling names
3. Numbers and phone numbers
4. Countries and cities

Cada aula deve ter:

- preparação;
- primeira escuta sem texto;
- foco de escuta;
- transcript depois;
- shadowing;
- dictation leve;
- perguntas alinhadas ao áudio;
- produção oral curta.

Critério de aceite:

- Listening não vira Reading disfarçado.
- O transcript não aparece como foco inicial.
- O aluno treina ouvido e fala.

---

# BLOCO 7 — REESCREVER SPEAKING A1 FOUNDATIONS

Objetivo:

Fazer Speaking ensinar fala progressiva.

Aulas alvo:

1. Say hello and goodbye
2. Introduce yourself
3. Spell your name
4. Say your country and city

Cada aula deve ter:

- modelo;
- repetição;
- substituição;
- pergunta-resposta;
- pronúncia/chunks;
- gravação guiada;
- fala livre curta;
- checklist.

Critério de aceite:

- O aluno sabe exatamente o que falar.
- A fala livre vem depois de preparação.
- A gravação tem objetivo claro.

---

# BLOCO 8 — REESCREVER WRITING A1 FOUNDATIONS

Objetivo:

Fazer Writing ensinar escrita por blocos.

Aulas alvo:

1. Write simple sentences
2. Write your name and country
3. Write a personal introduction

Cada aula deve ter:

- texto modelo;
- blocos reutilizáveis;
- substituição guiada;
- gramática para escrita;
- erros comuns;
- rascunho;
- checklist;
- versão final.

Critério de aceite:

- O aluno não recebe só uma ordem para escrever.
- Ele aprende como montar texto.
- Há revisão antes da versão final.

---

# BLOCO 9 — QUALITY GATE PEDAGÓGICO AUTOMÁTICO

Objetivo:

Criar validação automática para impedir aula rasa de virar `ready`.

Arquivo sugerido:

- `fluency-clean/src/content/validators/validateDeepLessonQuality.js`

Validações obrigatórias:

- quantidade mínima de seções;
- quantidade mínima de exemplos;
- exemplos não duplicados;
- presença de contraste com português;
- presença de erros brasileiros;
- presença de prática guiada;
- presença de exercícios variados;
- respostas não sempre na primeira opção;
- presença de produção própria;
- presença de revisão final;
- leitura com evidência;
- listening com transcript/shadowing;
- speaking com gravação/checklist;
- writing com modelo/rascunho/revisão.

Critério de aceite:

- Aula rasa falha no validator.
- Aula só fica `ready` se passar no quality gate.

---

# BLOCO 10 — MIGRAR PRÁTICA PROFUNDA PARA AULAS REAIS

Objetivo:

Depois que as aulas forem profundas, adaptar Prática Profunda para derivar delas.

Não fazer antes dos blocos 1–9.

Regras:

- Prática Profunda é complemento, não substitui aula.
- Não inventar conteúdo fora da aula.
- Usar exemplos, erros, vocabulário, texto, áudio e produção da aula.
- Gerar revisão baseada em erros reais.

Critério de aceite:

- Prática usa o conteúdo da aula fixa.
- Não pergunta coisa que a aula não ensinou.
- Reforça exatamente o ponto fraco do aluno.

---

# BLOCO 11 — EXPANSÃO A1 COMPLETA COM NOVO PADRÃO

Objetivo:

Depois de validar Foundations, expandir o A1 completo com o mesmo padrão.

Não preencher 119 aulas com templates rasos.

Cada pacote deve ser feito, testado e validado:

- A1.1 Foundations
- A1.2 Família, objetos e descrição
- A1.3 Rotina e Present Simple
- A1.4 Situações práticas
- A1.5 Revisões e checkpoints

Critério de aceite:

- Cada pacote passa no quality gate.
- O aluno consegue estudar de verdade pelo app.
- Nenhum pilar fica para trás.

---

# BLOCO 12 — SÓ DEPOIS PLANEJAR A2 → C2

Objetivo:

Não avançar para níveis superiores enquanto A1 não estiver excelente.

Regra:

A2, B1, B2, C1 e C2 só devem virar conteúdo pronto depois que:

- A1 Foundations estiver aprovado;
- os renderizadores estiverem bons;
- o validator pedagógico estiver funcionando;
- o usuário aprovar a experiência no iPhone.

---

# Checklist de qualidade para cada aula

Antes de marcar uma aula como pronta, responder:

- [ ] A aula ensina o conceito do zero?
- [ ] Explica por que isso importa?
- [ ] Mostra quando usar?
- [ ] Mostra como formar?
- [ ] Compara com português?
- [ ] Mostra erros brasileiros reais?
- [ ] Tem exemplos comentados?
- [ ] Tem prática guiada antes do quiz?
- [ ] Tem exercícios variados?
- [ ] Tem alternativas embaralhadas?
- [ ] Tem produção própria?
- [ ] Tem revisão final?
- [ ] Funciona no iPhone?
- [ ] Não parece template?
- [ ] Não parece lista de frases?
- [ ] Não depende de IA em tempo real para a aula principal?

Se qualquer item crítico falhar, a aula volta para `planned` ou `needs-review`.

---

# Prompt de continuidade para outro chat

```txt
Continue a reconstrução do Fluency na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md e depois leia fluency-clean/docs/BLOCO-STATIC-DEEP-LESSON-QUALITY-REWRITE-LAB.md.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Objetivo agora: corrigir profundamente a qualidade pedagógica das aulas fixas. As aulas atuais foram consideradas rasas pelo usuário. Execute em blocos, começando pelo BLOCO 1 do documento: refazer schema pedagógico profundo, depois renderizadores, depois reescrever Grammar/Vocabulary/Reading/Listening/Speaking/Writing A1 Foundations. Nenhuma aula deve ficar ready se não ensinar de verdade.
```

## Estado final esperado

O app deve deixar de mostrar aulas como simples cards de frases e passar a mostrar aulas completas, guiadas, profundas e úteis.

O aluno deve sentir que está sendo ensinado por um professor: conceito, exemplo, erro, treino, produção e revisão.
