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

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases e chunks.

Regra importante:
- as bolhas finais da trilha não devem depender de IA para gerar conteúdo;
- o conteúdo principal deve ser fixo, auditável e versionado em arquivos reais do projeto;
- IA pode ajudar em aulas, mas a trilha de vocabulário deve ter currículo próprio.

Meta revisada para competir com cursos grandes do Duolingo:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

Distribuição planejada:
- A1: 700 palavras/expressões + 500 frases/chunks;
- A2: 900 palavras/expressões + 600 frases/chunks;
- B1: 1.200 palavras/expressões + 650 frases/chunks;
- B2: 1.200 palavras/expressões + 500 frases/chunks;
- C1: 700 palavras/expressões + 200 frases/chunks;
- C2: 300 palavras/expressões + 50 frases/chunks.

Bloco responsável:
- `BLOCO-CARTAS-CURRICULO-FIXO-8-LAB`.

Esse bloco deve criar arquivos reais em `fluency-clean/src/data/vocabulary/`, organizados por nível, tópico, bolha, palavra, frase, chunk, collocation e mini-diálogo.

## BLOCO ATUAL

### `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB` — Botão de resposta das Cartas corrigido IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário testou a bolha de Cartas no iPhone;
- ao selecionar uma opção em múltipla escolha, a opção ficava marcada;
- porém o botão inferior continuava desativado com o texto `Escolha uma resposta`;
- isso impedia avançar no exercício.

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `VocabularyActivityCard` agora calcula `canCheck`;
- para exercícios de escolha/listening, o botão libera quando existe `selected`;
- texto do botão muda para `Verificar resposta` após seleção;
- intro continua com `Continuar`;
- build continua com `Verificar` quando houver palavras montadas;
- feedback continua usando `Continuar`.

Commit:
- `b49334189b12ec9e139d4f3521547c9c2ecb0740` — libera avanço após escolha nas cartas.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. abrir a primeira bolha;
3. chegar em exercício de múltipla escolha;
4. selecionar uma resposta;
5. confirmar que o botão muda para `Verificar resposta` e fica clicável;
6. tocar e confirmar que mostra feedback;
7. tocar em `Continuar` e confirmar avanço.

### `BLOCO-CARTAS-SRS-3-LAB` — Revisão espaçada real por palavra/frase IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/vocabularySrs.js`

Arquivos alterados:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/screens/TodayScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- SRS local por item de vocabulário/frase;
- estados `weak`, `learning`, `review`, `strong`, `mastered`;
- domínio estimado, próxima data de revisão e revisões vencidas;
- Cartas mostra card `Revisão espaçada`;
- Hoje mostra revisões vencidas na tarefa `Revisar flashcards`.

### `BLOCO-HOJE-DATA-LOCAL-1-LAB` — Correção de dia local e tarefa de bolha IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2B-LAB` — Bolha abre em tela dedicada IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2-LAB` — Bolhas com método de aquisição IMPLEMENTADO

### `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo IMPLEMENTADO

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

1. `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB` — botão de resposta das Cartas corrigido. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-USO-4-LAB` — usos, chunks e variações por palavra.
3. `BLOCO-CARTAS-MIX-5-LAB` — misturar palavras novas com antigas.
4. `BLOCO-CARTAS-LISTENING-SPEAKING-6-LAB` — áudio, shadowing e pronúncia.
5. `BLOCO-CARTAS-MASTERY-7-LAB` — bolha só passa com domínio mínimo.
6. `BLOCO-CARTAS-CURRICULO-FIXO-8-LAB` — currículo fixo sem IA, meta 5.000 palavras/expressões + 2.500 frases/chunks.
7. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB` no iPhone;
- confirmar que selecionar resposta libera botão;
- confirmar feedback e avanço;
- seguir depois para `BLOCO-CARTAS-USO-4-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB`: em `FlashcardsScreen.jsx`, exercícios de escolha agora liberam o botão quando existe resposta selecionada. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-USO-4-LAB`."
