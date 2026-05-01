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

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO, aguardando deploy/teste

Contexto:
- bloco 8 foi validado pelo usuário;
- o próximo passo era remover duplicidade e legado da prática.

Análise antes da alteração:
- `PracticeFullscreen.jsx` já usava `PracticePlanAdapter.js` e não dependia mais do motor antigo;
- `PracticeLauncher.jsx` já havia sido migrado no bloco 8 para `PracticePlanAdapter.js`;
- `PracticeEngine.js` era legado não usado no fluxo principal;
- `ListeningLesson.jsx` ainda continha uma prática antiga interna, separada da prática fullscreen nova;
- essa prática antiga não deveria continuar aparecendo/competindo com o novo sistema fullscreen.

Arquivos criados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`

Arquivos alterados:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `REWRITE_HANDOFF.md`

Arquivos removidos:
- `fluency-clean/src/practice/PracticeEngine.js`

O que foi implementado:
- removido o motor antigo `PracticeEngine.js`;
- criado `ListeningLessonClean.jsx`, uma versão limpa da aula de Listening sem quiz/prática legada interna;
- mantidos no Listening limpo: áudio natural, transcrição, conceito, vocabulário, shadowing e conclusão da aula;
- `LessonScreen.jsx` agora importa e renderiza `ListeningLessonClean` para aulas do tipo listening;
- a prática principal permanece somente no `PracticeLauncher` + `PracticeFullscreen`, usando o core novo;
- o arquivo antigo `ListeningLesson.jsx` permanece temporariamente no repositório, mas fora do fluxo ativo, para evitar remoção arriscada antes do teste no iPhone.

Teste recomendado no iPhone:
1. abrir uma aula de Listening;
2. confirmar que a aula carrega sem tela branca;
3. confirmar que o card `Prática profunda` continua aparecendo antes do conteúdo da aula;
4. confirmar que dentro da aula Listening não aparece mais a prática/quiz antiga embutida;
5. testar áudio principal;
6. abrir transcrição/vocabulário/conceito;
7. testar shadowing;
8. concluir a aula;
9. abrir prática fullscreen e confirmar que ela continua funcionando.

Pendente no próprio bloco 9:
- depois de validar no iPhone, remover definitivamente `fluency-clean/src/lessons/ListeningLesson.jsx`;
- procurar CSS legado de `.fluency-quiz-*` e remover se não houver uso ativo;
- confirmar se nenhum import ativo referencia `PracticeEngine.js` ou `ListeningLesson.jsx`.

### `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão IMPLEMENTADO E VALIDADO PELO USUÁRIO

O usuário confirmou que funcionou.

Arquivos criados:
- `fluency-clean/src/components/progress/PracticeProgressSummary.jsx`

Arquivos alterados:
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/practice/PracticeLauncher.jsx`
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/styles/progress-polish.css`

### `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile IMPLEMENTADO E VALIDADO PELO USUÁRIO

O usuário confirmou que funcionou perfeitamente.

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO E VALIDADO

O bloco 7 foi validado pelo usuário: a prática passou a usar o motor novo, com 26 questões e vidas visíveis.

### `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício IMPLEMENTADO

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
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão. STATUS: implementado e validado.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado. STATUS: parcialmente implementado, aguardando teste.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- validar bloco 9 no iPhone;
- remover definitivamente `ListeningLesson.jsx` após validação;
- remover CSS legado `.fluency-quiz-*` após confirmar que não há uso ativo;
- confirmar se o core gera questões suficientes para aulas reais antigas e novas;
- seguir para teste completo no iPhone.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `8` foram implementados e validados. O bloco 9 removeu `PracticeEngine.js`, criou `ListeningLessonClean.jsx` sem prática legada interna e trocou `LessonScreen.jsx` para usar o Listening limpo. Próximo passo: verificar deploy, testar bloco 9 no iPhone e, se aprovado, remover definitivamente o `ListeningLesson.jsx` antigo e CSS legado `.fluency-quiz-*`."
