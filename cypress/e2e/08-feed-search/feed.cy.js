import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { FeedSelectors } from "../../support/selectors/feed-search.selectors";
describe("Feed Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.wait(2000);
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.location("pathname").should("equal", "/discover");
    cy.contains("Feed").click();
  });
  it("Should go to Feed Page", () => {
    cy.get(FeedSelectors.feedPage).should("be.visible");
    cy.get(FeedSelectors.feedMain).should("be.visible");
    cy.get(FeedSelectors.feedHeader).should("be.visible");
    cy.get(FeedSelectors.feedList).should("be.visible");
  });

  it("Should not show reposts when toggle is on", () => {
    cy.get(FeedSelectors.buttonFeedReportsToggle).should("be.visible");
    cy.contains(/Reposts/i).should("be.visible");
    cy.get(FeedSelectors.buttonFeedReportsToggle).click();
    cy.contains(/reposted/i).should("not.exist");
  });

  it("Should keep feed page structure visible after repost toggle", () => {
    cy.get(FeedSelectors.buttonFeedReportsToggle).click();
    cy.get(FeedSelectors.feedPage).should("be.visible");
    cy.get(FeedSelectors.feedMain).should("be.visible");
    cy.get(FeedSelectors.feedList).should("be.visible");
  });

  it("Should render feed item cards with header and body when items exist", () => {
    cy.document().then((doc) => {
      const hasItems = doc.querySelectorAll(FeedSelectors.feedItem).length > 0;

      if (hasItems) {
        cy.get(FeedSelectors.feedItem).first().should("be.visible");
        cy.get(FeedSelectors.feedItemHeader).first().should("be.visible");
        cy.get(FeedSelectors.feedItemUsername).first().should("be.visible");
        cy.get(FeedSelectors.feedItemBody).first().should("be.visible");
      } else {
        cy.get(FeedSelectors.feedList).should("be.visible");
      }
    });
  });

  it("Should show feed sidebar on desktop viewport", () => {
    cy.get(FeedSelectors.feedSidebar).should("exist");
  });

  it("Should hide feed sidebar on mobile viewport", () => {
    cy.viewport("iphone-x");
    cy.reload();
    cy.get(FeedSelectors.feedSidebar).should("not.be.visible");
  });

  it("Should keep feed list visible after page reload", () => {
    cy.reload();
    cy.get(FeedSelectors.feedPage).should("be.visible");
    cy.get(FeedSelectors.feedList).should("be.visible");
  });

  it("Should keep auth and stay on feed after reload", () => {
    cy.visit("/feed");
    cy.reload();
    cy.location("pathname").should("equal", "/feed");
    cy.get(FeedSelectors.feedPage).should("be.visible");
  });

  it("Should not crash when toggling reposts repeatedly", () => {
    cy.get(FeedSelectors.buttonFeedReportsToggle).click();
    cy.get(FeedSelectors.buttonFeedReportsToggle).click();
    cy.get(FeedSelectors.buttonFeedReportsToggle).click();
    cy.get(FeedSelectors.feedPage).should("be.visible");
    cy.get(FeedSelectors.feedList).should("be.visible");
  });

  it("Should load more items when load more button is available", () => {
    cy.document().then((doc) => {
      const hasLoadMore =
        doc.querySelectorAll(FeedSelectors.feedLoadMoreButton).length > 0;

      if (hasLoadMore) {
        cy.get(FeedSelectors.feedItem).then(($itemsBefore) => {
          const beforeCount = $itemsBefore.length;

          cy.get(FeedSelectors.feedLoadMoreButton).click();

          cy.get(FeedSelectors.feedItem).should(($itemsAfter) => {
            expect($itemsAfter.length).to.be.greaterThan(beforeCount);
          });
        });
      } else {
        cy.get(FeedSelectors.feedList).should("be.visible");
      }
    });
  });

  it("Should redirect to login page if not authenticated", () => {
    cy.clearLocalStorage();
    cy.visit("/feed", { failOnStatusCode: false });
    cy.location("pathname").should("equal", "/signin");
    cy.get(LoginSelectors.emailInput).should("be.visible");
  });

  it("Should keep feed page path stable after refresh", () => {
    cy.visit("/feed");
    cy.reload();
    cy.location("pathname").should("equal", "/feed");
    cy.get(FeedSelectors.feedPage).should("be.visible");
  });
});
