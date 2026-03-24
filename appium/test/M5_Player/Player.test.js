const PlayerPage = require('../../page-objects/Track&Player/Player.page');
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


describe('PLAYER - TestCases', () => {

  //need selectors to work  
  it('TC-PLAYER-001 | Play the Trck Successfully & make sure evrything is Visible', async () => {
    await homePage.waitForHomeScreen();
    await PlayerPage.tapPlayerInfo();
    const isTabsVisible = await PlayerPage.isAllTabsVisible();
    expect(isTabsVisible).toBe(true);
    await PlayerPage.tapMoveDownIcon();
    const isMiniPlayerVisible = await PlayerPage.isMiniPlayerVisible();
    expect(isMiniPlayerVisible).toBe(true);
    await PlayerPage.tapPlayButton();
   });

   it('TC-PLAYER-002 | Change the volume Sound with no crash', async () => {
    await homePage.waitForHomeScreen();
   });

   it('TC-PLAYER-003 | Change the track place with no crash', async () => {
    await homePage.waitForHomeScreen();
   });

   it('TC-PLAYER-004 | Track Plays in the background with no crash', async () => {
    await homePage.waitForHomeScreen();
   });

   //other tests when implemented

});
