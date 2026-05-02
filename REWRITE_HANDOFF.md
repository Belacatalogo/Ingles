# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## OBJETIVO PEDAGÓGICO FINAL

`diagnosticar → ensinar → praticar → corrigir → revisar → testar → só então avançar`

Princípio máximo:

`o aluno só avança quando prova domínio, não apenas quando conclui uma aula.`

## BLOCO ATUAL

### `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário pediu aula Grammar longa, completa e profunda;
- não quer aula curta de 15/17 min;
- não quer artigo/Wikipedia;
- quer sentir que está estudando uma aula real;
- o bloco anterior melhorou a UI, mas este bloco corrige a origem da geração.

Arquivo alterado:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `DEEP_GRAMMAR_CONTRACT` dentro do gerador;
- criado `buildPromptForLesson(nextLesson, saturdayReview)`;
- toda aula `grammar` agora recebe contrato extra antes de chamar Gemini;
- contrato exige:
  - aula de professor particular, não artigo;
  - explicação profunda, sem encurtar;
  - linguagem acolhedora, clara, séria e didática;
  - nada de sequências `1. 2. 3.` coladas no mesmo parágrafo;
  - cada seção com função pedagógica clara;
  - explicação em português + exemplos em inglês A1 + tradução quando ajudar + alerta de erro comum;
  - estrutura ideal com abertura, mapa, conceito central, regra em camadas, formas afirmativa/negativa/interrogativa, exemplos guiados, certo vs errado, uso real, erros comuns, checagem mental, produção própria e resumo final;
  - profundidade suficiente para 30 a 45 minutos somando prática;
  - 18 a 24 exercícios com uma única resposta correta;
  - produção final obrigatória.
- o fallback resiliente também usa o mesmo prompt reforçado;
- quando o contrato é usado, o diagnóstico registra:
  - `Contrato de Grammar profunda ativado: aula longa, guiada e não enciclopédica.`
- o `contractVersion` salvo para grammar agora inclui:
  - `deep-grammar-contract-v1`.

Commits:
- `d356966e2d2188cbcaa297feed81239f9bad09d0` — reforça contrato de geração para grammar profunda.

Teste recomendado no iPhone:
1. aguardar deploy do commit `d356966` ou posterior;
2. gerar uma nova aula Grammar, ou substituir a atual se o sistema bloquear por aula pendente;
3. no Diagnóstico, confirmar log `Contrato de Grammar profunda ativado...`;
4. abrir aba Aula;
5. confirmar que a aula nasce mais parecida com professor/aula guiada;
6. confirmar que não parece recorte enciclopédico;
7. confirmar que continua profunda e não curta;
8. confirmar que `contractVersion` da aula mostra `deep-grammar-contract-v1`.

Observação importante:
- a aula já gerada anteriormente não muda automaticamente na origem; é preciso gerar/substituir uma nova Grammar para testar o novo contrato.

## Blocos recentes implementados

### `BLOCO-GRAMMAR-AULA-PROFUNDA-UI-LAB` — IMPLEMENTADO
- Grammar preserva conteúdo profundo.
- Transforma numeração em listas visuais.
- Destaca exemplos do professor.
- Ajusta tempo estimado para Grammar profunda.

### `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB` — IMPLEMENTADO
- Removidos exercícios estáticos da Grammar.
- `PracticeFullscreen` congela as questões por sessão.

### `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — IMPLEMENTADO
- `saveCurrentLesson()` só grava status `saved` depois de confirmar que `lesson.current` realmente foi persistido.
- Se falhar, limpa histórico e tenta versão compacta.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB` — STATUS: implementado, aguardando teste.
2. se Grammar nova ainda vier com cara de artigo, endurecer `geminiLessons.js` no blueprint de grammar.
3. se ok, voltar para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB`.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB`.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB`.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB`.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB`.
9. `BLOCO-CARTAS-SPEAKING-14-LAB`.
10. `BLOCO-CARTAS-STORIES-15-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB`: `LessonGeneratorPanel` adiciona `DEEP_GRAMMAR_CONTRACT` ao prompt de Grammar, exige aula longa, guiada, não enciclopédica e salva `deep-grammar-contract-v1` no contrato. Testar gerando nova Grammar. Se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
