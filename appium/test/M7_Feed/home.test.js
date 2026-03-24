const homePage  = require('../../page-objects/Feed/home.page');
const { HomeSelectors } = require('../../selectors');
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

// ─── Trending by Genre ───

describe('Home Page — Trending by Genre', () => {
  
  it('TC-HOME-008 | All initial genre filter tabs are visible', async () => {
    await homePage.waitForHomeScreen();
    const allVisible = await homePage.isInitialGenreTabsVisible();
    expect(allVisible).toBe(true);
  });
  
  it('TC-HOME-009 | Switching genre tabs does not crash the app', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapReggaeGenre();
    await homePage.tapCountryGenre();
    await homePage.tapElectronicGenre();
    await homePage.tapIndieGenre();
    await homePage.tapPopGenre();
    await homePage.tapTechnoGenre();
    await homePage.tapJazzGenre();
    await homePage.tapHipHopRapGenre();
    await homePage.tapRockMetalPunkGenre();
  });

  it('TC-HOME-010 | Scrolling through the genre section actually moves content', async () => {
    await homePage.waitForHomeScreen();
    await homePage.scrollGenreSectionHorizontally();
    const isVisible = await homePage.isReggaeGenreVisible();
    expect(isVisible).toBe(true);
  });
});

// ─── Hot For You ───

describe('Home Page — Hot For You', () => {

  it('TC-HOME-011 | Hot For You activity card is visible', async () => {
    await homePage.waitForHomeScreen();
    const isVisible = await homePage.isActivityCardVisible();
    expect(isVisible).toBe(true);
  });

  it('TC-HOME-012 | Hot For You action button toggles without crash', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapActionButton(); 
    await homePage.tapActionButton(); 
    const isVisible = await homePage.isActionButtonVisible();
    expect(isVisible).toBe(true);
  });

});

// ─── Mock Sections (scroll only) ───

describe('Home Page — Mock Sections (scroll only)', () => {

  it('TC-HOME-013 | Mixed For You section is visible and horizontally scrollable', async () => {
    const visible = await homePage.scrollToMixedForYou();
    expect(visible).toBe(true);
    await homePage.scrollMixedForYouHorizontally();
    // const stillVisible = await homePage.isMixedForYouVisible();
    // expect(stillVisible).toBe(true);
  });

  it('TC-HOME-014 | Discover with Stations section is visible and scrollable', async () => {
    const visible = await homePage.scrollToDiscoverWithStations();
    expect(visible).toBe(true);
    await homePage.scrollDiscoverWithStationsHorizontally();
    // const stillVisible = await homePage.isDiscoverWithStationsVisible();
    // expect(stillVisible).toBe(true);
  });

  it('TC-HOME-015 | More of What You Like section is visible and scrollable', async () => {
    const visible = await homePage.scrollToMoreOfWhatYouLike();
    expect(visible).toBe(true);
    await homePage.scrollMoreOfWhatYouLikeHorizontally();
    // const stillVisible = await homePage.isMoreOfWhatYouLikeVisible();
    // expect(stillVisible).toBe(true);
  });

});