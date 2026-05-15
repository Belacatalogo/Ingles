# HOTFIX 20J — Áudio premium Gemini nas aulas

Branch: `rewrite-fluency-clean-lab`

## Pedido do usuário

O usuário confirmou que não quer áudio do navegador/voz robótica.

Regra definida:

> Tudo que for usar áudio deve usar áudio Gemini natural.

## Escopo

Não criar backend novo.

Não mexer na estrutura de backend.

Reaproveitar a estrutura já existente do sistema.

## Serviço existente encontrado

Arquivo já existente:

- `fluency-clean/src/services/geminiAudioService.js`

Ele já usa:

- `getGeneralAiKeys()`;
- modelo `gemini-2.5-flash-preview-tts`;
- geração de áudio Gemini;
- conversão de áudio PCM/L16 para WAV;
- suporte a vozes Gemini.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Removida voz do navegador

Foi removido o uso de:

- `window.speechSynthesis`;
- `SpeechSynthesisUtterance`.

### 2. Conectado serviço Gemini existente

Adicionado import:

```js
import { generateGeminiAudioBlob } from '../../services/geminiAudioService.js';
```

### 3. Novo player premium no renderizador

Criada função:

```js
playGeminiPremiumAudio(text, style)
```

Essa função:

- chama `generateGeminiAudioBlob`;
- cria URL local temporária do áudio;
- pausa áudio anterior antes de tocar novo;
- reproduz o áudio gerado pelo Gemini.

### 4. Botões atualizados

Botões antes:

- `Ouvir`;
- `Ouvir modelo`.

Agora:

- `Ouvir Gemini`.

### 5. Áreas afetadas

O áudio Gemini foi conectado em:

- Frases-modelo de Speaking;
- Pronúncia e chunks;
- Repita comigo;
- Substitution drills;
- Pergunta e resposta oral;
- Fala guiada;
- Gravação guiada;
- Fala livre curta;
- Shadowing em Listening.

## Comportamento esperado

Ao tocar em `Ouvir Gemini`:

1. o sistema mostra `Gerando áudio Gemini...`;
2. gera áudio natural pelo Gemini usando as chaves gerais já configuradas;
3. reproduz o áudio;
4. mostra `Áudio Gemini reproduzido.`;
5. se não houver key geral, mostra mensagem pedindo configurar a key geral.

## Importante

Não foi adicionada chave no frontend por commit.

O sistema usa as chaves gerais já salvas no próprio app, da mesma forma que a IA Tutor.

## Commit

- `d32f13d388a825284fd3a1a2bbca1f3e5df19419` — usa áudio premium Gemini nas aulas.

## Status

Concluído.
