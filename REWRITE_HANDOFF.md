# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## ESTADO ATUAL — LISTENING PLAYER LIMPO + CACHE INDEXEDDB

### `HOTFIX-LISTENING-CLEAN-PLAYER-INDEXEDDB-CACHE-LAB` — IMPLEMENTADO

Motivação:
- Usuário testou no iPhone e viu:
  - erro `The request is not allowed by the user agent...` quando o app tentava preparar e tocar o áudio automaticamente após processo assíncrono;
  - cache local via localStorage indisponível para áudio grande;
  - muitos botões no card de Listening, deixando a aula poluída.
- O áudio tocava quando o usuário clicava manualmente depois, indicando que o problema principal era gesto do usuário/autoplay + cache grande.

Objetivo executado:
- Separar preparo de áudio e reprodução no iPhone.
- Criar cache IndexedDB para áudios grandes.
- Remover o card poluído de controle por fala/trecho.
- Manter primeira escuta sem leitura, com interface limpa.

Arquivos criados/alterados:
- `fluency-clean/src/services/audioBlobCache.js`
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

O que foi feito — cache:
- Criado `audioBlobCache.js` usando IndexedDB.
- Áudios grandes/finais agora podem ser salvos como Blob no IndexedDB.
- Mantém até 80 blobs grandes.
- Remove antigos por `lastUsedAt` quando necessário.
- `multiSpeakerAudio.js` agora tenta cache nesta ordem:
  1. memória;
  2. IndexedDB;
  3. cache legado localStorage;
  4. gerar novamente.
- O cache final multi-speaker mudou para modelo `multi-speaker-merged-dialogue-v2`.

O que foi feito — erro de autoplay/iPhone:
- Para diálogo multi-voz, `handleListen` agora prepara o áudio primeiro.
- Quando o áudio fica pronto, o estado vira `ready` e a mensagem pede para tocar novamente em Reproduzir.
- A reprodução real acontece em `handlePlayPrepared`, diretamente no clique seguinte do usuário.
- Isso evita tentar tocar automaticamente depois de um processo assíncrono, que é justamente onde o iPhone costuma bloquear.

O que foi feito — visual/UX:
- Removido visualmente o card `Controle por fala` / `Ouvir trecho atual` / `Próximo trecho` / `Mostrar texto`.
- No lugar, ficou só uma nota discreta:
  - `Primeira escuta protegida: nenhum trecho da fala aparece aqui. Use “Conferir texto” só depois de ouvir.`
- A aba Listening ficou menos poluída.
- Classe adicionada: `listening-clean-player-v3`.

Commits:
- `d11ec132f9fe3c8239d707c617da02f61ae78e6b` — cria cache IndexedDB para áudios grandes.
- `57f784a33c6398a3ff432e6990709bd6bbc5dbc7` — usa IndexedDB para cache final multi-speaker.
- `75d5000e09002058074750f3237da876f9e9fe51` — simplifica player Listening e prepara áudio antes de tocar.
- `1ecbced18f432f2a2dd40eede8da04b1f315a593` — remove poluição visual do controle manual Listening.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Tocar no play uma vez.
4. Esperar a mensagem `Áudio preparado. Toque em Reproduzir...` ou `Áudio pronto no cache...`.
5. Tocar no play de novo para reproduzir.
6. Confirmar que o erro de permissão/autoplay não aparece.
7. Confirmar que o card de controle por fala sumiu.
8. No replay seguinte, confirmar que usa cache IndexedDB/memória e prepara mais rápido.

Observação importante:
- O primeiro toque em diálogo multi-voz pode preparar o áudio, e o segundo toque inicia a reprodução. Isso é intencional para contornar a trava do iPhone sem quebrar a imersão com erro.

## ESTADO ANTERIOR — CACHE DE ÁUDIO AMPLIADO

### `HOTFIX-AUDIO-CACHE-CAPACITY-LAB` — IMPLEMENTADO

- Cache de áudio localStorage aumentou de 40 para 160 itens.
- Se salvar falhar por espaço, faz prune e tenta novamente.
- `audio.cache.*` não sincroniza mais com cloud sync.

Commits:
- `abf9eb771764db4e31ca455a5e0153c95ad9cf4d` — aumenta capacidade do cache de áudio.
- `edacb305ec7c78ca9339cdfa60a7a35a4f6b4715` — impede sync cloud do cache de áudio.

## ESTADO ANTERIOR — CACHE FINAL MULTI-SPEAKER

### `HOTFIX-LISTENING-MERGED-AUDIO-CACHE-LAB` — IMPLEMENTADO

- Diálogo multi-voz salva áudio final concatenado.
- Replay deveria usar cache final, mas localStorage falhou para áudio grande no iPhone.

## ESTADO ANTERIOR — HOTFIX BLIND LISTENING CONTROL

### `HOTFIX-LISTENING-BLIND-FIRST-CONTROL-LAB` — IMPLEMENTADO

- Controle por fala/trecho não mostra texto antes da primeira escuta.
- Depois removido visualmente pelo player limpo v3 por poluir a tela.

## ESTADO ANTERIOR — LISTENING MULTI-SPEAKER + PLANO ANTI-PAUSA

### `BLOCO-LISTENING-MULTI-SPEAKER-TTS-LAB` — IMPLEMENTADO

- Detecta diálogos `Nome: fala`.
- Usa vozes diferentes por personagem.
- Tenta montar áudio único WAV no frontend.
- Preview `Testar Diálogo` usa Ana/João.

## ESTADO ANTERIOR — HOTFIX LISTENING AUDIO + PRACTICE DEPTH

### `HOTFIX-LISTENING-AUDIO-PRACTICE-DEPTH-LAB` — IMPLEMENTADO

- Estabilizou áudio segmentado no iPhone.
- Adicionou controle manual por trecho.
- Adaptou prática profunda de Listening para ser mais focada em escuta e segura para A1.

## ESTADO ANTERIOR — PREVIEW TEMPORÁRIO DE TIPOS DE AULA

### `BLOCO-TEMP-LESSON-PREVIEW-SWITCH-LAB` — IMPLEMENTADO

- Seletor temporário na aba Aula com `Aula real`, `Testar Listening`, `Testar Diálogo`, `Testar Reading` e `Abrir Speaking`.
- O preview usa samples locais e não substitui a aula real.

## ESTADO ANTERIOR — GRAMMAR APROVADA NA LAB

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar aprovada visualmente na branch `rewrite-fluency-clean-lab`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não remover o preview temporário até o usuário aprovar ou pedir remoção.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-CLEAN-PLAYER-INDEXEDDB-CACHE-LAB`: áudio final grande agora usa IndexedDB, o player de diálogo prepara no primeiro toque e reproduz no segundo toque para evitar bloqueio do iPhone, e o card de controle por fala foi removido visualmente para limpar a aula. Próximo teste: `Aula > Testar Diálogo`, tocar play para preparar, tocar play novamente para reproduzir, confirmar sem erro de permissão e sem card poluído."
