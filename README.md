# Car Shop

Projeto desenvolvido por [Jonathan R. Andrade](https://www.linkedin.com/in/jonathan-r-andrade/) na [Trybe](https://www.betrybe.com/).

## Sobre

API para gerenciamento de uma concessionária de veículos onde é possível cadastrar, listar, atualizar e deletar veículos, sendo eles carros ou motos. A API foi desenvolvida com Node.js, TypeScript e Express.js, utilizando arquitetura MSC (Model, Service e Controller) para organização do projeto. O banco de dados utilizado foi o MongoDB, e para documentação da API foi utilizada a especificação OpenAPI 3.0 com o Swagger UI.

## Habilidades desenvolvidas

- Criar APIs RESTful;
- Utilizar arquitetura MSC (Model, Service e Controller) para organização do projeto;
- Fazer operações CRUD (Create, Read, Update e Delete) no banco de dados MongoDB;
- Aplicar os princípios da Programação Orientada a Objetos (POO);
- Fazer testes unitários com Mocha, Chai e Sinon.

## Ferramentas/Tecnologias utilizadas

- Ubuntu v22.04
- MongoDB v6.0
- Docker v24
- Docker Compose v2.18
- Node.js v16.20
- TypeScript
- Express.js
- OpenAPI Specification
- Swagger UI

## Como executar

Siga os passos abaixo executando os comandos no terminal.

1. Clone o repositório.

   - Exemplo com Git + HTTPS
     ```
     git clone https://github.com/Jonathan-R-Andrade/car-shop.git
     ```
   - Exemplo com Git + SSH
     ```
     git clone git@github.com:Jonathan-R-Andrade/car-shop.git
     ```
   - Usando GitHub CLI
     ```
     gh repo clone Jonathan-R-Andrade/car-shop
     ```

2. Entre na pasta do repositório clonado.

   ```
   cd car-shop
   ```

3. Crie um arquivo `.env` na raiz do projeto utilizando o arquivo de exemplo `.env.example`.

   ```
   cp .env.example .env
   ```

4. Inicie a API.

   <details>
   <summary>Usando Node.js e MongoDB instalados localmente</summary>

   1. Instale as dependências.

      ```
      npm install
      ```

   2. Inicie a API.

      ```
      npm run dev
      ```

   ***

   Para executar os testes unitários, utilize o comando `npm run test` e para executar a cobertura de testes, utilize o comando `npm run test:coverage`.

   </details>

   <details>
   <summary>Usando Docker Compose</summary>

   1. Inicie via Docker Compose.

      ```
      docker compose up -d
      ```

   ***

   Para executar os testes unitários, utilize o comando `docker exec -t car_shop npm run test` e para executar a cobertura de testes, utilize o comando `docker exec -t car_shop npm run test:coverage`.

   </details>

> Acesse a documentação da API em [http://localhost:3001/api/v1/docs/pt-br/](http://localhost:3001/api/v1/docs/pt-br/).
