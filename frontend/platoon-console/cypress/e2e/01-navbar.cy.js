describe('Navbar', () => {
      context('when logged out', () => {
        beforeEach(() => {
          // Visit the page with the navbar component while simulating that the user is logged out
          cy.visit('http://localhost:5173/', { isLoggedIn: false });
        });
    
        it('displays only login and register links', () => {
          // Check that the "Register" link is visible and has the correct href attribute
          cy.get('nav').contains('Register').should('be.visible')
    
          // Check that the "Login" link is visible and has the correct href attribute
          cy.get('nav').contains('Login').should('be.visible')
    
          // Ensure that other links are not visible
          cy.get('nav').contains('Home').should('not.exist');
          cy.get('nav').contains('Logout').should('not.exist');
        });
      });
    });
  