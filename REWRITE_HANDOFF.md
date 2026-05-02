# Fluency Clean Rewrite — Handoff LAB

Branch principal de trabalho: `rewrite-fluency-clean-lab`

Branch de teste atual: `rewrite-fluency-clean-lab-model-test`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `rewrite-fluency-clean-lab` enquanto o teste estiver isolado na branch `rewrite-fluency-clean-lab-model-test`.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## OBJETIVO PEDAGÓGICO FINAL

`diagnosticar → ensinar → praticar → corrigir → revisar → testar → só então avançar`

Princípio máximo:

`o aluno só avança quando prova domínio, não apenas quando conclui uma aula.`

## BLOCO ATUAL IMPLEMENTADO EM BRANCH DE TESTE

### `BLOCO-MODEL-TEST-GRAMMAR-PRO-LAB` — CORRIGIDO para testar `gemini-2.5-pro` nas keys free/de aula

Branch usada:
- `rewrite-fluency-clean-lab-model-test`, criada a partir de `rewrite-fluency-clean-lab` no commit `c1b23e21b74303043d0372a61adc8a7b52ddec33`.

Arquivos alterados nesta branch de teste:
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/plannedGeminiLessons.js`
- `fluency-clean/src/services/lessonKeys.js`
- `REWRITE_HANDOFF.md`

Correção importante após feedback do iPhone:
- Interpretação anterior estava errada: o objetivo não era usar a key paga/Pro primeiro.
- O objetivo correto é testar o **modelo** `gemini-2.5-pro` usando as **keys free/de aula**.
- `plannedGeminiLessons.js` agora tenta `gemini-2.5-pro` em cada key free/de aula antes de cair para Flash.
- `lessonKeys.js` ignora a key Pro paga nesta branch de teste para impedir que o painel puxe a key paga primeiro.

Fluxo correto agora:
1. Se a aula for Grammar, pegar as keys free/de aula.
2. Tentar `gemini-2.5-pro` com a primeira key free/de aula.
3. Se falhar, tentar `gemini-2.5-pro` com a próxima key free/de aula.
4. Se nenhuma key free conseguir gerar com `gemini-2.5-pro`, cair para o modelo atual Flash/free.
5. Salvar contrato:
   - `grammar-model-test-gemini-2.5-pro-free-key` se funcionar com Pro em key free;
   - `grammar-model-test-fallback-current` se cair para Flash/free.

Mensagens esperadas no diagnóstico:
- `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO: Grammar vai tentar gemini-2.5-pro nas keys free/de aula antes do Flash.`
- `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO: tentativa 1/3 usando gemini-2.5-pro com key free/de aula ...`
- se funcionar:
  - `MODEL-TEST-GRAMMAR-PRO-FREE: Grammar gerada com gemini-2.5-pro usando key free/de aula ...`
- se falhar em uma key:
  - `MODEL-TEST-GRAMMAR-PRO-FREE: gemini-2.5-pro falhou nesta key free/de aula ...`
- se todas falharem:
  - `MODEL-TEST-GRAMMAR-PRO-FREE: nenhuma key free/de aula conseguiu gerar com gemini-2.5-pro. Voltando ao modelo atual Flash/free.`

Commits relevantes desta branch de teste:
- `4a139e4e025e4bb8918a7309db3d3f338b7463c2` — tentativa inicial no painel.
- `6423068052ec16412507680b89a5661f279193e6` — handoff inicial.
- `a7dcb886c5ca9af0e3eb7023529a50514c369a49` — tentativa Pro no planejador, ainda usando key paga.
- `81f0241761bc708778e635e385300a9a3c9c0561` — corrige planejador para usar `gemini-2.5-pro` nas keys free/de aula.
- `024353f153810cc024dbc5378986711a6d18f54f` — ignora key Pro paga nesta branch de teste.

Teste recomendado no iPhone:
1. aguardar o preview/deploy do commit `024353f` ou posterior;
2. abrir exatamente o preview da branch `rewrite-fluency-clean-lab-model-test`;
3. se estiver em PWA instalado, fechar e reabrir; se continuar estranho, abrir no Safari em aba nova para evitar cache;
4. garantir que existem keys free/de aula em Ajustes > Chaves de aulas;
5. gerar/substituir uma aula Grammar;
6. no Diagnóstico, procurar obrigatoriamente `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO`;
7. conferir se a tentativa mostra `gemini-2.5-pro` com `(Pro fallback)` mas usando uma key free/de aula mascarada;
8. se depois aparecer Flash, isso significa que o Pro falhou nas keys free e o fallback funcionou;
9. se salvar, conferir em “Último status” se o contrato inclui `grammar-model-test-gemini-2.5-pro-free-key` ou `grammar-model-test-fallback-current`.

Problema ainda observado:
- A aula pode reprovar pelo professor revisor com nota alta, como 95/100 ou 96/100, por ressalvas de Grammar profunda.
- Isso ainda não foi corrigido neste hotfix porque a edição direta do `teacherReviewer.js` inteiro foi bloqueada pela ferramenta.
- Próximo bloco, se o teste de modelo funcionar mas continuar bloqueando com nota alta: criar um bloco pequeno e cirúrgico para relaxar bloqueio de Grammar com nota alta quando os únicos problemas forem reparáveis por pipeline local.

Critério de sucesso deste teste:
- diagnóstico mostrar `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO`;
- tentar `gemini-2.5-pro` nas keys free/de aula antes do Flash;
- não usar a key Pro paga primeiro;
- registrar contrato correto;
- não afetar Reading, Listening, Writing, Cartas nem backend Azure.

## BLOCO ANTERIOR IMPLEMENTADO

### `BLOCO-HOTFIX-GRAMMAR-REPARO-FINAL-LAB` — IMPLEMENTADO

Contexto:
- O teste no iPhone mostrou que a trava nova funcionou: uma Grammar com 93/100 foi bloqueada por problemas reais.
- Mensagem exibida:
  - risco de falso domínio por excesso de reconhecimento e pouca produção;
  - falta de progressão didática real com abertura, analogia, camadas, uso real e resumo;
  - exemplos precisam ser inéditos, contextualizados e explicar por que estão corretos.
- Isso confirmou que o professor revisor ficou mais rigoroso.
- Porém revelou falha de fluxo: depois do reparo anti falso domínio, se ainda restassem problemas específicos de Grammar profunda, o sistema tentava um reparo genérico e bloqueava, sem reaplicar o pipeline Grammar específico.

Commits anteriores na lab:
- `df3bb1152893050e76df9e981927296c5c70d88b` — reaplica reparo profundo quando professor reprova grammar.
- `afa50c86e5cf051b231351ff4cf585f014ccd647` — atualiza handoff do hotfix de reparo grammar final.

## NOVA ORDEM DE BLOCOS

1. Testar novamente no preview da branch `rewrite-fluency-clean-lab-model-test`, commit `024353f` ou posterior.
2. Se aparecer `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO`, validar se o Pro em key free gera Grammar melhor.
3. Se continuar bloqueando com nota alta por ressalvas reparáveis, criar hotfix cirúrgico em `teacherReviewer.js`/`LessonGeneratorPanel.jsx` para não bloquear Grammar 95+/100 só por itens que o pipeline local corrige.
4. Se o teste de modelo for aprovado, portar cuidadosamente para `rewrite-fluency-clean-lab` em bloco único.
5. Se o teste de modelo falhar grave, abandonar `rewrite-fluency-clean-lab-model-test` e voltar para `rewrite-fluency-clean-lab`.
6. Se ok, voltar para `BLOCO-CARTAS-PAREAMENTO-10-LAB`.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal continua sendo `rewrite-fluency-clean-lab`, mas o teste atual está isolado na branch `rewrite-fluency-clean-lab-model-test`. Não mexa em `main`, não mexa em `rewrite-fluency-clean`, não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O teste correto agora é `gemini-2.5-pro` nas keys free/de aula, não na key Pro paga. O commit `81f0241` fez o planejador tentar `gemini-2.5-pro` nas keys free; o commit `024353f` ignorou a key Pro paga nesta branch de teste. Testar no iPhone e procurar `MODEL-TEST-GRAMMAR-PRO-FREE ATIVO`. Se continuar bloqueando com nota alta, próximo bloco deve relaxar bloqueio de Grammar 95+/100 por ressalvas reparáveis."
