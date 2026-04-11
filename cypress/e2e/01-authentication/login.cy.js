import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/signin')
    });

    it ('Should display the Login page', () => {
        cy.contains(/Sign in or create an account/i).should('be.visible');
        cy.location("pathname").should("equal", "/signin");
        cy.wait(2000);
    })

    it ('Should display the login options', () => {
        cy.get(LoginSelectors.facebookButton).should('be.visible');
        cy.get(LoginSelectors.googleButton).should('be.visible');
        cy.get(LoginSelectors.appleButton).should('be.visible');
        cy.get(LoginSelectors.emailInput).should('be.visible');
        cy.get(LoginSelectors.continueEmailButton).should('be.visible');
        cy.wait(2000);
    })
    // Happy path test case for login with email and password
    it ('Should login with email and password successfully and redirect to discover page' , () => {
        cy.typeEmailAndPassword();
        cy.get(LoginSelectors.buttonTogglePassword).click();
        cy.wait(2000);
        cy.get(LoginSelectors.continueButton).click();
        cy.location("pathname").should("equal","/discover");
    })
    // Unhappy path test case for login with email and password
    it ('Should show error message for not add email' , () => {
        cy.get(LoginSelectors.continueEmailButton).click();
        cy.contains(/Please enter your email address./i).should('not.exist');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Please enter your email address./i).should('be.visible');
    })
    it('Should show error message for invalid email format', () => {
        cy.get(LoginSelectors.emailInput).click();
        cy.get(LoginSelectors.emailInput).type('mo.khaledexample.com');
        cy.contains(/Enter a valid email address./i).should('not.exist');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Enter a valid email address./i).should('be.visible');
    })
    it('Should show error message for not add password', () => {
        cy.get(LoginSelectors.emailInput).click();
        cy.get(LoginSelectors.emailInput).type('mo.khaled@example.com');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Please enter your password./i).should('not.exist');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Please enter your password./i).should('be.visible');
    })
    it('Should show error message for short password', () => {
        cy.get(LoginSelectors.emailInput).click();
        cy.get(LoginSelectors.emailInput).type('mo.khaled@example.com');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Password must be at least 8 characters./i).should('not.exist');
        cy.get(LoginSelectors.passwordInput).type('123');
        cy.get(LoginSelectors.continueButton).click();
        cy.contains(/Password must be at least 8 characters./i).should('be.visible');
    })
})