# BLOCO-READING-5 — Render por etapas

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Transformar a aba Reading em uma experiência guiada por etapas reais, sem esconder conteúdo importante e sem poluir a tela com detalhes técnicos.

## Arquivos alterados

- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/styles/reading-complete-render-review.css`
- `fluency-clean/docs/BLOCO-READING-5-RENDER-POR-ETAPAS-LAB.md`

## O que foi feito

### 1. Stepper real da Reading

A aula agora possui navegação por etapas:

1. Começar
2. Pré-leitura
3. Texto
4. Ideia geral
5. Vocabulário
6. Compreensão
7. Produção
8. Concluir

### 2. Etapa ativa

- Criado estado `activeStep` em `ReadingLesson.jsx`.
- O stepper mostra a etapa atual.
- Etapas anteriores ficam marcadas como concluídas visualmente.
- Ao concluir a aula, a etapa ativa passa para `Concluir`.

### 3. Navegação suave

- Cada etapa tem `id` próprio.
- Clicar em uma etapa rola a tela até o bloco correspondente.
- Botões de continuidade foram adicionados:
  - `Continuar para o texto`
  - `Responder ideia geral`
  - `Estudar vocabulário`
  - `Responder compreensão`
  - `Ir para produção curta`

### 4. Sem esconder conteúdo

- O conteúdo continua visível na página.
- O stepper organiza a leitura e guia o aluno, mas não transforma a aula em tela travada.
- Isso evita confusão no iPhone e permite revisar qualquer parte da aula.

### 5. Estilos mobile-first

Em `reading-complete-render-review.css`:
- stepper sticky no topo da Reading;
- scroll horizontal no iPhone;
- destaque discreto da etapa ativa;
- botões de próxima etapa com visual premium, mas sem poluição;
- `scroll-margin-top` para não esconder o título atrás do stepper.

## O que não foi feito neste bloco

- Não foi criado quality gate ainda.
- Não foi alterada a geração IA além do bloco anterior.
- Não foram criados novos tipos de exercício.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Próximo bloco recomendado

`BLOCO-READING-6 — Exercícios internos da aba Reading`

Objetivo:
- Fortalecer os exercícios próprios dentro da aba Reading.
- Separar tipos de exercício por nível e habilidade.
- Melhorar verdadeiro/falso com evidência, copiar trecho, completar frase, sequência e resposta curta.

## Checklist para teste no iPhone

Usar `Testar Reading`.

Validar:
- o stepper aparece com 8 etapas;
- o stepper não ocupa tela demais;
- no iPhone, o stepper rola horizontalmente;
- clicar em uma etapa leva para o bloco correto;
- os botões `Continuar para...` avançam para a próxima etapa;
- texto, vocabulário, perguntas e produção continuam visíveis;
- responder perguntas ainda funciona;
- `Salvar rascunho` ainda funciona;
- `Concluir Reading` ainda funciona;
- ao concluir, o progresso mostra aula concluída;
- a Prática Profunda continua abaixo da Reading como complemento;
- não apareceu nenhum card técnico de contrato/política.
