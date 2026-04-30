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

## Estado Vercel atual

A Vercel voltou a fazer deploy da `rewrite-fluency-clean-lab`.

Status confirmado:
- branch: `rewrite-fluency-clean-lab`;
- commit atual antes da correção mais recente: `3f5c74da4a28332dce67204d1fd96010b537ab7f`;
- status Vercel: success;
- portanto o bloqueio de build para preview/lab parece ter sido liberado ou era temporário/intermitente.

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
3. correção da aba Pronúncia para que o botão “Próxima” atualize frase, IPA, palavras, foco, áudio e limpe a análise anterior.

Essas alterações recentes estão isoladas na `rewrite-fluency-clean-lab` e NÃO entram automaticamente na `main` nem na `rewrite-fluency-clean`.

Não tratar essas alterações como parte da promoção já feita para `main`. A promoção para `main` foi do estado da `rewrite-fluency-clean` no PR #21.

Ordem correta:
1. validar primeiro a `rewrite-fluency-clean-lab` com as alterações recentes;
2. se estiver bom, sincronizar para `rewrite-fluency-clean`;
3. testar novamente o link estável da `rewrite-fluency-clean`;
4. só depois decidir se essas alterações entram em `main`;
5. validar produção/main separadamente.

Não misturar as correções recentes da lab direto na `main` sem validação.

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

Commits:
- `23a21cc0fa62eb0adec3dc6f4a54dbe60d6a9db5` — adiciona `lessonValidation.js`;
- `11739c99ce70addc58bdd9e8cb683b3f5cca2ede` — conecta gate antes de salvar;
- `198453ce6ed3a54d1f7ce6fd55b55e3de8de1a53` — preserva revisão pedagógica na normalização.

Teste recomendado:
1. aguardar deploy da lab no commit `198453c` ou posterior;
2. abrir preview da `rewrite-fluency-clean-lab` no iPhone;
3. ir em Aula;
4. gerar a próxima aula;
5. acompanhar Diagnóstico;
6. confirmar que aparece “Avaliação pedagógica iniciada”; 
7. se aprovada, confirmar mensagem “Aula validada (nota/100), salva e aberta na aba Aula”;
8. se reprovada, confirmar que a aula não substitui a aula atual e que o Diagnóstico mostra os problemas.

Próximo bloco sugerido:
- `BLOCO-10B-LAB — Correção automática limitada quando quality gate reprovar`.
- Fluxo: se score < 85, pedir reparo automático à IA no máximo 2 vezes; se ainda reprovar, bloquear salvamento com mensagem clara.

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
1. aguardar deploy da lab com commit `133e104` ou posterior;
2. abrir Speaking > Pronúncia;
3. tocar “Próxima”;
4. confirmar que a frase visual muda junto com o áudio;
5. gravar a nova frase;
6. confirmar que a análise/foco usa a nova frase, não a antiga.

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios nas telas IMPLEMENTADO, aguardando validação completa

Contexto:
- usuário identificou que a análise Azure já funcionava, mas algumas áreas ainda exibiam conteúdo mockado/fictício;
- objetivo do bloco: exibir somente dados reais, estados vazios ou conteúdo pedagógico claramente estático, sem fingir histórico/progresso/cartas.

Arquivos alterados:
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi removido/corrigido:
- Hoje:
  - removido diário marcado como concluído sem dado real;
  - removidas barras semanais fixas;
  - tarefas agora derivam de aula atual, progresso real e histórico real;
  - flashcards mostram “nenhum card real disponível” quando não há vocabulário da aula atual.
- Progresso:
  - removidas pontuações fake iniciais por habilidade;
  - habilidades agora mostram `sem dados` até existirem aulas concluídas daquele tipo;
  - removida estimativa fictícia de palavras/speaking;
  - conquistas agora usam histórico real ou aparecem bloqueadas/zeradas.
- Cartas:
  - removidos baralhos fictícios, contagens falsas e cards mockados;
  - cartas agora são geradas somente a partir do vocabulário real da aula atual;
  - se não houver vocabulário real, mostra estado vazio claro.
- Ajustes:
  - removidos dados estáticos como se fossem reais, por exemplo perfil “Luis A1 plano ativo”, lembrete 19:30 e foco semanal fixo;
  - tela agora mostra progresso real, aula atual real, semana atual e estado local/sync.

Teste recomendado:
1. verificar Hoje com e sem aula gerada;
2. verificar Cartas antes/depois de uma aula com vocabulário;
3. verificar Progresso antes/depois de concluir aula;
4. verificar Ajustes e confirmar que não há números ou status falsos;
5. verificar Speaking/Azure usando dados reais;
6. se aprovado, sincronizar para `rewrite-fluency-clean`.

