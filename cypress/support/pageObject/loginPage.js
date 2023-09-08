class LoginPage {
  username = "#txt-username";
  password = "#txt-password";
  btnLogin = "#btn-login";
  errMessage = ".text-danger";

  inputUsername(username) {
    cy.get(this.username).type(username);
  }

  inputPassword(password) {
    cy.get(this.password).type(password);
  }

  clickBtnLogin() {
    cy.get(this.btnLogin).click();
  }
}

export default new LoginPage();
