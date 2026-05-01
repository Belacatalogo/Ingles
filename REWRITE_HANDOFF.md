# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## PROTOCOLO ECONÔMICO DE DEPLOY — OBRIGATÓRIO

Regra operacional:
1. Cada bloco deve virar **1 commit único**, sempre que possível.
2. Não fazer vários commits pequenos para o mesmo bloco.
3. Atualizar `REWRITE_HANDOFF.md` junto com o bloco, no mesmo commit.
4. Fluxo ideal: **1 bloco → 1 commit → 1 deploy → teste no iPhone**.
5. Se a Vercel bloquear novamente, parar commits e aguardar liberação.

Observação: neste bloco o conector do GitHub aceitou apenas arquivos/atualizações separadas via Contents API, então o bloco ficou em múltiplos commits pequenos. Não houve alteração em `main`, `bundle.js` ou backend Azure privado.

## Estado atual implementado

### HOTFIX QUIZ FULLSCREEN — Polimento sem scroll IMPLEMENTADO, aguardando teste

Contexto:
- usuário testou a tela fullscreen e informou que a página estava rolando para cima/baixo sem ter conteúdo;
- botão inferior estava cobrindo opções;
- alternativas grandes demais ficavam cortadas/baixo da tela;
- faltava polimento de qualidade visual.

Arquivo alterado:
- `fluency-clean/src/styles/practice-fullscreen.css`

Correção aplicada:
- `.practice-fullscreen` agora usa `height: 100dvh`, `max-height: 100dvh`, `overflow: hidden` e `overscroll-behavior: none`;
- layout virou grid fixo: topo, conteúdo e rodapé;
- área da questão não deve mais criar scroll solto;
- altura dos cards de alternativa foi reduzida e limitada com `clamp()`;
- fonte das alternativas foi reduzida para caber melhor no iPhone;
- botão/rodapé inferior ficou menor e com sombra controlada;
- ajustes extras para telas baixas com `@media (max-height: 720px)`;
- objetivo: caber a questão, opções e botão em uma tela sem rolagem vertical desnecessária.

Teste recomendado:
1. aguardar deploy Ready;
2. abrir prática fullscreen no iPhone;
3. confirmar que a tela não rola para cima/baixo;
4. confirmar que o botão `Verificar` não cobre alternativas;
5. testar questão com 4 alternativas longas;
6. testar ditado, word bank e complete lacuna.

### BLOCO-QUIZ-FULLSCREEN-LAB — Prática profunda fullscreen por tipo de aula IMPLEMENTADO PARCIALMENTE

Objetivo:
- substituir a prática pesada dentro da aula por uma experiência fullscreen inspirada no fluxo de apps de idiomas;
- manter UI própria do Fluency, sem copiar assets/logos/personagens;
- treinar mais o conteúdo da aula, sem limitar a exatamente 7 exercícios;
- evitar gambiarra: prática agora tem módulo próprio em `src/practice/`.

Arquivos criados:
- `fluency-clean/src/practice/PracticeEngine.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/practice/PracticeLauncher.jsx`
- `fluency-clean/src/styles/practice-fullscreen.css`

Arquivos alterados:
- `fluency-clean/src/main.jsx`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

O que foi feito:
- criado motor modular de prática profunda em `PracticeEngine.js`;
- criado launcher reutilizável `PracticeLauncher`;
- criado fullscreen `PracticeFullscreen` com X, barra de progresso, uma questão por vez, feedback e continuação;
- CSS fullscreen importado no bootstrap principal;
- `LessonScreen.jsx` agora renderiza `PracticeLauncher` no nível da tela da aula;
- prática antiga embutida no `ListeningLesson.jsx` foi ocultada via hotfix CSS para não sobrepor a prática nova enquanto a limpeza estrutural do JSX não é concluída;
- tipos suportados no motor: múltipla escolha, escuta e escolha, ditado, banco de palavras, complete lacuna, correção de frase e fala;
- quantidade de exercícios é variável, alvo entre 14 e 36 conforme conteúdo da aula;
- alternativas ruins/curtas são filtradas;
- respostas escritas usam normalização para ignorar pontuação, maiúsculas, acentos e espaços;
- erros pequenos liberam tentativa extra e dica de palavra.

Pendência técnica importante:
- limpar estruturalmente `ListeningLesson.jsx`, removendo a prática antiga do JSX e o rascunho antigo de forma definitiva;
- no momento a prática antiga está apenas oculta por CSS para evitar sobreposição;
- depois de validar deploy, fazer um hotfix limpo no JSX do Listening para remover código morto e manter apenas `PracticeLauncher`/finalização.

## Próximo passo imediato

Validar build/deploy. Se quebrar, corrigir apenas build. Se funcionar, testar no iPhone e depois fazer limpeza estrutural do `ListeningLesson.jsx` para remover a prática antiga e rascunho visual de vez.

## Próximos blocos depois desta validação

1. Limpeza estrutural do `ListeningLesson.jsx` após fullscreen validado.
2. Aplicar `PracticeLauncher` também nos fluxos de Grammar/Reading/Writing/Speaking quando necessário.
3. `BLOCO-12-LAB` — Rubricas por tipo de aula.
4. `BLOCO-14-LAB` — Contrato JSON rígido.
5. `BLOCO-11-LAB` — Plano primeiro, aula depois.
6. `BLOCO-13-LAB` — Professor Gerador/Revisor.
7. `BLOCO-17-LAB` — Qualidade visível da aula.
8. `BLOCO-16-LAB` — Histórico real de Speaking.
9. `BLOCO-15-LAB` — Banco de erros real.
10. `BLOCO-20-LAB` — Certificação por nível.
11. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
12. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O BLOCO-QUIZ-FULLSCREEN-LAB foi iniciado com módulo próprio em `src/practice/`, CSS importado e `PracticeLauncher` conectado em `LessonScreen.jsx`. O hotfix de polimento sem scroll do fullscreen foi aplicado em `practice-fullscreen.css`. A prática antiga do `ListeningLesson.jsx` está oculta por CSS, mas ainda precisa ser removida estruturalmente depois da validação. Validar primeiro build/deploy e teste no iPhone. Próximo passo imediato: se o deploy estiver Ready e a prática fullscreen funcionar, limpar `ListeningLesson.jsx` removendo prática antiga/rascunho. Depois seguir para aplicar prática modular aos outros tipos de aula e continuar a ordem: 12, 14, 11, 13, 17, 16, 15, 20, CARTAS-3B e AUDITORIA-POLIMENTO-GERAL."
