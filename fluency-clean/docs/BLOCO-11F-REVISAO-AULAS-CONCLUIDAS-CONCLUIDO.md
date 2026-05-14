# BLOCO 11F — Revisão apenas de aulas concluídas

Branch: `rewrite-fluency-clean-lab`

## Motivo

Depois do BLOCO 11E, o curso passou a usar aula do dia automática: o aluno toca em `Começar aula` e o sistema abre a próxima aula liberada.

Faltava resolver uma necessidade importante: revisar aulas já concluídas sem transformar o curso em biblioteca aberta e sem permitir acesso a aulas futuras.

## Objetivo

Adicionar uma área separada de revisão que lista apenas aulas concluídas.

Regras:

- `Começar aula` continua sendo a ação principal.
- Aulas futuras continuam bloqueadas.
- O aluno não escolhe pilar/aula para avançar.
- Revisão só aparece se houver aula concluída.
- Revisão só abre aula que já está marcada como concluída.

## Arquivo alterado

- `fluency-clean/src/screens/CourseScreen.jsx`

## Mudanças feitas

Foi adicionada a seção:

- `Revisar aulas concluídas`

Ela:

- aparece apenas quando há aulas concluídas no nível ativo;
- lista até 6 aulas concluídas recentes do nível;
- mostra título apenas de aulas já concluídas;
- abre a aula usando o mesmo launcher central;
- não lista aulas futuras;
- não substitui o botão principal `Começar aula`.

## Proteção mantida

Se algum item não estiver concluído, a função de revisão bloqueia e exibe mensagem humana:

> Somente aulas concluídas aparecem para revisão. Use Começar aula para continuar.

## Resultado esperado

O aluno tem dois fluxos claros:

1. `Começar aula` — avança automaticamente para a próxima aula liberada.
2. `Revisar aulas concluídas` — revisa apenas conteúdo já estudado.

Nada no fluxo exige escolher a aula do dia manualmente.

## Commit

- `4186fbdb2fd48c4712be924af521968b0e384f8b` — adiciona revisão apenas de aulas concluídas.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app:
   - usuário sem aulas concluídas não vê seção de revisão;
   - usuário com aulas concluídas vê apenas aulas já feitas;
   - clicar em revisão abre aula concluída;
   - `Começar aula` continua abrindo a próxima aula liberada;
   - aulas futuras não aparecem para escolha.
