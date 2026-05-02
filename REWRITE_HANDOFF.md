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

## ESTADO ATUAL — HOTFIX STORAGE FORTE + TESTE COMPARATIVO

### `HOTFIX-STORAGE-COMPARATIVO-MOTORES-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Mesmo após compactação anterior, o iPhone/Safari continuou recusando `lesson.current`.
- O diagnóstico mostrou tentativa de versão compacta e emergencial ainda falhando.
- Usuário também pediu um jeito de testar, depois de cada conclusão, a mesma aula com Flash, Groq e Cerebras, e saber se houve diferença mínima entre elas.

O que foi corrigido no storage:
- `lessonStore.js` agora tem purge forte do cache local Fluency quando a gravação falha.
- Preserva chaves/configurações essenciais:
  - `user.profile`
  - `settings`
  - `lesson.keys`
  - `lesson.groq.key`
  - `lesson.groq.model`
  - `lesson.cerebras.key`
  - `lesson.cerebras.model`
  - `lesson.external.forceNext`
  - `lesson.promptDraft`
- Remove o restante das chaves `fluency.clean.*` para liberar quota antes da versão ultra compacta.
- Histórico de aulas agora fica vazio para reduzir risco de quota.
- `lesson.current` salva uma versão ultra compacta em último caso.
- `contractVersion` e revisões são encurtados para não estourar localStorage.

O que foi adicionado para comparação Flash/Groq/Cerebras:
- `lessonStore.js` agora calcula `lessonSignature` com:
  - hash geral da aula;
  - hash por section;
  - contagem de palavras por section;
  - total de palavras nas sections;
  - quantidade de vocabulário, exercícios e prompts.
- Após salvar, o diagnóstico registra algo como:
  - `Assinatura da aula: ab12cd34 · gemini · sections 190/210/205/...`
- Também salva histórico curto em `lesson.comparisonRuns`.
- `externalLessonProviders.js` agora permite forçar um provedor específico na próxima geração.
- `plannedGeminiLessons.js` recebe esse alvo e chama somente Groq ou somente Cerebras quando solicitado.
- `LessonKeysPanel.jsx` agora mostra botões:
  - `Forçar fallback externo na próxima geração`
  - `Forçar Groq na próxima geração`
  - `Forçar Cerebras na próxima geração`

Arquivos alterados:
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `fluency-clean/src/components/settings/LessonKeysPanel.jsx`
- `REWRITE_HANDOFF.md`

Commits deste hotfix:
- `5c43b2c56f3474c6cb9b98cb4b547b826d94f88e` — purge e assinatura de aula.
- `150f8908f8c314f4b559b53bfe4c2de63d9571c7` — permite forçar Groq ou Cerebras.
- `e73b22cc4161984b442e5276e5d6d4d1763c3ede` — cabla provedor externo alvo.
- `63c9f37b6a1ed9cf2f527c370b3621eb7b7be986` — adiciona botões Groq e Cerebras.

Como testar agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `63c9f37` ou posterior;
2. testar primeiro com Gemini/Flash normal, sem forçar fallback;
3. confirmar se aparece `Aula salva...` e `Assinatura da aula...`;
4. anotar hash e contagem de sections;
5. ir em Ajustes > Chaves de aulas e ativar `Forçar Groq na próxima geração`;
6. gerar a mesma aula e comparar hash/sections;
7. ir em Ajustes > Chaves de aulas e ativar `Forçar Cerebras na próxima geração`;
8. gerar a mesma aula e comparar hash/sections.

Interpretação:
- Se o hash geral for diferente, houve alteração real no conteúdo.
- Se hashes das sections forem diferentes, as sections mudaram.
- Se só a contagem de palavras mudar, houve alteração estrutural mínima.
- Se hash e contagens forem iguais, o conteúdo salvo ficou essencialmente igual.

## ESTADO ANTERIOR — HOTFIX REGENERAR AULA ATUAL

### `HOTFIX-GERACAO-REGENERAR-AULA-ATUAL-LAB` — IMPLEMENTADO
- Permite `Regenerar aula atual` sem exigir versão diferente.
- Checkbox agora só serve para `Gerar versão diferente com outro contexto`.
- Commit: `0c247ed22af5b61f3a8745f0ac042c3a0981094a`.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA
- Cada Grammar section é reescrita sequencialmente.
- Mínimo 180 palavras por section.
- Exige contraste com português e erro típico A1 brasileiro.
- Não mexeu no professor revisor.
- Não mexeu no `deepGrammarPipeline.js`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes de testar storage forte + comparação de motores.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `63c9f37` com purge forte do storage, versão ultra compacta e assinatura/hash para comparar Flash/Groq/Cerebras. Próximo passo é testar geração normal com Flash; depois forçar Groq; depois forçar Cerebras. Comparar pelo diagnóstico `Assinatura da aula`. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
