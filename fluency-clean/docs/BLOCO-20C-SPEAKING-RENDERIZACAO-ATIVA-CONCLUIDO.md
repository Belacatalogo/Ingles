# BLOCO 20C — Speaking completo

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Corrigir a experiência das aulas de Speaking para que elas deixem de ser cards passivos e passem a exigir produção oral real ou fallback escrito.

Problema reportado pelo usuário:

- não adianta uma aula de Speaking se ela não faz o aluno usar Speaking;
- gravação guiada e fala livre apareciam como cards de leitura;
- no iPhone, é necessário ter fallback caso o microfone/transcrição não esteja disponível.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Componente reaproveitado

- `fluency-clean/src/practice/components/SpeakExercise.jsx`

Esse componente já possui:

- botão `Falar agora`;
- campo fallback `Ou digite o que falou...`.

## Correções aplicadas

### 1. Importação do SpeakExercise

O renderizador estático agora importa:

```js
import { SpeakExercise } from '../../practice/components/SpeakExercise.jsx';
```

### 2. Novo componente interno: SpeakingAttemptList

Criado dentro de `StaticLessonRenderer.jsx`.

Função:

- renderizar tarefas de fala como atividade real;
- mostrar botão `Falar agora`;
- usar reconhecimento de fala quando o navegador suportar;
- manter fallback escrito quando o navegador/iPhone bloquear ou não suportar;
- registrar a tentativa do aluno;
- mostrar feedback simples depois da tentativa.

### 3. Reconhecimento de fala com fallback

`SpeakingAttemptList` tenta usar:

- `window.SpeechRecognition`;
- `window.webkitSpeechRecognition`.

Se não estiver disponível:

- mostra mensagem orientando usar o campo escrito;
- não bloqueia a aula.

### 4. Deep Speaking atualizado

`DeepSpeakingLesson` agora usa `SpeakingAttemptList` em:

- `Fala guiada`;
- `Gravação guiada`;
- `Fala livre curta`.

Antes, esses pontos eram renderizados como cards passivos.

Agora, o aluno precisa:

- falar usando botão quando possível;
- ou digitar o que falou;
- revisar a tentativa registrada.

### 5. Static Speaking legado atualizado

`StaticSpeakingLesson` também foi ajustado:

- `Fala guiada` virou tarefa ativa;
- `Gravação e fala livre` virou tarefa ativa.

### 6. Listening com produção oral curta também melhorado

Como Listening às vezes possui `oralProduction`, essa produção agora também usa `SpeakingAttemptList`, porque é tarefa oral.

## Resultado prático

Aulas de Speaking agora deixam de ser apenas leitura e passam a exigir ação do aluno.

O fluxo passa a ser:

1. entender situação;
2. estudar frases-modelo;
3. praticar chunks/pronúncia;
4. repetir/drills;
5. responder em voz alta;
6. registrar fala via microfone ou texto;
7. revisar resposta;
8. fazer fala livre final.

## Escopo intencional

Este bloco focou Speaking.

Ainda ficam para os próximos blocos:

- Writing com rascunho e versão final dedicados;
- Listening com dictation e compreensão mais interativos;
- Grammar/Vocabulary e limpeza de campos crus;
- limpeza da interface da aula.

## Status

Concluído.

## Próximo bloco

`BLOCO 20D — Writing completo`

Foco:

- rascunho com textarea real;
- versão final com textarea real;
- checklist entre rascunho e versão final;
- modelo esperado só depois da tentativa.

## Commit

- `8efaa8c98413c70f9ca786116025d63c8719e230` — torna Speaking ativo com fala e fallback escrito.
