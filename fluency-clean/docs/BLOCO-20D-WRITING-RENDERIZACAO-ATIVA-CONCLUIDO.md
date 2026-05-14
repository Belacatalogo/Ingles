# BLOCO 20D — Writing completo

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir a experiência das aulas de Writing para que elas deixem de ser cards passivos e passem a exigir produção escrita real.

Problema reportado pelo usuário:

- aula de Writing precisava ter campo real de escrita;
- rascunho e versão final não podiam aparecer apenas como instruções;
- checklist precisava ficar entre rascunho e versão final;
- modelos esperados não podem aparecer antes da tentativa.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Novo componente interno: `WritingAttemptList`

Criado dentro de `StaticLessonRenderer.jsx`.

Função:

- renderizar tarefas de escrita com `textarea` maior;
- contar palavras digitadas;
- permitir meta mínima de palavras;
- registrar tentativa do aluno;
- esconder modelo esperado antes da tentativa;
- mostrar orientação de revisão após o aluno escrever.

### 2. Deep Writing atualizado

`DeepWritingLesson` agora segue uma ordem mais correta:

1. Hero da aula;
2. Core flow;
3. Modelo de texto;
4. Como o modelo é construído;
5. Blocos úteis;
6. Gramática para escrever;
7. Frases úteis;
8. Substituição guiada;
9. Erros comuns;
10. **Rascunho com textarea real**;
11. **Checklist de revisão**;
12. **Versão final com textarea real**;
13. Produções extras, se existirem;
14. Revisão final;
15. Conclusão.

### 3. Rascunho agora é campo real

Antes:

- `draftTask` era renderizado como produção genérica/card.

Agora:

- `draftTask` usa `WritingAttemptList`;
- tem textarea com placeholder próprio;
- tem meta mínima de palavras;
- registra tentativa.

### 4. Versão final agora é campo real

Antes:

- `finalVersionTask` ou `revisionTask` apareciam como produção genérica.

Agora:

- aparecem em `WritingAttemptList` com textarea próprio;
- ficam depois do checklist;
- pedem versão revisada.

### 5. Checklist no lugar correto

O checklist foi mantido entre:

- rascunho;
- versão final.

Isso força o aluno a escrever, revisar e só depois entregar a versão final.

### 6. Static Writing legado também melhorado

`StaticWritingLesson` agora possui:

- modelo;
- blocos úteis;
- substituição guiada;
- gramática para escrever;
- rascunho com textarea;
- checklist;
- versão final com textarea.

## Resultado prático

Aula de Writing agora deixa de ser apenas leitura/instrução e passa a ter produção escrita real.

## Escopo intencional

Este bloco focou Writing.

Ainda ficam para os próximos blocos:

- Listening com dictation e compreensão mais interativos;
- Grammar/Vocabulary e limpeza de campos crus;
- limpeza da interface da aula;
- renderização ponderada final por pilar;
- auditoria iPhone;
- QA final com aulas reais.

## Status

Concluído.

## Próximo bloco

`BLOCO 20E — Listening completo`

Foco:

- ouvir primeiro;
- transcript depois;
- dictation com campo real;
- compreensão auditiva respondível;
- produção oral ativa.

## Commit

- `fce3d7526994da0d6dbd1f3e30b0df2f09cf3a91` — torna Writing ativo com rascunho e versão final.
