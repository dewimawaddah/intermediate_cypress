import loginPage from "../../support/pageObject/loginPage";
const user = require("../../fixtures/user.json");

describe("template spec", () => {
  beforeEach(() => {
    // cy.visit("/");
    cy.visit(Cypress.env("herokuapp_url"));
  });

  it("success login with valid username and password", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    loginPage.inputUsername(user[0].username);
    loginPage.inputPassword(user[0].password);
    loginPage.clickBtnLogin();
    cy.url().should("include", "/#appointment");
    cy.get("h2").should("contain.text", "Make Appointment");
  });
});
