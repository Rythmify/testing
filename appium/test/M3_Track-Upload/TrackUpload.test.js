const TrackUploadPage = require('../../page-objects/Track-Upload/TrackUpload.page');
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

// ─── Track Upload ───

describe('Track Upload — Upload', () => {

  it('TC-UPLOAD-001 | Upload track from device successfully', async () => {
    await homePage.waitForHomeScreen();
    await homePage.tapUploadButton();
    await TrackUploadPage.selectAudio();

    const isPageVisible = await TrackUploadPage.isUploadPageVisible();
    expect(isPageVisible).toBe(true);

    const isTabsVisible = await TrackUploadPage.isAllTabsVisible();
    expect(isTabsVisible).toBe(true);

    // Assert auto-filled fields are not empty
    const autoTitle = await TrackUploadPage.getTrackTitle();
    expect(autoTitle.length).toBeGreaterThan(0);

    const autoArtist = await TrackUploadPage.getArtistName();
    expect(autoArtist.length).toBeGreaterThan(0);

    // Verify tabs are tappable
    await TrackUploadPage.tapAdvancedTab();
    await TrackUploadPage.tapPermissionsTab();
    await TrackUploadPage.tapTrackInfoTab();

    // Edit the auto-filled values
    await TrackUploadPage.writeTrackTitle('test track');
    await TrackUploadPage.writeArtistName('tester');

    // Verify the values were updated
    const updatedTitle = await TrackUploadPage.getTrackTitle();
    expect(updatedTitle).toBe('test track');
    await driver.hideKeyboard();
    await driver.$(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.setMaxSearchSwipes(1)' +
        '.scrollIntoView(new UiSelector().text("Tags"))'
    );

    //await TrackUploadPage.selectGenre('FOLK'); //to be handled
    await TrackUploadPage.writeTags('#Testing');
    await TrackUploadPage.writeDescription('Test Uploading');
    await TrackUploadPage.writeCaption('Testinggg');
    await driver.hideKeyboard();
    await driver.$(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().text("Privacy"))'
    );
    await TrackUploadPage.tapPrivate();
    await TrackUploadPage.tapPublic();
    await TrackUploadPage.tapSave1();
    await driver.pause(5000);

    const isSuccess = await TrackUploadPage.isSuccessMessageVisible();
    expect(isSuccess).toBe(true);
  });
});
