# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não deletar `rewrite-fluency-clean-lab` após merge.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual para teste

### Bloco 8-LAB-10C — Correção cirúrgica do login Google no iPhone IMPLEMENTADO, aguardando teste

Contexto:
- usuário informou que, ao tocar em “Entrar com Google” no iPhone/Safari, a tela piscava e nada acontecia;
- Firebase runtime estava configurado e Auth state aparecia verificado;
- comportamento é compatível com popup bloqueado/falhando no Safari/iOS.

Arquivos alterados:
- `fluency-clean/src/services/auth.js`
- `fluency-clean/src/components/auth/AccessGate.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- botão principal “Entrar com Google” agora usa `redirect` em vez de `popup`;
- botão secundário virou “Tentar Google por popup” apenas como alternativa;
- no fluxo popup, removido `await prepareAuthPersistence(...)` antes de `signInWithPopup`, para não perder o gesto do toque no Safari;
- mensagens de erro de popup foram ajustadas para orientar uso do redirecionamento no iPhone;
- nenhuma tela foi refeita;
- nenhuma alteração em `main`;
- nenhuma alteração em `bundle.js`;
- nenhuma alteração no backend Azure.

Teste recomendado:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` ficar Ready;
2. abrir no Safari do iPhone;
3. confirmar Firebase configurado/runtime;
4. tocar em “Entrar com Google”;
5. deve sair para o fluxo Google por redirecionamento;
6. ao voltar, o app deve liberar o acesso e sincronizar usuário;
7. se ainda falhar, verificar se o domínio exato do preview Vercel está autorizado em Firebase Authentication > Settings > Authorized domains.

Observação importante:
- depois de aprovado na lab, sincronizar a correção para `rewrite-fluency-clean`;
- não tocar na `main` ainda.

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

### Bloco 8-LAB-9 — Preparação para promoção controlada IMPLEMENTADO

Objetivo:
- revisar o estado da lab antes de qualquer promoção;
- preparar uma promoção controlada para `rewrite-fluency-clean` sem tocar em `main`;
- listar escopo, riscos, checklist e rollback;
- deixar claro que a promoção só acontece com confirmação explícita do usuário.

Resultado da revisão:
- comparação feita: `rewrite-fluency-clean` → `rewrite-fluency-clean-lab`;
- estado: lab estava à frente da estável e não estava atrás;
- não havia divergência nova na branch estável que precisasse ser preservada antes da promoção;
- `main` permaneceu intocada;
- `bundle.js` permaneceu intocado;
- backend Azure privado permaneceu intocado.

Escopo promovido para `rewrite-fluency-clean` no LAB-10:
- nova UI principal aprovada;
- áudio natural Gemini com fallback;
- cronograma profundo A1 → C2;
- travas pedagógicas e domínio por pilar;
- revisão adaptativa de sábado;
- sync Google + Firebase/Firestore;
- checklist funcional LAB-8;
- PWA iOS com manifest, service worker e metadados;
- ícone PWA PNG 180x180 para iOS;
- arquivos modulares em `fluency-clean/src/`, `fluency-clean/public/` e configurações reais.

### Bloco 8-LAB-8C — Ícone PWA PNG para iOS IMPLEMENTADO/APROVADO VISUALMENTE

Objetivo:
- garantir ícone próprio para iOS ao adicionar o Fluency à Tela de Início;
- evitar dependência do SVG como `apple-touch-icon`;
- manter o PWA instalável sem alterar a UI, backend, bundle ou fluxos principais.

Arquivos alterados/criados:
- `fluency-clean/public/apple-touch-icon.png`
- `fluency-clean/public/manifest.webmanifest`
- `fluency-clean/index.html`
- `REWRITE_HANDOFF.md`

Resultado do teste visual:
- usuário enviou imagem do iPhone mostrando o fluxo “Adicionar à Tela de Início”;
- nome `Fluency` apareceu correto;
- ícone apareceu corretamente;
- opção “Abrir como app web” apareceu ativada.

## Próximo bloco possível

### `Bloco 8-LAB-10D — Sincronizar correção do login para branch estável`
Somente depois de validar na lab:
- fast-forward `rewrite-fluency-clean` para o commit da lab com a correção de login;
- não deletar lab;
- não tocar em main;
- testar preview/deploy estável novamente no iPhone.

### `Bloco 8-LAB-11 — Promoção para main` — somente com confirmação explícita posterior
Objetivo:
- levar o sistema aprovado para produção/main;
- fazer plano de rollback;
- validar domínio final, login Google/Firebase e PWA no domínio definitivo.

Se houver qualquer problema após promoção:
- não tocar em `main`;
- reverter `rewrite-fluency-clean` para `a2e6ba07c41f3068d19162af974f4e933622453e` se necessário;
- corrigir cirurgicamente apenas a falha encontrada na branch lab;
- manter escopo limitado ao problema encontrado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O `Bloco 8-LAB-10C` corrigiu o login Google no iPhone usando redirecionamento como fluxo principal e popup só como alternativa. Teste primeiro na branch `rewrite-fluency-clean-lab`; se aprovado, sincronizar para `rewrite-fluency-clean`. Não delete `rewrite-fluency-clean-lab`, não toque em `main`, não mexa em `bundle.js`, não use DOM injection ou bundle patch. Rollback da estável, se necessário: `a2e6ba07c41f3068d19162af974f4e933622453e`."
