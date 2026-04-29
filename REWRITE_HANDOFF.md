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

### Aula — APROVADA / LIMPA
Blocos concluídos:
- `LAB-AULA-1` — topo/casca da aula igual à referência;
- `LAB-AULA-1B` — correção de overflow/corte horizontal;
- `LAB-AULA-2` — preview seguro por pilar de aula;
- `LAB-9` — seletor temporário de pilares removido.

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
- `LAB-AJUSTES-1B` — tela de Ajustes organizada com perfil, categorias e painéis;
- `LAB-9` — textos técnicos/lab visíveis removidos.

### Imersão — APROVADO EM ESTRUTURA / AJUSTADO
Blocos concluídos:
- `LAB-IMERSAO-1` — Imersão adicionada dentro de Speaking como terceira opção;
- `LAB-IMERSAO-1B` — seletor e cards corrigidos para iPhone.

## Estado atual para teste

### Limpeza final — `LAB-9` IMPLEMENTADO, AGUARDANDO TESTE DO USUÁRIO
Objetivo do bloco:
- remover seletor temporário de pilares da Aula;
- remover textos técnicos/lab expostos ao usuário final;
- revisar aparência de produto final antes do checklist.

Arquivos alterados:
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/screens/SettingsScreen.jsx`
- `REWRITE_HANDOFF.md`

Commits confirmados deste bloco:
- `f065f786ec282dd0297ed433da621d77a9cda941` — remove seletor temporário da Aula;
- `93cd9fb6ddc84a3107464b77c6233c70dbe6b80c` — remove textos lab visíveis em Ajustes.

O que foi implementado:
- removido o bloco **Lab preview / Ver UI por pilar** da Aula;
- Aula agora usa diretamente a aula real salva quando existir;
- quando não houver aula salva, usa fallback inicial seguro, sem texto de preview/lab;
- chips da Aula agora mostram **Gerada por IA** ou **Aula inicial**, tipo da aula e nível;
- removidos textos visíveis de Ajustes como `Fluency Clean Lab`, `rewrite-clean-lab` e `Vercel lab`;
- Ajustes agora mostra textos finais: `A1 · Plano ativo`, `Sessão ativa`, `Seu app de inglês diário`;
- varredura feita por termos temporários principais: `Lab preview`, `Ver UI por pilar`, `Preview seguro`, `Fluency Clean Lab`, `rewrite-clean-lab`, `Vercel lab`, `layout-preview`, sem resultados.

Limites intencionais:
- não removeu ferramenta interna de diagnóstico;
- não mexeu em backend, Azure, Firebase, Gemini, HTML, bundle ou integrações;
- não reestruturou conteúdo pedagógico profundo das aulas ainda.

## Próximo bloco correto

### Se LAB-9 for aprovado no Vercel/iPhone
Próximo: `LAB-10 — checklist visual final da lab`.

Objetivo do LAB-10:
- revisar visualmente Hoje, Aula, Speaking/Imersão, Cartas, Progresso e Ajustes;
- confirmar rolagem, navbar, diagnóstico e ausência de tela branca;
- listar qualquer ajuste visual residual antes do Bloco 8-LAB;
- não fazer reestruturação profunda ainda.

### Se LAB-9 tiver problema
Não avançar. Corrigir cirurgicamente apenas `LAB-9` na branch lab.

## Ordem restante dos blocos de UI

1. `LAB-10` — checklist visual final da lab.
2. `Bloco 8-LAB` — reestruturação profunda das aulas, só depois do checklist visual.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula, Cartas, Progresso, Ajustes e Imersão estão aprovados/organizados. O `LAB-9` removeu o seletor temporário da Aula e limpou textos técnicos visíveis, aguardando aprovação. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
