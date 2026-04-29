# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

## REGRA DE TESTE — VERCEL PREVIEW
O usuário testa as mudanças no **Vercel**, sempre no deploy/preview mais recente da branch:

`rewrite-fluency-clean-lab`

Fluxo correto:
1. fazer alterações somente na branch lab;
2. usuário dispara/aguarda o deploy da Vercel da branch lab;
3. usuário testa no iPhone pelo preview da Vercel;
4. só avançar depois da confirmação do usuário.

## REGRA DE ORGANIZAÇÃO — SEM GAMBIARRAS, SEM BUNDLE DE PATCHES
Continuar montando o sistema como React modular em `fluency-clean/src/`:
- telas em `fluency-clean/src/screens/`;
- componentes em `fluency-clean/src/components/`;
- serviços em `fluency-clean/src/services/`;
- estilos reais em `fluency-clean/src/styles/`;
- não usar DOM injection;
- não mexer em `bundle.js`;
- não criar bundle patch;
- não editar HTML para simular UI;
- não usar `preview-clean` como produto final;
- não mexer no backend Azure privado.

## Estado aprovado pelo usuário

### Speaking — APROVADO
Blocos concluídos:
- `LAB-7D` — Speaking igual à referência do ZIP;
- `LAB-7E` — ajuste fino de tamanho;
- `LAB-7F` — fidelidade visual;
- `LAB-7G` — limpeza da parte inferior, diagnóstico fora do fluxo e microfone maior.

Arquivos principais:
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/styles/lab-polish.css`
- `fluency-clean/src/App.jsx`

Resultado: alternância Conversa/Pronúncia funcionando, bolhas de chat, feedback visual, modo Pronúncia com frase/fonética/score por palavra/dica, microfone circular grande e diagnóstico em modal pequeno. Usuário disse que ficou perfeito.

### Hoje/Home — APROVADO
Blocos concluídos:
- `LAB-HOJE-1` — Home/Hoje igual à referência;
- `LAB-HOJE-1B` — ajuste de largura para remover margens laterais duplicadas.

Arquivos principais:
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/styles/today-polish.css`
- `fluency-clean/src/main.jsx`

Resultado: hero de tarefas, progresso circular, cards de ofensiva e nível, tarefas do dia, semana, frase do dia e gerador de aula recolhido. Usuário disse que ficou perfeito.

### Navbar — APROVADA
Bloco concluído:
- `LAB-NAV-1` — navbar flutuante igual à referência.

Arquivos principais:
- `fluency-clean/src/components/layout/BottomNav.jsx`
- `fluency-clean/src/styles/nav-polish.css`
- `fluency-clean/src/main.jsx`

Resultado: navbar mais próxima da referência, item ativo expandido com texto, itens inativos compactos e menor cobertura de conteúdo. Usuário disse que ficou lindo.

### Aula — APROVADA
Blocos concluídos:
- `LAB-AULA-1` — topo/casca da aula igual à referência;
- `LAB-AULA-1B` — correção de overflow/corte horizontal;
- `LAB-AULA-2` — preview seguro por pilar de aula.

Arquivos principais:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/lessons/WritingLesson.jsx`

Resultado: topo premium aprovado, conteúdo sem corte, seletor temporário de pilares funcionando, previews de Leitura/Gramática/Escuta/Escrita funcionando. Usuário confirmou: “funcionou 100%”.

Observação: o seletor temporário `Lab preview — Ver UI por pilar` deve ficar por enquanto e ser removido apenas no `LAB-9`.

### Cartas/Flashcards — APROVADO
Bloco concluído:
- `LAB-CARTAS-1` — Flashcards/Cartas igual à referência.

Arquivos principais:
- `fluency-clean/src/screens/FlashcardsScreen.jsx`
- `fluency-clean/src/styles/flashcards-polish.css`
- `fluency-clean/src/main.jsx`

Resultado: visual premium seguindo o ZIP de referência, chips horizontais de decks, sessão com barra de progresso, carta com efeito flip frente/verso, botão “Mostrar resposta”, botões SRS, estatísticas da sessão e card de próximo foco. Usuário confirmou: “ficou perfeito”.

### Progresso — APROVADO
Bloco concluído:
- `LAB-PROGRESSO-1` — Progresso visual.

Arquivos principais:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/styles/progress-polish.css`
- `fluency-clean/src/main.jsx`

Resultado: visual premium aprovado com jornada, CEFR, métricas, heatmap, habilidades, conquistas e histórico. Usuário confirmou: “ficou perfeito”.

## Estado atual para teste

