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

## Blocos

### Bloco 0 — Fundação segura — concluído
- Branch separada criada.
- Pasta `fluency-clean/` criada.
- Vite + React configurados.
- `index.html`, `main.jsx`, `App.jsx` e CSS base criados.
- Sem tocar no root atual.

### Bloco 1 — Estrutura visual — concluído
- Shell do app refinado com topbar, hero e status strip.
- Navegação inferior criada.
- Componentes reutilizáveis criados: `Card`, `StatCard`, `SectionHeader`, `BottomNav`, `DiagnosticPanel`.
- Telas principais estruturadas visualmente: Hoje, Aula, Progresso, Speaking, Flashcards e Ajustes.
- Reading continua usando renderização condicional por tipo, sem sobreposição com aula antiga.
- CSS expandido para dashboard, cards, progresso, speaking, flashcards, ajustes e responsividade mobile.

### Bloco 2 — Aula Reading nova — próximo
- Transformar `ReadingLesson` em layout completo de aula real.
- Separar blocos: introdução, texto, vocabulário, compreensão, resposta guiada, revisão e concluir aula.
- Garantir foco correto em textarea/input no iOS para chamar teclado.
- Não sobrepor aula antiga; usar apenas renderização condicional.

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
