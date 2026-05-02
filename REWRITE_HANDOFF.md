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

## ESTADO ATUAL — PRÓXIMO BLOCO VISUAL

### `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB` — PRÓXIMO BLOCO A IMPLEMENTAR

Objetivo:
- Melhorar a leitura da aula Grammar no iPhone sem mexer no motor pedagógico.
- Não alterar geração, prompts, modelo, chaves, fallback, revisor, `deepGrammarPipeline.js` ou backend.
- Não reduzir conteúdo.
- Apenas renderizar melhor o texto já gerado.

Problemas observados na aula Flash:
- Blocos `Exemplos do professor` aparecem como texto corrido.
- Pontuação grudada: `.Por exemplo`, `.Já`, `.Outro`, `).Veja`.
- Frase em inglês, tradução e explicação ficam grudadas no mesmo bloco.
- Aula fica muito pesada visualmente no celular.

Arquivos prováveis:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- arquivo CSS real onde ficam estilos do app, provavelmente `fluency-clean/src/App.css` ou equivalente. Conferir antes de editar.

Escopo permitido:
1. Criar limpeza visual local em `GrammarLesson.jsx`:
   - corrigir espaços depois de ponto/interrogação/exclamação quando vier grudado com letra maiúscula;
   - normalizar quebras antes de conectores como `Por exemplo`, `Já`, `Outro exemplo`, `Veja`, `Assim`, `Portanto`;
   - preservar todo o texto.
2. Melhorar `SectionContent`:
   - separar explicação principal em parágrafos limpos;
   - detectar exemplos com aspas/frases em inglês;
   - renderizar `Exemplos do professor` como cards/lista visual;
   - cada exemplo deve destacar: frase em inglês, tradução quando existir e explicação quando existir.
3. Adicionar classes CSS elegantes:
   - cards de exemplo com borda suave;
   - título pequeno `Exemplos do professor`;
   - frase em inglês destacada;
   - tradução menor;
   - explicação em texto normal;
   - bom espaçamento mobile.
4. Manter botões Salvar/Concluir e textarea funcionando.

Critérios de aceite no iPhone:
- Não aparecer mais `.Por exemplo` grudado.
- Os exemplos não podem ficar em um único parágrafo corrido.
- A aula deve continuar completa, sem cortar sections.
- Visual deve ficar mais fácil de ler sem parecer jogo.
- Não pode mexer em `bundle.js`.

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

## Próximo teste recomendado após o bloco visual

1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir a aula Flash já salva, se possível.
3. Verificar visual dos exemplos no iPhone.
4. Se necessário, gerar nova aula Flash para validar exemplos com texto novo.
5. Conferir que conteúdo não foi reduzido.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Decidimos manter `gemini-2.5-flash` como motor principal. Próximo bloco é `HOTFIX-GRAMMAR-EXEMPLOS-VISUAIS-LAB`: melhorar visual da aula Grammar, separar `Exemplos do professor` em cards/lista, corrigir pontuação grudada e melhorar leitura no iPhone sem mexer no motor de geração. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, `deepGrammarPipeline.js`, revisor ou política de chaves. Usar somente `fluency-clean/src/` ou CSS/config real."
