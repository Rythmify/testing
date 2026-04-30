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
    cy.get(AudioUploadSelectors.uploadTagsInput).type("Test"); 
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

  // Edge case: Empty title after recording
  it("Should show error when submitting with empty title", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.selectGenreDropdown).click();
    cy.get(AudioUploadSelectors.selectGenreDropdown).type("Electronic{enter}");
    cy.contains(/Electronic/i).click();
    cy.get(AudioUploadSelectors.uploadButton).click();
    cy.get(AudioUploadSelectors.uploadErrorMessage).should("be.visible");
    cy.get(AudioUploadSelectors.uploadErrorMessage).should(
      "contain",
      "Track title is required"
    );
  });

  // Edge case: Title with only spaces
  it("Should show error when title contains only spaces", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("     ");
    cy.get(AudioUploadSelectors.selectGenreDropdown).click();
    cy.get(AudioUploadSelectors.selectGenreDropdown).type("Rock{enter}");
    cy.contains(/Rock/i).click();
    cy.get(AudioUploadSelectors.uploadButton).click();
    cy.get(AudioUploadSelectors.uploadErrorMessage).should("be.visible");
  });

  // Edge case: Very long title (exceeding normal limits)
  it("Should handle very long track title (200+ characters)", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    const longTitle =
      "This is a very long track title that exceeds normal character limits to test how the system handles extremely long input strings and whether it properly truncates or validates the input for database storage and display purposes";
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadTitleInput).type(longTitle);
    cy.get(AudioUploadSelectors.uploadTitleInput).should("have.value", longTitle);
  });

  // Edge case: Title with special characters and emoji
  it("Should handle title with special characters and emoji", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    const specialTitle = "Track #1 - @Remix (ft. Artist) 🎵";
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadTitleInput).type(specialTitle);
    cy.get(AudioUploadSelectors.uploadTitleInput).should(
      "have.value",
      specialTitle
    );
  });

  // Edge case: Track link auto-generation from title
  it("Should auto-generate track link from title input", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("My New Song 2025");
    cy.get(AudioUploadSelectors.uploadTrackLinkInput).should(
      "have.value",
      "my-new-song-2025"
    );
  });

  // Edge case: Manual track link editing
  it("Should allow manual editing of track link", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("Original Title");
    cy.get(AudioUploadSelectors.uploadTrackLinkInput).clear();
    cy.get(AudioUploadSelectors.uploadTrackLinkInput).type("custom-url-slug");
    cy.get(AudioUploadSelectors.uploadTrackLinkInput).should(
      "have.value",
      "custom-url-slug"
    );
  });

  // Edge case: Tags with comma-separated values
  it("Should handle tags with multiple comma-separated values", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("Tagged Track");
    cy.get(AudioUploadSelectors.selectGenreDropdown).click();
    cy.get(AudioUploadSelectors.selectGenreDropdown).type("House{enter}");
    cy.contains(/House/i).click();
    const tags = "upbeat, energetic, dance, 2025, remix";
    cy.get(AudioUploadSelectors.uploadTagsInput).type(tags);
    cy.get(AudioUploadSelectors.uploadTagsInput).should("have.value", tags);
  });

  // Edge case: Description with maximum length
  it("Should handle long description text", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("Described Track");
    cy.get(AudioUploadSelectors.selectGenreDropdown).click();
    cy.get(AudioUploadSelectors.selectGenreDropdown).type("Jazz{enter}");
    cy.contains(/Jazz/i).click();
    const longDescription =
      "This is a comprehensive description of the track that includes details about the production process, the mood and atmosphere, featured artists, recording location, and inspiration behind the music. It includes line breaks\nand special formatting to test rendering.";
    cy.get(AudioUploadSelectors.uploadDescriptionInput).type(longDescription);
    cy.get(AudioUploadSelectors.uploadDescriptionInput).should(
      "have.value",
      longDescription
    );
  });

  // Edge case: Artists field with multiple featured artists
  it("Should handle multiple featured artists in artists field", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadTitleInput).type("Collaboration Track");
    const artists = "Artist A, Artist B, Artist C, Producer X";
    cy.get(AudioUploadSelectors.uploadArtistsInput).clear();
    cy.get(AudioUploadSelectors.uploadArtistsInput).type(artists);
    cy.get(AudioUploadSelectors.uploadArtistsInput).should("have.value", artists);
  });

  // Edge case: Form details visibility and structure
  it("Should display upload details form with all fields after recording", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(2000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.uploadDetailsForm).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTitleInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTrackLinkInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadArtistsInput).should("be.visible");
    cy.get(AudioUploadSelectors.selectGenreDropdown).should("be.visible");
    cy.get(AudioUploadSelectors.uploadTagsInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadDescriptionInput).should("be.visible");
  });

  // Edge case: Undo and Redo recording actions
  it("Should allow undo/redo recording actions", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(1000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.undoRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.undoRecordingButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.redoRecordingButton).should("be.visible");
  });

  // Edge case: Restart recording clears previous attempt
  it("Should restart recording and clear previous attempt", () => {
    cy.get(AudioUploadSelectors.recordSectionToggleButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).click();
    cy.wait(1000);
    cy.get(AudioUploadSelectors.stopRecordingButton).click();
    cy.get(AudioUploadSelectors.restartRecordingButton).should("be.visible");
    cy.get(AudioUploadSelectors.restartRecordingButton).click();
    cy.get(AudioUploadSelectors.startRecordingButton).should("be.visible");
  });
});
