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

## ESTADO ATUAL — HOTFIX DIAGNÓSTICO

### `HOTFIX-DIAGNOSTICO-LOGS-TOPO-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- O teste mostrou que a aula caiu no Flash e o diagnóstico empurrava as informações importantes para baixo.
- Sem ver os logs recentes, não dava para saber se o fallback Groq/Cerebras falhou, se nem foi chamado, ou se o Gemini simplesmente teve sucesso antes do fallback.

O que foi corrigido:
- `DiagnosticPanel.jsx` agora mostra **Eventos recentes** no topo, logo abaixo de Status/Fase/Último erro.
- A quantidade de logs visíveis subiu de 6 para 14.
- Os logs agora mostram segundos no horário.
- `Aula no storage` e `Checklist` foram empurrados para baixo, porque são menos importantes durante geração.
- `index.css` agora mantém o diagnóstico fixo no mobile, com altura controlada e rolagem própria.
- A lista de eventos recentes tem rolagem própria para não sumir no iPhone.

Arquivos alterados neste hotfix:
- `fluency-clean/src/components/system/DiagnosticPanel.jsx`
- `fluency-clean/src/styles/index.css`
- `REWRITE_HANDOFF.md`

Commits do hotfix:
- `66ff0fc057e77a399c27372b36d8ece6d87d266b` — mostra logs recentes no topo.
- `f2a597d5d2f0fd166b125dc91e583ff61202b2f4` — melhora rolagem e logs no mobile.

Importante sobre fallback externo:
- Se Gemini Flash gerar a aula com sucesso, Groq/Cerebras **não entram**. Isso é esperado.
- O fallback externo só entra quando `generateLessonDraft()` falha e `plannedGeminiLessons.js` recebe erro/status sem aula.
- Para testar Groq/Cerebras de forma controlada, próximo ajuste recomendado é adicionar um toggle em Ajustes > Chaves de aulas: `Forçar fallback externo no próximo teste`.

## ESTADO ANTERIOR — CIRURGIA 1 COMPLETA COM UI

### `CIRURGIA-1-FALLBACK-EXTERNO-LAB` — IMPLEMENTADA

Política de modelos:
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
- `externalLessonProviders.js` lê/salva chaves pelo storage do app e ainda aceita localStorage cru para teste manual.
- `plannedGeminiLessons.js` mantém Gemini primeiro; se Gemini não concluir, tenta Groq/Cerebras antes de devolver erro.
- `LessonKeysPanel.jsx` adiciona UI em Ajustes > Chaves de aulas para salvar/remover Groq/Cerebras e modelos.

Commits principais da Cirurgia 1:
- `3ee8996851c4990488c22d18e9b93d4944af38cb` — adiciona provedores externos de aula.
- `86caae7ece769fadd3975903d3f4173b4e3fc44b` — registra política Groq e Cerebras.
- `0f6d01244a36c5707e6479af0e02c7387f6f76fc` — cabla fallback externo no planejador.
- `5f37d76ca866b877a1de906d6fb8ed41aa84104d` — adiciona gerenciamento de keys externas.
- `ed99a6709d2445c44917dac4d3c9feb1fd2981c7` — adiciona UI para keys Groq e Cerebras.

## NÃO FAZER AGORA

- Não implementar Cirurgia 2 antes de testar diagnóstico novo e fallback externo.
- Não dividir o bloco de Grammar ainda.
- Não mexer no auditor por section ainda.
- Não reescrever `deepGrammarPipeline.js` ainda.
- Não usar `gemini-2.5-pro` nas 3 keys free.
- Não salvar aula fraca só para evitar bloqueio.

## Próximo bloco recomendado

### `HOTFIX-FORCAR-FALLBACK-EXTERNO-LAB` — PENDENTE

Objetivo:
- adicionar em Ajustes > Chaves de aulas um toggle de teste: `Forçar fallback externo na próxima geração`.
- Quando ativo, `plannedGeminiLessons.js` deve pular Gemini e chamar Groq/Cerebras diretamente.
- Isso é apenas para teste controlado, não para uso normal.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix moveu os logs do diagnóstico para o topo e melhorou a rolagem no mobile. Não seguir para Cirurgia 2 ainda. Próximo ajuste provável: toggle para forçar fallback externo na próxima geração, porque se Flash funcionar Groq/Cerebras não entram. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
