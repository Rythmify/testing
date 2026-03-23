const BasePage = require('../base.page');
const { HomeSelectors } = require('../../selectors');
const { scrollDown, scrollRight, pause } = require('../../support/helpers');

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

    async isAllNavTabsVisible() {
    const results = await Promise.all([
      this.isVisible(HomeSelectors.NAV.HOME_TAB),
      this.isVisible(HomeSelectors.NAV.FEED_TAB),
      this.isVisible(HomeSelectors.NAV.SEARCH_TAB),
      this.isVisible(HomeSelectors.NAV.LIBRARY_TAB),
      this.isVisible(HomeSelectors.NAV.UPGRADE_TAB),
    ]);
    return results.every(Boolean);
  }

  // ── Header ──

  async isHeaderVisible() {
    return this.isVisible(HomeSelectors.HEADER.TITLE);
  }

  async isAllHeaderElementsVisible() {
    const results = await Promise.all([
      this.isVisible(HomeSelectors.HEADER.TITLE),
      this.isVisible(HomeSelectors.HEADER.UPLOAD_BTN),
      this.isVisible(HomeSelectors.HEADER.MESSAGE_BTN),
      this.isVisible(HomeSelectors.HEADER.NOTIF_BTN),
    ]);
    return results.every(Boolean);
  }

  async tapUploadButton() {
    await this.tap(HomeSelectors.HEADER.UPLOAD_BTN);
    await this.pause(1500);
  }

  async tapMessageButton() {
    await this.tap(HomeSelectors.HEADER.MESSAGE_BTN);
    await this.pause(1500);
  }

  async tapNotificationButton() {
    await this.tap(HomeSelectors.HEADER.NOTIF_BTN);
    await this.pause(1500);
  }

  // ── Genre Tabs ──

  async isAllGenreTabsVisible() {
    const results = await Promise.all([
      this.isVisible(HomeSelectors.GENRE.REGGAE),
      this.isVisible(HomeSelectors.GENRE.COUNTRY),
      this.isVisible(HomeSelectors.GENRE.ELECTRONIC),
      this.isVisible(HomeSelectors.GENRE.INDIE),
      this.isVisible(HomeSelectors.GENRE.POP),
      this.isVisible(HomeSelectors.GENRE.JAZZ),
      this.isVisible(HomeSelectors.GENRE.HIPHOP_RAP),
      this.isVisible(HomeSelectors.GENRE.ROCK_METAL_PUNK),
    ]);
    return results.every(Boolean);
  }

  async tapElectronicGenre() {
    await this.tap(HomeSelectors.GENRE.ELECTRONIC);
    await this.pause(400);
  }

  async tapIndieGenre() {
    await this.tap(HomeSelectors.GENRE.INDIE);
    await this.pause(400);
  }

  async tapPopGenre() {
    await this.tap(HomeSelectors.GENRE.POP);
    await this.pause(400);
  }

  async tapJazzGenre() {
    await this.tap(HomeSelectors.GENRE.JAZZ);
    await this.pause(400);
  }

  async tapReggaeGenre() {
    await this.tap(HomeSelectors.GENRE.REGGAE);
    await this.pause(400);
  }

  async tapHipHopRapGenre() {
    await this.tap(HomeSelectors.GENRE.HIPHOP_RAP);
    await this.pause(400);
  }

  async tapRockMetalPunkGenre() {
    await this.tap(HomeSelectors.GENRE.ROCK_METAL_PUNK);
    await this.pause(400);
  }

  // ── Hot For You ──
  async isActivityCardVisible() {
    return this.isVisible(HomeSelectors.HOT_FOR_YOU.ACTIVITY_CARD);
  }

  async tapActivityCard() {
    await this.tap(HomeSelectors.HOT_FOR_YOU.ACTIVITY_CARD);
    await this.pause(1500);
  }

  async isActionButtonVisible() {
    return this.isVisible(HomeSelectors.HOT_FOR_YOU.ACTION_BTN);
  }

  async tapActionButton() {
    await this.tap(HomeSelectors.HOT_FOR_YOU.ACTION_BTN);
    await this.pause(400);
  }

  // ── Feed Track Cards ──

  async isNeonNightsVisible() {
    return this.isVisible(HomeSelectors.TRACK.NEON_NIGHTS);
  }

  async tapNeonNightsCard() {
    await this.tap(HomeSelectors.TRACK.NEON_NIGHTS);
    await this.pause(1500);
  }

  // ── Mock Sections (scroll only) ──

  async scrollToMixedForYou() {
    let visible = await this.isVisible(HomeSelectors.SECTIONS.MIXED_FOR_YOU);
    let attempts = 0;
    while (!visible && attempts < 5) {
      await scrollDown();
      visible = await this.isVisible(HomeSelectors.SECTIONS.MIXED_FOR_YOU);
      attempts++;
    }
    return visible;
  }

  async scrollToDiscoverWithStations() {
    let visible = await this.isVisible(HomeSelectors.SECTIONS.DISCOVER_WITH_STATIONS);
    let attempts = 0;
    while (!visible && attempts < 5) {
      await scrollDown();
      visible = await this.isVisible(HomeSelectors.SECTIONS.DISCOVER_WITH_STATIONS);
      attempts++;
    }
    return visible;
  }

  async scrollToMoreOfWhatYouLike() {
    let visible = await this.isVisible(HomeSelectors.SECTIONS.MORE_OF_WHAT_YOU_LIKE);
    let attempts = 0;
    while (!visible && attempts < 5) {
      await scrollDown();
      visible = await this.isVisible(HomeSelectors.SECTIONS.MORE_OF_WHAT_YOU_LIKE);
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

  async isMixedForYouVisible() {
    return this.isVisible(HomeSelectors.SECTIONS.MIXED_FOR_YOU);
  }

  async isDiscoverWithStationsVisible() {
    return this.isVisible(HomeSelectors.SECTIONS.DISCOVER_WITH_STATIONS);
  }

  async isMoreOfWhatYouLikeVisible() {
    return this.isVisible(HomeSelectors.SECTIONS.MORE_OF_WHAT_YOU_LIKE);
  }

  async scrollMixedForYouHorizontally() {
    const element = await this.getElement(HomeSelectors.SECTIONS.MIXED_FOR_YOU);
    const loc = await element.getLocation();
    await scrollRight(loc.y + 60);
    await scrollRight(loc.y + 60);
  }

  async scrollDiscoverWithStationsHorizontally() {
    const element = await this.getElement(HomeSelectors.SECTIONS.DISCOVER_WITH_STATIONS);
    const loc = await element.getLocation();
    await scrollRight(loc.y + 60);
    await scrollRight(loc.y + 60);
  }

  async scrollMoreOfWhatYouLikeHorizontally() {
    const element = await this.getElement(HomeSelectors.SECTIONS.MORE_OF_WHAT_YOU_LIKE);
    const loc = await element.getLocation();
    await scrollRight(loc.y + 60);
    await scrollRight(loc.y + 60);
  }

}

module.exports = new HomePage();
