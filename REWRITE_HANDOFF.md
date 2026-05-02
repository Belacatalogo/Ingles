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

## ESTADO ATUAL — HOTFIX EXTERNAL 1B: TOKENS MENORES + SECTION CURTA

### `HOTFIX-EXTERNAL-1B-TOKEN-CONTROL-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Cerebras puro já entrou no 1B, mas a primeira section veio curta: `106/180 palavras`.
- Groq puro já chegou até section 2 aprovada (`229 palavras`), mas quebrou na section 3 por HTTP 429/TPM: `Limit 12000, Used 9995, Requested 2079`.
- Isso confirma que Groq tem qualidade/fluxo funcionando, mas ainda precisa reduzir consumo de tokens por minuto.

Correção aplicada em `grammarSectionGenerator.js`:
- Contexto de sections anteriores para provedores externos foi reduzido:
  - antes: até 900 caracteres por section anterior;
  - agora: até 220 caracteres por section anterior em modo externo.
- Exemplo 1-shot enviado aos externos foi encurtado.
- Prompt externo passou a mirar 200–240 palavras por section, mantendo mínimo de 180.
- Adicionada pausa entre sections externas:
  - Groq: 5,5s entre sections;
  - Cerebras: 1,8s entre sections.
- Se uma section externa vier curta, o app não aborta imediatamente:
  - registra `Section X veio curta... Pedindo expansão ao mesmo provedor`;
  - espera um pouco;
  - chama o mesmo provedor de novo pedindo expansão da section curta;
  - só reprova se a expansão também falhar.

Commit:
- `d80a8cdb409b3d060dba4920a8feea29bb3ef499` — reduz tokens e repara section curta.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `d80a8cd` ou posterior;
2. testar primeiro Cerebras puro com `llama3.1-8b`;
3. confirmar se aparece, caso venha curto:
   - `Section 1 veio curta em cerebras... Pedindo expansão ao mesmo provedor`;
   - depois `Grammar section 1 aprovada... cerebras/llama3.1-8b`;
4. testar Groq puro;
5. confirmar se a pausa diminui os erros 429/TPM;
6. comparar nota/qualidade/hash somente se salvar.

## ESTADO ANTERIOR — HOTFIX EXTERNAL PROVIDERS: ESQUELETO LEVE + 1B PURO

### `HOTFIX-EXTERNAL-PROVIDERS-SKELETON-1B-LAB` — IMPLEMENTADO

- Para Grammar em provedor externo forçado, o provider gera apenas um esqueleto leve.
- A profundidade real fica toda na Cirurgia 2 / Grammar 1B.
- Se Groq/Cerebras gerar esqueleto sem sections suficientes, o app aplica esqueleto local de 7 sections para permitir 1B puro do mesmo provedor.
- Mantido: se for teste forçado, NÃO volta para Gemini, para não contaminar comparação.

Commit:
- `782ff028b1f956c8ab0814d97581f30f47fd109d` — esqueleto leve obrigatório.

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

1. Esperar deploy com `d80a8cd` ou posterior.
2. Testar Cerebras puro com `llama3.1-8b`.
3. Confirmar que section curta é expandida automaticamente.
4. Testar Groq puro.
5. Comparar nota/qualidade/hash se salvar.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `d80a8cd`: 1B externo agora envia menos contexto, pausa entre sections e tenta expandir section curta no mesmo provedor. Próximo passo é testar Cerebras puro com `llama3.1-8b`, depois Groq puro. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
