# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## OBJETIVO PEDAGÓGICO FINAL

`diagnosticar → ensinar → praticar → corrigir → revisar → testar → só então avançar`

Princípio máximo:

`o aluno só avança quando prova domínio, não apenas quando conclui uma aula.`

## BLOCO ATUAL

### `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Persistência da aula nova funcionou.
- A aula Grammar abriu corretamente.
- Porém foram detectados 3 problemas:
  1. exercícios apareciam fora da `Prática Profunda`;
  2. questões dentro da prática mudavam a cada segundo/render;
  3. conteúdo de gramática parecia artigo/Wikipedia, com blocos longos.

Arquivos alterados:
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- `PracticeFullscreen.jsx`:
  - removeu `useMemo(buildPracticeItems(...))` recalculando direto em render;
  - agora cria `sessionItems` ao abrir a prática;
  - as questões ficam congeladas durante a sessão;
  - ao reiniciar, monta uma nova sessão controlada;
  - evita troca de alternativas/perguntas a cada render.
- `GrammarLesson.jsx`:
  - removeu a seção estática de exercícios dentro da aula;
  - os exercícios interativos ficam apenas no botão/tela cheia `Prática Profunda`;
  - mantém `Produção própria` como etapa final escrita;
  - compacta cada seção da explicação para até 3 frases;
  - limita a explicação a 7 partes;
  - altera o texto para orientar estudo guiado, não artigo longo.

Commits:
- `08b4c3c51541b22f44d7dc922a281b298b5eaac5` — congela questões da prática fullscreen por sessão;
- `fc59ca714cd249824e66d79337e059e968d65095` — remove exercícios estáticos da aula de gramática.

Teste recomendado no iPhone:
1. abrir a aula Grammar atual;
2. confirmar que não há lista grande de exercícios fora da Prática Profunda;
3. tocar em `Começar prática`;
4. confirmar que a questão 1 não muda sozinha;
5. marcar uma alternativa e aguardar alguns segundos;
6. confirmar que as opções não mudam de posição;
7. sair e entrar novamente na prática para confirmar que a sessão reinicia de forma limpa;
8. observar se a explicação de Grammar ficou mais curta e guiada.

Pendência pedagógica ainda aberta:
- a origem da aula gerada ainda pode produzir conteúdo com tom de artigo;
- este bloco compacta a renderização, mas o próximo bloco de qualidade deve ajustar o prompt/contrato da aula Grammar para exigir:
  - explicação curta;
  - exemplos claros;
  - erro comum;
  - mini-prática guiada;
  - produção própria;
  - nada de texto enciclopédico.

## Blocos recentes implementados

### `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — IMPLEMENTADO
- `saveCurrentLesson()` só grava status `saved` depois de confirmar que `lesson.current` realmente foi persistido.
- Se falhar, limpa histórico e tenta versão compacta.

### `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB` — IMPLEMENTADO
- Cloud Sync sincroniza `lesson.lastGenerationStatus`.
- Preserva aula local mais recente.
- Mescla histórico local + nuvem.

### `BLOCO-HOTFIX-DIAGNOSTICO-STORAGE-AULA-LAB` — IMPLEMENTADO
- Criado `lessonStorageDebug.js`.
- Diagnóstico mostra `lesson.current`, `lesson.history[0]` e `lesson.lastGenerationStatus`.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB` — STATUS: implementado, aguardando teste.
2. `BLOCO-GRAMMAR-CONTRATO-AULA-GUIADA-LAB` — ajustar prompt/contrato para Grammar não gerar texto enciclopédico.
3. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
9. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
10. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB`: exercícios estáticos removidos da Grammar e `PracticeFullscreen` congela as questões por sessão. Testar no iPhone. Se ok, seguir para `BLOCO-GRAMMAR-CONTRATO-AULA-GUIADA-LAB`, depois voltar para Cartas."
