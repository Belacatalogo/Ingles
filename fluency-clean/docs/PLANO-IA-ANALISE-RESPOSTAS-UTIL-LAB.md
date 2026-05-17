# PLANO — IA para análise útil de respostas do aluno

Data: 2026-05-16
Branch: main

## Objetivo

Integrar IA de forma útil e segura no Fluency, sem transformar a IA em geradora da aula principal.

A IA deve atuar como corretora/tutora em pontos onde há produção do aluno:

- Writing: corrigir texto, gramática, clareza e versão melhor.
- Speaking livre: avaliar resposta falada, fluência e adequação ao prompt.
- Pronúncia: usar Azure Speech Pronunciation Assessment para score real de pronúncia, palavras fracas e fonemas.
- Grammar/Vocabulary/Reading/Listening: analisar respostas abertas quando houver produção do aluno, mas sem corrigir questões objetivas simples que já têm gabarito local.
- Revisão adaptativa: transformar erros reais em reforço pequeno e prática profunda.

## Regras obrigatórias

- Não ativar Firebase real, Gemini real, Azure real, Cloudinary real ou escrita remota sem autorização explícita.
- Não colocar secrets no frontend.
- IA não gera aula-base.
- IA não substitui currículo fixo.
- IA usa a aula fixa como fonte da verdade.
- IA deve retornar feedback curto, prático e acionável.
- Quando houver tentativa do aluno, só mostrar modelo/gabarito após a tentativa.

## Estado atual encontrado

### IA Tutor já existe

Arquivos atuais:

- `src/components/tutor/AiTutorPanel.jsx`
- `src/services/aiTutorService.js`
- `src/services/aiTutorPolicy.js`

A política atual já permite ações:

- `correct-writing`
- `evaluate-speaking`
- `small-reinforcement`
- `adaptive-review`
- `explain-current-lesson`

O serviço já usa Gemini com chaves gerais, com fallback quando não há key.

### Azure já existe e já avalia pronúncia

Arquivo atual:

- `src/services/azurePronunciation.js`

Ele já possui:

- `recognizeSpeech()` para transcrever fala livre.
- `analyzePronunciation()` com `PronunciationAssessmentConfig`.
- score de accuracy, fluency, completeness e pronunciation.
- análise por palavra.
- análise por fonema.

### SpeakingScreen já usa Azure

Arquivo atual:

- `src/screens/SpeakingScreen.jsx`

Ele já usa:

- `recognizeSpeech()` na conversa livre.
- `analyzePronunciation()` na conversa, pronúncia e imersão.
- histórico de sessões de speaking.
- palavras fracas.
- score médio.

## Arquitetura recomendada

Criar uma camada central única:

```txt
StudentAnswerAnalysisService
```

Responsabilidade:

- Receber resposta do aluno.
- Saber o pilar: grammar, vocabulary, reading, listening, speaking, writing.
- Saber o tipo: texto, áudio, escolha, checklist, tradução, produção livre.
- Usar avaliador local quando for objetivo.
- Usar Azure quando for áudio/pronúncia.
- Usar IA Tutor quando for produção livre, explicação, correção textual ou feedback pedagógico.
- Salvar resultado no progresso local.
- Enviar erros reais para revisão adaptativa.

Fluxo:

```txt
Aluno responde
↓
validação local rápida
↓
se produção aberta: IA Tutor
↓
se áudio: Azure + IA Tutor opcional
↓
salva feedback estruturado
↓
atualiza flowErrors / mastery tags
↓
revisão adaptativa usa esses erros
```

## Onde integrar IA por área

### 1. Writing — prioridade máxima

Usar IA em:

- substituição guiada quando a resposta estiver gramaticalmente estranha;
- rascunho;
- versão final;
- checklist, usando o texto do aluno como contexto.

Feedback ideal:

- nota simples: 0–100;
- erros principais;
- versão corrigida;
- explicação curta;
- 1 exercício de reforço.

Não usar IA para:

- liberar aula automaticamente sem critério mínimo;
- reescrever tudo sem explicar.

### 2. Speaking — prioridade máxima

Dividir em duas camadas:

#### Camada A — Azure

Usar Azure para:

- pronúncia;
- fluência;
- completeness;
- palavras fracas;
- fonemas fracos;
- transcrição.

Azure responde à pergunta: “como soou?”.

#### Camada B — IA Tutor

Usar IA para:

