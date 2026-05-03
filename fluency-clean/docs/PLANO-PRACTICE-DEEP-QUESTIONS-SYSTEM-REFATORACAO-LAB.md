# PLANO — Refatoração do sistema de questões da Prática Profunda

Data: 2026-05-03
Branch de referência: `rewrite-fluency-clean-lab`

## Status

Documento de planejamento criado para adaptação futura.

Este arquivo **não implementa código** e **não altera o sistema atual** da Prática Profunda.

## Objetivo

Planejar uma repaginação completa do sistema de questões da Prática Profunda, sem quebrar o que já funciona e sem conflitar com a nova estrutura de exercícios internos da aba Reading.

A Prática Profunda deve virar um sistema complementar, adaptativo e mais inteligente, enquanto cada aba de aula continua tendo seus próprios exercícios essenciais.

## Regra principal

A Prática Profunda **não deve substituir** os exercícios internos das aulas.

Ela deve funcionar como complemento posterior para reforçar:

- memorização;
- recuperação ativa;
- variação;
- correção;
- fixação;
- fluência;
- interpretação;
- produção curta;
- revisão espaçada.

## O que NÃO fazer

- Não remover exercícios internos da Reading.
- Não mover a lógica da Reading para dentro da Prática Profunda.
- Não quebrar `PracticeLauncher` atual.
- Não mexer em `bundle.js`.
- Não usar DOM injection.
- Não criar bundle patch.
- Não alterar o backend Azure privado.
- Não criar HTML remendado fora da estrutura modular.
- Não compactar conteúdo pedagógico.
- Não fazer uma mudança grande sem blocos pequenos e testáveis.

---

# 1. Separação oficial entre Aula e Prática Profunda

## Aula

A aula deve conter o essencial para aprender o conteúdo do dia.

Exemplo na Reading:

- pré-leitura;
- texto principal;
- ideia geral;
- vocabulário em contexto;
- compreensão com evidência;
- exercícios internos;
- produção curta;
- conclusão.

## Prática Profunda

A Prática Profunda vem depois da aula e deve complementar o estudo.

Ela deve responder à pergunta:

> “Agora que o aluno estudou a aula, como fazer ele fixar, recuperar, variar e aplicar o conteúdo?”

---

# 2. Estrutura proposta da Prática Profunda

A Prática Profunda deve ter um fluxo próprio, semelhante ao stepper real aprovado, mas adaptado para prática.

## Etapas recomendadas

1. Preparar
2. Recuperar
3. Reconhecer
4. Aplicar
5. Corrigir
6. Produzir
7. Revisar
8. Concluir

## Função de cada etapa

### 1. Preparar

Mostra um resumo curto do que será praticado.

Deve ser limpo, sem card técnico.

Exemplo:

> “Vamos reforçar as palavras, ideias e estruturas da aula de hoje.”

### 2. Recuperar

O aluno tenta lembrar sem olhar.

Tipos de exercícios:

- lembrar palavra;
- lembrar frase;
- lembrar ideia principal;
- lembrar regra;
- lembrar expressão.

### 3. Reconhecer

O aluno identifica a opção correta.

Tipos:

- múltipla escolha;
- verdadeiro/falso;
- escolha de significado;
- escolha de frase correta;
- matching simples.

### 4. Aplicar

O aluno usa o conteúdo em contexto.

Tipos:

- completar frase;
- ordenar palavras;
- transformar frase;
- escolher resposta adequada;
- usar palavra em frase.

### 5. Corrigir

O aluno compara, corrige ou melhora.

Tipos:

- corrigir erro;
- explicar por que está errado;
- escolher a melhor correção;
- comparar resposta do aluno com modelo.

### 6. Produzir

O aluno escreve ou fala uma resposta própria.

Tipos:

- resposta curta;
- mini diálogo;
- frase pessoal;
- resumo curto;
- opinião curta;
- áudio/speaking quando aplicável.

### 7. Revisar

O sistema mostra o que o aluno errou ou demorou mais.

Tipos:

- repetir questões erradas;
- revisar palavras fracas;
- revisar estrutura fraca;
- revisar evidência perdida.

### 8. Concluir

Salva progresso e mostra resumo curto:

- acertos;
- erros;
- foco para próxima revisão;
- XP ou progresso.

---

# 3. Contrato interno recomendado para questões

Criar um contrato único para questões da Prática Profunda.

Nome sugerido:

`practiceQuestionContract.js`

## Estrutura base

