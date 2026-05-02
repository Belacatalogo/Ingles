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

## ESTADO ATUAL — HOTFIX VISUAL GRAMMAR

### `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB` — IMPLEMENTADO

Objetivo executado:
- Melhorar a leitura da aula Grammar no iPhone sem mexer no motor pedagógico.
- Não alterar geração, prompts, modelo, chaves, fallback, revisor, `deepGrammarPipeline.js` ou backend.
- Não reduzir conteúdo.
- Apenas renderizar melhor o texto já gerado.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/styles/grammar-examples-hotfix.css`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Criada limpeza visual local em `GrammarLesson.jsx` para corrigir pontuação grudada como `.Por exemplo`, `.Já`, `.Outro`, `).Veja`.
- Normalizadas quebras antes de conectores como `Já`, `Outro exemplo`, `Veja`, `Assim`, `Portanto`, `Além disso`, `Na prática`, `Observe` e `Agora`.
- `Por exemplo` deixou de ser forçado como começo de novo card em qualquer lugar, para evitar card quebrado com apenas `Por`.
- `SectionContent` separa explicação em parágrafos mais legíveis.
- Blocos de `Exemplos do professor` viram cards visuais quando há cabeçalho de exemplos ou frase em inglês detectável.
- Parser dos exemplos foi corrigido após teste por imagens no iPhone:
  - não deixa mais vírgula solta antes da tradução;
  - evita pegar palavras soltas como `ser` como tradução;
  - preserva explicações longas sem cortar conteúdo;
  - mantém exemplos numerados como cards, não como lista comum.
- Cada card pode destacar frase em inglês, tradução quando existir e explicação quando existir.
- Criado CSS isolado `grammar-examples-hotfix.css`, importado em `main.jsx`, sem mexer no CSS gigante principal.
- Visual mantido sério/elegante, sem gamificação.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu no `deepGrammarPipeline.js`.
- Não mexeu no professor revisor.
- Não mexeu na política de chaves/modelos.
- Não alterou geração, prompts, fallback ou motor.

Próximo teste recomendado no iPhone:
1. Aguardar o deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir a aula Grammar Flash já salva, se possível.
3. Conferir Exemplo 1 e Exemplo 2, especialmente se não aparecem mais começo com vírgula solta nem tradução errada como `ser`.
4. Conferir se não aparece mais `.Por exemplo`, `.Já`, `.Outro`, `).Veja` grudado.
5. Conferir se `Exemplos do professor` aparece em cards/lista, e não como texto corrido.
6. Conferir se conteúdo não foi cortado.
7. Conferir se textarea, Salvar rascunho e Concluir Grammar continuam funcionando.

Observação:
- Este bloco é visual/renderização. Se algum exemplo gerado vier em formato muito imprevisível, a renderização preserva o texto e evita cortar conteúdo.

## ESTADO ANTERIOR — HOTFIX GROQ DIÁRIO FORTE 7 SECTIONS REAL

### `HOTFIX-GROQ-DAILY-7-SECTIONS-REAL-LAB` — IMPLEMENTADO

- `grammarSectionGenerator.js` teve o limite antigo de 5 sections removido.
- Criado `GROQ_DAILY_SECTION_COUNT = 7`.
- `rawSections.slice(0, GROQ_DAILY_SECTION_COUNT)` mantém 7 sections para Groq.
- Mensagem antiga `modo Groq econômico 5 sections fortes` removida.
- Diagnóstico correto: `modo Groq diário forte 7 sections`.
- `externalLessonProviders.js` já estava correto para skeleton Groq com 7 sections.

Commits relevantes:
- `03fef31cfbabbe1fa84b209243de53ae468dc88e` — skeleton Groq forte com 7 sections.
- `b1fbfba461a20a3d6911f18799c32bf34e77d4a6` — correção real do 1B Groq para 7 sections.

## ESTADO ANTERIOR — HOTFIX GROQ QUALIDADE + TRAVA DE OBJETIVO GRAMMAR

### `HOTFIX-GROQ-QUALITY-STUDY-READINESS-LAB` — IMPLEMENTADO

- Groq 5 sections foi reforçado para 240+ palavras por section.
- Study Readiness passou a reparar objetivo Grammar ausente/curto antes de bloquear.
- Issues antigas de objetivo curto não bloqueiam se o objetivo foi reparado localmente.

Commits:
- `32ccc827fadd4a27fa460154a744f770996cc9c8` — reforça mínimo real das sections Groq.
- `87ce9aa1c2d48b6fba7d3eb67374e18ba65294f3` — repara objetivo Grammar antes da trava.
- `840877e4674e2b5c133945e7e468058adf6d10fc` — ignora issue reparável de objetivo Grammar.

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O bloco `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB` foi implementado e depois ajustado pelo `HOTFIX-GRAMMAR-EXAMPLES-SAFE-PARSE-LAB`: parser visual dos exemplos ficou mais conservador, preservando conteúdo e corrigindo vírgula solta/tradução quebrada nos exemplos. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, `deepGrammarPipeline.js`, revisor ou política de chaves. Próximo passo: testar no iPhone Exemplo 1 e Exemplo 2 da aula Grammar Flash já salva."
