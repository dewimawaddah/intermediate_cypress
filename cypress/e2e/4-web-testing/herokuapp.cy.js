describe("test herokuapp", () => {
  beforeEach(() => {
    // cy.visit("/");
    cy.visit(Cypress.env("herokuapp_url"));
  });

  it("success login with username dan password valid", () => {
    cy.fixture("user.json").then((user) => {
      const datauser = user[0];
      cy.get("#menu-toggle > .fa").click();
      cy.get("#sidebar-wrapper").should("have.class", "active");
      cy.get(".sidebar-nav > :nth-child(4) > a").click();
      cy.get(".lead").should("have.text", "Please login to make appointment.");
      cy.login(datauser.username, datauser.password);
      cy.url().should("include", "/#appointment");
      cy.get("h2").should("contain.text", "Make Appointment");
    });
  });

  it("failed login with username invalid", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    cy.get("#txt-username").type("John Does");
    cy.get("#txt-password").type("ThisIsNotAPassword");
    cy.get("#btn-login").click();
    cy.verifyContain(
      ".text-danger",
      "Login failed! Please ensure the username and password are valid."
    );
  });

  it("failed login with password invalid", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    cy.get("#txt-username").type("John Doe");
    cy.get("#txt-password").type("ThisIsNotAPasswordd");
    cy.get("#btn-login").click();
    cy.get(".text-danger").should(
      "contain.text",
      "Login failed! Please ensure the username and password are valid."
    );
  });

  it("failed login with username and password not filled", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    cy.get("#btn-login").click();
    cy.get(".text-danger").should(
      "contain.text",
      "Login failed! Please ensure the username and password are valid."
    );
  });

  it.only("test multiple failed login with fixtures", () => {
    cy.fixture("fail-user.json").then((user) => {
      user.failed_login.forEach((datauser) => {
        cy.get("#menu-toggle > .fa").click();
        cy.get("#sidebar-wrapper").should("have.class", "active");
        cy.get(".sidebar-nav > :nth-child(4) > a").click();
        cy.get(".col-sm-12 > :nth-child(2)").should(
          "have.text",
          "Please login to make appointment."
        );
        cy.login(datauser.username, datauser.password);
        cy.verifyContain(".text-danger", datauser.error_message);
      });
    });
  });

  it("user success make appointment", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    cy.ketik("#txt-username", "John Doe");
    cy.ketik("#txt-password", "ThisIsNotAPassword");
    cy.klik("#btn-login");
    cy.url().should("include", "/#appointment");
    cy.verifyContain("h2", "Make Appointment");
    cy.get("select")
      .select("Hongkong CURA Healthcare Center")
      .should("have.value", "Hongkong CURA Healthcare Center");
    cy.get("#chk_hospotal_readmission").check();
    cy.get("#radio_program_medicaid").check("Medicaid");
    cy.get("#txt_visit_date").type("06/09/2023");
    cy.get(".active.day").click();
    cy.get("#txt_comment").type("hello saya appointment di tgl 06");
    cy.get("#btn-book-appointment").click();
    cy.url().should("include", "/appointment.php#summary");
    cy.get("h2").should("contain.text", "Appointment Confirmation");
  });

  it("user failed make appointment with empty visit date", () => {
    cy.get("#menu-toggle > .fa").click();
    cy.get("#sidebar-wrapper").should("have.class", "active");
    cy.get(".sidebar-nav > :nth-child(4) > a").click();
    cy.get(".lead").should("have.text", "Please login to make appointment.");
    cy.ketik("#txt-username", "John Doe");
    cy.ketik("#txt-password", "ThisIsNotAPassword");
    cy.klik("#btn-login");
    cy.url().should("include", "/#appointment");
    cy.verifyContain("h2", "Make Appointment");
    cy.get("select")
      .select("Hongkong CURA Healthcare Center")
      .should("have.value", "Hongkong CURA Healthcare Center");
    cy.get("#chk_hospotal_readmission").check();
    cy.get("#radio_program_medicaid").check("Medicaid");
    cy.get("#txt_comment").type("hello saya appointment di tgl 06");
    cy.get("#btn-book-appointment").click();
    cy.get("#txt_visit_date:invalid")
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });
});
