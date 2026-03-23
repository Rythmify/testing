const homePage = require('../../page-objects/home.page');
const SELECTORS = require('../../selectors/home.selectors');

// ─── Bottom Navigation ───

describe('Home Page — Bottom Navigation', () => {

  it('TC-HOME-001 | Home tab is visible and tappable', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapHomeTab();
    expect(await homePage.isHeaderVisible()).toBe(true);
  });

  it('TC-HOME-002 | All 5 bottom nav tabs are visible', async () => {
    await homePage.waitForHomeScreen();

    const tabs = [
      SELECTORS.NAV.HOME_TAB,
      SELECTORS.NAV.FEED_TAB,
      SELECTORS.NAV.SEARCH_TAB,
      SELECTORS.NAV.LIBRARY_TAB,
      SELECTORS.NAV.UPGRADE_TAB,
    ];

    for (const selector of tabs) {
      expect(await homePage.isVisible(selector)).toBe(true);
    }
  });

  it('TC-HOME-003 | Each bottom nav tab navigates without crash', async () => {
    await homePage.waitForHomeScreen();

    await homePage.tapFeedTab();
    expect(await homePage.isVisible(SELECTORS.NAV.FEED_TAB)).toBe(true);

    await homePage.tapSearchTab();
    expect(await homePage.isVisible(SELECTORS.NAV.SEARCH_TAB)).toBe(true);

    await homePage.tapLibraryTab();
    expect(await homePage.isVisible(SELECTORS.NAV.LIBRARY_TAB)).toBe(true);

    await homePage.tapUpgradeTab();
    expect(await homePage.isVisible(SELECTORS.NAV.UPGRADE_TAB)).toBe(true);

    // Return home at end of test
    await homePage.tapHomeTab();
    expect(await homePage.isHeaderVisible()).toBe(true);
  });

});
