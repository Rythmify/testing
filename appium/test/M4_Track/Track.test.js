const TrackPage = require('../../page-objects/Track&Player/Track.page');
const homePage        = require('../../page-objects/Feed/home.page');
const loginPage       = require('../../page-objects/auth/login.page');
const welcomePage     = require('../../page-objects/auth/welcome.page');
const { validUser }   = require('../../fixtures/user.json');


// ─── Login before all tests ────
before(async () => {
  const home = await driver.$('android=new UiSelector().description("Home\nTab 1 of 5")');
  const isHome = await home.isDisplayed().catch(() => false);
  if (!isHome) {
    await welcomePage.waitForWelcomeScreen();
    await welcomePage.tapLogin();
    await loginPage.login(validUser.email, validUser.password);
    await home.waitForDisplayed({ timeout: 15000 });
  }
});


describe('Track - TestCases', () => {

  //need selectors to work  
  it('TC-TRACK- 001 | track name & artist name is Visible & correct', async () => {
    await homePage.waitForHomeScreen();
    const isTrackInfoVisible = await TrackPage.isTrackInfoVisible();
    expect(isTrackInfoVisible).toBe(true);
   });

   it('TC-TRACK-002 | All UI is visible', async () => {
    await homePage.waitForHomeScreen();
    const isTabsVisible = await TrackPage.isAllTabsVisible();
    expect(isTabsVisible).toBe(true);
   });

   it('TC-TRACK-003 | Tags are visible & tappable & scrollable', async () => {
    await homePage.waitForHomeScreen();
    await TrackPage.isTagsVisible();
   });

   it('TC-TRACK-004 | Show More is visible & tappable', async () => {
    await homePage.waitForHomeScreen();
    const isVisible = await TrackPage.isShowMoreVisible();
    expect(isVisible).toBe(true);
    await TrackPage.tapShowMore();
    //expect to see Description Box
   });

   it('TC-TRACK-005 | Fans Leaderboard is visible & tappable', async () => {
    await homePage.waitForHomeScreen();
   });

   //other tests when implemented

});
