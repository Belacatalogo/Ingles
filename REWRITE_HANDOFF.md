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

### `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão IMPLEMENTADO, aguardando deploy/teste no iPhone

Contexto:
- bloco 7 foi validado: motor novo entrou e a prática fullscreen está funcionando;
- bloco 7B foi validado pelo usuário como funcionando perfeitamente;
- agora a prática precisava deixar de ser apenas visual e passar a registrar histórico real.

Análise antes da alteração:
- `PracticeFullscreen.jsx` já retornava `results`, `lives`, `reviewMode`, `correct`, `total`;
- `PracticeLauncher.jsx` ainda contava exercícios usando `PracticeEngine.js` antigo, apesar de o fullscreen usar o adapter novo;
- `progressStore.js` tinha histórico de aula, flashcards e speaking, mas não tinha histórico de prática fullscreen;
- `ProgressScreen.jsx` não exibia precisão, vidas ou erros da prática.

Arquivos criados:
- `fluency-clean/src/components/progress/PracticeProgressSummary.jsx`

Arquivos alterados:
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/practice/PracticeLauncher.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/styles/progress-polish.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- novo storage `progress.practiceSessions`;
- função `recordPracticeSession()`;
- função `getPracticeSessions()`;
- função `getPracticeSessionsForLesson()`;
- função `getPracticeReviewQueue()`;
- função `hasPracticeSessionToday()`;
- sessão de prática salva: aula, tipo, nível, data, total, acertos, erros, precisão, vidas, modo revisão, itens fracos e resultados compactos;
- `PracticeLauncher.jsx` agora usa `PracticePlanAdapter.js` também para contar exercícios, não mais `PracticeEngine.js`;
- ao concluir a prática fullscreen, `PracticeLauncher.jsx` grava a sessão real com `recordPracticeSession()`;
- card da prática passa a mostrar `Prática registrada`, acertos, precisão, vidas e melhor sessão;
- botão muda para `Revisar novamente` quando já há sessão salva;
- criada seção `PracticeProgressSummary` na aba Progresso;
- aba Progresso agora mostra precisão média, exercícios feitos, erros para revisar, última sessão e fila de revisão;
- estilos novos para resumo de prática e estado de prática concluída.

Teste recomendado no iPhone:
1. abrir uma aula;
2. entrar na prática fullscreen;
3. responder algumas questões e concluir;
4. voltar para a aula e confirmar se o card mudou para `Prática registrada`;
5. confirmar se aparecem acertos, precisão e vidas;
6. clicar em `Revisar novamente` e garantir que abre a prática de novo;
7. ir na aba Progresso e confirmar a seção `Prática profunda`;
8. confirmar se aparecem última prática e fila de revisão caso tenha errado algo.

### `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile IMPLEMENTADO E VALIDADO PELO USUÁRIO

O usuário confirmou que funcionou perfeitamente.

Arquivos alterados:
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/listeningBuilder.js`
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/styles/practice-fullscreen.css`

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO E VALIDADO

O bloco 7 foi validado pelo usuário: a prática passou a usar o motor novo, com 26 questões e vidas visíveis.

Arquivos criados:
- `fluency-clean/src/practice/PracticePlanAdapter.js`

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`

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

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO E VISUAL APROVADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases IMPLEMENTADO COMO BASE

### `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática IMPLEMENTADO COMO FUNDAÇÃO

## NOVA ORDEM DE BLOCOS — REFORMULAÇÃO DA PRÁTICA

1. `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática. STATUS: fundação criada.
2. `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases. STATUS: base criada.
3. `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões. STATUS: implementado.
4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency. STATUS: implementado e visual aprovado.
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico. STATUS: implementado.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício. STATUS: implementado.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas. STATUS: implementado e validado.
7B. `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile. STATUS: implementado e validado.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão. STATUS: implementado, aguardando teste.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- validar bloco 8 no iPhone;
- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- remover `PracticeEngine.js` somente depois de validação completa do adapter/core;
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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `8` foram implementados. O bloco 7 conectou o motor novo e foi validado. O bloco 7B saneou alternativas e foi validado pelo usuário. O bloco 8 adicionou persistência real da prática: `recordPracticeSession`, histórico `progress.practiceSessions`, card de prática registrada e seção `Prática profunda` na aba Progresso. Próximo passo: verificar deploy e testar bloco 8 no iPhone. Se aprovado, seguir para `BLOCO-PRACTICE-REBUILD-9-LAB`, limpeza final e remoção de legado com muito cuidado."
