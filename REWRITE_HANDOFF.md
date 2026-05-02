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

### `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- O teste no iPhone mostrou que a trava nova funcionou: uma Grammar com 93/100 foi bloqueada por problemas reais.
- Mensagem exibida:
  - risco de falso domínio por excesso de reconhecimento e pouca produção;
  - falta de progressão didática real com abertura, analogia, camadas, uso real e resumo;
  - exemplos precisam ser inéditos, contextualizados e explicar por que estão corretos.
- Isso confirmou que o professor revisor ficou mais rigoroso.
- Porém revelou falha de fluxo: depois do reparo anti falso domínio, se ainda restassem problemas específicos de Grammar profunda, o sistema tentava um reparo genérico e bloqueava, sem reaplicar o pipeline Grammar específico.

Arquivo alterado:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- criado helper `teacherNeedsDeepGrammarRepair(teacherReview)`;
- se o professor revisor reprovar por termos ligados a Grammar profunda, o fluxo agora:
  1. faz o reparo genérico como antes;
  2. reaplica `repairDeepGrammarLesson()` por cima;
  3. marca `deepGrammarRepaired = true`;
  4. revalida pedagogicamente;
  5. reexecuta professor revisor;
  6. só bloqueia se ainda reprovar.
- também foi adicionado reparo Grammar específico no caminho da `studyReadiness`, quando a trava de confiança aciona e os problemas anteriores eram de Grammar profunda.

Commit:
- `df3bb1152893050e76df9e981927296c5c70d88b` — reaplica reparo profundo quando professor reprova grammar.

Teste recomendado no iPhone:
1. aguardar deploy do commit `df3bb11` ou posterior;
2. gerar/substituir Grammar novamente;
3. observar diagnóstico:
   - se o professor reprovar inicialmente, deve aparecer:
     `Professor revisor pediu reparo específico de Grammar profunda. Reaplicando pipeline didático antes de bloquear.`
   - depois deve aparecer aprovação ou bloqueio final justificado;
4. se salvar, abrir a aula e conferir se seções de Grammar profunda aparecem de forma real;
5. se bloquear de novo, o próximo bloco deve endurecer a geração em `plannedGeminiLessons.js`/blueprint, porque o reparo local já terá sido tentado no ponto correto.

## Blocos recentes implementados

### `BLOCO-GRAMMAR-PIPELINE-DIDATICO-PROFUNDO-LAB` — IMPLEMENTADO
- Criado `deepGrammarPipeline.js`.
- Professor revisor usa `deepGrammarAudit`.
- `LessonGeneratorPanel` aplica auditoria/reparo profundo em Grammar antes de salvar.

### `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB` — IMPLEMENTADO
- `LessonGeneratorPanel` adiciona `DEEP_GRAMMAR_CONTRACT` ao prompt de Grammar.
- Exige aula longa, guiada, não enciclopédica.
- Salva `deep-grammar-contract-v1` no contrato.

### `BLOCO-GRAMMAR-AULA-PROFUNDA-UI-LAB` — IMPLEMENTADO
- Grammar preserva conteúdo profundo.
- Transforma numeração em listas visuais.
- Destaca exemplos do professor.
- Ajusta tempo estimado para Grammar profunda.

### `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB` — IMPLEMENTADO
- Removidos exercícios estáticos da Grammar.
- `PracticeFullscreen` congela as questões por sessão.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB` — STATUS: implementado, aguardando teste.
2. se Grammar ainda bloquear por conteúdo vago, endurecer `plannedGeminiLessons.js`/`geminiLessons.js` no blueprint de JSON e/ou ajustar temperatura se disponível.
3. se ok, voltar para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB`.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB`.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB`.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB`.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB`.
9. `BLOCO-CARTAS-SPEAKING-14-LAB`.
10. `BLOCO-CARTAS-STORIES-15-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB`: quando o professor reprova Grammar por profundidade, `LessonGeneratorPanel` reaplica `repairDeepGrammarLesson()` antes de bloquear. Testar gerando nova Grammar. Se ainda bloquear por conteúdo vago, endurecer blueprint em `plannedGeminiLessons.js`/`geminiLessons.js`; se ok, voltar para Cartas."
