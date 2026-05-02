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

## ESTADO ATUAL — CIRURGIA 1 ISOLADA

### `BLOCO-GRAMMAR-MOTOR-ESTAVEL-FLASH-LAB` — CIRURGIA 1 IMPLEMENTADA, aguardando deploy/teste

Contexto:
- O plano anexado de correções cirúrgicas foi lido.
- A Cirurgia 1 original do plano sugeria testar `gemini-2.5-pro` usando `flashKeys`, mas isso foi explicitamente descartado por regra do usuário.
- O diagnóstico aceito é: o problema principal não deve ser tratado como problema de modelo; o foco continua em motor pedagógico, pipeline de Grammar, revisor final e reparo/salvamento.

O que foi feito nesta Cirurgia 1:
- criado `fluency-clean/src/services/modelPolicy.js`;
- registrada uma política estável e explícita de modelos:
  - keys free/de aula → `gemini-2.5-flash` e `gemini-2.5-flash-lite`;
  - key Pro paga → `gemini-2.5-pro` somente como fallback opcional;
  - Pro em keys free desativado (`allowProOnFreeKeys: false`);
  - indisponibilidade de Pro não bloqueia aula (`blockOnProUnavailable: false`).

Arquivos alterados:
- `fluency-clean/src/services/modelPolicy.js`
- `REWRITE_HANDOFF.md`

Commit:
- `718d9bf0aa83b8d097dde359cf6f4e569f6fe8e7` — adiciona política estável de modelos.

Importante:
- A Cirurgia 1 foi mantida propositalmente mínima.
- O fluxo real de geração ainda não foi refatorado para provedores externos.
- Nenhuma alteração foi feita em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Nenhuma mudança da branch `rewrite-fluency-clean-lab-model-test` relacionada a `gemini-2.5-pro` em keys free deve ser portada.

Teste obrigatório antes da Cirurgia 2:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `718d9bf` ou posterior;
2. abrir o preview da lab no iPhone;
3. gerar/substituir uma aula;
4. confirmar que:
   - a tela não quebrou;
   - o botão de geração funciona;
   - diagnóstico continua aparecendo;
   - aula salva/abre normalmente ou bloqueia com justificativa real;
5. só depois seguir para Cirurgia 2.

## NÃO FAZER AGORA

- Não implementar Cirurgia 2 antes do teste de geração.
- Não dividir o bloco de Grammar ainda.
- Não mexer no auditor por section ainda.
- Não reescrever `deepGrammarPipeline.js` ainda.
- Não adicionar provedores externos sem UI/keys reais.
- Não usar `gemini-2.5-pro` nas 3 keys free.
- Não salvar aula fraca só para evitar bloqueio.

## Próximo bloco se o teste da Cirurgia 1 passar

### `CIRURGIA-2-GRAMMAR-BLOCO-1-PROFUNDO-LAB` — PENDENTE

Objetivo:
- refatorar o Bloco 1 de Grammar para aumentar profundidade por section.
- Deve ser feito somente depois de uma aula gerada/testada com a Cirurgia 1.

Direção provável:
- ajustar `fluency-clean/src/services/geminiLessons.js`;
- manter geração por blocos;
- aumentar a profundidade do blueprint Grammar;
- evitar mudança ampla no motor;
- testar no iPhone antes de continuar.

## Blocos recentes implementados

### `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB` — IMPLEMENTADO
- `LessonGeneratorPanel` reaplica `repairDeepGrammarLesson()` quando o professor revisor reprova por problemas de Grammar profunda.
- Também adiciona reparo Grammar específico no caminho da `studyReadiness` quando a trava de confiança aciona por problemas de Grammar profunda.

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

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal de trabalho é `rewrite-fluency-clean-lab`. A Cirurgia 1 do plano de correções cirúrgicas foi implementada de forma mínima: criado `fluency-clean/src/services/modelPolicy.js` com política estável de modelos. Não portar `gemini-2.5-pro` para keys free; keys free continuam em `gemini-2.5-flash` / `gemini-2.5-flash-lite`; key Pro paga é fallback opcional. Antes de qualquer Cirurgia 2, gerar uma aula no preview da lab para confirmar que nada quebrou. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
