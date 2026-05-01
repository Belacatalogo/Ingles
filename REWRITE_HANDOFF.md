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

### `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário informou que não está usando Safari, está usando Comet;
- ainda assim, no iOS/Comet o áudio natural Gemini pode falhar por restrição da plataforma/navegador;
- textos longos de Listening estavam falhando como áudio único;
- usuário pediu cache com limite de 40 áudios para evitar gerar de novo.

Análise antes da alteração:
- `geminiTts.js` já tinha cache simples por texto, mas sem índice, sem limite e sem limpeza automática;
- `audioPlayback.js` tentava tocar textos longos como um áudio único;
- mensagens técnicas ainda citavam Safari, mesmo quando o usuário usa Comet;
- o melhor caminho era segmentar textos longos e cachear cada trecho.

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
- `geminiTts.js` agora usa `audioCache.js` em vez de cache solto antigo;
- textos longos em `audioPlayback.js` passam a ser divididos em trechos de até cerca de 260 caracteres;
- reprodução longa toca em fila: trecho 1, trecho 2, trecho 3 etc.;
- cada trecho pode usar cache, Gemini novo ou fallback do navegador;
- `stopLearningAudio()` agora interrompe também a fila segmentada;
- mensagens técnicas foram alteradas para `plataforma/navegador`, sem falar Safari;
- `ListeningLessonClean.jsx` mostra mensagens melhores: cache, áudio segmentado, fallback do dispositivo.

Teste recomendado no iPhone/Comet:
1. abrir aula de Listening;
2. tocar no áudio principal da escuta guiada;
3. confirmar se aparece `Preparando áudio natural em trechos...` quando o texto for longo;
4. confirmar se o áudio toca em trechos ou usa fallback sem travar;
5. tocar novamente no mesmo áudio para ver se carrega do cache;
6. testar botão de pausar/parar durante a fila;
7. testar uma frase curta de shadowing;
8. verificar se o diagnóstico não fica repetindo `Safari`.

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO, aguardando validação final

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

Pendente no bloco 9:
- depois de validar no iPhone, remover definitivamente `fluency-clean/src/lessons/ListeningLesson.jsx`;
- procurar CSS legado de `.fluency-quiz-*` e remover se não houver uso ativo;
- confirmar se nenhum import ativo referencia `PracticeEngine.js` ou `ListeningLesson.jsx`.

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
9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado. STATUS: parcialmente implementado, aguardando teste.
9A. `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado. STATUS: implementado, aguardando teste.
10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone.

## Pendência técnica importante

- validar bloco de áudio no iPhone/Comet;
- validar bloco 9 no iPhone;
- remover definitivamente `ListeningLesson.jsx` após validação;
- remover CSS legado `.fluency-quiz-*` após confirmar que não há uso ativo;
- confirmar se o core gera questões suficientes para aulas reais antigas e novas;
- seguir para teste completo no iPhone.

## Próximos blocos depois da reformulação de prática

1. `BLOCO-12-LAB` — Rubricas por tipo de aula.
2. `BLOCO-14-LAB` — Contrato JSON rígido.
3. `BLOCO-11-LAB` — Plano primeiro, aula depois.
4. `BLOCO-13-LAB` — Professor Gerador/Revisor.
5. `BLOCO-17-LAB` — Qualidade visível da aula.
6. `BLOCO-16-LAB` — Histórico real de Speaking.
7. `BLOCO-15-LAB` — Banco de erros real.
8. `BLOCO-20-LAB` — Certificação por nível.
9. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
10. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos `BLOCO-PRACTICE-REBUILD-1-LAB` a `8` foram implementados e validados. O bloco 9 removeu `PracticeEngine.js`, criou `ListeningLessonClean.jsx` sem prática legada interna e trocou `LessonScreen.jsx` para usar o Listening limpo. Depois foi implementado `BLOCO-AUDIO-CACHE-1-LAB`: cache local limitado a 40 áudios, áudio longo segmentado, fila de reprodução e mensagens sem citar Safari. Próximo passo: verificar deploy, testar áudio no Comet/iPhone e, se aprovado, concluir limpeza final do bloco 9 removendo `ListeningLesson.jsx` antigo e CSS legado `.fluency-quiz-*`."
