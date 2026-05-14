# BLOCO 11E — Aula do dia automática

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário esclareceu a regra principal de UX:

> Não quero ter que ficar escolhendo a aula a cada dia. Quero clicar nas opções de começar aula e o sistema me jogar automaticamente para a aula do dia.

Portanto, o curso não deve funcionar como lista de escolha manual de aulas/pilares. O aluno deve ter uma ação principal: começar aula.

## Objetivo

Transformar o fluxo visual para que Home e CourseScreen funcionem como curso guiado automático:

- aluno clica em `Começar aula`;
- sistema calcula a próxima aula liberada;
- sistema abre a aula automaticamente;
- aulas futuras continuam bloqueadas;
- mapa vira acompanhamento do caminho, não biblioteca de seleção.

## Arquivos alterados

- `fluency-clean/src/screens/CourseScreen.jsx`
- `fluency-clean/src/components/lesson/StaticNextLessonPanel.jsx`

## Mudanças em CourseScreen

A tela do curso foi simplificada:

- removida escolha manual por pilar;
- removida lista clicável de aulas;
- mantida visão de progresso/caminho;
- adicionado botão principal `Começar aula`;
- botão abre `getNextStaticLesson(activeLevel)` automaticamente;
- mensagem explica que o aluno não precisa escolher aula;
- níveis continuam apenas como caminho/estado, com bloqueio de níveis futuros.

Nova mensagem principal:

> Você não precisa escolher aula. Toque em começar e o Fluency abre automaticamente a aula liberada para o seu progresso.

## Mudanças na Home

O painel `StaticNextLessonPanel` foi alinhado:

- botão principal agora é `Começar aula`;
- texto explica que o Fluency abre automaticamente o conteúdo liberado;
- botão secundário virou `Ver caminho`;
- texto reforça que o aluno não precisa escolher pilar ou aula manualmente.

## Regra final do fluxo

- Home: `Começar aula` → abre próxima aula liberada.
- CourseScreen: `Começar aula` → abre próxima aula liberada.
- Mapa/Caminho: serve para acompanhar progresso, não para escolher aula livremente.
- Conteúdo preparado não significa conteúdo liberado.
- Aulas futuras permanecem bloqueadas.
- Aulas concluídas podem ser reabertas futuramente por fluxo de revisão, não como navegação livre principal.

## Commits

- `82e2f6f840187ffd8801ad1a3d514349a070ff56` — transforma mapa em aula do dia guiada.
- `ef39ddf5025bcdf9eca98b79cd8ce3c0979711bb` — padroniza botão começar aula na Home.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - Home mostra `Começar aula`;
   - CourseScreen mostra `Começar aula`;
   - não existe obrigação de escolher pilar/aula;
   - o clique abre automaticamente a próxima aula liberada;
   - conteúdos futuros não aparecem como seleção manual.
3. Se estiver aprovado, seguir para refinamento de revisão/aulas concluídas ou próximo bloco pedagógico.
