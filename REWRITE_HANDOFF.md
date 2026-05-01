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

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO, aguardando build/deploy e teste visual no iPhone

Análise antes da alteração:
- `PracticeFullscreen.jsx` ainda tinha visual de protótipo e não parecia totalmente integrado ao Fluency;
- `practice-fullscreen.css` ainda usava verde claro agressivo;
- a prática abria direto na questão, sem tela de entrada que desse sensação de sessão guiada;
- cards, feedback e botões estavam duros e menos premium;
- o bloco foi tratado como central para retenção e vontade de estudar.

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- nova tela de entrada da prática com título, habilidade, quantidade de exercícios, tempo estimado e botão `Começar prática`;
- visual fullscreen redesenhado com fundo escuro premium, gradientes azul/violeta/ciano e efeito glass;
- removido o verde claro dominante;
- barra de progresso refeita com gradiente Fluency;
- botões e cards de alternativas redesenhados com glass, letras A/B/C/D e melhor hierarquia;
- card da pergunta mais elegante, com título da etapa e pergunta em destaque;
- botão de áudio redesenhado com gradiente e rótulo `Ouvir`;
- word bank com área de montagem e chips mais bonitos;
- textarea e campo de fala com foco visual melhor;
- feedback correto/incorreto/quase certo redesenhado com cores suaves e painel premium;
- tela final redesenhada com medalha/ícone e botões refinados;
- mantida compatibilidade com a prática visual atual enquanto a arquitetura nova ainda será integrada nos blocos 6/7.

Importante:
- este bloco focou no design/UX visual da prática fullscreen atual;
- a troca completa para os componentes novos e arquitetura final ainda acontece nos blocos 6 e 7;
- sistema de vidas entra no `BLOCO-PRACTICE-REBUILD-5-LAB`.

Teste recomendado no iPhone quando Vercel estiver Ready:
1. abrir aula;
2. tocar em `Começar prática`;
3. verificar tela de entrada da prática;
4. iniciar prática;
5. testar múltipla escolha;
6. testar áudio/ditado;
7. testar word bank;
8. testar feedback certo/errado;
9. verificar se o visual está bonito, elegante e coerente com o Fluency;
10. verificar se não há rolagem estranha ou botão cobrindo conteúdo.

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

Arquivos alterados:
- `fluency-clean/src/practice/core/PracticeBuilder.js`

O que foi implementado:
- builders separados por habilidade;
- `PracticeBuilder.js` roteia pelo tipo da aula;
- questões continuam ordenadas por fases da habilidade.

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
4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency. STATUS: implementado, aguardando validação visual.
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- substituir motor atual pela nova arquitetura nos blocos 6/7;
- adicionar vidas no bloco 5.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB`, `2`, `3` e `4` foram implementados. O bloco 4 redesenhou `PracticeFullscreen.jsx` e `practice-fullscreen.css` com visual premium Fluency: entrada da prática, fundo escuro, glass, gradientes azul/violeta/ciano e remoção do verde claro agressivo. Próximo passo: validar build/deploy e testar visual no iPhone. Se aprovado, seguir para `BLOCO-PRACTICE-REBUILD-5-LAB`, sistema de vidas e erro pedagógico. Depois seguir blocos 6 a 10 da reformulação e então 12, 14, 11, 13, 17, 16, 15, 20, CARTAS-3B e AUDITORIA-POLIMENTO-GERAL."
