import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { SettingsSelectors } from "../../support/selectors/settings.selectors";
describe ('Settings Page', () => {
    beforeEach (() => {
        cy.viewport('macbook-13');
        cy.wait(2000);
        cy.visit('/signin');
        cy.typeEmailAndPassword();
        cy.get(LoginSelectors.continueButton).click();
        cy.location("pathname").should("equal","/discover");
        cy.visit('/settings');
        cy.wait(2000);
    })
    it ('Should move as into settings' , ()=> {
        cy.contains(/Settings/i).should('be.visible');
        cy.contains(/Account/i).should('be.visible');
        cy.contains(/Privacy/i).should('be.visible');
        cy.contains(/Notifications/i).should('be.visible');
    })
    it('Should make the UI in light mode when light mode is selected', () => {
        cy.contains(/Change theme/i).should('be.visible');
        cy.get(SettingsSelectors.themeLightInput).click();
    })
    it('Should add new email ', () => {
        cy.get(SettingsSelectors.showAddEmailButton).click();
        cy.get(SettingsSelectors.newEmailInput).should('be.visible');
        cy.get(SettingsSelectors.newEmailInput).type('AhmedE2Etest@testingteam.com');
        cy.get(SettingsSelectors.addEmailButton).click();
        cy.contains(/Verification email sent to AhmedE2Etest@testingteam.com/i).should('be.visible');
    })
    it('Should show error when adding an existing email', () => {
        cy.get(SettingsSelectors.showAddEmailButton).click();
        cy.get(SettingsSelectors.newEmailInput).should('be.visible');
        cy.get(SettingsSelectors.newEmailInput).type('mo.khaled@example.com');
        cy.get(SettingsSelectors.addEmailButton).click();
        cy.contains(/Failed to send verification email./i).should('be.visible');
    })
    it('Should show error when adding an invalid email', () => {
        cy.get(SettingsSelectors.showAddEmailButton).click();
        cy.get(SettingsSelectors.newEmailInput).should('be.visible');
        cy.get(SettingsSelectors.newEmailInput).type('invalid-email');
        cy.get(SettingsSelectors.addEmailButton).click();
        cy.contains(/Failed to send verification email./i).should('be.visible');
    })
    it('Should cancel adding a new email and hide the input', () => {
        cy.get(SettingsSelectors.showAddEmailButton).click();
        cy.get(SettingsSelectors.newEmailInput).should('be.visible');
        cy.get(SettingsSelectors.newEmailInput).type('cornercase@example.com');
        cy.get(SettingsSelectors.cancelAddEmailButton).click();
        cy.get(SettingsSelectors.showAddEmailButton).should('be.visible');
        cy.get(SettingsSelectors.newEmailInput).should('not.exist');
    })
    it ('Should send a reset password email when user click on reset password button', () => {
        cy.get(SettingsSelectors.sendPasswordResetButton).click();
        cy.contains(/Password reset link sent to mo.khaled@example.com./i).should('be.visible');
    })
    it ('Should send a verification email when user click on request verification button', () => {
        cy.get(SettingsSelectors.requestVerificationButton).click();
        cy.contains(/Verification request submitted!/i).should('be.visible');
    })
    it ('Should revoke all apps when user click on revoke all apps button', () => {
        cy.get(SettingsSelectors.revokeRythmifyComButton).should('be.visible');
        cy.get(SettingsSelectors.revokeAllAppsButton).click();
        cy.contains(/No connected applications./i).should('be.visible');
    })
    it('Should keep delete account modal closed after cancel', () => {
        cy.get(SettingsSelectors.deleteAccountButton).click();
        cy.get(SettingsSelectors.deleteAccountModalCloseButton).should('be.visible');
        cy.get(SettingsSelectors.deleteAccountCancelButton).click();
        cy.get(SettingsSelectors.deleteAccountModalCloseButton).should('not.exist');
        cy.get(SettingsSelectors.deleteAccountButton).should('be.visible');
    })
    it('Should disable delete account confirm button until confirmed', () => {
        cy.get(SettingsSelectors.deleteAccountButton).click();
        cy.get(SettingsSelectors.deleteAccountConfirmButton).should('be.disabled');
        cy.get(SettingsSelectors.deleteAccountConfirmInput).click();
        cy.get(SettingsSelectors.deleteAccountConfirmButton).should('not.be.disabled');
        cy.get(SettingsSelectors.deleteAccountCancelButton).click();
    })

})