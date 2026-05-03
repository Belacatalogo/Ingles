# Fluency — Estrutura da Prática Profunda por Tipo de Aula

Branch de referência: `rewrite-fluency-clean-lab`

Este arquivo documenta como o sistema de prática profunda deve funcionar para cada tipo de aula no novo Fluency Clean.

A prática profunda é a etapa de exercícios ativos da aula. Ela não deve ser apenas um quiz genérico. Cada pilar precisa treinar a habilidade real daquele tipo de aula, respeitando o nível atual do aluno, o conteúdo gerado pela IA e a renderização segura no iPhone.

## Regras globais da prática profunda

1. A prática deve seguir o tipo da aula.
   - Grammar treina forma, uso, erro comum e produção controlada.
   - Listening treina escuta, compreensão auditiva, ditado e shadowing.
   - Reading treina compreensão textual, evidência no texto e vocabulário em contexto.
   - Speaking treina produção oral, repetição, resposta curta e fluidez.
   - Writing treina frase, organização, correção e reescrita.

2. A prática deve respeitar o progresso do aluno.
   - A1 não deve receber exercícios longos, abstratos ou avançados demais.
   - A2/B1 podem receber mais variação, mas ainda com suporte.
   - B2/C1/C2 podem receber produção mais livre, inferência, nuance e revisão crítica.

3. A prática deve evitar respostas antecipadas.
   - A resposta correta não pode aparecer junto da pergunta.
   - Explicações/correções aparecem apenas depois da tentativa.
   - Se a IA gerar uma questão com resposta embutida, o adaptador deve sanitizar ou rebaixar o exercício.

4. A prática deve ser renderizada em tela cheia/modular quando necessário.
   - Exercícios antigos não devem sobrepor a experiência nova.
   - O componente de prática deve ser isolado da aula renderizada.
   - Não usar DOM injection, bundle patch ou HTML remendado.

5. A prática deve ter fallback seguro.
   - Se a aula vier com poucos exercícios, o adaptador cria exercícios derivados do texto, vocabulário, exemplos e seções.
   - Se um exercício vier inválido, ele deve ser ignorado ou convertido para formato simples.

6. A prática deve salvar progresso.
   - Ao concluir, deve salvar respostas, resultado e progresso da aula.
   - O rascunho deve ser mantido quando fizer sentido.

---

## Grammar — prática profunda

Objetivo: fazer o aluno entender e aplicar a regra gramatical, sem apenas decorar.

### Estrutura recomendada

1. Reconhecimento da estrutura
   - Identificar a forma correta.
   - Escolher entre alternativas parecidas.
   - Exemplo: `I am happy` vs `I is happy`.

2. Correção de erro comum
   - Mostrar uma frase errada e pedir correção.
   - Foco em erros típicos de brasileiros.
   - Exemplo: `She have a car` → `She has a car`.

3. Preenchimento controlado
   - Completar lacunas com a forma correta.
   - Ideal para A1/A2.
   - Exemplo: `He ___ a doctor.`

4. Transformação de frase
   - Afirmativa → negativa.
   - Afirmativa → pergunta.
   - Singular → plural.
   - Presente → passado, quando o nível permitir.

5. Produção curta
   - Criar uma frase usando a estrutura.
   - Para A1, frase curta e guiada.
   - Para níveis altos, produção mais livre.

6. Explicação pós-resposta
   - Depois da tentativa, explicar por que está certo ou errado.
   - Não mostrar resposta antes.

### Tipos de exercício priorizados

- `multipleChoice`
- `fillBlank`
- `correction`
- `wordBank`
- `shortWriting`
- `transformSentence`

### Cuidados

- Não transformar Grammar em jogo visual infantil.
- Não mostrar respostas nos cards.
- Não misturar exemplos do professor com exercícios respondidos.
- Não avançar para regras que ainda não apareceram na aula.

---

## Listening — prática profunda

Objetivo: treinar ouvido real antes de leitura, com progressão segura.

### Estrutura recomendada

1. Escuta cega
   - O aluno ouve sem ler a transcrição.
   - A transcrição começa fechada.
   - Nenhum trecho da fala deve aparecer antes da primeira escuta.

2. Compreensão auditiva simples
   - Perguntas sobre o que foi ouvido.
   - Para A1, perguntas objetivas.
   - Exemplo: `Who says good morning first?`

3. Escolha baseada no áudio
   - O aluno escolhe a frase/palavra que ouviu.
   - Exemplo: escolher entre `today`, `tomorrow`, `tonight`.

