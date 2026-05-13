# BLOCO — Validação visual completa da prova A1 no iPhone

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação visual e ajuste inicial de UX limpa da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-REVISAO-MANUAL-SPEAKING-WRITING-CONCLUIDO.md`

## Objetivo

Revisar a prova final do A1 pensando em uso no iPhone, com foco em:

- textos humanos;
- mensagens não técnicas;
- clareza para o aluno;
- preservação do bloqueio do A2;
- sem mexer no sistema real de Speaking.

## Arquivo alterado

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

## Ajustes feitos

### 1. Texto de Listening

Antes:

```txt
Nesta primeira versão, a escuta ainda usa perguntas do roteiro. O áudio real será ligado em outro bloco.
```

Depois:

```txt
Por enquanto, responda com base nas informações desta etapa. O áudio será adicionado depois.
```

Motivo:

Remover termos de versão/roteiro e deixar a orientação mais limpa para o aluno.

### 2. Texto de Speaking

Antes:

```txt
Grave sua resposta fora desta etapa por enquanto e escreva aqui um resumo do que você falou. A gravação real será ligada depois.
```

Depois:

```txt
Fale sua resposta em voz alta e escreva aqui um resumo do que você falou. A gravação direta será adicionada depois.
```

Motivo:

Evitar parecer que o aluno precisa sair obrigatoriamente do sistema para gravar algo.

### 3. Título da revisão

Antes:

```txt
Revisão local
```

Depois:

```txt
Revisão da resposta
```

Motivo:

Remover o termo técnico `local` da tela do aluno.

## Estado visual esperado no iPhone

A prova deve manter:

- cards em coluna no mobile;
- abas horizontais com rolagem;
- campos de resposta com toque confortável;
- textarea grande para Writing;
- nota e comentário dentro de uma caixa separada;
- mensagens curtas e humanas;
- botão de prova bloqueada quando critérios não forem cumpridos.

## Garantias mantidas

- A2 continua bloqueado se faltar qualquer critério.
- Speaking real não foi alterado.
- Writing real permanece local/simples.
- Nenhum backend foi ativado.
- Nenhum Firebase/Azure/Gemini/Cloudinary foi ativado.
- Nenhuma informação técnica foi adicionada à UI.

## Arquivos não alterados

- `speakingFlow.js`
- `SpeakingStepper.jsx`
- `SpeakingScreen.jsx`
- `bundle.js`
- backend Azure privado

## O que ainda falta

- testar no preview real do Vercel em um iPhone;
- implementar player real de Listening;
- implementar gravação real de Speaking;
- criar checkpoints reais renderizáveis;
- validar fluxo completo A1 → A2 com dados reais.

## Próximo bloco recomendado

## Checkpoints reais renderizáveis A1 — modelo e UI shell

Objetivo:

- transformar os checkpoints do A1 em telas reais;
- iniciar por modelo + shell simples;
- registrar notas localmente em bloco posterior;
- atualizar critérios do A1 depois.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-PROVA-A1-IPHONE-CONCLUIDO.md

Próximo bloco: Checkpoints reais renderizáveis A1 — modelo e UI shell.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
