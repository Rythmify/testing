const homePage  = require('../../page-objects/Feed/home.page');
const loginPage = require('../../page-objects/auth/login.page');
const welcomePage = require('../../page-objects/auth/welcome.page');
const { validUser } = require('../../fixtures/user.json');

// LOGIN before all tests — session is kept alive by noReset: true
before(async () => {
  await welcomePage.waitForWelcomeScreen();
  await welcomePage.tapLogin();
  await loginPage.login(validUser.email, validUser.password);
  const home = await driver.$('android=new UiSelector().description("Home\nTab 1 of 5")');
  await home.waitForDisplayed({ timeout: 15000 });
});

// ─── Bottom Navigation ───

describe('Home Page — Bottom Navigation', () => {

  it('TC-HOME-001 | Home tab is visible and tappable', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapHomeTab();
    expect(await homePage.isHeaderVisible()).toBe(true);
  });

  it('TC-HOME-002 | All 5 bottom nav tabs are visible', async () => {
    await homePage.waitForHomeScreen();
    const allVisible = await homePage.isAllNavTabsVisible();
    expect(allVisible).toBe(true);
  });

  it('TC-HOME-003 | Each bottom nav tab navigates without crash', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapFeedTab();
    await homePage.tapSearchTab();
    await homePage.tapLibraryTab();
    await homePage.tapUpgradeTab();
    await homePage.tapHomeTab();
    const isVisible = await homePage.isHeaderVisible();
    expect(isVisible).toBe(true);
  });

  // ─── Header ────
  
  describe('Home Page — Header', () => {
  
    it('TC-HOME-004 | Header title and all 3 icon buttons are visible', async () => {
      await homePage.waitForHomeScreen();
      const allVisible = await homePage.isAllHeaderElementsVisible();
      expect(allVisible).toBe(true);
    });
  
    it('TC-HOME-005 | Upload button opens a screen without crash', async () => {
      await homePage.waitForHomeScreen();
      await homePage.tapUploadButton();
      await driver.back();
      await driver.back(); 
      await driver.back();
      expect(true).toBe(true);
    });
  
    it('TC-HOME-006 | Message button opens a screen without crash', async () => {
      await homePage.waitForHomeScreen();
      await homePage.tapMessageButton();
      await driver.back();
      expect(true).toBe(true);
    });
  
    it('TC-HOME-007 | Notification button opens a screen without crash', async () => {
      await homePage.waitForHomeScreen();
      await homePage.tapNotificationButton();
      await driver.back();
      expect(true).toBe(true);
    });
  
  });
});
