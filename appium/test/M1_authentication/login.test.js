const WelcomePage = require('../../page-objects/auth/welcome.page');
const LoginPage   = require('../../page-objects/auth/login.page');

describe('M1 - Authentication: Login', () => {

  it('should login successfully with valid credentials', async () => {

    // Screen 1 — Welcome
    await WelcomePage.waitForWelcomeScreen();
    await WelcomePage.tapLogin();

    // Screen 2 & 3 — Email + Password
    await LoginPage.login('sohaila@rythmify.com', 'sohaila123');

    // Screen 4 — Home page
    const isHome = await LoginPage.isHomePageVisible();
    expect(isHome).toBe(true);

  });

});