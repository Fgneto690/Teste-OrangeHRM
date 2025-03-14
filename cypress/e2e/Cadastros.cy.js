const baseUrl = Cypress.config("baseUrl");

// Função auxiliar para login
const loginAsAdmin = () => {
  cy.visit(baseUrl);
  cy.get('[name="username"]').type('Admin');
  cy.get('[name="password"]').type('admin123');
  cy.get('.oxd-button').click();
};

// Função auxiliar para acessar o módulo PIM e adicionar funcionário
const navigateToAddEmployee = () => {
  cy.get('.oxd-main-menu-item').contains('PIM').click();
  cy.get('.oxd-button').contains('Add').click();
};

describe("Cenários de cadastro de Funcionário", () => {
  
  beforeEach(() => {
    loginAsAdmin();
  });

  it("Cadastro de Funcionário sem acesso ao sistema administrador", () => {
    const uniqueId = Date.now().toString().slice(-9);
    
    navigateToAddEmployee();

    cy.get('[name="firstName"]').type('João');
    cy.get('[name="middleName"]').type('Silva');
    cy.get('[name="lastName"]').type('Andrade');
    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear(Text).type(uniqueId);

    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-text--toast-message').should('be.visible');
  });

  it("Cadastro de Funcionário com acesso ao sistema administrador", () => {
    const uniqueId = Date.now().toString().slice(-9);
    const uniqueUsername = `user_${uniqueId}`;

    navigateToAddEmployee();

    cy.get('[name="firstName"]').type('João');
    cy.get('[name="middleName"]').type('Silva1');
    cy.get('[name="lastName"]').type('Andrade1');
    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear(Text).type(uniqueId);
    cy.get('.oxd-switch-input').click();
    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(uniqueUsername);    
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('JoaoSilva1234');
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('JoaoSilva1234');
    cy.get('.oxd-button--secondary').click();
    cy.get('.oxd-text--toast-message').should('be.visible');
  });

  it("Cadastro de Funcionário sem preencher nome", () => {
    const uniqueId = Date.now().toString().slice(-9);
    
    navigateToAddEmployee();
    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear(Text).type(uniqueId);
    cy.get('.oxd-button--secondary').click();
    cy.get('.--name-grouped-field > :nth-child(1) > .oxd-text').should('be.visible');
    cy.get('.--name-grouped-field > :nth-child(3) > .oxd-text').should('be.visible');
  });

  it("Cadastro de Funcionário sem preencher ID", () => {
    //Segundo as regras de negocio esse teste deveria falhar, pois o campo ID é obrigatório
    //Porém o sistema não está validando o campo ID, por isso o teste passa
    navigateToAddEmployee();

    cy.get('[name="firstName"]').type('João');
    cy.get('[name="middleName"]').type('Silva1');
    cy.get('[name="lastName"]').type('Andrade1');
    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear(Text);
    cy.get('.oxd-button--secondary').click();
  });

  it("Cadastro de Funcionário com acesso ao sistema administrador sem preencher usuário e senha", () => {
    const uniqueId = Date.now().toString().slice(-9);
    
    navigateToAddEmployee();

    cy.get('[name="firstName"]').type('João');
    cy.get('[name="middleName"]').type('Silva1');
    cy.get('[name="lastName"]').type('Andrade1');
    cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear(Text).type(uniqueId);
    cy.get('.oxd-switch-input').click();
    cy.get('.oxd-button--secondary').click();
    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > .oxd-text').should('be.visible');
    cy.get('.user-password-cell > .oxd-input-group > .oxd-text').should('be.visible');
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible');
});
});
