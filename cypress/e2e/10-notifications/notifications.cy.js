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
  it("Should render notification cards", () => {
    cy.get(NotificationsSelectors.notificationCard)
      .its("length")
      .should("be.greaterThan", 0);
  });

  it("Should render card content and time", () => {
    cy.get(NotificationsSelectors.notificationContent)
      .should("have.length.at.least", 1)
      .first()
      .should("be.visible");

    cy.get(NotificationsSelectors.notificationTime)
      .should("have.length.at.least", 1)
      .first()
      .should("be.visible");
  });

  it("Should open card menu if menu button exists", () => {
    cy.get(NotificationsSelectors.notificationMenuBtn).then(($btns) => {
      if ($btns.length > 0) {
        cy.wrap($btns[0]).click();

        cy.get(NotificationsSelectors.notificationMenu)
          .first()
          .should("be.visible");
      }
    });
  });

  it("Should keep notifications page stable after reload", () => {
    cy.reload();
    cy.get(NotificationsSelectors.notificationHeader).should("be.visible");
    cy.get(NotificationsSelectors.notificationFilterBtn).should("be.visible");
  });
});
