import { ResetPasswordSelectors } from "../../support/selectors/auth.selectors";

describe("Forgot Password Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
    cy.get(ResetPasswordSelectors.emailInput).click();
    cy.get(ResetPasswordSelectors.emailInput).type("mo.khaled@example.com");
    cy.get(ResetPasswordSelectors.continueButton).click();
    cy.get(ResetPasswordSelectors.forgotPasswordButton).click();
  });

  it("Should display the forgot password page", () => {
    cy.contains(/Reset password/i).should("be.visible");
    cy.get(ResetPasswordSelectors.sendResetLinkButton).click();
    cy.contains(/Check your email/i).should("be.visible");
    cy.get(ResetPasswordSelectors.backToLoginButton).click();
    cy.location("pathname").should("equal", "/signin");
  });

  it("Should return to password login step when clicking back", () => {
    cy.get('[data-test="btn-back"]').click();
    cy.get(ResetPasswordSelectors.forgotPasswordButton).should("be.visible");
    cy.get(ResetPasswordSelectors.continueButton).should("be.visible");
  });

  it("Should still show confirmation for unknown email to prevent enumeration", () => {
    cy.visit("/signin");
    cy.get(ResetPasswordSelectors.emailInput).click();
    cy.get(ResetPasswordSelectors.emailInput).type(
      "does-not-exist@example.com",
    );
    cy.get(ResetPasswordSelectors.continueButton).click();
    cy.get(ResetPasswordSelectors.forgotPasswordButton).click();
    cy.get(ResetPasswordSelectors.sendResetLinkButton).click();
    cy.contains(/Check your email/i).should("be.visible");
  });
});
