// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAdmin', () => {
  cy.request({
    method: 'POST',
    url: 'api/v1/session/login',
    form: true,
    body: {
      email: 'Cypress.Admin@sypro.co.uk',
      password: 'password1!'
    }
  }).then((response) => {
    let user = {
      'id': response.body.data.id,
      'uuid': response.body.data.uuid,
      'token': response.body.data.access_token,
      'expires': response.body.data.valid_until,
      'email': response.body.data.email,
      'first_name': response.body.data.first_name,
      'last_name': response.body.data.last_name,
      'access': response.body.data.access,
      'organisation': response.body.data.organisation,
      'role': response.body.data.role,
      'centralised_user': response.body.data.centralised_user,
      'logincount': response.body.data.login_count,
      'logintime': response.body.data.login_time,
      'mobile_number': response.body.data.mobile_number,
      'job_role': response.body.data.job_role,
      'sites': response.body.data.sites
    }
    window.localStorage.setItem('trm.user', JSON.stringify(user))
    window.localStorage.setItem('trm.helpdesk_url', 'http://localhost:4004/')
    window.localStorage.setItem('trm.environment', 'dev')
    window.localStorage.setItem('trm.risk_thresholds', JSON.stringify(response.body.data.organisation.risk_thresholds))
    expect(response.status).to.eq(200)
  })
})
