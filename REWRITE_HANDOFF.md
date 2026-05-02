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

### `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` — Introdução interna da bolha IMPLEMENTADO, aguardando deploy/teste

Contexto:
- o usuário esclareceu que não queria uma prévia externa abaixo da trilha;
- o comportamento desejado é como no Duolingo: ao iniciar a bolha, a primeira etapa da própria aula apresenta as palavras novas;
- a palavra nova deve aparecer destacada, com referência visual simples, e ao tocar nela deve abrir a tradução;
- depois de tocada, a palavra deixa de parecer totalmente nova e a bolha segue para exercícios.

Arquivo alterado:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- removida a lógica de preview externo como etapa separada abaixo da trilha;
- tocar em uma bolha desbloqueada agora abre uma tela dedicada da própria bolha;
- primeira etapa interna: `Palavras novas`;
- a etapa mostra palavras novas/fracas/revisão da rodada;
- cada palavra mostra:
  - referência textual simples por categoria (`WORD`, `STUDY`, `WORK`, `TRAVEL`, etc.);
  - palavra em inglês destacada;
  - etiqueta `nova` ou `vista`;
  - ao tocar, exibe tradução/definição e frase exemplo;
- botão `Continuar para exercícios` inicia a prática normal;
- dentro da prática, botão superior `Palavras novas` permite voltar para a etapa inicial;
- a conclusão de sessão continua salvando SRS e progresso.

Commits:
- `826081e7a00a0f5e527227e6e94f9fd681cdae75` — transforma preview em introdução interna da bolha.

Observação técnica:
- houve tentativa de adicionar CSS extra para melhorar o visual da introdução, mas o conector bloqueou a atualização grande de CSS;
- a primeira versão usa classes existentes e alguns estilos inline mínimos;
- se a UI ficar visualmente pobre, fazer um bloco pequeno posterior só de CSS incremental, sem substituir o arquivo inteiro.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. tocar em uma bolha desbloqueada;
3. confirmar que abre uma tela dedicada, não uma caixa abaixo da trilha;
4. confirmar que aparece `Palavras novas` antes dos exercícios;
5. tocar em uma palavra destacada;
6. confirmar que aparece tradução/definição e exemplo;
7. confirmar que a etiqueta muda de `nova` para `vista`;
8. tocar em `Continuar para exercícios`;
9. confirmar que os exercícios iniciam normalmente;
10. tocar em `Palavras novas` dentro da prática e confirmar que volta para a introdução.

## Blocos recentes implementados

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

### `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — IMPLEMENTADO
- Criado `fixedExpansionB1B2.js`.
- Adicionados 192 cards B1/B2.

### `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — IMPLEMENTADO
- `vocabularyPractice.js` filtra atividades inseguras com `activityLooksSafe()` antes de mostrar ao aluno.

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` — introdução interna das palavras novas. STATUS: implementado, aguardando teste.
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

- testar deploy do `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB` no iPhone;
- confirmar que Cartas não dá tela branca;
- confirmar que clicar na bolha abre tela dedicada com `Palavras novas`;
- confirmar que tocar na palavra mostra tradução;
- confirmar que `Continuar para exercícios` funciona;
- se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` ou fazer polimento CSS pequeno da introdução se visual estiver fraco.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-INTRO-PALAVRAS-NOVAS-INLINE-LAB`: tocar na bolha abre uma etapa interna `Palavras novas`, tocar na palavra mostra tradução e depois segue para exercícios. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-REFERENCIA-VISUAL-9A2-LAB` ou polir CSS se necessário."
