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

## BLOCO ATUAL

### `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — Auditoria das perguntas geradas IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário pediu uma análise completa da estrutura de perguntas e respostas;
- foram encontrados riscos restantes mesmo após remover tipos ruins;
- o problema principal não é só um tipo específico, mas a falta de uma trava que valide a atividade pronta antes de mostrar ao aluno.

Arquivo alterado:
- `fluency-clean/src/services/vocabularyPractice.js`
- `REWRITE_HANDOFF.md`

Análise feita:
1. Tipos anteriores `Frase com a palavra` e `Chunk natural` eram ruins porque entregavam resposta e já foram removidos.
2. `repeatToTarget()` pode gerar repetição, mas é aceitável temporariamente para manter 15–20 questões sem reintroduzir tipos ruins.
3. `Complete a frase` ficou mais seguro porque mostra o significado-alvo.
4. `Monte a frase` ainda deve ser melhorado depois para tratar tokens usados por ID e não permitir confusão visual.
5. O banco tem repetições intencionais entre tópicos, mas isso precisa virar revisão marcada no bloco `BLOCO-CARTAS-MIX-5-LAB`.

O que foi implementado:
- criado `activityLooksSafe()`;
- criado `includesNormalized()`;
- `interleaveActivities()` agora filtra atividades inseguras antes de montar a sessão;
- `repeatToTarget()` também só repete atividades que passam na auditoria;
- regras atuais da auditoria:
  - atividade precisa existir;
  - escolha múltipla precisa ter pelo menos 3 opções;
  - opções duplicadas são bloqueadas;
  - a resposta precisa estar entre as opções;
  - se a resposta aparece literalmente no enunciado principal, a atividade é bloqueada;
  - em `Complete a frase`, se a resposta aparecer na parte mascarada, a atividade é bloqueada;
  - em `Listen`, prompt e resposta precisam bater exatamente após normalização;
- a auditoria impede que tipos futuros voltem a entregar resposta por acidente.

Commits:
- `b69c81c8168ec95d86c120b41fd63f1e5bcd6288` — remove tipos que entregavam resposta nas cartas;
- `fe010a0fb36baa775718a6740fa4c104c6ccec8f` — adiciona auditoria das atividades de cartas.

Teste recomendado no iPhone:
1. abrir Cartas > Essenciais A1 > bolha nível 2;
2. confirmar que `Frase com a palavra` e `Chunk natural` não aparecem;
3. confirmar que perguntas restantes não entregam resposta no enunciado;
4. confirmar que ainda há sessão suficiente, perto de 15–20 exercícios;
5. testar um tópico novo A1-A2 ou A2 para ver se a auditoria não esvaziou as atividades.

### `BLOCO-CARTAS-HOTFIX-TIPOS-OBVIOS-1-LAB` — Tipos que entregavam resposta removidos IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB` — Completar frase desambiguado IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-AMBIGUIDADE-CONTADOR-1-LAB` — Ambiguidade e contador corrigidos IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-DESBLOQUEIO-TESTE-1-LAB` — Marcos liberados para teste IMPLEMENTADO

### `BLOCO-CARTAS-CURRICULO-FIXO-8A-LAB` — Estrutura e expansão A1/A2 IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-TAMANHO-ORDEM-1-LAB` — Bolhas maiores e ordem misturada IMPLEMENTADO

### `BLOCO-CARTAS-USO-4-LAB` — Chunks, variações e mini-diálogos IMPLEMENTADO PARCIAL / RESTRITO

Observação:
- após teste real, a parte automática de variações/chunks foi restringida por causar ambiguidade ou entregar resposta;
- variações, chunks e mini-diálogos devem voltar apenas quando forem escritos manualmente no currículo fixo auditado e treinados por exercícios próprios.

### `BLOCO-CARTAS-HOTFIX-QUALIDADE-2-LAB` — Opções estáveis e uso menos óbvio IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB` — Botão de resposta das Cartas corrigido IMPLEMENTADO

### `BLOCO-CARTAS-SRS-3-LAB` — Revisão espaçada real por palavra/frase IMPLEMENTADO

### `BLOCO-HOJE-DATA-LOCAL-1-LAB` — Correção de dia local e tarefa de bolha IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2B-LAB` — Bolha abre em tela dedicada IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2-LAB` — Bolhas com método de aquisição IMPLEMENTADO

### `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo IMPLEMENTADO

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — auditoria das perguntas geradas. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — expansão B1/B2.
3. `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — C1/C2 + auditoria tripla profunda.
4. `BLOCO-CARTAS-PREVIEW-9A-LAB` — prévia da bolha com palavras, tradução e referência visual.
5. `BLOCO-CARTAS-GLOSS-INLINE-9B-LAB` — clicar na palavra e abrir mini-caixa com tradução.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-9C-LAB` — traduzir com bolhas de palavras + escrita opcional.
7. `BLOCO-CARTAS-MIX-5-LAB` — misturar palavras novas com antigas.
8. `BLOCO-CARTAS-LISTENING-SPEAKING-6-LAB` — áudio, shadowing e pronúncia.
9. `BLOCO-CARTAS-MASTERY-7-LAB` — bolha só passa com domínio mínimo.
10. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — auditoria geral e polimento final.

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` no iPhone;
- confirmar que a auditoria não esvaziou sessões;
- confirmar que não aparecem tipos óbvios/ruins;
- seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` se estiver ok.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB`: `vocabularyPractice.js` agora filtra atividades inseguras com `activityLooksSafe()` antes de mostrar ao aluno. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB`."
