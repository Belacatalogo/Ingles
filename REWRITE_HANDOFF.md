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

### `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- na etapa `Palavras novas`, a tradução estava aparecendo dentro do próprio cartão, empurrando o conteúdo;
- o usuário explicou que precisa ser uma mini-caixa sobreposta, porque depois o mesmo padrão será usado em frases longas;
- também foi observado que `Monte a frase` apareceu cedo demais para iniciante, antes de a frase ser apresentada em exercícios anteriores.

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/services/vocabularyPractice.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado componente inline `FloatingGloss` em `FlashcardsScreen.jsx`;
- ao tocar numa palavra nova, abre uma caixa flutuante sobreposta com:
  - palavra;
  - tradução/definição;
  - frase exemplo;
  - botão `Entendi`;
- a tradução não empurra mais o cartão da palavra;
- clicar fora da caixa fecha a dica;
- a palavra continua mudando de `nova` para `vista`;
- `vocabularyPractice.js` foi reordenado pedagogicamente:
  - começo: exposição/reconhecimento (`intro`, `meaning`);
  - meio: completar, ouvir e reconhecer;
  - final: produção (`build` / Monte a frase);
- `Monte a frase` agora não deve aparecer como primeira atividade;
- enunciado de `Monte a frase` agora informa que é uma frase já estudada.

Commits:
- `bf343c425c2249743011d01a26821bc4fb74fb42` — reordena exercícios de cartas antes de montar frase;
- `88402cc8361eb9bf3b407bdf799a94622eae98ae` — mostra tradução como caixa flutuante nas palavras novas.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. tocar numa bolha desbloqueada;
3. tocar numa palavra nova;
4. confirmar que abre caixa flutuante sobreposta, não texto dentro do cartão;
5. tocar fora ou em `Entendi` e confirmar que fecha;
6. iniciar exercícios;
7. confirmar que a primeira questão não é `Monte a frase`;
8. verificar se `Monte a frase` aparece só depois de exposição/reconhecimento da frase.

## Blocos recentes implementados

### `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` — IMPLEMENTADO
- Tocar na bolha abre etapa interna `Palavras novas`.
- Tocar na palavra mostra tradução e muda etiqueta de `nova` para `vista`.

### `BLOCO-CARTAS-PREVIEW-9A-LAB` — SUBSTITUÍDO
- O conceito de preview externo foi abandonado por estar errado para o fluxo desejado.
- Substituído pelo bloco `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB`.

### `BLOCO-CARTAS-AUDITORIA-CURRICULO-8D-LAB` — IMPLEMENTADO
- Criado `vocabularyCurriculumAudit.js`.
- `getVocabularyBankAudit()` usa auditoria pedagógica central.

### `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — IMPLEMENTADO
- Criado `fixedExpansionC1C2.js`.
- Adicionados 168 cards C1/C2.
- Banco deve ficar perto de 864/7500.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB` — STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` — imagens/ícones locais por palavra.
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

## Pendência técnica importante

- testar deploy do gloss flutuante e nova ordem pedagógica no iPhone;
- confirmar que Cartas não dá tela branca;
- se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-GLOSS-FLUTUANTE-E-ORDEM-PEDAGOGICA-LAB`: tradução de palavra nova agora abre caixa flutuante sobreposta, e `Monte a frase` foi empurrado para depois de exposição/reconhecimento. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB`."
