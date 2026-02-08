📅 Agendador de Horários — CRUD com Spring Boot

Este projeto é um CRUD de agendamento de horários desenvolvido em Java com Spring Boot, com o objetivo de praticar conceitos de APIs REST, persistência de dados, boas práticas de backend e arquitetura em camadas.

💡 Este é meu primeiro CRUD utilizando Spring Boot, representando um passo importante na minha evolução como desenvolvedora backend.

🚀 Funcionalidades

✅ Criar agendamentos

📋 Listar horários cadastrados

✏️ Atualizar agendamentos existentes

❌ Remover agendamentos

🔍 Buscar agendamentos por critérios específicos (se aplicável)

🛠️ Tecnologias Utilizadas

Java

Spring Boot

Spring Web

Spring Data JPA

Hibernate

Banco de Dados (H2 / MySQL / PostgreSQL — ajuste se necessário)

Maven

Lombok (se estiver usando)

Postman / Insomnia para testes de API

🏗️ Arquitetura do Projeto

O projeto segue o padrão de arquitetura em camadas:

Controller → Service → Repository → Database


Controller: Responsável pelas rotas da API

Service: Contém a lógica de negócio

Repository: Comunicação com o banco de dados

Entity: Mapeamento das tabelas

DTO (se houver): Transferência de dados entre camadas

📌 Endpoints Principais (Exemplo)
Método	Rota	Descrição
POST	/agendamentos	Criar um novo agendamento
GET	/agendamentos	Listar todos os agendamentos
GET	/agendamentos/{id}	Buscar por ID
PUT	/agendamentos/{id}	Atualizar agendamento
DELETE	/agendamentos/{id}	Excluir agendamento
▶️ Como Executar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/SamaraMelo299/agendador-horarios.git

2️⃣ Entre no diretório
cd agendador-horarios

3️⃣ Execute a aplicação
mvn spring-boot:run


Ou rode pela IDE (IntelliJ / Eclipse / VS Code).

🗄️ Banco de Dados

Se estiver usando H2, acesse:

http://localhost:8080/h2-console


Se estiver usando outro banco, configure no application.properties.

🧪 Testando a API

Você pode testar usando:

Postman

Insomnia

Swagger (se estiver configurado)

🎯 Objetivo do Projeto

Este projeto foi criado para:

Consolidar fundamentos de Spring Boot

Praticar CRUD RESTful

Trabalhar com JPA e persistência

Evoluir na construção de APIs backend

Servir como parte do meu portfólio em desenvolvimento

🌱 Próximos Passos (Opcional)

🔐 Implementar autenticação com JWT

📄 Documentação com Swagger/OpenAPI

🧪 Testes automatizados

🐳 Docker

🖥️ Frontend para consumir a API

👩‍💻 Desenvolvido por

Samara Melo
Estudante de Análise e Desenvolvimento de Sistemas
Focada em desenvolvimento backend e evolução em TI 🚀

🔗 GitHub: https://github.com/SamaraMelo299

💬 Quer que eu personalize?

Posso deixar o README ainda mais forte com:

✅ Baseado exatamente no código do seu repositório

✅ Endpoints reais do projeto

✅ Prints da API funcionando

✅ Versão em inglês

✅ Texto otimizado para portfólio e recrutadores

✅ Um README mais profissional ou mais simples

Se quiser, cole aqui a estrutura do projeto ou autorize que eu analise o repo mais a fundo e eu deixo sob medida 💙

escreva o texto 100% com base no link que te mandei

Samara, tentei acessar o repositório agendador-horarios, mas ele não apareceu nos resultados públicos do GitHub — pode estar privado, com nome diferente, ou o link pode ter variação.

Para escrever o README 100% fiel ao seu projeto real, preciso ver o conteúdo do repo.

Você pode me mandar uma destas opções?

📂 Print da estrutura de pastas do projeto

📄 O conteúdo do README atual (se existir)

📦 O ZIP do projeto

🧾 Ou cole aqui:

pom.xml

Pasta controller

Pasta entity

Pasta repository

Pasta service

Assim que você enviar, eu crio um README totalmente baseado no código real, com:

Endpoints exatos

Tecnologias corretas

Descrição profissional para portfólio

