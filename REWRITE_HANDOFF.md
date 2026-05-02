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

## ESTADO ATUAL — HOTFIX BLIND LISTENING CONTROL

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
- Estilizado placeholder oculto com borda tracejada e texto discreto.

Commits:
- `23128bc477a4f8b31f2195ec815e387a4970faad` — oculta fala antes da transcrição Listening.
- `69b21eeaa4fffdecc985c1eccd429dd35d43a3b8` — ajusta blind listening no controle por fala.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Diálogo`.
3. Confirmar que `Ana` e `João` aparecem.
4. Confirmar que o controle por fala NÃO mostra a frase de início.
5. Tocar áudio principal sem ler a transcrição.
6. Usar `Ouvir trecho atual` sem ver texto.
7. Tocar `Mostrar texto` apenas depois de ouvir.
8. Tocar `Próximo trecho` e confirmar que o texto volta a ficar oculto.

## ESTADO ANTERIOR — LISTENING MULTI-SPEAKER + PLANO ANTI-PAUSA

### `BLOCO-LISTENING-MULTI-SPEAKER-TTS-LAB` — IMPLEMENTADO

Objetivo executado:
- Detectar diálogos com 2 ou mais personagens em Listening.
- Dar voz diferente para cada personagem quando o texto vier em formato `Nome: fala`.
- Melhorar a condução futura para textos longos sem depender de cortar conteúdo pedagógico.
- Pensar no problema de pausa automática do áudio como problema de pipeline de reprodução, não de tamanho de aula.

Arquivos criados/alterados:
- `fluency-clean/src/services/multiSpeakerAudio.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `fluency-clean/src/services/lessonPreviewSamples.js`
- `REWRITE_HANDOFF.md`

O que foi feito — multi-speaker:
- Criado `multiSpeakerAudio.js`.
- Criado parser `parseDialogueTurns(text)`.
- O parser detecta linhas como:
  - `Ana: Good morning.`
  - `João: Good morning, Ana.`
- Quando detecta 2+ personagens e 2+ falas, o Listening entra em modo diálogo.
- Vozes por personagem:
  - personagem 1: `Kore`;
  - personagem 2: `Puck`;
  - personagem 3: `Charon`;
  - depois alterna entre outras vozes disponíveis.
- A transcrição passa a renderizar em formato de conversa, com nome do personagem, fala e voz usada.
- O card principal mostra os personagens detectados.
- O relatório `Render seguro Listening` mostra número de personagens.
- O controle por trecho vira controle por fala quando é diálogo.

O que foi feito — áudio sem quebra de imersão:
- Para diálogos, o sistema tenta gerar o áudio de cada fala com sua voz e depois montar um único áudio WAV concatenado no frontend.
- Isso é importante porque reduz o risco de pausa automática entre falas no iPhone: em vez de tocar várias chamadas seguidas, o player toca um arquivo único.
- Se a montagem de áudio único falhar, cai para fallback sequencial com as vozes por fala.
- O objetivo técnico futuro é evoluir esse conceito para qualquer Listening longo: pré-gerar todos os trechos, juntar localmente em um único áudio contínuo e só então tocar.
- Essa solução permite textos maiores no futuro sem reduzir conteúdo, preservando imersão.

O que foi feito — preview:
- O preview temporário `Testar Listening`/`Testar Diálogo` usa um diálogo A1 com Ana e João.
- Isso permite testar imediatamente se o parser detecta personagens e se as vozes alternam.

Limitações conhecidas:
- A concatenação atual assume áudio WAV/PCM gerado pelo Gemini TTS local atual.
- Se o navegador bloquear a reprodução inicial do arquivo único, ainda pode haver fallback/erro de plataforma.
- Para textos muito longos avançados, o próximo bloco ideal seria criar um cache/pipeline de pré-carregamento e montagem contínua para qualquer texto, não apenas diálogo.

