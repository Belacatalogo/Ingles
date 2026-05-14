# BLOCO 20G — Limpeza parcial da interface mantendo atalhos de teste

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Limpar a interface da tela de aula sem remover a aba temporária de testes por pilar, pois ela ainda é necessária para o usuário validar os erros de Grammar, Vocabulary, Reading, Listening, Speaking e Writing.

## Regra definida pelo usuário

Não remover a área de testes enquanto ainda estamos corrigindo as aulas.

Deve permanecer:

- botão para testar Grammar;
- botão para testar Vocabulary;
- botão para testar Reading;
- botão para testar Listening;
- botão para testar Speaking;
- botão para testar Writing;
- preview visual por pilar;
- mensagem informando que o preview não altera o cronograma real.

## Arquivo alterado

- `fluency-clean/src/screens/LessonScreen.jsx`

## Correções aplicadas

### 1. Atalhos mantidos, mas renomeados

Antes:

- `Atalhos do curso fixo`;
- `Abrir Grammar fixo`;
- `Abrir Vocabulary fixo`;
- etc.

Agora:

- `Testar aulas por pilar`;
- `Testar Grammar`;
- `Testar Vocabulary`;
- `Testar Reading`;
- `Testar Listening`;
- `Testar Speaking`;
- `Testar Writing`.

A função continua a mesma: abrir previews visuais para encontrar erros.

### 2. Mensagem de teste mais clara

Antes:

- texto indicava área de teste visual, mas ainda parecia muito técnico.

Agora:

- `Área temporária para encontrar erros. Não altera o cronograma real.`

### 3. Mensagem de preview ajustada

Antes:

- `Preview visual aberto...`

Agora:

- `Modo teste aberto... Isso não conta como aula feita e não altera o cronograma real.`

### 4. Chips técnicos reduzidos

Foram removidos da área principal do aluno:

- `IndexedDB completo`;
- exibição direta de schema;
- contrato técnico;
- qualidade numérica no card principal.

A tela ainda informa:

- curso fixo premium;
- aula salva;
- nível;
- pacote, quando existir;
- tempo estimado;
- quantidade de exercícios.

### 5. Texto da aula fixa simplificado

Antes:

- `static schema · exercícios internos antes da Prática Profunda`.

Agora:

- `Aula fixa validada`;
- `Exercícios internos antes da prática extra.`

### 6. Prática complementar renomeada

Antes:

- `Prática Profunda complementar`.

Agora:

- `Prática extra da aula`.

Motivo:

- texto mais simples para o aluno;
- menos aparência técnica.

## O que não foi removido

- aba de teste por pilar;
- botões de teste;
- preview visual;
- painel de qualidade para aulas geradas antigas, pois ainda pode ajudar na fase de correção;
- botão de atualizar aula.

## Resultado prático

A tela fica mais limpa para estudar, mas ainda mantém o painel necessário para testar rapidamente os pilares enquanto os blocos de correção continuam.

## Status

Concluído.

## Próximo bloco

`BLOCO 20H — Renderização ponderada final por pilar`

Foco:

- consolidar a regra final por pilar;
- garantir que Reading, Listening, Speaking, Writing, Grammar e Vocabulary mantenham ordem própria;
- evitar regressão de renderização.

## Commit

- `d41907db1e618457f527dab02c8dad4d70b6aa8c` — limpa interface mantendo atalhos de teste.
