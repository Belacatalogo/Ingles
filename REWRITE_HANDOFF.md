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

## ESTADO ATUAL — HOTFIX MOTOR PURO PARA COMPARAÇÃO

### `HOTFIX-MOTOR-PURO-GROQ-CEREBRAS-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- O teste forçando Groq mostrou que o esqueleto da aula foi gerado pelo Groq.
- Porém a Cirurgia 2 / Grammar 1B reescreveu as sections usando Gemini Flash.
- Isso invalidava a comparação pura entre motores.

O que foi corrigido:
- Quando o usuário ativa `Forçar Groq na próxima geração`, o processo inteiro de Grammar usa Groq:
  - esqueleto/aula inicial;
  - sections 1B sequenciais;
  - validação local continua igual.
- Quando o usuário ativa `Forçar Cerebras na próxima geração`, o processo inteiro de Grammar usa Cerebras:
  - esqueleto/aula inicial;
  - sections 1B sequenciais;
  - validação local continua igual.
- `externalLessonProviders.js` agora exporta `generateExternalGrammarSection()`.
- `grammarSectionGenerator.js` aceita `externalProvider` e usa Groq/Cerebras nas sections quando o teste estiver forçado.
- `plannedGeminiLessons.js` passa o provider externo usado no esqueleto para o 1B.

Diagnóstico esperado em teste puro Groq:
- `Modo teste ativo: pulando Gemini e chamando fallback externo groq.`
- `Groq gerou aula para validacao local.`
- `Cirurgia 2 Grammar ativa... usando groq em todo o 1B.`
- `Grammar 1B section 1: usando provedor externo puro groq.`
- `Grammar section 1 aprovada: ... palavras · groq/...`

Diagnóstico esperado em teste puro Cerebras:
- `Modo teste ativo: pulando Gemini e chamando fallback externo cerebras.`
- `Cerebras gerou aula para validacao local.`
- `Cirurgia 2 Grammar ativa... usando cerebras em todo o 1B.`
- `Grammar 1B section 1: usando provedor externo puro cerebras.`
- `Grammar section 1 aprovada: ... palavras · cerebras/...`

Arquivos alterados:
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/services/grammarSectionGenerator.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `REWRITE_HANDOFF.md`

Commits:
- `7a843c232c99508227a4839aa1a63a556672bfe7` — expõe geração externa de section grammar.
- `afdd920bc0d0206743f123f705cda9e4af4473f3` — usa provedor externo nas sections.
- `331323a8872fd343ca553e16dcd3733069b0ba16` — passa provedor alvo ao 1B.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `331323a` ou posterior;
2. ir em Ajustes > Chaves de aulas;
3. ativar `Forçar Groq na próxima geração`;
4. gerar a aula;
5. confirmar nos logs que as sections 1B NÃO usam Gemini Flash;
6. repetir depois com `Forçar Cerebras na próxima geração`.

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

1. Testar Groq puro.
2. Confirmar no diagnóstico que sections 1B usam Groq, não Gemini.
3. Avaliar nota/qualidade/hash.
4. Testar Cerebras puro.
5. Comparar Flash x Groq x Cerebras.
6. Só depois decidir motor prioritário e corrigir visual dos exemplos.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. O último hotfix foi `331323a`: quando forçar Groq/Cerebras, o esqueleto e as sections Grammar 1B usam o mesmo provedor externo, sem voltar para Gemini Flash. Próximo passo é testar Groq puro e confirmar logs `usando provedor externo puro groq`. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não corrigir visual dos exemplos antes da comparação. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
