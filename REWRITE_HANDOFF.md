# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

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

Link atual informado pelo usuário:

`https://ingles-mnpzwr34i-belacatalogos-projects.vercel.app/`

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

## Regra de blocos de UI
Cada UI deve ter seu próprio bloco. Não misturar várias abas no mesmo bloco.

Ordem atual decidida com o usuário:
1. finalizar Speaking seguindo a referência do ZIP;
2. voltar para Hoje e refazer como referência;
3. voltar para Aula e refazer como referência;
4. seguir para outras UIs, uma por bloco;
5. somente depois iniciar o Bloco 8 pedagógico.

## Blocos concluídos importantes

### Bloco 0 a 6 — Fundação, UI base, serviços, Firebase, Gemini, áudio e Azure
- App React criado em `fluency-clean/`.
- Serviços Gemini, Azure, Firebase, diagnóstico, chaves de aula e TTS criados.
- Login Google/Firebase e modo visual implementados.
- Geração de aula em blocos validada.
- Azure preservado sem alterar backend privado.

### Bloco 7.1 — Gemini real
- Geração real validada.
- Aula `My Family` foi gerada com sucesso via `gemini-2.5-flash-lite`.
- Diagnóstico mostra blocos e erros.

### Bloco 7.2 — Firebase/Google
- Firebase runtime configurado no RawGitHack.
- Domínio autorizado.
- Login por popup validado no iPhone.
- Sessão persistiu após recarregar.

### Bloco 7.3 — Progresso/salvamento/conclusão
- Progresso local criado.
- Conclusão de Reading salva XP, streak, histórico e estado concluído.
- Usuário confirmou funcionamento.

### Bloco 7.4 — Realinhamento visual inicial
- Home, topbar e bottom nav começaram a se aproximar da referência.
- Flashcards/Speaking/Home têm base visual premium, mas ainda precisam de validação calma.

### Bloco 7.5-R — Rollback/estabilização
- Tentativas instáveis do Bloco 7.5 foram revertidas/neutralizadas na branch protegida.
- App voltou a carregar em guia anônima.
- Nova branch lab criada a partir do estado carregável.

### LAB-1 a LAB-5 — Validação visual inicial da lab
- Branch lab identificada.
- Botão Continuar agora corrigido no preview antigo.
- Hero da Home confirmado limpo.
- Seletor técnico da Aula reduzido inicialmente.
- Card superior da Aula melhorado inicialmente.

### LAB-6 / LAB-6R — Progresso visual
- Primeira tentativa com runtime amplo causou tela branca e foi revertida.
- LAB-6R passou a priorizar CSS estático e mudanças em fonte real.
- Reforço: não repetir DOM injection amplo.

### LAB-7 inicial — Speaking visual iniciado
- `fluency-clean/src/styles/lab-polish.css` criado como fonte real dos polimentos visuais.
- `fluency-clean/src/main.jsx` importa `lab-polish.css`.
- `fluency-clean/src/screens/SpeakingScreen.jsx` recebeu card superior e textos/classes melhores sem alterar Azure/backend.

### LAB-7B / LAB-7C — Correções recentes
- `LessonScreen.jsx`: removido o controle visível “Opções avançadas de layout”.
- `SpeakingScreen.jsx`: criada primeira versão de prática guiada com roteiro, frase principal, áudio, gravação, feedback e desafio final.
- `lab-polish.css`: estilos reais adicionados para essa versão.
- Usuário avisou que ainda quer Speaking no formato exato da referência do ZIP, não apenas inspirado.

### Correção de rota — preview/build
- A ideia de workflow para gerar `preview-clean` automaticamente foi removida por desalinhamento com o objetivo do usuário.
- `fluency-clean/vite.config.js` voltou para `outDir: 'dist'`.
- `fluency-clean/package.json` voltou sem `build:preview`.
- O foco agora é organização do app em `src/`, para merge final em `main`, não criar produto paralelo em `preview-clean`.

