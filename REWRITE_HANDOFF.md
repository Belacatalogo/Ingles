# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

## REGRA DE TESTE — VERCEL PREVIEW
O usuário testa as mudanças no **Vercel**, sempre no deploy/preview mais recente da branch:

`rewrite-fluency-clean-lab`

Fluxo correto:
1. fazer alterações somente na branch lab;
2. usuário dispara/aguarda o deploy da Vercel da branch lab;
3. usuário testa no iPhone pelo preview da Vercel;
4. só avançar depois da confirmação do usuário.

## REGRA DE ORGANIZAÇÃO — SEM GAMBIARRAS, SEM BUNDLE DE PATCHES
Continuar montando o sistema como React modular em `fluency-clean/src/`:
- telas em `fluency-clean/src/screens/`;
- componentes em `fluency-clean/src/components/`;
- serviços em `fluency-clean/src/services/`;
- estilos reais em `fluency-clean/src/styles/`;
- não usar DOM injection;
- não mexer em `bundle.js`;
- não criar bundle patch;
- não editar HTML para simular UI;
- não usar `preview-clean` como produto final;
- não mexer no backend Azure privado.

## Estado atual para teste

### Bloco 8-LAB-4 — Auditoria funcional de áudio IMPLEMENTADO, aguardando teste
Motivo:
- usuário relatou que botões **Ouvir** não faziam nada nas abas;
- prioridade foi invertida: áudio funcional antes de expansão maior do currículo.

Arquivos alterados/criados:
- `fluency-clean/src/services/audioPlayback.js`
- `fluency-clean/src/services/tts.js`
- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `audioPlayback.js` como serviço único de reprodução;
- no iPhone/iOS, o serviço usa primeiro o TTS do navegador para evitar bloqueio do Safari;
- fora do iOS, tenta Gemini TTS natural e cai para TTS do navegador se falhar;
- `tts.js` foi reforçado:
  - espera carregamento de vozes;
  - escolhe voz em inglês;
  - registra início/fim/erro no diagnóstico;
  - trata `interrupted/canceled` como interrupção controlada;
  - mostra erro se o Safari bloquear o início;
- Reading agora usa `playLearningAudio` no botão **Ouvir texto**;
- Listening agora usa `playLearningAudio` no botão play e botão pause interrompe fala;
- Speaking conversa/pronúncia/imersão agora usam `playLearningAudio`;
- Flashcards agora tem áudio funcional para palavra e frase;
- todos os botões registram o toque no diagnóstico.

Limites intencionais:
- no iPhone, foi priorizado áudio que realmente toca em vez de esperar Gemini TTS natural assíncrono;
- Gemini TTS natural ainda existe para navegadores onde não há bloqueio do Safari;
- não mexeu em Azure, Firebase, HTML ou bundle;
- não mexeu em main nem na branch estável.

## Teste recomendado no Vercel/iPhone

1. Esperar o deploy da branch lab ficar Ready.
2. Abrir o app pelo link fixo da branch lab.
3. Testar áudio em **Aula/Reading**:
   - tocar em **Ouvir texto**;
   - verificar se sai voz do iPhone;
   - abrir diagnóstico e conferir log do botão.
4. Testar áudio em **Speaking**:
   - Conversa > Ouvir;
   - Pronúncia > Ouvir modelo;
   - Imersão > Ouvir.
5. Testar áudio em **Cartas**:
   - Ouvir palavra;
   - virar carta;
   - Ouvir frase.
6. Testar **Listening** quando houver aula Listening gerada.
7. Se não sair som, mandar print do diagnóstico após tocar em Ouvir.

## Contexto dos blocos anteriores

### UI visual aprovada/organizada
- Speaking aprovado: `LAB-7D`, `LAB-7E`, `LAB-7F`, `LAB-7G`.
- Hoje/Home aprovado: `LAB-HOJE-1`, `LAB-HOJE-1B`.
- Navbar aprovada: `LAB-NAV-1`.
- Aula aprovada e limpa: `LAB-AULA-1`, `LAB-AULA-1B`, `LAB-AULA-2`, `LAB-9`.
- Cartas/Flashcards aprovado: `LAB-CARTAS-1`.
- Progresso visual aprovado: `LAB-PROGRESSO-1`.
- Ajustes/Configurações aprovado/organizado.
- Imersão adicionada dentro de Speaking e ajustada.
- Checklist visual final: `LAB-10`.

### Bloco 8-LAB-1
- Motor pedagógico multi-tipo para Reading, Grammar, Listening e Writing.

### Bloco 8-LAB-2
- Cronograma pedagógico A1 → C2 automático.
- Usuário não escolhe conteúdo; sistema gera próxima aula obrigatória.

### Bloco 8-LAB-2B/2C/2D
- Geração longa, retry por bloco, validação equilibrada e estabilização do JSON.

### Bloco 8-LAB-2E/2F
- Estatísticas reais de tempo/exercícios para Aula e Hoje, sem valor fixo.

### Bloco 8-LAB-3
- Trilha A1 → C2 visível em Progresso.

## Próximo bloco correto

### Se Bloco 8-LAB-4 for aprovado
Próximo: `Bloco 8-LAB-5 — expandir currículo e travas pedagógicas`.

Objetivo provável:
- expandir muito mais o cronograma A1, A2, B1, B2, C1 e C2;
- adicionar revisões obrigatórias mais claras;
- adicionar simulados de fim de nível;
- reforçar regra de não avançar de nível antes de consolidar quase tudo;
- melhorar o cálculo de liberação de nível.

### Se Bloco 8-LAB-4 tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema encontrado na branch lab.

## Como continuar em outro chat
Mensagem recomendada:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. A UI visual está aprovada/organizada. O `Bloco 8-LAB-4` fez auditoria funcional de áudio e conectou botões Ouvir em Aula, Listening, Speaking e Cartas, aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
