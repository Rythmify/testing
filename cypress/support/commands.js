import { LoginSelectors } from "./selectors/auth.selectors";

const DEFAULT_EMAIL = "ahmedattay8@gmail.com";
const DEFAULT_PASSWORD = "Ahmedattay66";

Cypress.Commands.add(
  "typeEmailAndPassword",
  (email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).clear().type(email);
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).clear().type(password);
  },
);
