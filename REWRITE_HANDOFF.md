# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## MODO DE COMMIT E DEPLOY — ATUALIZADO

O antigo PROTOCOLO ECONÔMICO DE DEPLOY está temporariamente suspenso por pedido do usuário.

Nova regra operacional enquanto a reconstrução da prática estiver em andamento:
1. Prioridade máxima: qualidade, limpeza arquitetural e ausência de gambiarra.
2. Pode fazer múltiplos commits por bloco quando for necessário para corrigir build, separar módulos ou facilitar validação.
3. Cada alteração ainda deve atualizar o handoff quando mudar o estado do projeto.
4. Continuar usando apenas a branch `rewrite-fluency-clean-lab`.
5. Não avançar para `rewrite-fluency-clean` ou `main` sem validação no iPhone.

## OBJETIVO PEDAGÓGICO FINAL

O Fluency não deve ser apenas um gerador de aulas bonitas.

Meta final do sistema:

`diagnosticar → ensinar → praticar → corrigir → revisar → testar → só então avançar`

Princípio máximo:

`o aluno só avança quando prova domínio, não apenas quando conclui uma aula.`

## BLOCO ATUAL

### `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário pediu que a aba Cartas deixe de ser apenas flashcards lineares;
- a área ao lado de `Aula atual` deve ter apenas um botão compacto para a trilha;
- os tópicos como `Essenciais A1`, `Pessoas e família` etc devem ficar dentro desse botão/área, em ordem pelo nível;
- usuário quer um método inspirado no Duolingo: mapa, trilha, bolhas, níveis e desbloqueio progressivo.

Arquivos criados:
- `fluency-clean/src/services/vocabularyPath.js`

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/styles/flashcards-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `vocabularyPath.js`;
- progresso local da trilha salvo em `localStorage` com chave `fluency.vocabularyPath.v1`;
- a tela Cartas agora tem dois modos principais:
  1. `Aula atual`, quando houver vocabulário da aula;
  2. `Trilha de vocabulário`;
- os decks/tópicos antigos foram movidos para dentro da trilha;
- tópicos aparecem em ordem e com desbloqueio progressivo;
- o primeiro tópico começa desbloqueado;
- o próximo tópico só libera quando o anterior for concluído;
- cada tópico é dividido em bolhas de até 6 cartas;
- cada bolha tem 3 níveis;
- nível 1 apresenta poucas palavras;
- nível 2 adiciona mais palavras/uso;
- nível 3 consolida antes de liberar a próxima bolha;
- ao concluir uma rodada da bolha, `completeVocabularyBubbleLevel()` salva o nível concluído;
- a próxima bolha libera após completar 3/3 na bolha atual;
- visual da trilha usa bolhas alternadas esquerda/direita com status bloqueado, ativo e concluído;
- a sessão ainda usa áudio, exemplo, resposta, classificação de dificuldade e registro real em `recordFlashcardSession()`;
- esta é a primeira versão do método, ainda baseada nas cartas existentes; próximos blocos podem evoluir de flashcard para exercícios variados por palavra.

Commits:
- `63d95017f70b3564a2281d52eef935bcc2a1b99e` — adiciona trilha progressiva de vocabulário;
- `aca1de59d2ad617593fa3deb4a751b4675dcf77f` — transforma cartas em trilha de vocabulário;
- `a83736fa760a7bb6e33714de45e513913e72cd5e` — estiliza trilha de vocabulário das cartas.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. abrir Cartas;
3. confirmar que no topo aparecem apenas `Aula atual` e `Trilha de vocabulário`;
4. tocar em `Trilha de vocabulário`;
5. confirmar que tópicos ficam dentro da trilha;
6. abrir `Essenciais A1`;
7. confirmar mapa com bolhas;
8. concluir nível 1 de uma bolha;
9. confirmar que a bolha mostra 1/3;
10. concluir níveis 2 e 3;
11. confirmar que a próxima bolha desbloqueia;
12. confirmar que próximo tópico só desbloqueia após concluir todas as bolhas do tópico atual.

### `BLOCO-LISTENING-COERENCIA-1B-LAB` — Fechamento narrativo do Listening IMPLEMENTADO

### `BLOCO-LISTENING-COERENCIA-1-LAB` — Fonte única da aula Listening IMPLEMENTADO

### `BLOCO-20-LAB` — Certificação por nível IMPLEMENTADO

### `BLOCO-15-LAB` — Banco de erros real IMPLEMENTADO

### `BLOCO-16-LAB` — Histórico real de Speaking IMPLEMENTADO

