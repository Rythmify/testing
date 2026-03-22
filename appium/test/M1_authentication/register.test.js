const WelcomePage  = require('../../page-objects/auth/welcome.page');
const RegisterPage = require('../../page-objects/auth/register.page');
const { invalidPasswords } = require('../../fixtures/user.json');
const { scrollValues } = require('../../fixtures/user.json');
const { RegisterSelectors } = require('../../selectors');
const users        = require('../../fixtures/user.json');

describe('M1 - Authentication: Sign Up', () => {

  // ─── Valid Registration ─────

  it('should register successfully with new valid credentials', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.register(
      users.newUser.email,
      users.newUser.password,
      users.newUser.username,
      users.newUser.month,
      users.newUser.day,
      users.newUser.year,
      users.newUser.gender
    );
    const isHome = await RegisterPage.isHomePageVisible();
    expect(isHome).toBe(true);
  });

  it('should scroll and select the right values and register successfully', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername(users.newUser.username);
    await RegisterPage.selectMonth(users.newUser.month);
    await RegisterPage.openDayDropdown();
    await RegisterPage.scrollToDay(scrollValues.days);
    const isCorrectDay = await $(`~${scrollValues.days}`).isDisplayed();
    expect(isCorrectDay).toBe(true);
    await RegisterPage.openYearDropdown();
    await RegisterPage.scrollToYear(scrollValues.years);
    const isCorrectYear = await $(`~${scrollValues.years}`).isDisplayed();
    expect(isCorrectYear).toBe(true);
    await RegisterPage.selectGender(users.newUser.gender);
    await RegisterPage.tapFinalContinue();
    const isHome = await RegisterPage.isHomePageVisible();
    expect(isHome).toBe(true);
  });

  //───── Existing Email ─────
  it('should show error when registering with existing email', async () => {
    
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.register(
      users.existingUser.email,
      users.existingUser.password,
      users.existingUser.username,
      users.existingUser.month,
      users.existingUser.day,
      users.existingUser.year,
      users.existingUser.gender
    );
    await RegisterPage.tapContinue();
    await driver.pause(2000);
    const isError = await RegisterPage.isAlreadyExistsErrorVisible();
    expect(isError).toBe(true);
  });

  //───── Invalid Email Format ─────
  it('should show error when registering with invalid email format', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail('invalid-email');
    await RegisterPage.tapContinue();
    await driver.pause(2000);
    const isError = await RegisterPage.isInvalidEmailErrorVisible();
    expect(isError).toBe(true);
  });

  // ─── Invalid Password Format ───
invalidPasswords.forEach(({ password, reason, error }) => {
  it(`should show error when registering with invalid password: ${reason}`, async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(password);           
    await RegisterPage.tapPasswordContinue();
    await driver.pause(2000);
    const isError = await RegisterPage.isSpecificPasswordErrorVisible(RegisterSelectors[error]); 
    expect(isError).toBe(true);
  });
});

  // ─── Empty Fields Validation ───
  //1. Empty username
  it('should show error when registering with empty username', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername('');
    await RegisterPage.selectMonth(users.newUser.month);
    await RegisterPage.selectDay(users.newUser.day);
    await RegisterPage.selectYear(users.newUser.year);
    await RegisterPage.selectGender(users.newUser.gender);
    await RegisterPage.tapFinalContinue();
    await driver.pause(2000);
    const isError = await RegisterPage.isUsernameEmptyErrorVisible();
    expect(isError).toBe(true);
  });

  //2. Empty Date of Birth (month/day/year)
  //--month--
    it('should show error when registering with empty Date of Birth', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername(users.newUser.username);
    await RegisterPage.selectDay(users.newUser.day);
    await RegisterPage.selectYear(users.newUser.year);
    await RegisterPage.selectGender(users.newUser.gender);
    await RegisterPage.tapFinalContinue();
    const isError = await RegisterPage.isDateOfBirthEmptyErrorVisible();
    expect(isError).toBe(true);
  });
  //--day--
    it('should show error when registering with empty Date of Birth', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername(users.newUser.username);
    await RegisterPage.selectMonth(users.newUser.month);
    await RegisterPage.selectYear(users.newUser.year);
    await RegisterPage.selectGender(users.newUser.gender);
    await RegisterPage.tapFinalContinue();
    const isError = await RegisterPage.isDateOfBirthEmptyErrorVisible();
    expect(isError).toBe(true);
  });
  //--year--
    it('should show error when registering with empty Date of Birth', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername(users.newUser.username);
    await RegisterPage.selectMonth(users.newUser.month);
    await RegisterPage.selectDay(users.newUser.day);
    await RegisterPage.selectGender(users.newUser.gender);
    await RegisterPage.tapFinalContinue();
    const isError = await RegisterPage.isDateOfBirthEmptyErrorVisible();
    expect(isError).toBe(true);
  });


  //3. Empty Gender
    it('should show error when registering with empty Gender', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.fillEmail(users.newUser.email);
    await RegisterPage.tapContinue();
    await RegisterPage.fillPassword(users.newUser.password);
    await RegisterPage.tapPasswordContinue();
    await RegisterPage.fillUsername(users.newUser.username);
    await RegisterPage.selectMonth(users.newUser.month);
    await RegisterPage.selectDay(users.newUser.day);
    await RegisterPage.selectYear(users.newUser.year);
    await RegisterPage.tapFinalContinue();
    const isError = await RegisterPage.isGenderEmptyErrorVisible();
    expect(isError).toBe(true);
  });

  //───  Valid Age Restriction ─── 
  it('should show error when registering with age below 13', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();
    await RegisterPage.register(
      users.ageRestrictedUser.email,
      users.ageRestrictedUser.password,
      users.ageRestrictedUser.username,
      users.ageRestrictedUser.month,
      users.ageRestrictedUser.day,
      users.ageRestrictedUser.year,
      users.ageRestrictedUser.gender
    );
    await RegisterPage.tapContinue();
    await driver.pause(2000);
    const isError = await RegisterPage.isAgeRestrictionErrorVisible();
    expect(isError).toBe(true);
  });

});