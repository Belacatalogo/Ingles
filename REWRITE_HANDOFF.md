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

Contexto:
- a Vercel no plano free atingiu limite diário de deploys anteriormente;
- o usuário testa pelo iPhone;
- precisamos economizar commits/deploys.

Regra operacional daqui em diante:
1. Cada bloco deve virar **1 commit único**, sempre que possível.
2. Não fazer vários commits pequenos para o mesmo bloco.
3. Não fazer commit apenas para tentativa repetida de deploy enquanto a Vercel estiver limitada.
4. Antes de commitar, ler os arquivos necessários, planejar a alteração e fechar o bloco inteiro.
5. Atualizar `REWRITE_HANDOFF.md` junto com o bloco, no mesmo commit.
6. Fluxo ideal: **1 bloco → 1 commit → 1 deploy → teste no iPhone**.
7. No máximo 2 blocos pequenos podem ser agrupados em 1 commit, se forem seguros e relacionados.
8. Se a Vercel bloquear novamente, parar commits e aguardar liberação.
9. Quando liberar, fazer somente 1 commit mínimo, se necessário, para disparar o deploy da lab.

## Estado Vercel atual

Status mais recente informado pelo usuário:
- o deploy voltou a funcionar após o commit `8281150592684874bc771c91a23a29ab0be75a9c`;
- continuar em modo econômico para não estourar limite novamente.

Produção/main:
- PR #21 foi mesclado no GitHub;
- porém a produção/main ainda não foi validada em Vercel;
- não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Link funcional enquanto produção não é validada:
- `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Esse link é preview da branch `rewrite-fluency-clean`, já funcionou com login Google/Firebase, mas pode não conter correções mais recentes da lab.

## Observação importante sobre branches e alterações recentes

Depois da promoção controlada da branch estável/secundária `rewrite-fluency-clean` para `main` via PR #21, foram feitas alterações na branch de testes `rewrite-fluency-clean-lab`:
1. melhorias no Speaking/Azure para usar SDK empacotado e dados reais da análise;
2. remoção de conteúdos fictícios/mockados em Hoje, Progresso, Cartas e Ajustes;
3. correção da aba Pronúncia para que o botão “Próxima” atualize frase, IPA, palavras, foco, áudio e limpe a análise anterior;
4. quality gate pedagógico local antes de salvar aula;
5. protocolo econômico de deploy;
6. correção da aula renderizada de Listening no `BLOCO-10C-LAB`;
7. ajuste pós-teste do `BLOCO-10C-LAB`: resposta esperada não abre mais ao digitar e botão “Ver resposta” ficou compacto.

Essas alterações recentes estão isoladas na `rewrite-fluency-clean-lab` e NÃO entram automaticamente na `main` nem na `rewrite-fluency-clean`.

Ordem correta:
1. validar primeiro a `rewrite-fluency-clean-lab` com as alterações recentes;
2. se estiver bom, sincronizar para `rewrite-fluency-clean`;
3. testar novamente o link estável da `rewrite-fluency-clean`;
4. só depois decidir se essas alterações entram em `main`;
5. validar produção/main separadamente.

Não misturar correções recentes da lab direto na `main` sem validação.

## Estado atual implementado

### AJUSTE BLOCO-10C-LAB — Respostas e botão “Ver resposta” IMPLEMENTADO, aguardando teste no iPhone

Contexto do teste:
- usuário confirmou que rascunho salva normalmente;
- usuário confirmou que Shadowing está funcionando;
- problema restante: resposta esperada aparecia ao digitar a primeira letra;
- botão “Ver resposta” estava grande/feio por herdar o CSS geral de botões da aula.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- resposta esperada agora só aparece quando o aluno toca em “Ver resposta”;
- digitar no campo não revela mais a resposta automaticamente;
- texto de ajuda foi ajustado para explicar esse comportamento;
- botão “Ver resposta” recebeu estilo compacto em pílula;
- preservado o salvamento de rascunho;
- preservado Shadowing real com frases da transcrição.

Teste recomendado:
1. abrir o preview da `rewrite-fluency-clean-lab` no iPhone após Vercel Ready;
2. entrar em uma aula de Listening;
3. digitar uma letra numa pergunta;
4. confirmar que a resposta NÃO aparece;
5. tocar em “Ver resposta”;
6. confirmar que a resposta aparece só depois do toque;
7. confirmar que o botão está pequeno/compacto, não gigante;
8. confirmar que Salvar rascunho e Shadowing continuam funcionando.

### BLOCO-10C-LAB — Corrigir aula renderizada IMPLEMENTADO, aguardando teste final no iPhone

Prioridade: máxima.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `REWRITE_HANDOFF.md`

Problemas corrigidos:
- respostas esperadas não aparecem mais automaticamente antes da tentativa;
- cada pergunta de compreensão agora tem estado próprio de resposta;
- respostas de compreensão são salvas como rascunho junto com a resposta escrita principal;
- botão “Salvar rascunho” mostra confirmação perceptível com horário;
- botão “Concluir Listening” salva rascunho, chama `completeLesson()` e mostra confirmação com horário;
- conclusão registra evento real de aula/progresso via `progressStore`;
- Shadowing agora usa frases reais extraídas da transcrição/listeningText;
- Shadowing ganhou botão “Ouvir frase” e “Próxima frase”;
- botão redundante “Concluir” dentro do Shadowing foi removido para não confundir;
- Diagnóstico registra salvamento, conclusão e avanço de frase de shadowing.

### BLOCO-10A-LAB — Quality Gate Pedagógico Local IMPLEMENTADO, aguardando teste completo

Contexto:
- usuário quer aumentar a confiança das aulas geradas;
- aula não deve ser salva apenas por ter sido gerada;
- agora precisa passar por avaliação pedagógica local antes de entrar em `lesson.current` e histórico.

Arquivos alterados:
- `fluency-clean/src/services/lessonValidation.js` — novo serviço de avaliação pedagógica local;
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx` — valida aula antes de salvar;
- `fluency-clean/src/services/lessonTypes.js` — preserva `pedagogicalReview` e `quality` ao normalizar aula;
- `REWRITE_HANDOFF.md`.

