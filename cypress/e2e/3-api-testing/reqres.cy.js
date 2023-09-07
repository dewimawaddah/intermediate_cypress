describe("reqres dan gorest api testing", () => {
  function randomEmail() {
    const randomString = Math.random().toString(36).substring(2, 10);
    const email = randomString + "@gmail.com";
    return email;
  }

  let emailAdress = randomEmail();
  let bodyData = {
    name: "Dewi",
    gender: "female",
    email: emailAdress,
    status: "active",
  };

  it("get list users", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("create users", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "Dewi",
        job: "QA Engineer",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).has.property("name", "Dewi");
    });
  });

  it("create users gorest", () => {
    cy.log("email" + emailAdress);
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization:
          "Bearer 1ea489d05ab4b096b3d7bcfc9e22d61cc81b5021595eb87cf29b3799c20ac3cc",
      },
      body: bodyData,
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });
});
