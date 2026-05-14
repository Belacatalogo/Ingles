# BLOCO 11A — A1.3 Daily Routine profundo

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Criar a próxima unidade profunda do A1 mantendo o padrão do curso fixo premium:

- conteúdo fixo e curado;
- explicação profunda;
- exemplos úteis;
- prática guiada;
- exercícios internos;
- integração ao mapa de currículo;
- UX limpa, sem informações técnicas para o aluno;
- sem geração dinâmica de aula principal por IA.

## Validação anterior — Listening A1 Greetings and names

Antes do BLOCO 11A, foi conferido o estado dos hotfixes recentes de Listening.

### Deploy Vercel

Os commits abaixo estavam com deploy `READY` no projeto `ingles` do Vercel:

- `b3b61fe0d17020e68fd852472f6ac576f970cf59` — `fix: cria renderer listening com fluxo correto`.
- `1eb616242cdc54008c6c4add3f76b46f5b60bd10` — `fix: usa fluxo interativo correto no listening`.

### Conferências no código

Arquivos conferidos:

- `fluency-clean/src/lessons/static/ListeningInteractiveLesson.jsx`
- `fluency-clean/src/components/lesson/ListeningShadowingPractice.jsx`
- `fluency-clean/src/components/lesson/ListeningMiniDialoguePractice.jsx`
- `fluency-clean/src/screens/LessonScreen.jsx`

Resultado técnico:

- Shadowing aparece dentro do renderer Listening antes de dictation/compreensão.
- Mini diálogo aparece depois de compreensão auditiva e antes de revisão final.
- O textarea do mini diálogo usa placeholder limpo, sem exemplos dentro do campo.
- `LessonScreen.jsx` não monta `PracticeMount` externo para Listening, evitando duplicidade de Shadowing/Mini diálogo.
- O renderer Listening usa helpers de normalização textual para evitar `[object Object]`.
- Primeira e segunda escuta são exibidas como tarefas; gabaritos de quizzes continuam ocultos até tentativa quando passam pelo `QuizList`.

Observação: a validação foi por leitura de código e status Vercel. Não foi feita navegação manual visual autenticada na tela do aluno.

## Implementação do BLOCO 11A

Arquivo criado:

- `fluency-clean/src/content/curriculum/levels/A1/deepDailyRoutine.js`

Arquivo atualizado:

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Aulas criadas

Foram adicionadas 6 aulas profundas da unidade `A1.3 Daily routine`:

1. `A1-GRAMMAR-014` — Present Simple — I / you / we / they
2. `A1-VOCABULARY-012` — Daily routine verbs
3. `A1-READING-005` — A daily routine
4. `A1-LISTENING-007` — Daily routine
5. `A1-SPEAKING-011` — Talk about your routine
6. `A1-WRITING-006` — Write about your routine

## Conteúdo pedagógico incluído

Cada aula segue o padrão profundo já usado nas unidades anteriores:

- abertura do professor;
- por que importa;
- casos reais de uso;
- explicação conceitual;
- modelo mental;
- passo a passo;
- contraste com português;
- descoberta guiada;
- prática antes do quiz;
- exercícios internos;
- produção final;
- autoavaliação;
- recap;
- ponte para próxima aula.

### Destaques por pilar

Grammar:

- present simple para `I / you / we / they`;
- verbo base sem `-s`;
- erros comuns brasileiros: `I works`, `We studies`, `They goes`;
- produção de frases de rotina.

Vocabulary:

- chunks de rotina: `wake up`, `have breakfast`, `go to work`, `study English`, `go home`, `go to bed`;
- confusões: `have breakfast`, `go home`, `go to bed`;
- prática de reconhecimento, uso e produção.

Reading:

- texto A1 sobre rotina diária;
- perguntas com evidência;
- horários com `at`;
- sequência do dia.

Listening:

- script de rotina diária;
- primeira escuta sem transcript;
- segunda escuta com horários e ações;
- transcript;
- shadowing;
- dictation;
- compreensão auditiva;
- mini produção oral.

Speaking:

- modelos de fala sobre rotina;
- substitution drills;
- question-answer drills;
- gravação de 30 segundos;
- checklist de fala.

Writing:

- modelo de parágrafo sobre rotina;
- breakdown por blocos;
- guided substitution;
- erros comuns;
- checklist;
- draft e versão final.

## Integração ao curso fixo

`staticLessonContent.js` agora importa:

- `A1_DEEP_DAILY_ROUTINE`
- `A1_DEEP_DAILY_ROUTINE_BY_PILLAR`

E inclui a unidade em:

- `STATIC_READY_LESSONS`
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`

Como os IDs escolhidos batem com o mapa oficial em `a1Map.js`, essas aulas passam a substituir os itens planejados correspondentes como aulas `ready` no currículo A1.

## Regras respeitadas

- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não usou DOM injection.
- Não criou bundle patch.
- Não ativou Firebase real.
- Não ativou Azure produção.
- Não adicionou credenciais/secrets.
- Não colocou textos técnicos na tela do aluno.
- Conteúdo ficou modular em arquivo próprio de currículo.

## Commits do bloco

- `8f01befe1024ac5e82984ee47360ff78ce5d75e1` — cria conteúdo profundo A1.3.
- `7d55dabb1fa5d7946b36918d19b70792ec10789e` — conecta A1.3 ao curso fixo.

O registro em docs foi feito em commit separado por limitação operacional das chamadas de arquivo.

## Próximos passos recomendados

1. Verificar deploy Vercel dos commits do BLOCO 11A.
2. Validar visualmente no app:
   - se A1.3 aparece como aula pronta nos pilares;
   - se cada aula abre sem erro de renderização;
   - se Listening A1.3 mantém ordem correta do renderer próprio;
   - se não aparece `[object Object]`;
   - se não há texto técnico na UI.
3. Rodar/validar o validador de aulas fixas, quando disponível no ambiente local.
4. Próximo bloco possível: validação visual A1.3 + eventuais hotfixes pequenos, ou continuar próxima unidade A1.4 apenas depois da validação.
