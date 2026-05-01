# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## MODO DE COMMIT E DEPLOY — ATUALIZADO

O antigo PROTOCOLO ECONÔMICO DE DEPLOY está temporariamente suspenso por pedido do usuário.

Nova regra operacional enquanto a reconstrução da prática estiver em andamento:
1. Prioridade máxima: qualidade, limpeza arquitetural e ausência de gambiarra.
2. Pode fazer múltiplos commits por bloco quando for necessário para corrigir build, separar módulos ou facilitar validação.
3. Cada alteração ainda deve atualizar o handoff quando mudar o estado do projeto.
4. Continuar usando apenas a branch `rewrite-fluency-clean-lab`.
5. Não avançar para `rewrite-fluency-clean` ou `main` sem validação no iPhone.

## Decisão atual do usuário

O usuário pediu uma reformulação completa do sistema de exercícios/prática.

Motivos:
- tela fullscreen funcionou, mas ainda está visualmente pesada;
- verde claro atual incomoda;
- perguntas em inglês geram trabalho desnecessário no A1;
- alternativas ficam vagas, longas ou misturadas;
- questões devem ter qualidade parecida com a qualidade da aula;
- prática deve dar vontade de estudar;
- sistema deve permanecer limpo, modular e sem funções se sobrepondo.

Diretriz pedagógica nova:
- instruções e enunciados principais em português;
- conteúdo treinado em inglês;
- feedback em português;
- áudio em inglês;
- perguntas não podem parecer aleatórias;
- prática deve seguir fases: aquecimento, reconhecimento, compreensão, produção guiada, escrita/fala e revisão final.

Diretriz visual nova:
- remover o verde claro agressivo;
- usar visual mais próximo do Fluency atual: fundo escuro elegante, azul/violeta, gradientes suaves, glass/painéis modernos;
- botões grandes, bonitos e confortáveis;
- sem rolagem estranha;
- sem opção cortada;
- feedback bonito e motivador;
- adicionar sistema de vidas para muitos erros.

## NOVA ORDEM DE BLOCOS — REFORMULAÇÃO DA PRÁTICA

### 1. `BLOCO-PRACTICE-REBUILD-1-LAB` — Arquitetura limpa da prática

Objetivo:
- substituir o motor atual por uma arquitetura nova e modular;
- parar de depender do `PracticeEngine.js` como motor improvisado;
- criar builder, quality gate, checker e tipos separados.

Arquivos previstos:
- `fluency-clean/src/practice/core/PracticeBuilder.js`
- `fluency-clean/src/practice/core/PracticeQualityGate.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`
- `fluency-clean/src/practice/core/PracticeTypes.js`
- `fluency-clean/src/practice/core/PracticeSessionState.js`

Regras:
- não mexer em `bundle.js`;
- não usar DOM injection;
- não criar patch por CSS escondendo lógica antiga;
- manter prática nova independente e testável.

### 2. `BLOCO-PRACTICE-REBUILD-2-LAB` — Builder pedagógico por fases

Objetivo:
- gerar prática com progressão real, não lista aleatória.

Fases obrigatórias:
1. Aquecimento — reconhecer palavras/sons/estrutura.
2. Compreensão — entender áudio/texto/conceito.
3. Produção guiada — completar, ordenar, montar frase.
4. Escrita — escrever resposta curta ou frase.
5. Fala/shadowing — repetir ou responder falando.
6. Revisão final — reforçar erros ou pontos principais.

Regras de idioma:
- enunciados em português;
- respostas/conteúdo em inglês quando o objetivo for aprender inglês;
- feedback em português.

### 3. `BLOCO-PRACTICE-REBUILD-3-LAB` — Quality gate forte de questões

Objetivo:
- impedir questões burras, vagas ou aleatórias.

Bloqueios obrigatórios:
- não permitir alternativas gigantes;
- não misturar palavra com frase longa;
- não usar `Resposta pessoal` como alternativa;
- não transformar pergunta pessoal em múltipla escolha;
- não permitir alternativas que não pertencem ao mesmo tipo da resposta;
- não gerar pergunta em inglês quando o aluno A1 precisaria de instrução em português;
- não repetir a mesma habilidade várias vezes do mesmo jeito;
- não permitir resposta correta que não vem do conteúdo da aula;
- não aceitar questão sem objetivo pedagógico claro.

### 4. `BLOCO-PRACTICE-REBUILD-4-LAB` — UI fullscreen elegante do Fluency

Objetivo:
- substituir a aparência atual inspirada genericamente em apps de idiomas por uma UI própria do Fluency.

Mudanças visuais:
- remover verde claro dominante;
- usar gradiente azul/violeta do Fluency;
- usar cards glass escuros;
- barra de progresso elegante;
- botão inferior com gradiente do sistema;
- feedback correto/incorreto com cores suaves;
- layout sem scroll indevido;
- opções com altura inteligente e texto legível;
- teclado/campo de escrita confortável no iPhone.

### 5. `BLOCO-PRACTICE-REBUILD-5-LAB` — Sistema de vidas e erro pedagógico

Objetivo:
- adicionar sistema de vidas para muitos erros.

Comportamento:
- aluno começa com vidas, por exemplo 5;
- erro real tira vida;
- erro bobo não tira vida, libera tentativa extra;
- ao zerar vidas, a prática entra em modo revisão;
- modo revisão mostra onde errou e permite repetir pontos fracos;
- conclusão diferencia: concluída perfeita, concluída com revisão, precisa revisar.

