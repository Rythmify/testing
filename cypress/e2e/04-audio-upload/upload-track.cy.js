import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { AudioUploadSelectors } from "../../support/selectors/audio-upload.selectors";
describe("Audio Upload", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    cy.location("pathname").should("equal", "/discover");
    cy.get(AudioUploadSelectors.uploadLink).click();
  });
  // happy path test case for audio upload page
  it("Should go to upload page and display the upload form", () => {
    cy.contains(/Upload your audio files/i).should("be.visible");
    cy.get(AudioUploadSelectors.chooseFileInput).should("be.visible");
    cy.get(AudioUploadSelectors.chooseFileInput).click();
    cy.get(AudioUploadSelectors.recordSectionToggleButton).should("be.visible");
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.contains(/track info/i).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTitleInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTitleInput).type("Test Track");
    cy.get(AudioUploadSelectors.selectGenreDropdown).should("be.visible");
    cy.get(AudioUploadSelectors.selectGenreDropdown).click();
    cy.get(AudioUploadSelectors.selectGenreDropdown).type("Ambient{enter}");
    cy.contains(/Ambient/i).click();
    cy.get(AudioUploadSelectors.uploadTagsInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTagsInput).type("Test"); // there is error in FE don't select by the name of the tag, so I have to select by the id of the tag.
    cy.get(AudioUploadSelectors.uploadDescriptionInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadDescriptionInput).type(
      "This is a test track",
    );
    cy.get(AudioUploadSelectors.uploadButton).should("be.visible");
    cy.get(AudioUploadSelectors.uploadButton).click();
    cy.contains(/Saved to SoundCloud./i).should("be.visible");
  });
  // unhappy path test case for audio upload page
  it("Should show error if user do not fill the genre field", () => {
    cy.contains(/Upload your audio files/i).should("be.visible");
    cy.get(AudioUploadSelectors.chooseFileInput).should("be.visible");
    cy.get(AudioUploadSelectors.chooseFileInput).click();
    cy.get(AudioUploadSelectors.recordSectionToggleButton).should("be.visible");
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadDescriptionInput).type(
      "This is a test track",
    );
    cy.get(AudioUploadSelectors.uploadButton).click();
  });
});
