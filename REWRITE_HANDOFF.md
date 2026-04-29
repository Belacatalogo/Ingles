# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — DRAFT

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main` diretamente.
Não fazer merge do PR #21 antes de confirmar Vercel e domínio Firebase de produção.
Não deletar `rewrite-fluency-clean-lab` após merge.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual para teste

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

Comentário registrado no PR #21:
- foi adicionado comentário documentando que a configuração Vercel observada é segura porque Build Command e Output Directory apontam para `fluency-clean`.

Pendências antes de tirar PR #21 de draft/mesclar:
1. confirmar domínio final da produção/main e autorizar no Firebase Authentication;
2. manter Build Command apontando para `fluency-clean`;
3. manter Output Directory como `fluency-clean/dist`;
4. após merge, testar produção no iPhone;
5. não deletar `rewrite-fluency-clean-lab`.

### Bloco 8-LAB-11A — Preparação segura para main criada como PR draft

Contexto:
- usuário perguntou se, ao levar para `main`, os arquivos do sistema antigo poderiam se misturar com o sistema novo;
- a resposta técnica é sim: se a Vercel usar a raiz do repositório sem comandos direcionados, pode carregar o `index.html` antigo e o `bundle.js` antigo;
- por isso, não foi feito merge direto na `main`.

Ação feita:
- criado PR draft #21: `rewrite-fluency-clean` → `main`;
- título: `Promover Fluency Clean para main com controle`;
- PR está em draft para impedir promoção acidental;
- `main` permanece intocada;
- `rewrite-fluency-clean-lab` permanece viva;
- `bundle.js` permanece intocado.

Estado técnico:
- `rewrite-fluency-clean` está 369 commits à frente da `main`;
- `main` está 0 commits à frente da `rewrite-fluency-clean`;
- tecnicamente é possível promover;
- o sistema novo está em `fluency-clean/`;
- o sistema antigo ainda existe na raiz da `main`.

Rollback se main quebrar após merge:
- voltar `main` para `5047bae031f20ddd9604953dcd3fd821655e56fa`;
- não deletar `rewrite-fluency-clean-lab`;
- corrigir qualquer falha primeiro na lab;
- não mexer no backend Azure.

### Bloco 8-LAB-10D — Login Google validado na branch estável / correção sincronizada

Contexto:
- após a promoção para `rewrite-fluency-clean`, o login Google no iPhone não concluía enquanto o domínio do preview não estava autorizado no Firebase;
- usuário autorizou o domínio do preview Vercel no Firebase Authentication;
- usuário confirmou que o login funcionou com o link:
  - `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Resultado:
- causa confirmada: domínio do Vercel precisava estar autorizado no Firebase;
- domínio funcional autorizado: `ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app`;
- correção de login iOS foi aplicada na lab e também sincronizada manualmente para `rewrite-fluency-clean`, preservando commit extra automático da estável;
- `main` permanece intocada;
- `bundle.js` permanece intocado;
- backend Azure privado permanece intocado;
- branch lab permanece viva.

### Bloco 8-LAB-10C — Correção cirúrgica do login Google no iPhone IMPLEMENTADO

Arquivos alterados:
- `fluency-clean/src/services/auth.js`
- `fluency-clean/src/components/auth/AccessGate.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- botão principal “Entrar com Google” passou a usar `redirect` em vez de `popup`;
- botão secundário virou “Tentar Google por popup” apenas como alternativa;
- no fluxo popup, removido `await prepareAuthPersistence(...)` antes de `signInWithPopup`, para não perder o gesto do toque no Safari;
- mensagens de erro de popup foram ajustadas para orientar uso do redirecionamento no iPhone;
- nenhuma tela foi refeita;
- nenhuma alteração em `main`;
- nenhuma alteração em `bundle.js`;
- nenhuma alteração no backend Azure.

## Próximo bloco possível

### `Bloco 8-LAB-11C — Confirmar domínio Firebase de produção e tirar PR do draft`
Objetivo:
- identificar domínio final que a `main`/produção usará no Vercel;
- autorizar esse domínio no Firebase Authentication;
- marcar PR #21 como pronto para merge ou seguir para merge controlado.

### `Bloco 8-LAB-11D — Merge controlado para main` — somente após confirmação explícita
Objetivo:
- mesclar PR #21;
- não deletar lab;
- testar produção no iPhone;
- se quebrar, rollback para `5047bae031f20ddd9604953dcd3fd821655e56fa`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. Foi criado o PR draft #21 de `rewrite-fluency-clean` para `main`. A Vercel foi conferida por print: Root Directory está `./`, mas Build Command usa `cd fluency-clean && ...` e Output Directory é `fluency-clean/dist`, então a configuração é segura para publicar o app novo. Antes do merge, confirmar o domínio final/main e autorizar no Firebase. Não delete `rewrite-fluency-clean-lab`, não toque em `bundle.js`, não use DOM injection ou bundle patch. Rollback da main, se necessário: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
