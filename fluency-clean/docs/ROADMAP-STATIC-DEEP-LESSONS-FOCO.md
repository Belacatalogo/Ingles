# ROADMAP — Static Deep Lessons Focus

Branch obrigatória: `rewrite-fluency-clean-lab`

## Objetivo central

Transformar o curso fixo Fluency em um curso pronto para uso, com aulas completas, profundas e não genéricas.

O usuário deixou claro:

- não quer aulas rasas;
- não quer ficar vindo todo dia corrigir aula genérica;
- quer entender o porquê, a regra e a lógica;
- quer qualidade em todos os pilares;
- quer velocidade, mas sem sacrificar qualidade.

## Estado atual

### Concluído

1. BLOCO 1 — Schema pedagógico profundo
   - Criado `static-lesson-schema-v2-deep`.
   - Adicionados campos globais e por pilar.
   - Factories compatíveis com v2.
   - Validator estrutural profundo criado.

2. BLOCO 2 — Renderizadores profundos
   - Criado fluxo visual para aulas profundas.
   - Mantida compatibilidade com aulas antigas.
   - Renderizadores por pilar: Grammar, Vocabulary, Reading, Listening, Speaking e Writing.

3. Quality Gate de conteúdo pedagógico
   - Criado documento obrigatório de qualidade.
   - Criado validator de conteúdo pedagógico.
   - Integrado ao validador do currículo.
   - Aula pronta precisa passar estrutura + conteúdo.

4. BLOCO 3A — Grammar A1 Foundations
   - Criadas/conectadas aulas profundas:
     - `A1-GRAMMAR-001` Subject pronouns
     - `A1-GRAMMAR-002` Verb to be — affirmative
     - `A1-GRAMMAR-003` Verb to be — negative
     - `A1-GRAMMAR-004` Verb to be — questions
     - `A1-GRAMMAR-005` Short answers with to be
     - `A1-GRAMMAR-006` Possessive adjectives

5. Hotfix mobile de aulas profundas
   - Criado `deep-lesson-mobile.css`.
   - Importado no `main.jsx`.
   - Aumentado espaço seguro no iPhone para evitar barra inferior cobrindo conteúdo.

## Ponto de atenção atual

A aula profunda já está muito melhor em conteúdo, mas a UX mobile ainda precisa ser monitorada no iPhone.

Se a barra inferior continuar cobrindo conteúdo, o próximo hotfix de UX deve mexer diretamente em:

- `.reference-bottom-nav`
- `.lesson-screen`
- `.fluency-reference-shell`
- containers internos da aula

Não avançar para centenas de aulas se a experiência mobile continuar desconfortável.

---

# Próximos blocos obrigatórios

## BLOCO 3B — Validar Grammar A1 Foundations

Objetivo:

Validar as 6 aulas Grammar A1 Foundations contra:

- schema profundo;
- filtro de conteúdo pedagógico;
- renderização mobile;
- ausência de conteúdo genérico;
- exercícios alinhados com o que foi ensinado.

Critério de aceite:

- `structureApproved: true`
- `contentApproved: true`
- `deepApproved: true`
- sem frase genérica proibida;
- sem resposta correta sempre na primeira alternativa;
- sem conteúdo coberto pela barra inferior.

Se falhar, corrigir antes de avançar.

## BLOCO 4A — Vocabulary A1 Foundations profundo

Aulas alvo iniciais:

1. Greetings
2. Personal information
3. Numbers 0–100
4. Countries and nationalities
5. Family basics

Cada aula deve ter:

- contexto real;
- palavras essenciais;
- chunks;
- pronúncia/foco sonoro;
- frases naturais;
- mini diálogos;
- diferenças perigosas para brasileiros;
- reconhecimento;
- uso em contexto;
- produção própria;
- revisão final.

Não pode ser lista de palavras.

## BLOCO 5A — Reading A1 Foundations profundo

Aulas alvo iniciais:

1. Short introductions
2. A simple profile
3. A family description

Cada aula deve ter:

