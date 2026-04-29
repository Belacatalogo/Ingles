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

### Bloco 7.1 — Validação real da geração Gemini
- `App.jsx` agora passa `onLessonGenerated` e `lessonRevision` para as telas.
- Quando a aula é gerada, o app muda automaticamente para a aba Aula.
- `TodayScreen.jsx` passa o callback para `LessonGeneratorPanel`.
- `LessonGeneratorPanel.jsx` mostra status das keys, alerta se não houver key, loga clique e erros com mais clareza.
- `LessonScreen.jsx` recarrega a aula salva quando `lessonRevision` muda.
- `index.css` recebeu estilos para `generation-status-box` e `inline-warning`.

### Bloco 7.1.1 — Geração de aula em blocos
- `geminiLessons.js` deixou de depender de uma única resposta gigante.
- A geração agora é montada em 4 blocos: estrutura, texto principal Reading, vocabulário e exercícios.
- Cada bloco é validado antes de passar para o próximo.
- O Diagnóstico mostra em qual bloco a geração está.
- O plano de keys/modelos foi preservado: Flash/free primeiro e Pro somente como fallback.
- Erros 429 continuam pulando a key afetada; erros temporários continuam tentando o próximo modelo/key.
- Validado no preview real: aula `My Family` gerada com sucesso via `gemini-2.5-flash-lite`.

### Bloco 7.1.2 — Correção após diagnóstico real Gemini
- Diagnóstico real mostrou 503, 429 e 404.
- `gemini-1.5-flash` removido do plano porque retornou 404 na API v1beta.
- `gemini-1.5-pro` removido do fallback.
- Se uma key retornar 429, próximas tentativas com a mesma key são puladas.
- Erros 503 recebem pequena espera antes da próxima tentativa.
- Mensagem final agora diferencia quota, alta demanda e modelo indisponível.
- `lessonKeys.js` atualizado para refletir a lista correta de modelos.

### Bloco 7.1.3 — Segurança de modelos Gemini após preview real
- Preview mostrou `gemini-2.5-flash` com 503 por alta demanda e `gemini-2.0-flash` como indisponível.
- `gemini-2.0-flash` foi removido do plano de geração de aulas.
- Plano atual de aulas usa `gemini-2.5-flash`, `gemini-2.5-flash-lite` e, se houver key Pro, `gemini-2.5-pro`.
- Objetivo: manter fallback Flash/free válido antes de acionar Pro.

### Bloco 7.2.0 — Segurança antes da validação Firebase/Google
- `AccessGate.jsx` agora assina o estado real do Firebase Auth com `subscribeAuth`.
- Após login Google/redirect, uma sessão local é criada e o app libera automaticamente.
- Foi adicionada entrada por código de acesso usando `VITE_ACCESS_CODE`.
- Foi adicionada ação para reiniciar acesso local no preview.
- `access.css` criado para estilos do gate sem inflar o CSS principal.
- `.env.example` documenta `VITE_ACCESS_CODE`.

### Bloco 7.2.1 — Configuração Firebase runtime para preview
- `firebase.js` agora lê configuração Firebase por env ou por configuração salva localmente no navegador.
- `AccessGate.jsx` recebeu painel “Configurar Firebase neste preview”.
- O usuário pode colar `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` e `appId` direto no preview RawGitHack.
- A configuração fica salva apenas no navegador/localStorage do preview.
- Isso permite validar login Google sem precisar rebuildar o app com `.env` a cada teste.
- `access.css` recebeu estilos próprios para o painel Firebase.

### Bloco 7.2.2 — Diagnóstico de login Google no iPhone
- `auth.js` agora diferencia login Google por redirect e por popup.
- Erros comuns recebem mensagens legíveis: domínio não autorizado, método Google desativado, popup bloqueado ou janela fechada.
- `AccessGate.jsx` agora mostra dois botões: “Entrar com Google” por redirect e “Tentar Google por popup”.
- O clique no botão Google agora gera log explícito no Diagnóstico e mensagem visível na tela.
- `access.css` recebeu estilos para os botões de fallback e mensagem de auth.

