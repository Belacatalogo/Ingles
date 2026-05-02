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

## ESTADO ATUAL — HOTFIX STORAGE GRAMMAR PROFUNDA

### `HOTFIX-STORAGE-GRAMMAR-PROFUNDA-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto do teste:
- A Cirurgia 2 iniciou corretamente.
- Diagnóstico mostrou `grammar bloco 1B por seção`.
- Sections foram geradas e aprovadas com contagem alta, por exemplo section 6 com 249 palavras.
- Houve falha parcial de JSON em uma tentativa do Flash, mas o fallback para `gemini-2.5-flash-lite` recuperou a section.
- Depois a aula passou até o ponto de abrir/salvar, mas o storage local recusou persistência:
  - `Storage recusou a aula completa...`
  - `Storage ainda recusou...`
  - `Falha crítica: a aula não foi persistida como lesson.current. Status saved não foi gravado.`

Diagnóstico aceito:
- A falha não foi do revisor nem da Cirurgia 2.
- A falha foi tamanho/peso do payload salvo em `lesson.current` + histórico.
- A aula Grammar profunda ficou maior, e o objeto ainda carregava metadados/revisões/planos duplicados.

O que foi corrigido:
- `lessonStore.js` agora usa uma camada `storage-safe` antes de persistir.
- O conteúdo visível da aula é preservado, mas campos internos pesados são compactados/removidos:
  - revisões longas;
  - readiness detalhado;
  - lessonPlan grande;
  - campos debug/raw/diagnostics;
  - listas excessivas de vocabulário/exercícios/prompts;
  - histórico antigo.
- `lesson.current` tenta salvar nesta ordem:
  1. versão storage-safe normal;
  2. versão storage-safe com histórico limpo;
  3. versão compacta;
  4. versão emergencial, limpando histórico/cache antigo.
- O histórico agora guarda no máximo 2 itens e em formato emergencial compacto.

Arquivo alterado:
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

Commit do hotfix:
- `40f5839a5ece1a27983ba2a81a0c091da6d83e92` — salva aula grammar profunda em formato persistível.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `40f5839` ou posterior;
2. gerar novamente a aula Grammar `Present Simple: To Be e To Have` com Gemini normal;
3. NÃO ativar `Forçar fallback externo`;
4. observar se aparece:
   - `Cirurgia 2 Grammar ativa...`;
   - `Grammar section X aprovada...`;
   - `Aula salva: ...`;
5. conferir se a aba Aula muda para a aula nova.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA

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

Commits da Cirurgia 2:
- `b7cd66dd37f6e7adfa291943e6634a43671a1389` — adiciona exemplo de section grammar.
- `e7f5ad2a4f0608e9b4f058a0b2d840b7da3cbfec` — gera sections grammar sequenciais.
- `5fee14d00f1366fa5cdb7871b6c007aa7d1a3525` — cabla sections sequenciais no planejador.
- `4c1b41edc9c329ab9ba5cdda6fc29a76363d4a8b` — atualiza handoff.

## ESTADO ANTERIOR — FALLBACK E DIAGNÓSTICO

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

- Não implementar Cirurgia 3 antes do teste da Cirurgia 2 + hotfix storage.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não salvar aula fraca só para evitar bloqueio.
- Não portar Pro para keys free.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. A Cirurgia 2 foi implementada e funcionou até gerar sections profundas, mas o storage recusou a aula grande. O último hotfix foi `40f5839`, que compacta campos internos antes de persistir `lesson.current`. Próximo passo é testar novamente a aula `Present Simple: To Be e To Have` com Gemini normal, sem forçar fallback externo, e confirmar se a aula salva/abre. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
