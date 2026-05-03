import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { AdminSelectors } from "../../support/selectors/admin.selectors";

describe("Admin panel coverage", () => {
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

  it("loads the dashboard and exposes navigation", () => {
    cy.get(AdminSelectors.btnRefresh).should("exist");
    cy.get(AdminSelectors.periodBtnDay).should("exist");
    cy.get(AdminSelectors.periodBtnWeek).should("exist");
    cy.get(AdminSelectors.periodBtnMonth).should("exist");
    cy.get(AdminSelectors.quickActionReports).should("exist");
    cy.get(AdminSelectors.quickActionUsers).should("exist");
    cy.get(AdminSelectors.quickActionTracks).should("exist");
  });

  it("switches dashboard periods and keeps the page stable", () => {
    cy.get(AdminSelectors.periodBtnDay).click();
    cy.get(AdminSelectors.periodBtnWeek).click();
    cy.get(AdminSelectors.periodBtnMonth).click();
    cy.get(AdminSelectors.btnRefresh).click();
    cy.get(AdminSelectors.navDashboard).should("exist");
  });

  it("uses dashboard quick actions to reach admin routes", () => {
    cy.get(AdminSelectors.quickActionReports).click();
    cy.url().should("include", "/admin/reports");
    cy.go("back");

    cy.get(AdminSelectors.quickActionUsers).click();
    cy.url().should("include", "/admin/users");
    cy.go("back");

    cy.get(AdminSelectors.quickActionTracks).click();
    cy.url().should("include", "/admin/tracks");
  });

  it("navigates through admin sections from the sidebar", () => {
    cy.get(AdminSelectors.navReports).click();
    cy.url().should("include", "/admin/reports");
    cy.get(AdminSelectors.navUsers).click();
    cy.url().should("include", "/admin/users");
    cy.get(AdminSelectors.navTracks).click();
    cy.url().should("include", "/admin/tracks");
  });

  it("searches tracks and exercises moderation controls", () => {
    cy.get(AdminSelectors.navTracks).click();
    cy.url().should("include", "/admin/tracks");

    cy.get(AdminSelectors.inputTrackSearch)
      .should("exist")
      .clear()
      .type("test");
    cy.get(AdminSelectors.btnClearSearch).should("exist").click();
    cy.get(AdminSelectors.inputTrackSearch).should("have.value", "");

    cy.get("body").then(($body) => {
      if ($body.find(AdminSelectors.btnTrackActionsPrefix).length > 0) {
        cy.get(AdminSelectors.btnTrackActionsPrefix).first().click();
        cy.get("body").then(($modal) => {
          if ($modal.find(AdminSelectors.btnToggleHide).length > 0) {
            cy.get(AdminSelectors.btnToggleHide).click();
            cy.get(AdminSelectors.textareaHideReason)
              .should("exist")
              .type("Moderation test reason");
            cy.get(AdminSelectors.btnHideCancel).click();
          }
          if ($modal.find(AdminSelectors.btnToggleUnhide).length > 0) {
            cy.get(AdminSelectors.btnToggleUnhide).click();
            cy.get(AdminSelectors.btnHideCancel).click();
          }
        });
      }
    });

    cy.get(AdminSelectors.btnPrevPage).should("exist");
    cy.get(AdminSelectors.btnNextPage).should("exist");
  });

  it("logs out successfully", () => {
    cy.get(AdminSelectors.btnLogout).click();
    cy.url().should("include", "/signin");
  });

  it("opens reports page and keeps filters visible", () => {
    cy.get(AdminSelectors.navReports).click();
    cy.url().should("include", "/admin/reports");
    cy.get(AdminSelectors.selectStatusFilter).should("exist");
    cy.get(AdminSelectors.selectReasonFilter).should("exist");
  });
});
