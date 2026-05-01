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

O usuário pediu uma reformulação completa do sistema de exercícios/prática.

Diretriz pedagógica nova:
- instruções e enunciados principais em português;
- conteúdo treinado em inglês;
- feedback em português;
- áudio em inglês;
- perguntas não podem parecer aleatórias;
- prática deve seguir fases: aquecimento, reconhecimento, compreensão, produção guiada, escrita/fala e revisão final.

Diretriz visual nova:
- remover o verde claro agressivo;
- usar visual mais próximo do Fluency atual: fundo escuro elegante, azul/violeta, gradientes suaves, glass/painéis modernos;
- botões grandes, bonitos e confortáveis;
- sem rolagem estranha;
- sem opção cortada;
- feedback bonito e motivador;
- adicionar sistema de vidas para muitos erros.

## BLOCO ATUAL

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO, aguardando validação no Vercel/iPhone

Atualização de deploy:
- trial Pro da Vercel foi ativado pelo usuário;
- orçamento sob demanda foi reduzido para US$ 5;
- este handoff recebeu commit seguro apenas para forçar novo deploy da branch lab e validar o bloco 7.

Contexto importante:
- o objetivo foi conectar a prática fullscreen ao motor novo sem alterar o visual premium aprovado.

Análise antes da alteração:
- `PracticeFullscreen.jsx` ainda importava `buildPracticeItems`, `evaluatePracticeAnswer` e `normalizeForPractice` diretamente do `PracticeEngine.js` antigo;
- a UI já estava modularizada no bloco 6;
- o motor novo de `src/practice/core/` usa tipos diferentes (`multiple_choice`, `audio_choice`, `dictation`, `word_bank`, `fill_blank`, `correction`, `write_short`, `speak_response`, `true_false`);
- era necessário criar uma camada adaptadora para transformar os tipos do core nos tipos que a UI já renderiza (`choice`, `listenChoice`, `dictation`, `wordBank`, `fillBlank`, `correction`, `write`, `speak`);
- também faltava renderizar corretamente o tipo `write` como exercício de texto.

Arquivos criados:
- `fluency-clean/src/practice/PracticePlanAdapter.js`

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `PracticePlanAdapter.js` conecta o motor novo `buildPracticePlan()` ao fullscreen;
- `PracticePlanAdapter.js` adapta tipos do core para tipos renderizáveis pela UI;
- `PracticePlanAdapter.js` usa `checkPracticeAnswer()` do motor novo para corrigir respostas;
- fallback seguro para `PracticeEngine.js` antigo caso o core falhe ou gere poucas questões renderizáveis;
- cada item vindo do core recebe `sourceEngine: 'core'`;
- cada item vindo do legado recebe `sourceEngine: 'legacy'`;
- `PracticeFullscreen.jsx` agora importa `buildPracticeItems`, `evaluatePracticeAnswer` e `normalizeForPractice` de `PracticePlanAdapter.js`;
- `PracticeFullscreen.jsx` renderiza `write` com `TextExercise`;
- `PracticeFullscreen.jsx` respeita `evaluation.loseLife` do checker novo antes de descontar vidas;
- resultado da sessão salva `sourceEngine` em cada resposta para diagnóstico futuro.

Importante:
- `PracticeEngine.js` ainda não foi removido;
- ele permanece como fallback seguro;
- a remoção definitiva do legado fica para o bloco 9, somente depois de validação no iPhone;
- este bloco é a conexão real do motor novo com a UI.

Teste recomendado quando a Vercel liberar build:
1. abrir uma aula existente;
2. abrir prática fullscreen;
3. verificar se as questões não são mais as antigas ruins;
4. verificar se aparecem questões de escrita (`write`) corretamente;
5. testar múltipla escolha;
6. testar ditado/áudio;
7. testar word bank;
8. testar fala;
9. confirmar se o visual premium continua igual;
10. confirmar se o feedback e as vidas continuam funcionando;
11. se questões antigas ainda aparecerem, verificar se o adapter caiu em fallback legacy por falta de questões válidas no core.

### `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício IMPLEMENTADO

