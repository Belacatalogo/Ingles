# BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Revisar a renderização da aba Speaking e organizar a experiência em um fluxo guiado, sem alterar o motor de gravação, Azure, análise, histórico ou backend privado.

## Arquivos alterados

- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/speaking/speakingFlow.js`
- `fluency-clean/src/speaking/SpeakingStepper.jsx`
- `fluency-clean/src/styles/speaking-stepper-real.css`
- `fluency-clean/src/main.jsx`
- `fluency-clean/docs/BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB.md`

## O que foi feito

### 1. Modelo de fluxo modular

Criado:

`fluency-clean/src/speaking/speakingFlow.js`

Ele define fluxos próprios por modo:

#### Conversa

1. Modo
2. Histórico
3. Cenário
4. Conversa
5. Gravar
6. Concluir

#### Pronúncia

1. Modo
2. Histórico
3. Modelo
4. Pontuação
5. Repetir
6. Avançar

#### Imersão

1. Modo
2. Histórico
3. Cenário
4. Frase
5. Responder
6. Registrar

### 2. Stepper visual próprio

Criado:

`fluency-clean/src/speaking/SpeakingStepper.jsx`

O stepper:

- é específico para Speaking;
- muda conforme o modo ativo;
- é clicável;
- rola para as áreas reais da tela;
- mostra progresso visual;
- não interfere no motor de gravação/análise.

### 3. Integração no SpeakingScreen

Em `SpeakingScreen.jsx`:

- importado `SpeakingStepper`;
- adicionado estado `activeSpeakingStep`;
- criada função `handleModeChange`;
- criada função `jumpToSpeakingStep`;
- adicionados IDs reais nas áreas principais da tela:
  - `speaking-mode-switch`;
  - `speaking-history-area`;
  - `speaking-scenario-area`;
  - `speaking-chat-area`;
  - `speaking-record-area`;
  - `speaking-finish-area`;
  - `speaking-pronunciation-model-area`;
  - `speaking-score-area`;
  - `speaking-pronunciation-actions-area`;
  - `speaking-immersion-scenes-area`;
  - `speaking-immersion-model-area`.

### 4. Estados de etapa conectados sem mexer no motor

Alguns eventos atualizam a etapa ativa:

- trocar modo volta para etapa 1;
- começar conversa ativa etapa `Gravar`;
- concluir conversa ativa etapa `Concluir`;
- próxima frase em Pronúncia ativa etapa `Avançar`;
- gravar Pronúncia/Imersão ativa etapa de resposta/pontuação.

### 5. CSS modular

Criado:

`fluency-clean/src/styles/speaking-stepper-real.css`

Ele adiciona:

- stepper sticky;
- scroll horizontal no iPhone;
- destaque de etapa ativa/concluída;
- `scroll-margin-top` para as áreas reais;
- visual integrado ao dark/premium atual.

Importado em:

`fluency-clean/src/main.jsx`

## O que não foi alterado

- Não foi mexido no backend Azure privado.
- Não foi mexido em `analyzePronunciation`.
- Não foi mexido em `recognizeSpeech`.
- Não foi mexido em `startRecording`.
- Não foi mexido no sistema de histórico real.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi usado DOM injection.
- Não foi criado bundle patch.

## Resultado esperado

A aba Speaking continua com os mesmos modos e funções reais, mas agora com uma organização mais clara:

- Conversa fica guiada por cenário, chat, gravação e conclusão.
- Pronúncia fica guiada por modelo, pontuação e repetição.
- Imersão fica guiada por cenário, frase e resposta.

## Checklist para teste no iPhone

Abrir aba `Speaking`.

Validar:

- stepper aparece no topo da aba Speaking;
- stepper muda quando troca entre Conversa, Pronúncia e Imersão;
- stepper rola horizontalmente no iPhone;
- tocar em cada etapa leva para a área correta;
- trocar modo continua funcionando;
- Conversa continua gravando;
- análise automática continua funcionando;
- histórico continua aparecendo;
- Pronúncia continua com ouvir modelo, gravar, pontuar e próxima frase;
- Imersão continua com cenários, ouvir e gravar;
- não apareceu card técnico;
- não quebrou Azure.

## Próximo bloco recomendado

`BLOCO-VOCAB-TRAIL-CONTINUATION-LAB`

Ou, se o usuário quiser validar tudo antes:

- Testar Reading;
- Testar Grammar;
- Testar Listening;
- Testar Speaking.
