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

### `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- o usuário gerou revisão/aula nova;
- diagnóstico mostrava `Aula salva: Present Simple...`, mas a aba Aula continuava mostrando a aula antiga;
- o botão de atualizar do card também não resolveu;
- o gerador principal já chama `saveCurrentLesson(reviewedLesson...)`, então o problema parece estar no consumo/sincronização entre `lesson.current`, `lesson.history` e `lesson.lastGenerationStatus`.

Arquivos alterados neste hotfix:
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

O que foi implementado agora:
- `getFreshestLessonRaw()` agora lê também `lesson.lastGenerationStatus`;
- criado `findHistoryLessonByStatus(history, status)`;
- a sincronização tenta encontrar no histórico a aula que corresponde ao último status salvo por:
  - `generationMeta.id === status.id`;
  - `lesson.id === status.lessonId` ou `curriculumId === status.lessonId`;
  - `lesson.title === status.lessonTitle` ou `expectedTitle === status.lessonTitle`;
- se encontrar, força essa aula como `lesson.current`;
- registra diagnóstico: `Aula atual sincronizada pelo último status salvo: ...`;
- mantém o fallback anterior: se não achar por status, usa a aula mais recente do histórico.

Commits relacionados:
- `729ec554e46643c8022559c38d69e1187af82a95` — dispara evento global ao salvar aula atual;
- `51366389ae77efd99af9071fd7a4672188be26b3` — atualiza aba Aula ao receber nova aula salva;
- `13acf20053a298ecab33f3e927f767db3bb0aaee` — usa aula mais recente entre atual e histórico;
- `905c51d953820782688c32de671f04e9af75125b` — força aba Aula a reler aula salva;
- `10a77e0f0fb1baebd3c949759b05696b7b7967b3` — sincroniza aula atual pelo último status salvo.

Teste recomendado no iPhone:
1. aguardar deploy do commit `10a77e0`;
2. abrir aba Aula;
3. tocar no botão de atualizar do card se ainda estiver antigo;
4. se o diagnóstico tiver `Aula salva: Present Simple...`, a aba Aula deve trocar para essa aula;
5. se ainda não trocar, gerar uma nova aula/revisão após o deploy e conferir se o título salvo no diagnóstico vira o título da aba Aula.

Se ainda falhar depois disso:
- o problema provavelmente não é mais leitura da aba Aula;
- será preciso instrumentar o painel Diagnóstico para mostrar explicitamente:
  - `lesson.current.title`;
  - `lesson.current.generationMeta.id`;
  - `lesson.history[0].title`;
  - `lesson.history[0].generationMeta.id`;
  - `lesson.lastGenerationStatus.lessonTitle`;
  - `lesson.lastGenerationStatus.id`.

## Blocos recentes implementados

### `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — IMPLEMENTADO
- Criado `vocabularyVisualReferences.js`.
- Conectado em Cartas para mostrar ícones/categorias visuais na etapa Palavras novas e no gloss flutuante.

### `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB` — IMPLEMENTADO
- Tradução da palavra nova abre caixa flutuante sobreposta.
- `Monte a frase` foi empurrado para depois de exposição/reconhecimento.

### `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` — IMPLEMENTADO
- Tocar na bolha abre etapa interna `Palavras novas`.
- Tocar na palavra mostra tradução e muda etiqueta de `nova` para `vista`.

### `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — IMPLEMENTADO
- Criado `vocabularyCurriculumAudit.js`.
- `getVocabularyBankAudit()` usa auditoria pedagógica central.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB` — STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
3. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
4. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
5. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
6. `BLOCO-CARTAS-TRADUCAO-DIGITADA-11B-LAB` — digitação livre opcional.
7. `BLOCO-CARTAS-COMPLETAR-TRADUCAO-11C-LAB` — lacunas melhores.
8. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
9. `BLOCO-CARTAS-CLIQUE-SIGNIFICADO-12B-LAB` — clique na palavra que significa.
10. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
11. `BLOCO-CARTAS-LISTENING-WORDBANK-13B-LAB` — ouça e monte frase.
12. `BLOCO-CARTAS-LISTENING-LACUNA-13C-LAB` — ouça e complete lacuna.
13. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
14. `BLOCO-CARTAS-SPEAKING-RESPOSTA-14B-LAB` — responder oralmente.
15. `BLOCO-CARTAS-SOUND-DRILLS-14C-LAB` — sons difíceis.
16. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.
17. `BLOCO-CARTAS-STORIES-COMPREENSION-15B-LAB` — compreensão de stories.
18. `BLOCO-CARTAS-MIX-16-LAB` — novas + antigas + fracas.
19. `BLOCO-CARTAS-PRACTICE-HUB-16B-LAB` — prática por habilidade.
20. `BLOCO-CARTAS-MASTERY-17-LAB` — domínio mínimo.
21. `BLOCO-CARTAS-LEGENDARY-18-LAB` — modo lendário.
22. `BLOCO-CARTAS-CERTIFICACAO-TOPICO-18B-LAB` — prova por tópico.
23. `BLOCO-CARTAS-QUESTS-19-LAB` — missões diárias.
24. `BLOCO-CARTAS-XP-STREAK-19B-LAB` — XP e recompensas.
25. `BLOCO-CARTAS-AUDITORIA-GERAL-20-LAB` — auditoria final dos tipos.
26. `BLOCO-CARTAS-POLIMENTO-UI-20B-LAB` — acabamento visual.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-AULA-ATUAL-SYNC-STATUS-LAB`: `lessonStore` agora sincroniza `lesson.current` usando `lesson.lastGenerationStatus` e o histórico. Testar no iPhone; se ainda não trocar, instrumentar Diagnóstico mostrando current/history/status. Se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
