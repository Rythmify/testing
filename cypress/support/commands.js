import { LoginSelectors } from './selectors/auth.selectors';

const DEFAULT_EMAIL = 'mo.khaled@example.com';
const DEFAULT_PASSWORD = 'Password123!';

Cypress.Commands.add('typeEmailAndPassword', (email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) => {
	cy.get(LoginSelectors.emailInput).click();
	cy.get(LoginSelectors.emailInput).clear().type(email);
	cy.get(LoginSelectors.continueButton).click();
	cy.get(LoginSelectors.passwordInput).clear().type(password);
});