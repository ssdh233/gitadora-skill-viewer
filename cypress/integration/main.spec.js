// const SITE_URL = "http://gitadora-skill-viewer-dev.herokuapp.com/ja";
const SITE_URL = "http://localhost:5000";

describe("Check if every page can be displayed normally", function() {
  it("Visits the home page", function() {
    // Go to home page
    cy.visit(SITE_URL);

    // Go to list page
    cy.get("#list-button").click();
    cy.get("#list-popover li").first().click();


  });
});
