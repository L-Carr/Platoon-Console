describe('User Login', () => {
    beforeEach(() => {
        //visit login page before each test
        cy.visit('http://localhost:5173/login')
    })

    it('successfully logs in a user with valid credentials', () => {
        //fill out login form and grab and apply tokens from localStorage
        cy.get("#exampleEmail").type('john.doe@example.com')
        cy.get('#examplePassword').type('password')

        //submit form
        cy.get('form').submit()

        // Verify token in localStorage
        cy.window().its('localStorage.token').should('exist');

    })
})