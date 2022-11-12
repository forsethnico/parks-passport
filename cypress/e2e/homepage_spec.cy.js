describe('Parks HomePage', () => {
  beforeEach(()=> {
    cy.intercept('https://developer.nps.gov/api/v1/parks?q=abraham', {
      fixture: "search_fixture.json"
    })
    .visit("http://localhost:3000")
    .as("parks");
  });

  it('should have a National Parks Passport header', () => {
    cy.get('.logo').should('have.attr', 'src', "../../assets/header.png")
  });

  it('should have a passport nav link', () => {
    cy.get('.passport').should('have.attr', 'src', "../../assets/parksPassport.png")
  });

  


})



describe('Search Form', () => {
  it('should have a ', () => {
    cy.visit('https://example.cypress.io')
  })




  it('should show park cards once a search is submitted', () => {
    
  });

})