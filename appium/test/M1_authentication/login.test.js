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

  //1. invalid email or password
  it('should show error error with wrong password', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.login('sohaila@rythmify.com', 'wrongpass1234');
    const isErrorVisible = await LoginPage.isInvalidCredentialsErrorVisible();
    expect(isErrorVisible).toBe(true);
    const ErrorMessage = await LoginPage.getInvalidCredentialsErrorMessage();
    expect(ErrorMessage).toBe('Invalid email or password.');
  });

  it('should show error with wrong email', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.login('wrongemail@rythmify.com', 'sohaila123');
    const isErrorVisible = await LoginPage.isInvalidCredentialsErrorVisible();
    expect(isErrorVisible).toBe(true);
    const ErrorMessage = await LoginPage.getInvalidCredentialsErrorMessage();
    expect(ErrorMessage).toBe('Invalid email or password.');
  });

  //2. empty email or password
  it('should show error with empty email', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();
    await LoginPage.tapContinue();
    await LoginPage.pause(1000);
    const isErrorVisible = await LoginPage.isEmptyEmailErrorVisible();
    expect(isErrorVisible).toBe(true);
  });

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