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

### `BLOCO-GRAMMAR-AULA-PROFUNDA-UI-LAB` — IMPLEMENTADO, aguardando deploy/teste

Contexto:
- Usuário esclareceu que NÃO quer aula curta.
- O problema não era “explicação demais”; era a aula parecer artigo/Wikipedia.
- O bloco anterior tinha compactado demais a explicação, contrariando o objetivo pedagógico.
- A aula deve ser longa, profunda e completa, mas com cara de professor/aula guiada.

Arquivos alterados:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `REWRITE_HANDOFF.md`

O que foi corrigido:
- `GrammarLesson.jsx`:
  - removeu compactação artificial para 3 frases;
  - preserva conteúdo profundo completo vindo da IA;
  - transforma trechos com numeração `1. 2. 3.` em listas visuais bonitas;
  - separa exemplos em bloco próprio `Exemplos do professor`;
  - muda rótulos para `Grammar profunda`, `Aula guiada do professor`, `Momento 1/2/3`;
  - mantém Prática Profunda separada, sem exercícios duplicados dentro da explicação;
  - Produção própria agora pede 3 a 6 frases reais do aluno.
- `LessonScreen.jsx`:
  - ajusta estimativa de tempo para Grammar profunda;
  - considera sections/exercises/prompts/vocabulary com peso maior;
  - evita aula Grammar profunda parecer artificialmente curta como 15/17 min.

Commits:
- `0bc3c54f47fa0b9ca27bdee516e8defa93b516ec` — transforma gramática em aula profunda guiada;
- `b64bba24b0c1321401d2a2fe72713a34f6d66353` — ajusta tempo estimado para gramática profunda.

Teste recomendado no iPhone:
1. abrir a aula Grammar atual;
2. confirmar que o conteúdo continua profundo, não resumido;
3. confirmar que partes numeradas não aparecem como texto corrido cheio de `1. 2. 3.`;
4. confirmar que exemplos aparecem destacados;
5. confirmar que os exercícios não aparecem fora da Prática Profunda;
6. abrir Prática Profunda e confirmar que questões não mudam sozinhas;
7. confirmar que tempo estimado da Grammar ficou mais realista.

Pendência pedagógica ainda aberta:
- ajustar a origem/prompt da IA para Grammar já nascer no formato de aula profunda, com campos melhores, e não depender só da renderização.
- Próximo bloco sugerido: `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB`.

## Blocos recentes implementados

### `BLOCO-HOTFIX-GRAMMAR-PRATICA-ESTAVEL-LAB` — IMPLEMENTADO
- Removidos exercícios estáticos da Grammar.
- `PracticeFullscreen` congela as questões por sessão.

### `BLOCO-HOTFIX-PERSISTENCIA-VERIFICADA-AULA-LAB` — IMPLEMENTADO
- `saveCurrentLesson()` só grava status `saved` depois de confirmar que `lesson.current` realmente foi persistido.
- Se falhar, limpa histórico e tenta versão compacta.

### `BLOCO-HOTFIX-CLOUD-SYNC-AULA-SEGURA-LAB` — IMPLEMENTADO
- Cloud Sync sincroniza `lesson.lastGenerationStatus`.
- Preserva aula local mais recente.
- Mescla histórico local + nuvem.

## META OFICIAL — CARTAS / VOCABULÁRIO

A aba Cartas deve substituir o uso do Duolingo para vocabulário, frases, chunks, tradução, listening, speaking, stories, revisão e domínio.

Meta planejada:

`5.000 palavras/expressões + 2.500 frases/chunks = 7.500 itens treináveis`

## NOVA ORDEM DE BLOCOS

1. `BLOCO-GRAMMAR-AULA-PROFUNDA-UI-LAB` — STATUS: implementado, aguardando teste.
2. `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB` — ajustar prompt/contrato para Grammar já nascer como aula profunda, não artigo.
3. `BLOCO-CARTAS-PAREAMENTO-10-LAB` — pareamento palavra ↔ tradução.
4. `BLOCO-CARTAS-PAREAMENTO-IMAGEM-10B-LAB` — pareamento palavra ↔ imagem.
5. `BLOCO-CARTAS-SIGNIFICADO-10C-LAB` — escolha de significado refinada.
6. `BLOCO-CARTAS-TRADUCAO-GUIADA-11-LAB` — tradução com banco de palavras.
7. `BLOCO-CARTAS-GLOSS-INLINE-12-LAB` — clicar na palavra e ver tradução dentro das frases.
8. `BLOCO-CARTAS-LISTENING-ATIVO-13-LAB` — digite o que ouve.
9. `BLOCO-CARTAS-SPEAKING-14-LAB` — repetir frase.
10. `BLOCO-CARTAS-STORIES-15-LAB` — mini-histórias.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O bloco atual implementado foi `BLOCO-GRAMMAR-AULA-PROFUNDA-UI-LAB`: Grammar preserva aula profunda, transforma numeração em listas e exemplos em blocos de professor; tempo estimado de Grammar foi ajustado. Testar no iPhone. Se ok, seguir para `BLOCO-GRAMMAR-CONTRATO-AULA-PROFUNDA-LAB`, depois voltar para Cartas."
