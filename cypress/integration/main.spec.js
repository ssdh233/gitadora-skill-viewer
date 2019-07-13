const SITE_URL = "http://gitadora-skill-viewer-dev.herokuapp.com/ja";
// const SITE_URL = "http://localhost:5000";

describe("Smoke test", function() {
  it("Visits home page", function() {
    cy.visit(SITE_URL);
  });

  it("Visits skill list page", function() {
    cy.visit(`${SITE_URL}/exchain/list`);

    cy.get("#list-table").find(".rt-tbody > .rt-tr-group").its("length").should("eq", 100);
  });

  it("Visits kasegi page", function() {
    cy.visit(`${SITE_URL}/exchain/kasegi/d/6000`);
    
    cy.get("#kasegi-hot-table").find(".rt-tbody > .rt-tr-group").its("length").should("eq", 25);
    cy.get("#kasegi-other-table").find(".rt-tbody > .rt-tr-group").its("length").should("eq", 25);
  });

  it("Visits skill page", function() {
    cy.visit(`${SITE_URL}/exchain/1/d`);
    cy.get("#skill-table-hot").find("tbody > tr").its("length").should("eq", 25);
    cy.get("#skill-table-other").find("tbody > tr").its("length").should("eq", 25);
  });
});
