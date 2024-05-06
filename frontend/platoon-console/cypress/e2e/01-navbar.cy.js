describe('Navbar', () => {
    context('when logged out', () => {
      beforeEach(() => {
        // Visit the page with the navbar component while simulating that the user is logged out
        cy.visit('http://localhost:5173/', { isLoggedIn: false });
      });
  
      it('displays only login and register links', () => {
        // Check that the "Register" link is visible and has the correct href attribute
        cy.get('nav').contains('Register').should('be.visible')
        // .and('have.attr', 'href', '/register');
  
        // Check that the "Login" link is visible and has the correct href attribute
        cy.get('nav').contains('Login').should('be.visible')
        // .and('have.attr', 'href', '/login');
  
        // Ensure that other links are not visible
        cy.get('nav').contains('Home').should('not.exist');
        cy.get('nav').contains('Logout').should('not.exist');
      });
    });

    context('when logged in', () => {
        beforeEach(() => {
          // Visit the page with the navbar component while simulating that the user is logged in
          cy.visit('http://localhost:5173/', { isLoggedIn: true });
        });
    
        it('displays home and logout links', () => {
          // Check that the "Home" link is visible and has the correct href attribute
          cy.get('nav').contains('Home').should('be.visible')
          // .and('have.attr', 'href', '/')
    
          // Check that the "Logout" link is visible and has the correct href attribute
          cy.get('nav').contains('Logout').should('be.visible')
          // .and('have.attr', 'href', '/login');
    
          // Ensure that other links are not visible
          cy.get('nav').contains('Register').should('not.exist');
          cy.get('nav').contains('Login').should('not.exist');
        });
      });
    });
  