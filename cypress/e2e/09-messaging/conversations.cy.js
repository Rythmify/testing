import { ConversationsSelectors } from "../../support/selectors/messaging.selectors";
import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe("Conversations", () => {
  beforeEach(() => {
    cy.visit("/signin");
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).clear().type("ahmedattay8@gmail.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).clear().type("Ahmedattay66");
    cy.get(LoginSelectors.continueButton).click();
    cy.wait(2000);
    cy.visit("/messages");
  });
  it("Should display the conversations page", () => {
    cy.contains(/messages/i).should("be.visible");
    cy.get(ConversationsSelectors.conversationProfileButton).should(
      "be.visible",
    );
    cy.get(ConversationsSelectors.conversationBlockButton).should("be.visible");
    cy.get(ConversationsSelectors.conversationReportButton).should(
      "be.visible",
    );
    cy.get(ConversationsSelectors.messagingInput).should("be.visible");
  });
  it("Should send a message and display the message in the conversation", () => {
    cy.get(ConversationsSelectors.messagingInput).type(
      "Hello,this is a test message! {enter}",
    );
    cy.contains(/Send/i).click();
    cy.contains(/Hello,this is a test message!/i).should("be.visible");
  });
  it("Should click the report button and display the report form ", () => {
    cy.get(ConversationsSelectors.conversationReportButton).click();
    cy.get(ConversationsSelectors.reportSpam).should("be.visible");
    cy.get(ConversationsSelectors.reportImpersonation).should("be.visible");
    cy.get(ConversationsSelectors.reportAbuse).should("be.visible");
    cy.get(ConversationsSelectors.reportTrademarkInfringement).should(
      "be.visible",
    );
    cy.get(ConversationsSelectors.reportOther).should("be.visible");
    cy.get(ConversationsSelectors.reportAbuse).click();
  });
  it("Should return error message when I send an empty message", () => {
    cy.wait(2000);
    cy.contains(/Send/i).click();
    cy.contains(/Enter a message/i).should("be.visible");
  });
  it("Should click the block button and display the block confirmation", () => {
    cy.get(ConversationsSelectors.conversationBlockButton).click();
    cy.contains(/Block/i).should("be.visible");
    cy.contains(/follow you/i).should("be.visible");
  });

  it("Should keep conversation header visible after refresh", () => {
    cy.reload();
    cy.get(ConversationsSelectors.conversationHeader).should("be.visible");
    cy.get(ConversationsSelectors.messagingInput).should("be.visible");
  });
});
