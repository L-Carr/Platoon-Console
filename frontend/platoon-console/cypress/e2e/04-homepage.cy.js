describe('Homepage', () => {
    beforeEach(() => {
      // Visit the homepage before each test
      cy.visit('http://localhost:5173/');
    });
  
    it('toggles accountability modal when link is clicked', () => {
      // Click on the "Attendance Check In" link
      cy.get('Attendance Check In').click();
  
      // Assert that the accountability modal is opened
    //   cy.get('[data-test="attendance-modal"]').click();
    });
  
    it('toggles feedback modal when link is clicked', () => {
      // Click on the "Daily Feedback Form" link
      cy.contains('Daily Feedback Form').click();
  
      // Assert that the feedback modal is opened
      cy.get().should('be.visible');
    });
  
  });
  