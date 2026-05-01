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

Observação: no ajuste de parada automática do Speaking, o conector bloqueou a criação de árvore/commit único. Por segurança, a correção foi aplicada via `update_file`, gerando commits separados, sem tocar em `main`, `bundle.js` ou backend Azure.

## Estado atual implementado

### AJUSTE BLOCO-SPEAKING-2-LAB — Conversa livre com parada automática por silêncio IMPLEMENTADO, aguardando teste

Contexto do teste:
- usuário informou que a correção anterior não resolveu o corte de fala;
- o usuário não quer repetir um modelo fixo;
- o Speaking precisa ser válido para aprendizado real, permitindo responder com as próprias palavras;
- usuário pediu: tocar no botão, falar, o sistema parar sozinho quando detectar silêncio e iniciar análise automaticamente.

Arquivos alterados:
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/services/recorder.js`
- `fluency-clean/src/services/azurePronunciation.js`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- Conversa voltou a ser fala livre, sem mostrar “Modelo: ...”;
- botão de conversa agora é de toque único: toca, fala, o sistema escuta;
- gravador detecta silêncio usando `AudioContext`/`AnalyserNode`;
- ao detectar silêncio após a fala, para automaticamente;
- análise/transcrição Azure começa automaticamente após parar;
- conversa usa `recognizeSpeech()` sem avaliação por frase-modelo;
- a aba Pronúncia continua usando `analyzePronunciation()` com frase de referência;
- tentativas muito curtas/cortadas com menos de 2 palavras não avançam a sessão;
- conversa avança com base no texto realmente reconhecido;
- conclusão continua em 5 respostas válidas ou 3 minutos;
- não houve alteração no backend Azure privado.

Teste recomendado:
1. abrir Speaking no iPhone;
2. iniciar Nova sessão, se já estiver concluída;
3. tocar uma vez no microfone;
4. falar livremente uma resposta completa;
5. parar de falar e aguardar;
6. confirmar que a gravação para sozinha;
7. confirmar que a análise começa sem segundo toque;
8. confirmar que a resposta reconhecida não aparece mais como frase-modelo;
9. confirmar que respostas cortadas/curtas não avançam;
10. concluir 5 respostas válidas e conferir Hoje.

### BLOCO-SPEAKING-2-LAB — Speaking por nível e registro real IMPLEMENTADO

Correção aplicada:
- Conversa não usa mais cenário B1 fixo quando o aluno está em A1;
- A1 usa prompts simples;
- Pronúncia usa frases A1 quando o nível atual é A1;
- Imersão foi mantida em cenários A1 simples;
- Conversa registra sessão real ao completar 5 respostas válidas ou 3 minutos;
- registro real salvo em `progress.speakingSessions`;
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

1. `BLOCO-CARTAS-3-LAB` — 2.000 palavras por tópicos.
2. `BLOCO-10B-LAB` — Correção automática do quality gate.
3. `BLOCO-12-LAB` — Rubricas por tipo de aula.
4. `BLOCO-14-LAB` — Contrato JSON rígido.
5. `BLOCO-11-LAB` — Plano primeiro, aula depois.
6. `BLOCO-13-LAB` — Professor Gerador/Revisor.
7. `BLOCO-17-LAB` — Qualidade visível da aula.
8. `BLOCO-16-LAB` — Histórico real de Speaking.
9. `BLOCO-15-LAB` — Banco de erros real.
10. `BLOCO-20-LAB` — Certificação por nível.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Já foram implementados o BLOCO-10A-LAB, ajustes do BLOCO-10C-LAB, BLOCO-CARTAS-2-LAB, BLOCO-SPEAKING-2-LAB e o ajuste de conversa livre com parada automática por silêncio. Validar primeiro no iPhone. Próximo bloco depois da validação: BLOCO-CARTAS-3-LAB. Depois seguir a ordem: 10B, 12, 14, 11, 13, 17, 16, 15, 20. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
