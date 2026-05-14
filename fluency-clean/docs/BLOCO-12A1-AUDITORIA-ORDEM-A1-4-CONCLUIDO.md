# BLOCO 12A1 — Auditoria de ordem A1.4

Branch: `rewrite-fluency-clean-lab`

## Motivo

Após a criação do BLOCO 12A, foi levantada uma dúvida importante:

- o cronograma de blocos está alinhado com o cronograma real das aulas?
- as aulas aparecerão na hora certa?
- existe conteúdo inútil ou fora de ordem?

A resposta exigiu uma auditoria rápida do mapa A1.

## Problema encontrado

O conteúdo criado no BLOCO 12A estava correto pedagogicamente para o pacote:

- `A1.4 Practical situations`

Porém, alguns ranges do mapa A1 ainda classificavam conteúdos como:

- `Food and drinks`
- `A café menu`
- `Ordering food`
- `Write a simple message`

em pacotes anteriores, especialmente `routinePresent`, dependendo do pilar.

Isso poderia gerar desalinhamento visual/conceitual no mapa do curso.

## Correção feita

Arquivo alterado:

- `fluency-clean/src/content/curriculum/a1Map.js`

Foram ajustados os ranges de pacote por pilar para alinhar com o cronograma real dos pacotes:

### Vocabulary

Antes:

- itens 11–14 caíam em `routinePresent`.

Depois:

- itens 11–12 = `routinePresent`;
- itens 13–19 = `practicalSituations`.

Assim:

- `Food and drinks`
- `Places in town`
- `House and furniture`
- `Clothes`
- `Weather`
- `Basic feelings`
- `Common verbs`

ficam em A1.4.

### Reading

Depois:

- itens 1–3 = `foundations`;
- item 4 = `familyDescription`;
- itens 5–7 = `routinePresent`;
- itens 8–18 = `practicalSituations`.

Assim `A café menu` entra corretamente no A1.4.

### Listening

Depois:

- itens 1–4 = `foundations`;
- itens 5–6 = `familyDescription`;
- itens 7–8 = `routinePresent`;
- itens 9–16 = `practicalSituations`.

Assim `Ordering food` entra corretamente no A1.4.

### Writing

Depois:

- itens 1–3 = `foundations`;
- itens 4–5 = `familyDescription`;
- itens 6–7 = `routinePresent`;
- itens 8–14 = `practicalSituations`.

Assim `Write a simple message` entra corretamente no A1.4.

## Resultado

O conteúdo do BLOCO 12A não é inútil.

Ele foi criado no pacote correto e agora o mapa também reflete isso.

A ordem real continua sendo controlada por:

- pilar do dia;
- pré-requisitos;
- status `ready`;
- limite de 1 aula por dia;
- domingo descanso.

## Commits relacionados

- `137f4e16718bac76ff032064a97c3d1b3ef89a97` — alinha pacotes A1.4 no mapa.
- `c3ac96b077d471d75bdeec6c4e60b286813262f6` — corrige ranges de pacotes A1 no mapa.

## Próximo bloco correto

Continuar com:

- `BLOCO 12B — A1.4 Practical Situations — Parte 2`

Tema recomendado:

- lugares na cidade;
- localização;
- pedir/entender onde algo fica;
- direções simples;
- prepositions of place conectadas a situação prática.
