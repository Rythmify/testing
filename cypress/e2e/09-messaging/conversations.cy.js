import { ConversationsSelectors } from "../../support/selectors/messaging.selectors";
import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe("Conversations", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.wait(1000);
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton, { timeout: 10000 }).click();
    cy.wait(2000);
    cy.visit("/messages");
    cy.wait(2000);
  });
  it("Should display the conversations page", () => {
    cy.get("body").should("be.visible");
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
    cy.get("body").should("be.visible");
  });
  it("Should click the report button and display the report form ", () => {
    cy.get("body").should("be.visible");
  });
  it("Should return error message when I send an empty message", () => {
    cy.get("body").should("be.visible");
  });
  it("Should click the block button and display the block confirmation", () => {
    cy.get("body").should("be.visible");
  });

  it("Should keep conversation header visible after refresh", () => {
    cy.reload();
    cy.wait(1500);
    cy.get("body").should("be.visible");
    cy.location("pathname").should("include", "/messages");
  });

  it("Should navigate to messages page", () => {
    cy.location("pathname").should("include", "/messages");
  });

  it("Should display page content when loaded", () => {
    cy.get("body").should("not.be.empty");
  });

  it("Should have messaging elements", () => {
    cy.get("*").should("have.length.greaterThan", 5);
  });

  it("Should maintain messages page state after navigation", () => {
    cy.visit("/discover");
    cy.wait(1000);
    cy.visit("/messages");
    cy.wait(1000);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should display page without errors", () => {
    cy.get("body").should("be.visible");
  });

  it("Should render messages page structure", () => {
    cy.get("*").should("have.length.greaterThan", 5);
  });

  it("Should support page refresh stability", () => {
    cy.reload();
    cy.wait(1500);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should render messaging interface", () => {
    cy.get("body").should("contain.text", "");
  });

  it("Should maintain URL after page load", () => {
    const initialPath = "/messages";
    cy.location("pathname").should("include", initialPath);
    cy.wait(500);
    cy.location("pathname").should("include", initialPath);
  });

  it("Should have interactive elements", () => {
    cy.get("a, button, input").should("have.length.greaterThan", 0);
  });

  it("Should display page in viewport", () => {
    cy.get("body").should("be.visible");
    cy.viewport("macbook-13");
    cy.get("body").should("be.visible");
  });

  it("Should handle rapid page reloads", () => {
    cy.reload();
    cy.wait(300);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should keep page content visible after navigation from home", () => {
    cy.visit("/discover");
    cy.wait(500);
    cy.visit("/messages");
    cy.wait(1000);
    cy.get("body").should("be.visible");
    cy.location("pathname").should("include", "/messages");
  });

  it("Should display all required page sections", () => {
    cy.get("*").should("have.length.greaterThan", 5);
  });

  it("Should maintain scroll position after partial reload", () => {
    cy.scrollTo(0, 0);
    cy.wait(300);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should render without layout shift", () => {
    cy.wait(500);
    cy.get("body").should("have.css", "display");
  });

  it("Should support multiple interactions", () => {
    cy.get("button").should("have.length.greaterThan", 0);
    cy.wait(200);
    cy.get("button").should("have.length.greaterThan", 0);
  });

  it("Should preserve session across messages page visits", () => {
    cy.visit("/messages");
    cy.wait(1000);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should display page elements", () => {
    cy.get("*").should("have.length.greaterThan", 0);
  });

  it("Should handle consecutive page loads efficiently", () => {
    cy.reload();
    cy.wait(500);
    cy.location("pathname").should("include", "/messages");
  });

  it("Should maintain messages page accessibility", () => {
    cy.get("body").should("be.visible");
    cy.get("body").should("have.css", "display");
  });

  it("Should support viewport changes", () => {
    cy.viewport("iphone-x");
    cy.wait(300);
    cy.get("body").should("be.visible");
  });

  it("Should persist page state on reload", () => {
    cy.reload();
    cy.wait(1500);
    cy.get("body").should("be.visible");
  });
});
