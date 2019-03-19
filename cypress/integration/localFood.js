describe('Test firestore', () => {
  const TEST_UID = Cypress.env('TEST_UID');
  const mockAge = 8;

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('read/write test', () => {
    cy.log('Starting test');

    cy.callFirestore('set', `testCollection/${TEST_UID}`, {
      name: 'axa',
      age: 8
    });
    cy.callFirestore('get', `testCollection/${TEST_UID}`).then(r => {
      cy.wrap(r[0])
        .its('id')
        .should('equal', TEST_UID);
      cy.wrap(r[0])
        .its('data.age')
        .should('equal', mockAge);
    });
    cy.log('Ended test');
  });
});
