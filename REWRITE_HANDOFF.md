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

## REGRA DE ESCOPO
Antes de alterar, identificar o bloco atual e mexer apenas nos arquivos necessários.

Exemplos:
- Se o bloco é Progresso, não alterar Aula, Hoje, Speaking, Cartas, Firebase, Gemini, Azure ou backend.
- Se precisar tocar em `main.jsx`, usar apenas para importar CSS do bloco.

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

## Estado atual para teste

### Progresso — `LAB-PROGRESSO-1` IMPLEMENTADO, AGUARDANDO TESTE DO USUÁRIO
Bloco feito neste chat com base no ZIP de referência enviado pelo usuário.

Arquivos alterados/criados:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/styles/progress-polish.css`
- `fluency-clean/src/main.jsx` apenas para importar `progress-polish.css`
- `REWRITE_HANDOFF.md`

Commits principais deste bloco:
- `e9988a02cb60cfe97104bc8637390877b7ae8122` — refaz tela de progresso;
- `60a5607bc134cb64781b032eca7e12fb846a6aa8` — adiciona CSS modular de progresso;
- `4f2cd82272997e6695d1558ef564ffcb7c7ef31d` — importa CSS de progresso.

O que foi implementado:
- cabeçalho “Sua jornada” com seletor visual 7d/30d/Tudo;
- hero de nível estimado com linha CEFR A1 → C2;
- grid premium de métricas: Aulas, XP total, Streak e Speaking;
- heatmap de atividade dos últimos 30 dias usando histórico local;
- barras de habilidades por área com base no histórico de aulas;
- conquistas recentes;
- histórico recente de aulas concluídas;
- painel de chaves exclusivas de aulas preservado dentro da aba Progresso;
- card de próximo marco semanal;
- CSS próprio para evitar overflow/corte no iPhone.

Limites intencionais do bloco:
- não altera lógica de progresso;
- não altera storage;
- não altera chaves;
- não mexe em Firebase, Gemini, Azure, backend, Aula, Hoje, Speaking ou Cartas;
- apenas React/CSS real.

Verificação feita:
- arquivos conferidos na branch lab após os commits;
- foi corrigido um import de ícone antes de finalizar para evitar tela branca;
- o teste final deve ser pelo Vercel preview da branch lab.

## Próximo bloco correto

### Se Progresso for aprovado no Vercel/iPhone
Próximo: `LAB-AJUSTES-1 — Ajustes: inventário e limpeza`

Objetivo:
- mapear botões existentes na aba Ajustes;
- remover/desativar visualmente os sem função;
- deixar Ajustes confiável;
- não adicionar funcionalidades grandes ainda.

### Se Progresso tiver problema
Não avançar. Corrigir cirurgicamente apenas `LAB-PROGRESSO-1` na branch lab.

## Ordem restante dos blocos de UI

1. `LAB-AJUSTES-1` — Ajustes: inventário e limpeza.
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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula e Cartas estão aprovados. O bloco `LAB-PROGRESSO-1` foi implementado e está aguardando teste/aprovação no Vercel. A Aula tem preview temporário por pilares funcionando 100%, que será removido no LAB-9. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
