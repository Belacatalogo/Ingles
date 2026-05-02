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

## ESTADO ATUAL — HOTFIX GROQ ECONÔMICO 5 SECTIONS

### `HOTFIX-GROQ-ECONOMICO-5-SECTIONS-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Groq puro mostrou boa qualidade parcial, mas bateu limite diário/TPM por usar 7 chamadas 1B.
- O usuário vai testar outra key Groq e pediu a política nova:
  1. reduzir sections de 7 para 5 quando o motor for Groq;
  2. cada section Groq mirar 260–320 palavras;
  3. remover expansão preventiva abaixo de 220; manter expansão só abaixo de 180;
  4. reduzir exemplos repetidos no prompt;
  5. usar menos chamadas totais.

Correção aplicada:
- `externalLessonProviders.js`
  - Skeleton Grammar do Groq agora pede exatamente 5 sections.
  - Se Groq vier sem sections, fallback local cria 5 sections, não 7.
  - `planContract` recebe `groq-5-section-economy-v1`.
  - Skeleton Groq usa menos tokens (`1900`).
  - Diagnóstico registra: `Modo Groq econômico ativo: usando 5 sections longas em vez de 7 chamadas.`
- `grammarSectionGenerator.js`
  - Em `externalProvider === 'groq'`, o 1B usa no máximo 5 sections.
  - Prompt Groq mira 260–320 palavras por section.
  - Expansão automática do Groq agora só acontece abaixo de 180 palavras, não abaixo de 220.
  - Contexto anterior do Groq reduzido para 90 caracteres por section.
  - Microexemplo do prompt Groq reduzido para diminuir repetição e token gasto.
  - Pausa Groq ajustada para 6,5s entre sections.
  - `grammarSectionContract` recebe sufixo `groq-5-sections`.

Commits:
- `5e326af39cc88dd4e166d16c50ea24191cec538e` — reduz skeleton grammar para 5 sections.
- `bed84b96417d3634830951a178a00f8aafb28244` — 1B com 5 sections longas.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `bed84b9` ou posterior;
2. colocar a nova key Groq;
3. ativar `Forçar Groq na próxima geração`;
4. confirmar no diagnóstico:
   - `Modo Groq econômico ativo: usando 5 sections longas em vez de 7 chamadas.`
   - `Cirurgia 2 Grammar ativa... modo Groq econômico 5 sections longas.`
   - sections mirando 260–320 palavras;
5. se salvar, comparar aula completa com Flash.

## LEITURA PARCIAL DA COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Foi o mais estável até agora.
- Gerou aula completa, abriu no IndexedDB e recebeu 98/100.
- Conteúdo profundo e validado.
- Problema principal observado: visual dos blocos `Exemplos do professor`, com texto corrido e pontuação grudada.

### Groq
- Não está idêntico ao Flash.
- O conteúdo observado tem frases e organização diferentes.
- Já gerou sections aprovadas de 241, 281 e 224 palavras em testes anteriores.
- O problema principal é operacional: limite TPM/rate limit, não falta de qualidade.
- Nova política reduz chamadas totais de 7 para 5 para tentar viabilizar o teste completo.

### Cerebras `llama3.1-8b`
- Entrou no 1B, mas veio curto demais.
- Indício de menor obediência ao contrato de profundidade.
- Pode servir para tarefas leves, mas até agora parece fraco para Grammar profunda.

## PENDENTE VISUAL ANOTADO — NÃO MEXER AINDA

### `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB` — PENDENTE

Problema observado na aula Flash e também perceptível no Groq:
- Blocos `Exemplos do professor` aparecem como texto corrido.
- Há pontuação grudada, por exemplo `.Por exemplo`, `.Já`, `.Outro`.
- Exemplos, traduções e explicações ficam cansativos no celular.

Correção futura, somente depois da comparação de motores:
- transformar exemplos em blocos/listas limpas;
- separar cada exemplo em linha própria;
- destacar frase em inglês, tradução e explicação;
- corrigir pontuação grudada sem reduzir conteúdo.

## ESTADO ANTERIOR — HOTFIX EXTERNAL 1B: ALVO MAIOR E EXPANSÃO PREVENTIVA

### `HOTFIX-EXTERNAL-1B-TARGET-MIN-LAB` — IMPLEMENTADO

- Criado alvo preventivo externo `EXTERNAL_SECTION_TARGET_MIN = 220` para não-Groq.
- Prompt externo mira 240–280 palavras.
- Contexto anterior externo foi reduzido.
- Pausa Groq tinha sido aumentada para 9s antes da política econômica.

Commit:
- `d520b09543d70d2016f2eb1b900fb01e7512742d` — alvo maior para sections externas.

## ESTADO ANTERIOR — HOTFIX EXTERNAL PROVIDERS: ESQUELETO LEVE + 1B PURO

### `HOTFIX-EXTERNAL-PROVIDERS-SKELETON-1B-LAB` — IMPLEMENTADO

- Para Grammar em provedor externo forçado, o provider gera apenas um esqueleto leve.
- A profundidade real fica toda na Cirurgia 2 / Grammar 1B.
- Mantido: se for teste forçado, NÃO volta para Gemini, para não contaminar comparação.

Commit:
- `782ff028b1f956c8ab0814d97581f30f47fd109d` — esqueleto leve obrigatório.

## ESTADO ANTERIOR — HOTFIX INDEXEDDB AULA COMPLETA

### `HOTFIX-STORAGE-INDEXEDDB-AULA-COMPLETA-LAB` — IMPLEMENTADO
- Aula completa e profunda é salva inteira no IndexedDB.
- `localStorage` guarda só ponteiro/metadados leves.
- Não compacta conteúdo pedagógico como solução principal.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes de testar comparação pura Flash/Groq/Cerebras.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico como solução principal.
- Não corrigir visual dos exemplos antes de terminar a comparação dos motores.

## Próximo teste recomendado

1. Esperar deploy com `bed84b9` ou posterior.
2. Colocar nova key Groq.
3. Testar Groq puro.
4. Se Groq salvar, comparar aula completa com Flash.
5. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `bed84b9`: modo Groq econômico usa 5 sections longas, mira 260–320 palavras e só expande abaixo de 180. Próximo passo é testar Groq puro com nova key e comparar com Flash se salvar. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