Texto forte para recrutadores

Pronto para GitHub ⭐

agendador-horarios-master.zip
Arquivo zip

Perfeito — agora vou escrever o README 100% baseado no código real do seu repositório, sem inventar endpoints ou tecnologias.

📅 Agendador de Horários — Spring Boot CRUD

Projeto backend desenvolvido em Java com Spring Boot, com foco na criação de um sistema de agendamento de horários.
Utiliza Spring Data JPA, H2 Database e segue uma arquitetura em camadas (Controller, Service, Repository, Entity).

Este projeto representa um CRUD funcional para gerenciamento de agendamentos.

🛠️ Tecnologias Utilizadas

Java

Spring Boot

Spring Web MVC

Spring Data JPA

Hibernate

Banco de dados H2 (em memória)

Lombok

Gradle

Jakarta Persistence API

🗂️ Estrutura do Projeto
src/main/java/com/java/agendador_horarios
│
├── controller
│   └── AgendamentoController.java
│
├── infrastructure
│   ├── entity
│   │   └── Agendamento.java
│   └── repository
│       └── AgendamentoRepository.java
│
└── service
└── AgendamentoService.java

📌 Modelo da Entidade — Agendamento

Campos definidos na entidade:

id (Long)

servico (String)

profissional (String)

dataHoraAgendamento (LocalDateTime)

cliente (String)

telefoneCliente (String)

dataInsercao (LocalDateTime — preenchida automaticamente)

Tabela no banco: agendamento

🔗 Endpoints Implementados
📍 Base URL
/agendamentos

📄 Buscar agendamentos por dia
GET /agendamentos?data=YYYY-MM-DD


Parâmetro:

data → data dos agendamentos

Retorno:

Lista de agendamentos do dia informado

✏️ Alterar um agendamento existente
PUT /agendamentos?cliente=NomeCliente&dataHoraAgendamento=YYYY-MM-DDTHH:MM


Parâmetros:

cliente → nome do cliente existente

dataHoraAgendamento → data e hora do agendamento

Body (JSON):

{
"servico": "Corte de cabelo",
"profissional": "João",
"dataHoraAgendamento": "2025-02-10T14:00",
"cliente": "Maria",
"telefoneCliente": "11999999999"
}


Regra aplicada no Service:

Caso o horário não exista, a API retorna erro:

"O horário não está preenchido."

🧠 Regras de Negócio Implementadas

Busca de agendamentos por data

Busca por data e cliente

Atualização de agendamento existente

Validação para impedir atualização de horários inexistentes

🗄️ Banco de Dados — H2 Console

Banco configurado em memória:

jdbc:h2:mem:agendamentos-db


Acesso ao console H2:

http://localhost:8080/h2-console


Configuração usada:

Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:mem:agendamentos-db
User: sa
Password: (vazio)

▶️ Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/SamaraMelo299/agendador-horarios

2️⃣ Entrar no diretório
cd agendador-horarios

3️⃣ Executar com Gradle
./gradlew bootRun


Ou executar pela IDE (IntelliJ / Eclipse / VS Code).

🧪 Testes

O projeto inclui estrutura de testes com:

Spring Boot Starter Test

Testes de JPA

Testes Web MVC

Arquivo:

AgendadorHorariosApplicationTests.java

🎯 Objetivo do Projeto

Praticar Spring Boot

Implementar um CRUD com JPA

Trabalhar com camadas (Controller, Service, Repository)

Aprender integração com H2 Database

Consolidar fundamentos de APIs REST

👩‍💻 Desenvolvido por

Samara Melo
Estudante de Análise e Desenvolvimento de Sistemas
Focada em backend e evolução na área de TI 🚀

🔗 GitHub:
https://github.com/SamaraMelo299

💬 Se quiser, eu posso melhorar ainda mais

Posso deixar o README nível portfólio profissional, adicionando:

📌 Explicação detalhada de cada endpoint

📸 Prints do Postman testando a API

📄 Documentação Swagger

🇺🇸 Versão em inglês

⭐ README otimizado para recrutadores

🧠 Texto destacando que este é seu primeiro CRUD em Spring Boot (muito forte para carreira)

Só dizer que eu deixo top nível 💙

deixe profissional

