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

### `BLOCO-HOTFIX-AULA-ATUAL-REFRESH-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário gerou uma revisão adaptativa;
- diagnóstico mostrou `Aula salva: Present Simple: Verbos Essenciais para o Dia a Dia`;
- mas a aba Aula continuou mostrando a aula antiga `Conhecendo Pessoas na Biblioteca: Soletrando Nomes`;
- causa provável: `saveCurrentLesson()` salvava em storage, mas a UI só relia `getCurrentLesson()` quando `lessonRevision` mudava via callback direto;
- se a geração/revisão salva a aula sem propagar callback no caminho certo, a aba Aula fica presa em memo antigo.

Arquivos alterados:
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/App.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `saveCurrentLesson()` agora dispara evento global `fluency:lesson-updated` após salvar a aula atual;
- `clearCurrentLesson()` também dispara o evento;
- `App.jsx` agora escuta `fluency:lesson-updated` e incrementa `lessonRevision`;
- `LessonScreen` já depende de `lessonRevision`, então passa a reler `getCurrentLesson()` automaticamente;
- isso deixa a aba Aula atualizada mesmo quando a aula é salva por revisão adaptativa, reparo, fallback resiliente ou qualquer outro fluxo que chame `saveCurrentLesson()`.

Commits:
- `729ec554e46643c8022559c38d69e1187af82a95` — dispara evento global ao salvar aula atual;
- `51366389ae77efd99af9071fd7a4672188be26b3` — atualiza aba Aula ao receber nova aula salva.

Teste recomendado no iPhone:
1. abrir Hoje;
2. gerar uma nova revisão/aula;
3. aguardar diagnóstico mostrar `Aula salva: ...`;
4. tocar na aba Aula;
5. confirmar que o título da aba Aula é o mesmo título salvo no diagnóstico;
6. se o diagnóstico disser `Present Simple: Verbos Essenciais para o Dia a Dia`, a aba Aula deve mostrar exatamente essa nova aula.

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

1. `BLOCO-HOTFIX-AULA-ATUAL-REFRESH-LAB` — STATUS: implementado, aguardando teste.
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

## Pendência técnica importante

- testar deploy do hotfix no iPhone;
- confirmar que aula salva no diagnóstico aparece na aba Aula;
- se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-AULA-ATUAL-REFRESH-LAB`: `saveCurrentLesson()` dispara `fluency:lesson-updated` e `App.jsx` incrementa `lessonRevision`, para a aba Aula reler a aula salva. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
