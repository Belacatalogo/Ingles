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

### `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- depois da introdução interna de palavras novas e do gloss flutuante, a referência visual ainda era fraca/textual;
- usuário quer que a bolha funcione como o Duolingo: palavra nova + referência visual + dica/tradução ao tocar;
- este bloco adiciona referências visuais locais, sem IA e sem depender de internet.

Arquivos criados:
- `fluency-clean/src/services/vocabularyVisualReferences.js`

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado serviço modular `getVocabularyVisualReference(card)`;
- o serviço classifica palavras em categorias visuais locais:
  - pessoas;
  - estudo;
  - comida;
  - casa;
  - cidade;
  - viagem;
  - trabalho;
  - saúde;
  - tempo;
  - ação;
  - qualidade;
  - fallback `palavra`;
- cada categoria retorna `icon`, `label` e `id`;
- a etapa `Palavras novas` agora mostra ícone + categoria visual antes da palavra;
- a caixa flutuante também mostra ícone + categoria;
- a lógica saiu do componente e ficou preparada para trocar emojis por ilustrações locais reais depois.

Commits:
- `9a75696602b7bef3febbb5c409e5eeacdf9236a6` — adiciona referências visuais locais para vocabulário.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. tocar numa bolha desbloqueada;
3. confirmar que `Palavras novas` mostra ícone/categoria, não só texto `WORD`;
4. tocar numa palavra;
5. confirmar que o gloss flutuante também mostra ícone/categoria;
6. iniciar exercícios e confirmar que nada quebrou.

## Blocos recentes implementados

### `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB` — IMPLEMENTADO
- Tradução da palavra nova abre caixa flutuante sobreposta.
- `Monte a frase` foi empurrado para depois de exposição/reconhecimento.

### `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` — IMPLEMENTADO
- Tocar na bolha abre etapa interna `Palavras novas`.
- Tocar na palavra mostra tradução e muda etiqueta de `nova` para `vista`.

### `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — IMPLEMENTADO
- Criado `vocabularyCurriculumAudit.js`.
- `getVocabularyBankAudit()` usa auditoria pedagógica central.

### `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — IMPLEMENTADO
- Criado `fixedExpansionC1C2.js`.
- Adicionados 168 cards C1/C2.
- Banco deve ficar perto de 864/7500.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — STATUS: implementado, aguardando teste.
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

- testar deploy das referências visuais no iPhone;
- confirmar que Cartas não dá tela branca;
- se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB`: criado `vocabularyVisualReferences.js` e conectado em Cartas para mostrar ícones/categorias visuais na etapa Palavras novas e no gloss flutuante. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-PAREAMENTO-10-LAB`."