### 6. `BLOCO-PRACTICE-REBUILD-6-LAB` — Componentes por tipo de exercício

Criar componentes próprios:
- `ChoiceCard.jsx`
- `AudioChoiceCard.jsx`
- `DictationCard.jsx`
- `WordBankCard.jsx`
- `FillBlankCard.jsx`
- `CorrectionCard.jsx`
- `WriteCard.jsx`
- `SpeakCard.jsx`
- `PracticeFeedback.jsx`
- `PracticeResults.jsx`

Objetivo:
- não deixar tudo dentro de um único arquivo gigante;
- cada tipo de exercício deve ser isolado, claro e reaproveitável.

### 7. `BLOCO-PRACTICE-REBUILD-7-LAB` — Integração limpa com aulas

Objetivo:
- conectar a prática reformulada com Listening primeiro;
- depois Grammar, Reading, Writing e Speaking;
- remover prática antiga do `ListeningLesson.jsx`;
- remover CSS hotfix temporário;
- remover sobreposição visual.

Regra:
- a aula chama apenas um launcher limpo;
- nenhum renderer de aula deve carregar motor de questão inteiro dentro dele.

### 8. `BLOCO-PRACTICE-REBUILD-8-LAB` — Persistência, progresso e revisão

Objetivo:
- salvar resultado real da prática;
- guardar erros;
- alimentar progresso e futuro banco de erros.

Salvar:
- quantidade de questões;
- acertos;
- erros;
- vidas restantes;
- tipos de questão errados;
- palavras/frases problemáticas;
- se concluiu com revisão.

### 9. `BLOCO-PRACTICE-REBUILD-9-LAB` — Limpeza final e remoção de legado

Objetivo:
- remover `PracticeEngine.js` antigo se não for mais usado;
- remover CSS `listening-ux-hotfix.css` se virar legado;
- remover quiz antigo do `ListeningLesson.jsx`;
- garantir que não há funções duplicadas, sobrepostas ou escondidas por CSS.

### 10. `BLOCO-PRACTICE-REBUILD-10-LAB` — Teste completo no iPhone

Checklist:
- fullscreen não rola sem necessidade;
- botão não cobre conteúdo;
- teclado não quebra layout;
- áudio toca;
- fala funciona ou mostra fallback limpo;
- vidas funcionam;
- erro bobo não pune;
- feedback é claro;
- conclusão volta para a aula;
- performance ok no Safari/PWA.

## Estado atual antes da reformulação

### HOTFIX QUIZ FULLSCREEN — Quality gate de alternativas IMPLEMENTADO, mas insuficiente

O quality gate melhorou parte das alternativas, mas o usuário validou que ainda não está no nível desejado. Portanto, o caminho correto agora é reformular a prática inteira, não continuar remendando o motor atual.

### HOTFIX QUIZ FULLSCREEN — Polimento sem scroll IMPLEMENTADO, mas insuficiente

O scroll melhorou, mas a experiência visual ainda não está com a qualidade desejada pelo usuário. O visual será refeito no bloco `BLOCO-PRACTICE-REBUILD-4-LAB`.

### BLOCO-QUIZ-FULLSCREEN-LAB — Prática profunda fullscreen por tipo de aula IMPLEMENTADO PARCIALMENTE

O bloco serviu como protótipo funcional. A partir de agora, ele será substituído pela reformulação `BLOCO-PRACTICE-REBUILD-*`.

Pendência técnica importante:
- limpar estruturalmente `ListeningLesson.jsx`;
- remover prática antiga oculta por CSS;
- substituir motor atual pela nova arquitetura.

## Próximos blocos depois da reformulação de prática

1. `BLOCO-12-LAB` — Rubricas por tipo de aula.
2. `BLOCO-14-LAB` — Contrato JSON rígido.
3. `BLOCO-11-LAB` — Plano primeiro, aula depois.
4. `BLOCO-13-LAB` — Professor Gerador/Revisor.
5. `BLOCO-17-LAB` — Qualidade visível da aula.
6. `BLOCO-16-LAB` — Histórico real de Speaking.
7. `BLOCO-15-LAB` — Banco de erros real.
8. `BLOCO-20-LAB` — Certificação por nível.
9. `BLOCO-CARTAS-3B-LAB` — Expandir banco de vocabulário em novos lotes até 2.000 palavras reais.
10. `BLOCO-AUDITORIA-POLIMENTO-GERAL-LAB` — após concluir os blocos principais, analisar cada página com precisão, listar melhorias possíveis e montar blocos de polimento.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch de trabalho é `rewrite-fluency-clean-lab`. Não mexa em `bundle.js`, não use DOM injection ou bundle patch, não mexa no backend Azure privado. O antigo protocolo econômico de commit/deploy está temporariamente suspenso por pedido do usuário. A prioridade agora é reformular completamente o sistema de prática/exercícios. Seguir a ordem `BLOCO-PRACTICE-REBUILD-1-LAB` até `BLOCO-PRACTICE-REBUILD-10-LAB`: arquitetura limpa, builder por fases, quality gate forte, UI fullscreen elegante Fluency, sistema de vidas, componentes por tipo, integração limpa, persistência, remoção de legado e teste completo no iPhone. Instruções/enunciados em português, conteúdo treinado em inglês, feedback em português. Remover verde claro agressivo e usar gradientes azul/violeta/glass do Fluency. Depois da reformulação, continuar os blocos 12, 14, 11, 13, 17, 16, 15, 20, CARTAS-3B e AUDITORIA-POLIMENTO-GERAL."
