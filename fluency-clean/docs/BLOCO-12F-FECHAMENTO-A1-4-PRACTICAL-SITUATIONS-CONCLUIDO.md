# BLOCO 12F — Fechamento leve do A1.4 Practical Situations

Branch: `rewrite-fluency-clean-lab`

## Objetivo

Fechar o pacote `A1.4 Practical situations` com uma checagem leve de conexão/imports e registrar a transição para o próximo pacote.

O usuário pediu para não fazer auditoria pesada neste momento e continuar focado na geração/continuidade das aulas profundas.

## Checagem feita

Arquivo conferido:

- `fluency-clean/src/content/curriculum/staticLessonContent.js`

## Pacotes A1.4 conectados

O arquivo está importando e conectando as cinco partes criadas:

1. `deepPracticalSituations.js`
   - Food and ordering

2. `deepPracticalSituationsPlaces.js`
   - Places and directions

3. `deepPracticalSituationsHouse.js`
   - House and furniture

4. `deepPracticalSituationsWeatherClothes.js`
   - Clothes, weather and feelings

5. `deepPracticalSituationsHelp.js`
   - Help, common verbs and object pronouns

## Conexões confirmadas

As cinco partes aparecem em:

- imports do `staticLessonContent.js`;
- `STATIC_READY_LESSONS`;
- `STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR`;
- `mergePillarLessons()`.

## Conteúdo coberto no A1.4

### Parte 1

- food and ordering;
- `Can I have...?`;
- café/menu;
- pedidos simples.

### Parte 2

- places in town;
- localização;
- direções simples;
- `Where is the...?`.

### Parte 3

- house and furniture;
- cômodos;
- descrição de quarto/casa;
- `there is / there are` aplicado.

### Parte 4

- clothes;
- weather;
- feelings;
- `wear`;
- `and / but / because`.

### Parte 5

- object pronouns;
- common verbs;
- pedir ajuda;
- pedir repetição;
- instruções práticas.

## Observações importantes

- A auditoria foi leve, não profunda.
- Não foi criada aula nova neste bloco.
- O objetivo foi confirmar que o pacote A1.4 está conectado para seguir o cronograma.
- Ainda pode ser necessário validar build/schema no Vercel e corrigir erros caso o deploy falhe.

## Próximo pacote correto

`A1.5 Reviews and checkpoints`

## Próximo bloco recomendado

`BLOCO 13A — A1.5 Reviews and checkpoints — Grammar/Vocabulary Review`

Objetivo sugerido:

- criar revisão de Grammar A1 parte 1/2;
- criar revisão de Vocabulary A1;
- preparar checkpoints sem misturar com conteúdo novo;
- manter UX limpa e sem informações técnicas na tela do aluno.

## Commit

- Este documento registra o fechamento leve do A1.4 e prepara a transição para A1.5.
