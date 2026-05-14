# Nota — A1 coberto vs aulas profundas premium antes do A2

Branch: `rewrite-fluency-clean-lab`

## Contexto

Antes de iniciar o A2, foi esclarecida uma dúvida importante:

> As 119 aulas do A1 foram feitas?

A resposta correta é separar dois conceitos:

1. cobertura do mapa A1;
2. aulas profundas premium criadas manualmente uma a uma.

## Resposta registrada

### A1 está coberto e conectado

O mapa A1 possui 119 itens planejados distribuídos entre:

- Grammar: 27;
- Vocabulary: 20;
- Reading: 20;
- Listening: 18;
- Speaking: 18;
- Writing: 16.

O currículo está conectando:

- pacotes profundos criados por bloco;
- revisões A1.5;
- checkpoints A1;
- conteúdo base do `fullContent.js`.

Portanto, o A1 está coberto no sistema e pode seguir para a fase A2.

### Nem todas as 119 aulas são premium profundas individuais

Nem todas as 119 aulas foram reescritas manualmente uma por uma no padrão profundo premium dos últimos blocos.

Parte do A1 está em conteúdo profundo premium criado por blocos.
Outra parte está coberta por conteúdo base `ready` em `fullContent.js`.

Isso significa que:

- o A1 está utilizável/coberto/conectado;
- o A1 possui revisões e checkpoints;
- o deploy foi validado como READY;
- mas ainda existe um refinamento futuro recomendado para transformar qualquer aula base restante em aula profunda premium completa.

## Decisão

O projeto pode avançar para:

`BLOCO 14A — Início do A2`

sem apagar essa observação.

## Recomendação futura

Depois de criar A2/A3 ou quando o usuário decidir fazer polimento premium do A1, criar um bloco específico:

`BLOCO A1-PREMIUM-REFINEMENT — Refinar aulas base restantes do A1`

Objetivo desse bloco futuro:

- listar aulas do A1 que ainda vêm do `fullContent.js` base;
- comparar com aulas profundas criadas manualmente;
- priorizar as lacunas mais importantes;
- transformar as aulas base restantes em aulas profundas premium;
- não confundir cobertura com profundidade.

## Regra para próximos chats

Ao continuar o projeto, não afirmar que as 119 aulas do A1 foram todas feitas manualmente em padrão premium profundo.

A frase correta é:

> O A1 está coberto e conectado, com conteúdo profundo em boa parte dos pacotes, revisões e checkpoints. Porém ainda pode haver aulas base do `fullContent.js` que precisarão de refinamento premium futuro.
