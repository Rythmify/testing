import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { SettingsSelectors } from "../../support/selectors/settings.selectors";
describe("Settings Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.location("pathname").should("equal", "/discover");
    cy.visit("/settings");
  });

  it("Should move as into settings", () => {
    cy.contains(/Settings/i).should("be.visible");
    cy.contains(/Account/i).should("be.visible");
    cy.contains(/Privacy/i).should("be.visible");
    cy.contains(/Notifications/i).should("be.visible");
  });

  it("Should make the UI in light mode when light mode is selected", () => {
    cy.contains(/Change theme/i).should("be.visible");
    cy.get(SettingsSelectors.themeLightInput).click();
    cy.get(SettingsSelectors.documentRoot).should("not.have.class", "dark");
  });

  it("Should persist selected theme after reload", () => {
    cy.get(SettingsSelectors.themeLightInput).click();
    cy.reload();
    cy.get(SettingsSelectors.documentRoot).should("not.have.class", "dark");
  });

  it("Should switch to dark mode when dark mode is selected", () => {
    cy.get(SettingsSelectors.themeDarkInput).click();
    cy.get(SettingsSelectors.documentRoot).should("have.class", "dark");
  });

  it("Should keep one theme option selected", () => {
    cy.get(SettingsSelectors.themeAutomaticInput).click();
    cy.get(SettingsSelectors.themeAutomaticInput).should("be.checked");
    cy.get(SettingsSelectors.themeLightInput).should("not.be.checked");
    cy.get(SettingsSelectors.themeDarkInput).should("not.be.checked");
  });

  it("Should add new email ", () => {
    cy.get(SettingsSelectors.showAddEmailButton).click();
    cy.get(SettingsSelectors.newEmailInput).should("be.visible");
    cy.get(SettingsSelectors.newEmailInput).type(
      "AhmedE2Etest@testingteam.com",
    );
    cy.get(SettingsSelectors.addEmailButton).click();
    cy.contains(
      /Verification email sent to AhmedE2Etest@testingteam.com/i,
    ).should("be.visible");
  });

  it("Should show error when adding an existing email", () => {
    cy.get(SettingsSelectors.showAddEmailButton).click();
    cy.get(SettingsSelectors.newEmailInput).should("be.visible");
    cy.get(SettingsSelectors.newEmailInput).type("ahmedattay8@gmail.com");
    cy.get(SettingsSelectors.addEmailButton).click();
    cy.contains(/This email is already your primary email address./i).should(
      "be.visible",
    );
  });

  it("Should show error when adding an invalid email", () => {
    cy.get(SettingsSelectors.showAddEmailButton).click();
    cy.get(SettingsSelectors.newEmailInput).should("be.visible");
    cy.get(SettingsSelectors.newEmailInput).type("invalid-email");
    cy.get(SettingsSelectors.addEmailButton).click();
    cy.contains(/Please enter a valid email address./i).should("be.visible");
  });

  it("Should cancel adding a new email and hide the input", () => {
    cy.get(SettingsSelectors.showAddEmailButton).click();
    cy.get(SettingsSelectors.newEmailInput).should("be.visible");
    cy.get(SettingsSelectors.newEmailInput).type("cornercase@example.com");
    cy.get(SettingsSelectors.cancelAddEmailButton).click();
    cy.get(SettingsSelectors.showAddEmailButton).should("be.visible");
    cy.get(SettingsSelectors.newEmailInput).should("not.exist");
  });

  it("Should send a reset password email when user click on reset password button", () => {
    cy.get(SettingsSelectors.sendPasswordResetButton).click();
    cy.contains(/Password reset link sent to /i).should("be.visible");
  });

  it("Should send a verification email when user click on request verification button", () => {
    cy.get(SettingsSelectors.requestVerificationButton).click();
    cy.contains(/Verification request submitted!/i).should("be.visible");
  });

  it("Should close toast when toast close button is clicked", () => {
    cy.get(SettingsSelectors.requestVerificationButton).click();
    cy.contains(/Verification request submitted!/i).should("be.visible");
    cy.get(SettingsSelectors.toastCloseButton).click();
    cy.contains(/Verification request submitted!/i).should("not.exist");
  });

  it("Should revoke all apps when user click on revoke all apps button", () => {
    cy.get(SettingsSelectors.revokeRythmifyComButton).should("be.visible");
    cy.get(SettingsSelectors.revokeAllAppsButton).click();
    cy.contains(/No connected applications./i).should("be.visible");
  });

  it("Should keep delete account modal closed after cancel", () => {
    cy.get(SettingsSelectors.deleteAccountButton).click();
    cy.get(SettingsSelectors.deleteAccountModalCloseButton).should(
      "be.visible",
    );
    cy.get(SettingsSelectors.deleteAccountCancelButton).click();
    cy.get(SettingsSelectors.deleteAccountModalCloseButton).should("not.exist");
    cy.get(SettingsSelectors.deleteAccountButton).should("be.visible");
  });

  it("Should disable delete account confirm button until confirmed", () => {
    cy.get(SettingsSelectors.deleteAccountButton).click();
    cy.get(SettingsSelectors.deleteAccountConfirmButton).should("be.disabled");
    cy.get(SettingsSelectors.deleteAccountConfirmInput).click();
    cy.get(SettingsSelectors.deleteAccountCancelButton).click();
    cy.get(SettingsSelectors.deleteAccountButton).should("be.visible");
  });

  it("Should allow filling other delete reason fields in modal", () => {
    cy.get(SettingsSelectors.deleteAccountButton).click();
    cy.get(SettingsSelectors.deleteReasonOtherInput).click();
    cy.get(SettingsSelectors.deleteOtherReasonInput)
      .should("be.visible")
      .type("Prefer another platform for now");
    cy.get(SettingsSelectors.deleteOtherReasonInput).should(
      "have.value",
      "Prefer another platform for now",
    );
    cy.get(SettingsSelectors.deleteAccountCancelButton).click();
  });

  it("Should render social connect buttons", () => {
    cy.get(SettingsSelectors.connectFacebookButton).should("be.visible");
    cy.get(SettingsSelectors.connectGoogleButton).should("be.visible");
    cy.get(SettingsSelectors.connectAppleButton).should("be.visible");
  });

  it("Should display content settings controls", () => {
    cy.visit("/settings/content");
    cy.get(SettingsSelectors.contentRssFeedInput).should("be.visible");
    cy.get(SettingsSelectors.contentRssTitleInput).should("be.visible");
    cy.get(SettingsSelectors.contentRssCategorySelect).should("be.visible");
    cy.get(SettingsSelectors.contentRssShowEmailSelect).should("be.visible");
    cy.get(SettingsSelectors.contentRssLanguageSelect).should("be.visible");
    cy.get(SettingsSelectors.contentStatsServiceUrlInput).should("be.visible");
    cy.get(SettingsSelectors.contentAuthorNameInput).should("be.visible");
    cy.get(SettingsSelectors.contentSubscriberRedirectInput).should(
      "be.visible",
    );
    cy.get(SettingsSelectors.contentCancelButton).should("be.visible");
    cy.get(SettingsSelectors.contentSaveButton).should("be.visible");
  });

  it("Should reset edited RSS title when content cancel is clicked", () => {
    cy.visit("/settings/content");
    cy.get(SettingsSelectors.contentRssTitleInput)
      .clear()
      .type("Temporary RSS Title");
    cy.get(SettingsSelectors.contentCancelButton).click();
    cy.get(SettingsSelectors.contentRssTitleInput).should(
      "not.have.value",
      "Temporary RSS Title",
    );
  });

  it("Should display notifications settings controls", () => {
    cy.visit("/settings/notifications");
    cy.get(SettingsSelectors.notificationsCancelButton).should("be.visible");
    cy.get(SettingsSelectors.notificationsSaveButton).should("be.visible");
    cy.get(SettingsSelectors.notificationsSaveButton).should("be.disabled");
  });

  it("Should navigate between settings sections and keep page loaded", () => {
    cy.visit("/settings");
    cy.contains(/Account/i).should("be.visible");
    cy.visit("/settings/content");
    cy.get(SettingsSelectors.contentSaveButton).should("be.visible");
    cy.visit("/settings/notifications");
    cy.get(SettingsSelectors.notificationsSaveButton).should("be.visible");
  });
});
