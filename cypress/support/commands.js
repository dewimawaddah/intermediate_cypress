// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.get("#txt-username").clear().type(email);
  cy.get("#txt-password").clear().type(password);
  cy.get("#btn-login").click();
});

Cypress.Commands.add("ketik", (locator, value) => {
  cy.get(locator).should("be.visible").type(value);
});

Cypress.Commands.add("klik", (locator) => {
  cy.get(locator).should("be.visible").click();
});

Cypress.Commands.add("verifyContain", (locator, value) => {
  cy.get(locator).should("contain.text", value);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
