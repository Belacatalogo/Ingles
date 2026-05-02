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

### `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB` — Completar frase desambiguado IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário encontrou outro caso ambíguo no exercício `Complete a frase`;
- exemplo: `____ are my friend.` com opções `she`, `I`, `we`, `you`;
- mesmo quando uma resposta era a esperada pelo card, o enunciado não deixava claro o significado-alvo;
- para estudo sério, o exercício precisa testar frase + significado, não só uma lacuna gramatical solta.

Arquivo alterado:
- `fluency-clean/src/services/vocabularyPractice.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `activityComplete()` agora inclui o significado/tradução-alvo no prompt;
- exemplo novo esperado:
  - `Complete com a palavra que significa “você”: ____ are my friend.`;
- instrução alterada para: `Use o significado pedido para escolher a única resposta correta.`;
- isso reduz ambiguidade quando mais de uma palavra poderia encaixar gramaticalmente.

Commit:
- `0641a3f6d425489e7131513d9ae0d4154322f883` — desambigua completar frase nas cartas.

Teste recomendado no iPhone:
1. abrir Cartas > Essenciais A1 > bolha nível 2;
2. procurar exercícios `Complete a frase`;
3. confirmar que o prompt mostra o significado-alvo, como `Complete com a palavra que significa “você”`;
4. confirmar que a resposta fica clara por sentido;
5. observar se ainda aparece algum caso onde mais de uma opção possa estar correta.

### `BLOCO-CARTAS-HOTFIX-AMBIGUIDADE-CONTADOR-1-LAB` — Ambiguidade e contador corrigidos IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-DESBLOQUEIO-TESTE-1-LAB` — Marcos liberados para teste IMPLEMENTADO

### `BLOCO-CARTAS-CURRICULO-FIXO-8A-LAB` — Estrutura e expansão A1/A2 IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-TAMANHO-ORDEM-1-LAB` — Bolhas maiores e ordem misturada IMPLEMENTADO

### `BLOCO-CARTAS-USO-4-LAB` — Chunks, variações e mini-diálogos IMPLEMENTADO PARCIAL / RESTRITO

Observação:
- após teste real, a parte automática de variações foi restringida por causar ambiguidade;
- variações e mini-diálogos devem voltar apenas quando forem escritos manualmente no currículo fixo auditado, não derivados automaticamente.

### `BLOCO-CARTAS-HOTFIX-QUALIDADE-2-LAB` — Opções estáveis e uso menos óbvio IMPLEMENTADO

### `BLOCO-CARTAS-HOTFIX-AVANCO-1-LAB` — Botão de resposta das Cartas corrigido IMPLEMENTADO

### `BLOCO-CARTAS-SRS-3-LAB` — Revisão espaçada real por palavra/frase IMPLEMENTADO

### `BLOCO-HOJE-DATA-LOCAL-1-LAB` — Correção de dia local e tarefa de bolha IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2B-LAB` — Bolha abre em tela dedicada IMPLEMENTADO

### `BLOCO-CARTAS-METODO-2-LAB` — Bolhas com método de aquisição IMPLEMENTADO

### `BLOCO-CARTAS-TRILHA-1-LAB` — Cartas em trilha estilo Duolingo IMPLEMENTADO

## NOVA ORDEM DE BLOCOS — CARTAS COMO SUBSTITUTO DO DUOLINGO

1. `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB` — completar frase desambiguado. STATUS: implementado, aguardando teste.
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

- testar deploy do `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB` no iPhone;
- confirmar que `Complete a frase` mostra significado-alvo;
- confirmar que não há mais perguntas ambíguas na bolha;
- seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` se estiver ok.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-HOTFIX-COMPLETE-SENTIDO-1-LAB`: `activityComplete()` agora mostra o significado-alvo no prompt para evitar ambiguidade, por exemplo `Complete com a palavra que significa “você”`. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB`."
