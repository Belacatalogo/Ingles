# BLOCO 20E — Listening completo

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir a experiência das aulas de Listening para que o aluno realmente ouça, tente responder e só depois confira o transcript.

Problemas corrigidos:

- primeira e segunda escuta podiam aparecer como cards passivos;
- transcript podia entregar o conteúdo cedo demais;
- dictation precisava continuar com campo real;
- compreensão auditiva precisava ser respondível;
- produção oral curta precisava seguir o fluxo ativo com fala/fallback.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Novo componente interno: `RevealTextCard`

Criado dentro de `StaticLessonRenderer.jsx`.

Função:

- esconder transcript inicialmente;
- mostrar orientação para tentar responder antes;
- liberar transcript apenas quando o aluno toca em `Mostrar transcript`;
- permitir ocultar novamente.

### 2. Deep Listening atualizado

`DeepListeningLesson` agora segue a ordem:

1. Hero da aula;
2. Core flow;
3. Antes de ouvir;
4. Palavras para tentar ouvir;
5. **Primeira escuta sem texto com textarea**;
6. **Segunda escuta com foco com textarea**;
7. Compreensão auditiva respondível;
8. Dictation respondível;
9. Shadowing;
10. **Transcript escondido atrás de botão**;
11. Produção oral curta ativa;
12. Revisão final;
13. Conclusão.

### 3. Primeira escuta agora é ativa

Antes:

- `firstListenTasks` apareciam como cards de instrução.

Agora:

- usa `AttemptList`;
- o aluno precisa anotar o que entendeu;
- o modelo só aparece depois da tentativa, se existir.

### 4. Segunda escuta agora é ativa

Antes:

- `secondListenTasks` também eram cards passivos.

Agora:

- usa `AttemptList`;
- o aluno deve ouvir de novo e responder buscando detalhes.

### 5. Transcript controlado

Antes:

- transcript aparecia diretamente na página.

Agora:

- transcript só aparece ao tocar em `Mostrar transcript`;
- a orientação deixa claro que a escuta e o dictation vêm antes.

### 6. Dictation mantido como exercício real

`dictationTasks` continuam em `QuizList`, com campo/alternativas e feedback após tentativa.

### 7. Listening legado também melhorado

`StaticListeningLesson` agora usa:

- `AttemptList` para primeira escuta;
- `AttemptList` para segunda escuta;
- `QuizList` para compreensão;
- `QuizList` para dictation;
- `RevealTextCard` para transcript.

## Resultado prático

Aula de Listening agora respeita o fluxo correto:

> ouvir primeiro → tentar responder → fazer dictation/compreensão → só depois revelar transcript.

## Escopo intencional

Este bloco focou Listening.

Ainda ficam para os próximos blocos:

- Grammar/Vocabulary e limpeza de campos crus;
- limpeza da interface da aula;
- renderização ponderada final por pilar;
- auditoria iPhone;
- QA final com aulas reais.

## Status

Concluído.

## Próximo bloco

`BLOCO 20F — Grammar/Vocabulary e erro de campos crus`

Foco:

- corrigir exibição de `subject` e campos técnicos;
- deixar Grammar e Vocabulary mais interativos;
- esconder gabaritos/modelos até tentativa;
- evitar objetos crus ou campos inúteis aparecendo para o aluno.

## Commit

- `4fa96bf0c62197372dfce0e0caa406a9273fa5cf` — torna Listening ativo com transcript controlado.
