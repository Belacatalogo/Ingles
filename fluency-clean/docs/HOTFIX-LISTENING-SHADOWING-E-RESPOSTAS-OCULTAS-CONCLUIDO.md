# HOTFIX — Listening: respostas ocultas e shadowing com áudio

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído.

## Problemas observados

1. As seções de primeira e segunda escuta estavam exibindo respostas junto com as perguntas.
2. A seção Shadowing mostrava frases para repetir, mas não tinha botão de áudio por frase.

## O que foi corrigido

### 1. Respostas escondidas nas tarefas de escuta

O normalizador visual agora separa campos principais de campos de apoio.

Para tarefas como:

- `firstListenTasks`;
- `secondListenTasks`;
- `guidedBeforeQuiz`;
- `guidedDiscovery`;
- `listeningPreparation`;
- `lessonRecap`;
- `selfAssessment`.

A tela exibe apenas o prompt principal, sem colar respostas/explicações no mesmo card.

Exemplo esperado:

```txt
Sem transcript: quantas pessoas falam?
```

E não:

```txt
Sem transcript: quantas pessoas falam? — Duas pessoas.
```

### 2. Serviço compartilhado de áudio Gemini

Arquivo criado:

`fluency-clean/src/services/geminiAudioService.js`

Ele centraliza:

- leitura das keys gerais de IA;
- chamada ao Gemini TTS;
- conversão PCM/L16 para WAV;
- geração de áudio de listening;
- geração de áudio de shadowing;
- suporte a diálogo com múltiplas vozes.

### 3. Player principal refatorado

Arquivo alterado:

`fluency-clean/src/components/lesson/ListeningTextPlayer.jsx`

Agora ele usa o serviço compartilhado, evitando duplicação.

### 4. Shadowing com áudio natural por frase

Arquivo criado:

`fluency-clean/src/components/lesson/ListeningShadowingPractice.jsx`

A seção adiciona:

- frase atual;
- botão `Preparar frase`;
- player nativo para tocar a frase;
- botão `Próxima frase`;
- botão `Parar`.

O fluxo evita autoplay bloqueado no iPhone: primeiro prepara o áudio, depois o aluno toca no player.

### 5. Conexão na tela de aula

Arquivo alterado:

`fluency-clean/src/screens/LessonScreen.jsx`

A tela agora mostra o shadowing com áudio em aulas Listening.

## Arquivos envolvidos

Criados:

- `fluency-clean/src/services/geminiAudioService.js`
- `fluency-clean/src/components/lesson/ListeningShadowingPractice.jsx`
- `fluency-clean/docs/HOTFIX-LISTENING-SHADOWING-E-RESPOSTAS-OCULTAS-CONCLUIDO.md`

Alterados:

- `fluency-clean/src/components/lesson/ListeningTextPlayer.jsx`
- `fluency-clean/src/services/staticLessonDisplayNormalizer.js`
- `fluency-clean/src/screens/LessonScreen.jsx`

## O que este hotfix não fez

- Não mexeu em Azure.
- Não mexeu em Firebase.
- Não mexeu em Speaking real.
- Não alterou conteúdo original salvo.
- Não colocou informações técnicas na tela do aluno.

## Próximo bloco recomendado

Depois de validar no iPhone:

## BLOCO 11A — A1.3 Daily Routine profundo

Continuar a criação das aulas profundas do curso.
