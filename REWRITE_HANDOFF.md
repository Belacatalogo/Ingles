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

## Estado Vercel atual

Status informado pelo usuário:
- o deploy voltou a funcionar após o commit `8281150592684874bc771c91a23a29ab0be75a9c`;
- continuar em modo econômico para não estourar limite novamente.

Produção/main:
- PR #21 foi mesclado no GitHub;
- produção/main ainda não foi validada em Vercel;
- não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Link funcional enquanto produção não é validada:
- `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

## Estado atual implementado

### AJUSTE BLOCO-CARTAS-2-LAB — Restaurar sessão concluída ao voltar de Hoje IMPLEMENTADO, aguardando teste no iPhone

Contexto do teste:
- usuário concluiu/validou parcialmente o fluxo de Cartas;
- ao voltar da aba Hoje para Cartas, a tela remontava e reiniciava visualmente em “carta 1 de 14”;
- usuário quer que, depois de uma sessão concluída hoje, a aba Cartas continue mostrando “Sessão concluída” com botão “Revisar novamente”.

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- Cartas agora consulta `getFlashcardSessions()` ao montar;
- se existir sessão real concluída hoje para a aula atual, a tela já abre em “Sessão concluída”;
- estatísticas são restauradas da sessão salva: revisadas, marcadas ok, para revisar e precisão;
- mantém o botão “Revisar novamente” para iniciar nova sessão limpa;
- mantém “Voltar para Hoje” e “Continuar aula”.

Teste recomendado:
1. concluir uma sessão de Cartas;
2. tocar “Voltar para Hoje”;
3. voltar para Cartas;
4. confirmar que NÃO aparece carta 1 novamente;
5. confirmar que aparece “Sessão concluída”;
6. tocar “Revisar novamente”;
7. confirmar que uma nova sessão começa limpa em carta 1.

### BLOCO-CARTAS-2-LAB — Finalização real da sessão de flashcards IMPLEMENTADO, aguardando teste no iPhone

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/styles/flashcards-session.css`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- ao classificar a última carta, a sessão não reinicia/reset silenciosamente;
- aparece tela final clara de “Sessão concluída”;
- mostra cards revisados, cards marcados ok, cards para revisar e precisão;
- botões: “Revisar novamente”, “Voltar para Hoje” e “Continuar aula”;
- sessão de flashcards registra evento real em `progress.flashcardSessions`;
- Hoje marca Cartas como concluída somente se existir sessão real de flashcards hoje.

### AJUSTE BLOCO-10C-LAB — Múltipla escolha em aulas renderizadas IMPLEMENTADO

Correção aplicada:
- normalização dos exercícios aceita `options`, `choices`, `alternatives`, `answers`, `multipleChoiceOptions` e `possibleAnswers`;
- resposta correta aceita `answer`, `expectedAnswer`, `correctAnswer`, `correct`, `solution`, `rightAnswer`, `answerText` ou `answerKey`;
- respostas como `A`, `B`, `1` ou `2` são mapeadas para a alternativa correspondente;
- opções com `correct: true`, `isCorrect: true`, etc. são reconhecidas.

### AJUSTE BLOCO-10C-LAB — Respostas e botão “Ver resposta” IMPLEMENTADO

Correção aplicada:
- resposta esperada só aparece quando o aluno toca em “Ver resposta”;
- digitar no campo não revela mais a resposta automaticamente;
- botão “Ver resposta” ficou compacto em pílula;
- rascunho e Shadowing real foram preservados.

### BLOCO-10A-LAB — Quality Gate Pedagógico Local IMPLEMENTADO

Comportamento:
- aula gerada passa por avaliação pedagógica local antes de salvar;
- nota mínima: 85/100;
- se reprovar, não salva;
- Diagnóstico mostra problemas;
- se aprovar, salva com `pedagogicalReview` e `quality.pedagogicalScore`.

## Próximos blocos, após validar a lab no iPhone

1. `BLOCO-SPEAKING-2-LAB` — Speaking por nível e registro real.
2. `BLOCO-CARTAS-3-LAB` — 2.000 palavras por tópicos.
3. `BLOCO-10B-LAB` — Correção automática do quality gate.
4. `BLOCO-12-LAB` — Rubricas por tipo de aula.
5. `BLOCO-14-LAB` — Contrato JSON rígido.
6. `BLOCO-11-LAB` — Plano primeiro, aula depois.
7. `BLOCO-13-LAB` — Professor gerador/revisor.
8. `BLOCO-17-LAB` — Qualidade visível da aula.
9. `BLOCO-16-LAB` — Histórico real de Speaking.
10. `BLOCO-15-LAB` — Banco de erros real.
11. `BLOCO-20-LAB` — Certificação por nível.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Já foram implementados o BLOCO-10A-LAB, os ajustes do BLOCO-10C-LAB, o BLOCO-CARTAS-2-LAB e o ajuste para restaurar sessão concluída de Cartas ao voltar de Hoje. Validar primeiro no iPhone. Próximo bloco depois da validação: BLOCO-SPEAKING-2-LAB. Depois seguir a ordem: CARTAS-3, 10B, 12, 14, 11, 13, 17, 16, 15, 20. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
