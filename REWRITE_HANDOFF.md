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
Não commitar novas mudanças enquanto a Vercel estiver bloqueada por limite, salvo correção crítica e consciente.

## BLOQUEIO ATUAL — VERCEL LIMIT 24H

Usuário verificou na Vercel que só poderá tentar novo deploy novamente em aproximadamente 24 horas.

Situação importante:
- as últimas mudanças estão commitadas no GitHub, mas NÃO foram validadas em deploy porque a Vercel bloqueou os builds;
- a Vercel retornou `upgradeToPro=build-rate-limit` nos commits recentes;
- portanto, não considerar as últimas correções como aprovadas visualmente ainda;
- não insistir em novos commits/deploys agora para não reiniciar/agravar o bloqueio.

Commits recentes ainda sem validação por deploy:
- `rewrite-fluency-clean-lab`: `42c1fbb7533b7121ea1a0f1c2a951d3997fb83d0` — `Documenta remoção de dados fictícios`;
- alterações anteriores de Speaking/Azure também foram feitas na lab, mas precisam ser conferidas no preview mais recente quando o deploy liberar.

Produção/main:
- PR #21 foi mesclado no GitHub;
- porém NÃO conseguimos validar produção/main na Vercel;
- o deploy de produção/main ainda não ficou Ready com a versão final;
- portanto, considerar que a ida para `main` está incompleta do ponto de vista de produção, mesmo que o merge GitHub tenha ocorrido.

Link funcional enquanto a Vercel não libera a produção:
- `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Esse link é preview da branch `rewrite-fluency-clean`, já funcionou com login Google/Firebase, mas pode não conter as correções mais recentes da lab.

## Estado atual

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios nas telas IMPLEMENTADO, MAS NÃO VALIDADO POR DEPLOY

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

Status:
- implementado no GitHub;
- Vercel bloqueou o deploy por limite;
- aguardando liberação de 24 horas para testar na lab.

Não foi alterado:
- backend Azure privado;
- `bundle.js`;
- DOM injection;
- bundle patch.

Teste recomendado quando a Vercel liberar:
1. aguardar deploy da `rewrite-fluency-clean-lab` ficar Ready no commit `42c1fbb` ou posterior;
2. abrir no iPhone;
3. verificar Hoje com e sem aula gerada;
4. verificar Cartas antes/depois de uma aula com vocabulário;
5. verificar Progresso antes/depois de concluir aula;
6. verificar Ajustes e confirmar que não há números ou status falsos;
7. verificar Speaking/Azure usando dados reais;
8. se aprovado, sincronizar para `rewrite-fluency-clean`.

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
- a produção/main ainda não teve deploy final validado por causa do limite de 24h.

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
- deploy de produção ficou bloqueado/falhou por limite;
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

### Bloco Speaking/Azure — SDK empacotado e dados reais IMPLEMENTADO, MAS ÚLTIMA VERSÃO AINDA PRECISA SER VALIDADA

Contexto:
- usuário reportou erro `Falha ao carregar Azure Speech SDK`;
- foi adicionado SDK Azure empacotado via dependência `microsoft-cognitiveservices-speech-sdk`;
- depois usuário confirmou que análise estava funcionando, mas UI de Pronúncia/Conversa ainda usava dados fictícios;
- foi alterado para usar palavras, score e texto reconhecido do Azure.

Status:
- parte inicial foi vista funcionando pelo usuário;
- as melhorias finais de dados reais precisam ser testadas no preview da lab após a Vercel liberar novo deploy.

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

### `Bloco 8-LAB-12B — Validação após liberação da Vercel`
Objetivo:
- depois das 24 horas, aguardar/acionar deploy da `rewrite-fluency-clean-lab`;
- confirmar que o commit `42c1fbb` ou posterior ficou Ready;
- testar se Hoje, Cartas, Progresso, Ajustes e Speaking não exibem conteúdo falso;
- corrigir qualquer texto/valor mockado que ainda apareça;
- se aprovado, sincronizar para `rewrite-fluency-clean`.

### `Bloco 8-LAB-11F — Redeploy da main e validação produção`
Objetivo:
- depois das 24 horas, aguardar/acionar deploy da `main`;
- se falhar, ler logs reais do install/build;
- se ficar Ready, testar link de produção no iPhone;
- só considerar `main` aprovada após teste real no iPhone.

Se o deploy da main quebrar por código:
- não mexer no backend Azure;
- corrigir primeiro na `rewrite-fluency-clean-lab`;
- depois sincronizar para `rewrite-fluency-clean` e `main` com PR/merge controlado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. Estamos travados pela Vercel: o usuário confirmou que só poderá tentar novo deploy em 24h. As últimas mudanças estão no GitHub, mas NÃO foram validadas em deploy. A lab está no commit `42c1fbb` com remoção de conteúdos fictícios, mas o deploy foi bloqueado por `upgradeToPro=build-rate-limit`. O PR #21 foi mesclado na `main` no GitHub, mas a produção/main ainda NÃO foi validada no Vercel; portanto a ida para main está incompleta do ponto de vista de produção. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`. Quando a Vercel liberar, primeiro validar a lab, depois sincronizar para estável e só então validar produção."