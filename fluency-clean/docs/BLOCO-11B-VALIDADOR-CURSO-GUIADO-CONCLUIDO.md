# BLOCO 11B — Validador de acesso do curso guiado

Branch: `rewrite-fluency-clean-lab`

## Motivo

Após o hotfix de bloqueio de aulas futuras, ficou claro que o Fluency não pode se comportar como biblioteca aberta. O aluno deve acessar apenas:

- a próxima aula oficial da progressão; ou
- aulas já concluídas, apenas para revisão.

Mesmo que A1.3, A1.4 ou qualquer conteúdo futuro já exista no código, isso não pode liberar acesso antecipado.

## Objetivo do bloco

Criar uma validação local específica para o acesso guiado, separada do validador pedagógico/schema.

O validador deve simular cenários de progresso e confirmar que:

1. sem progresso, apenas a primeira aula oficial fica abrível;
2. com primeira aula concluída, apenas a próxima aula oficial + a concluída para revisão ficam abríveis;
3. com duas aulas concluídas, apenas a próxima aula oficial + concluídas para revisão ficam abríveis;
4. aulas futuras devem permanecer bloqueadas;
5. aulas futuras devem ser tratadas como conteúdo que precisa ficar oculto na UI.

## Arquivo criado

- `fluency-clean/src/content/validators/validateGuidedCourseAccess.js`

## Arquivo atualizado

- `fluency-clean/src/content/validators/index.js`

## Funções criadas

### `validateGuidedCourseAccessScenario()`

Valida um cenário específico de progresso.

Entrada principal:

- `level`
- `completedLessonIds`
- `label`

Saída principal:

- `approved`
- `nextLessonId`
- `openableLessonIds`
- `completedLessonIds`
- `futureLessonIdsThatMustStayHidden`
- `issues`

### `validateGuidedCourseAccess()`

Executa cenários padrão:

- `sem-progresso`
- `primeira-aula-concluida`
- `duas-aulas-concluidas`

E consolida o resultado.

## Regras validadas

Uma aula só é considerada abrível se:

- estiver pronta (`ready` + schema fixo válido);
- for a próxima aula oficial; ou
- já estiver concluída e puder ser reaberta como revisão.

Se uma aula futura aparecer como abrível, o validador retorna erro:

- `guided.future.openable`

Se a próxima aula oficial não abrir, retorna:

- `guided.next.blocked`

Se uma aula já concluída ficar bloqueada para revisão, retorna:

- `guided.completed.blocked`

## Resultado esperado

Esse bloco não altera visual nem libera conteúdo novo. Ele cria uma camada de segurança para impedir regressões futuras quando novas aulas forem adicionadas.

## Próximos passos recomendados

1. Integrar o resultado do validador de acesso ao painel/status interno do curso, sem poluir a tela do aluno com detalhes técnicos.
2. Validar no deploy que o build não quebra.
3. Depois disso, seguir para um bloco de melhoria da progressão guiada visual, se necessário.
4. Só continuar criando A1.4 quando o fluxo de acesso guiado estiver estável.

## Commits

- `81a99cd7c09573a02f250456b2d41738f5ee0e93` — cria validador de acesso guiado.
- `f3ef006154075bbf5c32f016966908a2bb2daae6` — exporta validador.
