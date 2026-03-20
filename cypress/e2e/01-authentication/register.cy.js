import {SignUpSelectors} from '../../support/selectors/auth.selectors'
describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/signin');
        cy.get(SignUpSelectors.emailInput).type('listener6@example.com');
        cy.get(SignUpSelectors.continueButton).click();
        cy.get(SignUpSelectors.createAccountButton).click();
    })
    it('Should display Create an account ',  () => {
        cy.contains(/listener6@example.com/i).should('be.visible');
        cy.contains(/Create an account/i).should('be.visible');
    })
    // Happy path test case for register with email and password
    it.only ('Should register with email and password successfully and redirect to mail page', () => {
        cy.get(SignUpSelectors.passwordInput).type('Listener1234!');
        cy.get(SignUpSelectors.buttonTogglePassword).click();
        cy.contains(/✓ At least 8 characters/i).should('be.visible');
        cy.contains(/✓ At least one uppercase letter/i).should('be.visible');
        cy.contains(/✓ At least one lowercase letter/i).should('be.visible');
        cy.contains(/✓ At least one number/i).should('be.visible');
        cy.wait(2000);
        
    })
})