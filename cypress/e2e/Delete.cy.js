/// <reference types="cypress" />
const baseUrl = Cypress.config("baseUrl");

describe('Delete', () => {
    it('Deletar um funcionário', () => {
        cy.visit(baseUrl);
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button').click();

        // Clicar no botão de Admin
        cy.get(':nth-child(1) > .oxd-main-menu-item').click();
        cy.get(':nth-child(3) > .oxd-table-row > :nth-child(1) > .oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon').click();
        cy.get(':nth-child(3) > .oxd-table-row > :nth-child(6) > .oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click();
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();
        cy.get('.oxd-toast').should('contain', 'Successfully Deleted');
      })
    })