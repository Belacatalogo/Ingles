# Fluency Clean Rewrite — Handoff LAB

Branch principal de trabalho: `rewrite-fluency-clean-lab`

Branch de teste atual: `rewrite-fluency-clean-lab-model-test`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `rewrite-fluency-clean-lab` enquanto o teste estiver isolado na branch `rewrite-fluency-clean-lab-model-test`.
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

## BLOCO ATUAL IMPLEMENTADO EM BRANCH DE TESTE

### `BLOCO-MODEL-TEST-GRAMMAR-PRO-LAB` — IMPLEMENTADO, aguardando deploy/teste no iPhone

Branch usada:
- `rewrite-fluency-clean-lab-model-test`, criada a partir de `rewrite-fluency-clean-lab` no commit `c1b23e21b74303043d0372a61adc8a7b52ddec33`.

Arquivo alterado:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado contrato `grammar-model-test-gemini-2.5-pro`;
- criado contrato de fallback `grammar-model-test-fallback-current`;
- criado helper `generateGrammarModelTestDraft()`;
- somente quando a próxima aula é Grammar profunda e não é revisão de sábado:
  1. tenta gerar primeiro com `gemini-2.5-pro` usando apenas a key Pro de aulas;
  2. se o Pro gerar e a aula passar pelo fluxo, registra no diagnóstico que o modelo usado foi `gemini-2.5-pro`;
  3. se o Pro falhar por erro, quota, modelo indisponível ou resposta inválida, registra o motivo no diagnóstico;
  4. faz fallback para o modelo atual usando as Flash/free keys;
  5. salva no `contractVersion` `grammar-model-test-gemini-2.5-pro` ou `grammar-model-test-fallback-current`.
- Reading, Listening, Writing, Cartas e revisão de sábado continuam no fluxo atual.
- O backend Azure privado não foi alterado.
- `bundle.js` não foi alterado.
- Não foi usado DOM injection, bundle patch nem HTML remendado.

Mensagens esperadas no diagnóstico:
- ao detectar Grammar:
  - `Contrato de Grammar profunda ativado: aula longa, guiada e não enciclopédica.`
- ao testar Pro:
  - `BLOCO-MODEL-TEST-GRAMMAR-PRO-LAB: tentando gerar Grammar profunda com gemini-2.5-pro primeiro.`
- se Pro funcionar:
  - `Grammar profunda gerada com gemini-2.5-pro. Fallback não foi necessário.`
  - `Modelo usado na Grammar: gemini-2.5-pro. Contrato: grammar-model-test-gemini-2.5-pro.`
- se Pro falhar:
  - `gemini-2.5-pro falhou somente para Grammar. Voltando ao modelo atual. Motivo: ...`
  - `Modelo usado na Grammar: current-fallback. Contrato: grammar-model-test-fallback-current.`
- se não houver key Pro:
  - `Grammar profunda detectada, mas nenhuma key Pro foi configurada. Mantendo modelo atual.`

Commits desta branch de teste:
- `4a139e4e025e4bb8918a7309db3d3f338b7463c2` — testa modelo Pro somente em Grammar profunda.

Teste recomendado no iPhone:
1. aguardar o preview/deploy da branch `rewrite-fluency-clean-lab-model-test`;
2. abrir exatamente o preview dessa branch, não o da lab principal;
3. confirmar que existe key Pro configurada em Ajustes > Chaves de aulas;
4. gerar/substituir uma aula Grammar;
5. acompanhar o Diagnóstico e procurar qual modelo foi usado;
6. se salvar, abrir a aula e conferir se a Grammar ficou mais profunda, organizada e estudável;
7. conferir em “Último status” se o contrato inclui `grammar-model-test-gemini-2.5-pro` ou `grammar-model-test-fallback-current`;
8. se houver erro grave, abandonar esta branch de teste e voltar para `rewrite-fluency-clean-lab`.

Critério de sucesso:
- gerar uma nova aula Grammar sem quebrar o sistema;
- diagnóstico mostrar o modelo usado;
- aula salvar normalmente;
- `contractVersion` registrar o contrato do teste;
- qualidade didática ser comparável ou melhor que a geração anterior;
- nenhuma mudança colateral em Listening, Reading, Writing ou Cartas.

## BLOCO ANTERIOR IMPLEMENTADO

### `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB` — IMPLEMENTADO

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

Commits anteriores na lab:
- `df3bb1152893050e76df9e981927296c5c70d88b` — reaplica reparo profundo quando professor reprova grammar.
- `afa50c86e5cf051b231351ff4cf585f014ccd647` — atualiza handoff do hotfix de reparo grammar final.

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

1. Testar `BLOCO-MODEL-TEST-GRAMMAR-PRO-LAB` no preview da branch `rewrite-fluency-clean-lab-model-test`.
2. Se o teste de modelo for aprovado, portar cuidadosamente para `rewrite-fluency-clean-lab` em bloco único.
3. Se o teste de modelo falhar grave, abandonar `rewrite-fluency-clean-lab-model-test` e voltar para `rewrite-fluency-clean-lab`.
4. Se Grammar ainda bloquear por conteúdo vago, endurecer `plannedGeminiLessons.js`/`geminiLessons.js` no blueprint de JSON e/ou ajustar temperatura se disponível.
5. Se ok, voltar para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.
6. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB`.
7. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB`.
8. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB`.
9. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB`.
10. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB`.
11. `BLOCO-CARTAS-SPEAKING-14-LAB`.
12. `BLOCO-CARTAS-STORIES-15-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal continua sendo `rewrite-fluency-clean-lab`, mas o teste atual está isolado na branch `rewrite-fluency-clean-lab-model-test`. Não mexa em `main`, não mexa em `rewrite-fluency-clean`, não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco `BLOCO-MODEL-TEST-GRAMMAR-PRO-LAB` foi implementado na branch de teste: Grammar profunda tenta `gemini-2.5-pro` primeiro, mantém fallback para o modelo atual, registra no diagnóstico qual modelo foi usado e salva no contrato `grammar-model-test-gemini-2.5-pro` ou `grammar-model-test-fallback-current`. Testar no iPhone usando o preview da branch de teste. Se der erro grave, abandonar a branch de teste e voltar para `rewrite-fluency-clean-lab`."
