# OrangeHRM Cypress Tests

Este projeto contém testes automatizados para o sistema OrangeHRM usando Cypress.

## Estrutura do Projeto

- `cypress/`
  - `downloads/`: Diretório para downloads durante os testes.
  - `e2e/`: Testes de ponta a ponta.
    - `Cadastros.cy.js`: Testes de cadastro de funcionários.
    - `Login.cy.js`: Testes de login.
  - `fixtures/`: Arquivos de dados de teste.
  - `support/`: Arquivos de suporte e comandos personalizados.

## Configuração

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd OrangeHRM
2. instale as dependências:
    npm install
3. Abra o Cypress:
    npx cypress open

## Executando os testes

1. Para executar todos os testes:

    npx cypress open
2. Para executar um teste especifico:

    npx cypress run --spec "cypress/e2e/Login.cy.js"

## Estrutura dos Testes

## Login.cy.js

Este arquivo contém cenários de teste para o login no sistema.

## Cadastros.cy.js

Este arquivo contém cenários de teste para o cadastro de funcionários.

## Contribuição

Sinta-se à vontade para contribuir com melhorias e novos testes. Envie um pull request com suas alterações.

