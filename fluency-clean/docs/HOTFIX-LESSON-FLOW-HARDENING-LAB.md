# HOTFIX — Lesson Flow Hardening LAB

Data: 2026-05-16
Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário relatou problemas na aba de aulas:

- perguntas aparecendo já com respostas/modelos;
- rolagem muito longa;
- aula parecendo pesada e desorganizada no iPhone.

Durante a análise, `ReadingLesson.jsx` mostrou que os painéis da aula eram renderizados todos de uma vez e dependiam de CSS para parecerem um stepper. Também havia exercícios internos exibindo `Resposta esperada`, `Trecho de apoio` e `Modelo` antes da interação do aluno.

## Arquivos alterados

- Criado: `fluency-clean/src/styles/lesson-flow-hardening.css`
- Alterado: `fluency-clean/src/main.jsx`

## O que o hotfix faz

- Importa uma folha CSS modular para correções da aba de aulas.
- Exibe somente o painel ativo de Reading usando `data-reading-step-active='true'`.
- Mantém o stepper sticky e rolável horizontalmente no mobile.
- Esconde dicas de resposta/gabarito/modelo dentro de `.reading-mini-exercise` antes da interação.
- Reduz altura excessiva de textareas para evitar página enorme no iPhone.
- Não mexe em `bundle.js`.
- Não usa DOM injection.
- Não toca em Firebase, Azure, backend privado, `speakingFlow.js`, `SpeakingStepper.jsx` ou `SpeakingScreen.jsx`.

## Observação importante

Este é um hotfix visual/estrutural seguro para aliviar imediatamente os sintomas. A correção definitiva deve acontecer em `BLOCO-STATIC-06-RENDERERS-STABLE`, ajustando os renderizadores para:

- não renderizar gabaritos antes da tentativa;
- controlar respostas por estado real de interação;
- manter aula em fluxo guiado por etapa;
- funcionar com o schema fixo premium A1 → C2.

## Smoke test recomendado

1. Abrir uma aula Reading no iPhone.
2. Confirmar que apenas a etapa atual aparece.
3. Tocar nas etapas do stepper e verificar se a navegação continua funcionando.
4. Verificar se exercícios internos não mostram modelo/resposta antes da tentativa.
5. Conferir se a produção curta não cria rolagem gigante.
