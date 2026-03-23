const WelcomePage = require('../../page-objects/auth/welcome.page');
const LoginPage   = require('../../page-objects/auth/login.page');

describe('M1 - Authentication: Login', () => {

  // ─── Valid Credentials ───
  it('should login successfully with valid credentials', async () => {

    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.login('sohaila@rythmify.com', 'sohaila123');
    const isHome = await LoginPage.isHomePageVisible();
    expect(isHome).toBe(true);

  });



  // ─── Invalid Credentials ───
  //1. Invalid password
  it('should show error message with invalid password', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.login('sohaila@rythmify.com', 'wrongpass1234');
    const isErrorVisible = await LoginPage.isInvalidCredentialsErrorVisible();
    expect(isErrorVisible).toBe(true);
  });

  //2.Unregistered email
  it('should show error with invalid email', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.login('unregistered@rythmify.com', 'sohaila123');
    const isErrorVisible = await LoginPage.isInvalidCredentialsErrorVisible();
    expect(isErrorVisible).toBe(true);
  });

  //3. Invalid email format
  it('should show error with invalid email format', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.fillEmail('invalid-email-format');
    await LoginPage.tapContinue();
    const isErrorVisible = await LoginPage.isInvalidEmailErrorVisible();
    expect(isErrorVisible).toBe(true);
  });



  // ─── Empty Fields ───
  //1. empty email
  it('should show error with empty email', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.tapContinue();
    await LoginPage.pause(1000);
    const isErrorVisible = await LoginPage.isEmptyEmailErrorVisible();
    expect(isErrorVisible).toBe(true);
  });

  //2. empty password
  it('should show error with empty password', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.fillEmail('sohaila@rythmify.com');
    await LoginPage.tapContinue();
    await LoginPage.fillPassword('');
    await LoginPage.tapSignIn();
    await LoginPage.pause(1000);
    const isErrorVisible = await LoginPage.isEmptyPasswordErrorVisible();
    expect(isErrorVisible).toBe(true);
  });

});