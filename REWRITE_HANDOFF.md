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

### `BLOCO-CARTAS-PREVIEW-9A-LAB` — Prévia antes da bolha IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário pediu que antes de iniciar cada bolha o sistema mostre as palavras que vão aparecer;
- a prévia deve mostrar tradução e frase exemplo para o aluno não entrar cego na prática;
- este bloco prepara a base para referência visual, gloss inline e tradução guiada.

Arquivo alterado:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- adicionado componente `BubblePreviewCard`;
- tocar em uma bolha agora abre a prévia, não entra direto na sessão;
- a prévia mostra:
  - tópico/deck;
  - número da bolha;
  - nível atual da bolha;
  - quantidade de exercícios;
  - quantidade de palavras/frases;
  - lista de cards da rodada;
  - palavra/expressão;
  - tradução/definição;
  - frase exemplo;
  - botão de áudio por item;
  - status SRS: `Nova`, `Revisão`, `Fraca`, `Dominada`;
  - botão `Começar bolha`;
- estudo em tela cheia agora só começa ao tocar em `Começar bolha`;
- botão superior dentro da prática passou a voltar para a prévia;
- importado `getVocabularySrsState()` para calcular status por palavra.

Commits:
- `439edbcfe7ccc09302052a8824c3cb9a090c5989` — adiciona preview antes da bolha de cartas.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. tocar em uma bolha desbloqueada;
3. confirmar que não entra direto nos exercícios;
4. confirmar que aparece a prévia com palavra, tradução e frase exemplo;
5. tocar no botão de áudio de uma palavra/frase;
6. tocar em `Começar bolha`;
7. confirmar que a prática abre normalmente;
8. usar `Voltar para prévia` e confirmar que retorna para o resumo da bolha.

## Blocos recentes implementados

### `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — IMPLEMENTADO
- Criado `vocabularyCurriculumAudit.js`.
- `getVocabularyBankAudit()` usa auditoria pedagógica central.

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

1. `BLOCO-CARTAS-PREVIEW-9A-LAB` — prévia da bolha com palavras, tradução e referência visual. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — imagens/ícones locais por palavra.
3. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
7. `BLOCO-CARTAS-TRADUCAO-DIGITADA-11B-LAB` — digitação livre opcional.
8. `BLOCO-CARTAS-COMPLETAR-TRADUCAO-11C-LAB` — lacunas melhores.
9. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução.
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

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-PREVIEW-9A-LAB` no iPhone;
- confirmar que a bolha abre a prévia antes da prática;
- confirmar que áudio, botão começar e voltar para prévia funcionam;
- se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-PREVIEW-9A-LAB`: tocar na bolha agora abre uma prévia com palavras, tradução, frase exemplo, status SRS e botão Começar bolha. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB`."
