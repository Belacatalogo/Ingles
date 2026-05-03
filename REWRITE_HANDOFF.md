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

## ESTADO ATUAL — GUARDA DE PRONÚNCIA TTS

### `HOTFIX-LISTENING-TTS-PRONUNCIATION-GUARD-LAB` — IMPLEMENTADO

Motivação:
- O player limpo funcionou.
- O problema novo foi qualidade de pronúncia em uma geração específica do Gemini TTS:
  - `João` soou como `juau`;
  - `you` soou como `iu`;
  - `today` soou como algo próximo de `drei`.
- Isso não era bug visual nem bug de cache; era inconsistência de pronúncia do TTS em nomes/palavras sensíveis.

Objetivo executado:
- Criar uma camada de proteção de pronúncia antes do Gemini TTS.
- Manter o texto visual da aula igual, mas enviar ao TTS uma versão mais segura quando necessário.
- Invalidar o cache antigo de diálogo com pronúncia ruim para forçar nova geração.

Arquivos criados/alterados:
- `fluency-clean/src/services/pronunciationGuard.js`
- `fluency-clean/src/services/geminiTts.js`
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Criado `pronunciationGuard.js`.
- Adicionadas regras iniciais:
  - `João` → texto TTS `Joao` + instrução para não soar como `juau`;
  - `today` → guia `tuh-DAY`, com estresse na segunda sílaba;
  - `you` → guia `yoo`, não `iu`;
  - `how are you` → guia `HOW ar yoo`.
- `geminiTts.js` agora:
  - normaliza o texto enviado ao TTS;
  - adiciona guia de pronúncia ao estilo;
  - usa a versão protegida também no cacheId, para evitar reaproveitar áudio antigo ruim.
- `multiSpeakerAudio.js` agora:
  - usa o guia de pronúncia no diálogo multi-voz;
  - usa texto protegido no cacheId das falas;
  - mudou o modelo de cache final para `multi-speaker-merged-dialogue-v3-pronunciation-guard`, forçando nova geração do áudio final.

Commits:
- `42eac1160e862d14b90f4688f79b39587061387a` — cria guarda de pronúncia para TTS.
- `0eb1dffbc62579f982b344b4befb6971d4c7820c` — aplica guarda de pronúncia no Gemini TTS.
- `e38f8548b565c70cc298d9a22d3b2ac8e2cd49b5` — usa guarda de pronúncia no cache multi-speaker.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Tocar play uma vez para preparar.
4. Tocar play de novo para reproduzir.
5. Confirmar se `João`, `how are you`, `you` e `today` soam mais naturais.
6. Se ainda houver erro em uma palavra específica, adicionar a palavra ao `pronunciationGuard.js`.

Observação importante:
- Essa abordagem não garante 100% contra erro de modelo, mas reduz muito inconsistências em palavras conhecidas.
- O caminho futuro ideal é permitir uma lista configurável de palavras sensíveis/pronúncia no próprio app.

## ESTADO ANTERIOR — LISTENING PLAYER LIMPO + CACHE INDEXEDDB

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

Commits:
- `d11ec132f9fe3c8239d707c617da02f61ae78e6b` — cria cache IndexedDB para áudios grandes.
- `57f784a33c6398a3ff432e6990709bd6bbc5dbc7` — usa IndexedDB para cache final multi-speaker.
- `75d5000e09002058074750f3237da876f9e9fe51` — simplifica player Listening e prepara áudio antes de tocar.
- `1ecbced18f432f2a2dd40eede8da04b1f315a593` — remove poluição visual do controle manual Listening.

## ESTADO ANTERIOR — CACHE DE ÁUDIO AMPLIADO

### `HOTFIX-AUDIO-CACHE-CAPACITY-LAB` — IMPLEMENTADO

- Cache de áudio localStorage aumentou de 40 para 160 itens.
- Se salvar falhar por espaço, faz prune e tenta novamente.
- `audio.cache.*` não sincroniza mais com cloud sync.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-TTS-PRONUNCIATION-GUARD-LAB`: criada camada `pronunciationGuard.js`, Gemini TTS agora usa texto/estilo protegido para palavras como João, today, you e how are you, e o cache final multi-speaker foi invalidado para regenerar com a guarda de pronúncia. Próximo teste: `Aula > Testar Diálogo`, preparar e reproduzir, confirmando se João, you e today soam corretos."