4. Ditado curto
   - Escrever uma palavra ou frase curta ouvida.
   - Para A1, frases pequenas.
   - Evitar ditados longos em níveis iniciais.

5. Quem falou?
   - Em diálogos multi-personagem, perguntar quem disse determinada frase.
   - Exemplo: `Who says: I am learning English every day?`

6. Shadowing
   - Repetir frases curtas copiando ritmo e pronúncia.
   - Deve usar áudio natural quando disponível.

7. Conferência de transcrição
   - Só depois de ouvir.
   - O aluno pode abrir `Conferir texto`.

### Tipos de exercício priorizados

- `listenChoice`
- `dictation`
- `speakerChoice`
- `audioComprehension`
- `speak`
- `wordBank`
- `fillBlank`

### Adaptação por nível

A1:
- frases curtas;
- vocabulário conhecido;
- pouca escrita;
- foco em reconhecer palavras e ideia principal.

A2/B1:
- perguntas mais específicas;
- pequenas inferências;
- ditado de frases curtas/médias;
- variação de vozes e situações.

B2+:
- áudio mais longo;
- sotaques/ritmo natural;
- inferência;
- resumo oral/escrito;
- detalhes implícitos.

### Cuidados

- Não mostrar texto antes de ouvir.
- Não poluir a tela com muitos botões.
- Não depender de autoplay do iPhone.
- Para áudios grandes, usar preparo + reprodução manual e cache IndexedDB.
- Diálogos devem usar vozes diferentes por personagem quando possível.

---

## Reading — prática profunda

Objetivo: treinar compreensão textual, vocabulário em contexto e leitura ativa.

### Estrutura recomendada

1. Pré-leitura
   - Pergunta rápida sobre título/tema.
   - Ativar previsão do assunto.

2. Compreensão geral
   - Perguntar a ideia principal do texto.
   - Exemplo: `What is the text mainly about?`

3. Localização de informação
   - Perguntas cuja resposta está diretamente no texto.
   - Exemplo: `What time does Ana wake up?`

4. Evidência no texto
   - Pedir que o aluno identifique a frase que comprova a resposta.
   - Muito importante para evitar chute.

5. Vocabulário em contexto
   - Perguntar significado de palavra/frase dentro do texto.
   - Exemplo: `routine` em uma frase real.

6. Sequência lógica
   - Ordenar eventos do texto.
   - Útil para textos narrativos e rotinas.

7. Inferência leve
   - Para A2+.
   - Perguntar algo que não está literal, mas pode ser deduzido.

8. Resumo curto
   - Uma frase de resumo em A1/A2.
   - Resumo mais estruturado em níveis altos.

### Tipos de exercício priorizados

- `mainIdea`
- `textEvidence`
- `detailQuestion`
- `vocabularyContext`
- `sequenceOrder`
- `trueFalse`
- `shortWriting`

### Adaptação por nível

A1:
- texto curto;
- perguntas literais;
- vocabulário básico;
- respostas curtas.

A2/B1:
- localizar detalhes;
- vocabulário em contexto;
- sequência;
- inferência leve.

B2+:
- inferência;
- intenção do autor;
- tom;
- comparação de ideias;
- resumo crítico.

### Cuidados

- Não transformar Reading em tradução linha por linha.
- Não deixar perguntas genéricas que poderiam ser respondidas sem ler.
- Sempre que possível, exigir evidência textual.
- Não mostrar respostas antes da tentativa.

---

## Speaking — prática profunda

Objetivo: treinar produção oral real, pronúncia, fluidez e resposta ativa.

### Estrutura recomendada

1. Aquecimento oral
   - Repetir uma frase curta.
   - Ideal para destravar o aluno.

2. Repetição guiada
   - Ouvir uma frase e repetir.
   - Foco em ritmo, entonação e som.

3. Resposta curta
   - Pergunta simples, resposta oral curta.
   - Exemplo: `What is your name?`

4. Substituição controlada
   - Trocar uma palavra em uma estrutura.
   - Exemplo: `I am happy` → `I am tired`.

5. Mini diálogo
   - Sistema pergunta, aluno responde.
   - Para A1, diálogo muito curto.
   - Para níveis altos, conversa mais livre.

6. Autoavaliação/repetição
   - Permitir repetir a resposta.
   - Mostrar sugestão de melhoria sem humilhar o aluno.

7. Produção livre progressiva
   - Para B1+.
   - Falar por 30–60 segundos sobre tema da aula.

### Tipos de exercício priorizados

- `repeatAfterAudio`
- `speak`
- `shortAnswerVoice`
- `substitutionDrill`
- `miniDialogue`
- `shadowing`

