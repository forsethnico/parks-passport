describe('Passport Page', () => {
  beforeEach(()=> {
    cy.fixture("parks_fixture").then((json) => {
      cy.intercept(
        "https://developer.nps.gov/api/v1/parks?q=abraham",
        json
      );
      cy.visit("http://localhost:3000/");
    });
  })

  it("should have a National Parks Passport header", () => {
    cy.get(".logo").should("be.visible");
  });

  it("should have a passport nav link", () => {
    cy.get(".passport-link").click();
    cy.url().should("include", "/passport");
  });

  it("should be able to see park image, name, and date added to user passport as a stamp", () => {
    cy.get('form').get('input[type="text"]').type('abraham')
    cy.get('form').get('input[type="text"]').should("have.value", 'abraham')
    cy.get('form').get('.search-btn').click()
    cy.get(".park-name").first().contains(
      "h2",
      "Abraham Lincoln Birthplace"
    ).click()
    cy.url().should('include', '/parks/abli')
    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').type("11/13/2022");
    cy.get('input[type="text"]').should("have.value", "11/13/2022");
    cy.get(".add-visit-btn").click()
    cy.get('.passport-link').click()
    cy.url().should('include', '/passport')
    cy.get('.stamp-title').first().contains("Abraham Lincoln Birthplace")
    cy.get('.stamp-date').first().contains('Sun Nov 13 2022')
    cy.get('.overlay').should('be.visible')
    cy.get('.park-stamp-image').first().should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg')
  });

  it('should be able to add a different stamp to their passport and when clicked the stamp takes user back to park info page', () => {
    cy.get('form').get('input[type="text"]').type('abraham')
    cy.get('form').get('input[type="text"]').should("have.value", 'abraham')
    cy.get('form').get('.search-btn').click()
    cy.get(".park-name").contains(
      "h2",
      "Antietam"
    ).click()
    cy.url().should('include', '/parks/anti')
    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').type("11/10/2022");
    cy.get('input[type="text"]').should("have.value", "11/10/2022");
    cy.get(".add-visit-btn").click()
    cy.get('.passport-link').click()
    cy.url().should('include', '/passport')
    cy.get('.stamp-title').contains("Antietam")
    cy.get('.stamp-date').contains('Thu Nov 10 2022')
    cy.get('.overlay').should('be.visible')
    cy.get('.park-stamp-image').should('have.attr', 'src', 'https://www.nps.gov/common/uploads/structured_data/3C80828B-1DD8-B71B-0BAC8994DD862724.jpg')
    cy.get('.stamp-cards').first().contains('h4', 'Antietam').click()
    cy.url().should('include', '/parks/anti')
    cy.get('.individual-park-name').contains('Antietam National Battlefield')
  });

  it('should show an x image to the user if the stamp info was not found', () => {
    
  })
})