# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

## REGRA OPERACIONAL — SEMPRE ATUALIZAR O HANDOFF
Quando o chat estiver ficando longo, quando o usuário disser que vai abrir outro chat, ou quando um bloco importante for concluído/aprovado, atualizar `REWRITE_HANDOFF.md` com:

- onde paramos;
- últimos blocos concluídos e aprovados pelo usuário;
- arquivos principais alterados/criados;
- próximo bloco correto;
- pendências importantes;
- regra de não mexer fora da branch lab.

Isso é obrigatório para evitar perda de contexto e respostas desalinhadas no próximo chat.

## REGRA DE ORGANIZAÇÃO — SEM BUNDLE DE PATCHES
O objetivo do rewrite é evitar repetir o problema do projeto antigo: `bundle.js` cheio de patches, DOM injection, interceptação global, MutationObserver e correções empilhadas por cima do app.

Regra correta:
- cada função deve morar no seu arquivo real dentro de `fluency-clean/src/`;
- telas devem ser componentes React reais;
- serviços devem ficar em `fluency-clean/src/services/`;
- componentes reutilizáveis devem ficar em `fluency-clean/src/components/`;
- estilos devem ficar em arquivos CSS reais em `fluency-clean/src/styles/`;
- não criar novos scripts de DOM injection/runtime para trocar textos, classes, botões ou telas;
- não usar `preview-clean/index.html` como fonte da UI;
- não transformar `preview-clean` em produto final separado;
- o objetivo final é mergear a branch validada para `main` e acessar o site normalmente pela `main`.

## Preview oficial de teste da lab
O preview de teste real está na Vercel, gerado a partir da branch:

`rewrite-fluency-clean-lab`

Links de preview variam por deploy. O usuário testa no iPhone usando o deploy mais recente da branch lab.

Fluxo de teste:
1. alterar um bloco na branch lab;
2. disparar/aguardar deploy da Vercel na branch `rewrite-fluency-clean-lab`;
3. usuário testa no iPhone;
4. só avançar se o usuário confirmar.

## Objetivo geral
Reconstruir o app Fluency em React modular, sem continuar empilhando patches no `bundle.js`, preservando login, Firebase, geração Gemini, progresso, áudio e contrato Azure privado.

## Decisões que continuam valendo
- Não mexer na `main`.
- Não mexer no backend Azure privado.
- Não criar outro HTML gigante.
- Não remendar `bundle.js`.
- Não usar DOM injection para UI principal.
- Toda nova tela deve ser componente React real.
- A aparência deve seguir a referência Fluency premium escura enviada pelo usuário.
- O app deve ficar organizado para merge final na `main`.

## Estado atual aprovado pelo usuário

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

Resultado:
- alternância Conversa / Pronúncia funcionando;
- bolhas de chat e feedback visual;
- modo Pronúncia com frase, fonética, score por palavra e dica;
- microfone circular grande;
- diagnóstico não fica mais poluindo a tela, abre por botão pequeno/modal;
- usuário disse que ficou perfeito.

### Hoje/Home — APROVADO
Blocos concluídos:
- `LAB-HOJE-1` — Home/Hoje igual à referência;
- `LAB-HOJE-1B` — ajuste de largura para remover margens laterais duplicadas.

Arquivos principais:
- `fluency-clean/src/screens/TodayScreen.jsx`
- `fluency-clean/src/styles/today-polish.css`
- `fluency-clean/src/main.jsx`

Resultado:
- hero de tarefas com progresso circular;
- cards de ofensiva e nível;
- tarefas do dia;
- semana;
- frase do dia;
- gerador de aula recolhido;
- usuário disse que ficou perfeito depois do ajuste de largura.

### Navbar — APROVADA
Bloco concluído:
- `LAB-NAV-1` — navbar flutuante igual à referência.

Arquivos principais:
- `fluency-clean/src/components/layout/BottomNav.jsx`
- `fluency-clean/src/styles/nav-polish.css`
- `fluency-clean/src/main.jsx`

Resultado:
- navbar mais próxima da referência;
- item ativo expandido com texto;
- itens inativos compactos;
- menos cobertura de conteúdo;
- usuário disse que ficou lindo.

### Aula — APROVADA
Blocos concluídos:
- `LAB-AULA-1` — topo/casca da aula igual à referência;
- `LAB-AULA-1B` — correção de overflow/corte horizontal;
- `LAB-AULA-2` — preview seguro por pilar de aula.

