# BLOCO-READING-1 — Estrutura pedagógica fixa da aba Reading

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Decisão pedagógica

A aba Reading passa a ser uma aula completa por si só.

A Prática Profunda não substitui a Reading. Ela aparece depois como complemento para reforçar vocabulário, detalhes e interpretação.

## O que foi alterado

### `fluency-clean/src/lessons/ReadingLesson.jsx`

- Adicionada estrutura oficial de aula Reading:
  1. Objetivo
  2. Pré-leitura
  3. Texto principal
  4. Ideia geral
  5. Vocabulário em contexto
  6. Compreensão e evidência
  7. Produção curta
  8. Conclusão
- Adicionado card visual da ordem oficial da aula.
- Adicionada seção `Pré-leitura` antes do texto.
- Separada a primeira questão como `Ideia geral`.
- Mantidas as demais questões em `Compreensão com evidência textual`.
- Adicionado componente interno `QuestionCard` para padronizar render de perguntas.
- Adicionados rótulos de habilidade: ideia geral, detalhe, vocabulário, sequência, evidência e inferência.
- Adicionado fechamento informando que a Prática Profunda é complementar.
- Mantido fallback para aulas antigas que ainda não possuem `preReading` ou `readingQuestions`.

### `fluency-clean/src/screens/LessonScreen.jsx`

- Adicionado `PracticeMount`.
- Para aulas que não são Reading, a Prática Profunda continua aparecendo antes do render da aula, como estava.
- Para aulas Reading, a Prática Profunda agora aparece depois do render da aula, como complemento.
- Adicionado card explicando que a Prática Profunda complementar deve ser feita depois da aula Reading.

### `fluency-clean/src/styles/reading-complete-render-review.css`

- Adicionados estilos para:
  - fluxo oficial da aula Reading;
  - pré-leitura;
  - card de ideia geral;
  - card pós-aula;
  - montagem complementar da Prática Profunda.

## O que não foi feito neste bloco

- Não foi alterada a geração IA ainda.
- Não foi criado contrato JSON próprio de Reading ainda.
- Não foi criada política A1→C1 ainda.
- Não foi mexido no `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Próximo bloco recomendado

`BLOCO-READING-2 — Política por nível A1→C1`

Objetivo do próximo bloco:
- Criar uma política formal de Reading por nível do aluno.
- Definir tamanho do texto, idioma das perguntas, habilidades permitidas e grau de suporte em português para A1, A2, B1, B2 e C1.

## Checklist para teste no iPhone

- Abrir `Testar Reading` na aba Aula.
- Confirmar que aparece a ordem oficial da aula Reading.
- Confirmar que existe seção `Pré-leitura` antes do texto.
- Confirmar que o texto principal continua renderizando.
- Confirmar que a primeira questão aparece em `Ideia geral`.
- Confirmar que as demais aparecem em `Compreensão com evidência textual`.
- Confirmar que a produção curta continua funcionando.
- Confirmar que `Concluir Reading` salva progresso.
- Confirmar que a Prática Profunda aparece abaixo da aula Reading como complemento.
