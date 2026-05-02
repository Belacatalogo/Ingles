# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## DECISÃO ATUAL DE MOTOR DE IA

Após comparação manual:
- `gemini-2.5-flash` fica como motor principal de aula diária.
- Groq fica como fallback/teste opcional, não principal.
- Cerebras fica como fallback emergencial/teste leve, não principal para Grammar profunda.

Motivo:
- Flash foi o mais estável, mais focado no tema e gerou a aula mais aproveitável.
- Groq é promissor, mas instável em limite/cota e ainda precisa teste final real com 7 sections.
- Cerebras passou tecnicamente em alguns testes, mas teve conteúdo mais repetitivo, genérico e com erros pedagógicos.

## ESTADO ATUAL — GRAMMAR APROVADA NA LAB

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar foi testada no iPhone após o `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB`.
- Usuário confirmou: `tudo ok`.
- A tela Grammar fica considerada aprovada visualmente na branch `rewrite-fluency-clean-lab`.

Base aprovada:
- Parser seguro modular em `fluency-clean/src/lessons/grammar/grammarRenderParser.js`.
- `GrammarLesson.jsx` conectado ao parser seguro.
- Cards de exemplos com fallback seguro.
- Render report lateral funcionando:
  - `Grammar render: OK`;
  - `Exemplos: N`;
  - `Cards bloqueados: N`;
  - `Texto preservado: sim`.

Regras preservadas para próximos trabalhos:
- Não mexer em Grammar agora, a menos que apareça regressão real em teste.
- Não mexer no parser seguro sem motivo claro.
- Se houver dúvida no parser, renderizar como parágrafo, não como card.
- Não alterar geração, modelo, prompts, fallback, professor revisor, `deepGrammarPipeline.js` ou backend.

