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

## ESTADO ATUAL — HOTFIX INDEXEDDB AULA COMPLETA

### `HOTFIX-STORAGE-INDEXEDDB-AULA-COMPLETA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Decisão corrigida:
- NÃO compactar a aula como solução principal.
- NÃO cortar sections, explicações, exemplos, exercícios ou conteúdo pedagógico para caber no `localStorage`.
- Aula completa e profunda deve ser salva inteira no IndexedDB.
- `localStorage` deve guardar só um ponteiro/metadados leves.

Contexto:
- O Safari/iPhone recusou `lesson.current` porque a aula Grammar profunda ficou grande demais para `localStorage`.
- A solução anterior tentava compactar/ultracompactar, mas isso conflita com o objetivo pedagógico de aulas completas e aprofundadas.
- A solução correta é trocar o armazenamento da aula completa, não reduzir a aula.

O que foi implementado:
- Criado `fluency-clean/src/services/lessonIndexedDb.js`.
- `lessonStore.js` agora salva a aula completa no IndexedDB, sem compactar conteúdo.
- `localStorage` salva só um ponteiro leve em `lesson.current`, com:
  - id da aula;
  - título;
  - tipo;
  - nível;
  - intro curta para preview;
  - generationMeta;
  - assinatura/hash;
  - `storageMode: lesson-full-indexeddb-v1`;
  - `indexedDbGenerationId`.
- `LessonScreen.jsx` agora carrega a aula completa via `getCurrentLessonFull()`.
- Enquanto carrega, mostra `Carregando aula completa...`.
- A tela Aula mostra chip `IndexedDB completo` quando a aula usa esse modo.
- O diagnóstico registra:
  - `Aula completa salva no IndexedDB...`
  - `Aula salva sem compactar conteúdo...`
  - `Assinatura da aula...`

Arquivos alterados:
- `fluency-clean/src/services/lessonIndexedDb.js`
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `REWRITE_HANDOFF.md`

Commits deste hotfix:
- `9fde08d4b8e0916e7c82b8be0998cca052700507` — adiciona storage completo de aulas.
- `9ee3d25408fcb6521ee533048a484ece61b314bf` — salva aula completa sem compactar.
- `24725b34af47059d2d63341999cdfa3fc9fa3fa3` — carrega aula completa na tela Aula.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `24725b3` ou posterior;
2. gerar a aula Grammar normal com Flash/Gemini;
3. confirmar no diagnóstico:
   - `Aula completa salva no IndexedDB...`;
   - `Aula salva sem compactar conteúdo...`;
   - `Assinatura da aula...`;
4. abrir a aba Aula;
5. confirmar chip `IndexedDB completo`;
6. conferir se as sections estão completas, longas e profundas;
7. depois testar Groq e Cerebras usando os botões de força em Ajustes.

## ESTADO ANTERIOR — COMPARAÇÃO DE MOTORES

### `HOTFIX-COMPARATIVO-MOTORES-LAB` — IMPLEMENTADO
- `externalLessonProviders.js` permite forçar Groq ou Cerebras.
- `plannedGeminiLessons.js` recebe alvo do provedor externo.
- `LessonKeysPanel.jsx` mostra botões:
  - `Forçar fallback externo na próxima geração`;
  - `Forçar Groq na próxima geração`;
  - `Forçar Cerebras na próxima geração`.
- `lessonStore.js` calcula assinatura/hash da aula para comparar conteúdo entre motores.

Commits:
- `150f8908f8c314f4b559b53bfe4c2de63d9571c7` — permite forçar Groq ou Cerebras.
- `e73b22cc4161984b442e5276e5d6d4d1763c3ede` — cabla provedor externo alvo.
- `63c9f37b6a1ed9cf2f527c370b3621eb7b7be986` — adiciona botões Groq e Cerebras.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA
- Cada Grammar section é reescrita sequencialmente.
- Mínimo 180 palavras por section.
- Exige contraste com português e erro típico A1 brasileiro.
- Não mexeu no professor revisor.
- Não mexeu no `deepGrammarPipeline.js`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes de testar IndexedDB + abertura da aula completa.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico como solução principal.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `24725b3`: aula completa agora salva no IndexedDB, sem compactar conteúdo pedagógico; localStorage guarda só ponteiro leve. Próximo passo é testar geração normal com Flash/Gemini, abrir a aba Aula e confirmar chip `IndexedDB completo` e sections completas. Depois testar Groq e Cerebras. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
