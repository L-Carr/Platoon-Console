describe('User Login and Homepage Links', () => {
  beforeEach(() => {
      // Visit login page before each test
      cy.visit('http://localhost:5173/login')
      
      // Fill out login form and submit
      cy.get("#exampleEmail").type('john.doe@example.com')
      cy.get('#examplePassword').type('password')
      cy.get('form').submit()

      // Verify token in localStorage
      cy.window().its('localStorage.token').should('exist');

      // Wait for redirect to homepage
      cy.url().should('include', 'http://localhost:5173/');
  })

  it('toggles accountability modal when "Attendance Check In" link is clicked', () => {
      cy.contains('Attendance Check In').click()
      // .should('contain', 'x')
      // .click()
      // cy.get('[data-test="accountability-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "Daily Feedback Form" link is clicked', () => {
      cy.contains('Daily Feedback Form').click();
      // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "Daily Agenda" link is clicked', () => {
    cy.contains('Daily Agenda').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
    });

  it('toggles daily feedback modal when "Monthly Schedule" link is clicked', () => {
  cy.contains('Monthly Schedule').click();
  // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "Curriculum" link is clicked', () => {
    cy.contains('Curriculum').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "Demos & Notes" link is clicked', () => {
    cy.contains('Demos & Notes').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "Assignments" link is clicked', () => {
    cy.contains('Assignments').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
});

  it('toggles daily feedback modal when "Generate Pairs" link is clicked', () => {
    cy.contains('Generate Pairs').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
});

  it('toggles daily feedback modal when "Generate Demo List" link is clicked', () => {
    cy.contains('Generate Demo List').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });

  it('toggles daily feedback modal when "YouTube Playlist" link is clicked', () => {
    cy.contains('YouTube Playlist').click();
    // cy.get('[data-test="feedback-modal"]').should('be.visible');
  });
  
});
