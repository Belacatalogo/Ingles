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
6. correção da aula renderizada de Listening no `BLOCO-10C-LAB`.

Essas alterações recentes estão isoladas na `rewrite-fluency-clean-lab` e NÃO entram automaticamente na `main` nem na `rewrite-fluency-clean`.

Ordem correta:
1. validar primeiro a `rewrite-fluency-clean-lab` com as alterações recentes;
2. se estiver bom, sincronizar para `rewrite-fluency-clean`;
3. testar novamente o link estável da `rewrite-fluency-clean`;
4. só depois decidir se essas alterações entram em `main`;
5. validar produção/main separadamente.

Não misturar correções recentes da lab direto na `main` sem validação.

## Estado atual implementado

### BLOCO-10C-LAB — Corrigir aula renderizada IMPLEMENTADO, aguardando teste no iPhone

Prioridade: máxima.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `REWRITE_HANDOFF.md`

Problemas corrigidos:
- respostas esperadas não aparecem mais automaticamente antes da tentativa;
- cada pergunta de compreensão agora tem estado próprio de resposta;
- resposta esperada só aparece depois que o aluno escreve algo ou toca em “Ver resposta”;
- respostas de compreensão são salvas como rascunho junto com a resposta escrita principal;
- botão “Salvar rascunho” mostra confirmação perceptível com horário;
- botão “Concluir Listening” salva rascunho, chama `completeLesson()` e mostra confirmação com horário;
- conclusão registra evento real de aula/progresso via `progressStore`;
- Shadowing agora usa frases reais extraídas da transcrição/listeningText;
- Shadowing ganhou botão “Ouvir frase” e “Próxima frase”;
- botão redundante “Concluir” dentro do Shadowing foi removido para não confundir;
- Diagnóstico registra salvamento, conclusão e avanço de frase de shadowing.

Critério de aprovação:
1. abrir preview da `rewrite-fluency-clean-lab` no iPhone;
2. ir em Aula e abrir uma aula de Listening;
3. confirmar que as respostas esperadas NÃO aparecem de início;
4. escrever uma resposta curta em uma pergunta e confirmar que a resposta esperada aparece depois;
5. testar “Ver resposta” em outra pergunta;
6. escrever em “Sua resposta”;
7. tocar “Salvar rascunho” e confirmar mensagem/horário;
8. tocar “Concluir Listening” e confirmar mensagem/horário;
9. testar Shadowing: frase real da transcrição, “Ouvir frase” e “Próxima frase”;
10. confirmar que não há botão “Concluir” duplicado no bloco de Shadowing.

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

Commits relevantes:
- `23a21cc0fa62eb0adec3dc6f4a54dbe60d6a9db5` — adiciona `lessonValidation.js`;
- `11739c99ce70addc58bdd9e8cb683b3f5cca2ede` — conecta gate antes de salvar;
- `198453ce6ed3a54d1f7ce6fd55b55e3de8de1a53` — preserva revisão pedagógica na normalização;
- `4372fc82de59ee3bfd969a440f2fc477ddcbeeef` — atualiza handoff do gate pedagógico.

### Bloco 8-LAB-12C — Correção da próxima frase em Pronúncia IMPLEMENTADA, aguardando teste completo

Correção aplicada:
- `fluency-clean/src/screens/SpeakingScreen.jsx` usa uma lista controlada de frases de pronúncia;
- o índice da frase atual fica em estado (`pronunciationIndex`);
- o botão “Próxima” troca frase exibida, IPA, palavras, foco, áudio e limpa resultado anterior.

Commit:
- `133e1047312fc7918ad2eab76e74d7738c28d6d0` — `Corrige próxima frase na pronúncia`.

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

### Bloco 8-LAB-10D — Login Google validado na branch estável / correção sincronizada

Resultado:
- login funcionou no link da branch `rewrite-fluency-clean` depois que o domínio Vercel foi autorizado no Firebase Authentication;
- correção de login iOS foi aplicada na lab e sincronizada manualmente para `rewrite-fluency-clean`.

### Bloco 8-LAB-11E — Correção do npm install da Vercel IMPLEMENTADA, MAS PRODUÇÃO AINDA NÃO VALIDADA

Resultado:
- `fluency-clean/package.json` usa versões fixas estáveis;
- adicionada faixa de Node em `engines`;
- correção aplicada em `rewrite-fluency-clean-lab`, `rewrite-fluency-clean` e `main`.

Versões fixadas:
- `@vitejs/plugin-react`: `4.3.4`;
- `vite`: `5.4.19`;
- `react`: `18.3.1`;
- `react-dom`: `18.3.1`;
- `firebase`: `10.14.1`;
- `lucide-react`: `0.468.0`.

### Bloco 8-LAB-11D — Merge controlado para main CONCLUÍDO NO GITHUB, MAS NÃO VALIDADO EM PRODUÇÃO

Resultado GitHub:
- PR #21 foi mesclado com sucesso em `main`;
- merge commit da main: `7c9427be54ffc4bb62f4009d261ee09d5e53ff6f`;
- produção/main ainda NÃO está aprovada até deploy Ready e teste real no iPhone.

Rollback se main quebrar:
- voltar `main` para `5047bae031f20ddd9604953dcd3fd821655e56fa`.

## CAMINHO COMPLETO DOS PRÓXIMOS BLOCOS

### 1. BLOCO-CARTAS-2-LAB — Finalização real da sessão de flashcards

Prioridade: alta.

Problemas registrados:
- ao terminar a última carta, a sessão reinicia/reset sem tela clara de conclusão;
- não mostra “sessão concluída”;
- não há botão claro para continuar/revisar de novo/voltar para Hoje;
- conclusão das cartas não registra na tela Hoje;
- métricas de cartas parecem locais da tela e não evento real de progresso.