```js
{
  id: 'string estável',
  lessonId: 'string',
  lessonType: 'reading | grammar | listening | writing | speaking | mixed',
  level: 'A1 | A2 | B1 | B2 | C1',
  phase: 'recall | recognize | apply | correct | produce | review',
  skill: 'string',
  type: 'multiple_choice | true_false | fill_blank | order_words | short_answer | evidence | correction | matching | speaking_prompt',
  instruction: 'string para o aluno',
  prompt: 'string principal da questão',
  options: ['array opcional'],
  answer: 'string ou array',
  acceptedAnswers: ['array opcional'],
  explanation: 'string curta',
  evidence: 'string opcional',
  sourceText: 'string opcional',
  difficulty: 'easy | medium | hard',
  revealPolicy: 'after_attempt | after_submit | after_hint | never_auto',
  metadata: {
    generatedBy: 'lesson | fallback | review | ai',
    source: 'readingText | grammarRule | listeningTranscript | vocabulary | userError',
    createdAt: 'ISO string'
  }
}
```

---

# 4. Tipos oficiais de questão

## 4.1 Multiple choice

Uso:

- reconhecimento;
- significado;
- compreensão;
- gramática;
- listening.

Regras:

- 3 ou 4 opções;
- sem opção duplicada;
- resposta obrigatória dentro das opções;
- não vazar resposta no enunciado;
- feedback só após tentativa.

## 4.2 True/False

Uso:

- leitura;
- listening;
- fatos do texto;
- regra gramatical simples.

Regras:

- não mostrar resposta antes;
- botões `Verdadeiro` e `Falso`;
- feedback após clique;
- se houver evidência, mostrar depois da tentativa.

## 4.3 Fill blank

Uso:

- vocabulário;
- gramática;
- listening gap;
- frases da aula.

Regras:

- campo de texto deve abrir teclado no iPhone;
- aceitar variações simples;
- feedback após envio;
- dica opcional antes da resposta.

## 4.4 Order words

Uso:

- gramática;
- frases úteis;
- produção controlada.

Regras:

- palavras clicáveis;
- permitir reset;
- mostrar modelo só após tentativa.

## 4.5 Short answer

Uso:

- produção curta;
- opinião simples;
- resposta de leitura;
- resumo de listening.

Regras:

- não exigir resposta única quando houver variação;
- comparar por critérios simples;
- mostrar modelo após tentativa;
- salvar rascunho se possível.

## 4.6 Evidence question

Uso:

- Reading principalmente.

Regras:

- pedir ao aluno encontrar/copiar o trecho;
- não mostrar evidência antes;
- se possível, botão `Ver trecho` após tentativa;
- não substituir exercícios internos da Reading.

## 4.7 Correction question

Uso:

- grammar;
- writing;
- erros recorrentes do aluno.

Regras:

- mostrar frase com erro;
- aluno corrige;
- feedback explica o erro;
- modelo aparece depois.

## 4.8 Matching

Uso:

- palavra → significado;
- frase → função;
- pergunta → resposta;
- áudio → intenção.

Regras:

- mobile-first;
- evitar drag difícil no iPhone;
- preferir toque em pares.

## 4.9 Speaking prompt

Uso:

- complemento oral;
- revisão de frases;
- pronúncia;
- resposta livre.

Regras:

- usar sistema real de Speaking quando aplicável;
- não duplicar Azure dentro da prática sem necessidade;
- pode apenas enviar o aluno para Speaking com contexto.

---

# 5. Política por tipo de aula

## Reading

A Prática Profunda de Reading deve complementar:

- vocabulário do texto;
- ideia principal;
- detalhes;
- inferência;
- evidência;
- resumo curto.

Não deve substituir:

- texto principal;
- perguntas essenciais;
- exercícios internos da aba Reading.

Tipos recomendados:

- recall vocabulary;
- multiple choice de ideia geral;
- true/false de detalhes;
- fill blank com palavras do texto;
- short answer de resumo;
- evidence review.

## Grammar

A Prática Profunda de Grammar deve complementar:

- regra;
- exemplos;
- transformação;
- correção;
- produção.

Tipos recomendados:

- escolher frase correta;
- completar lacuna;
- transformar afirmativa/negativa/pergunta;
- corrigir erro;
- produzir frases próprias.

## Listening

A Prática Profunda de Listening deve complementar:

- compreensão auditiva;
- vocabulário ouvido;
- ordem dos eventos;
- shadowing;
- resumo.