Arquivos principais:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-polish.css`
- `fluency-clean/src/lessons/ReadingLesson.jsx` já existia e continua sendo usado;
- `fluency-clean/src/lessons/GrammarLesson.jsx` já existia e continua sendo usado;
- `fluency-clean/src/lessons/ListeningLesson.jsx` criado;
- `fluency-clean/src/lessons/WritingLesson.jsx` criado.

Resultado:
- topo premium aprovado;
- conteúdo da aula renderiza sem corte;
- seletor temporário de pilares funciona;
- previews de Leitura, Gramática, Escuta e Escrita funcionam;
- usuário confirmou: “funcionou 100%”.

Observação importante:
- O seletor temporário `Lab preview — Ver UI por pilar` deve ficar por enquanto para teste das UIs de aula.
- Ele deve ser removido no `LAB-9 — Limpeza final da UI e arquivos de teste`.

## Próximo bloco correto

### Próximo: `LAB-CARTAS-1 — Flashcards/Cartas igual à referência`
O usuário enviou novo ZIP de referência para continuar nesse bloco.

Escopo do próximo bloco:
- refazer a UI da aba Cartas/Flashcards seguindo o ZIP de referência;
- manter lógica simples e segura;
- não mexer em Aula, Hoje ou Speaking;
- criar/ajustar CSS em arquivo real, de preferência próprio se fizer sentido;
- sem HTML remendado;
- sem bundle patch;
- manter o seletor temporário da Aula para remoção só no LAB-9.

Antes de escrever código no próximo chat:
1. ler `REWRITE_HANDOFF.md`;
2. confirmar branch `rewrite-fluency-clean-lab`;
3. localizar os arquivos atuais da aba Cartas;
4. ler o ZIP de referência enviado pelo usuário;
5. aplicar só o bloco `LAB-CARTAS-1`.

## Ordem restante dos blocos de UI

### LAB-CARTAS-1 — Flashcards/Cartas visual
Objetivo: aproximar Cartas da referência.

Ações:
- visual do card;
- botões de dificuldade;
- sessão de revisão;
- evitar overflow/corte;
- não mexer em lógica pesada.

Critério:
- aba Cartas abre sem corte/overflow;
- visual combina com o resto do app;
- usuário testa e aprova.

### LAB-PROGRESSO-1 — Progresso visual
Objetivo: refazer Progresso com segurança, sem repetir tela branca.

Ações:
- apenas React/CSS real;
- nada de runtime injection;
- preservar XP, streak, histórico e chaves.

Critério:
- Progresso abre e dados continuam corretos.

### LAB-AJUSTES-1 — Ajustes: inventário e limpeza
Objetivo: mapear botões sem função e deixar Ajustes confiável.

Ações:
- listar botões existentes;
- remover/desativar visualmente os sem função;
- não adicionar funcionalidades grandes ainda.

Critério:
- Ajustes não parece falso/cheio de botões inúteis.

### LAB-IMERSAO-1 — Imersão
Objetivo: localizar se Imersão existe como aba/tela real ou se precisa ser criada.

Ações:
- mapear código existente;
- se existir, refazer UI em bloco separado;
- se não existir, propor criação modular.

Critério:
- não criar aba fantasma; só implementar com estrutura real.

### LAB-9 — Limpeza final da UI e arquivos de teste
Objetivo: remover tudo que existe apenas para teste/lab.

Remover ou esconder corretamente:
- seletor temporário de pilares da Aula;
- textos “Preview seguro”, “Lab preview”, “seguro para testes”, se não forem necessários no produto final;
- botões usados só para teste;
- cards temporários;
- informações técnicas visíveis ao usuário final;
- arquivos/imports não usados;
- qualquer botão sem função real;
- qualquer resíduo de diagnóstico exposto demais.

Critério:
- app parece produto final;
- sem UI técnica exposta;
- sem seletor lab.

### LAB-10 — Checklist visual final da lab
Objetivo: testar navegação completa antes do Bloco 8.

Checklist:
- Hoje;
- Aula;
- Speaking;
- Cartas;
- Progresso;
- Ajustes;
- Imersão se existir;
- login se necessário;
- geração de aula;
- conclusão de aula;
- áudio;
- microfone;
- recarregar página;
- iPhone/Safari/Vercel preview.

Critério:
- sem tela branca e sem UI técnica exposta.

### Bloco 8-LAB — Reestruturação profunda das aulas
Só iniciar depois do checklist visual da lab.

Objetivo pedagógico:
- nenhuma aula curta;
- nada de poucos exercícios;
- conteúdo completo e aprofundado;
- validação anti-aula-rasa.

Sub-blocos seguros:
- `8-LAB.1` — contrato mínimo da aula;
- `8-LAB.2` — Reading profunda;
- `8-LAB.3` — Grammar profunda;
- `8-LAB.4` — Listening profunda;
- `8-LAB.5` — Speaking profundo;
- `8-LAB.6` — validação anti-aula-curta.

## Estratégia de segurança

### Regra 1 — Um bloco = uma UI ou uma mudança pequena
Nada de reformular várias telas ao mesmo tempo.
Cada bloco deve alterar no máximo:
- 1 UI principal; ou
- 1 arquivo CSS compartilhado associado à UI; ou
- 1 comportamento isolado.

### Regra 2 — Sempre informar arquivos alterados
Toda resposta após alteração deve listar:
- branch usada;
- arquivos alterados;
- commit gerado;
- o que testar.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer tool call de escrita, conferir:

`branch === rewrite-fluency-clean-lab`

### Regra 4 — Teste antes de continuar
Depois de cada bloco, o usuário testa no iPhone. Só avançar se ele confirmar.

### Regra 5 — Infraestrutura com cuidado
Não criar workflow, build paralelo ou produto em `preview-clean` sem o usuário pedir explicitamente.
O app final deve ser acessado pela `main` depois do merge.

### Regra 6 — Se der tela branca
Não continuar tentando layout.
Procedimento:
1. parar;
2. revisar último commit da lab;
3. reverter somente o último bloco na lab;
4. preservar branch protegida intacta.

## Como continuar em outro chat
Mensagem recomendada para o próximo chat:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. Estamos com Speaking, Hoje, Navbar e Aula aprovados. A Aula tem preview temporário por pilares funcionando 100%, que será removido no LAB-9. O próximo bloco é `LAB-CARTAS-1 — Flashcards/Cartas igual à referência`. Use o ZIP de referência que enviei neste novo chat. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, não use DOM injection e não crie bundle patch. Cada função deve ficar no arquivo correto dentro de `fluency-clean/src/`. Ao terminar, atualize o handoff informando onde paramos."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
