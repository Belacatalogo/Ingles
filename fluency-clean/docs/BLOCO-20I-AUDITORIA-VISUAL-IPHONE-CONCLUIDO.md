# BLOCO 20I — Auditoria visual no iPhone

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Melhorar a usabilidade visual das aulas no iPhone depois das correções de renderização por pilar.

Foco:

- textareas maiores;
- botões com área de toque melhor;
- cards menos apertados;
- rolagem segura acima da barra inferior;
- atalhos de teste mais confortáveis;
- stepper da aula mais usável no mobile.

## Arquivo alterado

- `fluency-clean/src/styles/deep-lesson-mobile.css`

## Correções aplicadas

### 1. Textareas maiores e mais confortáveis

Foram ajustados:

- `static-practice-card textarea`;
- `static-question-card textarea`;
- `static-writing-answer-card textarea`.

Melhorias:

- largura 100%;
- fonte 16px para evitar zoom automático no iPhone;
- altura mínima maior;
- padding maior;
- borda mais confortável;
- scroll-margin para não ficar escondido pela barra inferior.

### 2. Writing com área maior

`static-writing-answer-card textarea` recebeu altura mínima maior, porque Writing precisa de espaço real para rascunho e versão final.

### 3. Botões mais fáceis de tocar

Ajustados:

- botões de alternativas;
- botão de revelar transcript;
- botão de fala;
- botões da aba de teste por pilar.

Melhorias:

- `touch-action: manipulation`;
- remoção de highlight de toque no iOS;
- altura mínima maior;
- raio de borda mais confortável.

### 4. Cards com melhor respiro

No mobile, os cards principais receberam:

- padding levemente maior;
- gap maior;
- bordas mais suaves;
- melhor espaçamento interno.

Isso melhora Reading, Listening, Speaking, Writing, Grammar e Vocabulary.

### 5. Aba de testes por pilar preservada e melhorada

A área de teste por pilar foi mantida.

No mobile:

- os botões ficam em grid de 2 colunas;
- em telas muito estreitas, viram 1 coluna;
- botões ganham altura mínima melhor.

### 6. Stepper da aula melhorado

No mobile:

- o stepper fica sticky no topo;
- botões ficam roláveis horizontalmente;
- área de toque maior;
- evita perder a navegação durante a rolagem.

### 7. Proteção contra barra inferior

Aumentado o padding/scroll-padding inferior para evitar que textareas, botões e cards finais fiquem cobertos pela navegação inferior no iPhone.

### 8. Textos longos mais legíveis

Foram ajustados:

- line-height;
- white-space no texto principal;
- fonte dos cards;
- fonte de small/muted.

## Resultado prático

As aulas ficam mais confortáveis no iPhone para:

- responder Reading;
- escrever Writing;
- digitar fallback de Speaking;
- fazer dictation em Listening;
- tocar opções de Grammar/Vocabulary.

## Status

Concluído.

## Próximo bloco

`BLOCO 20J — QA final com aulas reais`

Foco:

- testar aulas reais A1/A2 por pilar;
- verificar se as correções não quebraram renderização;
- documentar problemas restantes;
- definir próximos ajustes antes de B1/A1 refinement.

## Commit

- `569cf023dd8dd785cb108911166509680d56d34a` — melhora usabilidade mobile das aulas.
