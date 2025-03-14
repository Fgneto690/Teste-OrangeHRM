/// <reference types="cypress" />
// Importando baseUrl do arquivo de configuração
const baseUrl = Cypress.config("baseUrl");

// Função auxiliar para login
Cypress.Commands.add('login', (username, password) => {
  cy.visit(baseUrl);
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('.oxd-button').click();
});

describe('Cenarios de login', () => {
  
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('Login com credenciais corretas', () => {
    // DADO QUE O USUÁRIO ESTÁ NA PÁGINA DE LOGIN
    // QUANDO O USUÁRIO INSERE AS CREDENCIAIS CORRETAS
    cy.login('Admin', 'admin123');

    // ENTÃO o usuário deve ser redirecionado para a página de dashboard
    cy.url().should('include', 'dashboard');
  });

  it('Login com usuário incorreto e senha correta', () => {
    // DADO QUE O USUÁRIO ESTÁ NA PÁGINA DE LOGIN
    // QUANDO INSIRO USUARIO INCORRETO
    cy.login('Ademin', 'admin123');

    // ENTÃO Recebo mensagem de erro
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('Login com usuário correto e senha incorreta', () => {
    // DADO QUE O USUÁRIO ESTÁ NA PÁGINA DE LOGIN
    // QUANDO INSIRO USUARIO CORRETO E SENHA INCORRETA
    cy.login('Admin', 'admin1234');

    // ENTÃO Recebo mensagem de erro
    cy.get('.oxd-alert-content').should('contain', 'Invalid credentials');
  });

  it('Login sem usuário e senha', () => {
    // DADO QUE O USUÁRIO ESTÁ NA PÁGINA DE LOGIN
    // QUANDO NÃO INSIRO USUARIO E SENHA
    cy.get('.oxd-button').click();

    // ENTÃO Recebo mensagem de erro deve está visível
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible');
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('be.visible');
  });

  it('Login com usuário e senha de funcionario criado para testes', () => {
    // DADO QUE O USUÁRIO ESTÁ NA PÁGINA DE LOGIN
    // QUANDO INSIRO USUARIO E SENHA CORRETOS DE FUNCIONARIO CRIADO PARA TESTES
    cy.login('Joao_Silva', 'JoaoSilva1234');

    // ENTÃO Recebo mensagem de sucesso
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
  });
});