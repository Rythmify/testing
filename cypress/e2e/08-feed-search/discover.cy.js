import { DiscoverSelectors } from "../../support/selectors/feed-search.selectors";
import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe("Discover Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.wait(2000);
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.location("pathname").should("equal", "/discover");
  });
  it("Should display the discover page", () => {
    cy.contains(/More of what you like/i).should("be.visible");
    cy.contains(/artist tool/i).should("be.visible");
  });
  it("Should navigate to track page when track card is clicked", () => {
    cy.get(DiscoverSelectors.trackCard).first().click();
    cy.location("pathname", /\/[^\/]+\/[^\/]+/i);
  });
  it("Should display track cards on discover page", () => {
    cy.get(DiscoverSelectors.trackCard).should("have.length.greaterThan", 0);
  });
  it("Should play a track when play button is clicked", () => {
    cy.get(DiscoverSelectors.trackCard).first().trigger("mouseover");
    cy.get(DiscoverSelectors.playButton).first().click();
    cy.get(DiscoverSelectors.stickyPlayer).should("be.visible");
  });
  // Corner case
  it("Should expand artist tools after collapsing", () => {
    cy.get(DiscoverSelectors.artistToolsCollapseButton).click();
    cy.get(DiscoverSelectors.artistToolsCollapseButton).click();
  });

  it("Should display carousel with multiple tracks", () => {
    cy.get(DiscoverSelectors.carouselScrollContainer)
      .should("be.visible")
      .children()
      .should("have.length.greaterThan", 1);
  });
  it("Should keep sticky player visible after reload when track is playing", () => {
    cy.get(DiscoverSelectors.trackCard).first().trigger("mouseover");
    cy.get(DiscoverSelectors.playButton).first().click();
    cy.get(DiscoverSelectors.stickyPlayer).should("be.visible");
    cy.reload();
    cy.get(DiscoverSelectors.stickyPlayer).should("be.visible");
  });
  it("Should allow typing and clearing search input", () => {
    cy.get(DiscoverSelectors.searchInput).should("be.visible");
    cy.get(DiscoverSelectors.searchInput).type("rock");
    cy.get(DiscoverSelectors.searchInput).should("have.value", "rock");
    cy.get(DiscoverSelectors.searchInput).clear();
    cy.get(DiscoverSelectors.searchInput).should("have.value", "");
  });

  it("Should keep discover core sections visible after reload", () => {
    cy.reload();
    cy.get(DiscoverSelectors.searchInput).should("be.visible");
    cy.get(DiscoverSelectors.artistListSection).should("be.visible");
  });
});
