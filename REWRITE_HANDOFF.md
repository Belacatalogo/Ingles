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

### `BLOCO-LISTENING-COERENCIA-1-LAB` — Fonte única da aula Listening IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário identificou uma aula Listening em que o texto falava apenas de biblioteca, nome e sobrenome;
- vocabulário e questões cobravam detalhes que não apareciam claramente no texto, como autor do livro;
- isso revelou que texto, vocabulário e questões podiam vir de versões internas diferentes da mesma aula;
- usuário também pediu que diálogos mostrem quem está falando cada frase.

Arquivos criados:
- `fluency-clean/src/services/listeningCoherence.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo verificador `validateListeningCoherence()`;
- para aulas `listening`, a transcrição/listeningText vira fonte única de verdade;
- valida se:
  - transcrição é suficiente para sustentar vocabulário e questões;
  - vocabulário principal aparece na transcrição;
  - questões não cobram informação que não aparece claramente no listeningText;
  - diálogos com múltiplas falas têm nome/papel do falante antes da fala;
- novo reparador `repairListeningCoherence()`;
- o fluxo de geração em `LessonGeneratorPanel.jsx` agora roda a checagem antes do professor revisor e antes de salvar;
- se houver incoerência, tenta reparo local;
- se continuar incoerente, bloqueia a aula e mostra no diagnóstico;
- quando reparar, contrato pode incluir `listening-coherence-v1`;
- `plannedGeminiLessons.js` agora reforça no prompt:
  - listeningText é a fonte única de verdade;
  - vocabulário e questões só podem sair da transcrição;
  - se houver autor, livro, número, sobrenome ou qualquer detalhe cobrado, esse detalhe precisa aparecer no listeningText;
  - diálogos precisam usar `Falante: frase`.

Commits:
- `c8a7740c1caa767009e9ab97e8b667433046e915` — adiciona verificador de coerência listening;
- `d9177694fbafb0f506c024bd0a3a747408793f59` — integra checagem de coerência listening;
- `4a8669611483f8bc4d0f68d09c6d1fc57121b4fc` — reforça fonte única em aulas listening.

Teste recomendado no iPhone:
1. aguardar deploy da branch lab;
2. gerar uma nova aula Listening;
3. conferir se o texto tem falantes quando for diálogo;
4. conferir se vocabulário aparece no texto;
5. conferir se as questões só perguntam coisas presentes na transcrição;
6. se vier aula incoerente, confirmar se o diagnóstico bloqueia ou repara antes de salvar.

### `BLOCO-20-LAB` — Certificação por nível IMPLEMENTADO

Arquivos criados:
- `fluency-clean/src/services/levelCertification.js`
- `fluency-clean/src/styles/level-certification.css`

Arquivos alterados:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `levelCertification.js` calcula certificação por nível usando currículo, habilidades, checkpoints, Speaking real e banco de erros;
- Progresso mostra card `Certificação por nível`.

### `BLOCO-15-LAB` — Banco de erros real IMPLEMENTADO

### `BLOCO-16-LAB` — Histórico real de Speaking IMPLEMENTADO

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

1. `BLOCO-LISTENING-COERENCIA-1-LAB` — Fonte única da aula Listening. STATUS: implementado, aguardando teste.
2. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
3. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

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

- testar deploy do `BLOCO-LISTENING-COERENCIA-1-LAB` no iPhone;
- gerar nova aula Listening para validar fonte única;
- confirmar que questões e vocabulário batem com listeningText;
- confirmar falantes identificados em diálogos;
- seguir depois para `BLOCO-CARTAS-3B-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-LISTENING-COERENCIA-1-LAB`: criado `listeningCoherence.js`, integrado em `LessonGeneratorPanel.jsx`, e prompt em `plannedGeminiLessons.js` reforça listeningText como fonte única. Testar no iPhone; se ok, seguir para `BLOCO-CARTAS-3B-LAB`."
