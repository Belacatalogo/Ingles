# BLOCO-LESSON-UI-01 — Flow Shell LAB

Data: 2026-05-14
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado como camada paralela segura.

## Objetivo

Criar a infraestrutura visual e lógica para a nova experiência de aulas por fases, sem substituir imediatamente os renderers atuais.

## O que foi criado

### Figma / FigJam

Foi criado um FigJam com o mapa geral da nova arquitetura de UI das aulas:

- Aula do dia
- LessonFlowRouter
- LessonFlowShell
- Fase atual
- Ação principal
- Tentativa do aluno
- Feedback/liberação
- Próxima fase
- Prática Profunda complementar
- Mastery Gate por pilar

Link gerado pelo Figma:

- `https://www.figma.com/board/6tQgLqE6YgNvdjT2OdrKN0`

### Código

Arquivos criados:

- `fluency-clean/src/lessons/flow/LessonFlowShell.jsx`
- `fluency-clean/src/lessons/flow/LessonFocusHeader.jsx`
- `fluency-clean/src/lessons/flow/LessonPhaseStepper.jsx`
- `fluency-clean/src/lessons/flow/LessonPhaseCard.jsx`
- `fluency-clean/src/lessons/flow/LessonActionFooter.jsx`
- `fluency-clean/src/lessons/flow/useLessonFlowState.js`
- `fluency-clean/src/lessons/flow/lessonFlowProgress.js`
- `fluency-clean/src/lessons/flow/lesson-flow.css`
- `fluency-clean/src/lessons/flow/index.js`
- `fluency-clean/src/lessons/flow/components/AttemptBox.jsx`

## Decisão de implementação

A camada nova foi criada em paralelo.

Nada foi conectado ainda ao `LessonScreen.jsx` ou ao `StaticLessonRenderer.jsx`, para evitar trocar todos os pilares de uma vez e quebrar a aula atual.

## Como funciona

`LessonFlowShell` recebe:

```jsx
<LessonFlowShell lesson={lesson} phases={phases} />
```

Cada fase pode ter:

```js
{
  id: 'main-text',
  title: 'Texto principal',
  shortTitle: 'Texto',
  goal: 'Leia sem responder ainda.',
  description: 'Foque no sentido geral antes das perguntas.',
  requiresAttempt: false,
  component: MyPhaseComponent,
}
```

O shell controla:

- fase atual;
- progresso percentual;
- etapas visitadas;
- tentativas registradas;
- mensagem de bloqueio;
- avanço/volta;
- footer mobile-first.

## Componentes criados

### `LessonFlowShell`

Responsável por montar:

- header de foco;
- barra de progresso;
- stepper horizontal;
- fase atual;
- footer de ação.

### `LessonFocusHeader`

Mostra:

- nível;
- pilar;
- progresso;
- título da aula;
- meta da fase atual.

### `LessonPhaseStepper`

Stepper horizontal mobile-first.

### `LessonPhaseCard`

Card único da fase atual.

### `LessonActionFooter`

Footer sticky com:

- voltar;
- mensagem da etapa;
- continuar/finalizar.

### `useLessonFlowState`

Hook que controla:

- fase ativa;
- tentativas;
- revelações futuras;
- progresso;
- bloqueio de avanço.

### `AttemptBox`

Componente simples para registrar tentativa textual.

Será usado principalmente em Reading, Writing e tarefas de compreensão.

## O que NÃO foi feito

- Não alterei `LessonScreen.jsx`.
- Não alterei `StaticLessonRenderer.jsx`.
- Não substituí nenhum pilar ainda.
- Não mexi em `main.jsx`.
- Não mexi em `bundle.js`.
- Não mexi em Azure/Firebase/backend.
- Não mexi no sistema de gravação.

## Observação técnica

O CSS novo é importado por `LessonFlowShell.jsx`:

```js
import './lesson-flow.css';
```

Isso evita voltar a poluir `main.jsx` com muitos imports.

## Pendências intencionais

- Criar `ReadingLessonFlow.jsx` no próximo bloco.
- Conectar Reading de forma condicional/segura.
- Criar componente de reveal/transcript no contexto do Reading/Listening para evitar componente genérico bloqueado pela ferramenta.
- Fazer build depois da primeira integração real.

## Próximo bloco recomendado

`BLOCO-LESSON-UI-02-READING-FLOW-LAB`

Objetivo:
- usar o `LessonFlowShell` em Reading;
- isolar texto principal;
- separar primeira compreensão, segunda leitura, evidência, resumo e produção;
- manter Prática Profunda como complemento posterior;
- não quebrar outros pilares.

## Critérios de aceitação do próximo bloco

- Reading não deve aparecer como rolagem infinita.
- Texto principal deve ficar em fase própria.
- Perguntas só aparecem depois da leitura.
- Resumo/produção conectada devem ficar em fases próprias.
- Gabaritos/modelos só aparecem depois da tentativa.
