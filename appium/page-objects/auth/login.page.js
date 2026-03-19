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
    await this.tap(LoginSelectors.SIGN_IN_BUTTON);
    await this.pause(5000);
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
    return this.isVisible(LoginSelectors.HOME_PAGE_ELEMENT);
  }

  async isErrorVisible() {
    return this.isVisible(LoginSelectors.ERROR_MESSAGE);
  }

  async getErrorMessage() {
    return this.getText(LoginSelectors.ERROR_MESSAGE);
  }


}

module.exports = new LoginPage();