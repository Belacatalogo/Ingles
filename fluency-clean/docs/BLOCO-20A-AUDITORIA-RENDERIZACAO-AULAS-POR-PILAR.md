# BLOCO 20A — Auditoria e regra nova das aulas por pilar

Branch obrigatória: `rewrite-fluency-clean-lab`

## Motivo do bloco

Antes de iniciar B1 ou voltar ao refinamento premium do A1, o usuário identificou problemas reais na experiência das aulas:

- aulas de Reading fazem perguntas, mas não permitem resposta em alguns pontos;
- alguns modelos esperados aparecem antes da tentativa do aluno;
- aula de Reading pode colocar o texto principal tarde demais;
- aulas de Speaking precisam fazer o aluno falar, não apenas ler cards;
- aulas de Writing precisam ter campo real de escrita;
- aulas de Listening precisam respeitar a ordem ouvir primeiro, transcript depois;
- algumas partes mostram chaves/campos inadequados, como `subject`, em vez de texto útil;
- existem elementos técnicos ou de teste visual que não devem aparecer na experiência final do aluno.

## Arquivos analisados

- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`
- `fluency-clean/src/practice/components/TextExercise.jsx`
- `fluency-clean/src/practice/components/SpeakExercise.jsx`

## Problemas confirmados no renderizador atual

### 1. Produção mostrando resposta antes da tentativa

No `StaticLessonRenderer.jsx`, a função `DeepProduction` renderiza `item.expected` diretamente:

```jsx
{item.expected ? <small>Modelo esperado: {item.expected}</small> : null}
```

Isso causa exatamente o problema visto no print: a aula pede para completar o resumo, mas o modelo esperado já aparece sem o aluno responder.

Regra nova:

- `expected`, `answer`, `expectedAnswer` e `correctAnswer` nunca devem aparecer antes de tentativa.
- Produções com modelo esperado devem virar exercício interativo.
- O modelo só aparece depois de o aluno escrever/tentar responder.

### 2. Reading com ordem inadequada

No render de `DeepReadingLesson`, a ordem atual coloca `Primeira leitura` antes de `Texto principal`.

Regra nova para Reading:

1. Objetivo de leitura;
2. Vocabulário antes do texto;
3. Estratégia de leitura;
4. Texto principal;
5. Primeira leitura com campo interativo;
6. Segunda leitura com campo ou alternativas;
7. Perguntas com evidência;
8. Vocabulário pelo contexto;
9. Resumo guiado com resposta do aluno;
10. Produção final;
11. Revisão final.

### 3. Speaking ainda muito passivo

O render de `DeepSpeakingLesson` usa cards para `recordingTasks` e `freeSpeaking`, mas não força fluxo real de fala.

Regra nova para Speaking:

- toda aula de Speaking deve ter tarefa ativa de fala;
- deve usar botão de fala/gravação quando disponível;
- deve manter fallback de texto: “Digite o que você falou”;
- deve ter checklist de fala;
- não pode ser apenas leitura de frases-modelo.

### 4. Writing sem campo real de escrita

O render de `DeepWritingLesson` mostra rascunho e versão final como cards de produção, sem textarea dedicado.

Regra nova para Writing:

- `draftTask` vira campo de rascunho;
- `revisionTask` ou `finalVersionTask` vira campo de versão final;
- modelo esperado só aparece após tentativa;
- checklist fica entre rascunho e versão final.

### 5. Listening precisa preservar escuta antes do transcript

O render de `DeepListeningLesson` já coloca transcript após primeira e segunda escuta, mas perguntas e tarefas ainda podem ficar passivas.

Regra nova para Listening:

1. Antes de ouvir;
2. Palavras para tentar ouvir;
3. Primeira escuta sem texto;
4. Segunda escuta com foco;
5. Compreensão auditiva interativa;
6. Dictation interativo;
7. Shadowing;
8. Transcript liberado depois;
9. Produção oral curta;
10. Revisão final.

### 6. Erros de `subject` e campos crus

A função atual `textOf` aceita várias chaves, mas não trata adequadamente todos os formatos do conteúdo profundo.

Regra nova:

- criar uma normalização mais segura para exibir texto humano;
- nunca renderizar `[object Object]`;
- nunca exibir chaves técnicas como `subject`, `expected`, `answer`, `correctAnswer` como se fossem instrução;
- se o objeto tiver `instruction`, usar isso como prioridade para tarefa;
- se tiver `question`, usar como pergunta;
- se tiver `word/chunk/text`, usar como conteúdo de vocabulário;
- se tiver apenas `subject`, converter para texto didático ou ignorar conforme contexto.

### 7. Interface com itens técnicos/teste visual

`LessonScreen.jsx` ainda possui área de atalhos do curso fixo:

- `Atalhos do curso fixo`;
- `Abrir Grammar fixo`;
- `Abrir Vocabulary fixo`;
- previews visuais.

Isso era útil para teste, mas não deve ficar na experiência final.

Regra nova:

- remover ou esconder atalhos visuais da tela de aula do aluno;
- manter preview apenas se for modo dev/lab interno;
- esconder mensagens técnicas como `IndexedDB`, `schema`, contrato, qualidade e IDs, quando estiverem voltadas ao aluno.

## Regra nova por pilar

### Grammar

Prioridade:

- explicação;
- formação;
- exemplos;
- erros comuns;
- prática controlada;
- quiz/correção;
- produção final.

Obrigatório:

- gabarito escondido até tentativa;
- correção de erro interativa;
- transformação/tradução com campo quando não houver alternativa.

### Vocabulary

Prioridade:

- contexto;
- palavras essenciais;
- chunks;
- exemplos;
- reconhecimento;
- uso em contexto;
- produção.

Obrigatório:

- vocabulário em frases, não só lista;
- treino de chunks;
- produção curta usando palavras.

### Reading

Prioridade:

- texto principal cedo;
- compreensão;
- evidência;
- resumo;
- produção textual.

Obrigatório:

- perguntas respondíveis;
- modelo escondido até tentativa;
- texto antes das perguntas de leitura.

### Listening

Prioridade:

- ouvir primeiro;
- transcript depois;
- dictation;
- compreensão auditiva;
- shadowing.

Obrigatório:

- transcript não deve entregar a aula antes da tentativa inicial;
- dictation precisa de campo de resposta;
- produção oral curta precisa ser ativa.

### Speaking

Prioridade:

- fala real;
- repetição;
- drills;
- gravação ou fallback escrito;
- checklist.

Obrigatório:

- toda aula de Speaking precisa exigir resposta falada ou simulada;
- deve usar `SpeakExercise` ou componente equivalente;
- não pode ser apenas cards de leitura.

### Writing

Prioridade:

- modelo;
- blocos de construção;
- rascunho;
- checklist;
- versão final.

Obrigatório:

- textarea real para rascunho;
- textarea real para versão final;
- modelo esperado escondido até tentativa.

## Blocos seguintes

### BLOCO 20B — Reading completo

- Reordenar `DeepReadingLesson`;
- texto principal antes de primeira/segunda leitura;
- transformar primeira leitura, segunda leitura, resumo e produção em atividades interativas;
- esconder modelos até tentativa.

### BLOCO 20C — Speaking completo

- criar/usar componente de prática falada dentro do render estático;
- usar botão de fala + fallback escrito;
- transformar gravação guiada e fala livre em tarefas reais.

### BLOCO 20D — Writing completo

- criar textarea para rascunho e versão final;
- esconder modelo esperado até tentativa;
- checklist entre rascunho e versão final.

### BLOCO 20E — Listening completo

- deixar compreensão e dictation interativos;
- transcript depois da tentativa inicial;
- produção oral ativa.

### BLOCO 20F — Grammar/Vocabulary e erro de campos crus

- corrigir extração de texto;
- eliminar exibição indevida de `subject`;
- revisar cards passivos;
- garantir gabarito escondido.

### BLOCO 20G — Limpeza da interface da aula

- remover/esconder atalhos do curso fixo;
- remover textos técnicos para aluno;
- revisar prática complementar duplicada.

### BLOCO 20H — Renderização ponderada por pilar

- consolidar regras em helpers/componentes reutilizáveis;
- garantir cada pilar com layout e interação própria.

### BLOCO 20I — Auditoria iPhone

- ajustar espaçamento, cards, textarea, botões, barra inferior e rolagem.

### BLOCO 20J — QA final com aulas reais

- testar aulas A1 e A2 por pilar;
- registrar QA final;
- checar Vercel.

## Status do BLOCO 20A

Concluído como bloco de auditoria e regra técnica. Nenhuma alteração funcional aplicada ainda.

## Próximo bloco

`BLOCO 20B — Reading completo`

Prioridade: corrigir o erro do print primeiro.
