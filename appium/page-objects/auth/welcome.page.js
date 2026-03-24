const BasePage = require('../base.page');
const { WelcomeSelectors } = require('../../selectors');

class WelcomePage extends BasePage {

  async waitForWelcomeScreen() {
    await this.pause(3000);
    const loginBtn = await $(WelcomeSelectors.LOGIN_BUTTON);
    await loginBtn.waitForDisplayed({ timeout: 15000 });
  }

  async tapLogin() {
    await this.tap(WelcomeSelectors.LOGIN_BUTTON);
    await this.pause(2000);
  }

  async tapRegister() {
    await this.tap(WelcomeSelectors.REGISTER_BUTTON);
    await this.pause(2000);
  }

}

module.exports = new WelcomePage();