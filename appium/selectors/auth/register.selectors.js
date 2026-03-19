// appium/selectors/auth/register.selectors.js
module.exports = {

  // ─── Email Screen ───
  EMAIL_INPUT:      'android=new UiSelector().hint("Your email address or profile URL")',
  CONTINUE_BUTTON:  '~Continue',

  // ─── Password Screen ───
  PASSWORD_INPUT:   'android=new UiSelector().hint("Your password")',
  PASSWORD_CONTINUE_BUTTON: 'android=new UiSelector().className("android.view.View").instance(5)',

  // ─── Profile Screen ───
  USERNAME_INPUT:   'android=new UiSelector().className("android.widget.EditText")',
  MONTH_PICKER:     '~Month',
  DAY_PICKER:       '~Day',
  YEAR_PICKER:      '~Year',
  GENDER_PICKER:    '~Gender (required)',

  // ─── Gender Options ───
  GENDER_MALE:      '~Male',
  GENDER_FEMALE:    '~Female',

  // ─── Final Continue ───
  FINAL_CONTINUE:   '~Continue',

  // ─── Error Messages ───
  ALREADY_EXISTS_ERROR:    '~An account with this email already exists.',         

  // ─── After Register ───
  HOME_PAGE: 'android=new UiSelector().description("Home\nTab 1 of 5")',

};