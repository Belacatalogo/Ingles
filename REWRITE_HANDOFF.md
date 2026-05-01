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
- a Vercel no plano free atingiu limite diário de deploys;
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

Este commit registra o protocolo econômico e também serve como tentativa única de disparar novo deploy da `rewrite-fluency-clean-lab` após liberação do limite da Vercel.

## Estado Vercel atual

A Vercel voltou a fazer deploy da `rewrite-fluency-clean-lab` em momento anterior, mas depois bloqueou novos deploys por limite diário:

- erro visto pelo usuário: `api-deployments-free-per-day`;
- mensagem: `Resource is limited - try again in 24 hours`;
- enquanto esse erro ocorrer, não insistir em novos commits/deploys.

Quando a Vercel aceitar novamente:
1. confirmar se o deploy da `rewrite-fluency-clean-lab` ficou Ready;
2. confirmar o commit mais recente exibido na Vercel;
3. testar no iPhone;
4. só então seguir para o próximo bloco.

Produção/main:
- PR #21 foi mesclado no GitHub;
- porém a produção/main ainda não foi validada em Vercel;
- não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Link funcional enquanto produção não é validada:
- `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Esse link é preview da branch `rewrite-fluency-clean`, já funcionou com login Google/Firebase, mas pode não conter correções mais recentes da lab.

## Observação importante sobre branches e alterações recentes

Antes das alterações recentes, o usuário estava promovendo a branch estável/secundária `rewrite-fluency-clean` para `main` via PR #21.

Depois disso, foram feitas alterações na branch de testes `rewrite-fluency-clean-lab`:
1. melhorias no Speaking/Azure para usar SDK empacotado e dados reais da análise;
2. remoção de conteúdos fictícios/mockados em Hoje, Progresso, Cartas e Ajustes;
3. correção da aba Pronúncia para que o botão “Próxima” atualize frase, IPA, palavras, foco, áudio e limpe a análise anterior;
4. quality gate pedagógico local antes de salvar aula.

Essas alterações recentes estão isoladas na `rewrite-fluency-clean-lab` e NÃO entram automaticamente na `main` nem na `rewrite-fluency-clean`.

Ordem correta:
1. validar primeiro a `rewrite-fluency-clean-lab` com as alterações recentes;
2. se estiver bom, sincronizar para `rewrite-fluency-clean`;
3. testar novamente o link estável da `rewrite-fluency-clean`;
4. só depois decidir se essas alterações entram em `main`;
5. validar produção/main separadamente.

Não misturar correções recentes da lab direto na `main` sem validação.

## Estado atual

### BLOCO-10A-LAB — Quality Gate Pedagógico Local IMPLEMENTADO, aguardando deploy/teste

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

Critérios avaliados:
- objetivo claro;
- aderência ao nível esperado do cronograma;
- clareza e profundidade das seções;
- completude por tipo de aula;
- vocabulário contextualizado;
- exercícios com pergunta, resposta e explicação;
- prática ativa/produção final;
- revisão/checklist/conclusão;
- texto/transcrição principal quando o tipo exige.

Importante:
- o bloco é local/determinístico;
- não chama IA revisora ainda;
- não altera backend Azure;
- não mexe em `bundle.js`;
- não usa DOM injection;
- não troca o gerador atual.

Commits relevantes:
- `23a21cc0fa62eb0adec3dc6f4a54dbe60d6a9db5` — adiciona `lessonValidation.js`;
- `11739c99ce70addc58bdd9e8cb683b3f5cca2ede` — conecta gate antes de salvar;
- `198453ce6ed3a54d1f7ce6fd55b55e3de8de1a53` — preserva revisão pedagógica na normalização;
- `4372fc82de59ee3bfd969a440f2fc477ddcbeeef` — atualiza handoff do gate pedagógico.

Teste recomendado:
1. aguardar deploy da lab no commit `4372fc8` ou posterior;
2. abrir preview da `rewrite-fluency-clean-lab` no iPhone;
3. ir em Aula;
4. gerar a próxima aula;
5. acompanhar Diagnóstico;
6. confirmar que aparece “Avaliação pedagógica iniciada”;
7. se aprovada, confirmar mensagem “Aula validada (nota/100), salva e aberta na aba Aula”;
8. se reprovada, confirmar que a aula não substitui a aula atual e que o Diagnóstico mostra os problemas.

### Bloco 8-LAB-12C — Correção da próxima frase em Pronúncia IMPLEMENTADA, aguardando deploy/teste

Contexto:
- usuário testou a aba Speaking > Pronúncia;
- ao tocar em “Próxima”, o áudio tocava outra frase, mas o painel continuava mostrando a frase antiga;
- isso deixava texto, IPA, palavras e áudio fora de sincronia.

Correção aplicada:
- `fluency-clean/src/screens/SpeakingScreen.jsx` agora usa uma lista controlada de frases de pronúncia;
- o índice da frase atual fica em estado (`pronunciationIndex`);
- o botão “Próxima” troca:
  - frase exibida;
  - IPA exibido;
  - palavras do painel;
  - foco da análise;
  - áudio tocado;
  - resultado anterior limpo.

Commit:
- `133e1047312fc7918ad2eab76e74d7738c28d6d0` — `Corrige próxima frase na pronúncia`.

Teste recomendado:
1. abrir Speaking > Pronúncia;
2. tocar “Próxima”;
3. confirmar que a frase visual muda junto com o áudio;
4. gravar a nova frase;
5. confirmar que a análise/foco usa a nova frase, não a antiga.

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios nas telas IMPLEMENTADO, aguardando validação completa

Contexto:
- usuário identificou que a análise Azure já funcionava, mas algumas áreas ainda exibiam conteúdo mockado/fictício;
- objetivo do bloco: exibir somente dados reais, estados vazios ou conteúdo pedagógico claramente estático, sem fingir histórico/progresso/cartas.

Arquivos alterados:
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `REWRITE_HANDOFF.md`.

O que foi removido/corrigido:
- Hoje: removido diário marcado como concluído sem dado real; tarefas agora derivam de aula atual, progresso real e histórico real.
- Progresso: removidas pontuações fake iniciais por habilidade; habilidades mostram `sem dados` até existirem aulas concluídas daquele tipo.
- Cartas: removidos baralhos fictícios, contagens falsas e cards mockados; cartas vêm do vocabulário real da aula atual.
- Ajustes: removidos dados estáticos como se fossem reais; tela mostra progresso real, aula atual real, semana atual e estado local/sync.

Teste recomendado:
1. verificar Hoje com e sem aula gerada;
2. verificar Cartas antes/depois de uma aula com vocabulário;
3. verificar Progresso antes/depois de concluir aula;
4. verificar Ajustes e confirmar que não há números ou status falsos;
5. verificar Speaking/Azure usando dados reais.

### Bloco Speaking/Azure — SDK empacotado e dados reais IMPLEMENTADO

Contexto:
- usuário reportou erro `Falha ao carregar Azure Speech SDK`;
- foi adicionado SDK Azure empacotado via dependência `microsoft-cognitiveservices-speech-sdk`;
- depois usuário confirmou que análise estava funcionando, mas UI de Pronúncia/Conversa ainda usava dados fictícios;
- foi alterado para usar palavras, score e texto reconhecido do Azure.

Status:
- análise Azure voltou a funcionar;
- dados reais foram integrados;
- ainda é necessário validar completamente na lab antes de sincronizar para estável.

### Bloco 8-LAB-10D — Login Google validado na branch estável / correção sincronizada

Contexto:
- usuário autorizou o domínio do preview Vercel no Firebase Authentication;
- usuário confirmou que o login funcionou com o link:
  - `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Resultado:
- causa confirmada: domínio do Vercel precisava estar autorizado no Firebase;
- domínio funcional autorizado: `ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app`;
- correção de login iOS foi aplicada na lab e também sincronizada manualmente para `rewrite-fluency-clean`.

### Bloco 8-LAB-11E — Correção do npm install da Vercel IMPLEMENTADA, MAS PRODUÇÃO AINDA NÃO VALIDADA

Contexto:
- deploy da produção/main falhou na Vercel com `Command "cd fluency-clean && npm install" exited with 1`;
- `fluency-clean/package.json` usava `latest` em todas as dependências;
- não havia `package-lock.json`.

Correção aplicada:
- `fluency-clean/package.json` agora usa versões fixas estáveis;
- adicionada faixa de Node em `engines`;
- correção aplicada em `rewrite-fluency-clean-lab`, `rewrite-fluency-clean` e `main`.

Versões fixadas:
- `@vitejs/plugin-react`: `4.3.4`;
- `vite`: `5.4.19`;
- `react`: `18.3.1`;
- `react-dom`: `18.3.1`;
- `firebase`: `10.14.1`;
- `lucide-react`: `0.468.0`.

Status:
- commitado;
- produção/main ainda não teve deploy final validado.

### Bloco 8-LAB-11D — Merge controlado para main CONCLUÍDO NO GITHUB, MAS NÃO VALIDADO EM PRODUÇÃO

