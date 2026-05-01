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

### `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício IMPLEMENTADO, aguardando build/deploy

Análise antes da alteração:
- deploy do bloco 5 estava `success` no Vercel;
- o fullscreen premium estava visualmente aprovado;
- `PracticeFullscreen.jsx` ainda concentrava UI, estado, tipos de exercício, feedback e tela final em um único arquivo;
- isso dificultaria a integração limpa do motor novo no bloco 7;
- o objetivo do bloco 6 foi separar componentes sem alterar o comportamento visual aprovado.

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
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `PracticeHeader.jsx` separa barra superior e vidas;
- `PracticeIntro.jsx` separa tela inicial;
- `PracticeDone.jsx` separa tela final;
- `ChoiceGrid.jsx` separa alternativas;
- `WordBankExercise.jsx` separa montagem de frase;
- `TextExercise.jsx` separa escrita/ditado/correção;
- `SpeakExercise.jsx` separa fala;
- `AudioPrompt.jsx` separa botão de áudio;
- `PracticeFeedback.jsx` separa feedback e ações;
- `PracticeFullscreen.jsx` foi limpo para orquestrar estado, áudio, fala, vidas, avanço e conclusão.

Importante:
- o comportamento ainda usa `PracticeEngine.js` antigo;
- a arquitetura nova em `src/practice/core/` ainda será conectada no bloco 7;
- este bloco não deveria mudar visualmente a prática aprovada, apenas modularizar.

Teste recomendado quando Vercel estiver Ready:
1. abrir prática;
2. confirmar que visual segue igual ao aprovado;
3. testar uma múltipla escolha;
4. testar feedback;
5. testar vidas;
6. confirmar que nada sumiu após separar componentes.

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
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício. STATUS: implementado, aguardando validação.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- substituir motor atual pela nova arquitetura nos blocos 7/9;
- conectar prática com builder novo e componentes separados.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `6` foram implementados. O bloco 4 redesenhou o fullscreen premium e foi aprovado visualmente. O bloco 5 adicionou vidas. O bloco 6 separou a UI em componentes dentro de `src/practice/components/` e limpou `PracticeFullscreen.jsx`, mas ainda usa `PracticeEngine.js` antigo. Próximo passo: validar build/deploy. Se aprovado, seguir para `BLOCO-PRACTICE-REBUILD-7-LAB`, integração limpa com aulas usando o motor novo de `src/practice/core/`."