Correção planejada:
- tela final de sessão concluída;
- mostrar cards revisados, precisão e cards para revisar;
- botões “Revisar novamente”, “Voltar para Hoje” e “Continuar aula”;
- registrar evento real com data, lessonId, totalCards, reviewedCards, correctCount, needsReviewCount e accuracy;
- Hoje deve marcar Cartas como concluída somente se houver sessão real concluída hoje.

Critério de aprovação:
- última carta não reseta silenciosamente;
- aparece conclusão clara;
- Hoje reconhece Cartas como concluída com base em evento real.

### 2. BLOCO-SPEAKING-2-LAB — Conversa adaptada ao nível e registro real

Prioridade: alta.

Problemas registrados:
- aba Speaking mostra conteúdo B1 mesmo com aluno em A1;
- tema “past simple e past continuous” é avançado demais para início;
- conversa não usa claramente o que o aluno já estudou;
- falta critério real de conclusão;
- Hoje precisa contabilizar conversação somente quando houver prática real.

Correção planejada:
- gerar/selecionar conversa com base no nível atual e no que já foi estudado;
- remover cenário fixo B1 para usuário A1;
- A1 deve usar frases simples: apresentação, rotina, família, comida, objetos, preferências simples, verbo to be e present simple;
- concluir sessão por 5 frases faladas ou 3 minutos, o que vier primeiro;
- registrar evento real de speaking com data, nível, cenário, frases faladas, duração, score Azure e texto reconhecido;
- Hoje marca Conversação como feita só com registro real.

Critério de aprovação:
- conteúdo de Speaking respeita o nível atual;
- usuário vê critério claro de conclusão;
- Hoje marca Conversação feita apenas após prática real.

### 3. BLOCO-CARTAS-3-LAB — Banco das 2.000 palavras mais usadas em inglês

Prioridade: alta/média, após Cartas salvar sessão real.

Objetivo:
- adicionar botão “2.000 palavras” ao lado de “Aula atual” na aba Cartas;
- ao clicar, mostrar lista de tópicos/aulas;
- cada tópico abre um deck de flashcards;
- separar em blocos leves de 20–30 palavras;
- incluir palavra, tradução, exemplo, categoria, nível e áudio;
- reaproveitar sistema real de sessão do BLOCO-CARTAS-2.

### 4. BLOCO-10B-LAB — Correção automática limitada quando quality gate reprovar

Objetivo:
- se aula gerada ficar abaixo de 85/100, pedir à IA para corrigir somente os problemas listados;
- tentar no máximo 2 reparos automáticos;
- reavaliar após cada reparo;
- se ainda reprovar, bloquear salvamento e mostrar erro claro no Diagnóstico.

### 5. BLOCO-12-LAB — Rubricas por tipo de aula

Objetivo:
- criar estruturas obrigatórias para Grammar, Reading, Listening, Writing e Speaking;
- impedir aula bagunçada por tipo.

### 6. BLOCO-14-LAB — Aula confiável com contrato JSON rígido

Objetivo:
- impedir aula incompleta ou bagunçada antes de renderizar;
- exigir campos obrigatórios;
- rejeitar perguntas/respostas incoerentes.

### 7. BLOCO-11-LAB — Aula em duas fases: plano primeiro, conteúdo depois

Objetivo:
- gerar primeiro o plano da aula;
- validar plano;
- só depois gerar aula completa.

### 8. BLOCO-13-LAB — Professor Gerador e Professor Revisor

Objetivo:
- separar IA que cria da IA que avalia;
- Gerador cria a aula;
- Revisor avalia com dureza;
- se reprovar, Gerador corrige;
- Revisor reavalia;
- salvar só quando aprovado.

### 9. BLOCO-17-LAB — Qualidade da aula visível para o usuário

Objetivo:
- mostrar selo “Aula validada”;
- mostrar nota pedagógica;
- mostrar clareza, adequação ao nível, prática ativa, vocabulário, exercícios, respostas esperadas e revisão.

### 10. BLOCO-16-LAB — Histórico real de Speaking

Objetivo:
- salvar tentativas reais de speaking;
- guardar frase esperada, texto reconhecido, score geral, accuracy, fluency, completeness, palavra mais fraca, fonemas problemáticos, modo e data;
- mostrar evolução real no Progresso.

### 11. BLOCO-15-LAB — Banco de erros e revisão adaptativa real

Objetivo:
- salvar erros reais do aluno;
- fontes: aula, speaking, writing, grammar;
- alimentar revisão adaptativa de sábado;
- mostrar pontos fracos reais no Progresso.

### 12. BLOCO-20-LAB — Certificação interna por nível

Objetivo:
- impedir avanço de A1 para A2 apenas por quantidade de aulas;
- exigir requisitos reais: conclusão, média por pilar, sessões de speaking, revisão final aprovada e poucos erros críticos abertos.

## ORDEM RESUMIDA PARA O PRÓXIMO CHAT

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit; fluxo ideal 1 bloco → 1 commit → 1 deploy → teste no iPhone. Não faça vários commits pequenos. Não insista se a Vercel bloquear por limite. O deploy voltou a funcionar após o commit `8281150`, mas continuar economizando. Já foram implementados o BLOCO-10A-LAB e o BLOCO-10C-LAB. Próximo bloco: BLOCO-CARTAS-2-LAB, finalização real da sessão de flashcards. Depois seguir a ordem: SPEAKING-2, CARTAS-3, 10B, 12, 14, 11, 13, 17, 16, 15, 20. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
