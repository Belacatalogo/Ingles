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

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO, aguardando build/deploy e teste no iPhone

Análise antes da alteração:
- o fullscreen premium foi aprovado visualmente pelo usuário;
- a prática ainda usava o motor visual atual, mas sem vidas;
- feedback correto/incorreto/quase certo existia, mas não havia punição pedagógica;
- erro quase certo já podia permitir tentativa, então não deve tirar vida;
- a troca para o motor novo completo permanece para os blocos 6/7.

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- constante `STARTING_LIVES = 5`;
- estado `lives`;
- estado `reviewMode`;
- componente visual `LivesBar` com corações;
- tela de entrada agora mostra quantidade de vidas;
- erro real perde 1 vida;
- erro quase certo não tira vida;
- feedback mostra quando perdeu vida e quantas restam;
- quando vidas chegam a 0, entra em modo revisão;
- modo revisão troca rótulo da pergunta para `Modo revisão`;
- tela final diferencia conclusão normal e conclusão com revisão;
- resultado enviado em `onComplete` agora inclui `mistakes`, `lives` e `reviewMode`;
- CSS atualizado para vidas discretas e premium, com corações rosados e modo revisão.

Importante:
- este bloco adiciona vidas na prática fullscreen atual;
- o motor novo de questões ainda não está conectado;
- conexão com arquitetura nova fica para blocos 6/7.

Teste recomendado no iPhone quando Vercel estiver Ready:
1. abrir prática;
2. confirmar vidas na entrada e no topo da sessão;
3. errar uma resposta de propósito;
4. confirmar que perde 1 vida;
5. testar erro quase certo em escrita/ditado se aparecer;
6. confirmar que erro quase certo não tira vida;
7. errar até zerar vidas;
8. confirmar modo revisão;
9. finalizar e ver texto de conclusão com revisão.

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

O que foi implementado:
- bloqueio de enunciado vazio, curto ou genérico demais;
- regra para enunciado principal orientar em português, exceto fala direta;
- bloqueio de respostas vagas, pessoais ou exemplos como resposta objetiva;
- validação de fase pedagógica;
- validação de compatibilidade entre fase e tipo de questão;
- validação de alternativas repetidas, longas, vagas ou pessoais;
- validação de formatos de alternativas;
- `PracticeBuilder.js` retorna `quality.planIssues`.

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
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico. STATUS: implementado, aguardando validação.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- substituir motor atual pela nova arquitetura nos blocos 6/7;
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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `5` foram implementados. O bloco 4 redesenhou o fullscreen premium e foi aprovado visualmente. O bloco 5 adicionou sistema de vidas no `PracticeFullscreen.jsx` e estilos em `practice-fullscreen.css`: 5 vidas, erro real perde vida, erro quase certo não tira vida, modo revisão quando zera. Próximo passo: validar build/deploy e testar vidas no iPhone. Se aprovado, seguir para `BLOCO-PRACTICE-REBUILD-6-LAB`, componentes por tipo de exercício. Depois bloco 7 para conectar o motor novo de `src/practice/core/` e remover o motor antigo."