## Nova estratégia de segurança

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
- link de preview Vercel quando houver algo testável.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer tool call de escrita, conferir mentalmente:

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

## Próximos blocos organizados — nova ordem

### LAB-7D — Speaking igual à referência do ZIP
Objetivo: refazer Speaking para seguir a estrutura da referência enviada no ZIP, em React real.

Ações previstas:
- criar alternância interna `Conversa` / `Pronúncia`;
- modo Conversa com card/bolhas de chat, contexto e microfone circular grande;
- modo Pronúncia com frase para repetir, transcrição/fonética visual, foco em palavras, score por palavra e dica;
- botões `Ouvir`, `Gravar`, `Tentar de novo`, `Próxima` quando aplicável;
- preservar funções atuais de TTS, gravação e Azure;
- não mexer no backend privado;
- não criar DOM injection;
- manter tudo em `SpeakingScreen.jsx` e CSS real.

Critério:
- preview Vercel abre sem tela branca;
- Speaking parece a referência, não apenas uma versão genérica;
- botões principais continuam disponíveis.

### LAB-7E — Ajuste fino Speaking
Só fazer se o usuário testar o LAB-7D e pedir ajustes.

Possíveis ações:
- corrigir espaçamento mobile;
- ajustar tamanho do microfone circular;
- ajustar bolhas/score/palavras;
- remover excesso de texto.

### LAB-HOJE-1 — Home/Hoje igual à referência
Objetivo: voltar para a aba Hoje e refazer de acordo com a referência.

Ações previstas:
- hero de tarefas do dia;
- progresso circular;
- ofensiva/streak;
- nível;
- cards de rotina;
- sem botões falsos.

Critério:
- Home parece produto final e não painel técnico.

### LAB-AULA-1 — Aula igual à referência
Objetivo: voltar para aba Aula e alinhar layout base com referência.

Ações previstas:
- remover qualquer resíduo técnico;
- criar layout de aula real por tipo;
- organizar progresso da aula;
- manter Reading/Grammar separados por componente;
- não iniciar ainda profundidade pedagógica do Bloco 8.

Critério:
- Aula visualmente segue referência e continua renderizando aula real.

### LAB-CARTAS-1 — Flashcards/Cartas visual
Objetivo: aproximar Cartas da referência.

Ações:
- visual do card, botões de dificuldade e sessão;
- sem mexer em lógica pesada.

Critério:
- aba Cartas abre sem corte/overflow.

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

#### 8-LAB.1 — Contrato mínimo da aula
Definir mínimos por tipo:
- tamanho do conteúdo;
- número de exercícios;
- vocabulário;
- exemplos;
- prática guiada;
- produção própria.

#### 8-LAB.2 — Reading profunda
- texto maior;
- vocabulário robusto;
- compreensão;
- produção escrita;
- desafio final.

#### 8-LAB.3 — Grammar profunda
- explicação séria;
- exemplos;
- erros comuns;
- comparação PT/EN;
- exercícios variados.

#### 8-LAB.4 — Listening profunda
- pré-escuta;
- áudio/transcrição separados;
- compreensão;
- shadowing.

#### 8-LAB.5 — Speaking profundo
- roteiro;
- modelo;
- gravação;
- feedback;
- repetição guiada.

#### 8-LAB.6 — Validação anti-aula-curta
- rejeitar aula rasa;
- rejeitar pouco exercício;
- rejeitar vocabulário fraco;
- pedir regeneração do bloco ruim.

## Como continuar em outro chat
Mensagem recomendada para o próximo chat:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md`. Siga a nova ordem: LAB-7D Speaking igual à referência do ZIP, depois Hoje, depois Aula, depois as outras UIs. Sem bundle de patches, sem DOM injection, sem remendos no HTML; cada função deve ficar no arquivo correto dentro de `fluency-clean/src/`. Não mexa na `main` nem na `rewrite-fluency-clean`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
