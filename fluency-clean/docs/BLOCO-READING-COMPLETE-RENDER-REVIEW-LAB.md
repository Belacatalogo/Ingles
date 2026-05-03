# BLOCO-READING-COMPLETE-RENDER-REVIEW-LAB

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Validação inicial obrigatória

Antes do bloco, o `REWRITE_HANDOFF.md` foi lido e validado.

Resultado da validação do hotfix de Cards:
- O handoff registra que o botão duplicado `Flashcards da aula` dentro de `Tópicos por nível` foi removido por CSS.
- O handoff também registra que ainda falta validação manual no iPhone depois do deploy.
- Foi respeitada a regra de manter apenas o botão superior `Flashcards da aula` ao lado de `Trilha de vocabulário`.

## Arquivos alterados

- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/styles/reading-complete-render-review.css`
- `fluency-clean/src/main.jsx`

## O que foi feito

- Reestruturado o render de Reading para `reading-lesson-v3`.
- Mantido fluxo modular sem mexer em `bundle.js`.
- Mantido backend Azure privado intocado.
- Criado render mobile-first com:
  - card de introdução;
  - objetivo real;
  - trilha de habilidades: ideia geral, evidência e contexto;
  - passos de estudo;
  - texto principal numerado por parágrafo;
  - áudio opcional compatível com clique no iPhone;
  - card de render seguro;
  - vocabulário em contexto;
  - compreensão com evidência textual;
  - produção curta final.
- Criada normalização mais tolerante para textos de Reading vindos de:
  - `readingText`;
  - `text`;
  - `story`;
  - `article`;
  - `passage`;
  - `listeningText`;
  - seções com título relacionado a texto/reading/passage/story.
- Criada limpeza de texto para reduzir pontuação grudada e markdown bruto.
- Criada proteção contra perguntas genéricas ou quebradas.
- Criada proteção para impedir pergunta contendo a própria resposta.
- Criada deduplicação de alternativas.
- Adicionada evidência textual quando a aula fornece `evidence`, `quote`, `reference`, `explanation` ou quando a resposta pode ser encontrada no texto.
- Evitado vazamento visual de resposta correta antes do clique: agora só o botão selecionado recebe estado de correto/incorreto.
- Mantidos botões `Salvar rascunho` e `Concluir Reading` com progresso salvo.

## Observações importantes

- A integração com a prática profunda não foi alterada neste bloco, porque o bloco de correção profunda da prática deve aguardar o modelo que o usuário ainda vai enviar.
- A busca pelo arquivo `PracticePlanAdapter.js` não retornou resultado pelo nome citado no handoff; por isso não foi feita alteração nesse ponto agora.
- O bloco foi feito em commits separados por arquivo através da API do GitHub, não em commit único. O conteúdo ficou restrito à branch LAB.

## Próximo bloco na ordem definida

`BLOCO-SPEAKING-COMPLETE-RENDER-REVIEW-LAB`

## Checklist para teste no iPhone

- Abrir preview da branch `rewrite-fluency-clean-lab`.
- Abrir uma aula Reading real gerada pela IA.
- Confirmar se o texto principal aparece dividido e legível.
- Confirmar se vocabulário aparece em contexto.
- Confirmar se as perguntas não mostram resposta antecipada.
- Confirmar se, após selecionar uma opção, aparece feedback com evidência textual quando disponível.
- Confirmar se o botão `Ouvir texto` toca no iPhone.
- Confirmar se `Salvar rascunho` mantém o texto.
- Confirmar se `Concluir Reading` salva progresso.
- Confirmar novamente se o botão duplicado `Flashcards da aula` não aparece dentro de `Tópicos por nível`.
