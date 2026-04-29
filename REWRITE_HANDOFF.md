# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA A PARTIR DE AGORA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

A branch `rewrite-fluency-clean` virou ponto seguro/backup após voltar a carregar em guia anônima no preview RawGitHack.

## Motivo da branch lab
Durante o Bloco 7.5, mudanças visuais grandes e tentativas de recovery/watchdog deixaram o preview instável e geraram tela branca/cache confuso no iPhone. Para evitar novas dores de cabeça:

- `rewrite-fluency-clean` fica preservada como estado carregável.
- `rewrite-fluency-clean-lab` recebe todos os testes visuais/pedagógicos daqui para frente.
- Mudança só volta para a branch protegida depois de validada pelo usuário.

## Link de preview da branch protegida
Branch protegida atual:

`https://raw.githack.com/Belacatalogo/Ingles/rewrite-fluency-clean/preview-clean/index.html`

## Link de preview esperado da branch lab
Usar a branch lab nos próximos testes:

`https://raw.githack.com/Belacatalogo/Ingles/rewrite-fluency-clean-lab/preview-clean/index.html`

Usar cache buster em todo teste:

`?visual=1&v=lab-001`

Exemplo:

`https://raw.githack.com/Belacatalogo/Ingles/rewrite-fluency-clean-lab/preview-clean/index.html?visual=1&v=lab-001`

## Estado atual antes da lab
- O app voltou a carregar em guia anônima.
- A tela de acesso apareceu corretamente.
- O problema de tela branca no navegador normal provavelmente era cache/estado antigo do `raw.githack.com`.
- O usuário quer que futuras alterações sejam feitas em uma branch separada para proteger a branch atual.

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

## Nova estratégia de segurança

### Regra 1 — Um bloco = uma mudança pequena
Nada de reformular uma tela inteira de uma vez.
Cada bloco deve alterar no máximo:
- 1 componente principal; ou
- 1 arquivo CSS; ou
- 1 comportamento isolado.

### Regra 2 — Sempre informar arquivos alterados
Toda resposta após alteração deve listar:
- branch usada;
- arquivos alterados;
- commit gerado;
- link de preview da branch lab.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer tool call de escrita, conferir mentalmente:

`branch === rewrite-fluency-clean-lab`

### Regra 4 — Preview antes de continuar
Depois de cada bloco, o usuário testa no iPhone. Só avançar se ele confirmar.

### Regra 5 — Evitar mudanças de infraestrutura
Não mexer em workflow, Vite, preview-clean ou HTML, a menos que seja exclusivamente necessário para recuperar preview quebrado e com autorização clara.

### Regra 6 — Se der tela branca
Não continuar tentando layout.
Procedimento:
1. parar;
2. revisar último commit da lab;
3. reverter somente o último bloco na lab;
4. preservar branch protegida intacta.

## Próximos blocos remodelados — ordem segura

### Bloco LAB-0 — Confirmar preview da lab
Objetivo: garantir que a branch lab carrega antes de qualquer mudança nova.

Ações:
- abrir link da lab com cache buster;
- entrar em modo visual;
- testar navegação básica;
- não alterar UI ainda.

Critério de conclusão:
- usuário confirma que `rewrite-fluency-clean-lab` abriu normal.

### Bloco LAB-1 — Trava de segurança visual
Objetivo: adicionar uma identificação discreta de que o usuário está na branch lab.

Alteração pequena sugerida:
- mudar apenas o texto do rodapé/versão para algo como:
  `rewrite-clean-lab · seguro para testes`

Arquivos prováveis:
- `fluency-clean/src/App.jsx`

Critério:
- app carrega e mostra versão lab no rodapé.

### Bloco LAB-2 — Corrigir botão “Continuar agora” sem mexer no resto
Objetivo: garantir contraste branco e formato correto do botão da Home.

Alteração pequena:
- mexer somente em CSS relacionado ao botão.
- não alterar estrutura da Home.

Arquivos prováveis:
- `fluency-clean/src/styles/reference.css` ou `hotfix.css`, se existir.

Critério:
- botão legível, branco, sem quebrar layout.

### Bloco LAB-3 — Remover/confirmar botão de relatório do hero
Objetivo: manter Home limpa.

Opção segura:
- se o botão pequeno do relatório estiver estranho, remover do hero.
- acesso ao progresso fica pela bottom nav.

Arquivos prováveis:
- `fluency-clean/src/screens/TodayScreen.jsx`
- CSS apenas se necessário.

Critério:
- Home carrega sem overflow e sem botão estranho.

### Bloco LAB-4 — Aula: esconder seletor temporário sem redesenhar toda tela
Objetivo: reduzir aparência de ambiente técnico na aba Aula sem refazer o layout.

Alteração pequena:
- transformar seletor de layout em `<details>` recolhido; ou
- mover seletor para final da tela.

Proibido neste bloco:
- refazer hero inteiro da Aula;
- trocar estrutura completa de `LessonScreen`;
- mexer em `ReadingLesson`.

Critério:
- aba Aula abre normalmente e fica menos poluída.

### Bloco LAB-5 — Aula: card superior no estilo referência, em mudança mínima
Objetivo: aproximar a aba Aula da referência sem quebrar.

Alteração segura:
- alterar somente textos/classes do card superior existente;
- não criar lógica nova complexa;
- não adicionar imports novos desnecessários.

Critério:
- Aula carrega no iPhone e o card fica visualmente melhor.

### Bloco LAB-6 — Progresso visual
Objetivo: validar visual da aba Progresso.

Ações:
- ajustar cards, espaçamento e textos;
- não mexer na lógica de salvamento.

Critério:
- histórico, XP e streak continuam aparecendo.

### Bloco LAB-7 — Speaking visual
Objetivo: alinhar Speaking com referência.

Ações:
- visual somente;
- não mexer no contrato Azure;
- não alterar backend.

Critério:
- tela abre, botão de fala continua disponível.

### Bloco LAB-8 — Flashcards visual
Objetivo: aproximar Flashcards da referência enviada.

Ações:
- visual do card, botões de dificuldade e sessão;
- sem mexer em lógica pesada.

Critério:
- aba Cartas abre sem corte/overflow.

### Bloco LAB-9 — Ajustes: inventário de botões
Objetivo: mapear botões sem função.

Ações:
- listar botões existentes;
- remover ou desativar visualmente os sem função;
- não adicionar funcionalidades grandes ainda.

Critério:
- Ajustes não parece falso/cheio de botões inúteis.

### Bloco LAB-10 — Checklist visual final da lab
Objetivo: testar navegação completa.

Checklist:
- Hoje;
- Aula;
- Progresso;
- Speaking;
- Cartas;
- Ajustes;
- modo visual;
- login se necessário;
- recarregar página;
- guia anônima.

Critério:
- sem tela branca.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md`. Primeiro confirme o preview da lab e siga os blocos LAB em ordem. Não mexa na `main` nem na `rewrite-fluency-clean`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
