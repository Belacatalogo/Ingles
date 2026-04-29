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

Resultado: visual premium aprovado com jornada, CEFR, métricas, heatmap, habilidades, conquistas e histórico. Usuário confirmou: “ficou perfeito”.

### Ajustes/Configurações — CHAVES MOVIDAS
Ajuste concluído antes do `LAB-AJUSTES-1B`:
- painel de **Chaves de aulas** removido de Progresso;
- painel movido para **Ajustes > Chaves de aulas**;
- criada aba **IA geral** para guardar keys futuras de Speaking/Imersão/outras áreas;
- storage separado criado em `fluency-clean/src/services/aiKeys.js`;
- nenhuma integração pesada foi feita ainda em Speaking/Imersão/Azure/Gemini.

Arquivos principais:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `fluency-clean/src/components/settings/GeneralAiKeysPanel.jsx`
- `fluency-clean/src/services/aiKeys.js`
- `fluency-clean/src/styles/settings-polish.css`
- `fluency-clean/src/main.jsx`

## Estado atual para teste

### Ajustes/Configurações — `LAB-AJUSTES-1B` IMPLEMENTADO, AGUARDANDO TESTE DO USUÁRIO
Bloco feito com base no ZIP de referência enviado pelo usuário.

Arquivos alterados:
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `fluency-clean/src/styles/settings-polish.css`
- `REWRITE_HANDOFF.md`

Último commit confirmado deste bloco:
- `2aa21a3d43b8955310533914321d9aa03f3a64a8` — remove variável não usada após organizar Ajustes.

O que foi implementado:
- cartão de perfil no topo;
- categorias clicáveis em Ajustes:
  - Conta e acesso;
  - Plano de estudos;
  - Chaves de aulas;
  - Áudio;
  - Aparência;
  - Dados;
- categoria **Chaves de aulas** mantém as duas abas:
  - **Chaves de aulas**;
  - **IA geral**;
- categoria **Conta e acesso** com linhas organizadas;
- categoria **Plano de estudos** com meta, lembrete, nível e foco;
- categoria **Áudio** com voz, Azure e toggle visual de autoplay;
- categoria **Aparência** com tema, navegação e toggle visual de modo compacto;
- categoria **Dados** com lembrete diário, histórico local e diagnóstico;
- bloco “Sobre” no fim;
- CSS próprio atualizado em `settings-polish.css`.

Limites intencionais:
- os toggles visuais são estado local seguro neste bloco;
- não foi criada integração pesada com notificações, exportação, Azure ou backend;
- não foi alterada a lógica das chaves de aulas nem da IA geral;
- não foi mexido em Aula, Hoje, Speaking, Cartas, Progresso visual, Firebase, Gemini, Azure, backend, HTML ou bundle.

## Próximo bloco correto

### Se Ajustes for aprovado no Vercel/iPhone
Próximo: `LAB-IMERSAO-1 — localizar/criar Imersão apenas se existir estrutura real`.

### Se Ajustes tiver problema
Não avançar. Corrigir cirurgicamente apenas `LAB-AJUSTES-1B` na branch lab.

## Ordem restante dos blocos de UI

1. `LAB-IMERSAO-1` — localizar/criar Imersão apenas se existir estrutura real.
2. `LAB-9` — limpeza final da UI e arquivos de teste, incluindo remoção do seletor temporário da Aula.
3. `LAB-10` — checklist visual final da lab.
4. `Bloco 8-LAB` — reestruturação profunda das aulas, só depois do checklist visual.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula, Cartas e Progresso estão aprovados. Ajustes foi reorganizado no `LAB-AJUSTES-1B` e está aguardando aprovação. A Aula tem preview temporário por pilares funcionando 100%, que será removido no LAB-9. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