Arquivos envolvidos na base aprovada:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/lessons/grammar/grammarRenderParser.js`
- `fluency-clean/src/styles/grammar-examples-hotfix.css`
- `fluency-clean/src/main.jsx`

Próximo bloco recomendado:
- `BLOCO-LISTENING-RENDER-REVIEW-LAB`

Objetivo do próximo bloco:
- Revisar a renderização da aula Listening no iPhone.
- Garantir que áudio, botões, salvar/concluir e prática estejam funcionando.
- Evitar respostas aparecendo antes da hora.
- Melhorar leitura e fluxo sem mexer no backend Azure privado.
- Manter tudo modular e sem DOM injection, bundle patch ou HTML remendado.

Commit:
- Este bloco é documental/controle de estado: registra aprovação visual de Grammar e libera o avanço para Listening.

## ESTADO ANTERIOR — BLOCO GRAMMAR RENDER SAFETY GATE

### `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB` — IMPLEMENTADO

Objetivo executado:
- Sair de correções soltas dentro de `GrammarLesson.jsx` e criar uma camada dedicada de renderização segura para Grammar.
- Centralizar normalização, separação de parágrafos, listas numeradas, detecção de exemplos, fallback seguro e relatório de render.
- Reduzir risco de erros nas próximas aulas Grammar.

Arquivos alterados/criados:
- `fluency-clean/src/lessons/grammar/grammarRenderParser.js` — novo parser seguro.
- `fluency-clean/src/lessons/GrammarLesson.jsx` — conectado ao parser seguro.
- `REWRITE_HANDOFF.md`

O que foi feito:
- Criado parser modular `grammarRenderParser.js`.
- Movidas para o parser as funções de:
  - `cleanText`;
  - `normalizeVisualSpacing`;
  - `splitParagraphs`;
  - `splitNumberedList`;
  - `splitByExampleHeader`;
  - `collectProfessorExamples`;
  - `normalizeSections`;
  - `normalizeTips`.
- Criado `buildGrammarRenderReport`.
- `GrammarLesson.jsx` ficou mais limpo e passou a apenas renderizar o resultado seguro.
- Adicionado relatório visual no card lateral:
  - `Grammar render: OK`;
  - `Exemplos: N`;
  - `Cards bloqueados: N`;
  - `Texto preservado: sim`.
- Regra de segurança mantida: na dúvida, renderiza como parágrafo; só vira card quando a frase em inglês é confiável.
- Adicionada classe `grammar-render-safety-gate-v1` para identificar o novo bloco.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu no `deepGrammarPipeline.js`.
- Não mexeu no professor revisor.
- Não mexeu na política de chaves/modelos.
- Não alterou geração, prompts, fallback ou motor.

Commits:
- `8387eef477f1cd8801a89ad546e6fe15da71ae15` — cria parser seguro da Grammar.
- `16e3436937dbc31f39f45bcbd45ad9e8d8d81cf6` — conecta Grammar ao parser seguro.

## ESTADO ANTERIOR — HOTFIX GRAMMAR CARD SPLIT V6

### `HOTFIX-GRAMMAR-CARD-SPLIT-V6-LAB` — IMPLEMENTADO

Objetivo executado:
- Corrigir cards que engoliam um segundo exemplo conectado por `e` ou `ou`.
- Exemplo do problema: `I have a blue backpack (Eu tenho uma mochila azul) e 'She has a small dog'...`.
- Exemplo do problema: `I have a new pet (Eu tenho um animal de estimação novo) ou 'We have a big house'...`.
- Manter o primeiro card limpo e jogar o exemplo secundário/continuação para parágrafo normal abaixo.
- Evitar corte ruim de explicações curtas por palavras genéricas como `A forma`.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Adicionado `secondaryExamplePattern`.
- Adicionada função `splitSecondaryExampleOverflow`.
- `extractTranslation` agora separa tradução principal de um segundo exemplo quando encontra `e/ou + frase em inglês`.
- Segundo exemplo sai da tradução do card e vira explicação/overflow normal preservado abaixo.
- `exampleOverflowPattern` foi refinado para não cortar explicações curtas em `A forma...`.
- Adicionada classe `grammar-renderer-card-split-v6` para identificar o hotfix.

Commit:
- `aa92b93a65adeb08b9192f8f32f750c7855e69aa` — divide exemplos secundários nos cards Grammar.

## ESTADO ANTERIOR — HOTFIX GRAMMAR OVERFLOW V4

### `HOTFIX-GRAMMAR-EXAMPLE-OVERFLOW-V4-LAB` — IMPLEMENTADO

Objetivo executado:
- Corrigir o caso visto no iPhone em que o card `I am happy` engolia explicações posteriores, como `Já 'She is a doctor'...` e `O verbo 'to have'...`.
- Manter o card somente com o exemplo principal e sua tradução/explicação curta.
- Empurrar continuação pedagógica posterior para parágrafo normal abaixo dos cards.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

Commit:
- `5ed3022a2bca80807948a274145b7785a99c3e15` — ajusta overflow dos exemplos Grammar.

## ESTADO ANTERIOR — BLOCO RENDER GRAMMAR V3

### `BLOCO-GRAMMAR-RENDERER-V3-LAB` — IMPLEMENTADO

Objetivo executado:
- Reestruturar o sistema de renderização da aula Grammar para reduzir bugs visuais no iPhone.
- Parar de transformar pedaços incompletos como `I am` em card de exemplo.
- Evitar que explicações longas em português sejam quebradas indevidamente em vários cards.
- Preservar conteúdo pedagógico sem mexer em geração, modelo, prompts, professor revisor, `deepGrammarPipeline.js`, fallback ou backend.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

## COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Melhor opção atual.
- Gerou aula completa, profunda e coerente.
- Pontos fracos principais agora são visuais, não de motor.

### Groq
- Não está idêntico ao Flash.
- Teve conteúdo diferente e potencial, mas limitações de cota e instabilidade.
- Ainda pode ser testado depois em 7 sections reais.

### Cerebras `llama3.1-8b`
- Teve reposições/expansões, mas conteúdo real ficou inconsistente.
- Não usar como principal para Grammar profunda.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Grammar foi aprovada visualmente na lab após o `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB`. Não mexer em Grammar agora, a menos que apareça regressão real. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, `deepGrammarPipeline.js`, revisor ou política de chaves. Próximo bloco recomendado: `BLOCO-LISTENING-RENDER-REVIEW-LAB`, revisar renderização Listening, áudio, botões, salvar/concluir e respostas antecipadas no iPhone."
