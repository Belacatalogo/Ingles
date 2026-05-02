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

### `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Diagnóstico mostrou que `Status título` mudava para a aula nova, mas `Atual` e `Histórico 0` continuavam antigos.
- Isso significa que o fluxo chegava ao ponto de status/log, mas a aula completa não estava sendo persistida como `lesson.current`.
- Possível causa no iPhone: limite/quota de `localStorage`, histórico grande ou falha silenciosa ao gravar objeto grande.
- O log “Aula salva” estava enganoso porque o status pequeno podia gravar mesmo se a aula grande não tivesse sido confirmada.

Arquivo alterado:
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- `saveCurrentLesson()` agora usa persistência verificada:
  - grava `lesson.current`;
  - relê `lesson.current`;
  - confirma que `generationMeta.id` salvo é o mesmo da aula nova;
- se falhar, limpa `lesson.history` e tenta gravar `lesson.current` de novo;
- se ainda falhar, cria uma versão compacta da aula:
  - limita intro/listeningText/sections/vocabulary/exercises/prompts;
  - marca `generationMeta.compactedForStorage = true`;
- só depois da confirmação real grava `lesson.lastGenerationStatus` com evento `saved`;
- se a aula não for persistida, grava status `storage-failed` e NÃO registra status falso de aula salva;
- histórico agora guarda até 6 aulas, não 30, para reduzir risco no iPhone;
- se histórico não couber, tenta salvar só a aula atual no histórico.

Commit principal:
- `7f7cbedc8e27491b453172d1d8ca77a1c5734eb3` — garante status saved somente após aula persistida.

Teste recomendado no iPhone:
1. aguardar deploy do commit `7f7cbed`;
2. recarregar o PWA;
3. gerar nova aula/revisão;
4. aguardar terminar completamente;
5. abrir Diagnóstico > Aula no storage;
6. confirmar que `Atual`, `Histórico 0` e `Status título` agora mostram o mesmo título da aula nova;
7. abrir aba Aula e confirmar que a aula nova aparece.

Se aparecer `storage-failed`:
- o iPhone não conseguiu gravar nem a versão compacta;
- próximo passo será migrar `lesson.current` para IndexedDB ou reduzir ainda mais o payload salvo.

## Blocos recentes implementados

### `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB` — IMPLEMENTADO
- Cloud Sync sincroniza `lesson.lastGenerationStatus`.
- Preserva aula local mais recente.
- Mescla histórico local + nuvem.

### `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB` — IMPLEMENTADO
- Criado `lessonStorageDebug.js`.
- Diagnóstico mostra `lesson.current`, `lesson.history[0]` e `lesson.lastGenerationStatus`.

### `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB` — IMPLEMENTADO
- `lessonStore` sincroniza `lesson.current` usando `lesson.lastGenerationStatus` e histórico.

### `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — IMPLEMENTADO
- Criado `vocabularyVisualReferences.js`.
- Conectado em Cartas para mostrar ícones/categorias visuais na etapa Palavras novas e no gloss flutuante.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — STATUS: implementado, aguardando teste.
2. confirmar nova geração persistindo em `Atual`, `Histórico 0` e `Status título`.
3. se persistência falhar com `storage-failed`, migrar aula atual para IndexedDB ou reduzir payload.
4. se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
5. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
6. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
7. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
8. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
9. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
10. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
11. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB`: `saveCurrentLesson()` agora só grava status `saved` depois de confirmar que `lesson.current` realmente foi persistido; se falhar, limpa histórico e tenta versão compacta. Testar no iPhone. Se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
