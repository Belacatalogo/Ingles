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

### `BLOCO-CONFIANÇA-DE-ESTUDO-LAB` — Aula vale estudar + painel compacto IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário quer estudar com segurança prática: não precisa ser perfeito, mas precisa ser concreto, útil e confiável;
- usuário também pediu que dados do professor/qualidade não poluam a página de aula;
- painel de qualidade estava grande demais e ocupava muito espaço.

Arquivos criados:
- `fluency-clean/src/services/studyReadiness.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/components/lesson/LessonQualityPanel.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `studyReadiness.js` avalia se a aula vale estudar;
- status possíveis:
  - `study-ready` / `Pode estudar`;
  - `study-with-attention` / `Pode estudar com atenção`;
  - `do-not-study` / `Não estudar ainda`;
- critérios por tipo de aula:
  - Listening: texto/áudio, vocabulário, prática profunda, shadowing/escuta e produção ativa;
  - Grammar: regra, uso, afirmativa, negativa, pergunta, erros comuns, exemplos, exercícios e produção;
  - Reading: texto principal, vocabulário, compreensão, detalhe/inferência e produção final;
  - Writing: modelo, estrutura, escrita guiada, revisão/reescrita/checklist;
  - Speaking: fala ativa, repetição, pronúncia e produção oral;
- `LessonGeneratorPanel.jsx` agora aplica a trava antes de salvar;
- se status for `Não estudar ainda`, tenta reparo automático;
- se continuar ruim após reparo, bloqueia o salvamento da aula e mostra erro no diagnóstico;
- contrato salvo agora pode incluir `study-readiness-v1`;
- metadados salvos:
  - `studyReadiness`;
  - `quality.studyReadiness`;
  - `quality.studyReady`;
  - `generationMeta.studyReady`;
- `LessonQualityPanel.jsx` foi compactado:
  - fechado por padrão;
  - mostra apenas resumo `Confiança de estudo`, status e nota;
  - botão `Detalhes` abre professor, rubrica, áreas analisadas, plano, contrato e alertas;
- CSS novo mantém visual compacto e reduz poluição da aba Aula.

Commits:
- `a80d2e0f2eac8a1579ca921ee52b1e7ed8a048af` — adiciona verificador de confiança de estudo;
- `7436a2688750ad62ffab2940d36a8e95a86b8b37` — aplica trava de confiança antes de salvar aula;
- `0a70dfd16d59be8bab680bce46bdf300e3260cbc` — compacta painel de qualidade com detalhes expansíveis;
- `1af5abc87804912576f9ee902aa3aec6b9ecc663` — estiliza painel compacto de confiança.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. abrir a aula atual e confirmar que o painel de qualidade aparece compacto;
3. tocar em `Detalhes` para abrir professor/rubrica/áreas analisadas;
4. gerar uma aula nova para ver `study-readiness-v1` no contrato;
5. confirmar que, se a aula vier insuficiente, o diagnóstico tenta reparar ou bloqueia o salvamento;
6. testar especialmente uma aula Grammar para confirmar que o sistema exige explicação mais concreta.

### `BLOCO-QUALIDADE-POR-ABA-LAB` — Áreas analisadas pelo professor IMPLEMENTADO

Arquivos alterados:
- `fluency-clean/src/services/teacherReviewer.js`
- `fluency-clean/src/components/lesson/LessonQualityPanel.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `teacherReviewer.js` cria `reviewedAreas` dentro de `teacherReview`;
- `attachTeacherReview()` salva `quality.reviewedAreas`;
- áreas marcadas: Texto, Conceito, Vocabulário, Prática profunda, Shadowing e Produção final;
- `Prática profunda` usa os exercícios da aula como fonte analisada, mas renderização fica apenas no `PracticeLauncher`;
- `LessonQualityPanel.jsx` mostra `Professor analisou` dentro dos detalhes compactos.

Commits:
- `4e9a9f601fe4bf1df3395996c271768ee33e5693` — marca áreas revisadas pelo professor;
- `129dae3ac7cfd8e8c2ca4b6b094c8a9cc23b8887` — mostra áreas revisadas no painel de qualidade;
- `98e8cfe63e5368aaf2a12d5ceaddad4567390cb8` — estiliza áreas analisadas pelo professor.

### `BLOCO-LISTENING-DUPLICIDADE-PRATICA-LAB` — Exercícios duplicados removidos da aula Listening IMPLEMENTADO

Commit:
- `4b89e02ad6f580f5b7113cff51592fad2a448422` — remove exercícios duplicados da aula listening.

### `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB` — Fallback contra JSON escapado IMPLEMENTADO

Commits:
- `d6f693f0e352d3e455a3529890fa6c65b84e02b8` — adiciona fallback resiliente para JSON escapado do Gemini;
- `92402468a9ee4237523fdea7642aa009165d1bf5` — usa fallback resiliente quando Gemini retorna JSON escapado.

### `BLOCO-ANTI-FALSO-DOMÍNIO-LAB` — Reparo local contra falso domínio IMPLEMENTADO

Commits:
- `f3fb92056807af8b710a9cfcaeef7b22fb4308dc` — adiciona reparador anti falso domínio;
- `41e6834752f87c5bebc4c37c7e17252e131b93c9` — integra reparo anti falso domínio na geração.

### `BLOCO-LISTENING-ORDEM-1-LAB` — Ordem da aula Listening e conceito recolhido IMPLEMENTADO

Commits:
- `6352cd9795558a60c7b5d07177522123a4cada0b` — reorganiza aula listening e recolhe conceito por padrão;
- `0894dd905d19cac96a5d71258b807bc5cb43a18a` — compacta conceito e feedback dos exercícios listening.

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

1. `BLOCO-CONFIANÇA-DE-ESTUDO-LAB` — Aula vale estudar + painel compacto. STATUS: implementado, aguardando teste.
2. `BLOCO-16-LAB` — Histórico real de Speaking.
3. `BLOCO-15-LAB` — Banco de erros real.
4. `BLOCO-20-LAB` — Certificação por nível.
5. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
6. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-CONFIANÇA-DE-ESTUDO-LAB` no iPhone;
- confirmar que o painel de qualidade ficou compacto;
- confirmar que `Detalhes` abre professor/rubrica/áreas analisadas;
- gerar aula nova para validar `study-readiness-v1` no contrato;
- testar especialmente uma aula Grammar;
- confirmar que aulas ruins são reparadas ou bloqueadas;
- confirmar que questões continuam aparecendo apenas em `Prática profunda`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-CONFIANÇA-DE-ESTUDO-LAB`: criado `studyReadiness.js`, integrado em `LessonGeneratorPanel.jsx` antes de salvar, e `LessonQualityPanel.jsx` agora fica compacto com botão Detalhes. Testar no iPhone; se ok, seguir para `BLOCO-16-LAB` Histórico real de Speaking."
