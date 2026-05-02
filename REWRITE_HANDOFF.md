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

## ESTADO ATUAL — BLOCO RENDER GRAMMAR V3

### `BLOCO-GRAMMAR-RENDERER-V3-LAB` — IMPLEMENTADO

Objetivo executado:
- Reestruturar o sistema de renderização da aula Grammar para reduzir bugs visuais no iPhone.
- Parar de transformar pedaços incompletos como `I am` em card de exemplo.
- Evitar que explicações longas em português sejam quebradas indevidamente em vários cards.
- Preservar conteúdo pedagógico sem mexer em geração, modelo, prompts, professor revisor, `deepGrammarPipeline.js`, fallback ou backend.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Reescrito o parser visual local da aula Grammar em `GrammarLesson.jsx`.
- A renderização agora prioriza blocos estáveis:
  - parágrafos explicativos;
  - listas numeradas reais;
  - cards apenas dentro de seções com cabeçalho explícito de exemplos.
- `Exemplos do professor` deixou de varrer a seção inteira tentando transformar qualquer frase em card.
- Cards de exemplo agora exigem frase em inglês mais completa, com sujeito + estrutura mínima; fragmentos como `I am`, `You are`, `She is` isolados não viram mais card.
- Tradução em português só é destacada quando parece tradução real; regra/explicação continua como texto normal.
- Citações e parênteses continuam suportados quando a frase em inglês é confiável.
- `splitParagraphs` ficou menos agressivo: não quebra toda frase comum; só separa por quebras fortes e conectores pedagógicos.
- `splitNumberedList` ficou mais seguro para listas numeradas reais.
- Adicionada classe `grammar-renderer-system-v3` para identificar o novo render no DOM/CSS sem mexer em bundle.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu no `deepGrammarPipeline.js`.
- Não mexeu no professor revisor.
- Não mexeu na política de chaves/modelos.
- Não alterou geração, prompts, fallback ou motor.

Observação operacional:
- O commit de código foi `0538d2a9f80214961dbfe7303e342a6b4e888c0e`.
- Por limitação do fluxo via ferramenta, o handoff ficou em commit posterior, mas o escopo prático do bloco é o renderer V3 + handoff atualizado.

Próximo teste recomendado no iPhone:
1. Aguardar o deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir a mesma aula Grammar que estava bugada.
3. Conferir se `I am` sozinho não aparece mais como card grande.
4. Conferir se explicações como `Por exemplo...` e `Outro lado...` aparecem como parágrafos normais.
5. Conferir se exemplos completos, como `I am happy`, continuam podendo aparecer como card com tradução.
6. Conferir se nenhum conteúdo foi cortado.
7. Conferir se a navbar não impede o uso dos botões de Salvar/Concluir ao final da aula.

## ESTADO ANTERIOR — HOTFIX GRAMMAR STRICT CLASSIFIER

### `HOTFIX-GRAMMAR-EXAMPLES-STRICT-CLASSIFIER-LAB` — IMPLEMENTADO

Objetivo executado:
- Corrigir erro visual em que explicações em português estavam virando cards de `Exemplo`.
- Manter visual em cards apenas para frases de exemplo realmente confiáveis em inglês.
- Preservar conteúdo pedagógico sem cortar explicações longas.
- Não mexer em geração, modelo, prompts, fallback, professor revisor, `deepGrammarPipeline.js` ou backend.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Parser visual de `Exemplos do professor` deixou de transformar tudo após o cabeçalho em card.
- Agora um item só vira card se tiver frase em inglês detectada com classificador mais estrito.
- Frases mistas em português + termos ingleses, como `Correto, pois I combina com am.`, deixam de virar exemplo principal.
- Parágrafos longos explicativos, como `Cada um desses exemplos demonstra...`, voltam a ser texto normal.
- Frases reais como `I am a new student here.`, `She is very kind to everyone.`, `The book is on the table.`, `Is she from Brazil?` e `Are they here?` continuam podendo virar cards.
- Suporte melhor para exemplo após pista curta como `para fixar:`.
- Suporte melhor para frase em inglês entre aspas dentro de explicação.
- Tradução em português só é destacada quando parece tradução, não regra explicativa.
- Conteúdo posterior aos exemplos é preservado como parágrafo normal.

## ESTADO ANTERIOR — HOTFIX VISUAL GRAMMAR

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

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O bloco `BLOCO-GRAMMAR-RENDERER-V3-LAB` foi implementado: o sistema de renderização da aula Grammar foi reestruturado para priorizar parágrafos, listas numeradas reais e cards apenas em exemplos explícitos. Fragmentos como `I am` isolado não devem mais virar card. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, `deepGrammarPipeline.js`, revisor ou política de chaves. Próximo passo: testar no iPhone se a aula bugada renderiza sem cards quebrados e sem cortar conteúdo."
