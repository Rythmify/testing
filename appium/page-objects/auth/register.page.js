const BasePage = require('../base.page');
const { RegisterSelectors } = require('../../selectors');

class RegisterPage extends BasePage {

  // ─── Email Screen ───
  async fillEmail(email) {
    const emailInput = await $(RegisterSelectors.EMAIL_INPUT);
    await emailInput.waitForDisplayed({ timeout: 10000 });
    await emailInput.click();
    await emailInput.setValue(email);
  }

  async tapContinue() {
    await this.tap(RegisterSelectors.CONTINUE_BUTTON);
    await this.pause(2000);
  }

  // ─── Password Screen ───
  async fillPassword(password) {
    const passwordInput = await $(RegisterSelectors.PASSWORD_INPUT);
    await passwordInput.waitForDisplayed({ timeout: 10000 });
    await passwordInput.click();
    await passwordInput.addValue(password);
  }

  async tapPasswordContinue() {
    const btn = await $(RegisterSelectors.PASSWORD_CONTINUE_BUTTON);
    await btn.waitForDisplayed({ timeout: 10000 });
    await btn.click();
    await this.pause(2000);
  }

  // ─── Profile Screen ───
  async fillUsername(username) {
    const usernameInput = await $(RegisterSelectors.USERNAME_INPUT);
    await usernameInput.waitForDisplayed({ timeout: 10000 });
    await usernameInput.click();
    await usernameInput.setValue(username);
  }

  async selectMonth(month) {
    await this.tap(RegisterSelectors.MONTH_PICKER);
    await this.tap(`~${month}`);
  }

  async selectDay(day) {
    await this.tap(RegisterSelectors.DAY_PICKER);
    await this.tap(`~${day}`);
  }

  async selectYear(year) {
    await this.tap(RegisterSelectors.YEAR_PICKER);
    await this.tap(`~${year}`);
  }

  async selectGender(gender) {
    await this.tap(RegisterSelectors.GENDER_PICKER);
    await this.tap(`~${gender}`);
  }

  async tapFinalContinue() {
    await this.tap(RegisterSelectors.FINAL_CONTINUE);
    await this.pause(5000);
  }

  // ─── Full Register Flow ───
  async register(email, password, username, month, day, year, gender) {
    await this.fillEmail(email);
    await this.tapContinue();
    await this.fillPassword(password);
    await this.tapPasswordContinue();
    await this.fillUsername(username);
    await this.selectMonth(month);
    await this.selectDay(day);
    await this.selectYear(year);
    await this.selectGender(gender);
    await this.tapFinalContinue();
  }

  // ─── Assertions ───
  async isHomePageVisible() {
    return this.isVisible(RegisterSelectors.HOME_PAGE);
  }

  async isAlreadyExistsErrorVisible() {
    return this.isVisible(RegisterSelectors.ALREADY_EXISTS_ERROR);
  }

  async isUsernameEmptyErrorVisible() {
    return this.isVisible(RegisterSelectors.EMPTY_USERNAME_ERROR);
  }

  async isGenderEmptyErrorVisible() {
    return this.isVisible(RegisterSelectors.EMPTY_GENDER_ERROR);
  }

  async isDateOfBirthEmptyErrorVisible() {
    return this.isVisible(RegisterSelectors.EMPTY_DATE_OF_BIRTH_ERROR);
  }

}

module.exports = new RegisterPage();