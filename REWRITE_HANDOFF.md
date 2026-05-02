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

## ESTADO ATUAL — HOTFIX EXTERNAL PROVIDERS: ESQUELETO LEVE + 1B PURO

### `HOTFIX-EXTERNAL-PROVIDERS-SKELETON-1B-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Groq puro continuou falhando por limite/timeout: depois de retry em 429, terminou com `Load failed`.
- Cerebras com `llama3.1-8b` conseguiu gerar algo, mas veio sem `sections`, então apareceu `Cirurgia 2 Grammar não precisou rodar: missing-sections`.
- A aula Cerebras foi reprovada pelo professor revisor com 87/100 por profundidade rasa, justamente porque o 1B não teve base para rodar.

Correção aplicada:
- Para Grammar em provedor externo forçado, o provider agora gera apenas um ESQUELETO LEVE da aula.
- Esse esqueleto deve ter `sections` obrigatórias, mas cada section vem curta.
- A profundidade real fica toda na Cirurgia 2 / Grammar 1B.
- Se Groq/Cerebras gerar esqueleto sem sections suficientes, o app aplica um esqueleto local de 7 sections para permitir o 1B puro do mesmo provedor.
- Reduzido o tamanho do esqueleto externo para reduzir rate limit do Groq e JSON quebrado do Cerebras.
- Reduzido também o max tokens do 1B externo:
  - Cerebras: 2200
  - Groq: 3000
- Mantido: se for teste forçado, NÃO volta para Gemini, para não contaminar comparação.

Diagnóstico esperado agora no Cerebras:
- `Cerebras gerou aula para validacao local.`
- Se vier sem sections: `Cerebras gerou esqueleto sem sections suficientes. Aplicando esqueleto Grammar local para permitir 1B puro.`
- `Cirurgia 2 Grammar ativa... usando cerebras em todo o 1B.`
- `Grammar 1B externo: tentando Cerebras/llama3.1-8b...`
- `Grammar section 1 aprovada: ... palavras · cerebras/llama3.1-8b.`

Diagnóstico esperado agora no Groq:
- `Groq gerou aula para validacao local.`
- `Cirurgia 2 Grammar ativa... usando groq em todo o 1B.`
- Se houver 429: retry/backoff continua aparecendo.
- Se ainda der `Load failed`, provavelmente é limite/rede do iPhone/API depois de muitas chamadas sequenciais.

Arquivo alterado:
- `fluency-clean/src/services/externalLessonProviders.js`
- `REWRITE_HANDOFF.md`

Commit:
- `782ff028b1f956c8ab0814d97581f30f47fd109d` — esqueleto leve obrigatório.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `782ff02` ou posterior;
2. testar primeiro `Forçar Cerebras na próxima geração` com modelo `llama3.1-8b`;
3. confirmar que a Cirurgia 2 roda com Cerebras em todo o 1B;
4. depois testar Groq puro;
5. comparar nota/qualidade/hash somente se salvar.

## ESTADO ANTERIOR — HOTFIX PROVEDORES EXTERNOS ROBUSTOS

### `HOTFIX-EXTERNAL-PROVIDERS-ROBUST-LAB` — IMPLEMENTADO
- Groq tem retry/backoff em HTTP 429.
- Parser JSON externo ficou mais tolerante.
- Cerebras 1B recebe prompt mais restrito.
- Teste forçado não volta para Gemini.

Commits:
- `dfe4ed42f7b0ae424f68d8b8a6b7d33fec310e58` — retry e parser tolerante.
- `e01094350fc4b9ef3d5dd62f6538030e76805855` — não contamina teste forçado.

## ESTADO ANTERIOR — HOTFIX MOTOR PURO PARA COMPARAÇÃO

### `HOTFIX-MOTOR-PURO-GROQ-CEREBRAS-LAB` — IMPLEMENTADO
- Quando força Groq, esqueleto e Grammar 1B usam Groq.
- Quando força Cerebras, esqueleto e Grammar 1B usam Cerebras.
- Validação local/revisor permanece igual.

## PENDENTE VISUAL ANOTADO — NÃO MEXER AINDA

### `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB` — PENDENTE

Problema observado na aula Flash:
- Blocos `Exemplos do professor` aparecem como texto corrido.
- Há pontuação grudada, por exemplo `.Por exemplo` e `.Ele também`.
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

1. Esperar deploy com `782ff02` ou posterior.
2. Testar Cerebras puro com `llama3.1-8b`.
3. Confirmar que Grammar 1B roda com Cerebras.
4. Testar Groq puro.
5. Comparar nota/qualidade/hash se salvar.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `782ff02`: provedores externos em Grammar geram esqueleto leve obrigatório e deixam profundidade para o 1B puro do mesmo provedor; se vier sem sections, aplica esqueleto local para permitir 1B. Próximo passo é testar Cerebras puro com `llama3.1-8b`, depois Groq puro. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
