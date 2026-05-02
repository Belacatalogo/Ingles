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

## ESTADO ATUAL — HOTFIX PISCADAS NA ABA AULA

### `HOTFIX-AULA-INDEXEDDB-SEM-PISCAR-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- IndexedDB funcionou: aula abriu completa, com nota 98/100 e conteúdo profundo.
- A tela Aula ficou “piscando”.
- Causa provável encontrada: `LessonScreen.jsx` tinha um `setInterval(refreshLesson, 1500)`, que forçava recarregamento frequente da aula e do IndexedDB.

O que foi corrigido:
- Removido refresh automático por intervalo fixo de 1,5s.
- A tela Aula agora recarrega somente quando:
  - evento `fluency:lesson-updated` é disparado;
  - app ganha foco;
  - visibilitychange acontece;
  - usuário toca no botão atualizar da aula.
- A aula completa do IndexedDB só é recarregada quando muda o `generationId`, ou quando o usuário força refresh.
- Enquanto a aula completa já está carregada, a tela não volta para `Carregando aula completa...` sem necessidade.

Arquivos alterados:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `REWRITE_HANDOFF.md`

Commit:
- `a87fc5749b0c88767edc96628d178b994b78ec64` — evita piscadas ao carregar IndexedDB.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `a87fc57` ou posterior;
2. abrir a aba Aula;
3. ficar alguns segundos parado na tela;
4. confirmar que não fica piscando/recarregando sozinha;
5. tocar no botão atualizar da aula e confirmar que atualiza manualmente sem quebrar.

## ESTADO ANTERIOR — HOTFIX INDEXEDDB AULA COMPLETA

### `HOTFIX-STORAGE-INDEXEDDB-AULA-COMPLETA-LAB` — IMPLEMENTADO

Decisão corrigida:
- NÃO compactar a aula como solução principal.
- NÃO cortar sections, explicações, exemplos, exercícios ou conteúdo pedagógico para caber no `localStorage`.
- Aula completa e profunda é salva inteira no IndexedDB.
- `localStorage` guarda só um ponteiro/metadados leves.

O que foi implementado:
- Criado `fluency-clean/src/services/lessonIndexedDb.js`.
- `lessonStore.js` salva a aula completa no IndexedDB, sem compactar conteúdo.
- `localStorage` salva só ponteiro leve em `lesson.current`.
- `LessonScreen.jsx` carrega a aula completa via `getCurrentLessonFull()`.
- A tela Aula mostra chip `IndexedDB completo` quando a aula usa esse modo.

Commits:
- `9fde08d4b8e0916e7c82b8be0998cca052700507` — adiciona storage completo de aulas.
- `9ee3d25408fcb6521ee533048a484ece61b314bf` — salva aula completa sem compactar.
- `24725b34af47059d2d63341999cdfa3fc9fa3fa3` — carrega aula completa na tela Aula.

## ESTADO ANTERIOR — COMPARAÇÃO DE MOTORES

### `HOTFIX-COMPARATIVO-MOTORES-LAB` — IMPLEMENTADO
- `externalLessonProviders.js` permite forçar Groq ou Cerebras.
- `plannedGeminiLessons.js` recebe alvo do provedor externo.
- `LessonKeysPanel.jsx` mostra botões:
  - `Forçar fallback externo na próxima geração`;
  - `Forçar Groq na próxima geração`;
  - `Forçar Cerebras na próxima geração`.
- `lessonStore.js` calcula assinatura/hash da aula para comparar conteúdo entre motores.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA
- Cada Grammar section é reescrita sequencialmente.
- Mínimo 180 palavras por section.
- Exige contraste com português e erro típico A1 brasileiro.
- Não mexeu no professor revisor.
- Não mexeu no `deepGrammarPipeline.js`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes de testar tela sem piscadas + comparação de motores.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico como solução principal.

## Próximo teste recomendado

1. Testar se a tela Aula parou de piscar.
2. Em seguida, gerar aula forçando Groq.
3. Comparar qualidade, nota do professor e assinatura/hash com a aula do Flash.
4. Depois gerar aula forçando Cerebras.
5. Só depois decidir se algum motor deve virar primeira rota.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `a87fc57`: removeu refresh automático da tela Aula para parar piscadas ao carregar IndexedDB. Aula completa salva no IndexedDB sem compactar. Próximo passo é testar se a tela Aula não pisca; depois comparar Flash, Groq e Cerebras pela assinatura/hash e nota. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
