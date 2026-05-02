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

Distribuição-alvo:
- A1: 700 palavras/expressões + 500 frases/chunks;
- A2: 900 palavras/expressões + 600 frases/chunks;
- B1: 1.200 palavras/expressões + 650 frases/chunks;
- B2: 1.200 palavras/expressões + 500 frases/chunks;
- C1: 700 palavras/expressões + 200 frases/chunks;
- C2: 300 palavras/expressões + 50 frases/chunks.

## BLOCO ATUAL

### `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — Expansão fixa C1/C2 IMPLEMENTADO, aguardando deploy/teste

Contexto:
- após a reestruturação dos blocos de Cartas com base na estrutura do Duolingo, o primeiro bloco da nova ordem é fechar a primeira camada de currículo fixo até C2;
- objetivo: adicionar um primeiro lote avançado C1/C2, mantendo banco fixo, auditável e modular;
- não estamos fingindo concluir os 7.500 itens em um único bloco.

Arquivos criados:
- `fluency-clean/src/data/vocabulary/fixedExpansionC1C2.js`

Arquivos alterados:
- `fluency-clean/src/services/vocabularyDecks.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado arquivo modular de expansão C1/C2;
- adicionados 7 novos tópicos/decks:
  1. `Argumentação avançada` — C1;
  2. `Pesquisa e escrita acadêmica` — C1;
  3. `Negócios e estratégia` — C1;
  4. `Sociedade e política` — C1-C2;
  5. `Ciência e tecnologia avançada` — C1-C2;
  6. `Cultura, literatura e artes` — C2;
  7. `Comunicação profissional avançada` — C2;
- adicionados 168 novos cards fixos C1/C2;
- banco planejado deve subir de cerca de `696/7500` para cerca de `864/7500`;
- cada item segue o formato `[word, translation, example, chunk]`;
- `vocabularyDecks.js` agora importa `fixedExpansionC1C2Decks`;
- `deckDefinitions` agora soma base + A1/A2 + B1/B2 + C1/C2;
- auditoria `getVocabularyBankAudit()` continua retornando `countsByLevel`, problemas estruturais, problemas de chunk e duplicatas;
- tolerância de duplicatas passou para 32, porque algumas palavras aparecem de forma proposital entre níveis e deverão virar revisão controlada no bloco `MIX`.

Revisões feitas neste bloco:
1. Revisão estrutural: todos os novos itens foram escritos com 4 campos obrigatórios.
2. Revisão de uso: exemplos foram mantidos naturais, com vocabulário avançado em contexto, evitando frases artificiais detectadas nos testes anteriores.
3. Revisão de integração: conteúdo entra por arquivo próprio e import modular, sem `bundle.js`, sem DOM injection e sem HTML remendado.

Commits:
- `9434b5559c7cd59db351071215e59d4c6f0d5258` — adiciona expansão fixa C1 C2 de vocabulário;
- `7b0cc680a335e68910d88ac07003b058f4acdfe2` — conecta expansão fixa C1 C2 ao vocabulário.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. confirmar que o contador aparece perto de `864/7500`;
3. procurar tópicos C1/C2 na lista, como `Argumentação avançada`, `Pesquisa e escrita acadêmica`, `Sociedade e política`, `Ciência e tecnologia avançada`, `Cultura, literatura e artes`;
4. se estiverem bloqueados, confirmar apenas que aparecem na ordem;
5. confirmar que tópicos antigos continuam aparecendo e não foram perdidos;
6. se algum tópico avançado estiver liberado futuramente, abrir bolha e confirmar que a auditoria das atividades não deixa perguntas óbvias aparecerem.

## Blocos recentes implementados

### `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — IMPLEMENTADO
- Criado `fixedExpansionB1B2.js`.
- Adicionados 192 cards B1/B2.
- Banco subiu para cerca de 696/7500.

### `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — IMPLEMENTADO
- `vocabularyPractice.js` filtra atividades inseguras com `activityLooksSafe()` antes de mostrar ao aluno.
- Bloqueia opções duplicadas, resposta vazada no enunciado e atividades com menos de 3 opções.

### `BLOCO-CARTAS-HOTFIX-TIPOS-OBVIOS-1-LAB` — IMPLEMENTADO
- Removidos `Frase com a palavra` e `Chunk natural` porque entregavam a resposta.

### `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB` — IMPLEMENTADO
- `Complete a frase` mostra o significado-alvo.

### `BLOCO-CARTAS-CURRICULO-FIXO-8A-LAB` — IMPLEMENTADO
- Criado `fixedExpansionA1A2.js`.
- Adicionados 192 cards A1/A2.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — C1/C2 + auditoria inicial. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — auditoria pedagógica do banco inteiro.
3. `BLOCO-CARTAS-PREVIEW-9A-LAB` — prévia da bolha com palavras, tradução e referência visual.
4. `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — imagens/ícones locais por palavra.
5. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
6. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
7. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
8. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
9. `BLOCO-CARTAS-TRADUCAO-DIGITADA-11B-LAB` — digitação livre opcional.
10. `BLOCO-CARTAS-COMPLETAR-TRADUCAO-11C-LAB` — lacunas melhores.
11. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução.
12. `BLOCO-CARTAS-CLIQUE-SIGNIFICADO-12B-LAB` — clique na palavra que significa.
13. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
14. `BLOCO-CARTAS-LISTENING-WORDBANK-13B-LAB` — ouça e monte frase.
15. `BLOCO-CARTAS-LISTENING-LACUNA-13C-LAB` — ouça e complete lacuna.
16. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
17. `BLOCO-CARTAS-SPEAKING-RESPOSTA-14B-LAB` — responder oralmente.
18. `BLOCO-CARTAS-SOUND-DRILLS-14C-LAB` — sons difíceis.
19. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.
20. `BLOCO-CARTAS-STORIES-COMPREENSION-15B-LAB` — compreensão de stories.
21. `BLOCO-CARTAS-MIX-16-LAB` — novas + antigas + fracas.
22. `BLOCO-CARTAS-PRACTICE-HUB-16B-LAB` — prática por habilidade.
23. `BLOCO-CARTAS-MASTERY-17-LAB` — domínio mínimo.
24. `BLOCO-CARTAS-LEGENDARY-18-LAB` — modo lendário.
25. `BLOCO-CARTAS-CERTIFICACAO-TOPICO-18B-LAB` — prova por tópico.
26. `BLOCO-CARTAS-QUESTS-19-LAB` — missões diárias.
27. `BLOCO-CARTAS-XP-STREAK-19B-LAB` — XP e recompensas.
28. `BLOCO-CARTAS-AUDITORIA-GERAL-20-LAB` — auditoria final dos tipos.
29. `BLOCO-CARTAS-POLIMENTO-UI-20B-LAB` — acabamento visual.

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` no iPhone;
- confirmar contador aproximado `864/7500`;
- confirmar tópicos C1/C2 na lista;
- se ok, seguir para `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB`: criado `fixedExpansionC1C2.js`, conectado em `vocabularyDecks.js`, banco deve subir para cerca de 864/7500 itens. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB`."
