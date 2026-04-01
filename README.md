# Mundo Pet

[![Status](https://img.shields.io/badge/Status-Concluído-16A34A?style=for-the-badge)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827)](#tecnologias-utilizadas)
[![Webpack](https://img.shields.io/badge/Webpack-5-1E90FF?style=for-the-badge&logo=webpack&logoColor=white)](#tecnologias-utilizadas)
[![JSON_Server](https://img.shields.io/badge/JSON%20Server-API_Local-111827?style=for-the-badge)](#estrutura-de-dados-api-local)

Aplicação web para gerenciamento de agendamentos de serviços de pet shop por data e horário.

## Sobre o projeto

O Mundo Pet permite criar, visualizar e cancelar agendamentos de atendimento de um pet shop. A agenda é exibida por períodos do dia (manhã, tarde e noite), com atualização automática após cada ação.

## Funcionalidades

- Cadastro de agendamento com: tutor, pet, telefone, serviço, data e hora
- Listagem de agendamentos por data selecionada
- Separação automática por período do dia
- Bloqueio de horários já ocupados
- Bloqueio de horários passados
- Bloqueio de agendamento aos domingos
- Cancelamento de agendamento com confirmação

## Tecnologias utilizadas

- JavaScript (ES Modules)
- HTML e CSS
- Day.js
- JSON Server
- Webpack
- Babel

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie a API local (JSON Server):

```bash
npm run server
```

3. Em outro terminal, inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador a URL exibida pelo Webpack Dev Server.

## Scripts disponíveis

- `npm run server`: sobe a API local em `http://localhost:3333`
- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera build de produção

## Estrutura de dados (API local)

Endpoint principal:

- `GET /appointments`

Campos do agendamento:

- `id`
- `pet`
- `tutor`
- `telephone`
- `service`
- `when`

## Aprendizados do projeto

Este projeto consolida prática em:

- Integração de front-end com API REST simulada
- Organização de código em módulos com separação de responsabilidades
- Manipulação de datas e horários com Day.js
- Regras de disponibilidade de agenda (conflito, horário passado e dia fechado)
- Renderização dinâmica e atualização de estado no DOM após criar ou cancelar agendamentos
- Tratamento de erros em operações de API, com retorno de status para evitar quebra de fluxo
- Validação de formulário no front-end, incluindo máscara de telefone, controle de datas inválidas e bloqueio de horários indisponíveis
- Feedback visual ao usuário por meio de alertas, estados de interação e confirmação de ações críticas

## Autor

Felipe Mendes

- Portfolio: https://felipemasdev.github.io/Portfolio-Dev/
- LinkedIn: https://www.linkedin.com/in/felipe-mendes-a-s-dev/
- E-mail: felipe.mas.dev@gmail.com

