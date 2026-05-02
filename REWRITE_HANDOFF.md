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

## ESTADO ATUAL — HOTFIX LISTENING AUDIO + PRACTICE DEPTH

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
- Para A1, a prática fica mais segura:
  - evita `correction` e escrita longa;
  - limita dictation a frases curtas;
  - evita perguntas muito acima do nível.
- A ordem dos exercícios de Listening fica levemente aleatória por dia/lesson id, mas preservando prioridade pedagógica de escuta.
- O total ideal de questões em Listening foi reduzido por nível para não passar muito à frente do progresso.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu em geração, prompts, modelos, chaves ou fallback de aula.
- Não mexeu na Grammar aprovada.

Commits:
- `4557442d66eb34680e0e9f673667c39e40b6a873` — adapta prática de Listening ao progresso.
- `ebeeb4f358a141e2f4b3a6f4778f6b2082ab1d9f` — estabiliza áudio segmentado no iPhone.
- `0748fc38a27073cd2d39a5b5dd287c341303a86f` — aguarda fim real do TTS do navegador.
- `1d8073863939cca89bcb43fc94551d84dff74a94` — adiciona controle manual de trechos Listening.
- `93c129545e7ed0bf68892bb9f45cf38a156888aa` — estiliza controle por trecho Listening.

Próximo teste recomendado no iPhone:
1. Aguardar o deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir `Aula` > `Testar Listening`.
3. Tocar o áudio principal.
4. Se o iPhone bloquear a continuação, verificar se aparece orientação para usar controle por trecho.
5. Testar `Ouvir trecho atual` e `Próximo trecho`.
6. Abrir `Começar prática` e conferir se os exercícios são mais focados em escuta.
7. Confirmar que a prática não está difícil demais para A1.
8. Testar `Shadowing real`.
9. Testar `Salvar rascunho` e `Concluir Listening`.

Próximo bloco provável:
- Se estiver OK: `BLOCO-LISTENING-APPROVAL-LAB`.
- Se o áudio ainda for bloqueado no iPhone: `HOTFIX-LISTENING-IOS-MANUAL-AUDIO-ONLY-LAB`, deixando o modo manual por trecho como caminho principal no iOS e o áudio longo como opcional.

## ESTADO ANTERIOR — PREVIEW TEMPORÁRIO DE TIPOS DE AULA

### `BLOCO-TEMP-LESSON-PREVIEW-SWITCH-LAB` — IMPLEMENTADO

Objetivo executado:
- Criar um seletor temporário na aba Aula para testar Listening, Reading e Speaking antes do dia oficial de cada conteúdo.
- Permitir validar renderização no iPhone sem depender do cronograma do dia.
- Manter a aula real preservada e retornar a ela com o botão `Aula real`.

Arquivos criados/alterados:
- `fluency-clean/src/services/lessonPreviewSamples.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-preview-lab.css`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Criado `lessonPreviewSamples.js` com amostras locais temporárias:
  - `listening`;
  - `reading`.
- Adicionado seletor temporário no topo da aba Aula:
  - `Aula real`;
  - `Testar Listening`;
  - `Testar Reading`;
  - `Abrir Speaking`.
- O preview usa samples locais e não substitui a aula real.

## ESTADO ANTERIOR — BLOCO LISTENING RENDER REVIEW

### `BLOCO-LISTENING-RENDER-REVIEW-LAB` — IMPLEMENTADO

Estrutura pedagógica definida para Listening:
1. Ouvir sem ler.
2. Conferir texto/transcrição depois.
3. Fazer prática profunda em tela cheia.
4. Fazer shadowing real.
5. Salvar/concluir com resumo curto.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

Commits:
- `5ec9981e725f0a4d25e871ef98fbaec2f5e4dcf9` — reestrutura renderização da aula Listening.
- `2d1052b9427904965cc53f5f6b6127a464d35865` — polimenta visual Listening no iPhone.

## ESTADO ANTERIOR — GRAMMAR APROVADA NA LAB

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar foi testada no iPhone após o `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB`.
- Usuário confirmou: `tudo ok`.
- A tela Grammar fica considerada aprovada visualmente na branch `rewrite-fluency-clean-lab`.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `HOTFIX-LISTENING-AUDIO-PRACTICE-DEPTH-LAB`: áudio segmentado foi estabilizado para iPhone, TTS fallback agora aguarda fim real, Listening ganhou controle manual por trecho, e a prática profunda de Listening foi adaptada para ser mais focada em escuta, aleatória por dia, e segura para o nível A1. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Grammar aprovada, geração, prompts, modelos ou chaves. Próximo passo: testar no iPhone `Testar Listening`, áudio principal, controle por trecho e prática fullscreen."
