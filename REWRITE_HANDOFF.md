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

## ESTADO ATUAL — CACHE FINAL MULTI-SPEAKER

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

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu em geração de aula, prompts, modelos, chaves ou fallback de aula.
- Não mexeu na Grammar aprovada.

Commits:
- `2c9230369210846599476ed9b650080717205b55` — cacheia áudio final multi-speaker.
- `6a48607a9068293cec12c23e0d3d4bb471bd0b40` — mostra cache final multi-speaker no Listening.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Tocar o áudio principal uma primeira vez.
4. Aguardar ele preparar/tocar.
5. Tocar novamente o áudio principal.
6. Confirmar se a mensagem mostra `carregado do cache final`.
7. Confirmar se o segundo toque inicia bem mais rápido.
8. Conferir diagnóstico para mensagens de cache final multi-voz.

Próximo bloco recomendado se aprovado:
- `BLOCO-LISTENING-CONTINUOUS-AUDIO-PIPELINE-LAB`

Objetivo futuro:
- Aplicar o mesmo cache final concatenado para qualquer Listening longo, não só diálogos.
- Pré-gerar trechos, montar um único áudio final, salvar no cache e tocar como um arquivo único.
- Isso vai permitir textos longos avançados sem reduzir conteúdo e sem quebrar imersão.

## ESTADO ANTERIOR — HOTFIX BLIND LISTENING CONTROL

### `HOTFIX-LISTENING-BLIND-FIRST-CONTROL-LAB` — IMPLEMENTADO

Motivação:
- O multi-speaker funcionou: personagens `Ana` e `João` aparecem, vozes `Kore` e `Puck`, e o áudio multi-voz iniciou como áudio único.
- Problema encontrado no iPhone: o `Controle por fala` mostrava a frase antes da transcrição, quebrando o objetivo da primeira etapa: ouvir sem ler.

Objetivo executado:
- Manter o objetivo pedagógico de Listening: primeira escuta sem leitura.
- Ocultar o texto do controle por fala/trecho por padrão.
- Permitir mostrar o texto manualmente apenas quando o usuário quiser conferir.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Adicionado estado `showSegmentText`.
- O controle por fala/trecho agora mostra por padrão: `Texto oculto para manter a primeira escuta sem leitura.`
- Adicionado botão `Mostrar texto` / `Ocultar texto`.
- Ao tocar em `Próximo trecho`, o texto volta a ficar oculto automaticamente.
- Adicionada classe `listening-blind-first-v2`.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-MERGED-AUDIO-CACHE-LAB`: o diálogo multi-voz agora salva também o áudio final concatenado no cache local e em memória. No replay, a mensagem deve mostrar `carregado do cache final` e iniciar mais rápido. Próximo teste: `Aula > Testar Diálogo`, tocar áudio uma vez, depois tocar novamente e confirmar cache final."
