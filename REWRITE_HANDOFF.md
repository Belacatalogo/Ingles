# Fluency Clean Rewrite — Handoff

Branch de testes/lab: `rewrite-fluency-clean-lab`

Branch secundária/estável: `rewrite-fluency-clean`

Branch de produção: `main`

## REGRA MÁXIMA

- Não deletar `rewrite-fluency-clean-lab`.
- Não deletar `rewrite-fluency-clean` por enquanto.
- Não mexer em `bundle.js`.
- Não usar DOM injection.
- Não criar bundle patch.
- Não mexer no backend Azure privado.
- Não mandar mudanças direto para `main` sem validar primeiro na lab e depois na secundária.

## Estado atual

A lab foi testada e algumas correções foram sincronizadas cirurgicamente para a branch secundária `rewrite-fluency-clean`, arquivo por arquivo, porque lab e secundária estavam divergidas.

Correções já sincronizadas para `rewrite-fluency-clean`:

- `fluency-clean/package.json` com SDK Azure empacotado;
- `fluency-clean/src/services/azurePronunciation.js` com SDK empacotado e texto reconhecido real;
- `fluency-clean/src/screens/SpeakingScreen.jsx` com dados reais e botão “Próxima” corrigido em Pronúncia;
- `fluency-clean/src/screens/TodayScreen.jsx` sem dados fictícios;
- `fluency-clean/src/screens/ProgressScreen.jsx` sem estimativas falsas;
- `fluency-clean/src/screens/FlashcardsScreen.jsx` sem cards/baralhos fictícios;
- `fluency-clean/src/screens/SettingsScreen.jsx` sem status fixos falsos.

## Correção importante feita DIRETO na branch secundária — login iOS

Após sincronizar as correções da lab para `rewrite-fluency-clean`, o usuário testou o login Google no link secundário:

`https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app`

Problema observado:

- ao clicar em “Entrar com Google”, escolher a conta e voltar para o app, a tela recarregava e continuava no login;
- ao tentar popup, o Safari minimizava/voltava e a sessão não ficava presa.

Correção aplicada diretamente em `rewrite-fluency-clean`:

- `fluency-clean/src/services/firebase.js`
- `fluency-clean/src/services/auth.js`

Commits relevantes:

- `3860f708f2ee56747b1e353e63bead030b95735d` — reforça Firebase Auth no iOS;
- `f0f4b40dfba612728af2058c6ecfc97033fbb781` — melhora persistência do login Google.

O que a correção fez:

- Firebase Auth agora tenta persistência em cadeia para iOS/Safari:
  1. `indexedDBLocalPersistence`
  2. `browserLocalPersistence`
  3. `browserSessionPersistence`
- Auth usa `initializeAuth` com `browserPopupRedirectResolver` quando possível;
- se uma persistência falhar, tenta a próxima;
- diagnóstico registra melhor erros de redirect, popup, domínio não autorizado, storage bloqueado ou rede;
- login por redirect/popup deve conseguir manter a sessão com mais estabilidade no iPhone.

## Correção importante feita DIRETO na branch secundária — Safari com progresso corrompido

Após o login/sincronização, o usuário abriu o link secundário em dois navegadores:

- Comet: o app abriu corretamente;
- Safari: apareceu tela segura de erro de renderização.

Erro mostrado no Safari:

`null is not an object (evaluating 'e.completedIds')`

Causa identificada:

- o Safari tinha dados antigos/nulos no armazenamento local;
- o app usava o storage com prefixo `fluency.clean.`;
- a recuperação inicial limpava a chave errada e por isso o botão “Corrigir progresso” recarregava mas o erro continuava.

Correções aplicadas diretamente em `rewrite-fluency-clean`:

- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/components/system/ErrorBoundary.jsx`

Commits relevantes:

- `0ee3a47633bb45547f848db481ec7cf1ae096c7d` — blinda Progresso contra dados antigos nulos;
- `2186504b2a43aa661c6a74fc908867790e2748c2` — adiciona recuperação segura de progresso corrompido;
- `3610c3409f708ddad74afe6c37d637ee3c8fc9f5` — corrige chave real da recuperação de progresso.

O que a correção fez:

- `ProgressScreen.jsx` normaliza dados antigos/nulos:
  - se `completedIds` vier `null`, vira `[]`;
  - se resumo de currículo vier nulo, cria estado seguro;
  - se histórico tiver item incompleto, usa fallback em vez de quebrar.
- `ErrorBoundary.jsx` detecta erro de `completedIds`/currículo;
- aparece botão `Corrigir progresso`;
- esse botão remove chaves locais relacionadas a:
  - `curriculum`;
  - `progress.v1`;
  - `fluency.clean.curriculum.progress.v1`.
- não apaga Firebase, login, chaves de IA ou configuração runtime.

Resultado confirmado pelo usuário:

- após a correção `3610c3409f708ddad74afe6c37d637ee3c8fc9f5`, o usuário tocou em `Corrigir progresso` e o app entrou corretamente no Safari.

## Aviso crítico para próximos merges lab → secundária

NÃO sobrescrever estes arquivos da `rewrite-fluency-clean` com versões antigas da lab sem antes comparar:

- `fluency-clean/src/services/firebase.js`
- `fluency-clean/src/services/auth.js`
- `fluency-clean/src/components/auth/AccessGate.jsx`
- `fluency-clean/src/components/system/ErrorBoundary.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`

Motivo:

- a branch secundária recebeu correções próprias de login Google/Firebase/iOS;
- a branch secundária recebeu correções próprias para Safari com progresso local corrompido;
- se futuramente for feito merge bruto da lab para a secundária, essas correções podem ser perdidas;
- futuras sincronizações devem preservar essas versões corrigidas ou portar as correções para a lab antes.

Ordem segura para próximos passos:

1. Testar login Google no iPhone pelo link secundário.
2. Testar Safari e Comet no link secundário.
3. Testar Speaking, Hoje, Cartas, Progresso e Ajustes no link secundário.
4. Se tudo estiver aprovado, portar as correções de `firebase.js`, `auth.js`, `ProgressScreen.jsx` e `ErrorBoundary.jsx` para `rewrite-fluency-clean-lab`, ou manter aviso de preservação antes de qualquer novo merge lab → secundária.
5. Só depois pensar em `main`.

## Main / produção

PR #21 foi mesclado em `main` no GitHub, mas a produção/main ainda precisa ser validada no Vercel.

Não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Rollback da main, se necessário:

`5047bae031f20ddd9604953dcd3fd821655e56fa`

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch secundária `rewrite-fluency-clean` recebeu correções próprias que NÃO podem ser sobrescritas por merge bruto da lab: login Google/Firebase/iOS em `firebase.js` e `auth.js`; recuperação de progresso corrompido no Safari em `ProgressScreen.jsx` e `ErrorBoundary.jsx`. Commits importantes: `f0f4b40` para login e `3610c34` para corrigir a chave real do progresso. O usuário confirmou que após `Corrigir progresso` o app entrou no Safari. Em futuros merges da lab para a secundária, comparar esses arquivos antes ou portar as correções para a lab. Não mexer em `main`, `bundle.js` ou backend Azure privado sem validação."