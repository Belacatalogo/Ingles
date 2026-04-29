# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED

## REGRA MÁXIMA
Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios nas telas IMPLEMENTADO, aguardando teste

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

Não foi alterado:
- `main`;
- `bundle.js`;
- backend Azure privado;
- estrutura visual geral;
- DOM injection ou bundle patch.

Teste recomendado:
1. aguardar deploy da `rewrite-fluency-clean-lab` ficar Ready;
2. abrir no iPhone;
3. verificar Hoje com e sem aula gerada;
4. verificar Cartas antes/depois de uma aula com vocabulário;
5. verificar Progresso antes/depois de concluir aula;
6. verificar Ajustes e confirmar que não há números ou status falsos;
7. se aprovado, sincronizar para `rewrite-fluency-clean`.

### Bloco 8-LAB-11E — Correção do npm install da Vercel IMPLEMENTADA

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

Commits relevantes:
- `main`: `576cc3818e80f42dfbc91c49493406911e03941c`;
- `rewrite-fluency-clean`: `175865b3225f08ee867313d4db984a12352e2bef`.

### Bloco 8-LAB-11D — Merge controlado para main CONCLUÍDO

Resultado:
- PR #21 foi mesclado com sucesso em `main`;
- merge commit da main: `7c9427be54ffc4bb62f4009d261ee09d5e53ff6f`;
- PR #21 está fechado e merged;
- GitHub mostra botão “Delete branch”, mas NÃO deve ser usado por enquanto;
- `rewrite-fluency-clean-lab` deve continuar viva;
- `rewrite-fluency-clean` também deve continuar viva até a produção estar validada.

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

### `Bloco 8-LAB-12B — Validação de dados reais na lab`
Objetivo:
- testar se Hoje, Cartas, Progresso, Ajustes e Speaking não exibem conteúdo falso;
- corrigir qualquer texto/valor mockado que ainda apareça;
- se aprovado, sincronizar para `rewrite-fluency-clean`.

### `Bloco 8-LAB-11F — Redeploy da main e validação produção`
Objetivo:
- aguardar limite da Vercel liberar;
- acionar redeploy da `main`;
- se falhar, ler logs reais do install/build;
- se ficar Ready, testar link de produção no iPhone.

Se o deploy da main quebrar por código:
- não mexer no backend Azure;
- corrigir primeiro na `rewrite-fluency-clean-lab`;
- depois sincronizar para `rewrite-fluency-clean` e `main` com PR/merge controlado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O BLOCO-8-LAB-12 removeu conteúdo fictício de Hoje, Progresso, Cartas e Ajustes na branch `rewrite-fluency-clean-lab`. Testar na lab antes de sincronizar para `rewrite-fluency-clean`. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch. A main já recebeu PR #21, mas deploy de produção depende da Vercel liberar limite. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
