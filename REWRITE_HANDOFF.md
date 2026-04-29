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

### Checklist final — `LAB-10` IMPLEMENTADO, AGUARDANDO TESTE DO USUÁRIO
Objetivo do bloco:
- fazer checklist visual final da lab antes do Bloco 8-LAB;
- garantir que não sobrou rodapé/texto técnico de lab visível;
- não fazer reestruturação profunda ainda.

Arquivos alterados:
- `fluency-clean/src/App.jsx`
- `REWRITE_HANDOFF.md`

Commit confirmado deste bloco:
- `c0049bfab01e142290dfa5da58940491019e2f75` — remove rodapé lab escondido.

Checklist de arquivos/telas revisados:
- `App.jsx` — tabs principais, topbar, diagnóstico, navbar e AccessGate;
- `TodayScreen.jsx` — Hoje/Home já aprovado;
- `LessonScreen.jsx` — Aula sem seletor temporário de pilares;
- `SpeakingScreen.jsx` — Conversa, Pronúncia e Imersão dentro de Speaking;
- `FlashcardsScreen.jsx` — Cartas/Flashcards;
- `ProgressScreen.jsx` — Progresso;
- `SettingsScreen.jsx` — Ajustes/Configurações.

O que foi limpo no LAB-10:
- removido `PREVIEW_VERSION` de `App.jsx`;
- removido o `<footer className="preview-version-footer">` que ainda existia escondido por CSS;
- nova varredura feita por termos temporários principais:
  - `rewrite-clean-lab`;
  - `Fluency Clean Lab`;
  - `Vercel lab`;
  - `Lab preview`;
  - `Ver UI por pilar`;
  - `Preview seguro`;
  - `layout-preview`;
  - `preview-version-footer`;
- resultado da varredura: sem resultados.

Limites intencionais:
- diagnóstico lateral foi mantido porque ainda é útil para testes reais;
- não houve alteração em backend, Azure, Firebase, Gemini, HTML ou bundle;
- não houve integração das chaves gerais de IA com Speaking/Imersão ainda;
- não houve reestruturação profunda do conteúdo pedagógico das aulas ainda.

## Próximo bloco correto

### Se LAB-10 for aprovado no Vercel/iPhone
Próximo: `Bloco 8-LAB — reestruturação profunda das aulas/conteúdo pedagógico`.

Objetivo do Bloco 8-LAB:
- mexer na profundidade pedagógica das aulas;
- organizar os tipos de aula gerados por IA;
- melhorar renderização do conteúdo real da aula;
- manter o sistema modular em `fluency-clean/src/`;
- não mexer em backend Azure privado sem necessidade.

### Se LAB-10 tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema visual encontrado na branch lab.

## Checklist manual para o usuário no Vercel/iPhone

1. Abrir **Hoje** e confirmar rolagem, cards e gerador de aula recolhido.
2. Abrir **Aula** e confirmar que não existe mais seletor temporário de pilares.
3. Abrir **Speaking** e testar os três modos: Conversa, Pronúncia e Imersão.
4. Abrir **Cartas** e virar a carta.
5. Abrir **Progresso** e rolar até o final.
6. Abrir **Ajustes** e testar categorias + Chaves de aulas/IA geral.
7. Tocar no diagnóstico lateral e fechar.
8. Confirmar que não há tela branca nem texto técnico visível.

## Ordem restante dos blocos

1. `Bloco 8-LAB` — reestruturação profunda das aulas.
2. Checklist funcional real: login, áudio, Azure, Gemini, geração/conclusão de aula e persistência.
3. Só depois, considerar promoção/merge para branch estável, se o usuário pedir explicitamente.

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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. Speaking, Hoje, Navbar, Aula, Cartas, Progresso, Ajustes e Imersão estão aprovados/organizados. O `LAB-10` fez o checklist final visual e removeu o rodapé lab escondido; está aguardando aprovação. Próximo bloco correto depois da aprovação é `Bloco 8-LAB — reestruturação profunda das aulas`. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
