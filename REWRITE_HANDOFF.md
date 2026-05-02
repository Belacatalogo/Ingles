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

## ESTADO ATUAL — CIRURGIA 1 COMPLETA COM UI

### `CIRURGIA-1-FALLBACK-EXTERNO-LAB` — IMPLEMENTADA, aguardando deploy/teste

Contexto:
- O plano anexado de correções cirúrgicas foi lido.
- A parte que colocava `gemini-2.5-pro` nas keys free foi descartada por regra do usuário.
- A Cirurgia 1 foi completada com fallback externo real para testar quando Gemini falhar, sem mexer no motor profundo de Grammar.
- Depois foi adicionada UI em Ajustes para o usuário cadastrar Groq/Cerebras sem DevTools.

Política de modelos mantida:
- keys free/de aula → `gemini-2.5-flash` e `gemini-2.5-flash-lite`;
- key Pro paga → `gemini-2.5-pro` somente como fallback opcional já existente;
- Groq/Cerebras → fallback externo depois de falha do Gemini;
- Pro nas keys free continua proibido.

Arquivos alterados:
- `fluency-clean/src/services/modelPolicy.js`
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `fluency-clean/src/components/settings/LessonKeysPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `modelPolicy.js` registra Groq e Cerebras como fallback externo opcional.
- `externalLessonProviders.js`:
  - lê chaves pelo storage do app;
  - ainda aceita localStorage cru para teste manual;
  - chama endpoints OpenAI-compatible de Groq/Cerebras;
  - pede JSON completo de aula;
  - normaliza a aula antes de voltar para o pipeline local;
  - anexa metadados `providerFallback` e `external-provider-*-fallback-v1`;
  - exporta funções para salvar/remover chaves e modelos externos.
- `plannedGeminiLessons.js` foi cablado:
  - Gemini continua tentando primeiro;
  - se Gemini não concluir, o planejador registra a falha;
  - antes de devolver erro, tenta Groq/Cerebras;
  - se fallback externo gerar aula, a aula ainda passa pelo mesmo pipeline local de validação, reparo, professor revisor, study readiness e salvamento.
- `LessonKeysPanel.jsx` agora mostra, dentro de Ajustes > Chaves de aulas:
  - status de Groq fallback;
  - status de Cerebras fallback;
  - campo para salvar key Groq;
  - campo opcional para modelo Groq;
  - campo para salvar key Cerebras;
  - campo opcional para modelo Cerebras;
  - botões para remover Groq/Cerebras.

Commits:
- `718d9bf0aa83b8d097dde359cf6f4e569f6fe8e7` — adiciona política estável de modelos.
- `afe6be5f0595c4a496aaafb7f520124bd18129c1` — atualiza handoff da cirurgia 1 mínima.
- `3ee8996851c4990488c22d18e9b93d4944af38cb` — adiciona provedores externos de aula.
- `86caae7ece769fadd3975903d3f4173b4e3fc44b` — registra política Groq e Cerebras.
- `0f6d01244a36c5707e6479af0e02c7387f6f76fc` — cabla fallback externo no planejador.
- `537a56bd7e5e52a509becd6a0cd0b68bdfc650f2` — atualiza handoff do fallback externo.
- `5f37d76ca866b877a1de906d6fb8ed41aa84104d` — adiciona gerenciamento de keys externas.
- `ed99a6709d2445c44917dac4d3c9feb1fd2981c7` — adiciona UI para keys Groq e Cerebras.

Como testar agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `ed99a67` ou posterior;
2. abrir o preview da lab;
3. ir em Ajustes > Chaves de aulas;
4. preencher Groq fallback externo e/ou Cerebras fallback externo;
5. salvar;
6. gerar/substituir aula;
7. para testar fallback, simular falha/503 do Gemini ou aguardar falha real;
8. observar diagnóstico:
   - `Gemini não concluiu a aula. Tentando fallback externo Groq/Cerebras...`
   - `Fallback externo ativado...`
   - `Tentando Groq...` ou `Tentando Cerebras...`
   - `gerou aula para validação local`.

Observações:
- Não foi adicionada UI fora de Ajustes.
- Não foi mexido no motor profundo.
- Não foi mexido em `bundle.js`.
- Não foi mexido no backend Azure privado.
- Não foi mexido em `main` nem `rewrite-fluency-clean`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 2 antes do teste de geração com fallback externo.
- Não dividir o bloco de Grammar ainda.
- Não mexer no auditor por section ainda.
- Não reescrever `deepGrammarPipeline.js` ainda.
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

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal de trabalho é `rewrite-fluency-clean-lab`. A Cirurgia 1 completa foi implementada: Gemini continua primeiro; se falhar, `plannedGeminiLessons.js` tenta fallback externo Groq/Cerebras. Também foi adicionada UI em Ajustes > Chaves de aulas para salvar/remover Groq e Cerebras. Não mexer em motor profundo, não portar Pro para keys free, não seguir para Cirurgia 2 antes de testar geração real. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
