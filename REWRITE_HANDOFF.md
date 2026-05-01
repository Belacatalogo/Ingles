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

### `BLOCO-GERAÇÃO-STATUS-1-LAB` — Prova visual de aula nova IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário gerou aula após o contrato JSON, mas a aula exibida parecia a mesma de antes;
- causa provável: o app preservava aula atual/pendente sem metadados claros, então não dava para saber se era aula antiga reaproveitada ou aula nova;
- antes de seguir para `BLOCO-11-LAB`, era necessário provar visualmente origem, horário, contrato e qualidade da aula.

Arquivos alterados:
- `fluency-clean/src/services/lessonStore.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `lessonStore.js` agora salva `generationMeta` na aula atual;
- `generationMeta` inclui: id de geração, origem, status, horário, contrato, nota pedagógica, reparo automático e aula anterior substituída;
- novo storage `lesson.lastGenerationStatus`;
- funções novas: `getCurrentLessonRaw()`, `getLastGenerationStatus()`, `saveGenerationStatus()`;
- `normalizeLesson()` agora preserva `generationMeta`;
- `LessonGeneratorPanel.jsx` mostra aula atual, horário/contrato/qualidade, último status de geração e aviso quando há aula pendente;
- se a aula atual é a mesma próxima aula do cronograma, o botão não gera de novo sem o usuário marcar `Substituir aula atual e gerar uma nova de verdade`;
- quando marcado, o botão passa a gerar uma nova aula e salvar com metadados;
- `LessonScreen.jsx` mostra badge no topo da aula com ID da geração, contrato, nota de qualidade e horário;
- aulas antigas sem metadados aparecem como `Aula antiga sem ID de geração`;
- estilos adicionados para os novos cards/badges.

Teste recomendado:
1. aguardar deploy;
2. abrir a aba de geração;
3. verificar se aparece `Aula atual` e, se for antiga, `sem metadados de geração`;
4. se quiser gerar nova de verdade, marcar `Substituir aula atual e gerar uma nova de verdade`;
5. clicar em gerar;
6. abrir aba Aula e verificar o badge com `gen-...`, `lesson-contract-v1`, nota e horário;
7. confirmar no Diagnóstico se apareceu `Contrato JSON rígido ativo` e blocos aprovados.

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

1. `BLOCO-GERAÇÃO-STATUS-1-LAB` — Prova visual de aula nova. STATUS: implementado, aguardando teste.
2. `BLOCO-11-LAB` — Plano primeiro, aula depois. STATUS: próximo.
3. `BLOCO-13-LAB` — Professor Gerador/Revisor.
4. `BLOCO-17-LAB` — Qualidade visível da aula.
5. `BLOCO-16-LAB` — Histórico real de Speaking.
6. `BLOCO-15-LAB` — Banco de erros real.
7. `BLOCO-20-LAB` — Certificação por nível.
8. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Pendência técnica importante

- testar deploy do `BLOCO-GERAÇÃO-STATUS-1-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o contrato não ficou restritivo demais para Flash/free;
- se o contrato reprovar muitas gerações, ajustar no bloco de plano/reparo sem afrouxar qualidade.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos de prática e áudio foram implementados e validados. O `BLOCO-12-LAB` criou rubricas por tipo de aula. O `BLOCO-14-LAB` criou `lessonJsonContract.js` e conectou o contrato JSON rígido ao `geminiLessons.js`. O `BLOCO-GERAÇÃO-STATUS-1-LAB` adicionou prova visual de aula nova: `generationMeta`, status de geração, badge no topo da aula e checkbox para substituir aula pendente. Próximo passo: testar deploy; se ok, seguir para `BLOCO-11-LAB` plano primeiro, aula depois."
