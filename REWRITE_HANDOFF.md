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

## ESTADO ATUAL — CIRURGIA 1 COMPLETA

### `CIRURGIA-1-FALLBACK-EXTERNO-LAB` — IMPLEMENTADA, aguardando deploy/teste

Contexto:
- O plano anexado de correções cirúrgicas foi lido.
- A parte que colocava `gemini-2.5-pro` nas keys free foi descartada por regra do usuário.
- A Cirurgia 1 foi completada com fallback externo real para testar quando Gemini falhar, sem mexer no motor profundo de Grammar.

Política de modelos mantida:
- keys free/de aula → `gemini-2.5-flash` e `gemini-2.5-flash-lite`;
- key Pro paga → `gemini-2.5-pro` somente como fallback opcional já existente;
- Groq/Cerebras → fallback externo depois de falha do Gemini;
- Pro nas keys free continua proibido.

Arquivos alterados:
- `fluency-clean/src/services/modelPolicy.js`
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `modelPolicy.js` agora registra Groq e Cerebras como fallback externo opcional.
- Novo `externalLessonProviders.js`:
  - lê chaves manualmente do localStorage;
  - aceita o padrão do app via `storage`, que usa prefixo interno `fluency.clean.`;
  - também tenta ler a chave crua sem prefixo para facilitar teste manual;
  - chama endpoints OpenAI-compatible de Groq/Cerebras;
  - pede JSON completo de aula;
  - normaliza a aula antes de voltar para o pipeline local;
  - anexa metadados `providerFallback` e `external-provider-*-fallback-v1`.
- `plannedGeminiLessons.js` foi cablado:
  - Gemini continua tentando primeiro;
  - se Gemini não concluir, o planejador registra a falha;
  - antes de devolver erro, tenta Groq/Cerebras;
  - se fallback externo gerar aula, a aula ainda passa pelo mesmo pipeline local de validação, reparo, professor revisor, study readiness e salvamento.

Commits:
- `718d9bf0aa83b8d097dde359cf6f4e569f6fe8e7` — adiciona política estável de modelos.
- `afe6be5f0595c4a496aaafb7f520124bd18129c1` — atualiza handoff da cirurgia 1 mínima.
- `3ee8996851c4990488c22d18e9b93d4944af38cb` — adiciona provedores externos de aula.
- `86caae7ece769fadd3975903d3f4173b4e3fc44b` — registra política Groq e Cerebras.
- `0f6d01244a36c5707e6479af0e02c7387f6f76fc` — cabla fallback externo no planejador.

Como configurar manualmente no DevTools para teste:

```js
localStorage.setItem('lesson.groq.key', 'SUA_KEY_GROQ_AQUI')
localStorage.setItem('lesson.cerebras.key', 'SUA_KEY_CEREBRAS_AQUI')
```

Opcionalmente, para trocar modelo:

```js
localStorage.setItem('lesson.groq.model', 'llama-3.3-70b-versatile')
localStorage.setItem('lesson.cerebras.model', 'llama-3.3-70b')
```

Também funciona com prefixo interno do app:

```js
localStorage.setItem('fluency.clean.lesson.groq.key', 'SUA_KEY_GROQ_AQUI')
localStorage.setItem('fluency.clean.lesson.cerebras.key', 'SUA_KEY_CEREBRAS_AQUI')
```

Teste obrigatório antes da Cirurgia 2:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `0f6d012` ou posterior;
2. configurar pelo menos uma key externa no localStorage;
3. gerar/substituir uma aula;
4. para testar fallback, simular falha/503 do Gemini ou aguardar falha real;
5. observar no diagnóstico mensagens como:
   - `Gemini não concluiu a aula. Tentando fallback externo Groq/Cerebras...`
   - `Fallback externo ativado...`
   - `Tentando Groq...` ou `Tentando Cerebras...`
   - `gerou aula para validação local`;
6. confirmar que a aula ainda passa por avaliação local e não salva aula fraca sem validação.

## NÃO FAZER AGORA

- Não implementar Cirurgia 2 antes do teste de geração com fallback externo.
- Não dividir o bloco de Grammar ainda.
- Não mexer no auditor por section ainda.
- Não reescrever `deepGrammarPipeline.js` ainda.
- Não adicionar UI nova para Groq/Cerebras ainda.
- Não usar `gemini-2.5-pro` nas 3 keys free.
- Não salvar aula fraca só para evitar bloqueio.

## Próximo bloco se o teste da Cirurgia 1 passar

### `CIRURGIA-2-GRAMMAR-BLOCO-1-PROFUNDO-LAB` — PENDENTE

Objetivo:
- refatorar o Bloco 1 de Grammar para aumentar profundidade por section.
- Deve ser feito somente depois de uma aula gerada/testada com a Cirurgia 1 completa.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal de trabalho é `rewrite-fluency-clean-lab`. A Cirurgia 1 completa foi implementada: Gemini continua primeiro; se falhar, `plannedGeminiLessons.js` tenta fallback externo Groq/Cerebras via localStorage (`lesson.groq.key`, `lesson.cerebras.key`, com suporte também ao prefixo `fluency.clean.`). Não mexer em motor profundo, não portar Pro para keys free, não seguir para Cirurgia 2 antes de testar geração real. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
