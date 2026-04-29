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

### Bloco 8-LAB-10 — Promoção para branch estável EM EXECUÇÃO/REGISTRADA

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

Procedimento seguro definido:
1. atualizar este handoff na lab registrando o LAB-10;
2. fazer fast-forward de `rewrite-fluency-clean` para o commit atual da `rewrite-fluency-clean-lab`;
3. não deletar `rewrite-fluency-clean-lab`;
4. aguardar deploy/preview da branch estável ficar Ready;
5. testar a branch estável pelo iPhone;
6. só considerar `main` em bloco posterior e com confirmação explícita.

Status desta seção:
- handoff preparado para acompanhar a promoção;
- próximo passo técnico: fast-forward da branch `rewrite-fluency-clean` para o commit atual da lab.

### Bloco 8-LAB-9 — Preparação para promoção controlada IMPLEMENTADO

Objetivo:
- revisar o estado da lab antes de qualquer promoção;
- preparar uma promoção controlada para `rewrite-fluency-clean` sem tocar em `main`;
- listar escopo, riscos, checklist e rollback;
- deixar claro que a promoção só acontece com confirmação explícita do usuário.

Resultado da revisão:
- comparação feita: `rewrite-fluency-clean` → `rewrite-fluency-clean-lab`;
- estado: lab está à frente da estável e não está atrás;
- não há divergência nova na branch estável que precise ser preservada antes da promoção;
- a promoção futura pode ser feita de forma controlada da lab para `rewrite-fluency-clean`;
- `main` permanece intocada;
- `bundle.js` permanece intocado;
- backend Azure privado permanece intocado.

Escopo que será promovido para `rewrite-fluency-clean`:
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

Arquivos/famílias relevantes no delta lab → estável:
- `fluency-clean/src/` com componentes, telas, serviços e estilos modularizados;
- `fluency-clean/public/manifest.webmanifest`;
- `fluency-clean/public/pwa-icon.svg`;
- `fluency-clean/public/apple-touch-icon.png`;
- `fluency-clean/public/sw.js`;
- `fluency-clean/index.html`;
- `fluency-clean/vercel.json`;
- `REWRITE_HANDOFF.md`.

Riscos controlados antes/depois da promoção:
- Vercel pode gerar outro preview para a branch estável após merge;
- o preview da lab deve continuar existindo enquanto a branch `rewrite-fluency-clean-lab` não for deletada;
- PWA no iOS pode manter cache antigo, então em teste pode ser necessário remover o ícone antigo e adicionar novamente;
- service worker pode manter cache temporário, então validar em Safari após deploy Ready;
- login Google/Firebase precisa ser testado no domínio/preview da branch promovida porque domínios autorizados podem variar;
- nenhum dado real deve ser apagado, pois sync usa Firestore/localStorage, mas login/progresso deve ser conferido após o merge.

Checklist obrigatório pós-promoção:
1. aguardar preview/deploy da `rewrite-fluency-clean` ficar Ready no Vercel;
2. abrir no iPhone pelo Safari;
3. testar login Google/código de acesso;
4. testar Hoje;
5. gerar/abrir Aula;
6. testar áudio natural;
7. testar Progresso;
8. testar Diagnóstico;
9. instalar como PWA e abrir em modo app web;
10. confirmar que o ícone PNG aparece corretamente;
11. confirmar que nada importante foi quebrado.

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

O que foi implementado:
- criado `apple-touch-icon.png` em 180x180 dentro de `fluency-clean/public/`;
- `manifest.webmanifest` agora lista primeiro o PNG 180x180 e mantém o SVG como ícone adicional/maskable;
- `index.html` agora usa `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`;
- SVG permanece como favicon (`/pwa-icon.svg`), sem remover o acabamento anterior;
- nenhuma tela foi refeita;
- nenhuma alteração em `bundle.js`;
- nenhuma alteração em `main`, `rewrite-fluency-clean` ou backend Azure.

