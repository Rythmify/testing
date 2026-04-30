import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { AdminSelectors } from "../../support/selectors/admin.selectors";

describe("Admin panel smoke tests", () => {
  const adminEmail = "devops@rythmify.com";
  const adminPassword = "admin123!";

  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type(adminEmail);
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).type(adminPassword);
    cy.get(LoginSelectors.continueButton).click();
    cy.wait(2000);
    cy.wait(500);
    cy.visit("/admin");
  });

  it("logs in as admin and opens dashboard", () => {
    cy.get(AdminSelectors.navDashboard).should("exist");
    cy.get(AdminSelectors.btnRefresh).should("exist");
  });

  it("navigates to Reports & Appeals and interacts with a report if present", () => {
    cy.get(AdminSelectors.navReports).click();
    cy.url().should("include", "/admin/reports");
    cy.get(AdminSelectors.btnRefresh).should("exist");

    // If any view buttons exist, open the first and check resolve modal controls
    cy.window().then((win) => {
      const viewButtons = win.document.querySelectorAll(
        '[data-test^="btn-view-"]',
      );
      if (viewButtons.length > 0) {
        cy.get('[data-test^="btn-view-"]').first().click();
        // Wait a bit for modal to appear and then try resolve buttons
        cy.get(AdminSelectors.btnResolvePrefix, { timeout: 2000 }).then(
          ($els) => {
            if ($els.length > 0) {
              cy.get(AdminSelectors.btnResolvePrefix).first().click();
              cy.get(AdminSelectors.textareaAdminNote).should("exist");
              cy.get(AdminSelectors.btnResolveConfirm).should("exist");
              cy.get(AdminSelectors.btnResolveCancel).should("exist");
              // Cancel to avoid making changes
              cy.get(AdminSelectors.btnResolveCancel).click();
            }
          },
        );
      }
    });
  });

  it("visits Users and Tracks admin routes", () => {
    cy.get(AdminSelectors.navUsers).click();
    cy.url().should("include", "/admin/users");

    cy.get(AdminSelectors.navTracks).click();
    cy.url().should("include", "/admin/tracks");
  });

  it("logs out successfully", () => {
    cy.get(AdminSelectors.btnLogout).click();
    cy.url().should("include", "/signin");
  });
});
