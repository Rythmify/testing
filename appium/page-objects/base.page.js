const { $ } = require('@wdio/globals');

class BasePage {

  //Wait for element to be visible then return it
  async getElement(selector) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  }

  // Tap an element
  async tap(selector) {
    const element = await this.getElement(selector);
    await element.click();
  }

  //Fill a text input
  async fill(selector, value) {
    const element = await this.getElement(selector);
    await element.clearValue();
    await element.setValue(value);
  }

  //Get text from element
  async getText(selector) {
    const element = await this.getElement(selector);
    return element.getText();
  }

  //Check if element is visible
  async isVisible(selector) {
    try {
      const element = await $(selector);
      return element.isDisplayed();
    } catch {
      return false;
    }
  }

  //Wait for element to disappear
  async waitForHidden(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout, reverse: true });
  }

  //Pause (use sparingly)
  async pause(ms) {
    await driver.pause(ms);
  }

}

module.exports = BasePage;