const WelcomePage  = require('../../page-objects/auth/welcome.page');
const RegisterPage = require('../../page-objects/auth/register.page');
const users        = require('../../fixtures/users.json');

describe('M1 - Authentication: Sign Up', () => {

  beforeEach(async () => {
    await driver.terminateApp('com.example.rythmify');
    await driver.pause(2000);
    await driver.activateApp('com.example.rythmify');
    await driver.pause(3000);
  });

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

  //───── Existing Email ─────

  it('should show error when registering with existing email', async () => {
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapRegister();

    await RegisterPage.fillEmail(users.existingUser.email);
    await RegisterPage.tapContinue();
    await driver.pause(2000);

    const isError = await RegisterPage.isAlreadyExistsErrorVisible();
    expect(isError).toBe(true);
  });

});