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

### `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões IMPLEMENTADO, aguardando build/deploy

Análise antes da alteração:
- o quality gate existente barrava apenas problemas básicos: vazio, alternativa faltando, resposta correta fora das alternativas e alguns tipos incompatíveis;
- ainda faltavam regras pedagógicas mais fortes para enunciado, idioma, equilíbrio de alternativas, repetição e qualidade do plano completo;
- o builder por habilidade do bloco 2 já roteia questões por tipo de aula, mas precisava de uma camada mais rígida para impedir perguntas vagas antes da UI final.

Arquivos alterados:
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/core/PracticeBuilder.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- bloqueio de enunciado vazio, curto ou genérico demais;
- regra para enunciado principal orientar em português, exceto fala direta;
- bloqueio de respostas vagas, pessoais ou exemplos como resposta objetiva;
- validação de fase pedagógica;
- validação de compatibilidade entre fase e tipo de questão;
- validação de alternativas repetidas;
- validação de alternativas longas, vagas, pessoais ou inválidas;
- validação de alternativas com formatos muito diferentes;
- validação de alternativas parecidas demais entre si;
- regra específica para True/False usar apenas `True` e `False`;
- limite de tamanho para ditado, fala e resposta escrita curta;
- bloqueio de repetição excessiva do mesmo tipo de questão na mesma fase;
- `getPracticePlanIssues()` para avaliar o plano completo;
- `PracticeBuilder.js` agora retorna `quality.planIssues` além das questões aceitas/rejeitadas.

Importante:
- este bloco ainda não troca a UI visual;
- ele reforça a qualidade interna antes do bloco de design;
- se o deploy passar, o próximo bloco é `BLOCO-PRACTICE-REBUILD-4-LAB`, visual fullscreen elegante do Fluency.

Teste recomendado:
1. aguardar deploy;
2. abrir app e confirmar que não há tela branca;
3. se build passar, seguir para `BLOCO-PRACTICE-REBUILD-4-LAB`.

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

O que foi implementado:
- tipos centrais de habilidade, fase, pergunta, resposta e status;
- normalizador de aula para prática;
- quality gate independente;
- answer checker independente;
- estado de sessão independente;
- export central.

## NOVA ORDEM DE BLOCOS — REFORMULAÇÃO DA PRÁTICA

1. `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática. STATUS: fundação criada.
2. `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases. STATUS: base criada.
3. `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões. STATUS: implementado, aguardando validação.
4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency.
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Estado atual antes da reformulação visual

### HOTFIX QUIZ FULLSCREEN — Quality gate de alternativas IMPLEMENTADO, mas insuficiente

O quality gate melhorou parte das alternativas, mas o usuário validou que ainda não está no nível desejado. Portanto, o caminho correto agora é reformular a prática inteira, não continuar remendando o motor atual.

### HOTFIX QUIZ FULLSCREEN — Polimento sem scroll IMPLEMENTADO, mas insuficiente

O scroll melhorou, mas a experiência visual ainda não está com a qualidade desejada pelo usuário. O visual será refeito no bloco `BLOCO-PRACTICE-REBUILD-4-LAB`.

### BLOCO-QUIZ-FULLSCREEN-LAB — Prática profunda fullscreen por tipo de aula IMPLEMENTADO PARCIALMENTE

O bloco serviu como protótipo funcional. A partir de agora, ele será substituído pela reformulação `BLOCO-PRACTICE-REBUILD-*`.

Pendência técnica importante:
- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- substituir motor atual pela nova arquitetura.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. O `BLOCO-PRACTICE-REBUILD-1-LAB` criou a fundação nova em `src/practice/core/`. O `BLOCO-PRACTICE-REBUILD-2-LAB` adicionou builders por habilidade em `src/practice/core/builders/`. O `BLOCO-PRACTICE-REBUILD-3-LAB` reforçou `PracticeQualityGate.js` e adicionou `quality.planIssues` no builder. Ainda não substituiu a prática visual atual. Próximo passo: validar build/deploy; se passar, iniciar `BLOCO-PRACTICE-REBUILD-4-LAB`, UI fullscreen elegante do Fluency. Instruções/enunciados em português, conteúdo treinado em inglês, feedback em português. Remover verde claro agressivo e usar gradientes azul/violeta/glass do Fluency nos blocos de UI. Depois seguir blocos 4 a 10 da reformulação e então 12, 14, 11, 13, 17, 16, 15, 20, CARTAS-3B e AUDITORIA-POLIMENTO-GERAL."
