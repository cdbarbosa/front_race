describe('The Login Test for Each Possible User', function () {
  before(function () {
  })

  beforeEach(function () {
    // cy.fixture('AdminUser').as('AdminUser')
  })

  it('Loads the login form successfully', function () {
    cy.visit('/')
    cy.get('[data-cy=login-form]')
    cy.get('[data-cy=login-email-input]')
    cy.get('[data-cy=login-password-input]')
  })

  // it('User can not create an Report without the required fields', function () {
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  // })
  //
  // it('User can create a new Accient Report as a draft', function () {
  //   cy.get('[data-cy=create-form]')
  //
  //   cy.get('[data-cy=ani-create-accident-person-information]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.hidden')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.hidden')
  //   cy.get('[data-cy=person-name-input]').click().type('Cypress Person 01')
  //   cy.get('[data-cy=sex-male-radio]').check()
  //
  //   cy.wait('@getAnIRoles')
  //   cy.get('[data-cy=ani-roles-select]')
  //     .select('Pupil')
  //
  //   // Try to go to STEP 2
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 2
  //   cy.get('[data-cy=ani-create-accident-injury-detail]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 3
  //   cy.get('[data-cy=ani-create-accident-details]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 4
  //   cy.get('[data-cy=ani-create-confirmation]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.hidden')
  //
  //   // Populate the state on STEP 4
  //   cy.get('[data-cy=responsible-user]')
  //     .click()
  //     .type('Cypress')
  //
  //   cy.wait('@getUser')
  //
  //   cy.get('[data-cy=responsible-user]')
  //     .click()
  //     .type('{enter}')
  //
  //   cy.get('[data-cy=form-submit]').should('not.be.disabled')
  //
  //   cy.get('[data-cy=form-submit]').click()
  //   cy.location('pathname', { timeout: 6000 })
  //     .should('include', '/accidents-and-incidents/reports')
  //
  //   cy.get('[data-cy=ani-reports-table]')
  //   cy.wait('@getAnIReports')
  //   cy.get('[data-cy=pagination-total]').contains(1)
  //   cy.get('[data-cy="ani-report-type-1"]').contains('accident')
  //   cy.get('[data-cy=ani-edit-report-1]').contains('Update')
  // })
  //
  // it('User can create a new Accient Report as a Open Report', function () {
  //   cy.get('[data-cy=create-form]')
  //
  //   // Initial state on STEP 1
  //   cy.get('[data-cy=ani-create-accident-person-information]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.hidden')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.hidden')
  //
  //   // Populate the state on STEP 1
  //   cy.get('[data-cy=person-name-input]')
  //     .click()
  //     .type('Cypress Person 01')
  //
  //   cy.get('[data-cy=sex-male-radio]').check()
  //
  //   cy.get('[data-cy=date-of-birth-calendar]').click()
  //   cy.get('tbody > :nth-child(1) > :nth-child(2)').click()
  //
  //   cy.wait('@getAnIRoles')
  //
  //   cy.get('[data-cy=ani-roles-select]')
  //     .select('Pupil')
  //
  //   // cy.wait(1000)
  //
  //   // Try to go to STEP 2
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 2
  //   cy.get('[data-cy=ani-create-accident-injury-detail]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //
  //   // Populate the state on STEP 2
  //   cy.get('#jaw').click()
  //   cy.get('[data-cy=ani-injury-indicator-jaw]').contains('jaw')
  //
  //   cy.get('[data-cy=ani-injury-type-select]').select('Animal attack')
  //   cy.get('[data-cy=ani-injury-result-select]').select('Require First Aid')
  //   cy.get('[data-cy=ani-injury-cause-select]').select('Injured by an animal')
  //
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 3
  //   cy.get('[data-cy=ani-create-accident-details]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.visible')
  //
  //   // Populate the state on STEP 3
  //   cy.get('[data-cy=date-of-event-calendar]').click()
  //   cy.get('tbody > :nth-child(1) > :nth-child(5)').click()
  //
  //   cy.get('[data-cy=time-of-event-calendar]').type('12:35')
  //
  //   cy.get('[data-cy=ani-locations-modal]').click().wait('@getSites')
  //   cy.get('[data-cy=site-1]').click().wait('@getSiteBuildings')
  //   cy.get('[data-cy=building-1]').click().wait('@getBuildingRooms')
  //   cy.get('[data-cy=room-1]').click()
  //   cy.get('[data-cy=asset-location-picker-select]').click()
  //
  //   cy.get('[data-cy=ani-witnesses-modal]').click()
  //   cy.get('[data-cy=ani-witness-name-1]').type('Cypress Witness 1')
  //   cy.get('[data-cy=ani-add-witness-button]').click()
  //   cy.get('[data-cy=ani-witness-name-2]').type('Cypress Witness 2')
  //   cy.get('[data-cy=witnesses-select]').click()
  //
  //   cy.get('[data-cy=ani-witness-statement-complete-radio]').check()
  //
  //   cy.get('[data-cy=ani-main-details-textarea]').type('Cypress main details')
  //
  //   cy.get('[data-cy=ani-first-aid-administered-radio]').check()
  //
  //   cy.get('[data-cy=ani-first-aider-name-input]').type('Cypress First Aider')
  //   cy.get('[data-cy=ani-details-of-treatment-textarea]').type('Cypress treatment')
  //
  //   cy.get('[data-cy=ani-report-next-step]').click()
  //
  //   // Initial state on STEP 4
  //   cy.get('[data-cy=ani-create-confirmation]')
  //
  //   cy.get('[data-cy=form-submit]').should('be.disabled')
  //   cy.get('[data-cy=ani-report-back-step]').should('be.visible')
  //   cy.get('[data-cy=ani-report-next-step]').should('be.hidden')
  //
  //   // Populate the state on STEP 4
  //   cy.get('[data-cy=responsible-user]')
  //     .click()
  //     .type('Cypress')
  //
  //   cy.wait('@getUser')
  //
  //   cy.get('[data-cy=responsible-user]')
  //     .click()
  //     .type('{enter}')
  //
  //   cy.get('[data-cy=ani-consent-is-given-radio]').check()
  //
  //   cy.get('[data-cy=form-submit]').should('not.be.disabled')
  //
  //   cy.get('[data-cy=form-submit]').click()
  //   cy.location('pathname', { timeout: 6000 })
  //     .should('include', '/accidents-and-incidents/reports')
  //
  //   cy.get('[data-cy=ani-reports-table]')
  //   cy.wait('@getAnIReports')
  //   cy.get('[data-cy=pagination-total]').contains(2)
  //   cy.get('[data-cy="ani-report-type-2"]').contains('accident')
  //   cy.get('[data-cy=ani-edit-investigation-2]').contains('Investigation')
  // })
})
