import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { ProfileSelectors } from "../../support/selectors/profile.selectors";
describe("Profile Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.get(ProfileSelectors.avatarMenuButton).first().click();
    cy.contains(/Profile/i).click();
  });

  it("Should display the profile page", () => {
    cy.contains(/Edit/i).should("be.visible");
    cy.contains(/Playlists/i).should("be.visible");
  });

  it("Should navigate to edit profile page when I click the edit button", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.contains(/Edit your Profile/i).should("be.visible");
    cy.get(ProfileSelectors.editDisplayNameInput).should("be.visible");
    cy.get(ProfileSelectors.editBioInput).should("be.visible");
    cy.get(ProfileSelectors.editCityInput).should("be.visible");
    cy.get(ProfileSelectors.editCountryInput).should("be.visible");
    cy.get(ProfileSelectors.editSaveButton).should("be.visible");
    cy.get(ProfileSelectors.editCancelButton).should("be.visible");
  });

  it("Should show validation error when display name is numbers only", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.get(ProfileSelectors.editDisplayNameInput).clear().type("123456");
    cy.get(ProfileSelectors.editSaveButton).click();
    cy.contains(/Display name cannot be numbers only./i).should("be.visible");
  });

  it("Should update profile information and save changes", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.get(ProfileSelectors.editDisplayNameInput).clear().type("Ahmed Testing");
    cy.get(ProfileSelectors.editBioInput).clear().type("This is a test bio");
    cy.get(ProfileSelectors.editCityInput).clear().type("Cairo");
    cy.get(ProfileSelectors.editCountryInput).clear().type("Egypt");
    cy.get(ProfileSelectors.editSaveButton).click();
    cy.contains(/Ahmed Testing/i).should("be.visible");
    cy.contains(/This is a test bio/i).should("be.visible");
    cy.contains(/Cairo, Egypt/i).should("be.visible");
  });

  it("Should display profile stats", () => {
    cy.get(ProfileSelectors.followingStat).should("be.visible");
    cy.get(ProfileSelectors.followersStat).should("be.visible");
  });

  it("Should open and close share modal", () => {
    cy.get(ProfileSelectors.shareButton).click();
    cy.get(ProfileSelectors.shareModalContent).should("be.visible");
    cy.get(ProfileSelectors.shareModalOverlay).click("topLeft");
    cy.get(ProfileSelectors.shareModalContent).should("not.exist");
  });

  it("Should switch to message tab in share modal", () => {
    cy.get(ProfileSelectors.shareButton).click();
    cy.get(ProfileSelectors.shareTabMessage).click();
    cy.get(ProfileSelectors.messageToInput).should("be.visible");
    cy.get(ProfileSelectors.messageBodyInput).should("be.visible");
    cy.get(ProfileSelectors.messageSendButton).should("be.visible");
  });

  it("Should cancel edit and not save changes", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.get(ProfileSelectors.editDisplayNameInput)
      .clear()
      .type("Should Not Save");
    cy.get(ProfileSelectors.editCancelButton).click();
    cy.contains(/Should Not Save/i).should("not.exist");
  });

  it("Should display user profile with basic info", () => {
    cy.get(ProfileSelectors.profileFollowers).should("be.visible");
    cy.get(ProfileSelectors.profileFollowing).should("be.visible");
  });

  it("Should show follow/unfollow button for non-own profile", () => {
    cy.visit("/beatmaker99");
    if (cy.contains(/Follow/i).should("not.exist")) {
      cy.get(ProfileSelectors.followButton).click();
    }
    cy.contains(/Following/i);
  });

  it("Should hide follow button on own profile", () => {
    cy.wait(500);
    cy.get(ProfileSelectors.followButton).should("not.exist");
  });

  it("Should display all profile tabs", () => {
    cy.get(ProfileSelectors.profileTabTracks).should("be.visible");
    cy.get(ProfileSelectors.profileTabAlbums).should("be.visible");
    cy.get(ProfileSelectors.profileTabReposts).should("be.visible");
  });

  it("Should redirect to own profile when visiting 'you'", () => {
    cy.visit("/you");
    cy.location("pathname").should("include", "ahmedattay8");
  });
  it("Should show main owner actions", () => {
    cy.get(ProfileSelectors.shareButton).should("be.visible");
    cy.get(ProfileSelectors.editButton).should("be.visible");
  });

  it("Should show profile tabs", () => {
    cy.get(ProfileSelectors.tabAll).should("be.visible");
    cy.get(ProfileSelectors.tabPopularTracks).should("be.visible");
    cy.get(ProfileSelectors.tabTracks).should("be.visible");
    cy.get(ProfileSelectors.tabAlbums).should("be.visible");
    cy.get(ProfileSelectors.tabPlaylists).should("be.visible");
    cy.get(ProfileSelectors.tabReposts).should("be.visible");
  });

  it("Should open more menu on non-owner profile", () => {
    cy.visit("/beatmaker99");
    cy.get(ProfileSelectors.moreButton).click();
    cy.get(ProfileSelectors.blockButton).should("be.visible");
    cy.get(ProfileSelectors.reportButton).should("be.visible");
  });

  it("Should show edit fields", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.get(ProfileSelectors.editDisplayNameInput).should("be.visible");
    cy.get(ProfileSelectors.editCityInput).should("be.visible");
    cy.get(ProfileSelectors.editCountryInput).should("be.visible");
    cy.get(ProfileSelectors.editBioInput).should("be.visible");
  });

  it("Should show edit controls", () => {
    cy.get(ProfileSelectors.editButton).click();
    cy.get(ProfileSelectors.addLinkButton).should("be.visible");
    cy.get(ProfileSelectors.addSupportLinkButton).should("be.visible");
    cy.get(ProfileSelectors.editCancelButton).should("be.visible");
    cy.get(ProfileSelectors.editSaveButton).should("be.visible");
    cy.get(ProfileSelectors.editModalCloseButton).should("be.visible");
  });
});
