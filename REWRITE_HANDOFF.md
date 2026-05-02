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

### `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — Auditoria pedagógica do banco inteiro IMPLEMENTADO, aguardando deploy/teste

Contexto:
- após criar a primeira base fixa A1/A2, B1/B2 e C1/C2, o próximo passo era criar uma auditoria curricular mais forte;
- objetivo: não depender só de conferência visual/manual e detectar problemas estruturais antes de avançar para preview, imagens e novos exercícios estilo Duolingo;
- implementação modular, sem `bundle.js`, sem DOM injection, sem HTML remendado.

Arquivos criados:
- `fluency-clean/src/services/vocabularyCurriculumAudit.js`

Arquivos alterados:
- `fluency-clean/src/services/vocabularyDecks.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `auditVocabularyCurriculum()`;
- `getVocabularyBankAudit()` agora usa a auditoria pedagógica central;
- auditoria agora calcula:
  - total de cards;
  - total de decks;
  - porcentagem da meta 7.500;
  - contagem por nível;
  - contagem por tópico;
  - duplicatas por palavra;
  - traduções repetidas demais;
  - problemas por severidade;
  - status `passedCritical`, `passedMajor` e `passedPedagogicalAudit`.

Regras de auditoria adicionadas:
- bloqueia/alerta card sem palavra;
- card sem tradução;
- card sem frase exemplo;
- card sem chunk/collocation;
- frase exemplo sem letra maiúscula inicial;
- frase exemplo sem pontuação final;
- frase exemplo curta ou longa demais para o nível;
- frase exemplo que não contém a palavra/expressão estudada;
- chunk com menos de 2 palavras;
- chunk que não aparece literalmente na frase exemplo;
- tradução suspeita ou pouco informativa;
- palavra repetida excessivamente no currículo.

Commits:
- `9e17c96c48cd8f987d8deb475d7f608f82ced413` — adiciona auditoria pedagógica do currículo de cartas;
- `40cb3fc876db0666cd2bedc500e1596ca365edca` — conecta auditoria pedagógica ao banco de cartas.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. confirmar que a tela continua carregando sem erro;
3. confirmar que o contador continua perto de `864/7500`;
4. confirmar que tópicos antigos e C1/C2 continuam aparecendo;
5. abrir uma bolha já disponível e confirmar que as sessões continuam funcionando;
6. observar se não aparece tela branca ou erro de import.

Observação:
- este bloco cria a auditoria e integra ao serviço;
- ele ainda não cria uma tela visual própria para mostrar o relatório completo de auditoria;
- a tela visual de relatório pode entrar depois em auditoria geral/polimento.

## Blocos recentes implementados

### `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — IMPLEMENTADO
- Criado `fixedExpansionC1C2.js`.
- Adicionados 168 cards C1/C2.
- Banco deve ficar perto de 864/7500.

### `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — IMPLEMENTADO
- Criado `fixedExpansionB1B2.js`.
- Adicionados 192 cards B1/B2.

### `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — IMPLEMENTADO
- `vocabularyPractice.js` filtra atividades inseguras com `activityLooksSafe()` antes de mostrar ao aluno.

### `BLOCO-CARTAS-HOTFIX-TIPOS-OBVIOS-1-LAB` — IMPLEMENTADO
- Removidos `Frase com a palavra` e `Chunk natural` porque entregavam a resposta.

### `BLOCO-CARTAS-CURRICULO-FIXO-8A-LAB` — IMPLEMENTADO
- Criado `fixedExpansionA1A2.js`.
- Adicionados 192 cards A1/A2.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — auditoria pedagógica do banco inteiro. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-PREVIEW-9A-LAB` — prévia da bolha com palavras, tradução e referência visual.
3. `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — imagens/ícones locais por palavra.
4. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
5. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
6. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
7. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
8. `BLOCO-CARTAS-TRADUCAO-DIGITADA-11B-LAB` — digitação livre opcional.
9. `BLOCO-CARTAS-COMPLETAR-TRADUCAO-11C-LAB` — lacunas melhores.
10. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução.
11. `BLOCO-CARTAS-CLIQUE-SIGNIFICADO-12B-LAB` — clique na palavra que significa.
12. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
13. `BLOCO-CARTAS-LISTENING-WORDBANK-13B-LAB` — ouça e monte frase.
14. `BLOCO-CARTAS-LISTENING-LACUNA-13C-LAB` — ouça e complete lacuna.
15. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
16. `BLOCO-CARTAS-SPEAKING-RESPOSTA-14B-LAB` — responder oralmente.
17. `BLOCO-CARTAS-SOUND-DRILLS-14C-LAB` — sons difíceis.
18. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.
19. `BLOCO-CARTAS-STORIES-COMPREENSION-15B-LAB` — compreensão de stories.
20. `BLOCO-CARTAS-MIX-16-LAB` — novas + antigas + fracas.
21. `BLOCO-CARTAS-PRACTICE-HUB-16B-LAB` — prática por habilidade.
22. `BLOCO-CARTAS-MASTERY-17-LAB` — domínio mínimo.
23. `BLOCO-CARTAS-LEGENDARY-18-LAB` — modo lendário.
24. `BLOCO-CARTAS-CERTIFICACAO-TOPICO-18B-LAB` — prova por tópico.
25. `BLOCO-CARTAS-QUESTS-19-LAB` — missões diárias.
26. `BLOCO-CARTAS-XP-STREAK-19B-LAB` — XP e recompensas.
27. `BLOCO-CARTAS-AUDITORIA-GERAL-20-LAB` — auditoria final dos tipos.
28. `BLOCO-CARTAS-POLIMENTO-UI-20B-LAB` — acabamento visual.

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` no iPhone;
- confirmar que Cartas abre sem tela branca;
- confirmar contador perto de `864/7500`;
- se ok, seguir para `BLOCO-CARTAS-PREVIEW-9A-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB`: criado `vocabularyCurriculumAudit.js` e conectado em `vocabularyDecks.js`, com auditoria pedagógica do banco inteiro. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-PREVIEW-9A-LAB`."
