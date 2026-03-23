const { ERROR_EMPTY_EMAIL, ERROR_EMPTY_PASSWORD } = require("./login.selectors");

// appium/selectors/auth/register.selectors.js
module.exports = {

  // ─── Email Screen ───
  EMAIL_INPUT:      'android=new UiSelector().className("android.widget.EditText").instance(0)',
  CONTINUE_BUTTON:  '~Continue',

  // ─── Password Screen ───
  PASSWORD_INPUT:   'android=new UiSelector().className("android.widget.EditText").instance(0)',
  PASSWORD_CONTINUE_BUTTON: '~Continue',

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
  INVALID_EMAIL_ERROR:     '~Please enter a valid email', 
  ERROR_PASSWORD_TOO_SHORT:      '~Password must be at least 8 characters',
  ERROR_PASSWORD_NO_UPPERCASE: '~Password must contain an uppercase letter',
  ERROR_PASSWORD_NO_LOWERCASE: '~Password must contain a lowercase letter',
  ERROR_PASSWORD_NO_NUMBER:    '~Password must contain a number',
  ERROR_EMPTY_EMAIL:           '~Please enter your email',
  ERROR_EMPTY_PASSWORD:        '~Please enter a password',
  EMPTY_USERNAME_ERROR:      '~Please enter a display name',
  EMPTY_GENDER_ERROR:       '~Please select your gender',
  EMPTY_DATE_OF_BIRTH_ERROR: '~Please select your date of birth',
  AGE_RESTRICTION_ERROR:    '~You must be at least 13 years old to register',   

  // ─── After Register ───
  HOME_PAGE: 'android=new UiSelector().description("Home\nTab 1 of 5")',

};