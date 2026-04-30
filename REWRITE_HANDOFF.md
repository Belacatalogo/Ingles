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

## Correção importante feita DIRETO na branch secundária

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

## Aviso crítico para próximos merges lab → secundária

NÃO sobrescrever estes arquivos da `rewrite-fluency-clean` com versões antigas da lab sem antes comparar:

- `fluency-clean/src/services/firebase.js`
- `fluency-clean/src/services/auth.js`
- `fluency-clean/src/components/auth/AccessGate.jsx`

Motivo:

- a branch secundária recebeu uma correção própria de login Google/Firebase/iOS;
- se futuramente for feito merge bruto da lab para a secundária, essa correção pode ser perdida;
- futuras sincronizações devem preservar a versão corrigida desses arquivos ou portar a correção para a lab antes.

Ordem segura para próximos passos:

1. Aguardar deploy da `rewrite-fluency-clean` com commit `f0f4b40` ficar Ready/success.
2. Testar login Google no iPhone pelo link secundário.
3. Se o login funcionar, considerar essa correção aprovada.
4. Portar a correção de `firebase.js` e `auth.js` para `rewrite-fluency-clean-lab`, ou manter aviso de preservação antes de qualquer novo merge lab → secundária.
5. Testar novamente Speaking, Hoje, Cartas, Progresso e Ajustes no link secundário.
6. Só depois pensar em `main`.

## Main / produção

PR #21 foi mesclado em `main` no GitHub, mas a produção/main ainda precisa ser validada no Vercel.

Não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Rollback da main, se necessário:

`5047bae031f20ddd9604953dcd3fd821655e56fa`

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch secundária `rewrite-fluency-clean` recebeu uma correção própria de login Google/Firebase/iOS nos arquivos `fluency-clean/src/services/firebase.js` e `fluency-clean/src/services/auth.js`, commits `3860f70` e `f0f4b40`. Em futuros merges da lab para a secundária, NÃO sobrescrever esses arquivos sem comparar, porque a correção de persistência do login pode ser perdida. Primeiro validar o login no link secundário, depois portar a correção para a lab ou preservar estes arquivos. Não mexer em `main`, `bundle.js` ou backend Azure privado sem validação."