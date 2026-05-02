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

### `BLOCO-CARTAS-METODO-2-LAB` — Bolhas com método de aquisição IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário quer que a aba Cartas substitua o Duolingo para aprender palavras e frases;
- não basta ter flashcards: cada palavra/frase precisa ser treinada em uso, áudio, frase, completar e montar frase;
- objetivo é aumentar vocabulário, mas também ensinar como usar esse vocabulário.

Arquivos criados:
- `fluency-clean/src/services/vocabularyPractice.js`

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/styles/flashcards-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo motor `vocabularyPractice.js`;
- cada bolha da trilha agora gera exercícios variados, não apenas flip card;
- atividades criadas:
  1. introdução da palavra/frase;
  2. reconhecer significado;
  3. escolher frase correta de uso;
  4. completar frase;
  5. ouvir frase e escolher;
  6. montar frase com blocos de palavras;
- níveis da bolha agora mudam a quantidade/profundidade:
  - nível 1: poucas palavras e reconhecimento/uso simples;
  - nível 2: mais palavras, completar e listening;
  - nível 3: consolidação com montar frase;
- a `Aula atual` continua com flashcards simples;
- a `Trilha de vocabulário` usa o novo método de exercícios;
- acertos/erros da bolha continuam salvos via `recordFlashcardSession()`;
- progresso 3/3 da bolha continua salvo em `vocabularyPath.js`;
- CSS novo em `flashcards-polish.css` para tela de exercícios das bolhas, com visual parecido com prática fullscreen/Duolingo.

Commits:
- `21018d7b555ccf791812ca5a787e45cc02d46192` — adiciona motor de prática de vocabulário;
- `adf97d4396d367407ea4bff5d9377fef9ffaa7dc` — usa exercícios variados nas bolhas de vocabulário;
- `a5142f571c3a6089a527b729c7d4a32382a1b85b` — estiliza exercícios variados das bolhas.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. abrir Cartas > Trilha de vocabulário;
3. abrir Essenciais A1;
4. tocar na primeira bolha;
5. confirmar que aparecem exercícios variados, não apenas carta virando;
6. verificar áudio, múltipla escolha, completar frase, ouvir frase e montar frase;
7. concluir a rodada e confirmar que a bolha avança para 1/3;
8. repetir até 3/3 e confirmar desbloqueio da próxima bolha.

### `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/vocabularyPath.js`

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/styles/flashcards-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- Cartas tem `Aula atual` e `Trilha de vocabulário`;
- tópicos antigos ficam dentro da trilha;
- bolhas têm 3 níveis e desbloqueio progressivo;
- progresso local salvo em `fluency.vocabularyPath.v1`.

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

1. `BLOCO-CARTAS-METODO-2-LAB` — Bolhas com método de aquisição. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-SRS-3-LAB` — revisão espaçada real por palavra/frase.
3. `BLOCO-CARTAS-USO-4-LAB` — usos, chunks e variações por palavra.
4. `BLOCO-CARTAS-MIX-5-LAB` — misturar palavras novas com antigas.
5. `BLOCO-CARTAS-LISTENING-SPEAKING-6-LAB` — áudio, shadowing e pronúncia.
6. `BLOCO-CARTAS-MASTERY-7-LAB` — bolha só passa com domínio mínimo.
7. `BLOCO-CARTAS-BANCO-8-LAB` — expandir banco até 2.000 itens.
8. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-CARTAS-METODO-2-LAB` no iPhone;
- confirmar que a sessão de bolha renderiza;
- confirmar que exercícios registram acerto/erro;
- confirmar que a bolha avança 1/3 ao concluir;
- seguir depois para `BLOCO-CARTAS-SRS-3-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-METODO-2-LAB`: criado `vocabularyPractice.js`, bolhas da trilha agora usam exercícios variados como introdução, significado, frase, completar, ouvir e montar frase. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-SRS-3-LAB`."
