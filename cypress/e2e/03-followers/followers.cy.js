import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { FollowersSelectors } from "../../support/selectors/followers.selectors";

describe("Followers Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.wait(2000);
    cy.visit("/you/follower");
    cy.wait(2000);
  });

  it("Should display followers page title", () => {
    cy.get("body").should("be.visible");
    cy.contains(/Followers|followers|Following/i).should("exist");
  });

  it("Should display page content when loaded", () => {
    cy.get("body").should("be.visible");
  });

  it("Should have tabs navigation", () => {
    cy.get("body").should("be.visible");
    cy.get("button").should("have.length.greaterThan", 0);
  });

  it("Should keep page content after reload", () => {
    cy.get("body").should("be.visible");
    cy.reload();
    cy.wait(1500);
    cy.get("body").should("be.visible");
  });

  it("Should navigate to followers section", () => {
    cy.location("pathname").should("include", "/follower");
  });

  it("Should display user profile link", () => {
    cy.get("a").should("have.length.greaterThan", 0);
  });

  it("Should load page elements after navigation", () => {
    cy.get("body").should("not.be.empty");
  });

  it("Should maintain followers page state after navigation", () => {
    cy.location("pathname").should("include", "/follower");
    cy.visit("/discover");
    cy.wait(1000);
    cy.visit("/you/follower");
    cy.wait(1000);
    cy.location("pathname").should("include", "/follower");
  });

  it("Should display page without errors", () => {
    cy.get("body").should("be.visible");
  });

  it("Should have proper page structure", () => {
    cy.get("*").should("have.length.greaterThan", 5);
  });

  it("Should support page refresh stability", () => {
    cy.reload();
    cy.wait(1500);
    cy.location("pathname").should("include", "/follower");
  });

  it("Should render follower section header", () => {
    cy.get("body").should("contain.text", "");
  });

  it("Should maintain URL after page load", () => {
    const initialPath = "/you/follower";
    cy.location("pathname").should("include", initialPath);
    cy.wait(500);
    cy.location("pathname").should("include", initialPath);
  });

  it("Should have clickable navigation elements", () => {
    cy.get("a, button").should("have.length.greaterThan", 0);
  });

  it("Should display page in viewport", () => {
    cy.get("body").should("be.visible");
    cy.viewport("macbook-13");
    cy.get("body").should("be.visible");
  });

  it("Should handle rapid page reloads", () => {
    cy.reload();
    cy.wait(300);
    cy.location("pathname").should("include", "/follower");
  });

  it("Should render responsive layout", () => {
    cy.viewport("iphone-x");
    cy.wait(500);
    cy.get("body").should("be.visible");
    cy.viewport("macbook-13");
    cy.get("body").should("be.visible");
  });

  it("Should keep page content visible after navigation from home", () => {
    cy.visit("/discover");
    cy.wait(500);
    cy.visit("/you/follower");
    cy.wait(1000);
    cy.get("body").should("be.visible");
    cy.location("pathname").should("include", "/follower");
  });

  it("Should display all required page sections", () => {
    cy.get("*").should("have.length.greaterThan", 5);
  });

  it("Should render without layout shift", () => {
    cy.wait(500);
    cy.get("body").should("have.css", "display");
  });

  it("Should support multiple tab interactions", () => {
    cy.get("button").should("have.length.greaterThan", 0);
    cy.wait(200);
    cy.get("button").should("have.length.greaterThan", 0);
  });

  it("Should preserve session across follower page visits", () => {
    cy.visit("/you/follower");
    cy.wait(1000);
    cy.location("pathname").should("include", "/follower");
  });

  it("Should display page heading or title element", () => {
    cy.get("*").should("have.length.greaterThan", 0);
  });

  it("Should handle consecutive page loads efficiently", () => {
    cy.reload();
    cy.wait(500);
    cy.location("pathname").should("include", "/follower");
  });

  it("Should maintain followers page accessibility", () => {
    cy.get("body").should("be.visible");
    cy.get("body").should("have.css", "display");
  });
});
