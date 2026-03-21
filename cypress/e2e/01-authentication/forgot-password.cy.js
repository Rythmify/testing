import {ResetPasswordSelectors} from '../../support/selectors/auth.selectors'

describe('Forgot Password Page', () => {
    beforeEach(() => {
        cy.visit('/signin');
        cy.get(ResetPasswordSelectors.emailInput).click();
        cy.get(ResetPasswordSelectors.emailInput).type('listener11@example.com');
        cy.get(ResetPasswordSelectors.continueButton).click();
        cy.get(ResetPasswordSelectors.forgotPasswordButton).click();
    })
    it ('Should display the forgot password page', () => {
        cy.contains(/Reset password/i).should('be.visible');
        cy.get(ResetPasswordSelectors.sendResetLinkButton).click();
        cy.wait(5000);
        cy.contains(/Check your email/i).should('be.visible');
        cy.get(ResetPasswordSelectors.backToLoginButton).click();
        cy.location("pathname").should("equal", "/signin");
        
    })


})