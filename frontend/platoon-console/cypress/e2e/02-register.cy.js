
describe('User Registration', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('http://localhost:5173/register');
  });

  it('successfully registers a user with valid credentials', () => {
    // Fill out the registration form with valid credentials
    cy.get('#exampleFirstName').type('John');
    cy.get('#exampleLastName').type('Doe');
    cy.get('#exampleEmail').type('john.doe@example.com');
    cy.get('#examplePhoneNumber').type('1234567890');
    cy.get('#exampleCohortCode').type('XYAI-2ADA');
    cy.get('#examplePassword').type('password');
    cy.get('#exampleVerifyPassword').type('password');

    // Intercept the registration request and alias it as 'user-registration'
    cy.intercept('POST', 'http://127.0.0.1:8000/user/register/').as('user-registration');

    // Submit the form
    cy.get('form').submit();

    // Ensure redirection to the home page
    cy.url().should('include','http://localhost:5173/');
  });

  it('displays error message for existing user', () => {
    // Fill out the registration form with existing email
    cy.get('#exampleFirstName').type('Jane');
    cy.get('#exampleLastName').type('Doe');
    cy.get('#exampleEmail').type('existing.user@example.com');
    cy.get('#examplePhoneNumber').type('1234567890');
    cy.get('#exampleCohortCode').type('XYAI-2ADA');
    cy.get('#examplePassword').type('7qh!*FXw');
    cy.get('#exampleVerifyPassword').type('7qh!*FXw');

    // Submit the form
    cy.get('form').submit();

    // Assert that error message is displayed
    cy.contains('User Email already exists.');
  });

  it('displays error message for mismatched passwords', () => {
    // Fill out the registration form with mismatched passwords
    cy.get('#exampleFirstName').type('Sam');
    cy.get('#exampleLastName').type('Smith');
    cy.get('#exampleEmail').type('sam.smith@example.com');
    cy.get('#examplePhoneNumber').type('1234567890');
    cy.get('#exampleCohortCode').type('GHI789');
    cy.get('#examplePassword').type('password1');
    cy.get('#exampleVerifyPassword').type('password2');

    // Submit the form
    cy.get('form').submit();

    // Assert that error message is displayed
    cy.contains('Passwords do not match!');
  });
});

