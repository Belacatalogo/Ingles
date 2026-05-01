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

## BLOCO ATUAL

### `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB` — AutoFill adaptativo por progresso IMPLEMENTADO, aguardando deploy/teste

Contexto:
- usuário reportou que as gerações estavam travando por `Exercícios insuficientes`;
- também apareceu `gerando estrutura compacta da aula Grammar` quando a próxima aula visualmente era Listening;
- usuário questionou com razão que questões de soletrar em múltipla escolha são fracas quando o objetivo real é produzir spelling.

Arquivos criados:
- `fluency-clean/src/services/exerciseAutoFill.js`

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `exerciseAutoFill.js` como módulo separado, limpo e adaptativo;
- AutoFill completa exercícios faltantes quando o Gemini entrega pouco;
- AutoFill usa tipo da aula, nível, transcrição/texto, vocabulário e modo de entrada;
- para Listening A1, spelling agora prioriza:
  - escrever spelling;
  - ditado curto de palavra;
  - ditado de frase muito curta;
  - corrigir spelling;
  - falar nome e soletrar;
- múltipla escolha ficou reservada para reconhecimento, som inicial, vocabulário e verdadeiro/falso simples;
- `geminiLessons.js` passou a aceitar `forcedType`;
- `LessonGeneratorPanel.jsx` envia `forcedType = nextLesson.type`, exceto revisão adaptativa;
- o tipo da aula agora fica travado pelo cronograma/app, reduzindo risco de Listening virar Grammar;
- `BLOCK_RETRY_LIMIT` caiu para 1 porque agora AutoFill resolve ausência de exercícios antes de gastar novas tentativas;
- `assertLessonBlock()` agora sanitiza exercícios, corrige alternativas onde possível e completa faltantes;
- `validateGeneratedLesson()` também tem fallback final de AutoFill se ainda faltar exercício;
- diagnóstico agora pode mostrar mensagens como:
  - `Tipo de aula travado: Listening.`
  - `Gemini entregou 8/12 exercícios. AutoFill adaptativo completou +4.`
  - `Validação final: AutoFill completou +X exercícios.`

Teste recomendado:
1. aguardar deploy;
2. gerar aula marcada como Listening;
3. confirmar no diagnóstico: `Tipo de aula travado: Listening`;
4. se Gemini entregar poucos exercícios, confirmar diagnóstico de AutoFill;
5. verificar se a geração não fica presa em loops de `Exercícios insuficientes`;
6. abrir prática e verificar se spelling não fica só como múltipla escolha com resposta pronta;
7. conferir se existem exercícios de escrever, ouvir/escrever, corrigir spelling e speaking.

### `BLOCO-GERAÇÃO-VARIAÇÃO-2-LAB` — Bloqueio de repetição e reparo sem fallback antigo IMPLEMENTADO

Contexto:
- usuário mandou print da transcrição e comprovou que a aula continuava com o mesmo roteiro: Ana, Maria, apple, book, cat;
- investigação encontrou a causa exata em `fluency-clean/src/services/lessonRepair.js`;
- o reparador local tinha `LISTENING_PROFILES.alphabet` hardcoded com a transcrição antiga completa;
- quando a aula era reprovada, o reparador sobrescrevia a geração do Gemini com esse fallback fixo, destruindo qualquer variação.

Arquivo alterado:
- `fluency-clean/src/services/lessonRepair.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- perfil antigo foi renomeado para `alphabetClassroom` e marcado como `bannedWhenVariation`;
- foram adicionados perfis alternativos reais para a mesma aula:
  - `alphabetReception`: escola/recepção, Leo, Tom, map, pen, sun;
  - `alphabetCafe`: cafeteria, Nina, Ben, tea, milk, cake;
  - `alphabetVideoCall`: videochamada, Rita, Sam, red, bag, desk;
- `getListeningProfile()` agora recebe `rawLesson` e detecta `variationMode`/`generationSeed`;
- quando há variação ativa, o reparador escolhe somente perfis alternativos e não usa mais Ana/Maria/apple/book/cat;
- a seleção usa seed para variar o perfil;
- `repairLessonForQuality()` agora passa `rawLesson` para `getListeningProfile()`;
- `quality` passa a registrar `repairedWithVariation` e `repairProfileTitle`.

### `BLOCO-GERAÇÃO-VARIAÇÃO-1-LAB` — Aula nova precisa variar de verdade IMPLEMENTADO

### `BLOCO-GERAÇÃO-STATUS-1-LAB` — Prova visual de aula nova IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-14-LAB` — Contrato JSON rígido IMPLEMENTADO

### `BLOCO-12-LAB` — Rubricas por tipo de aula IMPLEMENTADO

### `BLOCO-AUDIO-CACHE-1B-LAB` — Player iOS/Comet com fila mais segura IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-AUDIO-CACHE-1-LAB` — Áudio segmentado + cache local limitado IMPLEMENTADO E VALIDADO PELO USUÁRIO

### `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado PARCIALMENTE IMPLEMENTADO

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

## NOVA ORDEM DE BLOCOS — QUALIDADE REAL DAS AULAS

1. `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB` — AutoFill adaptativo por progresso. STATUS: implementado, aguardando teste.
2. `BLOCO-11-LAB` — Plano primeiro, aula depois. STATUS: próximo após validação.
3. `BLOCO-13-LAB` — Professor Gerador/Revisor.
4. `BLOCO-17-LAB` — Qualidade visível da aula.
5. `BLOCO-16-LAB` — Histórico real de Speaking.
6. `BLOCO-15-LAB` — Banco de erros real.
7. `BLOCO-20-LAB` — Certificação por nível.
8. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
9. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Pendência técnica importante

- testar deploy do `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB`;
- remover definitivamente `ListeningLesson.jsx` antigo quando o conector permitir SHA correto;
- confirmar se o contrato não ficou restritivo demais para Flash/free;
- se o contrato reprovar muitas gerações, ajustar no bloco de plano/reparo sem afrouxar qualidade.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. Os blocos de prática e áudio foram implementados e validados. O `BLOCO-12-LAB` criou rubricas por tipo de aula. O `BLOCO-14-LAB` criou `lessonJsonContract.js` e conectou o contrato JSON rígido ao `geminiLessons.js`. O `BLOCO-GERAÇÃO-STATUS-1-LAB` foi validado. O `BLOCO-GERAÇÃO-VARIAÇÃO-2-LAB` removeu o fallback fixo de Ana/Maria/apple/book/cat do reparador. O `BLOCO-GERAÇÃO-ESTABILIDADE-1-LAB` criou AutoFill adaptativo para completar exercícios faltantes e travou o tipo da aula pelo cronograma. Próximo passo: testar deploy; se ok, seguir para `BLOCO-11-LAB` plano primeiro, aula depois."
