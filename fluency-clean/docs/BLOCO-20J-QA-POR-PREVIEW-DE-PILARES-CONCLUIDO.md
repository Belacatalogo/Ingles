# BLOCO 20J — QA por preview de pilares

Branch: `rewrite-fluency-clean-lab`

## Motivo do ajuste

O QA final originalmente seria com aulas reais liberadas no fluxo normal. Porém o sistema segue a regra de estudo:

- 1 aula por dia;
- aula real não deve abrir fora de ordem;
- preview visual não deve alterar cronograma;
- preview visual não deve contar progresso;
- preview visual não deve marcar aula como feita.

Por isso, o BLOCO 20J foi ajustado para QA por preview de pilares.

## Escopo deste QA

Validar visualmente e tecnicamente os renders de:

- Grammar;
- Vocabulary;
- Reading;
- Listening;
- Speaking;
- Writing.

Usando a aba:

- `Testar aulas por pilar`.

## O que este QA não faz

Este QA não deve:

- liberar aula real fora do cronograma;
- marcar aula como concluída;
- alterar progresso;
- avançar dia de estudo;
- alterar calendário do curso;
- abrir B1;
- substituir o QA real futuro com aulas do dia.

## Checklist de QA por pilar

### Grammar

Validar:

- explicação aparece antes da prática;
- exemplos comentados aparecem corretamente;
- erros comuns aparecem limpos;
- prática controlada é respondível;
- transformação é respondível;
- tradução controlada é respondível;
- gabaritos/modelos só aparecem após tentativa;
- não aparece `subject`, `expected`, `answer`, `[object Object]`.

### Vocabulary

Validar:

- palavras essenciais aparecem com significado/exemplo;
- chunks aparecem destacados;
- exemplos em frases aparecem corretamente;
- reconhecimento é respondível;
- uso em contexto é respondível;
- produção com vocabulário tem campo;
- não vira apenas lista passiva;
- não aparece campo técnico cru.

### Reading

Validar:

- texto principal aparece cedo;
- primeira leitura tem campo;
- segunda leitura tem campo;
- perguntas de evidência são respondíveis;
- resumo/produção tem campo;
- modelo esperado aparece apenas depois da tentativa;
- texto não fica no final da página.

### Listening

Validar:

- primeira escuta vem antes do transcript;
- segunda escuta vem antes do transcript;
- compreensão auditiva é respondível;
- dictation é respondível;
- transcript fica escondido até tocar em `Mostrar transcript`;
- produção oral curta usa fala/fallback, quando existir.

### Speaking

Validar:

- frases-modelo aparecem antes da prática;
- chunks/pronúncia aparecem;
- fala guiada usa botão/fallback;
- gravação guiada usa botão/fallback;
- fala livre usa botão/fallback;
- checklist de fala aparece;
- aula não é apenas cards de leitura.

### Writing

Validar:

- modelo de texto aparece;
- blocos úteis aparecem;
- gramática para escrever aparece;
- rascunho tem textarea grande;
- checklist vem entre rascunho e versão final;
- versão final tem textarea grande;
- modelo esperado só aparece depois da tentativa.

## Checklist mobile/iPhone

Validar em iPhone:

- textarea não força zoom;
- textarea não fica escondida pela barra inferior;
- botões têm área de toque confortável;
- cards não ficam apertados;
- stepper não atrapalha a leitura;
- aba de testes por pilar continua acessível;
- tela rola até o final sem cortar conclusão/prática extra.

## Estado dos blocos 20B–20I

- 20B Reading completo: concluído;
- 20C Speaking completo: concluído;
- 20D Writing completo: concluído;
- 20E Listening completo: concluído;
- 20F Grammar/Vocabulary/campos crus: concluído;
- 20G limpeza parcial mantendo testes: concluído;
- 20H contrato por pilar: concluído;
- 20I auditoria visual iPhone: concluído.

## Riscos restantes

Como este QA é por preview, ainda pode ser necessário no futuro testar:

- aula real liberada do dia;
- conclusão real de aula;
- retomada de aula interrompida;
- revisão de aula concluída;
- interação entre progresso real e prática extra;
- transição de dia no cronograma.

## QA real futuro

Quando o usuário for usando as aulas reais no cronograma, criar um bloco futuro:

`BLOCO-QA-REAL-AULAS-DO-DIA`

Esse bloco deve validar:

- abertura da aula do dia;
- conclusão;
- bloqueio após concluir a aula diária;
- retomada;
- revisão;
- progresso;
- comportamento após virada de dia.

## Status do BLOCO 20J

Concluído como QA planejado por preview de pilares.

Nenhuma alteração funcional aplicada.

## Próximo passo recomendado

Depois de o usuário testar no iPhone usando a aba `Testar aulas por pilar`, corrigir os problemas encontrados em hotfixes pequenos:

- `HOTFIX-20J-READING`;
- `HOTFIX-20J-LISTENING`;
- `HOTFIX-20J-SPEAKING`;
- `HOTFIX-20J-WRITING`;
- `HOTFIX-20J-GRAMMAR-VOCAB`.

Somente depois disso decidir entre:

1. voltar para refinamento premium do A1;
2. iniciar B1;
3. planejar integrações gratuitas úteis.
