# BLOCO 13D — A1.5 Reviews and checkpoints — Fechamento/ordem dos checkpoints

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote `A1.5 Reviews and checkpoints` com uma checagem leve da ordem das revisões e dos checkpoints já existentes.

Este bloco não cria aula nova e não altera a lógica do aluno. O objetivo é registrar a ordem final esperada antes da auditoria final leve do A1.

## Arquivos conferidos

- `fluency-clean/src/content/curriculum/levels/A1/checkpoints.js`
- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Checkpoints existentes confirmados

O arquivo `checkpoints.js` já possui os checkpoints oficiais A1:

1. `A1-CHECKPOINT-GRAMMAR` — Grammar A1 Checkpoint
2. `A1-CHECKPOINT-VOCABULARY` — Vocabulary A1 Checkpoint
3. `A1-CHECKPOINT-READING` — Reading A1 Checkpoint
4. `A1-CHECKPOINT-LISTENING` — Listening A1 Checkpoint
5. `A1-CHECKPOINT-SPEAKING` — Speaking A1 Checkpoint
6. `A1-CHECKPOINT-WRITING` — Writing A1 Checkpoint
7. `A1-CHECKPOINT-FINAL` — Final A1 Checkpoint

## Revisões profundas A1.5 criadas antes dos checkpoints

### BLOCO 13A

- `A1-GRAMMAR-025` — Review Grammar A1 part 1
- `A1-GRAMMAR-026` — Review Grammar A1 part 2
- `A1-VOCABULARY-020` — Review Vocabulary A1

### BLOCO 13B

- `A1-READING-019` — Reading Review A1
- `A1-LISTENING-017` — Listening Review A1

### BLOCO 13C

- `A1-SPEAKING-017` — Speaking Review A1
- `A1-WRITING-015` — Writing Review A1

## Ordem pedagógica esperada no A1.5

A ordem final esperada para o aluno no pacote `A1.5 Reviews and checkpoints` é:

1. Review Grammar A1 part 1
2. Review Grammar A1 part 2
3. Grammar A1 Checkpoint
4. Review Vocabulary A1
5. Vocabulary A1 Checkpoint
6. Reading Review A1
7. Reading A1 Checkpoint
8. Listening Review A1
9. Listening A1 Checkpoint
10. Speaking Review A1
11. Speaking A1 Checkpoint
12. Writing Review A1
13. Writing A1 Checkpoint
14. Final A1 Checkpoint

## Observação importante sobre cronograma semanal

Mesmo com essa ordem pedagógica, a abertura real continua respeitando o cronograma semanal por pilar:

- Segunda: Grammar
- Terça: Vocabulary
- Quarta: Reading
- Quinta: Listening
- Sexta: Speaking
- Sábado: Writing
- Domingo: descanso

Ou seja, a ordem do conteúdo precisa ser respeitada dentro de cada pilar e pelo controle de progressão. O aluno não deve escolher manualmente os checkpoints fora da hora.

## Conexão no currículo

`staticLessonContent.js` já possui:

- revisões A1.5 de Grammar/Vocabulary;
- revisões A1.5 de Reading/Listening;
- revisões A1.5 de Speaking/Writing;
- checkpoints A1 oficiais em `checkpoint`.

## Resultado

O pacote `A1.5 Reviews and checkpoints` está conceitualmente fechado para a fase atual.

Ainda é recomendado fazer uma auditoria final leve do A1 antes de avançar para A2, verificando:

- imports quebrados;
- ids duplicados;
- aulas `ready` conectadas;
- ordem por pilar;
- se os checkpoints continuam aparecendo após as revisões;
- se o build do Vercel fica READY.

## Próximo bloco correto

`BLOCO 13E — Auditoria final leve do A1 antes do A2`

Objetivo recomendado:

- checar conexão básica do A1 completo;
- não criar conteúdo novo;
- corrigir apenas erro evidente de import/schema;
- preparar transição para criação do A2.
