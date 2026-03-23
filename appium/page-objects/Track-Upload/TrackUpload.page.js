const BasePage = require('../base.page');
const { TrackUploadSelectors } = require('../../selectors');

class TrackUploadPage extends BasePage {

  // ── Home Screen ────────────────────────────────────────────────────────

    async waitForHomeScreen() {
        await this.getElement(TrackUploadSelectors.HOME_TITLE);
    }

    // ── Upload Screen ──

    async selectAudio() {
        await this.tap(TrackUploadSelectors.TRACK_FILE);
        await this.pause(6000);
    }

    async isUploadPageVisible() {
        return this.isVisible(TrackUploadSelectors.UPLOAD_TITLE);
    }

    // ── Upload Header Tabs ──

    async isAllTabsVisible() {
        const results = await Promise.all([
        this.isVisible(TrackUploadSelectors.TRACK_INFO_TAP),
        this.isVisible(TrackUploadSelectors.ADVANCED_TAP),
        this.isVisible(TrackUploadSelectors.PERMISSIONS_TAP),
        ]);
        return results.every(Boolean);
    }

    async tapTrackInfoTab() {
        await this.tap(TrackUploadSelectors.TRACK_INFO_TAP);
    }

    async tapAdvancedTab() {
        await this.tap(TrackUploadSelectors.ADVANCED_TAP);
    }

    async tapPermissionsTab() {
        await this.tap(TrackUploadSelectors.PERMISSIONS_TAP);
    }

    // ── Upload Form ──

    async tapCover() {
        await this.tap(TrackUploadSelectors.TRACK_COVER);
    }

    async getTrackTitle() {
        const input = await $(`-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)`);
        await input.waitForDisplayed({ timeout: 10000 });
        return input.getText();
    }

    async getArtistName() {
        const input = await $(`-android uiautomator:new UiSelector().className("android.widget.EditText").instance(1)`);
        await input.waitForDisplayed({ timeout: 10000 });
        return input.getText();
    }

    async writeTrackTitle(title) {
        const input = await $(`-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)`);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.clearValue();
        await input.addValue(title);
    }

    async writeArtistName(name) {
        const input = await $(`-android uiautomator:new UiSelector().className("android.widget.EditText").instance(1)`);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.clearValue();
        await input.addValue(name);
    }

    async selectGenre(genre) {
        await this.tap(TrackUploadSelectors.GENRE_DROPDOWN);
        await this.pause(1000);
        await this.tap(TrackUploadSelectors.GENRE[genre]);  
    }

    async writeTags(tags) {
        const input = await $(TrackUploadSelectors.TAGS_INPUT);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(tags);
    }

    async writeDescription(description) {
        const input = await $(TrackUploadSelectors.DESCRIPTION_INPUT);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(description);
    }

    async writeCaption(caption) {
        const input = await $(TrackUploadSelectors.CAPTION_INPUT);
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(caption);
    }

    async tapPublic() {
        await this.tap(TrackUploadSelectors.PUBLIC_BUTTON);
    }

    async tapPrivate() {
        await this.tap(TrackUploadSelectors.PRIVATE_BUTTON);
    }

    async tapSave1() {
        await this.tap(TrackUploadSelectors.SAVE_BUTTON_1);
        await this.pause(2000);
    }

    async tapSave2() {
        await this.tap(TrackUploadSelectors.SAVE_BUTTON_2);
        await this.pause(2000);
    }

    // ── Assertions ──
    async isSuccessMessageVisible() {
        return this.isVisible(TrackUploadSelectors.UPLOAD_SUCCESS_MESSAGE);
    }

}

module.exports = new TrackUploadPage();