Comportamento implementado:
- depois de `generateLessonDraft`, o painel monta a aula com metadados do cronograma;
- antes de `saveCurrentLesson`, roda `validateLessonForQuality()`;
- nota mínima: 85/100;
- se reprovada, a aula NÃO é salva;
- Diagnóstico registra a reprovação e os problemas encontrados;
- se aprovada, salva a aula com `pedagogicalReview` e `quality.pedagogicalScore`;
- mensagem do painel mostra a nota validada.

### Bloco 8-LAB-12C — Correção da próxima frase em Pronúncia IMPLEMENTADA, aguardando teste completo

Correção aplicada:
- `fluency-clean/src/screens/SpeakingScreen.jsx` usa uma lista controlada de frases de pronúncia;
- o índice da frase atual fica em estado (`pronunciationIndex`);
- o botão “Próxima” troca frase exibida, IPA, palavras, foco, áudio e limpa resultado anterior.

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios nas telas IMPLEMENTADO, aguardando validação completa

Arquivos alterados:
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `REWRITE_HANDOFF.md`.

Resultado:
- Hoje, Progresso, Cartas e Ajustes não devem fingir progresso, status ou dados;
- onde não houver dado real, mostrar estado vazio claro;
- Speaking deve usar dados reais do Azure.

### Bloco Speaking/Azure — SDK empacotado e dados reais IMPLEMENTADO

Resultado:
- Azure Speech SDK foi empacotado via dependência;
- análise Azure voltou a funcionar;
- palavras, score e texto reconhecido foram integrados;
- ainda falta Speaking adaptado ao nível e registro real de sessão, previsto em `BLOCO-SPEAKING-2-LAB`.

## Próximos blocos, após validar a lab no iPhone

1. `BLOCO-CARTAS-2-LAB` — Finalização real dos flashcards.
2. `BLOCO-SPEAKING-2-LAB` — Speaking por nível e registro real.
3. `BLOCO-CARTAS-3-LAB` — 2.000 palavras por tópicos.
4. `BLOCO-10B-LAB` — Correção automática do quality gate.
5. `BLOCO-12-LAB` — Rubricas por tipo de aula.
6. `BLOCO-14-LAB` — Contrato JSON rígido.
7. `BLOCO-11-LAB` — Plano primeiro, aula depois.
8. `BLOCO-13-LAB` — Professor gerador/revisor.
9. `BLOCO-17-LAB` — Qualidade visível da aula.
10. `BLOCO-16-LAB` — Histórico real de Speaking.
11. `BLOCO-15-LAB` — Banco de erros real.
12. `BLOCO-20-LAB` — Certificação por nível.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit; fluxo ideal 1 bloco → 1 commit → 1 deploy → teste no iPhone. Não faça vários commits pequenos. Não insista se a Vercel bloquear por limite. O deploy voltou a funcionar após o commit `8281150`, mas continuar economizando. Já foram implementados o BLOCO-10A-LAB e o BLOCO-10C-LAB; o último ajuste do 10C corrigiu resposta esperada abrindo ao digitar e botão Ver resposta gigante. Validar isso primeiro no iPhone. Próximo bloco depois da validação: BLOCO-CARTAS-2-LAB, finalização real da sessão de flashcards. Depois seguir a ordem: SPEAKING-2, CARTAS-3, 10B, 12, 14, 11, 13, 17, 16, 15, 20. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
