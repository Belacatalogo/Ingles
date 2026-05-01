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

## MODO DE COMMIT E DEPLOY — ATUALIZADO

O antigo PROTOCOLO ECONÔMICO DE DEPLOY está temporariamente suspenso por pedido do usuário.

Nova regra operacional enquanto a reconstrução da prática estiver em andamento:
1. Prioridade máxima: qualidade, limpeza arquitetural e ausência de gambiarra.
2. Pode fazer múltiplos commits por bloco quando for necessário para corrigir build, separar módulos ou facilitar validação.
3. Cada alteração ainda deve atualizar o handoff quando mudar o estado do projeto.
4. Continuar usando apenas a branch `rewrite-fluency-clean-lab`.
5. Não avançar para `rewrite-fluency-clean` ou `main` sem validação no iPhone.

## Decisão atual do usuário

O usuário pediu uma reformulação completa do sistema de exercícios/prática e, depois, estabilização do áudio natural para textos longos no Comet/iOS.

Diretriz pedagógica nova:
- instruções e enunciados principais em português;
- conteúdo treinado em inglês;
- feedback em português;
- áudio em inglês;
- perguntas não podem parecer aleatórias;
- prática deve seguir fases: aquecimento, reconhecimento, compreensão, produção guiada, escrita/fala e revisão final.

Diretriz visual nova:
- remover o verde claro agressivo;
- usar visual mais próximo do Fluency atual: fundo escuro elegante, azul/violeta, gradientes suaves, glass/painéis modernos;
- botões grandes, bonitos e confortáveis;
- sem rolagem estranha;
- sem opção cortada;
- feedback bonito e motivador;
- adicionar sistema de vidas para muitos erros.

## BLOCO ATUAL

### `BLOCO-12-LAB` — Rubricas por tipo de aula IMPLEMENTADO, aguardando deploy/teste

Objetivo:
- centralizar critérios pedagógicos por tipo de aula;
- reduzir perguntas vagas e respostas aleatórias;
- preparar base limpa para `BLOCO-14-LAB` contrato JSON rígido e para conectar rubricas diretamente ao prompt do Gemini depois.

Arquivos criados:
- `fluency-clean/src/services/lessonRubrics.js`

Arquivos alterados:
- `fluency-clean/src/services/lessonValidation.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- rubricas centralizadas para `reading`, `grammar`, `listening`, `writing`, `speaking` e `vocabulary`;
- cada rubrica define mínimos de seções, vocabulário, exercícios, prompts, texto principal e sinais obrigatórios;
- cada rubrica define critérios qualitativos específicos do tipo de aula;
- `lessonValidation.js` agora usa `getLessonTypeRequirements()` e `LESSON_RUBRIC_APPROVAL_SCORE` vindos de `lessonRubrics.js`;
- review pedagógico agora carrega `rubricCriteria` dentro de `pedagogicalReview` e `quality`;
- regras duplicadas em `lessonValidation.js` foram removidas.

Teste recomendado:
1. aguardar deploy da lab;
2. abrir o app e confirmar que não houve tela branca;
3. gerar ou abrir aula existente;
4. verificar se a aula ainda carrega;
5. conferir se diagnóstico/progresso não acusam erro de importação.

Próximo passo sugerido:
- `BLOCO-14-LAB` — Contrato JSON rígido, conectando as rubricas ao formato esperado da aula gerada.

### `BLOCO-AUDIO-CACHE-1B-LAB` — Player iOS/Comet com fila mais segura IMPLEMENTADO E VALIDADO PELO USUÁRIO

Contexto:
- usuário testou o bloco de áudio e a segmentação funcionou: apareceu `trecho 1/4`;
- ainda havia mensagem antiga citando Safari, vinda de `tts.js`;
- o fallback do navegador também podia ser bloqueado no Comet/iOS;
- a fila segmentada tentava seguir para próximos trechos sem aguardar corretamente o fim do áudio Gemini.

Arquivos alterados:
- `fluency-clean/src/services/tts.js`
- `fluency-clean/src/services/geminiTts.js`
- `fluency-clean/src/services/audioPlayback.js`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- removida a mensagem antiga `Safari pode ter bloqueado a voz` do `tts.js`;
- agora a mensagem usa `plataforma/navegador`;
- `geminiTts.js` ganhou opção `waitUntilEnded` para aguardar o fim real do áudio natural;
- `audioPlayback.js` agora usa `waitUntilEnded: true` na fila segmentada;
- a fila de trechos passa a esperar o trecho atual terminar antes de preparar/tocar o próximo;
- isso reduz falhas causadas por disparar vários áudios sequenciais fora do gesto original.

### `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado IMPLEMENTADO E VALIDADO PELO USUÁRIO

