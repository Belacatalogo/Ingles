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

### Bloco 7.2 — Firebase/Google validado no preview
- Firebase runtime configurado no RawGitHack com projeto `aulas-ingles-c0c65`.
- Domínio autorizado no Firebase após teste real.
- Login por popup validado no iPhone.
- Sessão Google permaneceu após recarregar.
- Para o preview RawGitHack, popup virou o caminho principal.
- Redirect fica como fallback/diagnóstico, pois voltou para a tela de acesso no teste real.

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

### Bloco 7.2.4 — Popup como padrão no preview RawGitHack
- Teste real no iPhone confirmou que login Google por popup funciona no RawGitHack.
- Teste real também mostrou que o redirect pode voltar para a tela de acesso no preview.
- `AccessGate.jsx` agora usa popup como ação principal do botão “Entrar com Google”.
- O redirect continua disponível apenas como fallback/diagnóstico.
- No app final hospedado em domínio próprio, o redirect pode ser reavaliado; para o preview atual, popup é o caminho validado.

### Bloco 7.3.1 — Progresso local e conclusão Reading
- `progressStore.js` criado.
- Progresso agora salva XP, streak, aulas concluídas, histórico e rascunhos no localStorage.
- `ReadingLesson.jsx` agora salva rascunho da resposta guiada.
- Botão “Concluir Reading” agora registra conclusão real, +25 XP e histórico.
- Reabrir a aula mostra estado concluído quando já foi finalizada.
- `ProgressScreen.jsx` agora mostra XP real, aulas da semana, streak e histórico recente.
- `index.css` recebeu estilos para mensagem de conclusão e histórico.

### Bloco 7.3 — Progresso/salvamento/conclusão validado no preview
- Teste real confirmou que login continua persistente.
- Salvamento/conclusão/progresso funcionaram corretamente no preview segundo retorno do usuário.

## Próximo passo recomendado

### Bloco 7.4 — Corrigir layouts por tipo de aula
- Começar por Grammar, porque já havia reclamação anterior de respostas aparecendo abertas e layout pouco sério.
- Depois Listening.
- Depois Speaking.
- Reading já recebeu correção inicial de UX, mas ainda será revisado no bloco pedagógico profundo.

## Blocos restantes por ordem de segurança

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

### Bloco 9 — Limpeza final e polimento de produção
- Remover textos grandes de versão/validação da Home.
- Remover ou esconder botões de teste, fallback e diagnóstico que não devem aparecer para usuário final.
- Revisar a aba Ajustes inteira.
- Todo botão que permanecer em Ajustes deve ter função real.
- Botões decorativos, duplicados ou sem utilidade devem ser removidos.
- Trocar textos de preview por textos finais de produto.
- Garantir que o app final não pareça ambiente de teste antes de substituir a `main`.

## Como continuar em outro chat
Diga: "continue a reconstrução do Fluency na branch `rewrite-fluency-clean`, leia o arquivo `REWRITE_HANDOFF.md` e siga do próximo bloco".

## Decisões importantes
- Não criar outro HTML gigante.
- Não continuar remendando `bundle.js`.
- Não mexer no backend Azure privado.
- Não usar UI sobreposta por DOM injection.
- Toda nova tela deve ser componente React real.