- avaliar se a resposta realmente respondeu ao prompt;
- corrigir frase falada transcrita;
- sugerir resposta mais natural;
- explicar erro comum de brasileiro;
- montar micro-drill com a palavra/frase fraca.

IA responde à pergunta: “o que melhorar no inglês?”.

### 3. Grammar

Usar IA apenas em respostas abertas:

- produção final;
- transformação quando a regra local não conseguir validar bem;
- correção de erro quando houver várias respostas possíveis.

Não usar IA em quiz simples.

### 4. Vocabulary

Usar IA em:

- frase criada pelo aluno com palavra nova;
- comparação entre palavra parecida;
- uso natural ou estranho da palavra.

Não usar IA em flashcard simples ou reconhecimento direto.

### 5. Reading

Usar IA em:

- resumo com palavras do aluno;
- resposta inferencial;
- explicação de evidência textual;
- checar se o aluno respondeu com base no texto.

Não usar IA para revelar resposta antes da tentativa.

### 6. Listening

Usar IA em:

- reconstrução do que o aluno ouviu;
- comparação entre transcrição esperada e resposta do aluno;
- explicar sons/palavras que ele confundiu.

Não usar IA para entregar transcript completo antes da tentativa.

### 7. Revisão adaptativa

Usar IA depois da aula para:

- ler `flowErrors`;
- agrupar erros por tipo;
- criar 3 microexercícios;
- sugerir foco de revisão.

## Blocos de implementação sugeridos

### BLOCO IA-1 — Contrato único de análise

Criar:

- `src/services/studentAnswerAnalysis/studentAnswerAnalysisService.js`
- `src/services/studentAnswerAnalysis/studentAnswerAnalysisTypes.js`
- `src/services/studentAnswerAnalysis/localAnswerRubrics.js`

Saída padrão:

```js
{
  status: 'success' | 'fallback' | 'error',
  pillar: 'writing',
  skill: 'guided-substitution',
  score: 0,
  level: 'A1',
  cefrFit: 'ok' | 'too-simple' | 'too-hard',
  correctedText: '',
  feedbackPt: '',
  strengths: [],
  issues: [],
  nextDrill: '',
  source: 'local' | 'azure' | 'gemini' | 'hybrid'
}
```

### BLOCO IA-2 — Writing conectado ao AttemptField

- Adicionar botão “Analisar com IA” após tentativa escrita.
- Usar `correctWritingWithTutor()`.
- Não bloquear avanço se IA falhar.
- Mostrar fallback local.

### BLOCO IA-3 — Speaking híbrido Azure + IA Tutor

- Manter Azure como base de pronúncia.
- Enviar para IA Tutor:
  - prompt original;
  - transcrição reconhecida;
  - score do Azure;
  - palavras fracas;
  - nível e aula atual.
- IA gera feedback pedagógico curto.

### BLOCO IA-4 — Reading/Listening respostas abertas

- Conectar IA em respostas que exigem compreensão.
- IA deve verificar se a resposta está baseada no texto/áudio da aula.

### BLOCO IA-5 — Revisão adaptativa real

- Usar erros salvos da aula.
- Gerar reforço curto por pilar.
- Salvar localmente como revisão do dia.

### BLOCO IA-6 — UI unificada de feedback

Criar componente:

- `StudentAnswerFeedbackCard.jsx`

Deve mostrar:

- nota;
- versão corrigida;
- erro principal;
- dica curta;
- botão “Praticar erro”.

## Melhor uso de Azure x IA

### Azure é melhor para

- detectar pronúncia real;
- pontuar palavra por palavra;
- fonemas;
- fluência;
- completude;
- transcrição.

### IA é melhor para

- explicar erro;
- corrigir gramática;
- melhorar naturalidade;
- avaliar se respondeu ao prompt;
- criar micro-prática adaptada.

### Uso híbrido ideal

```txt
Áudio do aluno
↓
Azure transcreve + pontua pronúncia
↓
IA recebe transcrição + score + palavras fracas
↓
IA devolve feedback simples e treino curto
```

## Prioridade de execução

1. Writing AI Review.
2. Speaking Hybrid Feedback.
3. Adaptive Review from real errors.
4. Reading/Listening comprehension review.
5. Vocabulary natural usage review.
6. Grammar fallback review.

## Observação importante

A integração real com Gemini/Azure deve ficar atrás de feature flags e fallback local para não quebrar o curso se a API falhar.