### `BLOCO-CONFIANÇA-DE-ESTUDO-LAB` — Aula vale estudar + painel compacto IMPLEMENTADO

### `BLOCO-QUALIDADE-POR-ABA-LAB` — Áreas analisadas pelo professor IMPLEMENTADO

### `BLOCO-LISTENING-DUPLICIDADE-PRATICA-LAB` — Exercícios duplicados removidos da aula Listening IMPLEMENTADO

### `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB` — Fallback contra JSON escapado IMPLEMENTADO

### `BLOCO-ANTI-FALSO-DOMÍNIO-LAB` — Reparo local contra falso domínio IMPLEMENTADO

### `BLOCO-LISTENING-ORDEM-1-LAB` — Ordem da aula Listening e conceito recolhido IMPLEMENTADO

### `BLOCO-17-LAB` — Qualidade visível da aula IMPLEMENTADO

### `BLOCO-13-LAB` — Professor Gerador/Revisor IMPLEMENTADO

### `BLOCO-11-LAB` — Plano primeiro, aula depois IMPLEMENTADO

### `BLOCO-GERAÇÃO-ESTABILIDADE-1B-LAB` — Parser JSON tolerante IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB` — AutoFill adaptativo por progresso IMPLEMENTADO

### `BLOCO-GERAÇÃO-VARIAÇÃO-2-LAB` — Bloqueio de repetição e reparo sem fallback antigo IMPLEMENTADO

### `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB` — Aula nova precisa variar de verdade IMPLEMENTADO

### `BLOCO-GERAÇÃO-STATUS-1-LAB` — Prova visual de aula nova IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-14-LAB` — Contrato JSON rígido IMPLEMENTADO

### `BLOCO-12-LAB` — Rubricas por tipo de aula IMPLEMENTADO

### `BLOCO-AUDIO-CACHE-1B-LAB` — Player iOS/Comet com fila mais segura IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO

Pendente técnica:
- tentativa de remover/substituir `fluency-clean/src/lessons/ListeningLesson.jsx` antigo foi bloqueada por SHA inconsistente retornado pelo conector;
- a tela ativa já usa `ListeningLessonClean.jsx` via `LessonScreen.jsx`, então o app não depende do arquivo antigo;
- tentar limpar novamente depois ou via PR separado.

## NOVA ORDEM DE BLOCOS — QUALIDADE REAL DAS AULAS

1. `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-METODO-2-LAB` — evoluir bolhas para exercícios variados, não só flip card.
3. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
4. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## FASE EXTRA — GARANTIA PEDAGÓGICA MÁXIMA

Esses blocos foram adicionados por pedido do usuário para reduzir ao máximo o risco de perder tempo com conteúdo raso ou falso progresso.

Ordem recomendada após os blocos principais:

1. `BLOCO-DOMÍNIO-1-LAB` — Travas reais de progressão.
2. `BLOCO-DIAGNÓSTICO-PROFUNDO-1-LAB` — Teste inicial e reavaliações.
3. `BLOCO-MAPA-DE-DOMÍNIO-1-LAB` — Mapa real do que o aluno sabe.
4. `BLOCO-REVISÃO-INTELIGENTE-1-LAB` — Revisão espaçada real.
5. `BLOCO-PROVA-DE-DOMÍNIO-1-LAB` — Mini provas por unidade.
6. `BLOCO-ANTI-ILUSÃO-1-LAB` — Detectar falso domínio.
7. `BLOCO-QUESTÕES-QUALIDADE-2-LAB` — Auditor de exercícios.
8. `BLOCO-WRITING-CORRECTION-1-LAB` — Correção séria de escrita.
9. `BLOCO-SPEAKING-COACH-2-LAB` — Evolução real de pronúncia.
10. `BLOCO-CONTEÚDO-REAL-1-LAB` — Inglês autêntico progressivo.
11. `BLOCO-MODO-PROFESSOR-1-LAB` — Explicar de outro jeito quando o aluno não entende.
12. `BLOCO-RELATÓRIO-SEMANAL-1-LAB` — Prova de evolução.

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-TRILHA-1-LAB` no iPhone;
- confirmar que o PWA não ficou pesado;
- confirmar que o progresso da trilha salva;
- confirmar desbloqueio de bolhas e tópicos;
- seguir depois para `BLOCO-CARTAS-METODO-2-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-TRILHA-1-LAB`: criado `vocabularyPath.js`, Cartas agora tem `Aula atual` e `Trilha de vocabulário`, tópicos ficam dentro da trilha, bolhas têm 3 níveis e desbloqueio progressivo. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-METODO-2-LAB`."
