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

### Bloco 2 — Aula Reading nova — concluído visualmente
- `ReadingLesson` transformado em layout completo.
- Aula dividida em introdução, objetivo, etapas de estudo, texto principal, escuta guiada, vocabulário, compreensão e resposta guiada.
- Campo de resposta usa `textarea` com `inputMode`, `autoCapitalize`, `autoCorrect` e `spellCheck` para iOS.
- Botões de salvar rascunho e concluir Reading posicionados no componente real.
- Novo componente `ProgressPill` criado.
- CSS específico criado para Reading v2, vocabulário, questões, opções, resposta e responsividade.
- Ainda não há integração real com storage, IA, áudio ou conclusão de aula. Isso vem nos próximos blocos.

### Bloco 3 — Serviços limpos — concluído
- `storage.js` criado para centralizar `localStorage` com prefixo `fluency.clean.`.
- `diagnostics.js` criado para logs e fases do sistema sem espalhar console/localStorage pelo app.
- `lessonTypes.js` criado para normalizar tipos de aula: reading, grammar, listening, speaking, writing, vocabulary e default.
- `geminiLessons.js` criado como fachada futura para geração de aulas, validação/máscara de keys e normalização de chaves. A chamada real ainda não foi ligada.
- `azurePronunciation.js` criado como cliente/fachada para preservar o backend Azure privado existente. A chamada real ainda não foi ligada.
- `services/index.js` criado para exportação centralizada.

### Bloco 4 — Firebase / Google — próximo
- Criar `firebase.js`.
- Criar `auth.js` / camada de login.
- Migrar configuração Firebase sem expor segredo novo.
- Manter fluxo atual de acesso/código até entendermos exatamente como ele está no app antigo.

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
