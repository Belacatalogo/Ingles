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

Próximo passo:
- fazer/repetir Redeploy da `main` na Vercel;
- se falhar novamente, abrir a aba Logs do deployment e capturar a primeira mensagem real do `npm install`;
- se o deploy ficar Ready, testar produção no iPhone.

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

Checklist pós-merge pendente:
1. gerar deploy da main/produção;
2. abrir link de produção no iPhone;
3. confirmar domínio de produção autorizado no Firebase;
4. testar login Google;
5. testar Hoje;
6. testar Aula;
7. testar áudio natural;
8. testar Progresso;
9. testar Diagnóstico;
10. testar PWA;
11. só depois considerar a main aprovada.

### Bloco 8-LAB-11B — Vercel Build/Output confirmado como seguro para fluency-clean

Contexto:
- usuário enviou prints da Vercel em Build and Deployment;
- Root Directory aparece como `./`, não como `fluency-clean`;
- porém os comandos de build/install/output estão explicitamente apontando para `fluency-clean`.

Configuração observada nos prints:
- Framework Preset: `Other`;
- Root Directory: `./`;
- Build Command: `cd fluency-clean && npm r...`;
- Output Directory: `fluency-clean/dist`;
- Install Command: `cd fluency-clean && npm in...`;
- Include files outside root directory: Enabled.

Conclusão:
- esta configuração também é segura;
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

### `Bloco 8-LAB-11F — Redeploy da main e validação produção`
Objetivo:
- acionar redeploy da `main` na Vercel;
- se falhar, ler logs reais do install/build;
- se ficar Ready, testar link de produção no iPhone;
- confirmar login Google/Firebase no domínio de produção;
- validar Hoje, Aula, áudio natural, Progresso, Diagnóstico e PWA.

Se o deploy da main quebrar por código:
- não mexer no backend Azure;
- corrigir primeiro na `rewrite-fluency-clean-lab`;
- depois sincronizar para `rewrite-fluency-clean` e `main` com PR/merge controlado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O PR #21 foi mesclado em `main`. O deploy da main falhou no `cd fluency-clean && npm install`; foi corrigido fixando dependências no `package.json` em lab, estável e main. Commit atual da main com correção: `576cc3818e80f42dfbc91c49493406911e03941c`. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`. Próximo bloco: redeploy da main e validar produção no iPhone."
