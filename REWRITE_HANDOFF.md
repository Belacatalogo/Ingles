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

### `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — Expansão fixa B1/B2 IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário pediu seguir para o próximo bloco após auditoria das atividades;
- o próximo bloco oficial era expansão B1/B2;
- objetivo é ampliar o banco fixo sem IA e manter conteúdo modular/auditável;
- não foi prometido concluir os 7.500 itens em um bloco só.

Arquivos criados:
- `fluency-clean/src/data/vocabulary/fixedExpansionB1B2.js`

Arquivos alterados:
- `fluency-clean/src/services/vocabularyDecks.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado arquivo modular de expansão B1/B2;
- adicionados 8 novos tópicos/decks:
  1. `Trabalho e carreira`;
  2. `Opiniões e argumentos`;
  3. `Problemas do dia a dia`;
  4. `Mídia e tecnologia`;
  5. `Saúde e estilo de vida`;
  6. `Educação e aprendizado`;
  7. `Viagem e cultura`;
  8. `Meio ambiente e sociedade`;
- adicionados 192 novos cards fixos B1/B2;
- banco passou de 504 para 696 palavras/expressões planejadas no app;
- cada item segue formato `[word, translation, example, chunk]`;
- exemplos foram mantidos simples, naturais e compatíveis com B1/B2;
- `vocabularyDecks.js` agora importa `fixedExpansionB1B2Decks`;
- `deckDefinitions` agora une base + A1/A2 + B1/B2;
- `getVocabularyBankAudit()` agora retorna `countsByLevel`;
- duplicatas permitidas na auditoria subiram de 12 para 24, pois algumas repetições são intencionais entre níveis e devem virar revisão no bloco de mix.

Revisões feitas neste bloco:
1. Revisão estrutural: todos os itens do novo arquivo usam 4 campos obrigatórios.
2. Revisão de uso: exemplos evitam estruturas muito avançadas para B1/B2 e usam collocations úteis.
3. Revisão de integração: expansão entra por import modular, sem `bundle.js`, sem DOM injection e sem HTML remendado.

Commits:
- `2409c28b52b461a1708be8c9904c77180946757a` — adiciona expansão fixa B1 B2 de vocabulário;
- `9cef29fcc5ffff5f5b8f181a8992adaba07b2eed` — conecta expansão fixa B1 B2 ao vocabulário.

Teste recomendado no iPhone:
1. abrir Cartas > Trilha de vocabulário;
2. confirmar que contador subiu para aproximadamente `696/7500`;
3. procurar tópicos B1/B2 na lista, como `Trabalho e carreira`, `Mídia e tecnologia`, `Meio ambiente e sociedade`;
4. se estiverem bloqueados, apenas confirmar que aparecem na ordem;
5. se algum marco B1/B2 estiver aberto no futuro, iniciar uma bolha e confirmar que as perguntas passam pela auditoria.

### `BLOCO-CARTAS-AUDITORIA-ATIVIDADES-1-LAB` — Auditoria das perguntas geradas IMPLEMENTADO

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

1. `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` — expansão B1/B2. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB` — C1/C2 + auditoria tripla profunda.
3. `BLOCO-CARTAS-PREVIEW-9A-LAB` — prévia da bolha com palavras, tradução e referência visual.
4. `BLOCO-CARTAS-GLOSS-INLINE-9B-LAB` — clicar na palavra e abrir mini-caixa com tradução.
5. `BLOCO-CARTAS-TRADUCAO-GUIADA-9C-LAB` — traduzir com bolhas de palavras + escrita opcional.
6. `BLOCO-CARTAS-MIX-5-LAB` — misturar palavras novas com antigas.
7. `BLOCO-CARTAS-LISTENING-SPEAKING-6-LAB` — áudio, shadowing e pronúncia.
8. `BLOCO-CARTAS-MASTERY-7-LAB` — bolha só passa com domínio mínimo.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — auditoria geral e polimento final.

## Pendência técnica importante

- testar deploy do `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB` no iPhone;
- confirmar contador aproximado `696/7500`;
- confirmar novos tópicos B1/B2 na lista;
- se ok, seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CARTAS-CURRICULO-FIXO-8B-LAB`: criado `fixedExpansionB1B2.js`, conectado em `vocabularyDecks.js`, banco subiu para cerca de 696/7500 itens. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-CURRICULO-FIXO-8C-LAB`."
