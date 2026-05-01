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

### `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB` — Fallback contra JSON escapado IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário testou geração no iPhone e a aula travou no diagnóstico com erro:
  - `JSON Parse error: Unrecognized token '\\'`;
  - preview mostrava JSON escapado: `{\"type\":\"listening\"...}`;
- o prompt já proibia JSON escapado, mas o Gemini ainda devolveu o objeto serializado/escapado;
- para não bloquear a geração, foi criado um fallback resiliente separado, sem mexer em `bundle.js` e sem gambiarra de DOM.

Arquivos criados:
- `fluency-clean/src/services/resilientGeminiLessonDraft.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `resilientGeminiLessonDraft.js`;
- parser resiliente `parseResilientGeminiJson()` que tenta:
  1. JSON normal;
  2. JSON serializado como string;
  3. JSON com aspas escapadas `{\"type\":...}`;
  4. reparo de caracteres de controle e vírgulas sobrando;
- fallback gera uma aula completa em chamada única quando a geração planejada em blocos falha por JSON escapado;
- `LessonGeneratorPanel.jsx` agora detecta falhas como:
  - `JSON Parse error`;
  - `Unrecognized token`;
  - `Expected ']'`;
  - preview com `{\"type\"...}`;
- quando detecta esse erro, mostra no diagnóstico que ativou o parser resiliente e tenta gerar/salvar a aula;
- contrato da aula pode receber `resilient-json-v1` quando o fallback for usado;
- o fluxo posterior continua igual:
  - validação pedagógica;
  - professor revisor;
  - reparo anti falso domínio, se necessário;
  - salvar aula aprovada.

Commits:
- `d6f693f0e352d3e455a3529890fa6c65b84e02b8` — adiciona fallback resiliente para JSON escapado do Gemini;
- `92402468a9ee4237523fdea7642aa009165d1bf5` — usa fallback resiliente quando Gemini retorna JSON escapado.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. gerar aula novamente;
3. se aparecer erro de JSON escapado na geração em blocos, verificar se logo depois aparece fallback/parser resiliente;
4. confirmar se a aula termina salva e abre na aba Aula;
5. no painel de qualidade, verificar contrato com `resilient-json-v1` se o fallback tiver sido usado;
6. confirmar se a aula contém texto, vocabulário, exercícios, shadowing e conclusão.

### `BLOCO-ANTI-FALSO-DOMÍNIO-LAB` — Reparo local contra falso domínio IMPLEMENTADO, aguardando teste

Contexto:
- usuário viu no painel `Qualidade visível` o ponto de atenção: risco de falso domínio por excesso de reconhecimento e pouca produção;
- apesar da nota alta, a aula ainda podia fazer o aluno acertar por múltipla escolha sem produzir sozinho;
- objetivo: quando esse risco aparecer, a aula deve ser reparada antes de salvar, adicionando recuperação ativa e produção real.

Arquivos criados:
- `fluency-clean/src/services/antiFalseDomainRepair.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço modular `antiFalseDomainRepair.js`;
- função `needsAntiFalseDomainRepair()` detecta risco por issue do professor, nota `antiIllusion` baixa, excesso de múltipla escolha e pouca produção;
- função `repairLessonAgainstFalseDomain()` adiciona exercícios de produção ativa sem alternativas;
- reparo é adaptado por tipo de aula: listening, grammar, reading, writing e speaking;
- contrato pode receber `+anti-false-domain-v1` quando aplicado.

Commits:
- `f3fb92056807af8b710a9cfcaeef7b22fb4308dc` — adiciona reparador anti falso domínio;
- `41e6834752f87c5bebc4c37c7e17252e131b93c9` — integra reparo anti falso domínio na geração.

### `BLOCO-LISTENING-ORDEM-1-LAB` — Ordem da aula Listening e conceito recolhido IMPLEMENTADO, aguardando teste

Contexto:
- usuário testou a aula no iPhone e achou o bloco `Conceito e explicação` pesado demais;
- o conceito estava abrindo por padrão e ocupando a tela antes do conteúdo principal;
- usuário pediu ordem: primeiro texto, depois vocabulário, depois exercícios, depois shadowing e só no final concluir aula;
- também havia exercícios gerados, mas o layout `ListeningLessonClean.jsx` não os renderizava nessa tela.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `Conceito e explicação` agora começa fechado por padrão;
- `Shadowing real`, `Vocabulário`, `Exercícios` e `Finalizar aula` também começam fechados para deixar a tela mais leve;
- `Texto da aula` começa aberto logo após a escuta guiada;
- ordem visual da aula Listening agora é:
  1. Escuta guiada / player;
  2. Texto da aula;
  3. Conceito e explicação recolhido;
  4. Vocabulário;
  5. Exercícios;
  6. Shadowing real;
  7. Finalizar aula / Salvar rascunho / Concluir Listening;
- exercícios da aula agora são renderizados no layout clean;
- respostas dos exercícios ficam ocultas até o aluno escolher uma alternativa;
- seleção de respostas é salva junto na conclusão;
- jump do stepper foi remapeado para a nova ordem: core → texto, practice → exercícios, speak → shadowing, review → finalizar;
- CSS compactou o cabeçalho dos accordions, reduziu o peso visual do conceito e adicionou feedback visual para exercícios.

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

1. `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB` — Fallback contra JSON escapado. STATUS: implementado, aguardando teste.
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

- testar deploy do `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB` no iPhone;
- testar se a geração não para mais no erro `{\"type\"...}`;
- testar deploy do `BLOCO-ANTI-FALSO-DOMÍNIO-LAB` no iPhone;
- testar deploy do `BLOCO-LISTENING-ORDEM-1-LAB` no iPhone;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o painel de qualidade não ficou pesado no iPhone;
- confirmar se aulas antigas sem professor revisor continuam renderizando.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-GERAÇÃO-JSON-RESILIENTE-2-LAB`: foi criado `resilientGeminiLessonDraft.js` e integrado em `LessonGeneratorPanel.jsx`; se a geração planejada falhar por JSON escapado `{\"type\"...}`, o app aciona fallback resiliente com parser próprio e continua para validação, professor revisor e anti falso domínio. Testar no iPhone; se ok, seguir para `BLOCO-16-LAB` Histórico real de Speaking."