Resultado GitHub:
- PR #21 foi mesclado com sucesso em `main`;
- merge commit da main: `7c9427be54ffc4bb62f4009d261ee09d5e53ff6f`;
- PR #21 está fechado e merged;
- GitHub mostra botão “Delete branch”, mas NÃO deve ser usado por enquanto.

Status produção:
- considerar `main` como não aprovada em produção até novo deploy Ready e teste no iPhone.

Rollback se main quebrar:
- voltar `main` para `5047bae031f20ddd9604953dcd3fd821655e56fa`.

Configuração Vercel previamente confirmada por print:
- Framework Preset: `Other`;
- Root Directory: `./`;
- Build Command: `cd fluency-clean && npm r...`;
- Output Directory: `fluency-clean/dist`;
- Install Command: `cd fluency-clean && npm in...`;
- Include files outside root directory: Enabled.

Conclusão:
- mesmo com Root Directory na raiz, a Vercel deve instalar/buildar o app novo dentro de `fluency-clean`;
- deploy deve publicar `fluency-clean/dist`;
- `index.html` antigo e `bundle.js` antigo da raiz não devem ser usados como saída final do deploy.

## Blocos planejados quando o sistema voltar

### 1. BLOCO-10C-LAB — Corrigir aula renderizada

Problemas registrados:
- respostas esperadas aparecem antes da tentativa;
- Shadowing não é shadowing real;
- botões “Salvar” e “Concluir Listening” não salvam/concluem de forma perceptível ou funcional;
- botão “Concluir” no bloco Shadowing parece redundante/confuso.

Correção planejada:
- ocultar respostas esperadas inicialmente;
- mostrar resposta apenas depois que o aluno responder ou tocar em “Ver resposta”;
- fazer Shadowing usar frases reais da transcrição/listeningText;
- adicionar ouvir frase do shadowing e próxima frase;
- corrigir salvar/concluir Listening;
- manter alteração modular, sem bundle patch e sem DOM injection.

### 2. BLOCO-CARTAS-2-LAB — Finalização real da sessão de flashcards

Problemas registrados:
- ao terminar a última carta, a sessão reinicia/reset sem tela clara de conclusão;
- não mostra “sessão concluída”;
- não há botão claro para continuar/revisar de novo/voltar para Hoje;
- conclusão das cartas não registra na tela Hoje;
- métricas de cartas parecem locais da tela e não evento real de progresso.

