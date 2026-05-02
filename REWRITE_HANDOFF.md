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

## ESTADO ATUAL — HOTFIX GROQ DIÁRIO FORTE 7 SECTIONS REAL

### `HOTFIX-GROQ-DAILY-7-SECTIONS-REAL-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- O teste anterior mostrou inconsistência: o skeleton Groq já estava em modo diário forte 7 sections, mas o `grammarSectionGenerator.js` ainda limitava o 1B para 5 sections.
- Diagnóstico observado: `Modo Groq diário forte ativo: usando 7 sections...` seguido de `Cirurgia 2 Grammar ativa: reescrevendo 5 section(s)... modo Groq econômico 5 sections fortes`.
- A aula aprovou e salvou, mas só com 5 sections no 1B. Isso não atendia ao pedido do usuário.

Correção definitiva aplicada:
- `grammarSectionGenerator.js`
  - Removido limite antigo `GROQ_SECTION_COUNT = 5`.
  - Criado `GROQ_DAILY_SECTION_COUNT = 7`.
  - `rawSections.slice(0, GROQ_DAILY_SECTION_COUNT)` agora mantém 7 sections para Groq.
  - Mensagem antiga `modo Groq econômico 5 sections fortes` removida.
  - Diagnóstico correto agora: `modo Groq diário forte 7 sections`.
  - `grammarSectionContract` agora usa `groq-7-daily-sections`.
  - `reason` agora usa `sections-enriched-groq-7-daily-sections`.
- `externalLessonProviders.js`
  - Já estava correto para skeleton Groq com 7 sections.

Commits relevantes:
- `03fef31cfbabbe1fa84b209243de53ae468dc88e` — skeleton Groq forte com 7 sections.
- `b1fbfba461a20a3d6911f18799c32bf34e77d4a6` — correção real do 1B Groq para 7 sections.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `b1fbfba` ou posterior;
2. colocar nova key Groq, se necessário;
3. ativar `Forçar Groq na próxima geração`;
4. gerar a aula Grammar diária;
5. confirmar no diagnóstico:
   - `Modo Groq diário forte ativo: usando 7 sections profundas para simular aula diária.`
   - `Cirurgia 2 Grammar ativa: reescrevendo 7 section(s)... modo Groq diário forte 7 sections`;
   - sections 1 a 7 aprovadas;
   - cada section com 240+ palavras;
   - professor revisor ≥ 90;
   - avaliação pedagógica ≥ 90;
   - aula salva sem compactar conteúdo.

## ESTADO ANTERIOR — HOTFIX GROQ DIÁRIO FORTE PARCIAL

- O skeleton do Groq foi alterado para 7 sections, mas o 1B ainda estava preso em 5 sections por causa de constante antiga.
- Esse estado gerou aula aprovada, mas incompleta em relação ao pedido de 7 sections.

## ESTADO ANTERIOR — HOTFIX GROQ QUALIDADE + TRAVA DE OBJETIVO GRAMMAR

### `HOTFIX-GROQ-QUALITY-STUDY-READINESS-LAB` — IMPLEMENTADO

- Groq 5 sections foi reforçado para 240+ palavras por section.
- Study Readiness passou a reparar objetivo Grammar ausente/curto antes de bloquear.
- Issues antigas de objetivo curto não bloqueiam se o objetivo foi reparado localmente.

Commits:
- `32ccc827fadd4a27fa460154a744f770996cc9c8` — reforça mínimo real das sections Groq.
- `87ce9aa1c2d48b6fba7d3eb67374e18ba65294f3` — repara objetivo Grammar antes da trava.
- `840877e4674e2b5c133945e7e468058adf6d10fc` — ignora issue reparável de objetivo Grammar.

## LEITURA PARCIAL DA COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Foi o mais estável até agora.
- Gerou aula completa, abriu no IndexedDB e recebeu 98/100.
- Conteúdo profundo e validado.
- Problema principal observado: visual dos blocos `Exemplos do professor`, com texto corrido e pontuação grudada.

### Groq
- Não está idêntico ao Flash.
- O conteúdo observado tem frases e organização diferentes.
- Com 5 sections fortes, chegou a revisor 95–96/100 e avaliação pedagógica 95/100, mas o teste ainda não vale como comparação final porque 1B tinha só 5 sections.
- Agora precisa testar Groq em 7 sections reais para comparação final.

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

1. Esperar deploy com `b1fbfba` ou posterior.
2. Colocar nova key Groq, se necessário.
3. Testar Groq puro com 7 sections reais.
4. Se Groq salvar, comparar aula completa com Flash.
5. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `b1fbfba`: corrigiu de verdade o 1B do Groq para 7 sections. O skeleton já estava em 7, mas o 1B ainda estava limitado a 5. Próximo passo é testar Groq puro com 7 sections reais e comparar com Flash se salvar. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
