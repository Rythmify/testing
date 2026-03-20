import {SignUpSelectors} from '../../support/selectors/auth.selectors'
describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/signin');
        cy.get(SignUpSelectors.emailInput).type('listener11@example.com');
        cy.get(SignUpSelectors.continueButton).click();
        cy.get(SignUpSelectors.createAccountButton).click();
    })
    it('Should display Create an account ',  () => {
        cy.contains(/listener11@example.com/i).should('be.visible');
        cy.contains(/Create an account/i).should('be.visible');
    })
    // Happy path test case for register with email and password
    it ('Should register with email and password successfully and redirect to mail page', () => {
        cy.get(SignUpSelectors.passwordInput).type('Listener1234!');
        cy.get(SignUpSelectors.buttonTogglePassword).click();
        cy.contains(/✓ At least 8 characters/i).should('be.visible');
        cy.contains(/✓ At least one uppercase letter/i).should('be.visible');
        cy.contains(/✓ At least one lowercase letter/i).should('be.visible');
        cy.contains(/✓ At least one number/i).should('be.visible');
        cy.wait(2000);
        cy.get(SignUpSelectors.continueButton).click();
        cy.get(SignUpSelectors.selectDateOfBirthMonthButton).select(1);
        cy.get(SignUpSelectors.selectDateOfBirthDayButton).select(1);
        cy.get(SignUpSelectors.selectDateOfBirthYearButton).select(6);
        cy.get(SignUpSelectors.selectGenderButton).select(1);
        cy.wait(18000);
        cy.get(SignUpSelectors.continueButton).click();
        cy.wait(10000);
        cy.contains(/Check your inbox!/i).should('be.visible');
    })
    // Unhappy path test case for register with email and password
    it('Should show error message for not add password', () => {
        cy.get(SignUpSelectors.continueButton).click();
        cy.contains(/Please choose a password./i).should('be.visible');
    })
    it('Should show error message for short password', () => {
        cy.get(SignUpSelectors.passwordInput).type('123');
        cy.get(SignUpSelectors.buttonTogglePassword).click();
        cy.contains(/✗ At least 8 characters/i).should('be.visible');
        cy.contains(/✗ At least one uppercase letter/i).should('be.visible');
        cy.contains(/✗ At least one lowercase letter/i).should('be.visible');
        cy.contains(/✓ At least one number/i).should('be.visible');
    })
    it('Should show error message for not select date of birth', () => {
        cy.get(SignUpSelectors.passwordInput).type('Listener1234!');
        cy.get(SignUpSelectors.continueButton).click();
        cy.get(SignUpSelectors.selectGenderButton).select(1);
        cy.get(SignUpSelectors.continueButton).click();
        cy.contains(/Please complete your date of birth./i).should('be.visible');
    })
    it('Should show error message for not select gender', () => {
        cy.get(SignUpSelectors.passwordInput).type('Listener1234!');
        cy.get(SignUpSelectors.continueButton).click();
        cy.get(SignUpSelectors.selectDateOfBirthMonthButton).select(1);
        cy.get(SignUpSelectors.selectDateOfBirthDayButton).select(1);
        cy.get(SignUpSelectors.selectDateOfBirthYearButton).select(6);
        cy.get(SignUpSelectors.continueButton).click();
        cy.contains(/Please select a gender./i).should('be.visible');
    })
})