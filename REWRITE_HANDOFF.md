# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## PROTOCOLO ECONÔMICO DE DEPLOY — OBRIGATÓRIO

Contexto:
- a Vercel no plano free atingiu limite diário de deploys anteriormente;
- o usuário testa pelo iPhone;
- precisamos economizar commits/deploys.

Regra operacional:
1. Cada bloco deve virar **1 commit único**, sempre que possível.
2. Não fazer vários commits pequenos para o mesmo bloco.
3. Atualizar `REWRITE_HANDOFF.md` junto com o bloco, no mesmo commit.
4. Fluxo ideal: **1 bloco → 1 commit → 1 deploy → teste no iPhone**.
5. Se a Vercel bloquear novamente, parar commits e aguardar liberação.

## Estado Vercel atual

Status mais recente informado pelo usuário:
- o deploy voltou a funcionar após o commit `8281150592684874bc771c91a23a29ab0be75a9c`;
- continuar em modo econômico para não estourar limite novamente.

Produção/main:
- PR #21 foi mesclado no GitHub;
- produção/main ainda não foi validada em Vercel;
- não considerar `main` aprovada até deploy Production Ready e teste real no iPhone.

Link funcional enquanto produção não é validada:
- `https://ingles-git-rewrite-fluency-clean-belacatalogos-projects.vercel.app/`

Esse link é preview da branch `rewrite-fluency-clean`, já funcionou com login Google/Firebase, mas pode não conter correções mais recentes da lab.

## Observação importante sobre branches

Alterações recentes estão isoladas na `rewrite-fluency-clean-lab` e NÃO entram automaticamente na `main` nem na `rewrite-fluency-clean`.

Ordem correta:
1. validar primeiro a `rewrite-fluency-clean-lab`;
2. se estiver bom, sincronizar para `rewrite-fluency-clean`;
3. testar novamente o link estável da `rewrite-fluency-clean`;
4. só depois decidir se entra em `main`;
5. validar produção/main separadamente.

Rollback se main quebrar:
- voltar `main` para `5047bae031f20ddd9604953dcd3fd821655e56fa`.

## Estado atual implementado

### AJUSTE BLOCO-10C-LAB — Múltipla escolha em aulas renderizadas IMPLEMENTADO, aguardando teste no iPhone

Contexto:
- usuário pediu para corrigir o erro em que questões de múltipla escolha não exibiam alternativas;
- usuário pediu para verificar se, após a correção, respostas corretas seriam marcadas corretamente.

