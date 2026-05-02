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

## ESTADO ATUAL — HOTFIX GROQ QUALIDADE + TRAVA DE OBJETIVO GRAMMAR

### `HOTFIX-GROQ-QUALITY-STUDY-READINESS-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto do teste mais recente:
- A nova política Groq de 5 sections funcionou operacionalmente e concluiu as 5 sections.
- Sections geradas no teste:
  - section 1: 242 palavras;
  - section 2: 347 palavras;
  - section 3: 252 palavras;
  - section 4: 315 palavras;
  - section 5: 274 palavras.
- O professor revisor avaliou em 96/100.
- A avaliação pedagógica ficou 95/100.
- A aula ainda foi bloqueada pela trava de confiança por metadado: `Objetivo da aula está ausente ou curto demais`.

Correções aplicadas agora:
- `grammarSectionGenerator.js`
  - Groq continua com 5 sections, mas agora são 5 sections fortes.
  - Minimum real do Groq subiu para 240 palavras por section.
  - Prompt Groq agora mira 280–340 palavras.
  - Sections Groq abaixo de 240 pedem expansão.
  - `grammarSectionContract` agora usa sufixo `groq-5-strong-sections`.
- `studyReadiness.js`
  - Antes da trava de confiança, aula Grammar com objetivo ausente/curto recebe objetivo local seguro.
  - Se o objetivo foi reparado localmente, issues antigas de `objetivo ausente/curto demais` não bloqueiam a aula.
  - O reparo fica marcado em `readinessAutoRepair.objective = grammar-objective-autofilled-v1`.
  - `attachStudyReadiness` passa a preservar a aula reparada.
  - Versão passa para `study-readiness-v1+grammar-objective-repair`.

Commits:
- `32ccc827fadd4a27fa460154a744f770996cc9c8` — reforça mínimo real das sections Groq.
- `87ce9aa1c2d48b6fba7d3eb67374e18ba65294f3` — repara objetivo Grammar antes da trava.
- `840877e4674e2b5c133945e7e468058adf6d10fc` — ignora issue reparável de objetivo Grammar.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `840877e` ou posterior;
2. testar Groq puro novamente com a nova key;
3. confirmar no diagnóstico:
   - sections Groq acima de 240 palavras;
   - revisor ≥ 90;
   - avaliação pedagógica ≥ 90;
   - se objetivo vier curto, a trava deve reparar e não bloquear por esse mesmo motivo;
4. se salvar, abrir a aula e mandar prints para comparação real com Flash.

## ESTADO ANTERIOR — HOTFIX GROQ ECONÔMICO 5 SECTIONS

### `HOTFIX-GROQ-ECONOMICO-5-SECTIONS-LAB` — IMPLEMENTADO

- Groq usa 5 sections em vez de 7.
- Skeleton Grammar do Groq pede exatamente 5 sections.
- Se Groq vier sem sections, fallback local cria 5 sections.
- Prompt Groq mirava 260–320 palavras.
- Expansão automática do Groq ocorria só abaixo de 180 palavras.
- Isso economizou chamadas, mas deixou passar sections fracas como 188 e 211 palavras.

Commits:
- `5e326af39cc88dd4e166d16c50ea24191cec538e` — reduz skeleton grammar para 5 sections.
- `bed84b96417d3634830951a178a00f8aafb28244` — 1B com 5 sections longas.

## LEITURA PARCIAL DA COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Foi o mais estável até agora.
- Gerou aula completa, abriu no IndexedDB e recebeu 98/100.
- Conteúdo profundo e validado.
- Problema principal observado: visual dos blocos `Exemplos do professor`, com texto corrido e pontuação grudada.

### Groq
- Não está idêntico ao Flash.
- O conteúdo observado tem frases e organização diferentes.
- Com 5 sections fortes, o teste mais recente chegou a revisor 96/100 e avaliação pedagógica 95/100.
- O problema restante era metadado/objetivo curto, agora reparado localmente antes da trava.
- Groq parece promissor como alternativa/fallback, desde que a cota permita.

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

1. Esperar deploy com `840877e` ou posterior.
2. Testar Groq puro novamente.
3. Se Groq salvar, comparar aula completa com Flash.
4. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `840877e`: Groq 5 sections agora exige 240+ palavras por section e a trava de confiança repara objetivo Grammar curto antes de bloquear. Próximo passo é testar Groq puro e comparar com Flash se salvar. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
