# flash-card
Esse é um aplicativo de flash card, tendo isso em consideração o aplicativo se volta para os seguintes usos:
- Revisão de matérias não manuais
- Acompanhamento de matérias
- Planejamento de estudos

Além disso o aplicativo não se propõe a:
- Ser fonte de conteudo
- Proporcionar aprendizado inicial
- Proporcionar cursos completos
- Ser ferramenta de avaliação acadêmica

## Resumo
O presente aplicativo foca em revisão de conteudo, com público focado em alunos de 15 anos ou mais, o principal problema que o aplicativo foca em resolver é permitir ao estudante uma melhor visibilidade dos estudos, perdendo o pânico de ter muita matéria para revisar e não saber por onde começar.

O produto visa de diferênciar, além da experiência mais fluida por ter poucos anuncios, permitir ao usuário centralizar o planejamento e estudo em um único aplicativo fazendo ele passar mais tempo na plataforma.
## Plano de implementação
O sitema possui, até o momento, as seguintes funcionalidades a serem implementadas.
### Autenticação
- Login 
- Cadastro

O sitema terá um login e cadastro, já que o sistema pode ser usado em computadores, diferêntes usuários pessoais podem querer usar o app, por exemplo, irmãos, pais que estão estudano, outros parêntes da casa.
Assim o sistema terá um sistema de login para dividir os perfis de usuário que estão no app atualmente, permitindo personalização individual dos cartões, grupos e planos de estudo.

### Visualização
- Visualizar grupos
- Visualizar cartões de um grupo
- Visualizar detalhes de um cartão

As visualizações dos cartões são divididas em grupos, para que o usuário possa agrupar os cartões de acordo com as necessidades, por exemplo grupos por disciplina, inter-discuplinar ou qualquer divisão desejada.

### Adição
- Adicionar cartão
- Adicionar grupo

O estudante pode adicionar cartões e grupos de acordo com suas vontades, permitindo incluir questões e grupos das mais diversas matérias, desde estudo de linguas, matemática, quimica, até matérias de faculdade como linguagem de programação e assim por diante.

### Edição
- Editar cartão
- Editar grupo

A edição altera os dados do elemento sem deixar meta dados.

### Exclusão
- Deletar um cartão
- Deletar grupo

Ao deletar um cartão ele é excluido, meta dados necessários para integridade dos grupos.

Ao deletar um grupo é perguntado se o usuário deseja excluir os cartões associados, caso negativo os cartões do grupo serão movidos para um grupo genérico por inclusão em um grupo expecífico pelo usuário no futuro outra manipulação.

### Revisão
- Realizar revisão
- Marcar revisão

A revisão é uma funcionalidade que libera os cartões para teste de conhecimento em uma ordem aleatória dentre os cartões do grupo expecífico que está sendo estudado, ao fim da revisão, de acordo com as respostas certas e erradas o sitema marca os novos periodos de revisão.