import { PlayerSelectors } from "../../support/selectors/player.selectors";

describe("Player Page", () => {
  beforeEach(() => {
    cy.visit("/rowidaahmedd/3bc04b27-d8f7-4a8f-8007-87e9f93ef4f5");
    cy.wait(2000);
  });

  const startPlayback = () => {
    cy.get(PlayerSelectors.playPauseButton).click();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
  };

  it("Should display player actions on track page", () => {
    cy.get(PlayerSelectors.playPauseButton).should("be.visible");
    cy.get(PlayerSelectors.likeButton).should("be.visible");
    cy.get(PlayerSelectors.shareButton).should("be.visible");
    cy.get(PlayerSelectors.addNextUpButton).should("be.visible");
    cy.get(PlayerSelectors.moreButton).should("be.visible");
  });

  it("Should play the track and show sticky player", () => {
    startPlayback();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
    cy.get(PlayerSelectors.playerTrackTitle).should("be.visible");
    cy.get(PlayerSelectors.playerArtistName).should("be.visible");
  });

  it("Should open another track row and keep sticky player visible", () => {
    cy.document().then((doc) => {
      const hasRows = doc.querySelectorAll(PlayerSelectors.trackRow).length > 0;

      if (hasRows) {
        cy.get(PlayerSelectors.trackRow).first().click();
        cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
      } else {
        startPlayback();
      }
    });
  });

  it("Should display the share modal when I click the share button", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.sharePopupOverlay).should("be.visible");
    cy.get(PlayerSelectors.sharePopup).should("be.visible");
    cy.get(PlayerSelectors.shareSocialIcons).should("be.visible");
    cy.get(PlayerSelectors.copyLinkButton).should("be.visible");
    cy.get(PlayerSelectors.atTimestampCheckbox).should("be.visible");
    cy.get(PlayerSelectors.shortenLinkCheckbox).should("be.visible");
    cy.get(PlayerSelectors.embedTab).should("be.visible");
    cy.get(PlayerSelectors.messageTab).should("be.visible");
  });

  it("Should switch to embed tab in share popup", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.embedTab).click();
    cy.get(PlayerSelectors.embedTabContent).should("be.visible");
  });

  it("Should switch to message tab in share popup", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.messageTab).click();
    cy.get(PlayerSelectors.sharePopup).should("be.visible");
  });

  it("Should copy the link when I click the copy link button", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.atTimestampCheckbox).click();
    cy.get(PlayerSelectors.shortenLinkCheckbox).click();
    cy.get(PlayerSelectors.sharePopup).within(() => {
      cy.get(PlayerSelectors.copyLinkButton)
        .first()
        .click()
        .should("contain", "Copied!");
    });
  });

  it("Should toggle between play and pause", () => {
    startPlayback();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
    cy.get(PlayerSelectors.playPauseButton).click();
    cy.get(PlayerSelectors.stickyPlayer).should("still.be.visible");
  });

  it("Should close share modal when dismissed", () => {
    cy.get(PlayerSelectors.shareButton).click();
    cy.get(PlayerSelectors.sharePopup).should("be.visible");
    cy.get(PlayerSelectors.shareCloseButton).click();
    cy.get(PlayerSelectors.sharePopup).should("not.exist");
  });

  it("Should keep sticky player title visible while playing", () => {
    startPlayback();
    cy.get(PlayerSelectors.playerTrackTitle).should("be.visible");
  });

  it("Should show sticky player controls and progress bar", () => {
    startPlayback();
    cy.get(PlayerSelectors.playerControls).should("be.visible");
    cy.get(PlayerSelectors.playerButtonPrevious).should("be.visible");
    cy.get(PlayerSelectors.playerButtonPlayPause).should("be.visible");
    cy.get(PlayerSelectors.playerButtonNext).should("be.visible");
    cy.get(PlayerSelectors.playerProgressBar).should("be.visible");
    cy.get(PlayerSelectors.playerCurrentTime).should("exist");
    cy.get(PlayerSelectors.playerDuration).should("exist");
  });

  it("Should toggle shuffle and repeat controls without crashing", () => {
    startPlayback();
    cy.get(PlayerSelectors.playerButtonShuffle).click();
    cy.get(PlayerSelectors.playerButtonRepeat).click();
    cy.get(PlayerSelectors.playerButtonRepeat).click();
    cy.get(PlayerSelectors.stickyPlayer).should("be.visible");
  });

  it("Should open and close queue panel from sticky player", () => {
    startPlayback();
    cy.get(PlayerSelectors.queueButton).click();
    cy.get(PlayerSelectors.queuePanel).should("be.visible");
    cy.get(PlayerSelectors.queueCloseButton).click();
    cy.get(PlayerSelectors.queuePanel).should("not.exist");
  });

  it("Should open mute/volume controls in sticky player", () => {
    startPlayback();
    cy.get(PlayerSelectors.playerButtonMute).should("be.visible").click();
    cy.get(PlayerSelectors.playerVolumeWrapper).should("be.visible");
  });
});
