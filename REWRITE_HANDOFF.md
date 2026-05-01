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

### `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile IMPLEMENTADO, aguardando validação no iPhone

Contexto do teste do usuário:
- bloco 7 entrou corretamente e o motor novo foi usado;
- a prática fullscreen está bonita e funcional;
- ainda apareceram algumas alternativas estranhas/truncadas;
- o ditado estava exigindo frase longa demais para A1 inicial;
- ao digitar no iPhone, teclado/campo/rodapé podiam ficar sobrepostos.

Análise antes da alteração:
- `makeMeaningOptions()` ainda usava distratores genéricos como `frase`, `pergunta`, `som`, causando alternativas pobres ou estranhas;
- `makeSentenceOptions()` aceitava frases grandes demais para cards mobile;
- `listeningBuilder.js` criava ditado com frases inteiras logo em A1 inicial;
- `PracticeQualityGate.js` ainda permitia alternativa genérica e ditado longo;
- `PracticePlanAdapter.js` precisava de um último filtro de segurança para bloquear opções que escapassem dos builders;
- `practice-fullscreen.css` precisava de modo especial para teclado do iPhone.

Arquivos alterados:
- `fluency-clean/src/practice/core/builders/builderUtils.js`
- `fluency-clean/src/practice/core/builders/listeningBuilder.js`
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/styles/practice-fullscreen.css`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- adicionados bloqueios para distratores genéricos: `resposta`, `pergunta`, `frase`, `palavra`, `answer`, `question`, `sentence`, etc.;
- `makeWordOptions()` agora limita opções a termos compactos;
- `makeSentenceOptions()` agora limita frases por quantidade de palavras e caracteres;
- `makeMeaningOptions()` agora usa preferencialmente vocabulário real da aula e fallback curto/seguro;
- criado `getA1DictationUnits()` para ditados A1 com palavra, keyword ou frase muito curta;
- `makeVocabularyQuestions()` ignora significados longos demais;
- `makeExistingExerciseQuestions()` evita transformar respostas longas em múltipla escolha;
- `listeningBuilder.js` detecta A1 inicial e reduz dificuldade;
- em A1 inicial, ditado passa a usar palavras/trechos curtos antes de frases;
- `listeningBuilder.js` usa `shortSentences` para word bank, fill blank e shadowing;
- `PracticeQualityGate.js` bloqueia alternativas genéricas/truncadas;
- `PracticeQualityGate.js` reduz limite de ditado para 64 caracteres e 8 palavras;
- `PracticeQualityGate.js` reduz frases de fala longas demais;
- `PracticePlanAdapter.js` filtra opções na camada final antes da UI;
- `PracticePlanAdapter.js` bloqueia alternativa `resposta/...` e opções longas demais;
- `PracticePlanAdapter.js` impede ditado renderizável acima de 64 caracteres/8 palavras;
- CSS recebeu modo `:has(.practice-textarea:focus)` e `:has(.practice-speak-box input:focus)` para iOS;
- no modo teclado, vidas somem temporariamente, pergunta compacta, áudio reduz, textarea menor e feedback fica fixo com menos altura;
- objetivo: evitar sobreposição com o teclado do iPhone.

Teste recomendado no iPhone:
1. abrir a prática da aula A1 Listening;
2. verificar se alternativas tipo `resposta/...` sumiram;
3. verificar se vocabulário mostra opções curtas e naturais;
4. chegar em ditado e confirmar se agora pede palavra ou frase curta, não frase longa;
5. tocar no campo de escrita com teclado aberto;
6. confirmar se o botão/feedback não cobre o campo;
7. testar erro e acerto para confirmar vidas e feedback.

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO E VALIDADO PARCIALMENTE

O bloco 7 foi validado pelo usuário: a prática passou a usar o motor novo, com 26 questões e vidas visíveis.

Arquivos criados:
- `fluency-clean/src/practice/PracticePlanAdapter.js`

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`

O que foi implementado:
- adapter entre `src/practice/core/` e UI;
- fallback seguro para `PracticeEngine.js` antigo;
- `write` renderizado como texto;
- `sourceEngine` salvo por resposta.

Importante:
- `PracticeEngine.js` ainda não foi removido;
- ele permanece como fallback seguro até validação completa.

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

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO E VISUAL APROVADO PELO USUÁRIO

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`

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
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas. STATUS: implementado e validado parcialmente.
7B. `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile. STATUS: implementado, aguardando teste.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- validar bloco 7B no iPhone;
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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `7B` foram implementados. O bloco 4 redesenhou o fullscreen premium e foi aprovado visualmente. O bloco 7 conectou o motor novo e foi validado parcialmente pelo usuário. O bloco 7B saneou alternativas, reduziu dificuldade de ditado A1 e ajustou teclado iOS. Próximo passo: verificar deploy e testar 7B no iPhone. Se aprovado, seguir para `BLOCO-PRACTICE-REBUILD-8-LAB`, persistência, progresso e revisão."
