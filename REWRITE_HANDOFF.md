# Fluency Clean Rewrite — Handoff

Branch: `rewrite-fluency-clean`

## Objetivo
Reconstruir o app Fluency em uma arquitetura React modular, sem continuar empilhando patches dentro do `bundle.js` e sem transformar o `index.html` em um arquivo gigante.

## Regra principal
Não mexer na `main` durante a reconstrução. Tudo deve acontecer nesta branch até o usuário aprovar.

## Estado atual analisado
- O app atual em `main` depende de `index.html` + `bundle.js`.
- O `bundle.js` contém muitos patches acumulados, interceptações de `fetch`, painéis injetados, `MutationObserver`, `setInterval`, aliases de `localStorage` e manipulação direta do DOM.
- O `index.html` também contém lógica demais: PWA/cache, unlock de áudio iOS, diagnóstico, service worker, montagem do app e scripts extras.
- O backend Azure privado deve permanecer intocado. O novo frontend deve apenas preservar o contrato da API já usada hoje.

## Estratégia
1. Criar um novo app React modular dentro de `fluency-clean/`.
2. Migrar função por função do app antigo.
3. Manter o app antigo funcionando até o novo estar testável.
4. Substituir a renderização antiga apenas quando o novo app estiver estável.

## Blocos planejados

### Bloco 0 — Fundação segura
- Branch separada.
- Pasta `fluency-clean/`.
- Vite + React.
- Design base inspirado no HTML enviado pelo usuário.
- Sem tocar no root atual.

### Bloco 1 — Estrutura visual
- Shell do app.
- Navegação inferior.
- Cards, botões, painéis.
- Telas placeholder: Hoje, Aula, Progresso, Speaking, Flashcards, Configurações.

### Bloco 2 — Aula Reading nova
- Criar `ReadingLesson` limpo.
- Não sobrepor aula antiga.
- Renderização condicional por tipo de aula.

### Bloco 3 — Serviços limpos
- `storage.js`.
- `diagnostics.js`.
- `geminiLessons.js`.
- `azurePronunciation.js` apenas como cliente do backend existente.

### Bloco 4 — Firebase / Google
- Migrar inicialização Firebase.
- Migrar login/acesso sem alterar regras do backend.

### Bloco 5 — Geração de aulas
- Chaves exclusivas de aulas.
- Multikeys.
- Flash primeiro.
- Pro apenas como fallback.
- Diagnóstico real em tela.

### Bloco 6 — Áudio / Pronúncia / iOS
- TTS.
- Unlock iOS.
- Azure Pronunciation via backend privado.
- Diagnóstico de áudio.

### Bloco 7 — Migração final
- Testes manuais por aba.
- Build.
- Deploy preview.
- Só depois considerar substituir a `main`.

## Como continuar em outro chat
Diga: "continue a reconstrução do Fluency na branch `rewrite-fluency-clean`, leia o arquivo `REWRITE_HANDOFF.md` e siga do próximo bloco".

## Decisões importantes
- Não criar outro HTML gigante.
- Não continuar remendando `bundle.js`.
- Não mexer no backend Azure privado.
- Não usar UI sobreposta por DOM injection.
- Toda nova tela deve ser componente React real.
