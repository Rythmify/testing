import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("Should display the Login page", () => {
    cy.contains(/Sign in or create an account/i).should("be.visible");
    cy.location("pathname").should("equal", "/signin");
  });

  it("Should display the login options", () => {
    cy.get(LoginSelectors.facebookButton).should("be.visible");
    cy.get(LoginSelectors.googleButton).should("be.visible");
    cy.get(LoginSelectors.emailInput).should("be.visible");
    cy.get(LoginSelectors.continueEmailButton).should("be.visible");
  });

  it("Should login with email and password successfully and redirect to discover page", () => {
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.buttonTogglePassword).click();
    cy.get(LoginSelectors.continueButton).click();
    cy.location("pathname").should("equal", "/discover");
  });

  it("Should show error message for not add email", () => {
    cy.get(LoginSelectors.continueEmailButton).click();
    cy.contains(/Please enter your email address./i).should("not.exist");
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Please enter your email address./i).should("be.visible");
  });
  it("Should show error message for invalid email format", () => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("mo.khaledexample.com");
    cy.contains(/Enter a valid email address./i).should("not.exist");
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Enter a valid email address./i).should("be.visible");
  });

  it("Should trim whitespace around email before moving to password step", () => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("   ahmedattay8@gmail.com   ");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).should("be.visible");
    cy.contains(/Your email address or profile URL/i).should("be.visible");
    cy.contains(/ahmedattay8@gmail.com/i).should("be.visible");
  });

  it("Should show error message for not add password", () => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("mo.khaled@example.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Please enter your password./i).should("not.exist");
    cy.wait(600);
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Please enter your password./i).should("be.visible");
  });

  it("Should show error message for short password", () => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("mo.khaled@example.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Password must be at least 8 characters./i).should("not.exist");
    cy.get(LoginSelectors.passwordInput).type("123");
    cy.get(LoginSelectors.continueButton).click();
    cy.contains(/Password must be at least 8 characters./i).should(
      "be.visible",
    );
  });

  it("Should submit password form with Enter key", () => {
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("ahmedattay8@gmail.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).type("Ahmedattay66{enter}");
    cy.location("pathname").should("equal", "/discover");
  });

  it("Should show api error and stay on login step for invalid credentials", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 401,
      body: {
        error: {
          message: "Invalid credentials.",
        },
      },
    }).as("loginFail");

    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("ahmedattay8@gmail.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).type("WrongPassword123");
    cy.get(LoginSelectors.continueButton).click();

    cy.wait("@loginFail");
    cy.contains(/Invalid credentials./i).should("be.visible");
    cy.get(LoginSelectors.passwordInput).should("be.visible");
    cy.location("pathname").should("equal", "/signin");
  });

  it("Should toggle password visibility on password step", () => {
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.passwordInput).should("have.attr", "type", "password");
    cy.get(LoginSelectors.buttonTogglePassword).click();
    cy.get(LoginSelectors.passwordInput).should("have.attr", "type", "text");
  });
});