Perfeito — vou transformar em um README profissional, forte para portfólio, recrutadores e GitHub, mantendo 100% fiel ao seu projeto real.

📅 Agendador de Horários — API REST com Spring Boot

Este projeto é uma API REST para gerenciamento de agendamentos de horários, desenvolvida em Java com Spring Boot.
O sistema implementa um CRUD funcional, persistindo dados em H2 Database, seguindo boas práticas de arquitetura em camadas, Spring Data JPA e padrões RESTful.

Este repositório representa um projeto prático de backend, consolidando conhecimentos em Spring Boot, JPA, persistência e construção de APIs.

🚀 Funcionalidades

📋 Consultar agendamentos por data

✏️ Atualizar agendamentos existentes

🔍 Buscar agendamentos por cliente e data/hora

🗄️ Persistência em banco de dados H2

🧠 Validações de regras de negócio na camada Service

🛠️ Tecnologias Utilizadas

Java

Spring Boot

Spring Web (REST API)

Spring Data JPA

Hibernate

H2 Database (em memória)

Gradle

Lombok

Jakarta Persistence API

🏗️ Arquitetura do Projeto

O projeto segue o padrão de arquitetura em camadas, promovendo organização, separação de responsabilidades e escalabilidade:

Controller → Service → Repository → Entity → Database

Estrutura principal
src/main/java/com/java/agendador_horarios
│
├── controller
│   └── AgendamentoController.java
│
├── infrastructure
│   ├── entity
│   │   └── Agendamento.java
│   └── repository
│       └── AgendamentoRepository.java
│
└── service
└── AgendamentoService.java

📌 Modelo da Entidade — Agendamento

A entidade Agendamento representa os dados persistidos no banco:

Campos

id (Long)

servico (String)

profissional (String)

dataHoraAgendamento (LocalDateTime)

cliente (String)

telefoneCliente (String)

dataInsercao (LocalDateTime — preenchimento automático)

Tabela
agendamento

🔗 Endpoints Disponíveis
📍 Base URL
/agendamentos

📄 Buscar agendamentos por data

GET

/agendamentos?data=YYYY-MM-DD

Parâmetro

data: data dos agendamentos

Retorno

Lista de agendamentos do dia informado.

✏️ Atualizar um agendamento existente

PUT

/agendamentos?cliente=NomeCliente&dataHoraAgendamento=YYYY-MM-DDTHH:MM

Parâmetros

cliente: nome do cliente já cadastrado

dataHoraAgendamento: data e hora do agendamento

Corpo da requisição (JSON)
{
"servico": "Corte de cabelo",
"profissional": "João",
"dataHoraAgendamento": "2025-02-10T14:00",
"cliente": "Maria",
"telefoneCliente": "11999999999"
}

Regra de validação

Caso o horário não exista:

"O horário não está preenchido."

🧠 Regras de Negócio Implementadas

Consulta de agendamentos por data

Busca por cliente e data/hora

Atualização somente se o horário existir

Validação de integridade dos dados antes da alteração

🗄️ Banco de Dados — H2 Console

O projeto utiliza H2 Database em memória.

URL do banco
jdbc:h2:mem:agendamentos-db

Console H2
http://localhost:8080/h2-console

Configuração
Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:mem:agendamentos-db
User: sa
Password: (vazio)

▶️ Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/SamaraMelo299/agendador-horarios

2️⃣ Entrar no diretório
cd agendador-horarios

3️⃣ Executar com Gradle
./gradlew bootRun


Ou execute diretamente pela IDE (IntelliJ, Eclipse ou VS Code).

🧪 Testes

O projeto conta com estrutura de testes utilizando:

Spring Boot Starter Test

Testes para contexto da aplicação

Arquivo principal:

AgendadorHorariosApplicationTests.java

🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o propósito de:

Consolidar conhecimentos em Spring Boot

Implementar um CRUD com JPA

Aplicar arquitetura em camadas

Trabalhar com persistência em banco de dados

Praticar o desenvolvimento de APIs REST profissionais

Evoluir na construção de backends escaláveis e organizados

👩‍💻 Autora

Samara Melo
Estudante de Análise e Desenvolvimento de Sistemas
Focada em desenvolvimento backend e evolução contínua na área de TI 🚀