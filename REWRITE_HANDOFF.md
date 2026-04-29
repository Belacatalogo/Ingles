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

### Hoje/Home — APROVADO
Blocos concluídos:
- `LAB-HOJE-1` — Home/Hoje igual à referência;
- `LAB-HOJE-1B` — ajuste de largura para remover margens laterais duplicadas.

### Navbar — APROVADA
Bloco concluído:
- `LAB-NAV-1` — navbar flutuante igual à referência.

### Aula — APROVADA
Blocos concluídos:
- `LAB-AULA-1` — topo/casca da aula igual à referência;
- `LAB-AULA-1B` — correção de overflow/corte horizontal;
- `LAB-AULA-2` — preview seguro por pilar de aula.

Observação: o seletor temporário `Lab preview — Ver UI por pilar` deve ficar por enquanto e ser removido apenas no `LAB-9`.

### Cartas/Flashcards — APROVADO
Bloco concluído:
- `LAB-CARTAS-1` — Flashcards/Cartas igual à referência.

### Progresso — APROVADO
Bloco concluído:
- `LAB-PROGRESSO-1` — Progresso visual.

### Ajustes/Configurações — APROVADO/ORGANIZADO
Blocos concluídos:
- chaves movidas de Progresso para Ajustes > Chaves de aulas;
- aba **IA geral** criada para chaves futuras de Speaking/Imersão/outras áreas;
- `LAB-AJUSTES-1B` — tela de Ajustes organizada com perfil, categorias e painéis.

## Estado atual para teste

### Imersão — `LAB-IMERSAO-1` IMPLEMENTADO, AGUARDANDO TESTE DO USUÁRIO
Pedido do usuário:
- se a aba Imersão não existisse, colocar Imersão dentro da aba Speaking com um botão ao lado de **Pronúncia**.

Verificação feita:
- foi pesquisado no repositório por Imersão/Immersion/ImmersionScreen e não havia tela real existente.

Arquivos alterados:
- `fluency-clean/src/screens/SpeakingScreen.jsx`
- `fluency-clean/src/styles/lab-polish.css`
- `REWRITE_HANDOFF.md`

Commit confirmado deste bloco:
- `413fe010d28cda1917519c3ccf70de30f004d94e` — adiciona estilos de imersão.

O que foi implementado:
- Speaking agora tem 3 modos no seletor superior:
  - **Conversa**;
  - **Pronúncia**;
  - **Imersão**;
- Imersão foi adicionada dentro de Speaking, sem criar aba fantasma na navbar;
- modo Imersão tem:
  - hero explicativo;
  - cenários reais: Café, Hotel e Rua;
  - cartão com frase natural do cenário;
  - botão **Ouvir** usando o TTS existente;
  - botão grande de microfone usando o mesmo fluxo seguro de gravação/análise Azure já usado no Speaking;
  - estilos próprios no `lab-polish.css`;
- não foi feita integração pesada com IA geral neste bloco;
- não foi mexido em Aula, Hoje, Cartas, Progresso, Ajustes, Firebase, Gemini, Azure backend, HTML ou bundle.

Limites intencionais:
- Imersão usa cenários estáticos seguros por enquanto;
- a futura geração dinâmica com IA geral deve ser feita em bloco próprio, depois do checklist, para não quebrar Speaking/Azure.

## Próximo bloco correto

### Se Imersão for aprovada no Vercel/iPhone
Próximo: `LAB-9 — Limpeza final da UI e arquivos de teste`.

Objetivo do LAB-9:
- remover seletor temporário de pilares da Aula;
- remover textos técnicos/lab expostos ao usuário final;
- revisar botões de teste;
- esconder/remover elementos temporários;
- garantir que o app pareça produto final antes do checklist.

### Se Imersão tiver problema
Não avançar. Corrigir cirurgicamente apenas `LAB-IMERSAO-1` na branch lab.

## Ordem restante dos blocos de UI

1. `LAB-9` — limpeza final da UI e arquivos de teste, incluindo remoção do seletor temporário da Aula.
2. `LAB-10` — checklist visual final da lab.
3. `Bloco 8-LAB` — reestruturação profunda das aulas, só depois do checklist visual.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula, Cartas, Progresso e Ajustes estão aprovados. O `LAB-IMERSAO-1` adicionou Imersão dentro de Speaking como terceira opção ao lado de Conversa/Pronúncia e está aguardando aprovação. A Aula tem preview temporário por pilares funcionando 100%, que será removido no LAB-9. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