Commits:
- `37432d34c936ec0a2f0c147b9185aa9b28db1bfe` — cria TTS multi-personagem para Listening.
- `e8075ade3f663b92b2c44f5be03f39c5839b2c` — conecta Listening ao TTS multi-personagem.
- `c6a7fb27ac45eb64174a8cf60ed6a7563c033b60` — estiliza diálogo multi-voz Listening.
- `0044926aa00757679495f1986fe0813157a5db26` — adiciona diálogo ao preview Listening.
- `37679e6f5b275d2ae064ba8e7fb7c9ff3c5da74e` — adiciona botão explícito para testar diálogo Listening.

Próximo bloco recomendado se ainda houver pausa automática:
- `BLOCO-LISTENING-CONTINUOUS-AUDIO-PIPELINE-LAB`

Objetivo futuro desse bloco:
- Usar a mesma ideia do diálogo, mas para todo Listening longo.
- Pré-gerar todos os trechos em cache.
- Concatenar localmente em um áudio único contínuo.
- Tocar apenas um `Audio()` no iPhone.
- Manter textos longos para níveis avançados sem reduzir conteúdo.
- Exibir progresso de preparação: `preparando 1/8`, `preparando 2/8`, depois `tocar aula completa`.

## ESTADO ANTERIOR — HOTFIX LISTENING AUDIO + PRACTICE DEPTH

### `HOTFIX-LISTENING-AUDIO-PRACTICE-DEPTH-LAB` — IMPLEMENTADO

Motivação:
- No iPhone, o áudio principal da aula Listening tocou até perto da metade e depois parou.
- Diagnóstico mostrou bloqueio/limitação da plataforma/navegador durante continuação de TTS segmentado.
- Usuário pediu análise profunda de melhorias da aba Listening, incluindo prática profunda mais focada em escuta, aleatória, mas sem avançar demais em relação ao progresso.

Arquivos alterados:
- `fluency-clean/src/services/audioPlayback.js`
- `fluency-clean/src/services/tts.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

O que foi feito — áudio:
- `audioPlayback.js` agora detecta ambiente iOS/iPadOS.
- No iPhone, o limite para segmentar áudio foi reduzido.
- Segmentos no iPhone ficam mais curtos para diminuir chance de bloqueio na transição.
- O intervalo entre segmentos no iOS foi reduzido.
- Se o iPhone bloquear a continuação automática após alguns trechos, o resultado volta como `partial`, com mensagem mais clara para o usuário.
- `tts.js` passou a aceitar `waitUntilEnded`.
- Quando a fila segmentada usa fallback do navegador, ela agora aguarda o fim real do TTS antes de passar para o próximo segmento, em vez de considerar sucesso logo no início.

O que foi feito — Listening UI:
- Adicionado controle manual por trecho dentro da aula Listening:
  - `Ouvir trecho atual`;
  - `Próximo trecho`.
- Esse controle é especialmente útil no iPhone quando a reprodução automática de múltiplos trechos é bloqueada.
- A mensagem de erro foi melhorada para orientar o usuário a usar o controle por trecho.
- Classe adicionada: `listening-audio-stability-v2`.

O que foi feito — prática profunda:
- `PracticePlanAdapter.js` agora trata Listening de forma especial.
- Prática de Listening passa a priorizar:
  1. `listenChoice`;
  2. `dictation`;
  3. `speak`/shadowing;
  4. `wordBank`;
  5. `fillBlank`;
  6. escolha/compreensão;
  7. escrita curta/correção só quando fizer sentido.
- Para A1, a prática fica mais segura.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-BLIND-FIRST-CONTROL-LAB`: o controle por fala/trecho não mostra mais o texto antes da primeira escuta; há botão `Mostrar texto`/`Ocultar texto`, e `Próximo trecho` volta a ocultar automaticamente. Multi-speaker já funciona com Ana/João. Próximo teste: `Aula > Testar Diálogo` no iPhone e confirmar que o texto fica oculto até o usuário pedir."
