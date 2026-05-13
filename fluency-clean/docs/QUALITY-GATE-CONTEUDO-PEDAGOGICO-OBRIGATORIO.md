# QUALITY GATE — Conteúdo pedagógico obrigatório

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário deixou claro que não quer continuar abrindo chats todos os dias para corrigir aulas genéricas.

A expectativa correta é:

- o curso deve ficar pronto para usar;
- cada aula deve ensinar de verdade;
- o aluno deve entender o porquê daquilo;
- o aluno deve entender as regras;
- não basta explicar “para que serve”;
- não basta listar erros comuns;
- todas as aulas, sem exceção, devem passar por filtro de qualidade estrutural e de conteúdo.

## Regra máxima

Nenhuma aula pode ser considerada premium apenas porque preencheu campos do schema.

Aula boa não é só estrutura.

Aula boa precisa ter conteúdo pedagógico real.

## O que significa “ensinar de verdade”

Toda aula deve levar o aluno de:

```txt
não sei → entendo o porquê → entendo a regra → vejo em exemplos → pratico guiado → tento sozinho → produzo → reviso
```

Se a aula só mostra frases, exemplos ou exercícios, ela falha.

## Filtro obrigatório de conteúdo

Toda aula `ready` deve passar por estes critérios:

### 1. Explicação causal

A aula deve explicar o porquê, não apenas a função.

Perguntas obrigatórias:

- Por que essa estrutura existe?
- Por que ela é usada assim em inglês?
- O que muda em relação ao português?
- O que acontece se eu usar errado?
- Qual é a lógica por trás da regra?

Exemplo ruim:

> Use he para homem.

Exemplo bom:

> Em inglês, o sujeito quase sempre precisa aparecer. Quando você já sabe que a pessoa é um homem ou menino, usa `he` para evitar repetir o nome. Em português podemos dizer “é meu amigo”, mas em inglês a frase precisa de sujeito: `He is my friend`.

### 2. Regra explícita

A aula deve ensinar a regra com clareza.

Obrigatório:

- fórmula;
- ordem das palavras;
- quando usar;
- quando não usar;
- exceções ou limitações compatíveis com o nível;
- mini tabela quando ajudar.

Exemplo ruim:

> Subject pronouns são I, you, he, she, it, we, they.

Exemplo bom:

> Regra: pronome sujeito vem antes do verbo. Primeiro escolha quem é o sujeito. Depois escolha o verbo que combina com ele. No A1, o padrão mais comum é `subject pronoun + am/is/are + information`.

### 3. Raciocínio passo a passo

A aula deve mostrar como o aluno pensa para chegar na resposta.

Obrigatório:

```txt
1. Identifique a pessoa/coisa.
2. Veja se é singular ou plural.
3. Escolha o pronome.
4. Escolha o verbo.
5. Monte a frase.
6. Revise o erro comum.
```

Cada pilar deve ter seu próprio raciocínio.

### 4. Comparação com português

Obrigatório quando o conteúdo tiver diferença entre inglês e português.

Não basta traduzir.

Precisa explicar:

- o que o brasileiro tende a pensar;
- por que esse pensamento gera erro;
- como pensar em inglês.

### 5. Exemplos comentados

Exemplo sem explicação não conta como exemplo premium.

Cada exemplo importante deve ter:

- frase em inglês;
- tradução;
- por que funciona;
- cuidado/erro possível;
- variação quando útil.

### 6. Exercícios que testam compreensão, não chute

Exercício bom deve testar se o aluno entendeu a regra.

Não basta perguntar com alternativa óbvia.

Cada aula deve misturar:

- reconhecimento;
- lacuna;
- correção de erro;
- transformação;
- tradução controlada;
- produção própria;
- revisão final.

### 7. Produção própria obrigatória

Toda aula precisa fazer o aluno produzir algo.

Sem produção, a aula não prova domínio.

### 8. Revisão final obrigatória

A revisão final deve resumir:

- regra;
- porquê;
- erro comum;
- exemplo seguro;
- próxima ação.

## Frases proibidas ou suspeitas

O filtro de conteúdo deve reprovar ou marcar como suspeita aulas que dependem de frases genéricas como:

- “Nesta aula você vai estudar...”
- “Use X para Y.” sem explicação.
- “Modelo A1 para comparar com português.”
- “Variação simples do mesmo padrão.”
- “Exemplo A1 com vocabulário da unidade.”
- “Escolha a alternativa correta.” sem contexto.
- “Escreva frases próprias.” sem modelo, preparação ou checklist.
- “Pratique o conteúdo.” sem dizer como.

Essas frases podem aparecer apenas se acompanhadas de explicação real. Sozinhas, indicam aula rasa.

## Filtro por pilar

### Grammar

A aula precisa explicar:

- regra;
- lógica;
- formação;
- ordem das palavras;
- contraste com português;
- erro brasileiro;
- como escolher a forma correta;
- como revisar a resposta.

### Vocabulary

A aula precisa ensinar uso, não lista.

Obrigatório:

- contexto real;
- palavras;
- chunks;
- collocations simples;
- frases naturais;
- diferença entre palavras parecidas;
- mini diálogos;
- produção.

### Reading

A aula precisa ensinar estratégia de leitura.

Obrigatório:

- antes de ler;
- ideia geral;
- detalhes;
- evidência textual;
- vocabulário pelo contexto;
- resumo;
- produção conectada.

### Listening

A aula precisa ensinar escuta.

Obrigatório:

- escuta sem texto;
- foco de escuta;
- palavras-chave;
- transcript depois;
- shadowing;
- dictation;
- compreensão;
- produção oral.

### Speaking

A aula precisa ensinar fala progressiva.

Obrigatório:

- situação;
- modelo;
- repetição;
- substituição;
- pergunta-resposta;
- construção de resposta;
- gravação;
- checklist.

### Writing

A aula precisa ensinar escrita por blocos.

Obrigatório:

- texto modelo;
- análise do modelo;
- blocos úteis;
- gramática da escrita;
- rascunho;
- revisão;
- versão final.

## Nova regra de pronto para uso

O curso só deve ser considerado pronto para uso quando:

- todas as aulas do pacote atual tiverem `deepApproved: true`;
- nenhuma aula tiver alerta de conteúdo genérico;
- os exercícios estiverem alinhados com o que foi ensinado;
- a Prática Profunda não perguntar nada que a aula não ensinou;
- o usuário conseguir estudar sem precisar pedir correções manuais todo dia.

## Consequência prática

Se uma aula não passar nesse filtro:

- não pode ficar como `ready` em produção;
- deve ficar `needs-review` ou `planned`;
- deve ser reescrita antes de avançar para novas aulas;
- não deve ser usada para preencher quantidade.

## Próxima implementação técnica

Criar validator automático de conteúdo pedagógico em:

`fluency-clean/src/content/validators/validatePedagogicalContentQuality.js`

Esse validator deve verificar:

- frases genéricas proibidas;
- explicação causal;
- regra explícita;
- presença de “por que”;
- presença de contraste com português;
- exemplos comentados;
- exercícios variados;
- produção própria;
- revisão final;
- alinhamento entre conteúdo ensinado e exercícios.

## Regra para os próximos blocos

Antes de criar mais conteúdo, aplicar este filtro ao BLOCO 3 e seguintes.

Não reescrever 119 aulas de qualquer jeito.

Cada aula deve sair pronta para o aluno estudar de verdade.
