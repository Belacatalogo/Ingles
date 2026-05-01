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

### `BLOCO-16-LAB` — Histórico real de Speaking IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Speaking já usava Azure e já gravava sessões de conversa concluídas;
- porém a aba Progresso ainda contava Speaking a partir de aulas concluídas, não do histórico real;
- tentativas nos modos Pronúncia e Imersão não ficavam visíveis como histórico real;
- usuário quer progresso confiável, não dados fictícios.

Arquivos criados:
- `fluency-clean/src/services/speakingHistory.js`
- `fluency-clean/src/styles/speaking-history.css`

Arquivos alterados:
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `speakingHistory.js` lê `progress.speakingSessions` e monta resumo real:
  - total de sessões;
  - sessões de hoje;
  - total de falas;
  - média de pronúncia;
  - minutos acumulados;
  - palavras fracas recorrentes;
  - últimas sessões;
  - tendência de evolução;
- `SpeakingScreen.jsx` agora mostra card `Histórico real de Speaking` no topo;
- modos Pronúncia e Imersão agora registram tentativas reais no histórico quando o Azure analisa a fala;
- conversa concluída continua registrando sessão real;
- corrigido filtro de sessão diária: apenas modo `conversation` bloqueia a conversa como já concluída hoje, não tentativas de pronúncia/imersão;
- `ProgressScreen.jsx` agora usa `getSpeakingHistorySummary()` para:
  - contador de Speaking;
  - média de Speaking;
  - habilidade Speaking;
  - card `Speaking real` com falas, minutos, sessões hoje e palavras para revisar;
- `speaking-history.css` foi importado em `main.jsx`;
- tudo usa local storage existente via `progressStore.js`, sem alterar backend Azure privado.

Commits:
- `4bb807ad5bda894511dafd817ed77ee533169efa` — adiciona resumo real de histórico speaking;
- `6404756aab83b18b5c65b7fd56350c8d6a8ed376` — registra histórico real em todos modos speaking;
- `50d48ea4de8b248cda76c108cd2f613ed6cbe5eb` — usa histórico real de speaking no progresso;
- `8bc0b6b531cb1a36be9ddf0846026495e8c462b8` — estiliza histórico real de speaking;
- `6df5f8c0f6b70990e77489b92bf433fc2692d6bf` — importa estilos do histórico speaking.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. abrir aba Speaking;
3. confirmar card `Histórico real de Speaking` no topo;
4. fazer uma tentativa em Pronúncia;
5. confirmar que a tentativa aparece no histórico real;
6. fazer uma tentativa em Imersão;
7. confirmar que também registra;
8. concluir uma conversa;
9. abrir Progresso e confirmar que Speaking usa sessões reais e mostra média real;
10. confirmar que fazer Pronúncia não bloqueia a Conversa como já concluída.

### `BLOCO-CONFIANÇA-DE-ESTUDO-LAB` — Aula vale estudar + painel compacto IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/studyReadiness.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/components/lesson/LessonQualityPanel.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `studyReadiness.js` avalia se a aula vale estudar;
- status possíveis: `Pode estudar`, `Pode estudar com atenção`, `Não estudar ainda`;
- critérios por tipo de aula: Listening, Grammar, Reading, Writing e Speaking;
- `LessonGeneratorPanel.jsx` aplica a trava antes de salvar;
- se ruim, tenta reparar; se continuar ruim, bloqueia salvamento;
- `LessonQualityPanel.jsx` ficou compacto com botão `Detalhes`.

Commits:
- `a80d2e0f2eac8a1579ca921ee52b1e7ed8a048af` — adiciona verificador de confiança de estudo;
- `7436a2688750ad62ffab2940d36a8e95a86b8b37` — aplica trava de confiança antes de salvar aula;
- `0a70dfd16d59be8bab680bce46bdf300e3260cbc` — compacta painel de qualidade com detalhes expansíveis;
- `1af5abc87804912576f9ee902aa3aec6b9ecc663` — estiliza painel compacto de confiança.

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

1. `BLOCO-16-LAB` — Histórico real de Speaking. STATUS: implementado, aguardando teste.
2. `BLOCO-15-LAB` — Banco de erros real.
3. `BLOCO-20-LAB` — Certificação por nível.
4. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
5. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-16-LAB` no iPhone;
- testar Speaking nos modos Conversa, Pronúncia e Imersão;
- confirmar que a aba Progresso usa histórico real de Speaking;
- confirmar que tentativas de pronúncia/imersão não bloqueiam conversa diária;
- continuar depois para `BLOCO-15-LAB` — Banco de erros real;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-16-LAB`: criado `speakingHistory.js`, Speaking agora mostra histórico real, Pronúncia/Imersão registram tentativas reais, Progresso usa histórico real de Speaking. Testar no iPhone; se ok, seguir para `BLOCO-15-LAB` Banco de erros real."
