describe('Homepage', () => {
    beforeEach(() => {
      // Visit the homepage before each test
      cy.visit('/');
    });
  
    it('toggles accountability modal when link is clicked', () => {
      // Click on the "Attendance Check In" link
      cy.contains('Attendance Check In').click();
  
      // Assert that the accountability modal is opened
      cy.get('.modal-content').should('be.visible');
    });
  
    it('toggles feedback modal when link is clicked', () => {
      // Click on the "Daily Feedback Form" link
      cy.contains('Daily Feedback Form').click();
  
      // Assert that the feedback modal is opened
      cy.get('.modal-content').should('be.visible');
    });
  
    // Add similar tests for toggling other modals
  
  });
  