Tipos recomendados:

- escolher o que ouviu;
- completar frase do áudio;
- true/false após áudio;
- ordenar eventos;
- repetir frase;
- resumo curto.

## Speaking

A Prática Profunda de Speaking deve complementar:

- frases úteis;
- perguntas/respostas;
- pronúncia;
- fluência.

Tipos recomendados:

- preparar resposta;
- praticar frase modelo;
- enviar para modo Speaking;
- revisar palavras fracas do histórico.

## Writing

A Prática Profunda de Writing deve complementar:

- estrutura;
- correção;
- clareza;
- produção guiada.

Tipos recomendados:

- corrigir frase;
- completar parágrafo;
- reescrever frase;
- organizar ideias;
- escrever resposta curta.

---

# 6. Quality gate da Prática Profunda

Criar módulo sugerido:

`practiceQuestionQualityGate.js`

## O que validar

- questão tem `id`;
- questão tem `type`;
- questão tem `phase`;
- questão tem `instruction`;
- questão tem `prompt` quando necessário;
- questão não vaza resposta;
- opções não duplicam;
- resposta está entre opções quando for múltipla escolha;
- feedback não aparece antes da tentativa;
- questão respeita o nível;
- questão respeita o tipo da aula;
- questão não duplica exercício interno da aula.

## Resultado do gate

```js
{
  ok: true,
  question,
  warnings: [],
  repairs: [],
  removed: false
}
```

---

# 7. Sistema de revelação de resposta

Toda questão deve ter `revealPolicy`.

## Políticas

### after_attempt

Mostra feedback após o aluno interagir.

Ideal para:

- múltipla escolha;
- verdadeiro/falso;
- matching.

### after_submit

Mostra feedback após o aluno enviar.

Ideal para:

- fill blank;
- short answer;
- correction.

### after_hint

Mostra dica primeiro, resposta só depois.

Ideal para:

- questões difíceis;
- evidência;
- produção.

### never_auto

Não mostra resposta automaticamente.

Ideal para:

- produção livre;
- speaking;
- writing longo.

---

# 8. UI proposta

## Visual geral

Manter identidade aprovada:

- dark premium;
- cards elegantes;
- stepper horizontal no iPhone;
- botões grandes;
- feedback claro;
- zero poluição técnica.

## Componentes sugeridos

```txt
PracticeDeepScreen
  PracticeStepper
  PracticePhaseCard
  PracticeQuestionRenderer
    MultipleChoiceQuestion
    TrueFalseQuestion
    FillBlankQuestion
    OrderWordsQuestion
    ShortAnswerQuestion
    EvidenceQuestion
    CorrectionQuestion
    MatchingQuestion
    SpeakingPromptQuestion
  PracticeFeedbackCard
  PracticeReviewSummary
```

## Stepper sugerido

1. Preparar
2. Recuperar
3. Reconhecer
4. Aplicar
5. Corrigir
6. Produzir
7. Revisar
8. Concluir

---

# 9. Estado e salvamento

Criar um estado separado para respostas da prática.

Exemplo:

```js
{
  practiceSessionId,
  lessonId,
  startedAt,
  completedAt,
  answers: {
    [questionId]: {
      value,
      isCorrect,
      attempts,
      revealed,
      timeMs
    }
  },
  score,
  weakItems,
  reviewQueue
}
```

## O que salvar

- respostas;
- acertos;
- erros;
- tentativas;
- palavras fracas;
- estruturas fracas;
- tempo de resposta;
- questões para revisão futura.

---

# 10. Integração com progresso

Ao concluir a Prática Profunda:

- salvar sessão;
- adicionar XP;
- registrar foco de revisão;
- atualizar tarefas do dia;
- não marcar aula como concluída se a aula principal ainda não foi feita, exceto se o comportamento atual já fizer isso e for mantido.

## Importante

A conclusão da aula e a conclusão da prática devem ser conceitos separados.

Exemplo:

```txt
Aula Reading concluída: sim
Prática Profunda Reading concluída: sim/não
```

---

# 11. Integração com Reading nova

Como a Reading agora tem exercícios internos, a Prática Profunda deve evitar duplicar exatamente os mesmos exercícios.

## Regra

Se a Reading já trabalhou:

- ideia geral;
- evidência;
- perguntas principais;
- produção curta;

A Prática Profunda deve trabalhar:

- variação;
- vocabulário;
- revisão;
- novo contexto;
- recuperação sem olhar;
- resumo;
- transferência.

