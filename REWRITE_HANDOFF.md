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

### AJUSTE BLOCO-10B-LAB — Renderer Listening mostra conceito e vocabulário IMPLEMENTADO, aguardando teste

Contexto:
- usuário gerou uma aula que passou no quality gate, mas visualmente ficou ruim;
- a tela mostrava duas caixas com conteúdo parecido, depois ia direto para questões;
- faltava aula real, explicação/conceito e vocabulário da aula.

Arquivo alterado:
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- renderer de Listening agora mostra seções reais da aula em “Conceito e explicação”;
- renderer de Listening agora mostra “Vocabulário da aula” antes da transcrição e dos exercícios;
- primeira caixa de áudio agora usa `objective` como orientação, não repete `intro` como se fosse transcrição/conteúdo;
- fluxo visual esperado: Escuta guiada → Conceito e explicação → Vocabulário da aula → Transcrição → Compreensão → Sua resposta → Shadowing;
- isso corrige o caso de aula aprovada mas escondida pelo layout.

Teste recomendado:
1. aguardar deploy Ready;
2. abrir a aula atual gerada;
3. confirmar que aparece “Conceito e explicação” antes da transcrição;
4. confirmar que aparece “Vocabulário da aula” antes das questões;
5. confirmar que a aula não pula direto para exercícios;
6. testar botão de áudio, respostas, Salvar rascunho, Concluir Listening e Shadowing.

### BLOCO-10B-LAB — Correção automática do quality gate IMPLEMENTADO

Correção aplicada:
- se uma aula gerada reprovar no quality gate, o app não descarta imediatamente;
- antes de desistir, faz uma tentativa automática local de reparo estrutural;
- o reparo completa objetivo, introdução, foco, seções pedagógicas, vocabulário, exercícios, prompts e revisão final quando estiverem insuficientes;
- o reparo respeita o tipo da aula: Reading, Grammar, Listening, Writing, Speaking ou Vocabulary;
- para Reading/Listening, também amplia texto principal/transcrição quando estiver curto;
- depois do reparo, o quality gate roda novamente;
- se aprovar, salva com marca `autoRepaired: true` no review/quality;
- se ainda reprovar, não salva aula ruim e mostra os problemas;
- Diagnóstico informa quando a correção automática foi tentada e quando foi aprovada/reprovada.

### BLOCO-CARTAS-3-LAB — Banco de vocabulário por tópicos IMPLEMENTADO parcialmente e VALIDADO APÓS CORREÇÃO DE BUILD

Correção aplicada:
- novo serviço `vocabularyDecks.js` com decks temáticos reais;
- banco atual: 288 palavras em tópicos A1/A2;
- meta registrada: 2.000 palavras (`VOCABULARY_BANK_TARGET = 2000`);
- tela Cartas permite escolher decks por tópico além da Aula atual;
- sessão de flashcards pode ser feita com deck temático mesmo sem aula com vocabulário;
- registro de sessão usa id de deck quando a revisão vem de deck temático;
- correção de build aplicada no commit `d25e4869c39dcdfb6192f6a3d0c2421763d373a0` por fechamento incorreto do deck `feelings-health`.

### AJUSTE BLOCO-SPEAKING-2-LAB — Feedback de pronúncia em cada fala livre IMPLEMENTADO E VALIDADO PELO USUÁRIO

Correção aplicada:
- mantém o modo de fala livre;
- após transcrever a fala livre com Azure, o app roda uma segunda análise usando a própria frase reconhecida como referência;
- cada resposta do usuário mostra nota de pronúncia, ponto mais fraco e dica;
- usuário informou: “deu certo”.

### AJUSTE BLOCO-SPEAKING-2-LAB — Conversa livre com parada automática por silêncio IMPLEMENTADO

Correção aplicada:
- Conversa voltou a ser fala livre, sem mostrar “Modelo: ...”;
- botão de conversa é de toque único;
- gravador detecta silêncio usando `AudioContext`/`AnalyserNode`;
- transcrição Azure começa automaticamente após parar;
- tentativas muito curtas/cortadas não avançam.

### BLOCO-SPEAKING-2-LAB — Speaking por nível e registro real IMPLEMENTADO

Correção aplicada:
- Conversa não usa mais cenário B1 fixo quando o aluno está em A1;
- A1 usa prompts simples;
- Pronúncia usa frases A1 quando o nível atual é A1;
- Conversa registra sessão real ao completar 5 respostas válidas ou 3 minutos;
- Hoje marca Conversação como concluída somente se existir sessão real de Speaking hoje.

### AJUSTE BLOCO-CARTAS-2-LAB — Restaurar sessão concluída ao voltar de Hoje IMPLEMENTADO E VALIDADO PELO USUÁRIO

Correção aplicada:
- Cartas consulta `getFlashcardSessions()` ao montar;
- se existe sessão real concluída hoje para a aula atual, abre em “Sessão concluída”;
- usuário informou: “tudo ok”.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Já foram implementados o BLOCO-10A-LAB, ajustes do BLOCO-10C-LAB, BLOCO-CARTAS-2-LAB, BLOCO-SPEAKING-2-LAB, BLOCO-CARTAS-3-LAB, BLOCO-10B-LAB e o ajuste do renderer Listening para exibir conceito/vocabulário. Validar primeiro no iPhone. Próximo bloco depois da validação: BLOCO-12-LAB. Depois seguir a ordem: 14, 11, 13, 17, 16, 15, 20, CARTAS-3B para expandir até 2.000 e AUDITORIA-POLIMENTO-GERAL. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
