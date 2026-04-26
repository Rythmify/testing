import { SignUpSelectors } from "../../support/selectors/auth.selectors";
describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
    cy.get(SignUpSelectors.emailInput).click();
    cy.get(SignUpSelectors.emailInput).type("listener12@example.com");
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Create one/i).click();
  });

  it("Should display Create an account ", () => {
    cy.contains(/listener12@example.com/i).should("be.visible");
    cy.contains(/Create an account/i).should("be.visible");
  });

  it("Should advance from password step to profile step when password is valid", () => {
    cy.get(SignUpSelectors.passwordInput).type("Listener1234!");
    cy.get(SignUpSelectors.buttonTogglePassword).click();
    cy.contains(/✓ At least 8 characters/i).should("be.visible");
    cy.contains(/✓ At least one uppercase letter/i).should("be.visible");
    cy.contains(/✓ At least one lowercase letter/i).should("be.visible");
    cy.contains(/✓ At least one number/i).should("be.visible");
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Tell us more about you/i).should("be.visible");
    cy.get(SignUpSelectors.displayNameInput).should("be.visible");
  });

  it("Should show error message for not add password", () => {
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Please choose a password./i).should("be.visible");
  });

  it("Should show error message for short password", () => {
    cy.get(SignUpSelectors.passwordInput).type("123");
    cy.get(SignUpSelectors.buttonTogglePassword).click();
    cy.contains(/✗ At least 8 characters/i).should("be.visible");
    cy.contains(/✗ At least one uppercase letter/i).should("be.visible");
    cy.contains(/✗ At least one lowercase letter/i).should("be.visible");
    cy.contains(/✓ At least one number/i).should("be.visible");
  });

  it("Should reject password that is missing uppercase letter", () => {
    cy.get(SignUpSelectors.passwordInput).type("listener1234");
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Password does not meet the requirements./i).should(
      "be.visible",
    );
  });

  it("Should preserve profile step validation for missing display name", () => {
    cy.get(SignUpSelectors.passwordInput).type("Listener1234!");
    cy.get(SignUpSelectors.continueButton).click();
    cy.get(SignUpSelectors.displayNameInput).clear();
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Please enter a display name./i).should("be.visible");
  });

  it("Should show error message for not select date of birth", () => {
    cy.get(SignUpSelectors.passwordInput).type("Listener1234!");
    cy.get(SignUpSelectors.continueButton).click();
    cy.get(SignUpSelectors.selectGenderButton).select(1);
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Please complete your date of birth./i).should("be.visible");
  });

  it("Should show error message for not select gender", () => {
    cy.get(SignUpSelectors.passwordInput).type("Listener1234!");
    cy.get(SignUpSelectors.continueButton).click();
    cy.get(SignUpSelectors.selectDateOfBirthMonthButton).select(1);
    cy.get(SignUpSelectors.selectDateOfBirthDayButton).select(1);
    cy.get(SignUpSelectors.selectDateOfBirthYearButton).select(6);
    cy.get(SignUpSelectors.continueButton).click();
    cy.contains(/Please select a gender./i).should("be.visible");
  });
});