### Bloco 7.2.3 — Capturar retorno do Google Redirect
- `auth.js` agora usa `getRedirectResult` para capturar o retorno do login Google.
- `auth.js` tenta configurar `browserLocalPersistence` antes de autenticar.
- `AccessGate.jsx` verifica o retorno do Google quando o preview carrega.
- Se houver usuário no retorno do redirect, o app cria sessão local e libera a entrada automaticamente.
- Se houver erro no retorno, a mensagem aparece na tela e também no Diagnóstico.

### Bloco 7.4.1 — Correção UX da compreensão Reading
- `ReadingLesson.jsx` não revela mais a resposta correta antes da interação.
- O aluno escolhe uma opção e só então recebe feedback visual.
- Resposta correta é revelada apenas após tentativa.
- Seleção, acerto e erro têm estados visuais próprios em `index.css`.

## Próximo passo recomendado

### Bloco 7.2 — Validar Firebase/Google real
- Abrir o preview atualizado.
- Confirmar status `Firebase configurado (runtime)`.
- Testar primeiro “Entrar com Google”.
- Ao voltar do Google, o app deve mostrar “Verificando retorno do Google...” e liberar automaticamente se houver usuário.
- Se não liberar, testar “Tentar Google por popup”.
- Se aparecer erro de domínio, adicionar `raw.githack.com` nos domínios autorizados do Firebase Authentication.
- Se aparecer erro de método, ativar Google em Firebase Authentication > Sign-in method.
- Confirmar se “Reiniciar acesso” limpa a sessão local.

## Blocos restantes por ordem de segurança

### Bloco 7.2 — Validar Firebase/Google
- Validar runtime Firebase, Google redirect, código de acesso e sessão local.

### Bloco 7.3 — Validar progresso/salvamento/conclusão de aula
- Confirmar que a aula gerada persiste ao recarregar.
- Transformar “Concluir Reading” em progresso real.
- Registrar conclusão, tempo e rotina diária.

### Bloco 7.4 — Corrigir layouts por tipo de aula
- Reading UX iniciado antecipadamente.
- Grammar, Listening e Speaking devem ser corrigidos um por vez.

### Bloco 7.5 — Checklist final do preview
- Testar app inteiro no iPhone antes de qualquer migração.

### Bloco 7.6 — Decidir se substitui a main
- Só depois de validação completa e aprovação do usuário.

### Bloco 8 — Reestruturação profunda das aulas
- Reestruturar as aulas depois da validação/migração segura.
- Objetivo: nenhuma aula curta, rasa ou com poucos exercícios.
- Criar contratos mínimos por tipo de aula: tamanho mínimo de conteúdo, quantidade mínima de exercícios, profundidade de explicação, revisão, prática guiada e prática independente.
- Reading deve ter texto mais completo, vocabulário robusto, compreensão, produção escrita, revisão e desafio final.
- Grammar deve ter explicação séria, exemplos, erros comuns, comparação português/inglês, exercícios variados e produção própria.
- Listening deve ter áudio/texto separados, pré-escuta, escuta guiada, checagem de compreensão e prática de shadowing.
- Speaking deve ter roteiro, modelo, gravação, feedback e repetição orientada.
- Atualizar `geminiLessons.js` para gerar aulas mais profundas em mais blocos se necessário.
- Atualizar validações para rejeitar aula curta, vocabulário fraco ou poucos exercícios.
- Esse bloco deve ser feito após o app estar estável para não misturar reestruturação pedagógica com correções críticas de login/progresso.

## Como continuar em outro chat
Diga: "continue a reconstrução do Fluency na branch `rewrite-fluency-clean`, leia o arquivo `REWRITE_HANDOFF.md` e siga do próximo bloco".

## Decisões importantes
- Não criar outro HTML gigante.
- Não continuar remendando `bundle.js`.
- Não mexer no backend Azure privado.
- Não usar UI sobreposta por DOM injection.
- Toda nova tela deve ser componente React real.