- pré-leitura;
- vocabulário antes do texto;
- estratégia de leitura;
- texto real adequado ao A1;
- primeira leitura por ideia geral;
- segunda leitura por detalhes;
- perguntas com evidência textual;
- vocabulário pelo contexto;
- resumo guiado;
- produção conectada.

Não pode ser texto curto genérico com perguntas soltas.

## BLOCO 6A — Listening A1 Foundations profundo

Aulas alvo iniciais:

1. Greetings and names
2. Spelling names
3. Numbers and phone numbers
4. Countries and cities

Cada aula deve ter:

- preparação antes de ouvir;
- palavras-chave;
- primeira escuta sem transcript;
- segunda escuta com foco;
- transcript liberado depois;
- shadowing;
- dictation leve;
- compreensão;
- produção oral curta.

Não pode virar Reading disfarçado.

## BLOCO 7A — Speaking A1 Foundations profundo

Aulas alvo iniciais:

1. Say hello and goodbye
2. Introduce yourself
3. Spell your name
4. Say your country and city

Cada aula deve ter:

- situação real de fala;
- modelo;
- repetição guiada;
- substitution drills;
- pergunta-resposta;
- construção de resposta;
- gravação guiada;
- checklist;
- fala livre curta.

Não pode pedir fala livre sem preparar.

## BLOCO 8A — Writing A1 Foundations profundo

Aulas alvo iniciais:

1. Write simple sentences
2. Write your name and country
3. Write a personal introduction

Cada aula deve ter:

- modelo de texto;
- análise do modelo;
- blocos reutilizáveis;
- gramática para escrita;
- substituição guiada;
- erros comuns;
- rascunho;
- checklist;
- versão final.

Não pode só mandar “escreva sobre você”.

---

# Estratégia depois das Foundations

Não fazer aula por aula.

Não gerar 50 aulas de uma vez.

Usar pacotes por unidade temática.

## Tamanho ideal por bloco

- Grammar/Vocabulary: 5 a 8 aulas por bloco.
- Reading/Listening: 3 a 5 aulas por bloco.
- Speaking/Writing: 4 a 6 aulas por bloco.

## Unidades sugeridas para A1

### A1.1 Foundations

Base de todos os pilares.

### A1.2 Personal life

Família, objetos, descrição simples, this/that, a/an, singular/plural.

### A1.3 Daily routine

Present simple, rotina, horários, dias da semana, frequência.

### A1.4 Practical situations

Compras simples, localização, preferências, pedir informação.

### A1.5 Review + checkpoints

Revisão, testes, remediação e checkpoint A1.

---

# Regra de qualidade para todos os blocos

Uma aula só pode ficar `ready` se passar em:

1. Estrutura
2. Conteúdo pedagógico
3. Renderização mobile
4. Exercícios alinhados
5. Produção própria
6. Revisão final

Campos finais esperados:

```js
structureApproved: true
contentApproved: true
deepApproved: true
```

## Proibido

- Preencher aulas com template genérico.
- Marcar `ready` só porque tem campos completos.
- Criar dezenas de aulas sem validar.
- Fazer Reading sem evidência textual.
- Fazer Listening como se fosse Reading.
- Fazer Speaking sem preparação.
- Fazer Writing sem modelo e revisão.
- Perguntar na Prática Profunda conteúdo que a aula não ensinou.

---

# Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Leia REWRITE_HANDOFF.md e depois leia fluency-clean/docs/ROADMAP-STATIC-DEEP-LESSONS-FOCO.md.
Estado atual: schema v2-deep criado, renderizadores profundos criados, quality gate de conteúdo criado, Grammar A1 Foundations profundo criado e conectado, hotfix mobile aplicado.
Próximo bloco obrigatório: BLOCO 3B — validar Grammar A1 Foundations contra estrutura, conteúdo pedagógico e UX mobile. Depois seguir para BLOCO 4A — Vocabulary A1 Foundations profundo.
Não mexa em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não use DOM injection nem bundle patch.
Não criar aulas genéricas. Toda aula precisa ensinar o porquê, a regra, a lógica, exemplos comentados, prática guiada, produção e revisão.
```