Resultado do teste visual:
- usuário enviou imagem do iPhone mostrando o fluxo “Adicionar à Tela de Início”;
- nome `Fluency` apareceu correto;
- ícone apareceu corretamente;
- opção “Abrir como app web” apareceu ativada.

### Bloco 8-LAB-8B — PWA instalável no iOS IMPLEMENTADO

Objetivo:
- permitir que o usuário adicione o Fluency à Tela de Início do iPhone pelo Safari;
- deixar o app com modo standalone, tema escuro e service worker básico;
- preparar o uso como “app instalado” sem passar pela App Store.

Arquivos alterados/criados:
- `fluency-clean/public/manifest.webmanifest`
- `fluency-clean/public/pwa-icon.svg`
- `fluency-clean/public/sw.js`
- `fluency-clean/src/services/pwa.js`
- `fluency-clean/src/main.jsx`
- `fluency-clean/index.html`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- manifest PWA com `display: standalone`, nome Fluency, tema e escopo `/`;
- ícone SVG do app em `public/pwa-icon.svg`;
- service worker básico em `public/sw.js`;
- registro do service worker no bootstrap do React;
- metadados iOS no `index.html`:
  - `apple-mobile-web-app-capable`;
  - `apple-mobile-web-app-title`;
  - `apple-mobile-web-app-status-bar-style`;
  - `mobile-web-app-capable`;
  - `manifest`;
  - `theme-color`;
  - `viewport-fit=cover`.

Observação:
- PWA em iOS é instalado pelo Safari usando **Compartilhar > Adicionar à Tela de Início**;
- não aparece botão automático de instalação como no Android/Chrome;
- o Bloco 8-LAB-8C adicionou o PNG específico para iOS.

### Bloco 8-LAB-8 — Checklist funcional final antes da main APROVADO
- usuário confirmou que tudo está funcionando;
- checklist funcional no diagnóstico aprovado.

## Blocos recentes

### Bloco 8-LAB-7B — Blindagem contra dados nulos do sync FUNCIONOU
- corrigiu erro `null is not an object (evaluating 'e.xp')`;
- usuário confirmou que deu certo.

### Bloco 8-LAB-7 — Persistência real por conta e sincronização Firebase
- Google + Firebase/Firestore;
- dados por `fluencyUsers/{uid}`;
- localStorage como fallback.

### Bloco 8-LAB-6 — Travas de domínio real e revisão adaptativa de sábado
- domínio por pilar;
- revisão adaptativa aos sábados;
- revisão cobre Grammar, Writing, Reading e Listening.

### Bloco 8-LAB-5B — Cronograma completo sem brechas para todos os níveis
- currículo aprofundado em todos os níveis;
- travas de conclusão muito mais rígidas;
- `mastery-lock` antes de liberar próximo nível.

### Bloco 8-LAB-4B — Áudio natural Gemini primeiro FUNCIONOU
- usuário confirmou que o áudio natural Gemini funcionou;
- fallback do navegador ficou apenas como último recurso.

## Próximo bloco possível

### `Bloco 8-LAB-10B — Validação pós-promoção da branch estável`
Objetivo:
- testar o preview/deploy da `rewrite-fluency-clean` no iPhone;
- confirmar login, Hoje, Aula, áudio, Progresso, Diagnóstico e PWA;
- corrigir cirurgicamente na lab se aparecer problema;
- só considerar main após aprovação explícita.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O `Bloco 8-LAB-10` promoveu ou está promovendo a lab para `rewrite-fluency-clean`; não delete `rewrite-fluency-clean-lab`, não toque em `main`, não mexa em `bundle.js`, não use DOM injection ou bundle patch. Rollback da estável, se necessário: `a2e6ba07c41f3068d19162af974f4e933622453e`. Próximo passo provável: validar o preview/deploy da `rewrite-fluency-clean` no iPhone antes de pensar em main."
