const profilePage  = require('../../page-objects/Profile/Profile.page');
const loginPage    = require('../../page-objects/auth/login.page');
const welcomePage  = require('../../page-objects/auth/welcome.page');
const { validUser, mockUser } = require('../../fixtures/user.json');
const homePage = require('../../page-objects/Feed/home.page');

// ─── Login before all tests ────
before(async () => {
  const home = await driver.$('android=new UiSelector().description("Home\nTab 1 of 5")');
  const isHome = await home.isDisplayed().catch(() => false);
  if (!isHome) {
    await welcomePage.waitForWelcomeScreen();
    await welcomePage.tapLogin();
    await loginPage.login(validUser.email, validUser.password);
    await home.waitForDisplayed({ timeout: 15000 });
    await homePage.tapLibraryTab();
    await profilePage.openMyProfile();
    await profilePage.waitForDisplayed({ timeout: 15000 });
  }
});

// before(async () => {
//   await profilePage.goToLibrary();
//   await profilePage.openMyProfile();
//   await profilePage.waitForProfileScreen();
// });

describe('Profile Page — UI Visibility', () => {

  it('TC-PROFILE-001 | Edit button is visible', async () => {
    const visible = await profilePage.isEditButtonVisible();
    expect(visible).toBe(true);
  });

  it('TC-PROFILE-002 | Cover photo area is visible', async () => {
    const visible = await profilePage.isCoverPhotoVisible();
    expect(visible).toBe(true);
  });

  it('TC-PROFILE-003 | Edit button is tappable and opens edit form', async () => {
    await profilePage.tapEditButton();
    await driver.pause(1000);
    const isFormVisible = await profilePage.isSaveButtonVisible();
    expect(isFormVisible).toBe(true);
    await driver.back();
    await driver.pause(1000);
  });

});

describe('Profile Page — Displayed Data Matches Mock User', () => {

  it('TC-PROFILE-004 | Username is visible and correct', async () => {
    const visible = await profilePage.isUsernameVisible(mockUser.username);
    expect(visible).toBe(true);
  });

  it('TC-PROFILE-005 | Location is visible and correct', async () => {
    const visible = await profilePage.isLocationVisible(mockUser.location);
    expect(visible).toBe(true);
  });

  it('TC-PROFILE-006 | Country is visible and correct', async () => {
    const visible = await profilePage.isCountryVisible(mockUser.country);
    expect(visible).toBe(true);
  });

  it('TC-PROFILE-007 | Bio is visible and correct', async () => {
    const visible = await profilePage.isBioVisible(mockUser.bio);
    expect(visible).toBe(true);
  });

});

describe('Profile Page — Flow A: Edit and Save', () => {

  it('TC-PROFILE-008 | User can edit all profile fields and save successfully', async () => {
    await profilePage.editAndSave(
      mockUser.username,  'edited_user',
      mockUser.location,  'Alexandria',
      mockUser.bio,       'Edited bio',
      mockUser.country,   'Palestine',
    );
    const backOnProfile = await profilePage.isEditButtonVisible();
    expect(backOnProfile).toBe(true);
  });

});

describe('Profile Page — Flow B: Edit and Discard', () => {

  it('TC-PROFILE-009 | User can discard unsaved changes and return to profile', async () => {
    await profilePage.goToLibrary();
    await profilePage.openMyProfile();
    await profilePage.waitForProfileScreen();
    await profilePage.editAndDiscard(mockUser.username, 'Tester');
    const backOnProfile = await profilePage.isEditButtonVisible();
    expect(backOnProfile).toBe(true);
  });

});

describe('Profile Page — Flow C: Back by accident → Continue Editing', () => {

  it('TC-PROFILE-010 | User taps back accidentally and chooses to continue editing', async () => {
    await profilePage.goToLibrary();
    await profilePage.openMyProfile();
    await profilePage.waitForProfileScreen();
    await profilePage.editAndContinueEditing(mockUser.username, 'Tester');
    const stillOnForm = await profilePage.isSaveButtonVisible();
    expect(stillOnForm).toBe(true);
  });

});
