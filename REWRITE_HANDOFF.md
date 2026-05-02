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

## ESTADO ATUAL — HOTFIX GROQ DIÁRIO FORTE 7 SECTIONS

### `HOTFIX-GROQ-DAILY-7-SECTIONS-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- O modo Groq econômico com 5 sections ajudou a concluir a geração, mas o usuário decidiu simular a aula diária real.
- Como será apenas 1 geração por dia, prioridade agora é qualidade máxima, não economia de chamadas.
- Pedido do usuário: voltar Groq para 7 sections fortes usando uma nova key no teste final.

Correção aplicada:
- `externalLessonProviders.js`
  - Groq deixou de usar skeleton econômico de 5 sections.
  - Skeleton Grammar do Groq agora exige 7 sections.
  - Fallback local de skeleton Grammar também cria 7 sections.
  - Diagnóstico registra: `Modo Groq diário forte ativo: usando 7 sections profundas para simular aula diária.`
  - `planContract` recebe `groq-7-section-daily-v1`.
  - Max tokens do skeleton Groq subiu para 2400.
- `grammarSectionGenerator.js`
  - Groq usa até 7 sections no 1B.
  - Cada section Groq mantém mínimo forte de 240 palavras.
  - Prompt Groq mira 280–340 palavras.
  - Sections abaixo de 240 pedem expansão ao mesmo provedor.
  - Diagnóstico registra: `modo Groq diário forte 7 sections`.
  - `grammarSectionContract` recebe sufixo `groq-7-daily-sections`.

Commits:
- `03fef31cfbabbe1fa84b209243de53ae468dc88e` — skeleton Groq forte com 7 sections.
- commit seguinte em `grammarSectionGenerator.js` — 1B Groq forte com 7 sections.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com os commits acima;
2. colocar uma nova key Groq;
3. ativar `Forçar Groq na próxima geração`;
4. gerar a aula Grammar diária;
5. confirmar no diagnóstico:
   - `Modo Groq diário forte ativo: usando 7 sections profundas para simular aula diária.`
   - `Cirurgia 2 Grammar ativa... modo Groq diário forte 7 sections`;
   - 7 sections aprovadas;
   - cada section com 240+ palavras;
   - professor revisor ≥ 90;
   - avaliação pedagógica ≥ 90;
   - trava de confiança não bloquear por objetivo curto reparável.

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
- Com 5 sections fortes, chegou a revisor 96/100 e avaliação pedagógica 95/100.
- Agora será testado em modo diário forte com 7 sections.
- Groq parece promissor, mas precisa validar com uma key limpa para não bater limite.

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

1. Esperar deploy com o hotfix Groq diário forte.
2. Colocar nova key Groq.
3. Testar Groq puro com 7 sections.
4. Se Groq salvar, comparar aula completa com Flash.
5. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi Groq diário forte: Groq voltou para 7 sections, cada section exige 240+ palavras e mira 280–340, simulando uma única geração diária. Próximo passo é testar Groq puro com nova key e comparar com Flash se salvar. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
