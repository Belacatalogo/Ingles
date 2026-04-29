# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual para teste

### Bloco 8-LAB-8C — Ícone PWA PNG para iOS IMPLEMENTADO, aguardando teste

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

Teste recomendado no iPhone:
1. esperar o deploy da branch lab ficar Ready;
2. abrir o link da branch lab no Safari;
3. remover o ícone antigo da Tela de Início, se já tinha sido adicionado antes;
4. tocar em **Compartilhar > Adicionar à Tela de Início**;
5. confirmar se o ícone aparece corretamente como PNG;
6. abrir pelo ícone criado;
7. confirmar modo tela cheia/standalone;
8. testar login, Hoje, Aula, Diagnóstico e PWA básico.

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

## Próximo bloco provável

### `Bloco 8-LAB-9 — Preparação para promoção controlada`
Objetivo:
- revisar build/preview final;
- preparar plano de promoção para branch estável;
- não mexer em main automaticamente;
- listar exatamente o que será promovido, riscos e rollback;
- só promover se o usuário pedir explicitamente.

### `Bloco 8-LAB-10 — Promoção para branch estável` — somente com confirmação explícita
Objetivo:
- promover a versão aprovada da lab para `rewrite-fluency-clean` ou outra branch estável definida pelo usuário;
- não tocar em `main` sem pedido explícito;
- testar novamente o preview estável.

### `Bloco 8-LAB-11 — Promoção para main` — somente com confirmação explícita
Objetivo:
- levar o sistema aprovado para produção/main;
- fazer plano de rollback;
- validar domínio final, login Google/Firebase e PWA no domínio definitivo.

Se o `Bloco 8-LAB-8C` tiver problema:
- não avançar;
- corrigir cirurgicamente apenas a falha encontrada na branch lab;
- manter o escopo limitado a PWA/manifest/metadados/ícone.

## Como continuar em outro chat

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. O `Bloco 8-LAB-8C` adicionou `apple-touch-icon.png` 180x180 e atualizou manifest/metadados iOS. O próximo bloco provável é `BLOCO-8-LAB-9 — Preparação para promoção controlada`, sem tocar em `main` e sem promover nada sem confirmação explícita. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não mexa em `bundle.js`, não use DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`, `fluency-clean/public/` ou configuração real quando necessário."
