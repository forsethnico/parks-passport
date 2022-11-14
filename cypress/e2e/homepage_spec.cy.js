describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have a National Parks Passport header", () => {
    cy.get(".logo").should("be.visible");
  });

  it("should have a passport nav link", () => {
    cy.get(".passport-link").click();
    cy.url().should("include", "/passport");
  });

  it("should redirect user back to homepage when a garbage url is typed", () => {
    cy.visit("http://localhost:3000/garbage");
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("Search Form", () => {
  beforeEach(() => {
    cy.fixture("parks_fixture").then((json) => {
      cy.intercept("https://developer.nps.gov/api/v1/parks?q=abraham", json);
    });
    cy.visit("http://localhost:3000");
  });

  it("should render a search bar input and submit button", () => {
    cy.get("form").get('input[type="text"]');
    cy.get("form").get(".search-btn");
  });

  it("should have be able to type in a search query, view park cards results, and be taken to park info page once one card is clicked", () => {
    cy.get("form").get('input[type="text"]').type("abraham");
    cy.get("form").get('input[type="text"]').should("have.value", "abraham");
    cy.get("form").get(".search-btn").click();
    cy.get(".park-image")
      .first()
      .should(
        "have.attr",
        "src",
        "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg"
      );
    cy.get(".park-card").first().contains("h2", "Abraham Lincoln Birthplace");
    cy.get('[href="/parks/anti"] > .park-card')
      .contains("h2", "Antietam")
      .get('[href="/parks/anti"] > .park-card > .park-image')
      .should(
        "have.attr",
        "src",
        "https://www.nps.gov/common/uploads/structured_data/3C80828B-1DD8-B71B-0BAC8994DD862724.jpg"
      );
    cy.get(".park-card")
      .first()
      .contains("h2", "Abraham Lincoln Birthplace")
      .click();
    cy.url().should("include", "/abli");
    cy.get(".individual-park-name").contains(
      "h2",
      "Abraham Lincoln Birthplace National Historical Park"
    );
  });

  it("should be able to display an error when the user does not fill in a search query before pressing submit", () => {
    cy.get("form").get(".search-btn").click();
    cy.contains("h4", "Enter a search query");
  });
});

describe("Home Page Errors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("form").get('input[type="text"]').type("abraham");
    cy.get("form").get('input[type="text"]').should("have.value", "abraham");
  });

  it("should display a message to the user when server cannot retrieve search results", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?q=abraham" },
      { statusCode: 400 }
    );
    cy.get("form").get(".search-btn").click();
    cy.get(".error-message").contains("400:Bad Request- sorry try again!");
  });

  it("should display a message to the user when search results are not found", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?q=abraham" },
      { statusCode: 404 }
    );
    cy.get("form").get(".search-btn").click();
    cy.get(".error-message").contains("404:Not Found- sorry try again!");
  });

  it("should display a message to the user when the server is down to retrieve search results info", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?q=abraham" },
      { statusCode: 500 }
    );
    cy.get("form").get(".search-btn").click();
    cy.get(".error-message").contains(
      "500:Internal Server Error- sorry try again!"
    );
  });
});
