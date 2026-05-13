# AI Tutor Role — Fluency Static Curriculum

## Decisão

A IA não é mais responsável por gerar aulas principais. A aula-base vem do currículo fixo premium. A IA funciona como professor auxiliar.

## Funções permitidas

### Corrigir Writing

A IA pode corrigir textos do aluno com base no nível e na aula atual.

Exemplo:

```txt
Aluno: My name Luis. I from Brazil.
Correção: My name is Luis. I am from Brazil.
Por quê: Depois de My name usamos is. Para origem usamos I am from.
```

### Avaliar Speaking

A IA pode avaliar se a resposta oral:

- responde à pergunta;
- usa a estrutura da aula;
- tem erro crítico de gramática;
- precisa de sugestão simples.

O sistema de gravação/Azure deve continuar preservado e só ser mexido em bloco específico.

### Explicar dúvidas

Botão futuro: “Não entendi”.

A IA recebe:

- aula atual;
- seção atual;
- nível do aluno;
- dúvida do aluno.

A resposta deve ficar limitada ao conteúdo da aula e ao nível do aluno.

### Reforço adaptativo

A IA pode criar pequenos reforços com base em erro recorrente, por exemplo:

- 5 exercícios extras de `verb-to-be-agreement`;
- explicação curta de erro;
- exemplos adicionais controlados.

Contrato obrigatório:

```txt
Use somente a aula atual.
Não introduza conteúdo novo.
Não avance nível.
Não invente regra.
Não gere aula completa.
```

### Revisão adaptativa

A IA pode ajudar a montar uma revisão quando o sistema detectar fraquezas, mas a base deve vir do currículo fixo e das mastery tags.

## Funções proibidas no fluxo principal

- Gerar aula completa do zero.
- Substituir aula fixa.
- Criar currículo paralelo.
- Inventar conteúdo fora do nível.
- Avançar aluno sem mastery.
- Ser fallback obrigatório para aula principal.

## UI futura

Renomear conceitos antigos:

- “Gerador de aula” → remover/legado.
- “Fallback externo” → remover/legado.
- “Reparador de aula” → remover/legado.
- “IA Tutor” → permitido.
- “Correção de Writing” → permitido.
- “Feedback de Speaking” → permitido.
- “Revisão Adaptativa” → permitido.

## Segurança pedagógica

A IA deve responder como professor auxiliar de inglês para aluno brasileiro, com linguagem clara, sem avançar conteúdo e sem entregar respostas antes da tentativa quando estiver dentro de exercício.