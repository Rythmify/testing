import { NotificationsSelectors } from "../../support/selectors/notifications.selectors";
import { LoginSelectors } from "../../support/selectors/auth.selectors";

describe("Notifications", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.wait(500);
    cy.get(NotificationsSelectors.notificationBtn).click();
    cy.get(NotificationsSelectors.notificationBtnViewAll).click();
  });

  it("displays notifications header", () => {
    cy.get(NotificationsSelectors.notificationHeader).should("be.visible");
    cy.contains("Notifications");
  });

  it("opens filter menu", () => {
    cy.get(NotificationsSelectors.notificationFilterBtn).click();
    cy.get(NotificationsSelectors.notificationFilterMenu).should("be.visible");
  });

  it("shows all filter options", () => {
    cy.get(NotificationsSelectors.notificationFilterBtn).click();
    cy.get(NotificationsSelectors.notificationFilterOptionAll).should(
      "be.visible",
    );
    cy.get(NotificationsSelectors.notificationFilterOptionLike).should(
      "be.visible",
    );
    cy.get(NotificationsSelectors.notificationFilterOptionComment).should(
      "be.visible",
    );
    cy.get(NotificationsSelectors.notificationFilterOptionRepost).should(
      "be.visible",
    );
    cy.get(NotificationsSelectors.notificationFilterOptionFollow).should(
      "be.visible",
    );
  });
});