Arquivos criados:
- `fluency-clean/src/services/audioCache.js`

Arquivos alterados:
- `fluency-clean/src/services/geminiTts.js`
- `fluency-clean/src/services/audioPlayback.js`
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- cache local de áudio com índice `audio.cache.index`;
- itens de cache salvos como `audio.cache.item.<id>`;
- limite automático de 40 áudios;
- quando passa de 40, remove os mais antigos automaticamente;
- cache usa hash por texto + voz + estilo + modelo;
- textos longos em `audioPlayback.js` passam a ser divididos em trechos de até cerca de 260 caracteres;
- reprodução longa toca em fila: trecho 1, trecho 2, trecho 3 etc.;
- cada trecho pode usar cache, Gemini novo ou fallback do navegador;
- `stopLearningAudio()` interrompe também a fila segmentada;
- `ListeningLessonClean.jsx` mostra mensagens melhores: cache, áudio segmentado, fallback do dispositivo.

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO

Contexto:
- bloco 8 foi validado pelo usuário;
- o próximo passo era remover duplicidade e legado da prática.

Arquivos criados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`

Arquivos alterados:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `REWRITE_HANDOFF.md`

Arquivos removidos:
- `fluency-clean/src/practice/PracticeEngine.js`

Correção pós-erro de build:
- `PracticePlanAdapter.js` ainda importava `./PracticeEngine.js` como fallback;
- isso causou erro no Vercel após remover `PracticeEngine.js`;
- foi corrigido removendo o import/fallback legado e deixando o adapter 100% no core novo.

Pendente técnica:
- tentativa de remover/substituir `fluency-clean/src/lessons/ListeningLesson.jsx` antigo foi bloqueada por SHA inconsistente retornado pelo conector;
- a tela ativa já usa `ListeningLessonClean.jsx` via `LessonScreen.jsx`, então o app não depende do arquivo antigo;
- tentar limpar novamente depois ou via PR separado.

### `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas usando motor novo IMPLEMENTADO E VALIDADO

### `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency IMPLEMENTADO E VISUAL APROVADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões IMPLEMENTADO

### `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases IMPLEMENTADO COMO BASE

### `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática IMPLEMENTADO COMO FUNDAÇÃO

## NOVA ORDEM DE BLOCOS — REFORMULAÇÃO DA PRÁTICA

1. `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática. STATUS: fundação criada.
2. `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases. STATUS: base criada.
3. `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões. STATUS: implementado.
4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency. STATUS: implementado e visual aprovado.
5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico. STATUS: implementado.
6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício. STATUS: implementado.
7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas. STATUS: implementado e validado.
7B. `BLOCO-PRACTICE-REBUILD-7B-LAB` — Saneamento pedagógico e polimento mobile. STATUS: implementado e validado.
8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão. STATUS: implementado e validado.
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado. STATUS: parcialmente implementado; arquivo antigo travado por SHA, mas fora do fluxo ativo.
9A. `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado. STATUS: implementado e validado.
9B. `BLOCO-AUDIO-CACHE-1B-LAB` — Player iOS/Comet com fila mais segura. STATUS: implementado e validado.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- testar deploy do `BLOCO-12-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o core gera questões suficientes para aulas reais antigas e novas;
- seguir para `BLOCO-14-LAB` se o app iniciar normalmente.

## Próximos blocos depois da reformulação de prática

1. `BLOCO-14-LAB` — Contrato JSON rígido.
2. `BLOCO-11-LAB` — Plano primeiro, aula depois.
3. `BLOCO-13-LAB` — Professor Gerador/Revisor.
4. `BLOCO-17-LAB` — Qualidade visível da aula.
5. `BLOCO-16-LAB` — Histórico real de Speaking.
6. `BLOCO-15-LAB` — Banco de erros real.
7. `BLOCO-20-LAB` — Certificação por nível.
8. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `8` foram implementados e validados. O bloco 9 removeu `PracticeEngine.js`, criou `ListeningLessonClean.jsx` sem prática legada interna e trocou `LessonScreen.jsx` para usar o Listening limpo, mas `ListeningLesson.jsx` antigo ficou pendente por conflito de SHA no conector e está fora do fluxo ativo. Depois foram implementados e validados `BLOCO-AUDIO-CACHE-1-LAB` e `BLOCO-AUDIO-CACHE-1B-LAB`. O `BLOCO-12-LAB` criou `lessonRubrics.js` e conectou `lessonValidation.js` às rubricas por tipo de aula. Próximo passo: testar deploy do bloco 12; se ok, seguir para `BLOCO-14-LAB` contrato JSON rígido."
