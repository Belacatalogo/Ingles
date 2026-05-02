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

## ESTADO ATUAL — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA, aguardando deploy/teste

Contexto:
- Teste forçado com Groq provou que trocar o motor não resolveu a profundidade.
- O professor revisor marcou corretamente a aula com 87/88 por falta de exemplos inéditos, contextualizados e explicados.
- A hipótese aceita é que o problema está no Bloco 1 do blueprint Grammar: 7 sections em uma única chamada curta.
- O critério do professor revisor NÃO foi relaxado.

O que foi implementado:
- Criado `fluency-clean/src/prompts/grammar_section_example.json` com 1-shot example de section profunda.
- Criado `fluency-clean/src/services/grammarSectionGenerator.js`.
- `plannedGeminiLessons.js` agora, somente para Grammar:
  1. deixa o fluxo gerar o esqueleto/aula normalmente;
  2. antes da validação/revisor final, roda `enrichGrammarSectionsSequentially()`;
  3. reescreve cada section separadamente, em sequência, com contexto das sections anteriores;
  4. exige content com no mínimo 180 palavras;
  5. exige contraste com português brasileiro em cada section;
  6. exige erro típico A1 brasileiro em cada section;
  7. exige exemplos contextualizados e explicação de por que estão corretos;
  8. anexa contrato `grammar-section-sequential-v1`.

Arquivos alterados:
- `fluency-clean/src/prompts/grammar_section_example.json`
- `fluency-clean/src/services/grammarSectionGenerator.js`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `fluency-clean/src/services/externalLessonProviders.js`
- `fluency-clean/src/components/settings/LessonKeysPanel.jsx`
- `REWRITE_HANDOFF.md`

Commits da Cirurgia 2:
- `b7cd66dd37f6e7adfa291943e6634a43671a1389` — adiciona exemplo de section grammar.
- `e7f5ad2a4f0608e9b4f058a0b2d840b7da3cbfec` — gera sections grammar sequenciais.
- `5fee14d00f1366fa5cdb7871b6c007aa7d1a3525` — cabla sections sequenciais no planejador.

Hotfixes relacionados a fallback externo/Cerebras:
- `ac9de2f241400a24450aef87915496ae924e39eb` — reforça storage e modo forçar fallback.
- `7c05cda72f07b4c79802edf163dbadb1da7e378b` — usa fetcher correto.
- `ecbc9480f800efdda68aa04475b1c4fe46bfdd15` — permite forçar fallback externo.
- `8815f5a79ef93668ef819b4902d4cdaf63930915` — adiciona botão forçar fallback.

O que NÃO foi mexido:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu no `deepGrammarPipeline.js` / Cirurgia 3.
- Não relaxou professor revisor.
- Não colocou Pro nas keys free.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `5fee14d` ou posterior;
2. NÃO ativar `Forçar fallback externo`;
3. gerar a mesma aula Grammar: `Present Simple: To Be e To Have`;
4. verificar no diagnóstico:
   - `Cirurgia 2 Grammar ativa: reescrevendo ... section(s) uma por uma...`;
   - `Grammar section 1 aprovada: ... palavras`;
   - repetir para todas as sections;
   - `Cirurgia 2 Grammar concluída...`;
5. verificar resultado esperado:
   - cada section com content >= 180 palavras;
   - pelo menos 1 contraste com português em cada section;
   - pelo menos 1 erro típico A1 brasileiro em cada section;
   - nota do professor revisor >= 90;
   - idealmente sem reparo anti falso domínio.

Observação importante:
- Eu não consigo clicar no preview/iPhone daqui, então o teste real ainda precisa ser feito no app.
- Se alguma section falhar por quota ou JSON, o diagnóstico agora deve mostrar exatamente qual section e qual modelo falhou.

## ESTADO ANTERIOR — DIAGNÓSTICO E FALLBACK

### `HOTFIX-DIAGNOSTICO-LOGS-TOPO-LAB` — IMPLEMENTADO
- Logs recentes aparecem no topo.
- Mostra 14 logs.
- Painel fica fixo e rolável no mobile.

### `CIRURGIA-1-FALLBACK-EXTERNO-LAB` — IMPLEMENTADA
- Gemini continua primeiro.
- Se Gemini falhar como geração/API, tenta Groq/Cerebras.
- UI em Ajustes > Chaves de aulas para Groq/Cerebras.
- Botão de teste: `Forçar fallback externo na próxima geração`.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 antes do teste da Cirurgia 2.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não salvar aula fraca só para evitar bloqueio.
- Não portar Pro para keys free.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. A Cirurgia 2 foi implementada: Grammar agora reescreve cada section sequencialmente com mínimo de 180 palavras, contraste com português, erro típico A1 brasileiro e exemplos contextualizados. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Próximo passo é testar a aula `Present Simple: To Be e To Have` com Gemini normal, sem forçar fallback externo. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