Arquivos criados/confirmados:
- `fluency-clean/src/practice/components/PracticeHeader.jsx`
- `fluency-clean/src/practice/components/PracticeIntro.jsx`
- `fluency-clean/src/practice/components/PracticeDone.jsx`
- `fluency-clean/src/practice/components/ChoiceGrid.jsx`
- `fluency-clean/src/practice/components/WordBankExercise.jsx`
- `fluency-clean/src/practice/components/TextExercise.jsx`
- `fluency-clean/src/practice/components/SpeakExercise.jsx`
- `fluency-clean/src/practice/components/AudioPrompt.jsx`
- `fluency-clean/src/practice/components/PracticeFeedback.jsx`

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`

O que foi implementado:
- fullscreen modularizado;
- `PracticeFullscreen.jsx` virou orquestrador de estado e fluxo;
- UI separada por responsabilidade.

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`

O que foi implementado:
- 5 vidas;
- erro real perde 1 vida;
- erro quase certo não tira vida;
- modo revisão quando zera;
- feedback mostra vida perdida;
- tela final diferencia conclusão normal e revisão.

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO E VISUAL APROVADO PELO USUÁRIO

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`

O que foi implementado:
- nova tela de entrada da prática;
- visual fullscreen redesenhado com fundo escuro premium, gradientes azul/violeta/ciano e efeito glass;
- removido o verde claro dominante;
- barra de progresso refeita com gradiente Fluency;
- cards, botões, feedback e tela final redesenhados.

### `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões IMPLEMENTADO

Arquivos alterados:
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/core/PracticeBuilder.js`

### `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases IMPLEMENTADO COMO BASE

Arquivos criados:
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/listeningBuilder.js`
- `fluency-clean/src/practice/core/builders/readingBuilder.js`
- `fluency-clean/src/practice/core/builders/grammarBuilder.js`
- `fluency-clean/src/practice/core/builders/writingBuilder.js`
- `fluency-clean/src/practice/core/builders/speakingBuilder.js`

### `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática IMPLEMENTADO COMO FUNDAÇÃO

Arquivos criados:
- `fluency-clean/src/practice/core/PracticeTypes.js`
- `fluency-clean/src/practice/core/PracticeNormalizer.js`
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`
- `fluency-clean/src/practice/core/PracticeSessionState.js`
- `fluency-clean/src/practice/core/PracticeBuilder.js`
- `fluency-clean/src/practice/core/index.js`

## NOVA ORDEM DE BLOCOS — REFORMULAÇÃO DA PRÁTICA

1. `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática. STATUS: fundação criada.
2. `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases. STATUS: base criada.
3. `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões. STATUS: implementado.
4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency. STATUS: implementado e visual aprovado.
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico. STATUS: implementado.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício. STATUS: implementado.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas. STATUS: implementado, aguardando validação no iPhone.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- validar o bloco 7 no iPhone quando Vercel liberar;
- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- remover `PracticeEngine.js` somente depois de validação do adapter/core;
- confirmar se o core gera questões suficientes para aulas reais antigas e novas.

## Próximos blocos depois da reformulação de prática

1. `BLOCO-12-LAB` — Rubricas por tipo de aula.
2. `BLOCO-14-LAB` — Contrato JSON rígido.
3. `BLOCO-11-LAB` — Plano primeiro, aula depois.
4. `BLOCO-13-LAB` — Professor Gerador/Revisor.
5. `BLOCO-17-LAB` — Qualidade visível da aula.
6. `BLOCO-16-LAB` — Histórico real de Speaking.
7. `BLOCO-15-LAB` — Banco de erros real.
8. `BLOCO-20-LAB` — Certificação por nível.
9. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
10. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `7` foram implementados. O bloco 4 redesenhou o fullscreen premium e foi aprovado visualmente. O bloco 5 adicionou vidas. O bloco 6 separou a UI em componentes. O bloco 7 criou `PracticePlanAdapter.js` e conectou `PracticeFullscreen.jsx` ao motor novo de `src/practice/core/`, com fallback seguro para `PracticeEngine.js`. Trial Pro da Vercel foi ativado e orçamento sob demanda foi reduzido para US$ 5. Um commit seguro no handoff foi feito para forçar novo deploy da lab e validar o bloco 7. Próximo passo: verificar deploy, testar no iPhone e só então seguir para `BLOCO-PRACTICE-REBUILD-8-LAB`."