### Ajustes/Configurações — ajuste cirúrgico implementado, aguardando teste do usuário
Pedido do usuário:
- mover a aba/painel de **Chaves exclusivas de aulas** de Progresso para **Configurações/Ajustes**, dentro da função/categoria **Chaves de aulas**;
- dentro dessa área, adicionar outra aba para **chaves gerais de IA**, que futuramente funcionarão para Speaking, Imersão e outras áreas que precisarem de IA.

Arquivos alterados/criados:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `fluency-clean/src/components/settings/GeneralAiKeysPanel.jsx`
- `fluency-clean/src/services/aiKeys.js`
- `fluency-clean/src/styles/settings-polish.css`
- `fluency-clean/src/main.jsx` apenas para importar `settings-polish.css`
- `REWRITE_HANDOFF.md`

Commits principais deste ajuste:
- `4b473ccbebfad63ac4dc582850e67acc1c25c5fb` — adiciona storage de chaves gerais de IA;
- `e785ccb03d55ce71c9b8b9b1a87f5b78dd72e261` — cria painel de chaves gerais de IA;
- `b8a2c7797a029f2adaf1d8ad60fbd86682ae5e80` — importa CSS de Ajustes;
- houve também commits de movimentação da UI em `ProgressScreen.jsx` e `SettingsScreen.jsx` neste mesmo ajuste.

O que foi implementado:
- Progresso não mostra mais o painel de chaves;
- Ajustes agora abre com categoria **Chaves de aulas** selecionada;
- dentro de **Chaves de aulas**, há duas abas:
  - **Chaves de aulas**: reaproveita o `LessonKeysPanel`, mantendo a lógica isolada da geração de aulas;
  - **IA geral**: novo painel `GeneralAiKeysPanel`, com storage próprio em `aiKeys.js`;
- as chaves gerais de IA são salvas separadamente em `ai.gemini.generalKeys`;
- nada foi integrado ainda em Speaking/Imersão/Azure/Gemini fora do painel, para não alterar lógica pesada neste ajuste;
- CSS próprio `settings-polish.css` para categorias e abas.

Limites intencionais:
- não altera backend;
- não altera Azure;
- não altera geração de aulas;
- não altera Speaking/Imersão ainda;
- não mexe em HTML, DOM injection ou bundle;
- apenas organização modular de Configurações e storage das chaves gerais.

## Próximo bloco correto

### Se Ajustes/Configurações for aprovado no Vercel/iPhone
Próximo: `LAB-AJUSTES-1B` ou seguir para `LAB-IMERSAO-1`, dependendo do usuário.

Sugestão segura:
- testar primeiro se Ajustes abre sem tela branca;
- testar se a categoria **Chaves de aulas** mostra as duas abas;
- testar se as chaves de aulas antigas continuam aparecendo;
- testar se dá para adicionar/remover uma key em **IA geral**;
- testar se Progresso continua sem corte e sem painel de chaves.

### Se Ajustes tiver problema
Não avançar. Corrigir cirurgicamente apenas o ajuste de Configurações na branch lab.

## Ordem restante dos blocos de UI

1. `LAB-AJUSTES-1B` — finalizar inventário/limpeza dos outros botões de Ajustes, se o usuário aprovar esta mudança.
2. `LAB-IMERSAO-1` — localizar/criar Imersão apenas se existir estrutura real.
3. `LAB-9` — limpeza final da UI e arquivos de teste, incluindo remoção do seletor temporário da Aula.
4. `LAB-10` — checklist visual final da lab.
5. `Bloco 8-LAB` — reestruturação profunda das aulas, só depois do checklist visual.

## Estratégia de segurança

### Regra 1 — Um bloco = uma UI ou uma mudança pequena
Nada de reformular várias telas ao mesmo tempo.

### Regra 2 — Sempre informar arquivos alterados
Após alteração, responder com:
- branch usada;
- arquivos alterados;
- commit gerado;
- o que testar no Vercel.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer escrita, conferir:

`branch === rewrite-fluency-clean-lab`

### Regra 4 — Teste antes de continuar
Depois de cada bloco, o usuário testa no Vercel pelo iPhone. Só avançar se ele confirmar.

### Regra 5 — Se der tela branca
1. parar;
2. revisar último commit da lab;
3. reverter somente o último bloco na lab;
4. preservar `main` e `rewrite-fluency-clean` intactas.

## Como continuar em outro chat
Mensagem recomendada:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula, Cartas e Progresso estão aprovados. O último ajuste moveu as chaves de aulas para Ajustes > Chaves de aulas e criou a aba IA geral para chaves usadas futuramente em Speaking/Imersão. A Aula tem preview temporário por pilares funcionando 100%, que será removido no LAB-9. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
