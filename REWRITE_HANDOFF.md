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

## ESTADO ATUAL — HOTFIX PROVEDORES EXTERNOS ROBUSTOS

### `HOTFIX-EXTERNAL-PROVIDERS-ROBUST-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Groq puro falhou com HTTP 429 por limite de tokens por minuto no modelo `llama-3.3-70b-versatile`.
- Cerebras com `llama3.1-8b` deixou de dar 404, mas falhou por JSON quebrado: `JSON Parse error: Expected ']'`.
- Em teste forçado, o app ainda voltava para Gemini, contaminando a comparação.

O que foi corrigido:
- `externalLessonProviders.js` agora tem retry/backoff em HTTP 429:
  - lê `retry-after` quando disponível;
  - espera alguns segundos;
  - retoma a mesma chamada;
  - registra no diagnóstico a espera e a tentativa.
- Parser JSON externo ficou mais tolerante:
  - remove code fences;
  - tenta encontrar objeto JSON balanceado;
  - repara vírgulas sobrando;
  - tenta fechar `]` e `}` faltantes;
  - tenta uma segunda passada com chaves sem aspas.
- Cerebras 1B agora recebe prompt final mais restrito:
  - objeto simples `{ "title": "...", "content": "..." }`;
  - sem arrays;
  - sem markdown.
- Cerebras 1B usa saída menor (`2600`) para reduzir chance de JSON cortado.
- Se JSON mode falhar ou vier JSON quebrado, tenta chamada simples mais curta.
- `plannedGeminiLessons.js` agora, em teste forçado Groq/Cerebras, NÃO volta para Gemini se o provedor falhar.
  - Isso evita comparação contaminada.
  - O diagnóstico passa a mostrar o erro real do provedor externo.

Arquivos alterados:
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `REWRITE_HANDOFF.md`

Commits:
- `dfe4ed42f7b0ae424f68d8b8a6b7d33fec310e58` — retry e parser tolerante.
- `e01094350fc4b9ef3d5dd62f6538030e76805855` — não contamina teste forçado.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `e010943` ou posterior;
2. testar `Forçar Groq na próxima geração`;
3. se der 429, observar se aparece mensagem de espera/retry, sem cair imediatamente;
4. testar `Forçar Cerebras na próxima geração` com modelo `llama3.1-8b`;
5. confirmar se ele não volta para Gemini quando falha;
6. se Cerebras ainda falhar, printar o novo erro do parser.

## ESTADO ANTERIOR — HOTFIX MOTOR PURO PARA COMPARAÇÃO

### `HOTFIX-MOTOR-PURO-GROQ-CEREBRAS-LAB` — IMPLEMENTADO

- Quando força Groq, esqueleto e Grammar 1B usam Groq.
- Quando força Cerebras, esqueleto e Grammar 1B usam Cerebras.
- Validação local/revisor permanece igual.

Commits:
- `7a843c232c99508227a4839aa1a63a556672bfe7` — expõe geração externa de section grammar.
- `afdd920bc0d0206743f123f705cda9e4af4473f3` — usa provedor externo nas sections.
- `331323a8872fd343ca553e16dcd3733069b0ba16` — passa provedor alvo ao 1B.

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

## ESTADO ANTERIOR — COMPARAÇÃO DE MOTORES

### `HOTFIX-COMPARATIVO-MOTORES-LAB` — IMPLEMENTADO
- Botões para forçar Groq e Cerebras.
- Assinatura/hash de aula para comparação.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA
- Cada Grammar section é reescrita sequencialmente.
- Mínimo 180 palavras por section.
- Exige contraste com português e erro típico A1 brasileiro.
- Não mexeu no professor revisor.
- Não mexeu no `deepGrammarPipeline.js`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes de testar comparação pura Flash/Groq/Cerebras.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico como solução principal.
- Não corrigir visual dos exemplos antes de terminar a comparação dos motores.

## Próximo teste recomendado

1. Esperar deploy com `e010943` ou posterior.
2. Testar Groq puro.
3. Testar Cerebras puro com `llama3.1-8b`.
4. Comparar nota/qualidade/hash se salvar.
5. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `e010943`: Groq agora tem retry/backoff em 429; Cerebras tem parser JSON mais tolerante e saída menor no 1B; teste forçado não volta mais para Gemini para não contaminar comparação. Próximo passo é testar Groq puro e Cerebras puro. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
