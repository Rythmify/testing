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

  it("Should go to upload page and display the upload form", () => {
    cy.contains(/Upload your audio files/i).should("be.visible");
    cy.get(AudioUploadSelectors.chooseFileInput).should("be.visible");
    cy.get('[data-test="file-input"]').should("exist");
    cy.get(AudioUploadSelectors.recordSectionToggleButton).should("be.visible");
  });

  it("Should show error when a non-audio file is uploaded", () => {
    cy.get('[data-test="file-input"]').selectFile(
      {
        contents: Cypress.Buffer.from("not-audio"),
        fileName: "invalid.txt",
        mimeType: "text/plain",
      },
      { force: true },
    );

    cy.contains(/File type is not supported./i).should("be.visible");
  });

  it("Should move to details mode after valid audio selection", () => {
    cy.get('[data-test="file-input"]').selectFile(
      {
        contents: Cypress.Buffer.from("RIFF....WAVEfmt"),
        fileName: "sample.wav",
        mimeType: "audio/wav",
      },
      { force: true },
    );

    cy.get('[data-test="upload-details-form"]').should("be.visible");
    cy.get(AudioUploadSelectors.uploadTitleInput).should("be.visible");
    cy.get(AudioUploadSelectors.uploadButton).should("be.visible");
  });

  it("Should show required-title error when uploading with empty title", () => {
    cy.get('[data-test="file-input"]').selectFile(
      {
        contents: Cypress.Buffer.from("RIFF....WAVEfmt"),
        fileName: "sample.wav",
        mimeType: "audio/wav",
      },
      { force: true },
    );

    cy.get(AudioUploadSelectors.uploadTitleInput).clear();
    cy.get(AudioUploadSelectors.uploadButton).click();
    cy.get('[data-test="upload-error-message"]').should(
      "contain",
      "Track title is required.",
    );
  });
});
