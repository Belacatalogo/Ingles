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

### `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Diagnóstico mostrou o bug com precisão:
  - `Atual`: aula antiga da biblioteca;
  - `Histórico 0`: aula antiga `Alfabeto...`;
  - `Status título`: aula nova `Present Simple: Verbs 'To Be' and 'To Have'`;
  - `Histórico total`: 1.
- Isso indica que `lesson.lastGenerationStatus` estava localmente novo, mas `lesson.current` e `lesson.history` estavam antigos.
- Ao inspecionar `cloudSync.js`, foi identificado que o Cloud Sync sincronizava `lesson.current` e `lesson.history`, mas não sincronizava `lesson.lastGenerationStatus`, e aplicava dados da nuvem de forma perigosa para aulas.

Arquivos alterados:
- `fluency-clean/src/services/cloudSync.js`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- `lesson.lastGenerationStatus` foi adicionado a `CLOUD_SYNC_KEYS`;
- Cloud Sync agora faz merge seguro de aulas:
  - `lesson.current`: escolhe o mais recente entre local e nuvem;
  - `lesson.history`: mescla local + nuvem por ID de geração/aula/título e ordena por data;
  - `lesson.lastGenerationStatus`: escolhe o status mais recente;
- adicionadas funções auxiliares:
  - `readTime()`;
  - `readStatusTime()`;
  - `lessonKey()`;
  - `mergeLessonHistory()`;
  - `chooseNewest()`;
- corrigido erro de sintaxe introduzido durante o patch no `catch` do `pushToCloud()`.

Commits:
- `0a4221693b4d10d949bc80e9d21cc4a1b467bdb5` — corrige sintaxe do Cloud Sync seguro.

Teste recomendado no iPhone:
1. aguardar deploy do commit `0a42216`;
2. fechar e reabrir o app/PWA ou recarregar a página;
3. gerar uma nova revisão/aula;
4. abrir Diagnóstico > `Aula no storage`;
5. confirmar que `Atual`, `Histórico 0` e `Status título` mostram a mesma aula nova;
6. abrir aba Aula e confirmar que mostra a aula nova.

Observação:
- a aula nova antiga que estava só no status provavelmente não pode ser recuperada, porque ela não estava no `lesson.current` nem no `lesson.history`.
- Após este hotfix, a próxima geração deve gravar e permanecer corretamente.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## Blocos recentes implementados

### `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB` — IMPLEMENTADO
- Criado `lessonStorageDebug.js`.
- Diagnóstico mostra `lesson.current`, `lesson.history[0]` e `lesson.lastGenerationStatus`.

### `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB` — IMPLEMENTADO
- `lessonStore` sincroniza `lesson.current` usando `lesson.lastGenerationStatus` e histórico.

### `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — IMPLEMENTADO
- Criado `vocabularyVisualReferences.js`.
- Conectado em Cartas para mostrar ícones/categorias visuais na etapa Palavras novas e no gloss flutuante.

## NOVA ORDEM DE BLOCOS

1. `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB` — STATUS: implementado, aguardando teste.
2. confirmar nova geração persistindo em `Atual`, `Histórico 0` e `Status título`.
3. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
9. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
10. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB`: Cloud Sync agora sincroniza `lesson.lastGenerationStatus`, preserva a aula local mais recente e mescla histórico. Testar nova geração no iPhone; se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