### Cuidados

- Não exigir fala longa em A1.
- Não bloquear o aluno por pronúncia imperfeita.
- Dar feedback simples e útil.
- Manter integração com áudio/voz sem mexer no backend Azure privado.

---

## Writing — prática profunda

Objetivo: treinar produção escrita com correção, estrutura e reescrita.

### Estrutura recomendada

1. Frase guiada
   - O aluno escreve uma frase usando estrutura da aula.
   - Exemplo: `I am ___`.

2. Completar frase
   - Lacuna com vocabulário ou estrutura.
   - Bom para A1/A2.

3. Reordenação
   - Montar frase com palavras embaralhadas.
   - Ajuda a aprender ordem do inglês.

4. Correção de frase
   - Corrigir erro comum.
   - Exemplo: `She are my friend`.

5. Expansão
   - Transformar frase simples em frase mais completa.
   - Exemplo: `I study English` → `I study English every morning`.

6. Mini parágrafo
   - Para A2+.
   - 3–5 frases sobre tema simples.

7. Reescrita com feedback
   - O sistema mostra melhorias.
   - Aluno reescreve a versão melhorada.

### Tipos de exercício priorizados

- `guidedWriting`
- `fillBlank`
- `wordOrder`
- `correction`
- `sentenceExpansion`
- `shortParagraph`
- `rewriteWithFeedback`

### Cuidados

- Não exigir texto longo em A1.
- Não corrigir apenas com certo/errado; explicar o motivo.
- Não dar resposta pronta antes da tentativa.
- Preservar rascunho.

---

## Estrutura recomendada do adaptador de prática

O adaptador de prática deve receber a aula e transformar o conteúdo em exercícios seguros.

Entrada esperada:

- `lesson.type`
- `lesson.level`
- `lesson.title`
- `lesson.sections`
- `lesson.vocabulary`
- `lesson.examples`
- `lesson.exercises`
- `lesson.listeningText`
- `lesson.readingText`
- `lesson.prompts`

Saída esperada:

- lista normalizada de exercícios;
- tipo de cada exercício;
- enunciado limpo;
- opções sem resposta vazada;
- resposta/correção guardada internamente;
- explicação pós-tentativa;
- nível de dificuldade;
- origem do exercício, quando possível.

### Ordem de prioridade por tipo

Grammar:
1. `correction`
2. `fillBlank`
3. `multipleChoice`
4. `wordBank`
5. `transformSentence`
6. `shortWriting`

Listening:
1. `listenChoice`
2. `dictation`
3. `speakerChoice`
4. `audioComprehension`
5. `speak`
6. `wordBank`
7. `fillBlank`

Reading:
1. `mainIdea`
2. `detailQuestion`
3. `textEvidence`
4. `vocabularyContext`
5. `sequenceOrder`
6. `trueFalse`
7. `shortWriting`

Speaking:
1. `repeatAfterAudio`
2. `speak`
3. `shortAnswerVoice`
4. `substitutionDrill`
5. `miniDialogue`
6. `shadowing`

Writing:
1. `guidedWriting`
2. `wordOrder`
3. `fillBlank`
4. `correction`
5. `sentenceExpansion`
6. `shortParagraph`
7. `rewriteWithFeedback`

---

## Critérios de aprovação da prática profunda

A prática profunda só deve ser considerada aprovada quando:

1. Não mostra respostas antes da tentativa.
2. Não quebra renderização no iPhone.
3. Cada tipo de aula treina sua habilidade real.
4. O nível A1 continua simples e seguro.
5. O aluno consegue concluir e salvar progresso.
6. Exercícios inválidos são ignorados ou convertidos.
7. A experiência não fica poluída visualmente.
8. A prática continua funcionando mesmo quando a IA gera conteúdo imperfeito.

---

## Próximos blocos sugeridos

1. `BLOCO-PRACTICE-ADAPTER-AUDIT-LAB`
   - Auditar o `PracticePlanAdapter.js` atual contra este documento.
   - Verificar se cada tipo de aula está priorizando exercícios corretos.

2. `BLOCO-PRACTICE-RENDER-SAFETY-GATE-LAB`
   - Criar validação visual/estrutural dos exercícios antes de renderizar.
   - Impedir respostas vazadas.

3. `BLOCO-READING-RENDER-REVIEW-LAB`
   - Reestruturar Reading com base nesta arquitetura.

4. `BLOCO-SPEAKING-RENDER-REVIEW-LAB`
   - Revisar Speaking com foco em produção oral real e UI limpa.
