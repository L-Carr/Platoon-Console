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


describe('Homepage', () => {
    beforeEach(() => {
      // Visit the homepage before each test
      cy.visit('http://localhost:5173/');
    });
  
    it('toggles accountability modal when link is clicked', () => {
      //test modal for Attendance Check In
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Attendance Check In"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    });
  
    it('toggles daily feedback modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Daily Feedback Form"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles daily agenda modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Daily Agenda"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles monthly schedule modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Monthly Schedule"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles curriculum modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Curriculum"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles demos and notes modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Demos and Notes"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles assignments modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Assignments"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles generate pairs modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Generate Pairs"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles generate demo list modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Generate Demo List"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })

    it('toggles youtube playlist modal when link is clicked', () => {
      //test modal for Daily Feedback Form
      it.only('Javascript Alert', () => {
        cy.get('a').click()
        const text = "Youtube Playlist"
        cy.on('window:alert', cy.stub().as('alert'))
        cy.get('@alert', {timeout: 1000}).should("have.been.calledOnce")
      })
    })
  
  
  });
  