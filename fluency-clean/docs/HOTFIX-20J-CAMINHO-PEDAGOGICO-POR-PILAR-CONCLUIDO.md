# HOTFIX 20J — Caminho pedagógico por pilar

Branch: `rewrite-fluency-clean-lab`

## Problema reportado

Durante o QA por preview no iPhone, o usuário identificou problemas reais de caminho pedagógico:

1. Reading mostrava perguntas/prática antes do texto principal.
2. Speaking mostrava `Repita comigo`, mas em seguida pedia resposta escrita como se fosse quiz.
3. Speaking não tinha opção clara de ouvir áudio/frase-modelo.
4. As abas pareciam não ter um caminho certo, porque um bloco genérico entrava antes da hora em vários pilares.

## Causa

O renderizador possuía um bloco genérico de explicação/prática inicial usado em vários pilares.

Esse bloco funcionava para Grammar, mas atrapalhava Reading, Listening, Speaking e Writing, porque antecipava tarefas antes do insumo principal da aula.

## Arquivo alterado

- `fluency-clean/src/lessons/static/StaticLessonRenderer.jsx`

## Correções aplicadas

### 1. Core genérico limitado

Criado `CoreExplanation` com opção `includeGuided`.

Agora a prática guiada inicial só entra quando fizer sentido, especialmente em Grammar.

### 2. Reading corrigido

Reading agora segue caminho próprio:

1. objetivo de leitura;
2. vocabulário antes do texto;
3. estratégia de leitura;
4. texto principal;
5. primeira leitura;
6. segunda leitura;
7. perguntas com evidência;
8. vocabulário pelo contexto;
9. resumo e produção.

O bloco `Pratique comigo antes do quiz` não deve mais aparecer antes do texto em Reading.

### 3. Speaking refeito

Speaking agora tem caminho próprio:

1. situação de fala;
2. frases-modelo com botão de ouvir;
3. pronúncia e chunks com botão de ouvir;
4. repita comigo com ouvir + marcar como praticado;
5. substitution drills como fala;
6. pergunta e resposta oral;
7. fala guiada;
8. gravação guiada;
9. checklist de fala;
10. fala livre curta.

### 4. Novo componente `ListenRepeatList`

Criado para atividades de fala que não devem ser escrita.

Usado em:

- frases-modelo;
- pronúncia/chunks;
- repita comigo;
- substitution drills;
- shadowing em Listening.

Ele mostra:

- botão `Ouvir`;
- botão `Já repeti em voz alta`;
- feedback de prática registrada.

### 5. Áudio gratuito pelo navegador

Adicionada função `speakText(text)` usando:

- `window.speechSynthesis`;
- `SpeechSynthesisUtterance`;
- idioma `en-US`;
- velocidade reduzida para clareza.

Isso cria opção gratuita de ouvir frases sem Azure/Gemini/serviço pago.

### 6. SpeakingAttemptList melhorado

Agora cada tarefa oral também mostra:

- botão `Ouvir modelo`;
- botão `Falar agora` via `SpeakExercise`;
- campo fallback apenas se o microfone falhar ou o usuário quiser registrar o que falou.

### 7. Listening ajustado

Shadowing agora usa `ListenRepeatList`, não apenas cards passivos.

## Resultado esperado

- Reading não deve mais fazer perguntas antes do texto.
- Speaking deve parecer uma aula de fala, não uma aula escrita.
- Repita comigo não deve pedir escrita.
- Deve haver botão para ouvir modelos/frases.
- O caminho por pilar fica mais claro.

## Commit

- `2ab52c6a6bdda6eae1a203f129effbe55e022ac3` — corrige caminho pedagógico por pilar.

## Status

Concluído.
