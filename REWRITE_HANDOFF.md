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

## ESTADO ATUAL — CACHE DE ÁUDIO AMPLIADO

### `HOTFIX-AUDIO-CACHE-CAPACITY-LAB` — IMPLEMENTADO

Motivação:
- Usuário testou o diálogo multi-voz e percebeu que, mesmo após ouvir uma vez, o app parecia tentar preparar/salvar áudio de novo.
- Hipótese provável: limite antigo de cache era baixo para o novo uso de TTS, especialmente porque diálogos geram várias falas individuais e agora também um áudio final concatenado.

Objetivo executado:
- Aumentar a capacidade do cache de áudio.
- Melhorar recuperação quando o localStorage estiver cheio.
- Evitar sincronizar cache de áudio para cloud sync, pois áudio base64 é pesado e deve ficar local.

Arquivos alterados:
- `fluency-clean/src/services/audioCache.js`
- `fluency-clean/src/services/storage.js`
- `REWRITE_HANDOFF.md`

O que foi feito:
- `MAX_AUDIO_CACHE_ITEMS` aumentou de `40` para `160`.
- Adicionado `QUOTA_RECOVERY_KEEP_ITEMS = 48`.
- Se salvar um áudio falhar por espaço, o cache agora remove áudios antigos e tenta salvar novamente.
- O prune continua mantendo os áudios mais recentes/mais usados primeiro.
- `storage.js` agora não chama cloud sync para chaves iniciadas com `audio.cache.`.
- Isso evita tentar sincronizar blobs/base64 pesados e reduz risco de travar ou gastar armazenamento cloud com áudio local.

Commits:
- `abf9eb771764db4e31ca455a5e0153c95ad9cf4d` — aumenta capacidade do cache de áudio.
- `edacb305ec7c78ca9339cdfa60a7a35a4f6b4715` — impede sync cloud do cache de áudio.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Tocar o áudio principal uma vez e deixar preparar/tocar.
4. Tocar novamente.
5. Verificar se aparece `Diálogo multi-voz carregado do cache final`.
6. Conferir diagnóstico: deve aparecer cache local/memória em vez de tentativas Gemini para todas as falas.
7. Se ainda aparecer tentativa Gemini sempre, investigar se o cache final está falhando por tamanho do áudio no localStorage e migrar áudio para IndexedDB.

Próximo bloco recomendado se o problema persistir:
- `BLOCO-AUDIO-CACHE-INDEXEDDB-LAB`

Objetivo futuro:
- Migrar os áudios grandes do localStorage para IndexedDB.
- Manter localStorage apenas para índice/metadados.
- Isso permitirá cache de áudios muito maiores, essencial para Listening avançado.

## ESTADO ANTERIOR — CACHE FINAL MULTI-SPEAKER

### `HOTFIX-LISTENING-MERGED-AUDIO-CACHE-LAB` — IMPLEMENTADO

Motivação:
- O cache antigo já salvava cada fala/trecho individual do Gemini TTS.
- Porém, no diálogo multi-voz, ao tocar novamente, o app ainda precisava reconstruir o áudio único juntando as falas.
- Isso explicava a demora de alguns segundos ao tentar reouvir/despausar.

Objetivo executado:
- Salvar também o áudio final multi-speaker já concatenado.
- Na segunda reprodução, tocar direto o áudio final do cache, sem reconstruir fala por fala.
- Manter cache em memória enquanto a aula estiver aberta para acelerar ainda mais o replay.

Arquivos alterados:
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- `multiSpeakerAudio.js` agora importa `getCachedAudio`, `setCachedAudio` e `makeAudioCacheId`.
- Criado modelo de cache específico: `multi-speaker-merged-dialogue-v1`.
- Criado `makeDialogueCacheId`, baseado em personagem + voz + fala + estilo.
- Criado cache em memória `mergedAudioUrlMemory` para manter URL pronta durante a sessão.
- Criado salvamento do PCM final concatenado no cache local depois da primeira montagem.
- Antes de gerar/reconstruir, `playMultiSpeakerDialogue` agora tenta:
  1. cache em memória;
  2. cache local do áudio final;
  3. só depois gerar falas e montar novamente.
- A mensagem da aula agora diferencia:
  - `Diálogo multi-voz iniciado como áudio único...` na primeira geração;
  - `Diálogo multi-voz carregado do cache final...` no replay.
- Classe adicionada em `ListeningLessonClean.jsx`: `listening-merged-cache-v1`.

Commits:
- `2c9230369210846599476ed9b650080717205b55` — cacheia áudio final multi-speaker.
- `6a48607a9068293cec12c23e0d3d4bb471bd0b40` — mostra cache final multi-speaker no Listening.

## ESTADO ANTERIOR — HOTFIX BLIND LISTENING CONTROL

### `HOTFIX-LISTENING-BLIND-FIRST-CONTROL-LAB` — IMPLEMENTADO

- Controle por fala/trecho não mostra mais o texto antes da primeira escuta.
- Há botão `Mostrar texto` / `Ocultar texto`.
- Ao tocar em `Próximo trecho`, o texto volta a ficar oculto automaticamente.

Commits:
- `23128bc477a4f8b31f2195ec815e387a4970faad` — oculta fala antes da transcrição Listening.
- `69b21eeaa4fffdecc985c1eccd429dd35d43a3b8` — ajusta blind listening no controle por fala.

## ESTADO ANTERIOR — LISTENING MULTI-SPEAKER + PLANO ANTI-PAUSA

### `BLOCO-LISTENING-MULTI-SPEAKER-TTS-LAB` — IMPLEMENTADO

- Detecta diálogos `Nome: fala`.
- Usa vozes diferentes por personagem.
- Tenta montar áudio único WAV no frontend.
- Preview `Testar Diálogo` usa Ana/João.

Commits principais:
- `37432d34c936ec0a2f0c147b9185aa9b28db1bfe` — cria TTS multi-personagem para Listening.
- `e8075ade3f663b92b2c44f5be03f39c5839b2c` — conecta Listening ao TTS multi-personagem.
- `c6a7fb27ac45eb64174a8cf60ed6a7563c033b60` — estiliza diálogo multi-voz Listening.
- `0044926aa00757679495f1986fe0813157a5db26` — adiciona diálogo ao preview Listening.
- `37679e6f5b275d2ae064ba8e7fb7c9ff3c5da74e` — adiciona botão explícito para testar diálogo Listening.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-AUDIO-CACHE-CAPACITY-LAB`: cache de áudio aumentou de 40 para 160 itens, salva novamente após prune se localStorage estiver cheio, e `audio.cache.*` não sincroniza mais na cloud. Próximo teste: `Aula > Testar Diálogo`, tocar áudio uma vez, tocar novamente e confirmar `carregado do cache final`. Se ainda tentar Gemini sempre, próximo bloco é migrar cache de áudio para IndexedDB."
