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

## REGRA DE ORGANIZAÇÃO — SEM BUNDLE DE PATCHES
O objetivo do rewrite é evitar repetir o problema do projeto antigo: um `bundle.js` cheio de blocos `FLUENCY PATCH V...`, DOM injection, interceptação global, MutationObserver e correções empilhadas por cima do app.

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

O preview da lab é apenas ferramenta de teste temporária. Ele pode existir para validação no iPhone, mas não deve virar local de remendos nem fonte principal do app.

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
- O app deve ficar organizado para merge final na `main`.

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
- Botão Continuar agora corrigido no preview.
- Hero da Home confirmado limpo.
- Seletor técnico da Aula reduzido.
- Card superior da Aula melhorado.

### LAB-6 / LAB-6R — Progresso visual
- Primeira tentativa com runtime amplo causou tela branca e foi revertida.
- LAB-6R passou a priorizar CSS estático e mudanças em fonte real.
- Reforço: não repetir DOM injection amplo.

### LAB-7 — Speaking visual iniciado
- `fluency-clean/src/styles/lab-polish.css` criado como fonte real dos polimentos visuais.
- `fluency-clean/src/main.jsx` importa `lab-polish.css`.
- `fluency-clean/src/screens/SpeakingScreen.jsx` recebeu card superior e textos/classes melhores sem alterar Azure/backend.

### Correção de rota — preview/build
- A ideia de workflow para gerar `preview-clean` automaticamente foi removida por desalinhamento com o objetivo do usuário.
- `fluency-clean/vite.config.js` voltou para `outDir: 'dist'`.
- `fluency-clean/package.json` voltou sem `build:preview`.
- O foco agora é organização do app em `src/`, para merge final em `main`, não criar produto paralelo em `preview-clean`.

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
- link de preview se houver algo testável no preview da lab.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer tool call de escrita, conferir mentalmente:

`branch === rewrite-fluency-clean-lab`

### Regra 4 — Teste antes de continuar
Depois de cada bloco, o usuário testa o que for testável no iPhone. Só avançar se ele confirmar ou se a mudança for apenas organização interna sem reflexo visual imediato.

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

## Próximos blocos remodelados — ordem segura

### Bloco LAB-7 — Speaking visual
Objetivo: alinhar Speaking com referência.

Ações:
- visual somente;
- não mexer no contrato Azure;
- não alterar backend;
- manter código em `SpeakingScreen.jsx` e CSS real.

Critério:
- tela abre, botão de fala continua disponível quando testável.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md`. Siga a regra nova: sem bundle de patches, sem DOM injection, sem remendos no HTML; cada função deve ficar no arquivo correto dentro de `fluency-clean/src/`. Não mexa na `main` nem na `rewrite-fluency-clean`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
