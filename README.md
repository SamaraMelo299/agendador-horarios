💎 Ada Beauty — Sistema de Agendamento para Salão de Beleza

Sistema completo de agendamento desenvolvido com Spring Boot (Java) no back-end e HTML, CSS e JavaScript no front-end, simulando um ambiente real de salão de beleza premium.

O projeto tem como objetivo demonstrar a construção de um CRUD completo de agendamentos, aliado a uma interface moderna voltada para experiência do cliente.

✨ Sobre o Projeto

O Ada Beauty é um sistema fictício de salão de beleza criado como projeto de portfólio para praticar:

Desenvolvimento backend com Spring Boot

Integração frontend + API REST

CRUD completo

Estruturação de projeto full-stack

Experiência visual aplicada a negócios reais

A proposta é simular um sistema real de agendamento online para salão premium.

🚀 Funcionalidades
📅 Agendamentos (CRUD)

Criar novos agendamentos

Consultar horários marcados

Excluir agendamentos

Integração frontend ↔ backend via API REST

💇 Interface do Salão

Página institucional do salão

Apresentação dos serviços

Equipe de profissionais

Avaliações de clientes

Portfólio visual de serviços

Layout responsivo e moderno

🛠️ Tecnologias Utilizadas
Backend

Java

Spring Boot

Spring Web

API REST

Maven

Frontend

HTML5

CSS3

JavaScript Vanilla

📂 Estrutura do Projeto
ada-beauty/
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── service/
│   └── repository/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

⚙️ Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/SamaraMelo299/agendador-horarios

2️⃣ Backend (Spring Boot)
cd backend
mvn spring-boot:run


Servidor padrão:

http://localhost:8080

3️⃣ Frontend

Abra o arquivo:

frontend/index.html


Ou utilize extensão Live Server no VS Code.

📌 Endpoints Principais
Método	Endpoint	Descrição
POST	/agendamentos	Criar agendamento
GET	/agendamentos	Listar agendamentos
DELETE	/agendamentos/{id}	Remover agendamento

(Pode variar conforme sua implementação)

🎯 Objetivo Profissional

Este projeto foi desenvolvido com foco em:

Evolução como desenvolvedora full stack

Prática real de integração backend + frontend

Construção de portfólio profissional

Aplicação de design orientado à experiência do usuário

👩‍💻 Autora

Samara Melo
Desenvolvedora em formação na área de tecnologia, com foco em desenvolvimento web e construção de soluções completas.

⭐ Possíveis Melhorias Futuras

Sistema de login/admin

Agenda visual em calendário

Edição de agendamentos

Banco de dados persistente

Deploy completo (frontend + backend)

Painel administrativo