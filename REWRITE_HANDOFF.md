# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — DRAFT

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main` diretamente.
Não fazer merge do PR #21 antes de confirmar Root Directory da Vercel.
Não deletar `rewrite-fluency-clean-lab` após merge.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual para teste

### Bloco 8-LAB-11A — Preparação segura para main criada como PR draft

Contexto:
- usuário perguntou se, ao levar para `main`, os arquivos do sistema antigo poderiam se misturar com o sistema novo;
- a resposta técnica é sim: se a Vercel usar a raiz do repositório, pode carregar o `index.html` antigo e o `bundle.js` antigo;
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
- tecnicamente é possível promover, mas só depois de validar a configuração da Vercel;
- o sistema novo está em `fluency-clean/`;
- o sistema antigo ainda existe na raiz da `main`.

Condição obrigatória antes de qualquer merge para main:
- confirmar na Vercel que o projeto de produção usa:
  - Root Directory: `fluency-clean`

Se o Root Directory não estiver como `fluency-clean`:
- não fazer merge;
- ajustar a configuração real da Vercel primeiro;
- evitar que produção carregue `index.html` antigo ou `bundle.js` antigo da raiz.

Checklist do PR #21 antes de sair de draft/mesclar:
1. confirmar Root Directory da Vercel como `fluency-clean`;
2. confirmar domínio de produção autorizado no Firebase Authentication;
3. testar branch `rewrite-fluency-clean` no iPhone;
4. confirmar login Google funcionando;
5. confirmar Hoje funcionando;
6. confirmar Aula funcionando;
7. confirmar áudio natural funcionando;
8. confirmar Progresso funcionando;
9. confirmar Diagnóstico funcionando;
10. confirmar PWA funcionando;
11. manter rollback anotado.

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

Checklist validado pelo usuário:
- Firebase runtime/configuração OK;
- Auth domain OK;
- login Google funcionou no link estável da Vercel;
- domínio Vercel autorizado no Firebase.

### Bloco 8-LAB-10C — Correção cirúrgica do login Google no iPhone IMPLEMENTADO

Contexto:
- usuário informou que, ao tocar em “Entrar com Google” no iPhone/Safari, a tela piscava/minimizava e nada acontecia;
- Firebase runtime estava configurado e Auth state aparecia verificado;
- comportamento era compatível com popup bloqueado/falhando no Safari/iOS e/ou domínio não autorizado no Firebase.

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

### Bloco 8-LAB-10 — Promoção para branch estável CONCLUÍDO

Objetivo:
- promover a versão aprovada da lab para `rewrite-fluency-clean`;
- manter `rewrite-fluency-clean-lab` viva;
- não tocar em `main`;
- testar novamente a branch estável no iPhone após o deploy ficar Ready.

Rollback anotado antes da promoção:
- commit estável anterior de `rewrite-fluency-clean`: `a2e6ba07c41f3068d19162af974f4e933622453e`;
- se a branch estável quebrar, voltar `rewrite-fluency-clean` para esse commit;
- não mexer em `main`;
- corrigir problemas cirurgicamente na lab antes de nova promoção.

Resultado:
- `rewrite-fluency-clean` foi fast-forward para o commit da lab no LAB-10;
- `rewrite-fluency-clean-lab` foi mantida viva;
- `main` permaneceu intocada.

## Próximo bloco possível

### `Bloco 8-LAB-11B — Confirmar Vercel Root Directory e domínio de produção`
Objetivo:
- usuário confirmar visualmente na Vercel se Root Directory está `fluency-clean`;
- autorizar o domínio final/main no Firebase;
- só então transformar PR #21 de draft para pronto ou fazer merge controlado.

### `Bloco 8-LAB-11C — Merge controlado para main` — somente após confirmação explícita
Objetivo:
- mesclar PR #21;
- não deletar lab;
- testar produção no iPhone;
- se quebrar, rollback para `5047bae031f20ddd9604953dcd3fd821655e56fa`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. Foi criado o PR draft #21 de `rewrite-fluency-clean` para `main` para promoção controlada. Não fazer merge antes de confirmar na Vercel que Root Directory é `fluency-clean` e que o domínio de produção está autorizado no Firebase. Não delete `rewrite-fluency-clean-lab`, não toque em `bundle.js`, não use DOM injection ou bundle patch. Rollback da main, se necessário: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