Correção planejada:
- tela final de sessão concluída;
- registrar evento real com data, lessonId, totalCards, reviewedCards, correctCount, needsReviewCount e accuracy;
- Hoje deve marcar Cartas como concluída somente se houver sessão real concluída hoje.

### 3. BLOCO-SPEAKING-2-LAB — Conversa adaptada ao nível e registro real

Problemas registrados:
- aba Speaking mostra conteúdo B1 mesmo com aluno em A1;
- tema “past simple e past continuous” é avançado demais para início;
- conversa não usa claramente o que o aluno já estudou;
- falta critério real de conclusão;
- Hoje precisa contabilizar conversação somente quando houver prática real.

Correção planejada:
- gerar/selecionar conversa com base no nível atual e no que já foi estudado;
- remover cenário fixo B1 para usuário A1;
- concluir sessão por 5 frases faladas ou 3 minutos, o que vier primeiro;
- registrar evento real de speaking com data, nível, cenário, frases faladas, duração, score Azure e texto reconhecido;
- Hoje marca Conversação como feita só com registro real.

### 4. BLOCO-CARTAS-3-LAB — Banco das 2.000 palavras mais usadas em inglês

Objetivo:
- adicionar botão “2.000 palavras” ao lado de “Aula atual” na aba Cartas;
- ao clicar, mostrar lista de tópicos/aulas;
- cada tópico abre um deck de flashcards;
- separar em blocos leves de 20–30 palavras;
- incluir palavra, tradução, exemplo, categoria, nível e áudio;
- reaproveitar sistema real de sessão do BLOCO-CARTAS-2.

### 5. BLOCO-10B-LAB — Correção automática limitada quando quality gate reprovar

Objetivo:
- se aula gerada ficar abaixo de 85/100, pedir à IA para corrigir somente os problemas listados;
- tentar no máximo 2 reparos automáticos;
- reavaliar após cada reparo;
- se ainda reprovar, bloquear salvamento e mostrar erro claro no Diagnóstico.

### 6. BLOCO-12-LAB — Rubricas por tipo de aula

Objetivo:
- criar estruturas obrigatórias para Grammar, Reading, Listening, Writing e Speaking;
- impedir aula bagunçada por tipo.

### 7. BLOCO-14-LAB — Aula confiável com contrato JSON rígido

Objetivo:
- impedir aula incompleta ou bagunçada antes de renderizar;
- exigir campos obrigatórios;
- rejeitar perguntas/respostas incoerentes.

### 8. BLOCO-11-LAB — Aula em duas fases: plano primeiro, conteúdo depois

Objetivo:
- gerar primeiro o plano da aula;
- validar plano;
- só depois gerar aula completa.

### 9. BLOCO-13-LAB — Professor Gerador e Professor Revisor

Objetivo:
- separar IA que cria da IA que avalia;
- corrigir aula antes de salvar.

### 10. BLOCO-17-LAB — Qualidade da aula visível para o usuário

Objetivo:
- mostrar selo “Aula validada”;
- mostrar nota pedagógica e critérios.

### 11. BLOCO-16-LAB — Histórico real de Speaking

Objetivo:
- salvar tentativas reais de speaking e mostrar evolução no Progresso.

### 12. BLOCO-15-LAB — Banco de erros e revisão adaptativa real

Objetivo:
- salvar erros reais do aluno;
- alimentar revisão adaptativa.

### 13. BLOCO-20-LAB — Certificação interna por nível

Objetivo:
- impedir avanço de A1 para A2 apenas por quantidade de aulas;
- exigir requisitos reais.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit; fluxo ideal 1 bloco → 1 commit → 1 deploy → teste no iPhone. Não faça vários commits pequenos. Não insista se a Vercel bloquear por limite. Foi implementado o BLOCO-10A-LAB: quality gate pedagógico local antes de salvar aula. Próximo bloco prático: BLOCO-10C-LAB, corrigir aula renderizada: respostas antecipadas, shadowing real e botões Salvar/Concluir Listening. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
