# Fluency Clean Rewrite — Handoff MAIN

## Estado de produção

### Promoção controlada para main — sincronização cirúrgica

A `main` foi promovida a partir da branch secundária/estável `rewrite-fluency-clean` por sincronização cirúrgica arquivo por arquivo.

Motivo:
- o PR #23 mostrou `mergeable: false`;
- `main` e `rewrite-fluency-clean` estavam divergidas no histórico;
- forçar a branch `main` foi bloqueado pelo GitHub, o que evitou uma alteração destrutiva;
- por segurança, a promoção foi feita copiando para `main` apenas os arquivos reais usados pelo app reconstruído em `fluency-clean/`, sem tocar em `bundle.js` e sem mexer no backend Azure privado.

Backup criado antes da tentativa de mover a main:
- `backup-main-before-fluency-clean-2026-04-30`

Arquivos promovidos para `main`:
- `fluency-clean/package.json`
- `fluency-clean/src/services/firebase.js`
- `fluency-clean/src/services/auth.js`
- `fluency-clean/src/services/azurePronunciation.js`
- `fluency-clean/src/components/system/ErrorBoundary.jsx`
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`

O que foi promovido:
- SDK Azure empacotado no `package.json`;
- Firebase Auth reforçado para iOS/Safari;
- login Google com persistência em cadeia;
- Azure Pronunciation com SDK empacotado e texto reconhecido real;
- ErrorBoundary com botão `Corrigir progresso` para Safari com progresso local corrompido;
- Speaking com dados reais da análise Azure e botão `Próxima` corrigido;
- Hoje sem dados fictícios;
- Progresso sem estimativas falsas e com blindagem contra dados antigos/nulos;
- Cartas sem cards/baralhos fictícios;
- Ajustes sem status fixos falsos.

Commit atual da main após promoção das telas:
- `9648419212edd6cf3dd47a23f25107122c5c7356` — `Promove Ajustes sem dados fictícios para main`.

Status Vercel no momento do registro:
- Vercel iniciou deployment da `main` para o commit `9648419`;
- status inicial: `pending`;
- ainda precisa aguardar Ready/success e testar no iPhone.

## Regra para próximos trabalhos

Mesmo após a promoção para `main`, continuar usando o fluxo seguro:

1. corrigir primeiro na `rewrite-fluency-clean-lab`;
2. testar a lab;
3. sincronizar com cuidado para `rewrite-fluency-clean`;
4. testar a branch secundária;
5. só depois promover para `main`.

Atenção especial:
- futuras sincronizações da lab para a secundária ou main NÃO devem sobrescrever sem comparar estes arquivos:
  - `fluency-clean/src/services/firebase.js`
  - `fluency-clean/src/services/auth.js`
  - `fluency-clean/src/components/auth/AccessGate.jsx`
  - `fluency-clean/src/components/system/ErrorBoundary.jsx`
  - `fluency-clean/src/screens/ProgressScreen.jsx`

Motivo:
- esses arquivos receberam correções específicas de login iOS/Firebase e recuperação de progresso corrompido no Safari.

## Regras obrigatórias

- não mexer em `bundle.js`;
- não usar DOM injection;
- não criar bundle patch;
- não mexer no backend Azure privado;
- manter `rewrite-fluency-clean-lab` viva;
- manter `rewrite-fluency-clean` viva até validar produção.

Rollback da main, se necessário:
- `5047bae031f20ddd9604953dcd3fd821655e56fa`

Branch backup da main anterior:
- `backup-main-before-fluency-clean-2026-04-30`

## Como testar após deploy Ready

1. abrir o deployment da branch `main` / ambiente `Production`;
2. confirmar que o commit é `9648419` ou posterior;
3. abrir o link no iPhone;
4. autorizar o domínio de produção no Firebase, se ainda não estiver autorizado;
5. testar login Google;
6. testar Hoje;
7. testar Aula;
8. testar áudio natural;
9. testar Speaking > Pronúncia > Próxima;
10. testar Speaking > gravar/analisar;
11. testar Cartas;
12. testar Progresso;
13. testar Ajustes;
14. testar Diagnóstico;
15. testar PWA.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A `main` recebeu uma promoção cirúrgica da `rewrite-fluency-clean` arquivo por arquivo porque o PR #23 não era mergeável. O commit principal após a promoção das telas é `9648419212edd6cf3dd47a23f25107122c5c7356`. A Vercel iniciou deploy da main nesse commit e precisa ser validada no iPhone. Não sobrescrever `firebase.js`, `auth.js`, `AccessGate.jsx`, `ErrorBoundary.jsx` ou `ProgressScreen.jsx` sem comparar. Não mexer em `bundle.js` nem backend Azure privado."