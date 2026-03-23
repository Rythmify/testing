const BasePage = require('../base.page');
const HomeSelectors = require('../../selectors');
const { scrollDown, scrollRight, pause } = require('../support/helpers');

class HomePage extends BasePage {

  // ── Navigation ──

  async waitForHomeScreen() {
    await this.getElement(HomeSelectors.HEADER.TITLE);
  }

  async tapHomeTab() {
    await this.tap(HomeSelectors.NAV.HOME_TAB);
  }

  async tapFeedTab() {
    await this.tap(HomeSelectors.NAV.FEED_TAB);
  }

  async tapSearchTab() {
    await this.tap(HomeSelectors.NAV.SEARCH_TAB);
  }

  async tapLibraryTab() {
    await this.tap(HomeSelectors.NAV.LIBRARY_TAB);
  }

  async tapUpgradeTab() {
    await this.tap(HomeSelectors.NAV.UPGRADE_TAB);
  }

  // ── Header ──

  async isHeaderVisible() {
    return this.isVisible(HomeSelectors.HEADER.TITLE);
  }

  async tapUploadButton() {
    await this.tap(HomeSelectors.HEADER.UPLOAD_BTN);
  }

  async tapMessageButton() {
    await this.tap(HomeSelectors.HEADER.MESSAGE_BTN);
  }

  async tapNotificationButton() {
    await this.tap(HomeSelectors.HEADER.NOTIF_BTN);
  }

  // ── Genre Tabs ──

  async tapGenre(genreSelector) {
    await this.tap(genreSelector);
    await pause(400);
  }

  async isGenreTabVisible(genreSelector) {
    return this.isVisible(genreSelector);
  }

  // ── Hot For You ──

  async isActivityCardVisible() {
    return this.isVisible(HomeSelectors.HOT_FOR_YOU.ACTIVITY_CARD);
  }

  async tapActivityCard() {
    await this.tap(HomeSelectors.HOT_FOR_YOU.ACTIVITY_CARD);
  }

  async toggleActivityActionButton() {
    await this.tap(HomeSelectors.HOT_FOR_YOU.ACTION_BTN);
    await pause(400);
    await this.tap(HomeSelectors.HOT_FOR_YOU.ACTION_BTN); 
    await pause(400);
  }

  // ── Feed Track Cards ──

  async isNeonNightsCardVisible() {
    return this.isVisible(HomeSelectors.TRACK.NEON_NIGHTS);
  }

  async tapNeonNightsCard() {
    await this.tap(HomeSelectors.TRACK.NEON_NIGHTS);
  }

  // ── Mock Sections (scroll only) ──

  async scrollToSection(sectionSelector) {
    let visible = await this.isVisible(sectionSelector);
    let attempts = 0;
    while (!visible && attempts < 5) {
      await scrollDown();
      visible = await this.isVisible(sectionSelector);
      attempts++;
    }
    return visible;
  }

  async scrollSectionHorizontally(sectionSelector) {
    const element = await this.getElement(sectionSelector);
    const loc = await element.getLocation();
    await scrollRight(loc.y + 60);
    await scrollRight(loc.y + 60);
  }

}

module.exports = new HomePage();
