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

### `BLOCO-GRAMMAR-PIPELINE-DIDATICO-PROFUNDO-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- o contrato profundo melhorou a intenção, mas a aula ainda podia passar na rubrica com conteúdo vago/repetitivo;
- a análise mostrou que o sistema estava avaliando muito por contagem: partes, vocabulário, questões e prompts;
- era necessário atacar dois pontos:
  1. criar uma camada didática específica para Grammar;
  2. endurecer o professor revisor para penalizar superficialidade, repetição e exemplos reciclados.

Arquivos criados:
- `fluency-clean/src/services/deepGrammarPipeline.js`

Arquivos alterados:
- `fluency-clean/src/services/teacherReviewer.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:

### 1. Novo serviço `deepGrammarPipeline.js`

Exporta:
- `auditDeepGrammarLesson(rawLesson)`;
- `repairDeepGrammarLesson(rawLesson)`.

A auditoria mede Grammar por critérios qualitativos:
- progressão didática real;
- presença de abertura do professor;
- analogia/conceito central;
- regra em camadas;
- exemplos guiados inéditos;
- certo vs errado;
- microdiálogo/uso real;
- checagem mental;
- produção final;
- repetição entre seções;
- exemplos que copiam a explicação;
- profundidade da prática.

O reparo local adiciona seções didáticas obrigatórias quando a IA vem vaga:
- Abertura do professor;
- Conceito central com analogia;
- Regra em camadas;
- Exemplos guiados inéditos;
- Certo vs errado;
- Uso real em microdiálogo;
- Checagem mental antes da prática;
- Resumo final do que dominar.

Também adiciona prompts finais de produção própria:
- explicar diferença com as próprias palavras;
- criar frases afirmativas;
- criar frases negativas e perguntas;
- escrever uma frase errada, corrigir e explicar.

### 2. Professor revisor endurecido para Grammar

`teacherReviewer.js` agora importa `auditDeepGrammarLesson` e incorpora `deepGrammarAudit` no score.

Mudanças:
- Grammar ganhou sinais extras: analogia, certo/errado e uso real;
- `teacherScore` agora inclui peso do auditor profundo;
- aprovação de Grammar exige `deepGrammarAudit.score >= 78`;
- issues do auditor são adicionadas no professor revisor;
- painel de qualidade ganha área `Grammar profunda` dentro de `reviewedAreas`;
- `quality.deepGrammarAudit` é anexado à aula.

### 3. Gerador conectado ao pipeline

`LessonGeneratorPanel.jsx` agora:
- reforça ainda mais `DEEP_GRAMMAR_CONTRACT` com:
  - exemplos 100% inéditos;
  - microdiálogo obrigatório;
  - certo vs errado obrigatório;
  - exemplos que não repetem a teoria;
- identifica `grammarTarget`;
- executa `auditDeepGrammarLesson()` após a geração inicial;
- se a auditoria reprovar, aplica `repairDeepGrammarLesson()` antes do professor revisor;
- registra no diagnóstico:
  - `Auditoria Grammar profunda inicial: X/100.`
  - `Pipeline Grammar profundo aplicado: X/100.`
- se o reparo foi usado, o contrato salvo ganha:
  - `deep-grammar-pipeline-v1`;
- a mensagem final informa `com pipeline didático Grammar profundo` quando aplicado.

Commits:
- `3f562d63247013a982f4f19b01077a268e032c00` — cria pipeline didático profundo para grammar;
- `def01175b8be5b602036b571b6bcbc2a113c9bab` — endurece professor revisor para grammar profunda;
- `7952837cf51c59d6d9cddcfe8fd614b7de65ffd5` — conecta pipeline profundo de grammar na geração.

Teste recomendado no iPhone:
1. aguardar deploy do commit final deste bloco;
2. gerar/substituir uma aula Grammar;
3. no Diagnóstico, confirmar logs:
   - `Contrato de Grammar profunda ativado...`;
   - `Auditoria Grammar profunda inicial: X/100.`;
   - se necessário: `Pipeline Grammar profundo aplicado: X/100.`;
4. abrir a aula;
5. confirmar que aparecem seções como:
   - analogia;
   - regra em camadas;
   - exemplos guiados;
   - certo vs errado;
   - microdiálogo;
   - checagem mental;
   - resumo final;
6. abrir Detalhes de qualidade e verificar área `Grammar profunda`;
7. confirmar que a aula não depende apenas de contagem de partes/vocabulário/questões.

Observação:
- este bloco ainda não muda temperatura da API, porque isso provavelmente fica dentro do serviço real de chamada ao Gemini/backend. A melhoria aplicada agora é estrutural, local e segura.

## Blocos recentes implementados

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

### `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — IMPLEMENTADO
- `saveCurrentLesson()` só grava status `saved` depois de confirmar que `lesson.current` realmente foi persistido.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-GRAMMAR-PIPELINE-DIDATICO-PROFUNDO-LAB` — STATUS: implementado, aguardando teste.
2. se Grammar ainda vier vaga, endurecer `plannedGeminiLessons.js`/`geminiLessons.js` no blueprint de JSON e/ou ajustar temperatura se disponível.
3. se ok, voltar para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB`.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB`.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB`.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB`.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB`.
9. `BLOCO-CARTAS-SPEAKING-14-LAB`.
10. `BLOCO-CARTAS-STORIES-15-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-GRAMMAR-PIPELINE-DIDATICO-PROFUNDO-LAB`: foi criado `deepGrammarPipeline.js`, o professor revisor agora usa `deepGrammarAudit`, e `LessonGeneratorPanel` aplica auditoria/reparo profundo em Grammar antes de salvar. Testar gerando nova Grammar. Se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
