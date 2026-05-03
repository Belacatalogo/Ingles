# BLOCO-READING-7 — Evidência textual inteligente

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementação inicial segura aplicada na branch LAB.

## Objetivo

Melhorar a leitura das evidências textuais na aba Reading, deixando o trecho de prova mais claro para o aluno sem poluir a aula.

## Arquivos alterados

- `fluency-clean/src/styles/reading-complete-render-review.css`
- `fluency-clean/docs/BLOCO-READING-7-EVIDENCIA-TEXTUAL-INTELIGENTE-LAB.md`

## O que foi feito

### 1. Evidência em formato de cartão de prova

O feedback de uma questão com evidência textual agora fica visualmente mais claro:

- borda esverdeada discreta;
- fundo de apoio;
- ícone visual de conferência;
- texto auxiliar orientando o aluno a usar aquele trecho para conferir a resposta.

### 2. Preparação visual para âncoras de texto

Foram adicionados estilos para parágrafos-alvo do texto principal:

- `p:target`;
- `.reading-evidence-target`.

Quando o trecho for ancorado por código no próximo ajuste funcional, o parágrafo correspondente poderá ganhar:

- borda destacada;
- fundo de evidência;
- selo `Trecho de prova`.

### 3. Sem poluir a aula

- Nenhum card técnico foi adicionado.
- O card `Aula segura` continua discreto.
- O stepper da Reading permanece intacto.
- Os exercícios internos permanecem dentro de `Compreensão`.

## Observação importante

Este bloco aplicou a parte visual segura da evidência inteligente. A parte funcional de botão/âncora direta para o parágrafo exato deve ser finalizada em um próximo hotfix ou continuação do bloco, alterando `ReadingLesson.jsx` para:

- marcar cada parágrafo com `id` estável;
- descobrir qual parágrafo contém a evidência;
- permitir que o botão de evidência role até o parágrafo correto;
- aplicar temporariamente `.reading-evidence-target`.

## O que não foi feito ainda

- Ainda não foi criado botão funcional `Ir ao trecho` dentro de cada questão.
- Ainda não foi criada lógica de localizar o parágrafo pelo texto da evidência.
- Ainda não foi aplicado highlight temporário via estado React.

## Checklist para teste no iPhone

Usar `Testar Reading`.

Validar:

- responder uma questão com evidência;
- ver se o trecho de apoio aparece mais claro;
- confirmar que não aparece antes da resposta;
- confirmar que o visual não polui a tela;
- confirmar que stepper, exercícios internos e conclusão continuam funcionando.

## Próxima continuação recomendada

`HOTFIX-READING-7-ANCHOR-EVIDENCE-LAB`

Objetivo:

- adicionar botão funcional para levar ao parágrafo que contém a evidência;
- destacar temporariamente o parágrafo do texto principal;
- manter tudo dentro do React, sem DOM injection e sem bundle patch.
