describe('User Login', () => {
    beforeEach(() => {
        //visit login page before each test
        cy.visit('http://localhost:5173/login')
    })

    it('successfully logs in a user with valid credentials', () => {
        //fill out login form and grab and apply tokens from localStorage
        cy.get("#exampleEmail").type('john.doe@example.com')
        cy.get('#examplePassword').type('password')

        //check token
        // Cypress.Commands.add('checkToken', (token) => {
        //     cy.window().its('localStorage.token').should('eq', token)
        // })
        // cy.checkToken('abc123')
        cy.window().its('localStorage.token').should('exist');


        //submit form
        cy.get('form').submit()

        //send post request to login endpoint
        cy.request({
            url: 'http://localhost:8000/user/login/',
            method: 'POST',
            body: {
                email: 'john.doe@example.com',
                password: 'password'
            }
        })
    })
})