### Bloco 8-LAB-11E — Correção do npm install da Vercel IMPLEMENTADA, MAS PRODUÇÃO AINDA NÃO VALIDADA

Contexto:
- deploy da produção/main falhou na Vercel com:
  - `Command "cd fluency-clean && npm install" exited with 1`;
- `fluency-clean/package.json` usava `latest` em todas as dependências;
- não havia `package-lock.json`;
- isso deixava o install instável em produção, pois a Vercel podia resolver versões novas/incompatíveis.

Correção aplicada:
- `fluency-clean/package.json` agora usa versões fixas estáveis;
- adicionada faixa de Node em `engines`;
- correção aplicada em:
  - `rewrite-fluency-clean-lab`;
  - `rewrite-fluency-clean`;
  - `main`.

Versões fixadas:
- `@vitejs/plugin-react`: `4.3.4`;
- `vite`: `5.4.19`;
- `react`: `18.3.1`;
- `react-dom`: `18.3.1`;
- `firebase`: `10.14.1`;
- `lucide-react`: `0.468.0`.

Status:
- commitado;
- a produção/main ainda não teve deploy final validado.

Commits relevantes:
- `main`: `576cc3818e80f42dfbc91c49493406911e03941c`;
- `rewrite-fluency-clean`: `175865b3225f08ee867313d4db984a12352e2bef`.

### Bloco 8-LAB-11D — Merge controlado para main CONCLUÍDO NO GITHUB, MAS NÃO VALIDADO EM PRODUÇÃO

Resultado GitHub:
- PR #21 foi mesclado com sucesso em `main`;
- merge commit da main: `7c9427be54ffc4bb62f4009d261ee09d5e53ff6f`;
- PR #21 está fechado e merged;
- GitHub mostra botão “Delete branch”, mas NÃO deve ser usado por enquanto;
- `rewrite-fluency-clean-lab` deve continuar viva;
- `rewrite-fluency-clean` também deve continuar viva até a produção estar validada.

Status produção:
- ainda não conseguimos fazer a validação final da `main` no Vercel;
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

Conclusão da configuração:
- mesmo com Root Directory na raiz, a Vercel deve instalar/buildar o app novo dentro de `fluency-clean`;
- o deploy deve publicar `fluency-clean/dist`;
- o `index.html` antigo e o `bundle.js` antigo da raiz não devem ser usados como saída final do deploy.

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

## Próximo bloco possível

### `BLOCO-10B-LAB — Correção automática limitada quando quality gate reprovar`
Objetivo:
- se aula gerada ficar abaixo de 85/100, pedir à IA para corrigir somente os problemas listados;
- tentar no máximo 2 reparos automáticos;
- reavaliar após cada reparo;
- se ainda reprovar, bloquear salvamento e mostrar erro claro no Diagnóstico.

### `Bloco 8-LAB-12D — Validação completa da lab`
Objetivo:
- aguardar/confirmar deploy da lab no commit mais recente;
- testar se Hoje, Cartas, Progresso, Ajustes e Speaking não exibem conteúdo falso;
- testar especificamente “Próxima” em Pronúncia;
- testar o quality gate pedagógico gerando uma aula real;
- corrigir qualquer bug encontrado;
- se aprovado, sincronizar para `rewrite-fluency-clean`.

### `Bloco 8-LAB-11F — Redeploy da main e validação produção`
Objetivo:
- aguardar/acionar deploy da `main`;
- se falhar, ler logs reais do install/build;
- se ficar Ready, testar link de produção no iPhone;
- só considerar `main` aprovada após teste real no iPhone.

Se o deploy da main quebrar por código:
- não mexer no backend Azure;
- corrigir primeiro na `rewrite-fluency-clean-lab`;
- depois sincronizar para `rewrite-fluency-clean` e `main` com PR/merge controlado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Foi implementado o BLOCO-10A-LAB: quality gate pedagógico local antes de salvar aula. O validador fica em `fluency-clean/src/services/lessonValidation.js`; `LessonGeneratorPanel.jsx` agora valida antes de `saveCurrentLesson`; `lessonTypes.js` preserva `pedagogicalReview` e `quality`. A nota mínima é 85/100. Aula reprovada não salva e registra problemas no Diagnóstico. Próximo bloco sugerido: BLOCO-10B-LAB, correção automática limitada se reprovar. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
