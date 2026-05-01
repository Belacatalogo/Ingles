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

### `BLOCO-11-LAB` — Plano primeiro, aula depois IMPLEMENTADO via wrapper limpo, aguardando deploy/teste

Contexto:
- usuário quer ter certeza de que as aulas têm qualidade real e não conteúdo raso;
- tentativa inicial de integrar diretamente no `geminiLessons.js` foi bloqueada porque o arquivo é grande/truncado pelo conector e `update_file` exige SHA exato;
- para não arriscar quebrar o gerador já funcional, foi escolhida arquitetura segura: módulo de plano + wrapper planejado + troca da chamada no painel.

Arquivos criados:
- `fluency-clean/src/services/lessonPlan.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`

Arquivos alterados:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `lessonPlan.js` cria um plano pedagógico antes da aula;
- plano considera tipo da aula: listening, grammar, reading, writing, speaking;
- plano define missão, cenário, sequência pedagógica, mix ideal de exercícios, critérios de qualidade e itens proibidos;
- para Listening A1, o plano proíbe ditado longo cedo e spelling fraco com resposta pronta em múltipla escolha;
- `plannedGeminiLessons.js` envolve `generateLessonDraft()` sem mexer no `geminiLessons.js` grande;
- o wrapper injeta o plano pedagógico no prompt final usado pelo gerador;
- `LessonGeneratorPanel.jsx` agora usa `generatePlannedLessonDraft()`;
- diagnóstico deve registrar: `Plano pedagógico criado: ...` antes da geração;
- aulas salvas passam a carregar `lessonPlan`, `planSeed` e contrato `lesson-contract-v1+lesson-plan-v1`.

Teste recomendado:
1. aguardar deploy;
2. gerar uma aula nova com substituição ativa se for a mesma etapa;
3. verificar no Diagnóstico se aparece `Plano pedagógico criado`;
4. confirmar que a aula ainda passa pelos blocos do Gemini;
5. conferir se a aula gerada parece seguir um cenário mais coerente;
6. verificar se as perguntas de spelling/listening ficaram menos bobas.

### `BLOCO-GERAÇÃO-ESTABILIDADE-1B-LAB` — Parser JSON tolerante IMPLEMENTADO E VALIDADO PELO USUÁRIO

Contexto:
- após o AutoFill adaptativo, o novo gargalo passou a ser `JSON Parse error` vindo do Gemini;
- erros vistos pelo usuário:
  - `JSON Parse error: Expected ']'`
  - `JSON Parse error: Invalid escape character`;
- usuário confirmou que funcionou.

### `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB` — AutoFill adaptativo por progresso IMPLEMENTADO

Contexto:
- usuário reportou que as gerações estavam travando por `Exercícios insuficientes`;
- também apareceu `gerando estrutura compacta da aula Grammar` quando a próxima aula visualmente era Listening;
- usuário questionou com razão que questões de soletrar em múltipla escolha são fracas quando o objetivo real é produzir spelling.

Arquivos criados:
- `fluency-clean/src/services/exerciseAutoFill.js`

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `exerciseAutoFill.js` como módulo separado, limpo e adaptativo;
- AutoFill completa exercícios faltantes quando o Gemini entrega pouco;
- AutoFill usa tipo da aula, nível, transcrição/texto, vocabulário e modo de entrada;
- para Listening A1, spelling agora prioriza escrever, ditado curto, corrigir spelling e falar;
- múltipla escolha ficou reservada para reconhecimento, som inicial, vocabulário e verdadeiro/falso simples;
- `geminiLessons.js` passou a aceitar `forcedType`;
- `LessonGeneratorPanel.jsx` envia `forcedType = nextLesson.type`, exceto revisão adaptativa;
- o tipo da aula agora fica travado pelo cronograma/app;
- `BLOCK_RETRY_LIMIT` caiu para 1 porque AutoFill resolve ausência de exercícios antes de gastar novas tentativas;
- diagnóstico agora pode mostrar mensagens como `Tipo de aula travado: Listening` e `AutoFill adaptativo completou +X`.

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

1. `BLOCO-11-LAB` — Plano primeiro, aula depois. STATUS: implementado, aguardando teste.
2. `BLOCO-13-LAB` — Professor Gerador/Revisor.
3. `BLOCO-17-LAB` — Qualidade visível da aula.
4. `BLOCO-16-LAB` — Histórico real de Speaking.
5. `BLOCO-15-LAB` — Banco de erros real.
6. `BLOCO-20-LAB` — Certificação por nível.
7. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
8. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## FASE EXTRA — GARANTIA PEDAGÓGICA MÁXIMA

