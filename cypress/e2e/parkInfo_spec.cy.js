describe("ParkInfo spec", () => {
  beforeEach(() => {
    cy.fixture("parkInfo_fixture").then((json) => {
      cy.intercept(
        "GET",
        "https://developer.nps.gov/api/v1/parks?parkCode=abli",
        json
      );
      cy.visit("http://localhost:3000/parks/abli");
    });
  });

  it("should have a National Parks Passport header", () => {
    cy.get(".logo").should("be.visible");
  });

  it("should have a passport nav link", () => {
    cy.get(".passport-link").click();
    cy.url().should("include", "/passport");
  });

  it("should have an image and park details about the chosen park", () => {
    cy.get(".individual-park-image").should(
      "have.attr",
      "src",
      "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg"
    );
    cy.get(".individual-park-name").contains(
      "h2",
      "Abraham Lincoln Birthplace National Historical Park"
    );
    cy.get("p").contains(
      "Description: For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln. His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War. Visit our country's first memorial to Lincoln, built with donations from young and old, and the site of his childhood home."
    );
    cy.get("p").contains("Address: 2995 Lincoln Farm Road, Hodgenville, KY");
    cy.get("p").contains(
      "Activities: Astronomy, Stargazing, Food, Picnicking, Guided Tours, Self-Guided Tours - Walking, Junior Ranger Program, Wildlife Watching, Birdwatching, Park Film, Museum Exhibits, Shopping, Bookstore and Park Store, Gift Shop and Souvenirs"
    );
  });

  it("should be able to enter a date visited into the form, click to add stamp to passport, and see visual approval that it was added", () => {
    cy.get(".add-visited").contains("Date Visited:");
    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').type("11/13/2022");
    cy.get('input[type="text"]').should("have.value", "11/13/2022");
    cy.get(".add-visit-btn").click();
    cy.get(".approval-check-image").should("be.visible");
    cy.get("h4").contains("Passport stamped!");
  });
});

describe("Park Info errors", () => {
  it("should display a message to the user when server cannot retrieve individual park info", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?parkCode=abli" },
      { statusCode: 400 }
    );
    cy.visit("http://localhost:3000/parks/abli");
    cy.get(".error-message").contains("400:Bad Request- sorry try again!");
  });

  it("should display a message to the user when the individual park info is not found", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?parkCode=abli" },
      { statusCode: 404 }
    );
    cy.visit("http://localhost:3000/parks/abli");
    cy.get(".error-message").contains("404:Not Found- sorry try again!");
  });

  it("should display a message to the user when the server is down to retrieve individual park info", () => {
    cy.intercept(
      { url: "https://developer.nps.gov/api/v1/parks?parkCode=abli" },
      { statusCode: 500 }
    );
    cy.visit("http://localhost:3000/parks/abli");
    cy.get(".error-message").contains(
      "500:Internal Server Error- sorry try again!"
    );
  });
});