## Exemplo

Aula Reading pergunta:

> “Qual é a ideia principal do texto?”

Prática Profunda pergunta:

> “Sem olhar o texto, escolha a frase que melhor resume a situação.”

---

# 12. Integração com Grammar nova

Grammar agora tem stepper próprio.

A Prática Profunda deve reforçar:

- regra;
- forma;
- transformação;
- erro comum;
- produção.

Não deve repetir a explicação inteira da aula.

---

# 13. Integração com Listening nova

Listening agora tem stepper próprio.

A Prática Profunda deve reforçar:

- escuta ativa;
- vocabulário ouvido;
- shadowing;
- compreensão sem legenda;
- resumo.

Não deve abrir transcrição cedo demais.

---

# 14. Integração com Speaking nova

Speaking agora tem stepper próprio.

A Prática Profunda pode:

- preparar frases;
- sugerir respostas;
- mandar para Speaking;
- revisar palavras fracas;
- criar mini desafios orais.

Não deve duplicar o motor Azure dentro dela sem necessidade.

---

# 15. Ordem de implementação em blocos

## BLOCO-PRACTICE-0 — Auditoria segura

Objetivo:

- Mapear arquivos atuais da Prática Profunda.
- Entender como `PracticeLauncher` funciona.
- Entender onde salva progresso.
- Não alterar nada.

## BLOCO-PRACTICE-1 — Contrato de questões

Objetivo:

- Criar `practiceQuestionContract.js`.
- Definir tipos oficiais.
- Normalizar questões antigas.
- Não mexer no render ainda.

## BLOCO-PRACTICE-2 — Quality gate

Objetivo:

- Criar `practiceQuestionQualityGate.js`.
- Validar resposta vazada, opções duplicadas e tipo inválido.
- Aplicar apenas em modo seguro.

## BLOCO-PRACTICE-3 — Renderer por tipo

Objetivo:

- Criar renderizadores separados por tipo.
- Manter fallback para questões antigas.
- Não remover sistema antigo ainda.

## BLOCO-PRACTICE-4 — Reveal policy

Objetivo:

- Respostas só aparecem após tentativa/envio.
- Corrigir o mesmo problema visto na Reading.

## BLOCO-PRACTICE-5 — Stepper da prática

Objetivo:

- Criar stepper próprio da Prática Profunda.
- Etapas: preparar, recuperar, reconhecer, aplicar, corrigir, produzir, revisar, concluir.

## BLOCO-PRACTICE-6 — Integração com Reading

Objetivo:

- Evitar duplicar exercícios internos da Reading.
- Usar Reading como fonte, mas criar variações.

## BLOCO-PRACTICE-7 — Integração com Grammar/Listening/Speaking

Objetivo:

- Adaptar prática ao tipo de aula.
- Preservar os steppers e fluxos próprios.

## BLOCO-PRACTICE-8 — Salvamento e revisão

Objetivo:

- Salvar sessão da prática separada da aula.
- Registrar erros e itens fracos.

## BLOCO-PRACTICE-9 — Polimento mobile-first

Objetivo:

- Ajustar UI para iPhone.
- Testar teclado.
- Testar scroll.
- Testar conclusão.

---

# 16. Checklist antes de implementar

Antes de qualquer código:

- abrir arquivos atuais da prática;
- identificar dependências;
- confirmar onde progresso é salvo;
- confirmar se existe fallback;
- confirmar se existe geração IA específica;
- confirmar se as questões antigas precisam continuar funcionando;
- testar no iPhone após cada bloco.

---

# 17. Critérios de aprovação

A nova Prática Profunda só deve ser considerada aprovada se:

- não quebrar aula atual;
- não quebrar Reading;
- não duplicar exercícios internos da Reading;
- não mostrar resposta antes da tentativa;
- funcionar no iPhone;
- teclado abrir nos campos;
- stepper não ocupar tela demais;
- salvar progresso;
- permitir revisar erros;
- continuar funcionando com aulas antigas.

---

# 18. Resumo final

A Prática Profunda deve virar um sistema complementar e adaptativo.

Ela deve ser mais forte que uma lista simples de exercícios, mas não pode invadir a função das abas principais.

A ordem correta é:

1. aula ensina;
2. exercícios internos garantem compreensão mínima;
3. Prática Profunda fixa, varia e revisa;
4. progresso registra aula e prática separadamente.

Esse plano deve ser usado como base antes de qualquer alteração real no código.