Esses blocos foram adicionados por pedido do usuário para reduzir ao máximo o risco de perder tempo com conteúdo raso ou falso progresso.

Ordem recomendada após os blocos principais:

1. `BLOCO-DOMÍNIO-1-LAB` — Travas reais de progressão.
   - O aluno não avança apenas por concluir aula.
   - Avança quando prova domínio por habilidade e tópico.

2. `BLOCO-DIAGNÓSTICO-PROFUNDO-1-LAB` — Teste inicial e reavaliações.
   - Testar grammar, vocabulary, listening, reading, writing e speaking.
   - Reavaliar por semana, unidade e fim de nível.

3. `BLOCO-MAPA-DE-DOMÍNIO-1-LAB` — Mapa real do que o aluno sabe.
   - Percentuais por tópico e habilidade.
   - Exemplo: to be, simple present, spelling, short dialogues, pronunciation clarity.

4. `BLOCO-REVISÃO-INTELIGENTE-1-LAB` — Revisão espaçada real.
   - Revisar erros em 1, 3, 7 e 15 dias.
   - Conectar exercícios, speaking, writing, vocabulário e flashcards.

5. `BLOCO-PROVA-DE-DOMÍNIO-1-LAB` — Mini provas por unidade.
   - Listening sem transcrição, reading, grammar, writing e speaking.
   - Se reprovar, gerar revisão em vez de avançar normalmente.

6. `BLOCO-ANTI-ILUSÃO-1-LAB` — Detectar falso domínio.
   - Identificar quando o aluno acerta por alternativa fácil, dica, memória imediata ou reconhecimento, mas falha em escrita/fala sem ajuda.

7. `BLOCO-QUESTÕES-QUALIDADE-2-LAB` — Auditor de exercícios.
   - Bloquear perguntas bobas ou que entregam a resposta.
   - Trocar por escrita, ditado, correção, fala ou construção quando fizer mais sentido.

8. `BLOCO-WRITING-CORRECTION-1-LAB` — Correção séria de escrita.
   - Corrigir frase, classificar erro, explicar, pedir reescrita e salvar no banco de erros.

9. `BLOCO-SPEAKING-COACH-2-LAB` — Evolução real de pronúncia.
   - Mapear sons problemáticos, palavras difíceis, clareza, ritmo e evolução semanal.

10. `BLOCO-CONTEÚDO-REAL-1-LAB` — Inglês autêntico progressivo.
    - A1: microdiálogos.
    - A2: mensagens, menus, avisos e emails simples.
    - B1: vídeos curtos, posts e notícias fáceis.
    - B2: entrevistas, artigos e podcasts guiados.
    - C1: conteúdo real com menos adaptação.

11. `BLOCO-MODO-PROFESSOR-1-LAB` — Explicar de outro jeito quando o aluno não entende.
    - Se errar repetidamente, gerar explicação alternativa, analogia em português, exemplos menores e prática mais fácil.

12. `BLOCO-RELATÓRIO-SEMANAL-1-LAB` — Prova de evolução.
    - Mostrar horas estudadas, aulas concluídas, erros comuns, melhorias, pontos fracos, vocabulário retido e próxima prioridade.

## Pendência técnica importante

- testar deploy do `BLOCO-11-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o contrato não ficou restritivo demais para Flash/free;
- se o contrato reprovar muitas gerações, ajustar no bloco de plano/reparo sem afrouxar qualidade.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos de prática e áudio foram implementados e validados. O `BLOCO-GERAÇÃO-ESTABILIDADE-1B-LAB` foi validado. O `BLOCO-11-LAB` criou `lessonPlan.js` e `plannedGeminiLessons.js`, e o `LessonGeneratorPanel.jsx` agora usa `generatePlannedLessonDraft`. Também foram adicionados ao handoff os blocos extras de garantia pedagógica máxima, de `BLOCO-DOMÍNIO-1-LAB` até `BLOCO-RELATÓRIO-SEMANAL-1-LAB`. Próximo passo: testar deploy do bloco 11; se ok, seguir para `BLOCO-13-LAB` Professor Gerador/Revisor."
