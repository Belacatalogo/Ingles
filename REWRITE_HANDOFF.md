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

### Bloco 1 — Estrutura visual
- Shell do app refinado.
- Navegação inferior criada.
- Componentes reutilizáveis criados.
- Telas principais estruturadas visualmente.

### Bloco 2 — Aula Reading nova
- `ReadingLesson` transformado em layout completo.
- Campo de resposta preparado para iOS.

### Bloco 3 — Serviços limpos
- `storage.js`, `diagnostics.js`, `lessonTypes.js`, `geminiLessons.js`, `azurePronunciation.js` e `services/index.js` criados.

### Bloco 4 — Firebase / Google
- `.env.example`, `firebase.js`, `auth.js`, `accessCode.js`, `AccessGate.jsx` criados.
- `App.jsx` usa `AccessGate`, com modo visual.

### Bloco 5 — Geração de aulas
- `lessonKeys.js` criado para chaves exclusivas de aulas.
- Até 3 keys Flash/free exclusivas.
- 1 key Pro paga como último fallback.
- `geminiLessons.js` monta plano real: Flash primeiro, Pro no final.
- `LessonKeysPanel.jsx` anexado à aba Progresso.

### Bloco 5.1 — Conectar geração de aula na interface
- `lessonStore.js`, `useDiagnostics.js`, `LessonGeneratorPanel.jsx` criados.
- `TodayScreen.jsx`, `LessonScreen.jsx` e `DiagnosticPanel.jsx` conectados.

### Bloco 5.2 — Build/preview controlado
- `vite.config.js` criado.
- Workflow `fluency-clean-preview.yml` criado para build.
- `package.json` recebeu script `check`.

### Bloco 5.3 — Preview por link sem merge
- Workflow `fluency-clean-publish-preview.yml` criado.
- Build é copiado para `preview-clean/` na branch `rewrite-fluency-clean`.
- Não mexe na `main` nem na branch Pages atual.

### Bloco 6 — Áudio / Pronúncia / iOS
- `audioUnlock.js` criado para liberar áudio em iOS.
- `tts.js` criado usando Web Speech API.
- `recorder.js` criado com MediaRecorder/getUserMedia.
- `SpeakingScreen.jsx` conectado.

### Bloco 6.1 — Contrato Azure preservado
- O app antigo usa backend privado apenas para entregar token Azure.
- `azurePronunciation.js` foi corrigido para preservar esse contrato.
- O novo app carrega o Azure Speech SDK no navegador, busca token no backend existente e analisa o áudio gravado localmente.
- Não houve alteração no backend privado.

### Bloco 6.2 — Gemini TTS natural para aulas
- `geminiTts.js` criado.
- Usa Gemini TTS com `responseModalities: ['AUDIO']`, voz prebuilt e áudio inline.
- Converte PCM base64 para WAV para tocar no navegador.
- Usa chaves exclusivas de aulas já salvas em `lessonKeys.js`.
- Faz cache local por texto/voz/estilo.
- Usa Web Speech API como fallback se Gemini TTS falhar ou não houver key.
- `ReadingLesson.jsx` agora usa Gemini TTS no botão “Ouvir texto”.
- `services/index.js` exporta `generateGeminiTtsAudio` e `playGeminiTtsAudio`.

## Próximo passo recomendado

### Verificar preview atualizado
- Esperar o workflow publicar `preview-clean` novamente.
- Abrir o mesmo link do preview.
- Adicionar key de aula na aba Progresso.
- Abrir Aula > Reading.
- Tocar em “Ouvir texto”.
- Se o Gemini TTS falhar, o app deve usar TTS do navegador e mostrar logs no diagnóstico.

## Blocos restantes

### Bloco 7 — Migração final
- Testes manuais por aba.
- Configurar Firebase/Google real no ambiente.
- Validar geração Gemini com keys reais.
- Validar Gemini TTS real.
- Validar Azure real.
- Só depois considerar substituir a `main`.

## Como continuar em outro chat
Diga: "continue a reconstrução do Fluency na branch `rewrite-fluency-clean`, leia o arquivo `REWRITE_HANDOFF.md` e siga do próximo bloco".

## Decisões importantes
- Não criar outro HTML gigante.
- Não continuar remendando `bundle.js`.
- Não mexer no backend Azure privado.
- Não usar UI sobreposta por DOM injection.
- Toda nova tela deve ser componente React real.
