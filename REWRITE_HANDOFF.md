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

Status Vercel após merge:
- check da Vercel apareceu como falho;
- status aponta para `upgradeToPro=build-rate-limit`;
- interpretação atual: provável limite de build/deploy da Vercel, não erro confirmado do código;
- GitHub também mostrou “This branch has not been deployed / No deployments” no PR;
- próximo passo é aguardar/liberar limite da Vercel ou acionar novo deploy manual quando disponível.

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
1. resolver/aguardar limite de build da Vercel;
2. gerar deploy da main/produção;
3. abrir link de produção no iPhone;
4. confirmar domínio de produção autorizado no Firebase;
5. testar login Google;
6. testar Hoje;
7. testar Aula;
8. testar áudio natural;
9. testar Progresso;
10. testar Diagnóstico;
11. testar PWA;
12. só depois considerar a main aprovada.

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

### Bloco 8-LAB-11A — Preparação segura para main criada como PR draft

Ação feita:
- criado PR draft #21: `rewrite-fluency-clean` → `main`;
- título: `Promover Fluency Clean para main com controle`;
- PR foi usado para promoção controlada;
- `bundle.js` permaneceu intocado;
- backend Azure privado permaneceu intocado.

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

### `Bloco 8-LAB-11E — Resolver deploy Vercel da main / validar produção`
Objetivo:
- lidar com o check Vercel falho por aparente build-rate-limit;
- acionar redeploy quando possível;
- testar link de produção no iPhone;
- confirmar login Google/Firebase no domínio de produção;
- validar Hoje, Aula, áudio natural, Progresso, Diagnóstico e PWA.

Se o deploy da main quebrar por código:
- não mexer no backend Azure;
- corrigir primeiro na `rewrite-fluency-clean-lab`;
- depois sincronizar para `rewrite-fluency-clean` e `main` com PR/merge controlado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O PR #21 foi mesclado em `main` com merge commit `7c9427be54ffc4bb62f4009d261ee09d5e53ff6f`. A Vercel falhou com link de status `upgradeToPro=build-rate-limit`, aparentemente limite de build, não bug confirmado do código. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`. Próximo bloco: resolver/aguardar deploy Vercel da main e validar produção no iPhone."
