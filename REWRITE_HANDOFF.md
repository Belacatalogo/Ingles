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

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## BLOCO ATUAL

### `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- mesmo após sincronização por `lesson.current`, `lesson.history[0]` e `lesson.lastGenerationStatus`, a aba Aula não trocou;
- o usuário tocou no botão de atualizar e nada aconteceu;
- precisamos parar de inferir e ver os valores reais que estão no storage do iPhone.

Arquivos criados:
- `fluency-clean/src/services/lessonStorageDebug.js`

Arquivos alterados:
- `fluency-clean/src/components/system/DiagnosticPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `getLessonStorageDebugSnapshot()`;
- o painel Diagnóstico agora mostra seção `Aula no storage` com:
  - `Atual` = `lesson.current.title`;
  - `Atual gen` = `lesson.current.generationMeta.id`;
  - `Histórico 0` = `lesson.history[0].title`;
  - `Histórico 0 gen` = `lesson.history[0].generationMeta.id`;
  - `Status título` = `lesson.lastGenerationStatus.lessonTitle`;
  - `Status gen` = `lesson.lastGenerationStatus.id`;
  - `Histórico total`;
- inclui botão `Atualizar` nessa seção para reler o storage.

Commits relacionados recentes:
- `10a77e0f0fb1baebd3c949759b05696b7b7967b3` — sincroniza aula atual pelo último status salvo;
- `895ecb7068f28addd1b0bac767173e1a942d0849` — atualiza handoff da sincronização pelo último status;
- `e491b07f46617dd401c584d5644d58d96ae343e4` — adiciona diagnóstico do storage da aula atual;
- `5269ad90953e6fb02105a4b501bc58282311f431` — mostra snapshot do storage da aula no diagnóstico.

Teste recomendado no iPhone:
1. aguardar deploy do commit `5269ad9` ou posterior;
2. abrir o painel Diagnóstico;
3. procurar a seção `Aula no storage`;
4. enviar print mostrando todos os campos:
   - Atual;
   - Atual gen;
   - Histórico 0;
   - Histórico 0 gen;
   - Status título;
   - Status gen;
   - Histórico total.

Interpretação esperada:
- se `Atual` e `Histórico 0` forem ambos a aula antiga, então a geração não está gravando a aula nova em storage apesar do log;
- se `Histórico 0` for a aula nova e `Atual` antiga, então o sync ainda não está sendo acionado pela aba Aula;
- se `Status título` for a aula nova, mas `Histórico 0` antiga, então `saveGenerationStatus` está atualizando, mas `saveCurrentLesson`/history não está persistindo corretamente;
- se todos forem antigos, o log mostrado pode estar vindo apenas de diagnóstico antigo/replay.

## Blocos recentes implementados

### `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB` — IMPLEMENTADO
- `lessonStore` sincroniza `lesson.current` usando `lesson.lastGenerationStatus` e histórico.

### `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — IMPLEMENTADO
- Criado `vocabularyVisualReferences.js`.
- Conectado em Cartas para mostrar ícones/categorias visuais na etapa Palavras novas e no gloss flutuante.

### `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB` — IMPLEMENTADO
- Tradução da palavra nova abre caixa flutuante sobreposta.
- `Monte a frase` foi empurrado para depois de exposição/reconhecimento.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB` — STATUS: implementado, aguardando teste.
2. corrigir definitivamente troca da aula atual com base no snapshot do Diagnóstico.
3. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
7. `BLOCO-CARTAS-TRADUCAO-DIGITADA-11B-LAB` — digitação livre opcional.
8. `BLOCO-CARTAS-COMPLETAR-TRADUCAO-11C-LAB` — lacunas melhores.
9. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
10. `BLOCO-CARTAS-CLIQUE-SIGNIFICADO-12B-LAB` — clique na palavra que significa.
11. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
12. `BLOCO-CARTAS-LISTENING-WORDBANK-13B-LAB` — ouça e monte frase.
13. `BLOCO-CARTAS-LISTENING-LACUNA-13C-LAB` — ouça e complete lacuna.
14. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
15. `BLOCO-CARTAS-SPEAKING-RESPOSTA-14B-LAB` — responder oralmente.
16. `BLOCO-CARTAS-SOUND-DRILLS-14C-LAB` — sons difíceis.
17. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.
18. `BLOCO-CARTAS-STORIES-COMPREENSION-15B-LAB` — compreensão de stories.
19. `BLOCO-CARTAS-MIX-16-LAB` — novas + antigas + fracas.
20. `BLOCO-CARTAS-PRACTICE-HUB-16B-LAB` — prática por habilidade.
21. `BLOCO-CARTAS-MASTERY-17-LAB` — domínio mínimo.
22. `BLOCO-CARTAS-LEGENDARY-18-LAB` — modo lendário.
23. `BLOCO-CARTAS-CERTIFICACAO-TOPICO-18B-LAB` — prova por tópico.
24. `BLOCO-CARTAS-QUESTS-19-LAB` — missões diárias.
25. `BLOCO-CARTAS-XP-STREAK-19B-LAB` — XP e recompensas.
26. `BLOCO-CARTAS-AUDITORIA-GERAL-20-LAB` — auditoria final dos tipos.
27. `BLOCO-CARTAS-POLIMENTO-UI-20B-LAB` — acabamento visual.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB`: o Diagnóstico agora mostra `lesson.current`, `lesson.history[0]` e `lesson.lastGenerationStatus`. Testar no iPhone e usar o print para corrigir definitivamente a troca da aula atual."
