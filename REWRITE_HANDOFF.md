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

## BLOCO ATUAL

### `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB` — Aula nova precisa variar de verdade IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário confirmou que a prova visual funcionou: apareceu ID `gen-...`, contrato `lesson-contract-v1` e nota 96/100;
- porém a aula parecia igual porque a próxima aula do cronograma ainda era o mesmo tema: `A1 · listening · Alfabeto, sons iniciais e spelling de nomes`;
- o sistema estava gerando nova tentativa, mas com prompt muito determinístico e sem contexto explícito de variação.

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `generateLessonDraft()` agora aceita `previousLesson` e `forceVariation`;
- quando `forceVariation` está ativo, o gerador cria `generationSeed` e adiciona uma instrução de variação real no prompt;
- a instrução obriga variar título, situação comunicativa, nomes dos personagens, roteiro/transcrição, exemplos, vocabulário secundário e exercícios;
- o prompt recebe um resumo da aula anterior para evitar repetição;
- foram criados temas alternativos por seed: escola, biblioteca, cafeteria, recepção, chamada de vídeo, loja pequena;
- temperatura do Gemini para aulas subiu de `0.18` para `0.34` para reduzir repetição sem perder controle;
- `LessonGeneratorPanel.jsx` agora envia a aula atual como `previousLesson` quando o usuário marca substituição;
- o checkbox passou de `gerar uma nova de verdade` para `gerar uma versão diferente`;
- o botão passa a mostrar `Gerar versão diferente`;
- `lessonStore.js` salva `generationSeed`, `variationMode`, `replacedPreviousLessonId` e `replacedPreviousGenerationId` dentro de `generationMeta`;
- último status agora pode mostrar `Nova versão diferente gerada e salva.`;
- diagnóstico registra `Variação real ativa para mesmo tema. Seed: ...`.

Teste recomendado:
1. aguardar deploy;
2. abrir geração de aula;
3. marcar `Substituir aula atual e gerar uma versão diferente`;
4. gerar;
5. no Diagnóstico, confirmar `Variação real ativa para mesmo tema. Seed: ...`;
6. abrir Aula e verificar se o ID `gen-...` mudou;
7. conferir se o título, contexto/roteiro e transcrição mudaram de verdade, mesmo mantendo o tema do cronograma.

### `BLOCO-GERAÇÃO-STATUS-1-LAB` — Prova visual de aula nova IMPLEMENTADO E VALIDADO PELO USUÁRIO

Contexto:
- usuário gerou nova aula e confirmou visualmente o badge `gen-...`, `lesson-contract-v1` e nota de qualidade;
- isso provou que a geração nova aconteceu, mas não garantia variação de conteúdo.

Arquivos alterados:
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

### `BLOCO-14-LAB` — Contrato JSON rígido IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/lessonJsonContract.js`

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- contrato `lesson-contract-v1`;
- chaves obrigatórias por bloco;
- instruções anti-conteúdo raso;
- contrato conectado ao gerador Gemini.

### `BLOCO-12-LAB` — Rubricas por tipo de aula IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/lessonRubrics.js`

Arquivos alterados:
- `fluency-clean/src/services/lessonValidation.js`
- `REWRITE_HANDOFF.md`

### `BLOCO-AUDIO-CACHE-1B-LAB` — Player iOS/Comet com fila mais segura IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO

Pendente técnica:
- tentativa de remover/substituir `fluency-clean/src/lessons/ListeningLesson.jsx` antigo foi bloqueada por SHA inconsistente retornado pelo conector;
- a tela ativa já usa `ListeningLessonClean.jsx` via `LessonScreen.jsx`, então o app não depende do arquivo antigo;
- tentar limpar novamente depois ou via PR separado.

### `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO E VALIDADO

### `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO E VISUAL APROVADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases IMPLEMENTADO COMO BASE

### `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática IMPLEMENTADO COMO FUNDAÇÃO

## NOVA ORDEM DE BLOCOS — QUALIDADE REAL DAS AULAS

1. `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB` — Aula nova precisa variar de verdade. STATUS: implementado, aguardando teste.
2. `BLOCO-11-LAB` — Plano primeiro, aula depois. STATUS: próximo.
3. `BLOCO-13-LAB` — Professor Gerador/Revisor.
4. `BLOCO-17-LAB` — Qualidade visível da aula.
5. `BLOCO-16-LAB` — Histórico real de Speaking.
6. `BLOCO-15-LAB` — Banco de erros real.
7. `BLOCO-20-LAB` — Certificação por nível.
8. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Pendência técnica importante

- testar deploy do `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o contrato não ficou restritivo demais para Flash/free;
- se o contrato reprovar muitas gerações, ajustar no bloco de plano/reparo sem afrouxar qualidade.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos de prática e áudio foram implementados e validados. O `BLOCO-12-LAB` criou rubricas por tipo de aula. O `BLOCO-14-LAB` criou `lessonJsonContract.js` e conectou o contrato JSON rígido ao `geminiLessons.js`. O `BLOCO-GERAÇÃO-STATUS-1-LAB` foi validado: o app mostra ID gen, contrato e nota. O `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB` adicionou seed, contexto da aula anterior e instrução de variação real para gerar uma versão diferente do mesmo tema. Próximo passo: testar deploy; se ok, seguir para `BLOCO-11-LAB` plano primeiro, aula depois."
