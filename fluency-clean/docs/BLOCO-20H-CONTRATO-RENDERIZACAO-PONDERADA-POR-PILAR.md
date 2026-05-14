# BLOCO 20H — Renderização ponderada final por pilar

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Consolidar a regra final de renderização por pilar para evitar regressão depois das correções feitas nos blocos 20B a 20G.

A partir deste bloco, qualquer mudança futura em `StaticLessonRenderer.jsx` precisa respeitar a função principal de cada pilar.

## Regra principal

Cada aula deve ser renderizada de acordo com o pilar, não apenas como uma lista genérica de cards.

| Pilar | Prioridade da aula |
|---|---|
| Grammar | entender estrutura, ver exemplos, praticar transformação/correção/produção |
| Vocabulary | aprender palavras/chunks, reconhecer, usar em contexto e produzir frases |
| Reading | ler texto cedo, responder compreensão, buscar evidência e resumir |
| Listening | ouvir primeiro, responder, fazer dictation, só depois revelar transcript |
| Speaking | falar de verdade ou registrar fallback escrito |
| Writing | escrever rascunho, revisar e entregar versão final |

## Contrato por pilar

### Grammar

Ordem esperada:

1. Objetivo da aula;
2. Por que isso importa;
3. Conceito central;
4. Como formar;
5. Quando usar;
6. Quando não usar;
7. Exemplos comentados;
8. Erros comuns;
9. Prática controlada;
10. Agora tente sozinho;
11. Correção de erro;
12. Transformação;
13. Tradução controlada;
14. Produção própria;
15. Revisão final.

Regras obrigatórias:

- gabarito/modelo não aparece antes da tentativa;
- correção de erro deve ser interativa;
- transformação deve ser interativa;
- tradução controlada deve ser interativa;
- não exibir campos técnicos como `subject`, `expected`, `answer`.

### Vocabulary

Ordem esperada:

1. Objetivo da aula;
2. Contexto real;
3. Palavras essenciais;
4. Chunks úteis;
5. Exemplos em frases;
6. Mini diálogos quando houver;
7. Confusões perigosas quando houver;
8. Combinações naturais quando houver;
9. Reconhecimento;
10. Uso em contexto;
11. Produção com vocabulário;
12. Revisão final.

Regras obrigatórias:

- vocabulário não pode ser apenas lista;
- precisa haver uso em contexto;
- produção deve ter campo real;
- chunks devem ser destacados;
- não exibir objetos crus.

### Reading

Ordem esperada:

1. Objetivo de leitura;
2. Vocabulário antes do texto;
3. Estratégia de leitura;
4. Texto principal;
5. Primeira leitura com campo;
6. Segunda leitura com campo;
7. Perguntas com evidência;
8. Vocabulário pelo contexto;
9. Resumo e produção;
10. Revisão final.

Regras obrigatórias:

- texto principal não pode ficar no final;
- perguntas não podem aparecer sem campo/resposta;
- modelo esperado aparece somente após tentativa;
- resumo deve ser interativo.

### Listening

Ordem esperada:

1. Antes de ouvir;
2. Palavras para tentar ouvir;
3. Primeira escuta sem texto;
4. Segunda escuta com foco;
5. Compreensão auditiva;
6. Dictation;
7. Shadowing;
8. Transcript revelado por botão;
9. Produção oral curta;
10. Revisão final.

Regras obrigatórias:

- transcript não aparece direto;
- transcript fica atrás de botão;
- dictation deve ser respondível;
- primeira e segunda escuta devem ter campo de tentativa;
- produção oral deve usar fala ou fallback escrito.

### Speaking

Ordem esperada:

1. Situação de fala;
2. Frases-modelo;
3. Pronúncia e chunks;
4. Repita comigo;
5. Substitution drills;
6. Pergunta e resposta;
7. Fala guiada;
8. Construa sua resposta;
9. Gravação guiada;
10. Checklist de fala;
11. Fala livre curta;
12. Revisão final.

Regras obrigatórias:

- speaking não pode ser apenas leitura;
- precisa ter tarefa ativa de fala;
- deve usar botão de fala quando possível;
- deve manter fallback escrito para iPhone/navegador sem suporte;
- fala livre deve registrar tentativa.

### Writing

Ordem esperada:

1. Modelo de texto;
2. Como o modelo é construído;
3. Blocos úteis;
4. Gramática para escrever;
5. Frases úteis;
6. Substituição guiada;
7. Erros comuns;
8. Rascunho;
9. Checklist de revisão;
10. Versão final;
11. Produções extras quando houver;
12. Revisão final.

Regras obrigatórias:

- rascunho precisa ter textarea real;
- versão final precisa ter textarea real;
- checklist fica entre rascunho e versão final;
- modelo esperado só aparece após tentativa.

## Regra de limpeza de campos

A renderização não deve mostrar diretamente:

- `subject`;
- `expected`;
- `answer`;
- `expectedAnswer`;
- `correctAnswer`;
- `schemaVersion`;
- `[object Object]`;
- campos técnicos de storage ou contrato.

Campos de resposta/modelo devem ser isolados e só aparecer depois da tentativa.

## Aba de testes por pilar

A aba de testes deve continuar ativa até o fim do QA.

Ela permite abrir rapidamente:

- Grammar;
- Vocabulary;
- Reading;
- Listening;
- Speaking;
- Writing.

Regra:

- não remover essa aba enquanto o usuário ainda estiver revisando erros das aulas;
- o preview não pode alterar cronograma real;
- o preview não conta como aula feita.

## Status dos blocos anteriores

- 20B Reading: concluído;
- 20C Speaking: concluído;
- 20D Writing: concluído;
- 20E Listening: concluído;
- 20F Grammar/Vocabulary/campos crus: concluído;
- 20G limpeza parcial mantendo testes: concluído.

## Status do BLOCO 20H

Contrato de renderização ponderada registrado.

Nenhuma nova aula criada.

## Próximo bloco

`BLOCO 20I — Auditoria visual no iPhone`

Foco:

- revisar espaçamento;
- botões;
- textarea;
- cards muito grandes;
- barra inferior;
- conforto para responder no mobile.
