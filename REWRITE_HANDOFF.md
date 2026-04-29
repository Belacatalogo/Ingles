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

## Blocos concluídos

### Bloco 0 — Fundação segura
- Branch separada criada.
- Pasta `fluency-clean/` criada.
- Vite + React configurados.
- `index.html`, `main.jsx`, `App.jsx` e CSS base criados.
- Sem tocar no root atual.

### Bloco 1 — Estrutura visual
- Shell do app refinado com topbar, hero e status strip.
- Navegação inferior criada.
- Componentes reutilizáveis criados: `Card`, `StatCard`, `SectionHeader`, `BottomNav`, `DiagnosticPanel`.
- Telas principais estruturadas visualmente: Hoje, Aula, Progresso, Speaking, Flashcards e Ajustes.
- Reading continua usando renderização condicional por tipo, sem sobreposição com aula antiga.
- CSS expandido para dashboard, cards, progresso, speaking, flashcards, ajustes e responsividade mobile.

### Bloco 2 — Aula Reading nova
- `ReadingLesson` transformado em layout completo.
- Aula dividida em introdução, objetivo, etapas de estudo, texto principal, escuta guiada, vocabulário, compreensão e resposta guiada.
- Campo de resposta usa `textarea` com `inputMode`, `autoCapitalize`, `autoCorrect` e `spellCheck` para iOS.
- Botões de salvar rascunho e concluir Reading posicionados no componente real.
- Novo componente `ProgressPill` criado.
- CSS específico criado para Reading v2, vocabulário, questões, opções e resposta.

### Bloco 3 — Serviços limpos
- `storage.js` criado para centralizar `localStorage` com prefixo `fluency.clean.`.
- `diagnostics.js` criado para logs e fases do sistema.
- `lessonTypes.js` criado para normalizar tipos de aula.
- `geminiLessons.js` criado como fachada de geração.
- `azurePronunciation.js` criado como cliente/fachada do backend Azure privado.
- `services/index.js` criado para exportação centralizada.

### Bloco 4 — Firebase / Google
- `.env.example` criado com variáveis `VITE_FIREBASE_*` e endpoint opcional do Azure.
- `firebase.js` criado para inicializar Firebase via env.
- `auth.js` criado com subscribeAuth, login Google e logout.
- `accessCode.js` criado como fachada do fluxo de acesso local.
- `AccessGate.jsx` criado.
- `App.jsx` usa `AccessGate`, com modo visual.

### Bloco 5 — Geração de aulas
- `lessonKeys.js` criado para chaves exclusivas de aulas.
- Até 3 keys Flash/free exclusivas.
- 1 key Pro paga como último fallback.
- `geminiLessons.js` monta plano real: Flash primeiro, Pro no final.
- `LessonKeysPanel.jsx` anexado à aba Progresso.

### Bloco 5.1 — Conectar geração de aula na interface
- `lessonStore.js` criado para aula atual, histórico e prompt.
- `useDiagnostics.js` criado.
- `LessonGeneratorPanel.jsx` criado.
- `TodayScreen.jsx` recebeu geração de aula.
- `LessonScreen.jsx` renderiza aula salva antes da demo.
- `DiagnosticPanel.jsx` mostra logs reais.

### Bloco 5.2 — Build/preview controlado
- `vite.config.js` criado.
- Workflow `fluency-clean-preview.yml` criado para build.
- `package.json` recebeu script `check`.

### Bloco 5.3 — Preview por link sem merge
- Workflow `fluency-clean-publish-preview.yml` criado.
- Build é copiado para `preview-clean/` na branch `rewrite-fluency-clean`.
- Não mexe na `main` nem na branch Pages atual.

### Bloco 6 — Áudio / Pronúncia / iOS — concluído estruturalmente
- `audioUnlock.js` criado para liberar áudio em iOS por gesto do usuário.
- `tts.js` criado usando Web Speech API, com voz em inglês quando disponível.
- `recorder.js` criado com MediaRecorder/getUserMedia.
- `azurePronunciation.js` agora envia `FormData` para `VITE_AZURE_PRONUNCIATION_ENDPOINT` sem alterar backend privado.
- `SpeakingScreen.jsx` agora tem: liberar áudio iOS, ouvir frase, parar áudio, gravar, parar/analisar, exibir score.
- `services/index.js` exporta serviços de áudio.
- CSS recebeu `.audio-actions` e ajustes mobile.

## Próximo passo recomendado

### Verificar preview atualizado
- Esperar o workflow publicar `preview-clean` novamente.
- Abrir o mesmo link do preview.
- Testar apenas: abrir Speaking, liberar áudio iOS, ouvir frase, iniciar/parar gravação.
- Azure pode mostrar erro de endpoint se `VITE_AZURE_PRONUNCIATION_ENDPOINT` não estiver configurado; isso é esperado até configurar o deploy.

## Blocos restantes

### Bloco 6.1 — Configuração de endpoint Azure para preview
- Descobrir/confirmar endpoint atual do backend privado.
- Definir `VITE_AZURE_PRONUNCIATION_ENDPOINT` no ambiente de build/preview, sem mexer no backend.
- Testar análise real.

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
