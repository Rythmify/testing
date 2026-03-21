const BasePage = require('../base.page');
const { LoginSelectors } = require('../../selectors');

class LoginPage extends BasePage {

  // ─── Email Screen ───

  async fillEmail(email) {
    const emailInput = await $(LoginSelectors.EMAIL_INPUT);
    await emailInput.waitForDisplayed({ timeout: 10000 });
    await emailInput.click();
    await emailInput.setValue(email);
  }

  async tapContinue() {
    await this.tap(LoginSelectors.CONTINUE_BUTTON);
    await this.pause(2000);
  }

  // ─── Password Screen ───

  async fillPassword(password) {
    const passwordInput = await $(LoginSelectors.PASSWORD_INPUT);
    await passwordInput.waitForDisplayed({ timeout: 10000 });
    await passwordInput.click();
    await passwordInput.setValue(password);
  }

  async tapSignIn() {
  // DON'T dismiss keyboard — keep it open
  // The View element only appears when keyboard is visible
  
  await driver.pause(1000);

  // Tap the view that appears above keyboard
  const signInView = await $('android=new UiSelector().className("android.view.View").instance(5)');
  await signInView.waitForDisplayed({ timeout: 10000 });
  await signInView.click();
  await driver.pause(8000);
}

  // ─── Full Login Flow ───

  async login(email, password) {
    await this.fillEmail(email);
    await this.tapContinue();
    await this.fillPassword(password);
    await this.tapSignIn();
  }

  // ─── Assertions ───

  async isHomePageVisible() {
    return this.isVisible(LoginSelectors.HOME_PAGE);
  }

  async isInvalidCredentialsErrorVisible() {
    return this.isVisible(LoginSelectors.ERROR_INVALID_CREDENTIALS);
  }

  async isEmptyEmailErrorVisible() {
    return this.isVisible(LoginSelectors.ERROR_EMPTY_EMAIL);
  }

  async isEmptyPasswordErrorVisible() {
    return this.isVisible(LoginSelectors.ERROR_EMPTY_PASSWORD);
  }

  async isInvalidEmailErrorVisible() {
    return this.isVisible(LoginSelectors.ERROR_INVALID_EMAIL);
  }
}

module.exports = new LoginPage();