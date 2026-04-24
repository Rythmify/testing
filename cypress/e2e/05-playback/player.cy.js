import { PlayerSelectors } from "../../support/selectors/player.selectors";
describe("Player Page", () => {
  beforeEach(() => {
    cy.visit("/rowidaahmedd/3bc04b27-d8f7-4a8f-8007-87e9f93ef4f5");
    // cy.get(PlayerSelectors.trackCard).first().click();
    cy.wait(2000);
  });
  it("Should display player paged", () => {
    cy.get(PlayerSelectors.playPauseButton).should("be.visible");
    cy.get(PlayerSelectors.likeButton).should("be.visible");
    cy.get(PlayerSelectors.shareButton).should("be.visible");
    cy.get(PlayerSelectors.addNextUpButton).should("be.visible");
    cy.get(PlayerSelectors.moreButton).should("be.visible");
  });
  it("Should click the play button and play the track", () => {
    cy.get(PlayerSelectors.playPauseButton).click();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
  });
  it("Should click the next track and play it", () => {
    cy.get(PlayerSelectors.trackRow2).click();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
  });
  it("Should display the share modal when I click the share button", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.shareSocialIcons).should("be.visible");
    cy.get(PlayerSelectors.copyLinkButton).should("be.visible");
    cy.get(PlayerSelectors.atTimestampCheckbox).should("be.visible");
    cy.get(PlayerSelectors.shortenLinkCheckbox).should("be.visible");
    cy.get(PlayerSelectors.embedTab).should("be.visible");
    cy.get(PlayerSelectors.messageTab).should("be.visible");
  });
  it("Should copy the link when I click the copy link button", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.atTimestampCheckbox).click();
    cy.get(PlayerSelectors.shortenLinkCheckbox).click();
    cy.contains(/Copy/i).click().should("have.text", "Copied!");
  });
  it("Should toggle between play and pause", () => {
    cy.get(PlayerSelectors.playPauseButton).click();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
    cy.get(PlayerSelectors.playPauseButton).click();
    cy.get(PlayerSelectors.stickyPlayer).should("still.be.visible");
  });
  it("Should close share modal when dismissed", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.shareSocialIcons).should("be.visible");
    cy.get("body").type("{esc}");
    cy.get(PlayerSelectors.shareSocialIcons).should("not.exist");
  });
});
