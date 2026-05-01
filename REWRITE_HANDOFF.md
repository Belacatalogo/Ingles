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

### `BLOCO-15-LAB` — Banco de erros real IMPLEMENTADO, aguardando deploy/teste

Contexto:
- objetivo é transformar erros reais em material de revisão;
- nada fictício: usa dados já persistidos pelo app;
- fontes usadas:
  - erros da prática profunda em `progress.practiceSessions` / `weakItems`;
  - palavras fracas do Speaking/Azure em `progress.speakingSessions`;
  - produção escrita final curta demais em `lessonCompletions`.

Arquivos criados:
- `fluency-clean/src/services/errorBank.js`
- `fluency-clean/src/styles/error-bank.css`

Arquivos alterados:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo serviço `errorBank.js` monta banco de erros real derivado dos dados locais;
- agrega erros por chave/categoria, conta recorrência, severidade e próxima revisão;
- categorias iniciais:
  - grammar;
  - vocabulary;
  - pronunciation;
  - listening;
  - reading;
  - writing;
  - practice;
- severidade:
  - low: monitorar;
  - medium: revisar em breve;
  - high: alta prioridade;
- `getErrorBankSummary()` retorna:
  - total de erros;
  - erros únicos;
  - alta prioridade;
  - revisões vencidas/para hoje;
  - erros por categoria;
  - top erros;
  - erros recentes;
- `ProgressScreen.jsx` agora mostra card `Banco de erros real`;
- o card mostra métricas e top erros com nota/contexto quando houver;
- conquistas agora também podem mostrar quantidade de erros reais;
- CSS modular em `error-bank.css`, importado no `main.jsx`.

Commits:
- `3fe82bb1fdf845fb82483ec21642171e561de87c` — adiciona banco de erros real;
- `43b34365f3902fb8026e593e5e853468a7bd2ee9` — mostra banco de erros real no progresso;
- `a1c4152a7142d30fc5ff243c45b99dd07ff7c6a3` — estiliza banco de erros real;
- `d520ec1fab42193dc7320eb5c5edc101931bb4e9` — importa estilos do banco de erros.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. abrir Progresso e confirmar card `Banco de erros real`;
3. errar questões na prática profunda e concluir a prática;
4. voltar ao Progresso e verificar se erros aparecem;
5. fazer tentativa de Pronúncia com palavra fraca;
6. verificar se aparece como erro de pronúncia;
7. concluir aula com produção escrita muito curta e verificar se entra como escrita fraca;
8. confirmar que não há dados fictícios.

### `BLOCO-16-LAB` — Histórico real de Speaking IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/speakingHistory.js`
- `fluency-clean/src/styles/speaking-history.css`

Arquivos alterados:
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `speakingHistory.js` lê `progress.speakingSessions` e monta resumo real;
- `SpeakingScreen.jsx` mostra card `Histórico real de Speaking`;
- Pronúncia e Imersão registram tentativas reais quando o Azure analisa;
- Progresso usa histórico real de Speaking.

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

1. `BLOCO-15-LAB` — Banco de erros real. STATUS: implementado, aguardando teste.
2. `BLOCO-20-LAB` — Certificação por nível.
3. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
4. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-15-LAB` no iPhone;
- confirmar card `Banco de erros real` na aba Progresso;
- confirmar que erros da prática profunda aparecem;
- confirmar que palavras fracas de Speaking/Azure aparecem;
- continuar depois para `BLOCO-20-LAB` — Certificação por nível;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-15-LAB`: criado `errorBank.js`, Progresso mostra `Banco de erros real`, erros vêm de prática profunda, Speaking/Azure e produção escrita curta. Testar no iPhone; se ok, seguir para `BLOCO-20-LAB` Certificação por nível."
