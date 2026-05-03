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

## ESTADO ATUAL — LIMPEZA VISUAL LISTENING

### `HOTFIX-LISTENING-CLEANER-BLIND-NOTE-LAB` — IMPLEMENTADO

Motivação:
- Usuário pediu remover a frase redundante acima de `Conferir texto`.
- Também foi pedido encurtar a nota protegida para deixar a aba Listening mais limpa.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Estado inicial `message` mudou de texto fixo para string vazia.
- A mensagem `<small>` agora só aparece quando houver status real do áudio/player.
- Removida a frase inicial redundante:
  - `Comece ouvindo sem abrir o texto. Depois confira a transcrição.`
- Nota de primeira escuta foi encurtada para:
  - `Primeira escuta sem leitura. Abra o texto só depois de ouvir.`

Commit:
- `fecc5621511886a7b3b4a1d9fdaa79948489f425` — limpa mensagens iniciais do Listening.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Confirmar que a frase redundante acima de `Conferir texto` sumiu.
4. Confirmar que a nota ficou mais curta.
5. Tocar play e confirmar que mensagens só aparecem como status real do áudio.

## ESTADO ANTERIOR — GUARDA DE PRONÚNCIA EXPANDIDA

### `BLOCO-TTS-PRONUNCIATION-GUARD-EXPANSION-LAB` — IMPLEMENTADO

Motivação:
- Usuário perguntou se precisaria avisar palavra por palavra sempre que o TTS pronunciasse algo errado.
- Decisão: criar uma camada preventiva maior, expansível, para reduzir erros comuns automaticamente.

Objetivo executado:
- Expandir `pronunciationGuard.js` com regras preventivas.
- Cobrir nomes brasileiros comuns, frases A1/A2, palavras sensíveis e contrações básicas.
- Invalidar cache multi-speaker antigo para regenerar áudio com a guarda expandida.

Arquivos alterados:
- `fluency-clean/src/services/pronunciationGuard.js`
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Expandida lista `PRONUNCIATION_RULES`.
- Adicionadas regras para nomes brasileiros/comuns:
  - João;
  - José;
  - Ana;
  - Maria;
  - Paulo;
  - Pedro;
  - Lucas;
  - Beatriz;
  - Luiz/Luis/Luís;
  - Vitor/Victor.
- Adicionadas frases comuns A1/A2:
  - how are you;
  - where are you from;
  - what do you do;
  - nice to meet you;
  - see you tomorrow.
- Adicionadas palavras sensíveis/frequentes:
  - today;
  - tomorrow;
  - morning;
  - evening;
  - breakfast;
  - comfortable;
  - vegetable;
  - chocolate;
  - favorite/favourite;
  - pronunciation;
  - language;
  - English;
  - Brazil;
  - Brazilian.
- Adicionadas regras para sons com `you`:
  - you;
  - your;
  - yours.
- Adicionadas contrações básicas:
  - I'm;
  - you're;
  - don't;
  - doesn't;
  - can't.
- Adicionadas regras úteis para spelling:
  - letter A;
  - spell my name.
- Criado `getPronunciationGuardStats(text)` para diagnóstico futuro.
- Exportado `PRONUNCIATION_RULES` para inspeção futura.
- `multiSpeakerAudio.js` mudou o modelo de cache final para `multi-speaker-merged-dialogue-v4-pronunciation-expanded`, invalidando áudios antigos e forçando nova geração com a guarda expandida.

Commits:
- `989073422e7e4e915d9463ef0140052a1bf12d84` — expande guarda automática de pronúncia TTS.
- `9ae30226b791fb4a22d87631b5e665e77ac90615` — invalida cache multi-speaker após expansão de pronúncia.

## ESTADO ANTERIOR — GUARDA DE PRONÚNCIA TTS

### `HOTFIX-LISTENING-TTS-PRONUNCIATION-GUARD-LAB` — IMPLEMENTADO

Motivação:
- O player limpo funcionou.
- O problema novo foi qualidade de pronúncia em uma geração específica do Gemini TTS:
  - `João` soou como `juau`;
  - `you` soou como `iu`;
  - `today` soou como algo próximo de `drei`.

Objetivo executado:
- Criar uma camada de proteção de pronúncia antes do Gemini TTS.
- Manter o texto visual da aula igual, mas enviar ao TTS uma versão mais segura quando necessário.
- Invalidar o cache antigo de diálogo com pronúncia ruim para forçar nova geração.

Arquivos criados/alterados:
- `fluency-clean/src/services/pronunciationGuard.js`
- `fluency-clean/src/services/geminiTts.js`
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `REWRITE_HANDOFF.md`

Commits:
- `42eac1160e862d14b90f4688f79b39587061387a` — cria guarda de pronúncia para TTS.
- `0eb1dffbc62579f982b344b4befb6971d4c7820c` — aplica guarda de pronúncia no Gemini TTS.
- `e38f8548b565c70cc298d9a22d3b2ac8e2cd49b5` — usa guarda de pronúncia no cache multi-speaker.

## ESTADO ANTERIOR — LISTENING PLAYER LIMPO + CACHE INDEXEDDB

### `HOTFIX-LISTENING-CLEAN-PLAYER-INDEXEDDB-CACHE-LAB` — IMPLEMENTADO

- Separou preparo e reprodução do áudio para evitar bloqueio/autoplay no iPhone.
- Criou cache IndexedDB para áudios grandes.
- Removeu card poluído de controle por fala/trecho.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-CLEANER-BLIND-NOTE-LAB`: a mensagem inicial fixa do Listening foi removida, `<small>` só aparece quando há status real do áudio, e a nota foi encurtada para `Primeira escuta sem leitura. Abra o texto só depois de ouvir.` Próximo teste: `Aula > Testar Diálogo` no iPhone e confirmar limpeza visual."
