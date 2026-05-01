# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## PROTOCOLO ECONÔMICO DE DEPLOY — OBRIGATÓRIO

Regra operacional:
1. Cada bloco deve virar **1 commit único**, sempre que possível.
2. Não fazer vários commits pequenos para o mesmo bloco.
3. Atualizar `REWRITE_HANDOFF.md` junto com o bloco, no mesmo commit.
4. Fluxo ideal: **1 bloco → 1 commit → 1 deploy → teste no iPhone**.
5. Se a Vercel bloquear novamente, parar commits e aguardar liberação.

Observação: em alguns ajustes recentes, o conector bloqueou operações de árvore/commit único. Por segurança, alterações foram aplicadas via `create_file`/`update_file`, sem tocar em `main`, `bundle.js` ou backend Azure.

## Estado atual implementado

### AJUSTE LISTENING QUIZ — qualidade, ditado e tentativa com dica IMPLEMENTADO, aguardando teste

Contexto:
- usuário informou que o quiz funcionou, mas a qualidade das questões caiu automaticamente;
- alternativas ficaram ruins, exemplo: `E`, `I`, `A`;
- usuário pediu exercício em que precisa escutar áudio e escrever o que foi dito;
- usuário pediu que respostas escritas ignorem pontos, maiúsculas/minúsculas e erros bobos;
- usuário pediu botão de dica e tentativa extra quando o sistema identificar erro pequeno.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/styles/lessons.css`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- alternativas de múltipla escolha agora rejeitam opções curtas/ruins demais;
- quando opções vindas da IA são ruins, o app gera alternativas melhores usando respostas reais da própria aula e fallback semântico;
- adicionada questão tipo `dictation`: usuário toca em “Ouvir frase” e escreve o que ouviu;
- respostas digitadas ignoram maiúsculas/minúsculas, acentos, pontuação e espaçamento;
- adicionada avaliação aproximada com distância de edição para detectar erro bobo;
- quando a resposta está quase correta, não marca como errado direto;
- aparece feedback “você está quase certo”;
- aparece botão `Tentar de novo`;
- aparece botão `Ver dica` quando houver uma palavra provável que causou o erro;
- dica revela apenas a palavra problemática, não a resposta inteira;
- feedback visual ganhou estado intermediário amarelo (`near`).

Teste recomendado:
1. aguardar deploy Ready;
2. abrir Listening > Prática;
3. confirmar que alternativas ruins tipo letras soltas não aparecem;
4. testar questão de ditado com botão `Ouvir frase`;
5. digitar resposta com diferença de maiúsculas/pontuação e confirmar que aceita;
6. errar uma palavra de leve e confirmar se aparece `Tentar de novo` e `Ver dica`;
7. errar longe da resposta e confirmar que mostra a resposta esperada sem tentativa extra.

### AJUSTE LISTENING PRÁTICA — Quiz guiado estilo Duolingo IMPLEMENTADO

Correção aplicada:
- seção de Compreensão virou `Prática guiada`;
- renderiza uma pergunta por vez em card de quiz;
- adiciona barra de progresso da prática;
- adiciona feedback automático correto/incorreto;
- botão `Continuar` avança para a próxima pergunta;
- prática monta tipos variados a partir da aula: escolha, vocabulário, certo/errado, correção, escrita e fala;
- múltipla escolha tem estados visualmente marcados: selecionado, certo e errado;
- pergunta de fala tenta usar reconhecimento de voz do navegador;
- se o Safari não liberar reconhecimento de voz, a pergunta de fala permite digitar o que foi falado;
- final da prática mostra pontuação e botão para refazer.

### HOTFIX LISTENING UX — remove navegação duplicada, limpa caixas e pausa áudio Gemini IMPLEMENTADO

Correção aplicada:
- removida a navegação duplicada criada dentro do `ListeningLesson`;
- os botões originais do topo agora disparam evento interno `fluency:lesson-jump`;
- `ListeningLesson` escuta esse evento, abre a seção correta e rola para ela;
- botão Aquecimento leva para Escuta guiada;
- botão Conceito leva para Conceito e explicação;
- botão Prática leva para Compreensão;
- visual das caixas recolhíveis foi suavizado;
- `geminiTts.js` exporta `stopGeminiTtsAudio()`;
- `audioPlayback.js` chama `stopGeminiTtsAudio()` junto com `stopSpeech()`;
- botão de pausa deve parar tanto o áudio natural Gemini quanto o fallback do navegador.

### AJUSTE BLOCO-10B-LAB — Listening mais leve, recolhível e áudio natural priorizado IMPLEMENTADO

Correção aplicada:
- áudio volta a priorizar Gemini TTS natural;
- se Gemini falhar, usa TTS do navegador apenas como fallback;
- áreas da aula viraram cartões recolhíveis com seta;
- Conceito começa aberto;
- Vocabulário, Transcrição, Prática e Sua resposta podem ser abertos/fechados;
- Shadowing fica disponível como etapa prática curta;
- layout reduz sensação de tela infinita e deixa a aula menos pesada.

### AJUSTE BLOCO-10B-LAB — Listening respeita tema do cronograma IMPLEMENTADO

Correção aplicada:
- o gerador preserva `expectedTitle`/`curriculumTitle` no objeto da aula antes da validação/reparo;
- o reparo de Listening escolhe perfil por tema do cronograma;
- para temas de alfabeto/spelling/nomes/sons iniciais, o reparo cria aula específica sobre alfabeto, sons iniciais e spelling de nomes;
- transcrição, vocabulário e exercícios usam o tema real do cronograma, não rotina genérica.

### BLOCO-CARTAS-3-LAB — Banco de vocabulário por tópicos IMPLEMENTADO parcialmente e VALIDADO APÓS CORREÇÃO DE BUILD

Correção aplicada:
- novo serviço `vocabularyDecks.js` com decks temáticos reais;
- banco atual: 288 palavras em tópicos A1/A2;
- meta registrada: 2.000 palavras (`VOCABULARY_BANK_TARGET = 2000`);
- tela Cartas permite escolher decks por tópico além da Aula atual;
- sessão de flashcards pode ser feita com deck temático mesmo sem aula com vocabulário.

### AJUSTE BLOCO-SPEAKING-2-LAB — Feedback de pronúncia em cada fala livre IMPLEMENTADO E VALIDADO PELO USUÁRIO

Correção aplicada:
- mantém o modo de fala livre;
- após transcrever a fala livre com Azure, o app roda uma segunda análise usando a própria frase reconhecida como referência;
- cada resposta do usuário mostra nota de pronúncia, ponto mais fraco e dica;
- usuário informou: “deu certo”.

### BLOCO-SPEAKING-2-LAB — Speaking por nível e registro real IMPLEMENTADO

Correção aplicada:
- Conversa não usa mais cenário B1 fixo quando o aluno está em A1;
- A1 usa prompts simples;
- Conversa registra sessão real ao completar 5 respostas válidas ou 3 minutos;
- Hoje marca Conversação como concluída somente se existir sessão real de Speaking hoje.

### BLOCO-CARTAS-2-LAB — Finalização real da sessão de flashcards IMPLEMENTADO

Correção aplicada:
- ao classificar a última carta, a sessão não reinicia/reset silenciosamente;
- aparece tela final clara de “Sessão concluída”;
- sessão de flashcards registra evento real em `progress.flashcardSessions`;
- Hoje marca Cartas como concluída somente se existir sessão real de flashcards hoje.

### AJUSTE BLOCO-10C-LAB — Múltipla escolha em aulas renderizadas IMPLEMENTADO

Correção aplicada:
- normalização dos exercícios aceita `options`, `choices`, `alternatives`, `answers`, `multipleChoiceOptions` e `possibleAnswers`;
- resposta correta aceita `answer`, `expectedAnswer`, `correctAnswer`, `correct`, `solution`, `rightAnswer`, `answerText` ou `answerKey`;
- respostas como `A`, `B`, `1` ou `2` são mapeadas para a alternativa correspondente.

### BLOCO-10A-LAB — Quality Gate Pedagógico Local IMPLEMENTADO

Comportamento:
- aula gerada passa por avaliação pedagógica local antes de salvar;
- nota mínima: 85/100;
- se reprovar, não salva;
- se aprovar, salva com `pedagogicalReview` e `quality.pedagogicalScore`.

## Próximos blocos, após validar a lab no iPhone

1. `BLOCO-12-LAB` — Rubricas por tipo de aula.
2. `BLOCO-14-LAB` — Contrato JSON rígido.
3. `BLOCO-11-LAB` — Plano primeiro, aula depois.
4. `BLOCO-13-LAB` — Professor Gerador/Revisor.
5. `BLOCO-17-LAB` — Qualidade visível da aula.
6. `BLOCO-16-LAB` — Histórico real de Speaking.
7. `BLOCO-15-LAB` — Banco de erros real.
8. `BLOCO-20-LAB` — Certificação por nível.
9. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
10. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e só então montar blocos de polimento com base nessa auditoria.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Já foram implementados o BLOCO-10A-LAB, ajustes do BLOCO-10C-LAB, BLOCO-CARTAS-2-LAB, BLOCO-SPEAKING-2-LAB, BLOCO-CARTAS-3-LAB, BLOCO-10B-LAB, renderer/gate de Listening, reparo automático especializado para Listening, ajuste de vocabulário/áudio, preservação do tema real do cronograma em Listening, Listening leve com seções recolhíveis, hotfix de navegação/pausa, quiz guiado estilo Duolingo na prática de Listening e melhoria de qualidade do quiz com ditado/dica/tentativa extra. Validar primeiro no iPhone. Próximo bloco depois da validação: BLOCO-12-LAB. Depois seguir a ordem: 14, 11, 13, 17, 16, 15, 20, CARTAS-3B para expandir até 2.000 e AUDITORIA-POLIMENTO-GERAL. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
