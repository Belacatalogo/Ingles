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

## Decisão atual do usuário

O usuário quer confiar que as aulas realmente têm qualidade, sem perder tempo com conteúdo raso.

Diretriz pedagógica:
- instruções e enunciados principais em português;
- conteúdo treinado em inglês;
- feedback em português;
- áudio em inglês;
- perguntas não podem parecer aleatórias;
- prática deve seguir fases: aquecimento, reconhecimento, compreensão, produção guiada, escrita/fala e revisão final;
- aula precisa ter começo, meio, prática, revisão e resultado real.

Diretriz visual:
- visual próximo do Fluency atual: fundo escuro elegante, azul/violeta, gradientes suaves, glass/painéis modernos;
- botões grandes, bonitos e confortáveis;
- sem rolagem estranha;
- sem opção cortada;
- feedback bonito e motivador;
- sistema de vidas para muitos erros.

## BLOCO ATUAL

### `BLOCO-14-LAB` — Contrato JSON rígido IMPLEMENTADO, aguardando deploy/teste

Objetivo:
- impedir que a IA gere aula solta, rasa ou com campos bagunçados;
- criar contrato único para o formato dos blocos de aula;
- conectar contrato ao gerador Gemini antes de aceitar cada bloco;
- preparar base para `BLOCO-11-LAB` plano primeiro e `BLOCO-13-LAB` professor revisor.

Arquivos criados:
- `fluency-clean/src/services/lessonJsonContract.js`

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- contrato `lesson-contract-v1`;
- chaves obrigatórias por bloco:
  - `structure`: type, level, title, intro, objective, focus, sections, tips;
  - `mainContent`: listeningText;
  - `vocabulary`: vocabulary;
  - `exercises`: exercises;
  - `production`: prompts;
- formato esperado para sections, vocabulary e exercises;
- instruções anti-conteúdo raso dentro do contrato;
- instruções de idioma: explicações/instruções em português, conteúdo treinado em inglês;
- contrato incorpora a rubrica do tipo de aula criada no `BLOCO-12-LAB`;
- `geminiLessons.js` agora inclui o contrato no prompt de cada bloco;
- cada resposta passa por `assertJsonContractBlock()`;
- chaves desconhecidas são removidas com `stripUnknownBlockKeys()` antes da validação;
- diagnóstico agora informa `Contrato JSON rígido ativo` e `Bloco aprovado pelo contrato JSON`.

Teste recomendado:
1. aguardar deploy da lab;
2. abrir app e confirmar que não há tela branca;
3. gerar uma nova aula;
4. observar diagnóstico: deve aparecer `Contrato JSON rígido ativo`;
5. verificar se os blocos são aprovados pelo contrato JSON;
6. abrir a aula gerada e conferir se carregou normal;
7. se a geração ficar mais exigente e reprovar, isso é esperado: o próximo bloco vai melhorar a etapa de plano/reparo.

Próximo passo sugerido:
- `BLOCO-11-LAB` — Plano primeiro, aula depois.

### `BLOCO-12-LAB` — Rubricas por tipo de aula IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/lessonRubrics.js`

Arquivos alterados:
- `fluency-clean/src/services/lessonValidation.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- rubricas centralizadas para `reading`, `grammar`, `listening`, `writing`, `speaking` e `vocabulary`;
- cada rubrica define mínimos de seções, vocabulário, exercícios, prompts, texto principal e sinais obrigatórios;
- cada rubrica define critérios qualitativos específicos do tipo de aula;
- `lessonValidation.js` agora usa `getLessonTypeRequirements()` e `LESSON_RUBRIC_APPROVAL_SCORE` vindos de `lessonRubrics.js`;
- review pedagógico agora carrega `rubricCriteria` dentro de `pedagogicalReview` e `quality`.

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

1. `BLOCO-14-LAB` — Contrato JSON rígido. STATUS: implementado, aguardando teste.
2. `BLOCO-11-LAB` — Plano primeiro, aula depois. STATUS: próximo.
3. `BLOCO-13-LAB` — Professor Gerador/Revisor.
4. `BLOCO-17-LAB` — Qualidade visível da aula.
5. `BLOCO-16-LAB` — Histórico real de Speaking.
6. `BLOCO-15-LAB` — Banco de erros real.
7. `BLOCO-20-LAB` — Certificação por nível.
8. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Pendência técnica importante

- testar deploy do `BLOCO-14-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o contrato não ficou restritivo demais para Flash/free;
- se o contrato reprovar muitas gerações, ajustar no bloco de plano/reparo sem afrouxar qualidade.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos de prática e áudio foram implementados e validados. O `BLOCO-12-LAB` criou rubricas por tipo de aula. O `BLOCO-14-LAB` criou `lessonJsonContract.js` e conectou o contrato JSON rígido ao `geminiLessons.js`. Próximo passo: testar deploy do bloco 14; se ok, seguir para `BLOCO-11-LAB` plano primeiro, aula depois."
