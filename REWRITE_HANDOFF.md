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

## ESTADO ATUAL — HOTFIX EXTERNAL 1B: ALVO MAIOR E EXPANSÃO PREVENTIVA

### `HOTFIX-EXTERNAL-1B-TARGET-MIN-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Cerebras continuou gerando section curta no 1B.
- Groq melhorou muito e já gerou sections aprovadas, por exemplo:
  - section 1: 241 palavras;
  - section 2: 229 palavras;
  - section 4 veio com 179/180 e pediu expansão.
- Groq ainda pode bater limite TPM, mas a qualidade parcial parece superior ao Cerebras e não está idêntica ao Flash.

Correção aplicada em `grammarSectionGenerator.js`:
- Criado alvo preventivo externo `EXTERNAL_SECTION_TARGET_MIN = 220`.
- Agora, em Groq/Cerebras, uma section abaixo de 220 palavras pede expansão preventiva, mesmo se já passou do mínimo técnico de 180.
- Prompt externo agora mira 240–280 palavras e instrui a não parar perto do mínimo.
- Contexto anterior externo ficou ainda mais enxuto:
  - 160 caracteres por section anterior.
- Exemplo 1-shot externo encurtado para reduzir tokens.
- Pausa Groq aumentada para 9s entre sections.
- Pausa antes de expansão Groq aumentada para 9,5s.
- Cerebras mantém pausa menor, mas também usa expansão preventiva.

Commit:
- `d520b09543d70d2016f2eb1b900fb01e7512742d` — alvo maior para sections externas.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `d520b09` ou posterior;
2. testar Groq puro de novo;
3. confirmar se sections abaixo de 220 são expandidas preventivamente;
4. confirmar se o erro 429 diminui com pausa de 9s;
5. testar Cerebras puro só se ainda fizer sentido; pelos testes parciais, Cerebras parece menos obediente para Grammar profunda.

## LEITURA PARCIAL DA COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Foi o mais estável até agora.
- Gerou aula completa, abriu no IndexedDB e recebeu 98/100.
- Conteúdo profundo e validado.
- Problema principal observado: visual dos blocos `Exemplos do professor`, com texto corrido e pontuação grudada.

### Groq
- Não está idêntico ao Flash.
- O conteúdo observado tem frases e organização diferentes.
- Já gerou sections aprovadas de 241 e 229 palavras.
- O problema principal é operacional: limite TPM/rate limit, não falta de qualidade.
- Pode ser bom candidato para fallback ou teste futuro se o controle de tokens/pausas resolver.

### Cerebras `llama3.1-8b`
- Entrou no 1B, mas veio curto demais.
- Indício de menor obediência ao contrato de profundidade.
- Pode servir para tarefas leves, mas até agora parece fraco para Grammar profunda.

## ESTADO ANTERIOR — HOTFIX EXTERNAL 1B: TOKENS MENORES + SECTION CURTA

### `HOTFIX-EXTERNAL-1B-TOKEN-CONTROL-LAB` — IMPLEMENTADO

- Contexto de sections anteriores para provedores externos foi reduzido.
- Prompt externo mirava 200–240 palavras.
- Adicionada pausa entre sections externas.
- Se uma section externa viesse curta, pedia expansão ao mesmo provedor.

Commit:
- `d80a8cdb409b3d060dba4920a8feea29bb3ef499` — reduz tokens e repara section curta.

## ESTADO ANTERIOR — HOTFIX EXTERNAL PROVIDERS: ESQUELETO LEVE + 1B PURO

### `HOTFIX-EXTERNAL-PROVIDERS-SKELETON-1B-LAB` — IMPLEMENTADO

- Para Grammar em provedor externo forçado, o provider gera apenas um esqueleto leve.
- A profundidade real fica toda na Cirurgia 2 / Grammar 1B.
- Se Groq/Cerebras gerar esqueleto sem sections suficientes, o app aplica esqueleto local de 7 sections para permitir 1B puro do mesmo provedor.
- Mantido: se for teste forçado, NÃO volta para Gemini, para não contaminar comparação.

Commit:
- `782ff028b1f956c8ab0814d97581f30f47fd109d` — esqueleto leve obrigatório.

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

## ESTADO ANTERIOR — HOTFIX PISCADAS NA ABA AULA

### `HOTFIX-AULA-INDEXEDDB-SEM-PISCAR-LAB` — IMPLEMENTADO
- Removido refresh automático por intervalo fixo de 1,5s.
- Tela Aula recarrega por evento, foco, visibilitychange ou botão atualizar.
- Commit: `a87fc5749b0c88767edc96628d178b994b78ec64`.

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

1. Esperar deploy com `d520b09` ou posterior.
2. Testar Groq puro.
3. Se Groq salvar, comparar aula completa com Flash.
4. Testar Cerebras puro apenas para confirmar se ainda vem curto.
5. Depois decidir motor prioritário.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `d520b09`: 1B externo agora mira 240–280 palavras, expande preventivamente abaixo de 220 palavras e aumenta pausa do Groq para 9s. Próximo passo é testar Groq puro e comparar com Flash. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
