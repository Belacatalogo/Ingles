# Fluency Clean Rewrite — Handoff MAIN

## Estado de produção

### Deploy trigger manual — main

Este arquivo foi atualizado diretamente na `main` para disparar um novo deployment da Vercel após a correção do `npm install`.

Motivo:
- a Vercel ainda estava mostrando o deployment antigo da `main` no commit `5047bae`;
- esse commit antigo não continha o `fluency-clean` final;
- a correção real do install já foi aplicada no commit `576cc3818e80f42dfbc91c49493406911e03941c`;
- este commit documental serve apenas para forçar a Vercel a enxergar um novo push na `main`.

Regras:
- não mexer em `bundle.js`;
- não usar DOM injection;
- não criar bundle patch;
- não mexer no backend Azure privado;
- manter `rewrite-fluency-clean-lab` viva;
- manter `rewrite-fluency-clean` viva até validar produção.

Rollback da main, se necessário:
- `5047bae031f20ddd9604953dcd3fd821655e56fa`

## Como testar após deploy Ready

1. abrir o deployment da branch `main` / ambiente `Production`;
2. confirmar que o commit é posterior a `576cc381`;
3. abrir o link no iPhone;
4. autorizar o domínio no Firebase, se ainda não estiver autorizado;
5. testar login Google;
6. testar Hoje;
7. testar Aula;
8. testar áudio natural;
9. testar Progresso;
10. testar Diagnóstico;
11. testar PWA.
