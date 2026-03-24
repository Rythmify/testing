const BasePage             = require('../base.page');
const { ProfileSelectors } = require('../../selectors');

class ProfilePage extends BasePage {

  async goToLibrary() {
    await this.tap(ProfileSelectors.LIBRARY_TAB);
  }

  async openMyProfile() {
    await this.tap(ProfileSelectors.MY_PROFILE_CARD);
  }

  async waitForProfileScreen() {
    const el = await driver.$(ProfileSelectors.EDIT_PROFILE_BUTTON);
    await el.waitForDisplayed({ timeout: 10000 });
  }

  async isEditButtonVisible() {
    return this.isVisible(ProfileSelectors.EDIT_PROFILE_BUTTON);
  }

  async tapEditButton() {
    await this.tap(ProfileSelectors.EDIT_PROFILE_BUTTON);
  }

  async isCoverPhotoVisible() {
    return this.isVisible(ProfileSelectors.COVER_PHOTO_AREA);
  }

  async isUsernameVisible(username) {
    return this.isVisible(ProfileSelectors.DISPLAY_USERNAME(username));
  }

  async isLocationVisible(location) {
    return this.isVisible(ProfileSelectors.DISPLAY_LOCATION(location));
  }

  async isCountryVisible(country) {
    return this.isVisible(ProfileSelectors.DISPLAY_COUNTRY(country));
  }

  async isBioVisible(bio) {
    return this.isVisible(ProfileSelectors.DISPLAY_BIO(bio));
  }

  async isUsernameFieldVisible(currentValue) {
    return this.isVisible(ProfileSelectors.USERNAME_FIELD(currentValue));
  }

  async isLocationFieldVisible(currentValue) {
    return this.isVisible(ProfileSelectors.LOCATION_FIELD(currentValue));
  }

  async isCountryDropdownVisible(currentCountry) {
    return this.isVisible(ProfileSelectors.COUNTRY_DROPDOWN(currentCountry));
  }

  async isBioFieldVisible(currentValue) {
    return this.isVisible(ProfileSelectors.BIO_FIELD(currentValue));
  }

  async isSaveButtonVisible() {
    return this.isVisible(ProfileSelectors.SAVE_BUTTON);
  }

  async clearAndFillField(selector, newValue) {
    const el = await driver.$(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    await el.click();
    await el.clearValue();
    await el.addValue(newValue);
  }

  async editUsername(currentValue, newValue) {
    await this.clearAndFillField(ProfileSelectors.USERNAME_FIELD(currentValue), newValue);
  }

  async editLocation(currentValue, newValue) {
    await this.clearAndFillField(ProfileSelectors.LOCATION_FIELD(currentValue), newValue);
  }

  async editBio(currentValue, newValue) {
    await this.clearAndFillField(ProfileSelectors.BIO_FIELD(currentValue), newValue);
  }

  async selectCountry(currentCountry, newCountry) {
    await this.tap(ProfileSelectors.COUNTRY_DROPDOWN(currentCountry));
    await this.pause(1000);
    await this.tap(ProfileSelectors.COUNTRY_OPTION(newCountry));
  }

  async tapDone() {
    await this.tap(ProfileSelectors.DONE_BUTTON);
    await this.pause(500);
  }

  async tapSave() {
    await this.tap(ProfileSelectors.SAVE_BUTTON);
    await this.pause(2000);
  }

  async tapBack() {
    await this.tap(ProfileSelectors.FIRST_NATIVE_BUTTON);
    await this.pause(1000);
  }

  async tapDiscardChanges() {
    await this.tap(ProfileSelectors.DISCARD_CHANGES_BUTTON);
    await this.pause(1000);
  }

  async tapContinueEditing() {
    await this.tap(ProfileSelectors.CONTINUE_EDITITNG_BUTTON);
    await this.pause(500);
  }

  // Flow A: open edit → change all fields → save
  async editAndSave(currentUsername, newUsername, currentLocation, newLocation,
                    currentBio, newBio, currentCountry, newCountry) {
    await this.tapEditButton();
    await this.pause(1000);
    await this.editUsername(currentUsername, newUsername);
    await this.editLocation(currentLocation, newLocation);
    await this.selectCountry(currentCountry, newCountry);
    await this.editBio(currentBio, newBio);
    await this.tapDone();
    await this.tapSave();
  }

  // Flow B: open edit → change username → tap back → discard
  async editAndDiscard(currentUsername, newUsername) {
    await this.tapEditButton();
    await this.pause(1000);
    await this.editUsername(currentUsername, newUsername);
    await this.tapBack();
    await this.tapDiscardChanges();
  }

  // Flow C: open edit → change username → tap back → continue editing
  async editAndContinueEditing(currentUsername, newUsername) {
    await this.tapEditButton();
    await this.pause(1000);
    await this.selectCountry(currentCountry, newCountry);
    await this.tapBack();
    await this.tapContinueEditing();
  }

  async isEditFormVisible(currentCountry) {
    return this.isVisible(ProfileSelectors.COUNTRY_DROPDOWN(currentCountry));
  }

}

module.exports = new ProfilePage();
