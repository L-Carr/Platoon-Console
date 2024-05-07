

describe('User Login and Logout', () => {
    beforeEach(() => {
        // Visit login page before each test
        cy.visit('http://localhost:5173/login')
        
        // Fill out login form and submit
        cy.get("#exampleEmail").type('john.doe@example.com')
        cy.get('#examplePassword').type('password')
        cy.get('form').submit()
  
        // // Verify token in localStorage
        cy.window().its('localStorage.token').should('exist');
        // cy.login();
        // Wait for redirect to homepage
        cy.url().should('include', 'http://localhost:5173/');
    })

    it('redirects to login page after logout', () => {
        // Click on the logout button or link
        cy.contains('Logout').click();
  
        // Ensure redirection to the login page
        cy.url().should('include', 'http://localhost:5173/login');
    });
})