Arquivos alterados:
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/src/styles/choice-polish.css`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

Correção aplicada:
- normalização dos exercícios agora aceita alternativas vindas de `options`, `choices`, `alternatives`, `answers`, `multipleChoiceOptions` e `possibleAnswers`;
- alternativas podem vir como texto simples ou objetos com `text`, `label`, `option`, `value`, `answer`, `content` ou `title`;
- resposta correta agora pode vir de `answer`, `expectedAnswer`, `correctAnswer`, `correct`, `solution`, `rightAnswer`, `answerText` ou `answerKey`;
- respostas em formato de letra/número como `A`, `B`, `1` ou `2` são mapeadas para a alternativa correspondente;
- opções marcadas com `correct: true`, `isCorrect: true`, `correctAnswer: true`, `is_answer: true` ou `isAnswer: true` também são reconhecidas;
- CSS de feedback foi isolado em `choice-polish.css`, importado no `main.jsx`;
- o app deve manter a marcação visual de correta/incorreta nas aulas de Reading e Grammar porque elas já usam `option-button correct/incorrect`.

Teste recomendado:
1. aguardar deploy Ready da `rewrite-fluency-clean-lab`;
2. abrir no iPhone;
3. gerar ou abrir aula com múltipla escolha;
4. confirmar que alternativas aparecem;
5. tocar numa opção errada e confirmar feedback de incorreta + resposta correta;
6. tocar numa opção correta e confirmar feedback de correta;
7. testar uma aula cuja resposta venha como letra (`A`, `B`) ou `answerKey`, se possível;
8. confirmar que não houve regressão no Listening: resposta esperada só aparece ao tocar em “Ver resposta” e Shadowing continua funcionando.

### AJUSTE BLOCO-10C-LAB — Respostas e botão “Ver resposta” IMPLEMENTADO, aguardando teste no iPhone

Correção aplicada anteriormente:
- resposta esperada agora só aparece quando o aluno toca em “Ver resposta”;
- digitar no campo não revela mais a resposta automaticamente;
- botão “Ver resposta” ficou compacto em pílula;
- rascunho e Shadowing real foram preservados.

### BLOCO-10C-LAB — Corrigir aula renderizada IMPLEMENTADO, aguardando teste final no iPhone

Principais correções:
- respostas esperadas não aparecem automaticamente antes da tentativa;
- perguntas de compreensão têm estado próprio de resposta;
- respostas de compreensão são salvas como rascunho junto com a resposta escrita principal;
- botão “Salvar rascunho” mostra confirmação perceptível com horário;
- botão “Concluir Listening” salva rascunho, chama `completeLesson()` e mostra confirmação;
- Shadowing usa frases reais extraídas da transcrição/listeningText;
- botão redundante “Concluir” dentro do Shadowing foi removido.

### BLOCO-10A-LAB — Quality Gate Pedagógico Local IMPLEMENTADO, aguardando teste completo

Arquivos alterados:
- `fluency-clean/src/services/lessonValidation.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/lessonTypes.js`
- `REWRITE_HANDOFF.md`

Comportamento:
- aula gerada passa por avaliação pedagógica local antes de salvar;
- nota mínima: 85/100;
- se reprovar, não salva;
- Diagnóstico mostra problemas;
- se aprovar, salva com `pedagogicalReview` e `quality.pedagogicalScore`.

### Bloco 8-LAB-12C — Correção da próxima frase em Pronúncia IMPLEMENTADA, aguardando teste completo

Correção:
- botão “Próxima” troca frase, IPA, palavras, foco, áudio e limpa análise anterior.

### Bloco 8-LAB-12 — Remoção de conteúdos fictícios IMPLEMENTADO, aguardando validação completa

Telas afetadas:
- Hoje, Progresso, Cartas e Ajustes.

Resultado:
- onde não houver dado real, mostrar estado vazio claro;
- Speaking deve usar dados reais do Azure.

### Bloco Speaking/Azure — SDK empacotado e dados reais IMPLEMENTADO

Resultado:
- Azure Speech SDK empacotado;
- análise Azure funcionando;
- palavras, score e texto reconhecido integrados;
- falta Speaking adaptado ao nível e registro real de sessão, previsto em `BLOCO-SPEAKING-2-LAB`.

## Próximos blocos, após validar a lab no iPhone

1. `BLOCO-CARTAS-2-LAB` — Finalização real dos flashcards.
2. `BLOCO-SPEAKING-2-LAB` — Speaking por nível e registro real.
3. `BLOCO-CARTAS-3-LAB` — 2.000 palavras por tópicos.
4. `BLOCO-10B-LAB` — Correção automática do quality gate.
5. `BLOCO-12-LAB` — Rubricas por tipo de aula.
6. `BLOCO-14-LAB` — Contrato JSON rígido.
7. `BLOCO-11-LAB` — Plano primeiro, aula depois.
8. `BLOCO-13-LAB` — Professor gerador/revisor.
9. `BLOCO-17-LAB` — Qualidade visível da aula.
10. `BLOCO-16-LAB` — Histórico real de Speaking.
11. `BLOCO-15-LAB` — Banco de erros real.
12. `BLOCO-20-LAB` — Certificação por nível.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Use o PROTOCOLO ECONÔMICO DE DEPLOY: cada bloco deve virar 1 commit único, com handoff atualizado no mesmo commit; fluxo ideal 1 bloco → 1 commit → 1 deploy → teste no iPhone. Não faça vários commits pequenos. Não insista se a Vercel bloquear por limite. Já foram implementados o BLOCO-10A-LAB e os ajustes do BLOCO-10C-LAB. Último ajuste: múltipla escolha agora normaliza `options`, `choices`, `alternatives`, `answerKey`, respostas por letra/número e marca correta/incorreta. Validar isso primeiro no iPhone. Próximo bloco depois da validação: BLOCO-CARTAS-2-LAB, finalização real da sessão de flashcards. Depois seguir a ordem: SPEAKING-2, CARTAS-3, 10B, 12, 14, 11, 13, 17, 16, 15, 20. Não delete `rewrite-fluency-clean-lab` nem `rewrite-fluency-clean`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. A produção/main ainda NÃO foi validada no Vercel. Validar primeiro a lab no iPhone, depois sincronizar para `rewrite-fluency-clean`, testar o link estável e só depois decidir nova ida para `main`. Rollback da main: `5047bae031f20ddd9604953dcd3fd821655e56fa`."
