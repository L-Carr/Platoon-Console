describe('User Login', () => {
    beforeEach(() => {
        //visit login page before each test
        cy.visit('http://localhost:5173/login')
    })

    it('successfully logs in a user with valid credentials', () => {
        //fill out login form and grab and apply tokens from localStorage
        // cy.get("#exampleEmail").type('john.doe@example.com')
        // cy.get('#examplePassword').type('password')
        cy.get("#exampleEmail").type('john.doe@example.com')
        cy.get('#examplePassword').type('P@sswordMain')

        //submit form
        cy.get('form').submit()

        // Verify token in localStorage
        cy.window().its('localStorage.token').should('exist');

    })
    

    it('displays error message with invalid credentials', () => {
        // Fill out login form with invalid credentials
        cy.get("#exampleEmail").type('invalidusername')
        cy.get('#examplePassword').type('passwords123')
        cy.get('form').submit()

        // Verify error message
        cy.on('window:alert', (message) => [
            expect(message).to.equal('Please include an @ in the email address.')
        ])
    })

})