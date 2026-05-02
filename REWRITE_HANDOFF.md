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

## ESTADO ATUAL — HOTFIX REGENERAR AULA ATUAL

### `HOTFIX-GERACAO-REGENERAR-AULA-ATUAL-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Após o hotfix de storage, o diagnóstico mostrou que `lesson.current` e `lastGenerationStatus` já apontavam para a aula nova `Present Simple: Verbs 'To Be' and 'To Have'`.
- Portanto, a aula passou a persistir.
- O problema restante era de UX/fluxo: como a aula atual é da mesma etapa do cronograma, o painel obrigava marcar `Substituir aula atual e gerar uma versão diferente` para gerar de novo.
- Para teste/lab, isso impedia regenerar a mesma aula com o mesmo objetivo sem variar contexto.

O que foi corrigido:
- Removido o bloqueio que interrompia a geração quando `pendingSameLesson && !forceNew`.
- O botão agora mostra `Regenerar aula atual` quando a aula atual pertence à mesma etapa.
- O checkbox mudou para `Gerar versão diferente com outro contexto`.
- Se o checkbox estiver desligado, o sistema regenera a mesma aula/mesmo objetivo sem variação obrigatória.
- A origem salva passa a registrar `generated-regeneration-same-lesson` quando for regeneração da aula atual.

Arquivo alterado:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

Commit:
- `0c247ed22af5b61f3a8745f0ac042c3a0981094a` — permite regenerar aula atual.

Teste obrigatório agora:
1. aguardar deploy da branch `rewrite-fluency-clean-lab` com commit `0c247ed` ou posterior;
2. abrir a aba Hoje/Aula;
3. confirmar que o botão aparece como `Regenerar aula atual` quando a aula atual já é a mesma etapa;
4. clicar sem marcar `Gerar versão diferente com outro contexto`;
5. confirmar que a geração roda novamente com a mesma aula `Present Simple: To Be e To Have`;
6. confirmar que salva e abre na aba Aula.

## ESTADO ANTERIOR — HOTFIX STORAGE GRAMMAR PROFUNDA

### `HOTFIX-STORAGE-GRAMMAR-PROFUNDA-LAB` — IMPLEMENTADO

Contexto do teste:
- A Cirurgia 2 iniciou corretamente.
- Diagnóstico mostrou `grammar bloco 1B por seção`.
- Sections foram geradas e aprovadas com contagem alta, por exemplo section 6 com 249 palavras.
- Houve falha parcial de JSON em uma tentativa do Flash, mas o fallback para `gemini-2.5-flash-lite` recuperou a section.
- Depois a aula passou até o ponto de abrir/salvar, mas o storage local recusou persistência.

O que foi corrigido:
- `lessonStore.js` usa camada `storage-safe` antes de persistir.
- Conteúdo visível é preservado; metadados internos pesados são compactados/removidos.
- Histórico limitado a 2 itens compactos.

Commit:
- `40f5839a5ece1a27983ba2a81a0c091da6d83e92` — salva aula grammar profunda em formato persistível.

## ESTADO ANTERIOR — CIRURGIA 2 GRAMMAR

### `CIRURGIA-2-GRAMMAR-BLOCO-1-SECTIONS-LAB` — IMPLEMENTADA

O que foi implementado:
- Criado `fluency-clean/src/prompts/grammar_section_example.json`.
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

Commits:
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

- Não implementar Cirurgia 3 antes do teste da regeneração + aula aberta.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não salvar aula fraca só para evitar bloqueio.
- Não portar Pro para keys free.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. A Cirurgia 2 foi implementada, o storage foi corrigido e a aula nova já apareceu como `lesson.current`. O último hotfix foi `0c247ed`, que permite `Regenerar aula atual` sem exigir versão diferente. Próximo passo é testar regeneração/abertura da aula `Present Simple: To Be e To Have` com Gemini normal, sem forçar fallback externo. Não mexer em Cirurgia 3/deepGrammarPipeline ainda. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado."
